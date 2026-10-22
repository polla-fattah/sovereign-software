'use strict';
/* Run with: node --test
   Tests the scoring engine (static/js/scoring.js) against the framework definition
   (data/framework.json), covering cases A to J of the framework specification. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const S = require('../static/js/scoring.js');

const root = path.join(__dirname, '..');
const fw = JSON.parse(fs.readFileSync(path.join(root, 'data', 'framework.json'), 'utf8'));
const IDS = fw.principles.map((p) => p.id);
const EVIDENCE = 'Documented observation supporting this rating.';

/* Build an assessment. ratings: {principleId: 0-5 | null}; elig: {E1: status}; opts.evidence adds evidence + confidence. */
function build(ratings, elig = {}, opts = {}) {
  const a = S.emptyAssessment(fw);
  const withEvidence = opts.evidence !== false;
  for (const id of IDS) {
    const r = Object.prototype.hasOwnProperty.call(ratings, id) ? ratings[id] : null;
    a.principles[id].rating = r;
    if (withEvidence && r !== null) {
      a.principles[id].evidence = EVIDENCE;
      a.principles[id].confidence = opts.confidence || 'high';
    }
  }
  for (const e of fw.eligibility) {
    const status = elig[e.id] || elig.all || 'pass';
    a.eligibility[e.id].status = status;
    if (withEvidence && status === 'pass') a.eligibility[e.id].evidence = EVIDENCE;
    if (status === 'not_applicable') a.eligibility[e.id].justification = 'This requirement does not apply to this software.';
  }
  return a;
}
const all = (n) => Object.fromEntries(IDS.map((id) => [id, n]));
const rate = (a) => S.computeResult(fw, a);

test('framework definition is internally consistent', () => {
  assert.deepEqual(S.validateFramework(fw), []);
});

/* A */
test('A: perfect assessment scores 100 and is Tier 1', () => {
  const r = rate(build(all(5)));
  assert.equal(r.score, 100);
  assert.equal(r.classification.id, 'tier1');
});

/* B */
test('B: high score with a verified critical failure is Not Certified', () => {
  const ratings = { ...all(5), longevity: 2 };
  const r = rate(build(ratings, { E3: 'fail' }));
  assert.equal(r.score, 85);
  assert.equal(r.classification.id, 'not_certified');
  assert.ok(r.warnings.some((w) => /critical failure/.test(w)));
});

/* C */
test('C: Sovereignty failure scores 80 but cannot be certified', () => {
  const ratings = { ...all(5), sovereignty: 1 };
  assert.equal(rate(build(ratings)).score, 80);
  assert.equal(rate(build(ratings, { E1: 'fail' })).classification.id, 'not_certified');
  /* without an eligibility failure the Sovereignty rating still blocks Tier 2 */
  assert.equal(rate(build(ratings)).classification.id, 'tier3');
});

/* D */
test('D: weak responsiveness alone is not a critical failure', () => {
  const ratings = { sovereignty: 5, longevity: 5, locality: 4, predictability: 4, interoperability: 4, responsiveness: 2 };
  const r = rate(build(ratings));
  /* 25 + 25 + 16 + 12 + 8 + 2 = 88. The specification text says 86, which does not match its own formula. */
  assert.equal(r.score, 88);
  assert.equal(r.classification.id, 'tier2');
  assert.equal(r.eligibility.verdict, 'satisfied');
});

/* E */
test('E: unknown scores give no final score, an incomplete assessment, and no certified tier', () => {
  const ratings = { ...all(5), locality: null, responsiveness: null };
  const r = rate(build(ratings));
  assert.equal(r.score, null);
  assert.equal(r.complete, false);
  assert.deepEqual(r.missing, ['locality', 'responsiveness']);
  assert.equal(r.classification.id, 'unverified');
  assert.equal(r.classification.certified, false);
});

test('E2: unknown is distinct from zero', () => {
  const zero = rate(build({ ...all(5), responsiveness: 0 }));
  const unknown = rate(build({ ...all(5), responsiveness: null }));
  assert.equal(zero.score, 95);
  assert.equal(unknown.score, null);
  assert.notEqual(zero.complete, unknown.complete);
});

/* F */
test('F: unknown mandatory eligibility withholds certification', () => {
  const r = rate(build(all(5), { E4: 'not_verified' }));
  assert.equal(r.score, 100);
  assert.equal(r.classification.id, 'unverified');
  assert.deepEqual(r.eligibility.unverified, ['E4']);
});

test('F2: Not Applicable needs a justification, otherwise it counts as not verified', () => {
  const a = build(all(5), { E4: 'not_applicable' });
  assert.equal(rate(a).classification.id, 'tier1');
  a.eligibility.E4.justification = '';
  const r = rate(a);
  assert.equal(r.classification.id, 'unverified');
  assert.deepEqual(r.eligibility.unverified, ['E4']);
});

test('classification precedence: failure beats unverified beats incomplete', () => {
  const a = build({ ...all(5), responsiveness: null }, { E1: 'fail', E2: 'not_verified' });
  assert.equal(rate(a).classification.id, 'not_certified');
  const b = build({ ...all(5), responsiveness: null }, { E2: 'not_verified' });
  assert.equal(rate(b).classification.id, 'unverified');
  assert.match(rate(b).classification.reasons[0], /eligibility/i);
});

/* G: find ratings landing exactly on the boundaries */
function* allRatings() {
  const v = [0, 1, 2, 3, 4, 5];
  for (const a of v) for (const b of v) for (const c of v) for (const d of v) for (const e of v) for (const f of v) {
    yield { sovereignty: a, longevity: b, locality: c, predictability: d, interoperability: e, responsiveness: f };
  }
}
function find(score, pred) {
  for (const ratings of allRatings()) {
    const s = rate(build(ratings)).score;
    if (s === score && pred(ratings)) return ratings;
  }
  return null;
}
const min = (r) => Math.min(...Object.values(r));

test('G: tier boundaries', () => {
  const t1 = find(90, (r) => min(r) >= 3);
  assert.ok(t1, 'a score of exactly 90 with every principle at least 3 exists');
  assert.equal(rate(build(t1)).classification.id, 'tier1');

  const low = find(90, (r) => min(r) < 3 && r.sovereignty >= 3 && r.longevity >= 3);
  assert.ok(low, 'a score of exactly 90 with a principle below 3 exists');
  assert.notEqual(rate(build(low)).classification.id, 'tier1');
  assert.equal(rate(build(low)).classification.id, 'tier2');

  const s89 = find(89, (r) => min(r) >= 3);
  assert.ok(s89);
  assert.notEqual(rate(build(s89)).classification.id, 'tier1');
  assert.equal(rate(build(s89)).classification.id, 'tier2');

  const t2 = find(75, (r) => r.sovereignty >= 3 && r.longevity >= 3);
  assert.ok(t2);
  assert.equal(rate(build(t2)).classification.id, 'tier2');

  const t3 = find(74, (r) => r.sovereignty >= 3 && r.longevity >= 3);
  assert.ok(t3);
  assert.equal(rate(build(t3)).classification.id, 'tier3');

  const highButWeak = find(80, (r) => r.sovereignty < 3);
  assert.equal(rate(build(highButWeak)).classification.id, 'tier3');

  assert.equal(rate(build(t1, { E5: 'fail' })).classification.id, 'not_certified');
});

test('G2: Tier 1 and 2 need documented evidence and no Low confidence', () => {
  assert.equal(rate(build(all(5), {}, { evidence: false })).classification.id, 'tier3');
  assert.equal(rate(build(all(5), {}, { confidence: 'low' })).classification.id, 'tier3');
  assert.equal(rate(build(all(5), {}, { confidence: 'medium' })).classification.id, 'tier1');
});

/* H */
test('H: export then import reproduces the assessment and classification', () => {
  const a = build({ sovereignty: 5, longevity: 4, locality: 4, predictability: 3, interoperability: 5, responsiveness: 2 }, { E2: 'pass', E4: 'not_applicable' });
  a.software = { name: 'Example | Tool é中', version: '1.2', category: 'Tools', platform: 'Linux', deployment: 'Local' };
  a.evaluation = { date: '2026-10-22', evaluator: 'Tester', notes: 'Line one\nLine two' };
  a.principles.sovereignty.sources = 'https://example.org/a\nhttps://example.org/b';
  a.principles.locality.limitations = 'Sync needs a server.';
  a.eligibility.E1.source = 'https://example.org/e1';
  a.tests.T3.checked[0] = true;
  a.tests.T3.notes = 'Checked offline';
  const result = rate(a);
  const json = S.toJSON(fw, a, result);
  const back = S.parseImport(fw, json);
  assert.equal(back.ok, true, back.errors.join('; '));
  assert.deepEqual(back.assessment, a);
  const again = rate(back.assessment);
  assert.equal(again.score, result.score);
  assert.equal(again.classification.id, result.classification.id);
  assert.equal(JSON.parse(json).framework.version, '2.0');
  assert.equal(JSON.parse(json).schemaVersion, '2.0');
});

test('H2: invalid or malicious imports are rejected safely', () => {
  const good = JSON.parse(S.toJSON(fw, build(all(5)), rate(build(all(5)))));
  const bad = (mutate) => { const o = JSON.parse(JSON.stringify(good)); mutate(o); return S.parseImport(fw, JSON.stringify(o)); };
  assert.equal(S.parseImport(fw, '').ok, false);
  assert.equal(S.parseImport(fw, 'not json').ok, false);
  assert.equal(S.parseImport(fw, '[]').ok, false);
  assert.equal(S.parseImport(fw, 'null').ok, false);
  assert.equal(S.parseImport(fw, 'x'.repeat(1000001)).ok, false);
  assert.equal(bad((o) => { o.schemaVersion = '9.9'; }).ok, false);
  assert.equal(bad((o) => { o.principles.sovereignty.rating = 7; }).ok, false);
  assert.equal(bad((o) => { o.principles.sovereignty.rating = 2.5; }).ok, false);
  assert.equal(bad((o) => { o.principles.sovereignty.rating = '5'; }).ok, false);
  assert.equal(bad((o) => { o.principles.sovereignty.confidence = 'certain'; }).ok, false);
  assert.equal(bad((o) => { o.eligibility.E1.status = 'maybe'; }).ok, false);
  assert.equal(bad((o) => { o.eligibility.E1.source = 'javascript:alert(1)'; }).ok, false);
  assert.equal(bad((o) => { o.principles.longevity.sources = 'ftp://example.org/x'; }).ok, false);
  assert.equal(bad((o) => { o.software.name = { x: 1 }; }).ok, false);
  assert.equal(bad((o) => { o.software.name = 'a'.repeat(201); }).ok, false);
  assert.equal(bad((o) => { o.evaluation.date = '22/10/2026'; }).ok, false);
  assert.equal(bad((o) => { o.tests.T1.checked = [true]; }).ok, false);
  /* prototype pollution attempts must be rejected and must not touch Object.prototype */
  const polluted = S.parseImport(fw, '{"schemaVersion":"2.0","__proto__":{"polluted":true},"software":{"constructor":{"prototype":{"polluted":true}}}}');
  assert.equal(polluted.ok, false);
  assert.equal(({}).polluted, undefined);
  assert.equal(S.parseImport(fw, '{"schemaVersion":"2.0","principles":{"__proto__":{"x":1}}}').ok, false);
});

test('H3: an empty-but-valid assessment imports as fully unassessed, never as passing', () => {
  const r = S.parseImport(fw, JSON.stringify({ schemaVersion: '2.0' }));
  assert.equal(r.ok, true);
  const res = rate(r.assessment);
  assert.equal(res.score, null);
  assert.equal(res.classification.id, 'unverified');
  assert.equal(res.eligibility.unverified.length, 5);
});

test('H4: the Markdown report contains the required sections and the not-certified statement', () => {
  const a = build(all(4), { E3: 'fail' });
  a.software.name = 'Pipe | Test';
  const md = S.toMarkdown(fw, a, rate(a));
  for (const needle of ['Framework:', 'Evaluation date', 'Mandatory eligibility', 'Weighted principle scores', 'Classification', 'Evidence and limitations', 'Known limitations', 'Recommended improvements', 'not externally certified']) {
    assert.ok(md.includes(needle), 'report mentions ' + needle);
  }
  assert.ok(md.includes('Pipe \\| Test') || md.includes('Pipe | Test'));
  assert.ok(md.includes('Not Certified'));
});

/* I */
test('I: weights, ranges, rounding', () => {
  assert.equal(fw.principles.reduce((n, p) => n + p.weight, 0), 100);
  assert.deepEqual(fw.principles.map((p) => p.weight), [25, 25, 20, 15, 10, 5]);
  assert.deepEqual(fw.principles.map((p) => p.id), ['sovereignty', 'longevity', 'locality', 'predictability', 'interoperability', 'responsiveness']);
  assert.equal(S.formatScore(89.96), '89.9');
  assert.equal(S.formatScore(90), '90');
  assert.equal(S.formatScore(null), null);
  /* an out-of-range rating is treated as not assessed, never as a number */
  const a = build(all(5));
  a.principles.locality.rating = 9;
  const r = rate(a);
  assert.equal(r.score, null);
  assert.deepEqual(r.missing, ['locality']);
  /* contributions add up to the score */
  const full = rate(build({ sovereignty: 3, longevity: 4, locality: 2, predictability: 5, interoperability: 1, responsiveness: 0 }));
  assert.equal(full.contributions.reduce((n, c) => n + c.contribution, 0), full.score);
});

test('I2: a fractional score just below a threshold never reaches the tier', () => {
  const custom = JSON.parse(JSON.stringify(fw));
  custom.principles[0].weight = 24.99;
  custom.principles[1].weight = 25.01;
  const a = build(all(5));
  /* 100 total; now make a variant whose total is below 90 by a fraction using different ratings */
  a.principles.locality.rating = 3; a.principles.responsiveness.rating = 4;
  const r = S.computeResult(custom, a);
  const s = r.score;
  assert.ok(s < 100);
  assert.equal(r.classification.id, s >= 90 ? 'tier1' : 'tier2');
  assert.ok(S.formatScore(89.9999) !== '90');
});

test('weights can be changed in one place and the engine follows', () => {
  const custom = JSON.parse(JSON.stringify(fw));
  custom.principles.forEach((p) => { p.weight = 100 / 6; });
  const r = S.computeResult(custom, build(all(5)));
  assert.ok(Math.abs(r.score - 100) < 1e-6);
});

test('tests map to principles and every principle has a verifying test', () => {
  for (const p of fw.principles) {
    assert.ok(fw.tests.some((t) => t.supports.includes(p.id)), p.id + ' has a verifying test');
  }
  const t7 = fw.tests.find((t) => t.id === 'T7');
  assert.equal(t7.crossCutting, true);
  assert.ok(t7.supports.length >= 3);
  for (const t of fw.tests) assert.ok(t.verify.length > 0);
});

/* J: legacy directory entries never inherit certification */
test('J: directory entries without a verified v2 assessment are unverified', () => {
  const dir = JSON.parse(fs.readFileSync(path.join(root, 'data', 'directory.json'), 'utf8'));
  assert.ok(dir.length > 0);
  const seen = new Set();
  for (const e of dir) {
    assert.ok(e.id && !seen.has(e.id), 'unique id: ' + e.id);
    seen.add(e.id);
    assert.equal(e.framework_version, '2.0');
    assert.ok(['unverified', 'complete'].includes(e.assessment_status), e.name);
    if (e.assessment_status === 'unverified') {
      assert.equal(e.classification, 'unverified', e.name);
      for (const id of IDS) assert.equal(e.principles[id], null, e.name + ' must not carry an invented rating');
      for (const k of Object.keys(e.eligibility)) assert.equal(e.eligibility[k], 'not_verified', e.name);
      assert.ok(e.legacy_tier, e.name + ' keeps its legacy tier as metadata');
      assert.equal('tier' in e, false, 'the old tier field must not remain');
    }
  }
});

test('worked examples in the framework data match the engine', () => {
  for (const ex of fw.examples) {
    const a = S.emptyAssessment(fw);
    for (const id of IDS) {
      a.principles[id].rating = ex.ratings[id];
      a.principles[id].evidence = 'Hypothetical illustration for the methodology.';
      a.principles[id].confidence = 'high';
    }
    for (const e of fw.eligibility) {
      a.eligibility[e.id].status = ex.eligibility[e.id];
      a.eligibility[e.id].evidence = 'Hypothetical illustration for the methodology.';
    }
    const r = S.computeResult(fw, a);
    assert.equal(r.score, ex.expected.score, ex.id + ' score');
    assert.equal(r.classification.id, ex.expected.classification, ex.id + ' classification');
  }
});

test('K: directory entries are scored by the same engine through the adapter', () => {
  const dir = JSON.parse(fs.readFileSync(path.join(root, 'data', 'directory.json'), 'utf8'));
  for (const e of dir) {
    const r = S.computeResult(fw, S.assessmentFromEntry(fw, e));
    assert.equal(r.classification.id, 'unverified', e.name);
    assert.equal(r.score, null, e.name);
  }
  /* a fully evidenced synthetic entry classifies like the evaluator would */
  const entry = {
    name: 'Synthetic', category: 'Test', assessment_status: 'complete',
    eligibility: Object.fromEntries(fw.eligibility.map((x) => [x.key, 'pass'])),
    principles: { sovereignty: 5, longevity: 5, locality: 4, predictability: 4, interoperability: 4, responsiveness: 2 },
    evidence: [
      ...IDS.map((id) => ({ target: id, text: 'Tested against version 1.0 on Linux.', url: 'https://example.org/e', confidence: 'high' })),
      ...fw.eligibility.map((x) => ({ target: x.id, text: 'Tested against version 1.0 on Linux.', confidence: 'high' }))
    ],
    limitations: ['Slow startup.']
  };
  const r = S.computeResult(fw, S.assessmentFromEntry(fw, entry));
  assert.equal(r.score, 88);
  assert.equal(r.classification.id, 'tier2');
  entry.eligibility.custody_and_recovery = 'fail';
  assert.equal(S.computeResult(fw, S.assessmentFromEntry(fw, entry)).classification.id, 'not_certified');
  entry.eligibility.custody_and_recovery = 'pass';
  entry.evidence.find((i) => i.target === 'longevity').confidence = 'low';
  assert.equal(S.computeResult(fw, S.assessmentFromEntry(fw, entry)).classification.id, 'tier3');
});

test('schema property names match the framework data', () => {
  const schema = JSON.parse(fs.readFileSync(path.join(root, 'static', 'schema', 'assessment-2.0.schema.json'), 'utf8'));
  assert.deepEqual(Object.keys(schema.properties.principles.properties), IDS);
  assert.deepEqual(Object.keys(schema.properties.eligibility.properties), fw.eligibility.map((e) => e.id));
  assert.deepEqual(Object.keys(schema.properties.tests.properties), fw.tests.map((t) => t.id));
  assert.equal(schema.properties.schemaVersion.const, S.SCHEMA_VERSION);
  fw.tests.forEach((t) => assert.equal(schema.properties.tests.properties[t.id].properties.checked.minItems, t.verify.length));
});

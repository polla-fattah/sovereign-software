'use strict';
/* Run with: node --test
   Tests the assessment engine (static/js/assessment.js) against the framework definition
   (data/framework.json): four principles, five fundamental requirements, qualitative findings,
   and a qualified determination, with no numerical score, weight, or tier. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const S = require('../static/js/assessment.js');

const root = path.join(__dirname, '..');
const fw = JSON.parse(fs.readFileSync(path.join(root, 'data', 'framework.json'), 'utf8'));
const IDS = fw.principles.map((p) => p.id);
const EVIDENCE = 'Documented observation supporting this finding.';

/* findings: {principleId: finding | null}; elig: {E1: status, all: status}; opts: evidence, confidence */
function build(findings, elig = {}, opts = {}) {
  const a = S.emptyAssessment(fw);
  const withEvidence = opts.evidence !== false;
  for (const id of IDS) {
    const f = Object.prototype.hasOwnProperty.call(findings, id) ? findings[id] : null;
    a.principles[id].finding = f;
    if (withEvidence && f !== null) {
      a.principles[id].evidence = EVIDENCE;
      a.principles[id].confidence = opts.confidence === undefined ? 'high' : opts.confidence;
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
const all = (f) => Object.fromEntries(IDS.map((id) => [id, f]));
const rate = (a) => S.computeResult(fw, a);
const det = (a) => rate(a).determination.id;

test('the framework definition is consistent', () => {
  assert.deepEqual(S.validateFramework(fw), []);
  assert.deepEqual(IDS, ['sovereignty', 'longevity', 'locality', 'transparency']);
  assert.deepEqual(fw.principles.map((p) => p.order), ['I', 'II', 'III', 'IV']);
  assert.equal(fw.eligibility.length, 5);
  assert.equal(fw.tests.length, 7);
});

test('the framework adopts no weights, numerical scores, or tier thresholds', () => {
  const text = JSON.stringify(fw);
  for (const word of ['"weight"', '"weights"', '"minScore"', '"tier1"', '"tier2"', '"tier3"', '"score"']) assert.ok(!text.includes(word), word);
  const r = rate(build(all('meets')));
  assert.ok(!('score' in r) && !('scoreDisplay' in r) && !('contributions' in r));
});

test('all four principles met, all requirements passed, with evidence: meets the proposed core requirements', () => {
  const r = rate(build(all('meets')));
  assert.equal(r.determination.id, 'meets_core');
  assert.equal(r.determination.label, 'Meets the proposed core requirements');
  assert.equal(r.complete, true);
  assert.equal(r.eligibility.verdict, 'satisfied');
});

test('a verified fundamental failure cannot be cancelled by strengths elsewhere', () => {
  for (const e of fw.eligibility) {
    const r = rate(build(all('meets'), { [e.id]: 'fail' }));
    assert.equal(r.determination.id, 'fails_fundamental', e.id);
    assert.deepEqual(r.eligibility.failures, [e.id]);
    assert.ok(r.determination.reasons.some((x) => x.includes(e.failure)));
  }
});

test('missing evidence is not a failure and not a pass: unverified requirements give insufficient evidence', () => {
  const r = rate(build(all('meets'), { E3: 'not_verified' }));
  assert.equal(r.determination.id, 'insufficient_evidence');
  assert.deepEqual(r.eligibility.unverified, ['E3']);
  assert.notEqual(r.determination.id, 'fails_fundamental');
  assert.notEqual(r.determination.id, 'meets_core');
});

test('Not Applicable needs a documented justification, otherwise it counts as not verified', () => {
  const a = build(all('meets'), { E5: 'not_applicable' });
  assert.equal(det(a), 'meets_core');
  a.eligibility.E5.justification = '';
  const r = rate(a);
  assert.equal(r.determination.id, 'insufficient_evidence');
  assert.deepEqual(r.eligibility.unverified, ['E5']);
});

test('an unassessed principle is not assessed, never a pass or a failure', () => {
  const r = rate(build({ ...all('meets'), locality: null }));
  assert.equal(r.complete, false);
  assert.deepEqual(r.missing, ['locality']);
  assert.equal(r.determination.id, 'insufficient_evidence');
  assert.equal(r.profile.find((c) => c.id === 'locality').finding, null);
  assert.equal(r.profile.find((c) => c.id === 'locality').findingLabel, 'Not assessed');
});

test('evidence gaps give insufficient evidence: no statement, no confidence, or Low confidence', () => {
  assert.equal(det(build(all('meets'), {}, { evidence: false })), 'insufficient_evidence');
  assert.equal(det(build(all('meets'), {}, { confidence: null })), 'insufficient_evidence');
  assert.equal(det(build(all('meets'), {}, { confidence: 'low' })), 'insufficient_evidence');
  assert.equal(det(build(all('meets'), {}, { confidence: 'medium' })), 'meets_core');
});

test('partial or unmet principles without a failed requirement give partially aligned', () => {
  assert.equal(det(build({ ...all('meets'), locality: 'partial' })), 'partially_aligned');
  const r = rate(build({ ...all('meets'), transparency: 'does_not_meet' }));
  assert.equal(r.determination.id, 'partially_aligned');
  assert.ok(r.weaknesses.some((w) => w.principle === 'transparency'));
  assert.ok(r.determination.reasons.some((x) => /Transparency/.test(x)));
});

test('precedence: failure, then insufficient evidence, then meets, then partially aligned', () => {
  const messy = build({ ...all('meets'), locality: null }, { E1: 'fail', E2: 'not_verified' });
  assert.equal(det(messy), 'fails_fundamental');
  assert.equal(det(build({ ...all('partial'), locality: null }, { E2: 'not_verified' })), 'insufficient_evidence');
  assert.equal(det(build(all('partial'))), 'partially_aligned');
});

test('speed and polish are supporting qualities: a slow application can meet the core requirements', () => {
  const a = build(all('meets'));
  const slowTest = fw.tests.find((t) => t.id === 'T7');
  assert.deepEqual(slowTest.supports, []);
  assert.equal(slowTest.role, 'supporting');
  a.tests.T7.checked = [false, false, false];
  a.tests.T7.notes = 'Noticeably slow on large files.';
  assert.equal(det(a), 'meets_core');
  assert.ok(!IDS.includes('responsiveness'));
});

test('verification tests map to principles and requirements that exist', () => {
  for (const t of fw.tests) {
    assert.ok(t.verify.length > 0, t.id);
    for (const s of t.supports) assert.ok(IDS.includes(s), t.id);
  }
  for (const id of IDS) assert.ok(fw.tests.some((t) => t.supports.includes(id)), id + ' has a verifying test');
  for (const e of fw.eligibility) assert.ok(fw.tests.some((t) => t.eligibility.includes(e.id)), e.id + ' has a verifying test');
  assert.equal(fw.tests.find((t) => t.id === 'T5').role, 'cross-cutting');
});

test('verification coverage counts checked items per principle without creating a score', () => {
  const a = build(all('meets'));
  a.tests.T3.checked[0] = true;
  const cov = rate(a).coverage.find((c) => c.id === 'locality');
  assert.equal(cov.verificationChecked, 1);
  assert.ok(cov.verificationTotal >= 3);
});

test('worked examples in the framework data match the engine', () => {
  for (const ex of fw.examples) {
    const a = S.emptyAssessment(fw);
    for (const id of IDS) {
      a.principles[id].finding = ex.findings[id];
      a.principles[id].evidence = 'Hypothetical illustration for the methodology.';
      a.principles[id].confidence = 'high';
    }
    for (const e of fw.eligibility) {
      a.eligibility[e.id].status = ex.eligibility[e.id];
      a.eligibility[e.id].evidence = 'Hypothetical illustration for the methodology.';
    }
    assert.equal(rate(a).determination.id, ex.expected.determination, ex.id);
  }
  assert.deepEqual(fw.examples.map((e) => e.expected.determination), ['fails_fundamental', 'meets_core', 'partially_aligned']);
});

/* ---------- export and import ---------- */

test('export then import reproduces the assessment and determination', () => {
  const a = build({ sovereignty: 'meets', longevity: 'partial', locality: 'meets', transparency: 'meets' }, { E2: 'pass', E4: 'not_applicable' });
  a.software = { name: 'Example | Tool é中', version: '1.2', category: 'Tools', platform: 'Linux', deployment: 'Local application' };
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
  assert.equal(rate(back.assessment).determination.id, result.determination.id);
  const parsed = JSON.parse(json);
  assert.equal(parsed.schemaVersion, '3.0');
  assert.equal(parsed.framework.version, '3.0');
  assert.ok(!('score' in parsed.derived));
});

test('invalid or malicious imports are rejected safely', () => {
  const good = JSON.parse(S.toJSON(fw, build(all('meets')), rate(build(all('meets')))));
  const bad = (mutate) => { const o = JSON.parse(JSON.stringify(good)); mutate(o); return S.parseImport(fw, JSON.stringify(o)); };
  assert.equal(S.parseImport(fw, '').ok, false);
  assert.equal(S.parseImport(fw, 'not json').ok, false);
  assert.equal(S.parseImport(fw, '[]').ok, false);
  assert.equal(S.parseImport(fw, 'null').ok, false);
  assert.equal(S.parseImport(fw, 'x'.repeat(1000001)).ok, false);
  assert.equal(bad((o) => { o.schemaVersion = '2.0'; }).ok, false, 'the superseded 2.0 file layout is not accepted');
  assert.equal(bad((o) => { o.principles.sovereignty.finding = 'excellent'; }).ok, false);
  assert.equal(bad((o) => { o.principles.sovereignty.finding = 5; }).ok, false);
  assert.equal(bad((o) => { o.principles.sovereignty.confidence = 'certain'; }).ok, false);
  assert.equal(bad((o) => { o.eligibility.E1.status = 'maybe'; }).ok, false);
  assert.equal(bad((o) => { o.eligibility.E1.source = 'javascript:alert(1)'; }).ok, false);
  assert.equal(bad((o) => { o.principles.longevity.sources = 'ftp://example.org/x'; }).ok, false);
  assert.equal(bad((o) => { o.software.name = { x: 1 }; }).ok, false);
  assert.equal(bad((o) => { o.software.name = 'a'.repeat(201); }).ok, false);
  assert.equal(bad((o) => { o.evaluation.date = '22/10/2026'; }).ok, false);
  assert.equal(bad((o) => { o.tests.T1.checked = [true]; }).ok, false);
  const polluted = S.parseImport(fw, '{"schemaVersion":"3.0","__proto__":{"polluted":true},"software":{"constructor":{"prototype":{"polluted":true}}}}');
  assert.equal(polluted.ok, false);
  assert.equal(({}).polluted, undefined);
  assert.equal(S.parseImport(fw, '{"schemaVersion":"3.0","principles":{"__proto__":{"x":1}}}').ok, false);
});

test('an empty but valid import is fully unassessed, never passing', () => {
  const r = S.parseImport(fw, JSON.stringify({ schemaVersion: '3.0' }));
  assert.equal(r.ok, true);
  const res = rate(r.assessment);
  assert.equal(res.determination.id, 'insufficient_evidence');
  assert.equal(res.eligibility.unverified.length, 5);
  assert.equal(res.assessedCount, 0);
});

test('the Markdown report has the required sections and the not-certified statement', () => {
  const a = build(all('partial'), { E3: 'fail' });
  a.software.name = 'Pipe | Test';
  const md = S.toMarkdown(fw, a, rate(a));
  for (const needle of ['Framework:', 'Assessment date', 'Overall determination', 'Fundamental eligibility requirements', 'Principle profile', 'Evidence and limitations', 'Known limitations', 'Supporting engineering tests', 'Recommended improvements', 'not externally certified', 'Fails a fundamental requirement']) {
    assert.ok(md.includes(needle), 'report mentions ' + needle);
  }
  assert.ok(md.includes('Pipe | Test'), 'the name appears in the heading');
  a.eligibility.E1.evidence = 'a | b';
  assert.ok(S.toMarkdown(fw, a, rate(a)).includes('a \\| b'), 'pipes are escaped inside table cells');
  assert.ok(!/score|weighted|tier/i.test(md.replace(/adopts no numerical score, weighting, or tier threshold/, '')), 'no scoring language in the report');
});

/* ---------- directory entries ---------- */

test('directory entries without a verified v3 assessment are unverified and carry no findings', () => {
  const dir = JSON.parse(fs.readFileSync(path.join(root, 'data', 'directory.json'), 'utf8'));
  assert.ok(dir.length > 0);
  const seen = new Set();
  for (const e of dir) {
    assert.ok(e.id && !seen.has(e.id), 'unique id: ' + e.id);
    seen.add(e.id);
    assert.equal(e.framework_version, fw.version);
    assert.ok(['unverified', 'complete'].includes(e.assessment_status), e.name);
    assert.deepEqual(Object.keys(e.eligibility), fw.eligibility.map((x) => x.key), e.name);
    assert.deepEqual(Object.keys(e.principles), IDS, e.name);
    if (e.assessment_status === 'unverified') {
      assert.equal(e.determination, 'insufficient_evidence', e.name);
      for (const id of IDS) assert.equal(e.principles[id], null, e.name + ' must not carry an invented finding');
      for (const k of Object.keys(e.eligibility)) assert.equal(e.eligibility[k], 'not_verified', e.name);
      assert.ok(e.legacy_tier, e.name + ' keeps its legacy tier as metadata');
      for (const gone of ['tier', 'classification', 'score']) assert.equal(gone in e, false, gone + ' must not remain');
    }
    const r = S.computeResult(fw, S.assessmentFromEntry(fw, e));
    if (e.assessment_status === 'unverified') assert.equal(r.determination.id, 'insufficient_evidence', e.name);
  }
});

test('a fully evidenced synthetic entry is determined by the same engine through the adapter', () => {
  const entry = {
    name: 'Synthetic', category: 'Test', assessment_status: 'complete',
    eligibility: Object.fromEntries(fw.eligibility.map((x) => [x.key, 'pass'])),
    principles: { sovereignty: 'meets', longevity: 'meets', locality: 'meets', transparency: 'meets' },
    evidence: [
      ...IDS.map((id) => ({ target: id, text: 'Tested against version 1.0 on Linux.', url: 'https://example.org/e', confidence: 'high' })),
      ...fw.eligibility.map((x) => ({ target: x.id, text: 'Tested against version 1.0 on Linux.', confidence: 'high' }))
    ],
    limitations: ['Slow startup.']
  };
  assert.equal(S.computeResult(fw, S.assessmentFromEntry(fw, entry)).determination.id, 'meets_core');
  entry.eligibility.retained_control = 'fail';
  assert.equal(S.computeResult(fw, S.assessmentFromEntry(fw, entry)).determination.id, 'fails_fundamental');
  entry.eligibility.retained_control = 'pass';
  entry.evidence.find((i) => i.target === 'longevity').confidence = 'low';
  assert.equal(S.computeResult(fw, S.assessmentFromEntry(fw, entry)).determination.id, 'insufficient_evidence');
  entry.evidence.find((i) => i.target === 'longevity').confidence = 'high';
  entry.principles.locality = 'partial';
  assert.equal(S.computeResult(fw, S.assessmentFromEntry(fw, entry)).determination.id, 'partially_aligned');
});

test('schema property names match the framework data', () => {
  const schema = JSON.parse(fs.readFileSync(path.join(root, 'static', 'schema', 'assessment-3.0.schema.json'), 'utf8'));
  assert.deepEqual(Object.keys(schema.properties.principles.properties), IDS);
  assert.deepEqual(Object.keys(schema.properties.eligibility.properties), fw.eligibility.map((e) => e.id));
  assert.deepEqual(Object.keys(schema.properties.tests.properties), fw.tests.map((t) => t.id));
  assert.equal(schema.properties.schemaVersion.const, S.SCHEMA_VERSION);
  assert.deepEqual(schema.properties.principles.properties.sovereignty.properties.finding.enum, [null, ...S.FINDINGS]);
  fw.tests.forEach((t) => assert.equal(schema.properties.tests.properties[t.id].properties.checked.minItems, t.verify.length));
});

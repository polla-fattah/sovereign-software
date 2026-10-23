'use strict';
/* Run with: node --test
   Cross-file checks that keep the manifesto, home page, slides, README and the built site
   consistent with data/framework.json (the single source of truth for the principles). */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { loadEntries } = require('../scripts/entries.js');
const { loadLedgers, auditReviewed } = require('../scripts/rating-audit.js');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const fw = JSON.parse(read('data/framework.json'));
const NAMES = fw.principles.map((p) => p.name);
const IDS = fw.principles.map((p) => p.id);
const ORDER = fw.principles.map((p) => p.order);
const TAGLINE = 'Software should serve people without claiming permanent custody over their information, choices, or work.';

/* names must appear in increasing order of first appearance */
function assertOrder(text, names, label) {
  let last = -1;
  for (const n of names) {
    const i = text.indexOf(n, last + 1);
    assert.ok(i > last, label + ': "' + n + '" is out of order or missing');
    last = i;
  }
}

test('the framework has four principles in the documented conceptual order', () => {
  assert.deepEqual(NAMES, ['Sovereignty', 'Longevity', 'Locality', 'Transparency and Control']);
  assert.deepEqual(ORDER, ['I', 'II', 'III', 'IV']);
});

test('the manifesto source lists the four principles in order', () => {
  const md = read('content/read.md');
  const sec1 = md.slice(md.indexOf('Section 01'), md.indexOf('Section 02'));
  assertOrder(sec1, NAMES.map((n) => '**' + n + ':'), 'read.md Section 01');
  const sec2 = md.slice(md.indexOf('Section 02'), md.indexOf('Section 03'));
  assertOrder(sec2, NAMES.map((n, i) => '### Principle ' + ORDER[i] + '. ' + n), 'read.md Section 02');
  assert.ok(/Four foundational principles/.test(md) && /Section 02: The Four Foundational Principles/.test(md));
  assert.ok(/Data longevity/.test(md) && /Functional longevity/.test(md) && /Knowledge longevity/.test(md), 'Longevity has three dimensions');
  assert.ok(md.includes('no single numerical score can excuse a proven loss of fundamental user control'));
  assert.ok(md.includes('No new weighting scheme or tier threshold is adopted'), 'the withdrawal of weights is stated');
  for (const h of ['Section 06: Evaluating Sovereign Software', '### 6.1 Four principle assessments', '### 6.2 Fundamental eligibility requirements', '### 6.3 Evidence before a numerical score', '### 6.4 Supporting engineering tests', '## Selected References']) {
    assert.ok(md.includes(h), 'read.md has ' + h);
  }
  assert.equal((md.split('## Selected References')[1].match(/^- /gm) || []).length, 5, 'five selected references');
  assert.ok(md.includes('E. N. Pinson'), 'the McIlroy, Pinson and Tague citation uses the verified initials');
});

test('the short manifesto, slides, README, and home page follow the same principles', () => {
  assertOrder(read('content/manifesto.md').split('## 06')[0], NAMES.map((n) => '**' + n + ':**'), 'manifesto.md');
  const slides = read('slides/manifesto.md');
  const four = slides.slice(slides.indexOf('## Four principles'), slides.indexOf('A relationship, not a ranking'));
  assertOrder(four, NAMES.map((n) => '**' + n + ':'), 'slides principle list');
  const built = read('static/slides/index.html');
  assertOrder(built.slice(built.indexOf('Four principles')), ['Sovereignty', 'Longevity', 'Locality', 'Transparency and Control'], 'built slides');
  const readme = read('README.md');
  for (const n of NAMES) assert.ok(readme.includes(n), 'README names ' + n);
  const home = read('layouts/index.html');
  assert.ok(home.includes('range $fw.principles'), 'the home principle cards are generated from the framework data');
  assert.ok(home.includes('.Site.Params.tagline'));
});

test('the lineage page and domain preservation profiles are complete and valid', () => {
  const lineageIndex = read('content/lineage/_index.md');
  const slugs = ['local-first', 'free-software', 'indieweb', 'solid', 'permacomputing', 'mydata', 'digital-preservation', 'ai-governance', 'interoperability-and-exit', 'design-justice'];
  for (const slug of slugs) {
    assert.ok(lineageIndex.includes('/lineage/' + slug + '/'), 'lineage/_index.md links to /lineage/' + slug + '/');
    const doc = read('content/lineage/' + slug + '.md');
    for (const sec of ['## 1. Historical context and core thesis', '## 2. Where Sovereign Software agrees', '## 3. Where we stand and why we diverge', '## 4. Concrete architectural contrasts', '## 5. How this shapes the evaluation methodology', '## 6. Primary sources and further reading']) {
      assert.ok(doc.includes(sec), slug + '.md has ' + sec);
    }
    assert.ok(!doc.includes('utm_source='), slug + '.md contains no tracking query parameters');
  }
  assert.ok(!lineageIndex.includes('utm_source='), 'lineage/_index.md contains no tracking query parameters');
  const meth = read('content/methodology.md');
  for (const prof of ['vcs_core', 'knowledge_notes', 'cad_engineering', 'finance_tasks', 'research_bibliographic']) {
    assert.ok(meth.includes(prof), 'methodology.md defines domain profile ' + prof);
  }
});

test('the tagline and description are the revised ones, and the old quote is gone', () => {
  const toml = read('hugo.toml');
  assert.ok(toml.includes(TAGLINE));
  assert.ok(toml.includes('Software should remain under human authority, preserve human knowledge, function independently wherever possible, and make consequential behavior understandable and controllable.'));
  for (const f of ['content/read.md', 'content/manifesto.md', 'content/_index.md', 'layouts/index.html', 'layouts/partials/footer.html', 'hugo.toml', 'slides/manifesto.md', 'README.md']) {
    assert.ok(!read(f).includes('Your data belongs to you'), f + ' still has the old quote');
  }
  assert.ok(read('content/manifesto.md').includes(TAGLINE));
  assert.ok(read('slides/manifesto.md').includes(TAGLINE));
});

test('no weights, scores, tiers, or retired principles remain in the live source', () => {
  const banned = ['7-Gate', '7/7', 'GATE 0', 'Seven Engineering Evaluation Tests', 'Launch Interactive Scorer', 'sovereign.js', 'scoring.js', 'gates.json', 'Tier 1', 'Tier 2', 'Tier 3',
    'Weighted score', 'weighted score', 'Focused Interoperability', '25%', '/ 100', 'Responsiveness:'];
  const files = ['content/read.md', 'content/manifesto.md', 'content/lineage/_index.md', 'content/methodology.md', 'content/directory/_index.md',
    'layouts/index.html', 'layouts/_default/directory.html', 'layouts/lineage/list.html', 'layouts/lineage/single.html', 'layouts/partials/header.html', 'layouts/partials/footer.html',
    'layouts/partials/directory-card.html', 'layouts/directory/single.html', 'slides/manifesto.md', 'static/js/directory.js', 'static/js/assessment.js'];
  for (const f of files) {
    const t = read(f);
    for (const b of banned) assert.ok(!t.includes(b), f + ' still contains "' + b + '"');
  }
  for (const f of fs.readdirSync(path.join(root, 'layouts/shortcodes'))) {
    const t = read('layouts/shortcodes/' + f);
    for (const b of ['weight', 'Weight', 'tier']) assert.ok(!t.includes(b), f + ' mentions ' + b);
  }
  for (const gone of ['data/gates.json', 'data/escape.json', 'data/profiles.json', 'static/js/sovereign.js', 'static/js/scoring.js', 'static/js/evaluator.js', 'content/evaluator.md', 'layouts/_default/evaluator.html', 'layouts/_default/escape-hatches.html', 'static/schema']) {
    assert.equal(fs.existsSync(path.join(root, gone)), false, gone + ' is gone');
  }
});

test('no em dashes in source files', () => {
  const dirs = ['content', 'layouts', 'data', 'static/js', 'slides', 'tests'];
  const files = ['README.md', 'hugo.toml', 'LICENSE'];
  const walk = (d) => fs.readdirSync(path.join(root, d), { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  for (const f of dirs.flatMap(walk).concat(files)) {
    if (!/\.(md|html|json|js|css|toml|gotmpl|txt)$/.test(f) && f !== 'LICENSE') continue;
    assert.ok(!fs.readFileSync(path.join(root, f), 'utf8').includes(String.fromCharCode(0x2014)), f + ' contains an em dash');
  }
});

test('Index and Escape Hatches data follow the framework keys', () => {
  const dir = loadEntries(fw);
  const keys = fw.eligibility.map((e) => e.key);
  const cats = new Set();
  for (const e of dir) {
    assert.deepEqual(Object.keys(e.eligibility), keys, e.id);
    assert.deepEqual(Object.keys(e.principles), IDS, e.id);
    assert.match(e.id, /^[a-z0-9-]+$/);
    cats.add(e.category);
  }
  assert.ok(cats.size >= 6, 'the original six disciplines are preserved');
  const esc = read('content/escape-hatches.md');
  assertOrder(esc, NAMES, 'escape-hatches.md');
  for (const prof of ['knowledge_notes', 'finance_tasks', 'research_bibliographic', 'cad_engineering', 'vcs_core']) {
    assert.ok(esc.includes(prof), 'escape-hatches.md covers domain profile ' + prof);
  }
  for (const req of ['E1', 'E2', 'E3', 'E4', 'E5', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6']) {
    assert.ok(esc.includes(req), 'escape-hatches.md cites ' + req);
  }
  assert.ok(esc.includes('No migration is promised to be lossless'), 'escape-hatches.md states migration caveats');
});

/* ---------- built site ---------- */
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'sovereign-build-'));
const build = spawnSync('hugo', ['--gc', '--destination', out, '--baseURL', 'https://example.test/'], { cwd: root, encoding: 'utf8', shell: process.platform === 'win32' });
const skip = build.status === 0 ? false : 'hugo is not available or the build failed';
const html = (p) => fs.readFileSync(path.join(out, p), 'utf8');

test('the site builds', { skip }, () => { assert.equal(build.status, 0, build.stderr); });

test('existing URLs still resolve and the new pages exist', { skip }, () => {
  for (const p of ['index.html', 'manifesto/index.html', 'read/index.html', 'read/sovereign-software-manifesto.md', 'lineage/index.html',
    'lineage/local-first/index.html', 'lineage/free-software/index.html', 'lineage/indieweb/index.html', 'lineage/solid/index.html', 'lineage/permacomputing/index.html',
    'lineage/mydata/index.html', 'lineage/digital-preservation/index.html', 'lineage/ai-governance/index.html', 'lineage/interoperability-and-exit/index.html', 'lineage/design-justice/index.html',
    'directory/index.html', 'evaluator/index.html',
    'directory/beancount-hledger/index.html', 'directory/nixos-guix/index.html', 'escape-hatches/index.html', 'slides/index.html', 'methodology/index.html', 'methodology/sovereign-software-methodology.md', '404.html', 'robots.txt', 'sitemap.xml']) {
    assert.ok(fs.existsSync(path.join(out, p)), p + ' exists');
  }
  for (const e of loadEntries(fw)) assert.ok(fs.existsSync(path.join(out, 'directory', e.id, 'index.html')), 'detail page for ' + e.id);
});

test('built pages show the four principles in the framework order, and the download matches', { skip }, () => {
  for (const p of ['index.html', 'read/index.html', 'methodology/index.html', 'lineage/index.html']) {
    const t = html(p);
    assertOrder(t.slice(t.indexOf('Sovereignty')), NAMES.slice(1), p);
    assert.ok(t.includes('Transparency and Control'), p);
  }
  const md = html('read/sovereign-software-manifesto.md');
  assertOrder(md, NAMES.map((n, i) => '### Principle ' + ORDER[i] + '. ' + n), 'downloadable markdown');
  assert.ok(md.includes(TAGLINE) && md.includes('## Selected References'));
  const visible = html('read/index.html');
  for (const h of md.match(/^## Section \d\d: .+$/gm)) {
    const title = h.replace('## ', '').split(': ').slice(1).join(': ').replace(/&/g, '&amp;');
    assert.ok(visible.includes(title.slice(0, 18)), 'visible page has: ' + h);
  }
});

test('the built site makes no third-party requests', { skip }, () => {
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  for (const f of walk(out)) {
    if (/\.html$/.test(f)) {
      const t = fs.readFileSync(f, 'utf8');
      const loads = t.match(/<(?:script|link|img|iframe|source)\b[^>]*\s(?:src|href)=["']?https?:\/\/[^"'\s>]+/gi) || [];
      const bad = loads.filter((l) => !/rel=["']?canonical/i.test(l) && !/example\.test/.test(l));
      assert.deepEqual(bad, [], path.relative(out, f) + ' loads an external resource');
    }
    if (/\.css$/.test(f)) assert.ok(!/url\(\s*["']?https?:/i.test(fs.readFileSync(f, 'utf8')), path.relative(out, f) + ' loads an external resource');
  }
});

test('only the pages that need scripts load them', { skip }, () => {
  const has = (p, s) => html(p).includes(s);
  assert.ok(has('evaluator/index.html', 'methodology/'), 'the retired /evaluator/ URL redirects to the methodology');
  assert.ok(!has('evaluator/index.html', '/js/'), 'the redirect page ships no script');
  assert.ok(has('directory/index.html', '/js/directory.js') && has('directory/git/index.html', '/js/assessment.js'));
  for (const p of ['index.html', 'read/index.html', 'manifesto/index.html', 'lineage/index.html', 'methodology/index.html', 'escape-hatches/index.html']) assert.ok(!/<script src=/.test(html(p)), p + ' ships no script');
});

test('the methodology page covers the framework and states that there is no score', { skip }, () => {
  const t = html('methodology/index.html');
  for (const h of ['Purpose, scope, and vocabulary', 'Baseline domain preservation profiles', 'The four foundational principles and authority dimensions', 'Fundamental eligibility requirements', 'Principle findings and decision thresholds', 'Overall determination and precedence',
    'Engineering verification procedures', 'Six-stage laboratory execution protocol', 'Evidence, confidence, and publication', 'Worked examples', 'Limits and governance of the methodology']) {
    assert.ok(t.includes(h), 'methodology section: ' + h);
  }
  for (const label of Object.values(fw.determinations.labels)) assert.ok(t.includes(label), 'determination: ' + label);
  assert.ok(t.includes('Does not meet the proposed core standard'));
  assert.ok(t.includes('does not assign a numerical score, weight, tier, seal, or certification'));
  assert.equal((t.match(/<h1[ >]/g) || []).length, 1, 'the methodology has a single h1');
  for (const ex of ['Example A', 'Example B', 'Example C', 'Example D']) assert.ok(t.includes(ex), ex);
});

test('unverified Index entries are not presented as current classifications', { skip }, () => {
  const t = html('directory/index.html');
  assert.ok((t.match(/Insufficient evidence/g) || []).length >= 1);
  assert.ok(!t.includes('legacy_tier') && !t.includes('legacy_label') && !t.includes('Legacy v1 tier'), 'no legacy tier fields remain');
  assert.ok(!/dir-b-meets_core|dir-b-partially_aligned|dir-b-fails_fundamental/.test(t.replace(/\.dir-b-[a-z_]+[^{]*\{[^}]*\}/g, '')), 'no entry carries a determination badge');
  const gitPage = html('directory/git/index.html');
  assert.ok(gitPage.includes('Insufficient evidence'));
});

test('resolved evidence appears on all thirty updated application assessment pages', { skip }, () => {
  const additionalClosures = loadLedgers(root).flatMap(l => l.applications).reduce((counts, a) => { counts[a.id] = (counts[a.id] || 0) + (a.findings || []).length; return counts; }, {});
  const assessmentDates = Object.fromEntries(loadEntries(fw).map(e => [e.id, e.assessment_date]));
  const batch3Counts = { gitea: 2, forgejo: 2, 'paperless-ngx': 3, kopia: 2, restic: 3, borgbackup: 3 };
  const batch4Counts = { calibre: 2, audacity: 2, ardour: 2, 'musescore-studio': 2, 'zim-wiki': 3, taskwarrior: 3 };
  const batch5Counts = { blender: 2, inkscape: 2, krita: 2, gimp: 2, kicad: 2, openscad: 2 };
  for (const id of ['anki', 'joplin', 'actual-budget', 'qgis', 'freecad', 'zotero', 'cadquery', 'darktable', 'jabref', 'gnu-octave', 'kdenlive', 'keepassxc', 'gitea', 'forgejo', 'paperless-ngx', 'kopia', 'restic', 'borgbackup', 'calibre', 'audacity', 'ardour', 'musescore-studio', 'zim-wiki', 'taskwarrior', 'blender', 'inkscape', 'krita', 'gimp', 'kicad', 'openscad']) {
    const page = html('directory/' + id + '/index.html');
    assert.ok(page.includes('Assessment findings and remaining work'), id + ' shows recorded findings');
    assert.ok(page.includes('Resolved:') && page.includes('Open:'), id + ' shows resolved and remaining gaps');
    if (batch3Counts[id]) assert.equal((page.match(/Resolved:/g) || []).length, batch3Counts[id] + (additionalClosures[id] || 0), id + ' renders historical and additional closures');
    if (batch4Counts[id]) assert.equal((page.match(/Resolved:/g) || []).length, batch4Counts[id] + (additionalClosures[id] || 0), id + ' renders historical and additional batch 4 closures');
    if (batch5Counts[id]) assert.equal((page.match(/Resolved:/g) || []).length, batch5Counts[id] + (additionalClosures[id] || 0), id + ' renders historical and additional batch 5 closures');
    assert.ok(page.includes(assessmentDates[id]) && /(?:github\.com\/[^\s"<>]+\/blob|codeberg\.org\/[^\s"<>]+\/src\/commit|gitlab\.com\/[^\s"<>]+\/-\/blob)\/[a-f0-9]{40}\//.test(page), id + ' includes dated pinned evidence');
    assert.ok(!page.includes('Candidate, not yet assessed.'), id + ' is not presented as only a plan');
  }
});

test.after(() => { fs.rmSync(out, { recursive: true, force: true }); });

test('the remaining 38 reviews record 77 bounded closures in actual assessment evidence', { skip }, () => {
  const inventory = JSON.parse(read('evidence/third-pass/remaining-review-findings.json'));
  const reconciliation = { applications: loadLedgers(root).flatMap(l => l.applications) };
  const entries = Object.fromEntries(loadEntries(fw).map(e => [e.id, e]));
  assert.equal(inventory.applications.length, 38);
  assert.equal(new Set(inventory.applications.map(a => a.id)).size, 38);
  assert.equal(inventory.applications.reduce((n, a) => n + a.findings.length, 0), 77);
  for (const app of inventory.applications) {
    const page = html('directory/' + app.id + '/index.html');
    const source = read('content/directory/' + app.id + '.md');
    const note = read('evidence/doc-reviews/' + app.id + '.md');
    assert.equal((page.match(/Resolved:/g) || []).length, app.findings.length, app.id);
    assert.ok(page.includes('Open:') && page.includes(entries[app.id].assessment_date), app.id);
    const updated = reconciliation.applications.findLast(a => a.id === app.id);
    const remaining = updated ? updated.remaining : app.open;
    assert.ok(source.includes(remaining) && note.includes(remaining), app.id + ' preserves current remaining work');
    assert.ok(note.includes('batch-' + app.batch + '/README.md#' + app.id));
    for (const finding of app.findings) {
      assert.ok(entries[app.id].evidence.some(e => e.target === finding.target && e.text === finding.text && e.url === finding.url), app.id + ' actual evidence matches closure');
      assert.ok(page.includes(finding.url.replaceAll('&', '&amp;')), app.id + ' renders source');
      assert.ok(note.includes(finding.text), app.id + ' review matches closure');
    }
  }
});

test('changes from the historical rating baseline are individually recorded', () => {
  const baseline = JSON.parse(read('evidence/third-pass/deferred-ratings-baseline.json'));
  const ledger = { field_changes: loadLedgers(root).flatMap(l => l.field_changes) };
  assert.equal(baseline.applications.length, 38);
  for (const app of baseline.applications) {
    const source = read('content/directory/' + app.id + '.md').replace(/\r\n/g, '\n');
    for (const table of ['eligibility', 'principles']) {
      let expected = app[table];
      for (const change of ledger.field_changes.filter(c => c.id === app.id && c.table === table)) {
        const line = new RegExp('^' + change.key + ' = ([^\\n]*)\\n?', 'm');
        const old = expected.match(line);
        assert.equal(old ? JSON.parse(old[1]) : null, change.before, app.id + ' recorded previous value');
        expected = expected.replace(line, change.after === null ? '' : change.key + ' = ' + JSON.stringify(change.after) + '\n');
      }
      assert.equal(source.match(new RegExp('\\[' + table + '\\]([\\s\\S]*?)(?=\\n\\[)'))[0], expected, app.id + ' changes need an explicit ledger entry');
    }
  }
});

test('all raw requirement values are valid and no rendered criterion cell is blank', { skip }, () => {
  const { parseToml } = require('../scripts/entries.js');
  for (const entry of loadEntries(fw)) {
    const source = read('content/directory/' + entry.id + '.md');
    const raw = parseToml(source.split('+++')[1], entry.id);
    for (const [key, value] of Object.entries(raw.eligibility || {})) {
      assert.ok(fw.eligibilityStatuses.some(s => s.id === value), entry.id + ' ' + key + ': ' + value);
    }
    for (const value of Object.values(raw.principles || {})) assert.ok(fw.findingLevels.some(s => s.id === value), entry.id);
    const page = html('directory/' + entry.id + '/index.html');
    const area = page.slice(page.indexOf('4. Principle profile'), page.indexOf('6. Evidence and verification'));
    assert.equal((area.match(/<tr>/g) || []).length, 11, entry.id + ' four principles, five requirements, two headers');
    assert.ok(!/<td>\s*<\/td>/.test(area), entry.id + ' has a blank finding');
  }
});

test('batch 1 ratings, declared limits, evidence and actual pages agree', { skip }, () => {
  const ledger = JSON.parse(read('evidence/rating-reconciliation/batch-1/decisions.json'));
  const entries = Object.fromEntries(loadEntries(fw).map(e => [e.id, e]));
  const engine = require('../static/js/assessment.js');
  assert.equal(ledger.applications.length, 6);
  assert.equal(ledger.schema_repairs.length, 46);
  assert.equal(new Set(ledger.schema_repairs.map(r => r.id)).size, 32);
  const { parseToml } = require('../scripts/entries.js');
  for (const change of ledger.field_changes) {
    const raw = parseToml(read('content/directory/' + change.id + '.md').split('+++')[1], change.id);
    assert.equal(raw[change.table][change.key] === undefined ? null : raw[change.table][change.key], change.after, change.id + ' final change-ledger value');
    assert.ok(change.reason);
  }
  for (const app of ledger.applications) {
    const entry = entries[app.id];
    assert.equal(entry.eligibility.independent_recoverability, app.E3[0]);
    assert.equal(entry.eligibility.consequential_oversight, app.E5[0]);
    assert.equal(entry.principles.longevity, app.longevity[0]);
    assert.equal(entry.principles.transparency, app.transparency[0]);
    for (const target of ['E3', 'E5', 'longevity', 'transparency']) {
      assert.ok(entry.evidence.some(e => e.target === target && e.text === app[target][1]), app.id + ' decision evidence');
    }
    const result = engine.computeResult(fw, engine.assessmentFromEntry(fw, entry));
    assert.deepEqual(result.inconsistencies, [], app.id + ' reconciled E3/E5 pairing');
    assert.ok(html('directory/' + app.id + '/index.html').includes('Rating reconciliation: 23 October 2026'));
  }
  const git = engine.computeResult(fw, engine.assessmentFromEntry(fw, entries.git));
  const sqlite = engine.computeResult(fw, engine.assessmentFromEntry(fw, entries.sqlite));
  assert.equal(git.determination.id, 'partially_aligned');
  assert.equal(sqlite.determination.id, 'insufficient_evidence');
  assert.ok(sqlite.eligibility.unverified.includes('E2'));
});

test('rating-batch runtime checks and retained material match their declared plan', () => {
  const base = 'evidence/rating-reconciliation/batch-1/';
  const result = JSON.parse(read(base + 'runtime-results.json'));
  const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
  assert.equal(result.plan_sha256, hash(base + 'plan.json'));
  assert.equal(result.runner_sha256, hash(base + 'check_runtime.py'));
  assert.equal(result.installation_performed, false);
  assert.ok(Object.values(result.git.checks).every(Boolean));
  assert.ok(Object.values(result.sqlite.checks).every(Boolean));
  for (const artifact of result.artifacts) assert.equal(artifact.sha256, hash(base + artifact.path));
});

test('remaining-batch retained inputs match their plans, hashes and pinned Git objects', () => {
  for (let batch = 6; batch <= 12; batch++) {
    const base = 'evidence/third-pass/batch-' + batch + '/';
    const plan = JSON.parse(read(base + 'inspection-plan.json'));
    const result = JSON.parse(read(base + 'artifact-results.json'));
    assert.equal(result.inputs.length, plan.inputs.length);
    assert.equal(result.downloaded_application_implementation_executed, false);
    assert.equal(result.inspection_code_sha256, crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'evidence/third-pass/inspect_remaining.py'))).digest('hex'));
    assert.equal(result.published_schema_ddl_executed, plan.inputs.some(i => i.probe === 'sql-schema'));
    if (plan.available_tool_experiments) {
      assert.equal(result.runtime_check_code_sha256, crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'evidence/third-pass/remaining_runtime_checks.py'))).digest('hex'));
    }
    for (const item of result.inputs) {
      const bytes = fs.readFileSync(path.join(root, base, item.local_path));
      assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), item.sha256, item.local_path);
      if (item.git_blob_sha) {
        const hash = crypto.createHash('sha1').update('blob ' + bytes.length + '\0').update(bytes).digest('hex');
        assert.equal(hash, item.git_blob_sha, item.local_path);
      }
      assert.ok(plan.inputs.some(p => p.application === item.application && p.path === item.path && p.raw_url === item.raw_url));
    }
  }
});

test('the maintainer loader and the Hugo template agree on every entry', { skip }, () => {
  const page = html('directory/index.html');
  const m = page.match(/window\.SOVEREIGN_DIRECTORY = (\[[\s\S]*?\]);<\/script>/);
  assert.ok(m, 'the Index embeds its entries');
  const built = JSON.parse(m[1]).sort((a, b) => a.id.localeCompare(b.id));
  const loaded = loadEntries(fw);
  assert.equal(built.length, loaded.length);
  built.forEach((b, i) => assert.deepEqual(b, JSON.parse(JSON.stringify(Object.assign({}, loaded[i], { assessment_notes: b.assessment_notes }))), b.id));
});

test('retired Index claims stay retired and split entries are separate', () => {
  const entries = loadEntries(fw);
  const ids = entries.map((e) => e.id);
  for (const id of ['beancount', 'hledger', 'nixos', 'guix']) assert.ok(ids.includes(id), id + ' has its own entry');
  assert.ok(!ids.includes('beancount-hledger') && !ids.includes('nixos-guix'));
  const text = entries.map((e) => [e.summary, ...(e.limitations || [])].join(' ')).join('\n');
  for (const gone of ['identical meshes', 'Archive Invariant', 'slow start', 'not plain text']) assert.ok(!text.includes(gone), 'retired wording: ' + gone);
  const byId = Object.fromEntries(entries.map((e) => [e.id, e]));
  assert.match(byId.syncthing.summary, /not backup/);
  assert.ok(entries.filter((e) => e.pilot_stage).length === 27, 'all 27 desk-reviewed products carry a pilot stage');
});


test('every completed rating batch agrees with actual assessments and recorded history', { skip }, () => {
  const result = auditReviewed(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.reviewed.length, 68);
  assert.equal(result.unreviewed.length, 0);
  assert.equal(result.batches, 12);
  const ledgers = loadLedgers(root);
  const entries = Object.fromEntries(loadEntries(fw).map(e => [e.id, e]));
  const latest = new Map(ledgers.flatMap(l => l.applications.map(a => [a.id, { ...a, review_date: l.review_date }])));
  for (const app of latest.values()) {
    const page = html('directory/' + app.id + '/index.html');
    const note = read('evidence/doc-reviews/' + app.id + '.md');
    const reviewed = new Date(app.review_date + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
    assert.ok(page.includes('Rating reconciliation: ' + reviewed));
    for (const finding of app.findings || []) {
      assert.ok(entries[app.id].evidence.some(e => e.target === finding.target && e.text === finding.text && e.url === finding.url));
      assert.ok(note.includes(finding.text));
      assert.ok(page.includes(finding.url.replaceAll('&', '&amp;')));
    }
  }
  const cli = spawnSync(process.execPath, ['scripts/rating-audit.js'], { cwd: root, encoding: 'utf8' });
  assert.equal(cli.status, 0, cli.stderr);
  assert.match(cli.stdout, /68 targeted reconciliations.*0 pending/);
});

test('rating batch 2 pinned sources, manual locators and independent fixture observations are reproducible', () => {
  const base = 'evidence/rating-reconciliation/batch-2/';
  const result = JSON.parse(read(base + 'inspection-results.json'));
  const ledger = JSON.parse(read(base + 'decisions.json'));
  const plan = JSON.parse(read(base + 'inspection-plan.json'));
  const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
  for (const [key, file] of [['plan_sha256', 'plan.json'], ['inspection_plan_sha256', 'inspection-plan.json'], ['runner_sha256', 'inspect_evidence.py']]) assert.equal(result[key], hash(base + file));
  assert.equal(result.applications_installed_or_executed, false);
  assert.equal(result.upstream_test_suites_executed, false);
  assert.equal(result.inputs.length, plan.inputs.length);
  assert.equal(result.retained_backup_sources.length, 15);
  for (const item of result.inputs) {
    const bytes = fs.readFileSync(path.join(root, base, item.local_path));
    assert.equal(hash(base + item.local_path), item.sha256);
    assert.equal(crypto.createHash('sha1').update('blob ' + bytes.length + String.fromCharCode(0)).update(bytes).digest('hex'), item.git_blob_sha);
    assert.ok(plan.inputs.some(i => i.application === item.application && i.path === item.path && i.git_blob_sha === item.git_blob_sha));
  }
  for (const item of result.fixtures.concat(result.retained_backup_sources)) assert.equal(hash(item.local_path), item.sha256);
  assert.equal(ledger.applications.reduce((n, a) => n + a.findings.length, 0), 8);
  for (const app of ledger.applications) for (const finding of app.findings) {
    const source = read(base + 'inputs/' + app.id + '/' + finding.path);
    for (const locator of finding.locators) assert.ok(source.includes(locator), app.id + ': manual-source locator, not an executed behavior test');
    for (const support of finding.supporting_sources || []) {
      const secondary = read(base + 'inputs/' + app.id + '/' + support.path);
      for (const locator of support.locators) assert.ok(secondary.includes(locator), app.id + ': complementary source locator');
    }
  }
  const anki = result.fixtures.find(f => f.application === 'anki').inspection;
  assert.equal(anki.integrity_check, 'ok');
  assert.equal(anki.notes, 1);
  assert.equal(anki.cards, 1);
  assert.equal(anki.joined_card_note_rows.length, 1);
  assert.equal(anki.all_sound_references_mapped, true);
  assert.equal(anki.media[0].bytes, 4);
  const zotero = result.fixtures.find(f => f.application === 'zotero').inspection;
  assert.equal(zotero.integrity_check, 'ok');
  assert.ok(Object.values(zotero.selected_counts).every(n => n === 0));
});

test('the rating audit detects decision drift and unsupported positive findings in an isolated fixture', () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'sovereign-rating-audit-'));
  try {
    for (const dir of ['data', 'content/directory', 'evidence/doc-reviews', 'evidence/rating-reconciliation/batch-2']) fs.mkdirSync(path.join(fixture, dir), { recursive: true });
    for (const file of ['data/framework.json', 'content/directory/anki.md', 'evidence/doc-reviews/anki.md']) fs.copyFileSync(path.join(root, file), path.join(fixture, file));
    const source = read('content/directory/anki.md');
    const ledger = JSON.parse(read('evidence/rating-reconciliation/batch-2/decisions.json'));
    ledger.applications = ledger.applications.filter(a => a.id === 'anki');
    ledger.field_changes = ledger.field_changes.filter(c => c.id === 'anki');
    fs.writeFileSync(path.join(fixture, 'evidence/rating-reconciliation/batch-2/decisions.json'), JSON.stringify(ledger));
    assert.deepEqual(auditReviewed(fixture).errors, []);
    const entryPath = path.join(fixture, 'content/directory/anki.md');
    fs.writeFileSync(entryPath, source.replace('consequential_oversight = "not_verified"', 'consequential_oversight = "pass"'));
    assert.ok(auditReviewed(fixture).errors.some(e => e.includes('anki/E5: decision differs')));
    fs.writeFileSync(entryPath, source.replace('[principles]', '[principles]\ntransparency = "meets"'));
    assert.ok(auditReviewed(fixture).errors.some(e => e.includes('E5 is Not Verified') && e.includes('positive finding')));
    fs.writeFileSync(entryPath, source.replace('practical_exit = "not_verified"', 'practical_exit = "pass"'));
    assert.ok(auditReviewed(fixture).errors.some(e => e.includes('anki/eligibility/practical_exit: current field differs')));
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});

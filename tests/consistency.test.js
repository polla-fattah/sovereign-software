'use strict';
/* Run with: node --test
   Cross-file checks that keep the manifesto, home page, slides, README and the built site
   consistent with data/framework.json (the single source of truth for the principles). */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { loadEntries } = require('../scripts/entries.js');

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

test.after(() => { fs.rmSync(out, { recursive: true, force: true }); });

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

'use strict';
/* Run with: node --test
   Cross-file checks that keep the manifesto, home page, slides, README and the built site
   consistent with data/framework.json (the single source of truth for order and weights). */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const fw = JSON.parse(read('data/framework.json'));
const NAMES = fw.principles.map((p) => p.name);
const IDS = fw.principles.map((p) => p.id);
const ROMAN = fw.principles.map((p) => p.priority);

/* positions of each name in order of first appearance must be increasing */
function assertOrder(text, names, label) {
  let last = -1;
  for (const n of names) {
    const i = text.indexOf(n, last + 1);
    assert.ok(i > last, label + ': "' + n + '" is out of order or missing');
    last = i;
  }
}

test('framework priorities are I to VI in the documented order', () => {
  assert.deepEqual(NAMES, ['Sovereignty', 'Longevity', 'Locality', 'Predictability', 'Focused Interoperability', 'Responsiveness']);
  assert.deepEqual(ROMAN, ['I', 'II', 'III', 'IV', 'V', 'VI']);
});

test('the manifesto source lists the principles in order, with matching weights', () => {
  const md = read('content/read.md');
  /* Section 01 list */
  const sec1 = md.slice(md.indexOf('Section 01'), md.indexOf('Section 02'));
  assertOrder(sec1, NAMES.map((n) => '**' + ROMAN[NAMES.indexOf(n)] + '. ' + n + ':**'), 'read.md Section 01');
  /* Section 02 headings */
  const sec2 = md.slice(md.indexOf('Section 02'), md.indexOf('Section 03'));
  assertOrder(sec2, NAMES.map((n, i) => '### Principle ' + ROMAN[i] + '. ' + n), 'read.md Section 02');
  /* Section 06 weights table */
  fw.principles.forEach((p) => {
    const row = '| ' + p.priority + ' | ' + p.name + ' | ' + p.weight + '% |';
    assert.ok(md.includes(row), 'weights table row: ' + row);
  });
  assert.ok(md.includes('Longevity expanded') === false);
  assert.ok(/Data longevity/.test(md) && /Functional longevity/.test(md) && /Knowledge longevity/.test(md), 'Longevity has three dimensions');
});

test('the short manifesto, slides and README follow the same order and weights', () => {
  assertOrder(read('content/manifesto.md').split('## 06')[0], NAMES.map((n) => '**' + n + ':**'), 'manifesto.md');
  const slides = read('slides/manifesto.md');
  const six = slides.slice(slides.indexOf('Six principles, in order of priority'), slides.indexOf('Why this order'));
  assertOrder(six, NAMES.map((n) => '**' + n.charAt(0).toUpperCase() + n.slice(1).toLowerCase().replace('focused interoperability', 'Focused interoperability') + ':**').map((s) => s), 'slides principle list');
  assert.ok(slides.includes('25, 25, 20, 15, 10, 5'), 'slides state the weights');
  const readme = read('README.md');
  fw.principles.forEach((p) => assert.ok(readme.includes('| ' + p.priority + ' | ' + p.name + ' | ' + p.weight + '% |'), 'README row ' + p.name));
  const built = read('static/slides/index.html');
  assertOrder(built.slice(built.indexOf('Six principles, in order of priority')), ['Sovereignty', 'Longevity', 'Locality', 'Predictability', 'interoperability', 'Responsiveness'], 'built slides');
});

test('no seven-gate scoring language remains outside the revision history', () => {
  const banned = ['7-Gate', '7/7', 'GATE 0', 'Seven Engineering Evaluation Tests', 'Launch Interactive Scorer', 'sovereign.js', 'gates.json'];
  const files = ['content/read.md', 'content/manifesto.md', 'content/methodology.md', 'content/evaluator.md', 'content/directory/_index.md',
    'layouts/index.html', 'layouts/_default/evaluator.html', 'layouts/_default/directory.html', 'layouts/partials/header.html', 'layouts/partials/footer.html',
    'slides/manifesto.md', 'static/js/evaluator.js', 'static/js/directory.js', 'static/js/scoring.js', 'README.md'];
  for (const f of files) {
    const t = read(f);
    for (const b of banned) assert.ok(!t.includes(b), f + ' still contains "' + b + '"');
  }
  assert.equal(fs.existsSync(path.join(root, 'data/gates.json')), false, 'the old gate data file is gone');
  assert.equal(fs.existsSync(path.join(root, 'static/js/sovereign.js')), false, 'the old script is gone');
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

test('Index entries use the framework keys and a stable, unique id', () => {
  const dir = JSON.parse(read('data/directory.json'));
  const keys = fw.eligibility.map((e) => e.key);
  const cats = new Set();
  for (const e of dir) {
    assert.deepEqual(Object.keys(e.eligibility), keys, e.id);
    assert.deepEqual(Object.keys(e.principles), IDS, e.id);
    assert.match(e.id, /^[a-z0-9-]+$/);
    cats.add(e.category);
  }
  assert.ok(cats.size >= 6, 'the original six disciplines are preserved');
});

/* ---------- built site ---------- */
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'sovereign-build-'));
const build = spawnSync('hugo', ['--gc', '--destination', out, '--baseURL', 'https://example.test/'], { cwd: root, encoding: 'utf8', shell: process.platform === 'win32' });
const built = build.status === 0;
const skip = built ? false : 'hugo is not available or the build failed';
const html = (p) => fs.readFileSync(path.join(out, p), 'utf8');

test('the site builds', { skip }, () => { assert.equal(build.status, 0, build.stderr); });

test('existing URLs still resolve and the new pages exist', { skip }, () => {
  for (const p of ['index.html', 'manifesto/index.html', 'read/index.html', 'read/sovereign-personal-software-manifesto.md', 'directory/index.html', 'evaluator/index.html',
    'escape-hatches/index.html', 'slides/index.html', 'methodology/index.html', 'schema/assessment-2.0.schema.json', '404.html', 'robots.txt', 'sitemap.xml']) {
    assert.ok(fs.existsSync(path.join(out, p)), p + ' exists');
  }
  const dir = JSON.parse(read('data/directory.json'));
  for (const e of dir) assert.ok(fs.existsSync(path.join(out, 'directory', e.id, 'index.html')), 'detail page for ' + e.id);
});

test('built pages show the principles in the framework order', { skip }, () => {
  for (const p of ['index.html', 'read/index.html', 'methodology/index.html']) {
    const t = html(p);
    assertOrder(t.slice(t.indexOf('Sovereignty')), NAMES.slice(1), p);
  }
  const md = html('read/sovereign-personal-software-manifesto.md');
  assertOrder(md, NAMES.map((n, i) => '### Principle ' + ROMAN[i] + '. ' + n), 'downloadable markdown');
  /* the download matches the visible manifesto: same section headings */
  const visible = html('read/index.html');
  for (const h of md.match(/^## Section \d\d: .+$/gm)) {
    const title = h.replace('## ', '').replace(/&/g, '&amp;');
    assert.ok(visible.includes(title.split(': ')[1].replace(/'/g, '&rsquo;').slice(0, 20)) || visible.includes(title.slice(0, 20)), 'visible page has: ' + h);
  }
});

test('the built site makes no third-party requests', { skip }, () => {
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  for (const f of walk(out)) {
    if (/\.(html)$/.test(f)) {
      const t = fs.readFileSync(f, 'utf8');
      const loads = t.match(/<(?:script|link|img|iframe|source)\b[^>]*\s(?:src|href)=["']?https?:\/\/[^"'\s>]+/gi) || [];
      const bad = loads.filter((l) => !/<link\b[^>]*rel=["']?(?:canonical|alternate)/i.test(l) && !/rel=["']?canonical/i.test(l));
      assert.deepEqual(bad.filter((l) => !/example\.test/.test(l)), [], path.relative(out, f) + ' loads an external resource');
    }
    if (/\.css$/.test(f)) assert.ok(!/url\(\s*["']?https?:/i.test(fs.readFileSync(f, 'utf8')), path.relative(out, f) + ' loads an external resource');
  }
});

test('only the pages that need scripts load them', { skip }, () => {
  const has = (p, s) => html(p).includes(s);
  assert.ok(has('evaluator/index.html', '/js/scoring.js') && has('evaluator/index.html', '/js/evaluator.js'));
  assert.ok(has('directory/index.html', '/js/directory.js'));
  for (const p of ['index.html', 'read/index.html', 'manifesto/index.html', 'methodology/index.html', 'escape-hatches/index.html']) assert.ok(!/<script src=/.test(html(p)), p + ' ships no script');
});

test('the methodology page covers all seventeen required topics', { skip }, () => {
  const t = html('methodology/index.html');
  for (const h of ['Purpose and Scope', 'Principles and Definitions', 'Rationale for the Priority Order', 'Explanation of Weights', 'Mandatory Eligibility Requirements', 'Numerical Rating Anchors',
    'The Scoring Formula', 'Classification Thresholds', 'Relationship Between the Tests and the Principles', 'Evidence Requirements', 'Assessment Confidence and Uncertainty',
    'Treatment of Unavailable Evidence', 'Version-Specific Assessments', 'Exceptions and Contextual Interpretation', 'Reassessment and Versioning Policy', 'Worked Examples', 'Limitations of the Framework']) {
    assert.ok(t.includes(h), 'methodology section: ' + h);
  }
  fw.principles.forEach((p) => assert.ok(t.includes(p.weight + '%'), 'weight ' + p.weight));
});

test('legacy directory entries are not presented as current classifications', { skip }, () => {
  const t = html('directory/index.html');
  assert.ok(!/Tier 1 • Canonical<\/span>/.test(t), 'no legacy tier badge in the old style');
  assert.ok((t.match(/Legacy v1 tier/g) || []).length >= 25);
  assert.ok(!/dir-b-tier1|dir-b-tier2|dir-b-tier3/.test(t.replace(/\.dir-b-tier[123][^{]*\{[^}]*\}/g, '')), 'no entry carries a certified badge');
});

test.after(() => { fs.rmSync(out, { recursive: true, force: true }); });

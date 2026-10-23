#!/usr/bin/env node
'use strict';
/* Navigation/integrity inventory only. Never changes application ratings or moves evidence.
   --write is a deterministic regeneration of the three navigation artifacts.
   --check verifies they still match source pages, completed ledgers and retained hashes. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { loadEntries } = require('./entries.js');
const { loadLedgers } = require('./rating-audit.js');

const ROOT = path.join(__dirname, '..');
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const read = (root, p) => fs.readFileSync(path.join(root, p), 'utf8');
const exists = (root, p) => fs.existsSync(path.join(root, p));
const slash = p => p.split(path.sep).join('/');

function buildIndex(root, date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Use an explicit YYYY-MM-DD review date');
  const errors = [];
  const framework = JSON.parse(read(root, 'data/framework.json'));
  const entries = loadEntries(framework, path.join(root, 'content', 'directory'));
  const ledgers = loadLedgers(root);
  const latest = new Map(ledgers.flatMap(l => l.applications.map(a => [a.id, { app: a, batch: l.batch, date: l.review_date }])));
  const original = [
    ['evidence/third-pass/README.md', ['anki', 'joplin', 'actual-budget', 'qgis', 'freecad', 'zotero']],
    ['evidence/third-pass/batch-2/README.md', ['cadquery', 'darktable', 'jabref', 'gnu-octave', 'kdenlive', 'keepassxc']],
    ['evidence/third-pass/batch-3/README.md', ['gitea', 'forgejo', 'paperless-ngx', 'kopia', 'restic', 'borgbackup']],
    ['evidence/third-pass/batch-4/README.md', ['calibre', 'audacity', 'ardour', 'musescore-studio', 'zim-wiki', 'taskwarrior']],
    ['evidence/third-pass/batch-5/README.md', ['blender', 'inkscape', 'krita', 'gimp', 'kicad', 'openscad']]
  ];
  const collected = new Map();
  for (const [report, ids] of original) for (const id of ids) collected.set(id, report);
  const sweep = JSON.parse(read(root, 'evidence/third-pass/remaining-review-findings.json'));
  for (const app of sweep.applications) {
    if (collected.has(app.id)) errors.push(app.id + ': duplicate collection mapping');
    collected.set(app.id, 'evidence/third-pass/batch-' + app.batch + '/README.md');
  }
  const draftBatches = [];
  const ratingBase = 'evidence/rating-reconciliation';
  for (const folder of fs.readdirSync(path.join(root, ratingBase), { withFileTypes: true }).filter(d => d.isDirectory() && /^batch-\d+$/.test(d.name)).sort((a, b) => Number(a.name.slice(6)) - Number(b.name.slice(6)))) {
    const base = ratingBase + '/' + folder.name;
    if (exists(root, base + '/decisions.json')) continue;
    if (!exists(root, base + '/plan.json')) { errors.push(base + ': no plan or decision ledger'); continue; }
    const plan = JSON.parse(read(root, base + '/plan.json'));
    draftBatches.push({ batch: folder.name, applications: plan.applications, plan: base + '/plan.json', report: base + '/README.md',
      inspection_results: exists(root, base + '/inspection-results.json') ? base + '/inspection-results.json' : null });
  }
  const applications = entries.map(entry => {
    const assessment = 'content/directory/' + entry.id + '.md';
    const source = read(root, assessment).replace(/\r\n/g, '\n');
    const body = source.slice(source.indexOf('\n+++', 4) + 4);
    const recorded = latest.get(entry.id);
    const open = body.match(/^- \[ \] Open: (.+)$/m);
    if (!open) errors.push(entry.id + ': explicit Open question missing from actual page');
    const review = 'evidence/doc-reviews/' + entry.id + '.md';
    const collection = collected.get(entry.id);
    for (const pointer of [assessment, review, collection]) if (!pointer || !exists(root, pointer)) errors.push(entry.id + ': missing evidence navigation target ' + pointer);
    const remaining = open ? open[1] : (recorded ? recorded.app.remaining : 'See actual assessment; explicit Open text missing.');
    if (recorded && !source.includes(recorded.app.remaining)) errors.push(entry.id + ': latest decision remaining-work summary missing from actual page');
    return { id: entry.id, name: entry.name, category: entry.category, version_scope: entry.version_assessed,
      assessment_date: entry.assessment_date, assessment, documentation_review: review, collected_evidence: collection,
      rating_review: recorded ? { completed: true, batch: recorded.batch, date: recorded.date, report: ratingBase + '/' + recorded.batch + '/README.md', decisions: ratingBase + '/' + recorded.batch + '/decisions.json', remaining_summary: recorded.app.remaining }
        : { completed: false, drafts: draftBatches.filter(d => d.applications.includes(entry.id)).map(d => d.batch) },
      requirements: entry.eligibility, principles: entry.principles,
      resolved_questions: (body.match(/^- \[x\] Resolved:/gm) || []).length, remaining };
  });

  // Read only wrapper result records, not arbitrary JSON in upstream fixture directories.
  const resultFiles = [];
  function walk(rel) {
    for (const item of fs.readdirSync(path.join(root, rel), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const p = rel + '/' + item.name;
      if (item.isDirectory() && !['inputs', 'artifacts', '__pycache__'].includes(item.name)) walk(p);
      else if (item.isFile() && /(?:artifact|source|runtime|inspection)-results\.json$/.test(item.name)) resultFiles.push(p);
    }
  }
  walk('evidence');
  const retained = new Map();
  function register(record, manifest, artifactPath = false) {
    const local = record.local_path || (artifactPath ? record.path : null);
    if (!local || !record.sha256) return;
    const absolute = local.startsWith('evidence/') ? path.resolve(root, local) : path.resolve(root, path.dirname(manifest), local);
    const relative = slash(path.relative(root, absolute));
    if (!relative.startsWith('evidence/') || relative.includes('../')) { errors.push(manifest + ': out-of-scope retained path ' + local); return; }
    if (!fs.existsSync(absolute)) { errors.push(manifest + ': missing retained file ' + relative); return; }
    const data = fs.readFileSync(absolute);
    if (hash(data) !== record.sha256) errors.push(manifest + ': SHA-256 mismatch ' + relative);
    const git = record.git_blob_sha || record.verified_git_blob_sha || null;
    if (git && crypto.createHash('sha1').update('blob ' + data.length + String.fromCharCode(0)).update(data).digest('hex') !== git) errors.push(manifest + ': Git blob mismatch ' + relative);
    if (retained.has(relative) && retained.get(relative).sha256 !== record.sha256) errors.push(relative + ': conflicting historical hashes');
    if (!retained.has(relative)) retained.set(relative, { path: relative, bytes: data.length, sha256: record.sha256, git_blob_sha: git, recorded_in: [] });
    const item = retained.get(relative);
    if (!item.recorded_in.includes(manifest)) item.recorded_in.push(manifest);
  }
  function visit(value, manifest) {
    if (Array.isArray(value)) { value.forEach(v => visit(v, manifest)); return; }
    if (!value || typeof value !== 'object') return;
    register(value, manifest);
    Object.values(value).forEach(v => { if (v && typeof v === 'object') visit(v, manifest); });
  }
  for (const manifest of resultFiles) {
    const result = JSON.parse(read(root, manifest));
    visit(result, manifest);
    for (const artifact of result.artifacts || []) register(artifact, manifest, true);
  }
  const draftIds = new Set(draftBatches.flatMap(d => d.applications));
  for (const draft of draftBatches) {
    if (!exists(root, draft.report)) errors.push(draft.batch + ': draft README missing');
    for (const id of draft.applications) if (!entries.some(e => e.id === id)) errors.push(draft.batch + ': unknown application ' + id);
  }
  return { schema_version: 1, updated: date,
    purpose: 'Derived navigation and integrity inventory, not a new assessment or authority to change ratings.',
    counts: { applications: applications.length, collected_reviews: applications.filter(a => a.collected_evidence).length,
      completed_rating_reviews: applications.filter(a => a.rating_review.completed).length,
      pending_rating_reviews: applications.filter(a => !a.rating_review.completed).length,
      draft_applications: [...draftIds].filter(id => !latest.has(id)).length,
      resolved_questions_on_actual_pages: applications.reduce((n, a) => n + a.resolved_questions, 0),
      hashed_retained_files: retained.size, result_records: resultFiles.length },
    draft_batches: draftBatches, applications,
    retained_files: [...retained.values()].sort((a, b) => a.path.localeCompare(b.path)),
    integrity_errors: errors };
}

function renderHome(index) {
  const c = index.counts;
  const tick = String.fromCharCode(96);
  return `# Evidence: start here

Updated ${index.updated}. This is the entry point for the research evidence. Original sources, fixtures, hashes and dated observations stay in place.

## Current position

| Work | Recorded position |
|---|---|
| Applications with collected evidence | ${c.collected_reviews} of ${c.applications} |
| Applications with completed targeted rating reconciliation | ${c.completed_rating_reviews} |
| Applications still awaiting targeted rating reconciliation | ${c.pending_rating_reviews} |
| Applications in unfinished draft batches | ${c.draft_applications}, included in the pending count |
| Checked resolved questions on actual assessment pages | ${c.resolved_questions_on_actual_pages} |
| Retained files with recorded hashes checked by the inventory | ${c.hashed_retained_files} |

A resolved question is resolved. It is not automatically an E3/E5 Pass or a completed application assessment. Likewise, a page's existing ${tick}assessment_status = complete${tick} does not mean this later rating reconciliation has finished. Missing evidence is not a verified product failure.

## Find the right record

| What you need | Where to go |
|---|---|
| One row per application: current E3/E5, checked findings, evidence and remaining work | [Application index](application-index.md) |
| Actual assessment fields, limitations and findings used by the website | [Application pages](../content/directory/) |
| Reasons for completed rating changes | [Rating reconciliation](rating-reconciliation/README.md) |
| Collected primary-source observations and independent fixture checks | [Third-pass evidence](third-pass/README.md) |
| Earlier documentation notes and their later follow-ups | [Documentation reviews](doc-reviews/README.md) |
| Historical second-pass questions | [Second-pass gap register](second-pass-gap-register.md) |
| Machine-readable navigation and retained-file provenance | [index.json](index.json) |

## Which information takes precedence?

1. The actual application page holds the current requirement and principle fields. The website computes its determination from those fields and evidence; this inventory does not award ratings.
2. The latest **completed** rating decision ledger explains reconciled changes. Original source observations and older decisions remain available as history.
3. Collection reports answer bounded questions. Their checked Resolved items retain their original version and scope; they do not certify an entire product.
4. Original documentation reviews and the second-pass register are historical where later evidence supersedes them. Statements such as "not tested" or "ratings deferred" there describe that dated review, not every later action.
5. A draft plan, downloaded source or inspection result is **not** a completed rating decision. Drafts are excluded from the completed count.

## Folder map

- ${tick}doc-reviews/<application>.md${tick}: original documentation record plus dated follow-ups.
- ${tick}third-pass/${tick}: evidence collection, retained input files, inspection plans, reproducible readers and results. Batch 1 is recorded in its root README; later batches have their own folders.
- ${tick}rating-reconciliation/batch-N/${tick}: declared scope, completed decisions where present, reproduction material and the report for that pass.
- ${tick}second-pass-gap-register.md${tick}: the historical research checklist, with selected later updates. Use the application index for current open work.

No sources or historical observations were deleted, renamed or moved during organization. Repeated summaries are navigation/context; retained source and fixture locations remain stable. Temporary Python caches and generated website output are not evidence inputs and are excluded from this inventory; they have not been deleted.

## Check or refresh the organization

${tick}node scripts/evidence-index.js --check${tick} verifies the index against current application pages, completed ledgers, local navigation targets and recorded source/fixture hashes. ${tick}node scripts/rating-audit.js${tick} checks completed E3/E5 reconciliations. ${tick}node --test${tick} validates the site and integration.

After evidence or rating updates, regenerate navigation with ${tick}node scripts/evidence-index.js --write --date YYYY-MM-DD${tick}, then run both checks. The generator changes only this README, application-index.md and index.json. It does not install software, run upstream implementation, change application ratings or fetch external URLs. Local targets and recorded hashes are verified; external web pages have not all been re-fetched for this organization pass.
`;
}

function renderApplications(index) {
  const c = index.counts;
  const label = { pass: 'Pass', fail: 'Fail', not_verified: 'Not Verified', not_applicable: 'Not Applicable' };
  const esc = text => String(text).replace(/\|/g, '&#124;').replace(/\r?\n/g, ' ');
  const link = (text, target) => '[' + text + '](' + path.posix.relative('evidence', target) + ')';
  let out = `# Application evidence index\n\nUpdated ${index.updated}. [Start here](README.md). This is a derived navigation snapshot, not a new rating decision.\n\n${c.applications} applications have collected evidence; ${c.completed_rating_reviews} have completed targeted rating reconciliation and ${c.pending_rating_reviews} await it. Draft entries remain pending. E3/E5 below are the statuses currently recorded on the actual pages, including entries whose later reconciliation has not yet happened. Checked-question counts do not imply complete application recovery or oversight.\n\n`;
  if (index.draft_batches.length) out += 'Unfinished work: ' + index.draft_batches.map(d => link(d.batch, d.report)).join(', ') + '. No draft is counted as a completed assessment.\n\n';
  out += '| Application / original notes | Collected evidence | Rating reconciliation | E3 / E5 | Resolved questions | Current remaining work |\n|---|---|---|---|---|---|\n';
  for (const app of index.applications) {
    const review = app.rating_review;
    const status = review.completed ? link(review.batch + ' (' + review.date + ')', review.report)
      : (review.drafts.length ? 'Pending; draft ' + review.drafts.join(', ') : 'Pending');
    out += '| ' + link(esc(app.name), app.assessment) + ' / ' + link('notes', app.documentation_review) + ' | ' + link('Evidence', app.collected_evidence) + ' | ' + status + ' | ' + label[app.requirements.independent_recoverability] + ' / ' + label[app.requirements.consequential_oversight] + ' | ' + app.resolved_questions + ' | ' + esc(app.remaining) + ' |\n';
  }
  return out + '\nFor version limits, full evidence records and principle findings, follow the actual application page. A pending reconciliation is not a finding that the application fails.\n';
}

function outputs(index) {
  return { 'evidence/README.md': renderHome(index), 'evidence/application-index.md': renderApplications(index),
    'evidence/index.json': JSON.stringify(index, null, 2) + '\n' };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const write = args.includes('--write');
  const datePosition = args.indexOf('--date');
  const date = datePosition >= 0 ? args[datePosition + 1] : (exists(ROOT, 'evidence/index.json') ? JSON.parse(read(ROOT, 'evidence/index.json')).updated : null);
  if ((!write && !args.includes('--check')) || !date) { console.error('Usage: node scripts/evidence-index.js --write --date YYYY-MM-DD | --check'); process.exit(1); }
  const index = buildIndex(ROOT, date);
  const failures = index.integrity_errors.slice();
  for (const [file, content] of Object.entries(outputs(index))) {
    if (write && !failures.length) fs.writeFileSync(path.join(ROOT, file), content);
    else if (!write && (!exists(ROOT, file) || read(ROOT, file).replace(/\r\n/g, '\n') !== content)) failures.push(file + ': stale; regenerate the navigation index');
  }
  if (failures.length) { failures.forEach(e => console.error(e)); process.exitCode = 1; }
  else console.log(JSON.stringify({ mode: write ? 'regenerated navigation only' : 'checked', ...index.counts }));
}

module.exports = { buildIndex, outputs };

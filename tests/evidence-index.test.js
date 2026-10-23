'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { buildIndex, outputs } = require('../scripts/evidence-index.js');

const root = path.join(__dirname, '..');
const stored = JSON.parse(fs.readFileSync(path.join(root, 'evidence/index.json'), 'utf8'));

test('the evidence organization is reproducible and covers all applications without upgrading drafts', () => {
  const actual = buildIndex(root, stored.updated);
  assert.deepEqual(actual.integrity_errors, []);
  assert.deepEqual(actual.counts, {
    applications: 68, collected_reviews: 68, completed_rating_reviews: 68,
    pending_rating_reviews: 0, draft_applications: 0,
    resolved_questions_on_actual_pages: 163, hashed_retained_files: 197, result_records: 15
  });
  assert.deepEqual(actual, stored);
  assert.equal(new Set(actual.applications.map(a => a.id)).size, 68);
  for (const [file, content] of Object.entries(outputs(actual))) {
    assert.equal(fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n'), content, file + ' must match the underlying evidence');
  }
  assert.deepEqual(actual.draft_batches, []);
  assert.ok(actual.applications.every(a => a.rating_review.completed));
});

test('the new evidence navigation has no broken local targets and preserves specific open questions', () => {
  const navigation = Object.entries(outputs(stored)).filter(([p]) => p.endsWith('.md'));
  for (const [file, text] of navigation) {
    for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const target = match[1].split('#')[0];
      assert.ok(!/^https?:/i.test(target), 'organization does not depend on re-fetching external pages');
      const resolved = path.resolve(root, path.dirname(file), target);
      assert.ok(fs.existsSync(resolved), file + ' -> ' + target);
    }
  }
  for (const app of stored.applications) {
    const source = fs.readFileSync(path.join(root, app.assessment), 'utf8');
    assert.ok(source.includes('- [ ] Open: ' + app.remaining), app.id + ' retains its individual actual-page open work');
    assert.ok(app.version_scope, app.id + ' retains its version limits');
  }
  const fossil = stored.applications.find(a => a.id === 'fossil');
  assert.match(fossil.remaining, /private\/shunned/);
  assert.notEqual(fossil.remaining, fossil.rating_review.remaining_summary, 'a generic ledger summary must not erase the more specific original questions');
});

test('the evidence-index checker is read-only and confirms retained provenance', () => {
  const before = fs.readFileSync(path.join(root, 'evidence/index.json'), 'utf8');
  const run = spawnSync(process.execPath, ['scripts/evidence-index.js', '--check'], { cwd: root, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  const result = JSON.parse(run.stdout);
  assert.equal(result.hashed_retained_files, 197);
  assert.equal(result.completed_rating_reviews, 68);
  assert.equal(result.pending_rating_reviews, 0);
  assert.equal(result.mode, 'checked');
  assert.equal(fs.readFileSync(path.join(root, 'evidence/index.json'), 'utf8'), before);
  for (const retained of stored.retained_files) {
    assert.ok(retained.recorded_in.length > 0);
    assert.match(retained.sha256, /^[0-9a-f]{64}$/);
    if (retained.git_blob_sha) assert.match(retained.git_blob_sha, /^[0-9a-f]{40}$/);
  }
});


test('a plan and inspection material alone remain an unfinished rating draft', () => {
  const os = require('node:os');
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'sovereign-evidence-draft-'));
  try {
    for (const dir of ['data', 'content/directory', 'evidence/doc-reviews', 'evidence/third-pass', 'evidence/rating-reconciliation/batch-99']) fs.mkdirSync(path.join(fixture, dir), { recursive: true });
    for (const file of ['data/framework.json', 'content/directory/anki.md', 'evidence/doc-reviews/anki.md']) fs.copyFileSync(path.join(root, file), path.join(fixture, file));
    fs.writeFileSync(path.join(fixture, 'evidence/third-pass/README.md'), '# Fixture collection record\n');
    fs.writeFileSync(path.join(fixture, 'evidence/third-pass/remaining-review-findings.json'), JSON.stringify({ applications: [] }));
    fs.writeFileSync(path.join(fixture, 'evidence/rating-reconciliation/batch-99/plan.json'), JSON.stringify({ applications: ['anki'] }));
    fs.writeFileSync(path.join(fixture, 'evidence/rating-reconciliation/batch-99/README.md'), '# Unfinished fixture draft\n');
    const result = buildIndex(fixture, '2026-10-24');
    assert.deepEqual(result.integrity_errors, []);
    assert.equal(result.counts.completed_rating_reviews, 0);
    assert.equal(result.counts.pending_rating_reviews, 1);
    assert.equal(result.counts.draft_applications, 1);
    assert.equal(result.applications[0].rating_review.completed, false);
    assert.deepEqual(result.applications[0].rating_review.drafts, ['batch-99']);
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});

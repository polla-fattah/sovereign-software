'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { loadEntries } = require('../scripts/entries.js');
const { loadLedgers, auditReviewed } = require('../scripts/rating-audit.js');
const root = path.join(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const fw = JSON.parse(read('data/framework.json'));

test('all 56 planned continuation reviews are individual, scoped and integrated without unrelated regrading', () => {
  const plan = JSON.parse(read('evidence/rating-reconciliation/remaining-plan.json'));
  const ledgers = loadLedgers(root).filter(l => Number(l.batch.slice(6)) >= 3);
  const apps = ledgers.flatMap(l => l.applications);
  const entries = Object.fromEntries(loadEntries(fw).map(e => [e.id, e]));
  const expected = plan.sequence.flatMap(b => b.applications);
  assert.equal(plan.total_pending, 56);
  assert.equal(apps.length, 56);
  assert.deepEqual(apps.map(a => a.id), expected, 'the declared individual sequence is preserved');
  assert.equal(new Set(apps.map(a => a.E3[1])).size, 56, 'recovery judgments are application-specific');
  assert.equal(new Set(apps.map(a => a.E5[1])).size, 56, 'oversight judgments are application-specific');
  assert.equal(ledgers.flatMap(l => l.field_changes).length, 189);
  assert.equal(ledgers.flatMap(l => l.field_changes).filter(c => c.key === 'practical_exit').length, 22);
  for (const baseline of plan.baseline) {
    const entry = entries[baseline.id];
    const decision = apps.find(a => a.id === baseline.id);
    assert.equal(decision.reviewed_individually, true);
    assert.equal(entry.version_assessed, baseline.version, baseline.id + ': original version/scope is not narrowed');
    for (const key of ['independent_data_access', 'retained_control']) assert.equal(entry.eligibility[key], baseline.eligibility[key], baseline.id + ': out-of-scope requirement unchanged');
    assert.equal(entry.principles.locality, baseline.principles.locality, baseline.id + ': Locality not silently regraded');
    assert.equal(entry.assessment_date, '2026-10-24');
    assert.ok(decision.remaining && decision.next);
    assert.ok(read('content/directory/' + baseline.id + '.md').includes(decision.next));
    assert.ok(read('evidence/doc-reviews/' + baseline.id + '.md').includes(decision.next));
  }
  const result = auditReviewed(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.reviewed.length, 68);
  assert.equal(result.unreviewed.length, 0);
});

test('the eleven new source answers retain their pinned inputs and manual-review locators', () => {
  const base = 'evidence/rating-reconciliation/batch-3/';
  const ledger = JSON.parse(read(base + 'decisions.json'));
  const inspection = JSON.parse(read(base + 'inspection-results.json'));
  const hash = p => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex');
  assert.equal(inspection.plan_sha256, hash(base + 'plan.json'));
  assert.equal(inspection.inspection_plan_sha256, hash(base + 'inspection-plan.json'));
  assert.equal(inspection.runner_sha256, hash(base + 'inspect_evidence.py'));
  assert.equal(inspection.helper_sha256, hash('evidence/third-pass/batch-4/inspect_artifacts.py'));
  assert.equal(inspection.applications_installed_or_executed, false);
  assert.equal(inspection.upstream_test_suites_executed, false);
  assert.equal(inspection.inputs.length, 13);
  assert.equal(inspection.retained_inputs.length, 21);
  assert.equal(Object.keys(inspection.observations).length, 6);
  const findings = ledger.applications.flatMap(a => a.findings);
  assert.equal(findings.length, 11);
  for (const finding of findings) {
    const file = (finding.retained ? 'evidence/third-pass/batch-4/' : base) + 'inputs/' + finding.application + '/' + finding.path;
    const text = read(file);
    for (const locator of finding.locators) assert.ok(text.includes(locator), finding.application + ': manual provenance locator, not an executed behavior test');
    const recorded = finding.retained ? inspection.retained_inputs.find(i => i.local_path === file)
      : inspection.inputs.find(i => i.application === finding.application && i.path === finding.path);
    assert.ok(recorded, finding.application + ': retained input provenance exists');
    assert.equal(hash(file), recorded.sha256);
  }
});

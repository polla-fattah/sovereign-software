#!/usr/bin/env node
'use strict';
/* Read-only audit of completed, targeted rating reconciliations.
   It checks published source fields and decision evidence, not product behavior.
   Unreviewed entries are reported as backlog, not silently counted as reviewed. */
const fs = require('node:fs');
const path = require('node:path');
const { loadEntries, parseToml } = require('./entries.js');
const engine = require('../static/js/assessment.js');

function loadLedgers(root = path.join(__dirname, '..')) {
  const base = path.join(root, 'evidence', 'rating-reconciliation');
  return fs.readdirSync(base, { withFileTypes: true })
    .filter(d => d.isDirectory() && /^batch-\d+$/.test(d.name) && fs.existsSync(path.join(base, d.name, 'decisions.json')))
    .sort((a, b) => Number(a.name.slice(6)) - Number(b.name.slice(6)))
    .map(d => Object.assign(JSON.parse(fs.readFileSync(path.join(base, d.name, 'decisions.json'), 'utf8')), { batch: d.name }));
}

function auditReviewed(root = path.join(__dirname, '..')) {
  const read = p => fs.readFileSync(path.join(root, p), 'utf8');
  const fw = JSON.parse(read('data/framework.json'));
  const entries = loadEntries(fw, path.join(root, 'content', 'directory'));
  const byId = Object.fromEntries(entries.map(e => [e.id, e]));
  const ledgers = loadLedgers(root);
  const latest = new Map();
  const fields = new Map();
  const errors = [];
  for (const ledger of ledgers) {
    for (const app of ledger.applications) latest.set(app.id, app);
    for (const c of ledger.field_changes) {
      const key = [c.id, c.table, c.key].join('/');
      if (fields.has(key) && fields.get(key).after !== c.before) errors.push(key + ': broken change history');
      if (!c.reason) errors.push(key + ': missing reason');
      fields.set(key, c);
    }
  }
  for (const [key, c] of fields) {
    const raw = parseToml(read('content/directory/' + c.id + '.md').split('+++')[1], c.id);
    const actual = raw[c.table]?.[c.key] ?? null;
    if (actual !== c.after) errors.push(key + ': current field differs from latest decision');
  }
  for (const [id, app] of latest) {
    const e = byId[id];
    if (!e) { errors.push(id + ': missing application'); continue; }
    const expectations = { E3: e.eligibility.independent_recoverability, E5: e.eligibility.consequential_oversight,
      longevity: e.principles.longevity, transparency: e.principles.transparency };
    for (const [target, actual] of Object.entries(expectations)) {
      if (actual !== app[target][0]) errors.push(id + '/' + target + ': decision differs from actual assessment');
      if (!e.evidence.some(item => item.target === target && item.text === app[target][1])) errors.push(id + '/' + target + ': decision evidence missing');
    }
    for (const supporting of app.supporting_evidence || []) {
      if (!e.evidence.some(item => item.target === supporting.target && item.text === supporting.text && item.url === supporting.url)) errors.push(id + ': complementary source evidence missing');
    }
    const result = engine.computeResult(fw, engine.assessmentFromEntry(fw, e));
    errors.push(...result.inconsistencies.map(message => id + ': ' + message));
    if (!read('evidence/doc-reviews/' + id + '.md').includes(app.remaining)) errors.push(id + ': current remaining work missing from review');
  }
  return { reviewed: [...latest.keys()], unreviewed: entries.filter(e => !latest.has(e.id)).map(e => e.id),
    batches: ledgers.length, errors };
}

if (require.main === module) {
  const result = auditReviewed();
  console.log(result.reviewed.length + ' targeted reconciliations across ' + result.batches + ' batches; ' + result.unreviewed.length + ' pending.');
  if (result.errors.length) result.errors.forEach(error => console.error(error));
  else console.log('Recorded E3/E5 decisions, dependent findings, change history and current review notes agree. This is not a product test.');
  process.exitCode = result.errors.length ? 1 : 0;
}

module.exports = { loadLedgers, auditReviewed };

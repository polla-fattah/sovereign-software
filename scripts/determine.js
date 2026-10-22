#!/usr/bin/env node
'use strict';
/* Shows the determination for an Index entry, computed by the same engine the site uses.
   Usage:
     node scripts/determine.js <entry-id>   show one entry in detail
     node scripts/determine.js --all        one line per entry
   Run it after editing data/directory.json to see what the site will publish. */
const fs = require('node:fs');
const path = require('node:path');
const S = require('../static/js/assessment.js');

const root = path.join(__dirname, '..');
const fw = JSON.parse(fs.readFileSync(path.join(root, 'data', 'framework.json'), 'utf8'));
const dir = JSON.parse(fs.readFileSync(path.join(root, 'data', 'directory.json'), 'utf8'));
const arg = process.argv[2];

function result(entry) { return S.computeResult(fw, S.assessmentFromEntry(fw, entry)); }

if (!arg || arg === '--help' || arg === '-h') {
  console.log('Usage: node scripts/determine.js <entry-id> | --all');
  process.exit(arg ? 0 : 1);
}

if (arg === '--all') {
  for (const e of dir) {
    const r = result(e);
    console.log(e.id.padEnd(22) + (e.assessment_status === 'complete' ? 'recorded  ' : 'awaiting  ') + r.determination.label);
  }
  process.exit(0);
}

const entry = dir.find((e) => e.id === arg);
if (!entry) {
  console.error('No entry with id "' + arg + '". Known ids: ' + dir.map((e) => e.id).join(', '));
  process.exit(1);
}
const r = result(entry);
console.log(entry.name + ' (' + entry.assessment_status + ', framework ' + fw.version + ' ' + fw.status + ')');
console.log('Determination: ' + r.determination.label);
r.determination.reasons.forEach((x) => console.log('  - ' + x));
console.log('Fundamental requirements: ' + r.eligibility.verdict);
r.eligibility.detail.forEach((d) => console.log('  ' + d.id + ' ' + d.title + ': ' + d.status + (d.reason ? ' (' + d.reason + ')' : '')));
console.log('Principle profile (' + r.assessedCount + ' of ' + r.totalPrinciples + ' assessed):');
r.profile.forEach((c) => console.log('  ' + c.order + '. ' + c.name + ': ' + c.findingLabel + ' | confidence ' + (c.confidence || 'not stated') + ' | observations ' + (c.hasEvidence ? 'recorded' : 'missing')));
r.warnings.forEach((w) => console.log('Warning: ' + w));
r.weaknesses.forEach((w) => console.log('To improve: ' + w.name + ' (' + w.findingLabel.toLowerCase() + '): ' + w.recommendation));

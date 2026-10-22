'use strict';
/* Reads the Index entries from content/directory/*.md and returns them in the shape the
   assessment engine expects. It parses only the TOML subset the entries use: strings, integers,
   arrays of strings, [tables], and [[arrays of tables]]. Anything left out of the front
   matter is "not assessed", exactly as in layouts/partials/directory-entry.html. */
const fs = require('node:fs');
const path = require('node:path');

const dir = path.join(__dirname, '..', 'content', 'directory');

function value(raw, where) {
  const v = raw.trim();
  if (v[0] === '"' || v[0] === '[') {
    try { return JSON.parse(v); } catch (e) { throw new Error(where + ': unsupported value ' + v); }
  }
  if (/^-?\d+$/.test(v)) return Number(v);
  throw new Error(where + ': unsupported value ' + v);
}

function parseToml(text, where) {
  const out = {};
  let table = out;
  text.split(/\r?\n/).forEach((line, i) => {
    const s = line.trim();
    if (!s || s[0] === '#') return;
    let m;
    if ((m = s.match(/^\[\[([A-Za-z0-9_]+)\]\]$/))) { (out[m[1]] = out[m[1]] || []).push((table = {})); return; }
    if ((m = s.match(/^\[([A-Za-z0-9_]+)\]$/))) { table = out[m[1]] = {}; return; }
    if ((m = s.match(/^([A-Za-z0-9_]+)\s*=\s*(.+)$/))) { table[m[1]] = value(m[2], where + ':' + (i + 1)); return; }
    throw new Error(where + ':' + (i + 1) + ': cannot parse "' + s + '"');
  });
  return out;
}

function frontMatter(file) {
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+/);
  if (!m) throw new Error(path.basename(file) + ': TOML front matter (+++) is required');
  return parseToml(m[1], path.basename(file));
}

function normalise(id, p, fw) {
  const complete = p.assessment_status === 'complete';
  const elig = {};
  fw.eligibility.forEach((e) => { elig[e.key] = (p.eligibility && p.eligibility[e.key]) || 'not_verified'; });
  const prin = {};
  fw.principles.forEach((x) => { prin[x.id] = (p.principles && p.principles[x.id]) || null; });
  return {
    id, name: p.title, category: p.category, summary: p.summary, substrate: p.substrate,
    syncModel: p.sync_model, extractCmd: p.extract_cmd || null, limitations: p.limitations || [],
    assessment_batch: p.assessment_batch || null, pilot_stage: p.pilot_stage || null,
    version_assessed: p.version_assessed || null, assessment_date: p.assessment_date || null,
    assessment_status: complete ? 'complete' : 'unverified',
    eligibility: elig, principles: prin, evidence: p.evidence || [],
    determination: complete ? 'computed' : 'insufficient_evidence'
  };
}

function loadEntries(fw) {
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort()
    .map((f) => normalise(f.replace(/\.md$/, ''), frontMatter(path.join(dir, f)), fw));
}

module.exports = { loadEntries, parseToml };

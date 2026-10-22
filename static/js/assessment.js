/* Sovereign Software Evaluation Framework: assessment engine.
   The single implementation of eligibility rules, principle findings, the qualified overall
   determination, export, and import. It reads the framework definition from data/framework.json
   and never touches the DOM, so the browser and the Node tests run the same code.
   The framework adopts no weighting scheme, numerical score, or tier threshold. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SovereignAssessment = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var SCHEMA_VERSION = '3.0';
  var MAX_IMPORT_CHARS = 1000000;
  var MAX_TEXT = 5000;
  var MAX_SHORT = 200;
  var CONFIDENCE = ['high', 'medium', 'low'];
  var STATUSES = ['pass', 'fail', 'not_verified', 'not_applicable'];
  var FINDINGS = ['meets', 'partial', 'does_not_meet'];

  /* ---------- helpers ---------- */

  function isObj(x) { return x !== null && typeof x === 'object' && !Array.isArray(x); }
  function str(x) { return typeof x === 'string' ? x : ''; }
  function trimLen(x) { return str(x).trim().length; }
  function principleIds(fw) { return fw.principles.map(function (p) { return p.id; }); }
  function findPrinciple(fw, id) { return fw.principles.filter(function (p) { return p.id === id; })[0]; }
  function findingLabel(fw, id) {
    var f = fw.findingLevels.filter(function (l) { return l.id === id; })[0];
    return f ? f.label : 'Not assessed';
  }

  function isHttpUrl(s) {
    if (typeof s !== 'string') return false;
    var t = s.trim();
    if (!/^https?:\/\/[^\s]+$/i.test(t)) return false;
    try { var u = new URL(t); return u.protocol === 'http:' || u.protocol === 'https:'; } catch (e) { return false; }
  }

  /* ---------- framework checks ---------- */

  function validateFramework(fw) {
    var errors = [];
    var ids = principleIds(fw);
    if (new Set(ids).size !== ids.length) errors.push('Duplicate principle ids');
    if (ids.length !== 4) errors.push('The framework defines ' + ids.length + ' principles, not four');
    fw.principles.forEach(function (p) {
      if (!p.levels || FINDINGS.some(function (f) { return typeof p.levels[f] !== 'string'; })) errors.push(p.id + ' lacks guidance for every finding level');
      if ('weight' in p) errors.push(p.id + ' has a weight, but this framework adopts none');
    });
    var eids = fw.eligibility.map(function (e) { return e.id; });
    fw.eligibility.forEach(function (e) { if (ids.indexOf(e.principle) < 0) errors.push(e.id + ' maps to an unknown principle'); });
    fw.tests.forEach(function (t) {
      t.supports.forEach(function (s) { if (ids.indexOf(s) < 0) errors.push(t.id + ' supports unknown principle ' + s); });
      (t.eligibility || []).forEach(function (e) { if (eids.indexOf(e) < 0) errors.push(t.id + ' maps to unknown requirement ' + e); });
    });
    Object.keys(fw.determinations.labels).forEach(function (k) { if (fw.determinations.order.indexOf(k) < 0) errors.push('Determination ' + k + ' has no precedence'); });
    return errors;
  }

  /* ---------- assessment construction ---------- */

  function emptyAssessment(fw) {
    var a = {
      schemaVersion: SCHEMA_VERSION,
      software: { name: '', version: '', category: '', platform: '', deployment: '' },
      evaluation: { date: '', evaluator: '', notes: '' },
      eligibility: {},
      principles: {},
      tests: {}
    };
    fw.eligibility.forEach(function (e) {
      a.eligibility[e.id] = { status: 'not_verified', evidence: '', source: '', justification: '' };
    });
    fw.principles.forEach(function (p) {
      a.principles[p.id] = { finding: null, evidence: '', limitations: '', confidence: null, sources: '' };
    });
    fw.tests.forEach(function (t) {
      a.tests[t.id] = { checked: t.verify.map(function () { return false; }), notes: '' };
    });
    return a;
  }

  /* ---------- evaluation ---------- */

  function computeResult(fw, a) {
    var minEv = fw.determinations.evidence.minEvidenceLength;
    var ids = principleIds(fw);

    var profile = [];
    var missing = [];
    fw.principles.forEach(function (p) {
      var pr = a.principles[p.id] || {};
      var f = FINDINGS.indexOf(pr.finding) >= 0 ? pr.finding : null;
      if (f === null) missing.push(p.id);
      profile.push({
        id: p.id, order: p.order, name: p.name, finding: f, findingLabel: findingLabel(fw, f),
        confidence: CONFIDENCE.indexOf(pr.confidence) >= 0 ? pr.confidence : null,
        hasEvidence: trimLen(pr.evidence) >= minEv
      });
    });
    var complete = missing.length === 0;

    /* eligibility */
    var failures = [];
    var unverified = [];
    var notApplicable = [];
    var detail = fw.eligibility.map(function (e) {
      var en = a.eligibility[e.id] || {};
      var status = STATUSES.indexOf(en.status) >= 0 ? en.status : 'not_verified';
      var effective = status;
      var reason = '';
      if (status === 'not_applicable') {
        if (trimLen(en.justification) < minEv) { effective = 'not_verified'; reason = 'Not Applicable needs a documented justification'; }
        else notApplicable.push(e.id);
      }
      if (effective === 'fail') failures.push(e.id);
      if (effective === 'not_verified') unverified.push(e.id);
      return { id: e.id, title: e.title, status: status, effective: effective, reason: reason };
    });
    var eligibility = {
      failures: failures,
      unverified: unverified,
      notApplicable: notApplicable,
      satisfied: failures.length === 0 && unverified.length === 0,
      verdict: failures.length ? 'failed' : (unverified.length ? 'unverified' : 'satisfied'),
      detail: detail
    };

    /* evidence: every claim needs observations, and no finding may rest on Low or unstated confidence */
    var evidenceGaps = [];
    profile.forEach(function (c) {
      if (c.finding === null) return;
      var pr = a.principles[c.id];
      if (!c.hasEvidence) evidenceGaps.push(c.name + ': evidence statement missing');
      if (c.confidence === null) evidenceGaps.push(c.name + ': confidence not stated');
      else if (c.confidence === 'low') evidenceGaps.push(c.name + ': confidence is Low');
    });
    fw.eligibility.forEach(function (e) {
      var en = a.eligibility[e.id] || {};
      if (en.status === 'pass' && trimLen(en.evidence) < minEv) evidenceGaps.push(e.id + ': evidence for Pass missing');
    });
    var evidenceSufficient = evidenceGaps.length === 0;

    /* determination, in the documented order of precedence */
    var id;
    var reasons = [];
    var notMeeting = profile.filter(function (c) { return c.finding === 'partial' || c.finding === 'does_not_meet'; });
    if (failures.length) {
      id = 'fails_fundamental';
      failures.forEach(function (eid) {
        var e = fw.eligibility.filter(function (x) { return x.id === eid; })[0];
        reasons.push(eid + ' failed: ' + e.failure);
      });
      reasons.push('Strengths elsewhere do not cancel a verified failure.');
    } else if (unverified.length || !complete || !evidenceSufficient) {
      id = 'insufficient_evidence';
      if (unverified.length) reasons.push('Mandatory requirements not yet established: ' + unverified.join(', ') + '. Missing evidence is not a failure, and it is not a pass.');
      if (!complete) reasons.push('Principles not yet assessed: ' + missing.map(function (m) { return findPrinciple(fw, m).name; }).join(', ') + '.');
      if (!evidenceSufficient) reasons.push('Documented evidence is incomplete: ' + evidenceGaps.slice(0, 4).join('; ') + (evidenceGaps.length > 4 ? '; and more' : '') + '.');
    } else if (notMeeting.length === 0) {
      id = 'meets_core';
    } else {
      id = 'partially_aligned';
      notMeeting.forEach(function (c) { reasons.push(c.name + ': ' + c.findingLabel.toLowerCase() + '.'); });
    }

    /* warnings */
    var warnings = [];
    if (notApplicable.length) warnings.push('Requirements marked Not Applicable: ' + notApplicable.join(', ') + '. This is valid only when they genuinely do not apply.');
    profile.forEach(function (c) { if (c.finding !== null && c.confidence === 'low') warnings.push(c.name + ' is assessed with Low confidence.'); });

    /* weaknesses and recommendations */
    var weaknesses = notMeeting.map(function (c) { return { principle: c.id, name: c.name, finding: c.finding, findingLabel: c.findingLabel, recommendation: findPrinciple(fw, c.id).improvement }; });
    var actions = [];
    failures.forEach(function (eid) {
      var e = fw.eligibility.filter(function (x) { return x.id === eid; })[0];
      actions.push('Resolve failed requirement ' + eid + ' (' + e.title + ').');
    });
    unverified.forEach(function (eid) {
      var e = fw.eligibility.filter(function (x) { return x.id === eid; })[0];
      actions.push('Verify requirement ' + eid + ' (' + e.title + ') with evidence.');
    });

    /* evidence coverage: verification items checked, per principle and for supporting tests */
    var coverage = fw.principles.map(function (p) {
      var checked = 0, total = 0;
      fw.tests.forEach(function (t) {
        if (t.supports.indexOf(p.id) < 0) return;
        var tt = a.tests[t.id] || { checked: [] };
        t.verify.forEach(function (_, i) { total++; if (tt.checked && tt.checked[i] === true) checked++; });
      });
      return { id: p.id, name: p.name, verificationChecked: checked, verificationTotal: total };
    });

    return {
      frameworkVersion: fw.version,
      complete: complete,
      assessedCount: ids.length - missing.length,
      totalPrinciples: ids.length,
      missing: missing,
      profile: profile,
      eligibility: eligibility,
      evidenceSufficient: evidenceSufficient,
      evidenceGaps: evidenceGaps,
      determination: { id: id, label: fw.determinations.labels[id], reasons: reasons },
      warnings: warnings,
      weaknesses: weaknesses,
      actions: actions,
      coverage: coverage
    };
  }

  /* ---------- validation / import ---------- */

  function forbiddenKeys(o, depth, budget) {
    if (depth > 8 || budget.n-- <= 0) return true;
    if (Array.isArray(o)) return o.some(function (v) { return forbiddenKeys(v, depth + 1, budget); });
    if (isObj(o)) {
      return Object.keys(o).some(function (k) {
        return k === '__proto__' || k === 'constructor' || k === 'prototype' || forbiddenKeys(o[k], depth + 1, budget);
      });
    }
    return false;
  }

  function cleanText(errors, label, v, max) {
    if (v === undefined || v === null) return '';
    if (typeof v !== 'string') { errors.push(label + ' must be text'); return ''; }
    if (v.length > max) { errors.push(label + ' is longer than ' + max + ' characters'); return v.slice(0, max); }
    return v;
  }

  /* Builds a fresh, whitelisted assessment from untrusted input and reports every problem. */
  function validateAssessment(fw, raw) {
    var errors = [];
    if (!isObj(raw)) return { ok: false, errors: ['The file must contain a JSON object'], assessment: null };
    if (forbiddenKeys(raw, 0, { n: 5000 })) return { ok: false, errors: ['The file contains forbidden or excessively nested data'], assessment: null };
    if (raw.schemaVersion !== SCHEMA_VERSION) {
      return { ok: false, errors: ['Unsupported schema version: ' + String(raw.schemaVersion).slice(0, 20) + ' (this tool reads ' + SCHEMA_VERSION + ')'], assessment: null };
    }
    var a = emptyAssessment(fw);

    var sw = isObj(raw.software) ? raw.software : {};
    ['name', 'version', 'category', 'platform', 'deployment'].forEach(function (k) { a.software[k] = cleanText(errors, 'software.' + k, sw[k], MAX_SHORT); });
    var ev = isObj(raw.evaluation) ? raw.evaluation : {};
    a.evaluation.date = cleanText(errors, 'evaluation.date', ev.date, 10);
    if (a.evaluation.date && !/^\d{4}-\d{2}-\d{2}$/.test(a.evaluation.date)) errors.push('evaluation.date must look like YYYY-MM-DD');
    a.evaluation.evaluator = cleanText(errors, 'evaluation.evaluator', ev.evaluator, MAX_SHORT);
    a.evaluation.notes = cleanText(errors, 'evaluation.notes', ev.notes, MAX_TEXT);

    var el = isObj(raw.eligibility) ? raw.eligibility : {};
    fw.eligibility.forEach(function (e) {
      var r = isObj(el[e.id]) ? el[e.id] : {};
      var out = a.eligibility[e.id];
      if (r.status !== undefined) {
        if (STATUSES.indexOf(r.status) < 0) errors.push(e.id + ': invalid status');
        else out.status = r.status;
      }
      out.evidence = cleanText(errors, e.id + '.evidence', r.evidence, MAX_TEXT);
      out.justification = cleanText(errors, e.id + '.justification', r.justification, MAX_TEXT);
      out.source = cleanText(errors, e.id + '.source', r.source, 2000);
      if (out.source && !isHttpUrl(out.source)) errors.push(e.id + ': the source must be an http or https URL');
    });

    var pr = isObj(raw.principles) ? raw.principles : {};
    fw.principles.forEach(function (p) {
      var r = isObj(pr[p.id]) ? pr[p.id] : {};
      var out = a.principles[p.id];
      if (r.finding !== undefined && r.finding !== null) {
        if (FINDINGS.indexOf(r.finding) < 0) errors.push(p.name + ': invalid finding');
        else out.finding = r.finding;
      }
      if (r.confidence !== undefined && r.confidence !== null) {
        if (CONFIDENCE.indexOf(r.confidence) < 0) errors.push(p.name + ': invalid confidence');
        else out.confidence = r.confidence;
      }
      out.evidence = cleanText(errors, p.name + '.evidence', r.evidence, MAX_TEXT);
      out.limitations = cleanText(errors, p.name + '.limitations', r.limitations, MAX_TEXT);
      out.sources = cleanText(errors, p.name + '.sources', r.sources, MAX_TEXT);
      out.sources.split(/\r?\n/).forEach(function (line) {
        if (line.trim() && !isHttpUrl(line)) errors.push(p.name + ': each source must be an http or https URL on its own line');
      });
    });

    var ts = isObj(raw.tests) ? raw.tests : {};
    fw.tests.forEach(function (t) {
      var r = isObj(ts[t.id]) ? ts[t.id] : {};
      var out = a.tests[t.id];
      if (r.checked !== undefined) {
        if (!Array.isArray(r.checked) || r.checked.length !== t.verify.length || !r.checked.every(function (b) { return typeof b === 'boolean'; })) {
          errors.push(t.id + ': checked must be a list of ' + t.verify.length + ' true/false values');
        } else out.checked = r.checked.slice();
      }
      out.notes = cleanText(errors, t.id + '.notes', r.notes, MAX_TEXT);
    });

    return { ok: errors.length === 0, errors: errors, assessment: errors.length === 0 ? a : null };
  }

  function parseImport(fw, text) {
    if (typeof text !== 'string' || !text.trim()) return { ok: false, errors: ['The file is empty'], assessment: null };
    if (text.length > MAX_IMPORT_CHARS) return { ok: false, errors: ['The file is too large'], assessment: null };
    var raw;
    try { raw = JSON.parse(text); } catch (e) { return { ok: false, errors: ['The file is not valid JSON'], assessment: null }; }
    return validateAssessment(fw, raw);
  }

  /* ---------- export ---------- */

  function toJSON(fw, a, result) {
    return JSON.stringify({
      schemaVersion: SCHEMA_VERSION,
      framework: { name: fw.name, version: fw.version, status: fw.status },
      software: a.software,
      evaluation: a.evaluation,
      eligibility: a.eligibility,
      principles: a.principles,
      tests: a.tests,
      derived: {
        note: 'Derived values are informational. They are recomputed from the data above when the file is imported.',
        complete: result.complete,
        determination: result.determination.id
      }
    }, null, 2);
  }

  function cell(s) { return String(s === null || s === undefined ? '' : s).replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim() || ' '; }
  function quote(s) {
    var t = str(s).trim();
    return t ? t.split(/\r?\n/).map(function (l) { return '> ' + l; }).join('\n') : '_None recorded._';
  }

  function toMarkdown(fw, a, result) {
    var L = [];
    var name = a.software.name.trim() || 'Unnamed software';
    L.push('# Sovereign Software Assessment: ' + name);
    L.push('');
    L.push('- **Framework:** ' + fw.name + ' v' + fw.version + ' (' + fw.status + ')');
    L.push('- **Software:** ' + name + (a.software.version ? ' ' + a.software.version : ''));
    if (a.software.category) L.push('- **Category:** ' + a.software.category);
    if (a.software.platform) L.push('- **Platform:** ' + a.software.platform);
    if (a.software.deployment) L.push('- **Deployment model:** ' + a.software.deployment);
    L.push('- **Assessment date:** ' + (a.evaluation.date || 'not recorded'));
    if (a.evaluation.evaluator) L.push('- **Evaluator:** ' + a.evaluation.evaluator);
    L.push('');
    L.push('## Determination');
    L.push('');
    L.push('- **Overall determination:** ' + result.determination.label);
    L.push('- **Principles assessed:** ' + result.assessedCount + ' of ' + result.totalPrinciples);
    L.push('- **Fundamental requirements:** ' + result.eligibility.verdict);
    result.determination.reasons.forEach(function (r) { L.push('- ' + r); });
    result.warnings.forEach(function (w) { L.push('- Warning: ' + w); });
    L.push('');
    L.push('## Fundamental eligibility requirements');
    L.push('');
    L.push('| Requirement | Status | Evidence |');
    L.push('|---|---|---|');
    fw.eligibility.forEach(function (e) {
      var en = a.eligibility[e.id];
      var st = fw.eligibilityStatuses.filter(function (s) { return s.id === en.status; })[0];
      var ev = en.status === 'not_applicable' ? 'Justification: ' + en.justification : en.evidence;
      L.push('| ' + e.id + ' ' + cell(e.title) + ' | ' + st.label + ' | ' + cell(ev) + (en.source ? ' (' + cell(en.source) + ')' : '') + ' |');
    });
    L.push('');
    L.push('## Principle profile');
    L.push('');
    L.push('| Principle | Finding | Confidence |');
    L.push('|---|---|---|');
    result.profile.forEach(function (c) {
      L.push('| ' + c.order + '. ' + cell(c.name) + ' | ' + c.findingLabel + ' | ' + (c.confidence ? c.confidence : 'not stated') + ' |');
    });
    L.push('');
    L.push('## Evidence and limitations');
    fw.principles.forEach(function (p) {
      var pr = a.principles[p.id];
      L.push('');
      L.push('### ' + p.order + '. ' + p.name);
      L.push('');
      L.push('**Observations**');
      L.push('');
      L.push(quote(pr.evidence));
      L.push('');
      L.push('**Known limitations**');
      L.push('');
      L.push(quote(pr.limitations));
      if (pr.sources.trim()) {
        L.push('');
        L.push('**Sources**');
        L.push('');
        pr.sources.split(/\r?\n/).filter(function (x) { return x.trim(); }).forEach(function (s) { L.push('- ' + s.trim()); });
      }
    });
    L.push('');
    L.push('## Supporting engineering tests');
    L.push('');
    fw.tests.forEach(function (t) {
      var tt = a.tests[t.id];
      var n = tt.checked.filter(Boolean).length;
      L.push('- **' + t.id + ' ' + t.title + ':** ' + n + ' of ' + t.verify.length + ' items verified' + (tt.notes.trim() ? '. ' + tt.notes.trim().replace(/\r?\n/g, ' ') : ''));
    });
    L.push('');
    L.push('## Recommended improvements');
    L.push('');
    var recs = result.actions.concat(result.weaknesses.map(function (w) { return w.name + ' (' + w.findingLabel.toLowerCase() + '): ' + w.recommendation; }));
    if (!recs.length) L.push('_No specific improvements flagged by the findings._');
    recs.forEach(function (r) { L.push('- ' + r); });
    if (a.evaluation.notes.trim()) { L.push(''); L.push('## Notes'); L.push(''); L.push(quote(a.evaluation.notes)); }
    L.push('');
    L.push('---');
    L.push('');
    L.push('_This assessment is not externally certified. The ' + fw.name + ' v' + fw.version + ' is a proposed, evidence-led framework: it adopts no numerical score, weighting, or tier threshold, and "meets the proposed core requirements" does not imply third-party accreditation._');
    return L.join('\n') + '\n';
  }

  /* ---------- directory entries ---------- */

  var CONF_RANK = { low: 0, medium: 1, high: 2 };

  /* Converts an Index record (data/directory.json) into an assessment so that the Index and the
     evaluator share one implementation. Evidence items look like
     { target: "sovereignty" | "E1", text, url, confidence }. */
  function assessmentFromEntry(fw, entry) {
    var a = emptyAssessment(fw);
    a.software.name = str(entry.name);
    a.software.version = str(entry.version_assessed);
    a.software.category = str(entry.category);
    a.evaluation.date = str(entry.assessment_date);
    a.evaluation.notes = Array.isArray(entry.limitations) ? entry.limitations.join('\n') : '';
    var items = Array.isArray(entry.evidence) ? entry.evidence : [];
    var findings = isObj(entry.principles) ? entry.principles : {};
    fw.principles.forEach(function (p) {
      var out = a.principles[p.id];
      out.finding = FINDINGS.indexOf(findings[p.id]) >= 0 ? findings[p.id] : null;
      var mine = items.filter(function (i) { return i && i.target === p.id; });
      out.evidence = mine.map(function (i) { return str(i.text); }).filter(Boolean).join('\n');
      out.sources = mine.map(function (i) { return str(i.url); }).filter(Boolean).join('\n');
      var conf = null;
      mine.forEach(function (i) {
        if (CONFIDENCE.indexOf(i.confidence) < 0) return;
        if (conf === null || CONF_RANK[i.confidence] < CONF_RANK[conf]) conf = i.confidence;
      });
      out.confidence = conf;
    });
    var elig = isObj(entry.eligibility) ? entry.eligibility : {};
    fw.eligibility.forEach(function (e) {
      var st = elig[e.key];
      var out = a.eligibility[e.id];
      out.status = STATUSES.indexOf(st) >= 0 ? st : 'not_verified';
      var mine = items.filter(function (i) { return i && (i.target === e.id || i.target === e.key); });
      var text = mine.map(function (i) { return str(i.text); }).filter(Boolean).join('\n');
      out.evidence = text;
      out.justification = text;
      var url = mine.map(function (i) { return str(i.url); }).filter(isHttpUrl)[0];
      out.source = url || '';
    });
    return a;
  }

  return {
    SCHEMA_VERSION: SCHEMA_VERSION,
    STATUSES: STATUSES,
    FINDINGS: FINDINGS,
    CONFIDENCE: CONFIDENCE,
    emptyAssessment: emptyAssessment,
    assessmentFromEntry: assessmentFromEntry,
    computeResult: computeResult,
    validateAssessment: validateAssessment,
    parseImport: parseImport,
    validateFramework: validateFramework,
    toJSON: toJSON,
    toMarkdown: toMarkdown,
    isHttpUrl: isHttpUrl
  };
});

/* Sovereign Software Evaluation Framework: scoring engine.
   The single implementation of the weighted score, eligibility rules, classification,
   export and import. It reads the framework definition (weights, thresholds) from
   data/framework.json and never touches the DOM, so the browser and the Node tests
   run the same code. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SovereignScoring = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var SCHEMA_VERSION = '2.0';
  var MAX_IMPORT_CHARS = 1000000;
  var MAX_TEXT = 5000;
  var MAX_SHORT = 200;
  var CONFIDENCE = ['high', 'medium', 'low'];
  var STATUSES = ['pass', 'fail', 'not_verified', 'not_applicable'];

  /* ---------- helpers ---------- */

  function isObj(x) { return x !== null && typeof x === 'object' && !Array.isArray(x); }
  function str(x) { return typeof x === 'string' ? x : ''; }
  function trimLen(x) { return str(x).trim().length; }
  function round6(n) { return Math.round(n * 1e6) / 1e6; }
  function principleIds(fw) { return fw.principles.map(function (p) { return p.id; }); }
  function findPrinciple(fw, id) { return fw.principles.filter(function (p) { return p.id === id; })[0]; }

  function isHttpUrl(s) {
    if (typeof s !== 'string') return false;
    var t = s.trim();
    if (!/^https?:\/\/[^\s]+$/i.test(t)) return false;
    try { var u = new URL(t); return u.protocol === 'http:' || u.protocol === 'https:'; } catch (e) { return false; }
  }

  /* Display value that never rounds up across a threshold (89.96 shows as 89.9, not 90). */
  function formatScore(n) {
    if (n === null || n === undefined) return null;
    var f = Math.floor(n * 10 + 1e-9) / 10;
    return f.toFixed(f % 1 === 0 ? 0 : 1);
  }

  /* ---------- framework checks ---------- */

  function validateFramework(fw) {
    var errors = [];
    var sum = 0;
    fw.principles.forEach(function (p) {
      if (typeof p.weight !== 'number' || p.weight < 0) errors.push('Invalid weight for ' + p.id);
      sum += p.weight;
    });
    if (round6(sum) !== 100) errors.push('Weights sum to ' + sum + ', not 100');
    var ids = principleIds(fw);
    fw.tests.forEach(function (t) {
      t.supports.forEach(function (s) { if (ids.indexOf(s) < 0) errors.push(t.id + ' supports unknown principle ' + s); });
      if (t.primary && ids.indexOf(t.primary) < 0) errors.push(t.id + ' has unknown primary principle');
    });
    var eids = fw.eligibility.map(function (e) { return e.id; });
    fw.tests.forEach(function (t) {
      (t.eligibility || []).forEach(function (e) { if (eids.indexOf(e) < 0) errors.push(t.id + ' maps to unknown requirement ' + e); });
    });
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
      a.principles[p.id] = { rating: null, evidence: '', limitations: '', confidence: null, sources: '' };
    });
    fw.tests.forEach(function (t) {
      a.tests[t.id] = { checked: t.verify.map(function () { return false; }), notes: '' };
    });
    return a;
  }

  /* ---------- scoring ---------- */

  function computeResult(fw, a) {
    var cls = fw.classification;
    var minEv = cls.evidence.minEvidenceLength;
    var ids = principleIds(fw);

    var contributions = [];
    var missing = [];
    var total = 0;
    fw.principles.forEach(function (p) {
      var r = a.principles[p.id] ? a.principles[p.id].rating : null;
      var assessed = typeof r === 'number' && r >= 0 && r <= 5;
      var raw = assessed ? (r * p.weight) / 5 : null;
      var contrib = assessed ? round6(raw) : null;   /* rounded for display only */
      if (assessed) total += raw; else missing.push(p.id);
      contributions.push({ id: p.id, name: p.name, priority: p.priority, weight: p.weight, rating: assessed ? r : null, contribution: contrib });
    });
    var complete = missing.length === 0;
    var score = complete ? round6(total) : null;

    /* eligibility */
    var failures = [];
    var unverified = [];
    var notApplicable = [];
    var eligibilityDetail = fw.eligibility.map(function (e) {
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
      detail: eligibilityDetail
    };

    /* evidence sufficiency (required for Tier 1 and Tier 2) */
    var evidenceGaps = [];
    fw.principles.forEach(function (p) {
      var pr = a.principles[p.id] || {};
      if (trimLen(pr.evidence) < minEv) evidenceGaps.push(p.name + ': evidence statement missing');
      if (pr.confidence === 'low' || CONFIDENCE.indexOf(pr.confidence) < 0) evidenceGaps.push(p.name + ': confidence is ' + (pr.confidence === 'low' ? 'Low' : 'not stated'));
    });
    fw.eligibility.forEach(function (e) {
      var en = a.eligibility[e.id] || {};
      if (en.status === 'pass' && trimLen(en.evidence) < minEv) evidenceGaps.push(e.id + ': evidence for Pass missing');
    });
    var evidenceSufficient = evidenceGaps.length === 0;

    /* classification, in the documented order of precedence */
    var id, reasons = [];
    var ratingOf = function (pid) { return a.principles[pid].rating; };
    if (failures.length) {
      id = 'not_certified';
      reasons.push('Verified failure of mandatory eligibility: ' + failures.join(', ') + '. A high score cannot compensate for it.');
    } else if (unverified.length) {
      id = 'unverified';
      reasons.push('Mandatory eligibility not established: ' + unverified.join(', ') + '.');
    } else if (!complete) {
      id = 'unverified';
      reasons.push('Quality assessment incomplete: not yet assessed: ' + missing.map(function (m) { return findPrinciple(fw, m).name; }).join(', ') + '.');
    } else {
      var minAll = Math.min.apply(null, ids.map(ratingOf));
      var t1 = cls.tier1, t2 = cls.tier2;
      var tier2Ratings = Object.keys(t2.minPrinciples).every(function (pid) { return ratingOf(pid) >= t2.minPrinciples[pid]; });
      if (score >= t1.minScore && minAll >= t1.minEveryPrinciple && evidenceSufficient) {
        id = 'tier1';
      } else if (score >= t2.minScore && tier2Ratings && evidenceSufficient) {
        id = 'tier2';
        if (score < t1.minScore) reasons.push('Score below ' + t1.minScore + ' for Tier 1.');
        else if (minAll < t1.minEveryPrinciple) reasons.push('A principle is rated below ' + t1.minEveryPrinciple + ', which Tier 1 does not allow.');
      } else {
        id = 'tier3';
        if (score < t2.minScore) reasons.push('Score below ' + t2.minScore + ' for Tier 2.');
        Object.keys(t2.minPrinciples).forEach(function (pid) {
          if (ratingOf(pid) < t2.minPrinciples[pid]) reasons.push(findPrinciple(fw, pid).name + ' is below ' + t2.minPrinciples[pid] + ', which Tier 2 requires.');
        });
        if (!evidenceSufficient) reasons.push('Documented evidence is insufficient for a higher tier.');
      }
    }

    /* warnings */
    var warnings = [];
    if (failures.length && score !== null) warnings.push('The numerical score is ' + formatScore(score) + ' but a verified critical failure prevents certification.');
    fw.principles.forEach(function (p) {
      var pr = a.principles[p.id] || {};
      if (typeof pr.rating === 'number' && pr.confidence === 'low') warnings.push(p.name + ' is rated with Low confidence.');
    });
    if (notApplicable.length) warnings.push('Requirements marked Not Applicable: ' + notApplicable.join(', ') + '. This is valid only when they genuinely do not apply.');
    if (!evidenceSufficient && complete) warnings.push('Evidence is incomplete for: ' + evidenceGaps.slice(0, 4).join('; ') + (evidenceGaps.length > 4 ? '; and more' : '') + '.');

    /* weaknesses and recommendations (priority order) */
    var weaknesses = [];
    fw.principles.forEach(function (p) {
      var r = a.principles[p.id] ? a.principles[p.id].rating : null;
      if (typeof r === 'number' && r <= 2) weaknesses.push({ principle: p.id, name: p.name, rating: r, recommendation: p.improvement });
    });
    var actions = [];
    failures.forEach(function (eid) {
      var e = fw.eligibility.filter(function (x) { return x.id === eid; })[0];
      actions.push('Resolve failed requirement ' + eid + ' (' + e.title + ').');
    });
    unverified.forEach(function (eid) {
      var e = fw.eligibility.filter(function (x) { return x.id === eid; })[0];
      actions.push('Verify requirement ' + eid + ' (' + e.title + ') with evidence.');
    });

    /* evidence coverage */
    var coverage = fw.principles.map(function (p) {
      var pr = a.principles[p.id] || {};
      var checked = 0, total = 0;
      fw.tests.forEach(function (t) {
        if (t.supports.indexOf(p.id) < 0) return;
        var tt = a.tests[t.id] || { checked: [] };
        t.verify.forEach(function (_, i) { total++; if (tt.checked && tt.checked[i] === true) checked++; });
      });
      return { id: p.id, name: p.name, hasEvidence: trimLen(pr.evidence) >= minEv, verificationChecked: checked, verificationTotal: total };
    });

    return {
      frameworkVersion: fw.version,
      complete: complete,
      assessedCount: ids.length - missing.length,
      totalPrinciples: ids.length,
      missing: missing,
      score: score,
      scoreDisplay: formatScore(score),
      contributions: contributions,
      eligibility: eligibility,
      evidenceSufficient: evidenceSufficient,
      evidenceGaps: evidenceGaps,
      classification: { id: id, label: cls.labels[id], certified: id === 'tier1' || id === 'tier2' || id === 'tier3', reasons: reasons },
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
      if (r.rating !== undefined && r.rating !== null) {
        if (!Number.isInteger(r.rating) || r.rating < 0 || r.rating > 5) errors.push(p.name + ': rating must be a whole number from 0 to 5 or null');
        else out.rating = r.rating;
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
    var out = {
      schemaVersion: SCHEMA_VERSION,
      framework: { name: fw.name, version: fw.version },
      software: a.software,
      evaluation: a.evaluation,
      eligibility: a.eligibility,
      principles: a.principles,
      tests: a.tests,
      derived: {
        note: 'Derived values are informational. They are recomputed from the data above when the file is imported.',
        complete: result.complete,
        score: result.score,
        classification: result.classification.id
      }
    };
    return JSON.stringify(out, null, 2);
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
    L.push('- **Framework:** ' + fw.name + ' v' + fw.version);
    L.push('- **Software:** ' + name + (a.software.version ? ' ' + a.software.version : ''));
    if (a.software.category) L.push('- **Category:** ' + a.software.category);
    if (a.software.platform) L.push('- **Platform:** ' + a.software.platform);
    if (a.software.deployment) L.push('- **Deployment model:** ' + a.software.deployment);
    L.push('- **Evaluation date:** ' + (a.evaluation.date || 'not recorded'));
    if (a.evaluation.evaluator) L.push('- **Evaluator:** ' + a.evaluation.evaluator);
    L.push('');
    L.push('## Result');
    L.push('');
    L.push('- **Classification:** ' + result.classification.label);
    L.push('- **Weighted score:** ' + (result.complete ? result.scoreDisplay + ' / 100' : 'not available (assessment incomplete: ' + result.assessedCount + ' of ' + result.totalPrinciples + ' principles rated)'));
    L.push('- **Mandatory eligibility:** ' + result.eligibility.verdict);
    result.classification.reasons.forEach(function (r) { L.push('- ' + r); });
    result.warnings.forEach(function (w) { L.push('- Warning: ' + w); });
    L.push('');
    L.push('## Mandatory eligibility');
    L.push('');
    L.push('| Requirement | Status | Evidence |');
    L.push('|---|---|---|');
    fw.eligibility.forEach(function (e, i) {
      var en = a.eligibility[e.id];
      var label = fw.eligibilityStatuses.filter(function (s) { return s.id === en.status; })[0].label;
      var ev = en.status === 'not_applicable' ? 'Justification: ' + en.justification : en.evidence;
      L.push('| ' + e.id + ' ' + cell(e.title) + ' | ' + label + ' | ' + cell(ev) + (en.source ? ' (' + cell(en.source) + ')' : '') + ' |');
    });
    L.push('');
    L.push('## Weighted principle scores');
    L.push('');
    L.push('| Priority | Principle | Weight | Rating | Contribution |');
    L.push('|---|---|---:|---:|---:|');
    result.contributions.forEach(function (c) {
      L.push('| ' + c.priority + ' | ' + cell(c.name) + ' | ' + c.weight + ' | ' + (c.rating === null ? 'not assessed' : c.rating + ' / 5') + ' | ' + (c.contribution === null ? 'n/a' : formatScore(c.contribution) + ' / ' + c.weight) + ' |');
    });
    L.push('');
    L.push('## Evidence and limitations');
    fw.principles.forEach(function (p) {
      var pr = a.principles[p.id];
      L.push('');
      L.push('### ' + p.priority + '. ' + p.name);
      L.push('');
      L.push('- **Confidence:** ' + (pr.confidence ? pr.confidence : 'not stated'));
      L.push('');
      L.push('**Evidence**');
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
    L.push('## Engineering verification');
    L.push('');
    fw.tests.forEach(function (t) {
      var tt = a.tests[t.id];
      var n = tt.checked.filter(Boolean).length;
      L.push('- **' + t.id + ' ' + t.title + ':** ' + n + ' of ' + t.verify.length + ' items verified' + (tt.notes.trim() ? '. ' + tt.notes.trim().replace(/\r?\n/g, ' ') : ''));
    });
    L.push('');
    L.push('## Recommended improvements');
    L.push('');
    var recs = result.actions.concat(result.weaknesses.map(function (w) { return w.name + ' (rated ' + w.rating + '/5): ' + w.recommendation; }));
    if (!recs.length) L.push('_No specific improvements flagged by the rating rules._');
    recs.forEach(function (r) { L.push('- ' + r); });
    if (a.evaluation.notes.trim()) { L.push(''); L.push('## Notes'); L.push(''); L.push(quote(a.evaluation.notes)); }
    L.push('');
    L.push('---');
    L.push('');
    L.push('_This assessment is not externally certified. The tiers and thresholds are proposed editorial policy of the Sovereign Software Evaluation Framework v' + fw.version + ', and "meets the proposed standard" does not imply third-party accreditation._');
    return L.join('\n') + '\n';
  }

  return {
    SCHEMA_VERSION: SCHEMA_VERSION,
    STATUSES: STATUSES,
    CONFIDENCE: CONFIDENCE,
    emptyAssessment: emptyAssessment,
    computeResult: computeResult,
    validateAssessment: validateAssessment,
    parseImport: parseImport,
    validateFramework: validateFramework,
    toJSON: toJSON,
    toMarkdown: toMarkdown,
    formatScore: formatScore,
    isHttpUrl: isHttpUrl
  };
});

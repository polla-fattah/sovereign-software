/* Sovereign Software Evaluation Framework: determination engine.
   The single implementation of the fundamental-requirement rules, the principle findings, and the
   qualified overall determination. It reads the framework definition from data/framework.json and
   never touches the DOM, so the Index page, the maintainer command (scripts/determine.js), and the
   automated tests all run the same code. The framework adopts no weighting scheme, numerical
   score, or tier threshold. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SovereignAssessment = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var CONFIDENCE = ['high', 'medium', 'low'];
  var STATUSES = ['pass', 'fail', 'not_verified', 'not_applicable'];
  var FINDINGS = ['meets', 'partial', 'does_not_meet'];
  var CONF_RANK = { low: 0, medium: 1, high: 2 };

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
    var a = { software: { name: '', version: '', category: '' }, evaluation: { date: '', notes: '' }, eligibility: {}, principles: {} };
    fw.eligibility.forEach(function (e) { a.eligibility[e.id] = { status: 'not_verified', evidence: '', source: '', justification: '', confidence: null }; });
    fw.principles.forEach(function (p) { a.principles[p.id] = { finding: null, evidence: '', limitations: '', confidence: null, sources: '' }; });
    return a;
  }

  /* Converts an Index record (content/directory/*.md) into an assessment. Evidence items look like
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
      var out = a.eligibility[e.id];
      out.status = STATUSES.indexOf(elig[e.key]) >= 0 ? elig[e.key] : 'not_verified';
      var mine = items.filter(function (i) { return i && (i.target === e.id || i.target === e.key); });
      var text = mine.map(function (i) { return str(i.text); }).filter(Boolean).join('\n');
      out.evidence = text;
      out.justification = text;
      out.source = mine.map(function (i) { return str(i.url); }).filter(isHttpUrl)[0] || '';
      var conf = null;
      mine.forEach(function (i) {
        if (CONFIDENCE.indexOf(i.confidence) < 0) return;
        if (conf === null || CONF_RANK[i.confidence] < CONF_RANK[conf]) conf = i.confidence;
      });
      out.confidence = conf;
    });
    return a;
  }

  /* ---------- evaluation ---------- */

  function computeResult(fw, a) {
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
        hasEvidence: trimLen(pr.evidence) > 0
      });
    });
    var complete = missing.length === 0;

    /* fundamental requirements */
    var failures = [];
    var unverified = [];
    var notApplicable = [];
    var detail = fw.eligibility.map(function (e) {
      var en = a.eligibility[e.id] || {};
      var status = STATUSES.indexOf(en.status) >= 0 ? en.status : 'not_verified';
      var effective = status;
      var reason = '';
      if (status === 'not_applicable') {
        if (trimLen(en.justification) === 0) { effective = 'not_verified'; reason = 'Not Applicable needs a documented justification'; }
        else notApplicable.push(e.id);
      }
      if ((status === 'pass' || status === 'fail') && en.confidence === 'low') { effective = 'not_verified'; reason = 'Low confidence cannot establish a Pass or a Fail'; }
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
      if (!c.hasEvidence) evidenceGaps.push(c.name + ': evidence statement missing');
      if (c.confidence === null) evidenceGaps.push(c.name + ': confidence not stated');
      else if (c.confidence === 'low') evidenceGaps.push(c.name + ': confidence is Low');
    });
    fw.eligibility.forEach(function (e) {
      var en = a.eligibility[e.id] || {};
      if (en.status === 'pass' && trimLen(en.evidence) === 0) evidenceGaps.push(e.id + ': evidence for Pass missing');
    });
    var evidenceSufficient = evidenceGaps.length === 0;

    /* determination, in the documented order of precedence */
    var id;
    var reasons = [];
    var notMeeting = profile.filter(function (c) { return c.finding === 'partial' || c.finding === 'does_not_meet'; });
    var notMet = profile.filter(function (c) { return c.finding === 'does_not_meet'; });
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
    } else if (notMet.length) {
      id = 'does_not_meet_core';
      notMet.forEach(function (c) { reasons.push(c.name + ': does not meet, so the product cannot meet the proposed core standard even though no fundamental requirement failed.'); });
    } else if (notMeeting.length) {
      id = 'partially_aligned';
      notMeeting.forEach(function (c) { reasons.push(c.name + ': ' + c.findingLabel.toLowerCase() + '.'); });
    } else {
      id = 'meets_core';
    }

    /* a failed requirement must not sit beside a principle marked Meets; the failure still decides the outcome */
    var inconsistencies = [];
    fw.eligibility.forEach(function (e) {
      var c = profile.filter(function (x) { return x.id === e.principle; })[0];
      if (failures.indexOf(e.id) >= 0 && c && c.finding === 'meets') inconsistencies.push(e.id + ' failed while ' + c.name + ' is marked Meets. Correct the assessment before publishing.');
    });
    var warnings = inconsistencies.slice();
    if (notApplicable.length) warnings.push('Requirements marked Not Applicable: ' + notApplicable.join(', ') + '. This is valid only when they genuinely do not apply.');
    profile.forEach(function (c) { if (c.finding !== null && c.confidence === 'low') warnings.push(c.name + ' is assessed with Low confidence.'); });

    var weaknesses = notMeeting.map(function (c) { return { principle: c.id, name: c.name, finding: c.finding, findingLabel: c.findingLabel, recommendation: findPrinciple(fw, c.id).improvement }; });

    return {
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
      inconsistencies: inconsistencies,
      weaknesses: weaknesses
    };
  }

  return {
    STATUSES: STATUSES,
    FINDINGS: FINDINGS,
    CONFIDENCE: CONFIDENCE,
    emptyAssessment: emptyAssessment,
    assessmentFromEntry: assessmentFromEntry,
    computeResult: computeResult,
    validateFramework: validateFramework,
    isHttpUrl: isHttpUrl
  };
});

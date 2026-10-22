/* Sovereign Software Evaluator: interface.
   Builds the assessment form from the framework data and shows live results.
   All scoring is done by scoring.js. Everything runs in the browser: nothing is stored
   or sent anywhere, and user text is only ever inserted with textContent. */
(function () {
  'use strict';
  var fw = window.SOVEREIGN_FRAMEWORK;
  var S = window.SovereignScoring;
  var root = document.getElementById('evaluator-root');
  if (!fw || !S || !root) return;

  var state = newState();
  var STATUS_LABEL = {};
  fw.eligibilityStatuses.forEach(function (s) { STATUS_LABEL[s.id] = s; });
  var maxWeight = Math.max.apply(null, fw.principles.map(function (p) { return p.weight; }));

  /* ---------- small DOM helpers ---------- */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === false || v === null || v === undefined) return;
      if (k === 'text') n.textContent = v;
      else if (k === 'class') n.className = v;
      else if (k === 'style') n.setAttribute('style', v);
      else n.setAttribute(k, v === true ? '' : v);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function todayISO() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function newState() { var a = S.emptyAssessment(fw); a.evaluation.date = todayISO(); return a; }
  function slug(s) { return String(s || 'assessment').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'assessment'; }
  function principleName(id) { return fw.principles.filter(function (p) { return p.id === id; })[0].name; }

  /* path access for form bindings, e.g. "eligibility.E1.status" or "tests.T1.checked.2" */
  function getPath(obj, path) { return path.split('.').reduce(function (o, k) { return o === undefined || o === null ? undefined : o[k]; }, obj); }
  function setPath(obj, path, value) {
    var parts = path.split('.');
    var last = parts.pop();
    var target = parts.reduce(function (o, k) { return o[k]; }, obj);
    target[last] = value;
  }

  /* ---------- form construction ---------- */
  var uid = 0;
  function nextId(prefix) { uid += 1; return prefix + '-' + uid; }

  function field(label, control, hint) {
    var id = control.id || (control.id = nextId('f'));
    var wrap = el('div', { class: 'ev-field' });
    wrap.appendChild(el('label', { for: id, text: label }));
    if (hint) { var h = el('p', { class: 'ev-hint', id: id + '-hint', text: hint }); wrap.appendChild(h); control.setAttribute('aria-describedby', id + '-hint'); }
    wrap.appendChild(control);
    return wrap;
  }
  function input(path, type, extra) { return el('input', Object.assign({ type: type || 'text', 'data-path': path, autocomplete: 'off' }, extra || {})); }
  function textarea(path, rows) { return el('textarea', { 'data-path': path, rows: rows || 3 }); }

  function buildIdentity() {
    var sec = el('section', { class: 'ev-card', id: 'step-1', 'aria-labelledby': 'step-1-h' });
    sec.appendChild(el('h2', { id: 'step-1-h', text: 'Step 1. Identify the software' }));
    var grid = el('div', { class: 'ev-grid' });
    grid.appendChild(field('Software name', input('software.name', 'text', { maxlength: '200', required: 'required' })));
    grid.appendChild(field('Version assessed', input('software.version', 'text', { maxlength: '200' }), 'Assessments apply to one version.'));
    var cat = input('software.category', 'text', { maxlength: '200', list: 'ev-categories' });
    grid.appendChild(field('Category', cat));
    var dl = el('datalist', { id: 'ev-categories' }, (window.SOVEREIGN_CATEGORIES || []).map(function (c) { return el('option', { value: c }); }));
    grid.appendChild(dl);
    grid.appendChild(field('Platform', input('software.platform', 'text', { maxlength: '200' }), 'For example Windows, Linux, Android, web.'));
    var dep = el('select', { 'data-path': 'software.deployment' }, [el('option', { value: '', text: 'Choose a model' })].concat(
      ['Local application', 'Self-hosted server', 'Vendor-hosted service', 'Hybrid', 'Embedded or firmware', 'Other'].map(function (o) { return el('option', { value: o, text: o }); })));
    grid.appendChild(field('Deployment model', dep));
    grid.appendChild(field('Evaluation date', input('evaluation.date', 'date')));
    grid.appendChild(field('Evaluator (optional)', input('evaluation.evaluator', 'text', { maxlength: '200' })));
    sec.appendChild(grid);
    sec.appendChild(field('Notes (optional)', textarea('evaluation.notes', 3)));
    return sec;
  }

  function buildEligibility() {
    var sec = el('section', { class: 'ev-card', id: 'step-2', 'aria-labelledby': 'step-2-h' });
    sec.appendChild(el('h2', { id: 'step-2-h', text: 'Step 2. Fundamental eligibility' }));
    sec.appendChild(el('p', { class: 'ev-hint', text: 'Five mandatory requirements. A verified failure blocks certification however high the score. You can keep going if one fails, to see the full picture. Mark a requirement Not Applicable only when it genuinely does not apply, and explain why.' }));
    fw.eligibility.forEach(function (e) {
      var fs = el('fieldset', { class: 'ev-fieldset', 'data-req': e.id });
      fs.appendChild(el('legend', { text: e.id + '. ' + e.title }));
      fs.appendChild(el('p', { class: 'ev-q', text: e.question }));
      var row = el('div', { class: 'ev-radios', role: 'radiogroup' });
      fw.eligibilityStatuses.forEach(function (s) {
        var id = nextId('el');
        var inp = el('input', { type: 'radio', id: id, name: 'elig-' + e.id, value: s.id, 'data-path': 'eligibility.' + e.id + '.status' });
        row.appendChild(el('label', { class: 'ev-radio', for: id }, [inp, el('span', { text: s.symbol + ' ' + s.label })]));
      });
      fs.appendChild(row);
      fs.appendChild(field('Evidence or observation', textarea('eligibility.' + e.id + '.evidence', 2)));
      fs.appendChild(field('Source URL (optional, http or https)', input('eligibility.' + e.id + '.source', 'url', { maxlength: '2000', inputmode: 'url' })));
      var just = field('Justification (required for Not Applicable)', textarea('eligibility.' + e.id + '.justification', 2));
      just.setAttribute('data-for-na', '1');
      fs.appendChild(just);
      sec.appendChild(fs);
    });
    var summary = el('p', { class: 'ev-summary', id: 'elig-summary', role: 'status' });
    sec.appendChild(summary);
    return sec;
  }

  function buildPrinciples() {
    var sec = el('section', { class: 'ev-card', id: 'step-3', 'aria-labelledby': 'step-3-h' });
    sec.appendChild(el('h2', { id: 'step-3-h', text: 'Step 3. Six-principle assessment' }));
    sec.appendChild(el('p', { class: 'ev-hint', text: 'Rate each principle from 0 to 5, or leave it as Not assessed. Not assessed is not zero: it withholds the final score. The weight shows how much each principle contributes to the 100-point total.' }));
    fw.principles.forEach(function (p) {
      var fs = el('fieldset', { class: 'ev-fieldset', 'data-principle': p.id });
      fs.appendChild(el('legend', { text: p.priority + '. ' + p.name + ' (weight ' + p.weight + '%)' }));
      fs.appendChild(el('p', { class: 'ev-q', text: p.question }));
      var help = el('details', { class: 'ev-help' }, [el('summary', { text: 'What to look at, and what each rating means' })]);
      help.appendChild(el('p', { text: p.definition }));
      var items = p.dimensions ? p.dimensions.map(function (d) { return d.name + ': ' + d.question; }) : p.considerations;
      help.appendChild(el('ul', null, items.map(function (t) { return el('li', { text: t }); })));
      help.appendChild(el('p', { text: p.note }));
      var anch = el('ul', { class: 'ev-anchors' });
      [['0', p.anchors['0']], ['3', p.anchors['3']], ['5', p.anchors['5']]].forEach(function (a) { anch.appendChild(el('li', null, [el('strong', { text: a[0] + ': ' }), a[1]])); });
      help.appendChild(anch);
      fs.appendChild(help);
      var row = el('div', { class: 'ev-radios ev-rating', role: 'radiogroup', 'aria-label': p.name + ' rating' });
      var nid = nextId('pr');
      row.appendChild(el('label', { class: 'ev-radio', for: nid }, [el('input', { type: 'radio', id: nid, name: 'rate-' + p.id, value: '', 'data-path': 'principles.' + p.id + '.rating' }), el('span', { text: 'Not assessed' })]));
      fw.scale.forEach(function (s) {
        var id = nextId('pr');
        row.appendChild(el('label', { class: 'ev-radio', for: id, title: s.label }, [el('input', { type: 'radio', id: id, name: 'rate-' + p.id, value: String(s.value), 'data-path': 'principles.' + p.id + '.rating' }), el('span', { text: s.value + ' ' + s.short })]));
      });
      fs.appendChild(row);
      fs.appendChild(field('Evidence', textarea('principles.' + p.id + '.evidence', 3), 'What did you check, how, and against which version?'));
      fs.appendChild(field('Known limitations', textarea('principles.' + p.id + '.limitations', 2)));
      var conf = el('select', { 'data-path': 'principles.' + p.id + '.confidence' }, [el('option', { value: '', text: 'Not stated' })].concat(
        fw.confidenceLevels.map(function (c) { return el('option', { value: c, text: c.charAt(0).toUpperCase() + c.slice(1) }); })));
      fs.appendChild(field('Confidence', conf));
      fs.appendChild(field('Sources (optional, one http or https URL per line)', textarea('principles.' + p.id + '.sources', 2)));
      sec.appendChild(fs);
    });
    return sec;
  }

  function buildTests() {
    var sec = el('section', { class: 'ev-card', id: 'step-4', 'aria-labelledby': 'step-4-h' });
    sec.appendChild(el('h2', { id: 'step-4-h', text: 'Step 4. Engineering verification (optional)' }));
    sec.appendChild(el('p', { class: 'ev-hint', text: 'The seven tests are a checklist for gathering evidence. They support the ratings above and do not produce a score of their own. Test 7 is cross-cutting and informs several principles.' }));
    fw.tests.forEach(function (t) {
      var det = el('details', { class: 'ev-test' });
      var supports = t.supports.map(principleName).join(', ');
      det.appendChild(el('summary', { text: t.id + '. ' + t.title + ' (supports: ' + supports + ')' }));
      var list = el('div', { class: 'ev-checks' });
      t.verify.forEach(function (v, i) {
        var id = nextId('ts');
        list.appendChild(el('label', { class: 'ev-check', for: id }, [el('input', { type: 'checkbox', id: id, 'data-path': 'tests.' + t.id + '.checked.' + i }), el('span', { text: v })]));
      });
      det.appendChild(list);
      det.appendChild(field('Observations', textarea('tests.' + t.id + '.notes', 2)));
      sec.appendChild(det);
    });
    return sec;
  }

  function buildResults() {
    var sec = el('section', { class: 'ev-card ev-results', id: 'step-5', 'aria-labelledby': 'step-5-h' });
    sec.appendChild(el('h2', { id: 'step-5-h', text: 'Step 5. Results' }));
    sec.appendChild(el('div', { id: 'results', 'aria-live': 'polite' }));
    var actions = el('div', { class: 'ev-actions' });
    actions.appendChild(el('button', { type: 'button', id: 'btn-md', text: 'Download Markdown report' }));
    actions.appendChild(el('button', { type: 'button', id: 'btn-json', text: 'Download JSON' }));
    var impId = nextId('imp');
    actions.appendChild(el('label', { class: 'ev-import', for: impId }, [el('span', { text: 'Import JSON' }), el('input', { type: 'file', id: impId, accept: 'application/json,.json' })]));
    actions.appendChild(el('button', { type: 'button', id: 'btn-reset', text: 'Start over' }));
    sec.appendChild(actions);
    sec.appendChild(el('div', { id: 'import-errors', role: 'alert' }));
    sec.appendChild(el('p', { class: 'ev-hint', text: 'Everything happens in your browser. Nothing is saved or sent anywhere unless you download it. This assessment is not externally certified: the tiers are proposed editorial policy.' }));
    return sec;
  }

  function buildExamples() {
    var box = el('div', { class: 'ev-examples' });
    box.appendChild(el('h2', { text: 'Hypothetical examples' }));
    box.appendChild(el('p', { class: 'ev-hint', text: fw.exampleNote }));
    var row = el('div', { class: 'ev-actions' });
    fw.examples.forEach(function (ex) { row.appendChild(el('button', { type: 'button', 'data-example': ex.id, text: 'Load ' + ex.name })); });
    box.appendChild(row);
    box.appendChild(el('p', { id: 'example-lesson', class: 'ev-lesson', role: 'status' }));
    return box;
  }

  function build() {
    root.textContent = '';
    var nav = el('nav', { class: 'ev-steps', 'aria-label': 'Evaluation steps' }, [el('ol', null, [
      ['#step-1', 'Identify'], ['#step-2', 'Eligibility'], ['#step-3', 'Principles'], ['#step-4', 'Verification'], ['#step-5', 'Results']
    ].map(function (s) { return el('li', null, [el('a', { href: s[0], text: s[1] })]); }))]);
    var main = el('div', { class: 'ev-main' }, [buildExamples(), buildIdentity(), buildEligibility(), buildPrinciples(), buildTests(), buildResults()]);
    var aside = el('aside', { class: 'ev-aside', 'aria-label': 'Live summary' }, [el('h2', { text: 'Live summary' }), el('div', { id: 'live' })]);
    root.appendChild(nav);
    root.appendChild(el('div', { class: 'ev-layout' }, [main, aside]));
  }

  /* ---------- state <-> form ---------- */
  function populate() {
    root.querySelectorAll('[data-path]').forEach(function (n) {
      var path = n.getAttribute('data-path');
      var v = getPath(state, path);
      if (n.type === 'radio') n.checked = (String(v === null || v === undefined ? '' : v) === n.value);
      else if (n.type === 'checkbox') n.checked = v === true;
      else n.value = v === null || v === undefined ? '' : String(v);
    });
  }

  function onChange(e) {
    var n = e.target;
    if (!n.getAttribute) return;
    var path = n.getAttribute('data-path');
    if (!path) return;
    var val;
    if (n.type === 'checkbox') val = n.checked;
    else if (n.type === 'radio') {
      if (!n.checked) return;
      val = n.value;
      if (/\.rating$/.test(path)) val = val === '' ? null : parseInt(val, 10);
    } else {
      val = n.value;
      if (/\.confidence$/.test(path)) val = val === '' ? null : val;
    }
    setPath(state, path, val);
    render();
  }

  /* ---------- results ---------- */
  function badge(result) {
    var id = result.classification.id;
    var symbol = { tier1: '★', tier2: '★', tier3: '○', not_certified: '✕', unverified: '?' }[id];
    return el('p', { class: 'ev-verdict ev-v-' + id }, [el('span', { 'aria-hidden': 'true', text: symbol + ' ' }), result.classification.label]);
  }

  function weightedBars(result) {
    var list = el('ul', { class: 'ev-bars' });
    result.contributions.forEach(function (c) {
      var li = el('li', { class: 'ev-bar-row' });
      li.appendChild(el('div', { class: 'ev-bar-head' }, [el('strong', { text: c.priority + '. ' + c.name }), el('span', { text: ' weight ' + c.weight + '%' })]));
      li.appendChild(el('div', { class: 'ev-bar-text', text: c.rating === null ? 'Not assessed' : 'Rating ' + c.rating + ' / 5, contribution ' + S.formatScore(c.contribution) + ' of ' + c.weight }));
      var track = el('div', { class: 'ev-track' + (c.rating === null ? ' ev-track-empty' : ''), style: 'width:' + (c.weight / maxWeight * 100) + '%', 'aria-hidden': 'true' });
      if (c.rating !== null) track.appendChild(el('div', { class: 'ev-fill', style: 'width:' + (c.contribution / c.weight * 100) + '%' }));
      li.appendChild(track);
      list.appendChild(li);
    });
    return list;
  }
  function ratingBars(result) {
    var list = el('ul', { class: 'ev-bars' });
    result.contributions.forEach(function (c) {
      var li = el('li', { class: 'ev-bar-row' });
      li.appendChild(el('div', { class: 'ev-bar-head' }, [el('strong', { text: c.name }), el('span', { text: c.rating === null ? ' not assessed' : ' ' + c.rating + ' / 5' })]));
      var track = el('div', { class: 'ev-track ev-track-full' + (c.rating === null ? ' ev-track-empty' : ''), 'aria-hidden': 'true' });
      if (c.rating !== null) track.appendChild(el('div', { class: 'ev-fill ev-fill-quality', style: 'width:' + (c.rating / 5 * 100) + '%' }));
      li.appendChild(track);
      list.appendChild(li);
    });
    return list;
  }

  function renderLive(result) {
    var live = document.getElementById('live');
    live.textContent = '';
    live.appendChild(badge(result));
    live.appendChild(el('p', { class: 'ev-score', text: result.complete ? result.scoreDisplay + ' / 100' : 'Score not available' }));
    live.appendChild(el('p', { class: 'ev-hint', text: result.assessedCount + ' of ' + result.totalPrinciples + ' principles rated. Eligibility: ' + result.eligibility.verdict + '.' }));
    if (result.eligibility.failures.length) live.appendChild(el('p', { class: 'ev-warn', text: 'Failed: ' + result.eligibility.failures.join(', ') }));
  }

  function renderResults(result) {
    var box = document.getElementById('results');
    box.textContent = '';
    var name = state.software.name.trim() || 'Unnamed software';
    box.appendChild(el('h3', { text: name + (state.software.version ? ' ' + state.software.version : '') }));
    box.appendChild(badge(result));
    result.classification.reasons.forEach(function (r) { box.appendChild(el('p', { text: r })); });

    var facts = el('dl', { class: 'ev-facts' });
    function fact(k, v) { facts.appendChild(el('dt', { text: k })); facts.appendChild(el('dd', { text: v })); }
    fact('Weighted score', result.complete ? result.scoreDisplay + ' / 100' : 'Not available until every principle is rated');
    fact('Assessment completeness', result.assessedCount + ' of ' + result.totalPrinciples + ' principles rated' + (result.missing.length ? ' (missing: ' + result.missing.map(principleName).join(', ') + ')' : ''));
    fact('Mandatory eligibility', result.eligibility.verdict === 'satisfied' ? 'Satisfied' : result.eligibility.verdict === 'failed' ? 'Failed: ' + result.eligibility.failures.join(', ') : 'Not established: ' + result.eligibility.unverified.join(', '));
    fact('Framework', fw.name + ' v' + fw.version);
    box.appendChild(facts);

    box.appendChild(el('h3', { text: 'Eligibility' }));
    var el1 = el('ul', { class: 'ev-list' });
    result.eligibility.detail.forEach(function (d) {
      var s = STATUS_LABEL[d.status];
      el1.appendChild(el('li', { text: d.id + ' ' + d.title + ': ' + s.symbol + ' ' + s.label + (d.reason ? ' (' + d.reason + ')' : '') }));
    });
    box.appendChild(el1);

    box.appendChild(el('h3', { text: 'Weighted contribution of each principle' }));
    box.appendChild(weightedBars(result));
    box.appendChild(el('h3', { text: 'Ratings on a common 0 to 5 scale' }));
    box.appendChild(ratingBars(result));

    if (result.warnings.length) {
      box.appendChild(el('h3', { text: 'Warnings' }));
      box.appendChild(el('ul', { class: 'ev-list' }, result.warnings.map(function (w) { return el('li', { text: w }); })));
    }
    if (result.eligibility.failures.length) {
      box.appendChild(el('h3', { text: 'Critical failures' }));
      box.appendChild(el('ul', { class: 'ev-list' }, result.eligibility.failures.map(function (id) {
        var e = fw.eligibility.filter(function (x) { return x.id === id; })[0];
        return el('li', { text: id + ' ' + e.title + ': ' + e.question });
      })));
    }
    var recs = result.actions.concat(result.weaknesses.map(function (w) { return w.name + ' (rated ' + w.rating + '/5): ' + w.recommendation; }));
    box.appendChild(el('h3', { text: 'Weaknesses and recommended improvements' }));
    box.appendChild(recs.length ? el('ul', { class: 'ev-list' }, recs.map(function (r) { return el('li', { text: r }); })) : el('p', { text: 'None flagged by the rating rules.' }));

    box.appendChild(el('h3', { text: 'Evidence coverage' }));
    var tbl = el('table', { class: 'fw-table' }, [
      el('thead', null, [el('tr', null, [el('th', { scope: 'col', text: 'Principle' }), el('th', { scope: 'col', text: 'Evidence statement' }), el('th', { scope: 'col', text: 'Verification items checked' })])])
    ]);
    var tb = el('tbody');
    result.coverage.forEach(function (c) {
      tb.appendChild(el('tr', null, [el('th', { scope: 'row', text: c.name }), el('td', { text: c.hasEvidence ? 'Recorded' : 'Missing' }), el('td', { text: c.verificationChecked + ' of ' + c.verificationTotal })]));
    });
    tbl.appendChild(tb);
    box.appendChild(el('div', { class: 'table-wrap' }, [tbl]));
  }

  function renderEligibilitySummary(result) {
    var p = document.getElementById('elig-summary');
    if (!p) return;
    var v = result.eligibility.verdict;
    p.textContent = v === 'satisfied' ? 'Eligibility summary: all five requirements are satisfied.'
      : v === 'failed' ? 'Eligibility summary: failed (' + result.eligibility.failures.join(', ') + '). Certification is blocked, but you can continue.'
      : 'Eligibility summary: not yet established (' + result.eligibility.unverified.join(', ') + ').';
    root.querySelectorAll('[data-req]').forEach(function (fs) {
      var id = fs.getAttribute('data-req');
      var na = state.eligibility[id].status === 'not_applicable';
      var just = fs.querySelector('[data-for-na]');
      if (just) just.hidden = !na;
    });
  }

  var current = null;
  function render() {
    current = S.computeResult(fw, state);
    renderLive(current);
    renderResults(current);
    renderEligibilitySummary(current);
  }

  /* ---------- actions ---------- */
  function download(name, text, type) {
    var blob = new Blob([text], { type: type + ';charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  function fileBase() { return 'sovereign-assessment-' + slug(state.software.name) + '-' + (state.evaluation.date || todayISO()); }

  function isPristine() { return JSON.stringify(state) === JSON.stringify(newState()); }
  function loadState(next) { state = next; populate(); render(); }

  function showErrors(list) {
    var box = document.getElementById('import-errors');
    box.textContent = '';
    if (!list.length) return;
    box.appendChild(el('p', { text: 'The file was not imported:' }));
    box.appendChild(el('ul', { class: 'ev-list' }, list.slice(0, 12).map(function (m) { return el('li', { text: m }); })));
    box.setAttribute('tabindex', '-1'); box.focus();
  }

  function loadExample(id) {
    var ex = fw.examples.filter(function (x) { return x.id === id; })[0];
    if (!ex) return;
    if (!isPristine() && !window.confirm('Replace the current assessment with this example?')) return;
    var a = newState();
    a.software.name = ex.name;
    a.software.category = 'Hypothetical example';
    a.evaluation.notes = fw.exampleNote;
    fw.principles.forEach(function (p) {
      var pr = a.principles[p.id];
      pr.rating = ex.ratings[p.id];
      pr.evidence = 'Hypothetical example for illustration. Not an audit of any real product.';
      pr.confidence = 'high';
    });
    fw.eligibility.forEach(function (e) {
      a.eligibility[e.id].status = ex.eligibility[e.id];
      a.eligibility[e.id].evidence = 'Hypothetical example for illustration.';
    });
    loadState(a);
    var lesson = document.getElementById('example-lesson');
    lesson.textContent = ex.summary + ' ' + ex.lesson;
    showErrors([]);
  }

  function wire() {
    root.addEventListener('input', onChange);
    root.addEventListener('change', onChange);
    root.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b) return;
      if (b.id === 'btn-md') download(fileBase() + '.md', S.toMarkdown(fw, state, current), 'text/markdown');
      else if (b.id === 'btn-json') download(fileBase() + '.json', S.toJSON(fw, state, current), 'application/json');
      else if (b.id === 'btn-reset') { if (isPristine() || window.confirm('Discard this assessment and start over?')) { loadState(newState()); document.getElementById('example-lesson').textContent = ''; showErrors([]); } }
      else if (b.getAttribute('data-example')) loadExample(b.getAttribute('data-example'));
    });
    root.addEventListener('change', function (e) {
      var n = e.target;
      if (!n || n.type !== 'file') return;
      var f = n.files && n.files[0];
      n.value = '';
      if (!f) return;
      if (f.size > 1000000) { showErrors(['The file is larger than 1 MB.']); return; }
      var reader = new FileReader();
      reader.onerror = function () { showErrors(['The file could not be read.']); };
      reader.onload = function () {
        var res = S.parseImport(fw, String(reader.result));
        if (!res.ok) { showErrors(res.errors); return; }
        if (!isPristine() && !window.confirm('Replace the current assessment with the imported file?')) return;
        loadState(res.assessment);
        showErrors([]);
      };
      reader.readAsText(f);
    });
  }

  build();
  populate();
  wire();
  render();

  /* copy button for the repository checklist, which is rendered by Hugo */
  var copy = document.getElementById('copy-checklist');
  if (copy) copy.addEventListener('click', function () {
    var src = document.getElementById('pr-template-code');
    if (!src) return;
    var done = function () { copy.setAttribute('title', 'Copied'); setTimeout(function () { copy.setAttribute('title', 'Copy template'); }, 1500); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(src.textContent).then(done, function () {});
    else { var t = document.createElement('textarea'); t.value = src.textContent; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (x) {} document.body.removeChild(t); }
  });
})();

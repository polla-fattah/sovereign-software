/* Sovereign Software Index: filtering, sorting, and computed classifications.
   The page is fully rendered by Hugo, so everything works without this script except
   filtering. Classifications and scores are never stored: for an entry with a complete
   assessment they are computed here by the shared scoring engine. */
(function () {
  'use strict';
  var fw = window.SOVEREIGN_FRAMEWORK;
  var S = window.SovereignScoring;
  if (!fw || !S) return;

  function text(n, role, value) {
    var t = n.querySelector('[data-role="' + role + '"]');
    if (t) t.textContent = value;
    return t;
  }

  function evaluate(entry) {
    if (!entry || entry.assessment_status !== 'complete') return null;
    return S.computeResult(fw, S.assessmentFromEntry(fw, entry));
  }

  function extremes(result) {
    var rated = result.contributions.filter(function (c) { return c.rating !== null; });
    if (!rated.length) return { strongest: [], weakest: [] };
    var max = Math.max.apply(null, rated.map(function (c) { return c.rating; }));
    var min = Math.min.apply(null, rated.map(function (c) { return c.rating; }));
    return {
      strongest: rated.filter(function (c) { return c.rating === max; }).map(function (c) { return c.id; }),
      weakest: rated.filter(function (c) { return c.rating === min; }).map(function (c) { return c.id; })
    };
  }

  /* ---------- detail page ---------- */
  var detail = document.getElementById('entry-result');
  if (detail && window.SOVEREIGN_ENTRY) {
    var res = evaluate(window.SOVEREIGN_ENTRY);
    if (res) {
      detail.textContent = '';
      var h = document.createElement('h2'); h.textContent = '3. Final classification'; detail.appendChild(h);
      var p = document.createElement('p'); var s = document.createElement('strong'); s.textContent = res.classification.label; p.appendChild(s); detail.appendChild(p);
      var sc = document.createElement('p'); sc.textContent = res.complete ? 'Weighted score: ' + res.scoreDisplay + ' / 100.' : 'Weighted score: not available.'; detail.appendChild(sc);
      res.classification.reasons.concat(res.warnings).forEach(function (r) { var q = document.createElement('p'); q.textContent = r; detail.appendChild(q); });
    }
    return;
  }

  /* ---------- list page ---------- */
  var grid = document.getElementById('directory-grid');
  var entries = window.SOVEREIGN_DIRECTORY;
  if (!grid || !entries) return;

  var byId = {};
  entries.forEach(function (e) { byId[e.id] = e; });
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.dir-card'));
  var anyComplete = false;

  cards.forEach(function (card) {
    var entry = byId[card.getAttribute('data-id')];
    var r = evaluate(entry);
    if (!r) return;
    anyComplete = true;
    card.setAttribute('data-class', r.classification.id);
    text(card, 'class', r.classification.label).className = 'dir-badge dir-b-' + r.classification.id;
    text(card, 'score', r.complete ? 'Weighted score: ' + r.scoreDisplay + ' / 100' : 'Weighted score: not available');
    if (r.complete) card.setAttribute('data-score', String(r.score));
    var ex = extremes(r);
    card.setAttribute('data-strongest', ex.strongest.join(' '));
    card.setAttribute('data-weakest', ex.weakest.join(' '));
  });

  var ui = {
    q: document.getElementById('dir-search'),
    category: document.getElementById('dir-category'),
    tier: document.getElementById('dir-tier'),
    status: document.getElementById('dir-status'),
    strongest: document.getElementById('dir-strongest'),
    weakest: document.getElementById('dir-weakest'),
    sort: document.getElementById('dir-sort')
  };
  var count = document.getElementById('dir-count');
  var hint = document.getElementById('dir-hint');

  function haystack(card) {
    var e = byId[card.getAttribute('data-id')];
    return [e.name, e.category, e.summary, e.substrate, e.syncModel].join(' ').toLowerCase();
  }
  var hay = {};
  cards.forEach(function (c) { hay[c.getAttribute('data-id')] = haystack(c); });

  function apply() {
    var q = ui.q.value.trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var ok = true;
      if (q && hay[card.getAttribute('data-id')].indexOf(q) < 0) ok = false;
      if (ui.category.value && card.getAttribute('data-category') !== ui.category.value) ok = false;
      if (ui.status.value && card.getAttribute('data-status') !== ui.status.value) ok = false;
      if (ui.tier.value && card.getAttribute('data-class') !== ui.tier.value) ok = false;
      if (ui.strongest.value && (card.getAttribute('data-strongest') || '').split(' ').indexOf(ui.strongest.value) < 0) ok = false;
      if (ui.weakest.value && (card.getAttribute('data-weakest') || '').split(' ').indexOf(ui.weakest.value) < 0) ok = false;
      card.hidden = !ok;
      if (ok) visible++;
    });

    /* numeric sorting applies only to complete, comparable assessments */
    var sorted = cards.slice().sort(function (a, b) {
      if (ui.sort.value === 'score') {
        var sa = a.getAttribute('data-score'), sb = b.getAttribute('data-score');
        if (sa && sb) return parseFloat(sb) - parseFloat(sa);
        if (sa) return -1;
        if (sb) return 1;
      }
      return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
    });
    sorted.forEach(function (c) { grid.appendChild(c); });

    count.textContent = visible === cards.length ? 'Showing all ' + cards.length + ' entries.' : 'Showing ' + visible + ' of ' + cards.length + ' entries.';
    var msgs = [];
    if (!anyComplete && (ui.tier.value || ui.strongest.value || ui.weakest.value || ui.sort.value === 'score')) {
      msgs.push('No entry has a complete framework v2.0 assessment yet, so tier, principle, and score filters have nothing to match, and score sorting has no effect.');
    }
    if (visible === 0) msgs.push('No entries match these filters.');
    hint.textContent = msgs.join(' ');
  }

  ['q'].forEach(function (k) { ui[k].addEventListener('input', apply); });
  ['category', 'tier', 'status', 'strongest', 'weakest', 'sort'].forEach(function (k) { ui[k].addEventListener('change', apply); });
  apply();
})();

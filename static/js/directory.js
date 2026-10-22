/* Sovereign Software Index: filtering and computed determinations.
   The page is fully rendered by Hugo, so everything works without this script except
   filtering. Determinations are never stored: for an entry with a complete assessment they
   are computed here by the shared assessment engine. */
(function () {
  'use strict';
  var fw = window.SOVEREIGN_FRAMEWORK;
  var S = window.SovereignAssessment;
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

  /* ---------- detail page ---------- */
  var detail = document.getElementById('entry-result');
  if (detail && window.SOVEREIGN_ENTRY) {
    var res = evaluate(window.SOVEREIGN_ENTRY);
    if (res) {
      detail.textContent = '';
      var h = document.createElement('h2'); h.textContent = '3. Overall determination'; detail.appendChild(h);
      var p = document.createElement('p'); var s = document.createElement('strong'); s.textContent = res.determination.label; p.appendChild(s); detail.appendChild(p);
      res.determination.reasons.concat(res.warnings).forEach(function (r) { var q = document.createElement('p'); q.textContent = r; detail.appendChild(q); });
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
    var r = evaluate(byId[card.getAttribute('data-id')]);
    if (!r) return;
    anyComplete = true;
    card.setAttribute('data-det', r.determination.id);
    text(card, 'det', r.determination.label).className = 'dir-badge dir-b-' + r.determination.id;
    card.setAttribute('data-attention', r.profile.filter(function (c) { return c.finding === 'partial' || c.finding === 'does_not_meet'; }).map(function (c) { return c.id; }).join(' '));
  });

  var ui = {
    q: document.getElementById('dir-search'),
    category: document.getElementById('dir-category'),
    det: document.getElementById('dir-det'),
    status: document.getElementById('dir-status'),
    attention: document.getElementById('dir-attention')
  };
  var count = document.getElementById('dir-count');
  var hint = document.getElementById('dir-hint');

  var hay = {};
  cards.forEach(function (c) {
    var e = byId[c.getAttribute('data-id')];
    hay[c.getAttribute('data-id')] = [e.name, e.category, e.summary, e.substrate, e.syncModel].join(' ').toLowerCase();
  });

  function apply() {
    var q = ui.q.value.trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var ok = true;
      if (q && hay[card.getAttribute('data-id')].indexOf(q) < 0) ok = false;
      if (ui.category.value && card.getAttribute('data-category') !== ui.category.value) ok = false;
      if (ui.status.value && card.getAttribute('data-status') !== ui.status.value) ok = false;
      if (ui.det.value && card.getAttribute('data-det') !== ui.det.value) ok = false;
      if (ui.attention.value && (card.getAttribute('data-attention') || '').split(' ').indexOf(ui.attention.value) < 0) ok = false;
      card.hidden = !ok;
      if (ok) visible++;
    });
    count.textContent = visible === cards.length ? 'Showing all ' + cards.length + ' entries.' : 'Showing ' + visible + ' of ' + cards.length + ' entries.';
    var msgs = [];
    if (!anyComplete && (ui.attention.value || (ui.det.value && ui.det.value !== 'insufficient_evidence'))) {
      msgs.push('No entry has a complete assessment yet, so this filter has nothing to match.');
    }
    if (visible === 0) msgs.push('No entries match these filters.');
    hint.textContent = msgs.join(' ');
  }

  ui.q.addEventListener('input', apply);
  ['category', 'det', 'status', 'attention'].forEach(function (k) { ui[k].addEventListener('change', apply); });
  apply();
})();

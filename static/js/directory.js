/* Sovereign Software Index: search, discipline filter, and computed determinations.
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

  var search = document.getElementById('dir-search');
  var select = document.getElementById('dir-category');
  var count = document.getElementById('dir-count');
  var clear = document.getElementById('dir-clear');
  var category = '';

  var hay = {};
  cards.forEach(function (c) {
    var e = byId[c.getAttribute('data-id')];
    hay[c.getAttribute('data-id')] = [e.name, e.category, e.summary, e.substrate, e.syncModel].join(' ').toLowerCase();
  });

  function apply() {
    var q = search.value.trim().toLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var ok = true;
      if (q && hay[card.getAttribute('data-id')].indexOf(q) < 0) ok = false;
      if (category && card.getAttribute('data-category') !== category) ok = false;
      card.hidden = !ok;
      if (ok) visible++;
    });
    /* say which filters are active, so a combined result never looks like a broken button */
    var active = [];
    if (category) active.push('in ' + category);
    if (q) active.push('matching “' + search.value.trim() + '”');
    var what = visible === 1 ? '1 entry' : visible + ' entries';
    count.textContent = !active.length ? 'Showing all ' + cards.length + ' entries.'
      : visible === 0 ? 'No entries ' + active.join(' ') + '.'
      : 'Showing ' + what + ' ' + active.join(' ') + '.';
    clear.hidden = !active.length;
  }

  function setCategory(value) {
    category = value;
    select.value = value;
    select.className = value ? 'is-set' : '';
  }

  search.addEventListener('input', apply);
  select.addEventListener('change', function () { setCategory(select.value); apply(); });
  clear.addEventListener('click', function () { search.value = ''; setCategory(''); apply(); search.focus(); });
  apply();
})();

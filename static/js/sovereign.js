// Sovereign Personal Software — Client-Side Interactivity for Hugo Build
const DIRECTORY_ITEMS = window.DIRECTORY_ITEMS || [];
const GATES = window.GATES || [];

let activeCategory = 'ALL';
let gateState = { gate1: false, gate2: false, gate3: false, gate4: false, gate5: false, gate6: false, gate7: false };
let evaluatorTouched = false;

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('directory-grid')) renderDirectory();
  if (document.getElementById('evaluator-questions')) { renderEvaluatorQuestions(); updateEvaluator(); }
});

function filterDirectory(category) {
      activeCategory = category;
      document.querySelectorAll('.cat-btn').forEach(btn => {
        if (btn.dataset.cat === category) {
          btn.className = "cat-btn px-3 py-1.5 rounded-lg bg-amber-500 text-obsidian-950 font-semibold";
        } else {
          btn.className = "cat-btn px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-obsidian-700";
        }
      });
      renderDirectory();
    }
function renderDirectory() {
      const grid = document.getElementById('directory-grid');
      const query = (document.getElementById('dir-search')?.value || '').toLowerCase();

      const filtered = DIRECTORY_ITEMS.filter(item => {
        const matchesCat = activeCategory === 'ALL' || item.category === activeCategory;
        const matchesQuery = !query ||
          item.name.toLowerCase().includes(query) ||
          item.substrate.toLowerCase().includes(query) ||
          item.summary.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query);
        return matchesCat && matchesQuery;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 font-mono text-sm text-slate-500">No audited tools match your filter criteria.</div>`;
        return;
      }

      grid.innerHTML = filtered.map(item => {
        const badgeStyle = item.tier === 'TIER_1'
          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
          : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';

        return `
          <div class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-obsidian-900 p-6 flex flex-col justify-between space-y-5 hover:border-amber-500/50 transition-all shadow-sm">
            <div class="space-y-3">
              <div class="flex items-center justify-between gap-2">
                <span class="font-mono text-[11px] uppercase tracking-wider text-slate-400">${item.category}</span>
                <span class="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold border ${badgeStyle}">
                  ${item.tierLabel}
                </span>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white">${item.name}</h3>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${item.summary}</p>
            </div>

            <div class="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800 font-mono text-xs">
              <div>
                <span class="text-slate-400 block text-[10px]">STORAGE SUBSTRATE:</span>
                <span class="text-slate-800 dark:text-slate-200 font-medium">${item.substrate}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[10px]">SYNCHRONIZATION / RUNTIME:</span>
                <span class="text-slate-700 dark:text-slate-300">${item.syncModel}</span>
              </div>
              <div class="p-2.5 rounded-lg bg-stone-100 dark:bg-obsidian-950 border border-slate-200 dark:border-slate-800/80 text-[11px] text-amber-700 dark:text-amber-400 overflow-x-auto">
                <code>$ ${item.extractCmd}</code>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
function renderEvaluatorQuestions() {
      const container = document.getElementById('evaluator-questions');
      container.innerHTML = GATES.map(g => `
        <label for="${g.id}" class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-stone-50/70 dark:bg-obsidian-800/50 cursor-pointer hover:border-amber-500/40 transition-all">
          <input type="checkbox" id="${g.id}" ${gateState[g.id] ? 'checked' : ''} onchange="toggleGate('${g.id}')" class="mt-1 w-4 h-4 accent-amber-500 rounded cursor-pointer" />
          <div class="space-y-1">
            <div class="font-mono text-xs font-bold text-slate-900 dark:text-white">${g.title}</div>
            <div class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${g.desc}</div>
          </div>
        </label>
      `).join('');
    }
function toggleGate(id) {
      const el = document.getElementById(id);
      if (el) gateState[id] = el.checked;
      evaluatorTouched = true;
      updateEvaluator();
    }
function setEvaluatorPreset(preset) {
      const nameInput = document.getElementById('eval-app-name');
      evaluatorTouched = true;
      if (preset === 'canonical') {
        nameInput.value = "Git";
        GATES.forEach(g => gateState[g.id] = true);
      } else if (preset === 'freecad') {
        nameInput.value = "FreeCAD (illustrative example)";
        gateState = { gate1: true, gate2: false, gate3: true, gate4: false, gate5: true, gate6: false, gate7: true };
      } else if (preset === 'cloud') {
        nameInput.value = "Cloud SaaS workspace (illustrative example)";
        GATES.forEach(g => gateState[g.id] = false);
      }
      renderEvaluatorQuestions();
      updateEvaluator();
    }
function updateEvaluator() {
      const appName = document.getElementById('eval-app-name')?.value || 'Unnamed tool';
      const passedCount = GATES.filter(g => gateState[g.id]).length;
      const pct = Math.round((passedCount / GATES.length) * 100);

      document.getElementById('eval-score-number').textContent = `${passedCount}/7`;
      document.getElementById('eval-percentage').textContent = `${pct}% SOVEREIGN COMPLIANCE`;

      const bar = document.getElementById('eval-progress-bar');
      const badge = document.getElementById('eval-tier-badge');
      bar.style.width = `${pct}%`;

      if (!evaluatorTouched) {
        bar.className = "h-full bg-slate-400 transition-all duration-300";
        badge.className = "px-3 py-1 rounded-full font-mono text-xs font-bold bg-slate-500/15 text-slate-500 border border-slate-400/30";
        badge.textContent = "NOT YET SCORED";
      } else if (passedCount === 7) {
        bar.className = "h-full bg-emerald-500 transition-all duration-300";
        badge.className = "px-3 py-1 rounded-full font-mono text-xs font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30";
        badge.textContent = "CANONICAL TIER 1";
      } else if (passedCount >= 5 && gateState.gate1 && gateState.gate3) {
        bar.className = "h-full bg-amber-500 transition-all duration-300";
        badge.className = "px-3 py-1 rounded-full font-mono text-xs font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30";
        badge.textContent = "TIER 2 • SOVEREIGN CORE";
      } else {
        bar.className = "h-full bg-rose-500 transition-all duration-300";
        badge.className = "px-3 py-1 rounded-full font-mono text-xs font-bold bg-rose-500/20 text-rose-500 border border-rose-500/30";
        badge.textContent = "FAILS STANDARD";
      }

      const diagContainer = document.getElementById('eval-diagnostics');
      const failedGates = GATES.filter(g => !gateState[g.id]);
      if (!evaluatorTouched) {
        diagContainer.innerHTML = `<div class="p-3 rounded-lg bg-slate-500/10 border border-slate-400/30 text-slate-500">Tick each gate the tool passes, or load an example. Unticked gates are treated as failed.</div>`;
      } else if (failedGates.length === 0) {
        diagContainer.innerHTML = `<div class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">✓ Passes all 7 Engineering Evaluation Gates without compromise. Eligible for Canonical Tier 1 inclusion.</div>`;
      } else {
        diagContainer.innerHTML = failedGates.map(f => `
          <div class="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-500">
            ✕ ${f.failMsg}
          </div>
        `).join('');
      }

      // Build Markdown snippet
      const mdLines = [
        `### Sovereign Software Audit: ${appName}`,
        `**Result:** ${passedCount}/7 Gates Passed (${pct}%) — **${badge.textContent}**`,
        ``,
        ...GATES.map(g => `- [${gateState[g.id] ? 'x' : ' '}] ${g.title}`)
      ];
      document.getElementById('eval-markdown-output').textContent = mdLines.join('\n');
    }
function showToast(msg) {
      const toast = document.getElementById('toast');
      const label = document.getElementById('toast-message');
      label.textContent = msg;
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 2600);
    }
function copyTextToClipboard(text, message) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast(message || 'Copied to clipboard');
      } catch (err) {
        showToast('Copy failed — please select manually');
      }
      document.body.removeChild(textarea);
    }
function copyCodeBlock(elementId) {
      const el = document.getElementById(elementId);
      if (el) copyTextToClipboard(el.textContent, 'Specification copied to clipboard');
    }
function copyAuditReport() {
      const el = document.getElementById('eval-markdown-output');
      if (el) copyTextToClipboard(el.textContent, 'Audit Markdown report copied');
    }

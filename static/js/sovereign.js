// Sovereign Personal Software — Client-Side Interactivity for Hugo Build
const t0 = performance.now();
const DIRECTORY_ITEMS = [
  {
    "name": "Git",
    "category": "VCS & Core",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Content-Addressable Merkle DAG (.git)",
    "syncModel": "Decentralized SSH / HTTPS push-pull",
    "summary": "The archetype of sovereign software. Full commit history lives on your local disk, verified via cryptographic hashes, with 100% offline branching, diffing, and merging.",
    "extractCmd": "git bundle create repo.bundle --all"
  },
  {
    "name": "Jujutsu (jj)",
    "category": "VCS & Core",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Append-only Operation Log + Git Backend",
    "syncModel": "Git-compatible remotes / Native local",
    "summary": "Next-generation version control where even conflicts and rebases are recorded as deterministic, first-class mathematical states in an undoable local operation log.",
    "extractCmd": "jj op log --limit 20"
  },
  {
    "name": "SQLite",
    "category": "VCS & Core",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Single Cross-Platform B-Tree Disk File",
    "syncModel": "Local Embedded Engine (Zero Network)",
    "summary": "Library of Congress permanent archival standard. Delivers microsecond local queries with zero server daemons, zero configuration, and guaranteed backward compatibility through 2050.",
    "extractCmd": "sqlite3 data.db .dump > archive.sql"
  },
  {
    "name": "Fossil SCM",
    "category": "VCS & Core",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Single Standalone SQLite Database File",
    "syncModel": "Peer-to-peer HTTP/SSH sync",
    "summary": "Engineered by the creator of SQLite. Packages version control, tickets, bug tracking, and wiki documentation into one durable SQLite file that runs an instant air-gapped web UI.",
    "extractCmd": "fossil ui repository.fossil"
  },
  {
    "name": "Taskwarrior / Todo.txt",
    "category": "Tasks & Finance",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Plain-Text Grammar / Local State Store",
    "syncModel": "Local Hooks / Sync Server / Syncthing",
    "summary": "Pure execution-layer task tools. Sub-10ms CLI latency, deterministic date/priority grammars, and complete separation from long-form note bloat.",
    "extractCmd": "task export > commitments.json"
  },
  {
    "name": "Beancount / hledger",
    "category": "Tasks & Finance",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "UTF-8 Plain-Text Double-Entry Ledgers",
    "syncModel": "Git Version Control / File Sync",
    "summary": "Plain-Text Accounting (PTA). Enforces strict double-entry mathematical invariants locally without bank scraping breakages or recurring cloud subscriptions.",
    "extractCmd": "bean-query ledger.beancount 'SELECT account, sum(position)'"
  },
  {
    "name": "Actual Budget",
    "category": "Tasks & Finance",
    "tier": "TIER_2",
    "tierLabel": "Tier 2 • Sovereign Core",
    "substrate": "Client-Side SQLite + Merkle CRDTs",
    "syncModel": "Self-Hosted Docker Sync with E2EE",
    "summary": "Local-first zero-based budgeting. Runs entirely offline against a local SQLite database and synchronizes across devices via verifiable Hybrid Logical Clock CRDT messages.",
    "extractCmd": "Export standard SQLite / CSV archive"
  },
  {
    "name": "Obsidian / Logseq",
    "category": "Knowledge & Office",
    "tier": "TIER_2",
    "tierLabel": "Tier 2 • Sovereign Core",
    "substrate": "Local Directory of Plain Markdown (.md)",
    "syncModel": "Decoupled (Syncthing, Git, or E2EE)",
    "summary": "Exemplifies the 'File Over App' paradigm. Notes remain standard UTF-8 Markdown files on your local filesystem, editable simultaneously in Vim, VS Code, or bash.",
    "extractCmd": "cp -r ~/Vault /backup/plain-markdown/"
  },
  {
    "name": "Emacs Org-Mode",
    "category": "Knowledge & Office",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Plain-Text .org Outlines",
    "syncModel": "Git / rsync / Syncthing",
    "summary": "The grand-ancestor of sovereign personal computing. Unifies structured prose, deterministic agendas, tables, and literate programming inside immortal plain text.",
    "extractCmd": "emacs --batch file.org -f org-html-export-to-html"
  },
  {
    "name": "Typst & Hugo",
    "category": "Knowledge & Office",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Plain-Text Markup (.typ, .md)",
    "syncModel": "Single Zero-Dependency Native Binary",
    "summary": "Deterministic document typesetting and static site compilation that pass the 100ms test—recompiling complex multi-page documents and sites in milliseconds offline.",
    "extractCmd": "typst compile manuscript.typ output.pdf"
  },
  {
    "name": "Paperless-ngx",
    "category": "Knowledge & Office",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Pristine Original PDFs + PDF/A + SQLite",
    "syncModel": "Self-Hosted Container / Local Filesystem",
    "summary": "Enforces the Archive Invariant: never locks or mutates original documents inside a proprietary blob. Stores untouched PDFs on disk alongside archival PDF/A files.",
    "extractCmd": "document_exporter ../export --no-progress-bar"
  },
  {
    "name": "LibreOffice (ODF)",
    "category": "Knowledge & Office",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "ISO/IEC 26300 OpenDocument XML (.odt/.ods)",
    "syncModel": "Local Filesystem",
    "summary": "Full desktop office suite running 100% air-gapped. Native files are standard zip containers holding documented XML (`content.xml`) extractable with basic POSIX unzip.",
    "extractCmd": "unzip -p document.odt content.xml | xmllint --format -"
  },
  {
    "name": "OpenSCAD",
    "category": "Engineering & CAD",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Programmatic CSG Plain-Text Scripts (.scad)",
    "syncModel": "Git Version Control",
    "summary": "Code-first 3D solid modeling. Eliminates the non-deterministic Topological Naming Problem of GUI CAD kernels; identical script inputs yield identical meshes.",
    "extractCmd": "openscad -o part.stl model.scad"
  },
  {
    "name": "KiCad",
    "category": "Engineering & CAD",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Plain-Text S-Expressions (.kicad_sch/.kicad_pcb)",
    "syncModel": "Git / Local Vendor Libraries",
    "summary": "Electronic schematic capture and PCB design suite where every net, footprint, and trace is stored in human-readable S-expressions with zero cloud licensing.",
    "extractCmd": "kicad-cli pcb export gerbers board.kicad_pcb"
  },
  {
    "name": "NGSPICE",
    "category": "Engineering & CAD",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Plain-Text SPICE Netlists (.cir / .sp)",
    "syncModel": "Standalone POSIX CLI",
    "summary": "Deterministic analog and mixed-signal circuit simulator solving differential equations directly from human-readable netlists without network dependencies.",
    "extractCmd": "ngspice -b -r rawfile.raw circuit.cir"
  },
  {
    "name": "REAPER",
    "category": "Media & Creative",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Human-Readable ASCII Project Files (.RPP)",
    "syncModel": "Portable Local Install (~15MB)",
    "summary": "Professional Digital Audio Workstation with sub-millisecond performance, zero cloud DRM dongles, and plain-text project files parseable with standard text tools.",
    "extractCmd": "grep -E 'TRACK|VOLPAN' session.RPP"
  },
  {
    "name": "Darktable",
    "category": "Media & Creative",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Immutable RAW + ISO Standard .xmp Sidecars",
    "syncModel": "Local Disk Hierarchy",
    "summary": "Non-destructive raw photography workflow. Never alters original sensor data; all exposure curves and crops reside in sibling XML sidecar files.",
    "extractCmd": "darktable-cli image.RAW image.RAW.xmp export.jpg"
  },
  {
    "name": "Pass / KeePassXC",
    "category": "OS & Infra",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "GPG Encrypted Files / Local .kdbx Vault",
    "syncModel": "Git / Syncthing (Zero Commercial Cloud)",
    "summary": "Sovereign secret management. Credentials reside in user-controlled cryptographic containers on disk without trusting third-party vault servers.",
    "extractCmd": "gpg -d ~/.password-store/infra/root.gpg"
  },
  {
    "name": "Syncthing",
    "category": "OS & Infra",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Direct Peer-to-Peer Block Exchange (BEP)",
    "syncModel": "End-to-End TLS over LAN / Relay",
    "summary": "The canonical decoupled synchronization layer. Replicates folders across devices with cryptographic device IDs and explicit conflict file preservation.",
    "extractCmd": "syncthing cli show system"
  },
  {
    "name": "NixOS / GNU Guix & OpenBSD",
    "category": "OS & Infra",
    "tier": "TIER_1",
    "tierLabel": "Tier 1 • Canonical",
    "substrate": "Declarative Plain-Text System Configs",
    "syncModel": "Reproducible Content-Addressed Store",
    "summary": "While mainstream OS platforms mutate global state imperatively, NixOS/Guix treat the entire operating system as a deterministic, rollback-capable function of plain text.",
    "extractCmd": "nixos-rebuild build --flake .#workstation"
  }
];
const GATES = [
  {
    "id": "gate1",
    "title": "1. The Air-Gap Test (Locality)",
    "desc": "Core CRUD, compilation, and search operate 100% offline with the network interface physically disabled.",
    "failMsg": "Fails Principle II (Locality): Requires remote network connectivity or cloud authentication handshake."
  },
  {
    "id": "gate2",
    "title": "2. The 100ms Test (Responsiveness)",
    "desc": "Routine local interactions and incremental saves provide perceptual feedback in under 100ms on baseline hardware.",
    "failMsg": "Fails Principle IV (Responsiveness): Exhibits UI thread blocking, sluggish bundler delays, or network spinners."
  },
  {
    "id": "gate3",
    "title": "3. The Longevity Test (50-Year Survivability)",
    "desc": "Data is stored in or natively exports to documented, self-describing plain text, open XML, or archival SQLite.",
    "failMsg": "Fails Principle VI (Longevity): Locks user creations inside undocumented proprietary binary silos."
  },
  {
    "id": "gate4",
    "title": "4. The Responsibility Test (Anti-Monolith)",
    "desc": "Maintains a bounded domain focus and interoperates via URIs, CLI pipes, or sidecars rather than duplicating unrelated suites.",
    "failMsg": "Fails Principle V (Interoperability): Suffers from monolithic feature bloat instead of clean Unix composition."
  },
  {
    "id": "gate5",
    "title": "5. The Dependency Test (Zero Lock-In)",
    "desc": "Zero mandatory cloud subscriptions, zero undisclosed telemetry, and no fragile transitive dependency trees.",
    "failMsg": "Fails Principle I (Sovereignty): Introduces mandatory vendor accounts, telemetry, or fragile upstream supply chains."
  },
  {
    "id": "gate6",
    "title": "6. The Predictability Test (Determinism)",
    "desc": "State transitions, geometry kernels, and AI assists are governed by deterministic rules and explicit user validation.",
    "failMsg": "Fails Principle III (Predictability): Vulnerable to non-deterministic state corruption or unchecked AI guesswork."
  },
  {
    "id": "gate7",
    "title": "7. The Recovery & Security Test (Custody)",
    "desc": "Provides transparent conflict resolution (CRDTs/branching) and frictionless, verifiable local backups.",
    "failMsg": "Fails Section 05 (Sync & Custody): Obscures sync conflicts or burdens the user with fragile recovery mechanics."
  }
];
const RAW_MANIFESTO_MD = "# A Manifesto for Sovereign Personal Software\n\n> “Your data belongs to you. Your tools should respect your time, preserve your freedom, and remain useful without depending on someone else’s infrastructure.”\n\n## 01. The Core Manifesto\nSoftware should adapt to people, not force people to adapt to software.\nSix foundational principles define Sovereign Personal Software:\n1. Sovereignty: Users control their data, infrastructure, cryptographic keys, and ability to migrate.\n2. Locality: Core functionality executes on the user's hardware, independently of network connectivity.\n3. Predictability: Critical state transitions and rule engines are deterministic, transparent, and testable.\n4. Responsiveness: Software respects human attention with sub-100ms feedback and zero artificial friction.\n5. Focused Interoperability: Applications maintain bounded responsibilities while exchanging information across open protocols.\n6. Longevity: Human records must outlive the applications, vendors, and runtimes that produced them.\n\n## 06. The Seven Engineering Evaluation Tests\n1. The Air-Gap Test: Does primary functionality operate cleanly with the network interface disabled?\n2. The 100ms Test: Do common local interactions respond within 100 milliseconds on baseline hardware?\n3. The Longevity Test: Can users recover and understand their raw data using standard system tools if the binary disappears?\n4. The Responsibility Test: Does this capability belong in this tool, or should a decoupled external utility handle it?\n5. The Dependency Test: Does this avoid mandatory third-party cloud accounts, fragile dependency trees, or subscriptions?\n6. The Predictability Test: Are state transitions formally specified, reproducible, testable, and free of silent guesswork?\n7. The Recovery & Security Test: Does the system enforce local cryptographic integrity while providing verifiable user backup and recovery?";

let activeCategory = 'ALL';
let gateState = { gate1: true, gate2: true, gate3: true, gate4: true, gate5: true, gate6: true, gate7: true };

window.addEventListener('DOMContentLoaded', () => {
  const elapsed = (performance.now() - t0).toFixed(2);
  const badge = document.getElementById('latency-badge');
  if (badge) badge.innerHTML = 'LOCAL RENDER: <strong class="text-emerald-500">' + elapsed + 'ms</strong> (GATE 02 PASS)';
  renderDirectory();
  renderEvaluatorQuestions();
  updateEvaluator();
  // Open the tab named in the URL hash (e.g. /#index), otherwise the Manifesto.
  const initialTab = location.hash.replace('#', '');
  if (initialTab && document.getElementById(`tab-${initialTab}`)) {
    switchTab(initialTab);
  }
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
      updateEvaluator();
    }
function setEvaluatorPreset(preset) {
      const nameInput = document.getElementById('eval-app-name');
      if (preset === 'canonical') {
        nameInput.value = "Git / OpenSCAD / ToDoz Core";
        GATES.forEach(g => gateState[g.id] = true);
      } else if (preset === 'freecad') {
        nameInput.value = "FreeCAD (Interactive B-Rep GUI)";
        gateState = { gate1: true, gate2: false, gate3: true, gate4: false, gate5: true, gate6: false, gate7: true };
      } else if (preset === 'cloud') {
        nameInput.value = "Proprietary Cloud Workspace SaaS";
        GATES.forEach(g => gateState[g.id] = false);
      }
      renderEvaluatorQuestions();
      updateEvaluator();
    }
function updateEvaluator() {
      const appName = document.getElementById('eval-app-name')?.value || 'Unnamed Application';
      const passedCount = GATES.filter(g => gateState[g.id]).length;
      const pct = Math.round((passedCount / GATES.length) * 100);

      document.getElementById('eval-score-number').textContent = `${passedCount}/7`;
      document.getElementById('eval-percentage').textContent = `${pct}% SOVEREIGN COMPLIANCE`;

      const bar = document.getElementById('eval-progress-bar');
      const badge = document.getElementById('eval-tier-badge');
      bar.style.width = `${pct}%`;

      if (passedCount === 7) {
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
      if (failedGates.length === 0) {
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
function switchTab(tabId) {
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
      const target = document.getElementById(`tab-${tabId}`);
      if (target) target.classList.remove('hidden');

      document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.id === `nav-${tabId}`) {
          btn.className = "nav-btn px-3.5 py-2 rounded-lg font-medium transition-all bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30";
        } else {
          btn.className = "nav-btn px-3.5 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all border border-transparent";
        }
      });

      const mobileSelect = document.getElementById('mobile-nav-select');
      if (mobileSelect && mobileSelect.value !== tabId) {
        mobileSelect.value = tabId;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
function toggleTheme() {
      const root = document.documentElement;
      root.classList.toggle('dark');
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
function copyManifestoText() {
      copyTextToClipboard(RAW_MANIFESTO_MD, 'Plain-text Manifesto copied to clipboard');
    }
function exportManifestoMarkdown() {
      const blob = new Blob([RAW_MANIFESTO_MD], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sovereign-personal-software-manifesto.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Downloaded sovereign-personal-software-manifesto.md');
    }

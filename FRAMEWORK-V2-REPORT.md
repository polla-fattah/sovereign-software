# Framework v2.0 Implementation Report

Work done from `Review.md` on the branch `framework-v2` (four commits on top of `main`). Nothing was pushed, merged, or deployed. The live site at https://sovereign.polla.dev/ is unchanged.

## 1. Summary of what changed

- **A new evaluation framework (v2.0)** replaces the seven equally weighted pass/fail gates: six prioritized, weighted principles; five mandatory eligibility requirements; a weighted 0 to 5 quality assessment; seven verification tests that gather evidence but carry no score; and explicit classification rules.
- **The manifesto** (`content/read.md`, which also feeds the download) was updated: principle order and weights, a priority-hierarchy explanation, three-dimension Longevity, revised Sections 03 to 09, a new Section 06, and a dated revision history. The downloaded Markdown is generated from the same file, so it matches the visible text.
- **`/methodology/`** is new: a formal reference covering all 17 required topics, generated from the same data file as the evaluator.
- **`/evaluator/`** was replaced with a five-step workflow (identify, eligibility, principles, verification, results), weighted bar visualizations, Markdown and JSON export, validated JSON import, and three hypothetical examples.
- **`/directory/`** was migrated: all 25 entries are now "Unverified", no ratings were invented, and legacy tiers are kept as labeled history. New cards, filters, and a detail page per entry (`/directory/<id>/`).
- **Home page, header, footer, Escape Hatches, slides, README, metadata** were updated to match. Escape Hatches recipes now link to Sovereignty, Longevity, and Recoverability and state what a conversion can lose.
- **Tests:** 37 automated tests (scoring engine, framework data, export and import, cross-file consistency, built site).

## 2. Files

**New:** `data/framework.json`, `content/methodology.md`, `content/directory/_index.md`, `content/directory/_content.gotmpl`, `layouts/_default/methodology.html`, `layouts/directory/single.html`, `layouts/partials/directory-card.html`, `layouts/shortcodes/fw-*.html` (7), `static/js/scoring.js`, `static/js/evaluator.js`, `static/js/directory.js`, `static/schema/assessment-2.0.schema.json`, `tests/scoring.test.js`, `tests/consistency.test.js`, this report.

**Modified:** `content/read.md`, `content/manifesto.md`, `content/evaluator.md`, `content/escape-hatches.md`, `data/directory.json`, `data/escape.json`, `hugo.toml`, `layouts/index.html`, `layouts/_default/{baseof,directory,evaluator,escape-hatches}.html`, `layouts/partials/{head,header,footer}.html`, `slides/manifesto.md`, `static/slides/index.html`, `README.md`, `DESIGN.md`, `tailwind.config.js`, `static/css/tailwind.css`, `.github/workflows/pages.yml`.

**Removed:** `data/gates.json`, `static/js/sovereign.js`, and `content/directory.md` (moved to `content/directory/_index.md`, same URL).

## 3. Final scoring model and eligibility rules

| Priority | Principle | Weight |
| --- | --- | ---: |
| I | Sovereignty | 25 |
| II | Longevity | 25 |
| III | Locality | 20 |
| IV | Predictability | 15 |
| V | Focused Interoperability | 10 |
| VI | Responsiveness | 5 |

**Score** = sum of (rating / 5) x weight, where the rating is a whole number from 0 to 5. A principle that is not assessed is distinct from 0 and withholds the final score entirely (the spec's preferred option; no provisional score is shown).

**Eligibility (E1 to E5):** independent data access, practical exit and migration, independent recoverability, custody and recovery, no irrevocable vendor dependency. Statuses: Pass, Fail, Not Verified, Not Applicable (needs a justification of at least 10 characters, otherwise it counts as Not Verified).

**Classification, in order of precedence:**

1. Any eligibility Fail: **Not Certified: Critical Failure**.
2. Any eligibility Not Verified, or an incomplete assessment: **Unverified: Insufficient Evidence**.
3. Score 90 or more, every principle at least 3, sufficient evidence: **Tier 1**.
4. Score 75 or more, Sovereignty and Longevity each at least 3, sufficient evidence: **Tier 2**.
5. Otherwise: **Tier 3: Partial Alignment**.

"Sufficient evidence" (my definition, documented on the methodology page): every principle rating has an evidence statement of at least 10 characters, every eligibility Pass has an evidence statement, and no principle has Low or unstated confidence.

All numbers live in `data/framework.json`; the engine is `static/js/scoring.js`.

## 4. Test and build results

- `node --test`: **37 passed, 0 failed.** Covers spec cases A to J, a brute-force search for the exact 89/90 and 74/75 boundaries, the unknown-versus-zero distinction, Not Applicable rules, precedence, evidence sufficiency, export and import round trips, malicious and malformed imports (prototype pollution, wrong types, bad URLs, oversize), the Markdown report, directory entries never inheriting certification, the schema matching the framework data, and cross-file consistency.
- `hugo --gc --minify`: builds 36 pages with no errors or warnings (also under a subpath).
- Browser checks (in-app Chromium only): evaluator examples, export and import, filters, an assessed entry rendering (on a temporary copy with synthetic data, now deleted), 8 pages at 320, 360, 375, 768, 1024 and 1440 px with no horizontal page overflow, all 159 evaluator controls have accessible names, no duplicate ids, contrast ratios computed, the built site served from a plain static HTTP server under a subpath with no failed or external requests, and all 22 slides fit.

## 5. Decisions to review (all can be undone)

1. **The spec's Test D is arithmetically wrong.** For ratings 5, 5, 4, 4, 4, 2 its own formula gives 88, not the 86 the spec states (25 + 25 + 16 + 12 + 8 + 2). The tier (Tier 2) is unaffected. I used 88 everywhere, including the example on the methodology page.
2. **Tier 3 does not require documented limitations.** The spec lists it as a requirement; I treated it as the catch-all tier. Low scores and missing evidence already explain themselves in the reasons shown.
3. **Not Applicable is available for all five requirements** (with a justification). The engine cannot judge whether a requirement "genuinely applies", so the interface and the methodology warn instead.
4. **The old presets (Git 7/7, FreeCAD 4/7, Cloud 0/7) were removed.** Hypothetical Applications A, B, and C replace them, as the spec asked.
5. **Index caveats were moved.** Editorial notes I had added to summaries last time (for example "closed-source" for REAPER) are now in each entry's `limitations`, labeled as editorial observations and not tested findings. Strengths are blank until an entry is assessed.
6. **Navigation:** the compact menu now appears below 1024 px (it was 768 px) so five links never crowd the bar. Below 360 px the header's download button is hidden (the footer link remains).
7. **Colors:** the muted text token went from `#6e7673` to `#656c69` and citation links from emerald to `#02744b`, to meet WCAG AA contrast. DESIGN.md is updated. Revert in `tailwind.config.js` and `head.html` if you prefer the original palette.
8. **CI now runs the tests before building.** A failing test blocks deployment. Remove the "Run tests" step in `.github/workflows/pages.yml` if you do not want that.
9. **Nothing is persisted in the browser.** The evaluator stores nothing (no localStorage), so work is lost on reload unless exported. Chosen for privacy.
10. **The home page is still partly hand-written HTML** (architecture, AI, synchronization, refusals, and the source list). Principle cards, the hierarchy, and the framework section are generated from data. `tests/consistency.test.js` guards the order and weights.
11. **Content adapters** (the per-entry pages) need Hugo 0.126 or newer; the README says 0.166, which is what the workflow pins.

## 6. Index records awaiting evidence-based reassessment

All 25: Git, Jujutsu, SQLite, Fossil SCM, Taskwarrior, Todo.txt, Beancount / hledger, Actual Budget, Obsidian, Logseq, Emacs Org-Mode, Typst, Hugo, Paperless-ngx, LibreOffice, OpenSCAD, KiCad, NGSPICE, REAPER, Darktable, Pass, KeePassXC, Syncthing, NixOS / GNU Guix, OpenBSD. Each shows its legacy v1 tier as history only. The commands on the cards are marked "example, not verified".

## 7. Unresolved issues and follow-ups

- **Other repositories still use the old principle order and are not changed.** The ToDoz repository (`PHILOSOPHY.md`, `landing/philosophy.html`, the landing page) and the two main-site posts and project entries on polla.dev list the principles in the old order. They now contradict the manifesto and need a matching update. I did not touch them because the spec covers this website only.
- **The accessibility work is not a full WCAG 2.2 AA audit.** Automated and DOM checks only: accessible names, headings, ids, contrast of the new components, reflow at 320 px. No screen reader testing, no complete manual tab-through, and only one browser engine.
- **Downloadable templates:** the repository checklist on the evaluator page is regenerated from the seven tests, and reports export from the evaluator. There is no separate blank assessment file to download.
- **Structured data** is minimal (WebSite and WebPage JSON-LD with the licence).
- **Index evidence links** cannot appear yet because no entry has evidence. The card shows an evidence count and the detail page lists items once they exist.
- **Existing URLs** are preserved (`/`, `/manifesto/`, `/read/`, the download, `/directory/`, `/evaluator/`, `/escape-hatches/`, `/slides/`). New: `/methodology/`, `/directory/<id>/`, `/schema/assessment-2.0.schema.json`.

## 8. Local verification and deployment

```bash
git switch framework-v2
node --test        # 37 tests
hugo server -D     # preview at http://localhost:1313/
hugo --gc --minify # production build
```

To publish: review this report, merge `framework-v2` into `main`, and push. The GitHub Actions workflow runs the tests, builds, and deploys. To undo any single decision, revert the relevant commit or edit the file named above. The framework numbers and thresholds change in one place, `data/framework.json`.

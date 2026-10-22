# Sovereign Personal Software

A manifesto for software that people own, and the tools that go with it: the Sovereign Software Evaluation Framework (version 2.0), an interactive evaluator, an index of example software, and practical ways to leave cloud services. The site is built with [Hugo](https://gohugo.io/), loads nothing from third parties, and runs all evaluation in the browser.

**Live site:** https://sovereign.polla.dev/

## Purpose

The site argues that software should leave users in control of their data and their future, and it gives a way to test that claim. The manifesto states six prioritized principles. The framework turns them into five mandatory eligibility requirements, a weighted score, seven evidence-gathering tests, and classification rules. The tiers, weights, and thresholds are proposed editorial policy, not validated measurements or an accredited certification.

## What is on the site

| Page | Source | What it is |
| --- | --- | --- |
| Home (`/`) | `layouts/index.html` | The manifesto as a designed page. Principle cards and the framework section are generated from `data/framework.json` |
| Reading edition (`/read/`) | `content/read.md` | The full text for reading and printing, with footnote citations. Also published as a downloadable Markdown file |
| The Manifesto (`/manifesto/`) | `content/manifesto.md` | A one-page summary |
| Evaluator (`/evaluator/`) | `data/framework.json`, `static/js/` | Five-step assessment with Markdown and JSON export and import |
| Methodology (`/methodology/`) | `content/methodology.md`, `data/framework.json` | The formal reference for scoring and classification |
| Sovereign Index (`/directory/`) | `data/directory.json` | Example software with its evidence status. A detail page per entry at `/directory/<id>/` |
| Escape Hatches (`/escape-hatches/`) | `data/escape.json` | Recipes for moving data out of cloud services, with caveats |
| Slides (`/slides/`) | `slides/manifesto.md` | A presentation of the manifesto, compiled by Marp |

## The framework

| Priority | Principle | Weight |
| --- | --- | ---: |
| I | Sovereignty | 25% |
| II | Longevity | 25% |
| III | Locality | 20% |
| IV | Predictability | 15% |
| V | Focused Interoperability | 10% |
| VI | Responsiveness | 5% |

The order expresses evaluation priority, not permission to ignore lower principles. Five eligibility requirements (independent data access, practical exit and migration, independent recoverability, custody and recovery, no irrevocable vendor dependency) must be established before a certified tier is possible, and a verified failure of any of them cannot be offset by a high score. The seven verification tests are checklists that gather evidence for the ratings. They do not produce a score of their own.

### Scoring architecture

There is one definition and one implementation, so nothing is duplicated across pages:

- **`data/framework.json`** is the single source of truth: principles, weights, eligibility requirements, tests and their mapping to principles, tier thresholds, rating anchors, and the worked examples. Change a weight or threshold here and the evaluator, the methodology page, the home page, and the tests all follow.
- **`static/js/scoring.js`** is the only implementation of the weighted score, eligibility rules, classification, Markdown and JSON export, and import validation. It has no DOM access, so the browser and the Node tests run the same code.
- **`static/js/evaluator.js`** and **`static/js/directory.js`** are interfaces only. They call `scoring.js`.
- Derived values (scores and classifications) are never stored in the data. They are computed from the ratings and evidence.

Classification precedence is fixed: a verified critical failure, then unverified mandatory eligibility, then an incomplete quality assessment, then Tier 1, Tier 2, and Tier 3. Unknown is never zero and never a pass.

### Evaluation data format

Assessments export as Markdown and JSON. The JSON carries `schemaVersion: "2.0"` and is described by [`static/schema/assessment-2.0.schema.json`](static/schema/assessment-2.0.schema.json). Imports are validated, rejected with a clear message when malformed, and recomputed from the data, so a file cannot claim a classification it has not earned.

Index entries in `data/directory.json` use this model:

```json
{
  "id": "example",
  "name": "Example",
  "category": "Tasks & Finance",
  "version_assessed": null,
  "assessment_status": "unverified",
  "framework_version": "2.0",
  "assessment_date": null,
  "eligibility": { "independent_data_access": "not_verified", "practical_migration": "not_verified", "independent_recoverability": "not_verified", "custody_and_recovery": "not_verified", "vendor_independence": "not_verified" },
  "principles": { "sovereignty": null, "longevity": null, "locality": null, "predictability": null, "interoperability": null, "responsiveness": null },
  "evidence": [],
  "limitations": [],
  "legacy_tier": "Tier 1",
  "legacy_label": "Tier 1 • Canonical",
  "assessment_notes": "",
  "classification": "unverified",
  "summary": "", "substrate": "", "syncModel": "", "extractCmd": ""
}
```

### Adding a software entry

1. Add an object like the one above to `data/directory.json`, with a unique `id` (it becomes the URL), a `category`, and descriptive text. Leave `principles` as `null` and every eligibility value as `not_verified`. Do not copy a rating from a similar product.
2. Run `hugo` and `node --test`. The tests fail if an unverified entry carries a rating or if an id is duplicated.

### Conducting and documenting an assessment

1. Choose one version of the software and one deployment model. Record them in `version_assessed`.
2. Use the [evaluator](https://sovereign.polla.dev/evaluator/) to work through the five steps, and export the JSON for your records.
3. Copy the results into the entry: set each `eligibility` value, each `principles` rating (0 to 5), `assessment_date`, and `assessment_status` to `"complete"`. Add `evidence` items, each with `target` (a principle id such as `"sovereignty"`, or a requirement id such as `"E1"`), `text`, an optional `url`, and `confidence` (`high`, `medium`, or `low`). Add `limitations`.
4. Do not store `classification` or a score for a complete entry. They are computed. Set `"classification": "unverified"` only while the entry is unassessed.
5. Evidence should describe what was tested and how, not repeat the product's own description. Tier 1 and Tier 2 need an evidence statement for every rating and every Pass, and no Low confidence rating.
6. Keep the legacy tier fields. They are history and are labeled as such on the site.

### Updating the methodology version

1. Edit `data/framework.json`: raise `version`, set `revisionDate`, update `previousVersion`, and change weights or thresholds there only.
2. If the assessment file layout changes, raise `SCHEMA_VERSION` in `static/js/scoring.js` and add a new schema file. Do not rewrite old assessments silently.
3. Add a dated entry to the Revision History in `content/read.md`, and update `content/methodology.md` where the prose describes changed rules.
4. Run `node --test`. Index entries assessed under an older version should be reassessed or marked, never reinterpreted.

## Editing content

- **The manifesto text lives in `content/read.md`,** which is the source for the reading edition and the downloadable file. The home page cards and the framework section are generated from `data/framework.json`, but the rest of the home page (architecture, AI, synchronization, refusals, and the source list) is hand-written HTML in `layouts/index.html`. Keep them consistent, and run `node --test`: `tests/consistency.test.js` checks the principle order and weights across the files.
- **Footnote numbers** in `read.md` renumber themselves by order of appearance. The source list on the home page is numbered by hand and must match.
- Page intros are the Markdown bodies of the files in `content/`.
- Recipes in `data/escape.json` carry a `connections` list and a `caveat`. Do not promise a lossless migration.

## Running locally

Requires Hugo v0.166 or newer and Node 18 or newer for the tests.

```bash
hugo            # build into public/
hugo server -D  # preview at http://localhost:1313/
node --test     # run the automated tests
```

`hugo server` reads `config/development/hugo.toml`, which sets `baseURL` for local use. Restart the server after changing any config file.

## Automated tests

`node --test` runs `tests/` with no dependencies:

- `scoring.test.js` covers the scoring engine and the framework data: a perfect assessment, a high score with a critical failure, unknown values, unverified eligibility, tier boundaries, weights and rounding, export and import (including malicious input), the Markdown report, and legacy Index entries never inheriting a classification.
- `consistency.test.js` checks that the principle order and weights are the same in the framework data, the manifesto, the home page, the short manifesto, the slides, and the built site, and that old seven-gate wording and em dashes have not crept back.

## Styles, fonts and scripts

Nothing is loaded from a CDN or a third-party font service.

- **Fonts** are in `static/fonts/` and declared in `static/css/fonts.css`: Inter and JetBrains Mono (SIL OFL 1.1) and General Sans (Fontshare, ITF Free Font License).
- **CSS** is generated by the [Tailwind CSS v3 standalone CLI](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.17) into `static/css/tailwind.css`, which is committed. Rebuild it whenever you add or change utility classes in layouts, content or `static/js/`:

  ```bash
  ./tools/tailwindcss -c tailwind.config.js -i tailwind.input.css -o static/css/tailwind.css --minify
  ```

  The CLI binary is not committed (`tools/` is git-ignored). Download the build for your platform from the release page above (for example `tailwindcss-windows-x64.exe`, `tailwindcss-macos-arm64` or `tailwindcss-linux-x64`), save it in `tools/` as `tailwindcss` (`tailwindcss.exe` on Windows), and check it against `sha256sums.txt` from the same release.
- **JavaScript** is limited to `static/js/`. A page loads only the scripts listed in its front matter (`scripts = ["scoring.js", "evaluator.js"]`). The Evaluator, the Index, and the Index detail pages use JavaScript. Every other page ships none.

## Slides

The presentation lives at `/slides/`, linked from the footer. It is written in plain Markdown in `slides/manifesto.md` (speaker notes are the HTML comments) and styled by `slides/sovereign.css`, then compiled with [Marp CLI](https://github.com/marp-team/marp-cli) (MIT) into one self-contained file, `static/slides/index.html`, which is committed. It uses the site's self-hosted fonts and makes no network requests.

Install Marp CLI once (`npm install -g @marp-team/marp-cli`), and rebuild after editing the slides:

```bash
marp slides/manifesto.md --theme slides/sovereign.css --html -o static/slides/index.html
```

When presenting, press `F` or use the fullscreen button, and `P` for presenter view with the speaker notes.

## Publishing

The site deploys to GitHub Pages from `main` through `.github/workflows/pages.yml`, which builds with Hugo and publishes the static output. `public/` is generated output and is git-ignored. Any ordinary HTTP server can host the generated `public/` folder, and an already built copy works without a network connection.

One-time setup: open **Settings → Pages** in the repository and set **Source** to **GitHub Actions**.

## Licence

Everything in this repository is licensed under [Creative Commons Attribution 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/): you may share and adapt it for any purpose, including commercially, with credit. See `LICENSE`. The bundled fonts and the compiled Tailwind CSS keep their own licences, listed in `LICENSE`.

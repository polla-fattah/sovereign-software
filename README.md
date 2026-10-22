# Sovereign Personal Software

A manifesto for software that stays under the authority of the people who use it, and the evidence-led tools that go with it: the proposed Sovereign Software Evaluation Framework (version 3.0), an index of example software, and practical ways to leave cloud services. The site is built with [Hugo](https://gohugo.io/), loads nothing from third parties, and runs all evaluation in the browser.

**Live site:** https://sovereign.polla.dev/

> Software should serve people without claiming permanent custody over their information, choices, or work.

## Purpose

The site argues that software should remain under human authority, preserve human knowledge, function independently wherever possible, and make consequential behavior understandable and controllable. The manifesto states four principles. The framework turns them into five fundamental requirements, an evidence-based finding for each principle, and a qualified overall determination.

The framework is **evidence-led and unscored**. It adopts no weights, no numerical score, and no tier threshold, and it is a proposed standard, not an accredited certification. The earlier six-principle weighted model (framework 2.0) and the earliest seven-gate model (1.0) are superseded and kept only as history.

## What is on the site

| Page | Source | What it is |
| --- | --- | --- |
| Home (`/`) | `layouts/index.html` | The manifesto as a designed page. Principle cards and the evaluation section are generated from `data/framework.json` |
| Reading edition (`/read/`) | `content/read.md` | The full text for reading and printing. Also published as a downloadable Markdown file |
| The Manifesto (`/manifesto/`) | `content/manifesto.md` | A one-page summary |
| Methodology (`/methodology/`) | `content/methodology.md`, `data/framework.json` | The formal reference for findings and determinations. `/evaluator/` redirects here |
| Sovereign Index (`/directory/`) | `data/directory.json` | Example software and its evidence status. A detail page per entry at `/directory/<id>/` |
| Escape Hatches (`/escape-hatches/`) | `data/escape.json` | Recipes for moving data out of cloud services, with caveats |
| Slides (`/slides/`) | `slides/manifesto.md` | A presentation of the manifesto, compiled by Marp |

## The framework

Four principles, in a deliberate conceptual order that is a relationship and not a ranking:

1. **Sovereignty:** authority belongs to the user.
2. **Longevity:** information outlives software.
3. **Locality:** independence is designed in.
4. **Transparency:** consequential behavior remains governable.

**Five fundamental requirements** express a loss of control that no other quality can excuse: independent retrieval of essential information, a practicable way to leave, recoverability outside a vendor-controlled system, control of already-created work without vendor permission, and authorization and oversight of consequential operations. Each is Pass, Fail, Not Verified, or Not Applicable with justification.

**Findings.** Each principle is assessed as Meets, Partially meets, or Does not meet, with observations, sources, limitations, and confidence, or it is left Not assessed.

**Determinations**, in order of precedence:

1. **Fails a fundamental requirement:** any verified requirement failure. Nothing else can cancel it.
2. **Insufficient evidence:** a requirement is not verified, a principle is not assessed, or the evidence is incomplete. This is neither a failure nor a pass.
3. **Meets the proposed core requirements:** every requirement passes, every principle meets, and the evidence is sufficient.
4. **Partially aligned:** nothing fails and everything is established, but at least one principle is only partly met or not met.

**Seven supporting engineering tests** gather evidence: ownership and exit, preservation and recovery, offline independence, operational transparency, security and continuity, interoperability and maintainability, and human experience and performance. They carry no weight or score, and the last two are supporting quality considerations, not prerequisites.

### Determination architecture

There is one definition and one implementation, so nothing is duplicated across pages:

- **`data/framework.json`** is the single source of truth: principles, requirements, finding guidance, tests and their mapping, determination labels, and the worked examples.
- **`static/js/assessment.js`** is the only implementation of the requirement rules, the findings, and the determination. It has no DOM access, so the Index page, the maintainer command, and the Node tests run the same code.
- **`static/js/directory.js`** is the Index interface (filtering and computed determinations). It calls `assessment.js`.
- Determinations are never stored in the data. They are computed from the findings and evidence.

To see what the site will publish for an entry, run the maintainer command:

```bash
node scripts/determine.js git     # one entry in detail
node scripts/determine.js --all   # one line per entry
```

### Index entry format

Entries in `data/directory.json` use this model:

```json
{
  "id": "example",
  "name": "Example",
  "category": "Tasks & Finance",
  "version_assessed": null,
  "assessment_status": "unverified",
  "framework_version": "3.0",
  "assessment_date": null,
  "eligibility": { "independent_data_access": "not_verified", "practical_exit": "not_verified", "independent_recoverability": "not_verified", "retained_control": "not_verified", "consequential_oversight": "not_verified" },
  "principles": { "sovereignty": null, "longevity": null, "locality": null, "transparency": null },
  "evidence": [],
  "limitations": [],
  "legacy_tier": "Tier 1",
  "legacy_label": "Tier 1 • Canonical",
  "assessment_notes": "",
  "determination": "insufficient_evidence",
  "summary": "", "substrate": "", "syncModel": "", "extractCmd": ""
}
```

### Adding a software entry

1. Add an object like the one above to `data/directory.json`, with a unique `id` (it becomes the URL), a `category`, and descriptive text. Leave `principles` as `null` and every requirement as `not_verified`. Do not copy a finding from a similar product.
2. Run `hugo` and `node --test`. The tests fail if an unverified entry carries a finding or if an id is duplicated.

### Conducting and documenting an assessment

There is no web form: assessments are recorded by editing `data/directory.json`.

1. Choose one version of the software and one deployment model, and record it in `version_assessed`.
2. Work through the five fundamental requirements and the four principles using the [methodology](https://sovereign.polla.dev/methodology/) and the supporting tests (`data/framework.json`) as your checklist.
3. Record the results in the entry: set each requirement status, each principle finding (`meets`, `partial`, or `does_not_meet`), `assessment_date`, and `assessment_status` to `"complete"`. Add `evidence` items, each with `target` (a principle id such as `"sovereignty"`, or a requirement id such as `"E1"`), `text`, an optional `url`, and `confidence` (`high`, `medium`, or `low`). Add `limitations`.
4. Run `node scripts/determine.js <id>` to see the determination the site will publish, and fix any evidence gaps it reports.
5. Do not store a determination for a complete entry. It is computed. Keep `"determination": "insufficient_evidence"` only while the entry is unassessed.
6. Evidence should describe what was tested and how, not repeat the product's own description. A determination needs an evidence statement for every finding and every Pass, and no Low or unstated confidence.
7. Keep the legacy tier fields. They are history and are labeled as such on the site.

### Updating the framework version

1. Edit `data/framework.json`: change the principles, requirements, tests, or rules there only, and raise `version` and `revisionDate`. Update `supersedes` and `status`.
2. Do not rewrite old assessments silently. Mark them for reassessment instead.
3. Add a dated entry to the Revision History in `content/read.md`, and update `content/methodology.md` where the prose describes changed rules.
4. Run `node --test`. Index entries assessed under an older version should be reassessed or marked, never reinterpreted.

Any future scored method needs separate justification, representative testing across disciplines, and a published methodology before it is adopted.

## Editing content

- **The manifesto text lives in `content/read.md`,** the source for the reading edition and the downloadable file. The home page cards and the evaluation section are generated from `data/framework.json`, but the rest of the home page (architecture, AI, synchronization, refusals, and the references) is hand-written HTML in `layouts/index.html`. Keep them consistent, and run `node --test`: `tests/consistency.test.js` checks the principle order and the key wording across the files.
- **The tagline and site description** are `tagline` and `description` in `hugo.toml`.
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

- `assessment.test.js` covers the assessment engine and the framework data: that no weights or scores exist, that a verified failure cannot be offset, that missing evidence is neither a pass nor a failure, evidence sufficiency, precedence, the worked examples, Index entries never inheriting a determination, and the maintainer command.
- `consistency.test.js` checks that the principle order and wording are the same in the framework data, the manifesto, the home page, the short manifesto, the slides, and the built site, that retired wording and em dashes have not crept back, and that the built site makes no third-party requests.

## Styles, fonts and scripts

Nothing is loaded from a CDN or a third-party font service.

- **Fonts** are in `static/fonts/` and declared in `static/css/fonts.css`: Inter and JetBrains Mono (SIL OFL 1.1) and General Sans (Fontshare, ITF Free Font License).
- **CSS** is generated by the [Tailwind CSS v3 standalone CLI](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.17) into `static/css/tailwind.css`, which is committed. Rebuild it whenever you add or change utility classes in layouts, content or `static/js/`:

  ```bash
  ./tools/tailwindcss -c tailwind.config.js -i tailwind.input.css -o static/css/tailwind.css --minify
  ```

  The CLI binary is not committed (`tools/` is git-ignored). Download the build for your platform from the release page above (for example `tailwindcss-windows-x64.exe`, `tailwindcss-macos-arm64` or `tailwindcss-linux-x64`), save it in `tools/` as `tailwindcss` (`tailwindcss.exe` on Windows), and check it against `sha256sums.txt` from the same release.
- **JavaScript** is limited to `static/js/`. A page loads only the scripts listed in its front matter (`scripts = ["assessment.js", "directory.js"]`). Only the Index and the Index detail pages use JavaScript. Every other page ships none.

## Slides

The presentation lives at `/slides/`, linked from the footer. It is written in plain Markdown in `slides/manifesto.md` (speaker notes are the HTML comments) and styled by `slides/sovereign.css`, then compiled with [Marp CLI](https://github.com/marp-team/marp-cli) (MIT) into one self-contained file, `static/slides/index.html`, which is committed. It uses the site's self-hosted fonts and makes no network requests.

Install Marp CLI once (`npm install -g @marp-team/marp-cli`), and rebuild after editing the slides:

```bash
marp slides/manifesto.md --theme slides/sovereign.css --html -o static/slides/index.html
```

When presenting, press `F` or use the fullscreen button, and `P` for presenter view with the speaker notes.

## Publishing

The site deploys to GitHub Pages from `main` through `.github/workflows/pages.yml`, which runs the tests, builds with Hugo, and publishes the static output. `public/` is generated output and is git-ignored. Any ordinary HTTP server can host the generated `public/` folder, and an already built copy works without a network connection.

One-time setup: open **Settings → Pages** in the repository and set **Source** to **GitHub Actions**.

## Licence

Everything in this repository is licensed under [Creative Commons Attribution 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/): you may share and adapt it for any purpose, including commercially, with credit. See `LICENSE`. The bundled fonts and the compiled Tailwind CSS keep their own licences, listed in `LICENSE`.

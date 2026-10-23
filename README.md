# Sovereign Personal Software

A manifesto for software that stays under the authority of the people who use it, and the evidence-led tools that go with it: the Sovereign Software Evaluation Framework, an intellectual lineage and related-work analysis, an index of example software, and practical ways to leave cloud services. The site is built with [Hugo](https://gohugo.io/), loads nothing from third parties, and runs all evaluation in the browser.

**Live site:** https://sovereign.polla.dev/

**Research evidence:** [Start here](evidence/README.md) for the application-by-application index, current open questions, completed rating reviews and unfinished drafts.

> Software should serve people without claiming permanent custody over their information, choices, or work.

## Purpose

The site argues that software should remain under human authority, preserve human knowledge, function independently wherever possible, and make consequential behavior understandable and controllable. Rather than claiming to invent these concerns from scratch, Sovereign Software is presented as a **synthesis and evaluation approach** that connects insights from Free Software, Local-first Software, IndieWeb, Solid, MyData, Permacomputing, digital preservation (OAIS), adversarial interoperability, and AI governance into a single falsifiable verification methodology.

The manifesto states four principles. The framework turns them into five fundamental requirements, an evidence-based finding for each principle, and a qualified overall determination across four dimensions of practical authority: information authority, execution authority, governance authority, and continuity authority.

The framework is **evidence-led and unscored**. It adopts no weights, no numerical score, and no tier threshold, and it is a proposed standard, not an accredited certification.

## What is on the site

| Page | Source | What it is |
| --- | --- | --- |
| Home (`/`) | `layouts/index.html` | The manifesto as a designed page. Principle cards and the evaluation section are generated from `data/framework.json` |
| Reading edition (`/read/`) | `content/read.md` | The full text for reading and printing. Also published as a downloadable Markdown file |
| The Manifesto (`/manifesto/`) | `content/manifesto.md` | A one-page summary |
| Lineage (`/lineage/`) | `content/lineage.md` | Intellectual lineage, prior-art comparison across ten related movements, and research roadmap |
| Methodology (`/methodology/`) | `content/methodology.md`, `data/framework.json`, `Section 1 of the methodology` | The formal reference for findings, domain profiles, two-assessor protocol, and determinations. `/evaluator/` redirects here |
| Sovereign Index (`/directory/`) | `content/directory/*.md` | Example software and its evidence status. A detail page per entry at `/directory/<id>/` |
| Escape Hatches (`/escape-hatches/`) | `content/escape-hatches.md` | Verifiable migration runbooks for moving records and workflows out of cloud silos across all domain profiles, with caveats |
| Slides (`/slides/`) | `slides/manifesto.md` | A presentation of the manifesto, compiled by Marp |

## The framework

Four principles, in a deliberate conceptual order that is a relationship and not a ranking:

1. **Sovereignty:** authority belongs to the user.
2. **Longevity:** information outlives software.
3. **Locality:** independence is designed in.
4. **Transparency and Control:** consequential behavior remains governable.

**Five fundamental requirements** express a loss of control that no other quality can excuse: independent retrieval of essential information, a practicable way to leave, recoverability outside a vendor-controlled system, continuing authority and custody over already-created work without vendor permission, and authorization and oversight of consequential operations. Each is Pass, Fail, Not Verified, or Not Applicable with justification.

These are minimum eligibility conditions, not a complete definition of the philosophy. The broader principle findings describe how fully the software embodies Sovereignty, Longevity, Locality, and Transparency and Control.

**Domain preservation profiles (`Section 1 of the methodology`) and perspective roles.** Before testing, an assessment declares the perspective role from which authority is evaluated and the baseline domain profile (`vcs_core`, `knowledge_notes`, `cad_engineering`, `finance_tasks`, `research_bibliographic`) specifying essential records, essential capabilities, and acceptable loss on exit.

**Findings.** Each principle is assessed as Meets, Partially meets, or Does not meet, with observations, sources, limitations, and confidence, or it is left Not assessed.

**Determinations**, in order of precedence:

1. **Fails a fundamental requirement:** any verified requirement failure. Nothing else can cancel it.
2. **Insufficient evidence:** a requirement is not verified, a principle is not assessed, or the evidence is incomplete. This is neither a failure nor a pass.
3. **Does not meet the proposed core standard:** every requirement is established and the evidence is sufficient, but at least one principle does not meet.
4. **Partially aligned:** every requirement is established, no principle fails, and at least one principle is only partly met.
5. **Meets the proposed core requirements:** every requirement is established, every principle meets, and the evidence is sufficient.

A failed requirement beside a principle marked Meets (for example E3 failed and Longevity met) is an inconsistency: the failure still decides the outcome, and the engine flags the entry so it is corrected before publication.

**Seven supporting engineering tests** gather evidence: ownership and exit, preservation and recovery, offline independence, operational transparency, security and continuity, interoperability and maintainability, and human experience and performance. They carry no weight or score, and the last two are supporting quality considerations, not prerequisites.

### Determination architecture

There is one definition and one implementation, so nothing is duplicated across pages:

- **`data/framework.json`** is the single source of truth: principles, requirements, finding guidance, tests and their mapping, and determination labels. Baseline domain preservation profiles live in `Section 1 of the methodology`. The worked examples live only in `content/methodology.md`, and a test runs them through the engine.
- **`static/js/assessment.js`** is the only implementation of the requirement rules, the findings, and the determination. It has no DOM access, so the Index page, the maintainer command, and the Node tests run the same code.
- **`static/js/directory.js`** is the Index interface (filtering and computed determinations). It calls `assessment.js`.
- Determinations are never stored in the data. They are computed from the findings and evidence.

To see what the site will publish for an entry, run the maintainer command:

```bash
node scripts/determine.js git     # one entry in detail
node scripts/determine.js --all   # one line per entry
```

### Index entry format

Each software is one Markdown file in `content/directory/`, named by its id (`content/directory/git.md` becomes `/directory/git/`). The front matter is TOML:

```toml
+++
title = "Example"
category = "Tasks & Finance"
summary = "One sentence about how it treats user data."
substrate = "Native storage format"
sync_model = "How it synchronises or runs"
extract_cmd = "a command that exports or inspects the data"
limitations = ["An editorial observation."]
+++
```

Anything the front matter leaves out is "not assessed". There are no null values and no stored determination: the determination is computed from the findings and evidence.

### Adding a software entry

1. Create `content/directory/<id>.md` with the front matter above. The id becomes the URL. Do not add findings, and do not copy one from a similar product.
2. Run `hugo` and `node --test`. The tests fail if an unverified entry carries a finding.

### Desk review of the original entries

The 25 original entries (27 products, since Beancount and hledger, and NixOS and GNU Guix, are now separate entries with redirects from the old URLs) carry a documentation-informed desk review from 22 October 2026. The original "Planned assessment" section records a verification scenario, what may invalidate an overconfident claim, and a documentation starting point. That initial desk review was not a hands-on audit, and every entry remained "Insufficient evidence" at that stage. Later collected findings and completed rating decisions are indexed in [the evidence starting point](evidence/README.md); the original plans are not the current progress register. Entries are ordered into pilot stages through `pilot_stage` in the front matter:

1. Quick-format and portability controls: Git, SQLite, Todo.txt, Org-mode, Hugo.
2. Knowledge and document preservation: Obsidian, Logseq, Typst, Paperless-ngx, LibreOffice.
3. High-integrity and sensitive records: Beancount, hledger, Actual Budget, Pass, KeePassXC, Taskwarrior.
4. Engineering and creative state: OpenSCAD, KiCad, NGSPICE, REAPER, Darktable.
5. Multi-host, operational state, and complex recovery: Jujutsu, Fossil, Syncthing, NixOS, GNU Guix, OpenBSD.

The review corrected earlier wording: KeePassXC is no longer marked down for a binary vault, LibreOffice is no longer marked down for start-up speed, REAPER's licence is treated as a custody question, the OpenSCAD and NGSPICE reproducibility claims are bounded, and Syncthing, Paperless-ngx, and Darktable now state their limits. Cards show "Candidate: awaiting assessment" until an entry is assessed.

### Assessment programme (first twelve candidates)

Twelve entries carry a test plan in the body of their file and an `assessment_batch` in the front matter. The plan is shown on the entry page as "Planned assessment". It lists tests, not results, and no finding is recorded until the tests are run.

| Batch | Entries | What it tests |
|---|---|---|
| A | Zotero, Joplin, calibre | Export, backup and migration of records and their relationships |
| B | QGIS, FreeCAD, Blender, Inkscape | Preserved output versus preserved editability, structure, and intent |
| C | GnuCash, restic, BorgBackup | Recoverability, record integrity, key custody, oversight of consequential operations |
| D | Forgejo, GNU Octave | Distributed systems, executable research, multiple dependencies |

Every candidate gets the same baseline procedure, adapted to its domain:

1. **Baseline:** record version, operating system, installation method, licence, configuration, plugins, storage model, perspective role, domain profile, and network services, and create synthetic data with known expected results.
2. **Exit and export:** export, open independently, import into a clean installation or another tool, and compare against the baseline.
3. **Provider withdrawal:** disable external services in an isolated environment and note what already-created work remains available.
4. **Backup and recovery:** back up, restore to a clean environment, and verify files, metadata, relationships, configuration, and state.
5. **Consequential operations:** identify destructive or irreversible actions, authorization boundaries, warnings, audit records, and recovery options.
6. **Evidence:** keep commands, observations, expected versus actual results, logs, and limitations, and assign findings only afterwards.

Destructive, corruption, credential-loss, and interrupted-backup experiments run on disposable data only. Each test records an assessment id, application and exact version, environment, primary principle, requirement (E1 to E5), test id, procedure, the expected result written before the run, the actual observation, supporting material, limitations, confidence, and a Pass, Fail, or Not Verified result. Directly tested behavior, independently corroborated documentation, and vendor declarations are kept distinct, and documentation alone never substitutes for testing a recoverability claim. High-stakes or disputed assessments follow the **Two-Assessor Protocol** described in the methodology, and disagreements are recorded rather than averaged.

### Conducting and documenting an assessment

There is no web form: assessments are recorded by editing the entry file in `content/directory/`.

1. Choose one version of the software and one deployment model, and record it in `version_assessed`, along with `domain_profile` and `perspective_role`.
2. Work through the five fundamental requirements and the four principles using the [methodology](https://sovereign.polla.dev/methodology/) and the supporting tests (`data/framework.json`) as your checklist.
3. Record the results in the front matter: `assessment_status = "complete"`, `assessment_date`, `version_assessed`, a `[eligibility]` table (each of the five keys set to `pass`, `fail`, or `not_verified`), a `[principles]` table (each of the four set to `meets`, `partial`, or `does_not_meet`), and one `[[evidence]]` block per observation with `target` (a principle id such as `"sovereignty"`, or a requirement id such as `"E1"`), `text`, an optional `url`, and `confidence` (`high`, `medium`, or `low`). Add `limitations`.
4. Run `node scripts/determine.js <id>` to see the determination the site will publish, and fix any evidence gaps it reports.
5. Never store a determination. It is computed from the findings and evidence.
6. Evidence should describe what was tested and how, not repeat the product's own description. A determination needs a recorded observation for every finding and every Pass, a written justification for every Not Applicable, and no Low or unstated confidence. There is no minimum length, and Low confidence cannot establish a Pass or a Fail.

### Evolving the framework

1. Edit `data/framework.json` to change the principles, requirements, tests, or rules in one place.
2. Update `content/methodology.md` where the prose describes changed rules.
3. Run `node --test`.

Any future scored method needs separate justification, representative testing across disciplines, and a published methodology before it is adopted.

## Call for verification and contribution

Sovereign Personal Software is an evidence-led research initiative. The 68 software candidates in our directory represent strong architectures for user authority, but most currently hold an overall determination of **Insufficient evidence** because fundamental requirements (especially **E2** practical exit, **E3** independent recovery, and **E5** consequential oversight) require direct, hands-on laboratory verification rather than vendor promises or open-source assumptions.

We invite researchers, software engineers, digital preservation specialists, and system administrators to help verify these tools and advance the catalog.

### How you can contribute

1. **Conduct laboratory verification trials:**
   - Pick an application from the [Application Evidence Index](evidence/application-index.md).
   - Construct a synthetic test dataset matching the declared domain preservation profile (`Section 1 of the methodology`).
   - Run the [six-stage laboratory execution protocol](content/methodology.md#61-six-stage-laboratory-execution-protocol) in an isolated environment (clean virtual machine or container):
     - Test clean-machine restoration without network access (**T2**, **E3**).
     - Test cross-tool migration into an independent alternative tool (**T1**, **T6**, **E2**).
     - Test destructive operations, sync conflicts, and rollback behavior (**T4**, **T5**, **E5**).
   - Record commands, sha256 checksums, expected versus actual observations, and limitations.

2. **Participate as an independent second assessor:**
   - Under the [Two-Assessor Protocol](content/methodology.md#71-two-assessor-protocol-and-reassessment), high-stakes entries require two independent assessments.
   - Run parallel trials on the same pinned version and help document agreements or reconciliation notes.

3. **Propose new candidate applications:**
   - Follow the [Index entry format](#index-entry-format) to add missing tools in `content/directory/<id>.md`.
   - Ensure the entry includes a declared substrate, sync model, baseline domain profile, and reproducible inspection command.

4. **Refine migration runbooks:**
   - Help test and expand the command-line escape hatches in `content/escape-hatches.md`.
   - Document real-world data conversion losses, link breakages, and schema edge cases when migrating out of proprietary cloud platforms.

### Contribution guidelines

- **Evidence before findings:** Never award an eligibility `Pass` or positive principle finding based on documentation or marketing alone. Submit the exact command log, fixture hashes, and version environment.
- **No em dashes and no scoring:** Maintain consistency with framework conventions. The evaluation is unscored and qualitative.
- **Validate locally:** Always run `node scripts/determine.js <id>` and `node --test` before opening a pull request.

## Editing content

- **The manifesto text lives in `content/read.md`,** the source for the reading edition and the downloadable file. The home page cards and the evaluation section are generated from `data/framework.json`, but the rest of the home page (architecture, AI, synchronization, refusals, and the references) is hand-written HTML in `layouts/index.html`. Keep them consistent, and run `node --test`: `tests/consistency.test.js` checks the principle order and the key wording across the files.
- **The tagline and site description** are `tagline` and `description` in `hugo.toml`.
- Page intros and migration runbooks live in the Markdown files in `content/` (`content/escape-hatches.md` states explicit caveats and never promises a lossless migration).

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
- `consistency.test.js` checks that the principle order and wording are the same in the framework data, the manifesto, the home page, the short manifesto, the lineage page, the slides, and the built site, that domain profiles are valid, that retired wording and em dashes have not crept back, and that the built site makes no third-party requests.

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

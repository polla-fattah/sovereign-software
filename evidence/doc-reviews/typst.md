# Typst: documentation review

Reviewed 22 October 2026 from the Typst documentation (typst.app/docs), the typst.app privacy policy, and the typst/typst and typst/packages repositories only. Latest stable release shown on the GitHub releases page: 0.15.1, "July 17, 2026" (0.15.0 on June 15, 2026). The docs changelog lists 0.15.1 at the top but shows no date. Licence: Apache-2.0 for the compiler repository. Typst is pre-1.0, and the web app (typst.app) is a separate hosted service.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. Facts below rest on summaries of fetched pages; none of the pages was read in full by me.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 8](../third-pass/batch-8/README.md#typst) and reflected in the [application page](../../content/directory/typst.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: Package lookup checks configured data/cache locations before obtaining missing preview-namespace packages from Typst Universe; other namespaces are searched locally. Offline operation requires the needed package versions already to be available.
- [x] Resolved: The system world resolves a project filesystem root, a separate package store and lazily discovered fonts. Recovery therefore must account for referenced files, package versions and font inputs; a PDF or single .typ source is not demonstrated to preserve the editable project.

Remaining: An offline compile, explicit font inventory, cross-version output comparison and web-app export completeness remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- The repository contains the compiler and CLI. `typst compile` does one-off builds and `typst watch` recompiles on change. Source is plain-text `.typ` files. [README](https://github.com/typst/typst)
- Fonts: extra directories via `--font-path` or `TYPST_FONT_PATHS`; `typst fonts` lists what is found. Whether fonts are embedded in the repository binary was not found on the pages read. [README](https://github.com/typst/typst)
- Packages from `@preview/...` are downloaded on demand and cached; "Importing a cached package does not result in network access." Local packages go under a `@local` namespace in the data directory and take precedence over the cache. [typst/packages](https://github.com/typst/packages)
- Bibliographies read Hayagriva (`.yaml`/`.yml`) or BibLaTeX (`.bib`), and styles can be custom CSL files. Which other tools export these was not found. [bibliography](https://typst.app/docs/reference/model/bibliography/)

**Exit and migration (E2)**
- PDF export can target PDF/A-1b through PDF/A-4e. Only PDF/UA-1 is supported, and PDF/UA-2 is not. Tagged PDF is on by default and `--no-pdf-tags` blocks the accessible levels. [PDF](https://typst.app/docs/reference/pdf/)
- `pdf.attach` embeds files in the PDF, allowed with PDF/A-3 and PDF/A-4f/4e. [PDF](https://typst.app/docs/reference/pdf/)
- 0.15.0 lists HTML export with MathML and an experimental "bundle" target. Other export pages were not reachable (the export index returned 404). What is lost in each format was not found. [releases](https://github.com/typst/typst/releases)
- Web app: the privacy policy says you can download all data linked to your account, including projects, from account settings. Format of that download was not found. Forum reports of ZIP restore are unofficial and not used. [privacy](https://typst.app/privacy/)
- Git Sync links a web app project to a GitHub or GitLab repository, so the sources can be kept as ordinary files. It is labelled experimental and requires Typst Pro to link. [Git Sync](https://typst.app/docs/web-app/git-sync/)

**Recovery (E3)**
- Release notes record breaking changes within 0.x: 0.15.0 forbids backslashes in file paths and changes math glyph sizing and default calligraphic letterforms; 0.15.1 makes `typst eval` exit with code 1 on failure. So an old document may compile differently on a newer compiler. [releases](https://github.com/typst/typst/releases)
- Documents can test the compiler version with `sys.version`. No compatibility or semver policy appears on the version page. The changelog page also states none. [version](https://typst.app/docs/reference/foundations/version/), [changelog](https://typst.app/docs/changelog/)
- Compiler backup and reproducibility (timestamps, font embedding) are not covered on the PDF page: not found in the docs.
- Web app version history is listed as planned in the roadmap, and I found no official page for it. The roadmap page appears out of date (it lists PDF/A as planned), so treat its status as uncertain. [roadmap](https://typst.app/docs/roadmap/)

**Continuing authority (E4) and dependencies**
- CLI updates run only when `typst update` is invoked, and contact `api.github.com` release endpoints. The source shows no automatic update check. [update.rs](https://github.com/typst/typst/blob/main/crates/typst-cli/src/update.rs)
- Telemetry in the compiler: not mentioned in the README. The privacy policy does not describe compiler data practices. [privacy](https://typst.app/privacy/)
- Web app: needs an account (email, display name, password). Projects are stored in Microsoft Azure EU data centres. Telemetry (Mixpanel) is opt-in. The policy says the web app files can be processed with the open-source compiler. [privacy](https://typst.app/privacy/)
- Governance: CONTRIBUTING describes Typst as "the product of a startup" whose priorities change. It states no governance structure, CLA, or succession plan. [CONTRIBUTING](https://github.com/typst/typst/blob/main/CONTRIBUTING.md)
- Package repository infrastructure is Apache-2.0, and each package carries its own licence. [typst/packages](https://github.com/typst/packages)

**Consequential operations (E5)**
- Git Sync: a file deleted in Typst is removed from the repository, even if modified there; recovery is from Git history. The docs say it never force pushes. After disconnecting, reconnecting needs the synced files removed from the repository directory. [Git Sync](https://typst.app/docs/web-app/git-sync/)
- Deleting a web app folder has "no further confirmation". Project deletion, trash, and restore were not found. [folders](https://typst.app/docs/web-app/folders/)
- Compiler overwrite behavior for output files and `typst update --revert`: the update source mentions a local backup of the executable. Output overwrite warnings were not found. [update.rs](https://github.com/typst/typst/blob/main/crates/typst-cli/src/update.rs)

## Gaps to test or read next
1. Compile a synthetic multi-page project (images, bibliography, custom font, one `@preview` package) offline after clearing network access. Record what fails if the package cache or fonts are missing.
2. Compile the same source with 0.14.x and 0.15.1 and compare PDF text, layout, and page count, especially math.
3. Compile twice and byte-compare the PDFs to test reproducibility; try PDF/A-2b and PDF/A-4 and validate with an independent tool.
4. Import a web app download into a fresh local folder and compile it with the CLI; list what differs.
5. Delete a file in a Git-synced test project and recover it from Git.
6. Pages not read or not found: the export reference, web app terms (404), project deletion and history docs, `typst.app/legal` pages, the LICENSE file, `docs/dev/architecture.md`, and full CLI reference.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-8/README.md#typst); [actual assessment](../../content/directory/typst.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Source identifies a project root, package store and lazy font discovery; missing preview packages can be downloaded. No complete font/package/file-closed project was compiled or independently reconstructed in the assessed version. A PDF or a single source file does not preserve all editable document meaning.
- E5: Not Verified. The collected package/root dependency implementation does not establish effective file/package trust, executable extension boundaries, output overwrite review or available recovery of document mutations. No document-local or web-app control configuration is sufficiently evidenced for whole-scope E5.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish a usable independent document-authoring workflow retaining references, package/font behavior and editable structure. Readable Typst source or PDF output is not that full migration comparison.

Remaining: An offline compile, explicit font inventory, cross-version output comparison and web-app export completeness remain untested. E5 needs package/file access and output-overwrite policy plus inspectable source changes and correction boundaries.

Next without a local installation: Use a source/assets/font/package manifest with exact versions and a reference output; obtain an offline compile/comparison and primary-source file/package/overwrite controls without installing a new compiler here.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

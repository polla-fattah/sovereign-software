# Third pass, batch 8

Reviewed 23 October 2026, Asia/Baghdad. 12 bounded questions are resolved across 6 applications. All findings are copied into the actual application pages; broader unknowns remain open.

## Method and reproduction

Run from the repository root:

```powershell
python evidence/third-pass/inspect_remaining.py 8
```

[inspection-plan.json](inspection-plan.json) identifies pinned source revisions and inputs. [artifact-results.json](artifact-results.json) records retained-file SHA-256 hashes, Git-object checks where available, observed structures, source locations and environment. Downloaded application implementation code is not imported or run. Published schema DDL, when explicitly identified, is instantiated in SQLite; document code blocks are not evaluated. Archives are inspected in memory; historical samples retain their historical scope. Source-anchor matches locate reviewed code, not successful application tests or CI runs. No target application was installed. Any use of an already available runtime is identified explicitly in the findings and result record; source inspection is not reported as an application run. Upstream licensing and copyright continue to apply to the retained files.

At the user's request, existing eligibility and principle ratings are preserved exactly. E3/E5 decisions, principle reconciliation and invalid/blank-status corrections are deferred to the next pass. A resolved sub-question does not establish whole-application compliance.

<a id="git"></a>

## Git

- [x] Resolved: In an isolated Git 2.54.0.windows.1 fixture, a full --all bundle mirrored all recorded branch/tag/stash refs with matching object IDs and passed fsck. Ordinary clone omitted refs/stash, repository-local configuration, the marker hook and submodule working-tree contents; these need separate recovery planning. [Inspected source/input](https://github.com/git/git/blob/7e34d8174dcda3435d1404c9a30bef46afe6c13e/Documentation/git-bundle.adoc).
- [x] Resolved: The full bundle verified in an empty repository, whereas an incremental v1..main bundle failed verification for missing prerequisite commits. Successful bundle creation therefore does not establish a self-contained backup. [Inspected source/input](https://github.com/git/git/blob/7e34d8174dcda3435d1404c9a30bef46afe6c13e/Documentation/git-bundle.adoc).

Remaining: Signed-tag verification, LFS payloads, corruption recovery, submodule restoration and a representative real repository remain untested.

<a id="fossil"></a>

## Fossil

- [x] Resolved: The pinned export implementation limits --git export to check-ins, excluding tickets, wiki, technical notes and attachments. Git migration cannot replace a complete Fossil repository backup. [Inspected source/input](https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/export.c).
- [x] Resolved: Purge retains removed artifacts in local purgeevent/purgeitem graveyard tables, with undo and --explain/--dry-run. Obliterate removes that recovery path and prompts unless --force bypasses confirmation. These graveyard tables are not synchronized. [Inspected source/input](https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/purge.c).

Remaining: Full repository restoration, private/shunned artifacts, account/settings coverage and real purge recovery remain untested.

<a id="jujutsu"></a>

## Jujutsu

- [x] Resolved: Undo restores a parent operation and refuses operations from another workspace unless explicitly overridden. Its implementation warns that undoing workspace removal restores the repository record but not the workspace directory. [Inspected source/input](https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/undo.rs).
- [x] Resolved: Git export invokes export_refs, not an operation-store archive. The separately inspected operation-log model retains repository views, workspace commits and operation metadata: Git export alone does not establish preservation of that full recovery history. [Inspected source/input](https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/git/export.rs).

Remaining: Conflicted-change export, actual operation-store copying, older-version recovery and abandon/garbage-collection behavior remain untested.

<a id="hugo"></a>

## Hugo

- [x] Resolved: The installed Hugo v0.166.0 fixture retained a deleted page's output after both a normal build and --cleanDestinationDir. Newer pinned upstream tests specify removal of ordinary stale files with configurable keep patterns. This resolves the observed/version-specific boundary, not a general cleanup guarantee. [Inspected source/input](https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/testscripts/commands/hugo__clean_destination_dir.txt).
- [x] Resolved: The pinned remote-resource implementation uses an HTTP cache, checks allowed URLs and direct destination addresses, and makes environment proxies opt-in. A local source tree alone does not establish a network-independent build: remote inputs, caches and policy still matter. [Inspected source/input](https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/resources/resource_factories/create/create.go).

Remaining: The cause of the installed/newer cleanup difference, a network-blocked production build, module/theme closure and deployment dry-run remain open.

<a id="typst"></a>

## Typst

- [x] Resolved: Package lookup checks configured data/cache locations before obtaining missing preview-namespace packages from Typst Universe; other namespaces are searched locally. Offline operation requires the needed package versions already to be available. [Inspected source/input](https://github.com/typst/typst/blob/64c5e8c02fe0394d913ead36e42ef8c1334d2107/crates/typst-kit/src/packages.rs).
- [x] Resolved: The system world resolves a project filesystem root, a separate package store and lazily discovered fonts. Recovery therefore must account for referenced files, package versions and font inputs; a PDF or single .typ source is not demonstrated to preserve the editable project. [Inspected source/input](https://github.com/typst/typst/blob/64c5e8c02fe0394d913ead36e42ef8c1334d2107/crates/typst-cli/src/world.rs).

Remaining: An offline compile, explicit font inventory, cross-version output comparison and web-app export completeness remain untested.

<a id="ngspice"></a>

## ngspice

- [x] Resolved: The pinned raw writer emits variable names/types, point counts and real/complex flags before ASCII Values or native sizeof(double) binary writes. Independent binary decoding needs matching numeric/layout assumptions; this is a source-level format finding, not a cross-platform reader test. [Inspected source/input](https://github.com/ngspice/ngspice/blob/032b1c32c4dbad45ff132bcfac1dbecadbd8abb0/src/frontend/rawfile.c).
- [x] Resolved: The raw writer selects append modes a/ab versus truncating w/wb from its app argument. Existing output can be overwritten without append; the low-level writer itself does not provide a confirmation dialogue. [Inspected source/input](https://github.com/ngspice/ngspice/blob/032b1c32c4dbad45ff132bcfac1dbecadbd8abb0/src/frontend/rawfile.c).

Remaining: Independent decoding of real outputs, wrdata unit/scale comparison, external model closure and version-specific numerical behavior remain untested.


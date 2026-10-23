# Rating reconciliation, batch 7

Reviewed 24 October 2026. Each application below was evaluated individually against its existing essential-record and version scope. No target application was installed, built or run.

## Outcome

All 6 retain **Insufficient evidence**. E3/E5 remain **Not Verified** for the specific missing coverage below, not automatically Pass from documentation and not Fail from missing evidence. Positive dependent principles lacking their minimum are corrected. Existing E1/E4/Locality findings are not re-certified by this targeted pass.

[Plan](plan.json), [individual decisions and change ledger](decisions.json), [directory-wide review sequence](../remaining-plan.json), [current application index](../../application-index.md).

0 additional bounded source questions are resolved in this batch. Earlier resolved questions remain resolved and are not counted again. Source locators are provenance aids, not executed-behavior assertions.

<a id="logseq"></a>

## Logseq

Version/scope: Source commit 05c3ae73e08498e9e20f1b11c3eac5525e5e588d.

**E3: Not Verified.** Exporter UUID/timestamp/ontology options and SQLite backup failure cleanup are concretely described in source. No populated graph including assets, properties, references and file-to-DB conversion has been independently reconstructed. A successful database-copy mechanism alone does not establish complete graph semantics or safe existing-destination recovery. [Source context](https://github.com/logseq/logseq/blob/05c3ae73e08498e9e20f1b11c3eac5525e5e588d/deps/db/src/logseq/db/sqlite/backup.cljs).

**E5: Not Verified.** Backup failure cleanup can remove its destination, while the collected evidence does not establish effective caller destination safety, plugin authority, synchronization-conflict control or inspectable correction for DB graph mutations. Export options and source error handling are not whole-workflow oversight. [Source context](https://github.com/logseq/logseq/blob/master/README.md).

**Remaining:** A populated DB independently queried, complete asset-inclusive graph export/restore, file-to-DB conversion, task/property/ref fidelity, automatic-backup retention and cross-version outcomes. E5 needs caller destination safety, plugin and DB-sync authority, change inspection and recovery/retention boundaries.

**Next without a local installation:** Acquire a synthetic populated graph DB plus assets and complete export-option manifest; inspect it independently and seek same-version caller, backup-retention, plugin and sync conflict evidence.

[Actual assessment](../../../content/directory/logseq.md) | [review note](../../doc-reviews/logseq.md).

<a id="obsidian"></a>

## Obsidian

Version/scope: Official JSON Canvas source commit 456f843cb293df4f4ab1763e22ccb46a80b307c8.

**E3: Not Verified.** The official Canvas sample preserves node/edge data but references separate vault files. The closed application, Bases/plugin state, internal-link/property semantics, attachments and effective vault settings have not been independently reconstructed from a complete packet. Open Markdown/Canvas access is a positive preservation lead, not whole-vault E3. [Source context](https://github.com/obsidianmd/jsoncanvas/blob/456f843cb293df4f4ab1763e22ccb46a80b307c8/sample.canvas).

**E5: Not Verified.** The collected open Canvas specification is not access to the closed application's control implementation. Effective plugin permissions, Web Clipper/transmission choices, sync conflicts, rename/trash and snapshot recourse remain insufficiently covered for the existing vault scope. [Source context](https://obsidian.md/help/backup).

**E2 correction:** The former E2 Pass does not establish a replacement knowledge workflow preserving essential internal relationships, Canvas/Bases content and attachment/plugin-backed meaning. Individual readable Markdown/Canvas files do not complete a whole-vault migration comparison. [Source context](https://github.com/obsidianmd/jsoncanvas/blob/456f843cb293df4f4ab1763e22ccb46a80b307c8/spec/1.0.md).

**Remaining:** A complete representative vault including attachments/Bases/plugins/settings, semantic rendering, recovery snapshots and sync conflicts, trash/rename controls and cross-version behavior. E5 needs effective plugin/transmission and sync/rename/trash authorization, inspectability and recovery boundaries.

**Next without a local installation:** Inspect a synthetic vault including assets, Canvas references, Bases/plugin data/settings and expected link/property meanings; seek version-matched official control documentation with robust independent corroboration or recorded conflict/trash recovery.

[Actual assessment](../../../content/directory/obsidian.md) | [review note](../../doc-reviews/obsidian.md).

<a id="bibdesk"></a>

## BibDesk

Version/scope: Official Subversion source r30791.

**E3: Not Verified.** The static-group representation exposes membership cite keys, but linked-file data can contain macOS bookmarks/aliases and paths rather than document payloads. A real populated bibliography, smart groups, relocated files and compatible reader have not been reconstructed and compared. [Source context](https://svn.code.sf.net/p/bibdesk/svn/!svn/bc/30791/trunk/bibdesk/BDSKLinkedFile.m).

**E5: Not Verified.** Inspectable BibTeX does not establish authorization or correction for generated cite keys, attachment relocation/deletion, automated metadata and destructive edits. The group/link serializer evidence does not cover those consequential operations or their effective macOS configuration. [Source context](https://sourceforge.net/p/bibdesk/wiki/FAQ/).

**Remaining:** A real .bib with groups and linked files parsed/re-saved by independent tools, smart-group preservation, actual path relocation, macOS-version compatibility and complete document recovery. E5 needs attachment and cite-key mutation controls, automatic metadata review and available correction in the assessed macOS workflow.

**Next without a local installation:** Use a synthetic populated bibliography with group definitions and actual file dependencies; parse it and decode supported link records independently, then obtain macOS/version-matched metadata/file/undo evidence.

[Actual assessment](../../../content/directory/bibdesk.md) | [review note](../../doc-reviews/bibdesk.md).

<a id="libreoffice"></a>

## LibreOffice (ODF)

Version/scope: Source commit 568bac1a5c057f8ec1f43f6d3dae1a9ad0509708.

**E3: Not Verified.** The ODT fixture independently exposes comments and XML structure, but not equivalent resolved-comment rendering, tracked changes, spreadsheet formulas/macros or encrypted document recovery. Complete version- and format-specific document semantics were not reconstructed for the original office profile. [Source context](https://github.com/LibreOffice/core/blob/568bac1a5c057f8ec1f43f6d3dae1a9ad0509708/sw/qa/extras/odfexport/data/resolved-comment.odt).

**E5: Not Verified.** Persistent and transactional backup paths, overwrite behavior and error handling are established in source, but do not prove configured retention or crash durability. Macro/external-link authorization, save/format-loss decisions and correction of consequential document changes remain insufficiently covered. [Source context](https://github.com/LibreOffice/core/blob/568bac1a5c057f8ec1f43f6d3dae1a9ad0509708/sfx2/source/doc/docfile.cxx).

**E2 correction:** The former E2 Pass does not establish usable migration of the full declared office records, including tracked changes, formulas, macros and structural meaning. Supported formats and acknowledged formatting loss are not a completed essential-feature comparison. [Source context](https://help.libreoffice.org/latest/en-US/text/shared/guide/ms_user.html).

**Remaining:** Current ODT/ODS/DOCX/XLSX comparisons including tracked changes/formulas/macros, encrypted-package inspection, actual repeated saves and crash recovery, older versions and external dependencies. E5 needs macro/external-link authority, format/overwrite decisions, effective backup/autorecovery and usable correction limits.

**Next without a local installation:** Collect representative synthetic ODT/ODS/native-interchange pairs, encrypted test documents with non-secret credentials and semantic manifests; inspect packages and reuse same-version macro/link/save/recovery evidence.

[Actual assessment](../../../content/directory/libreoffice.md) | [review note](../../doc-reviews/libreoffice.md).

<a id="beancount"></a>

## Beancount

Version/scope: Source commit 9747213802acb733ce53acc6e963f5961f47d6cd.

**E3: Not Verified.** The ledger exposes dated directives, costs, commodities, metadata and omitted amounts, but independent exact balance/lot/FX interpretation and plugin-expanded meaning are not established. Readable text is not a complete replacement evaluator or a reconstruction of all essential accounting invariants. [Source context](https://github.com/beancount/beancount/blob/9747213802acb733ce53acc6e963f5961f47d6cd/examples/vesting/vesting.beancount).

**E5: Not Verified.** Padding synthesizes accounting transactions with account/currency-specific limits. That is an inspectable transformation, not proof of complete original data or automatic accounting correctness. Effective plugin/import authorization, change review and reversal across the declared ledger remain insufficiently evidenced. [Source context](https://github.com/beancount/beancount/blob/9747213802acb733ce53acc6e963f5961f47d6cd/beancount/ops/pad.py).

**E2 correction:** The former E2 Pass does not establish an alternative accounting workflow preserving omitted-amount inference, lots, prices, currencies and plugin-derived meaning. Ordinary ledger text readability does not complete that semantic migration. [Source context](https://beancount.github.io/docs/getting_started_with_beancount/).

**Remaining:** Independent exact balance/lot/FX reproduction, plugin effects, migration to another ledger, v2/v3 compatibility, report fidelity and actual editing/recovery. E5 needs plugin/import and generated-transaction review, visible source changes and correction/restore boundaries; balancing alone does not establish oversight.

**Next without a local installation:** Use a synthetic ledger with expected balances, lots/FX, plugin configuration and source hashes; compare an independent evaluator or supplied result record, and inspect pad/import/plugin diffs and recovery evidence.

[Actual assessment](../../../content/directory/beancount.md) | [review note](../../doc-reviews/beancount.md).

<a id="hledger"></a>

## hledger

Version/scope: Source commit cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd.

**E3: Not Verified.** Readable journal text and documented version-control workflows preserve source records, while no clean reconstruction establishes equivalent balances, costs, comments/tags and import context. The original finance profile requires independent semantic interpretation, not merely copying journal bytes. [Source context](https://github.com/hledgerorg/hledger/blob/cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd/examples/borrowing.journal).

**E5: Not Verified.** Import dry-run and deferred checkpoint updates are concrete safeguards; non-dry import appends transactions and persists checkpoint state. Effective duplicate handling, import/checkpoint configuration, source mutation visibility and recourse after bad imports are not sufficiently covered for whole-scope E5. [Source context](https://github.com/hledgerorg/hledger/blob/cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd/hledger/Hledger/Cli/Commands/Import.hs).

**E2 correction:** The former E2 Pass does not establish independent-workflow preservation of essential cost/commodity, posting and metadata semantics. Text access and file selection alone do not demonstrate the declared alternative-ledger transition. [Source context](https://hledger.org/1.9/manual.html).

**Remaining:** Runtime JSON/text/Beancount round trips, balances/costs/comments/tags comparison, duplicate imports with and without checkpoints, clean-directory restore and old/new version behavior. E5 needs effective import/checkpoint controls, duplicate cases, visible changes and safe correction; dry-run is a bounded control, not universal idempotence.

**Next without a local installation:** Inspect synthetic journals plus input/checkpoint/configuration records and expected balances/costs; obtain independent-reader or external round-trip comparisons and same-version dry-run/duplicate/correction evidence.

[Actual assessment](../../../content/directory/hledger.md) | [review note](../../doc-reviews/hledger.md).

## Validation boundary

The shared rating audit checks recorded fields, decision evidence and review notes. Historical schema-repair and evidence baselines remain available. Source/fixture hashes, navigation and the complete set of updated pages are checked by the final repository validation; no per-product clean restore or upstream test run is implied.

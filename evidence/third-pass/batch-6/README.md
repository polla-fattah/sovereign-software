# Third pass, batch 6

Reviewed 23 October 2026, Asia/Baghdad. 12 bounded questions are resolved across 6 applications. All findings are copied into the actual application pages; broader unknowns remain open.

## Method and reproduction

Run from the repository root:

```powershell
python evidence/third-pass/inspect_remaining.py 6
```

[inspection-plan.json](inspection-plan.json) identifies pinned source revisions and inputs. [artifact-results.json](artifact-results.json) records retained-file SHA-256 hashes, Git-object checks where available, observed structures, source locations and environment. Downloaded application implementation code is not imported or run. Published schema DDL, when explicitly identified, is instantiated in SQLite; document code blocks are not evaluated. Archives are inspected in memory; historical samples retain their historical scope. Source-anchor matches locate reviewed code, not successful application tests or CI runs. No target application was installed or executed in this batch. Upstream licensing and copyright continue to apply to the retained files.

At the user's request, existing eligibility and principle ratings are preserved exactly. E3/E5 decisions, principle reconciliation and invalid/blank-status corrections are deferred to the next pass. A resolved sub-question does not establish whole-application compliance.

<a id="emacs-org-mode"></a>

## Org-mode

- [x] Resolved: Standard text inspection of the upstream babel.org fixture identifies 33 headings, links/properties and 45 source blocks, including Emacs Lisp, shell and Org blocks. These structures are readable without Emacs. No block was executed and no export, formula evaluation or attachment restoration was performed. [Inspected source/input](https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/testing/examples/babel.org).
- [x] Resolved: The pinned source sets org-confirm-babel-evaluate to t and explicitly handles no/never and no-export/never-export evaluation arguments. Confirmation can be disabled or supplied as a function. This establishes the defined default and control branches, not the effective configuration of every buffer or proof that opening/exporting arbitrary documents is safe. [Inspected source/input](https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/lisp/ob-core.el).

Remaining: Independent full semantic parsing, export losses, ID/attachment/include relocation, actual Babel prompt/export behavior under local settings, cryptography, undo and older-version compatibility.

<a id="logseq"></a>

## Logseq

- [x] Resolved: The DB exporter has explicit options for UUIDs, timestamps, shallow copies and ontology exclusion. Node/property/class timestamps are conditional; content-reference exports retain referenced UUIDs, while partial-map merging warns against use for full-graph export. Thus export modes are not equivalent preservation packages. This is a source-level distinction, not an executed Markdown/EDN/SQLite migration. [Inspected source/input](https://github.com/logseq/logseq/blob/05c3ae73e08498e9e20f1b11c3eac5525e5e588d/deps/db/src/logseq/db/sqlite/export.cljs).
- [x] Resolved: The Node SQLite backup helper calls the SQLite backup API, removes the destination file when synchronous or asynchronous backup fails, and closes the opened source connection in the file-based wrapper. This identifies error cleanup; it does not establish a complete graph backup including asset files, successful restoration, or safety if a caller supplies an existing destination. [Inspected source/input](https://github.com/logseq/logseq/blob/05c3ae73e08498e9e20f1b11c3eac5525e5e588d/deps/db/src/logseq/db/sqlite/backup.cljs).

Remaining: A populated DB independently queried, complete asset-inclusive graph export/restore, file-to-DB conversion, task/property/ref fidelity, automatic-backup retention and cross-version outcomes.

<a id="obsidian"></a>

## Obsidian

- [x] Resolved: The official JSON Canvas sample parses with standard JSON: five nodes and one edge, with both edge endpoints resolving to node IDs. Text, geometry, a group label and three file-node paths are readable without Obsidian. This is independent interpretation of this Canvas sample, not an executed vault migration or recovery of every Obsidian feature. [Inspected source/input](https://github.com/obsidianmd/jsoncanvas/blob/456f843cb293df4f4ab1763e22ccb46a80b307c8/sample.canvas).
- [x] Resolved: JSON Canvas 1.0 defines file nodes by vault-relative file paths and optional subpaths, rather than embedding those files' contents. The sample references readme.md, _site/logo.svg and spec/1.0.md. Retaining the .canvas alone therefore does not preserve its referenced content. This format specification is not access to the closed-source application's implementation or a guarantee about plugins and Bases. [Inspected source/input](https://github.com/obsidianmd/jsoncanvas/blob/456f843cb293df4f4ab1763e22ccb46a80b307c8/spec/1.0.md).

Remaining: A complete representative vault including attachments/Bases/plugins/settings, semantic rendering, recovery snapshots and sync conflicts, trash/rename controls and cross-version behavior.

<a id="qownnotes"></a>

## QOwnNotes

- [x] Resolved: The database schema defines tag records with parent_id, noteTagLink records keyed by tag_id, note filename and subfolder path, and trashItem metadata. Tags and their associations therefore have explicit database state beyond Markdown note text. Copying only note files cannot be assumed to preserve this state; no populated database or missing-database reconstruction was tested. [Inspected source/input](https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/services/databaseservice.cpp).
- [x] Resolved: The inspected note-removal path asks about backlinks when relevant and checks a user-question result before invoking note.remove(true). Bulk deletion separately warns that selected folders' files and subfolders will be removed. This establishes application-level confirmation branches, not universal prompting under saved dialog preferences or successful local/server trash restoration. [Inspected source/input](https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/managers/noteoperationsmanager.cpp).

Remaining: A complete notes.sqlite/native-folder move and tag reconstruction, Markdown export loss, actual trash recovery and deletion modes, simultaneous edits, network settings and older versions.

<a id="bibdesk"></a>

## BibDesk

- [x] Resolved: The static-group dictionary representation stores an escaped group name and a comma-joined list of publication cite keys, deduplicating keys as it builds the list. This exposes how group membership can be represented independently; it does not establish that another BibTeX editor retains the group dictionary or that smart-group queries round-trip. [Inspected source/input](https://svn.code.sf.net/p/bibdesk/svn/!svn/bc/30791/trunk/bibdesk/BDSKStaticGroup.m).
- [x] Resolved: The linked-file reader recognizes Base64 binary-plist data and extracts bookmark or legacy aliasData plus relativePath; a non-plist value is treated as a relative path. These are links and macOS bookmark/alias data, not attached-document payloads. Preserving a bibliographic record alone does not establish that the referenced files move or remain resolvable on another platform. [Inspected source/input](https://svn.code.sf.net/p/bibdesk/svn/!svn/bc/30791/trunk/bibdesk/BDSKLinkedFile.m).

Remaining: A real .bib with groups and linked files parsed/re-saved by independent tools, smart-group preservation, actual path relocation, macOS-version compatibility and complete document recovery.

<a id="libreoffice"></a>

## LibreOffice

- [x] Resolved: The published resolved-comment.odt opens as ZIP and its content.xml parses independently. It contains two office:annotation elements, two matching annotation-end elements, creator/date fields and document paragraphs/styles. This establishes accessible comment structures for this fixture, not correct rendering of resolved-comment state, tracked changes, spreadsheets, macros or password-protected documents. [Inspected source/input](https://github.com/LibreOffice/core/blob/568bac1a5c057f8ec1f43f6d3dae1a9ad0509708/sw/qa/extras/odfexport/data/resolved-comment.odt).
- [x] Resolved: DoBackup_Impl first requires an existing source document and uses NameClash::OVERWRITE when transferring the backup; failure can set ERRCODE_SFX_CANTCREATEBACKUP. Internal transactional backups and a backup-restore error path also exist separately. A persistent backup is not necessarily an unlimited version history, and these branches do not establish crash durability or the user's configured backup/autorecovery policy. [Inspected source/input](https://github.com/LibreOffice/core/blob/568bac1a5c057f8ec1f43f6d3dae1a9ad0509708/sfx2/source/doc/docfile.cxx).

Remaining: Current ODT/ODS/DOCX/XLSX comparisons including tracked changes/formulas/macros, encrypted-package inspection, actual repeated saves and crash recovery, older versions and external dependencies.


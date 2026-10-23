# Collected evidence: third pass

**Current rating follow-up, 24 October 2026:** [All 68 individual E3/E5 reviews are now recorded](../rating-reconciliation/README.md). This collection folder's original 144 bounded answers remain historical; rating batches 2 and 3 add eight and eleven respectively, producing 163 checked questions on the actual pages. Completion of the rating pass does not certify unresolved recovery/control scopes.

[Evidence starting point](../README.md) | [Application-by-application index](../application-index.md). This folder preserves the completed evidence sweep. The original batch 1 observations are below, with later batches linked here; this is not the completed-rating register.

**Earlier follow-up (23 October):** [Rating reconciliation batch 2](../rating-reconciliation/batch-2/README.md) updates restic, BorgBackup, Kopia, Anki, Joplin and Zotero, resolves eight additional bounded source questions and corrects unsupported ratings. Targeted reconciliation now covers 12 of 68 entries; 56 remain. The 144-question evidence-sweep total below is historical and excludes these eight new questions.

**Subsequent rating work:** [Reconciliation batch 1](../rating-reconciliation/batch-1/README.md) now updates E3/E5 and associated principle judgments for six applications. The rating-freeze descriptions in the evidence-sweep reports below are historical; collected observations remain available and are not automatically converted into Passes.

Batches [6](./batch-6/README.md), [7](./batch-7/README.md), [8](./batch-8/README.md), [9](./batch-9/README.md), [10](./batch-10/README.md), [11](./batch-11/README.md) and [12](./batch-12/README.md) complete the evidence sweep: 77 further bounded questions across the remaining 38 applications. All 68 application pages now contain third-pass findings (144 bounded questions overall). Evidence, explanations and remaining work are updated; existing eligibility/principle ratings are preserved for the agreed next pass. No target software was installed. Only explicitly identified, already available runtimes were exercised in disposable fixtures.

[Batch 5](batch-5/README.md) resolves twelve further questions for Blender, Inkscape, Krita, GIMP, KiCad and OpenSCAD. [Batch history and rating progress](remaining-batches.md) separates the completed evidence sweep from subsequent rating reconciliation.

[Batch 4](batch-4/README.md) resolves fourteen further questions for calibre, Audacity, Ardour, MuseScore Studio, Zim Desktop Wiki and Taskwarrior, with updates to their actual assessments.

[Batch 3](batch-3/README.md) resolves fifteen further source questions for Gitea, Forgejo, Paperless-ngx, Kopia, restic and BorgBackup, with updates to all six application assessments.

[Batch 2](batch-2/README.md) resolves fourteen further questions for CadQuery, darktable, JabRef, GNU Octave, Kdenlive, and KeePassXC, with updates to their application assessments.

Reviewed 23 October 2026 (Asia/Baghdad). Twelve bounded questions are resolved below. Each application page now records these findings in its evidence and assessment text. Resolving a question about a limitation does not remove the limitation.

The source links identify exact commits inspected, not released application versions. Historical fixtures retained at those commits do not become examples of a current release merely because they remain in its repository. Upstream test assertions were inspected; their CI execution logs were not obtained and their application test suites were not run.

## Reproducible artifact inspection

Run from the repository root:

```powershell
python evidence/third-pass/inspect_artifacts.py
```

The script uses Python's standard library to fetch four pinned inputs and inspect them. The retained files are in [inputs/](inputs/); source URLs, commits, SHA-256 hashes, archive manifests, environment, query text, and observed results are in [artifact-results.json](artifact-results.json). Input files keep their upstream licensing; Zotero's SQL header contains its copyright and AGPL notice. These are upstream test fixtures, not personal data. No target application was installed or executed. ZIP members are read in memory, not extracted into the filesystem.

Observed environment: Python 3.13.2, SQLite 3.45.3, Windows 11. The recorded UTC time is 22 October 2026, 22:42; the local review date is 23 October in Baghdad.

## Anki

- [x] Resolved: can an actual package be opened without Anki? The retained `media.apkg` is a ZIP; its `collection.anki2` opened with standard SQLite and returned `integrity_check = ok`, one note, and one card. The note field contains `[sound:foo.wav]`.
- [x] Resolved: can the sample's note/card and media relationships be interpreted? Joining `cards.nid` to `notes.id` identified the note; the archive's JSON `media` map links member `0` to `foo.wav`. This establishes independent interpretation for this legacy fixture.

The [upstream round-trip tests](https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/rslib/src/import_export/package/apkg/tests.rs#L30-L69) exercise legacy and nonlegacy packages, and explicitly assert media bytes and checksums. Other [assertions](https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/rslib/src/import_export/package/apkg/tests.rs#L182-L245) check FSRS parameter-array lengths with scheduling enabled and empty arrays when omitted. Those assertions do not compare every scheduling value or establish a passing run. The [inspected fixture](https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/pylib/tests/support/media.apkg) does not exercise modern compressed package internals.

Remaining: modern package decoding, full scheduling and deck-option fidelity, collection replacement and clean restoration, and alternative-client behavior.

## Joplin

- [x] Resolved: what is JEX's relationship to raw export? The [JEX exporter](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/interop/InteropService_Exporter_Jex.ts) delegates item/resource handling to the raw exporter and creates a tar archive. The [raw exporter](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/interop/InteropService_Exporter_Raw.ts) writes serialized items as UTF-8 and copies resource files under `resources/`.
- [x] Resolved: does export/import preserve original identity and sharing state unchanged? The [raw importer](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/interop/InteropService_Importer_Raw.ts) generates replacement IDs and rewrites links. The [export service](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/interop/InteropService.ts#L349-L355) clears `is_shared` and `share_id`. Native import therefore does not restore original IDs or sharing authority unchanged.

The [upstream tests](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/interop/InteropService.test.ts) assert new folder/note/resource IDs, tag relationships, identical attachment bytes, rewritten note links, and cleared sharing fields. They provide concrete scenarios to inspect or rerun, not observed CI results in this pass.

Remaining: complete revision history, keys/settings, encrypted-target recovery, large-library fidelity, and cross-version restores.

## Actual Budget

- [x] Resolved: what does the inspected export routine package and change? [`exportBuffer`](https://github.com/actualbudget/actual/blob/d1a536f35c5a114eda0582d5a1d744a9103cc90e/packages/loot-core/src/server/cloud-storage.ts#L145-L194) copies the database, clears `kvcache` and `kvcache_key`, sets `resetClock = true` in metadata, and packages exactly `db.sqlite` and `metadata.json` at that point in the routine. The source makes this explicit rather than an inferred ZIP inventory.
- [x] Resolved: are automatic backups identical to an unchanged sync database? [`makeBackup`](https://github.com/actualbudget/actual/blob/d1a536f35c5a114eda0582d5a1d744a9103cc90e/packages/loot-core/src/server/budgetfiles/backups.ts) deletes `messages_crdt` and `messages_clock` from its temporary database before packaging it. Separately, [Actual-file import](https://github.com/actualbudget/actual/blob/d1a536f35c5a114eda0582d5a1d744a9103cc90e/packages/loot-core/src/server/importers/actual.ts) passes null cloud/group identifiers, while `importBuffer` replaces cloud identifiers and selects the encryption key ID from supplied encryption metadata, or null. Preserving a budget and preserving its previous sync context are different operations.

These are inspected code paths; no financial data was restored or reconciled. The automatic-backup history deletion must not be generalized to all exports: the inspected `exportBuffer` explicitly clears caches, whereas `makeBackup` additionally clears the CRDT tables.

Remaining: balances, rules, schedules, provider credentials, server-loss recovery, and encryption behavior during a complete restore.

## QGIS

- [x] Resolved: can a real QGZ be inspected without QGIS? The [retained fixture](https://github.com/qgis/QGIS/blob/b7db8233afbfe8d1e9870da61a2696592295932c/tests/testdata/embedded_groups/project1.qgz) opened with standard ZIP/XML tools and contains `project1.qgs` plus a zero-byte `project1.qgd`. The XML identifies itself as `3.11.0-Master` and exposes three layers and their OGR providers.
- [x] Resolved: does this archive contain those source datasets? Its complete ZIP manifest contains only the two project files. The XML points to `../lines.shp`, `../points.shp`, and `../polys.shp`. This sample is not a self-contained copy of its data sources.

The [upstream tests](https://github.com/qgis/QGIS/blob/b7db8233afbfe8d1e9870da61a2696592295932c/tests/src/python/test_qgsproject.py#L1196-L1405) assert archive rereading, relative versus absolute paths, and moving a GeoPackage containing a project. No passing execution of those tests was obtained. The zero-byte QGD fixture does not establish readability of populated auxiliary storage.

Remaining: populated auxiliary tables, joins/layouts/labels, current-version compatibility, provider/plugin absence, and moving a complete complex project.

## FreeCAD

- [x] Resolved: can FCStd structure be read without FreeCAD? The [retained PadTest fixture](https://github.com/FreeCAD/FreeCAD/blob/d48752f2851906f93e060cc996ba9fba1e5a05f8/data/tests/PadTest.fcstd) is a ZIP whose `Document.xml` parsed successfully. It exposes 13 named typed objects, including sketches, pads, and a body, plus `Constraints`, `Length`, `Support`, and link properties. Geometry payloads and GUI data are separate archive members.
- [x] Resolved: is backup/save handling absent or unavailable to inspect? The [save implementation](https://github.com/FreeCAD/FreeCAD/blob/d48752f2851906f93e060cc996ba9fba1e5a05f8/src/App/Document.cpp#L1968-L2106) writes `Document.xml` using a ZIP writer and, when backup policy is enabled, writes through a temporary filename before applying `BackupPolicy`. The code supplies fallback preferences for backup count, enabling backups, and timestamped `.FCBak` naming. This closes the missing-implementation question; it does not establish crash durability or the effective settings in a user's profile.

Remaining: interpreting geometry and constraint semantics independently, units/expressions, complete engineering reconstruction, STEP loss, dependency absence, version compatibility, and actual crash recovery.

## Zotero

- [x] Resolved: is there a published machine-readable schema for the selected source? [`resource/schema/userdata.sql`](https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/resource/schema/userdata.sql) defines the item, field/value, creator, tag, collection, attachment, relation, and annotation tables and their keys.
- [x] Resolved: can standard SQLite interpret the structural relationships? The unmodified SQL successfully created an in-memory database. Five queries for metadata, creators, tags, collections, and annotations prepared and returned column descriptions without Zotero. This establishes structural queryability for the inspected schema; the database was empty and no populated user library was recovered.

Remaining: actual library retrieval, title/type field mappings, linked-file resolution, attachment content and hashes, annotation rendering, full export/import comparisons, and older-version restoration.

## Assessment updates

The six files under `content/directory/` include the resolved checkboxes and pinned evidence. Existing requirement findings are not promoted merely because an implementation or test exists. The actual artifact observations support the specific inspection results above; whole-workflow recovery and migration remain open. No independent third-party corroboration or verified CI run is claimed for this batch.

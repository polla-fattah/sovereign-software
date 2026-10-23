# Rating reconciliation, batch 2

Reviewed 23 October 2026. Applications: restic, BorgBackup, Kopia, Anki, Joplin and Zotero. No application was installed, built or run.

## Outcome

Eight additional bounded source questions are resolved and checked on the actual pages. No new full-scope E3/E5 Pass or Fail is justified by this packet. All six retain **Insufficient evidence**. Unsupported positive dependent principles are withdrawn to **Not assessed**, not downgraded to verified failures.

| Application | E3 | E5 | Longevity | Transparency and Control |
|---|---|---|---|---|
| restic | Not Verified | Not Verified | Not assessed | Not assessed |
| BorgBackup | Not Verified | Not Verified | Not assessed | Not assessed |
| Kopia | Not Verified | Not Verified | Not assessed | Not assessed |
| Anki | Not Verified | Not Verified | Not assessed | Not assessed |
| Joplin | Not Verified | Not Verified | Not assessed | Not assessed |
| Zotero | Not Verified | Not Verified | Not assessed | Not assessed |

Twenty-one rating cells change: six Longevity, six Transparency, six Sovereignty findings and three E2 migration claims. Anki, Joplin and Zotero's former E2 Passes did not establish usable migration of their full essential records/relationships. The three backup applications already had E2 Not Verified; their positive Sovereignty findings also lacked that necessary minimum. Existing E1, E4 and Locality findings were not independently re-certified by this targeted review.

Targeted rating reconciliation now covers **12 of 68** applications, with **56 pending**. The earlier evidence sweep's 144 bounded answers remain historical; this batch adds eight further questions without rewriting that inventory.

## What was actually done

- The predeclared [scope](plan.json) keeps each existing application profile. A tiny legacy flashcard sample or empty bibliography schema does not replace the broad declared scope.
- Nine additional source files were downloaded as data from the same pinned commits already assessed. Their Git blob IDs and SHA-256 hashes are retained in [inspection-results.json](inspection-results.json). No downloaded application implementation was imported or executed.
- Fifteen retained restic/Borg/Kopia source files were rehashed, and the previously inspected control branches were reviewed in context.
- Python/SQLite independently repeated the legacy Anki package queries and Zotero schema load. Anki still contains one joined note/card and a four-byte mapped media member; this is not evidence of playable sound or complete modern collection recovery. Zotero creates 54 tables, with all six selected research-record tables empty.
- [coverage.json](coverage.json) maps each application to the remaining question and the smallest useful evidence packet. [decisions.json](decisions.json) records each decision and every changed field. The actual assessment and review note carry the same current findings.

No universal installation requirement is introduced. Concrete, comprehensive source evidence can support a medium-confidence qualified E5 judgment. Here the missing control paths and incomplete recovery artifacts are stated individually; the mere presence of documentation, a confirmation dialog or an upstream test assertion does not fill them.

## Reproduction and verification

From the repository root:

```powershell
C:\Python313\python.exe evidence/rating-reconciliation/batch-2/inspect_evidence.py
node scripts/rating-audit.js
node --test
hugo
git -c core.safecrlf=false diff --check
```

The inspector is offline by default. Add `--fetch` only to retrieve missing pinned source; each downloaded file must match its declared Git blob ID before retention. Re-running regenerates only this batch's inspection result. Historical source and fixture results are not overwritten.

Source locators in the ledger identify manually reviewed branches. Tests check their presence and the retained bytes; they do not pretend that matching a string executes or proves application behavior. The rating audit checks completed batches against actual source fields, decision evidence and current review notes, and reports unreviewed applications as backlog. It is not a product certification.

## Resolved questions and remaining work

<a id="restic"></a>

### restic

The existing source questions remain resolved: optional full-data checking, retention/prune dry-run and TAR/ZIP metadata boundaries. Their retained source hashes were rechecked; they are not counted again as new closures.

**E3: Not Verified.** Full-data reading is opt-in and TAR carries more metadata than ZIP, but retained source does not demonstrate decrypting a preserved repository, restoring the declared filesystem records, or comparing ownership, links, ACLs and xattrs with a baseline. These positive implementation findings are not a complete recovery record. [Source context](https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/internal/dump/tar.go).

**E5: Not Verified.** The inspected forget command reports retention selections and gates snapshot removal on dry-run; its prune call propagates dry-run, and the prune implementation returns before mutation in that mode. These establish useful retention safeguards, not the whole assessed operation surface: restore overwrite/delete, key-management authorization and recovery from interrupted mutations remain insufficiently evidenced. [Source context](https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/cmd/restic/cmd_forget.go).

**Remaining:** A synthetic encrypted repository and expected file/metadata manifest, a matched restore report using preserved recovery material, and records for restore overwrite/delete, key changes and interrupted pruning remain missing. TAR/ZIP source differences and optional full-data checking are already answered; do not reopen those documentation questions.

**Next without installing locally:** Obtain an upstream or independent version-matched synthetic recovery evidence packet: repository/configuration, non-secret test credentials, baseline manifest, commands and before/after output. Independently compare recovered bytes, paths, links and metadata using existing tools; no local restic installation is required if the restore was reproducibly run elsewhere.

[Actual assessment](../../../content/directory/restic.md) and [review note](../../doc-reviews/restic.md).

<a id="borgbackup"></a>

### BorgBackup

The existing source questions remain resolved: development-source TAR metadata, check/repair acknowledgement and delete/undelete/compact boundaries. Their retained source hashes were rechecked; they are not counted again as new closures.

**E3: Not Verified.** The development source writes interpretable TAR fields plus Borg-specific metadata; ordinary TAR readers do not automatically interpret that extension. No preserved encrypted repository, compatible-key recovery or baseline-matched extraction was exercised. Results cannot be transferred to Borg 1.x or a released Borg 2 binary merely because their documentation looks similar. [Source context](https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/tar_cmds.py).

**E5: Not Verified.** The inspected development branch supplies a repair warning/typed acknowledgement, soft-delete/undelete and compaction dry-run. Normal compaction closes the soft-delete window. These control paths are concrete evidence, but extraction overwrite, credential handling and an observed delete/undelete/compact recovery sequence are not sufficiently covered for the existing backup scope. [Source context](https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/check_cmd.py).

**Remaining:** A declared released version or exact development build, a populated synthetic repository with baseline metadata and preserved recovery material, compatible restore evidence, and before/after delete/undelete/compact, repair and extraction-overwrite records remain missing. Existing source conclusions are limited to the pinned development tree.

**Next without installing locally:** Request a reproducible packet for the exact assessed commit or explicitly reassess a released version. Use a disposable synthetic repository and expected manifest, with delete/undelete output before compaction and separately backed-up post-compaction evidence. Independent TAR/manifest inspection can happen here without installing Borg.

[Actual assessment](../../../content/directory/borgbackup.md) and [review note](../../doc-reviews/borgbackup.md).

<a id="kopia"></a>

### Kopia

- [x] Resolved: The explicit snapshot-delete command reports a preview and returns before DeleteManifest unless --delete is set. Confirmed snapshot-ID, root-object-ID and source-wide selections use the shared deletion gate; this does not cover automated maintenance. [Pinned source](https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/cli/command_snapshot_delete.go).

**E3: Not Verified.** Full-file verification is percentage-gated, and the inspected ZIP writer omits symlink/directory output while TAR preserves more structure without setting ACL/xattr fields. None of those facts establishes complete decryption/restoration of the existing filesystem scope. Password-dependent repository recovery, executed exports and baseline comparisons remain absent. [Source context](https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/snapshot/snapshotfs/snapshot_verifier.go).

**E5: Not Verified.** Additional pinned source resolves explicit snapshot deletion: without --delete the command reports the selected snapshot and returns before DeleteManifest; the confirmed branch reports deletion and calls DeleteManifest. Source IDs and source-wide selections reach that same gate. Automated retention/maintenance safety, restore overwrite/delete and available recovery are still insufficiently covered for whole-scope E5. [Source context](https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/cli/command_snapshot_delete.go).

**Remaining:** A populated synthetic encrypted repository, preserved test password/configuration, full-file verification and baseline-matched restore/export records, plus policy/maintenance and restore overwrite/delete safeguards remain missing. The explicit snapshot-delete confirmation question is now answered; it does not establish maintenance rollback.

**Next without installing locally:** Reuse a version-matched public or assessor-generated synthetic repository packet with verify-files-percent=100 output, expected content/metadata and restore results. Obtain separate retention/maintenance and overwrite/delete before/after records; compare TAR and ZIP independently without installing Kopia here.

[Actual assessment](../../../content/directory/kopia.md) and [review note](../../doc-reviews/kopia.md).

<a id="anki"></a>

### Anki

- [x] Resolved: The full-sync conflict dialog offers upload, download and cancellation with cancellation as that dialog's default. Dedicated full-upload/full-download confirmation paths also exist; the full-download worker calls create_backup_now before closing for replacement. This proves code paths, not a successful or media-complete backup. [Pinned source](https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/qt/aqt/sync.py).
- [x] Resolved: The undo manager stores a bounded in-memory queue, truncates old steps and clears undo/redo when a step begins without an undoable operation. Undo therefore is not a durable or universal recovery archive. [Pinned source](https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/rslib/src/undo/mod.rs).

**E3: Not Verified.** Reinspection reproduces integrity ok and the one-card/one-note join and sound-name mapping in the retained legacy APKG. Its mapped media member is only four bytes, not proof of usable audio. Modern package decoding, deck/options and scheduling semantics, complete media and a meaningful collection restore are not covered by this historical fixture. [Source context](https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/pylib/tests/support/media.apkg).

**E5: Not Verified.** Pinned desktop source provides full-sync direction/cancel choices, confirmation paths and a backup call before full download. The undo manager keeps bounded in-memory operations and can clear them. These answer control-path questions but do not establish complete media-inclusive recovery, normal sync conflict handling or restoration after collection-wide destructive actions in the declared learning workflow. [Source context](https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/qt/aqt/sync.py).

**E2 correction:** The prior E2 Pass rested on a generic documentation lead. The retained legacy fixture establishes readable records, not a usable alternative study workflow preserving the stated scheduling/deck/media meaning. E2 is withdrawn to Not Verified pending an independent conversion and comparison.

**Remaining:** A modern synthetic collection package with expected notes/cards, deck/options, scheduling and genuine media, independent decoding/comparison, and full-sync/deletion/recovery output remain missing. Legacy readability, full-sync confirmation/backup calls and bounded undo are already resolved; their coverage limits are explicit.

**Next without installing locally:** Obtain a current-version APKG/COLPKG test export and expected semantic manifest from upstream fixtures or an external assessor. Independently decode and compare it here, keeping notes, cards, options and scheduling together. A recorded restore/sync exercise elsewhere can supply behavior evidence without a local Anki installation.

[Actual assessment](../../../content/directory/anki.md) and [review note](../../doc-reviews/anki.md).

<a id="joplin"></a>

### Joplin

- [x] Resolved: Desktop empty-trash displays a permanent-deletion confirmation and calls the trash deletion service only when accepted. The service invokes note/folder deletion; this is not evidence that history or synchronized copies can recover a permanent deletion. [Pinned source](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/app-desktop/commands/emptyTrash.ts).
- [x] Resolved: Trash restoration clears deleted_time and restores the parent when available. Missing/deleted parents use either an explicitly requested restore folder or an empty parent ID, unless a target folder is supplied; folder restoration recurses into children. [Pinned source](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/trash/restoreItems.ts).
- [x] Resolved: Automatic trash deletion exits when its enable setting is false, reads an age setting, logs selected items and excludes share-read-only items. It auto-deletes folders only when empty. Inspected setup schedules periodic processing; default setting values and cross-device consequences were not established here. [Pinned source](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/trash/permanentlyDeleteOldItems.ts).

The [trash deletion service](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/trash/emptyTrash.ts) is the confirmation callback's deletion target; it does not establish retention in history or remote copies.

**E3: Not Verified.** JEX/raw implementation and inspected import assertions explain serialized items, resource copying, new IDs and rewritten links, but no populated 200-note profile was independently reconstructed. Complete notebook/tag/link/resource relationships and the declared encrypted/offline-conflict recovery scenario remain unverified; package structure alone is not meaningful restoration. [Source context](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/interop/InteropService_Exporter_Jex.ts).

**E5: Not Verified.** Pinned source adds concrete trash controls: desktop empty-trash asks for confirmation before calling deletion; restore clears deletion state with explicit missing-parent handling; automatic deletion is setting-gated, uses a configured age and logs selected items. These are positive controls, not a complete account of sync conflicts, encryption changes, transmission or recovery after permanent deletion. [Source context](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/app-desktop/commands/emptyTrash.ts).

**E2 correction:** Native import ID remapping and upstream assertions do not establish the declared collection's usable transition into an independent notes workflow. The earlier E2 Pass is withdrawn to Not Verified until essential hierarchy, links, tags, timestamps and attachments are compared in an actual alternative representation.

**Remaining:** A populated JEX/raw export with expected notebook/tag/link/resource relationships, independent reconstruction and encrypted/offline-conflict recovery records remain missing. For E5, record sync conflicts, encryption transitions and recovery boundaries after permanent deletion. Trash confirmation, missing-parent restore handling and setting-gated automatic deletion are now answered in source.

**Next without installing locally:** Acquire a synthetic JEX/raw export plus expected relationship and resource hashes; reconstruct it with archive/text/SQLite tools already available. Add externally recorded two-profile conflict and encryption/recovery results for the pinned version. No real notes or private recovery credentials are needed.

[Actual assessment](../../../content/directory/joplin.md) and [review note](../../doc-reviews/joplin.md).

<a id="zotero"></a>

### Zotero

- [x] Resolved: The pinned trash path stages undo data before setting deletion state. Selected-item restoration runs transactionally, clears deletion state and includes applicable child notes/attachments or subcollections. This is source evidence of intended recovery paths, not a populated-library recovery run. [Pinned source](https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/zoteroPane.js).
- [x] Resolved: Manual empty-trash asks for confirmation including an irreversible-action message, erases deleted objects and clears undo history. Separately, the item service can purge aged trash from an idle timer using a preference; the manual dialog must not be generalized to all purges or to an observed default retention value. [Pinned source](https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/zoteroPane.js).

The [item service](https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/xpcom/data/items.js) provides the complementary trash undo staging and preference-driven idle purge paths; the pane provides manual confirmation/restore. Read both, rather than treating the manual dialog as universal authorization or a permanent undo guarantee.

**E3: Not Verified.** The retained schema again loads successfully, but selected item, collection, attachment, annotation and relation tables are empty. Preparing queries against DDL cannot demonstrate recovered research records, attachment bytes, annotation meaning or document-citation mappings. A populated library/storage backup and its expected relations remain necessary. [Source context](https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/resource/schema/userdata.sql).

**E5: Not Verified.** Pinned source stages trash/restore undo information and implements restoring selected records and children. Manual empty-trash confirms the irreversible action and then clears undo history. A separate timer can empty aged trash according to a preference, so manual confirmation is not universal. Merge, synchronization and backup-replacement control/recourse remain insufficiently covered. [Source context](https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/zoteroPane.js).

**E2 correction:** The prior E2 Pass rested on a generic documentation lead. An empty schema and ordinary citation-export availability do not establish preservation of essential collections, relations, annotations and document-citation mappings in an alternative workflow. E2 is withdrawn to Not Verified pending a populated comparison.

**Remaining:** A populated synthetic library plus stored/linked attachments and a citation-bearing document, expected collection/tag/relation/annotation mappings and an independent recovery comparison remain missing. E5 still needs merge, synchronization and backup-replacement evidence, including automatic-trash preference/retention behavior; source trash/restore/manual-purge boundaries are answered.

**Next without installing locally:** Use a sanitized synthetic zotero.sqlite, storage directory, any linked-file dependencies and a citation-bearing sample document with an expected mapping manifest. Inspect them with SQLite/archive tools and obtain version-matched merge/sync/backup-restoration observations from upstream or another assessor without installing Zotero locally.

[Actual assessment](../../../content/directory/zotero.md) and [review note](../../doc-reviews/zotero.md).

## Validation result

The retained-input inspector succeeds offline; all nine new Git blob IDs, fifteen retained source hashes and two fixture hashes match. The read-only rating audit reports 12 targeted reconciliations, 56 pending and no disagreement between the recorded E3/E5 decisions and actual assessment fields.

Final verification: `node --test` passes all 52 tests with no failures or skips; `hugo` builds 90 pages; `git -c core.safecrlf=false diff --check` is clean. The built-page tests check non-blank criterion cells and agreement with the actual assessment data. An isolated-fixture test also confirms that the rating audit rejects altered decisions and unsupported positive pairings. No change has been committed, pushed or published.

# Rating reconciliation, batch 3

Reviewed 24 October 2026. Each application below was evaluated individually against its existing essential-record and version scope. No target application was installed, built or run.

## Outcome

All 6 retain **Insufficient evidence**. E3/E5 remain **Not Verified** for the specific missing coverage below, not automatically Pass from documentation and not Fail from missing evidence. Positive dependent principles lacking their minimum are corrected. Existing E1/E4/Locality findings are not re-certified by this targeted pass.

[Plan](plan.json), [individual decisions and change ledger](decisions.json), [directory-wide review sequence](../remaining-plan.json), [current application index](../../application-index.md).

11 additional bounded source questions are resolved in this batch. Earlier resolved questions remain resolved and are not counted again. Source locators are provenance aids, not executed-behavior assertions.

The [retained inspection](inspection-results.json) rechecks 13 added source files, 21 earlier inputs and six fixture readings. The earlier preparation stage is preserved in [preparation-note.md](preparation-note.md); it is superseded by these decisions, not counted as a separate completed review.

<a id="calibre"></a>

## calibre

Version/scope: Source commit e2a169f96a30b9be215e3abd78cb0599e7a4479a; populated metadata SQLite relationships and preference-restore conditions.

**E3: Not Verified.** The populated metadata fixture independently exposes book/author/tag/custom-column relationships, and the restore source conditionally reuses a preference backup. Its three database records have no restored book files, covers or comparison for the declared 150-book/conversion-state profile. Neither OPF reconstruction nor the readable database alone establishes complete E3. [Source context](https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/restore.py).

**E5: Not Verified.** Library and device deletion use explicit helper/warning paths, recently deleted restoration exists, and backend expiry can close that recovery window, including an on-close setting. The remaining conversion/metadata overwrites, effective confirmation preferences and restoration after expiry are not sufficiently covered for the existing library scope. [Source context](https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/gui2/actions/delete.py).

**E2 correction:** The former E2 Pass does not demonstrate usable migration of custom columns, reading metadata, covers and conversion-state meaning into another library workflow. The available book/database observations leave those essential relationships unestablished. [Source context](https://manual.calibre-ebook.com/gui.html).

- [x] Resolved: The library-delete action calls a confirmation helper, uses a non-permanent removal path for bulk library deletion and exposes recently deleted restoration. Device deletion has a separate permanent-removal warning. Helper invocation is established, not an unconditional prompt under every saved preference or a successful restore. [Pinned source](https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/gui2/actions/delete.py).
- [x] Resolved: Trash expiry is time/preference-dependent, and closing the database explicitly expires trash when the configured expiry is zero. Retention is therefore not a permanent backup or a guarantee that every deleted book remains recoverable. [Pinned source](https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/backend.py).

**Remaining:** A complete library/OPF/prefs restore with book files, covers, annotations and conversion settings; cross-version reopening, DRM limits and destructive deletion. E5 also needs effective deletion/overwrite settings, conversion and bulk metadata mutation boundaries, and recovery evidence before/after trash expiry.

**Next without a local installation:** Obtain a synthetic complete library with files/OPFs/preferences and expected metadata/resource hashes; compare it independently and seek version-matched deletion/conversion/expiry observations or comprehensive control-source evidence.

[Actual assessment](../../../content/directory/calibre.md) | [review note](../../doc-reviews/calibre.md).

<a id="audacity"></a>

## Audacity

Version/scope: Source commit f515da46486301d48db89f195729ef0c87980668; published AUP4 SQLite read boundary and encoded project representation.

**E3: Not Verified.** The retained AUP4 bytes match upstream, but generic sample-block reading and integrity checking failed in the recorded SQLite reader. Encoded project XML and audio-block semantics still require reconstruction, and the AUP4 sample cannot certify AUP3. This sample-specific unsuccessful check is not an application-wide E3 Fail or a successful audio recovery. [Source context](https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-file-io/ProjectSerializer.cpp).

**E5: Not Verified.** The history code exposes undo/redo state, initialization resets and autosave requests; new edits can discard redo. These answer editing-retention questions but do not establish the complete project's save/overwrite, destructive effects, current UI settings and recovery controls across the stated AUP3/AUP4/version scope. [Source context](https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-history/UndoManager.cpp).

- [x] Resolved: The inspected project-history initialization clears existing undo states. New non-consolidated edits abandon redo states, while history pushes normally request autosave unless flagged otherwise. This identifies control and retention boundaries, not persistent recoverability of every AUP3/AUP4 project. [Pinned source](https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-history/ProjectHistory.cpp).

**Remaining:** A known-good representative AUP3/AUP4 project decoded and reconstructed independently; sample-audio recovery, track/label migration, cross-version saves, plugin fidelity and crash recovery. E5 also needs version-matched save/overwrite/destructive-edit controls and their recoverable state boundaries; initialization/redo source behavior is now answered.

**Next without a local installation:** Use a known-good representative AUP3 and AUP4 packet with expected track, label and sample metadata plus independent audio extraction; pair it with primary-source or recorded save/undo/overwrite evidence for each exact version.

[Actual assessment](../../../content/directory/audacity.md) | [review note](../../doc-reviews/audacity.md).

<a id="ardour"></a>

## Ardour

Version/scope: Source commit b896344c8d16f89e04a235562ab31594605c6715; session XML source relationships and missing-processor state retention.

**E3: Not Verified.** The historical session XML resolves an external MIDI source, while the missing-plugin implementation retains XML state without reproducing processing. Complete media, routing/automation meaning, plugin dependencies and compatible session reconstruction are not demonstrated by that readable reference graph. [Source context](https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/unknown_processor.cc).

**E5: Not Verified.** Conditional history saving and attempted backup restoration are established in source. Unused-source cleanup stages files, clears history and saves state, and a distinct flush clears the staged files. Authorization in the calling UI, configuration and meaningful recourse across cleanup/plugin/save changes remain insufficiently covered. [Source context](https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/session_state.cc).

- [x] Resolved: Session undo history is saved only when configured, with a configured depth and available history. The source first renames an existing history file to backup and attempts restoration of that backup after a write failure. This is conditional error-handling code, not observed crash recovery. [Pinned source](https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/session_state.cc).
- [x] Resolved: Unused-source cleanup moves selected media into dead-source directories, then clears session history and saves state. A separate trash-cleanup routine clears those directories. Staging unused media is not the same as a reversible edit or indefinite backup. [Pinned source](https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/session_state.cc).

**Remaining:** Complete archived-session restore including media and plugins, missing-plugin playback and later reactivation, stem migration losses, snapshots/crash recovery, version compatibility and update-check control. E5 also needs cleanup/flush UI authorization, effective history settings and overwrite/plugin-change recourse; staged dead-source storage is not an indefinite undo guarantee.

**Next without a local installation:** Collect a synthetic archived session including all media and plugin-dependency/state information, expected routing/automation and stems; inspect the archive independently and obtain version-matched cleanup/history recovery evidence.

[Actual assessment](../../../content/directory/ardour.md) | [review note](../../doc-reviews/ardour.md).

<a id="musescore-studio"></a>

## MuseScore Studio

Version/scope: Source commit 4676f83f368f1afc9cad6815eb5401a2ec8aca2b; historical MSCZ archive readability and save/backup conditions.

**E3: Not Verified.** The retained MSCZ is a MuseScore 2.0.2 score with independently readable notes/lyrics and structure. It does not establish current-version musical/engraving/playback equivalence, complete dependency recovery or a MusicXML/native round trip. Historical ZIP/XML readability remains a bounded positive observation. [Source context](https://handbook.musescore.org/en/file-management/opening-and-saving-scores).

**E5: Not Verified.** The save path's backup conditions, autosave guards/error reporting and notation transaction undo/rollback entry points are concrete source controls. Effective save/overwrite settings, transient-copy retention and complete correction across the existing score/export workflow remain unestablished; source entry points are not executed recovery outcomes. [Source context](https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/project/internal/projectautosaver.cpp).

**E2 correction:** The former E2 Pass does not establish usable migration of the declared score's musical/structural meaning. Reading an older MSCZ and knowing export exists does not compare native and independent interchange representations. [Source context](https://handbook.musescore.org/en/file-management/file-export).

- [x] Resolved: The autosave timer follows the enable/interval configuration. Its save attempt checks for a current project, needAutoSave and canSave, and logs failure; old temporary autosave material can be removed as the active project state changes. This establishes conditions, not effective defaults or successful crash restoration. [Pinned source](https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/project/internal/projectautosaver.cpp).
- [x] Resolved: Notation undo/redo delegates to the transaction manager; explicit rollback and commit end transactions with different flags and notify state changes. These are inspectable editing-control entry points, not proof that every plugin, save or exported representation can be rolled back. [Pinned source](https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/notation/internal/notationundostack.cpp).

**Remaining:** Current-version MSCZ and MusicXML/MEI/MIDI round trips with notation/layout comparison; old/new release compatibility, actual interrupted saves and recovery, offline playback and export dependencies. E5 also needs effective autosave/backup settings, overwrite and export boundaries and evidence of usable correction after failed/interrupted save.

**Next without a local installation:** Acquire a current native score plus MusicXML output with expected musical structure/dependencies and comparison results; inspect archives/XML here and reuse externally recorded save/undo/recovery observations for the same version.

[Actual assessment](../../../content/directory/musescore-studio.md) | [review note](../../doc-reviews/musescore-studio.md).

<a id="zim-wiki"></a>

## Zim Desktop Wiki

Version/scope: Source commit d82c631fa20f03764aa336a9357add0cd32714fc; published notebook/format structure, rename links and deletion/trash boundaries.

**E3: Not Verified.** The 37-page XML object is a test container, not an actual native notebook. Format fixtures and rename-link routines explain parts of interpretation, but no complete notebook with attachments, dates/tags and relocated internal references has been independently reconstructed or its index rebuilt. [Source context](https://zim-wiki.org/manual/).

**E5: Not Verified.** Source now establishes separate trash/permanent-delete warnings, affected-file inspection, a link-update choice, unsupported-trash handling and buffer-level undo. Effective platform trash recovery, external/shared-folder changes and export/rename overwrite recourse are not sufficiently covered for the existing notebook scope. [Source context](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/gui/uiactions.py).

**E2 correction:** The former E2 Pass does not establish usable migration of the native notebook's hierarchy, attachments, links and task semantics. The published expected Markdown already differs in task markers, and no full independent-workflow comparison is recorded. [Source context](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/notebook/notebook.py).

- [x] Resolved: The GUI supplies separate trash and permanent-delete dialogs, includes an affected-file listing and a link-update choice, and returns a distinct unsupported-trash result. Permanent deletion warns that it cannot be undone. These source paths do not demonstrate system-trash recovery on a particular platform. [Pinned source](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/gui/uiactions.py).
- [x] Resolved: The page-view undo stack replays recorded text-buffer actions and can stop recording handlers during blocked changes. This is editor-level undo, not a filesystem snapshot or a guarantee of recovery from page-folder deletion and external synchronization. [Pinned source](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/gui/pageview/undostack.py).

**Remaining:** A complete native notebook move/export with attachments and link resolution; index rebuild after removing .zim, actual trash recovery, shared-folder conflicts, cross-version Markdown pages and network behavior. E5 also needs effective trash/fallback and rename/export overwrite behavior, external-edit handling and restoration boundaries; text-buffer undo does not restore deleted folders.

**Next without a local installation:** Collect a native synthetic notebook with notebook.zim, page files and attachment hashes, then reconstruct its links/metadata independently; obtain version/platform-matched trash/rename/undo observations or comprehensive source coverage.

[Actual assessment](../../../content/directory/zim-wiki.md) | [review note](../../doc-reviews/zim-wiki.md).

<a id="taskwarrior"></a>

## Taskwarrior

Version/scope: Source commit c280c347c1adc47e9bb1ad42c92958e2d7f92e9c; JSON fixture interpretation, export scope and duplicate-UUID import updates.

**E3: Not Verified.** The independently parsed import literals expose five task UUIDs and basic dates/status, while the source exports selected attributes and updates existing UUIDs on import. Full recurrence, annotations, UDAs, dependencies, history and TaskChampion database reconstruction remain unverified; a filtered task listing is not complete profile recovery. [Source context](https://taskwarrior.org/docs/commands/export/).

**E5: Not Verified.** Purge is limited to deleted tasks and uses permission/relation handling; undo previews operations, is confirmation-configurable and can refuse reversal after intervening operations. These controls do not establish effective settings, import/sync/hook authority and complete correction across the existing recurring multi-replica task workflow. [Source context](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdUndo.cpp).

**E2 correction:** The former E2 Pass does not establish a usable alternative task workflow preserving recurrence, dependency graphs, annotations, UDAs and dates. Selected-task JSON serialization and import-UUID source behavior do not complete that migration comparison. [Source context](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdExport.cpp).

- [x] Resolved: The purge command selects already-deleted tasks and calls the permission path before purging them. Recurrence templates with live children are rejected; dependent-task links can be removed during relation handling. This is not an append-only operation or proof that every setting forces an interactive prompt. [Pinned source](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdPurge.cpp).
- [x] Resolved: Undo renders the operations and old/new property values to be reverted, requests confirmation unless its setting disables that prompt, and reports if other operations prevent committing the reversal. This does not establish indefinite history, post-sync undo or recovery of every purged payload. [Pinned source](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdUndo.cpp).

**Remaining:** TaskChampion SQLite interpretation, full recurrence/annotation/UDA/dependency round trips, exact date/history preservation, actual duplicate-UUID updates, 2.x migration and multi-replica sync recovery. E5 also needs effective confirmation/recurrence settings, import/sync/hook control and post-sync/purge correction boundaries; the inspected undo preview is not indefinite recoverability.

**Next without a local installation:** Obtain a populated synthetic TaskChampion backup and full JSON export with expected recurrence/UDA/annotation/dependency/date records; independently compare them and reuse version-matched import/delete/purge/undo/sync observations.

[Actual assessment](../../../content/directory/taskwarrior.md) | [review note](../../doc-reviews/taskwarrior.md).

## Validation boundary

The shared rating audit checks recorded fields, decision evidence and review notes. Historical schema-repair and evidence baselines remain available. Source/fixture hashes, navigation and the complete set of updated pages are checked by the final repository validation; no per-product clean restore or upstream test run is implied.

# Third pass, batch 4

Reviewed 23 October 2026, Asia/Baghdad. Fourteen bounded questions are resolved across calibre, Audacity, Ardour, MuseScore Studio, Zim Desktop Wiki and Taskwarrior. All six application assessments include these findings and resolved checkboxes.

## Reproduce the inspection

```powershell
python evidence/third-pass/batch-4/inspect_artifacts.py
```

The standard-library inspector retains 21 pinned public inputs, checks their Git blob identities and SHA-256 hashes, reads SQLite/XML/ZIP/JSON structures, and records the exact code anchors reviewed. [artifact-results.json](artifact-results.json) contains queries, rows, element counts, read errors, hashes, environment and source locations; [inspection-plan.json](inspection-plan.json) fixes the input commits and scope. Existing retained files can be inspected again offline.

No target software was installed or executed. No upstream application test suite or CI run is claimed. Python parses embedded test literals without importing or running their test files. SQLite databases are opened read-only; ZIP members are inspected in memory rather than extracted. Upstream copyright and licensing apply to retained files. Source commits are not binary release tests, and historical fixtures keep their recorded version scope. Resolving a limitation or a failed generic-reader attempt does not make the broader recovery requirement pass.

## Important scope correction

The Audacity fixture is AUP4, not AUP3. Generic SQLite reads its project BLOBs but reports malformed data for sample-block reads and integrity checking. Git object verification confirms the inspected bytes match upstream. This is recorded as a reproducible sample-specific result, not evidence that all Audacity projects are corrupt. Calibre's source also distinguishes preference-backed reconstruction from OPF-only recovery; unconditional loss claims are superseded by that conditional finding.

## calibre

- [x] Resolved: The published metadata.db fixture opened read-only with standard SQLite and returned integrity_check=ok. It contains three books and twelve custom-column definitions. Executed joins recovered four book/author links, four book/tag links and two numeric custom-column values; JSON preferences including saved_searches and user_categories are readable. No associated book files were restored. [Inspected input](https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/tests/metadata.db).
- [x] Resolved: The inspected restore first attempts metadata_db_prefs_backup.json and passes restore_all_prefs=True to a fresh database. The backend copies supplied preferences and recreates custom columns; missing or failed preference recovery falls back to OPF-derived reconstruction. Preference loss is therefore conditional, not inevitable. This does not establish recovery of conversion settings, recipes or every library component. [Inspected input](https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/restore.py).

Related inputs: [Preference copying](https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/backend.py).

Remaining: A complete library/OPF/prefs restore with book files, covers, annotations and conversion settings; cross-version reopening, DRM limits and destructive deletion.

## Audacity

- [x] Resolved: The pinned test.aup4 fixture exposes project, autosave, sampleblocks and project_history schemas to standard SQLite. Its project row contains 2,067-byte dictionary and 2,177-byte document BLOBs, but reading sampleblocks and running integrity_check report database disk image is malformed with SQLite 3.45.3. The bytes match the upstream Git blob. This resolves this sample's read boundary, not independent audio recovery or a general Audacity defect. [Inspected input](https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/src/project/tests/data/test.aup4).
- [x] Resolved: The shared project-file implementation stores encoded XML as dictionary/document BLOBs, not ordinary XML text. The serializer publishes field opcodes and character-width handling; sample blocks carry numeric audio data while valid block lengths come from the encoded project. SQLite table access alone is therefore insufficient to reconstruct an editable session. AUP3 recovery and AUP3/AUP4 compatibility were not demonstrated. [Inspected input](https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-file-io/ProjectSerializer.cpp).

Related inputs: [Project and sample-block schema](https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-file-io/ProjectFileIO.cpp); [Sample-block implementation](https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-file-io/SqliteSampleBlock.cpp).

Remaining: A known-good representative AUP3/AUP4 project decoded and reconstructed independently; sample-audio recovery, track/label migration, cross-version saves, plugin fidelity and crash recovery.

## Ardour

- [x] Resolved: Standard XML parsing of the historical 1region session reads session version 3001, sample-rate 48000, two routes and one external MIDI source. Both the region source-0 and master-source-0 references resolve to source ID 118, named MIDI 1-1.mid. This establishes readable session relationships; the referenced media was not opened and no sound was rendered. [Inspected input](https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/test/profiling/sessions/1region/1region.ardour).
- [x] Resolved: UnknownProcessor copies the missing processor's XML state and returns a copy when saving, retaining stored state rather than implementing the missing plugin. Its run method does not recreate plugin processing and silences excess outputs when saved I/O information is available. State preservation therefore does not imply audio equivalence or successful later plugin reactivation. [Inspected input](https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/unknown_processor.cc).

Remaining: Complete archived-session restore including media and plugins, missing-plugin playback and later reactivation, stem migration losses, snapshots/crash recovery, version compatibility and update-check control.

## MuseScore Studio

- [x] Resolved: The published Amazing_grace.mscz opened as ZIP with three members: container XML, a PNG thumbnail and score XML. The score identifies MuseScore 2.0.2 and format 2.06; standard XML parsing found four Part elements, 68 Measure elements, 175 Note elements and 118 Lyrics elements, including readable syllables. These are element counts, not a count of unique musical bars. No layout or playback was reproduced. [Inspected input](https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/demos/Amazing_grace.mscz).
- [x] Resolved: The inspected save path writes through a _saving path and conditionally creates a backup before replacing the target. Backup creation requires both the caller's request and the user's setting; the backup helper only handles an existing MSCZ target. Not every save can therefore be assumed to retain an old copy. This identifies implementation conditions, not crash durability or the settings of a user's installation. [Inspected input](https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/project/internal/notationproject.cpp).

Remaining: Current-version MSCZ and MusicXML/MEI/MIDI round trips with notation/layout comparison; old/new release compatibility, actual interrupted saves and recovery, offline playback and export dependencies.

<a id="zim-wiki"></a>

## Zim Desktop Wiki

- [x] Resolved: Standard XML parsing read 37 named pages and their colon-separated hierarchy and wiki links from the published notebook test container; this XML container is not the native notebook storage format. Separate wiki, parse-tree and expected Markdown fixtures expose formatting and link records. The expected Markdown uses Unicode checkbox glyphs rather than GitHub task-list markers, so plain readability does not imply identical task semantics in another editor. [Inspected input](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/tests/data/notebook-wiki.xml).
- [x] Resolved: move_page defaults update_links to True and calls separate routines to rewrite links from moved pages and links targeting them. The argument can disable this work. This resolves the implemented rename/link-update design, not the outcome for every attachment, ambiguous link, synced copy or interrupted rename. [Inspected input](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/notebook/notebook.py).
- [x] Resolved: The permanent delete implementation removes the mapped page folder's children and page file. The separate trash implementation uses the system trash helper and raises TrashNotSupportedError when notebook trash is disabled. These paths are not equivalent; neither a permanent delete nor unsupported trash can be assumed recoverable. No actual deletion or trash restore was performed. [Inspected input](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/notebook/notebook.py).

Related inputs: [Published wiki markup](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/tests/data/formats/wiki.txt); [Expected Markdown](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/tests/data/formats/export.markdown); [Fixture test wiring](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/tests/formats.py).

Remaining: A complete native notebook move/export with attachments and link resolution; index rebuild after removing .zim, actual trash recovery, shared-folder conflicts, cross-version Markdown pages and network behavior.

## Taskwarrior

- [x] Resolved: Python syntax-tree parsing and json.loads independently read three upstream import-test literals containing five distinct task UUIDs, descriptions, entry dates, projects, and pending/completed status. The completed record also has an end date. These are embedded input fixtures, not a newly executed Taskwarrior export/import or proof of recurrence, annotation and dependency fidelity. [Inspected input](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/test/import.test.py).
- [x] Resolved: Export applies task/report filters before serializing selected tasks. composeJSON writes task attributes plus structured annotations, tags and dependency UUIDs, and can add volatile ID/urgency decoration. This is a task-record interchange path, not a complete backup of configuration, hooks, undo or synchronization state. [Inspected input](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdExport.cpp).
- [x] Resolved: Import looks up each task by UUID and modifies an existing task rather than always appending a new record; duplicate UUIDs in an input produce a merged-results warning. For existing tasks it preserves the old modified value during comparison and ignores generated entry/end defaults unless supplied. Import can change existing work, so it is not inherently an append-only or byte-for-byte restore operation. [Inspected input](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdImport.cpp).

Related inputs: [JSON serializer](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/Task.cpp).

Remaining: TaskChampion SQLite interpretation, full recurrence/annotation/UDA/dependency round trips, exact date/history preservation, actual duplicate-UUID updates, 2.x migration and multi-replica sync recovery.

## Assessment integration

The actual content/directory application pages carry the dated findings, evidence records, limitations and open work. The gap register and original notes link to this batch. Existing unsupported eligibility value partial is normalized to not_verified where present, matching the engine's existing interpretation; no overall Pass or Fail is inferred from these narrower results.


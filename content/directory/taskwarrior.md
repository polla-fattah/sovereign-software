+++
title = "Taskwarrior"
category = "Tasks & Finance"
summary = "Command-line task manager with local task storage, JSON interchange and optional task synchronization."
substrate = "Local task database with open JSON export"
sync_model = "Local database with optional TaskChampion synchronization"
extract_cmd = "task export > commitments.json"
pilot_stage = 3
limitations = ["Filtered JSON export is not a full profile or synchronization backup.","Import can modify tasks sharing a UUID; this batch did not execute those modifications.","The inspected input literals do not establish complete recurrence, annotation or dependency recovery."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit c280c347c1adc47e9bb1ad42c92958e2d7f92e9c; JSON fixture interpretation, export scope and duplicate-UUID import updates"
assessment_notes = "Individually reconciled in rating batch 3 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. 2 further bounded source questions resolved. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

[[evidence]]
target = "E1"
text = "Python syntax-tree parsing and json.loads independently read three upstream import-test literals containing five distinct task UUIDs, descriptions, entry dates, projects, and pending/completed status. The completed record also has an end date. These are embedded input fixtures, not a newly executed Taskwarrior export/import or proof of recurrence, annotation and dependency fidelity."
url = "https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/test/import.test.py"
confidence = "high"

[[evidence]]
target = "E2"
text = "Export applies task/report filters before serializing selected tasks. composeJSON writes task attributes plus structured annotations, tags and dependency UUIDs, and can add volatile ID/urgency decoration. This is a task-record interchange path, not a complete backup of configuration, hooks, undo or synchronization state."
url = "https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdExport.cpp"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official documentation for this entry provides a relevant independent interpretation and recovery lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Import looks up each task by UUID and modifies an existing task rather than always appending a new record; duplicate UUIDs in an input produce a merged-results warning. For existing tasks it preserves the old modified value during comparison and ignores generated entry/end defaults unless supplied. Import can change existing work, so it is not inherently an append-only or byte-for-byte restore operation."
url = "https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdImport.cpp"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Taskwarrior does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdExport.cpp"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Taskwarrior's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdUndo.cpp"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The independently parsed import literals expose five task UUIDs and basic dates/status, while the source exports selected attributes and updates existing UUIDs on import. Full recurrence, annotations, UDAs, dependencies, history and TaskChampion database reconstruction remain unverified; a filtered task listing is not complete profile recovery."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Purge is limited to deleted tasks and uses permission/relation handling; undo previews operations, is confirmation-configurable and can refuse reversal after intervening operations. These controls do not establish effective settings, import/sync/hook authority and complete correction across the existing recurring multi-replica task workflow."
url = "https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdUndo.cpp"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish a usable alternative task workflow preserving recurrence, dependency graphs, annotations, UDAs and dates. Selected-task JSON serialization and import-UUID source behavior do not complete that migration comparison."
url = "https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdExport.cpp"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The purge command selects already-deleted tasks and calls the permission path before purging them. Recurrence templates with live children are rejected; dependent-task links can be removed during relation handling. This is not an append-only operation or proof that every setting forces an interactive prompt."
url = "https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdPurge.cpp"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Undo renders the operations and old/new property values to be reverted, requests confirmation unless its setting disables that prompt, and reports if other operations prevent committing the reversal. This does not establish indefinite history, post-sync undo or recovery of every purged payload."
url = "https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdUndo.cpp"
confidence = "medium"

+++

**Verification scenario:** Export and import recurring tasks, annotations, user-defined attributes, dependencies, and completion history; restore into a clean profile.

**What may invalidate an overconfident claim:** A JSON export alone may not preserve every configuration, hook, or synchronisation state.

**Documentation starting point:** <https://taskwarrior.org/docs/>

**Assessment update: 23 October 2026**

- [x] Resolved: Python syntax-tree parsing and json.loads independently read three upstream import-test literals containing five distinct task UUIDs, descriptions, entry dates, projects, and pending/completed status. The completed record also has an end date. These are embedded input fixtures, not a newly executed Taskwarrior export/import or proof of recurrence, annotation and dependency fidelity. [Source](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/test/import.test.py).
- [x] Resolved: Export applies task/report filters before serializing selected tasks. composeJSON writes task attributes plus structured annotations, tags and dependency UUIDs, and can add volatile ID/urgency decoration. This is a task-record interchange path, not a complete backup of configuration, hooks, undo or synchronization state. [Source](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdExport.cpp).
- [x] Resolved: Import looks up each task by UUID and modifies an existing task rather than always appending a new record; duplicate UUIDs in an input produce a merged-results warning. For existing tasks it preserves the old modified value during comparison and ignores generated entry/end defaults unless supplied. Import can change existing work, so it is not inherently an append-only or byte-for-byte restore operation. [Source](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdImport.cpp).
- [ ] Open: TaskChampion SQLite interpretation, full recurrence/annotation/UDA/dependency round trips, exact date/history preservation, actual duplicate-UUID updates, 2.x migration and multi-replica sync recovery. E5 also needs effective confirmation/recurrence settings, import/sync/hook control and post-sync/purge correction boundaries; the inspected undo preview is not indefinite recoverability.

**Assessment:** The checked findings above now inform this application's evidence and limitations. They resolve the stated questions, not complete recovery, migration or eligibility. Reproduction details and retained inputs are recorded in evidence/third-pass/batch-4/. The overall determination remains **Insufficient evidence** for the remaining requirements.

**Human-readable criteria:** Can a user export complete records, preserve invariants and metadata, restore them independently, and continue the essential workflow without provider permission?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

- [x] Resolved: The purge command selects already-deleted tasks and calls the permission path before purging them. Recurrence templates with live children are rejected; dependent-task links can be removed during relation handling. This is not an append-only operation or proof that every setting forces an interactive prompt. [Pinned source](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdPurge.cpp).
- [x] Resolved: Undo renders the operations and old/new property values to be reverted, requests confirmation unless its setting disables that prompt, and reports if other operations prevent committing the reversal. This does not establish indefinite history, post-sync undo or recovery of every purged payload. [Pinned source](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdUndo.cpp).

**Remaining:** TaskChampion SQLite interpretation, full recurrence/annotation/UDA/dependency round trips, exact date/history preservation, actual duplicate-UUID updates, 2.x migration and multi-replica sync recovery. E5 also needs effective confirmation/recurrence settings, import/sync/hook control and post-sync/purge correction boundaries; the inspected undo preview is not indefinite recoverability.

**Next without installing locally:** Obtain a populated synthetic TaskChampion backup and full JSON export with expected recurrence/UDA/annotation/dependency/date records; independently compare them and reuse version-matched import/delete/purge/undo/sync observations.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-3/`. Overall: **Insufficient evidence**.

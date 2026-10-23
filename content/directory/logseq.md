+++
title = "Logseq"
category = "Knowledge & Office"
summary = "Open-source outliner with distinct file-based and database graph models; preservation and exit depend on the graph type and export selected."
substrate = "Version-dependent Markdown/Org file graphs or SQLite-backed database graphs"
sync_model = "Graph-model-dependent local storage and synchronization"
pilot_stage = 2
limitations = ["Identity/timestamp/ontology preservation depends on the selected exporter and options.","SQLite backup error cleanup is not proof of complete asset-inclusive recovery."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit 05c3ae73e08498e9e20f1b11c3eac5525e5e588d"
assessment_notes = "Individually reconciled in rating batch 7 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Logseq documents graph backup and export to SQLite, ZIP with assets, EDN, and Markdown."
url = "https://github.com/logseq/docs/blob/master/db-version.md"
confidence = "high"

[[evidence]]
target = "E2"
text = "The DB exporter has explicit options for UUIDs, timestamps, shallow copies and ontology exclusion. Node/property/class timestamps are conditional; content-reference exports retain referenced UUIDs, while partial-map merging warns against use for full-graph export. Thus export modes are not equivalent preservation packages. This is a source-level distinction, not an executed Markdown/EDN/SQLite migration."
url = "https://github.com/logseq/logseq/blob/05c3ae73e08498e9e20f1b11c3eac5525e5e588d/deps/db/src/logseq/db/sqlite/export.cljs"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The Node SQLite backup helper calls the SQLite backup API, removes the destination file when synchronous or asynchronous backup fails, and closes the opened source connection in the file-based wrapper. This identifies error cleanup; it does not establish a complete graph backup including asset files, successful restoration, or safety if a caller supplies an existing destination."
url = "https://github.com/logseq/logseq/blob/05c3ae73e08498e9e20f1b11c3eac5525e5e588d/deps/db/src/logseq/db/sqlite/backup.cljs"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Graphs and backups are stored locally on desktop or in a chosen browser folder."
url = "https://github.com/logseq/docs/blob/master/db-version.md"
confidence = "high"

[[evidence]]
target = "E5"
text = "Knowledge work is user-directed, but database sync, plugins, and conflict resolution were not tested."
url = "https://github.com/logseq/logseq/blob/master/README.md"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Logseq does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/logseq/logseq/blob/05c3ae73e08498e9e20f1b11c3eac5525e5e588d/deps/db/src/logseq/db/sqlite/backup.cljs"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Logseq's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/logseq/logseq/blob/05c3ae73e08498e9e20f1b11c3eac5525e5e588d/deps/db/src/logseq/db/sqlite/backup.cljs"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The graph and backups can remain local and do not require a hosted account."
url = "https://github.com/logseq/docs/blob/master/db-version.md"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/logseq/logseq/blob/master/README.md"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Exporter UUID/timestamp/ontology options and SQLite backup failure cleanup are concretely described in source. No populated graph including assets, properties, references and file-to-DB conversion has been independently reconstructed. A successful database-copy mechanism alone does not establish complete graph semantics or safe existing-destination recovery."
url = "https://github.com/logseq/logseq/blob/05c3ae73e08498e9e20f1b11c3eac5525e5e588d/deps/db/src/logseq/db/sqlite/backup.cljs"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Backup failure cleanup can remove its destination, while the collected evidence does not establish effective caller destination safety, plugin authority, synchronization-conflict control or inspectable correction for DB graph mutations. Export options and source error handling are not whole-workflow oversight."
url = "https://github.com/logseq/logseq/blob/master/README.md"
confidence = "medium"

+++

**Verification scenario:** Specify the file graph versus the database graph, then export and reopen block references, queries, whiteboards, and tasks.

**What may invalidate an overconfident claim:** Do not generalise file-based graph behaviour to every Logseq storage mode.

**Documentation starting point:** <https://docs.logseq.com/>

**Evidence update: 23 October 2026**

- [x] Resolved: The DB exporter has explicit options for UUIDs, timestamps, shallow copies and ontology exclusion. Node/property/class timestamps are conditional; content-reference exports retain referenced UUIDs, while partial-map merging warns against use for full-graph export. Thus export modes are not equivalent preservation packages. This is a source-level distinction, not an executed Markdown/EDN/SQLite migration. [Source](https://github.com/logseq/logseq/blob/05c3ae73e08498e9e20f1b11c3eac5525e5e588d/deps/db/src/logseq/db/sqlite/export.cljs).
- [x] Resolved: The Node SQLite backup helper calls the SQLite backup API, removes the destination file when synchronous or asynchronous backup fails, and closes the opened source connection in the file-based wrapper. This identifies error cleanup; it does not establish a complete graph backup including asset files, successful restoration, or safety if a caller supplies an existing destination. [Source](https://github.com/logseq/logseq/blob/05c3ae73e08498e9e20f1b11c3eac5525e5e588d/deps/db/src/logseq/db/sqlite/backup.cljs).
- [ ] Open: A populated DB independently queried, complete asset-inclusive graph export/restore, file-to-DB conversion, task/property/ref fidelity, automatic-backup retention and cross-version outcomes. E5 needs caller destination safety, plugin and DB-sync authority, change inspection and recovery/retention boundaries.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-6/.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** A populated DB independently queried, complete asset-inclusive graph export/restore, file-to-DB conversion, task/property/ref fidelity, automatic-backup retention and cross-version outcomes. E5 needs caller destination safety, plugin and DB-sync authority, change inspection and recovery/retention boundaries.

**Next without installing locally:** Acquire a synthetic populated graph DB plus assets and complete export-option manifest; inspect it independently and seek same-version caller, backup-retention, plugin and sync conflict evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-7/`. Overall: **Insufficient evidence**.

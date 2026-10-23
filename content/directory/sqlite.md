+++
title = "SQLite"
category = "VCS & Core"
summary = "Embedded SQL engine with user-held database files and logical backup/restore interfaces; preservation depends on the schema, engine features and backup procedure."
substrate = "Single Cross-Platform B-Tree Disk File"
sync_model = "Local Embedded Engine (Zero Network)"
extract_cmd = "sqlite3 data.db .dump > archive.sql"
pilot_stage = 1
limitations = ["Ratings apply to the declared SQLite 3.45.3 API profile, not arbitrary clients or application databases.","Explicit transactions and trace were configured; committed deletion has no automatic undo.","WAL-aware backup is necessary; a live main-file-only copy can omit committed data."]
assessment_status = "complete"
assessment_date = "2026-10-23"
version_assessed = "Python-bundled SQLite 3.45.3; declared embedded relational-engine/API profile"
assessment_notes = "Rating reconciliation batch 1: E3 Pass; E5 Pass. Longevity Meets; Transparency and Control Partially meets. See the declared scope and reasons below; earlier bounded evidence findings remain recorded."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "pass"
retained_control = "pass"
consequential_oversight = "pass"

[principles]
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "In the same controlled WAL-mode scenario, copying only the main database while its connection stayed open produced a copy with no tables from the uncheckpointed transaction. Connection.backup instead produced both child rows and integrity_check=ok. This demonstrates why a live main-file copy is not universally a complete snapshot; concurrent-writer stress, network filesystems and all crash timings remain untested."
url = "https://github.com/sqlite/sqlite/blob/31ebfdf4a1483218a7e17499957eca4caabce915/test/dump.sql"
confidence = "high"

[[evidence]]
target = "E2"
text = "The tested logical restore establishes recovery within SQLite, not a demonstrated exit into another engine or a representative alternative application workflow. The earlier generic documentation placeholder is insufficient for E2, which is now Not Verified."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "A controlled experiment using Python's bundled SQLite 3.45.3 logically dumped and restored a synthetic database with foreign keys, a view, a trigger, BLOBs and mixed stored types. Row values/types matched, the restored view returned both rows, one trigger was present and foreign_key_check was empty. This tested the installed library, not the pinned newest source, another SQLite implementation, every schema feature or corrupt-file recovery. Reproduction code and results are in batch 7."
url = "https://github.com/sqlite/sqlite/blob/31ebfdf4a1483218a7e17499957eca4caabce915/test/dump.sql"
confidence = "high"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "With explicit transactions, foreign_keys ON and SQL trace enabled, DELETE and DROP TABLE are rolled back, a savepoint undoes an inner update, an invalid reference produces a visible IntegrityError, and an explicitly committed update survives reopen. This establishes governable SQL/API mutations in the declared configuration; it does not provide GUI consent, automatic client authorization or recovery after an unbacked committed deletion."
url = "https://www.sqlite.org/lang_transaction.html"
confidence = "high"

[[evidence]]
target = "sovereignty"
text = "Custody and engine-level recovery are demonstrated, but practicable migration is not yet established. A positive Sovereignty finding is withheld while E2 is Not Verified."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The declared fixture's schema, types, relationships, view and functioning trigger survive logical restoration, and the prior live-WAL comparison identifies the required backup boundary. This supports Longevity for this engine-level profile, not every application schema, damaged-file case, extension or future file-format feature."
url = "https://www.sqlite.org/backup.html"
confidence = "high"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "E5 is demonstrated at the explicitly configured SQL/API boundary: statements, errors, rollback and commit are inspectable. Trace logging is opt-in and permission/UI policy belongs to the caller; the engine is not a universal audit or authorization service. These known limits support Partially meets."
url = "https://www.sqlite.org/lang_transaction.html"
confidence = "high"

[[evidence]]
target = "E3"
text = "The prior logical dump/backup experiments are reproduced and extended: a fresh connection restores schema and rows, the view returns expected related records, the restored trigger actually fires, and foreign_key_check is clean. This establishes meaningful recovery of the declared relational fixture through user-held files/SQL and the available open engine, not an independent SQLite implementation or the semantics of arbitrary application databases."
url = "https://www.sqlite.org/backup.html"
confidence = "high"

+++

**Verification scenario:** Use a versioned sample schema; test online backup, dump and restore, an independent parser, and WAL-inclusive recovery.

**What may invalidate an overconfident claim:** The format documentation is strong, but SQLite does not guarantee the semantics of each application's schema.

**Documentation starting point:** <https://sqlite.org/onefile.html>

**Evidence update: 23 October 2026**

- [x] Resolved: A controlled experiment using Python's bundled SQLite 3.45.3 logically dumped and restored a synthetic database with foreign keys, a view, a trigger, BLOBs and mixed stored types. Row values/types matched, the restored view returned both rows, one trigger was present and foreign_key_check was empty. This tested the installed library, not the pinned newest source, another SQLite implementation, every schema feature or corrupt-file recovery. Reproduction code and results are in batch 7. [Source](https://github.com/sqlite/sqlite/blob/31ebfdf4a1483218a7e17499957eca4caabce915/test/dump.sql).
- [x] Resolved: In the same controlled WAL-mode scenario, copying only the main database while its connection stayed open produced a copy with no tables from the uncheckpointed transaction. Connection.backup instead produced both child rows and integrity_check=ok. This demonstrates why a live main-file copy is not universally a complete snapshot; concurrent-writer stress, network filesystems and all crash timings remain untested. [Source](https://github.com/sqlite/sqlite/blob/31ebfdf4a1483218a7e17499957eca4caabce915/test/dump.sql).
- [ ] Open: Migration into a different engine/workflow, application-specific record semantics, independent non-SQLite decoding, extensions, corruption/crash/concurrent-writer stress and newer-feature/older-version compatibility remain unverified.

**Assessment follow-up:** E3/E5 and their associated principle findings are now reconciled in rating batch 1 below. Earlier source/fixture observations remain valid within their stated scope; they are not themselves blanket Pass decisions.

**Human-readable criteria:** Can users retain complete history and metadata, operate and recover locally, migrate to another implementation, and understand the effects of synchronization or automation?

## Rating reconciliation: 23 October 2026

**Scope:** Python-bundled SQLite 3.45.3; declared embedded relational-engine/API profile Individual-custodian perspective. This is the declared relational-engine/API profile, not a certification of arbitrary SQLite clients or application schemas.

| Criterion | Current finding |
|---|---|
| E3 Independent interpretation and recovery | Pass |
| E5 Governability of consequential actions | Pass |
| Longevity | Meets |
| Transparency and Control | Partially meets |

**E3:** The prior logical dump/backup experiments are reproduced and extended: a fresh connection restores schema and rows, the view returns expected related records, the restored trigger actually fires, and foreign_key_check is clean. This establishes meaningful recovery of the declared relational fixture through user-held files/SQL and the available open engine, not an independent SQLite implementation or the semantics of arbitrary application databases.

**E5:** With explicit transactions, foreign_keys ON and SQL trace enabled, DELETE and DROP TABLE are rolled back, a savepoint undoes an inner update, an invalid reference produces a visible IntegrityError, and an explicitly committed update survives reopen. This establishes governable SQL/API mutations in the declared configuration; it does not provide GUI consent, automatic client authorization or recovery after an unbacked committed deletion.

**longevity:** The declared fixture's schema, types, relationships, view and functioning trigger survive logical restoration, and the prior live-WAL comparison identifies the required backup boundary. This supports Longevity for this engine-level profile, not every application schema, damaged-file case, extension or future file-format feature.

**transparency:** E5 is demonstrated at the explicitly configured SQL/API boundary: statements, errors, rollback and commit are inspectable. Trace logging is opt-in and permission/UI policy belongs to the caller; the engine is not a universal audit or authorization service. These known limits support Partially meets.

**Evidence record:** evidence/rating-reconciliation/batch-1/README.md and runtime-results.json. No target software was installed. The new checks used existing runtimes in disposable directories, not a second machine or an independently implemented engine.

**Remaining work:** Migration into a different engine/workflow, application-specific record semantics, independent non-SQLite decoding, extensions, corruption/crash/concurrent-writer stress and newer-feature/older-version compatibility remain unverified.

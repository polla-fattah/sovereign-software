+++
title = "Zotero"
category = "Research & Education"
summary = "Reference manager that keeps a local library of bibliographic records and attached files, with export to standard citation formats."
substrate = "Local SQLite database plus a storage folder of attachments"
sync_model = "Local library with optional sync service; export to CSL JSON, BibTeX, and RIS"
extract_cmd = "sqlite3 zotero.sqlite \"SELECT COUNT(*) FROM items;\""
limitations = ["A library export is not equivalent to a complete backup, and relationships may not survive reimport.","No target application was installed or executed in rating reconciliation batch 2; source controls are not end-to-end recovery observations.","The independently loaded schema contains no research records; storage and document-citation mappings were not recovered."]
assessment_batch = "A"
assessment_status = "complete"
assessment_date = "2026-10-23"
version_assessed = "Source commit db41b99fddcc52d38897c59c161b6adaca036afb; published userdata.sql loaded using standard SQLite"
assessment_notes = "Rating reconciliation batch 2: E3/E5 remain Not Verified with specific missing evidence; unsupported Longevity, Transparency and Sovereignty findings withdrawn. The previous E2 Pass is also withdrawn. 2 additional source questions resolved."

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
text = "Resolved: the pinned repository publishes resource/schema/userdata.sql, including item field/value, creator, tag, collection, attachment, relation, and annotation tables and keys. Standard SQLite 3.45.3 successfully created the schema without Zotero."
url = "https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/resource/schema/userdata.sql"
confidence = "high"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.zotero.org/support/zotero_data"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Resolved: five standard SQL queries for metadata, creators, tags, collections, and annotations prepared successfully against the published schema. This demonstrates structural queryability in an empty database, not retrieval from a populated library or recovery of attachment contents and annotation rendering."
url = "https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/resource/schema/userdata.sql#L158-L319"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.zotero.org/support/zotero_data"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The official documentation for this entry provides a relevant governability of consequential actions lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.zotero.org/support/zotero_data"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "E2 is Not Verified for the existing essential-record scope, so the minimum for a positive Sovereignty finding is not established. Storage choice, local access and export-format strengths remain recorded; the old positive principle is withdrawn, not changed to a verified failure."
url = "https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/resource/schema/userdata.sql"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 remains Not Verified for Zotero's existing essential-record scope. An empty schema is not a restored research library. The previous positive Longevity finding is withdrawn to Not assessed, not a finding of failure."
url = "https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/resource/schema/userdata.sql"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.zotero.org/support/zotero_data"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The inspected controls are retained as positive facts, but whole-scope E5 remains Not Verified. The methodology requires established minimum oversight before a positive Transparency and Control finding; the earlier Partially meets is therefore withdrawn to Not assessed rather than used as a placeholder for incomplete evidence."
url = "https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/zoteroPane.js"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The retained schema again loads successfully, but selected item, collection, attachment, annotation and relation tables are empty. Preparing queries against DDL cannot demonstrate recovered research records, attachment bytes, annotation meaning or document-citation mappings. A populated library/storage backup and its expected relations remain necessary."
url = "https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/resource/schema/userdata.sql"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Pinned source stages trash/restore undo information and implements restoring selected records and children. Manual empty-trash confirms the irreversible action and then clears undo history. A separate timer can empty aged trash according to a preference, so manual confirmation is not universal. Merge, synchronization and backup-replacement control/recourse remain insufficiently covered."
url = "https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/zoteroPane.js"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The pinned trash path stages undo data before setting deletion state. Selected-item restoration runs transactionally, clears deletion state and includes applicable child notes/attachments or subcollections. This is source evidence of intended recovery paths, not a populated-library recovery run."
url = "https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/zoteroPane.js"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Manual empty-trash asks for confirmation including an irreversible-action message, erases deleted objects and clears undo history. Separately, the item service can purge aged trash from an idle timer using a preference; the manual dialog must not be generalized to all purges or to an observed default retention value."
url = "https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/zoteroPane.js"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The prior E2 Pass rested on a generic documentation lead. An empty schema and ordinary citation-export availability do not establish preservation of essential collections, relations, annotations and document-citation mappings in an alternative workflow. E2 is withdrawn to Not Verified pending a populated comparison."
url = "https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/resource/schema/userdata.sql"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The pinned item service stages undo information before changing an item's trash state. Its idle observer separately reads trashAutoEmptyDays and can call emptyTrash for aged items; a false/zero preference stops that observer path. This establishes source-level controls, not the default retention value, guaranteed audit-log persistence or successful recovery after erasure."
url = "https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/xpcom/data/items.js"
confidence = "medium"

+++

**Primary investigation:** Whether bibliographic relationships and document links survive independently of Zotero.

**Investigation priority:** Sovereignty high, Longevity high, Locality standard, Transparency and Control standard. This plans the test effort and is not a finding.

**Synthetic dataset:** 100 references (books, journal articles, DOIs, multilingual metadata, tags, notes, collections, attached PDFs, annotations) and citations inserted into test word-processing documents.

**Required tests**

1. Export through BibTeX, RIS, CSL-JSON, and Zotero RDF, recording exactly which information survives each conversion.
2. Back up the entire Zotero data directory and restore it on a second machine.
3. Determine whether PDF annotations, collection membership, related-item links, and document citation connections survive.
4. Disable synchronization and account access, then continue managing the local library.
5. Attempt migration to an independent reference manager and compare bibliographic meaning, not just record counts.
6. Test whether deleting an attachment or reference is visible, reversible, and recoverable from backup.

**Critical evidence:** Before-and-after metadata comparison, attachment hashes, citation-link integrity, database restoration results, and independently readable exports.

**Backup boundary:** Zotero documents that export/import can reset dates and break word-processor citation links. Full directory backup and cross-tool bibliographic export must be checked separately.

**Two-assessor protocol scope note:** Pre-registered under the `research_bibliographic` domain profile. Assessors separate full SQLite directory backup (T2) from cross-tool bibliographic export via CSL JSON and BibTeX (T1/T6).

**Assessment update, 23 October 2026:**

- [x] Resolved: the selected repository publishes machine-readable user-data schema and relationship keys.
- [x] Resolved: standard SQLite loaded the unmodified schema and prepared five metadata/relationship queries without Zotero.
- [ ] Open: A populated synthetic library plus stored/linked attachments and a citation-bearing document, expected collection/tag/relation/annotation mappings and an independent recovery comparison remain missing. E5 still needs merge, synchronization and backup-replacement evidence, including automatic-trash preference/retention behavior; source trash/restore/manual-purge boundaries are answered.

**Assessment:** Published schema and structural queryability are established. The observed database was empty, so complete independent recovery remains Not Verified. The overall determination remains **Insufficient evidence**.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

**Rating reconciliation: 23 October 2026**

E3 and E5 remain **Not Verified** for the scope stated above. Longevity and Transparency and Control are **Not assessed**, because their required minimums are not established. Sovereignty is also **Not assessed** while E2 remains unverified. The previous E2 Pass is withdrawn; the available evidence does not establish a usable full-scope migration. These are evidence corrections, not adverse product findings. E1, E4 and Locality were not re-certified by this targeted review.

- [x] Resolved: The pinned trash path stages undo data before setting deletion state. Selected-item restoration runs transactionally, clears deletion state and includes applicable child notes/attachments or subcollections. This is source evidence of intended recovery paths, not a populated-library recovery run. [Pinned source](https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/zoteroPane.js).
- [x] Resolved: Manual empty-trash asks for confirmation including an irreversible-action message, erases deleted objects and clears undo history. Separately, the item service can purge aged trash from an idle timer using a preference; the manual dialog must not be generalized to all purges or to an observed default retention value. [Pinned source](https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/zoteroPane.js).

**Recovery evidence still needed:** A populated synthetic library plus stored/linked attachments and a citation-bearing document, expected collection/tag/relation/annotation mappings and an independent recovery comparison remain missing. E5 still needs merge, synchronization and backup-replacement evidence, including automatic-trash preference/retention behavior; source trash/restore/manual-purge boundaries are answered.

**Next step without a local installation:** Use a sanitized synthetic zotero.sqlite, storage directory, any linked-file dependencies and a citation-bearing sample document with an expected mapping manifest. Inspect them with SQLite/archive tools and obtain version-matched merge/sync/backup-restoration observations from upstream or another assessor without installing Zotero locally.

Reproducible inspection and the individual decision ledger are retained in `evidence/rating-reconciliation/batch-2/`. Overall: **Insufficient evidence**.

**Complementary item-service source:** The pinned item service stages undo information before changing an item's trash state. Its idle observer separately reads trashAutoEmptyDays and can call emptyTrash for aged items; a false/zero preference stops that observer path. This establishes source-level controls, not the default retention value, guaranteed audit-log persistence or successful recovery after erasure. [Pinned source](https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/xpcom/data/items.js).

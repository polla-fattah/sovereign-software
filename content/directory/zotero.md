+++
title = "Zotero"
category = "Research & Education"
summary = "Reference manager that keeps a local library of bibliographic records and attached files, with export to standard citation formats."
substrate = "Local SQLite database plus a storage folder of attachments"
sync_model = "Local library with optional sync service; export to CSL JSON, BibTeX, and RIS"
extract_cmd = "sqlite3 zotero.sqlite \"SELECT COUNT(*) FROM items;\""
limitations = ["A library export is not equivalent to a complete backup, and relationships may not survive reimport."]
assessment_batch = "A"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "The official documentation for this entry provides a relevant independent access to essential information lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.zotero.org/support/zotero_data"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.zotero.org/support/zotero_data"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official documentation for this entry provides a relevant independent interpretation and recovery lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.zotero.org/support/zotero_data"
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
text = "The official documentation for this entry provides a relevant sovereignty lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.zotero.org/support/zotero_data"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The official documentation for this entry provides a relevant longevity lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.zotero.org/support/zotero_data"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.zotero.org/support/zotero_data"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The official documentation for this entry provides a relevant transparency and control lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.zotero.org/support/zotero_data"
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

**Documentation to verify:** Zotero's documentation is said to distinguish a full data-directory backup from an ordinary export, and to warn that reimporting an export can break existing word-processor citation links. Confirm this for the tested version.

**Two-assessor protocol scope note:** Pre-registered under the `research_bibliographic` domain profile. Assessors separate full SQLite directory backup (T2) from cross-tool bibliographic export via CSL JSON and BibTeX (T1/T6).

**Preliminary desk assessment:** Zotero is described as reference manager that keeps a local library of bibliographic records and attached files, with export to standard citation formats. Its primary preservation surface is Local SQLite database plus a storage folder of attachments, with independence shaped by local library with optional sync service; export to csl json, bibtex, and ris. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

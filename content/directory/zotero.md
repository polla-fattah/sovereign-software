+++
title = "Zotero"
category = "Research & Education"
summary = "Reference manager that keeps a local library of bibliographic records and attached files, with export to standard citation formats."
substrate = "Local SQLite database plus a storage folder of attachments"
sync_model = "Local library with optional sync service; export to CSL JSON, BibTeX, and RIS"
extract_cmd = "sqlite3 zotero.sqlite \"SELECT COUNT(*) FROM items;\""
limitations = ["A library export is not equivalent to a complete backup, and relationships may not survive reimport."]
assessment_batch = "A"
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

# Zotero: documentation review

Reviewed 22 October 2026 from the Zotero support pages, the About and privacy pages on zotero.org, the changelog, and the zotero/zotero GitHub repository only. Latest release found: 10.0.6 (7 October 2026, per the changelog). The download page shows "Zotero 10" with no date. Licence: the repository `COPYING` file is the GNU AGPL v3; the About page says "free, open-source" without naming a licence. Several pages were read through summaries, so quotes and details rest on those summaries.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

Follow-up, 23 October 2026: two questions are now resolved in the [third-pass evidence](../third-pass/README.md#zotero) and reflected in the [application assessment](../../content/directory/zotero.md). The review below preserves the earlier documentation record; its gap list is superseded where the follow-up answers it.

**Storage and access (E1, E3)**
- The data directory holds `zotero.sqlite` (item metadata, notes, tags) and a `storage` folder of 8-character subfolders with attachments. Files added as links are not copied into `storage`. `fulltext.sqlite` is a rebuildable search index and is not backed up. [Zotero data](https://www.zotero.org/support/zotero_data)
- The page does not document the database schema and does not say whether other tools can read `zotero.sqlite`. Schema documentation: not found in the docs. [Zotero data](https://www.zotero.org/support/zotero_data)
- Annotations made in the built-in reader are stored in the Zotero database, not in the PDF, so external readers do not see them unless exported as a PDF with embedded annotations. [PDF reader](https://www.zotero.org/support/pdf_reader)
- The data directory should not be kept in a cloud storage folder, which the sync page says is "extremely likely to corrupt" the database. [Sync](https://www.zotero.org/support/sync)

**Exit and migration (E2)**
- Zotero RDF with files and notes is named the most complete transfer. The export page does not describe CSL JSON, BibTeX, or RIS and says only that some fields may change or be missing in some formats. Per-format loss: not found in the docs. [Exporting](https://www.zotero.org/support/kb/exporting)
- Reimported items get new Date Added and Date Modified values and lose their links to citations in existing word processor documents. Export is "not a proper backup". [Exporting](https://www.zotero.org/support/kb/exporting), [Zotero data](https://www.zotero.org/support/zotero_data)
- The word processor overview names plugins for Word, LibreOffice, and Google Docs. It does not say how citations are stored or how to unlink them; those guides were not read. [Word processor integration](https://www.zotero.org/support/word_processor_integration)

**Recovery (E3)**
- Back up by closing Zotero and copying the whole data directory. Sync alone is not a complete backup because the server keeps only the latest version. [Zotero data](https://www.zotero.org/support/zotero_data)
- Do not copy or move files while Zotero is open. Keep `zotero.sqlite-wal` with the database after an unclean shutdown. A `.sqlite` file cannot be imported; restore by replacing `zotero.sqlite` while Zotero is closed. [Zotero data](https://www.zotero.org/support/zotero_data)
- Automatic `.bak` copies are made, usually daily. With "download files as needed" the local `storage` folder may be incomplete. [Zotero data](https://www.zotero.org/support/zotero_data)
- Zotero 10.0 dropped versioned database backups to "force a regular backup before all database upgrades". No downgrade guidance or one-way upgrade statement appears on the changelog page. [Changelog](https://www.zotero.org/support/changelog)

**Continuing authority (E4) and dependencies**
- Zotero can be used without an account. Syncing is optional. Free Zotero Storage is 300 MB for attachments; data sync is free and unlimited. WebDAV is an alternative for personal libraries only, and developers do not support third-party WebDAV servers. [Privacy](https://www.zotero.org/support/privacy), [Sync](https://www.zotero.org/support/sync)
- The sync page says automatic syncing is on by default; the privacy page says syncing is off by default. The two likely differ by whether an account is logged in, which the pages do not state. [Sync](https://www.zotero.org/support/sync), [Privacy](https://www.zotero.org/support/privacy)
- Network use: update checks (can be turned off, though "strongly recommended" on), translator, style, and retraction checks, proxy detection requests at startup, DOI lookups, and metadata lookups to third parties. Server logs keep IP and client data up to 90 days. [Privacy](https://www.zotero.org/support/privacy)
- Zotero is "a project of the Corporation for Digital Scholarship", a nonprofit. The About page names past funders, not current funding, and has no succession or continuity statement. [About](https://www.zotero.org/about/)
- Source on GitHub under AGPL v3 (COPYING file). Contribution terms not read. [zotero/zotero](https://github.com/zotero/zotero)

**Consequential operations (E5)**
- Merging duplicates keeps collections and tags of the merged items and is said not to disrupt word processor citations. The page does not say whether a merge can be undone, whether originals go to the trash, or whether a warning shows. [Duplicate detection](https://www.zotero.org/support/duplicate_detection)
- Trash behavior (restore, auto-empty after 30 days, configurable) appears only in a web search summary of Zotero Forums threads, not in a support page I could fetch. Treat as unconfirmed. [Forums thread](https://forums.zotero.org/discussion/82049/how-to-recover-items-from-the-trash)
- Editing a PDF in an external reader can misplace annotations. [PDF reader](https://www.zotero.org/support/pdf_reader)

## Gaps to test or read next
1. Build a 100-item synthetic library with tags, notes, collections, related items, and annotated PDFs. Export to Zotero RDF, CSL JSON, BibTeX, and RIS, and diff which fields, notes, collections, and attachments survive each.
2. Insert citations in a Word and a LibreOffice document, export and reimport the library, and check whether citations still refresh.
3. Copy the data directory (Zotero closed) to a second machine, restore, and compare item counts, attachment hashes, and annotations.
4. Open `zotero.sqlite` read-only with `sqlite3` and check that titles, creators, and tags can be queried without Zotero.
5. Try opening a library last used by 10.0.6 in an older release, to see whether the upgrade is one way (not found in the docs).
6. Delete an item, an attachment, and a collection, then check trash visibility, restore, and what a merge leaves behind.
7. Disable sync and network access and confirm the local library keeps working.
8. Not read: the Word, LibreOffice, and Google Docs plugin pages, the "Annotations in Database" article, the trash and backup-restore pages (the guessed trash URL returned 404), CONTRIBUTING.md, and the current funding or continuity statements.

## Rating reconciliation: 23 October 2026

This dated follow-up supersedes the earlier rating freeze, not the historical observations above. [Individual decision and coverage](../rating-reconciliation/batch-2/README.md#zotero); [actual assessment](../../content/directory/zotero.md).

- E3: Not Verified. The retained schema again loads successfully, but selected item, collection, attachment, annotation and relation tables are empty. Preparing queries against DDL cannot demonstrate recovered research records, attachment bytes, annotation meaning or document-citation mappings. A populated library/storage backup and its expected relations remain necessary.
- E5: Not Verified. Pinned source stages trash/restore undo information and implements restoring selected records and children. Manual empty-trash confirms the irreversible action and then clears undo history. A separate timer can empty aged trash according to a preference, so manual confirmation is not universal. Merge, synchronization and backup-replacement control/recourse remain insufficiently covered.
- Longevity and Transparency and Control: Not assessed; their E3/E5 minimums are not established.
- Sovereignty: Not assessed because E2 is Not Verified. The prior E2 Pass rested on a generic documentation lead. An empty schema and ordinary citation-export availability do not establish preservation of essential collections, relations, annotations and document-citation mappings in an alternative workflow. E2 is withdrawn to Not Verified pending a populated comparison.

- [x] Resolved: The pinned trash path stages undo data before setting deletion state. Selected-item restoration runs transactionally, clears deletion state and includes applicable child notes/attachments or subcollections. This is source evidence of intended recovery paths, not a populated-library recovery run. [Pinned source](https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/zoteroPane.js).
- [x] Resolved: Manual empty-trash asks for confirmation including an irreversible-action message, erases deleted objects and clears undo history. Separately, the item service can purge aged trash from an idle timer using a preference; the manual dialog must not be generalized to all purges or to an observed default retention value. [Pinned source](https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/zoteroPane.js).

Remaining: A populated synthetic library plus stored/linked attachments and a citation-bearing document, expected collection/tag/relation/annotation mappings and an independent recovery comparison remain missing. E5 still needs merge, synchronization and backup-replacement evidence, including automatic-trash preference/retention behavior; source trash/restore/manual-purge boundaries are answered.

Next without a local installation: Use a sanitized synthetic zotero.sqlite, storage directory, any linked-file dependencies and a citation-bearing sample document with an expected mapping manifest. Inspect them with SQLite/archive tools and obtain version-matched merge/sync/backup-restoration observations from upstream or another assessor without installing Zotero locally.

Source branches were inspected, not run. Hashes and the Anki/Zotero fixture queries were independently rechecked with Python/SQLite. No target app or upstream test suite was executed. Existing E1/E4/Locality findings were outside this targeted re-certification.

**Complementary item-service source:** The pinned item service stages undo information before changing an item's trash state. Its idle observer separately reads trashAutoEmptyDays and can call emptyTrash for aged items; a false/zero preference stops that observer path. This establishes source-level controls, not the default retention value, guaranteed audit-log persistence or successful recovery after erasure. [Pinned source](https://github.com/zotero/zotero/blob/db41b99fddcc52d38897c59c161b6adaca036afb/chrome/content/zotero/xpcom/data/items.js).

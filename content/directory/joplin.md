+++
title = "Joplin"
category = "Knowledge & Office"
summary = "Offline-first note-taking application whose notes are Markdown, with several synchronisation targets and export options."
substrate = "Markdown notes and attachments in a local SQLite database"
sync_model = "Local-first with optional sync (Joplin Cloud, WebDAV, Nextcloud, Dropbox, OneDrive, or a file system)"
extract_cmd = "sqlite3 database.sqlite \"SELECT title FROM notes LIMIT 5;\""
limitations = ["How much of the complete note state survives export and migration beyond the Markdown text is not yet established."]
assessment_batch = "A"
+++

**Primary investigation:** Whether a complete knowledge collection survives migration and synchronization failure.

**Investigation priority:** Sovereignty high, Longevity high, Locality high, Transparency and Control high. This plans the test effort and is not a finding.

**Synthetic dataset:** 200 notes in nested notebooks, with internal links, tags, attachments, checklists, encrypted synchronized records, and conflicting edits.

**Required tests**

1. Export as Markdown, JEX, and raw-format data.
2. Reimport each representation into a clean profile and compare recovered information.
3. Determine which formats preserve note identifiers, notebook hierarchy, tags, timestamps, links, and attachments.
4. Disconnect every configured synchronization provider and continue editing locally.
5. Simulate two devices editing the same note while disconnected, reconnect, and inspect conflict preservation.
6. Test encrypted-data recovery with available credentials and document the effect of losing essential recovery information.
7. Restore a complete library from an independent backup.

**Critical evidence:** Export comparison matrix, note-link integrity, synchronization-conflict records, encryption recovery procedure, and backup restoration report.

**Documentation to verify:** Joplin's documentation is said to describe JEX as a lossless export including notes and metadata, and the raw format as storing items individually. Verify this for the tested version and dataset.

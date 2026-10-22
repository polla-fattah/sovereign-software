+++
title = "Joplin"
category = "Knowledge & Office"
summary = "Offline-first note-taking application whose notes are Markdown, with several synchronisation targets and export options."
substrate = "Markdown notes and attachments in a local SQLite database"
sync_model = "Local-first with optional sync (Joplin Cloud, WebDAV, Nextcloud, Dropbox, OneDrive, or a file system)"
extract_cmd = "sqlite3 database.sqlite \"SELECT title FROM notes LIMIT 5;\""
limitations = ["How much of the complete note state survives export and migration beyond the Markdown text is not yet established."]
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
text = "Joplin exports a complete JEX archive and a raw directory form, and also supports Markdown, HTML, and PDF exports."
url = "https://joplinapp.org/help/apps/import_export/"
confidence = "high"

[[evidence]]
target = "E2"
text = "JEX can be re-imported into Joplin and Markdown can be imported elsewhere, giving both native and practical migration paths."
url = "https://joplinapp.org/help/apps/import_export/"
confidence = "high"

[[evidence]]
target = "E3"
text = "The raw export exposes notes, metadata, and resources as files, but complete independent reconstruction of internal links, encryption keys, and all settings was not tested."
url = "https://joplinapp.org/help/apps/terminal/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Joplin can synchronize to a local filesystem or operator-selected services, and notes can be edited with the terminal or text editor."
url = "https://joplinapp.org/help/apps/terminal/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Note-taking is user-directed, but plugin behavior, synchronization conflict resolution, and encrypted-data recovery were not tested."
url = "https://joplinapp.org/help/apps/import_export/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Multiple export forms and filesystem synchronization give users strong control and a credible exit path."
url = "https://joplinapp.org/help/apps/import_export/"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Markdown and raw file exports support preservation, while JEX and internal links need version-pinned restoration tests."
url = "https://joplinapp.org/help/apps/terminal/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core data can be stored and synchronized through local files without requiring a single hosted provider."
url = "https://joplinapp.org/help/apps/terminal/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The documentation explains export contents and limitations, but encryption keys and plugin settings need explicit preservation procedures."
url = "https://joplinapp.org/help/apps/import_export/"
confidence = "medium"

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

**Preliminary desk assessment:** Joplin is described as offline-first note-taking application whose notes are markdown, with several synchronisation targets and export options. Its primary preservation surface is Markdown notes and attachments in a local SQLite database, with independence shaped by local-first with optional sync (joplin cloud, webdav, nextcloud, dropbox, onedrive, or a file system). This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

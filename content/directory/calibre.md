+++
title = "calibre"
category = "Research & Education"
summary = "E-book library manager that keeps books in an ordinary folder tree with a metadata database and converts between many formats."
substrate = "Folder library with metadata.db (SQLite) and per-book OPF metadata"
sync_model = "Local library; sync left to external tools"
extract_cmd = "sqlite3 metadata.db \"SELECT title FROM books LIMIT 5;\""
assessment_batch = "A"
+++

**Primary investigation:** Recoverability of both the book files and the intellectual organization of the library.

**Investigation priority:** Sovereignty standard, Longevity high, Locality standard, Transparency and Control standard. This plans the test effort and is not a finding.

**Synthetic dataset:** 150 books in EPUB, PDF, and other supported formats, with authors, series, tags, custom columns, covers, reading metadata, and conversion settings.

**Required tests**

1. Copy the library to another computer and reopen it independently.
2. Examine the relationship between book files, per-book metadata, and metadata.db.
3. Create a disposable corrupted-database scenario and attempt documented recovery.
4. Compare restored custom columns, tags, saved searches, user categories, and conversion settings.
5. Export books with metadata and import them into a different library manager.
6. Test operation without external book-metadata services.
7. Investigate any DRM restrictions separately from calibre's own architecture.

**Critical evidence:** Reconstructed library inventory, metadata comparison, format readability, missing-settings list, and database recovery logs.

**Documentation to verify:** calibre's documentation is said to warn that rebuilding metadata.db from OPF metadata can lose saved searches, user categories, plugboards, and some conversion settings. A successful rebuild would then not by itself show complete longevity.

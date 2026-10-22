+++
title = "calibre"
category = "Research & Education"
summary = "E-book library manager that keeps books in an ordinary folder tree with a metadata database and converts between many formats."
substrate = "Folder library with metadata.db (SQLite) and per-book OPF metadata"
sync_model = "Local library; sync left to external tools"
extract_cmd = "sqlite3 metadata.db \"SELECT title FROM books LIMIT 5;\""
assessment_batch = "A"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "partial"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "calibre saves books and metadata to ordinary folders and documents Save to disk with OPF metadata files."
url = "https://manual.calibre-ebook.com/gui.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The manual states that saved books can be re-imported without loss of information, but migration to another library manager was not tested."
url = "https://manual.calibre-ebook.com/gui.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Book files and OPF metadata are independently accessible, but restoration of the complete calibre database, custom columns, and covers was not demonstrated."
url = "https://manual.calibre-ebook.com/calibre.pdf"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Reading, organizing, converting, and saving books are local operations; no vendor account is required for the library itself."
url = "https://manual.calibre-ebook.com/gui.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Metadata and file operations are visible, but destructive deletion, conversion settings, and library integrity require hands-on review."
url = "https://manual.calibre-ebook.com/gui.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Ordinary book files and OPF metadata give users a practical exit path; the full library database and custom state still need recovery testing."
url = "https://manual.calibre-ebook.com/gui.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Open book formats and OPF metadata support durable preservation, but format conversion and library-specific data can be lossy."
url = "https://manual.calibre-ebook.com/calibre.pdf"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core library is local and can be managed without a remote service."
url = "https://manual.calibre-ebook.com/gui.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "File export and metadata are inspectable, but conversion behavior and deletion safeguards were not fully assessed."
url = "https://manual.calibre-ebook.com/gui.html"
confidence = "medium"
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

**Preliminary desk assessment:** calibre is described as e-book library manager that keeps books in an ordinary folder tree with a metadata database and converts between many formats. Its primary preservation surface is Folder library with metadata.db (SQLite) and per-book OPF metadata, with independence shaped by local library; sync left to external tools. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

+++
title = "calibre"
category = "Research & Education"
summary = "E-book library manager that keeps books in an ordinary folder tree with a metadata database and converts between many formats."
substrate = "Folder library with metadata.db (SQLite) and per-book OPF metadata"
sync_model = "Local library; sync left to external tools"
extract_cmd = "sqlite3 metadata.db \"SELECT title FROM books LIMIT 5;\""
assessment_batch = "A"
limitations = ["Complete recovery needs more than readable metadata.db; book files, covers and other library state still need comparison.","Preference recovery depends on a usable separate backup; OPF-only reconstruction is a different recovery path."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit e2a169f96a30b9be215e3abd78cb0599e7a4479a; populated metadata SQLite relationships and preference-restore conditions"
assessment_notes = "Individually reconciled in rating batch 3 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. 2 further bounded source questions resolved. E1/E4/Locality were not re-certified by this targeted review."

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
text = "The published metadata.db fixture opened read-only with standard SQLite and returned integrity_check=ok. It contains three books and twelve custom-column definitions. Executed joins recovered four book/author links, four book/tag links and two numeric custom-column values; JSON preferences including saved_searches and user_categories are readable. No associated book files were restored."
url = "https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/tests/metadata.db"
confidence = "high"

[[evidence]]
target = "E2"
text = "The manual states that saved books can be re-imported without loss of information, but migration to another library manager was not tested."
url = "https://manual.calibre-ebook.com/gui.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The inspected restore first attempts metadata_db_prefs_backup.json and passes restore_all_prefs=True to a fresh database. The backend copies supplied preferences and recreates custom columns; missing or failed preference recovery falls back to OPF-derived reconstruction. Preference loss is therefore conditional, not inevitable. This does not establish recovery of conversion settings, recipes or every library component."
url = "https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/restore.py"
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
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for calibre does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://manual.calibre-ebook.com/gui.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for calibre's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/restore.py"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core library is local and can be managed without a remote service."
url = "https://manual.calibre-ebook.com/gui.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/gui2/actions/delete.py"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The populated metadata fixture independently exposes book/author/tag/custom-column relationships, and the restore source conditionally reuses a preference backup. Its three database records have no restored book files, covers or comparison for the declared 150-book/conversion-state profile. Neither OPF reconstruction nor the readable database alone establishes complete E3."
url = "https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/restore.py"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Library and device deletion use explicit helper/warning paths, recently deleted restoration exists, and backend expiry can close that recovery window, including an on-close setting. The remaining conversion/metadata overwrites, effective confirmation preferences and restoration after expiry are not sufficiently covered for the existing library scope."
url = "https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/gui2/actions/delete.py"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not demonstrate usable migration of custom columns, reading metadata, covers and conversion-state meaning into another library workflow. The available book/database observations leave those essential relationships unestablished."
url = "https://manual.calibre-ebook.com/gui.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The library-delete action calls a confirmation helper, uses a non-permanent removal path for bulk library deletion and exposes recently deleted restoration. Device deletion has a separate permanent-removal warning. Helper invocation is established, not an unconditional prompt under every saved preference or a successful restore."
url = "https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/gui2/actions/delete.py"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Trash expiry is time/preference-dependent, and closing the database explicitly expires trash when the configured expiry is zero. Retention is therefore not a permanent backup or a guarantee that every deleted book remains recoverable."
url = "https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/backend.py"
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

**Verification scope:** The pinned restore source below distinguishes recovery from a preference backup from OPF-only reconstruction. The complete loss profile still depends on available files and must not be generalized from one recovery path.

**Assessment update: 23 October 2026**

- [x] Resolved: The published metadata.db fixture opened read-only with standard SQLite and returned integrity_check=ok. It contains three books and twelve custom-column definitions. Executed joins recovered four book/author links, four book/tag links and two numeric custom-column values; JSON preferences including saved_searches and user_categories are readable. No associated book files were restored. [Source](https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/tests/metadata.db).
- [x] Resolved: The inspected restore first attempts metadata_db_prefs_backup.json and passes restore_all_prefs=True to a fresh database. The backend copies supplied preferences and recreates custom columns; missing or failed preference recovery falls back to OPF-derived reconstruction. Preference loss is therefore conditional, not inevitable. This does not establish recovery of conversion settings, recipes or every library component. [Source](https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/restore.py).
- [ ] Open: A complete library/OPF/prefs restore with book files, covers, annotations and conversion settings; cross-version reopening, DRM limits and destructive deletion. E5 also needs effective deletion/overwrite settings, conversion and bulk metadata mutation boundaries, and recovery evidence before/after trash expiry.

**Assessment:** The checked findings above now inform this application's evidence and limitations. They resolve the stated questions, not complete recovery, migration or eligibility. Reproduction details and retained inputs are recorded in evidence/third-pass/batch-4/. The overall determination remains **Insufficient evidence** for the remaining requirements.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

- [x] Resolved: The library-delete action calls a confirmation helper, uses a non-permanent removal path for bulk library deletion and exposes recently deleted restoration. Device deletion has a separate permanent-removal warning. Helper invocation is established, not an unconditional prompt under every saved preference or a successful restore. [Pinned source](https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/gui2/actions/delete.py).
- [x] Resolved: Trash expiry is time/preference-dependent, and closing the database explicitly expires trash when the configured expiry is zero. Retention is therefore not a permanent backup or a guarantee that every deleted book remains recoverable. [Pinned source](https://github.com/kovidgoyal/calibre/blob/e2a169f96a30b9be215e3abd78cb0599e7a4479a/src/calibre/db/backend.py).

**Remaining:** A complete library/OPF/prefs restore with book files, covers, annotations and conversion settings; cross-version reopening, DRM limits and destructive deletion. E5 also needs effective deletion/overwrite settings, conversion and bulk metadata mutation boundaries, and recovery evidence before/after trash expiry.

**Next without installing locally:** Obtain a synthetic complete library with files/OPFs/preferences and expected metadata/resource hashes; compare it independently and seek version-matched deletion/conversion/expiry observations or comprehensive control-source evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-3/`. Overall: **Insufficient evidence**.

+++
title = "GnuCash"
category = "Tasks & Finance"
summary = "Double-entry accounting program with local data files and an SQL storage option."
substrate = "Compressed XML data file, or SQLite or other SQL back end"
sync_model = "Local file; the chosen storage backend determines its properties"
extract_cmd = "gunzip -c book.gnucash | head -n 20"
limitations = ["The storage backend chosen changes what the user holds, and each has documented limits to assess."]
assessment_batch = "C"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "GnuCash documents XML, SQLite, MySQL, and PostgreSQL storage and lets users change formats through Save As."
url = "https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-files1.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Multiple storage formats and account export support exit, but migration of transactions, reports, schedules, and extensions to another accounting system was not tested."
url = "https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-files1.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "XML is a text format and automatic backups are documented, but restore and cross-version recovery were not independently demonstrated."
url = "https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-backup1.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Local XML and SQLite workflows do not require a hosted service; server-backed SQL modes introduce additional infrastructure."
url = "https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-files1.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Accounting data and backups are file-based, but financial validation, imports, and database consistency require hands-on testing."
url = "https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-backup1.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Local files and multiple storage formats support custody, while complete migration and database recovery remain unverified."
url = "https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-files1.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "XML and documented backup files support preservation, but reports, scheduled transactions, and backend differences require a full restore test."
url = "https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-backup1.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core bookkeeping can operate against local files without a remote service."
url = "https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-files1.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "File formats and backups are documented, but imports and financial operations require risk-specific review."
url = "https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-backup1.html"
confidence = "medium"
+++

**Primary investigation:** Financial record integrity and long-term independent interpretation.

**Investigation priority:** Sovereignty high, Longevity high, Locality standard, Transparency and Control high. This plans the test effort and is not a finding.

**Synthetic dataset:** A two-year book with 500 transactions, multiple currencies, split transactions, reconciliations, scheduled transactions, budgets, and account hierarchies.

**Required tests**

1. Save equivalent books using the supported XML and SQLite storage backends.
2. Verify that accounts, transactions, splits, currencies, and reconciliation states survive backup and restoration.
3. Test export to standard interchange formats and measure which accounting semantics are lost.
4. Recalculate trial balances and account totals independently from exported records.
5. Simulate application shutdown and restoration on a clean machine.
6. Examine whether transaction correction, deletion, and reconciliation actions remain traceable.
7. Test whether changes to exchange rates, scheduled transactions, or account structures produce understandable outcomes.

**Critical evidence:** Ledger invariants, reconciled balances, XML and SQLite files, export comparison, auditability observations, and disaster-recovery results.

**Documentation to verify:** GnuCash's documentation is said to explain that backup behavior differs between storage backends. Identify the specific backend assessed rather than issuing one assessment for all configurations.

**Preliminary desk assessment:** GnuCash is described as double-entry accounting program with local data files and an sql storage option. Its primary preservation surface is Compressed XML data file, or SQLite or other SQL back end, with independence shaped by local file; the chosen storage backend determines its properties. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user export complete records, preserve invariants and metadata, restore them independently, and continue the essential workflow without provider permission?

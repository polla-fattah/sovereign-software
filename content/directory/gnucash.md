+++
title = "GnuCash"
category = "Tasks & Finance"
summary = "Double-entry accounting program with local data files and an SQL storage option."
substrate = "Compressed XML data file, or SQLite or other SQL back end"
sync_model = "Local file; the chosen storage backend determines its properties"
extract_cmd = "gunzip -c book.gnucash | head -n 20"
limitations = ["The storage backend chosen changes what the user holds, and each has documented limits to assess."]
assessment_batch = "C"
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

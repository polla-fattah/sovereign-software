+++
title = "GnuCash"
category = "Tasks & Finance"
summary = "Double-entry accounting program with local data files and an SQL storage option."
substrate = "Compressed XML data file, or SQLite or other SQL back end"
sync_model = "Local file; the chosen storage backend determines its properties"
extract_cmd = "gunzip -c book.gnucash | head -n 20"
limitations = ["The exact-arithmetic checks cover two sample transactions, not a complete financial audit.","Split value, quantity and commodity context cannot be treated as interchangeable fields."]
assessment_batch = "C"
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit fec5643cd22cbafc7b16047f35cbe852395da947"
assessment_notes = "Individually reconciled in rating batch 8 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Standard XML parsing of the published sample reads 65 account records and two transactions. Every split account reference resolves, and exact rational arithmetic gives a zero sum of split values within each transaction. This checks this small fixture's explicit links and transaction values, not a full trial balance, exchange-rate validation, schedules, budgets or a populated modern book."
url = "https://github.com/Gnucash/gnucash/blob/fec5643cd22cbafc7b16047f35cbe852395da947/doc/examples/reg_doc_example.gnucash"
confidence = "high"

[[evidence]]
target = "E2"
text = "Multiple storage formats and account export support exit, but migration of transactions, reports, schedules, and extensions to another accounting system was not tested."
url = "https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-files1.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The XML transaction serializer writes transaction currency and separate split value, quantity, account and reconciliation fields. Value and quantity are distinct preservation fields, so reducing a multi-commodity book to a single amount column can discard meaning. The implementation is inspectable; complete cross-backend or CSV reconstruction has not been executed."
url = "https://github.com/Gnucash/gnucash/blob/fec5643cd22cbafc7b16047f35cbe852395da947/libgnucash/backend/xml/gnc-transaction-xml-v2.cpp"
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
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for GnuCash does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/Gnucash/gnucash/blob/fec5643cd22cbafc7b16047f35cbe852395da947/libgnucash/backend/xml/gnc-transaction-xml-v2.cpp"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for GnuCash's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/Gnucash/gnucash/blob/fec5643cd22cbafc7b16047f35cbe852395da947/libgnucash/backend/xml/gnc-transaction-xml-v2.cpp"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core bookkeeping can operate against local files without a remote service."
url = "https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-files1.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-backup1.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The small XML sample's split references resolve and explicit transaction values balance, but no representative schedules/budgets/FX/reconciliation book was reconstructed. Separate value and quantity semantics are essential; serializer inspection and a balanced two-transaction sample do not establish full XML/SQLite or historical recovery."
url = "https://github.com/Gnucash/gnucash/blob/fec5643cd22cbafc7b16047f35cbe852395da947/libgnucash/backend/xml/gnc-transaction-xml-v2.cpp"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Local files/backups and balanced arithmetic do not establish import authorization, correction of transactions/schedules, deleted-record recourse or effective backend/backup/log consistency. The existing evidence does not comprehensively cover the consequential financial operations."
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

**Evidence update: 23 October 2026**

- [x] Resolved: Standard XML parsing of the published sample reads 65 account records and two transactions. Every split account reference resolves, and exact rational arithmetic gives a zero sum of split values within each transaction. This checks this small fixture's explicit links and transaction values, not a full trial balance, exchange-rate validation, schedules, budgets or a populated modern book. [Source](https://github.com/Gnucash/gnucash/blob/fec5643cd22cbafc7b16047f35cbe852395da947/doc/examples/reg_doc_example.gnucash).
- [x] Resolved: The XML transaction serializer writes transaction currency and separate split value, quantity, account and reconciliation fields. Value and quantity are distinct preservation fields, so reducing a multi-commodity book to a single amount column can discard meaning. The implementation is inspectable; complete cross-backend or CSV reconstruction has not been executed. [Source](https://github.com/Gnucash/gnucash/blob/fec5643cd22cbafc7b16047f35cbe852395da947/libgnucash/backend/xml/gnc-transaction-xml-v2.cpp).
- [ ] Open: Representative XML/SQLite backend comparison with schedules/budgets/FX/reconciliation, CSV loss profile, timestamps/backups/log replay, deletion controls and older releases. E5 needs import/delete/change review, effective backup/log policies and recoverable transaction/schedule states; arithmetic balance is separate.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-7/.

**Human-readable criteria:** Can a user export complete records, preserve invariants and metadata, restore them independently, and continue the essential workflow without provider permission?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Representative XML/SQLite backend comparison with schedules/budgets/FX/reconciliation, CSV loss profile, timestamps/backups/log replay, deletion controls and older releases. E5 needs import/delete/change review, effective backup/log policies and recoverable transaction/schedule states; arithmetic balance is separate.

**Next without installing locally:** Inspect a synthetic XML/SQLite book packet with expected splits, values/quantities, schedules and reconciliation, then obtain independent balance comparisons and version-matched import/delete/log recovery observations.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-8/`. Overall: **Insufficient evidence**.

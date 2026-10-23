+++
title = "Money Manager Ex"
category = "Tasks & Finance"
summary = "Personal finance application that keeps its data in a local database file."
substrate = "SQLite database file (.mmb), with an encrypted option"
sync_model = "Local file; sync left to external tools"
extract_cmd = "sqlite3 data.mmb \".tables\""
limitations = ["Creating a schema is not recovery of a populated MMEX database.","Rekeying can change compatibility; the inspected prompt is not an executed decryption/recovery test."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit a4aa421415143406e2557b334137ca1b90b58218"
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
text = "The published, generated SQL schema successfully instantiated in an in-memory SQLite database, yielding 67 schema objects and integrity_check=ok. Account, transaction and related table definitions are available independently. This is an empty schema reconstruction, not an opened .mmb with financial records, attachment files or validated balances."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/a4aa421415143406e2557b334137ca1b90b58218/src/table/tables_en.sql"
confidence = "high"

[[evidence]]
target = "E2"
text = "The database can be exported and opened from backups, but migration to another finance application and preservation of every report and rule were not tested."
url = "https://github.com/moneymanagerex/mmex.doc/blob/main/05_Database_and_Reports"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The unencrypted database can be accessed with SQLite tools, while encrypted databases have limited external access; complete independent recovery was not demonstrated."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The application stores data locally and offers backup copies in the database folder."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The database-open path tries the newer SQLCipher configuration and falls back to the older AES-128 cipher. On the legacy path it offers a warning that rekeying prevents older MMEX versions opening the database, and only rekeys after a Yes response; page-size migration may occur first. This resolves the implemented upgrade warning/control, not actual decryption, cancellation or cross-version recovery."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/a4aa421415143406e2557b334137ca1b90b58218/src/db/dbwrapper.cpp"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Money Manager Ex does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Money Manager Ex's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core budgeting workflow runs from local database files without a provider."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/a4aa421415143406e2557b334137ca1b90b58218/src/db/dbwrapper.cpp"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The independently instantiated SQL schema is empty. It does not reconstruct financial records, transfers/splits, attachments or encryption state from a real MMB/EMB backup. Readable schema and available cipher code are positive prerequisites, not recovered accounting meaning."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The legacy cipher path offers an incompatibility/rekey warning and requires acceptance, but page-size changes may precede it. Effective cancellation, decryption/migration outcomes and ordinary import/delete/backup correction are not established by that one source control."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/a4aa421415143406e2557b334137ca1b90b58218/src/db/dbwrapper.cpp"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The published, generated SQL schema successfully instantiated in an in-memory SQLite database, yielding 67 schema objects and integrity_check=ok. Account, transaction and related table definitions are available independently. This is an empty schema reconstruction, not an opened .mmb with financial records, attachment files or validated balances. [Source](https://github.com/moneymanagerex/moneymanagerex/blob/a4aa421415143406e2557b334137ca1b90b58218/src/table/tables_en.sql).
- [x] Resolved: The database-open path tries the newer SQLCipher configuration and falls back to the older AES-128 cipher. On the legacy path it offers a warning that rekeying prevents older MMEX versions opening the database, and only rekeys after a Yes response; page-size migration may occur first. This resolves the implemented upgrade warning/control, not actual decryption, cancellation or cross-version recovery. [Source](https://github.com/moneymanagerex/moneymanagerex/blob/a4aa421415143406e2557b334137ca1b90b58218/src/db/dbwrapper.cpp).
- [ ] Open: A populated .mmb/.emb independently inspected, full transaction/transfer/split/attachment export/import comparison, real encryption migration, deleted-record retention and backups. E5 needs actual cipher/cancellation boundaries and import/delete/backup authority and correction records.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-7/.

**Human-readable criteria:** Can a user export complete records, preserve invariants and metadata, restore them independently, and continue the essential workflow without provider permission?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** A populated .mmb/.emb independently inspected, full transaction/transfer/split/attachment export/import comparison, real encryption migration, deleted-record retention and backups. E5 needs actual cipher/cancellation boundaries and import/delete/backup authority and correction records.

**Next without installing locally:** Acquire a populated synthetic MMB and encrypted test EMB with non-secret credentials, attachments and expected balances/relationships; inspect records and use version-matched migration/cancellation/deletion evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-8/`. Overall: **Insufficient evidence**.

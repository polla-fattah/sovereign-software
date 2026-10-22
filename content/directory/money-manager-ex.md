+++
title = "Money Manager Ex"
category = "Tasks & Finance"
summary = "Personal finance application that keeps its data in a local database file."
substrate = "SQLite database file (.mmb), with an encrypted option"
sync_model = "Local file; sync left to external tools"
extract_cmd = "sqlite3 data.mmb \".tables\""
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "partial"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Money Manager Ex uses local database files and documents backup copies, database formats, and export functions."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html"
confidence = "medium"

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
text = "Personal finance records are consequential, but import correction, transaction deletion, and audit behavior were not tested."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Local databases and backups support custody, but encrypted storage and cross-application migration remain limits."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "SQLite accessibility and documented backups help preservation, but database schema and report compatibility need testing."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core budgeting workflow runs from local database files without a provider."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Backup and database distinctions are documented, but financial import and correction safeguards need hands-on review."
url = "https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html"
confidence = "low"

+++

**Preliminary desk assessment:** Money Manager Ex is described as personal finance application that keeps its data in a local database file. Its primary preservation surface is SQLite database file (.mmb), with an encrypted option, with independence shaped by local file; sync left to external tools. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user export complete records, preserve invariants and metadata, restore them independently, and continue the essential workflow without provider permission?

+++
title = "Actual Budget"
category = "Tasks & Finance"
summary = "Local-first zero-based budgeting. Runs entirely offline against a local SQLite database and synchronizes across devices via verifiable Hybrid Logical Clock CRDT messages."
substrate = "Client-Side SQLite + Merkle CRDTs"
sync_model = "Self-Hosted Docker Sync with E2EE"
extract_cmd = "Export standard SQLite / CSV archive"
pilot_stage = 3
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
text = "The official backup documentation describes an in-application export, and the API documentation identifies the export as a ZIP containing db.sqlite and metadata.json. This establishes a documented retrieval path, but a clean independent restore was not performed in this desk review."
url = "https://actualbudget.org/docs/backup-restore/backup/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The export can be imported by the official API, but migration into an alternative budgeting application, including preservation of rules, schedules, and metadata, was not tested."
url = "https://actualbudget.org/docs/api/reference/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The documentation exposes SQLite and metadata inside the export, but independent interpretation and restoration outside Actual were not tested."
url = "https://actualbudget.org/docs/api/reference/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The client keeps budget data locally and the API supports local-only operation when no server URL is supplied."
url = "https://actualbudget.org/docs/getting-started/sync/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The documentation describes ordinary budgeting and optional bank synchronization, but risk-appropriate authorization and correction behavior for financial actions were not tested."
url = "https://actualbudget.org/docs/api/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Local access and documented export support user authority, while practical migration and recovery outside Actual remain unverified."
url = "https://actualbudget.org/docs/getting-started/sync/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The export includes a SQLite database and metadata, but restoration by independent tooling and preservation of all budgeting semantics were not demonstrated."
url = "https://actualbudget.org/docs/api/reference/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Actual documents local data access and operation without a server URL; synchronization and bank syncing are additional services rather than prerequisites for every local budgeting task."
url = "https://actualbudget.org/docs/getting-started/sync/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The documentation explains the local/server split and encryption trade-offs, but consequential financial authorization and audit behavior require hands-on review."
url = "https://actualbudget.org/docs/getting-started/sync/"
confidence = "medium"

+++

**Verification scenario:** Test local file operation, export and import into a clean install, disconnected edits and sync conflicts, and withdrawal of a hosted server.

**What may invalidate an overconfident claim:** Identify the local database, sync semantics, encryption configuration, and complete recovery independently.

**Documentation starting point:** <https://actualbudget.org/docs/>

**Desk assessment:** Actual keeps budget data on the local device and documents export to a ZIP containing a SQLite database and metadata. This supports local access and a credible retrieval path, but migration to another budgeting system, independent restoration, and financial-action oversight were not tested. The conservative result is **Insufficient evidence** pending a version-pinned export/import and recovery test.

**Human-readable criteria:** Can a user export a complete budget, restore it without the provider, preserve rules and history, continue working when the server disappears, and understand or correct bank-sync changes?

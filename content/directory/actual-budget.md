+++
title = "Actual Budget"
category = "Tasks & Finance"
summary = "Local-first zero-based budgeting. Runs entirely offline against a local SQLite database and synchronizes across devices via verifiable Hybrid Logical Clock CRDT messages."
substrate = "Client-Side SQLite + Merkle CRDTs"
sync_model = "Self-Hosted Docker Sync with E2EE"
extract_cmd = "Export standard SQLite / CSV archive"
pilot_stage = 3
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit d1a536f35c5a114eda0582d5a1d744a9103cc90e; export, import, and automatic backup implementation inspected"
assessment_notes = "Individually reconciled in rating batch 4 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."
limitations = ["Automatic backups clear CRDT message/clock history; native-file import replaces sync context. An archive is not a demonstrated complete sync-server backup."]

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
text = "Resolved: exportBuffer packages db.sqlite and metadata.json, clears kvcache and kvcache_key in the copied database, and sets metadata.resetClock=true. These contents and transformations are explicit in the pinned source. No budget was restored in this pass."
url = "https://github.com/actualbudget/actual/blob/d1a536f35c5a114eda0582d5a1d744a9103cc90e/packages/loot-core/src/server/cloud-storage.ts#L145-L194"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The export can be imported by the official API, but migration into an alternative budgeting application, including preservation of rules, schedules, and metadata, was not tested."
url = "https://actualbudget.org/docs/api/reference/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Resolved: automatic makeBackup removes messages_crdt and messages_clock from its temporary database before creating the ZIP. Actual-file import supplies null cloud/group IDs and importBuffer replaces sync/encryption context. These source facts define a recovery limitation; balance, rule, schedule, and complete restore fidelity remain unverified."
url = "https://github.com/actualbudget/actual/blob/d1a536f35c5a114eda0582d5a1d744a9103cc90e/packages/loot-core/src/server/budgetfiles/backups.ts"
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
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Actual Budget does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/actualbudget/actual/blob/d1a536f35c5a114eda0582d5a1d744a9103cc90e/packages/loot-core/src/server/budgetfiles/backups.ts"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Actual Budget's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/actualbudget/actual/blob/d1a536f35c5a114eda0582d5a1d744a9103cc90e/packages/loot-core/src/server/budgetfiles/backups.ts"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Actual documents local data access and operation without a server URL; synchronization and bank syncing are additional services rather than prerequisites for every local budgeting task."
url = "https://actualbudget.org/docs/getting-started/sync/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://actualbudget.org/docs/api/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Export and automatic-backup source identify SQLite/metadata packaging, cache removal and discarded CRDT/clock context; import replaces sync/encryption identity. No balance-, rule- and schedule-preserving reconstruction of the declared budget and server context is recorded. These transformations define required recovery comparisons, not complete E3."
url = "https://github.com/actualbudget/actual/blob/d1a536f35c5a114eda0582d5a1d744a9103cc90e/packages/loot-core/src/server/budgetfiles/backups.ts"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Budgeting and optional bank sync involve consequential financial changes, but the collected export/backup code does not establish authorization, inspectable changes and correction for bank imports, rule execution, encryption transitions and sync conflicts. No financial transaction is inferred to be governable merely because the budget is local."
url = "https://actualbudget.org/docs/api/"
confidence = "medium"

+++

**Verification scenario:** Test local file operation, export and import into a clean install, disconnected edits and sync conflicts, and withdrawal of a hosted server.

**What may invalidate an overconfident claim:** Identify the local database, sync semantics, encryption configuration, and complete recovery independently.

**Documentation starting point:** <https://actualbudget.org/docs/>

**Assessment update, 23 October 2026:**

- [x] Resolved: the inspected export routine packages `db.sqlite` and `metadata.json`, clears caches, and marks the sync clock for reset.
- [x] Resolved: automatic backups remove CRDT messages/clock history; native import replaces cloud/group/encryption context. Budget recovery and preservation of prior sync state are therefore separate questions.
- [ ] Open: balances, rules, schedules, bank-provider credentials, encryption behavior, and full sync-server recovery. E5 needs bank-import/rule/sync authorization, change visibility and correction boundaries in the configured budget.

**Assessment:** Pinned source inspection establishes concrete export and backup boundaries. It does not demonstrate a complete financial restore or migration to another budgeting tool, so the overall determination remains **Insufficient evidence**.

**Human-readable criteria:** Can a user export a complete budget, restore it without the provider, preserve rules and history, continue working when the server disappears, and understand or correct bank-sync changes?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** balances, rules, schedules, bank-provider credentials, encryption behavior, and full sync-server recovery. E5 needs bank-import/rule/sync authorization, change visibility and correction boundaries in the configured budget.

**Next without installing locally:** Inspect a synthetic Actual export and expected balances/rules/schedules with SQLite/JSON tools; obtain pinned implementation or externally recorded bank-import, rule, undo and sync/encryption evidence. Use synthetic credentials only.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-4/`. Overall: **Insufficient evidence**.

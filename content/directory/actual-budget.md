+++
title = "Actual Budget"
category = "Tasks & Finance"
summary = "Local-first zero-based budgeting. Runs entirely offline against a local SQLite database and synchronizes across devices via verifiable Hybrid Logical Clock CRDT messages."
substrate = "Client-Side SQLite + Merkle CRDTs"
sync_model = "Self-Hosted Docker Sync with E2EE"
extract_cmd = "Export standard SQLite / CSV archive"
pilot_stage = 3
legacy_tier = "Tier 2"
legacy_label = "Tier 2 • Sovereign Core"
+++

**Verification scenario:** Test local file operation, export and import into a clean install, disconnected edits and sync conflicts, and withdrawal of a hosted server.

**What may invalidate an overconfident claim:** Identify the local database, sync semantics, encryption configuration, and complete recovery independently.

**Documentation starting point:** <https://actualbudget.org/docs/>

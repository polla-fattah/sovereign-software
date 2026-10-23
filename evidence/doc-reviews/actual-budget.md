# Actual Budget: documentation review

Reviewed 22 October 2026 from the project's official documentation only. Latest release shown: 26.10.0 (2026-10-02). Licence: MIT.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. It shows what to test and where the documentation is thin.

## What the documentation says

Follow-up, 23 October 2026: two questions are now resolved in the [third-pass evidence](../third-pass/README.md#actual-budget) and reflected in the [application assessment](../../content/directory/actual-budget.md). The review below preserves the earlier documentation record; its gap list is superseded where the follow-up answers it.

**Storage and access (E1, E3)**
- Local-first: data is stored on the user's device and, by default, on their own sync server. Works regardless of network connection. [sync](https://actualbudget.org/docs/getting-started/sync)
- The budget is SQLite. The restore page tells users to open `db.sqlite` from an unzipped backup, and mentions `metadata.json`. No formal schema specification was found; migrations are in the repository. [restore](https://actualbudget.org/docs/backup-restore/restore)
- By default every mutation is stored in the budget file, so it grows until compacted by Reset Sync or an export and re-import. [backup](https://actualbudget.org/docs/backup-restore/backup)

**Exit and migration (E2)**
- Settings, Data, "Export data" saves a file. The restore page describes a zip holding `db.sqlite` and `metadata.json` (inferred contents). Import: Switch file, Import file, "Actual". [backup](https://actualbudget.org/docs/backup-restore/backup), [restore](https://actualbudget.org/docs/backup-restore/restore)
- Transaction import supports CSV, QIF, OFX, QFX, and CAMT. YNAB4 and nYNAB importers exist, and the pages disagree on whether nYNAB is official. [importing](https://actualbudget.org/docs/transactions/importing), [migration](https://actualbudget.org/docs/migration/)
- No full-data CSV or QIF export of a budget was found. Headless API `@actual-app/api` exists, with `exportBudget` and `importBudget` added in 26.8.0 per the release notes. [api](https://actualbudget.org/docs/api/)
- No list of what does not survive an export and re-import was found.

**Recovery (E3)**
- Automatic backups are desktop-app only, stored locally, up to 10 kept, as recent as about 15 minutes. Restore through File, Load Backup. [restore](https://actualbudget.org/docs/backup-restore/restore)
- The docs say to download a backup of each budget before upgrading or fixing migrations. Moving from the `nightly` Docker tag to a stable release can produce "cannot be loaded with this version", fixed by a manual SQLite migration. [restore](https://actualbudget.org/docs/backup-restore/restore)
- Rebuilding a lost sync server: no disaster-recovery procedure found.

**Continuing authority (E4) and dependencies**
- A server is not stated as required; with no `serverURL` the API makes no network connections. Self-hosting needs a server password. [api](https://actualbudget.org/docs/api/), [config](https://actualbudget.org/docs/config/)
- Bank sync is optional, needs the self-hosted server and the user's own provider credentials. Providers listed include Akahu, Enable Banking, GoCardless (not accepting new accounts), SimpleFIN, and Pluggy. Tokens on the server are not covered by end-to-end encryption and are readable by server admins. [bank-sync](https://actualbudget.org/docs/advanced/bank-sync)
- Optional end-to-end encryption: losing the encryption password with no local copy means the data cannot be recovered; it cannot be switched off except by backup and restore; local data stays unencrypted. [sync](https://actualbudget.org/docs/getting-started/sync)
- Privacy policy (13 January 2024) states no automatic data collection. This is a policy statement. [privacy](https://actualbudget.org/docs/privacy-policy)

**Consequential operations (E5)**
- Undo: any change on the desktop app; in the web app the undo history is lost on refresh. [tips](https://actualbudget.org/docs/getting-started/tips-tricks)
- Import has "Reimport deleted transactions" on by default, and duplicate matching favours the imported transaction. [importing](https://actualbudget.org/docs/transactions/importing)
- Multi-device conflicts: "avoid simultaneous usage". Reset Sync discards other devices' unsynced changes. No user-facing audit log was found. [sync](https://actualbudget.org/docs/getting-started/sync)

## Gaps to test or read next
1. A version-pinned export, restore into a clean install, and comparison of accounts, categories, rules, schedules, and history.
2. What does not survive an export (rules, schedules, bank-sync links, encryption state).
3. Recovery after loss of the sync server.
4. Pages not read: faq, vision, reconciliation, schedules, rules, install, troubleshooting.
5. Whether rule-driven and bank-sync changes are visible and reversible.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-4/README.md#actual-budget); [actual assessment](../../content/directory/actual-budget.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Export and automatic-backup source identify SQLite/metadata packaging, cache removal and discarded CRDT/clock context; import replaces sync/encryption identity. No balance-, rule- and schedule-preserving reconstruction of the declared budget and server context is recorded. These transformations define required recovery comparisons, not complete E3.
- E5: Not Verified. Budgeting and optional bank sync involve consequential financial changes, but the collected export/backup code does not establish authorization, inspectable changes and correction for bank imports, rule execution, encryption transitions and sync conflicts. No financial transaction is inferred to be governable merely because the budget is local.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: balances, rules, schedules, bank-provider credentials, encryption behavior, and full sync-server recovery. E5 needs bank-import/rule/sync authorization, change visibility and correction boundaries in the configured budget.

Next without a local installation: Inspect a synthetic Actual export and expected balances/rules/schedules with SQLite/JSON tools; obtain pinned implementation or externally recorded bank-import, rule, undo and sync/encryption evidence. Use synthetic credentials only.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

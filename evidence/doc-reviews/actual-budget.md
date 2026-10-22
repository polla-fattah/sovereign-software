# Actual Budget: documentation review

Reviewed 22 October 2026 from the project's official documentation only. Latest release shown: 26.10.0 (2026-10-02). Licence: MIT.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. It shows what to test and where the documentation is thin.

## What the documentation says

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

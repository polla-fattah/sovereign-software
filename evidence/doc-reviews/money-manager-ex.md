# Money Manager Ex: documentation review

Reviewed 22 October 2026 from the official repository (README, LICENSE, releases), the bundled help file `docs/en_US/index.html` in that repository, the mmex.doc user guide repository, and moneymanagerex.org only. Latest release shown as "Latest": v1.9.4, dated "31 Aug" with no year on the release page. Licence: GPL-2.0.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 7](../third-pass/batch-7/README.md#money-manager-ex) and reflected in the [application page](../../content/directory/money-manager-ex.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The published, generated SQL schema successfully instantiated in an in-memory SQLite database, yielding 67 schema objects and integrity_check=ok. Account, transaction and related table definitions are available independently. This is an empty schema reconstruction, not an opened .mmb with financial records, attachment files or validated balances.
- [x] Resolved: The database-open path tries the newer SQLCipher configuration and falls back to the older AES-128 cipher. On the legacy path it offers a warning that rekeying prevents older MMEX versions opening the database, and only rekeys after a Yes response; page-size migration may occur first. This resolves the implemented upgrade warning/control, not actual decryption, cancellation or cross-version recovery.

Remaining: A populated .mmb/.emb independently inspected, full transaction/transfer/split/attachment export/import comparison, real encryption migration, deleted-record retention and backups.

## What the documentation says

**Storage and access (E1, E3)**
- All data is held in one SQLite file, either unencrypted (`.mmb`) or password-protected (`.emb`, AES). The README calls it a "Nonproprietary SQLite database" and says both kinds can be opened with wxsqliteplus. [help file](https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html), [README](https://github.com/moneymanagerex/moneymanagerex)
- The site says encryption is unified to AES256 with multi-cipher support. Whether other SQLite tools can open an `.emb` file was not found in the docs. [website](https://moneymanagerex.org)
- Documentation of the table schema was not found in the pages read.

**Exit and migration (E2)**
- Export formats listed in the guide (as of December 2020): QIF, CSV, HTML, XML, JSON. Import: QIF, CSV, XML, WebApp. [Database and Reports](https://github.com/moneymanagerex/mmex.doc/blob/main/05_Database_and_Reports)
- CSV export is per account and uses date, payee, type, amount, category, subcategory, notes. Fields beyond these (attachments, budgets, assets, stocks) are not stated to be exported. [help file](https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html)
- QIF caveat: transfers reload into a single account but "will not function correctly". [help file](https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html)
- Reports can be exported to ZIP and community reports imported, with a warning about malicious files. [Database and Reports](https://github.com/moneymanagerex/mmex.doc/blob/main/05_Database_and_Reports)

**Recovery (E3)**
- `.bak` copies are written to the database folder on startup or exit, only if the database changed. The docs say existing backups are never overwritten, and a "Max Files" setting exists. Another passage says up to four are kept, which conflicts with it. Restore: open the backup, then save under a new name. [help file](https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html)
- Version compatibility: use the same or a newer version on every device. Older versions may not read a newer database. The v1.9.2 notes say the database "will be updated" on first run and earlier versions cannot then open it. Backup before upgrading is advised. [releases](https://github.com/moneymanagerex/moneymanagerex/releases)
- A lost password cannot be recovered for an `.emb` file. [help file](https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html)
- This help file text was read through a summarising fetch and the page is truncated on GitHub, so the raw file was also read in parts; the last part was summarised only.

**Continuing authority (E4) and dependencies**
- Licence file is GNU GPL version 2, June 1991. [LICENSE](https://github.com/moneymanagerex/moneymanagerex/blob/master/LICENSE)
- Network use: the help says MMEX connects "to send anonymous usage statistics or when checking for an update". Statistics can be disabled under Tools, Settings, Network. Stock prices use a configurable URL, default Yahoo Finance. WebApp sync is optional. [help file](https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html)
- Whether the update check can be disabled was not found in the docs. No account requirement was found. The site's privacy page returned 404 at /privacy/.
- The site offers "Bring Your Own Cloud": hosting the database on a cloud service of the user's choice. [website](https://moneymanagerex.org)
- Governance, succession, or maintainer statements: not found in the docs. The repository shows 438 open issues; the last commit date was not visible. [README](https://github.com/moneymanagerex/moneymanagerex)
- The v1.9.4 notes list a balance calculation issue with date range filters and advise reverting to v1.9.3. [v1.9.4](https://github.com/moneymanagerex/moneymanagerex/releases/tag/v1.9.4)

**Consequential operations (E5)**
- Deleted transactions are kept for a configurable number of days and can be restored before final removal. [help file](https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html)
- Saving to the other format leaves the original file on disk until the user deletes it. [help file](https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html)
- Undo, delete confirmation, and an audit trail were not found in the docs. Import duplicate handling was not found.
- The v1.9.4 notes record failures creating a new database in French and Italian (#8506, #8471). [v1.9.4](https://github.com/moneymanagerex/moneymanagerex/releases/tag/v1.9.4)

## Gaps to test or read next
1. Build a synthetic database with accounts, splits, transfers, attachments, budgets, assets, and stocks. Open the `.mmb` in the sqlite3 shell and record the tables.
2. Export CSV, QIF, XML, and JSON from it, re-import into a new database, and diff transaction counts, totals, and transfers.
3. Convert to `.emb` and test opening it with plain SQLite tools and with a different MMEX build.
4. Open the database in the latest version, then try the previous version, to confirm the one-way upgrade.
5. Delete transactions, check restoration within the retention period, and test whether anything is undoable.
6. Read the truncated parts of the help file, the full `05_Database_and_Reports` text, and the privacy page (not found at /privacy/).
7. Confirm the release year of v1.9.4, and whether the update check can be turned off.
8. Governance and succession: read contrib.txt, the developers page, and the contributing guidelines (not read).

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-8/README.md#money-manager-ex); [actual assessment](../../content/directory/money-manager-ex.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The independently instantiated SQL schema is empty. It does not reconstruct financial records, transfers/splits, attachments or encryption state from a real MMB/EMB backup. Readable schema and available cipher code are positive prerequisites, not recovered accounting meaning.
- E5: Not Verified. The legacy cipher path offers an incompatibility/rekey warning and requires acceptance, but page-size changes may precede it. Effective cancellation, decryption/migration outcomes and ordinary import/delete/backup correction are not established by that one source control.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: A populated .mmb/.emb independently inspected, full transaction/transfer/split/attachment export/import comparison, real encryption migration, deleted-record retention and backups. E5 needs actual cipher/cancellation boundaries and import/delete/backup authority and correction records.

Next without a local installation: Acquire a populated synthetic MMB and encrypted test EMB with non-secret credentials, attachments and expected balances/relationships; inspect records and use version-matched migration/cancellation/deletion evidence.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

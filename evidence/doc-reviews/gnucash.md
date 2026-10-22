# GnuCash: documentation review

Reviewed 22 October 2026 from the GnuCash Guide and Manual (v5), gnucash.org (download and news pages), the release schedule wiki, and the GitHub repository only. Current stable release: 5.17 (2026-09-27, from the news page and wiki; the download page gives the version but no date). Licence: GPL version 2 or, at the user's option, version 3, per the repository LICENSE file. The Guide pages read are the v5 series and are not labelled with a point release.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. Every statement below rests on a fetched page summary, not on a verbatim reading of the full page.

## What the documentation says

**Storage and access (E1, E3)**
- XML is the default: a text file, compressed by default (Preferences, General, "Compress files"). The page recommends it for most users. [files](https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-files1.html)
- SQLite is a single database file; MySQL and PostgreSQL need their own servers and drivers and are "best maintained only by experienced database administrators". The page says SQL storage does not mean multi-user or incremental features, a "long term goal"; its table lists no multi-user support for any format. [files](https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-files1.html)
- XML saves on command (autosave is XML only). SQL formats save every change immediately. [files](https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-files1.html)
- A published schema or format specification for XML or SQL: not found in the docs pages read.

**Exit and migration (E2)**
- File, Save As copies the book into another storage format at any time. [files](https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-files1.html)
- Export is CSV only (active register, or selected accounts). The simple layout handles only two-split transactions and "may not allow all the data" to be exported; multiline layout writes one line per split. A full list of excluded fields: not found in the docs. [export](https://www.gnucash.org/docs/v5/C/gnucash-manual/trans-export.html)
- Import supports QIF, OFX/QFX, CSV and AqBanking formats. Multi-split multicurrency CSV import is described as experimental, and the QIF wizard lists unimplemented steps. These are import limits, not export. [import](https://www.gnucash.org/docs/v5/C/gnucash-manual/trans-import.html)
- Export of scheduled transactions, budgets, reports, or prices to another accounting system: not found in the docs.

**Recovery (E3)**
- The backup page says it applies to XML only. Each save writes a timestamped copy (`.YYYYMMDDHHMMSS.gnucash`); to restore, open it and save under a new name. [backup](https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-backup1.html)
- `.log` files are "not a full backup". After a crash, File, Import, Replay GnuCash .log file can recover unsaved work, but changes to scheduled transactions, invoices, or bills are not recovered. [backup](https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-backup1.html)
- Logs and timestamped backups older than 30 days are deleted automatically by default; this can be changed. Preferences also offer log retention of never, a set number of days, or forever. [backup](https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-backup1.html), [preferences](https://www.gnucash.org/docs/v5/C/gnucash-manual/set-prefs.html)
- Backup of SQLite, MySQL, or PostgreSQL books: not covered on that page. Cross-version file compatibility: not found (only a passing mention of pre-2.4 `.xac` backups).
- The 5.17 news entry mentions no file format change. [news](https://www.gnucash.org/news.phtml)

**Continuing authority (E4) and dependencies**
- Lock files (`.LCK`, `.LNK`) remain after a crash; the page says it is safe to open anyway, then delete them manually. [backup](https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-backup1.html)
- Online price quotes use the Perl module `Finance::Quote`; Alpha Vantage needs an API key. The README calls this the only online feature described. [preferences](https://www.gnucash.org/docs/v5/C/gnucash-manual/set-prefs.html), [GitHub](https://github.com/Gnucash/gnucash)
- Online banking uses AqBanking, an optional dependency. [import](https://www.gnucash.org/docs/v5/C/gnucash-manual/trans-import.html)
- Account requirement, telemetry, update check: no statement found (README and Preferences summary silent). No privacy page was located.
- Governance: the README names no maintainers or governance model and points to the wiki and developer mailing list. [GitHub](https://github.com/Gnucash/gnucash)
- Maintenance: 5.17 released 2026-09-27, 5.18 planned 2026-12-20. The wiki labels 4.x "Closed to Development" and states no support policy for older series. [wiki](https://wiki.gnucash.org/wiki/Release_Schedule)
- Licence: GPL 2 or 3 at the user's option. [LICENSE](https://github.com/Gnucash/gnucash/blob/stable/LICENSE)

**Consequential operations (E5)**
- Deleting an account removes its transactions and details from the file and "cannot be undone". It warns when transactions exist and can leave other accounts unbalanced; Actions, Check & Repair moves amounts to an Imbalance account. [delete account](https://www.gnucash.org/docs/v5/C/gnucash-manual/acct-delete.html)
- Deleting a transaction shows a confirmation, which can be turned off ("don't ask again"); Actions, Reset Warnings restores it. Undo and voiding are not mentioned on that page. [delete transaction](https://www.gnucash.org/docs/v5/C/gnucash-manual/trans-delete.html)
- Void Transaction and Unvoid Transaction exist in the Transaction menu. 5.17 changes void detection to use a void timestamp rather than a reason. [register](https://www.gnucash.org/docs/v5/C/gnucash-manual/gui-acct-reg.html), [news](https://www.gnucash.org/news.phtml)
- The CSV matcher can overwrite existing transaction fields; the "Append" option controls this. [import](https://www.gnucash.org/docs/v5/C/gnucash-manual/trans-import.html)
- Undo, audit trail, and reconcile reversal: not found in the docs pages read. The reconcile page returned 404.

## Gaps to test or read next
1. Build the synthetic book (500 transactions, splits, multiple currencies, reconciliations, schedules, budgets). Save As XML and SQLite, then compare account trees, balances, and reconcile states.
2. Open the XML with `gunzip` and the SQLite file with a generic SQLite client; check the data is complete without GnuCash and recompute trial balances.
3. Export CSV in simple and multiline layouts; list which fields (currency, rate, schedules, budgets, prices) are lost.
4. Restore a timestamped backup and a `.log` replay on a clean machine; note what scheduled-transaction changes are missing.
5. Check whether an SQLite book has any documented backup route, and whether a newer release's file opens in an older one.
6. Delete a reconciled transaction and an account holding transactions; record the warnings and what remains traceable.
7. Observe network traffic at launch for any update check or telemetry (no statement found).
8. Pages not read or failed: Guide and Manual reconcile page (404), the Help index (404), the licence page on the website (404), any privacy page, the full 5.17 notes beyond the news page's first 100,000 characters.

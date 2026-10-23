# SQLite: documentation review

## Rating reconciliation: 23 October 2026

The current [rating review](../rating-reconciliation/batch-1/README.md#sqlite) supersedes the earlier rating freeze. E3: Pass; E5: Pass; Longevity: Meets; Transparency and Control: Partially meets. The actual application page contains the same decisions and supporting evidence.

Remaining: Migration into a different engine/workflow, application-specific record semantics, independent non-SQLite decoding, extensions, corruption/crash/concurrent-writer stress and newer-feature/older-version compatibility remain unverified.

Earlier evidence findings below remain historical observations with their original limits, not automatic Pass results.


Reviewed 22 October 2026 from sqlite.org pages only (file format, long-term support, backup, WAL, corruption, CLI, VACUUM, licence, support, release log). Latest stable release: 3.54.1, dated 2026-10-16 in the release log; the download page gives the version but no date. Licence: the core library is dedicated to the public domain. Several pages were read through a summarising fetch tool, and the release log page was truncated (only the newest entry was read), so wording below is paraphrase unless quoted.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 7](../third-pass/batch-7/README.md#sqlite) and reflected in the [application page](../../content/directory/sqlite.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: A controlled experiment using Python's bundled SQLite 3.45.3 logically dumped and restored a synthetic database with foreign keys, a view, a trigger, BLOBs and mixed stored types. Row values/types matched, the restored view returned both rows, one trigger was present and foreign_key_check was empty. This tested the installed library, not the pinned newest source, another SQLite implementation, every schema feature or corrupt-file recovery. Reproduction code and results are in batch 7.
- [x] Resolved: In the same controlled WAL-mode scenario, copying only the main database while its connection stayed open produced a copy with no tables from the uncheckpointed transaction. Connection.backup instead produced both child rows and integrity_check=ok. This demonstrates why a live main-file copy is not universally a complete snapshot; concurrent-writer stress, network filesystems and all crash timings remain untested.

Remaining: Independent non-SQLite file interpretation, corrupt-file .dump/.recover comparison, concurrency/crash/backend matrices and older-release compatibility with newer features.

## What the documentation says

**Storage and access (E1, E3)**
- The file format is documented as "the on-disk database file format used by all releases of SQLite since version 3.0.0". The page also defines the WAL file format (header, frames, checksum), so an independent reader can in principle be written from the specification. [file format](https://www.sqlite.org/fileformat2.html)
- A database is a single disk file, portable across 32/64-bit and big/little-endian machines. Journal files exist during transactions, so it is not one file at all times. [onefile](https://www.sqlite.org/onefile.html)
- The Library of Congress lists SQLite as a Recommended Storage Format for datasets (page dated 2018-05-29 for the comparison list). The page lists criteria but does not assess SQLite against them. I did not read the Library of Congress pages themselves. [locrsf](https://www.sqlite.org/locrsf.html)
- The format says nothing about what an application stores in its tables. The file is readable by the SQLite library and the `sqlite3` shell, but the meaning of an application schema is outside these pages (not found in the docs).

**Exit and migration (E2)**
- `.dump` converts the database to one UTF-8 SQL text file that can be piped back into `sqlite3`; the page says it can also be used to export to other SQL engines. `.dump` "stops when the first sign of corruption is encountered". [CLI](https://www.sqlite.org/cli.html)
- CSV and TSV export is done through `.mode` and `.once`/`.output`; `.import` loads delimited text, and the target table's column types depend on how the table is created. [CLI](https://www.sqlite.org/cli.html)
- What a dump or CSV export loses, for example column type affinity or application-defined functions, is not stated on these pages (not found in the docs).
- `VACUUM` may change ROWIDs of tables without an explicit INTEGER PRIMARY KEY, so anything referring to raw rowids is affected. [VACUUM](https://www.sqlite.org/lang_vacuum.html)

**Recovery (E3)**
- Backup API: copies one database into another as a snapshot, "bit-wise identical". If another process writes during an incremental backup, it usually restarts, and "it may never run to completion" under frequent writes. [backup](https://www.sqlite.org/backup.html)
- `VACUUM INTO` writes a compacted copy to a new file; the target must not exist or be empty, and an interrupted run "might be incomplete and corrupt". `sqlite3_rsync` is named for live remote copies. [VACUUM](https://www.sqlite.org/lang_vacuum.html), [backup](https://www.sqlite.org/backup.html)
- WAL mode keeps `-wal` and `-shm` files. Separating the database from its WAL "might" lose committed transactions or corrupt the file; the WAL should travel with the database. [WAL](https://www.sqlite.org/wal.html)
- A plain file copy is safe only if no transaction is in progress and any journal or WAL file is copied too. [how to corrupt](https://www.sqlite.org/howtocorrupt.html)
- `.recover` reassembles data from readable pages and puts unattributable rows in a `lost_and_found` table. The `.backup`, `.restore` and `.clone` commands appear in the CLI help listing; the page has no detail on them. [CLI](https://www.sqlite.org/cli.html)
- Version compatibility: all 3.x releases read and write files created by 3.0.0. Forward compatibility is "usually, but not completely" provided. Header bytes record read and write format versions, and a file with a read version above 2 cannot be read. A WAL-mode file is reported by older versions as "file is encrypted or is not a database", and `PRAGMA journal_mode=DELETE` reverts it. [onefile](https://www.sqlite.org/onefile.html), [file format](https://www.sqlite.org/fileformat2.html), [WAL](https://www.sqlite.org/wal.html)

**Continuing authority (E4) and dependencies**
- Stated intent: "support SQLite through the year 2050", with the page adding it cannot "absolutely promise" this. API and on-disk format are promised to stay backward compatible. The page names no maintaining organisation and says nothing on succession. [LTS](https://www.sqlite.org/lts.html)
- Source history is stated to be replicated to servers in datacenters owned by different companies. [LTS](https://www.sqlite.org/lts.html)
- Paid support is offered through Hwaci (D. Richard Hipp); free help is via the forum, and the mailing list is deprecated since 2020-03-12. No consortium, governance, or telemetry statement was found on that page. [support](https://www.sqlite.org/support.html)
- Licence: deliverable code and documentation are dedicated to the public domain; build scripts may carry other licences but are not shipped in the library. Patches are accepted only from people who submitted a public-domain affidavit. A paid Warranty of Title is offered for jurisdictions that do not recognise public-domain dedication. [copyright](https://www.sqlite.org/copyright.html)
- Proprietary extensions exist separately (SEE encryption, CEROD, ZIPVFS, TH3); the core library does not require them. [support](https://www.sqlite.org/support.html)
- The library is embedded and the pages describe no accounts or update check; network behaviour of the library itself is not stated (not found in the docs). WAL does not work over network filesystems: "All processes using a database must be on the same host computer." [WAL](https://www.sqlite.org/wal.html)

**Consequential operations (E5)**
- The documented corruption causes include copying during a transaction, deleting or moving a hot journal, mixed locking protocols, network filesystems, `PRAGMA synchronous=OFF`, and `writable_schema=ON`. [how to corrupt](https://www.sqlite.org/howtocorrupt.html)
- "SQLite database files are ordinary disk files", so any process can overwrite them. [how to corrupt](https://www.sqlite.org/howtocorrupt.html)
- `VACUUM` removes traces of deleted content and needs up to twice the file size in free space; it fails with an open transaction. [VACUUM](https://www.sqlite.org/lang_vacuum.html)
- The CLI `.save` "will overwrite any preexisting database files" without prompting. [CLI](https://www.sqlite.org/cli.html)
- The library has no application-level undo or history; the docs on transactions and rollback were not read. Application-level controls are outside these pages.

## Gaps to test or read next
1. Build a synthetic database with foreign keys, views, triggers, BLOB and mixed-type columns. Run `.dump`, restore into a fresh file, and compare schema and row counts with `sqlite3_analyzer` or `PRAGMA integrity_check`.
2. Write a small reader from the specification (or use a second implementation) to open the file without the SQLite library, and record what it cannot parse.
3. WAL test: write in WAL mode, copy only the main file while a connection is open, and compare with a copy that includes `-wal`. Repeat with the backup API and `VACUUM INTO` under concurrent writes.
4. Open a file saved by the newest release in an old release (for example 3.8.x) and note errors, especially with newer features such as generated columns or strict tables.
5. Corrupt a copy and compare `.dump` against `.recover` output.
6. Not read: the transaction and atomic commit pages, the `PRAGMA` reference, the Library of Congress format description, the forum or Git history for how the project handles succession, and the release log beyond the newest entry. Whether the project collects any telemetry or update data is not stated on the pages read.

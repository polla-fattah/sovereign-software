# Taskwarrior: documentation review

Reviewed 22 October 2026 from the Taskwarrior documentation (taskwarrior.org/docs), the download and licence pages, and the project repository README and ChangeLog only. Current stable release: 3.5.0, shown on the download page as "Released 2026-08-16". Licence: MIT. Page summaries were produced by a fetch tool, so every fact below rests on a summary of the page, not on a full reading.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Follow-up: 23 October 2026

3 bounded questions are resolved in [batch 4](../third-pass/batch-4/README.md#taskwarrior) and incorporated into the [application assessment](../../content/directory/taskwarrior.md). The original documentation review below remains a dated record; these narrower findings supersede its corresponding uncertainties.

- [x] Resolved: Python syntax-tree parsing and json.loads independently read three upstream import-test literals containing five distinct task UUIDs, descriptions, entry dates, projects, and pending/completed status. The completed record also has an end date. These are embedded input fixtures, not a newly executed Taskwarrior export/import or proof of recurrence, annotation and dependency fidelity.
- [x] Resolved: Export applies task/report filters before serializing selected tasks. composeJSON writes task attributes plus structured annotations, tags and dependency UUIDs, and can add volatile ID/urgency decoration. This is a task-record interchange path, not a complete backup of configuration, hooks, undo or synchronization state.
- [x] Resolved: Import looks up each task by UUID and modifies an existing task rather than always appending a new record; duplicate UUIDs in an input produce a merged-results warning. For existing tasks it preserves the old modified value during comparison and ignores generated entry/end defaults unless supplied. Import can change existing work, so it is not inherently an append-only or byte-for-byte restore operation.

Remaining: TaskChampion SQLite interpretation, full recurrence/annotation/UDA/dependency round trips, exact date/history preservation, actual duplicate-UUID updates, 2.x migration and multi-replica sync recovery.

## What the documentation says

**Storage and access (E1, E3)**
- Taskwarrior 2.x stored tasks in `*.data` files. Taskwarrior 3.x stores them in `taskchampion.sqlite3` in the task directory. [upgrade to 3](https://taskwarrior.org/docs/upgrade-3/)
- The upgrade page names TaskChampion only as the origin of the database file and does not describe the schema or say whether other tools may read it directly. Not found in the docs.
- `export` takes a filter and prints JSON, one object per task, wrapped in an array while `json.array` is on. It adds two derived fields, `id` and `urgency`, which are not stored. [export](https://taskwarrior.org/docs/commands/export/)
- The export page does not mention UDAs, annotations, or dependencies. The docs index links an external JSON format document on GitHub, which was not read. [docs index](https://taskwarrior.org/docs/)

**Exit and migration (E2)**
- `export` writes all matching tasks as JSON and suggests redirecting to a file. `import` adds new tasks or updates existing ones by UUID. [task(1)](https://taskwarrior.org/docs/man/task.1/)
- The man page advises setting `rc.recurrence.confirmation` for automated imports. The dedicated import page returned 404, so its detail was not read.
- 2.x to 3.x: install 3.3.0 or later, run `task import-v2 rc.hooks=0`, verify, then reconfigure sync. The page lists nothing as lost, and does not say whether configuration, hooks, or undo history carry over. [upgrade to 3](https://taskwarrior.org/docs/upgrade-3/)
- Since 3.1.0, importing the same UUID more than once warns. [ChangeLog](https://github.com/GothenburgBitFactory/taskwarrior/blob/stable/ChangeLog)

**Recovery (E3)**
- The download page says to back up first and gives an example that archives `~/.task` into a dated tarball. It warns that development branches "may harm your data". [download](https://taskwarrior.org/download/)
- The man page documents no backup command. [task(1)](https://taskwarrior.org/docs/man/task.1/)
- Old `*.data` files can be kept or removed after import. Taskwarrior warns on every run while they remain. [upgrade to 3](https://taskwarrior.org/docs/upgrade-3/)
- Compatibility between 3.x minor versions, and whether an older 3.x can read a database written by a newer one: not found in the docs.

**Continuing authority (E4) and dependencies**
- The README says Taskwarrior is the work of "mostly small group of volunteers", in development since 2006, with GitHub Sponsors requested. No succession statement or telemetry statement was found. [README](https://github.com/GothenburgBitFactory/taskwarrior)
- Licence MIT. The licence page names Paul Beckingham and Federico Hernandez (2006 to 2017); the site footer names Gothenburg Bit Factory for 2026. [licence](https://taskwarrior.org/docs/license/)
- Sync is optional and uses `task sync`. Backends: a TaskChampion sync server, Google Cloud Storage, AWS S3, a local directory, or Git. Cloud storage "carries a small cost". [sync](https://taskwarrior.org/docs/sync/), [task-sync(5)](https://taskwarrior.org/docs/man/task-sync.5/)
- With a sync server, task data is encrypted by Taskwarrior using a shared `sync.encryption_secret`, and the server never sees unencrypted data. A new client ID needs no server-side setup. [task-sync(5)](https://taskwarrior.org/docs/man/task-sync.5/)
- Taskwarrior 3 does not talk to `taskd`, and `taskd.*` options were removed. Sync via S3 arrived in 3.3.0 and via Git in 3.5.0. [upgrade to 3](https://taskwarrior.org/docs/upgrade-3/), [ChangeLog](https://github.com/GothenburgBitFactory/taskwarrior/blob/stable/ChangeLog)
- Update checks and network calls other than sync: not found in the docs.
- Hooks run scripts on events; the v2 page documents only the extra command-line arguments. [hooks v2](https://taskwarrior.org/docs/hooks2/)

**Consequential operations (E5)**
- `purge` carries the only data-loss warning found: "causes permanent, non-revertible loss of data". It applies to already-deleted tasks and is local-only, not synced. [task(1)](https://taskwarrior.org/docs/man/task.1/)
- `undo` reverts the most recent action and obeys the confirmation setting. `delete` and `modify` carry no warning on that page. [task(1)](https://taskwarrior.org/docs/man/task.1/)
- Once changes are synced, they cannot be undone. The AWS backend needs S3 lifecycle policies disabled because they may delete objects. [task-sync(5)](https://taskwarrior.org/docs/man/task-sync.5/)
- Using Syncthing, rsync, or a shared folder on the 3.x database "can cause corruption and are not supported". The task-sync page still describes sharing a folder via Dropbox or Google Drive as a file-sharing option, which looks inconsistent. [sync](https://taskwarrior.org/docs/sync/), [task-sync(5)](https://taskwarrior.org/docs/man/task-sync.5/)
- The 2.5.2 entry records a sync conflict that deleted a task's annotations. [ChangeLog](https://github.com/GothenburgBitFactory/taskwarrior/blob/stable/ChangeLog)

## Gaps to test or read next
1. Create synthetic tasks with recurrence, annotations, UDAs, dependencies, tags, and completed and deleted items. Run `task export`, import into a clean profile, export again, and diff the two JSON files, including UUIDs and entry dates.
2. Open `taskchampion.sqlite3` with a generic SQLite tool and record whether tasks, annotations, and history are readable without Taskwarrior.
3. Build a 2.x data set, run `task import-v2 rc.hooks=0`, and compare against the 2.x `export`. Check recurrence, dependencies, undo history, and configuration.
4. Sync two replicas through a local or self-hosted TaskChampion server, edit the same task on both, and observe the conflict result. Restore from the server into a third clean profile.
5. Check whether an older 3.x opens a database written by 3.5.0.
6. Not read: the JSON format document on GitHub, the import command page (404 on the URL tried), the hooks v1 page, the sync server project documentation, `upgrade-3` details beyond the summary, and the repository LICENSE file. No release date was shown on the GitHub README summary or in the ChangeLog summary.
7. Confirm in the docs whether Taskwarrior makes any network call other than `task sync`, and whether the project states a succession or governance plan.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-3/README.md#taskwarrior); [actual assessment](../../content/directory/taskwarrior.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The independently parsed import literals expose five task UUIDs and basic dates/status, while the source exports selected attributes and updates existing UUIDs on import. Full recurrence, annotations, UDAs, dependencies, history and TaskChampion database reconstruction remain unverified; a filtered task listing is not complete profile recovery.
- E5: Not Verified. Purge is limited to deleted tasks and uses permission/relation handling; undo previews operations, is confirmation-configurable and can refuse reversal after intervening operations. These controls do not establish effective settings, import/sync/hook authority and complete correction across the existing recurring multi-replica task workflow.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish a usable alternative task workflow preserving recurrence, dependency graphs, annotations, UDAs and dates. Selected-task JSON serialization and import-UUID source behavior do not complete that migration comparison.

- [x] Resolved: The purge command selects already-deleted tasks and calls the permission path before purging them. Recurrence templates with live children are rejected; dependent-task links can be removed during relation handling. This is not an append-only operation or proof that every setting forces an interactive prompt. [Pinned source](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdPurge.cpp).
- [x] Resolved: Undo renders the operations and old/new property values to be reverted, requests confirmation unless its setting disables that prompt, and reports if other operations prevent committing the reversal. This does not establish indefinite history, post-sync undo or recovery of every purged payload. [Pinned source](https://github.com/GothenburgBitFactory/taskwarrior/blob/c280c347c1adc47e9bb1ad42c92958e2d7f92e9c/src/commands/CmdUndo.cpp).

Remaining: TaskChampion SQLite interpretation, full recurrence/annotation/UDA/dependency round trips, exact date/history preservation, actual duplicate-UUID updates, 2.x migration and multi-replica sync recovery. E5 also needs effective confirmation/recurrence settings, import/sync/hook control and post-sync/purge correction boundaries; the inspected undo preview is not indefinite recoverability.

Next without a local installation: Obtain a populated synthetic TaskChampion backup and full JSON export with expected recurrence/UDA/annotation/dependency/date records; independently compare them and reuse version-matched import/delete/purge/undo/sync observations.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

# Logseq: documentation review

Reviewed 22 October 2026 from the logseq/docs repository (db-version.md, db-version-changes.md), the logseq/logseq repository (README, LICENSE.md, Releases), and the logseq.com privacy page only. Latest release shown on the Releases page: 2.0.2, titled "Desktop APP 2.0.2 (Beta Testing)", dated "07 Oct" (the page omits the year in the listing; asset timestamps indicate 2026). Licence: AGPL-3.0. The content page's "docs.logseq.com" root was not read. All facts below come from page summaries returned by a fetch tool, not from the raw pages, so exact wording is only as reliable as those summaries.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 6](../third-pass/batch-6/README.md#logseq) and reflected in the [application page](../../content/directory/logseq.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The DB exporter has explicit options for UUIDs, timestamps, shallow copies and ontology exclusion. Node/property/class timestamps are conditional; content-reference exports retain referenced UUIDs, while partial-map merging warns against use for full-graph export. Thus export modes are not equivalent preservation packages. This is a source-level distinction, not an executed Markdown/EDN/SQLite migration.
- [x] Resolved: The Node SQLite backup helper calls the SQLite backup API, removes the destination file when synchronous or asynchronous backup fails, and closes the opened source connection in the file-based wrapper. This identifies error cleanup; it does not establish a complete graph backup including asset files, successful restoration, or safety if a caller supplies an existing destination.

Remaining: A populated DB independently queried, complete asset-inclusive graph export/restore, file-to-DB conversion, task/property/ref fidelity, automatic-backup retention and cross-version outcomes.

## What the documentation says

**Storage and access (E1, E3)**
- Two storage modes exist and must not be conflated. DB graphs use SQLite, stored on desktop at `~/logseq/graphs/GRAPH-NAME/db.sqlite`. File graphs are Markdown (and Org) files. [db-version](https://github.com/logseq/docs/blob/master/db-version.md)
- The DB-version pages "only apply to DB graphs". File graphs have moved to a separate project, logseq/og. The `logseq/` folder inside a graph no longer exists in DB graphs. [db-version-changes](https://github.com/logseq/docs/blob/master/db-version-changes.md)
- The README says the DB version is in beta, warns "data loss is possible", and recommends a dedicated test graph. [README](https://github.com/logseq/logseq)
- Whether the SQLite schema is documented for third-party readers: not found in the docs.

**Exit and migration (E2)**
- Export options: SQLite `.db`, ZIP of DB plus assets, EDN, standard Markdown, public pages, debug transit file. EDN is the only one said to fully capture a graph and be editable. [db-version](https://github.com/logseq/docs/blob/master/db-version.md)
- Markdown export "cannot capture all data" and is unlikely ever to export timestamps or all properties. The same page says EDN is "not yet recommended" as the only backup. [db-version](https://github.com/logseq/docs/blob/master/db-version.md)
- Import from file graphs is supported but changes data: task keywords are remapped (for example LATER to Todo), property types are auto-detected with conflicts resolved to Text, and assets are renamed to UUIDs. Several queries, embeds or quotes in one block import only the first. [db-version](https://github.com/logseq/docs/blob/master/db-version.md)
- Org mode is no longer supported in DB graphs. Zotero, Slides, Whiteboards and Excalidraw are removed from the built-in set. Flashcard data from the previous version is not imported. Some advanced queries need manual rewriting. [db-version-changes](https://github.com/logseq/docs/blob/master/db-version-changes.md)

**Recovery (E3)**
- Desktop keeps automatic backups in a `backups` folder inside the graph directory, the last 12. In the browser, the user picks a folder and backups run hourly, also the last 12. [db-version](https://github.com/logseq/docs/blob/master/db-version.md)
- No re-index exists in DB graphs, unlike file graphs. [db-version-changes](https://github.com/logseq/docs/blob/master/db-version-changes.md)
- Version compatibility rules between DB-graph releases: not found in the docs. The 2.0.1 notes say to back up before testing a beta. [Releases](https://github.com/logseq/logseq/releases)

**Continuing authority (E4) and dependencies**
- Licence AGPL-3.0. [LICENSE.md](https://github.com/logseq/logseq/blob/master/LICENSE.md)
- No governance, succession or maintenance-continuity statement was found. The README links CONTRIBUTING.md and Open Collective as the funding channel; stable builds update "days or weeks" apart. [README](https://github.com/logseq/logseq)
- Graphs and backups are local. Sync and Publish are separate: Sync is described as paid via Open Collective tiers, can be self-hosted, and needs an encryption password. RTC sync is alpha and uses a sign-up form. Publish needs an account used with Sync. [db-version](https://github.com/logseq/docs/blob/master/db-version.md), [README](https://github.com/logseq/logseq)
- Telemetry, analytics and update checks: not found in the docs read. The privacy page fetch returned only a headline calling Logseq "privacy-first", with no detail. [privacy](https://logseq.com/privacy-policy)
- Only plugins configured with no "effect" are usable in DB graphs. [db-version-changes](https://github.com/logseq/docs/blob/master/db-version-changes.md)

**Consequential operations (E5)**
- Ordinary deleted pages are recycled for up to 30 days. Tags, properties and today's journal are deleted permanently and cannot be recovered. Deleting a property choice also deletes it from all blocks using it. [db-version](https://github.com/logseq/docs/blob/master/db-version.md)
- EDN imports can be reverted with Cmd-Z, and MCP changes are undoable. [db-version](https://github.com/logseq/docs/blob/master/db-version.md)
- Scripts can now write to graphs; with file graphs they could only read. The MCP server uses an authorization token. [db-version-changes](https://github.com/logseq/docs/blob/master/db-version-changes.md)

## Gaps to test or read next
1. Build a synthetic graph (nested blocks, block references, queries, tasks, properties, assets). Export as EDN, SQLite, ZIP and Markdown. Reopen each in a clean install and diff what is lost.
2. Open `db.sqlite` in a generic SQLite viewer and check whether content, properties and timestamps are readable without Logseq.
3. Run the file-to-DB import on the synthetic graph and compare task statuses, property types, asset names and block references before and after.
4. Restore one of the 12 automatic backups after deliberately deleting a tag, a property and a journal page; confirm what is unrecoverable.
5. Open a graph saved by 2.0.2 in an older and a newer build to test version compatibility.
6. Read db-version-changes.md fully for the file-graph support timeline, the logseq/og repository, and docs.logseq.com subpages.
7. Not found: schema documentation, telemetry and update-check statements, governance or succession text, and a real privacy policy body (the privacy fetch returned only a headline).

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-7/README.md#logseq); [actual assessment](../../content/directory/logseq.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Exporter UUID/timestamp/ontology options and SQLite backup failure cleanup are concretely described in source. No populated graph including assets, properties, references and file-to-DB conversion has been independently reconstructed. A successful database-copy mechanism alone does not establish complete graph semantics or safe existing-destination recovery.
- E5: Not Verified. Backup failure cleanup can remove its destination, while the collected evidence does not establish effective caller destination safety, plugin authority, synchronization-conflict control or inspectable correction for DB graph mutations. Export options and source error handling are not whole-workflow oversight.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: A populated DB independently queried, complete asset-inclusive graph export/restore, file-to-DB conversion, task/property/ref fidelity, automatic-backup retention and cross-version outcomes. E5 needs caller destination safety, plugin and DB-sync authority, change inspection and recovery/retention boundaries.

Next without a local installation: Acquire a synthetic populated graph DB plus assets and complete export-option manifest; inspect it independently and seek same-version caller, backup-retention, plugin and sync conflict evidence.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

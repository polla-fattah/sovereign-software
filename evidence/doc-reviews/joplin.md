# Joplin: documentation review

Reviewed 22 October 2026 from the Joplin help pages and privacy page on joplinapp.org and the project repository on GitHub only. Latest release shown: v3.7.21, dated "25 Sep 21:31" on the releases page, which omits the year. Licence: AGPL-3.0-or-later by default, with separate LICENSE files in some subdirectories. Every page below was read through a page-to-text summarising fetch, so statements are marked where they rest on a summary.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

Follow-up, 23 October 2026: two questions are now resolved in the [third-pass evidence](../third-pass/README.md#joplin) and reflected in the [application assessment](../../content/directory/joplin.md). The review below preserves the earlier documentation record; its gap list is superseded where the follow-up answers it.

**Storage and access (E1, E3)**
- The README says "The notes are in Markdown format" and that the app is offline first. [GitHub README](https://github.com/laurent22/joplin)
- The FAQ refers to "the Joplin sqlite database". The docs pages read do not describe the profile directory, the table layout, or how to read the database with other tools (not found in the docs). [FAQ](https://joplinapp.org/help/faq)
- Sync targets listed: Joplin Cloud, Nextcloud, S3, WebDAV, Dropbox, OneDrive, or the local filesystem. The sync page does not describe the on-target file format (not found on that page). [sync](https://joplinapp.org/help/apps/sync)

**Exit and migration (E2)**
- Export formats: JEX, raw, HTML, PDF. JEX is a tar file the page calls "a lossless format", keeping metadata such as geo-location, updated time and tags, and it can be re-imported. Raw has the same content as JEX, saved as one file per item in a directory. [import and export](https://joplinapp.org/help/apps/import_export/)
- Markdown export is not listed on that page, although the Joplin entry assumes it. What HTML and PDF lose is not described. [import and export](https://joplinapp.org/help/apps/import_export/)
- Import sources: ENEX, Markdown files or directories, OneNote, and other apps via ENEX, HTML or Markdown. ENEX import drops OCR data, may lose colours and fonts, and guesses note links by title, which may fail. The OneNote ZIP route "may not work" for notebooks over 2-4 GB. [import and export](https://joplinapp.org/help/apps/import_export/)

**Recovery (E3)**
- The FAQ advises making a backup, "Export to a JEX archive for example", and copying the database before restore work. No restore procedure for a raw or JEX archive was found, and no statement on opening a database from an older or newer version (not found in the docs). [FAQ](https://joplinapp.org/help/faq)
- The releases page for v3.7.21 mentions no migration steps or breaking changes. [releases](https://github.com/laurent22/joplin/releases/latest)
- Encryption: enabling creates a master key "secured by your password". The password "cannot be recovered". [end-to-end encryption](https://joplinapp.org/help/apps/sync/e2ee)

**Continuing authority (E4) and dependencies**
- The privacy page says the apps "do not send any data to any service without your authorisation". Auto-update checks are on by default (contacting `objects.joplinusercontent.com`) and can be turned off. Geo-location lookup, spellchecker dictionary downloads, OCR language downloads and the plugin repository list are also fetched by default. Crash reporting is off by default. No account is described for local use. [privacy](https://joplinapp.org/privacy)
- Licence: AGPL-3.0-or-later; logos need permission; "Joplin" is a registered trademark of JOPLIN SAS. [LICENSE](https://github.com/laurent22/joplin/blob/dev/LICENSE)
- Governance: the repository is owned by laurent22, the FAQ footer names Laurent Cozic as copyright holder, and a CLA consent page and warrant canary exist (contents not read). No succession or maintenance-continuity statement was found. [GitHub](https://github.com/laurent22/joplin), [FAQ](https://joplinapp.org/help/faq)

**Consequential operations (E5)**
- A deleted note "is moved to the trash". The trash page does not state retention or auto-delete behaviour (not found on that page). [trash](https://joplinapp.org/help/apps/trash)
- Note history keeps revisions 90 days by default; deleting old revisions syncs to all devices. The page does not state whether history is on by default. Restore copies the old version to a separate notebook and does not overwrite the current note. [note history](https://joplinapp.org/help/apps/note_history)
- Conflicts: the local copy goes into a Conflict notebook and the remote note replaces the local one. [conflicts](https://joplinapp.org/help/apps/conflict)
- E2EE warning: do not enable it on several devices in parallel, and do not cancel the first sync. Disabling is done on each device one by one. [end-to-end encryption](https://joplinapp.org/help/apps/sync/e2ee)

## Gaps to test or read next
1. Export a 200-note synthetic library (nested notebooks, tags, links, attachments, checklists) as JEX, raw, Markdown and HTML. Import each into a clean profile and compare IDs, hierarchy, tags, timestamps, internal links and attachments.
2. Open the SQLite database with a generic tool and check whether notes, tags and resource files can be reconstructed without Joplin.
3. Enable E2EE, sync to a local directory, then try reading the target without the password. Test restore after deleting the master key.
4. Edit one note on two disconnected profiles, reconnect, and confirm the Conflict notebook keeps both versions.
5. Empty the trash, then check whether history or sync still holds the note.
6. Restore a backup made with one version into a newer and an older release.
7. Not read: the sync specification pages, terminal application page, plugin pages, backup or profile-location pages, the Warrant Canary, the CLA page, and the releases changelog history. Release year, maintenance or succession statements, and the Markdown export page were not found.

## Rating reconciliation: 23 October 2026

This dated follow-up supersedes the earlier rating freeze, not the historical observations above. [Individual decision and coverage](../rating-reconciliation/batch-2/README.md#joplin); [actual assessment](../../content/directory/joplin.md).

- E3: Not Verified. JEX/raw implementation and inspected import assertions explain serialized items, resource copying, new IDs and rewritten links, but no populated 200-note profile was independently reconstructed. Complete notebook/tag/link/resource relationships and the declared encrypted/offline-conflict recovery scenario remain unverified; package structure alone is not meaningful restoration.
- E5: Not Verified. Pinned source adds concrete trash controls: desktop empty-trash asks for confirmation before calling deletion; restore clears deletion state with explicit missing-parent handling; automatic deletion is setting-gated, uses a configured age and logs selected items. These are positive controls, not a complete account of sync conflicts, encryption changes, transmission or recovery after permanent deletion.
- Longevity and Transparency and Control: Not assessed; their E3/E5 minimums are not established.
- Sovereignty: Not assessed because E2 is Not Verified. Native import ID remapping and upstream assertions do not establish the declared collection's usable transition into an independent notes workflow. The earlier E2 Pass is withdrawn to Not Verified until essential hierarchy, links, tags, timestamps and attachments are compared in an actual alternative representation.

- [x] Resolved: Desktop empty-trash displays a permanent-deletion confirmation and calls the trash deletion service only when accepted. The service invokes note/folder deletion; this is not evidence that history or synchronized copies can recover a permanent deletion. [Pinned source](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/app-desktop/commands/emptyTrash.ts).
- [x] Resolved: Trash restoration clears deleted_time and restores the parent when available. Missing/deleted parents use either an explicitly requested restore folder or an empty parent ID, unless a target folder is supplied; folder restoration recurses into children. [Pinned source](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/trash/restoreItems.ts).
- [x] Resolved: Automatic trash deletion exits when its enable setting is false, reads an age setting, logs selected items and excludes share-read-only items. It auto-deletes folders only when empty. Inspected setup schedules periodic processing; default setting values and cross-device consequences were not established here. [Pinned source](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/trash/permanentlyDeleteOldItems.ts).

Remaining: A populated JEX/raw export with expected notebook/tag/link/resource relationships, independent reconstruction and encrypted/offline-conflict recovery records remain missing. For E5, record sync conflicts, encryption transitions and recovery boundaries after permanent deletion. Trash confirmation, missing-parent restore handling and setting-gated automatic deletion are now answered in source.

Next without a local installation: Acquire a synthetic JEX/raw export plus expected relationship and resource hashes; reconstruct it with archive/text/SQLite tools already available. Add externally recorded two-profile conflict and encryption/recovery results for the pinned version. No real notes or private recovery credentials are needed.

Source branches were inspected, not run. Hashes and the Anki/Zotero fixture queries were independently rechecked with Python/SQLite. No target app or upstream test suite was executed. Existing E1/E4/Locality findings were outside this targeted re-certification.

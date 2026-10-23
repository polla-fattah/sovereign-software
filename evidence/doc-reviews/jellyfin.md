# Jellyfin: documentation review

Reviewed 22 October 2026 from the Jellyfin documentation (jellyfin.org/docs), the jellyfin.org site and release post, and the jellyfin/jellyfin GitHub repository only. Latest stable release found: 10.11.11, shown on GitHub as "06 Jun 16:18" with no year, so the date is unconfirmed (a search index listed it as the most recent, which may lag). The server downloads page returned 404 and the website shows only a "Current Release" badge, so no version or date was read there. Licence: the repository README lists GPL-2.0; the website says "GNU GPL" without a version.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 11](../third-pass/batch-11/README.md#jellyfin) and reflected in the [application page](../../content/directory/jellyfin.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The NFO saver writes favourite/rating/playcount/watched/last-played/resume fields for the one configured UserId, returning early when no valid user is selected. NFO can carry selected user state, but this is not an export of every user's records or a substitute for a complete database backup.
- [x] Resolved: Restore rejects a manifest from a newer server and requires an exactly matching backup-engine version in the inspected implementation. It then overwrites extracted files and, when database restoration is selected, purges target tables before loading records. These guards and destructive steps are concrete source findings, not a successful restore or universal rollback guarantee.

Remaining: Same-version/cross-host recovery, complete archive coverage, media-byte preservation, per-user comparison, delete-media scope and observed network behavior remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- The database is SQLite, by default `<Data Directory>/jellyfin.db`. Configuration includes `database.xml` and `logging.json`, and the docs say tuning options are "not a stable API" and can corrupt the database. [configuration](https://jellyfin.org/docs/general/administration/configuration/)
- The 10.11.0 post says library data moved from the legacy `library.db` into `jellyfin.db` with relational keys, and the old file is renamed `library.db.old`. The docs found do not publish a schema or say other tools may read it. [10.11.0 post](https://jellyfin.org/posts/jellyfin-release-10.11.0/)
- Media files stay in the user's folders. Local `.nfo` files (Kodi-style XML) are always read and take priority over remote providers; reading cannot be turned off. [NFO](https://jellyfin.org/docs/general/server/metadata/nfo/)
- Writing `.nfo` files is off by default and enabled by selecting "Nfo saver" in library settings. Artwork paths are written only if "save image paths" is on. [NFO](https://jellyfin.org/docs/general/server/metadata/nfo/)

**Exit and migration (E2)**
- Metadata can be exported into media folders only through the optional NFO saver, which writes a defined set of tags (title, IDs, cast, ratings, dates, genres). The tag list "may not be exhaustive" for reading. What is lost (users, watch state, collections, trickplay) was not found in the docs. [NFO](https://jellyfin.org/docs/general/server/metadata/nfo/)
- Watch-state import from `.nfo` supports one user only. [NFO](https://jellyfin.org/docs/general/server/metadata/nfo/)
- The built-in restore "only works on the system where the backup was made" and is not a migration tool for other operating systems or containers (per the release post). [10.11.0 post](https://jellyfin.org/posts/jellyfin-release-10.11.0/)
- Migration to another media server: not found in the docs.

**Recovery (E3)**
- Built-in backup is a single zip in the data directory's backups folder. The database is always included; metadata, subtitles, and trickplay are optional. Restore is from the Dashboard or with `--restore-archive`. [backup and restore](https://jellyfin.org/docs/general/administration/backup-and-restore/)
- Manual backup copies the whole data and config directories with the server stopped, otherwise the database may be locked and unrecoverable. [backup and restore](https://jellyfin.org/docs/general/administration/backup-and-restore/)
- There is no downgrade path: once a newer version applies migrations, data no longer works with the older one. Restoring a pre-upgrade backup is the only way back, and a manual restore may need the same version. [backup and restore](https://jellyfin.org/docs/general/administration/backup-and-restore/)
- Upgrading to 10.11.0 is supported only from 10.10.7 (10.9.11 "may work"); other versions "WILL fail". Migrations can take hours and must not be interrupted. [10.11.0 post](https://jellyfin.org/posts/jellyfin-release-10.11.0/)
- The built-in backup checks for at least 5 GB free space, which may be too little with subtitles and trickplay. [backup and restore](https://jellyfin.org/docs/general/administration/backup-and-restore/)

**Continuing authority (E4) and dependencies**
- The website says Jellyfin "has no tracking, phone-home, or central servers collecting your data". No formal privacy policy page was found; this rests on a search summary of the home page plus a direct fetch. [jellyfin.org](https://jellyfin.org/)
- The configuration page does not mention telemetry, accounts, or update checks. Whether the server checks for updates was not found in the docs (the updates page returned 404). [configuration](https://jellyfin.org/docs/general/administration/configuration/)
- Default metadata providers are TMDb, OMDb, and local NFO; others (TheTVDB, fanart.tv, AniDB) come from the plugin catalog. The docs do not detail what is sent. [metadata](https://jellyfin.org/docs/general/server/metadata/)
- The README describes Jellyfin as descended from Emby 3.5.2 and says there are "no premium licenses or features". No governance model, maintainer roster, or succession statement was found. [GitHub](https://github.com/jellyfin/jellyfin)
- Internal TLS is deprecated, with removal planned for 10.12.0. [10.11.0 post](https://jellyfin.org/posts/jellyfin-release-10.11.0/)

**Consequential operations (E5)**
- Users documentation states the delete-media permission "will also remove them from the filesystem". If the server lacks write permission, files vanish only until the next scan. [users](https://jellyfin.org/docs/general/server/users/)
- The libraries page says libraries can be added or removed at any time but does not say what removal does to files. [libraries](https://jellyfin.org/docs/general/server/libraries/)
- NFO overwrite behavior when saving is not stated. [NFO](https://jellyfin.org/docs/general/server/metadata/nfo/)
- Upgrade guidance: stop the server and back up data and config first. [10.11.0 post](https://jellyfin.org/posts/jellyfin-release-10.11.0/)
- Undo or recycle-bin behavior for deletion: not found in the docs.

## Gaps to test or read next
1. With a synthetic library, enable the NFO saver and diff the written files against the database: which fields, users, and watch states are missing.
2. Create a backup on 10.11.x, restore on a clean install of the same version, and compare library, users, and playback state.
3. Attempt to restore that backup on a different OS or container, and onto one version older, to confirm the stated limits.
4. Open `jellyfin.db` read-only with a SQLite client and see whether the tables are intelligible without Jellyfin.
5. On a copy, use the delete-media action on an episode and an extras item and record exactly which files disappear.
6. Capture outbound network traffic with metadata providers on and off.
7. Not read: the release date with year, the updates page (404), the plugin and privacy statements, server downloads page (404), any governance or succession page, and the GPL version question.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-11/README.md#jellyfin); [actual assessment](../../content/directory/jellyfin.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. NFO export can carry selected state for one configured user, not every user's records. Complete version-compatible database/config/metadata/subtitle/archive reconstruction, media preservation and cross-host per-user comparison are not demonstrated.
- E5: Not Verified. Restore has explicit server/backup-engine version guards and destructive extraction/table-replacement steps. Those code paths do not establish effective role/target approval, delete-media scope, inspectable user-state changes and available recourse across the server workflow.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Same-version/cross-host recovery, complete archive coverage, media-byte preservation, per-user comparison, delete-media scope and observed network behavior remain untested. E5 needs restore/target and delete-media/user authority, clear destructive-state boundaries and independent recovery evidence.

Next without a local installation: Inspect a synthetic complete server backup plus media/config manifests and expected per-user records, then obtain same-version cross-host restore and permission/delete-media observations with explicit rollback material.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

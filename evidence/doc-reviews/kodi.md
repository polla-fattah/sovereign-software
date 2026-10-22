# Kodi: documentation review

Reviewed 22 October 2026 from the xbmc/xbmc repository (README, releases page, GitHub releases API) and, only as search-result summaries, the Official Kodi Wiki. The kodi.wiki pages returned HTTP 403 to direct fetches (Backup, Import-export library, Databases, Userdata), and kodi.tv failed with a certificate error (download page, privacy policy). Those topics are therefore unknown unless marked as resting on a summary. Latest stable release: v21.3-Omega, published 2025-10-31 per the GitHub releases API; the releases page shows "31 Oct" with no year. The latest pre-release is v22.0rc1-Piers (27 Sep, year omitted). Licence: the README says "GPLv2 licensed."

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- Library state and settings live in the user's data folder. Direct reading of the Backup, Databases, and Userdata wiki pages failed (403), so the SQLite claim in the entry, the database file names, and the folder layout are not confirmed here. [Backup](https://kodi.wiki/view/Backup) (not read)
- Summary only: search-result text for the wiki says a file-level backup is a copy of the userdata folder, and that where several versions of a database file exist the highest-numbered one is usually current. That text comes from a forum thread described as old, not from a wiki page I read. [forum thread](https://forum.kodi.tv/showthread.php?tid=264476)
- The releases page says the MySQL/MariaDB default charset changed to utf8mb4 in v22.0a3, so a shared database is also a supported storage option. [releases](https://github.com/xbmc/xbmc/releases)

**Exit and migration (E2)**
- Summary only: the wiki offers two library exports. "Separate files" writes NFO metadata (and optionally artwork) beside each media item. "Single file" writes `videodb.xml` into a folder named `xbmc_videodb_yyyy-mm-dd` and is described as not recommended. [Import-export library/Video](https://kodi.wiki/view/Import-export_library/Video) (not fetched, search summary)
- Summary only: a single-file export keeps the original paths, so moving files afterward creates dead library entries. [Import-export library/Video](https://kodi.wiki/view/Import-export_library/Video)
- Summary only: re-importing separate NFO files goes through the normal scan or "Update Library", and the Import button applies only to single-file exports. [Import-export library/Video](https://kodi.wiki/view/Import-export_library/Video)
- Summary only: the music export does not include core tag data, which is read from the music files themselves. [Import-export library/Music](https://kodi.wiki/view/Import-export_library/Music)
- What is lost in either export (watched state, resume points, add-on settings, profiles): not found in the docs I could read.

**Recovery (E3)**
- Summary only: the wiki describes a Backup add-on that can export the database, playlists, thumbnails, add-ons, and other configuration to a writable location or Dropbox, on demand or scheduled. [Add-on:Backup](https://kodi.wiki/view/Add-on:Backup)
- Summary only: MySQL databases are backed up with `mysqldump` or similar tools, and restore needs no special settings. [MySQL/Backup and restore databases](https://kodi.wiki/view/MySQL/Backup_and_restore_databases)
- Version compatibility of a userdata backup across Kodi versions: not found in the docs I could read. The search summary only repeats a forum warning that cross-version restores can cause problems.
- The releases page notes "Kodi is incompatible with MySQL 9.6" in v22.0a3, fixed in the v22.0b1 notes, and v22.0b2 added an error for compressed savestates from v23 loaded in v22. [releases](https://github.com/xbmc/xbmc/releases)
- The releases page was read to character 100000 of 117302; the last part was not read.

**Continuing authority (E4) and dependencies**
- The README says Kodi is "a non-profit project run by the XBMC Foundation" developed by volunteers, with donations paying for conference travel and legal fees. It describes support as relying on volunteer contributors. No succession statement was found. [README](https://github.com/xbmc/xbmc)
- Licence: GPLv2 per the README. The full LICENSE.md text was linked but not read. The README makes no trademark statement. [README](https://github.com/xbmc/xbmc)
- Build system is CMake, and platforms listed are Android, Linux, BSD, macOS, iOS, tvOS, and Windows. [README](https://github.com/xbmc/xbmc)
- Accounts, telemetry, update checks, and the privacy policy: not found in the docs (kodi.tv failed with a certificate error).
- The releases page records that Python was upgraded to 3.14.x in the v22 line and an `xbmc.__version__` restored to 3.1.0, so add-ons depend on a versioned Python API. It states no specific add-on breakage. [releases](https://github.com/xbmc/xbmc/releases)

**Consequential operations (E5)**
- Deletion, overwrite, and undo behavior for the library: not found in the docs I could read.
- Summary only: the NFO export has an option to overwrite existing NFO files and artwork. [Import-export library/Video](https://kodi.wiki/view/Import-export_library/Video)
- Warnings on destructive library commands (clean library, remove source, delete file from the UI): not found in the docs.

## Gaps to test or read next
1. Read the four 403 wiki pages by another route (a different network, or the repository's wiki mirror if one is official): Backup, Databases, Userdata, Import-export library.
2. With a synthetic library of 10 movies and 3 shows, open `MyVideos*.db` in a SQLite browser, list the tables, and check whether titles, paths, watched state, and resume points are readable without Kodi.
3. Export as separate files and as a single file, wipe the profile, re-import each into a clean install, and compare watched state, ratings, artwork, and collections.
4. Back up the userdata folder on 21.3, restore it into 22.0rc1 and then back into 21.3, and record whether the older version opens the upgraded database.
5. Run Clean Library and Remove Source on the synthetic data and note which prompts appear and what files change on disk.
6. Read kodi.tv privacy policy and the LICENSE.md text, and check offline behavior with the network disabled (update checks, scraper calls, add-on repository lookups).
7. Confirm the stable release year from the Kodi download page (failed with a certificate error) and read the last 17302 characters of the releases page.

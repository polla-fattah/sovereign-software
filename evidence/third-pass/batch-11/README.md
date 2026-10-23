# Third pass, batch 11

Reviewed 23 October 2026, Asia/Baghdad. 12 bounded questions are resolved across 6 applications. All findings are copied into the actual application pages; broader unknowns remain open.

## Method and reproduction

Run from the repository root:

```powershell
python evidence/third-pass/inspect_remaining.py 11
```

[inspection-plan.json](inspection-plan.json) identifies pinned source revisions and inputs. [artifact-results.json](artifact-results.json) records retained-file SHA-256 hashes, Git-object checks where available, observed structures, source locations and environment. Downloaded application implementation code is not imported or run. Published schema DDL, when explicitly identified, is instantiated in SQLite; document code blocks are not evaluated. Archives are inspected in memory; historical samples retain their historical scope. Source-anchor matches locate reviewed code, not successful application tests or CI runs. No target application was installed. Any use of an already available runtime is identified explicitly in the findings and result record; source inspection is not reported as an application run. Upstream licensing and copyright continue to apply to the retained files.

At the user's request, existing eligibility and principle ratings are preserved exactly. E3/E5 decisions, principle reconciliation and invalid/blank-status corrections are deferred to the next pass. A resolved sub-question does not establish whole-application compliance.

<a id="shotcut"></a>

## Shotcut

- [x] Resolved: The XML checker resolves relative media against the project directory, collects missing local resources and rewrites selected replacement paths. A changed resource hash resets stream indices and selected metadata. Relinking can therefore alter project interpretation rather than simply restore a missing filename. [Inspected source/input](https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/mltxmlchecker.cpp).
- [x] Resolved: Autosaves are .mlt files under the application-data autosave directory with an MD5-derived managed-name filename. The helper removes its file on destruction or managed-file change and can locate an existing stale file. This identifies a transient recovery mechanism, not a durable versioned backup or a successful crash-recovery test. [Inspected source/input](https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/autosavefile.cpp).

Remaining: A complex timeline reopened/rendered independently, filter/proxy closure, actual crash recovery, older-version opening and media consolidation remain untested.

<a id="reaper"></a>

## REAPER

- [x] Resolved: The official extension SDK defines line-oriented ProjectStateContext AddLine/GetLine interfaces and an explicit project-import interface that generates RPP-compatible state. This establishes an exposed textual project-state interface, not a complete public specification or independent decoding of plugin chunks. [Inspected source/input](https://github.com/justinfrankel/reaper-sdk/blob/c0eafe87863b2bf69c5c822760f1b32a753b211b/sdk/reaper_plugin.h).
- [x] Resolved: The SDK separates save/load, undo/redo and cut/copy context flags. Its project-config extension contract says plugins may choose whether to save undo state and ties it to the relevant undo-state flag. Undo coverage for arbitrary extensions therefore cannot be assumed from the existence of REAPER's general undo command. [Inspected source/input](https://github.com/justinfrankel/reaper-sdk/blob/c0eafe87863b2bf69c5c822760f1b32a753b211b/sdk/reaper_plugin.h).

Remaining: Actual RPP/plugin-state inspection, backup/autosave defaults, clean-host consolidation, stem equivalence, version compatibility and evaluation-license behavior remain untested; the proprietary core was not inspected.

<a id="kodi"></a>

## Kodi

- [x] Resolved: The export code distinguishes a dated videodb.xml folder with artwork directories from per-item NFO export; import reads that XML and reconstructs source paths only when the scraper add-on exists. The import code explicitly notes scraper settings are not exported. This route is therefore not demonstrated to recreate an entire profile. [Inspected source/input](https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp).
- [x] Resolved: Library cleanup distinguishes absent files under reachable sources from unavailable source directories. For unavailable sources, silent mode retains entries; interactive mode can ask, while missing files under reachable parents can be removed from the database without asking. This concerns library records/history, not an assertion that Clean Library deletes media bytes. [Inspected source/input](https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp).

Remaining: Watched/resume/artwork round-trip comparison, independent database reading, profile migration/downgrade and observed cleanup/source-removal behavior remain untested.

<a id="koreader"></a>

## KOReader

- [x] Resolved: Sidecars are located beside the book, under a separate document-settings tree, or in a partial-MD5-based hashed tree, and use metadata.<suffix>.lua names. The inspected JSON exporter copies each supplied entry's first record plus selected book fields, not the entire sidecar/settings object. Book-only copying and highlight export are therefore distinct recovery scopes. [Inspected source/input](https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua).
- [x] Resolved: Sidecar loading actually invokes dofile inside pcall; error-catching is not a sandbox for arbitrary Lua code. Writing serializes settings and maintains a .old backup before replacement, with candidate priority rules. Recovery should inspect untrusted sidecars without executing them; no generic Lua execution was performed in this review. [Inspected source/input](https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua).

Remaining: Actual cross-device/hash-mode migration, annotation-field comparisons across export formats, PDF checksum changes, release compatibility and backup restoration remain untested.

<a id="mpv"></a>

## mpv

- [x] Resolved: Watch-later filenames are derived from the media path (or basename with the corresponding option), while contents use readable option=value lines and length-quoted strings. Only configured watch-later options are saved, changed values are selective, and unseekable/unknown-time input does not save a start position. This is not a whole-player configuration backup. [Inspected source/input](https://github.com/mpv-player/mpv/blob/01a7420cbb4bfcb3ae275b864a8a734c61ee8831/player/configfiles.c).
- [x] Resolved: Resume loading can be disabled and optionally rejects state when media modification time differs; it preserves command-line option precedence when loading the state file. The separate deletion function unlinks watch-later entries and parent redirects. A retained state file is therefore neither an immutable history nor a guaranteed replay on a renamed/moved media path. [Inspected source/input](https://github.com/mpv-player/mpv/blob/01a7420cbb4bfcb3ae275b864a8a734c61ee8831/player/configfiles.c).

Remaining: Actual playback/cross-machine restore, version-option migration, scripts/subprocess/network observation and output/cache overwrite behavior remain untested.

<a id="jellyfin"></a>

## Jellyfin

- [x] Resolved: The NFO saver writes favourite/rating/playcount/watched/last-played/resume fields for the one configured UserId, returning early when no valid user is selected. NFO can carry selected user state, but this is not an export of every user's records or a substitute for a complete database backup. [Inspected source/input](https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/MediaBrowser.XbmcMetadata/Savers/BaseNfoSaver.cs).
- [x] Resolved: Restore rejects a manifest from a newer server and requires an exactly matching backup-engine version in the inspected implementation. It then overwrites extracted files and, when database restoration is selected, purges target tables before loading records. These guards and destructive steps are concrete source findings, not a successful restore or universal rollback guarantee. [Inspected source/input](https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/Jellyfin.Server.Implementations/FullSystemBackup/BackupService.cs).

Remaining: Same-version/cross-host recovery, complete archive coverage, media-byte preservation, per-user comparison, delete-media scope and observed network behavior remain untested.


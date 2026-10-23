# Rating reconciliation, batch 11

Reviewed 24 October 2026. Each application below was evaluated individually against its existing essential-record and version scope. No target application was installed, built or run.

## Outcome

All 6 retain **Insufficient evidence**. E3/E5 remain **Not Verified** for the specific missing coverage below, not automatically Pass from documentation and not Fail from missing evidence. Positive dependent principles lacking their minimum are corrected. Existing E1/E4/Locality findings are not re-certified by this targeted pass.

[Plan](plan.json), [individual decisions and change ledger](decisions.json), [directory-wide review sequence](../remaining-plan.json), [current application index](../../application-index.md).

0 additional bounded source questions are resolved in this batch. Earlier resolved questions remain resolved and are not counted again. Source locators are provenance aids, not executed-behavior assertions.

<a id="shotcut"></a>

## Shotcut

Version/scope: Pinned evidence 34dde4fce394652c00d8f7af9ac2ce37dab1ed92.

**E3: Not Verified.** The XML checker resolves and rewrites missing resource paths, and changed hashes reset selected stream/metadata state. No complete timeline/media/filter/proxy packet has been independently reconstructed with equivalent interpretation or rendering. Relinking source logic alone does not establish project survival. [Source context](https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/mltxmlchecker.cpp).

**E5: Not Verified.** Autosave lookup and removal identify transient recovery files, not durable version history. Effective save/overwrite, media relink, filter/script authority and usable correction after failed edits or autosave cleanup remain insufficiently covered. [Source context](https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/autosavefile.cpp).

**Remaining:** A complex timeline reopened/rendered independently, filter/proxy closure, actual crash recovery, older-version opening and media consolidation remain untested. E5 needs save/relink/overwrite and filter/script controls, inspectable changes and actual transient-autosave correction boundaries.

**Next without a local installation:** Inspect a synthetic full project/media/proxy/filter packet with expected timeline and reference output; obtain same-version relink/save/autosave recovery records from upstream or another assessor.

[Actual assessment](../../../content/directory/shotcut.md) | [review note](../../doc-reviews/shotcut.md).

<a id="reaper"></a>

## REAPER

Version/scope: Pinned evidence c0eafe87863b2bf69c5c822760f1b32a753b211b.

**E3: Not Verified.** The SDK exposes textual project-state/import interfaces but does not fully specify proprietary-core or arbitrary plugin chunks. Complete RPP/media/plugin/automation reconstruction and compatible offline continuation have not been independently demonstrated. [Source context](https://github.com/justinfrankel/reaper-sdk/blob/c0eafe87863b2bf69c5c822760f1b32a753b211b/sdk/reaper_plugin.h).

**E5: Not Verified.** SDK save/load and undo context flags explicitly allow extensions to choose saved undo state. Those contracts are not full evidence of effective script/plugin authority, destructive media operations, consolidation/output overwrite and correction in the assessed core/configuration. [Source context](https://github.com/justinfrankel/reaper-sdk/blob/c0eafe87863b2bf69c5c822760f1b32a753b211b/sdk/reaper_plugin.h).

**E2 correction:** The former E2 Pass does not establish a replacement editable audio workflow preserving routing, automation and plugin-dependent meaning. Consolidated media and rendered stems are useful handoff routes, not the full native-session migration comparison. [Source context](https://dlx.reaper.fm/userguide/html/).

**Remaining:** Actual RPP/plugin-state inspection, backup/autosave defaults, clean-host consolidation, stem equivalence, version compatibility and evaluation-license behavior remain untested; the proprietary core was not inspected. E5 needs core/configuration-specific plugin/script and media/save/export control, with explicit extension undo and backup limits.

**Next without a local installation:** Inspect a synthetic RPP/media/extension-state packet and dependency manifest with expected routing/automation/stems; obtain robust same-version independent save/undo/consolidation observations since the proprietary core is not available for source inspection.

[Actual assessment](../../../content/directory/reaper.md) | [review note](../../doc-reviews/reaper.md).

<a id="kodi"></a>

## Kodi

Version/scope: Pinned evidence a097d6978028aef8840b23695a57c606697f156a.

**E3: Not Verified.** Source distinguishes per-item NFO from a dated XML/artwork export and makes reconstruction depend on available scraper add-ons; scraper settings are not exported in that route. Complete watched/resume, profile, settings/add-on and media dependency recovery remains unestablished. [Source context](https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp).

**E5: Not Verified.** Library cleanup treats missing files on reachable sources differently from unavailable sources, with conditional prompts and silent retention. This concerns library records, not automatically media-byte deletion. Effective source/remove/add-on authority and correction of record/history loss remain insufficiently covered. [Source context](https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp).

**Remaining:** Watched/resume/artwork round-trip comparison, independent database reading, profile migration/downgrade and observed cleanup/source-removal behavior remain untested. E5 needs effective cleanup/source/removal settings, add-on authority and recoverable library/history states; record cleanup and media deletion are distinct.

**Next without a local installation:** Use a synthetic profile/database/NFO/artwork/media-reference packet with expected watched/resume records; inspect it independently and obtain same-version cleanup/source/add-on authority and restoration evidence.

[Actual assessment](../../../content/directory/kodi.md) | [review note](../../doc-reviews/kodi.md).

<a id="koreader"></a>

## KOReader

Version/scope: Pinned evidence afff28b107a7ea4ab5867b5e65dd054987ca1d99.

**E3: Not Verified.** Sidecar location varies by adjacent, separate-tree and hashed modes, and the inspected highlight JSON export is not the whole sidecar/settings object. No complete cross-device metadata/annotation reconstruction with checksum/path changes and compatible releases is established. [Source context](https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua).

**E5: Not Verified.** Sidecar loading calls Lua dofile inside error-catching, which is not sandboxing; source also defines replacement/old-backup priorities. Effective trust of imported sidecars, write/backup policy and usable recourse after metadata migration remain insufficiently established. [Source context](https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua).

**Remaining:** Actual cross-device/hash-mode migration, annotation-field comparisons across export formats, PDF checksum changes, release compatibility and backup restoration remain untested. E5 needs safe sidecar trust/execution policy and effective backup/write/migration correction; data inspection must not execute untrusted Lua.

**Next without a local installation:** Inspect synthetic sidecars as text/data only, alongside book hashes and a location/migration manifest; obtain same-version external annotation/move/backup records without executing sidecar code.

[Actual assessment](../../../content/directory/koreader.md) | [review note](../../doc-reviews/koreader.md).

<a id="mpv"></a>

## mpv

Version/scope: Pinned evidence 01a7420cbb4bfcb3ae275b864a8a734c61ee8831.

**E3: Not Verified.** Watch-later serialization preserves selected options with path-derived filenames and conditional positions, not the full player/configuration/script state. Complete playlists, scripts, media paths and cross-version option meaning have not been restored and compared; the existing durable-state scope cannot be treated as stateless merely to skip E3. [Source context](https://github.com/mpv-player/mpv/blob/01a7420cbb4bfcb3ae275b864a8a734c61ee8831/player/configfiles.c).

**E5: Not Verified.** Resume loading/precedence/mtime and state-deletion branches are concrete controls. They do not establish effective script/subprocess/network authority, output/cache overwrite policy or correction across the configured playback and saved-state workflow. [Source context](https://github.com/mpv-player/mpv/blob/01a7420cbb4bfcb3ae275b864a8a734c61ee8831/player/configfiles.c).

**E2 correction:** The former E2 Pass does not establish preservation of the declared saved-state/script/playlist workflow in an independent player. Ordinary media files remain portable, but that narrower fact does not complete the stated profile's migration. [Source context](https://mpv.io/manual/stable/).

**Remaining:** Actual playback/cross-machine restore, version-option migration, scripts/subprocess/network observation and output/cache overwrite behavior remain untested. E5 needs script/subprocess/network and output-write policy plus saved-state deletion/recovery boundaries.

**Next without a local installation:** Inspect synthetic media/playlists/config/scripts/watch-later files with expected paths/options and reference behavior; seek matching external playback/resume/script/output-write observations.

[Actual assessment](../../../content/directory/mpv.md) | [review note](../../doc-reviews/mpv.md).

<a id="jellyfin"></a>

## Jellyfin

Version/scope: Pinned evidence c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81.

**E3: Not Verified.** NFO export can carry selected state for one configured user, not every user's records. Complete version-compatible database/config/metadata/subtitle/archive reconstruction, media preservation and cross-host per-user comparison are not demonstrated. [Source context](https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/MediaBrowser.XbmcMetadata/Savers/BaseNfoSaver.cs).

**E5: Not Verified.** Restore has explicit server/backup-engine version guards and destructive extraction/table-replacement steps. Those code paths do not establish effective role/target approval, delete-media scope, inspectable user-state changes and available recourse across the server workflow. [Source context](https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/Jellyfin.Server.Implementations/FullSystemBackup/BackupService.cs).

**Remaining:** Same-version/cross-host recovery, complete archive coverage, media-byte preservation, per-user comparison, delete-media scope and observed network behavior remain untested. E5 needs restore/target and delete-media/user authority, clear destructive-state boundaries and independent recovery evidence.

**Next without a local installation:** Inspect a synthetic complete server backup plus media/config manifests and expected per-user records, then obtain same-version cross-host restore and permission/delete-media observations with explicit rollback material.

[Actual assessment](../../../content/directory/jellyfin.md) | [review note](../../doc-reviews/jellyfin.md).

## Validation boundary

The shared rating audit checks recorded fields, decision evidence and review notes. Historical schema-repair and evidence baselines remain available. Source/fixture hashes, navigation and the complete set of updated pages are checked by the final repository validation; no per-product clean restore or upstream test run is implied.

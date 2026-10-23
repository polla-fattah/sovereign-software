+++
title = "Jellyfin"
category = "Media & Creative"
summary = "Media server that streams a library of ordinary files the user already holds, without a mandatory account at a vendor."
substrate = "Media files in folders, with a local server database and optional NFO metadata"
sync_model = "Self-hosted server"
extract_cmd = "find /media -name \"*.nfo\" | head"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Same-version/cross-host recovery, complete archive coverage, media-byte preservation, per-user comparison, delete-media scope and observed network behavior remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81"
assessment_notes = "Individually reconciled in rating batch 11 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

[[evidence]]
target = "E1"
text = "Jellyfin documents built-in and manual backups covering the database, metadata, subtitles, trickplay, configuration, and data directories."
url = "https://jellyfin.org/docs/general/administration/backup-and-restore/"
confidence = "high"

[[evidence]]
target = "E2"
text = "The documented restore process is version-sensitive and can require restoring the same version or downgrading; migration to another media server was not tested."
url = "https://jellyfin.org/docs/general/administration/backup-and-restore/"
confidence = "high"

[[evidence]]
target = "E3"
text = "The NFO saver writes favourite/rating/playcount/watched/last-played/resume fields for the one configured UserId, returning early when no valid user is selected. NFO can carry selected user state, but this is not an export of every user's records or a substitute for a complete database backup."
url = "https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/MediaBrowser.XbmcMetadata/Savers/BaseNfoSaver.cs"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Jellyfin is self-hosted and stores its data and configuration in operator-controlled directories."
url = "https://jellyfin.org/docs/general/administration/configuration/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Restore rejects a manifest from a newer server and requires an exactly matching backup-engine version in the inspected implementation. It then overwrites extracted files and, when database restoration is selected, purges target tables before loading records. These guards and destructive steps are concrete source findings, not a successful restore or universal rollback guarantee."
url = "https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/Jellyfin.Server.Implementations/FullSystemBackup/BackupService.cs"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Jellyfin does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/MediaBrowser.XbmcMetadata/Savers/BaseNfoSaver.cs"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Jellyfin's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/MediaBrowser.XbmcMetadata/Savers/BaseNfoSaver.cs"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The server, data, and configuration can run on local infrastructure without a provider account."
url = "https://jellyfin.org/docs/general/administration/configuration/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/Jellyfin.Server.Implementations/FullSystemBackup/BackupService.cs"
confidence = "medium"

[[evidence]]
target = "E3"
text = "NFO export can carry selected state for one configured user, not every user's records. Complete version-compatible database/config/metadata/subtitle/archive reconstruction, media preservation and cross-host per-user comparison are not demonstrated."
url = "https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/MediaBrowser.XbmcMetadata/Savers/BaseNfoSaver.cs"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Restore has explicit server/backup-engine version guards and destructive extraction/table-replacement steps. Those code paths do not establish effective role/target approval, delete-media scope, inspectable user-state changes and available recourse across the server workflow."
url = "https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/Jellyfin.Server.Implementations/FullSystemBackup/BackupService.cs"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The NFO saver writes favourite/rating/playcount/watched/last-played/resume fields for the one configured UserId, returning early when no valid user is selected. NFO can carry selected user state, but this is not an export of every user's records or a substitute for a complete database backup. [Source](https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/MediaBrowser.XbmcMetadata/Savers/BaseNfoSaver.cs).
- [x] Resolved: Restore rejects a manifest from a newer server and requires an exactly matching backup-engine version in the inspected implementation. It then overwrites extracted files and, when database restoration is selected, purges target tables before loading records. These guards and destructive steps are concrete source findings, not a successful restore or universal rollback guarantee. [Source](https://github.com/jellyfin/jellyfin/blob/c7ce6a1b56ee7dcc1896250df0f2f9deaa828a81/Jellyfin.Server.Implementations/FullSystemBackup/BackupService.cs).
- [ ] Open: Same-version/cross-host recovery, complete archive coverage, media-byte preservation, per-user comparison, delete-media scope and observed network behavior remain untested. E5 needs restore/target and delete-media/user authority, clear destructive-state boundaries and independent recovery evidence.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-11/.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Same-version/cross-host recovery, complete archive coverage, media-byte preservation, per-user comparison, delete-media scope and observed network behavior remain untested. E5 needs restore/target and delete-media/user authority, clear destructive-state boundaries and independent recovery evidence.

**Next without installing locally:** Inspect a synthetic complete server backup plus media/config manifests and expected per-user records, then obtain same-version cross-host restore and permission/delete-media observations with explicit rollback material.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-11/`. Overall: **Insufficient evidence**.

+++
title = "Jellyfin"
category = "Media & Creative"
summary = "Media server that streams a library of ordinary files the user already holds, without a mandatory account at a vendor."
substrate = "Media files in folders, with a local server database and optional NFO metadata"
sync_model = "Self-hosted server"
extract_cmd = "find /media -name \"*.nfo\" | head"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "partial"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "meets"
transparency = "partial"

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
text = "Backups can be restored by Jellyfin, but the database and metadata are not an independently defined interchange representation and a clean restore was not performed."
url = "https://jellyfin.org/docs/general/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Jellyfin is self-hosted and stores its data and configuration in operator-controlled directories."
url = "https://jellyfin.org/docs/general/administration/configuration/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Playback and library management are user-directed, but automated metadata, user access, and deletion/replacement safeguards were not tested."
url = "https://jellyfin.org/docs/general/server/metadata/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Self-hosting and documented backup paths support control, while version coupling and migration limits weaken practical exit."
url = "https://jellyfin.org/docs/general/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Media files remain external and durable, but server metadata and database restoration depend on Jellyfin versions and were not independently verified."
url = "https://jellyfin.org/docs/general/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The server, data, and configuration can run on local infrastructure without a provider account."
url = "https://jellyfin.org/docs/general/administration/configuration/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The backup guide explicitly documents migration hazards, but metadata provenance and consequential administrative actions require testing."
url = "https://jellyfin.org/docs/general/administration/backup-and-restore/"
confidence = "medium"

+++

**Preliminary desk assessment:** Jellyfin is described as media server that streams a library of ordinary files the user already holds, without a mandatory account at a vendor. Its primary preservation surface is Media files in folders, with a local server database and optional NFO metadata, with independence shaped by self-hosted server. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

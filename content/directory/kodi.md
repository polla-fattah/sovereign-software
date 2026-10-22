+++
title = "Kodi"
category = "Media & Creative"
summary = "Media centre application that plays a local library and keeps its library state in local databases."
substrate = "Media files in folders, with SQLite library databases"
sync_model = "Local application; optional network sources"
extract_cmd = "ls ~/.kodi/userdata/Database"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "partial"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Kodi stores settings, add-ons, playlists, databases, artwork, and other user changes in its data folder and documents full-folder backup."
url = "https://kodi.wiki/view/Backup"
confidence = "high"

[[evidence]]
target = "E2"
text = "Kodi exports library metadata to NFO and image files that can be scanned into another installation, but complete migration of settings and add-ons was not tested."
url = "https://kodi.wiki/view/Import-export_library"
confidence = "high"

[[evidence]]
target = "E3"
text = "NFO files are text-editable and library export is documented, but databases, cached artwork, add-ons, and profiles need a clean independent restore test."
url = "https://kodi.wiki/view/NFO_files/Creating"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Kodi runs against local or network media and keeps its user data in operator-controlled paths."
url = "https://kodi.wiki/view/Backup"
confidence = "high"

[[evidence]]
target = "E5"
text = "Playback and library curation are user-directed, but scraper provenance, add-on behavior, and deletion safeguards were not assessed."
url = "https://kodi.wiki/view/Settings/Media/Library"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Local data folders and editable NFO exports support user control, while add-on and database dependencies limit exit confidence."
url = "https://kodi.wiki/view/Backup"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Text-based NFO metadata is durable, but artwork fidelity, database versions, and add-on state require preservation testing."
url = "https://kodi.wiki/view/Import-export_library"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The primary media library can operate locally without a hosted account."
url = "https://kodi.wiki/view/Backup"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The wiki identifies what is and is not captured by exports, but automated metadata and add-on decisions remain unverified."
url = "https://kodi.wiki/view/Import-export_library"
confidence = "medium"

+++

**Preliminary desk assessment:** Kodi is described as media centre application that plays a local library and keeps its library state in local databases. Its primary preservation surface is Media files in folders, with SQLite library databases, with independence shaped by local application; optional network sources. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

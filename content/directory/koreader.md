+++
title = "KOReader"
category = "Research & Education"
summary = "Document reader for e-readers and other devices that opens open e-book and document formats."
substrate = "Reads open formats; reading state in per-book sidecar files"
sync_model = "Local device files with optional sync plugins"
extract_cmd = "cat book.sdr/metadata.epub.lua"
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
text = "KOReader stores reading progress, highlights, bookmarks, and notes in sidecar metadata folders alongside books or in configured locations."
url = "https://github.com/koreader/koreader/blob/master/frontend/ui/elements/common_settings_menu_table.lua"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Sidecar metadata can travel with the book and ordinary documents remain independently usable, but complete migration of every setting and plugin state was not tested."
url = "https://github.com/koreader/koreader/blob/master/frontend/ui/elements/common_settings_menu_table.lua"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The sidecar representation is visible to file browsers and backups, but its full schema and independent interpretation were not established."
url = "https://github.com/koreader/koreader/blob/master/frontend/ui/elements/common_settings_menu_table.lua"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Reading and metadata storage can be performed on local devices and files without a hosted account."
url = "https://github.com/koreader/koreader"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Reading annotations are user-directed, but sync conflicts, annotation loss, and correction safeguards were not tested."
url = "https://github.com/koreader/koreader"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Local books and sidecar metadata support user custody, though application-specific metadata limits exit certainty."
url = "https://github.com/koreader/koreader/blob/master/frontend/ui/elements/common_settings_menu_table.lua"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Books remain in their original formats and sidecars are backed up with them, but metadata schema longevity needs testing."
url = "https://github.com/koreader/koreader/blob/master/frontend/ui/elements/common_settings_menu_table.lua"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core reader works locally and does not require a provider account."
url = "https://github.com/koreader/koreader"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The settings documentation explains where metadata is stored, but full plugin and sync behavior remains unverified."
url = "https://github.com/koreader/koreader/blob/master/frontend/ui/elements/common_settings_menu_table.lua"
confidence = "low"

+++

**Preliminary desk assessment:** KOReader is described as document reader for e-readers and other devices that opens open e-book and document formats. Its primary preservation surface is Reads open formats; reading state in per-book sidecar files, with independence shaped by local device files with optional sync plugins. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

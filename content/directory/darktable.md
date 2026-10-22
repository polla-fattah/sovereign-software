+++
title = "Darktable"
category = "Media & Creative"
summary = "Non-destructive raw photography workflow that leaves original files unchanged and stores edits in XMP sidecar files and a library database."
substrate = "Immutable RAW + ISO Standard .xmp Sidecars"
sync_model = "Local Disk Hierarchy"
extract_cmd = "darktable-cli image.RAW image.RAW.xmp export.jpg"
limitations = ["Sidecar files do not hold all library metadata; for example, custom sort order is not stored there."]
pilot_stage = 4
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
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
text = "darktable keeps original images untouched and documents XMP and DTDATA sidecars for edits and metadata."
url = "https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Rendered exports are interoperable, but complete migration of non-destructive edit history and library organization was not tested."
url = "https://docs.darktable.org/usermanual/development/en/overview/workflow/export/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The manual warns that both sidecars and database/configuration files matter for full restoration; a clean restore was not performed."
url = "https://docs.darktable.org/usermanual/development/en/preferences-settings/backups/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Editing and export are local operations, although multi-computer use requires deliberate file and version management."
url = "https://docs.darktable.org/usermanual/development/en/special-topics/multiple-computers/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The sidecar model makes edit history inspectable, but database precedence, overwrite behavior, and conflict handling require testing."
url = "https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Originals and sidecars remain under user control, but the complete library state is split across files and databases."
url = "https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Sidecars and raw originals support preservation, but DTDATA, database records, settings, and version compatibility create recovery limits."
url = "https://docs.darktable.org/usermanual/development/en/preferences-settings/backups/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The workflow is local and does not require a hosted image service."
url = "https://docs.darktable.org/usermanual/development/en/overview/workflow/export/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Non-destructive edits are represented in sidecars, but database/sidecar precedence can make changes surprising without careful configuration."
url = "https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/"
confidence = "medium"
+++

**Verification scenario:** Rebuild edits from RAW plus XMP and database data on a clean machine; test duplicates, tags, sorting, and sidecar settings.

**What may invalidate an overconfident claim:** Sidecars do not necessarily preserve all library metadata; originals are typically unmodified.

**Documentation starting point:** <https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/>

**Preliminary desk assessment:** Darktable is described as non-destructive raw photography workflow that leaves original files unchanged and stores edits in xmp sidecar files and a library database. Its primary preservation surface is Immutable RAW + ISO Standard .xmp Sidecars, with independence shaped by local disk hierarchy. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

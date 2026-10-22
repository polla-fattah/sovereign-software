+++
title = "Darktable"
category = "Media & Creative"
summary = "Non-destructive raw photography workflow that leaves original files unchanged and stores edits in XMP sidecar files and a library database."
substrate = "Immutable RAW + ISO Standard .xmp Sidecars"
sync_model = "Local Disk Hierarchy"
extract_cmd = "darktable-cli image.RAW image.RAW.xmp export.jpg"
limitations = ["Sidecar files do not hold all library metadata; for example, custom sort order is not stored there."]
pilot_stage = 4
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Rebuild edits from RAW plus XMP and database data on a clean machine; test duplicates, tags, sorting, and sidecar settings.

**What may invalidate an overconfident claim:** Sidecars do not necessarily preserve all library metadata; originals are typically unmodified.

**Documentation starting point:** <https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/>

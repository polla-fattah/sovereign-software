+++
title = "GIMP"
category = "Graphics & 3D"
summary = "Raster image editor with a native layered format and export to many open formats."
substrate = "Native .xcf layered image, plus open export formats"
sync_model = "Local desktop application"
extract_cmd = "file image.xcf"
limitations = ["Full fidelity of the native format depends on GIMP itself."]
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
text = "GIMP saves editable images in XCF and exports to standard image formats."
url = "https://docs.gimp.org/3.0/en/gimp-export-dialog.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Exports are widely usable, but GIMP documentation states that formats other than XCF lose some image properties such as layers or transparency."
url = "https://docs.gimp.org/en_GB/gimp-images-out.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "XCF preserves the complete editable image except undo information, but restoration with a clean installation and plugin set was not tested."
url = "https://docs.gimp.org/en_GB/gimp-images-out.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Editing, saving, and exporting are local operations without a required vendor account."
url = "https://docs.gimp.org/3.0/en/gimp-export-dialog.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Save/export prompts expose some loss decisions, but plugins, scripts, and destructive layer operations need hands-on review."
url = "https://docs.gimp.org/3.0/en/gimp-export-dialog.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Local XCF files and standard exports support custody, while editable exit beyond XCF is necessarily lossy."
url = "https://docs.gimp.org/en_GB/gimp-images-out.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "XCF preserves rich project state, but its long-term independent interpretation and plugin dependencies were not established."
url = "https://docs.gimp.org/en_GB/gimp-images-out.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The image workflow is local."
url = "https://docs.gimp.org/3.0/en/gimp-export-dialog.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The distinction between Save and Export makes loss visible, but plugin and script behavior requires more evidence."
url = "https://docs.gimp.org/3.0/en/gimp-export-dialog.html"
confidence = "medium"
+++

**Preliminary desk assessment:** GIMP is described as raster image editor with a native layered format and export to many open formats. Its primary preservation surface is Native .xcf layered image, plus open export formats, with independence shaped by local desktop application. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a creator preserve editable source work and linked assets, reopen it after software changes, and export a useful representation to independent tools?

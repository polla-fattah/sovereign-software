+++
title = "Krita"
category = "Graphics & 3D"
summary = "Digital painting application with a documented project archive format."
substrate = "Project archive (.kra, a zip containing maindoc.xml and layer data)"
sync_model = "Local desktop application"
extract_cmd = "unzip -l painting.kra"
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
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Krita saves layered documents in its native format and documents export and incremental backup functions."
url = "https://docs.krita.org/en/reference_manual/main_menu/file_menu.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "Krita exports common image formats, but flattened export and application-specific layers make full migration fidelity unverified."
url = "https://docs.krita.org/en/user_manual/working_with_images.html"
confidence = "high"

[[evidence]]
target = "E3"
text = "The native file can be inspected as a compressed archive and layers can sometimes be recovered, but independent reconstruction was not tested."
url = "https://docs.krita.org/en/user_manual/working_with_images.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The editing workflow is local-file-based and does not require a hosted account."
url = "https://krita.org/en/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Image editing is user-directed, but asset provenance, overwrite, and publishing review were not assessed."
url = "https://docs.krita.org/en/reference_manual/main_menu/file_menu.html"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Local layered files and incremental backups support user control, with cross-tool fidelity as the main limit."
url = "https://docs.krita.org/en/reference_manual/main_menu/file_menu.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The native format preserves layers and the archive structure is inspectable, but long-term compatibility needs a pinned round trip."
url = "https://docs.krita.org/en/user_manual/working_with_images.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core editing and storage operate locally without a provider."
url = "https://krita.org/en/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The manual documents save/export distinctions and backup behavior, while complete effect and plugin preservation remains unverified."
url = "https://docs.krita.org/en/reference_manual/main_menu/file_menu.html"
confidence = "medium"

+++

**Preliminary desk assessment:** Krita is described as digital painting application with a documented project archive format. Its primary preservation surface is Project archive (.kra, a zip containing maindoc.xml and layer data), with independence shaped by local desktop application. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a creator preserve editable source work and linked assets, reopen it after software changes, and export a useful representation to independent tools?

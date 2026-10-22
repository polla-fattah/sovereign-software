+++
title = "Kdenlive"
category = "Media & Creative"
summary = "Video editor that stores projects as XML on top of the MLT framework."
substrate = "XML project files (.kdenlive) referencing source media"
sync_model = "Local desktop application"
extract_cmd = "grep -c \"<producer\" project.kdenlive"
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
text = "Kdenlive projects store timeline and editing state in project files, and its archive feature copies the project assets into a folder or archive."
url = "https://docs.kdenlive.org/en/project_and_asset_management/file_management/archiving.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "Project archives provide a practical handoff path, but rendered output and interchange fidelity with other video editors were not tested."
url = "https://docs.kdenlive.org/en/project_and_asset_management/file_management/archiving.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The documentation identifies the .kdenlive XML project file and archive contents, but independent reconstruction outside Kdenlive was not demonstrated."
url = "https://docs.kdenlive.org/en/project_and_asset_management/file_management.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The editing workflow and source assets can be kept on local storage without a hosted account."
url = "https://docs.kdenlive.org/en/project_and_asset_management.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Video editing is user-directed, but overwrite, render approval, and project-sharing hazards were not tested."
url = "https://docs.kdenlive.org/en/project_and_asset_management/file_management.html"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Archives collect the project and assets under user control, though the project format remains application-dependent."
url = "https://docs.kdenlive.org/en/project_and_asset_management/file_management.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Archived source assets and documented XML improve preservation, while effects and timeline fidelity need cross-version tests."
url = "https://docs.kdenlive.org/en/project_and_asset_management/file_management.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core editing and archiving workflow is local and does not require a provider."
url = "https://docs.kdenlive.org/en/project_and_asset_management.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The manual explains archives, backups, and project structure, but complete effect semantics and recovery boundaries remain unverified."
url = "https://docs.kdenlive.org/en/project_and_asset_management/file_management.html"
confidence = "medium"

+++

**Preliminary desk assessment:** Kdenlive is described as video editor that stores projects as xml on top of the mlt framework. Its primary preservation surface is XML project files (.kdenlive) referencing source media, with independence shaped by local desktop application. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

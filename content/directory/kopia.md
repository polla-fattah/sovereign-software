+++
title = "Kopia"
category = "Backup & Archival"
summary = "Backup tool with encrypted, deduplicated snapshots and a choice of storage back ends."
substrate = "Encrypted content-addressed repository"
sync_model = "Local, network, or cloud storage chosen by the user"
extract_cmd = "kopia snapshot list"
limitations = ["Restoration depends on the repository password being preserved."]
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
sovereignty = "meets"
longevity = "meets"
locality = "meets"
transparency = "meets"

[[evidence]]
target = "E1"
text = "Kopia creates encrypted snapshots of selected files and directories and supports local, network, and remote repositories."
url = "https://kopia.io/docs/getting-started/"
confidence = "high"

[[evidence]]
target = "E2"
text = "Snapshots can be mounted or restored to any designated local or network location, but migration away from Kopia repository format was not tested."
url = "https://kopia.io/docs/reference/command-line/common/snapshot-restore/"
confidence = "high"

[[evidence]]
target = "E3"
text = "The tool can restore ordinary files and verify repository contents, but independent reading of encrypted repository objects requires the repository password and Kopia-compatible tooling."
url = "https://kopia.io/docs/advanced/consistency/"
confidence = "high"

[[evidence]]
target = "E4"
text = "Repository location and encryption password are chosen by the operator, including a local filesystem repository."
url = "https://kopia.io/docs/repositories/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Backup and restore are user-directed, but retention deletion, key loss, and recovery approval practices were not tested."
url = "https://kopia.io/docs/getting-started/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "User-selected storage and user-controlled encryption support strong custody, with repository-format dependence limiting exit."
url = "https://kopia.io/docs/features/"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Snapshots preserve ordinary files and support verification and restore testing, though repository compatibility and key preservation need operational evidence."
url = "https://kopia.io/docs/advanced/consistency/"
confidence = "high"

[[evidence]]
target = "locality"
text = "Kopia can operate with local or network-attached storage and does not require a server."
url = "https://kopia.io/docs/features/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The documentation clearly distinguishes snapshots, repositories, policies, restore, and verification, while destructive retention behavior needs testing."
url = "https://kopia.io/docs/getting-started/"
confidence = "medium"

+++

**Preliminary desk assessment:** Kopia is described as backup tool with encrypted, deduplicated snapshots and a choice of storage back ends. Its primary preservation surface is Encrypted content-addressed repository, with independence shaped by local, network, or cloud storage chosen by the user. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user restore representative records on independent hardware, recover without the original provider, verify integrity, and retain the keys or credentials needed for recovery?

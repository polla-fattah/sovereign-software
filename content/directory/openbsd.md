+++
title = "OpenBSD"
category = "OS & Infra"
summary = "Small, auditable operating system whose configuration lives in plain-text files."
substrate = "Plain-text configuration files in /etc"
sync_model = "Local filesystem / Git"
extract_cmd = "tar czf etc-backup.tgz /etc"
limitations = ["Configuration is imperative rather than declarative, but every setting is a plain-text file."]
pilot_stage = 5
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
transparency = "partial"

[[evidence]]
target = "E1"
text = "OpenBSD documents system configuration, install media, root-partition backup, and package inventory procedures."
url = "https://www.openbsd.org/faq/index.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "Configuration files, package lists, and install sets support rebuilding a system, but full application-data migration was not tested."
url = "https://www.openbsd.org/faq/faq15.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The installer and backup guidance support recovery, but a clean restore of a complete system and all services was not demonstrated."
url = "https://www.openbsd.org/faq/faq4.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The operating system and its configuration are controlled locally by the operator."
url = "https://www.openbsd.org/faq/index.html"
confidence = "high"

[[evidence]]
target = "E5"
text = "System administration is consequential, but change review, secrets, and service rollback procedures were not assessed."
url = "https://www.openbsd.org/faq/faq10.html"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Local configuration, signed releases, and recovery tooling support authority, with upgrade compatibility limits."
url = "https://www.openbsd.org/faq/current.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Text configuration and documented release procedures support preservation, but version-to-version migration requires testing."
url = "https://www.openbsd.org/faq/faq15.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The system runs locally and can be installed and upgraded from local media."
url = "https://www.openbsd.org/faq/faq4.html"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The FAQ documents upgrade hazards and backup expectations, but complete recovery and administrative oversight remain unverified."
url = "https://www.openbsd.org/faq/index.html"
confidence = "medium"

+++

**Verification scenario:** Recover configuration, package inventory, keys, services, and data on a clean host; verify offline operation and permission policies.

**What may invalidate an overconfident claim:** An archive of /etc alone is not a complete system or user-data recovery.

**Documentation starting point:** <https://www.openbsd.org/faq/>

**Preliminary desk assessment:** OpenBSD is described as small, auditable operating system whose configuration lives in plain-text files. Its primary preservation surface is Plain-text configuration files in /etc, with independence shaped by local filesystem / git. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

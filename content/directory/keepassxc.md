+++
title = "KeePassXC"
category = "OS & Infra"
summary = "Open-source password manager with a documented, encrypted vault file on your disk."
substrate = "Open KDBX vault (binary, documented format)"
sync_model = "Git / Syncthing (no commercial cloud)"
extract_cmd = "keepassxc-cli export --format csv vault.kdbx"
limitations = ["Recovery depends on keeping the master password or key file. Attachments, history, and one-time-password data need testing in an independent client."]
pilot_stage = 3
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
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
text = "KeePassXC uses local KDBX database files and documents database backup and export facilities."
url = "https://keepassxc.org/docs/KeePassXC_UserGuide"
confidence = "high"

[[evidence]]
target = "E2"
text = "KDBX is compatible with KeePass-family tools and KeePassXC documents imports from several other password managers, providing a practical exit path."
url = "https://keepassxc.org/docs/"
confidence = "high"

[[evidence]]
target = "E3"
text = "The native database can be opened by compatible tools, but export formats are explicitly lossy for attachments, custom fields, and Auto-Type settings, so complete independent recovery was not established."
url = "https://keepassxc.org/docs/KeePassXC_UserGuide"
confidence = "high"

[[evidence]]
target = "E4"
text = "The database is encrypted locally, and synchronization can be delegated to a user-selected shared folder rather than a built-in provider."
url = "https://keepassxc.org/docs/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Password use is consequential, but approval, browser integration, passkey export, and recovery behavior were not tested in a controlled scenario."
url = "https://keepassxc.org/docs/KeePassXC_GettingStarted"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Local encrypted files, user-held credentials, and multiple migration paths strongly support authority and custody."
url = "https://keepassxc.org/docs/KeePassXC_UserGuide"
confidence = "high"

[[evidence]]
target = "longevity"
text = "KDBX is a documented, cross-compatible native format, though key files and authentication factors must be preserved separately."
url = "https://keepassxc.org/docs/"
confidence = "high"

[[evidence]]
target = "locality"
text = "The database and primary workflow are local, with synchronization handled by storage chosen by the user."
url = "https://keepassxc.org/docs/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The guide clearly warns that exports are unencrypted and lossy, but real-world recovery and safe approval workflows need testing."
url = "https://keepassxc.org/docs/KeePassXC_UserGuide"
confidence = "high"

+++

**Verification scenario:** Open a KDBX file in another compatible client; restore attachments, groups, history, and one-time passwords; test emergency key recovery.

**What may invalidate an overconfident claim:** A documented binary format such as KDBX should not be ranked below plain text for that reason alone.

**Documentation starting point:** <https://keepassxc.org/docs/>

**Preliminary desk assessment:** KeePassXC is described as open-source password manager with a documented, encrypted vault file on your disk. Its primary preservation surface is Open KDBX vault (binary, documented format), with independence shaped by git / syncthing (no commercial cloud). This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

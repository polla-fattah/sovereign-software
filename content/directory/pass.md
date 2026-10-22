+++
title = "Pass"
category = "OS & Infra"
summary = "Secrets live as individual GPG-encrypted files in a directory you control, with no third-party vault server."
substrate = "GPG-encrypted files in a plain directory"
sync_model = "Git / Syncthing (no commercial cloud)"
extract_cmd = "gpg -d ~/.password-store/infra/root.gpg"
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
text = "pass stores credentials in local password-store files and exposes a command-line interface for inspection and management."
url = "https://www.passwordstore.org/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The store is a directory of independently usable encrypted files and can be migrated by copying the directory and keys."
url = "https://www.passwordstore.org/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Each entry is a standard encrypted file readable by common Unix tools, but complete recovery of extensions and key management was not tested."
url = "https://www.passwordstore.org/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The password store and encryption keys are held by the user and can be synchronized with ordinary file tools."
url = "https://www.passwordstore.org/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Credentials are consequential, but clipboard, agent, and key-revocation safeguards were not tested."
url = "https://www.passwordstore.org/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Local encrypted files and user-held keys give strong authority and exit."
url = "https://www.passwordstore.org/"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Plain file layout and standard cryptography support preservation, with key custody as the critical condition."
url = "https://www.passwordstore.org/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core workflow is local and offline."
url = "https://www.passwordstore.org/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The format and tooling are simple and inspectable, but operational secret-handling risks need scenario testing."
url = "https://www.passwordstore.org/"
confidence = "medium"

+++

**Verification scenario:** Restore a GPG-encrypted tree with private keys and trust settings; re-encrypt for new recipients; test offline.

**What may invalidate an overconfident claim:** Availability of encrypted files is not recoverability if keys are lost. Protect test secrets.

**Documentation starting point:** <https://www.passwordstore.org/>

**Preliminary desk assessment:** Pass is described as secrets live as individual gpg-encrypted files in a directory you control, with no third-party vault server. Its primary preservation surface is GPG-encrypted files in a plain directory, with independence shaped by git / syncthing (no commercial cloud). This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

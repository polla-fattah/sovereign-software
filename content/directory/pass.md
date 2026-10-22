+++
title = "Pass"
category = "OS & Infra"
summary = "Secrets live as individual GPG-encrypted files in a directory you control, with no third-party vault server."
substrate = "GPG-encrypted files in a plain directory"
sync_model = "Git / Syncthing (no commercial cloud)"
extract_cmd = "gpg -d ~/.password-store/infra/root.gpg"
pilot_stage = 3
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Restore a GPG-encrypted tree with private keys and trust settings; re-encrypt for new recipients; test offline.

**What may invalidate an overconfident claim:** Availability of encrypted files is not recoverability if keys are lost. Protect test secrets.

**Documentation starting point:** <https://www.passwordstore.org/>

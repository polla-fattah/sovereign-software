+++
title = "KeePassXC"
category = "OS & Infra"
summary = "Open-source password manager with a documented, encrypted vault file on your disk."
substrate = "Open KDBX vault (binary, documented format)"
sync_model = "Git / Syncthing (no commercial cloud)"
extract_cmd = "keepassxc-cli export --format csv vault.kdbx"
limitations = ["Recovery depends on keeping the master password or key file. Attachments, history, and one-time-password data need testing in an independent client."]
pilot_stage = 3
legacy_tier = "Tier 2"
legacy_label = "Tier 2 • Sovereign Core"
+++

**Verification scenario:** Open a KDBX file in another compatible client; restore attachments, groups, history, and one-time passwords; test emergency key recovery.

**What may invalidate an overconfident claim:** A documented binary format such as KDBX should not be ranked below plain text for that reason alone.

**Documentation starting point:** <https://keepassxc.org/docs/>

+++
title = "OpenBSD"
category = "OS & Infra"
summary = "Small, auditable operating system whose configuration lives in plain-text files."
substrate = "Plain-text configuration files in /etc"
sync_model = "Local filesystem / Git"
extract_cmd = "tar czf etc-backup.tgz /etc"
limitations = ["Configuration is imperative rather than declarative, but every setting is a plain-text file."]
pilot_stage = 5
legacy_tier = "Tier 2"
legacy_label = "Tier 2 • Sovereign Core"
+++

**Verification scenario:** Recover configuration, package inventory, keys, services, and data on a clean host; verify offline operation and permission policies.

**What may invalidate an overconfident claim:** An archive of /etc alone is not a complete system or user-data recovery.

**Documentation starting point:** <https://www.openbsd.org/faq/>

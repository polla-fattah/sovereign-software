+++
title = "Syncthing"
category = "OS & Infra"
summary = "Peer-to-peer folder synchronisation with cryptographic device identities and conflict file preservation. It is synchronisation, not backup."
substrate = "Direct Peer-to-Peer Block Exchange (BEP)"
sync_model = "End-to-End TLS over LAN / Relay"
extract_cmd = "syncthing cli show system"
limitations = ["Deletions and damaged files propagate to other devices, so it does not replace a backup."]
pilot_stage = 5
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Disconnect peers, delete files, simulate conflicting edits, test versioning, and restore from an independent backup.

**What may invalidate an overconfident claim:** Synchronisation propagates deletions; it does not replace a backup system.

**Documentation starting point:** <https://docs.syncthing.net/users/faq.html>

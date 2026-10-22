+++
title = "Syncthing"
category = "OS & Infra"
summary = "Peer-to-peer folder synchronisation with cryptographic device identities and conflict file preservation. It is synchronisation, not backup."
substrate = "Direct Peer-to-Peer Block Exchange (BEP)"
sync_model = "End-to-End TLS over LAN / Relay"
extract_cmd = "syncthing cli show system"
limitations = ["Deletions and damaged files propagate to other devices, so it does not replace a backup."]
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
sovereignty = "partial"
longevity = "partial"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "The official documentation for this entry provides a relevant independent access to essential information lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.syncthing.net/users/versioning.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.syncthing.net/users/versioning.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official documentation for this entry provides a relevant independent interpretation and recovery lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.syncthing.net/users/versioning.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.syncthing.net/users/versioning.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The official documentation for this entry provides a relevant governability of consequential actions lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.syncthing.net/users/versioning.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "The official documentation for this entry provides a relevant sovereignty lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.syncthing.net/users/versioning.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The official documentation for this entry provides a relevant longevity lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.syncthing.net/users/versioning.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.syncthing.net/users/versioning.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The official documentation for this entry provides a relevant transparency and control lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.syncthing.net/users/versioning.html"
confidence = "medium"

+++

**Verification scenario:** Disconnect peers, delete files, simulate conflicting edits, test versioning, and restore from an independent backup.

**What may invalidate an overconfident claim:** Synchronisation propagates deletions; it does not replace a backup system.

**Documentation starting point:** <https://docs.syncthing.net/users/faq.html>

**Preliminary desk assessment:** Syncthing is described as peer-to-peer folder synchronisation with cryptographic device identities and conflict file preservation. it is synchronisation, not backup. Its primary preservation surface is Direct Peer-to-Peer Block Exchange (BEP), with independence shaped by end-to-end tls over lan / relay. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

+++
title = "Syncthing"
category = "OS & Infra"
summary = "Peer-to-peer folder synchronisation with cryptographic device identities and conflict file preservation. It is synchronisation, not backup."
substrate = "Direct Peer-to-Peer Block Exchange (BEP)"
sync_model = "End-to-End TLS over LAN / Relay"
extract_cmd = "syncthing cli show system"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Two-peer deletion/conflict propagation, manual metadata recovery, config/database migration, destructive override/revert behavior and network observations remain untested."]
pilot_stage = 5
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence d6d0181f7d466381c4b39ec8fd944c364f939b32"
assessment_notes = "Individually reconciled in rating batch 9 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

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
text = "The versioner helper resolves .stversions by default or a configured versioning filesystem and archives/restores using filesystem RenameOrCopy with timestamp handling. Archived versions are files, not merely opaque index entries; full metadata fidelity is not established by that code."
url = "https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/util.go"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.syncthing.net/users/versioning.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Trashcan archive uses the original filename rather than the Simple versioner's timestamp-tagged name. Its cleanup returns without removal when cleanoutDays <= 0; otherwise files older than the computed cutoff are removed. This resolves a retention-policy boundary, not proof that synchronization itself is a backup."
url = "https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/trashcan.go"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Syncthing does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/util.go"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Syncthing's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/util.go"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.syncthing.net/users/versioning.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/trashcan.go"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Versioner archives are ordinary files using RenameOrCopy and timestamp handling, but full metadata fidelity, configuration/index migration and two-peer reconstruction were not established. Version retention is not proof of independent backup or recovered conflict/deletion history."
url = "https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/util.go"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Trashcan retention uses policy-dependent cleanup and non-tagged names; synchronization can propagate destructive changes. Effective peer/folder authority, override/revert choices, conflict visibility and usable recovery remain insufficiently covered by the retention helper alone."
url = "https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/trashcan.go"
confidence = "medium"

+++

**Verification scenario:** Disconnect peers, delete files, simulate conflicting edits, test versioning, and restore from an independent backup.

**What may invalidate an overconfident claim:** Synchronisation propagates deletions; it does not replace a backup system.

**Documentation starting point:** <https://docs.syncthing.net/users/faq.html>

**Evidence update: 23 October 2026**

- [x] Resolved: The versioner helper resolves .stversions by default or a configured versioning filesystem and archives/restores using filesystem RenameOrCopy with timestamp handling. Archived versions are files, not merely opaque index entries; full metadata fidelity is not established by that code. [Source](https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/util.go).
- [x] Resolved: Trashcan archive uses the original filename rather than the Simple versioner's timestamp-tagged name. Its cleanup returns without removal when cleanoutDays <= 0; otherwise files older than the computed cutoff are removed. This resolves a retention-policy boundary, not proof that synchronization itself is a backup. [Source](https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/trashcan.go).
- [ ] Open: Two-peer deletion/conflict propagation, manual metadata recovery, config/database migration, destructive override/revert behavior and network observations remain untested. E5 needs peer/folder authorization, deletion/conflict and override/revert visibility, plus configured retention and recovery limits.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-9/.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Two-peer deletion/conflict propagation, manual metadata recovery, config/database migration, destructive override/revert behavior and network observations remain untested. E5 needs peer/folder authorization, deletion/conflict and override/revert visibility, plus configured retention and recovery limits.

**Next without installing locally:** Use a synthetic two-peer folder/config/version archive packet with expected conflicts/metadata and externally recorded propagation/revert/restore observations; inspect files and policies independently.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-9/`. Overall: **Insufficient evidence**.

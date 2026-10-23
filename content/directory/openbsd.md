+++
title = "OpenBSD"
category = "OS & Infra"
summary = "Small, auditable operating system whose configuration lives in plain-text files."
substrate = "Plain-text configuration files in /etc"
sync_model = "Local filesystem / Git"
extract_cmd = "tar czf etc-backup.tgz /etc"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","An actual dump/restore chain, keydisk recovery, upgrade reversal and filesystem/metadata comparison remain untested."]
pilot_stage = 5
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence d962f40cd0b4b974405c3cac59ec7417040c0533"
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
text = "The pinned restore manual specifies a level-0 base followed by the necessary incremental backups, and a pristine filesystem for full -r recovery. It restores ownership/time/mode where possible and warns that active-filesystem incremental dumps may confuse restore. This is a concrete archive-chain dependency, not an /etc-only recovery method."
url = "https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The operating system and its configuration are controlled locally by the operator."
url = "https://www.openbsd.org/faq/index.html"
confidence = "high"

[[evidence]]
target = "E5"
text = "The manual distinguishes -t listing, selective extraction and full -r rebuilding, explicitly warning that -r is hazardous if used carelessly. Inspecting an archive listing therefore precedes a materially different rebuild operation; no blanket confirmation or automatic rollback is established."
url = "https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for OpenBSD does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for OpenBSD's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The system runs locally and can be installed and upgraded from local media."
url = "https://www.openbsd.org/faq/faq4.html"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The restore manual specifies full/incremental archive-chain requirements, pristine targets and possible active-filesystem inconsistencies. No complete archive/keydisk/application-data restoration with verified ownership/times/permissions is recorded for the declared system scope."
url = "https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Listing, selective extraction and full rebuilding have different risk and authority requirements; the manual warns about hazardous full restore. Those descriptions do not establish effective target/privilege authorization, upgrade reversal or recourse after overwritten system/user state."
url = "https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8"
confidence = "medium"

+++

**Verification scenario:** Recover configuration, package inventory, keys, services, and data on a clean host; verify offline operation and permission policies.

**What may invalidate an overconfident claim:** An archive of /etc alone is not a complete system or user-data recovery.

**Documentation starting point:** <https://www.openbsd.org/faq/>

**Evidence update: 23 October 2026**

- [x] Resolved: The pinned restore manual specifies a level-0 base followed by the necessary incremental backups, and a pristine filesystem for full -r recovery. It restores ownership/time/mode where possible and warns that active-filesystem incremental dumps may confuse restore. This is a concrete archive-chain dependency, not an /etc-only recovery method. [Source](https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8).
- [x] Resolved: The manual distinguishes -t listing, selective extraction and full -r rebuilding, explicitly warning that -r is hazardous if used carelessly. Inspecting an archive listing therefore precedes a materially different rebuild operation; no blanket confirmation or automatic rollback is established. [Source](https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8).
- [ ] Open: An actual dump/restore chain, keydisk recovery, upgrade reversal and filesystem/metadata comparison remain untested. E5 needs target/privilege and upgrade/restore authority, inspectable planned changes and appropriate independent backups/recourse.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-9/.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** An actual dump/restore chain, keydisk recovery, upgrade reversal and filesystem/metadata comparison remain untested. E5 needs target/privilege and upgrade/restore authority, inspectable planned changes and appropriate independent backups/recourse.

**Next without installing locally:** Inspect an externally generated synthetic dump/incremental/keydisk packet with expected files/metadata and precise version/hardware assumptions; seek same-version restore/upgrade-control and recovery records.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-9/`. Overall: **Insufficient evidence**.

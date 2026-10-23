+++
title = "BorgBackup"
category = "Backup & Archival"
summary = "Command-line backup program with deduplication and optional encryption, writing to repositories the user controls."
substrate = "Deduplicating archive repository with optional encryption"
sync_model = "Local or SSH repository chosen by the user"
extract_cmd = "borg list /path/to/repo"
limitations = ["Recovery depends on repository integrity, encryption keys and compatible software.","Findings describe a pinned development tree, not verified behaviour of Borg 1.x or a released Borg 2 binary.","Normal compaction closes the inspected soft-delete recovery window; Borg-specific TAR metadata needs an aware reader.","No target application was installed or executed in rating reconciliation batch 2; source controls are not end-to-end recovery observations.","Complete essential-record recovery and whole-scope consequential-operation coverage remain unverified."]
assessment_batch = "C"
assessment_status = "complete"
assessment_date = "2026-10-23"
version_assessed = "Source commit 45f8b178ae892ae73fcaa3127c951b0044cd7a7e; development-source TAR metadata, check/repair and delete/compact boundaries"
assessment_notes = "Rating reconciliation batch 2: E3/E5 remain Not Verified with specific missing evidence; unsupported Longevity, Transparency and Sovereignty findings withdrawn. Retained source observations rechecked."

[eligibility]
independent_data_access = "not_verified"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "not_verified"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

[[evidence]]
target = "E1"
text = "Borg documents listing and extracting archives from repositories controlled by the user, but an actual restore was not performed."
url = "https://borgbackup.readthedocs.io/en/latest/quickstart.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The inspected development exporter writes ordinary TAR file, directory, symlink and hardlink records. PAX adds nanosecond times, xattrs and POSIX ACL fields; BORG adds Base64-encoded MessagePack item metadata under BORG.item.meta. A generic TAR reader cannot be assumed to interpret that Borg-specific metadata. GNU format lacks the additional PAX metadata."
url = "https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/tar_cmds.py"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The check command passes verify_data explicitly to archive checking; full cryptographic file-content verification is opt-in. Repair has a danger/confirmation path and may discard data; a successful repair is not evidence of lossless recovery. The inspected development implementation must not be treated as a test of Borg 1.x releases."
url = "https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/check_cmd.py"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Repositories can be local or remote and are user-selected, but loss of keys or the repository host can remove effective control until recovery is proven."
url = "https://borgbackup.readthedocs.io/en/latest/quickstart.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "In this development source, delete marks archives for deletion, undelete reverses that state, and normal successful compaction removes soft-deleted archive records and reclaims unreferenced data. Dry-run avoids those changes; compaction preserves soft-deleted archives when missing chunks are detected. This bounded recovery window is not a universal Borg 1.x guarantee."
url = "https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/delete_cmd.py"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "E2 is Not Verified for the existing essential-record scope, so the minimum for a positive Sovereignty finding is not established. Storage choice, local access and export-format strengths remain recorded; the old positive principle is withdrawn, not changed to a verified failure."
url = "https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/tar_cmds.py"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 remains Not Verified for BorgBackup's existing essential-record scope. A development-tree export is not compatible repository recovery. The previous positive Longevity finding is withdrawn to Not assessed, not a finding of failure."
url = "https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/tar_cmds.py"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Backup creation, inspection, and restoration can be performed locally or over user-selected transport without a vendor service."
url = "https://borgbackup.readthedocs.io/en/latest/quickstart.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The inspected controls are retained as positive facts, but whole-scope E5 remains Not Verified. The methodology requires established minimum oversight before a positive Transparency and Control finding; the earlier Partially meets is therefore withdrawn to Not assessed rather than used as a placeholder for incomplete evidence."
url = "https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/check_cmd.py"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The development source writes interpretable TAR fields plus Borg-specific metadata; ordinary TAR readers do not automatically interpret that extension. No preserved encrypted repository, compatible-key recovery or baseline-matched extraction was exercised. Results cannot be transferred to Borg 1.x or a released Borg 2 binary merely because their documentation looks similar."
url = "https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/tar_cmds.py"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The inspected development branch supplies a repair warning/typed acknowledgement, soft-delete/undelete and compaction dry-run. Normal compaction closes the soft-delete window. These control paths are concrete evidence, but extraction overwrite, credential handling and an observed delete/undelete/compact recovery sequence are not sufficiently covered for the existing backup scope."
url = "https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/check_cmd.py"
confidence = "medium"

+++

**Primary investigation:** Dependency on keys, repository versions, and a working recovery implementation.

**Investigation priority:** Sovereignty high, Longevity high, Locality high, Transparency and Control high. This plans the test effort and is not a finding.

**Synthetic dataset:** A dataset comparable to the restic evaluation, assessed independently.

**Required tests**

1. Create encrypted repositories and multiple archives.
2. Export or otherwise securely preserve recovery-key material where supported.
3. Restore onto a second machine using a clean installation.
4. Verify archive integrity and actual recovered file content.
5. Compare retained permissions, timestamps, links, and extended attributes.
6. Document differences between the specific Borg repository and software versions assessed.
7. Test recovery when the original repository host is unavailable.
8. Test interrupted operations and damaged repository scenarios using disposable copies.
9. Document whether alternative recovery paths exist if the original Borg implementation is discontinued.

**Critical evidence:** Key-recovery instructions, restored content checks, repository-format documentation, integrity verification, and version-compatibility findings.

**Verification scope:** Check/data-verification and repair boundaries are resolved for the pinned development source below. Actual corruption recovery and release-specific behaviour remain open.

**Method note:** Evaluate restic and BorgBackup with the same synthetic files and recovery goals, but not on compression ratio, backup speed, or deduplication efficiency.

**Assessment update: 23 October 2026**

- [x] Resolved: The inspected development exporter writes ordinary TAR file, directory, symlink and hardlink records. PAX adds nanosecond times, xattrs and POSIX ACL fields; BORG adds Base64-encoded MessagePack item metadata under BORG.item.meta. A generic TAR reader cannot be assumed to interpret that Borg-specific metadata. GNU format lacks the additional PAX metadata. [Source](https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/tar_cmds.py).
- [x] Resolved: The check command passes verify_data explicitly to archive checking; full cryptographic file-content verification is opt-in. Repair has a danger/confirmation path and may discard data; a successful repair is not evidence of lossless recovery. The inspected development implementation must not be treated as a test of Borg 1.x releases. [Source](https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/check_cmd.py).
- [x] Resolved: In this development source, delete marks archives for deletion, undelete reverses that state, and normal successful compaction removes soft-deleted archive records and reclaims unreferenced data. Dry-run avoids those changes; compaction preserves soft-deleted archives when missing chunks are detected. This bounded recovery window is not a universal Borg 1.x guarantee. [Source](https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/delete_cmd.py).
- [ ] Open: A declared released version or exact development build, a populated synthetic repository with baseline metadata and preserved recovery material, compatible restore evidence, and before/after delete/undelete/compact, repair and extraction-overwrite records remain missing. Existing source conclusions are limited to the pinned development tree.

**Assessment:** These source findings close the questions above and inform the evidence records; they do not demonstrate a clean restore, complete migration or full application eligibility. Reproduction details and retained sources are recorded in evidence/third-pass/batch-3/. The overall determination remains **Insufficient evidence** for the remaining requirements.

**Human-readable criteria:** Can a user restore representative records on independent hardware, recover without the original provider, verify integrity, and retain the keys or credentials needed for recovery?

**Rating reconciliation: 23 October 2026**

E3 and E5 remain **Not Verified** for the scope stated above. Longevity and Transparency and Control are **Not assessed**, because their required minimums are not established. Sovereignty is also **Not assessed** while E2 remains unverified. These are evidence corrections, not adverse product findings. E1, E4 and Locality were not re-certified by this targeted review.

**Recovery evidence still needed:** A declared released version or exact development build, a populated synthetic repository with baseline metadata and preserved recovery material, compatible restore evidence, and before/after delete/undelete/compact, repair and extraction-overwrite records remain missing. Existing source conclusions are limited to the pinned development tree.

**Next step without a local installation:** Request a reproducible packet for the exact assessed commit or explicitly reassess a released version. Use a disposable synthetic repository and expected manifest, with delete/undelete output before compaction and separately backed-up post-compaction evidence. Independent TAR/manifest inspection can happen here without installing Borg.

Reproducible inspection and the individual decision ledger are retained in `evidence/rating-reconciliation/batch-2/`. Overall: **Insufficient evidence**.

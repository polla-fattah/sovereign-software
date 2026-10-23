+++
title = "Kopia"
category = "Backup & Archival"
summary = "Backup tool with encrypted, deduplicated snapshots and a choice of storage back ends."
substrate = "Encrypted content-addressed repository"
sync_model = "Local, network, or cloud storage chosen by the user"
extract_cmd = "kopia snapshot list"
limitations = ["Repository recovery still requires the password and compatible tooling.","The inspected ZIP writer skips symlinks and directory entries; TAR retains more structure but sets no ACL/xattr fields.","Default snapshot verification does not read every file's full contents.","No target application was installed or executed in rating reconciliation batch 2; source controls are not end-to-end recovery observations.","Complete essential-record recovery and whole-scope consequential-operation coverage remain unverified."]
assessment_status = "complete"
assessment_date = "2026-10-23"
version_assessed = "Source commit 0835005737025dc3e5203df0138c8265686cb4b3; verification sampling and TAR/ZIP metadata boundaries"
assessment_notes = "Rating reconciliation batch 2: E3/E5 remain Not Verified with specific missing evidence; unsupported Longevity, Transparency and Sovereignty findings withdrawn. 1 additional source questions resolved."

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
text = "Kopia creates encrypted snapshots of selected files and directories and supports local, network, and remote repositories."
url = "https://kopia.io/docs/getting-started/"
confidence = "high"

[[evidence]]
target = "E2"
text = "The ZIP output's CreateSymlink only logs that it is not implemented and returns success; directory callbacks also emit no entries. Its files carry mode and modification time. The TAR writer instead emits directory and symlink headers with link targets and UID/GID, but this implementation sets no ACL/xattr fields. ZIP is therefore not a complete filesystem-metadata exit path."
url = "https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/snapshot/restore/zip_output.go"
confidence = "medium"

[[evidence]]
target = "E3"
text = "snapshot verify defaults verify-files-percent to 0. The verifier gates reading entire file objects on a random percentage comparison; 100 requests full reads for all visited file objects, whereas the default is not full file-content verification. Snapshot selection, errors and stopping limits still bound coverage; no corrupted-repository test was run."
url = "https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/snapshot/snapshotfs/snapshot_verifier.go"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Repository location and encryption password are chosen by the operator, including a local filesystem repository."
url = "https://kopia.io/docs/repositories/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Backup and restore are user-directed, but retention deletion, key loss, and recovery approval practices were not tested."
url = "https://kopia.io/docs/getting-started/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "E2 is Not Verified for the existing essential-record scope, so the minimum for a positive Sovereignty finding is not established. Storage choice, local access and export-format strengths remain recorded; the old positive principle is withdrawn, not changed to a verified failure."
url = "https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/snapshot/snapshotfs/snapshot_verifier.go"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 remains Not Verified for Kopia's existing essential-record scope. Documented/exported structure does not establish a baseline-matched clean recovery. The previous positive Longevity finding is withdrawn to Not assessed, not a finding of failure."
url = "https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/snapshot/snapshotfs/snapshot_verifier.go"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Kopia can operate with local or network-attached storage and does not require a server."
url = "https://kopia.io/docs/features/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The inspected controls are retained as positive facts, but whole-scope E5 remains Not Verified. The methodology requires established minimum oversight before a positive Transparency and Control finding; the earlier Meets is therefore withdrawn to Not assessed rather than used as a placeholder for incomplete evidence."
url = "https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/cli/command_snapshot_delete.go"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Full-file verification is percentage-gated, and the inspected ZIP writer omits symlink/directory output while TAR preserves more structure without setting ACL/xattr fields. None of those facts establishes complete decryption/restoration of the existing filesystem scope. Password-dependent repository recovery, executed exports and baseline comparisons remain absent."
url = "https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/snapshot/snapshotfs/snapshot_verifier.go"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Additional pinned source resolves explicit snapshot deletion: without --delete the command reports the selected snapshot and returns before DeleteManifest; the confirmed branch reports deletion and calls DeleteManifest. Source IDs and source-wide selections reach that same gate. Automated retention/maintenance safety, restore overwrite/delete and available recovery are still insufficiently covered for whole-scope E5."
url = "https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/cli/command_snapshot_delete.go"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The explicit snapshot-delete command reports a preview and returns before DeleteManifest unless --delete is set. Confirmed snapshot-ID, root-object-ID and source-wide selections use the shared deletion gate; this does not cover automated maintenance."
url = "https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/cli/command_snapshot_delete.go"
confidence = "medium"

+++

**Assessment update: 23 October 2026**

- [x] Resolved: snapshot verify defaults verify-files-percent to 0. The verifier gates reading entire file objects on a random percentage comparison; 100 requests full reads for all visited file objects, whereas the default is not full file-content verification. Snapshot selection, errors and stopping limits still bound coverage; no corrupted-repository test was run. [Source](https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/snapshot/snapshotfs/snapshot_verifier.go).
- [x] Resolved: The ZIP output's CreateSymlink only logs that it is not implemented and returns success; directory callbacks also emit no entries. Its files carry mode and modification time. The TAR writer instead emits directory and symlink headers with link targets and UID/GID, but this implementation sets no ACL/xattr fields. ZIP is therefore not a complete filesystem-metadata exit path. [Source](https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/snapshot/restore/zip_output.go).
- [ ] Open: A populated synthetic encrypted repository, preserved test password/configuration, full-file verification and baseline-matched restore/export records, plus policy/maintenance and restore overwrite/delete safeguards remain missing. The explicit snapshot-delete confirmation question is now answered; it does not establish maintenance rollback.

**Assessment:** These source findings close the questions above and inform the evidence records; they do not demonstrate a clean restore, complete migration or full application eligibility. Reproduction details and retained sources are recorded in evidence/third-pass/batch-3/. The overall determination remains **Insufficient evidence** for the remaining requirements.

**Human-readable criteria:** Can a user restore representative records on independent hardware, recover without the original provider, verify integrity, and retain the keys or credentials needed for recovery?

**Rating reconciliation: 23 October 2026**

E3 and E5 remain **Not Verified** for the scope stated above. Longevity and Transparency and Control are **Not assessed**, because their required minimums are not established. Sovereignty is also **Not assessed** while E2 remains unverified. These are evidence corrections, not adverse product findings. E1, E4 and Locality were not re-certified by this targeted review.

- [x] Resolved: The explicit snapshot-delete command reports a preview and returns before DeleteManifest unless --delete is set. Confirmed snapshot-ID, root-object-ID and source-wide selections use the shared deletion gate; this does not cover automated maintenance. [Pinned source](https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/cli/command_snapshot_delete.go).

**Recovery evidence still needed:** A populated synthetic encrypted repository, preserved test password/configuration, full-file verification and baseline-matched restore/export records, plus policy/maintenance and restore overwrite/delete safeguards remain missing. The explicit snapshot-delete confirmation question is now answered; it does not establish maintenance rollback.

**Next step without a local installation:** Reuse a version-matched public or assessor-generated synthetic repository packet with verify-files-percent=100 output, expected content/metadata and restore results. Obtain separate retention/maintenance and overwrite/delete before/after records; compare TAR and ZIP independently without installing Kopia here.

Reproducible inspection and the individual decision ledger are retained in `evidence/rating-reconciliation/batch-2/`. Overall: **Insufficient evidence**.

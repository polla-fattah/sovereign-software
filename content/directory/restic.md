+++
title = "restic"
category = "Backup & Archival"
summary = "Command-line backup program that stores encrypted, deduplicated snapshots in a repository the user controls."
substrate = "Encrypted content-addressed repository"
sync_model = "Local or remote repository chosen by the user"
extract_cmd = "restic -r /path/to/repo snapshots"
limitations = ["Repository recovery requires preserved credentials and compatible tooling.","Default check is not a full data read; subset checks do not cover every pack.","ZIP omits ownership/ACL/xattr fields; TAR metadata restoration depends on a compatible receiver and filesystem.","No target application was installed or executed in rating reconciliation batch 2; source controls are not end-to-end recovery observations.","Complete essential-record recovery and whole-scope consequential-operation coverage remain unverified."]
assessment_batch = "C"
assessment_status = "complete"
assessment_date = "2026-10-23"
version_assessed = "Source commit dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4; check data coverage, retention dry-run and TAR/ZIP exit metadata"
assessment_notes = "Rating reconciliation batch 2: E3/E5 remain Not Verified with specific missing evidence; unsupported Longevity, Transparency and Sovereignty findings withdrawn. Retained source observations rechecked."

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
text = "Restic creates encrypted snapshots of files and documents restore and repository checking."
url = "https://restic.readthedocs.io/en/stable/050_restore.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "TAR dump writes ownership, times, symlink targets and PAX attributes, including conversion of supported Linux POSIX ACLs; malformed ACL values are skipped. ZIP writes names, mode, modification time and symlink target bytes, but no ownership, ACL or xattr fields in its header construction. These are exit-format boundaries, not a decrypted restore or a receiving-tool fidelity test."
url = "https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/internal/dump/tar.go"
confidence = "medium"

[[evidence]]
target = "E3"
text = "check defaults read-data to false and only calls ReadPacks when a data-read filter is enabled. read-data requests all data packs; read-data-subset selects only a subset. This resolves check-command coverage, not actual detection or recovery of a damaged repository."
url = "https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/cmd/restic/cmd_check.go"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Restic supports local and user-selected repository backends and keeps encryption keys under user control."
url = "https://restic.readthedocs.io/en/stable/"
confidence = "high"

[[evidence]]
target = "E5"
text = "forget skips snapshot removal in dry-run and propagates DryRun into optional pruning. The repository prune executor returns before its mutation path when DryRun is set. A preview is available without committing those deletions; interruption, authorization and recovery after actual prune remain unverified."
url = "https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/cmd/restic/cmd_forget.go"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "E2 is Not Verified for the existing essential-record scope, so the minimum for a positive Sovereignty finding is not established. Storage choice, local access and export-format strengths remain recorded; the old positive principle is withdrawn, not changed to a verified failure."
url = "https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/internal/dump/tar.go"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 remains Not Verified for restic's existing essential-record scope. Documented/exported structure does not establish a baseline-matched clean recovery. The previous positive Longevity finding is withdrawn to Not assessed, not a finding of failure."
url = "https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/internal/dump/tar.go"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Restic can operate against local storage without a server."
url = "https://restic.readthedocs.io/en/stable/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The inspected controls are retained as positive facts, but whole-scope E5 remains Not Verified. The methodology requires established minimum oversight before a positive Transparency and Control finding; the earlier Partially meets is therefore withdrawn to Not assessed rather than used as a placeholder for incomplete evidence."
url = "https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/cmd/restic/cmd_forget.go"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Full-data reading is opt-in and TAR carries more metadata than ZIP, but retained source does not demonstrate decrypting a preserved repository, restoring the declared filesystem records, or comparing ownership, links, ACLs and xattrs with a baseline. These positive implementation findings are not a complete recovery record."
url = "https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/internal/dump/tar.go"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The inspected forget command reports retention selections and gates snapshot removal on dry-run; its prune call propagates dry-run, and the prune implementation returns before mutation in that mode. These establish useful retention safeguards, not the whole assessed operation surface: restore overwrite/delete, key-management authorization and recovery from interrupted mutations remain insufficiently evidenced."
url = "https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/cmd/restic/cmd_forget.go"
confidence = "medium"

+++

**Primary investigation:** Whether a backup remains independently decryptable, verifiable, and recoverable.

**Investigation priority:** Sovereignty high, Longevity high, Locality high, Transparency and Control high. This plans the test effort and is not a finding.

**Synthetic dataset:** A directory tree of 10,000 files, with symbolic links, permissions, extended attributes where supported, multilingual filenames, and files modified between snapshots.

**Required tests**

1. Initialize a local encrypted repository and create multiple snapshots.
2. Restore selected files and a complete snapshot to a clean machine.
3. Compare file contents, permissions, timestamps, and other metadata against the original dataset.
4. Run repository integrity checks, including checks that read stored data.
5. Test restoration without access to the original backup client or hosting provider.
6. Document exactly which credentials and repository components are necessary for recovery.
7. Test repository portability across storage backends.
8. Simulate interrupted backup and interrupted restoration in a disposable repository.
9. Test retention and deletion behavior, including whether users can understand the consequences of pruning.

**Critical evidence:** Repository integrity reports, cryptographic recovery procedure, restored-file hashes, snapshot comparison, and metadata-preservation results.

**Verification scope:** The data-read distinction is resolved by pinned source inspection below. Detection of actual corruption and lossless recovery still require separate evidence.

**Method note:** Evaluate restic and BorgBackup with the same synthetic files and recovery goals, but not on compression ratio, backup speed, or deduplication efficiency. Those are product comparisons, not foundational sovereignty criteria.

**Assessment update: 23 October 2026**

- [x] Resolved: check defaults read-data to false and only calls ReadPacks when a data-read filter is enabled. read-data requests all data packs; read-data-subset selects only a subset. This resolves check-command coverage, not actual detection or recovery of a damaged repository. [Source](https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/cmd/restic/cmd_check.go).
- [x] Resolved: forget skips snapshot removal in dry-run and propagates DryRun into optional pruning. The repository prune executor returns before its mutation path when DryRun is set. A preview is available without committing those deletions; interruption, authorization and recovery after actual prune remain unverified. [Source](https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/cmd/restic/cmd_forget.go).
- [x] Resolved: TAR dump writes ownership, times, symlink targets and PAX attributes, including conversion of supported Linux POSIX ACLs; malformed ACL values are skipped. ZIP writes names, mode, modification time and symlink target bytes, but no ownership, ACL or xattr fields in its header construction. These are exit-format boundaries, not a decrypted restore or a receiving-tool fidelity test. [Source](https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/internal/dump/tar.go).
- [ ] Open: A synthetic encrypted repository and expected file/metadata manifest, a matched restore report using preserved recovery material, and records for restore overwrite/delete, key changes and interrupted pruning remain missing. TAR/ZIP source differences and optional full-data checking are already answered; do not reopen those documentation questions.

**Assessment:** These source findings close the questions above and inform the evidence records; they do not demonstrate a clean restore, complete migration or full application eligibility. Reproduction details and retained sources are recorded in evidence/third-pass/batch-3/. The overall determination remains **Insufficient evidence** for the remaining requirements.

**Human-readable criteria:** Can a user restore representative records on independent hardware, recover without the original provider, verify integrity, and retain the keys or credentials needed for recovery?

**Rating reconciliation: 23 October 2026**

E3 and E5 remain **Not Verified** for the scope stated above. Longevity and Transparency and Control are **Not assessed**, because their required minimums are not established. Sovereignty is also **Not assessed** while E2 remains unverified. These are evidence corrections, not adverse product findings. E1, E4 and Locality were not re-certified by this targeted review.

**Recovery evidence still needed:** A synthetic encrypted repository and expected file/metadata manifest, a matched restore report using preserved recovery material, and records for restore overwrite/delete, key changes and interrupted pruning remain missing. TAR/ZIP source differences and optional full-data checking are already answered; do not reopen those documentation questions.

**Next step without a local installation:** Obtain an upstream or independent version-matched synthetic recovery evidence packet: repository/configuration, non-secret test credentials, baseline manifest, commands and before/after output. Independently compare recovered bytes, paths, links and metadata using existing tools; no local restic installation is required if the restore was reproducibly run elsewhere.

Reproducible inspection and the individual decision ledger are retained in `evidence/rating-reconciliation/batch-2/`. Overall: **Insufficient evidence**.

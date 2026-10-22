+++
title = "BorgBackup"
category = "Backup & Archival"
summary = "Command-line backup program with deduplication and optional encryption, writing to repositories the user controls."
substrate = "Deduplicating archive repository with optional encryption"
sync_model = "Local or SSH repository chosen by the user"
extract_cmd = "borg list /path/to/repo"
limitations = ["Recovery depends on repository integrity and on the encryption key being preserved."]
assessment_batch = "C"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "not_verified"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "not_verified"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Borg documents listing and extracting archives from repositories controlled by the user, but an actual restore was not performed."
url = "https://borgbackup.readthedocs.io/en/latest/quickstart.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Repositories are usable through Borg commands, but migration to another backup implementation and preservation of all metadata were not tested."
url = "https://borgbackup.readthedocs.io/en/latest/quickstart.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Encryption and repository keys are documented, but independent recovery depends on preserving compatible Borg software, repository integrity, and key material."
url = "https://borgbackup.readthedocs.io/en/stable/faq.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Repositories can be local or remote and are user-selected, but loss of keys or the repository host can remove effective control until recovery is proven."
url = "https://borgbackup.readthedocs.io/en/latest/quickstart.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Borg documents integrity checks and repair limits, but recovery from corruption and the consequences of repair require hands-on testing."
url = "https://borgbackup.readthedocs.io/en/latest/quickstart.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "User-controlled repositories and client-side encryption support custody, while keys and implementation dependence make recovery evidence essential."
url = "https://borgbackup.readthedocs.io/en/stable/faq.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Deduplicated repositories can preserve complete files and metadata, but repository-format and version recovery were not independently demonstrated."
url = "https://borgbackup.readthedocs.io/en/master/internals/data-structures.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Backup creation, inspection, and restoration can be performed locally or over user-selected transport without a vendor service."
url = "https://borgbackup.readthedocs.io/en/latest/quickstart.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The command-line model exposes repository and integrity operations, but destructive repair and key handling require risk-specific testing."
url = "https://borgbackup.readthedocs.io/en/stable/faq.html"
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

**Documentation to verify:** Borg's documentation is said to distinguish repository consistency from full data verification, and to warn that some repair operations may be lossy. A successful repair should not automatically count as complete recovery.

**Method note:** Evaluate restic and BorgBackup with the same synthetic files and recovery goals, but not on compression ratio, backup speed, or deduplication efficiency.

**Preliminary desk assessment:** BorgBackup is described as command-line backup program with deduplication and optional encryption, writing to repositories the user controls. Its primary preservation surface is Deduplicating archive repository with optional encryption, with independence shaped by local or ssh repository chosen by the user. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user restore representative records on independent hardware, recover without the original provider, verify integrity, and retain the keys or credentials needed for recovery?

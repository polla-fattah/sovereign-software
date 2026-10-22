+++
title = "BorgBackup"
category = "Backup & Archival"
summary = "Command-line backup program with deduplication and optional encryption, writing to repositories the user controls."
substrate = "Deduplicating archive repository with optional encryption"
sync_model = "Local or SSH repository chosen by the user"
extract_cmd = "borg list /path/to/repo"
limitations = ["Recovery depends on repository integrity and on the encryption key being preserved."]
assessment_batch = "C"
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

+++
title = "restic"
category = "Backup & Archival"
summary = "Command-line backup program that stores encrypted, deduplicated snapshots in a repository the user controls."
substrate = "Encrypted content-addressed repository"
sync_model = "Local or remote repository chosen by the user"
extract_cmd = "restic -r /path/to/repo snapshots"
limitations = ["Restoration depends on the repository password being preserved."]
assessment_batch = "C"
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

**Documentation to verify:** restic's documentation is said to distinguish ordinary repository checks from checks that read repository data. A lightweight check result must not be treated as proof that every stored file can be restored.

**Method note:** Evaluate restic and BorgBackup with the same synthetic files and recovery goals, but not on compression ratio, backup speed, or deduplication efficiency. Those are product comparisons, not foundational sovereignty criteria.

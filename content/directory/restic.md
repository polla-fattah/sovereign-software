+++
title = "restic"
category = "Backup & Archival"
summary = "Command-line backup program that stores encrypted, deduplicated snapshots in a repository the user controls."
substrate = "Encrypted content-addressed repository"
sync_model = "Local or remote repository chosen by the user"
extract_cmd = "restic -r /path/to/repo snapshots"
limitations = ["Restoration depends on the repository password being preserved."]
assessment_batch = "C"
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
sovereignty = "meets"
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Restic creates encrypted snapshots of files and documents restore and repository checking."
url = "https://restic.readthedocs.io/en/stable/050_restore.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "Restic restores ordinary files to a chosen destination, but migration away from the repository format was not tested."
url = "https://restic.readthedocs.io/en/stable/050_restore.html"
confidence = "high"

[[evidence]]
target = "E3"
text = "Repository checks and restores provide verification, but independent interpretation requires restic-compatible tooling and the repository password."
url = "https://restic.readthedocs.io/en/stable/080_examples.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Restic supports local and user-selected repository backends and keeps encryption keys under user control."
url = "https://restic.readthedocs.io/en/stable/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Backup retention and deletion are consequential, but pruning, key loss, and recovery approval were not tested."
url = "https://restic.readthedocs.io/en/stable/060_forget.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "User-selected repositories and client-side encryption support custody, with repository-format dependence limiting exit."
url = "https://restic.readthedocs.io/en/stable/"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Snapshots preserve ordinary files and support checks and restores, while key and repository compatibility must be maintained."
url = "https://restic.readthedocs.io/en/stable/080_examples.html"
confidence = "high"

[[evidence]]
target = "locality"
text = "Restic can operate against local storage without a server."
url = "https://restic.readthedocs.io/en/stable/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The documentation exposes backup, restore, check, and forget semantics, but destructive retention behavior requires testing."
url = "https://restic.readthedocs.io/en/stable/060_forget.html"
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

**Documentation to verify:** restic's documentation is said to distinguish ordinary repository checks from checks that read repository data. A lightweight check result must not be treated as proof that every stored file can be restored.

**Method note:** Evaluate restic and BorgBackup with the same synthetic files and recovery goals, but not on compression ratio, backup speed, or deduplication efficiency. Those are product comparisons, not foundational sovereignty criteria.

**Preliminary desk assessment:** restic is described as command-line backup program that stores encrypted, deduplicated snapshots in a repository the user controls. Its primary preservation surface is Encrypted content-addressed repository, with independence shaped by local or remote repository chosen by the user. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user restore representative records on independent hardware, recover without the original provider, verify integrity, and retain the keys or credentials needed for recovery?

# restic: documentation review

Reviewed 22 October 2026 from the restic documentation (restic.readthedocs.io) and the project repository on GitHub only. Latest stable release shown: 0.19.1, 5 July 2026 (the releases page header shows "05 Jul" without a year; the year rests on a fetch summary of the changelog, not read in full). Licence: BSD 2-Clause. The restic.net site and the privacy or security pages were not read.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. All pages were read through fetch summaries, so quotes and details rest on those summaries.

## Source follow-up: 23 October 2026

3 specific source questions are resolved in [batch 3](../third-pass/batch-3/README.md#restic) and incorporated into the [application assessment](../../content/directory/restic.md). These pinned implementation findings supersede the corresponding documentation-only uncertainty below; the original review is retained as a dated record.

+- [x] Resolved: check defaults read-data to false and only calls ReadPacks when a data-read filter is enabled. read-data requests all data packs; read-data-subset selects only a subset. This resolves check-command coverage, not actual detection or recovery of a damaged repository.
- [x] Resolved: forget skips snapshot removal in dry-run and propagates DryRun into optional pruning. The repository prune executor returns before its mutation path when DryRun is set. A preview is available without committing those deletions; interruption, authorization and recovery after actual prune remain unverified.
- [x] Resolved: TAR dump writes ownership, times, symlink targets and PAX attributes, including conversion of supported Linux POSIX ACLs; malformed ACL values are skipped. ZIP writes names, mode, modification time and symlink target bytes, but no ownership, ACL or xattr fields in its header construction. These are exit-format boundaries, not a decrypted restore or a receiving-tool fidelity test.

Remaining: Repository/password recovery on independent hardware, restored content/metadata comparison, corruption and interrupted-operation outcomes, actual pruning and key-loss recovery.

## What the documentation says

**Storage and access (E1, E3)**
- The repository format is documented in the Design section: a directory with a `config` file and `data`, `index`, `keys`, `locks`, `snapshots`, and `tmp` folders. Files are named by SHA-256 hash and never modified after writing. [references](https://restic.readthedocs.io/en/stable/100_references.html)
- Key files in `keys/` are JSON; the master keys are derived from the password with scrypt. A repository can hold several passwords, each with its own key file. [references](https://restic.readthedocs.io/en/stable/100_references.html)
- The `config` file carries a `version` field, expected to be 1 or 2. Restic aborts on versions it does not understand. No independent non-restic reader of the format was found in the docs. [references](https://restic.readthedocs.io/en/stable/100_references.html)
- Backends: local directory, SFTP, REST Server, S3 and compatible services, Swift, B2, Azure, Google Cloud Storage, and others via rclone. [preparing a repo](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html)

**Exit and migration (E2)**
- `restore` writes ordinary files to a target; `mount` (FUSE, Linux, macOS, FreeBSD) and `dump` (stdout, tar or zip for folders) are also documented. [restore](https://restic.readthedocs.io/en/stable/050_restore.html)
- Extended attributes are restored by default. On Windows, symbolic links and full security descriptors need elevated privileges, otherwise only the DACL is restored. A FUSE mount cannot restore hard links. [restore](https://restic.readthedocs.io/en/stable/050_restore.html)
- `copy --from-repo` moves snapshots between repositories by downloading and re-uploading. Without matching chunker parameters, shared data may take up to twice the space. [working with repos](https://restic.readthedocs.io/en/stable/045_working_with_repos.html)
- A restic-free export route was not found in the docs.

**Recovery (E3)**
- "Losing your password means that your data is irrecoverably lost." Several keys can be added; empty passwords need `--insecure-no-password` (since 0.17.0). [preparing a repo](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html)
- `check` by default verifies structure only, not that pack files are unmodified. `--read-data` and `--read-data-subset` verify pack contents. Damage is handled with `repair index`; until repaired, some restores may fail. [working with repos](https://restic.readthedocs.io/en/stable/045_working_with_repos.html)
- Version 2 needs restic 0.14.0 or newer. Upgrading is `migrate upgrade_repo_v2` then `prune`; the page says a newer format raises the minimum restic version. [working with repos](https://restic.readthedocs.io/en/stable/045_working_with_repos.html), [preparing a repo](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html)
- The S3 legacy layout is deprecated and 0.17 is stated to be the last version supporting it. [references](https://restic.readthedocs.io/en/stable/100_references.html)

**Continuing authority (E4) and dependencies**
- Governance: a Benevolent Dictator For Life model, with @fd0 named as BDFL. No succession process is described. [GOVERNANCE.md](https://github.com/restic/restic/blob/master/GOVERNANCE.md)
- Telemetry and update checks: not found in the pages read (the scripting page and repository README are silent). The FAQ summary did not cover them. [scripting](https://restic.readthedocs.io/en/stable/075_scripting.html)
- Accounts: none mentioned. Backends may need their own credentials; SFTP uses `ssh` and rclone backends use `rclone`, each with its own configuration. [scripting](https://restic.readthedocs.io/en/stable/075_scripting.html), [preparing a repo](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html)
- Licence is BSD 2-Clause per the README. AppsCode sponsors the Google Cloud Storage and Azure integration tests. [GitHub](https://github.com/restic/restic)
- JSON output "is intended to remain backwards compatible", but fields may be added. Unknown exit codes must be treated as failures. [scripting](https://restic.readthedocs.io/en/stable/075_scripting.html)

**Consequential operations (E5)**
- `forget` removes snapshot references; data stays until `prune`, unless `forget --prune` is used. No undo is described. `--dry-run` previews the result. [forget](https://restic.readthedocs.io/en/stable/060_forget.html)
- Prune locks the repository so backups cannot finish. A failed prune can leave the repository temporarily unusable; `--unsafe-recover-no-free-space` is a last resort. Running `check` afterward is advised. [forget](https://restic.readthedocs.io/en/stable/060_forget.html)
- Empty policies are refused; removing everything needs `--unsafe-allow-remove-all`. In append-only repositories, use `--keep-within`. [forget](https://restic.readthedocs.io/en/stable/060_forget.html)
- In-place restore "can leave files in a partially restored state" if interrupted. `--delete` removes files not in the snapshot; the docs say to use `--dry-run -vv` first. [restore](https://restic.readthedocs.io/en/stable/050_restore.html)

## Gaps to test or read next
1. Create a version 2 repository with the synthetic tree (symlinks, permissions, xattrs, multilingual names), make several snapshots with changes between them, and restore on a clean machine using only the repository and password.
2. Compare hashes, permissions, timestamps, and xattrs of the restore against the source, and record what the filesystem dropped.
3. Run `check`, then `check --read-data`; corrupt one pack in a copy and see which command detects it and what `repair` does.
4. Practice a password-loss drill: add a second key, remove the first, and confirm recovery works only with a remaining key.
5. Interrupt a backup and an in-place restore in a disposable repository and record the state afterward.
6. Run `forget --dry-run`, then `forget --prune`, and see whether a user can foresee the loss; test a repo-to-repo `copy` across backends.
7. Not found or not read: any non-restic reader of the format, a support-lifetime or succession statement, telemetry and update-check statements, the full changelog, CONTRIBUTING.md, the security policy, restic.net, and the Troubleshooting page.

## Rating reconciliation: 23 October 2026

This dated follow-up supersedes the earlier rating freeze, not the historical observations above. [Individual decision and coverage](../rating-reconciliation/batch-2/README.md#restic); [actual assessment](../../content/directory/restic.md).

- E3: Not Verified. Full-data reading is opt-in and TAR carries more metadata than ZIP, but retained source does not demonstrate decrypting a preserved repository, restoring the declared filesystem records, or comparing ownership, links, ACLs and xattrs with a baseline. These positive implementation findings are not a complete recovery record.
- E5: Not Verified. The inspected forget command reports retention selections and gates snapshot removal on dry-run; its prune call propagates dry-run, and the prune implementation returns before mutation in that mode. These establish useful retention safeguards, not the whole assessed operation surface: restore overwrite/delete, key-management authorization and recovery from interrupted mutations remain insufficiently evidenced.
- Longevity and Transparency and Control: Not assessed; their E3/E5 minimums are not established.
- Sovereignty: Not assessed because E2 is Not Verified.

Remaining: A synthetic encrypted repository and expected file/metadata manifest, a matched restore report using preserved recovery material, and records for restore overwrite/delete, key changes and interrupted pruning remain missing. TAR/ZIP source differences and optional full-data checking are already answered; do not reopen those documentation questions.

Next without a local installation: Obtain an upstream or independent version-matched synthetic recovery evidence packet: repository/configuration, non-secret test credentials, baseline manifest, commands and before/after output. Independently compare recovered bytes, paths, links and metadata using existing tools; no local restic installation is required if the restore was reproducibly run elsewhere.

Source branches were inspected, not run. Hashes and the Anki/Zotero fixture queries were independently rechecked with Python/SQLite. No target app or upstream test suite was executed. Existing E1/E4/Locality findings were outside this targeted re-certification.

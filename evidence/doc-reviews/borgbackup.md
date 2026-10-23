# BorgBackup: documentation review

Reviewed 22 October 2026 from the Borg documentation, borgbackup.org, and the GitHub repository only. Stable: 1.4.5 (19 July 2026). Development: 2.0.0b25 beta (27 September 2026), which the project says not to use in production. Licence: BSD 3-clause.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. Some long pages were available only as summaries.

## Source follow-up: 23 October 2026

3 specific source questions are resolved in [batch 3](../third-pass/batch-3/README.md#borgbackup) and incorporated into the [application assessment](../../content/directory/borgbackup.md). These pinned implementation findings supersede the corresponding documentation-only uncertainty below; the original review is retained as a dated record.

+- [x] Resolved: The inspected development exporter writes ordinary TAR file, directory, symlink and hardlink records. PAX adds nanosecond times, xattrs and POSIX ACL fields; BORG adds Base64-encoded MessagePack item metadata under BORG.item.meta. A generic TAR reader cannot be assumed to interpret that Borg-specific metadata. GNU format lacks the additional PAX metadata.
- [x] Resolved: The check command passes verify_data explicitly to archive checking; full cryptographic file-content verification is opt-in. Repair has a danger/confirmation path and may discard data; a successful repair is not evidence of lossless recovery. The inspected development implementation must not be treated as a test of Borg 1.x releases.
- [x] Resolved: In this development source, delete marks archives for deletion, undelete reverses that state, and normal successful compaction removes soft-deleted archive records and reclaims unreferenced data. Dry-run avoids those changes; compaction preserves soft-deleted archives when missing chunks are detected. This bounded recovery window is not a universal Borg 1.x guarantee.

Remaining: Version-pinned encrypted recovery with key/passphrase, content and metadata comparison, actual corruption/repair and compaction outcomes, 1.x-to-2.x transfer, and independent repository interpretation.

## What the documentation says

**Format and openness (E3)**
- The repository format is documented in the Internals pages (transactional key-value store, segment files, a manifest, msgpack-encoded archives). No independent implementation or non-Borg tool that reads a repository was found. [data structures](https://borgbackup.readthedocs.io/en/stable/internals/data-structures.html)
- Compatibility is not promised across major versions. The README says to expect breaking changes when the major number changes. Borg 2 is beta, has no beta-to-beta upgrade code, and says not to use it for production backups. `borg transfer` copies Borg 1 archives into a new Borg 2 repository, re-encrypted. [GitHub](https://github.com/borgbackup/borg), [transfer](https://borgbackup.readthedocs.io/en/master/usage/transfer.html)

**Encryption and keys (E3, E4)**
- Modes include none, authenticated, repokey, and keyfile (with BLAKE2 variants), chosen only at repository creation. "You always need both the Borg key and passphrase". The repository data is "totally inaccessible without the key and the key passphrase". A copy of the key on the backed-up system is not sufficient. No recovery procedure is documented. [init](https://borgbackup.readthedocs.io/en/stable/usage/init.html), [quickstart](https://borgbackup.readthedocs.io/en/stable/quickstart.html), [FAQ](https://borgbackup.readthedocs.io/en/stable/faq.html)
- `borg key export` (including paper and QR forms) and `borg key import` are documented. The exported key stays passphrase-encrypted. [key](https://borgbackup.readthedocs.io/en/stable/usage/key.html)

**Restore and portability (E1, E2)**
- Restore is by `borg extract` or `borg mount` (FUSE). A different machine needs the repository, the key (for keyfile mode), and the passphrase. Extract restores only into an empty destination. [quickstart](https://borgbackup.readthedocs.io/en/stable/quickstart.html), [FAQ](https://borgbackup.readthedocs.io/en/stable/faq.html)
- Preserved metadata varies by OS: ACLs, xattrs, and flags are supported on Linux (flags partial), macOS, and FreeBSD, and not on Cygwin. UNIX sockets are not preserved. Windows support is experimental, and the FUSE mount does not support ACLs or special flags. `export-tar` is "a lossy conversion". [general usage](https://borgbackup.readthedocs.io/en/stable/usage/general.html), [FAQ](https://borgbackup.readthedocs.io/en/stable/faq.html), [tar](https://borgbackup.readthedocs.io/en/stable/usage/tar.html)

**Integrity and recovery (E3)**
- `borg check` has repository and archive levels, and `--verify-data` does full cryptographic verification but is "very time consuming". `--repair` is a "potentially dangerous feature" that can lose data and replaces lost chunks with zero chunks; the docs advise repairing a copy. A formal restore-test procedure was not found, though `extract --dry-run` is documented. [check](https://borgbackup.readthedocs.io/en/stable/usage/check.html), [FAQ](https://borgbackup.readthedocs.io/en/stable/faq.html)
- Interrupted backups leave `.checkpoint` archives (every 30 minutes by default) and are resumable. `borg break-lock` is for stale locks. Append-only mode does not make deletions permanent until compaction, but a later non-append-only write makes them permanent. [FAQ](https://borgbackup.readthedocs.io/en/stable/faq.html), [lock](https://borgbackup.readthedocs.io/en/stable/usage/lock.html), [notes](https://borgbackup.readthedocs.io/en/stable/usage/notes.html)

**Continuing authority (E4) and dependencies**
- Remote repositories use SSH only. Accounts, telemetry, and update checks were not found in the docs, and binaries are upgraded manually. Standalone binaries exist for Linux, FreeBSD, and macOS. [security](https://borgbackup.readthedocs.io/en/stable/internals/security.html), [installation](https://borgbackup.readthedocs.io/en/stable/installation.html)
- Governance: the Borg Collective, with Thomas Waldmann as lead developer. Funding is via Open Collective and similar. A formal support-lifetime policy and a succession statement were not found. Version 1.2 is "oldstable", maintained but with no new releases. [borgbackup.org](https://www.borgbackup.org/), [authors](https://borgbackup.readthedocs.io/en/stable/authors.html)
- Documentation names no route to recover data if Borg were discontinued. Every documented alternative route (mount, extract, `export-tar`) requires Borg.

**Consequential operations (E5)**
- `prune` is "a potentially dangerous command" that applies to all archives unless restricted, with `--dry-run --list` strongly recommended. `delete`, `prune`, and `recreate` free no space until `borg compact`, and compaction ends the possibility of rolling back. `recreate` "might lead to data loss". Deleting a whole repository requires typing `YES`, but environment variables can bypass confirmations. [prune](https://borgbackup.readthedocs.io/en/stable/usage/prune.html), [compact](https://borgbackup.readthedocs.io/en/stable/usage/compact.html), [recreate](https://borgbackup.readthedocs.io/en/stable/usage/recreate.html), [delete](https://borgbackup.readthedocs.io/en/stable/usage/delete.html)

## Gaps to test or read next
1. Create an encrypted repository, back up a dataset with links, permissions, and xattrs, and restore it on a clean machine with only the exported key and passphrase.
2. Compare restored metadata to the original and record what the destination filesystem dropped.
3. Practice a key-loss drill on a disposable repository.
4. Run `check --verify-data`, then a deliberate corruption and `--repair` on a copy.
5. Test `borg transfer` from 1.4 to a 2.0 beta in a disposable setup.
6. Not found: independent readers of the format, a support-lifetime or succession policy, and `create`, `config`, and `serve` pages (not fetched).

## Rating reconciliation: 23 October 2026

This dated follow-up supersedes the earlier rating freeze, not the historical observations above. [Individual decision and coverage](../rating-reconciliation/batch-2/README.md#borgbackup); [actual assessment](../../content/directory/borgbackup.md).

- E3: Not Verified. The development source writes interpretable TAR fields plus Borg-specific metadata; ordinary TAR readers do not automatically interpret that extension. No preserved encrypted repository, compatible-key recovery or baseline-matched extraction was exercised. Results cannot be transferred to Borg 1.x or a released Borg 2 binary merely because their documentation looks similar.
- E5: Not Verified. The inspected development branch supplies a repair warning/typed acknowledgement, soft-delete/undelete and compaction dry-run. Normal compaction closes the soft-delete window. These control paths are concrete evidence, but extraction overwrite, credential handling and an observed delete/undelete/compact recovery sequence are not sufficiently covered for the existing backup scope.
- Longevity and Transparency and Control: Not assessed; their E3/E5 minimums are not established.
- Sovereignty: Not assessed because E2 is Not Verified.

Remaining: A declared released version or exact development build, a populated synthetic repository with baseline metadata and preserved recovery material, compatible restore evidence, and before/after delete/undelete/compact, repair and extraction-overwrite records remain missing. Existing source conclusions are limited to the pinned development tree.

Next without a local installation: Request a reproducible packet for the exact assessed commit or explicitly reassess a released version. Use a disposable synthetic repository and expected manifest, with delete/undelete output before compaction and separately backed-up post-compaction evidence. Independent TAR/manifest inspection can happen here without installing Borg.

Source branches were inspected, not run. Hashes and the Anki/Zotero fixture queries were independently rechecked with Python/SQLite. No target app or upstream test suite was executed. Existing E1/E4/Locality findings were outside this targeted re-certification.

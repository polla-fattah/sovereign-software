# Kopia: documentation review

Reviewed 22 October 2026 from the Kopia documentation (kopia.io/docs), the kopia.io privacy policy, and the official GitHub repository (README, releases, GOVERNANCE.md) only. Latest stable release shown on the GitHub releases page: v0.23.1, dated "16 Jun 01:27". The page omits the year; the asset timestamps were summarised as 2026-06-16, so 2026 is inferred, not stated. Licence: the README says Apache License, Version 2.0. Page text was read through a summarising fetch tool, so every fact below rests on a summary of the page, not the raw text.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Source follow-up: 23 October 2026

2 specific source questions are resolved in [batch 3](../third-pass/batch-3/README.md#kopia) and incorporated into the [application assessment](../../content/directory/kopia.md). These pinned implementation findings supersede the corresponding documentation-only uncertainty below; the original review is retained as a dated record.

+- [x] Resolved: snapshot verify defaults verify-files-percent to 0. The verifier gates reading entire file objects on a random percentage comparison; 100 requests full reads for all visited file objects, whereas the default is not full file-content verification. Snapshot selection, errors and stopping limits still bound coverage; no corrupted-repository test was run.
- [x] Resolved: The ZIP output's CreateSymlink only logs that it is not implemented and returns success; directory callbacks also emit no entries. Its files carry mode and modification time. The TAR writer instead emits directory and symlink headers with link targets and UID/GID, but this implementation sets no ACL/xattr fields. ZIP is therefore not a complete filesystem-metadata exit path.

Remaining: Encrypted repository/password recovery on another machine, content and filesystem-metadata comparisons, executed TAR/ZIP export inspection, corruption detection and snapshot deletion/maintenance.

## What the documentation says

**Storage and access (E1, E3)**
- Kopia encrypts file contents and file names before they leave the machine, and the docs say it "does not allow creating unencrypted backups". Choices are AES-256 or ChaCha20. [features](https://kopia.io/docs/features/)
- Back ends: S3 and compatible, Azure, B2, Google Cloud Storage, WebDAV, SFTP, Rclone (experimental), local disk, NAS and mounted directories, and the Kopia Repository Server. [repositories](https://kopia.io/docs/repositories/)
- The architecture page describes four layers (blob, content-addressable blocks, objects, manifests) and blob prefixes `p`, `q`, `x`. It gives no byte-level specification and points to Go API docs. [architecture](https://kopia.io/docs/advanced/architecture/)
- Whether non-Kopia tools can read a repository is not found in the docs. The architecture page says the block layer "is not meant to be used directly" (summary wording).
- No access control exists when sharing a repository: anyone with the password gets full access. [features](https://kopia.io/docs/features/)

**Exit and migration (E2)**
- `kopia snapshot restore` writes a directory tree. Owners, permissions, and times are restored by default; other metadata such as extended attributes is not described. No zip or tar output is mentioned. [snapshot restore](https://kopia.io/docs/reference/command-line/common/snapshot-restore/)
- Snapshots can also be mounted as a filesystem with `kopia mount`, or restored from the GUI. [getting started](https://kopia.io/docs/getting-started/)
- `kopia repository sync-to` copies a repository to another storage location, including filesystem. Deletions are not propagated unless `--delete` is given. A separate migration procedure is not described. [synchronization](https://kopia.io/docs/advanced/synchronization/)
- Native Google Drive and Rclone-based Google Drive repositories cannot be used interchangeably. [repositories](https://kopia.io/docs/repositories/)

**Recovery (E3)**
- The password is not recoverable: "There is absolutely no way to restore any of your backed up files" without it (summary quote). [getting started](https://kopia.io/docs/getting-started/) The repositories page does not say what happens if it is lost.
- `kopia snapshot verify` checks structure only and does not download or decrypt blobs, so it cannot find bit rot. `--verify-files-percent` reads files back. That option needs the CLI. [consistency](https://kopia.io/docs/advanced/consistency/)
- The corruption page offers manual steps, such as moving newest `x` index files aside, and warns wrong steps can make a repository unrecoverable. [consistency](https://kopia.io/docs/advanced/consistency/)
- Compatibility: each release is meant to read its own version and at least one previous version. Older repository formats are readable but not writable unless documented. Upgrading a format needs "explicit human action". [compatibility](https://kopia.io/docs/advanced/compatibility/)
- Upgrade to format version 2 (v0.9) means v0.8 and earlier "will not be able to open" the repository. No downgrade procedure is given. [upgrade](https://kopia.io/docs/upgrade/)
- How an older Kopia treats a repository written by a newer one is not found in the docs.

**Continuing authority (E4) and dependencies**
- No account is required by Kopia; the user supplies and pays for storage. [features](https://kopia.io/docs/features/)
- The app periodically connects to github.com for the newest version; the policy says no personal information is transferred. `--check-for-updates` appears as a flag, default on, with a 168h interval (from a search result, flags page not read). Application telemetry is not described. [privacy policy](https://kopia.io/docs/privacy-policy/), [flags](https://kopia.io/docs/reference/command-line/flags/)
- Governance: a PMC with two named members (the chair and one other), committers, and consensus decisions. No succession plan for the PMC or the project is described. [GOVERNANCE.md](https://github.com/kopia/kopia/blob/master/GOVERNANCE.md)
- v0.23.0 removed LZ4 support; the effect on existing repositories is not stated. [releases](https://github.com/kopia/kopia/releases)

**Consequential operations (E5)**
- Full maintenance runs daily by default. It garbage-collects content not reachable from any snapshot and compacts packs. `--safety=none` disables all safety checks and can corrupt a repository. [maintenance](https://kopia.io/docs/advanced/maintenance/)
- Retention policies set counts of hourly to annual snapshots (defaults shown include 48 hourly, 14 daily). Snapshot deletion is not covered on the getting-started page. [getting started](https://kopia.io/docs/getting-started/)
- Restore overwrites existing files by default. `--delete-extra` is off by default; `--no-overwrite-files` and `--skip-existing` exist. [snapshot restore](https://kopia.io/docs/reference/command-line/common/snapshot-restore/)
- Object lock can be enabled only at repository creation via the CLI, and locks cannot be shortened or removed. [ransomware protection](https://kopia.io/docs/advanced/ransomware-protection/), [repositories](https://kopia.io/docs/repositories/)
- v0.23.1 notes mention a fix for a rare race condition that could lead to data loss. [releases](https://github.com/kopia/kopia/releases)

## Gaps to test or read next
1. Create a repository on a local disk with synthetic files, snapshot it, then restore to a new directory and compare hashes, permissions, timestamps, and extended attributes.
2. On another machine with only the repository folder and password, connect and restore. Repeat with a wrong password and record the error.
3. Try listing and reading the repository folder with non-Kopia tools to see what is visible (names, sizes); the docs do not say.
4. Run `snapshot verify` with and without `--verify-files-percent 100` after flipping a byte in a pack file, and compare detection.
5. Create a repository with one version, open it with a newer and an older release, and record which operations are refused.
6. Delete a snapshot, run full maintenance, and observe what is removed and when; try `sync-to` with and without `--delete`.
7. Check the update check and any outbound traffic with the network blocked, and read the flags page for the exact switch.
8. Not read: the encryption, compression, ECC, actions, caching, and sharding pages; the snapshot delete and `repository set-parameters` references; the Repository Server pages; the full release notes for LZ4 removal; the licence file text.

## Rating reconciliation: 23 October 2026

This dated follow-up supersedes the earlier rating freeze, not the historical observations above. [Individual decision and coverage](../rating-reconciliation/batch-2/README.md#kopia); [actual assessment](../../content/directory/kopia.md).

- E3: Not Verified. Full-file verification is percentage-gated, and the inspected ZIP writer omits symlink/directory output while TAR preserves more structure without setting ACL/xattr fields. None of those facts establishes complete decryption/restoration of the existing filesystem scope. Password-dependent repository recovery, executed exports and baseline comparisons remain absent.
- E5: Not Verified. Additional pinned source resolves explicit snapshot deletion: without --delete the command reports the selected snapshot and returns before DeleteManifest; the confirmed branch reports deletion and calls DeleteManifest. Source IDs and source-wide selections reach that same gate. Automated retention/maintenance safety, restore overwrite/delete and available recovery are still insufficiently covered for whole-scope E5.
- Longevity and Transparency and Control: Not assessed; their E3/E5 minimums are not established.
- Sovereignty: Not assessed because E2 is Not Verified.

- [x] Resolved: The explicit snapshot-delete command reports a preview and returns before DeleteManifest unless --delete is set. Confirmed snapshot-ID, root-object-ID and source-wide selections use the shared deletion gate; this does not cover automated maintenance. [Pinned source](https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/cli/command_snapshot_delete.go).

Remaining: A populated synthetic encrypted repository, preserved test password/configuration, full-file verification and baseline-matched restore/export records, plus policy/maintenance and restore overwrite/delete safeguards remain missing. The explicit snapshot-delete confirmation question is now answered; it does not establish maintenance rollback.

Next without a local installation: Reuse a version-matched public or assessor-generated synthetic repository packet with verify-files-percent=100 output, expected content/metadata and restore results. Obtain separate retention/maintenance and overwrite/delete before/after records; compare TAR and ZIP independently without installing Kopia here.

Source branches were inspected, not run. Hashes and the Anki/Zotero fixture queries were independently rechecked with Python/SQLite. No target app or upstream test suite was executed. Existing E1/E4/Locality findings were outside this targeted re-certification.

# Third pass, batch 3

Reviewed 23 October 2026, Asia/Baghdad. Fifteen specific source questions are resolved across six applications. These findings also appear in their actual application assessments.

## Reproduce the inspection

```powershell
python evidence/third-pass/batch-3/inspect_sources.py
```

Only Python's standard library is required. The script retains 26 pinned upstream files, locates the reviewed code paths, parses Gitea's issue JSON schema, and extracts Paperless manifest queries and encrypted-field definitions using Python's syntax tree parser. It never imports or executes downloaded code. [source-results.json](source-results.json) records commits, URLs, line anchors, hashes and results; [inspection-plan.json](inspection-plan.json) records the exact inspection scope. Existing inputs are reused offline and checked against the recorded hashes.

These are static implementation findings, not executed backups, restores, corruption experiments or CI results. Commits identify inspected source, not released binaries. The Borg findings are development-source-specific and must not be generalized to Borg 1.x. Upstream copyright and licensing continue to apply to retained inputs. Resolving a question about a limitation does not remove that limitation.

## Gitea

- [x] Resolved: The dump implementation writes gitea-db.sql, app.ini, repositories and data, and iterates configured LFS, attachment and package storage into data/lfs, data/attachments and data/packages. Skip flags can omit these stores; LFS is nested under repository dumping and requires its server to be enabled. This resolves implementation coverage, not backup consistency or restoration. [Inspected source](https://github.com/go-gitea/gitea/blob/ad37b88631ade5af5db738a4ebe4ab89ed8d237d/cmd/dump.go).
- [x] Resolved: The repository dumper serializes issues to issue.yml and comments/reviews into numbered YAML files; repository metadata, Git/wiki data and release assets have separate paths. The retained issue JSON schema and migration types expose identifiers, labels, assignees and review links. This is an inspectable export representation, not proof of complete migration to another forge. [Inspected source](https://github.com/go-gitea/gitea/blob/ad37b88631ade5af5db738a4ebe4ab89ed8d237d/services/migrations/dump.go).

Related source: [Issue schema](https://github.com/go-gitea/gitea/blob/ad37b88631ade5af5db738a4ebe4ab89ed8d237d/modules/migration/schemas/issue.json); [Review fields](https://github.com/go-gitea/gitea/blob/ad37b88631ade5af5db738a4ebe4ab89ed8d237d/modules/migration/review.go).

Remaining: A real dump/clean restore with counts, attachments, LFS, hooks and permissions; cross-version and cross-forge fidelity; live-backup consistency and deletion recovery.

## Forgejo

- [x] Resolved: The inspected dump writes forgejo-db.sql and app.ini and collects repositories, data and configured LFS, attachment and package objects. Skip flags can omit stores; skipping repositories also bypasses their LFS branch. Database and file jobs run concurrently, so their inclusion alone does not establish a consistent live backup. [Inspected source](https://codeberg.org/forgejo/forgejo/src/commit/b021976fb1a87ec18543c3a5586ecfabcc1c06e7/cmd/dump.go).
- [x] Resolved: Before calling DumpRepository, dump-repo checks whether repo_dir is a directory and refuses an existing non-empty destination. The source explicitly links this guard to error cleanup that can remove repo_dir. This resolves the implemented protection for this command, not deletion, purge or administrator authorization more generally. [Inspected source](https://codeberg.org/forgejo/forgejo/src/commit/b021976fb1a87ec18543c3a5586ecfabcc1c06e7/cmd/dump_repo.go).

Remaining: Clean instance restoration and relationship/permission comparison; live versus stopped consistency; cross-version and cross-forge migration; purge recovery and external CI/authentication dependencies.

## Paperless-ngx

- [x] Resolved: Static parsing identifies the export manifest queries for documents, tags, correspondents, accounts, permissions, workflows, notes and custom fields. Documents use global_objects; originals are copied separately and the manifest records their export paths. Archive and thumbnail copies can be omitted, and audit logs are conditional. This corrects the earlier description of a database image: it is serialized model data plus files. [Inspected source](https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/document_exporter.py).
- [x] Resolved: The importer reads metadata.json or legacy version.json. A version mismatch produces a warning and continues, rather than an unconditional rejection. This distinguishes runtime enforcement from supported-version guidance; successful cross-version import remains unverified. [Inspected source](https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/document_importer.py).
- [x] Resolved: Exporter passphrase protection targets mail-account password/refresh_token and social-token token/token_secret fields. Without a passphrase the exporter warns that sensitive fields will be plaintext. It is field-level protection, not encryption of document files or the whole export. [Inspected source](https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/mixins.py).

Remaining: An independently inspected real export and clean import comparing document hashes, OCR, relationships, accounts and permissions; actual supported/unsupported-version outcomes; trash/purge and workflow authorization.

## Kopia

- [x] Resolved: snapshot verify defaults verify-files-percent to 0. The verifier gates reading entire file objects on a random percentage comparison; 100 requests full reads for all visited file objects, whereas the default is not full file-content verification. Snapshot selection, errors and stopping limits still bound coverage; no corrupted-repository test was run. [Inspected source](https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/snapshot/snapshotfs/snapshot_verifier.go).
- [x] Resolved: The ZIP output's CreateSymlink only logs that it is not implemented and returns success; directory callbacks also emit no entries. Its files carry mode and modification time. The TAR writer instead emits directory and symlink headers with link targets and UID/GID, but this implementation sets no ACL/xattr fields. ZIP is therefore not a complete filesystem-metadata exit path. [Inspected source](https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/snapshot/restore/zip_output.go).

Related source: [CLI verification defaults](https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/cli/command_snapshot_verify.go); [TAR writer](https://github.com/kopia/kopia/blob/0835005737025dc3e5203df0138c8265686cb4b3/snapshot/restore/tar_output.go).

Remaining: Encrypted repository/password recovery on another machine, content and filesystem-metadata comparisons, executed TAR/ZIP export inspection, corruption detection and snapshot deletion/maintenance.

## restic

- [x] Resolved: check defaults read-data to false and only calls ReadPacks when a data-read filter is enabled. read-data requests all data packs; read-data-subset selects only a subset. This resolves check-command coverage, not actual detection or recovery of a damaged repository. [Inspected source](https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/cmd/restic/cmd_check.go).
- [x] Resolved: forget skips snapshot removal in dry-run and propagates DryRun into optional pruning. The repository prune executor returns before its mutation path when DryRun is set. A preview is available without committing those deletions; interruption, authorization and recovery after actual prune remain unverified. [Inspected source](https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/cmd/restic/cmd_forget.go).
- [x] Resolved: TAR dump writes ownership, times, symlink targets and PAX attributes, including conversion of supported Linux POSIX ACLs; malformed ACL values are skipped. ZIP writes names, mode, modification time and symlink target bytes, but no ownership, ACL or xattr fields in its header construction. These are exit-format boundaries, not a decrypted restore or a receiving-tool fidelity test. [Inspected source](https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/internal/dump/tar.go).

Related source: [Prune executor](https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/internal/repository/prune.go); [ZIP writer](https://github.com/restic/restic/blob/dd09b6bd01af220b1d5d95c0d4d7d472e05e05c4/internal/dump/zip.go).

Remaining: Repository/password recovery on independent hardware, restored content/metadata comparison, corruption and interrupted-operation outcomes, actual pruning and key-loss recovery.

## BorgBackup

- [x] Resolved: The inspected development exporter writes ordinary TAR file, directory, symlink and hardlink records. PAX adds nanosecond times, xattrs and POSIX ACL fields; BORG adds Base64-encoded MessagePack item metadata under BORG.item.meta. A generic TAR reader cannot be assumed to interpret that Borg-specific metadata. GNU format lacks the additional PAX metadata. [Inspected source](https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/tar_cmds.py).
- [x] Resolved: The check command passes verify_data explicitly to archive checking; full cryptographic file-content verification is opt-in. Repair has a danger/confirmation path and may discard data; a successful repair is not evidence of lossless recovery. The inspected development implementation must not be treated as a test of Borg 1.x releases. [Inspected source](https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/check_cmd.py).
- [x] Resolved: In this development source, delete marks archives for deletion, undelete reverses that state, and normal successful compaction removes soft-deleted archive records and reclaims unreferenced data. Dry-run avoids those changes; compaction preserves soft-deleted archives when missing chunks are detected. This bounded recovery window is not a universal Borg 1.x guarantee. [Inspected source](https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/delete_cmd.py).

Related source: [Undelete implementation](https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/undelete_cmd.py); [Compaction implementation](https://github.com/borgbackup/borg/blob/45f8b178ae892ae73fcaa3127c951b0044cd7a7e/src/borg/archiver/compact_cmd.py).

Remaining: Version-pinned encrypted recovery with key/passphrase, content and metadata comparison, actual corruption/repair and compaction outcomes, 1.x-to-2.x transfer, and independent repository interpretation.

## Assessment integration

All six pages under `content/directory/` contain the resolved checkboxes, dated findings, pinned evidence and remaining work. The gap register and original review notes link here. Partial eligibility values previously used by Paperless, Kopia and restic are normalized to the framework's `not_verified` value; they were already treated that way by the assessment engine. No overall Pass is inferred from the narrower source findings.


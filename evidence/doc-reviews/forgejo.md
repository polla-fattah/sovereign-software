# Forgejo: documentation review

Reviewed 22 October 2026 from the Forgejo documentation (v17.0 admin and user pages), forgejo.org, and the Codeberg repository page only. The download page lists 17.0.0 as the latest release and omits a date and year; the release schedule page gives 15 October 2026 for 17.0 (end of life 28 January 2027). The repository page shows a release-notes commit for v17.0.1 dated 2026-10-17, but does not confirm that release. Licence: GPLv3 or later; versions before v9.0 are MIT.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- State is spread over several stores: the database (SQLite file, MariaDB, MySQL or PostgreSQL), Git repositories on disk (default `data/forgejo-repositories`), other storage directories or S3-compatible storage, queues, indexers, and `app.ini`. [backup](https://forgejo.org/docs/latest/admin/setup/backup/)
- Repositories are plain Git on disk. The backup page does not describe the database schema or say whether other tools can read it (not found in the docs). [backup](https://forgejo.org/docs/latest/admin/setup/backup/)
- Secrets live in configuration: `SECRET_KEY`, `JWT_SECRET`, and SSH host keys must be kept with the backup. [backup](https://forgejo.org/docs/latest/admin/setup/backup/)

**Exit and migration (E2)**
- `forgejo dump` produces one archive (zip or tar) of files and database, with `--skip-*` flags for repositories, LFS, attachments, packages and more. The command-line page does not list the exact archive contents. [command line](https://forgejo.org/docs/latest/admin/command-line/) (page read only to character 100000 of 117302)
- Mirroring covers Git content only: branches, tags, commits. LFS objects are not mirrored over SSH. What happens to issues, pull requests and wiki on export was not found; the repository-migration contributor page was not read. [repo mirror](https://forgejo.org/docs/latest/user/repo-mirror/)
- Pull mirroring only works for repositories that do not yet exist on the instance. [repo mirror](https://forgejo.org/docs/latest/user/repo-mirror/)

**Recovery (E3)**
- The backup page lists restore steps: restore database, restore files, restore `app.ini`, start Forgejo, then run admin cron jobs for SSH keys and the issue indexer. [backup](https://forgejo.org/docs/latest/admin/setup/backup/)
- It says Forgejo "doesn't provide or recommend any specific backup tool" and does not mention `forgejo dump`, so the dump-to-restore path is not documented there. It also gives no version compatibility table. [backup](https://forgejo.org/docs/latest/admin/setup/backup/)
- Upgrades: full backup required before a stable-series jump; no downgrade procedure; an older binary is refused against a newer database, so rollback means restoring the backup. [upgrade](https://forgejo.org/docs/latest/admin/upgrade/)

**Continuing authority (E4) and dependencies**
- The update checker is on by default (weekly), using a DNS TXT lookup on `release.forgejo.org`. The deprecated HTTP endpoint points at dl.gitea.com. [config cheat sheet](https://forgejo.org/docs/latest/admin/config-cheat-sheet/) (second half read via summary of a truncated page)
- Telemetry: not found in the docs. Federation is off by default and described as experimental. [config cheat sheet](https://forgejo.org/docs/latest/admin/config-cheat-sheet/)
- Webhooks can only call allowed hosts (default `external`) and can be disabled. [config cheat sheet](https://forgejo.org/docs/latest/admin/config-cheat-sheet/)
- Governance: README says it was created "because the project should be owned by an independent community". Maintainers are not named on the page; CODEOWNERS and the governance repository were not read. [repository](https://codeberg.org/forgejo/forgejo)
- Support: quarterly releases with LTS lines (15.0 to 15 July 2027, 19.0 to 13 July 2028). Succession statements: not found. [release schedule](https://forgejo.org/docs/latest/admin/release-schedule/)

**Consequential operations (E5)**
- Backup warning: "An inconsistent backup may result in data loss when attempting to restore it." Shutting Forgejo down during backup is strongly recommended. [backup](https://forgejo.org/docs/latest/admin/setup/backup/)
- Losing `SECRET_KEY` means encrypted values (webhooks, Actions secrets, 2FA) cannot be read. [backup](https://forgejo.org/docs/latest/admin/setup/backup/)
- `forgejo admin user delete --purge` removes the user, their repositories, organisations and comments; no warning or undo is listed. [command line](https://forgejo.org/docs/latest/admin/command-line/)
- Push mirroring force-pushes and "will overwrite any changes in the remote repository". `doctor recreate-table` warns to back up first. A soft-delete or trash setting was not found. [repo mirror](https://forgejo.org/docs/latest/user/repo-mirror/), [command line](https://forgejo.org/docs/latest/admin/command-line/)

## Gaps to test or read next
1. Build the synthetic instance (five repositories, issues, pull requests, reviews, attachments, users, CI config), run `forgejo dump`, list the archive, and compare against the backup page's list of stores.
2. Restore the dump on a second server and compare issue and pull-request counts, attachments, permissions and Git refs with the original.
3. Take a database and file backup while running versus stopped, and check whether the restore is consistent.
4. Open the SQLite file with a generic tool and list tables, to see what a third party could read.
5. Migrate one repository to another forge and record what is lost beyond Git history.
6. Upgrade one major series, then try the older binary and confirm the refusal and the restore path.
7. Delete a test user with `--purge` and check whether anything is recoverable without the backup.
8. Not read: repository-migration contributor page, administrator and permission docs, privacy statements, CODEOWNERS, governance repository, the end of the command-line page, and the dump archive layout.

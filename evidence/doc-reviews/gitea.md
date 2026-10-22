# Gitea: documentation review

Reviewed 22 October 2026 from the Gitea documentation (docs.gitea.com), about.gitea.com, and the go-gitea/gitea repository and releases page only. Latest stable release found: v28.2.0, shown as "18 Oct 18:25" on the releases page with no year; the changelog entry dates it 2026-10-18. The licence is MIT (stated on the repository README and about.gitea.com). Several long pages were read only in part (see gaps).

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- Data is split across a repository directory, a data directory, and a database. `[repository] ROOT` defaults to `{APP_DATA_PATH}/gitea-repositories`; `DB_TYPE` accepts mysql, postgres, mssql, and sqlite3. [config cheat sheet](https://docs.gitea.com/administration/config-cheat-sheet)
- `gitea dump` writes a ZIP (default) containing `app.ini`, `custom/`, `data/` (attachments, avatars, LFS, indexers, SQLite file if used), `repos/`, `gitea-db.sql`, and logs. Other archive types (tar, tar.gz, tar.zst and more) are selectable. [backup and restore](https://docs.gitea.com/administration/backup-and-restore), [command line](https://docs.gitea.com/administration/command-line)
- The repository directory is a full copy of the repositories, so plain Git tools can read it; the docs do not say this explicitly (inference). Database schema documentation was not found in the docs.

**Exit and migration (E2)**
- `dump-repo` exports one repository (wiki, issues, labels, releases, release assets, milestones, pull requests, comments) to a local directory; `restore-repo` loads it. Sources listed: git, github, gitea, gitlab. [command line](https://docs.gitea.com/administration/command-line)
- The migration page describes a GitHub form and says a username is needed to migrate "issues, pull requests, etc."; it gives no list of what is lost and does not mention dump-repo. GitLab has no built-in option there. [migration](https://docs.gitea.com/usage/migration)
- Pull and push mirrors cover "branches, tags, and commits". Push mirrors force-push; SSH push mirrors are unsupported. [mirrors](https://docs.gitea.com/usage/repo-mirror)
- A format description or export to another forge's import format: not found in the docs.

**Recovery (E3)**
- There is no built-in restore command. Restore is manual: unzip, move files, fix ownership, import the SQL, restart, then run `gitea admin regenerate hooks`; skipping that can make pushes fail. [backup and restore](https://docs.gitea.com/administration/backup-and-restore)
- Stop the instance during backup or the database and repositories can be inconsistent. The XORM-based SQL dump has open issues; native `mysqldump` or `pg_dump` is suggested. Converting database type "is not well-tested". [backup and restore](https://docs.gitea.com/administration/backup-and-restore)
- On start Gitea runs database migrations itself. An old version cannot run on an upgraded database; downgrading across minor versions is unsupported and needs a backup. Back up before every database upgrade. [upgrade](https://docs.gitea.com/installation/upgrade-from-gitea)
- The backup page has no explicit version-compatibility rule for restoring a dump into a different version (not found there; the upgrade page examples use 1.4/1.5 numbering, not the current v28 line).

**Continuing authority (E4) and dependencies**
- Licence MIT. Leadership and commercial support come from CommitGo, Inc.; funding also through OpenCollective. A MAINTAINERS file exists but was not read. No succession or end-of-life statement found. [README](https://github.com/go-gitea/gitea), [about.gitea.com](https://about.gitea.com/)
- The update checker (`[cron.update_checker]`) is enabled by default and contacts `dl.gitea.com`. No telemetry setting appeared in the parts read; the README makes no telemetry claim. [config cheat sheet](https://docs.gitea.com/administration/config-cheat-sheet)
- Optional outbound features: mailer (off by default), mirrors, migrations, Gravatar/libravatar, external object storage, and `DEFAULT_ACTIONS_URL` set to `github`. `OFFLINE_MODE` defaults to true (no CDN or Gravatar). No account on a vendor service appears required for self-hosting. [config cheat sheet](https://docs.gitea.com/administration/config-cheat-sheet)
- v28.0.0 lists a breaking change that routes Git network operations through an internal proxy. [releases](https://github.com/go-gitea/gitea/releases)

**Consequential operations (E5)**
- `doctor recreate-table` carries the warning "highly recommended to back-up your database". `doctor check --fix` applies automatic fixes only when `--fix` is passed. [command line](https://docs.gitea.com/administration/command-line)
- `admin user delete` and `admin auth delete` carry no warning on that page. No soft-delete or restore-deleted-repository feature was found; the API documents `DELETE /repos/{owner}/{repo}`. [command line](https://docs.gitea.com/administration/command-line), [API](https://docs.gitea.com/api/operations/repo-delete/)
- v28.0.0 adds a `RUN_RETENTION_DAYS` setting that deletes old action runs. A cron job deletes delivered webhook records older than `168h` by default. [releases](https://github.com/go-gitea/gitea/releases), [config cheat sheet](https://docs.gitea.com/administration/config-cheat-sheet)

## Gaps to test or read next
1. Create a synthetic instance with issues, PRs, attachments, LFS, and a wiki; run `gitea dump`, restore on a clean host, and compare repositories, counts, and hooks.
2. Restore a dump into a newer and an older release and record whether it starts, and what errors appear.
3. Run `dump-repo` then read the output directory with no Gitea; check issues and comments are in an open format. Compare against the source instance for lost fields.
4. Import a Gitea repository into another forge and list what is lost (users, permissions, reviews).
5. Read the unread tail of the config cheat sheet (storage, `[lfs]`, `[attachment]`, update checker disable switch) and the first part of the releases history.
6. Not read: MAINTAINERS, CONTRIBUTING, privacy or terms pages, security policy, database schema docs, Actions runner docs.
7. Delete a repository and a user on a test instance, and check whether anything remains recoverable without a backup.

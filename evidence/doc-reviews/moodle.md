# Moodle: documentation review

Reviewed 22 October 2026. docs.moodle.org returned HTTP 403 to every direct fetch (Course_backup, Course_restore, Site_backup, Backup_and_restore_FAQ), so no MoodleDocs page was read in full. MoodleDocs facts below come only from a web-search summary of those pages and are marked "(search summary)". Read directly: the [GitHub README](https://github.com/moodle/moodle) and the [moodledev.io releases page](https://moodledev.io/general/releases). Moodle's privacy page (moodle.org/privacy) also returned 403, and download.moodle.org timed out (504). Latest stable release per moodledev.io: Moodle 5.3.0, released 5 October 2026 (build 2026100500). Licence per the README: GPL version 3.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, and most MoodleDocs content rests on a summary, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 10](../third-pass/batch-10/README.md#moodle) and reflected in the [application page](../../content/directory/moodle.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The backup task conditionally generates users.xml when user inclusion or kept roles require it, and conditionally includes user files depending also on anonymization. It separately writes files.xml and moodle_backup.xml before packaging. A course backup's user/file coverage is therefore settings-dependent, not equivalent to a complete site backup.
- [x] Resolved: The restore precheck code treats a backup from a newer Moodle as a warning, not by itself a blocking error; an excessively old backup format is an error. Cross-site user restoration also branches on user-creation permission. This corrects an overbroad assumption that every downgrade attempt is automatically refused.

Remaining: Real course/site restore comparisons, student submissions/grade coverage, deleting-target recovery, plugin dependencies and version-specific migrations remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- The Course backup page (search summary) says a course backup is an `.mbz` file, internally a tarball, and that an administrator can enable a compression format stored as `.tar.gz`. The Backup and restore FAQ (search summary) says it can be extracted with tar. [Course backup](https://docs.moodle.org/503/en/Course_backup), [FAQ](https://docs.moodle.org/503/en/Backup_and_restore_FAQ)
- A site has three parts: database, uploaded files (dataroot, "moodledata"), and code. Locations come from `config.php`. The docs give a `mysqldump` script for the database (search summary). [Site backup](https://docs.moodle.org/503/en/Site_backup)
- Internal XML structure of the `.mbz`, and whether other tools can read it: not found in the docs read. A developer page, [Backup and Restore](https://docs.moodle.org/dev/Backup_and_Restore), appeared in search but was not read.

**Exit and migration (E2)**
- Course backups restore into Moodle. A restore into another learning platform: not found in the docs.
- Course backups handle only parts of moodledata and the database, and are not a substitute for a full site backup (search summary). [Site backup](https://docs.moodle.org/503/en/Site_backup)
- Older courses: 1.9 backups restore into 2.1 or later, but blocks and user data are not restored (search summary). [Course backup](https://docs.moodle.org/503/en/Course_backup)
- When moving servers, the migration page says FTP transfer of the `filedir` folder must use binary mode or files corrupt (search summary). [Moodle migration](https://docs.moodle.org/35/en/Moodle_migration)

**Recovery (E3)**
- The FAQ rule (search summary): restore only to the same or a newer Moodle than made the backup, because an older target "can result in the restore process failing to complete". [FAQ](https://docs.moodle.org/503/en/Backup_and_restore_FAQ)
- Site restore: restore database, files and code separately or together; create a new database and point `config.php` at it so the original stays intact (search summary). [Site restore](https://docs.moodle.org/502/en/Site_restore)
- The upgrade guide recommends backing up all three areas before an upgrade (search summary). [Upgrading](https://docs.moodle.org/20/en/Upgrading)

**Continuing authority (E4) and dependencies**
- Licence: "under version 3 of the GNU General Public License" (README). Hosting and support: commercial support through Moodle Partners, MoodleCloud mentioned. The Moodle Association is named as a community resource. Succession or governance statements: not found in the docs read. [GitHub](https://github.com/moodle/moodle)
- Support: Moodle 5.3 is labelled LTS; general support ends 4 October 2027 and security support 1 October 2029. The same page also says the most recent LTS is 4.5, so the page contradicts itself on LTS status. [releases](https://moodledev.io/general/releases)
- Site registration (search summary of a 2.4-era page): statistics are sent to moodle.org every 7 days once registered, and registration is described as optional. The stats privacy notice lists site name, URL, admin email and statistics. Current behaviour and the update check were not read. [Site registration](https://docs.moodle.org/24/en/Site_registration), [stats privacy](https://stats.moodle.org/privacy)
- Accounts: whether any account at moodle.org is required for self-hosting: not found in the docs read.

**Consequential operations (E5)**
- Restore offers adding to an existing course or deleting its contents first; admins can lock restore defaults. The wording of the overwrite warning was not found (search summary). [Course restore](https://docs.moodle.org/501/en/Course_restore)
- Reset course empties user data and is irreversible; docs advise a backup with user data first (search summary). [Reset course](https://docs.moodle.org/502/en/Reset_course)
- Course deletion removes data from the database and disk (search summary). [course/delete](https://docs.moodle.org/502/en/course/delete) A recycle bin page exists but was not read. [Recycle bin](https://docs.moodle.org/310/en/Recycle_bin)
- Grade correction, audit logs and permission documentation: not found in the docs read.

## Gaps to test or read next
1. Read Course_backup, Course_restore and Site_backup in full (retry later, or via a different route); every MoodleDocs bullet above needs confirming against the page.
2. Make a synthetic course with quiz, forum, grades and two users. Back up with and without user data, extract with `tar -xzf`, and list which files carry grades, submissions and logs.
3. Restore that `.mbz` into a clean instance of the same version, then one version newer, and diff course content, grades and users.
4. Attempt restore into an older version to see the failure mode the FAQ warns about.
5. Take a full site backup (database, moodledata, code), restore to a new host, and compare record counts.
6. Test "delete contents then restore" on a course with student submissions and check what is unrecoverable.
7. Read the privacy page, the update-check and registration pages for the current release, and the security policy (the README mentions one, content not seen).
8. Find what the docs say about exporting learner records to a non-Moodle format (not found in the docs read).

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-10/README.md#moodle); [actual assessment](../../content/directory/moodle.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Course backup source conditionally includes users/files and writes several manifests, so a course package is not automatically a full site archive. Complete student submissions, grades, plugin state, accounts and permissions have not been independently reconstructed and compared.
- E5: Not Verified. Restore prechecks distinguish warnings/errors and permission-dependent user creation. They do not establish full target-deletion, grading/workflow mutation, role authority and correction/recourse across the declared course/site configuration.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Real course/site restore comparisons, student submissions/grade coverage, deleting-target recovery, plugin dependencies and version-specific migrations remain untested. E5 needs role- and target-aware restore/delete/grading authority, inspectable mutations and available correction for student/course records.

Next without a local installation: Inspect synthetic course/site manifests and files with expected submissions, grades, roles and plugin dependencies; obtain same-version external restore/permission/deletion comparisons. Do not use real student data.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

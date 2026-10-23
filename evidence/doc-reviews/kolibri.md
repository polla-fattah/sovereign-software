# Kolibri: documentation review

Reviewed 22 October 2026 from the Kolibri documentation on Read the Docs ("latest"), learningequality.org (download page and Kolibri privacy policy), and the GitHub repository and releases page only. Latest stable version: 0.19.5. The download page says "Released: July 14, 2026"; the GitHub releases page shows "13 Jul" without a year, so the two dates differ by a day. The licence is MIT, copyright Learning Equality. Several facts below rest on summaries of fetched pages, not on full reading, and are marked.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 10](../third-pass/batch-10/README.md#kolibri) and reflected in the [application page](../../content/directory/kolibri.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The dbrestore command explicitly limits its intended use to restoring the same device, not cross-device replication; --latest selects the current major/minor version's backup and the command refuses a running Kolibri instance. This answers the scope of that recovery route without claiming a restore succeeded.
- [x] Resolved: Bulk import excludes retained users, facility administrators and the specified acting user from --delete, then calls hard_delete=True for remaining selected users. Database mutation is inside the not-dryrun branch, including clearing memberships of omitted classes. A CSV omission can therefore be consequential, not merely an update.

Remaining: Actual backup restoration/content coverage, cross-device migration, user/log export completeness, downgrade behavior and runtime deletion/traffic observations remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- Runtime files and channels live in a `.kolibri` folder in the user's home directory unless `KOLIBRI_HOME` is set. Changing it does not move data; the folder must be copied by hand. [command line](https://kolibri.readthedocs.io/en/latest/manage/command_line.html)
- The command-line page describes the `databases` and `storage` subfolders for channels. It does not name the database engine or document the schema (not found in the docs read). The Index entry's SQLite claim is therefore not confirmed by the pages read. [command line](https://kolibri.readthedocs.io/en/latest/manage/command_line.html)
- Channels exported to a drive are copied as channel databases plus resource files into a `KOLIBRI_DATA` folder. [resources](https://kolibri.readthedocs.io/en/latest/manage/resources.html)
- Primary storage location can be changed in Device settings. [device](https://kolibri.readthedocs.io/en/latest/manage/device.html)

**Exit and migration (E2)**
- Admins can download Detail and Summary usage logs as CSV from the Facility Data tab. `kolibri manage exportlogs` offers `summary` and `session` types. [data](https://kolibri.readthedocs.io/en/latest/manage/data.html), [command line](https://kolibri.readthedocs.io/en/latest/manage/command_line.html)
- `bulkexportusers` writes users to CSV. `bulkimportusers` has `--dryrun` and `--delete`. Whether the user CSV carries passwords, permissions or progress was not found. [command line](https://kolibri.readthedocs.io/en/latest/manage/command_line.html)
- You cannot import your own files directly; content must first be built as a channel on Kolibri Studio. [resources](https://kolibri.readthedocs.io/en/latest/manage/resources.html)
- Peer import needs Kolibri 0.11 or later on every device involved. [resources](https://kolibri.readthedocs.io/en/latest/manage/resources.html)
- Facility sync to another device is described as usable "for backup purposes", and sync with the Kolibri Data Portal needs a project token. [data](https://kolibri.readthedocs.io/en/latest/manage/data.html)

**Recovery (E3)**
- Kolibri makes a database backup automatically during each version upgrade. `kolibri manage dbbackup` writes a time-stamped `.dump` file to `./kolibri/backups`. `dbrestore --latest` or `--select` restores one. [command line](https://kolibri.readthedocs.io/en/latest/manage/command_line.html)
- The page says restore is "not intended for replication across different devices", so it is single-device recovery. [command line](https://kolibri.readthedocs.io/en/latest/manage/command_line.html)
- The 0.19.5 notes describe a migration that adds deferrable flags to foreign keys from versions before 0.17, and say nothing on backup or upgrade steps (summary of a page truncated at 100,000 of 105,400 characters). [releases](https://github.com/learningequality/kolibri/releases)
- Downgrade behaviour and cross-version restore compatibility: not found in the docs.

**Continuing authority (E4) and dependencies**
- Offline-first; it runs on a local server reachable over a local network, and content can move by USB drive. [Learning Equality](https://learningequality.org/kolibri/)
- Importing from Studio needs internet. Peer import uses other servers by IP, default port 8080, and firewalls can block it. [resources](https://kolibri.readthedocs.io/en/latest/manage/resources.html)
- Licence: MIT, copyright Learning Equality. [LICENSE](https://github.com/learningequality/kolibri/blob/develop/LICENSE), [download](https://learningequality.org/download/)
- Learning Equality is described as a 501(c)(3) organisation with a "community ownership" design principle. No governance structure, maintenance commitment, supported-version policy or succession statement was found; a CLA is not mentioned in the README summary. [Learning Equality](https://learningequality.org/kolibri/), [GitHub](https://github.com/learningequality/kolibri)
- The Kolibri privacy policy does not mention update checks or telemetry by name. It says interaction records may be analysed for research, normally in aggregate. Whether the server software contacts Learning Equality by default was not found. [privacy policy](https://learningequality.org/kolibri-privacy-policy)
- Download page lists Windows, Debian/Ubuntu, Raspberry Pi, macOS, and a Python `.pex` (Python 3.6 or later). [download](https://learningequality.org/download/)

**Consequential operations (E5)**
- CSV user import deletes any users and classes missing from the file, and the page says changes "cannot be easily reverted". [data](https://kolibri.readthedocs.io/en/latest/manage/data.html)
- `deleteuser` "will permanently erase all the user data"; the docs mention GDPR requests as a use. `deletechannel` frees disk space. [command line](https://kolibri.readthedocs.io/en/latest/manage/command_line.html)
- Channel and resource deletion asks for confirmation. Cancelled imports can leave incomplete resources, and channel updates can move resources and break active lessons and quizzes. [resources](https://kolibri.readthedocs.io/en/latest/manage/resources.html)
- Facility renaming propagates to linked devices. Facility deletion and log deletion were not described. [facility](https://kolibri.readthedocs.io/en/latest/manage/facility.html), [data](https://kolibri.readthedocs.io/en/latest/manage/data.html)

## Gaps to test or read next
1. Open `db.sqlite3` (or whatever is under `KOLIBRI_HOME`) with a generic SQLite tool on a synthetic install, confirm the engine, and list tables for users, logs and content.
2. Round trip: create a synthetic facility with learners, lessons and quiz results, run `bulkexportusers` and `exportlogs`, then compare against the database to list what the CSVs omit.
3. Run `dbbackup`, wipe the install, run `dbrestore` on the same device, and compare users and progress. Then try restoring on a second device and record the result.
4. Upgrade one minor version, then try to open the data with the previous version, to test the downgrade gap.
5. Run `bulkimportusers --dryrun` and then `--delete` against a throwaway facility to check the deletion scope and reversibility.
6. Capture outbound traffic from an idle server for a day to check for update checks or telemetry.
7. Not read: Facility and KDP sync pages, the options.ini page, the full 0.19.5 notes past character 100,000, CONTRIBUTING, the security policy, and the licence text of bundled dependencies.
8. Reconcile the release date (July 14 versus 13 Jul) and read the readthedocs version selector to confirm "latest" matches 0.19.5.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-10/README.md#kolibri); [actual assessment](../../content/directory/kolibri.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The inspected dbrestore route is for the same device, selects version-bounded backups and refuses a running instance. It does not demonstrate cross-device restoration of content, user/progress/log data or complete backup coverage for the existing learning profile.
- E5: Not Verified. Bulk import has dry-run mutation guards and exclusions for administrators/acting users, but can hard-delete omitted selected users and clear memberships. Effective role authorization, content/progress deletion visibility and recovery are not comprehensively established by that command alone.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass covers a content-transfer lead, not preservation of essential learner identity, progress and logs in a replacement workflow. Complete cross-device/user-data migration remains unestablished.

Remaining: Actual backup restoration/content coverage, cross-device migration, user/log export completeness, downgrade behavior and runtime deletion/traffic observations remain untested. E5 needs effective importer/role settings, omission-driven deletion and progress/content recourse beyond one dry-run guard.

Next without a local installation: Use a synthetic content/channel/user-progress/device backup packet with expected identities/logs and version boundaries; inspect exports and obtain same-version external restore/bulk-import/deletion records.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

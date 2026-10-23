+++
title = "Fossil SCM"
category = "VCS & Core"
summary = "Engineered by the creator of SQLite. Packages version control, tickets, bug tracking, and wiki documentation into one durable SQLite file that runs an instant local web UI that works offline."
substrate = "Single Standalone SQLite Database File"
sync_model = "Peer-to-peer HTTP/SSH sync"
extract_cmd = "fossil ui repository.fossil"
pilot_stage = 5
limitations = ["Pinned source inspection, not application execution.","Full repository restoration, private/shunned artifacts, account/settings coverage and real purge recovery remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-23"
version_assessed = "Pinned source 9f1ea15e06b9be018175d231a939d19372fd4b8b"
assessment_notes = "Rating reconciliation batch 1: E3 Not Verified; E5 Not Verified. Longevity Not assessed; Transparency and Control Not assessed. See the declared scope and reasons below; earlier bounded evidence findings remain recorded."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
locality = "meets"

[[evidence]]
target = "E1"
text = "Fossil repositories are single local files, and the project documents cloning and consistent repository backups."
url = "https://fossil-scm.org/home/doc/trunk/www/quickstart.wiki"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Fossil documents Git export and repository cloning, but a complete migration of tickets, wiki, configuration, and private data was not tested."
url = "https://fossil-scm.org/home/doc/trunk/www/faq.wiki"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The pinned export implementation limits --git export to check-ins, excluding tickets, wiki, technical notes and attachments. Git migration cannot replace a complete Fossil repository backup."
url = "https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/export.c"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Local repository operations, checkouts, history, and synchronization can be performed under user control without a mandatory hosted service."
url = "https://fossil-scm.org/home/doc/trunk/www/quickstart.wiki"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Purge retains removed artifacts in local purgeevent/purgeitem graveyard tables, with undo and --explain/--dry-run. Obliterate removes that recovery path and prompts unless --force bypasses confirmation. These graveyard tables are not synchronized."
url = "https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/purge.c"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A single local repository file and export paths give users strong custody, with hosted synchronization remaining optional."
url = "https://fossil-scm.org/home/doc/trunk/www/quickstart.wiki"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 remains Not Verified for the existing essential-record scope. The methodology requires established E3 before a positive Longevity finding, so the earlier positive rating is withdrawn pending recovery evidence; source/format strengths are retained as facts, not graded as a failure."
url = "https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/export.c"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core version control and repository operations work locally; synchronization extends rather than defines the workflow."
url = "https://fossil-scm.org/home/doc/trunk/www/quickstart.wiki"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "E5 remains Not Verified. The methodology's Partially meets threshold requires demonstrated minimum oversight, so the earlier positive Transparency and Control finding is withdrawn rather than retained on the strength of one documented control. This is Not assessed, not Does not meet."
url = "https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/purge.c"
confidence = "medium"
[[evidence]]
target = "E3"
text = "The retained source proves Git export omits wiki, tickets, technical notes and attachments, but that is a limitation of this exit route, not proof that native Fossil recovery fails. Complete native restoration of artifacts, accounts, settings, private/shunned content and attachments has not been demonstrated. E3 therefore remains Not Verified."
url = "https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/export.c"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Purge preview, local graveyard undo and obliterate confirmation are positively established by source inspection. They do not cover the full consequential-operation surface: synchronization/configuration propagation, shunning/rebuild and effective recovery have not been sufficiently established. A guarded purge routine alone does not establish whole-scope E5."
url = "https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/purge.c"
confidence = "medium"

+++

**Verification scenario:** Clone a repository, transfer wiki, tickets, users, and attachments, and operate without the origin server.

**What may invalidate an overconfident claim:** Check what `fossil ui` demonstrates versus a portable full export.

**Documentation starting point:** <https://fossil-scm.org/home/doc/trunk/www/index.wiki>

**Evidence update: 23 October 2026**

- [x] Resolved: The pinned export implementation limits --git export to check-ins, excluding tickets, wiki, technical notes and attachments. Git migration cannot replace a complete Fossil repository backup. [Source](https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/export.c).
- [x] Resolved: Purge retains removed artifacts in local purgeevent/purgeitem graveyard tables, with undo and --explain/--dry-run. Obliterate removes that recovery path and prompts unless --force bypasses confirmation. These graveyard tables are not synchronized. [Source](https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/purge.c).
- [ ] Open: Full repository restoration, private/shunned artifacts, account/settings coverage and real purge recovery remain untested.

**Assessment follow-up:** E3/E5 and their associated principle findings are now reconciled in rating batch 1 below. Earlier source/fixture observations remain valid within their stated scope; they are not themselves blanket Pass decisions.

**Human-readable criteria:** Can users retain complete history and metadata, operate and recover locally, migrate to another implementation, and understand the effects of synchronization or automation?

## Rating reconciliation: 23 October 2026

**Scope:** The existing source-pinned application scope; no new application execution. Individual-custodian perspective. The existing broad preservation/workflow scope is retained, rather than narrowed to the one successfully inspected source path.

| Criterion | Current finding |
|---|---|
| E3 Independent interpretation and recovery | Not Verified |
| E5 Governability of consequential actions | Not Verified |
| Longevity | Not assessed |
| Transparency and Control | Not assessed |

**E3:** The retained source proves Git export omits wiki, tickets, technical notes and attachments, but that is a limitation of this exit route, not proof that native Fossil recovery fails. Complete native restoration of artifacts, accounts, settings, private/shunned content and attachments has not been demonstrated. E3 therefore remains Not Verified.

**E5:** Purge preview, local graveyard undo and obliterate confirmation are positively established by source inspection. They do not cover the full consequential-operation surface: synchronization/configuration propagation, shunning/rebuild and effective recovery have not been sufficiently established. A guarded purge routine alone does not establish whole-scope E5.

**longevity:** E3 remains Not Verified for the existing essential-record scope. The methodology requires established E3 before a positive Longevity finding, so the earlier positive rating is withdrawn pending recovery evidence; source/format strengths are retained as facts, not graded as a failure.

**transparency:** E5 remains Not Verified. The methodology's Partially meets threshold requires demonstrated minimum oversight, so the earlier positive Transparency and Control finding is withdrawn rather than retained on the strength of one documented control. This is Not assessed, not Does not meet.

**Evidence record:** evidence/rating-reconciliation/batch-1/README.md and runtime-results.json. No target software was installed. Source inspections remain source inspections; no application-level recovery or destructive action was executed.

**Remaining work:** The existing open recovery and consequential-action scenarios remain pending; the individually explained E3/E5 blockers above determine the current Not Verified and Not assessed findings.

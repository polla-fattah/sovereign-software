+++
title = "Fossil SCM"
category = "VCS & Core"
summary = "Engineered by the creator of SQLite. Packages version control, tickets, bug tracking, and wiki documentation into one durable SQLite file that runs an instant local web UI that works offline."
substrate = "Single Standalone SQLite Database File"
sync_model = "Peer-to-peer HTTP/SSH sync"
extract_cmd = "fossil ui repository.fossil"
pilot_stage = 5
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "partial"
locality = "meets"
transparency = "partial"

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
text = "The repository is SQLite-backed and Fossil documents backup and restore, but clones do not necessarily contain every remote configuration or private artifact."
url = "https://fossil-scm.org/home/doc/trunk/www/backup.md"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Local repository operations, checkouts, history, and synchronization can be performed under user control without a mandatory hosted service."
url = "https://fossil-scm.org/home/doc/trunk/www/quickstart.wiki"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Distributed history and local repository state are inspectable, but sync omissions, private branches, and configuration drift require explicit operational review."
url = "https://fossil-scm.org/home/doc/trunk/www/backup.md"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A single local repository file and export paths give users strong custody, with hosted synchronization remaining optional."
url = "https://fossil-scm.org/home/doc/trunk/www/quickstart.wiki"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Repository history is durable, but Fossil’s own documentation warns that ordinary clones are incomplete backups for some data."
url = "https://fossil-scm.org/home/doc/trunk/www/backup.md"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core version control and repository operations work locally; synchronization extends rather than defines the workflow."
url = "https://fossil-scm.org/home/doc/trunk/www/quickstart.wiki"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The single-file and command-line model is inspectable, but sync and configuration exceptions can create hidden divergence without careful backup procedures."
url = "https://fossil-scm.org/home/doc/trunk/www/backup.md"
confidence = "medium"
+++

**Verification scenario:** Clone a repository, transfer wiki, tickets, users, and attachments, and operate without the origin server.

**What may invalidate an overconfident claim:** Check what `fossil ui` demonstrates versus a portable full export.

**Documentation starting point:** <https://fossil-scm.org/home/doc/trunk/www/index.wiki>

**Preliminary desk assessment:** Fossil SCM is described as engineered by the creator of sqlite. packages version control, tickets, bug tracking, and wiki documentation into one durable sqlite file that runs an instant local web ui that works offline. Its primary preservation surface is Single Standalone SQLite Database File, with independence shaped by peer-to-peer http/ssh sync. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can users retain complete history and metadata, operate and recover locally, migrate to another implementation, and understand the effects of synchronization or automation?

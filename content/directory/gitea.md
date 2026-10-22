+++
title = "Gitea"
category = "VCS & Core"
summary = "Self-hostable Git service that provides repositories, issues, and pull requests on infrastructure the user controls."
substrate = "Bare Git repositories plus a relational database"
sync_model = "Self-hosted server"
extract_cmd = "gitea dump"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "not_verified"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "partial"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Gitea documents a dump containing repositories, database, configuration, data, and attachments, but a complete restore was not tested."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Git repositories can be moved independently, but issues, accounts, attachments, hooks, and service configuration require a Gitea-specific migration."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The documentation describes database and filesystem restoration but notes that the process is manual and database tooling can have caveats."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Self-hosting gives the operator control over the service, while hosted use remains dependent on the operator."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Repository history is inspectable, but permissions, hooks, database state, and restore ordering require deployment-specific testing."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Self-hosting and Git repositories support custody, but complete application exit includes more than the Git objects."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Git data is durable, while Gitea-specific collaboration records depend on a coordinated backup and manual restore."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Git work can continue locally, but collaboration features require the running service."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Repository history is visible, but service-side permissions and automation depend on configuration and operational review."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"
+++

**Preliminary desk assessment:** Gitea is described as self-hostable git service that provides repositories, issues, and pull requests on infrastructure the user controls. Its primary preservation surface is Bare Git repositories plus a relational database, with independence shaped by self-hosted server. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can users retain complete history and metadata, operate and recover locally, migrate to another implementation, and understand the effects of synchronization or automation?

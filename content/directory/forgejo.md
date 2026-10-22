+++
title = "Forgejo"
category = "VCS & Core"
summary = "Self-hostable software forge that provides Git hosting, issues, and pull requests on infrastructure the user controls."
substrate = "Bare Git repositories plus a relational database"
sync_model = "Self-hosted server"
extract_cmd = "forgejo dump"
assessment_batch = "D"
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
text = "Forgejo stores repositories as regular files and documents backup of its database and data directory, but a complete restore was not tested."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Git repositories can be cloned or moved independently, but issues, pull requests, attachments, accounts, and configuration require a Forgejo-specific migration path."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The documentation identifies multiple data stores and restoration dependencies; independent recovery of a representative instance was not demonstrated."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Self-hosting gives the operator control over data and service availability, but users of a hosted Forgejo instance still depend on that operator."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Issues, pull requests, permissions, and administrative actions are mediated by the service; audit and restoration behavior require deployment-specific testing."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Self-hosting can preserve authority, but the full application state is distributed across repositories, database, storage, configuration, and keys."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Git repositories have strong independent longevity, while Forgejo-specific collaboration data needs a tested backup and restore process."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Git work can continue locally, but web collaboration, issue tracking, and remote coordination require the service."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Repository history is inspectable, but permissions, automation, and service-side actions depend on configuration and deployment."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"
+++

**Primary investigation:** Whether users can recover an entire collaborative project, not only its Git commits.

**Investigation priority:** Sovereignty high, Longevity high, Locality high, Transparency and Control high. This plans the test effort and is not a finding.

**Synthetic dataset:** An instance with five repositories, branches, tags, issues, pull requests, review comments, labels, releases, attachments, users, permissions, and CI configuration.

**Required tests**

1. Clone every Git repository and verify full commit and reference history.
2. Export or back up issues, pull requests, reviews, attachments, and other application-managed records.
3. Restore a complete Forgejo instance on an independent server.
4. Check whether user identities, permissions, and relationships survive.
5. Simulate permanent withdrawal of the original hosted instance.
6. Attempt migration to another Git hosting platform and document losses beyond Git history.
7. Review authorization boundaries for administrators, repository owners, and collaborators.
8. Test backup consistency between the SQL database and repository storage.
9. Evaluate workflows requiring externally hosted CI services or authentication providers separately.

**Critical evidence:** Git history comparison, application database restoration, issue and pull-request relationship checks, attachment inventory, and authorization test results.

**Documentation to verify:** Forgejo's guidance is said to note that data is spread across Git repositories, SQL databases, and file storage, and to recommend consistent backups. A complete instance-restore test is therefore essential.

**Preliminary desk assessment:** Forgejo is described as self-hostable software forge that provides git hosting, issues, and pull requests on infrastructure the user controls. Its primary preservation surface is Bare Git repositories plus a relational database, with independence shaped by self-hosted server. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can users retain complete history and metadata, operate and recover locally, migrate to another implementation, and understand the effects of synchronization or automation?

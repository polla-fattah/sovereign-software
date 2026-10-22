+++
title = "Forgejo"
category = "VCS & Core"
summary = "Self-hostable software forge that provides Git hosting, issues, and pull requests on infrastructure the user controls."
substrate = "Bare Git repositories plus a relational database"
sync_model = "Self-hosted server"
extract_cmd = "forgejo dump"
assessment_batch = "D"
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

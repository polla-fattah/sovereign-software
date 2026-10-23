+++
title = "Forgejo"
category = "VCS & Core"
summary = "Self-hostable software forge that provides Git hosting, issues, and pull requests on infrastructure the user controls."
substrate = "Bare Git repositories plus a relational database"
sync_model = "Self-hosted server"
extract_cmd = "forgejo dump"
assessment_batch = "D"
limitations = ["Dump inclusion is not proof of a consistent live backup or complete restoration.","The dump-repo non-empty-directory guard does not cover repository purge or other destructive commands."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit b021976fb1a87ec18543c3a5586ecfabcc1c06e7; dump storage layout and dump-repo destination protection"
assessment_notes = "Individually reconciled in rating batch 4 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "not_verified"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "partial"

[[evidence]]
target = "E1"
text = "The inspected dump writes forgejo-db.sql and app.ini and collects repositories, data and configured LFS, attachment and package objects. Skip flags can omit stores; skipping repositories also bypasses their LFS branch. Database and file jobs run concurrently, so their inclusion alone does not establish a consistent live backup."
url = "https://codeberg.org/forgejo/forgejo/src/commit/b021976fb1a87ec18543c3a5586ecfabcc1c06e7/cmd/dump.go"
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
text = "Before calling DumpRepository, dump-repo checks whether repo_dir is a directory and refuses an existing non-empty destination. The source explicitly links this guard to error cleanup that can remove repo_dir. This resolves the implemented protection for this command, not deletion, purge or administrator authorization more generally."
url = "https://codeberg.org/forgejo/forgejo/src/commit/b021976fb1a87ec18543c3a5586ecfabcc1c06e7/cmd/dump_repo.go"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Forgejo does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Forgejo's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Git work can continue locally, but web collaboration, issue tracking, and remote coordination require the service."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://codeberg.org/forgejo/forgejo/src/commit/b021976fb1a87ec18543c3a5586ecfabcc1c06e7/cmd/dump_repo.go"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The dump collects several stores concurrently and can omit repository/LFS branches; inclusion alone does not prove point-in-time consistency. Full user, permission, pull-request/review and attachment reconstruction is not established. A complete independent forge recovery cannot be inferred from a Git clone or dump command."
url = "https://forgejo.org/docs/v17.0/admin/setup/backup/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The pinned dump-repo destination guard protects against cleanup deleting a pre-existing non-empty destination. It does not establish administrator/collaborator authority, hook/permission mutation, repository purge or complete recourse in the declared shared project scope."
url = "https://codeberg.org/forgejo/forgejo/src/commit/b021976fb1a87ec18543c3a5586ecfabcc1c06e7/cmd/dump_repo.go"
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

**Assessment update: 23 October 2026**

- [x] Resolved: The inspected dump writes forgejo-db.sql and app.ini and collects repositories, data and configured LFS, attachment and package objects. Skip flags can omit stores; skipping repositories also bypasses their LFS branch. Database and file jobs run concurrently, so their inclusion alone does not establish a consistent live backup. [Source](https://codeberg.org/forgejo/forgejo/src/commit/b021976fb1a87ec18543c3a5586ecfabcc1c06e7/cmd/dump.go).
- [x] Resolved: Before calling DumpRepository, dump-repo checks whether repo_dir is a directory and refuses an existing non-empty destination. The source explicitly links this guard to error cleanup that can remove repo_dir. This resolves the implemented protection for this command, not deletion, purge or administrator authorization more generally. [Source](https://codeberg.org/forgejo/forgejo/src/commit/b021976fb1a87ec18543c3a5586ecfabcc1c06e7/cmd/dump_repo.go).
- [ ] Open: Clean instance restoration and relationship/permission comparison; live versus stopped consistency; cross-version and cross-forge migration; purge recovery and external CI/authentication dependencies. E5 needs administrator/contributor permission, hook and purge safeguards, with recoverable state and external-service boundaries.

**Assessment:** These source findings close the questions above and inform the evidence records; they do not demonstrate a clean restore, complete migration or full application eligibility. Reproduction details and retained sources are recorded in evidence/third-pass/batch-3/. The overall determination remains **Insufficient evidence** for the remaining requirements.

**Human-readable criteria:** Can users retain complete history and metadata, operate and recover locally, migrate to another implementation, and understand the effects of synchronization or automation?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Clean instance restoration and relationship/permission comparison; live versus stopped consistency; cross-version and cross-forge migration; purge recovery and external CI/authentication dependencies. E5 needs administrator/contributor permission, hook and purge safeguards, with recoverable state and external-service boundaries.

**Next without installing locally:** Use a synthetic complete Forgejo dump with declared stopped/live consistency and expected role/relationship/object hashes; inspect the packet and seek matching primary-source or recorded administrator/contributor deletion/recovery checks.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-4/`. Overall: **Insufficient evidence**.

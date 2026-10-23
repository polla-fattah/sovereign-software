+++
title = "Gitea"
category = "VCS & Core"
summary = "Self-hostable Git service that provides repositories, issues, and pull requests on infrastructure the user controls."
substrate = "Bare Git repositories plus a relational database"
sync_model = "Self-hosted server"
extract_cmd = "gitea dump"
limitations = ["Dump skip flags and disabled stores can omit required data; a coordinated database/filesystem restore remains unverified.","Repository YAML is inspectable, but complete account, permission and collaboration migration to another forge is unverified."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit ad37b88631ade5af5db738a4ebe4ab89ed8d237d; dump storage coverage and repository export layout"
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
text = "The dump implementation writes gitea-db.sql, app.ini, repositories and data, and iterates configured LFS, attachment and package storage into data/lfs, data/attachments and data/packages. Skip flags can omit these stores; LFS is nested under repository dumping and requires its server to be enabled. This resolves implementation coverage, not backup consistency or restoration."
url = "https://github.com/go-gitea/gitea/blob/ad37b88631ade5af5db738a4ebe4ab89ed8d237d/cmd/dump.go"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The repository dumper serializes issues to issue.yml and comments/reviews into numbered YAML files; repository metadata, Git/wiki data and release assets have separate paths. The retained issue JSON schema and migration types expose identifiers, labels, assignees and review links. This is an inspectable export representation, not proof of complete migration to another forge."
url = "https://github.com/go-gitea/gitea/blob/ad37b88631ade5af5db738a4ebe4ab89ed8d237d/services/migrations/dump.go"
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
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Gitea does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Gitea's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Git work can continue locally, but collaboration features require the running service."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Dump source includes SQL, configuration, repositories and configurable object stores, while per-repository export serializes forge relationships. Skip flags and deployment state affect completeness. No consistent representative instance has been reconstructed with users, permissions, reviews, LFS and attachments; Git history alone is not the forge profile."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Inspectable Git history is not authorization or recourse for forge permissions, hooks, instance/database mutation and repository/account deletion. The collected dump/migration implementation does not sufficiently cover those deployment-specific operations and restore-order consequences."
url = "https://docs.gitea.com/1.22/administration/backup-and-restore/"
confidence = "medium"

+++

**Assessment update: 23 October 2026**

- [x] Resolved: The dump implementation writes gitea-db.sql, app.ini, repositories and data, and iterates configured LFS, attachment and package storage into data/lfs, data/attachments and data/packages. Skip flags can omit these stores; LFS is nested under repository dumping and requires its server to be enabled. This resolves implementation coverage, not backup consistency or restoration. [Source](https://github.com/go-gitea/gitea/blob/ad37b88631ade5af5db738a4ebe4ab89ed8d237d/cmd/dump.go).
- [x] Resolved: The repository dumper serializes issues to issue.yml and comments/reviews into numbered YAML files; repository metadata, Git/wiki data and release assets have separate paths. The retained issue JSON schema and migration types expose identifiers, labels, assignees and review links. This is an inspectable export representation, not proof of complete migration to another forge. [Source](https://github.com/go-gitea/gitea/blob/ad37b88631ade5af5db738a4ebe4ab89ed8d237d/services/migrations/dump.go).
- [ ] Open: A real dump/clean restore with counts, attachments, LFS, hooks and permissions; cross-version and cross-forge fidelity; live-backup consistency and deletion recovery. E5 needs role-specific permission/hook/deletion authorization, auditable mutations and recovery boundaries, including relevant external authentication/CI.

**Assessment:** These source findings close the questions above and inform the evidence records; they do not demonstrate a clean restore, complete migration or full application eligibility. Reproduction details and retained sources are recorded in evidence/third-pass/batch-3/. The overall determination remains **Insufficient evidence** for the remaining requirements.

**Human-readable criteria:** Can users retain complete history and metadata, operate and recover locally, migrate to another implementation, and understand the effects of synchronization or automation?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** A real dump/clean restore with counts, attachments, LFS, hooks and permissions; cross-version and cross-forge fidelity; live-backup consistency and deletion recovery. E5 needs role-specific permission/hook/deletion authorization, auditable mutations and recovery boundaries, including relevant external authentication/CI.

**Next without installing locally:** Obtain a stopped or consistency-controlled synthetic instance dump with SQL/config/object-store manifests and expected role/relationship records; inspect it independently and reuse version-matched permission/deletion/restore observations.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-4/`. Overall: **Insufficient evidence**.

+++
title = "Kolibri"
category = "Research & Education"
summary = "Offline-first learning platform that serves educational content from a local server."
substrate = "SQLite database and content channels in a home directory"
sync_model = "Local server for offline networks; optional sync between devices"
extract_cmd = "sqlite3 ~/.kolibri/db.sqlite3 \".tables\""
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Actual backup restoration/content coverage, cross-device migration, user/log export completeness, downgrade behavior and runtime deletion/traffic observations remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence 303e3baea3e0df85b797111af8ca4d89e7fbbe92"
assessment_notes = "Individually reconciled in rating batch 10 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

[[evidence]]
target = "E1"
text = "Kolibri documents export of channels and content to a local drive, providing a direct retrieval path."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Content export and import support moving educational resources between Kolibri installations, but complete user-progress migration was not tested."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The dbrestore command explicitly limits its intended use to restoring the same device, not cross-device replication; --latest selects the current major/minor version's backup and the command refuses a running Kolibri instance. This answers the scope of that recovery route without claiming a restore succeeded."
url = "https://github.com/learningequality/kolibri/blob/303e3baea3e0df85b797111af8ca4d89e7fbbe92/kolibri/core/deviceadmin/management/commands/dbrestore.py"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Kolibri is designed for local and offline learning deployments and can exchange content through local media."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Bulk import excludes retained users, facility administrators and the specified acting user from --delete, then calls hard_delete=True for remaining selected users. Database mutation is inside the not-dryrun branch, including clearing memberships of omitted classes. A CSV omission can therefore be consequential, not merely an update."
url = "https://github.com/learningequality/kolibri/blob/303e3baea3e0df85b797111af8ca4d89e7fbbe92/kolibri/core/auth/management/commands/bulkimportusers.py"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Kolibri does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Kolibri's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/learningequality/kolibri/blob/303e3baea3e0df85b797111af8ca4d89e7fbbe92/kolibri/core/deviceadmin/management/commands/dbrestore.py"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Offline and local delivery are core use cases, with synchronization treated as optional infrastructure."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/learningequality/kolibri/blob/303e3baea3e0df85b797111af8ca4d89e7fbbe92/kolibri/core/auth/management/commands/bulkimportusers.py"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The inspected dbrestore route is for the same device, selects version-bounded backups and refuses a running instance. It does not demonstrate cross-device restoration of content, user/progress/log data or complete backup coverage for the existing learning profile."
url = "https://github.com/learningequality/kolibri/blob/303e3baea3e0df85b797111af8ca4d89e7fbbe92/kolibri/core/deviceadmin/management/commands/dbrestore.py"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Bulk import has dry-run mutation guards and exclusions for administrators/acting users, but can hard-delete omitted selected users and clear memberships. Effective role authorization, content/progress deletion visibility and recovery are not comprehensively established by that command alone."
url = "https://github.com/learningequality/kolibri/blob/303e3baea3e0df85b797111af8ca4d89e7fbbe92/kolibri/core/auth/management/commands/bulkimportusers.py"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass covers a content-transfer lead, not preservation of essential learner identity, progress and logs in a replacement workflow. Complete cross-device/user-data migration remains unestablished."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The dbrestore command explicitly limits its intended use to restoring the same device, not cross-device replication; --latest selects the current major/minor version's backup and the command refuses a running Kolibri instance. This answers the scope of that recovery route without claiming a restore succeeded. [Source](https://github.com/learningequality/kolibri/blob/303e3baea3e0df85b797111af8ca4d89e7fbbe92/kolibri/core/deviceadmin/management/commands/dbrestore.py).
- [x] Resolved: Bulk import excludes retained users, facility administrators and the specified acting user from --delete, then calls hard_delete=True for remaining selected users. Database mutation is inside the not-dryrun branch, including clearing memberships of omitted classes. A CSV omission can therefore be consequential, not merely an update. [Source](https://github.com/learningequality/kolibri/blob/303e3baea3e0df85b797111af8ca4d89e7fbbe92/kolibri/core/auth/management/commands/bulkimportusers.py).
- [ ] Open: Actual backup restoration/content coverage, cross-device migration, user/log export completeness, downgrade behavior and runtime deletion/traffic observations remain untested. E5 needs effective importer/role settings, omission-driven deletion and progress/content recourse beyond one dry-run guard.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-10/.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Actual backup restoration/content coverage, cross-device migration, user/log export completeness, downgrade behavior and runtime deletion/traffic observations remain untested. E5 needs effective importer/role settings, omission-driven deletion and progress/content recourse beyond one dry-run guard.

**Next without installing locally:** Use a synthetic content/channel/user-progress/device backup packet with expected identities/logs and version boundaries; inspect exports and obtain same-version external restore/bulk-import/deletion records.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-10/`. Overall: **Insufficient evidence**.

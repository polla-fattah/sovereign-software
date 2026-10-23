+++
title = "Moodle (self-hosted)"
category = "Research & Education"
summary = "Learning management system that an institution can host itself, with course backup files."
substrate = "Relational database plus course backup archives (.mbz)"
sync_model = "Self-hosted server; course backups restore to another instance"
extract_cmd = "tar -tzf course.mbz | head"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Real course/site restore comparisons, student submissions/grade coverage, deleting-target recovery, plugin dependencies and version-specific migrations remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence 46c042e7da65f8cb2ec7dc19f46566ce61a393e1"
assessment_notes = "Individually reconciled in rating batch 10 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "partial"

[[evidence]]
target = "E1"
text = "Moodle documents course backup and restore packages and site backup procedures."
url = "https://docs.moodle.org/en/Course_backup"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Course backups can be restored into Moodle, but migration to another learning platform and preservation of all user data were not tested."
url = "https://docs.moodle.org/en/Course_restore"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The backup task conditionally generates users.xml when user inclusion or kept roles require it, and conditionally includes user files depending also on anonymization. It separately writes files.xml and moodle_backup.xml before packaging. A course backup's user/file coverage is therefore settings-dependent, not equivalent to a complete site backup."
url = "https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/moodle2/backup_final_task.class.php"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Moodle can be self-hosted and its data, configuration, and files can be managed by the operator."
url = "https://docs.moodle.org/en/Site_backup"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The restore precheck code treats a backup from a newer Moodle as a warning, not by itself a blocking error; an excessively old backup format is an error. Cross-site user restoration also branches on user-creation permission. This corrects an overbroad assumption that every downgrade attempt is automatically refused."
url = "https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/util/helper/restore_prechecks_helper.class.php"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Moodle (self-hosted) does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/moodle2/backup_final_task.class.php"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Moodle (self-hosted)'s existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/moodle2/backup_final_task.class.php"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Moodle can operate on infrastructure chosen and controlled by the institution."
url = "https://docs.moodle.org/en/Site_backup"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/util/helper/restore_prechecks_helper.class.php"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Course backup source conditionally includes users/files and writes several manifests, so a course package is not automatically a full site archive. Complete student submissions, grades, plugin state, accounts and permissions have not been independently reconstructed and compared."
url = "https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/moodle2/backup_final_task.class.php"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Restore prechecks distinguish warnings/errors and permission-dependent user creation. They do not establish full target-deletion, grading/workflow mutation, role authority and correction/recourse across the declared course/site configuration."
url = "https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/util/helper/restore_prechecks_helper.class.php"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The backup task conditionally generates users.xml when user inclusion or kept roles require it, and conditionally includes user files depending also on anonymization. It separately writes files.xml and moodle_backup.xml before packaging. A course backup's user/file coverage is therefore settings-dependent, not equivalent to a complete site backup. [Source](https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/moodle2/backup_final_task.class.php).
- [x] Resolved: The restore precheck code treats a backup from a newer Moodle as a warning, not by itself a blocking error; an excessively old backup format is an error. Cross-site user restoration also branches on user-creation permission. This corrects an overbroad assumption that every downgrade attempt is automatically refused. [Source](https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/util/helper/restore_prechecks_helper.class.php).
- [ ] Open: Real course/site restore comparisons, student submissions/grade coverage, deleting-target recovery, plugin dependencies and version-specific migrations remain untested. E5 needs role- and target-aware restore/delete/grading authority, inspectable mutations and available correction for student/course records.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-10/.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Real course/site restore comparisons, student submissions/grade coverage, deleting-target recovery, plugin dependencies and version-specific migrations remain untested. E5 needs role- and target-aware restore/delete/grading authority, inspectable mutations and available correction for student/course records.

**Next without installing locally:** Inspect synthetic course/site manifests and files with expected submissions, grades, roles and plugin dependencies; obtain same-version external restore/permission/deletion comparisons. Do not use real student data.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-10/`. Overall: **Insufficient evidence**.

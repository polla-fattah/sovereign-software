+++
title = "Moodle (self-hosted)"
category = "Research & Education"
summary = "Learning management system that an institution can host itself, with course backup files."
substrate = "Relational database plus course backup archives (.mbz)"
sync_model = "Self-hosted server; course backups restore to another instance"
extract_cmd = "tar -tzf course.mbz | head"
limitations = ["Needs server administration, and a self-hosted deployment is a different assessed scope from a hosted one."]
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "partial"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "partial"
transparency = "partial"

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
text = "Backup packages are structured for Moodle restoration, but independent interpretation and full site recovery were not demonstrated."
url = "https://docs.moodle.org/en/Site_backup"
confidence = "low"

[[evidence]]
target = "E4"
text = "Moodle can be self-hosted and its data, configuration, and files can be managed by the operator."
url = "https://docs.moodle.org/en/Site_backup"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Learning records and assessment decisions are consequential, but grading correction, permissions, privacy, and audit workflows were not tested."
url = "https://docs.moodle.org/en/Course_backup"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Self-hosting and documented backups support operator authority, while course and learner-data portability remain incomplete."
url = "https://docs.moodle.org/en/Site_backup"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Backup packages preserve Moodle structures, but cross-version restore and independent preservation of learner records need testing."
url = "https://docs.moodle.org/en/Course_restore"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Moodle can operate on infrastructure chosen and controlled by the institution."
url = "https://docs.moodle.org/en/Site_backup"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Backup and restore procedures are documented, but educational decision and permission pathways require deeper evidence."
url = "https://docs.moodle.org/en/Course_backup"
confidence = "low"

+++

**Preliminary desk assessment:** Moodle (self-hosted) is described as learning management system that an institution can host itself, with course backup files. Its primary preservation surface is Relational database plus course backup archives (.mbz), with independence shaped by self-hosted server; course backups restore to another instance. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

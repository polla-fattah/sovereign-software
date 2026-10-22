+++
title = "SQLite"
category = "VCS & Core"
summary = "Library of Congress permanent archival standard. Delivers microsecond local queries with zero server daemons, zero configuration, and guaranteed backward compatibility through 2050."
substrate = "Single Cross-Platform B-Tree Disk File"
sync_model = "Local Embedded Engine (Zero Network)"
extract_cmd = "sqlite3 data.db .dump > archive.sql"
pilot_stage = 1
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "meets"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "The official documentation for this entry provides a relevant independent access to essential information lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official documentation for this entry provides a relevant independent interpretation and recovery lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The official documentation for this entry provides a relevant governability of consequential actions lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "The official documentation for this entry provides a relevant sovereignty lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The official documentation for this entry provides a relevant longevity lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The official documentation for this entry provides a relevant transparency and control lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://www.sqlite.org/backup.html"
confidence = "medium"

+++

**Verification scenario:** Use a versioned sample schema; test online backup, dump and restore, an independent parser, and WAL-inclusive recovery.

**What may invalidate an overconfident claim:** The format documentation is strong, but SQLite does not guarantee the semantics of each application's schema.

**Documentation starting point:** <https://sqlite.org/onefile.html>

**Preliminary desk assessment:** SQLite is described as library of congress permanent archival standard. delivers microsecond local queries with zero server daemons, zero configuration, and guaranteed backward compatibility through 2050. Its primary preservation surface is Single Cross-Platform B-Tree Disk File, with independence shaped by local embedded engine (zero network). This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can users retain complete history and metadata, operate and recover locally, migrate to another implementation, and understand the effects of synchronization or automation?

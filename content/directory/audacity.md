+++
title = "Audacity"
category = "Media & Creative"
summary = "Audio editor whose current projects are single SQLite database files."
substrate = "SQLite project file (.aup3)"
sync_model = "Local desktop application"
extract_cmd = "sqlite3 project.aup3 \".tables\""
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
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "The official documentation for this entry provides a relevant independent access to essential information lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.audacityteam.org/man/audacity_projects.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.audacityteam.org/man/audacity_projects.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official documentation for this entry provides a relevant independent interpretation and recovery lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.audacityteam.org/man/audacity_projects.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.audacityteam.org/man/audacity_projects.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The official documentation for this entry provides a relevant governability of consequential actions lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.audacityteam.org/man/audacity_projects.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "The official documentation for this entry provides a relevant sovereignty lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.audacityteam.org/man/audacity_projects.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The official documentation for this entry provides a relevant longevity lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.audacityteam.org/man/audacity_projects.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.audacityteam.org/man/audacity_projects.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The official documentation for this entry provides a relevant transparency and control lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.audacityteam.org/man/audacity_projects.html"
confidence = "medium"

+++

**Desk assessment:** Audacity keeps projects locally in AUP3 files and exports audio to standard formats. This gives users durable access to the rendered recording, but the editable project remains tied to Audacity and version compatibility; the manual explicitly states that AUP3 is not a general interchange format. The current status should remain **Insufficient evidence** until AUP3 recovery and representative migration are tested.

**Human-readable criteria:** Can a user preserve both the final audio and the editable project, reopen it after a version change, export every important track, and recover from a damaged or unavailable project file?

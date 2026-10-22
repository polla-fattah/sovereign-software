+++
title = "Ardour"
category = "Media & Creative"
summary = "Digital audio workstation that keeps sessions as folders with an XML session file."
substrate = "Session folder with an XML file (.ardour) and audio files"
sync_model = "Local desktop application"
extract_cmd = "grep -c \"<Route\" session.ardour"
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
url = "https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official documentation for this entry provides a relevant independent interpretation and recovery lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The official documentation for this entry provides a relevant governability of consequential actions lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "The official documentation for this entry provides a relevant sovereignty lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The official documentation for this entry provides a relevant longevity lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The official documentation for this entry provides a relevant transparency and control lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/"
confidence = "medium"

+++

**Desk assessment:** Ardour’s folder-based sessions and archive function provide a practical way to retain projects, including media and session state when files are copied into the session. The main risks are linked external media, unavailable plugins, and loss of editable structure when exporting stems. The current status should remain **Insufficient evidence** until a representative session is restored and migrated.

**Human-readable criteria:** Can a musician archive a complete session, reopen it on another machine, recover it without the original plugins, and export tracks in a form another workstation can use?

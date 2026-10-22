+++
title = "Taskwarrior"
category = "Tasks & Finance"
summary = "Command-line task manager with deterministic date and priority grammars and a complete JSON export, kept separate from long-form notes."
substrate = "Local task database with open JSON export"
sync_model = "Local hooks / sync server / Syncthing"
extract_cmd = "task export > commitments.json"
pilot_stage = 3
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "partial"
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
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official documentation for this entry provides a relevant independent interpretation and recovery lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The official documentation for this entry provides a relevant governability of consequential actions lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "The official documentation for this entry provides a relevant sovereignty lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The official documentation for this entry provides a relevant longevity lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The official documentation for this entry provides a relevant transparency and control lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://taskwarrior.org/docs/commands/export/"
confidence = "medium"

+++

**Verification scenario:** Export and import recurring tasks, annotations, user-defined attributes, dependencies, and completion history; restore into a clean profile.

**What may invalidate an overconfident claim:** A JSON export alone may not preserve every configuration, hook, or synchronisation state.

**Documentation starting point:** <https://taskwarrior.org/docs/>

**Preliminary desk assessment:** Taskwarrior is described as command-line task manager with deterministic date and priority grammars and a complete json export, kept separate from long-form notes. Its primary preservation surface is Local task database with open JSON export, with independence shaped by local hooks / sync server / syncthing. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user export complete records, preserve invariants and metadata, restore them independently, and continue the essential workflow without provider permission?

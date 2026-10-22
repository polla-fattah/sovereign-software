+++
title = "Anki"
category = "Research & Education"
summary = "Spaced-repetition flashcard application with a local collection and package export."
substrate = "Local SQLite collection, exported as .apkg packages"
sync_model = "Local collection with optional sync service"
extract_cmd = "unzip -l deck.apkg"
limitations = ["Newer collection formats are compressed, so direct SQLite inspection depends on the version."]
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
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official documentation for this entry provides a relevant independent interpretation and recovery lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The official documentation for this entry provides a relevant governability of consequential actions lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "The official documentation for this entry provides a relevant sovereignty lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The official documentation for this entry provides a relevant longevity lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The official documentation for this entry provides a relevant transparency and control lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

+++

**Desk assessment:** Anki provides local collections and official collection/deck packages that preserve cards and scheduling. That is strong evidence for user access and locality, but migration to another flashcard system and independent restoration of newer compressed packages still require testing. The current status should remain **Insufficient evidence** until those tests are performed.

**Human-readable criteria:** Can a learner export the complete collection with media and scheduling, restore it without AnkiWeb, move it to another study tool without losing meaning, and understand what synchronization changes?

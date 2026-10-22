+++
title = "Kolibri"
category = "Research & Education"
summary = "Offline-first learning platform that serves educational content from a local server."
substrate = "SQLite database and content channels in a home directory"
sync_model = "Local server for offline networks; optional sync between devices"
extract_cmd = "sqlite3 ~/.kolibri/db.sqlite3 \".tables\""
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "partial"
locality = "meets"
transparency = "partial"

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
text = "The export workflow is documented, but independent interpretation and full restoration of users, facilities, permissions, and progress were not demonstrated."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "low"

[[evidence]]
target = "E4"
text = "Kolibri is designed for local and offline learning deployments and can exchange content through local media."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Educational delivery affects learners, but content approval, assessment correction, and privacy controls were not tested."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Local deployment and content export support operator authority; user-state migration remains a material gap."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Portable content packages support reuse, but the preservation of learning records and metadata needs version-pinned testing."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "low"

[[evidence]]
target = "locality"
text = "Offline and local delivery are core use cases, with synchronization treated as optional infrastructure."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Export is documented, but assessment logic, learner records, and role controls require deeper operational evidence."
url = "https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/"
confidence = "low"

+++

**Preliminary desk assessment:** Kolibri is described as offline-first learning platform that serves educational content from a local server. Its primary preservation surface is SQLite database and content channels in a home directory, with independence shaped by local server for offline networks; optional sync between devices. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

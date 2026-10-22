+++
title = "QOwnNotes"
category = "Knowledge & Office"
summary = "Note-taking application that stores notes as plain Markdown files in a folder, with optional Nextcloud integration."
substrate = "Markdown files in a user-chosen folder"
sync_model = "Local folder with optional Nextcloud or ownCloud sync"
extract_cmd = "grep -rl \"keyword\" ~/Notes"
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
text = "QOwnNotes stores notes as plain Markdown files in a user-selected folder and supports exports."
url = "https://next.qownnotes.org/getting-started/concept.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "Markdown notes can be opened, edited, synchronized, and backed up with ordinary tools and other Markdown applications."
url = "https://qownnotes.com/"
confidence = "high"

[[evidence]]
target = "E3"
text = "Notes are independently readable, but attachments, app metadata, scripts, and history were not restored independently."
url = "https://next.qownnotes.org/getting-started/concept.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "QOwnNotes works offline and keeps notes on the user’s device."
url = "https://qownnotes.com/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Note-taking is user-directed, but scripts, sync conflicts, and attachment correction workflows were not assessed."
url = "https://next.qownnotes.org/getting-started/concept.html"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Plain Markdown files and user-selected storage provide strong control and exit."
url = "https://next.qownnotes.org/getting-started/concept.html"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Markdown is durable and human-readable, while app-specific metadata and attachments need preservation procedures."
url = "https://qownnotes.com/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core note workflow is local and offline."
url = "https://qownnotes.com/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The project explains its plain-file model and synchronization limits, but extensions and history require testing."
url = "https://next.qownnotes.org/getting-started/concept.html"
confidence = "high"

+++

**Preliminary desk assessment:** QOwnNotes is described as note-taking application that stores notes as plain markdown files in a folder, with optional nextcloud integration. Its primary preservation surface is Markdown files in a user-chosen folder, with independence shaped by local folder with optional nextcloud or owncloud sync. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

+++
title = "QOwnNotes"
category = "Knowledge & Office"
summary = "Note-taking application that stores notes as plain Markdown files in a folder, with optional Nextcloud integration."
substrate = "Markdown files in a user-chosen folder"
sync_model = "Local folder with optional Nextcloud or ownCloud sync"
extract_cmd = "grep -rl \"keyword\" ~/Notes"
limitations = ["Tag/trash associations have database state that is not demonstrated recoverable from note text alone.","Confirmation code is present, but effective settings and recoverability remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-23"
version_assessed = "Source commit 21b4d8554828bf77f89be5b25da7a6722ebc7b8f"
assessment_notes = "Rating reconciliation batch 1: E3 Not Verified; E5 Not Verified. Longevity Not assessed; Transparency and Control Not assessed. See the declared scope and reasons below; earlier bounded evidence findings remain recorded."

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
locality = "meets"

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
text = "The database schema defines tag records with parent_id, noteTagLink records keyed by tag_id, note filename and subfolder path, and trashItem metadata. Tags and their associations therefore have explicit database state beyond Markdown note text. Copying only note files cannot be assumed to preserve this state; no populated database or missing-database reconstruction was tested."
url = "https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/services/databaseservice.cpp"
confidence = "medium"

[[evidence]]
target = "E4"
text = "QOwnNotes works offline and keeps notes on the user’s device."
url = "https://qownnotes.com/"
confidence = "high"

[[evidence]]
target = "E5"
text = "The inspected note-removal path asks about backlinks when relevant and checks a user-question result before invoking note.remove(true). Bulk deletion separately warns that selected folders' files and subfolders will be removed. This establishes application-level confirmation branches, not universal prompting under saved dialog preferences or successful local/server trash restoration."
url = "https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/managers/noteoperationsmanager.cpp"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Plain Markdown files and user-selected storage provide strong control and exit."
url = "https://next.qownnotes.org/getting-started/concept.html"
confidence = "high"

[[evidence]]
target = "longevity"
text = "E3 remains Not Verified for the existing essential-record scope. The methodology requires established E3 before a positive Longevity finding, so the earlier positive rating is withdrawn pending recovery evidence; source/format strengths are retained as facts, not graded as a failure."
url = "https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/services/databaseservice.cpp"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core note workflow is local and offline."
url = "https://qownnotes.com/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "E5 remains Not Verified. The methodology's Partially meets threshold requires demonstrated minimum oversight, so the earlier positive Transparency and Control finding is withdrawn rather than retained on the strength of one documented control. This is Not assessed, not Does not meet."
url = "https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/managers/noteoperationsmanager.cpp"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The retained schema places hierarchical tags, note-tag associations and trash metadata outside Markdown prose. A populated database/native-folder recovery and relationship reconstruction have not been demonstrated. This is an incomplete essential-record preservation check, not a reason to infer a failure or promote the invalid partial value."
url = "https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/services/databaseservice.cpp"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The retained note-removal implementation has backlink and bulk-folder confirmation branches, but saved dialog preferences, local/server trash restoration, other deletion modes and concurrent edits remain unverified. This closes a control-implementation question without establishing risk-appropriate authorization and correction for the whole assessed workflow."
url = "https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/managers/noteoperationsmanager.cpp"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The database schema defines tag records with parent_id, noteTagLink records keyed by tag_id, note filename and subfolder path, and trashItem metadata. Tags and their associations therefore have explicit database state beyond Markdown note text. Copying only note files cannot be assumed to preserve this state; no populated database or missing-database reconstruction was tested. [Source](https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/services/databaseservice.cpp).
- [x] Resolved: The inspected note-removal path asks about backlinks when relevant and checks a user-question result before invoking note.remove(true). Bulk deletion separately warns that selected folders' files and subfolders will be removed. This establishes application-level confirmation branches, not universal prompting under saved dialog preferences or successful local/server trash restoration. [Source](https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/managers/noteoperationsmanager.cpp).
- [ ] Open: A complete notes.sqlite/native-folder move and tag reconstruction, Markdown export loss, actual trash recovery and deletion modes, simultaneous edits, network settings and older versions.

**Assessment follow-up:** E3/E5 and their associated principle findings are now reconciled in rating batch 1 below. Earlier source/fixture observations remain valid within their stated scope; they are not themselves blanket Pass decisions.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

## Rating reconciliation: 23 October 2026

**Scope:** The existing source-pinned application scope; no new application execution. Individual-custodian perspective. The existing broad preservation/workflow scope is retained, rather than narrowed to the one successfully inspected source path.

| Criterion | Current finding |
|---|---|
| E3 Independent interpretation and recovery | Not Verified |
| E5 Governability of consequential actions | Not Verified |
| Longevity | Not assessed |
| Transparency and Control | Not assessed |

**E3:** The retained schema places hierarchical tags, note-tag associations and trash metadata outside Markdown prose. A populated database/native-folder recovery and relationship reconstruction have not been demonstrated. This is an incomplete essential-record preservation check, not a reason to infer a failure or promote the invalid partial value.

**E5:** The retained note-removal implementation has backlink and bulk-folder confirmation branches, but saved dialog preferences, local/server trash restoration, other deletion modes and concurrent edits remain unverified. This closes a control-implementation question without establishing risk-appropriate authorization and correction for the whole assessed workflow.

**longevity:** E3 remains Not Verified for the existing essential-record scope. The methodology requires established E3 before a positive Longevity finding, so the earlier positive rating is withdrawn pending recovery evidence; source/format strengths are retained as facts, not graded as a failure.

**transparency:** E5 remains Not Verified. The methodology's Partially meets threshold requires demonstrated minimum oversight, so the earlier positive Transparency and Control finding is withdrawn rather than retained on the strength of one documented control. This is Not assessed, not Does not meet.

**Evidence record:** evidence/rating-reconciliation/batch-1/README.md and runtime-results.json. No target software was installed. Source inspections remain source inspections; no application-level recovery or destructive action was executed.

**Remaining work:** The existing open recovery and consequential-action scenarios remain pending; the individually explained E3/E5 blockers above determine the current Not Verified and Not assessed findings.

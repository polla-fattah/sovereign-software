+++
title = "Audacity"
category = "Media & Creative"
summary = "Audio editor with version-dependent SQLite-backed project formats and standard audio exports."
substrate = "SQLite-backed AUP3/AUP4 projects with encoded structure and audio blocks"
sync_model = "Local desktop application"
extract_cmd = "sqlite3 project.aup3 \".tables\""
limitations = ["SQLite can expose tables without decoding project structure or recovering audio.","The retained AUP4 sample failed sample-block reads and integrity_check in the generic reader; this is not a proven application-wide failure.","Legacy AUP3 and inspected AUP4 evidence must not be treated as interchangeable."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit f515da46486301d48db89f195729ef0c87980668; published AUP4 SQLite read boundary and encoded project representation"
assessment_notes = "Individually reconciled in rating batch 3 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. 1 further bounded source questions resolved. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

[[evidence]]
target = "E1"
text = "The pinned test.aup4 fixture exposes project, autosave, sampleblocks and project_history schemas to standard SQLite. Its project row contains 2,067-byte dictionary and 2,177-byte document BLOBs, but reading sampleblocks and running integrity_check report database disk image is malformed with SQLite 3.45.3. The bytes match the upstream Git blob. This resolves this sample's read boundary, not independent audio recovery or a general Audacity defect."
url = "https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/src/project/tests/data/test.aup4"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.audacityteam.org/man/audacity_projects.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The shared project-file implementation stores encoded XML as dictionary/document BLOBs, not ordinary XML text. The serializer publishes field opcodes and character-width handling; sample blocks carry numeric audio data while valid block lengths come from the encoded project. SQLite table access alone is therefore insufficient to reconstruct an editable session. AUP3 recovery and AUP3/AUP4 compatibility were not demonstrated."
url = "https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-file-io/ProjectSerializer.cpp"
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
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Audacity does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-file-io/ProjectSerializer.cpp"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Audacity's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-file-io/ProjectSerializer.cpp"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.audacityteam.org/man/audacity_projects.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-history/UndoManager.cpp"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The retained AUP4 bytes match upstream, but generic sample-block reading and integrity checking failed in the recorded SQLite reader. Encoded project XML and audio-block semantics still require reconstruction, and the AUP4 sample cannot certify AUP3. This sample-specific unsuccessful check is not an application-wide E3 Fail or a successful audio recovery."
url = "https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-file-io/ProjectSerializer.cpp"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The history code exposes undo/redo state, initialization resets and autosave requests; new edits can discard redo. These answer editing-retention questions but do not establish the complete project's save/overwrite, destructive effects, current UI settings and recovery controls across the stated AUP3/AUP4/version scope."
url = "https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-history/UndoManager.cpp"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The inspected project-history initialization clears existing undo states. New non-consolidated edits abandon redo states, while history pushes normally request autosave unless flagged otherwise. This identifies control and retention boundaries, not persistent recoverability of every AUP3/AUP4 project."
url = "https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-history/ProjectHistory.cpp"
confidence = "medium"

+++

**Assessment update: 23 October 2026**

- [x] Resolved: The pinned test.aup4 fixture exposes project, autosave, sampleblocks and project_history schemas to standard SQLite. Its project row contains 2,067-byte dictionary and 2,177-byte document BLOBs, but reading sampleblocks and running integrity_check report database disk image is malformed with SQLite 3.45.3. The bytes match the upstream Git blob. This resolves this sample's read boundary, not independent audio recovery or a general Audacity defect. [Source](https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/src/project/tests/data/test.aup4).
- [x] Resolved: The shared project-file implementation stores encoded XML as dictionary/document BLOBs, not ordinary XML text. The serializer publishes field opcodes and character-width handling; sample blocks carry numeric audio data while valid block lengths come from the encoded project. SQLite table access alone is therefore insufficient to reconstruct an editable session. AUP3 recovery and AUP3/AUP4 compatibility were not demonstrated. [Source](https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-file-io/ProjectSerializer.cpp).
- [ ] Open: A known-good representative AUP3/AUP4 project decoded and reconstructed independently; sample-audio recovery, track/label migration, cross-version saves, plugin fidelity and crash recovery. E5 also needs version-matched save/overwrite/destructive-edit controls and their recoverable state boundaries; initialization/redo source behavior is now answered.

**Assessment:** The checked findings above now inform this application's evidence and limitations. They resolve the stated questions, not complete recovery, migration or eligibility. Reproduction details and retained inputs are recorded in evidence/third-pass/batch-4/. The overall determination remains **Insufficient evidence** for the remaining requirements.

**Human-readable criteria:** Can a user preserve both the final audio and the editable project, reopen it after a version change, export every important track, and recover from a damaged or unavailable project file?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

- [x] Resolved: The inspected project-history initialization clears existing undo states. New non-consolidated edits abandon redo states, while history pushes normally request autosave unless flagged otherwise. This identifies control and retention boundaries, not persistent recoverability of every AUP3/AUP4 project. [Pinned source](https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-history/ProjectHistory.cpp).

**Remaining:** A known-good representative AUP3/AUP4 project decoded and reconstructed independently; sample-audio recovery, track/label migration, cross-version saves, plugin fidelity and crash recovery. E5 also needs version-matched save/overwrite/destructive-edit controls and their recoverable state boundaries; initialization/redo source behavior is now answered.

**Next without installing locally:** Use a known-good representative AUP3 and AUP4 packet with expected track, label and sample metadata plus independent audio extraction; pair it with primary-source or recorded save/undo/overwrite evidence for each exact version.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-3/`. Overall: **Insufficient evidence**.

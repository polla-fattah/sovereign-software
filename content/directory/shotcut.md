+++
title = "Shotcut"
category = "Media & Creative"
summary = "Video editor that stores projects as MLT XML files."
substrate = "MLT XML project files (.mlt) referencing source media"
sync_model = "Local desktop application"
extract_cmd = "grep -c \"<producer\" project.mlt"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","A complex timeline reopened/rendered independently, filter/proxy closure, actual crash recovery, older-version opening and media consolidation remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence 34dde4fce394652c00d8f7af9ac2ce37dab1ed92"
assessment_notes = "Individually reconciled in rating batch 11 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "The official documentation for this entry provides a relevant independent access to essential information lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://shotcut.org/howtos/Shotcut%20User%20Guide.pdf"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://shotcut.org/howtos/Shotcut%20User%20Guide.pdf"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The XML checker resolves relative media against the project directory, collects missing local resources and rewrites selected replacement paths. A changed resource hash resets stream indices and selected metadata. Relinking can therefore alter project interpretation rather than simply restore a missing filename."
url = "https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/mltxmlchecker.cpp"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://shotcut.org/howtos/Shotcut%20User%20Guide.pdf"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Autosaves are .mlt files under the application-data autosave directory with an MD5-derived managed-name filename. The helper removes its file on destruction or managed-file change and can locate an existing stale file. This identifies a transient recovery mechanism, not a durable versioned backup or a successful crash-recovery test."
url = "https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/autosavefile.cpp"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Shotcut does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/mltxmlchecker.cpp"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Shotcut's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/mltxmlchecker.cpp"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://shotcut.org/howtos/Shotcut%20User%20Guide.pdf"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/autosavefile.cpp"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The XML checker resolves and rewrites missing resource paths, and changed hashes reset selected stream/metadata state. No complete timeline/media/filter/proxy packet has been independently reconstructed with equivalent interpretation or rendering. Relinking source logic alone does not establish project survival."
url = "https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/mltxmlchecker.cpp"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Autosave lookup and removal identify transient recovery files, not durable version history. Effective save/overwrite, media relink, filter/script authority and usable correction after failed edits or autosave cleanup remain insufficiently covered."
url = "https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/autosavefile.cpp"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The XML checker resolves relative media against the project directory, collects missing local resources and rewrites selected replacement paths. A changed resource hash resets stream indices and selected metadata. Relinking can therefore alter project interpretation rather than simply restore a missing filename. [Source](https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/mltxmlchecker.cpp).
- [x] Resolved: Autosaves are .mlt files under the application-data autosave directory with an MD5-derived managed-name filename. The helper removes its file on destruction or managed-file change and can locate an existing stale file. This identifies a transient recovery mechanism, not a durable versioned backup or a successful crash-recovery test. [Source](https://github.com/mltframework/shotcut/blob/34dde4fce394652c00d8f7af9ac2ce37dab1ed92/src/autosavefile.cpp).
- [ ] Open: A complex timeline reopened/rendered independently, filter/proxy closure, actual crash recovery, older-version opening and media consolidation remain untested. E5 needs save/relink/overwrite and filter/script controls, inspectable changes and actual transient-autosave correction boundaries.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-11/.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** A complex timeline reopened/rendered independently, filter/proxy closure, actual crash recovery, older-version opening and media consolidation remain untested. E5 needs save/relink/overwrite and filter/script controls, inspectable changes and actual transient-autosave correction boundaries.

**Next without installing locally:** Inspect a synthetic full project/media/proxy/filter packet with expected timeline and reference output; obtain same-version relink/save/autosave recovery records from upstream or another assessor.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-11/`. Overall: **Insufficient evidence**.

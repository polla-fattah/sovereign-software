+++
title = "Ardour"
category = "Media & Creative"
summary = "Digital audio workstation that keeps sessions as folders with an XML session file."
substrate = "Session folder with an XML file (.ardour) and audio files"
sync_model = "Local desktop application"
extract_cmd = "grep -c \"<Route\" session.ardour"
limitations = ["Session XML refers to separate media; readable references do not prove a complete archive.","A missing-plugin placeholder can retain state without reproducing the plugin's sound.","The retained session is historical; it does not establish current-release round-trip compatibility."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit b896344c8d16f89e04a235562ab31594605c6715; session XML source relationships and missing-processor state retention"
assessment_notes = "Individually reconciled in rating batch 3 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. 2 further bounded source questions resolved. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Standard XML parsing of the historical 1region session reads session version 3001, sample-rate 48000, two routes and one external MIDI source. Both the region source-0 and master-source-0 references resolve to source ID 118, named MIDI 1-1.mid. This establishes readable session relationships; the referenced media was not opened and no sound was rendered."
url = "https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/test/profiling/sessions/1region/1region.ardour"
confidence = "high"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "UnknownProcessor copies the missing processor's XML state and returns a copy when saving, retaining stored state rather than implementing the missing plugin. Its run method does not recreate plugin processing and silences excess outputs when saved I/O information is available. State preservation therefore does not imply audio equivalence or successful later plugin reactivation."
url = "https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/unknown_processor.cc"
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
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Ardour does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/unknown_processor.cc"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Ardour's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/unknown_processor.cc"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/session_state.cc"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The historical session XML resolves an external MIDI source, while the missing-plugin implementation retains XML state without reproducing processing. Complete media, routing/automation meaning, plugin dependencies and compatible session reconstruction are not demonstrated by that readable reference graph."
url = "https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/unknown_processor.cc"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Conditional history saving and attempted backup restoration are established in source. Unused-source cleanup stages files, clears history and saves state, and a distinct flush clears the staged files. Authorization in the calling UI, configuration and meaningful recourse across cleanup/plugin/save changes remain insufficiently covered."
url = "https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/session_state.cc"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Session undo history is saved only when configured, with a configured depth and available history. The source first renames an existing history file to backup and attempts restoration of that backup after a write failure. This is conditional error-handling code, not observed crash recovery."
url = "https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/session_state.cc"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Unused-source cleanup moves selected media into dead-source directories, then clears session history and saves state. A separate trash-cleanup routine clears those directories. Staging unused media is not the same as a reversible edit or indefinite backup."
url = "https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/session_state.cc"
confidence = "medium"

+++

**Assessment update: 23 October 2026**

- [x] Resolved: Standard XML parsing of the historical 1region session reads session version 3001, sample-rate 48000, two routes and one external MIDI source. Both the region source-0 and master-source-0 references resolve to source ID 118, named MIDI 1-1.mid. This establishes readable session relationships; the referenced media was not opened and no sound was rendered. [Source](https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/test/profiling/sessions/1region/1region.ardour).
- [x] Resolved: UnknownProcessor copies the missing processor's XML state and returns a copy when saving, retaining stored state rather than implementing the missing plugin. Its run method does not recreate plugin processing and silences excess outputs when saved I/O information is available. State preservation therefore does not imply audio equivalence or successful later plugin reactivation. [Source](https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/unknown_processor.cc).
- [ ] Open: Complete archived-session restore including media and plugins, missing-plugin playback and later reactivation, stem migration losses, snapshots/crash recovery, version compatibility and update-check control. E5 also needs cleanup/flush UI authorization, effective history settings and overwrite/plugin-change recourse; staged dead-source storage is not an indefinite undo guarantee.

**Assessment:** The checked findings above now inform this application's evidence and limitations. They resolve the stated questions, not complete recovery, migration or eligibility. Reproduction details and retained inputs are recorded in evidence/third-pass/batch-4/. The overall determination remains **Insufficient evidence** for the remaining requirements.

**Human-readable criteria:** Can a musician archive a complete session, reopen it on another machine, recover it without the original plugins, and export tracks in a form another workstation can use?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

- [x] Resolved: Session undo history is saved only when configured, with a configured depth and available history. The source first renames an existing history file to backup and attempts restoration of that backup after a write failure. This is conditional error-handling code, not observed crash recovery. [Pinned source](https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/session_state.cc).
- [x] Resolved: Unused-source cleanup moves selected media into dead-source directories, then clears session history and saves state. A separate trash-cleanup routine clears those directories. Staging unused media is not the same as a reversible edit or indefinite backup. [Pinned source](https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/session_state.cc).

**Remaining:** Complete archived-session restore including media and plugins, missing-plugin playback and later reactivation, stem migration losses, snapshots/crash recovery, version compatibility and update-check control. E5 also needs cleanup/flush UI authorization, effective history settings and overwrite/plugin-change recourse; staged dead-source storage is not an indefinite undo guarantee.

**Next without installing locally:** Collect a synthetic archived session including all media and plugin-dependency/state information, expected routing/automation and stems; inspect the archive independently and obtain version-matched cleanup/history recovery evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-3/`. Overall: **Insufficient evidence**.

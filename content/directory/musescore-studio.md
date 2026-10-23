+++
title = "MuseScore Studio"
category = "Media & Creative"
summary = "Music notation editor with a documented project archive and export to MusicXML."
substrate = "Project archive (.mscz, a zip of XML), plus MusicXML export"
sync_model = "Local desktop application"
extract_cmd = "unzip -l score.mscz"
limitations = ["The inspected score fixture was created by MuseScore 2.0.2, not the current application version.","Backup creation is conditional and limited by the save path; crash-safe recovery was not demonstrated.","Independent XML reading does not establish equivalent engraving or playback."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit 4676f83f368f1afc9cad6815eb5401a2ec8aca2b; historical MSCZ archive readability and save/backup conditions"
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
text = "The published Amazing_grace.mscz opened as ZIP with three members: container XML, a PNG thumbnail and score XML. The score identifies MuseScore 2.0.2 and format 2.06; standard XML parsing found four Part elements, 68 Measure elements, 175 Note elements and 118 Lyrics elements, including readable syllables. These are element counts, not a count of unique musical bars. No layout or playback was reproduced."
url = "https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/demos/Amazing_grace.mscz"
confidence = "high"

[[evidence]]
target = "E2"
text = "MusicXML, MIDI, and PDF provide practical migration and publication paths, though not all notation semantics survive every format."
url = "https://handbook.musescore.org/en/file-management/file-export"
confidence = "high"

[[evidence]]
target = "E3"
text = "MSCX is a readable XML representation, but complete independent reconstruction of layout, playback, and plugins was not tested."
url = "https://handbook.musescore.org/en/file-management/opening-and-saving-scores"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Score creation and storage can be local without a hosted account."
url = "https://handbook.musescore.org/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The inspected save path writes through a _saving path and conditionally creates a backup before replacing the target. Backup creation requires both the caller's request and the user's setting; the backup helper only handles an existing MSCZ target. Not every save can therefore be assumed to retain an old copy. This identifies implementation conditions, not crash durability or the settings of a user's installation."
url = "https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/project/internal/notationproject.cpp"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for MuseScore Studio does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://handbook.musescore.org/en/file-management/file-export"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for MuseScore Studio's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://handbook.musescore.org/en/file-management/opening-and-saving-scores"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core score workflow is local and account-independent."
url = "https://handbook.musescore.org/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/project/internal/projectautosaver.cpp"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The retained MSCZ is a MuseScore 2.0.2 score with independently readable notes/lyrics and structure. It does not establish current-version musical/engraving/playback equivalence, complete dependency recovery or a MusicXML/native round trip. Historical ZIP/XML readability remains a bounded positive observation."
url = "https://handbook.musescore.org/en/file-management/opening-and-saving-scores"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The save path's backup conditions, autosave guards/error reporting and notation transaction undo/rollback entry points are concrete source controls. Effective save/overwrite settings, transient-copy retention and complete correction across the existing score/export workflow remain unestablished; source entry points are not executed recovery outcomes."
url = "https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/project/internal/projectautosaver.cpp"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish usable migration of the declared score's musical/structural meaning. Reading an older MSCZ and knowing export exists does not compare native and independent interchange representations."
url = "https://handbook.musescore.org/en/file-management/file-export"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The autosave timer follows the enable/interval configuration. Its save attempt checks for a current project, needAutoSave and canSave, and logs failure; old temporary autosave material can be removed as the active project state changes. This establishes conditions, not effective defaults or successful crash restoration."
url = "https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/project/internal/projectautosaver.cpp"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Notation undo/redo delegates to the transaction manager; explicit rollback and commit end transactions with different flags and notify state changes. These are inspectable editing-control entry points, not proof that every plugin, save or exported representation can be rolled back."
url = "https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/notation/internal/notationundostack.cpp"
confidence = "medium"

+++

**Assessment update: 23 October 2026**

- [x] Resolved: The published Amazing_grace.mscz opened as ZIP with three members: container XML, a PNG thumbnail and score XML. The score identifies MuseScore 2.0.2 and format 2.06; standard XML parsing found four Part elements, 68 Measure elements, 175 Note elements and 118 Lyrics elements, including readable syllables. These are element counts, not a count of unique musical bars. No layout or playback was reproduced. [Source](https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/demos/Amazing_grace.mscz).
- [x] Resolved: The inspected save path writes through a _saving path and conditionally creates a backup before replacing the target. Backup creation requires both the caller's request and the user's setting; the backup helper only handles an existing MSCZ target. Not every save can therefore be assumed to retain an old copy. This identifies implementation conditions, not crash durability or the settings of a user's installation. [Source](https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/project/internal/notationproject.cpp).
- [ ] Open: Current-version MSCZ and MusicXML/MEI/MIDI round trips with notation/layout comparison; old/new release compatibility, actual interrupted saves and recovery, offline playback and export dependencies. E5 also needs effective autosave/backup settings, overwrite and export boundaries and evidence of usable correction after failed/interrupted save.

**Assessment:** The checked findings above now inform this application's evidence and limitations. They resolve the stated questions, not complete recovery, migration or eligibility. Reproduction details and retained inputs are recorded in evidence/third-pass/batch-4/. The overall determination remains **Insufficient evidence** for the remaining requirements.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

- [x] Resolved: The autosave timer follows the enable/interval configuration. Its save attempt checks for a current project, needAutoSave and canSave, and logs failure; old temporary autosave material can be removed as the active project state changes. This establishes conditions, not effective defaults or successful crash restoration. [Pinned source](https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/project/internal/projectautosaver.cpp).
- [x] Resolved: Notation undo/redo delegates to the transaction manager; explicit rollback and commit end transactions with different flags and notify state changes. These are inspectable editing-control entry points, not proof that every plugin, save or exported representation can be rolled back. [Pinned source](https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/notation/internal/notationundostack.cpp).

**Remaining:** Current-version MSCZ and MusicXML/MEI/MIDI round trips with notation/layout comparison; old/new release compatibility, actual interrupted saves and recovery, offline playback and export dependencies. E5 also needs effective autosave/backup settings, overwrite and export boundaries and evidence of usable correction after failed/interrupted save.

**Next without installing locally:** Acquire a current native score plus MusicXML output with expected musical structure/dependencies and comparison results; inspect archives/XML here and reuse externally recorded save/undo/recovery observations for the same version.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-3/`. Overall: **Insufficient evidence**.

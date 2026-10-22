+++
title = "MuseScore Studio"
category = "Media & Creative"
summary = "Music notation editor with a documented project archive and export to MusicXML."
substrate = "Project archive (.mscz, a zip of XML), plus MusicXML export"
sync_model = "Local desktop application"
extract_cmd = "unzip -l score.mscz"
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
text = "MuseScore saves scores in native MSCZ or MSCX formats and documents export to MusicXML, MIDI, MEI, PDF, audio, and images."
url = "https://handbook.musescore.org/en/file-management/file-export"
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
text = "Music notation is user-directed, but publishing, copyright, and playback review workflows were not assessed."
url = "https://handbook.musescore.org/en/file-management/file-export"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Native and standard exports give users strong custody and exit options."
url = "https://handbook.musescore.org/en/file-management/file-export"
confidence = "high"

[[evidence]]
target = "longevity"
text = "MusicXML, MEI, and PDF support preservation, while full native fidelity needs a round trip."
url = "https://handbook.musescore.org/en/file-management/file-export"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core score workflow is local and account-independent."
url = "https://handbook.musescore.org/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The handbook clearly distinguishes native and exported formats, but format-loss boundaries need scenario testing."
url = "https://handbook.musescore.org/en/file-management/file-export"
confidence = "medium"

+++

**Preliminary desk assessment:** MuseScore Studio is described as music notation editor with a documented project archive and export to musicxml. Its primary preservation surface is Project archive (.mscz, a zip of XML), plus MusicXML export, with independence shaped by local desktop application. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

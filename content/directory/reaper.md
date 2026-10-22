+++
title = "REAPER"
category = "Media & Creative"
summary = "Digital audio workstation that works without a cloud account and stores projects in a text-based format."
substrate = "Human-Readable ASCII Project Files (.RPP)"
sync_model = "Portable local install (~15MB), proprietary licence"
extract_cmd = "grep -E 'TRACK|VOLPAN' session.RPP"
limitations = ["Proprietary licensing, plugins, sample libraries, and media sit outside the project file, so the file alone does not carry a project."]
pilot_stage = 4
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
text = "REAPER project files are text-based, with documented project backups and media-copy options."
url = "https://dlx.reaper.fm/userguide/html/"
confidence = "high"

[[evidence]]
target = "E2"
text = "Projects can consolidate media and render stems and standard audio files, supporting handoff and migration."
url = "https://dlx.reaper.fm/userguide/html/"
confidence = "high"

[[evidence]]
target = "E3"
text = "RPP projects are readable text and media can be copied, but plugins, routing, and automation fidelity outside REAPER were not tested."
url = "https://dlx.reaper.fm/userguide/html/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Recording and editing can be performed locally without a hosted account."
url = "https://www.reaper.fm/userguide.php"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Audio production is user-directed, but monitoring, destructive edits, licensing, and release review were not assessed."
url = "https://dlx.reaper.fm/userguide/html/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Text projects, media consolidation, and backups support strong custody and exit."
url = "https://dlx.reaper.fm/userguide/html/"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Standard audio renders and text project files help preservation, while plugins and proprietary assets need capture."
url = "https://dlx.reaper.fm/userguide/html/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The essential DAW workflow is local."
url = "https://www.reaper.fm/userguide.php"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The guide documents project files and backup behavior, but full plugin and mix reconstruction remains unverified."
url = "https://dlx.reaper.fm/userguide/html/"
confidence = "medium"

+++

**Verification scenario:** Relocate a project with all media, samples, fonts, and plugins; open it on a clean licensed environment; render stems.

**What may invalidate an overconfident claim:** A plain-text RPP file cannot preserve proprietary plugins, licences, sample libraries, or media by itself.

**Documentation starting point:** <https://www.reaper.fm/userguide.php>

**Preliminary desk assessment:** REAPER is described as digital audio workstation that works without a cloud account and stores projects in a text-based format. Its primary preservation surface is Human-Readable ASCII Project Files (.RPP), with independence shaped by portable local install (~15mb), proprietary licence. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

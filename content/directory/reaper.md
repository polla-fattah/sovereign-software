+++
title = "REAPER"
category = "Media & Creative"
summary = "Digital audio workstation that works without a cloud account and stores projects in a text-based format."
substrate = "Human-Readable ASCII Project Files (.RPP)"
sync_model = "Portable local install (~15MB), proprietary licence"
extract_cmd = "grep -E 'TRACK|VOLPAN' session.RPP"
limitations = ["Proprietary licensing, plugins, sample libraries, and media sit outside the project file, so the file alone does not carry a project."]
pilot_stage = 4
legacy_tier = "Tier 2"
legacy_label = "Tier 2 • Sovereign Core"
+++

**Verification scenario:** Relocate a project with all media, samples, fonts, and plugins; open it on a clean licensed environment; render stems.

**What may invalidate an overconfident claim:** A plain-text RPP file cannot preserve proprietary plugins, licences, sample libraries, or media by itself.

**Documentation starting point:** <https://www.reaper.fm/userguide.php>

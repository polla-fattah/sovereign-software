+++
title = "REAPER"
category = "Media & Creative"
summary = "Digital audio workstation that works without a cloud account and stores projects in a text-based format."
substrate = "Human-Readable ASCII Project Files (.RPP)"
sync_model = "Portable local install (~15MB), proprietary licence"
extract_cmd = "grep -E 'TRACK|VOLPAN' session.RPP"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Actual RPP/plugin-state inspection, backup/autosave defaults, clean-host consolidation, stem equivalence, version compatibility and evaluation-license behavior remain untested; the proprietary core was not inspected."]
pilot_stage = 4
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence c0eafe87863b2bf69c5c822760f1b32a753b211b"
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
text = "The official extension SDK defines line-oriented ProjectStateContext AddLine/GetLine interfaces and an explicit project-import interface that generates RPP-compatible state. This establishes an exposed textual project-state interface, not a complete public specification or independent decoding of plugin chunks."
url = "https://github.com/justinfrankel/reaper-sdk/blob/c0eafe87863b2bf69c5c822760f1b32a753b211b/sdk/reaper_plugin.h"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Recording and editing can be performed locally without a hosted account."
url = "https://www.reaper.fm/userguide.php"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The SDK separates save/load, undo/redo and cut/copy context flags. Its project-config extension contract says plugins may choose whether to save undo state and ties it to the relevant undo-state flag. Undo coverage for arbitrary extensions therefore cannot be assumed from the existence of REAPER's general undo command."
url = "https://github.com/justinfrankel/reaper-sdk/blob/c0eafe87863b2bf69c5c822760f1b32a753b211b/sdk/reaper_plugin.h"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for REAPER does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://dlx.reaper.fm/userguide/html/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for REAPER's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/justinfrankel/reaper-sdk/blob/c0eafe87863b2bf69c5c822760f1b32a753b211b/sdk/reaper_plugin.h"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The essential DAW workflow is local."
url = "https://www.reaper.fm/userguide.php"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/justinfrankel/reaper-sdk/blob/c0eafe87863b2bf69c5c822760f1b32a753b211b/sdk/reaper_plugin.h"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The SDK exposes textual project-state/import interfaces but does not fully specify proprietary-core or arbitrary plugin chunks. Complete RPP/media/plugin/automation reconstruction and compatible offline continuation have not been independently demonstrated."
url = "https://github.com/justinfrankel/reaper-sdk/blob/c0eafe87863b2bf69c5c822760f1b32a753b211b/sdk/reaper_plugin.h"
confidence = "medium"

[[evidence]]
target = "E5"
text = "SDK save/load and undo context flags explicitly allow extensions to choose saved undo state. Those contracts are not full evidence of effective script/plugin authority, destructive media operations, consolidation/output overwrite and correction in the assessed core/configuration."
url = "https://github.com/justinfrankel/reaper-sdk/blob/c0eafe87863b2bf69c5c822760f1b32a753b211b/sdk/reaper_plugin.h"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish a replacement editable audio workflow preserving routing, automation and plugin-dependent meaning. Consolidated media and rendered stems are useful handoff routes, not the full native-session migration comparison."
url = "https://dlx.reaper.fm/userguide/html/"
confidence = "medium"

+++

**Verification scenario:** Relocate a project with all media, samples, fonts, and plugins; open it on a clean licensed environment; render stems.

**What may invalidate an overconfident claim:** A plain-text RPP file cannot preserve proprietary plugins, licences, sample libraries, or media by itself.

**Documentation starting point:** <https://www.reaper.fm/userguide.php>

**Evidence update: 23 October 2026**

- [x] Resolved: The official extension SDK defines line-oriented ProjectStateContext AddLine/GetLine interfaces and an explicit project-import interface that generates RPP-compatible state. This establishes an exposed textual project-state interface, not a complete public specification or independent decoding of plugin chunks. [Source](https://github.com/justinfrankel/reaper-sdk/blob/c0eafe87863b2bf69c5c822760f1b32a753b211b/sdk/reaper_plugin.h).
- [x] Resolved: The SDK separates save/load, undo/redo and cut/copy context flags. Its project-config extension contract says plugins may choose whether to save undo state and ties it to the relevant undo-state flag. Undo coverage for arbitrary extensions therefore cannot be assumed from the existence of REAPER's general undo command. [Source](https://github.com/justinfrankel/reaper-sdk/blob/c0eafe87863b2bf69c5c822760f1b32a753b211b/sdk/reaper_plugin.h).
- [ ] Open: Actual RPP/plugin-state inspection, backup/autosave defaults, clean-host consolidation, stem equivalence, version compatibility and evaluation-license behavior remain untested; the proprietary core was not inspected. E5 needs core/configuration-specific plugin/script and media/save/export control, with explicit extension undo and backup limits.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-11/.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Actual RPP/plugin-state inspection, backup/autosave defaults, clean-host consolidation, stem equivalence, version compatibility and evaluation-license behavior remain untested; the proprietary core was not inspected. E5 needs core/configuration-specific plugin/script and media/save/export control, with explicit extension undo and backup limits.

**Next without installing locally:** Inspect a synthetic RPP/media/extension-state packet and dependency manifest with expected routing/automation/stems; obtain robust same-version independent save/undo/consolidation observations since the proprietary core is not available for source inspection.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-11/`. Overall: **Insufficient evidence**.

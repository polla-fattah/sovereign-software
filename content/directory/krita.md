+++
title = "Krita"
category = "Graphics & 3D"
summary = "Digital painting application with a documented project archive format."
substrate = "Project archive (.kra, a zip containing maindoc.xml and layer data)"
sync_model = "Local desktop application"
extract_cmd = "unzip -l painting.kra"
limitations = ["Archive/XML inspection establishes structure, not reconstruction of layer pixels or color appearance.","OpenRaster uses projections for several layer types and is not established as a lossless editable-native backup."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit b5b6dd3c8b53944f67a824f7f938f4bbfa80275d; KRA archive relationships and OpenRaster editable-state limits"
assessment_notes = "Individually reconciled in rating batch 6 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "The retained KRA opened as a seven-member ZIP. Namespace-aware maindoc.xml parsing identifies a 100-by-100 RGBA image and Layer 1, whose filename layer0 maps to the archive's built image/layers/layer0 payload; ICC files and preview.png are also present. This historical fixture has no mergedimage.png. Layer pixels and color-profile semantics were not decoded or rebuilt."
url = "https://github.com/KDE/krita/blob/b5b6dd3c8b53944f67a824f7f938f4bbfa80275d/libs/image/tests/data/store_test.kra"
confidence = "high"

[[evidence]]
target = "E2"
text = "The OpenRaster visitor saves generator, clone and external layers through their raster projection, preserves groups as stacks, and skips fake nodes such as reference-image/grid layers. Its adjustment-layer branch creates a Krita-specific filter element but does not append it to the stack in that branch. ORA therefore cannot be assumed to preserve every native editable construct; no export/import was executed."
url = "https://github.com/KDE/krita/blob/b5b6dd3c8b53944f67a824f7f938f4bbfa80275d/plugins/impex/ora/kis_open_raster_stack_save_visitor.cpp"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The native file can be inspected as a compressed archive and layers can sometimes be recovered, but independent reconstruction was not tested."
url = "https://docs.krita.org/en/user_manual/working_with_images.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The editing workflow is local-file-based and does not require a hosted account."
url = "https://krita.org/en/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Image editing is user-directed, but asset provenance, overwrite, and publishing review were not assessed."
url = "https://docs.krita.org/en/reference_manual/main_menu/file_menu.html"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Krita does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://docs.krita.org/en/user_manual/working_with_images.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Krita's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://docs.krita.org/en/user_manual/working_with_images.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core editing and storage operate locally without a provider."
url = "https://krita.org/en/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://docs.krita.org/en/reference_manual/main_menu/file_menu.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The historical KRA exposes a layer/payload relationship and profiles but its pixel data/color semantics were not independently rebuilt. OpenRaster source projects or skips some native constructs, so neither equivalent layers/masks/animation nor complete native recovery follows from ZIP readability."
url = "https://docs.krita.org/en/user_manual/working_with_images.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "User-directed image editing does not establish plugin/script authority, save/export overwrite decisions or correction after layer and animation changes. Conditional backups/autosave and effective settings still lack sufficient evidence for this profile."
url = "https://docs.krita.org/en/reference_manual/main_menu/file_menu.html"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The retained KRA opened as a seven-member ZIP. Namespace-aware maindoc.xml parsing identifies a 100-by-100 RGBA image and Layer 1, whose filename layer0 maps to the archive's built image/layers/layer0 payload; ICC files and preview.png are also present. This historical fixture has no mergedimage.png. Layer pixels and color-profile semantics were not decoded or rebuilt. [Source](https://github.com/KDE/krita/blob/b5b6dd3c8b53944f67a824f7f938f4bbfa80275d/libs/image/tests/data/store_test.kra).
- [x] Resolved: The OpenRaster visitor saves generator, clone and external layers through their raster projection, preserves groups as stacks, and skips fake nodes such as reference-image/grid layers. Its adjustment-layer branch creates a Krita-specific filter element but does not append it to the stack in that branch. ORA therefore cannot be assumed to preserve every native editable construct; no export/import was executed. [Source](https://github.com/KDE/krita/blob/b5b6dd3c8b53944f67a824f7f938f4bbfa80275d/plugins/impex/ora/kis_open_raster_stack_save_visitor.cpp).
- [ ] Open: Native pixel reconstruction, masks/vector/text/animation and color fidelity across ORA/PSD/PNG, actual adjustment-layer export behavior, version round trips, backup/autosave recovery and update/network controls. E5 needs save/autosave, plugin/script and destructive-edit/overwrite visibility and correction boundaries.

**Assessment follow-up:** These findings now appear in the application's evidence and limitations. At the user's request, existing eligibility and principle ratings are unchanged; E3/E5, principle consistency and blank-status fixes will be reconciled in the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-5/.

**Human-readable criteria:** Can a creator preserve editable source work and linked assets, reopen it after software changes, and export a useful representation to independent tools?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Native pixel reconstruction, masks/vector/text/animation and color fidelity across ORA/PSD/PNG, actual adjustment-layer export behavior, version round trips, backup/autosave recovery and update/network controls. E5 needs save/autosave, plugin/script and destructive-edit/overwrite visibility and correction boundaries.

**Next without installing locally:** Use a synthetic KRA with representative layers/masks/text/animation and dependency/color manifest, native/interchange exports and reference comparisons; inspect archives and seek matching save/undo/autosave controls.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-6/`. Overall: **Insufficient evidence**.

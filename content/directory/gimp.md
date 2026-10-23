+++
title = "GIMP"
category = "Graphics & 3D"
summary = "Raster image editor with a native layered format and export to many open formats."
substrate = "Native .xcf layered image, plus open export formats"
sync_model = "Local desktop application"
extract_cmd = "file image.xcf"
limitations = ["The decoded fixture is legacy XCF version 0; modern file/pixel reconstruction remains open.","ORA stores raster layer contents and has a mode fallback, so native editability and appearance need separate comparison."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit 84709e20bc45311322a318b20669dc6b52118353; legacy XCF layer records and OpenRaster raster/mode boundaries"
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
text = "A bounded independent parser read the legacy XCF version-0 header, 100-by-90 canvas, property records, layer offsets, and layer2/layer1 names and dimensions from the published fixture. This uses neither GIMP nor a GIMP library. Pixel tiles, masks, modern XCF versions and rendered appearance were not reconstructed."
url = "https://github.com/GNOME/gimp/blob/84709e20bc45311322a318b20669dc6b52118353/app/tests/files/gimp-2-6-file.xcf"
confidence = "high"

[[evidence]]
target = "E2"
text = "The OpenRaster exporter serializes layer pixels as PNG, nests groups in stack XML and stores names, offsets, opacity and visibility. Unsupported layer modes fall back to svg:src-over in its mapping. This path does not serialize editable text or arbitrary native effect state as their native objects, so an ORA exit must not be assumed to preserve all editability or compositing semantics."
url = "https://github.com/GNOME/gimp/blob/84709e20bc45311322a318b20669dc6b52118353/plug-ins/python/file-openraster.py"
confidence = "medium"

[[evidence]]
target = "E3"
text = "XCF preserves the complete editable image except undo information, but restoration with a clean installation and plugin set was not tested."
url = "https://docs.gimp.org/en_GB/gimp-images-out.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Editing, saving, and exporting are local operations without a required vendor account."
url = "https://docs.gimp.org/3.0/en/gimp-export-dialog.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Save/export prompts expose some loss decisions, but plugins, scripts, and destructive layer operations need hands-on review."
url = "https://docs.gimp.org/3.0/en/gimp-export-dialog.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for GIMP does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://docs.gimp.org/en_GB/gimp-images-out.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for GIMP's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://docs.gimp.org/en_GB/gimp-images-out.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The image workflow is local."
url = "https://docs.gimp.org/3.0/en/gimp-export-dialog.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://docs.gimp.org/3.0/en/gimp-export-dialog.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The independent parser reads legacy XCF header/layer records but not pixels, masks, modern formats or equivalent color/compositing. OpenRaster serializes rasterized state and falls back for some modes, so complete native editable-image reconstruction remains unestablished."
url = "https://docs.gimp.org/en_GB/gimp-images-out.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Save/export prompts are positive leads, not full evidence for plugin/script authorization, destructive effects/layer changes, overwrite visibility and meaningful undo/crash recovery in the declared modern project and plugin configuration."
url = "https://docs.gimp.org/3.0/en/gimp-export-dialog.html"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: A bounded independent parser read the legacy XCF version-0 header, 100-by-90 canvas, property records, layer offsets, and layer2/layer1 names and dimensions from the published fixture. This uses neither GIMP nor a GIMP library. Pixel tiles, masks, modern XCF versions and rendered appearance were not reconstructed. [Source](https://github.com/GNOME/gimp/blob/84709e20bc45311322a318b20669dc6b52118353/app/tests/files/gimp-2-6-file.xcf).
- [x] Resolved: The OpenRaster exporter serializes layer pixels as PNG, nests groups in stack XML and stores names, offsets, opacity and visibility. Unsupported layer modes fall back to svg:src-over in its mapping. This path does not serialize editable text or arbitrary native effect state as their native objects, so an ORA exit must not be assumed to preserve all editability or compositing semantics. [Source](https://github.com/GNOME/gimp/blob/84709e20bc45311322a318b20669dc6b52118353/plug-ins/python/file-openraster.py).
- [ ] Open: Current layered-XCF decoding, text/mask/group/high-bit-depth and ICC fidelity, actual ORA/PSD/TIFF round trips, old/new-version saves, crash recovery and plugin/network controls. E5 needs plugin/script, destructive-edit and save/export overwrite control with explicit undo/recovery limits.

**Assessment follow-up:** These findings now appear in the application's evidence and limitations. At the user's request, existing eligibility and principle ratings are unchanged; E3/E5, principle consistency and blank-status fixes will be reconciled in the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-5/.

**Human-readable criteria:** Can a creator preserve editable source work and linked assets, reopen it after software changes, and export a useful representation to independent tools?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Current layered-XCF decoding, text/mask/group/high-bit-depth and ICC fidelity, actual ORA/PSD/TIFF round trips, old/new-version saves, crash recovery and plugin/network controls. E5 needs plugin/script, destructive-edit and save/export overwrite control with explicit undo/recovery limits.

**Next without installing locally:** Acquire a current synthetic layered XCF plus mask/text/ICC dependencies, expected semantic/pixel records and independent ORA/PSD/TIFF comparisons; seek same-version plugin/save/undo evidence without running the target.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-6/`. Overall: **Insufficient evidence**.

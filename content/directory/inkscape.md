+++
title = "Inkscape"
category = "Graphics & 3D"
summary = "Vector graphics editor whose native format is SVG."
substrate = "SVG (XML) with editor-specific metadata"
sync_model = "Local desktop application"
extract_cmd = "grep -c \"<path\" drawing.svg"
assessment_batch = "B"
limitations = ["The inspected SVG samples identify Inkscape 0.92-era creators, not a current release.","Readable SVG paths do not guarantee preservation of editor-specific layers or live-effect controls.","Export action registration was inspected; Plain SVG output was not generated."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit 9055f262b58743a1f7caee54c1132f029341fe0a; sample SVG metadata/embedded assets and Plain SVG action registration"
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
text = "Standard XML parsing reads the historical gears SVG's eight path elements, four use references, Layer 1 metadata and a gears path-effect record with teeth=10 and phi=20. A separate data-URI SVG yielded a 235-byte embedded PNG payload through Base64 decoding. Editor metadata and an embedded asset are independently inspectable; no SVG rendering or live-effect re-editing was reproduced."
url = "https://gitlab.com/inkscape/inkscape/-/blob/9055f262b58743a1f7caee54c1132f029341fe0a/share/examples/live-path-effects-gears.svg"
confidence = "high"

[[evidence]]
target = "E2"
text = "Plain SVG is registered with prune-proprietary-namespaces and prune-inkscape-namespaces actions, unlike the native SVG registration's editor-metadata handling. This identifies an explicit difference in the configured output pipeline, not an executed export or an exhaustive list of lost attributes. Layer/live-effect editability must not be inferred merely from preserved visible paths."
url = "https://gitlab.com/inkscape/inkscape/-/blob/9055f262b58743a1f7caee54c1132f029341fe0a/src/extension/internal/svg.cpp"
confidence = "medium"

[[evidence]]
target = "E3"
text = "SVG files are independently readable by other software, while Inkscape-specific namespaces and effects require a compatibility test."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The editor runs on GNU/Linux, Windows, and macOS and can be used with local files without a hosted account."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Artwork creation is generally user-directed; accessibility, licensing, and consequential publishing workflows were not assessed."
url = "https://inkscape.org/learn/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Inkscape does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://gitlab.com/inkscape/inkscape/-/blob/9055f262b58743a1f7caee54c1132f029341fe0a/src/extension/internal/svg.cpp"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Inkscape's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core editing workflow is local and does not require a provider account or hosted storage."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Independent SVG/XML and embedded-image inspection recovers some paths, references and live-effect metadata, but no current native/Plain SVG reconstruction establishes equivalent objects/effects, fonts, linked assets and multipage meaning. Namespace pruning is a known export distinction, not complete recovery."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The generic publishing/accessibility note does not establish control of document mutations. Save/export overwrite, extension/script execution, external-link transmission and undo/recovery boundaries remain insufficiently evidenced for the original artwork workflow."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass is not supported for the full editable-artwork scope. Plain SVG namespace pruning and historical path inspection do not establish preservation of essential live effects, layers, linked assets and editable relationships in a replacement workflow."
url = "https://gitlab.com/inkscape/inkscape/-/blob/9055f262b58743a1f7caee54c1132f029341fe0a/src/extension/internal/svg.cpp"
confidence = "medium"

+++

**Primary investigation:** Preservation of editable design semantics in SVG and other interchange formats.

**Investigation priority:** Sovereignty standard, Longevity high, Locality standard, Transparency and Control standard. This plans the test effort and is not a finding.

**Synthetic dataset:** An illustration with paths, text, gradients, layers, clipping masks, embedded images, linked images, filters, and application-specific effects.

**Required tests**

1. Save as native Inkscape SVG and Plain SVG.
2. Open each file in at least one independent SVG-capable application.
3. Identify extensions or metadata that preserve information only Inkscape understands.
4. Compare visual output and editability after export and reimport.
5. Test missing fonts, linked images, and external assets.
6. Verify that essential artwork can be accessed and modified without Inkscape.
7. Test offline creation, saving, printing, and export.
8. Examine destructive transformations and recovery behavior.

**Critical evidence:** SVG source inspection, rendering comparisons, feature-loss matrix, external-resource inventory, and independent editing results.

**Method note:** The question is not whether SVG is an open standard. It is whether the design's essential meaning and editability survive conversion to an independently usable representation.

**Evidence update: 23 October 2026**

- [x] Resolved: Standard XML parsing reads the historical gears SVG's eight path elements, four use references, Layer 1 metadata and a gears path-effect record with teeth=10 and phi=20. A separate data-URI SVG yielded a 235-byte embedded PNG payload through Base64 decoding. Editor metadata and an embedded asset are independently inspectable; no SVG rendering or live-effect re-editing was reproduced. [Source](https://gitlab.com/inkscape/inkscape/-/blob/9055f262b58743a1f7caee54c1132f029341fe0a/share/examples/live-path-effects-gears.svg).
- [x] Resolved: Plain SVG is registered with prune-proprietary-namespaces and prune-inkscape-namespaces actions, unlike the native SVG registration's editor-metadata handling. This identifies an explicit difference in the configured output pipeline, not an executed export or an exhaustive list of lost attributes. Layer/live-effect editability must not be inferred merely from preserved visible paths. [Source](https://gitlab.com/inkscape/inkscape/-/blob/9055f262b58743a1f7caee54c1132f029341fe0a/src/extension/internal/svg.cpp).
- [ ] Open: An executed native/Plain SVG comparison, independent rendering/editing, fonts and linked-image relocation, PDF/PNG losses, current-version multipage behavior, crash recovery and network behavior. E5 needs extension/external-link and save/export overwrite controls, visible changes and available undo/recovery.

**Assessment follow-up:** These findings now appear in the application's evidence and limitations. At the user's request, existing eligibility and principle ratings are unchanged; E3/E5, principle consistency and blank-status fixes will be reconciled in the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-5/.

**Human-readable criteria:** Can a creator preserve editable source work and linked assets, reopen it after software changes, and export a useful representation to independent tools?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** An executed native/Plain SVG comparison, independent rendering/editing, fonts and linked-image relocation, PDF/PNG losses, current-version multipage behavior, crash recovery and network behavior. E5 needs extension/external-link and save/export overwrite controls, visible changes and available undo/recovery.

**Next without installing locally:** Inspect a native/Plain SVG pair with fonts/assets and expected layer/effect/object relationships, plus independent render/edit comparisons. Add primary-source or external tests of extension, overwrite and undo controls.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-6/`. Overall: **Insufficient evidence**.

+++
title = "Typst"
category = "Knowledge & Office"
summary = "Deterministic document typesetting from plain text that recompiles multi-page documents in milliseconds, offline."
substrate = "Plain-Text Markup (.typ)"
sync_model = "Single zero-dependency native binary"
extract_cmd = "typst compile manuscript.typ output.pdf"
pilot_stage = 2
limitations = ["Pinned source inspection, not application execution.","An offline compile, explicit font inventory, cross-version output comparison and web-app export completeness remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned source 64c5e8c02fe0394d913ead36e42ef8c1334d2107"
assessment_notes = "Individually reconciled in rating batch 8 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
url = "https://typst.app/docs/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Package lookup checks configured data/cache locations before obtaining missing preview-namespace packages from Typst Universe; other namespaces are searched locally. Offline operation requires the needed package versions already to be available."
url = "https://github.com/typst/typst/blob/64c5e8c02fe0394d913ead36e42ef8c1334d2107/crates/typst-kit/src/packages.rs"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The system world resolves a project filesystem root, a separate package store and lazily discovered fonts. Recovery therefore must account for referenced files, package versions and font inputs; a PDF or single .typ source is not demonstrated to preserve the editable project."
url = "https://github.com/typst/typst/blob/64c5e8c02fe0394d913ead36e42ef8c1334d2107/crates/typst-cli/src/world.rs"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://typst.app/docs/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The official documentation for this entry provides a relevant governability of consequential actions lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://typst.app/docs/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Typst does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/typst/typst/blob/64c5e8c02fe0394d913ead36e42ef8c1334d2107/crates/typst-kit/src/packages.rs"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Typst's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/typst/typst/blob/64c5e8c02fe0394d913ead36e42ef8c1334d2107/crates/typst-cli/src/world.rs"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://typst.app/docs/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://typst.app/docs/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Source identifies a project root, package store and lazy font discovery; missing preview packages can be downloaded. No complete font/package/file-closed project was compiled or independently reconstructed in the assessed version. A PDF or a single source file does not preserve all editable document meaning."
url = "https://github.com/typst/typst/blob/64c5e8c02fe0394d913ead36e42ef8c1334d2107/crates/typst-cli/src/world.rs"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The collected package/root dependency implementation does not establish effective file/package trust, executable extension boundaries, output overwrite review or available recovery of document mutations. No document-local or web-app control configuration is sufficiently evidenced for whole-scope E5."
url = "https://typst.app/docs/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish a usable independent document-authoring workflow retaining references, package/font behavior and editable structure. Readable Typst source or PDF output is not that full migration comparison."
url = "https://github.com/typst/typst/blob/64c5e8c02fe0394d913ead36e42ef8c1334d2107/crates/typst-kit/src/packages.rs"
confidence = "medium"

+++

**Verification scenario:** Compile offline using cached fonts and packages; recover source, images, bibliography, and reference output.

**What may invalidate an overconfident claim:** A standalone compiler may still need external packages and fonts for a given project.

**Documentation starting point:** <https://typst.app/docs/>

**Evidence update: 23 October 2026**

- [x] Resolved: Package lookup checks configured data/cache locations before obtaining missing preview-namespace packages from Typst Universe; other namespaces are searched locally. Offline operation requires the needed package versions already to be available. [Source](https://github.com/typst/typst/blob/64c5e8c02fe0394d913ead36e42ef8c1334d2107/crates/typst-kit/src/packages.rs).
- [x] Resolved: The system world resolves a project filesystem root, a separate package store and lazily discovered fonts. Recovery therefore must account for referenced files, package versions and font inputs; a PDF or single .typ source is not demonstrated to preserve the editable project. [Source](https://github.com/typst/typst/blob/64c5e8c02fe0394d913ead36e42ef8c1334d2107/crates/typst-cli/src/world.rs).
- [ ] Open: An offline compile, explicit font inventory, cross-version output comparison and web-app export completeness remain untested. E5 needs package/file access and output-overwrite policy plus inspectable source changes and correction boundaries.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-8/.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** An offline compile, explicit font inventory, cross-version output comparison and web-app export completeness remain untested. E5 needs package/file access and output-overwrite policy plus inspectable source changes and correction boundaries.

**Next without installing locally:** Use a source/assets/font/package manifest with exact versions and a reference output; obtain an offline compile/comparison and primary-source file/package/overwrite controls without installing a new compiler here.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-8/`. Overall: **Insufficient evidence**.

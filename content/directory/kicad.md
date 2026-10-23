+++
title = "KiCad"
category = "Engineering & CAD"
summary = "Electronic schematic capture and PCB design suite where every net, footprint, and trace is stored in human-readable S-expressions with zero cloud licensing."
substrate = "Plain-Text S-Expressions (.kicad_sch/.kicad_pcb)"
sync_model = "Git / Local Vendor Libraries"
extract_cmd = "kicad-cli pcb export gerbers board.kicad_pcb"
pilot_stage = 4
limitations = ["Explicit PCB net references do not establish electrical or manufacturing correctness.","External model variables require separately preserved assets/configuration.","Archive selection can omit extras and hidden history; complete dependency recovery remains unverified."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit ba5ed30c1bee8bcfa7db6dc423f1d20224c4e3a5; PCB S-expression connectivity and project-archive inclusion limits"
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
text = "A standalone S-expression parser read the published version-20221018 board: nine footprints, seventeen pads, twenty-six segments and four vias. All seventeen pad net references resolve to declared net IDs; five 3D-model references use the external KICAD6_3DMODEL_DIR variable. This recovers explicit connectivity/asset references, not electrical correctness, fabrication validity or availability of the model files."
url = "https://github.com/KiCad/kicad-source-mirror/blob/ba5ed30c1bee8bcfa7db6dc423f1d20224c4e3a5/qa/data/cli/basic_test/basic_test.kicad_pcb"
confidence = "high"

[[evidence]]
target = "E2"
text = "Project archiving traverses the selected project directory and includes recognized extensions/named library tables. STEP/VRML and other extra-file extensions are conditional on Include Extra Files; hidden directories such as .git and .history are excluded. This is file selection, not a demonstrated resolution/copy of every externally referenced library or 3D model."
url = "https://github.com/KiCad/kicad-source-mirror/blob/ba5ed30c1bee8bcfa7db6dc423f1d20224c4e3a5/common/project/project_archiver.cpp"
confidence = "medium"

[[evidence]]
target = "E3"
text = "KiCad exposes project files and documented archive behavior, but independent restoration and preservation of every library dependency were not demonstrated."
url = "https://docs.kicad.org/doxygen/classPROJECT__ARCHIVER.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The design workflow is local-file-based and does not require a hosted account."
url = "https://www.kicad.org/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Circuit design is user-directed, but electrical-rule warnings, manufacturing release approval, and revision control safeguards were not tested."
url = "https://www.kicad.org/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for KiCad does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://docs.kicad.org/doxygen/classPROJECT__ARCHIVER.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for KiCad's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://docs.kicad.org/doxygen/classPROJECT__ARCHIVER.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core design and archiving operate locally without a provider."
url = "https://www.kicad.org/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://www.kicad.org/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The standalone PCB parser resolves pad/net relationships and identifies external 3D-model variables, while archive source selects files rather than resolving every dependency. Hierarchical schematics, custom libraries, external models and cross-version editable/fabrication meaning have not been reconstructed."
url = "https://docs.kicad.org/doxygen/classPROJECT__ARCHIVER.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Electrical correctness and manufacturing suitability are not themselves E5 authorization tests. The evidence does not sufficiently establish schematic-to-board mutation review, destructive library/board changes, output overwrite or release/correction controls in the existing engineering workflow."
url = "https://www.kicad.org/"
confidence = "medium"

+++

**Verification scenario:** Open the project across machines; compare schematic, PCB, symbols, footprints, 3D models, netlists, and Gerbers.

**What may invalidate an overconfident claim:** Manufacturing Gerbers do not preserve editable circuit meaning or BOM and library dependencies.

**Documentation starting point:** <https://docs.kicad.org/>

**Evidence update: 23 October 2026**

- [x] Resolved: A standalone S-expression parser read the published version-20221018 board: nine footprints, seventeen pads, twenty-six segments and four vias. All seventeen pad net references resolve to declared net IDs; five 3D-model references use the external KICAD6_3DMODEL_DIR variable. This recovers explicit connectivity/asset references, not electrical correctness, fabrication validity or availability of the model files. [Source](https://github.com/KiCad/kicad-source-mirror/blob/ba5ed30c1bee8bcfa7db6dc423f1d20224c4e3a5/qa/data/cli/basic_test/basic_test.kicad_pcb).
- [x] Resolved: Project archiving traverses the selected project directory and includes recognized extensions/named library tables. STEP/VRML and other extra-file extensions are conditional on Include Extra Files; hidden directories such as .git and .history are excluded. This is file selection, not a demonstrated resolution/copy of every externally referenced library or 3D model. [Source](https://github.com/KiCad/kicad-source-mirror/blob/ba5ed30c1bee8bcfa7db6dc423f1d20224c4e3a5/common/project/project_archiver.cpp).
- [ ] Open: Hierarchical schematic/custom-library reconstruction, complete archive/move including external models, manufacturing and editable export comparison, old/new-version saves, .history recovery and schematic-to-PCB update effects. E5 needs inspectable schematic-to-PCB updates, destructive edit/output overwrite controls and available correction; accuracy claims are separate.

**Assessment follow-up:** These findings now appear in the application's evidence and limitations. At the user's request, existing eligibility and principle ratings are unchanged; E3/E5, principle consistency and blank-status fixes will be reconciled in the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-5/.

**Human-readable criteria:** Can an independent party preserve the source model, units, dependencies, and editable structure, reproduce the result, and exchange it without losing important design meaning?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Hierarchical schematic/custom-library reconstruction, complete archive/move including external models, manufacturing and editable export comparison, old/new-version saves, .history recovery and schematic-to-PCB update effects. E5 needs inspectable schematic-to-PCB updates, destructive edit/output overwrite controls and available correction; accuracy claims are separate.

**Next without installing locally:** Inspect a complete synthetic schematic/PCB/library/model packet and expected connectivity/units manifest, with independent output comparisons. Obtain primary-source or external update/undo/overwrite evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-6/`. Overall: **Insufficient evidence**.

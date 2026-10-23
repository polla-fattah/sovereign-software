+++
title = "FreeCAD"
category = "Engineering & CAD"
summary = "Parametric 3D CAD modeller with a Python interface, with project files that are zip archives."
substrate = "Project archive (.FCStd, a zip containing Document.xml and shapes)"
sync_model = "Local desktop application; version control via external tools"
extract_cmd = "unzip -p model.FCStd Document.xml | head -n 20"
limitations = ["Project interpretation depends on the application version and workbench."]
assessment_batch = "B"
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit d48752f2851906f93e060cc996ba9fba1e5a05f8 and retained PadTest.fcstd fixture; no CAD execution"
assessment_notes = "Individually reconciled in rating batch 4 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Resolved: standard ZIP/XML tools opened PadTest.fcstd and parsed its Document.xml. Thirteen named typed objects, including sketches, pads, and a body, are visible alongside typed Constraints, Length, Support, and link properties. Shape payloads and GUI data are separate members. No geometry was reconstructed."
url = "https://github.com/FreeCAD/FreeCAD/blob/d48752f2851906f93e060cc996ba9fba1e5a05f8/data/tests/PadTest.fcstd"
confidence = "high"

[[evidence]]
target = "E2"
text = "Interchange formats provide an exit path, but preservation of parametric history, constraints, workbench data, and analysis results was not tested."
url = "https://www.freecad.org/features.php?lang=en-UNIVERSALITSOLUTIONS"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Resolved: saveToFile writes Document.xml and other payloads with a ZIP writer; with backup policy enabled it uses a temporary filename and BackupPolicy, including count and timestamped naming preferences. Effective user settings, crash durability, full reconstruction, and version recovery remain unverified."
url = "https://github.com/FreeCAD/FreeCAD/blob/d48752f2851906f93e060cc996ba9fba1e5a05f8/src/App/Document.cpp#L1968-L2106"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Modeling and export are local operations without a required hosted service."
url = "https://www.freecad.org/features.php?lang=en-UNIVERSALITSOLUTIONS"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The document tree and Python interface expose operations, but workbench-specific and geometry-kernel behavior requires hands-on review."
url = "https://www.freecad.org/features.php?lang=en-UNIVERSALITSOLUTIONS"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for FreeCAD does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/FreeCAD/FreeCAD/blob/d48752f2851906f93e060cc996ba9fba1e5a05f8/src/App/Document.cpp#L1968-L2106"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for FreeCAD's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/FreeCAD/FreeCAD/blob/d48752f2851906f93e060cc996ba9fba1e5a05f8/src/App/Document.cpp#L1968-L2106"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core CAD work is local and scriptable."
url = "https://www.freecad.org/features.php?lang=en-UNIVERSALITSOLUTIONS"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://www.freecad.org/features.php?lang=en-UNIVERSALITSOLUTIONS"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Independent ZIP/XML inspection exposes typed sketches, pads and constraints, but separate shape payloads were not interpreted into equivalent geometry or engineering intent. Temporary-save/backup policy source is conditional. Units, constraints, external references and compatible reconstruction remain incomplete for the original CAD profile."
url = "https://github.com/FreeCAD/FreeCAD/blob/d48752f2851906f93e060cc996ba9fba1e5a05f8/src/App/Document.cpp#L1968-L2106"
confidence = "medium"

[[evidence]]
target = "E5"
text = "A document tree and Python interface make some operations inspectable, and save backup policy is visible in source. They do not establish workbench/script authorization, transaction/undo scope, geometry-changing effects or reliable correction after destructive save/recompute across the declared model."
url = "https://www.freecad.org/features.php?lang=en-UNIVERSALITSOLUTIONS"
confidence = "medium"

+++

**Primary investigation:** Preservation of editable engineering intent, not only final geometry.

**Investigation priority:** Sovereignty standard, Longevity high, Locality standard, Transparency and Control high. This plans the test effort and is not a finding.

**Synthetic dataset:** A parametric mechanical part and small assembly with sketches, constraints, dimensions, dependencies, external references, and exportable geometry.

**Required tests**

1. Inspect the native project format and document independently recoverable contents.
2. Export STEP, STL, and other appropriate formats.
3. Reimport those exports and distinguish preserved geometry from lost parametric history.
4. Modify upstream dimensions and record whether downstream dependencies remain understandable and recoverable.
5. Move the project to a clean machine and verify all dependencies.
6. Compare supported software versions for migration or interpretation problems.
7. Test local operation without accounts or network services.

**Critical evidence:** Native project, export files, parametric feature comparison, dependency recovery notes, and cross-version test results.

**Method note:** Do not classify slow recomputation, topological naming difficulties, or a feature-rich interface as failures of sovereignty by themselves. The concern is whether they cause significant loss of user control, interpretability, or recoverability.

**Two-assessor protocol scope note:** Pre-registered under the `cad_engineering` domain profile. Both assessors evaluate whether exported STEP/BREP and native `.FCStd` XML preserve units, tolerances, and editable feature trees across versions.

**Assessment update, 23 October 2026:**

- [x] Resolved: the retained FCStd parses independently as ZIP/XML and exposes 13 typed objects with named engineering properties.
- [x] Resolved: save/backup handling is available in the inspected implementation, including temporary-file writing and configurable backup policy.
- [ ] Open: units/constraint semantics, geometry reconstruction, STEP loss, external dependencies, version compatibility, and crash recovery. E5 needs script/workbench execution control, transaction/undo boundaries and destructive save/recompute correction evidence.

**Assessment:** Direct artifact inspection establishes structural access, while source inspection establishes the save/backup design. Complete engineering recovery remains Not Verified; the overall determination remains **Insufficient evidence**.

**Human-readable criteria:** Can an independent party preserve the source model, units, dependencies, and editable structure, reproduce the result, and exchange it without losing important design meaning?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** units/constraint semantics, geometry reconstruction, STEP loss, external dependencies, version compatibility, and crash recovery. E5 needs script/workbench execution control, transaction/undo boundaries and destructive save/recompute correction evidence.

**Next without installing locally:** Inspect a synthetic FCStd plus dependency and expected units/constraint/geometry manifest, with independent geometry comparisons supplied upstream or by another assessor. Add pinned transaction/script/save-control evidence without executing CAD locally.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-4/`. Overall: **Insufficient evidence**.

+++
title = "OpenSCAD"
category = "Engineering & CAD"
summary = "Code-first 3D solid modelling from plain-text scripts. Output can differ between versions and geometry engines, so reproducing a result needs stated versions."
substrate = "Programmatic CSG Plain-Text Scripts (.scad)"
sync_model = "Git Version Control"
extract_cmd = "openscad -o part.stl model.scad"
pilot_stage = 4
limitations = ["A 3MF mesh/package does not preserve the original SCAD construction program.","The inspected STL has no semantic source-parameter/unit fields and no populated triangle attributes.","A normalized regression expectation is not itself a portable 3MF package."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit d7a210ed01e5db9f09a8164894b0d0b07d7f2c67; 3MF package/expectation inspection and binary STL information limits"
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
text = "The published 3MF import fixture opened as a three-member ZIP. Its model XML specifies millimeters and exposes one object with twenty vertices, thirty-six triangles and a build item referencing object 1. A separate color-export regression expectation contains four raw color values but is normalized text with an unbound namespace prefix, not a valid standalone XML package; that parse error is recorded. No geometry engine was run."
url = "https://github.com/openscad/openscad/blob/d7a210ed01e5db9f09a8164894b0d0b07d7f2c67/tests/data/scad/3D/features/import.3mf"
confidence = "high"

[[evidence]]
target = "E2"
text = "The retained binary STL expectation contains eight triangles, has the expected 84+50*n byte length, and uses zero for every two-byte triangle attribute. The writer similarly emits normals/vertices and zero attributes with an OpenSCAD Model header. This output is a mesh representation, not a serialization of source parameters, construction history or semantic units."
url = "https://github.com/openscad/openscad/blob/d7a210ed01e5db9f09a8164894b0d0b07d7f2c67/src/io/export_stl.cc"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Source files are independently readable, but external includes, libraries, version differences, and generated geometry were not reconstructed independently."
url = "https://files.openscad.org/documentation/manual/Using_OpenSCAD_with_an_external_Editor.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The modeling workflow is local and editor-independent."
url = "https://openscad.org/documentation.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Models may inform manufacturing, but geometry validation, units, tolerances, and release approval were not assessed."
url = "https://files.openscad.org/documentation/manual/OpenSCAD_User_Manual.html"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for OpenSCAD does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/openscad/openscad/blob/d7a210ed01e5db9f09a8164894b0d0b07d7f2c67/src/io/export_stl.cc"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for OpenSCAD's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://files.openscad.org/documentation/manual/Using_OpenSCAD_with_an_external_Editor.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core modeling and rendering run locally without a provider."
url = "https://openscad.org/documentation.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://files.openscad.org/documentation/manual/OpenSCAD_User_Manual.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The independent 3MF/STL readers expose mesh geometry and units where represented, but STL does not preserve source parameters/construction meaning and one regression expectation is not standalone XML. Complete includes/fonts, source/version dependencies and equivalent generated geometry remain unestablished for the original parametric profile."
url = "https://files.openscad.org/documentation/manual/Using_OpenSCAD_with_an_external_Editor.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Manufacturing accuracy alone is not E5. The current evidence does not establish effective model/include execution authority, file/output overwrite control, previewed consequential changes or correction after lost source edits; backup and configuration boundaries remain open."
url = "https://files.openscad.org/documentation/manual/OpenSCAD_User_Manual.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish a replacement parametric workflow preserving source parameters, construction meaning, units and required dependencies. Mesh-only interoperability is a narrower result, not full-scope migration."
url = "https://github.com/openscad/openscad/blob/d7a210ed01e5db9f09a8164894b0d0b07d7f2c67/src/io/export_stl.cc"
confidence = "medium"

+++

**Verification scenario:** Rebuild models offline with all imported libraries and fonts; export geometry, inspect the parameterised source, and compare results.

**What may invalidate an overconfident claim:** Avoid claims of universally identical meshes across engines and versions.

**Documentation starting point:** <https://openscad.org/documentation.html>

**Evidence update: 23 October 2026**

- [x] Resolved: The published 3MF import fixture opened as a three-member ZIP. Its model XML specifies millimeters and exposes one object with twenty vertices, thirty-six triangles and a build item referencing object 1. A separate color-export regression expectation contains four raw color values but is normalized text with an unbound namespace prefix, not a valid standalone XML package; that parse error is recorded. No geometry engine was run. [Source](https://github.com/openscad/openscad/blob/d7a210ed01e5db9f09a8164894b0d0b07d7f2c67/tests/data/scad/3D/features/import.3mf).
- [x] Resolved: The retained binary STL expectation contains eight triangles, has the expected 84+50*n byte length, and uses zero for every two-byte triangle attribute. The writer similarly emits normals/vertices and zero attributes with an OpenSCAD Model header. This output is a mesh representation, not a serialization of source parameters, construction history or semantic units. [Source](https://github.com/openscad/openscad/blob/d7a210ed01e5db9f09a8164894b0d0b07d7f2c67/src/io/export_stl.cc).
- [ ] Open: Actual CGAL/Manifold equivalence, exported geometry reconstruction, parameter/color/unit losses in receiving tools, complete library/font dependency capture, source/version compatibility and crash backup behavior. E5 needs source/include execution and save/export overwrite authority, inspectability and backup/correction boundaries.

**Assessment follow-up:** These findings now appear in the application's evidence and limitations. At the user's request, existing eligibility and principle ratings are unchanged; E3/E5, principle consistency and blank-status fixes will be reconciled in the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-5/.

**Human-readable criteria:** Can an independent party preserve the source model, units, dependencies, and editable structure, reproduce the result, and exchange it without losing important design meaning?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Actual CGAL/Manifold equivalence, exported geometry reconstruction, parameter/color/unit losses in receiving tools, complete library/font dependency capture, source/version compatibility and crash backup behavior. E5 needs source/include execution and save/export overwrite authority, inspectability and backup/correction boundaries.

**Next without installing locally:** Retain a synthetic parametric model with every include/font and expected geometry/unit/color manifest, then use independent parsers and externally supplied engine comparisons. Review same-version file/execution/backup controls.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-6/`. Overall: **Insufficient evidence**.

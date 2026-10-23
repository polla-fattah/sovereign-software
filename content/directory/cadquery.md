+++
title = "CadQuery"
category = "Engineering & CAD"
summary = "Python library for scripted parametric CAD whose models are ordinary code."
limitations = ["STEP metadata is inspectable, but geometry and parametric constraints were not reconstructed. CQGI executes Python with real builtins."]
substrate = "Python scripts that export STEP and STL"
sync_model = "Local Python environment; plain-text scripts suit version control"
extract_cmd = "python -c \"import cadquery as cq; cq.exporters.export(cq.Workplane().box(1,1,1), 'box.step')\""
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit 33361dc1b5b70bc83ce36f1b34a01ca85dfca80a; STEP fixture, assembly exporter, and CQGI execution source inspected; no CAD execution"
assessment_notes = "Individually reconciled in rating batch 5 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Resolved: the pinned STEP fixture is readable ISO-10303-21 text with blue_cylinder and red_cube product names, two MANIFOLD_SOLID_BREP entities, and nine COLOUR_RGB records. No geometry was reconstructed, and the sample is not evidence of an export executed in this review."
url = "https://github.com/CadQuery/cadquery/blob/33361dc1b5b70bc83ce36f1b34a01ca85dfca80a/tests/testdata/red_cube_blue_cylinder.step"
confidence = "high"

[[evidence]]
target = "E2"
text = "Source inspection shows the assembly STEP writer explicitly enables colour, layer, and name modes. Retaining names and colour is therefore supported by this code path; constraints, editable intent, and receiving-tool fidelity still require comparison."
url = "https://github.com/CadQuery/cadquery/blob/33361dc1b5b70bc83ce36f1b34a01ca85dfca80a/cadquery/occ_impl/exporters/assembly.py#L104-L132"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Source code is independently readable, but a clean environment rebuild with pinned CadQuery and OCCT dependencies was not performed."
url = "https://cadquery.readthedocs.io/en/latest/importexport.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Model generation and export run in a local Python environment without a required hosted service."
url = "https://cadquery.readthedocs.io/en/latest/quickstart.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Resolved: CQGI builds an environment with real Python builtins, compiles the input model, and calls exec; exceptions are captured in the build result. The model is executable code. This source inspection does not establish a sandbox or actual authorization and overwrite safeguards."
url = "https://github.com/CadQuery/cadquery/blob/33361dc1b5b70bc83ce36f1b34a01ca85dfca80a/cadquery/cqgi.py#L104-L125"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for CadQuery does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/CadQuery/cadquery/blob/33361dc1b5b70bc83ce36f1b34a01ca85dfca80a/cadquery/occ_impl/exporters/assembly.py#L104-L132"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for CadQuery's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://cadquery.readthedocs.io/en/latest/importexport.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The documented workflow is local and scriptable."
url = "https://cadquery.readthedocs.io/en/latest/quickstart.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/CadQuery/cadquery/blob/33361dc1b5b70bc83ce36f1b34a01ca85dfca80a/cadquery/cqgi.py#L104-L125"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The STEP fixture exposes product names, solids and colors, and assembly export enables names/layers/colors. Geometry equivalence and the editable source's constraints, parameters and OCCT/runtime dependencies have not been reconstructed. Readable Python plus STEP entity counts do not establish the declared engineering-intent recovery."
url = "https://cadquery.readthedocs.io/en/latest/importexport.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "CQGI executes model text with real Python builtins and captures exceptions; the inspected path does not establish a sandbox. No effective execution authorization, dependency trust, output-overwrite visibility or correction after model side effects is established for the declared workflow."
url = "https://github.com/CadQuery/cadquery/blob/33361dc1b5b70bc83ce36f1b34a01ca85dfca80a/cadquery/cqgi.py#L104-L125"
confidence = "medium"

[[evidence]]
target = "E2"
text = "STEP name/color/layer output does not establish migration of the essential parametric constraints and editable intent into an independent CAD workflow. The former E2 Pass is therefore unestablished, not a verified failure of every possible exit route."
url = "https://github.com/CadQuery/cadquery/blob/33361dc1b5b70bc83ce36f1b34a01ca85dfca80a/cadquery/occ_impl/exporters/assembly.py#L104-L132"
confidence = "medium"

+++

**Assessment update, 23 October 2026:**

- [x] Resolved: STEP product names and colour records are independently readable; the inspected assembly exporter enables name, layer, and colour modes.
- [x] Resolved: CQGI executes model Python with real builtins and captures exceptions in its build result.
- [ ] Open: Geometry equivalence, editable constraints in another CAD tool, complete offline rebuild, and execution/overwrite safeguards. E5 needs model/dependency execution authority, overwrite controls and correction boundaries; exception capture is not isolation.

**Assessment:** Direct sample inspection establishes access to STEP metadata. Source inspection establishes export options and the executable-model boundary. Full engineering recovery and consequential oversight remain Not Verified; the overall determination remains **Insufficient evidence**.

**Human-readable criteria:** Can an independent party preserve the source model, units, dependencies, and editable structure, reproduce the result, and exchange it without losing important design meaning?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Geometry equivalence, editable constraints in another CAD tool, complete offline rebuild, and execution/overwrite safeguards. E5 needs model/dependency execution authority, overwrite controls and correction boundaries; exception capture is not isolation.

**Next without installing locally:** Inspect source, pinned dependency records and STEP/native output with expected geometry/constraint manifests supplied by upstream or an assessor. Review execution/overwrite safeguards without running untrusted model code.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-5/`. Overall: **Insufficient evidence**.

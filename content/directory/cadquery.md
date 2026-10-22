+++
title = "CadQuery"
category = "Engineering & CAD"
summary = "Python library for scripted parametric CAD whose models are ordinary code."
substrate = "Python scripts that export STEP and STL"
sync_model = "Local Python environment; plain-text scripts suit version control"
extract_cmd = "python -c \"import cadquery as cq; cq.exporters.export(cq.Workplane().box(1,1,1), 'box.step')\""
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "partial"
locality = "meets"
transparency = "meets"

[[evidence]]
target = "E1"
text = "CadQuery models are Python source files that can be opened, copied, inspected, and versioned with general-purpose tools."
url = "https://cadquery.readthedocs.io/en/latest/importexport.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The documentation supports STEP, STL, DXF, and other exports, while clearly distinguishing the parametric Python source from non-parametric interchange formats."
url = "https://cadquery.readthedocs.io/en/latest/importexport.html"
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
text = "The scripted model is explicit and reviewable, including units and export options, but execution results and failure handling require hands-on testing."
url = "https://cadquery.readthedocs.io/en/latest/importexport.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Parametric source code is directly controlled by the user and exports are available for interchange."
url = "https://cadquery.readthedocs.io/en/latest/importexport.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Plain-text source supports preservation, but exact geometry depends on software versions, libraries, units, and external dependencies."
url = "https://cadquery.readthedocs.io/en/latest/importexport.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The documented workflow is local and scriptable."
url = "https://cadquery.readthedocs.io/en/latest/quickstart.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The modeling operations, units, and export settings are represented as code and are inspectable by the user."
url = "https://cadquery.readthedocs.io/en/latest/importexport.html"
confidence = "medium"
+++

**Preliminary desk assessment:** CadQuery is described as python library for scripted parametric cad whose models are ordinary code. Its primary preservation surface is Python scripts that export STEP and STL, with independence shaped by local python environment; plain-text scripts suit version control. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an independent party preserve the source model, units, dependencies, and editable structure, reproduce the result, and exchange it without losing important design meaning?

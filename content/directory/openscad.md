+++
title = "OpenSCAD"
category = "Engineering & CAD"
summary = "Code-first 3D solid modelling from plain-text scripts. Output can differ between versions and geometry engines, so reproducing a result needs stated versions."
substrate = "Programmatic CSG Plain-Text Scripts (.scad)"
sync_model = "Git Version Control"
extract_cmd = "openscad -o part.stl model.scad"
pilot_stage = 4
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "OpenSCAD stores models as text .scad files and documents command-line and GUI exports."
url = "https://files.openscad.org/documentation/manual/OpenSCAD_User_Manual.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "SCAD source and exports to STL, 3MF, OFF, AMF, DXF, SVG, CSG, and PNG provide practical exit paths."
url = "https://files.openscad.org/documentation/manual/Using_OpenSCAD_in_a_command_line_environment.html"
confidence = "high"

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
text = "Text source and broad export support give users strong control and migration options."
url = "https://files.openscad.org/documentation/manual/OpenSCAD_User_Manual.html"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Text-based parametric models are durable, while libraries and renderer semantics require preservation tests."
url = "https://files.openscad.org/documentation/manual/Using_OpenSCAD_in_a_command_line_environment.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core modeling and rendering run locally without a provider."
url = "https://openscad.org/documentation.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The manuals expose source, dependencies, and export behavior, but reproducibility of generated meshes needs testing."
url = "https://files.openscad.org/documentation/manual/Using_OpenSCAD_in_a_command_line_environment.html"
confidence = "medium"

+++

**Verification scenario:** Rebuild models offline with all imported libraries and fonts; export geometry, inspect the parameterised source, and compare results.

**What may invalidate an overconfident claim:** Avoid claims of universally identical meshes across engines and versions.

**Documentation starting point:** <https://openscad.org/documentation.html>

**Preliminary desk assessment:** OpenSCAD is described as code-first 3d solid modelling from plain-text scripts. output can differ between versions and geometry engines, so reproducing a result needs stated versions. Its primary preservation surface is Programmatic CSG Plain-Text Scripts (.scad), with independence shaped by git version control. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an independent party preserve the source model, units, dependencies, and editable structure, reproduce the result, and exchange it without losing important design meaning?

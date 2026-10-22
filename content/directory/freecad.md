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
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "FreeCAD saves local FCStd documents and supports many import/export formats including STEP, IGES, STL, DXF, and IFC."
url = "https://www.freecad.org/features.php?lang=en-UNIVERSALITSOLUTIONS"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Interchange formats provide an exit path, but preservation of parametric history, constraints, workbench data, and analysis results was not tested."
url = "https://www.freecad.org/features.php?lang=en-UNIVERSALITSOLUTIONS"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The FCStd file is a zip-based compound format, but the full document structure and version recovery path were not independently restored."
url = "https://www.freecad.org/manual/a-freecad-manual.pdf"
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
text = "Local FCStd files and broad exports support custody, but editable migration may lose parametric meaning."
url = "https://www.freecad.org/features.php?lang=en-UNIVERSALITSOLUTIONS"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "A zip-based format and open exports help preservation, but the complete FCStd structure is application-specific."
url = "https://www.freecad.org/manual/a-freecad-manual.pdf"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core CAD work is local and scriptable."
url = "https://www.freecad.org/features.php?lang=en-UNIVERSALITSOLUTIONS"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The model tree and Python layers are inspectable, but dependency and workbench behavior remain partly unverified."
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

**Preliminary desk assessment:** FreeCAD is described as parametric 3d cad modeller with a python interface, with project files that are zip archives. Its primary preservation surface is Project archive (.FCStd, a zip containing Document.xml and shapes), with independence shaped by local desktop application; version control via external tools. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an independent party preserve the source model, units, dependencies, and editable structure, reproduce the result, and exchange it without losing important design meaning?

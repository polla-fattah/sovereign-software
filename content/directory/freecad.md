+++
title = "FreeCAD"
category = "Engineering & CAD"
summary = "Parametric 3D CAD modeller with a Python interface, with project files that are zip archives."
substrate = "Project archive (.FCStd, a zip containing Document.xml and shapes)"
sync_model = "Local desktop application; version control via external tools"
extract_cmd = "unzip -p model.FCStd Document.xml | head -n 20"
limitations = ["Project interpretation depends on the application version and workbench."]
assessment_batch = "B"
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

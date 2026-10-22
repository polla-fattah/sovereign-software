+++
title = "Blender"
category = "Graphics & 3D"
summary = "3D creation suite with a built-in Python interface and a binary project format."
substrate = "Binary .blend files, with Python scripting and open export formats"
sync_model = "Local desktop application"
extract_cmd = "blender -b scene.blend --python-expr \"import bpy; print([o.name for o in bpy.data.objects])\""
limitations = ["Whether a complex binary project format remains interpretable over the long term is not yet established."]
assessment_batch = "B"
+++

**Primary investigation:** Long-term preservation of a complex creative project and its dependencies.

**Investigation priority:** Sovereignty standard, Longevity high, Locality standard, Transparency and Control high. This plans the test effort and is not a finding.

**Synthetic dataset:** A scene with meshes, procedural modifiers, textures, materials, animation, linked libraries, external media, and rendered output.

**Required tests**

1. Save the native .blend project and inventory every external dependency.
2. Pack supported resources and identify anything that remains outside the project.
3. Transfer the project to a clean offline machine.
4. Export common interchange formats and measure loss of modifiers, rigs, material behavior, or animation.
5. Open or convert project data using a second compatible tool or documented procedure.
6. Test missing linked assets and library recovery.
7. Assess whether consequential destructive operations have understandable undo, recovery, or versioning paths.

**Critical evidence:** Dependency inventory, project reopen results, format-loss comparison, recovered scene structure, and rendered-output comparison.

**Documentation to verify:** Blender's documentation is said to warn that not all external resources can be packed into a .blend file. A project may look self-contained and still depend on external assets.

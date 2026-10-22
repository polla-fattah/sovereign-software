+++
title = "Blender"
category = "Graphics & 3D"
summary = "3D creation suite with a built-in Python interface and a binary project format."
substrate = "Binary .blend files, with Python scripting and open export formats"
sync_model = "Local desktop application"
extract_cmd = "blender -b scene.blend --python-expr \"import bpy; print([o.name for o in bpy.data.objects])\""
limitations = ["Whether a complex binary project format remains interpretable over the long term is not yet established."]
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
text = "Blender saves projects as local .blend files and documents Save Copy, recovery, and packed data operations."
url = "https://docs.blender.org/manual/en/latest/files/blend/index.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Blender supports many exports, but exports can lose modifiers, rigs, materials, animation, or other editable structure; representative migration was not tested."
url = "https://docs.blender.org/manual/en/latest/files/blend/index.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The manual documents packed and linked data, but a clean offline reopen with every dependency and a second-tool interpretation were not demonstrated."
url = "https://docs.blender.org/manual/en/latest/files/blend/index.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Project creation, editing, saving, and export are local operations and do not inherently require a vendor account."
url = "https://docs.blender.org/manual/en/latest/files/blend/index.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The application documents recovery and undo-related workflows, but destructive operations, scripts, and external dependencies require hands-on review."
url = "https://docs.blender.org/manual/en/latest/files/blend/index.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Local project files and open exports support custody, but complex dependencies and incomplete interchange can make exit lossy."
url = "https://docs.blender.org/manual/en/latest/files/blend/index.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Packed data and documented project operations help preservation, but version compatibility, linked assets, and plugins remain material risks."
url = "https://docs.blender.org/manual/en/latest/files/blend/index.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core modeling and rendering workflows operate locally; network features are not required for ordinary project editing."
url = "https://docs.blender.org/manual/en/latest/files/blend/index.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Save, recovery, and dependency controls are documented, but scripting and complex scene state make complete inspection unverified."
url = "https://docs.blender.org/manual/en/latest/files/blend/index.html"
confidence = "medium"
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

**Preliminary desk assessment:** Blender is described as 3d creation suite with a built-in python interface and a binary project format. Its primary preservation surface is Binary .blend files, with Python scripting and open export formats, with independence shaped by local desktop application. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a creator preserve editable source work and linked assets, reopen it after software changes, and export a useful representation to independent tools?

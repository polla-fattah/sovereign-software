+++
title = "Blender"
category = "Graphics & 3D"
summary = "3D creation suite with a built-in Python interface and a binary project format."
substrate = "Binary .blend files, with Python scripting and open export formats"
sync_model = "Local desktop application"
extract_cmd = "blender -b scene.blend --python-expr \"import bpy; print([o.name for o in bpy.data.objects])\""
limitations = ["Published SDNA layout does not by itself recover geometry, dependencies or editable scene meaning.","Pack All has explicit exclusions and is not a complete dependency inventory."]
assessment_batch = "B"
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit ded7fde71c04f034d6c065e8d0a75d9f548003a0; published SDNA layout and Pack All coverage"
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
text = "Blender saves projects as local .blend files and documents Save Copy, recovery, and packed data operations."
url = "https://docs.blender.org/manual/en/latest/files/blend/index.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Pack All packs supported file/tiled images, eligible external fonts, sounds and volumes, and handles geometry-node bakes on non-linked objects. Movie/image-sequence image sources are skipped, with a warning on the verbose path; linked-object bake processing is skipped. The command is not proof that every external dependency has become self-contained."
url = "https://github.com/blender/blender/blob/ded7fde71c04f034d6c065e8d0a75d9f548003a0/source/blender/blenkernel/intern/packedFile.cc"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The source documents and interprets the SDNA sections NAME, TYPE, TLEN and STRC, exposing member names, types, sizes and structure records. The repository also retains a historical blend-format explanation and reader tools targeting Blender 2.48/2.5-era files. Format knowledge is available, but neither those historical tools nor this inspection establish reconstruction of every current blend file or scene semantics."
url = "https://github.com/blender/blender/blob/ded7fde71c04f034d6c065e8d0a75d9f548003a0/source/blender/makesdna/intern/dna_genfile.cc"
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
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Blender does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/blender/blender/blob/ded7fde71c04f034d6c065e8d0a75d9f548003a0/source/blender/makesdna/intern/dna_genfile.cc"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Blender's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/blender/blender/blob/ded7fde71c04f034d6c065e8d0a75d9f548003a0/source/blender/makesdna/intern/dna_genfile.cc"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core modeling and rendering workflows operate locally; network features are not required for ordinary project editing."
url = "https://docs.blender.org/manual/en/latest/files/blend/index.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://docs.blender.org/manual/en/latest/files/blend/index.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Published SDNA definitions explain binary structure layout, while Pack All deliberately skips some external image/movie/linked bake dependencies. Neither a current scene was independently reconstructed nor its complete assets, scripts, node semantics and compatible runtime retained and compared. Available format knowledge is not complete scene survival."
url = "https://github.com/blender/blender/blob/ded7fde71c04f034d6c065e8d0a75d9f548003a0/source/blender/makesdna/intern/dna_genfile.cc"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Undo/recovery documentation and pack warnings do not establish effective Python/driver/plugin authorization, save/export overwrite control or correction across asset packing and destructive scene changes. Known pack exclusions are dependency facts, not proof of governable execution."
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

**Evidence update: 23 October 2026**

- [x] Resolved: The source documents and interprets the SDNA sections NAME, TYPE, TLEN and STRC, exposing member names, types, sizes and structure records. The repository also retains a historical blend-format explanation and reader tools targeting Blender 2.48/2.5-era files. Format knowledge is available, but neither those historical tools nor this inspection establish reconstruction of every current blend file or scene semantics. [Source](https://github.com/blender/blender/blob/ded7fde71c04f034d6c065e8d0a75d9f548003a0/source/blender/makesdna/intern/dna_genfile.cc).
- [x] Resolved: Pack All packs supported file/tiled images, eligible external fonts, sounds and volumes, and handles geometry-node bakes on non-linked objects. Movie/image-sequence image sources are skipped, with a warning on the verbose path; linked-object bake processing is skipped. The command is not proof that every external dependency has become self-contained. [Source](https://github.com/blender/blender/blob/ded7fde71c04f034d6c065e8d0a75d9f548003a0/source/blender/blenkernel/intern/packedFile.cc).
- [ ] Open: An actual current-version blend-file interpretation, complete offline scene/dependency rebuild, pack/move comparison, editable export losses, version compatibility and script/undo safeguards. E5 needs effective script/driver/plugin trust, overwrite and destructive-edit controls plus recoverable scene state.

**Assessment follow-up:** These findings now appear in the application's evidence and limitations. At the user's request, existing eligibility and principle ratings are unchanged; E3/E5, principle consistency and blank-status fixes will be reconciled in the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-5/.

**Human-readable criteria:** Can a creator preserve editable source work and linked assets, reopen it after software changes, and export a useful representation to independent tools?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** An actual current-version blend-file interpretation, complete offline scene/dependency rebuild, pack/move comparison, editable export losses, version compatibility and script/undo safeguards. E5 needs effective script/driver/plugin trust, overwrite and destructive-edit controls plus recoverable scene state.

**Next without installing locally:** Obtain a complete synthetic scene/dependency manifest, native source and interchange/reference outputs with expected object/node/animation semantics; inspect preserved files and reuse version-matched script/undo/save observations.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-6/`. Overall: **Insufficient evidence**.

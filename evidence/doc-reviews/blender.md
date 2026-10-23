# Blender: documentation review

Reviewed 22 October 2026 from the Blender Manual (5.2 LTS), blender.org, and the developer documentation only. Latest release: 5.2.3 LTS (22 October 2026); 4.5 LTS is also maintained. Licence: GNU GPL (source default 2 or later; binaries distributed under 3 or later), with some more permissive modules.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. A few long developer pages were only available as summaries, and the blend-file format page returned 404.

## Evidence follow-up: 23 October 2026

Two bounded questions are resolved in [batch 5](../third-pass/batch-5/README.md#blender) and reflected in the [application page](../../content/directory/blender.md). Existing eligibility and principle ratings remain unchanged until the next-pass reconciliation, as requested by the user.

- [x] Resolved: The source documents and interprets the SDNA sections NAME, TYPE, TLEN and STRC, exposing member names, types, sizes and structure records. The repository also retains a historical blend-format explanation and reader tools targeting Blender 2.48/2.5-era files. Format knowledge is available, but neither those historical tools nor this inspection establish reconstruction of every current blend file or scene semantics.
- [x] Resolved: Pack All packs supported file/tiled images, eligible external fonts, sounds and volumes, and handles geometry-node bakes on non-linked objects. Movie/image-sequence image sources are skipped, with a warning on the verbose path; linked-object bake processing is skipped. The command is not proof that every external dependency has become self-contained.

Remaining: An actual current-version blend-file interpretation, complete offline scene/dependency rebuild, pack/move comparison, editable export losses, version compatibility and script/undo safeguards.

## What the documentation says

**Storage and access (E1, E3)**
- A `.blend` is a binary file. Each file carries a description of its own data structures (SDNA), so it is self-descriptive, but the pages read describe only Blender reading it. No page documenting the file format for other tools was reachable, and no third-party reader library was found. Building `bpy` as a Python module is described as not officially supported. [DNA](https://developer.blender.org/docs/features/core/dna/), [bpy module](https://developer.blender.org/docs/handbook/building_blender/python_module/)
- Save Versions keeps `.blend1`, `.blend2` backups beside the file (two by default). Compression uses Zstandard, and versions before 3.0 cannot open newer compressed files. [save and load](https://docs.blender.org/manual/en/latest/editors/preferences/save_load.html)

**Exit and migration (E2)**
- Interchange: glTF 2.0, USD, Alembic, OBJ, PLY, STL, FBX, and others. Losses are stated per format: OBJ has no armatures, lights, cameras, parenting, or transformations; STL is geometry only; Alembic stores baked results, not rigs; glTF converts quads to triangles and does not keep curves or non-mesh data. USD exports no layers or variants and its importer does not handle layers and references yet. [import and export](https://docs.blender.org/manual/en/latest/files/import_export/index.html), [OBJ](https://docs.blender.org/manual/en/latest/files/import_export/obj.html), [Alembic](https://docs.blender.org/manual/en/latest/files/import_export/alembic.html), [USD](https://docs.blender.org/manual/en/latest/files/import_export/usd.html), [glTF](https://docs.blender.org/manual/en/latest/addons/scene_gltf2.html)
- No statement was found that any export preserves a full editable scene (modifier stacks, node trees, rigs together).
- External files are referenced by relative path by default. File, External Data can pack fonts, images, sounds, and linked libraries into the file. Videos from the Sequence Editor and Movie Clips cannot be packed, and cache files are not packable. Make Paths Absolute, Find Missing Files, and Collect were not found in the pages read. [open and save](https://docs.blender.org/manual/en/latest/files/blend/open_save.html), [packed data](https://docs.blender.org/manual/en/latest/files/blend/packed_data.html), [data-blocks](https://docs.blender.org/manual/en/latest/files/data_blocks.html)
- If a linked library is missing, Blender creates placeholder data-blocks that can be relinked. Circular dependencies "will likely result in missing links". [linking](https://docs.blender.org/manual/en/latest/files/linked_libraries/link_append.html)

**Recovery (E3)**
- Auto Save (default every 2 minutes) keeps only one autosave per project in the temporary directory, which may be cleaned on reboot, and does not save changes made in Sculpt, Texture Paint, or Edit mode. Modified images not saved are lost. [recover](https://docs.blender.org/manual/en/latest/troubleshooting/recover.html), [open and save](https://docs.blender.org/manual/en/latest/files/blend/open_save.html)
- Compatibility: newer Blender opens older files (support for a feature is kept for at least a major release cycle, two years). Older Blender opening newer files: "loss of feature should always be expected", and data it does not know is dropped when it re-saves. Files from 5.0 onward open only in 4.5 or later, and 4.5 LTS converts. [compatibility](https://docs.blender.org/manual/en/latest/files/blend/compatibility.html), [release notes](https://developer.blender.org/docs/release_notes/compatibility/)

**Continuing authority (E4) and dependencies**
- No registration, and no internet connection needed to install or use official releases. An "Allow Online Access" setting governs add-ons, though Blender "cannot prevent third-party add-ons from violating this rule"; its default was not stated. The extensions platform is the default remote repository, with an optional startup update check. No in-app telemetry statement and no update check for Blender itself were found. [licence](https://www.blender.org/about/license/), [system preferences](https://docs.blender.org/manual/en/latest/editors/preferences/system.html), [extensions](https://docs.blender.org/manual/en/latest/editors/preferences/extensions.html)
- The Foundation states that what you create, including `.blend` files, is the user's sole property. Add-ons and scripts using the Python API must be GPL if distributed. Governance: the Blender Foundation is described as an independent public benefit organization funded mainly by the Development Fund. [FAQ](https://www.blender.org/support/faq/), [foundation](https://www.blender.org/about/foundation/)

**Consequential operations (E5)**
- Scripts in a `.blend` do not run automatically by default; the manual warns of the risk and describes trusted-source controls. Add-ons live outside the `.blend`. [scripting security](https://docs.blender.org/manual/en/latest/advanced/scripting/security.html)
- Undo history is lost when Blender quits, even after saving. Unused data-blocks are deleted when the file is saved and reloaded unless protected by a fake user. Purge "cannot be undone". Deleting some data-blocks also deletes the objects that use them. [undo](https://docs.blender.org/manual/en/latest/interface/undo_redo.html), [data-blocks](https://docs.blender.org/manual/en/latest/files/data_blocks.html), [outliner](https://docs.blender.org/manual/en/latest/editors/outliner/interface.html)

## Gaps to test or read next
1. Build a scene with modifiers, nodes, a rig, linked libraries, and external media; pack it, move it to a clean offline machine, and record what breaks.
2. Export the same scene to glTF, USD, and OBJ, reimport, and list what is lost beyond the documented limits.
3. Open the file in an older Blender and re-save, and note what is dropped.
4. Not found: a file-format specification for third parties, Find Missing Files, default of Allow Online Access, default undo steps, whether undo survives a save, warnings on applying modifiers, and the `.blend@` file.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-6/README.md#blender); [actual assessment](../../content/directory/blender.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Published SDNA definitions explain binary structure layout, while Pack All deliberately skips some external image/movie/linked bake dependencies. Neither a current scene was independently reconstructed nor its complete assets, scripts, node semantics and compatible runtime retained and compared. Available format knowledge is not complete scene survival.
- E5: Not Verified. Undo/recovery documentation and pack warnings do not establish effective Python/driver/plugin authorization, save/export overwrite control or correction across asset packing and destructive scene changes. Known pack exclusions are dependency facts, not proof of governable execution.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: An actual current-version blend-file interpretation, complete offline scene/dependency rebuild, pack/move comparison, editable export losses, version compatibility and script/undo safeguards. E5 needs effective script/driver/plugin trust, overwrite and destructive-edit controls plus recoverable scene state.

Next without a local installation: Obtain a complete synthetic scene/dependency manifest, native source and interchange/reference outputs with expected object/node/animation semantics; inspect preserved files and reuse version-matched script/undo/save observations.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

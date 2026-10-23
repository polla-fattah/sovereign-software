# Rating reconciliation, batch 6

Reviewed 24 October 2026. Each application below was evaluated individually against its existing essential-record and version scope. No target application was installed, built or run.

## Outcome

All 6 retain **Insufficient evidence**. E3/E5 remain **Not Verified** for the specific missing coverage below, not automatically Pass from documentation and not Fail from missing evidence. Positive dependent principles lacking their minimum are corrected. Existing E1/E4/Locality findings are not re-certified by this targeted pass.

[Plan](plan.json), [individual decisions and change ledger](decisions.json), [directory-wide review sequence](../remaining-plan.json), [current application index](../../application-index.md).

0 additional bounded source questions are resolved in this batch. Earlier resolved questions remain resolved and are not counted again. Source locators are provenance aids, not executed-behavior assertions.

<a id="blender"></a>

## Blender

Version/scope: Source commit ded7fde71c04f034d6c065e8d0a75d9f548003a0; published SDNA layout and Pack All coverage.

**E3: Not Verified.** Published SDNA definitions explain binary structure layout, while Pack All deliberately skips some external image/movie/linked bake dependencies. Neither a current scene was independently reconstructed nor its complete assets, scripts, node semantics and compatible runtime retained and compared. Available format knowledge is not complete scene survival. [Source context](https://github.com/blender/blender/blob/ded7fde71c04f034d6c065e8d0a75d9f548003a0/source/blender/makesdna/intern/dna_genfile.cc).

**E5: Not Verified.** Undo/recovery documentation and pack warnings do not establish effective Python/driver/plugin authorization, save/export overwrite control or correction across asset packing and destructive scene changes. Known pack exclusions are dependency facts, not proof of governable execution. [Source context](https://docs.blender.org/manual/en/latest/files/blend/index.html).

**Remaining:** An actual current-version blend-file interpretation, complete offline scene/dependency rebuild, pack/move comparison, editable export losses, version compatibility and script/undo safeguards. E5 needs effective script/driver/plugin trust, overwrite and destructive-edit controls plus recoverable scene state.

**Next without a local installation:** Obtain a complete synthetic scene/dependency manifest, native source and interchange/reference outputs with expected object/node/animation semantics; inspect preserved files and reuse version-matched script/undo/save observations.

[Actual assessment](../../../content/directory/blender.md) | [review note](../../doc-reviews/blender.md).

<a id="inkscape"></a>

## Inkscape

Version/scope: Source commit 9055f262b58743a1f7caee54c1132f029341fe0a; sample SVG metadata/embedded assets and Plain SVG action registration.

**E3: Not Verified.** Independent SVG/XML and embedded-image inspection recovers some paths, references and live-effect metadata, but no current native/Plain SVG reconstruction establishes equivalent objects/effects, fonts, linked assets and multipage meaning. Namespace pruning is a known export distinction, not complete recovery. [Source context](https://inkscape.org/learn/).

**E5: Not Verified.** The generic publishing/accessibility note does not establish control of document mutations. Save/export overwrite, extension/script execution, external-link transmission and undo/recovery boundaries remain insufficiently evidenced for the original artwork workflow. [Source context](https://inkscape.org/learn/).

**E2 correction:** The former E2 Pass is not supported for the full editable-artwork scope. Plain SVG namespace pruning and historical path inspection do not establish preservation of essential live effects, layers, linked assets and editable relationships in a replacement workflow. [Source context](https://gitlab.com/inkscape/inkscape/-/blob/9055f262b58743a1f7caee54c1132f029341fe0a/src/extension/internal/svg.cpp).

**Remaining:** An executed native/Plain SVG comparison, independent rendering/editing, fonts and linked-image relocation, PDF/PNG losses, current-version multipage behavior, crash recovery and network behavior. E5 needs extension/external-link and save/export overwrite controls, visible changes and available undo/recovery.

**Next without a local installation:** Inspect a native/Plain SVG pair with fonts/assets and expected layer/effect/object relationships, plus independent render/edit comparisons. Add primary-source or external tests of extension, overwrite and undo controls.

[Actual assessment](../../../content/directory/inkscape.md) | [review note](../../doc-reviews/inkscape.md).

<a id="krita"></a>

## Krita

Version/scope: Source commit b5b6dd3c8b53944f67a824f7f938f4bbfa80275d; KRA archive relationships and OpenRaster editable-state limits.

**E3: Not Verified.** The historical KRA exposes a layer/payload relationship and profiles but its pixel data/color semantics were not independently rebuilt. OpenRaster source projects or skips some native constructs, so neither equivalent layers/masks/animation nor complete native recovery follows from ZIP readability. [Source context](https://docs.krita.org/en/user_manual/working_with_images.html).

**E5: Not Verified.** User-directed image editing does not establish plugin/script authority, save/export overwrite decisions or correction after layer and animation changes. Conditional backups/autosave and effective settings still lack sufficient evidence for this profile. [Source context](https://docs.krita.org/en/reference_manual/main_menu/file_menu.html).

**Remaining:** Native pixel reconstruction, masks/vector/text/animation and color fidelity across ORA/PSD/PNG, actual adjustment-layer export behavior, version round trips, backup/autosave recovery and update/network controls. E5 needs save/autosave, plugin/script and destructive-edit/overwrite visibility and correction boundaries.

**Next without a local installation:** Use a synthetic KRA with representative layers/masks/text/animation and dependency/color manifest, native/interchange exports and reference comparisons; inspect archives and seek matching save/undo/autosave controls.

[Actual assessment](../../../content/directory/krita.md) | [review note](../../doc-reviews/krita.md).

<a id="gimp"></a>

## GIMP

Version/scope: Source commit 84709e20bc45311322a318b20669dc6b52118353; legacy XCF layer records and OpenRaster raster/mode boundaries.

**E3: Not Verified.** The independent parser reads legacy XCF header/layer records but not pixels, masks, modern formats or equivalent color/compositing. OpenRaster serializes rasterized state and falls back for some modes, so complete native editable-image reconstruction remains unestablished. [Source context](https://docs.gimp.org/en_GB/gimp-images-out.html).

**E5: Not Verified.** Save/export prompts are positive leads, not full evidence for plugin/script authorization, destructive effects/layer changes, overwrite visibility and meaningful undo/crash recovery in the declared modern project and plugin configuration. [Source context](https://docs.gimp.org/3.0/en/gimp-export-dialog.html).

**Remaining:** Current layered-XCF decoding, text/mask/group/high-bit-depth and ICC fidelity, actual ORA/PSD/TIFF round trips, old/new-version saves, crash recovery and plugin/network controls. E5 needs plugin/script, destructive-edit and save/export overwrite control with explicit undo/recovery limits.

**Next without a local installation:** Acquire a current synthetic layered XCF plus mask/text/ICC dependencies, expected semantic/pixel records and independent ORA/PSD/TIFF comparisons; seek same-version plugin/save/undo evidence without running the target.

[Actual assessment](../../../content/directory/gimp.md) | [review note](../../doc-reviews/gimp.md).

<a id="kicad"></a>

## KiCad

Version/scope: Source commit ba5ed30c1bee8bcfa7db6dc423f1d20224c4e3a5; PCB S-expression connectivity and project-archive inclusion limits.

**E3: Not Verified.** The standalone PCB parser resolves pad/net relationships and identifies external 3D-model variables, while archive source selects files rather than resolving every dependency. Hierarchical schematics, custom libraries, external models and cross-version editable/fabrication meaning have not been reconstructed. [Source context](https://docs.kicad.org/doxygen/classPROJECT__ARCHIVER.html).

**E5: Not Verified.** Electrical correctness and manufacturing suitability are not themselves E5 authorization tests. The evidence does not sufficiently establish schematic-to-board mutation review, destructive library/board changes, output overwrite or release/correction controls in the existing engineering workflow. [Source context](https://www.kicad.org/).

**Remaining:** Hierarchical schematic/custom-library reconstruction, complete archive/move including external models, manufacturing and editable export comparison, old/new-version saves, .history recovery and schematic-to-PCB update effects. E5 needs inspectable schematic-to-PCB updates, destructive edit/output overwrite controls and available correction; accuracy claims are separate.

**Next without a local installation:** Inspect a complete synthetic schematic/PCB/library/model packet and expected connectivity/units manifest, with independent output comparisons. Obtain primary-source or external update/undo/overwrite evidence.

[Actual assessment](../../../content/directory/kicad.md) | [review note](../../doc-reviews/kicad.md).

<a id="openscad"></a>

## OpenSCAD

Version/scope: Source commit d7a210ed01e5db9f09a8164894b0d0b07d7f2c67; 3MF package/expectation inspection and binary STL information limits.

**E3: Not Verified.** The independent 3MF/STL readers expose mesh geometry and units where represented, but STL does not preserve source parameters/construction meaning and one regression expectation is not standalone XML. Complete includes/fonts, source/version dependencies and equivalent generated geometry remain unestablished for the original parametric profile. [Source context](https://files.openscad.org/documentation/manual/Using_OpenSCAD_with_an_external_Editor.html).

**E5: Not Verified.** Manufacturing accuracy alone is not E5. The current evidence does not establish effective model/include execution authority, file/output overwrite control, previewed consequential changes or correction after lost source edits; backup and configuration boundaries remain open. [Source context](https://files.openscad.org/documentation/manual/OpenSCAD_User_Manual.html).

**E2 correction:** The former E2 Pass does not establish a replacement parametric workflow preserving source parameters, construction meaning, units and required dependencies. Mesh-only interoperability is a narrower result, not full-scope migration. [Source context](https://github.com/openscad/openscad/blob/d7a210ed01e5db9f09a8164894b0d0b07d7f2c67/src/io/export_stl.cc).

**Remaining:** Actual CGAL/Manifold equivalence, exported geometry reconstruction, parameter/color/unit losses in receiving tools, complete library/font dependency capture, source/version compatibility and crash backup behavior. E5 needs source/include execution and save/export overwrite authority, inspectability and backup/correction boundaries.

**Next without a local installation:** Retain a synthetic parametric model with every include/font and expected geometry/unit/color manifest, then use independent parsers and externally supplied engine comparisons. Review same-version file/execution/backup controls.

[Actual assessment](../../../content/directory/openscad.md) | [review note](../../doc-reviews/openscad.md).

## Validation boundary

The shared rating audit checks recorded fields, decision evidence and review notes. Historical schema-repair and evidence baselines remain available. Source/fixture hashes, navigation and the complete set of updated pages are checked by the final repository validation; no per-product clean restore or upstream test run is implied.

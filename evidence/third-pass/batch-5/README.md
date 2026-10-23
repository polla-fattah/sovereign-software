# Third pass, batch 5

Reviewed 23 October 2026, Asia/Baghdad. Twelve bounded questions are resolved across Blender, Inkscape, Krita, GIMP, KiCad and OpenSCAD. Findings and resolved checkboxes are reflected in all six actual application pages.

## Scope and deferred rating reconciliation

At the user's request, this batch continues evidence gathering while preserving the existing eligibility and principle ratings exactly. The E3/E5 decision review, principle-rating reconciliation and invalid/blank-status fixes are deferred to the next pass, batch by batch. Existing ratings should not be treated as revalidated by these narrower closures.

## Reproduce

```powershell
python evidence/third-pass/batch-5/inspect_artifacts.py
```

The standard-library inspector retains eighteen pinned inputs and checks both upstream Git object identities and SHA-256 hashes. It parses SVG/XML, ZIP members, a bounded legacy XCF layout, PCB S-expressions and binary STL records. Source code is read, never executed; archives are inspected in memory, not extracted. No target application was installed or run, and no upstream test-suite or CI execution is claimed. [artifact-results.json](artifact-results.json) records observations, raw parse failures, source locations, environment and provenance; [inspection-plan.json](inspection-plan.json) identifies the exact inputs. Reruns reuse retained files offline.

Version scope matters: Blender's retained standalone format tools are historical, as are the sampled Inkscape/Krita/GIMP/KiCad files. OpenSCAD's normalized color regression expectation is not a packaged 3MF and fails standalone XML namespace validation; the separate real 3MF package parses successfully. Upstream copyright and licensing remain applicable. Inkscape's embedded-image sample retains its attribution and Creative Commons license metadata.

## Blender

- [x] Resolved: The source documents and interprets the SDNA sections NAME, TYPE, TLEN and STRC, exposing member names, types, sizes and structure records. The repository also retains a historical blend-format explanation and reader tools targeting Blender 2.48/2.5-era files. Format knowledge is available, but neither those historical tools nor this inspection establish reconstruction of every current blend file or scene semantics. [Inspected input](https://github.com/blender/blender/blob/ded7fde71c04f034d6c065e8d0a75d9f548003a0/source/blender/makesdna/intern/dna_genfile.cc).
- [x] Resolved: Pack All packs supported file/tiled images, eligible external fonts, sounds and volumes, and handles geometry-node bakes on non-linked objects. Movie/image-sequence image sources are skipped, with a warning on the verbose path; linked-object bake processing is skipped. The command is not proof that every external dependency has become self-contained. [Inspected input](https://github.com/blender/blender/blob/ded7fde71c04f034d6c065e8d0a75d9f548003a0/source/blender/blenkernel/intern/packedFile.cc).

Related inputs: [Historical format explanation](https://github.com/blender/blender/blob/ded7fde71c04f034d6c065e8d0a75d9f548003a0/doc/blender_file_format/mystery_of_the_blend.html); [Historical reader scope](https://github.com/blender/blender/blob/ded7fde71c04f034d6c065e8d0a75d9f548003a0/doc/blender_file_format/README).

Remaining: An actual current-version blend-file interpretation, complete offline scene/dependency rebuild, pack/move comparison, editable export losses, version compatibility and script/undo safeguards.

## Inkscape

- [x] Resolved: Standard XML parsing reads the historical gears SVG's eight path elements, four use references, Layer 1 metadata and a gears path-effect record with teeth=10 and phi=20. A separate data-URI SVG yielded a 235-byte embedded PNG payload through Base64 decoding. Editor metadata and an embedded asset are independently inspectable; no SVG rendering or live-effect re-editing was reproduced. [Inspected input](https://gitlab.com/inkscape/inkscape/-/blob/9055f262b58743a1f7caee54c1132f029341fe0a/share/examples/live-path-effects-gears.svg).
- [x] Resolved: Plain SVG is registered with prune-proprietary-namespaces and prune-inkscape-namespaces actions, unlike the native SVG registration's editor-metadata handling. This identifies an explicit difference in the configured output pipeline, not an executed export or an exhaustive list of lost attributes. Layer/live-effect editability must not be inferred merely from preserved visible paths. [Inspected input](https://gitlab.com/inkscape/inkscape/-/blob/9055f262b58743a1f7caee54c1132f029341fe0a/src/extension/internal/svg.cpp).

Related inputs: [Embedded-image sample](https://gitlab.com/inkscape/inkscape/-/blob/9055f262b58743a1f7caee54c1132f029341fe0a/share/examples/data_uri.svg).

Remaining: An executed native/Plain SVG comparison, independent rendering/editing, fonts and linked-image relocation, PDF/PNG losses, current-version multipage behavior, crash recovery and network behavior.

## Krita

- [x] Resolved: The retained KRA opened as a seven-member ZIP. Namespace-aware maindoc.xml parsing identifies a 100-by-100 RGBA image and Layer 1, whose filename layer0 maps to the archive's built image/layers/layer0 payload; ICC files and preview.png are also present. This historical fixture has no mergedimage.png. Layer pixels and color-profile semantics were not decoded or rebuilt. [Inspected input](https://github.com/KDE/krita/blob/b5b6dd3c8b53944f67a824f7f938f4bbfa80275d/libs/image/tests/data/store_test.kra).
- [x] Resolved: The OpenRaster visitor saves generator, clone and external layers through their raster projection, preserves groups as stacks, and skips fake nodes such as reference-image/grid layers. Its adjustment-layer branch creates a Krita-specific filter element but does not append it to the stack in that branch. ORA therefore cannot be assumed to preserve every native editable construct; no export/import was executed. [Inspected input](https://github.com/KDE/krita/blob/b5b6dd3c8b53944f67a824f7f938f4bbfa80275d/plugins/impex/ora/kis_open_raster_stack_save_visitor.cpp).

Remaining: Native pixel reconstruction, masks/vector/text/animation and color fidelity across ORA/PSD/PNG, actual adjustment-layer export behavior, version round trips, backup/autosave recovery and update/network controls.

## GIMP

- [x] Resolved: A bounded independent parser read the legacy XCF version-0 header, 100-by-90 canvas, property records, layer offsets, and layer2/layer1 names and dimensions from the published fixture. This uses neither GIMP nor a GIMP library. Pixel tiles, masks, modern XCF versions and rendered appearance were not reconstructed. [Inspected input](https://github.com/GNOME/gimp/blob/84709e20bc45311322a318b20669dc6b52118353/app/tests/files/gimp-2-6-file.xcf).
- [x] Resolved: The OpenRaster exporter serializes layer pixels as PNG, nests groups in stack XML and stores names, offsets, opacity and visibility. Unsupported layer modes fall back to svg:src-over in its mapping. This path does not serialize editable text or arbitrary native effect state as their native objects, so an ORA exit must not be assumed to preserve all editability or compositing semantics. [Inspected input](https://github.com/GNOME/gimp/blob/84709e20bc45311322a318b20669dc6b52118353/plug-ins/python/file-openraster.py).

Remaining: Current layered-XCF decoding, text/mask/group/high-bit-depth and ICC fidelity, actual ORA/PSD/TIFF round trips, old/new-version saves, crash recovery and plugin/network controls.

## KiCad

- [x] Resolved: A standalone S-expression parser read the published version-20221018 board: nine footprints, seventeen pads, twenty-six segments and four vias. All seventeen pad net references resolve to declared net IDs; five 3D-model references use the external KICAD6_3DMODEL_DIR variable. This recovers explicit connectivity/asset references, not electrical correctness, fabrication validity or availability of the model files. [Inspected input](https://github.com/KiCad/kicad-source-mirror/blob/ba5ed30c1bee8bcfa7db6dc423f1d20224c4e3a5/qa/data/cli/basic_test/basic_test.kicad_pcb).
- [x] Resolved: Project archiving traverses the selected project directory and includes recognized extensions/named library tables. STEP/VRML and other extra-file extensions are conditional on Include Extra Files; hidden directories such as .git and .history are excluded. This is file selection, not a demonstrated resolution/copy of every externally referenced library or 3D model. [Inspected input](https://github.com/KiCad/kicad-source-mirror/blob/ba5ed30c1bee8bcfa7db6dc423f1d20224c4e3a5/common/project/project_archiver.cpp).

Remaining: Hierarchical schematic/custom-library reconstruction, complete archive/move including external models, manufacturing and editable export comparison, old/new-version saves, .history recovery and schematic-to-PCB update effects.

## OpenSCAD

- [x] Resolved: The published 3MF import fixture opened as a three-member ZIP. Its model XML specifies millimeters and exposes one object with twenty vertices, thirty-six triangles and a build item referencing object 1. A separate color-export regression expectation contains four raw color values but is normalized text with an unbound namespace prefix, not a valid standalone XML package; that parse error is recorded. No geometry engine was run. [Inspected input](https://github.com/openscad/openscad/blob/d7a210ed01e5db9f09a8164894b0d0b07d7f2c67/tests/data/scad/3D/features/import.3mf).
- [x] Resolved: The retained binary STL expectation contains eight triangles, has the expected 84+50*n byte length, and uses zero for every two-byte triangle attribute. The writer similarly emits normals/vertices and zero attributes with an OpenSCAD Model header. This output is a mesh representation, not a serialization of source parameters, construction history or semantic units. [Inspected input](https://github.com/openscad/openscad/blob/d7a210ed01e5db9f09a8164894b0d0b07d7f2c67/src/io/export_stl.cc).

Related inputs: [Binary STL expectation](https://github.com/openscad/openscad/blob/d7a210ed01e5db9f09a8164894b0d0b07d7f2c67/tests/regression/export-binstl/stl-export-expected.stl); [Normalized color expectation](https://github.com/openscad/openscad/blob/d7a210ed01e5db9f09a8164894b0d0b07d7f2c67/tests/regression/export-3mf/lazyunion-color-cubes-expected.3mf); [3MF writer](https://github.com/openscad/openscad/blob/d7a210ed01e5db9f09a8164894b0d0b07d7f2c67/src/io/export_3mf_v2.cc).

Remaining: Actual CGAL/Manifold equivalence, exported geometry reconstruction, parameter/color/unit losses in receiving tools, complete library/font dependency capture, source/version compatibility and crash backup behavior.

## Integration

The six application pages, original documentation notes and gap register contain these closures and the remaining work. Source/fixture observations are not substituted for whole-workflow recovery. Existing rating fields remain unchanged pending the agreed next-pass audit.


# Rating reconciliation, batch 5

Reviewed 24 October 2026. Each application below was evaluated individually against its existing essential-record and version scope. No target application was installed, built or run.

## Outcome

All 6 retain **Insufficient evidence**. E3/E5 remain **Not Verified** for the specific missing coverage below, not automatically Pass from documentation and not Fail from missing evidence. Positive dependent principles lacking their minimum are corrected. Existing E1/E4/Locality findings are not re-certified by this targeted pass.

[Plan](plan.json), [individual decisions and change ledger](decisions.json), [directory-wide review sequence](../remaining-plan.json), [current application index](../../application-index.md).

0 additional bounded source questions are resolved in this batch. Earlier resolved questions remain resolved and are not counted again. Source locators are provenance aids, not executed-behavior assertions.

<a id="cadquery"></a>

## CadQuery

Version/scope: Source commit 33361dc1b5b70bc83ce36f1b34a01ca85dfca80a; STEP fixture, assembly exporter, and CQGI execution source inspected; no CAD execution.

**E3: Not Verified.** The STEP fixture exposes product names, solids and colors, and assembly export enables names/layers/colors. Geometry equivalence and the editable source's constraints, parameters and OCCT/runtime dependencies have not been reconstructed. Readable Python plus STEP entity counts do not establish the declared engineering-intent recovery. [Source context](https://cadquery.readthedocs.io/en/latest/importexport.html).

**E5: Not Verified.** CQGI executes model text with real Python builtins and captures exceptions; the inspected path does not establish a sandbox. No effective execution authorization, dependency trust, output-overwrite visibility or correction after model side effects is established for the declared workflow. [Source context](https://github.com/CadQuery/cadquery/blob/33361dc1b5b70bc83ce36f1b34a01ca85dfca80a/cadquery/cqgi.py#L104-L125).

**E2 correction:** STEP name/color/layer output does not establish migration of the essential parametric constraints and editable intent into an independent CAD workflow. The former E2 Pass is therefore unestablished, not a verified failure of every possible exit route. [Source context](https://github.com/CadQuery/cadquery/blob/33361dc1b5b70bc83ce36f1b34a01ca85dfca80a/cadquery/occ_impl/exporters/assembly.py#L104-L132).

**Remaining:** Geometry equivalence, editable constraints in another CAD tool, complete offline rebuild, and execution/overwrite safeguards. E5 needs model/dependency execution authority, overwrite controls and correction boundaries; exception capture is not isolation.

**Next without a local installation:** Inspect source, pinned dependency records and STEP/native output with expected geometry/constraint manifests supplied by upstream or an assessor. Review execution/overwrite safeguards without running untrusted model code.

[Actual assessment](../../../content/directory/cadquery.md) | [review note](../../doc-reviews/cadquery.md).

<a id="darktable"></a>

## Darktable

Version/scope: Source commit 6556cd7dbb0e69f95d165dda8b69e7270c327f6d; XMP benchmark fixture and parameter encoder/decoder inspected; no image rendering.

**E3: Not Verified.** The historical XMP history and 160 decoded parameter/mask blocks are independently inspectable, but module-version semantics and equivalent image reconstruction were not recovered. Original images, library organization, database/sidecar precedence and DTDATA-dependent meaning remain outside the observed fixture coverage. [Source context](https://github.com/darktable-org/darktable/blob/6556cd7dbb0e69f95d165dda8b69e7270c327f6d/src/common/exif.cc#L3649-L3785).

**E5: Not Verified.** Inspectable non-destructive history is positive evidence, but it does not establish effective sidecar/database conflict precedence, original/export overwrite protection, deletion authority or available correction across the library and editing workflow. [Source context](https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/).

**Remaining:** Module-specific semantics, image render equivalence, DTDATA, complete library organization, and database/version recovery. E5 needs database/sidecar conflict policy, deletion/export overwrite safeguards and usable correction records.

**Next without a local installation:** Acquire a synthetic RAW/sidecar/library packet with expected module/history/organization and reference renders; compare records with existing parsers and obtain matching primary-source or external deletion/overwrite/conflict evidence.

[Actual assessment](../../../content/directory/darktable.md) | [review note](../../doc-reviews/darktable.md).

<a id="jabref"></a>

## JabRef

Version/scope: Source commit 1e2e9a089986e317cd7f82f4c0114b8950164925; BibTeX grouping fixture and group/file-field serializers inspected.

**E3: Not Verified.** The BibTeX sample exposes records/group hierarchy and serializers document escaped file fields and recursive group depth. Complete memberships, custom fields/types and existing linked-file relocation have not been reconstructed with an independent reader. Bibliographic text readability alone does not cover the original research profile. [Source context](https://github.com/JabRef/jabref/blob/1e2e9a089986e317cd7f82f4c0114b8950164925/jablib/src/main/java/org/jabref/logic/bibtex/FileFieldWriter.java).

**E5: Not Verified.** User-directed editing and inspectable BibTeX are not complete safeguards for automatic metadata replacement, file rename/move/delete, merge operations and citation changes. The collected grouping/file-field evidence does not sufficiently establish authorization, visible diffs and correction for those operations. [Source context](https://docs.jabref.org/).

**E2 correction:** The prior E2 Pass does not establish independent-workflow preservation of essential group memberships, custom metadata and linked files. Exposing serializer formats or a command-line export is not that migration comparison. [Source context](https://docs.jabref.org/advanced/commandline).

**Remaining:** Entry memberships, custom types/fields, other readers' handling of metadata comments, linked-file relocation, and cross-version recovery. E5 needs metadata-fetch/merge/file-operation review, visible changes and rollback or recourse for the configured library.

**Next without a local installation:** Use a populated synthetic BibTeX library and actual linked-file tree with expected groups/memberships; independently parse it and seek version-matched automated-metadata, merge and file-operation control evidence.

[Actual assessment](../../../content/directory/jabref.md) | [review note](../../doc-reviews/jabref.md).

<a id="gnu-octave"></a>

## GNU Octave

Version/scope: Source commit 5208f34c2b13b447c68c956be2a0b1d67476a80d; Dense/sparse Octave-text fixtures and ASCII/save implementation inspected; no Octave execution.

**E3: Not Verified.** Dense/sparse Octave-text values were independently read, while plain ASCII source demonstrably omits complex components and higher-dimensional variables. Binary MAT/HDF5, structs/classes, executable package dependencies and equivalent seeded calculations remain unestablished for the existing scientific-work profile. [Source context](https://docs.octave.org/octave-10.2.0.pdf).

**E5: Not Verified.** The source distinguishes temporary-file replacement on non-append save from direct append writes. That is not proof of arbitrary script/package authorization, inspectable numerical mutations, output overwrite control or usable recovery after interrupted saves and execution side effects. [Source context](https://github.com/gnu-octave/octave/blob/5208f34c2b13b447c68c956be2a0b1d67476a80d/liboctinterp/load-save/load-save.cc#L1564-L1670).

**Remaining:** Binary MAT/HDF5 round trips, structs/classes/complex values, seeded numerical reproduction, dependencies, and real save-failure recovery. E5 needs effective script/package and file-write control, visible parameter/state changes and failure/correction boundaries.

**Next without a local installation:** Inspect synthetic binary/text scientific-data exports with expected types/shapes/complex values and reproducible script/environment records; use version-matched external numerical/save-failure observations rather than executing the target locally.

[Actual assessment](../../../content/directory/gnu-octave.md) | [review note](../../doc-reviews/gnu-octave.md).

<a id="kdenlive"></a>

## Kdenlive

Version/scope: Source commit 80b74ffa95390f4cc8d75a4e886e7ff47373583e; Nested-effects project fixture and archive path-rewrite implementation inspected; no rendering.

**E3: Not Verified.** The XML fixture reveals timeline/effect/resource relationships, and archive code rewrites resource/proxy/title paths. It does not include an observed complete dependency archive or independent reconstruction with equivalent keyframes, effects and media. Rendering/interchange and version/crash recovery remain incomplete. [Source context](https://github.com/KDE/kdenlive/blob/80b74ffa95390f4cc8d75a4e886e7ff47373583e/src/project/dialogs/archivewidget.cpp#L964-L1013).

**E5: Not Verified.** User-directed video editing is not sufficient evidence for save/archive overwrite, render/share approval, asset deletion or correction after missing assets and project mutations. The archive-path routine does not cover the consequential-action surface. [Source context](https://docs.kdenlive.org/en/project_and_asset_management/file_management.html).

**Remaining:** Complete archive/move/restore, missing assets, render equivalence, keyframes, OTIO losses, and version/crash recovery. E5 needs asset/save/render/share authorization, inspectable project changes and available correction after destructive edits or overwrite.

**Next without a local installation:** Acquire a complete synthetic project/archive/media packet with expected timeline/keyframes and reference renders or OTIO comparisons; inspect XML/assets and seek same-version save/render/archive control evidence.

[Actual assessment](../../../content/directory/kdenlive.md) | [review note](../../doc-reviews/kdenlive.md).

<a id="keepassxc"></a>

## KeePassXC

Version/scope: Source commit d5e43b779d5e23c23963d53b806dcda5dd38f50e; Historical XML fixture and CSV/XML export call paths inspected; no encrypted-vault execution.

**E3: Not Verified.** The plaintext historical XML fixture's attachments resolve, but no encrypted KDBX was decrypted or restored across independent clients with preserved history, keys and passkeys. The inspected CSV and KDBX 4+ XML routes omit essential payloads in different ways. Those bounded export limitations are not full native-vault recovery or proof all recovery paths fail. [Source context](https://github.com/keepassxreboot/keepassxc/blob/d5e43b779d5e23c23963d53b806dcda5dd38f50e/src/format/KdbxWriter.cpp).

**E5: Not Verified.** The collected exporter/writer evidence does not establish effective approval for secret disclosure, browser/Auto-Type use, merge/overwrite or key/hardware recovery. Password custody and local availability alone do not demonstrate governability of those high-risk actions. [Source context](https://keepassxc.org/docs/KeePassXC_GettingStarted).

**E2 correction:** The former E2 Pass does not establish a complete usable alternative-vault migration: the inspected CSV and KDBX 4+ XML routes omit essential history/attachments or other fields. Another KDBX route may work, but that complete comparison remains missing. [Source context](https://github.com/keepassxreboot/keepassxc/blob/d5e43b779d5e23c23963d53b806dcda5dd38f50e/src/format/CsvExporter.cpp#L60-L106).

**Remaining:** Actual KDBX decryption and cross-client restore, version-specific CLI export/import, passkeys, hardware/key-file recovery, and merges. E5 needs secret-use/export approval, browser/Auto-Type authority, merge/overwrite visibility and key-change/correction boundaries.

**Next without a local installation:** Use a synthetic encrypted KDBX with non-secret test credentials, attachments/history/passkeys and expected records; seek independent-client and same-version approval/merge recovery evidence without handling real passwords or installing the target.

[Actual assessment](../../../content/directory/keepassxc.md) | [review note](../../doc-reviews/keepassxc.md).

## Validation boundary

The shared rating audit checks recorded fields, decision evidence and review notes. Historical schema-repair and evidence baselines remain available. Source/fixture hashes, navigation and the complete set of updated pages are checked by the final repository validation; no per-product clean restore or upstream test run is implied.

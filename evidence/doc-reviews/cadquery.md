# CadQuery: documentation review

Reviewed 22 October 2026 from the CadQuery documentation, repository, and the related CQ-editor and OCP repositories only. Latest release: 2.8.0, shown on GitHub as released 20 June (the page omits the year). Licence: Apache 2.0. The FAQ page returned 404 and the changelog was only partly read.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

Follow-up, 23 October 2026: resolved questions and remaining work are recorded in the [second third-pass batch](../third-pass/batch-2/README.md#cadquery) and reflected in the [application assessment](../../content/directory/cadquery.md). The earlier review below is superseded where that evidence answers or corrects it.

**Storage and access (E1, E3)**
- A model is a plain Python script; there is no native project file. A stated goal is a "non-proprietary, plain text model format". [file format](https://cadquery.readthedocs.io/en/latest/fileformat.html), [introduction](https://cadquery.readthedocs.io/en/latest/intro.html)
- Geometry is OpenCascade boundary representation (BREP). The docs do not state outright that the script is the durable artifact. No statement about long-term durability or about recovery was found. [primer](https://cadquery.readthedocs.io/en/latest/primer.html)

**Exit and migration (E2)**
- "CadQuery does not support any formats that carry parametric data with them", and "The only format that is fully parametric is CadQuery's own Python format". Every export is baked geometry. [import and export](https://cadquery.readthedocs.io/en/latest/importexport.html)
- Export: DXF, SVG, STEP, STL, AMF, 3MF, VRML, TJS, VTP, glTF (assemblies only), and internal XML and XBF. Import: DXF, STEP, XML, XBF. STL and the other mesh formats lose exact geometry, and AMF and 3MF omit colour and material. Default assembly STEP export keeps colours but not names; fused mode keeps names but "is likely to alter the faces". Whether assembly constraints are exported was not found. [import and export](https://cadquery.readthedocs.io/en/latest/importexport.html), [assemblies](https://cadquery.readthedocs.io/en/latest/assy.html)
- An unrecognised extension (for example `.stp`) raises an error unless the format is given explicitly. [import and export](https://cadquery.readthedocs.io/en/latest/importexport.html)

**Reproducibility (E3)**
- CadQuery sits on OCP, Python bindings to OpenCascade (OCCT). Installation is via conda or pip, with conda called "the better tested and more mature option". Older CadQuery releases "may not be compatible with the latest OCP/OCCT version", so pins are advised. [installation](https://cadquery.readthedocs.io/en/latest/installation.html), [OCP](https://github.com/CadQuery/OCP)
- No statement guarantees identical output across CadQuery or OCCT versions. The changelog records geometry-affecting fixes and breaking renames (for example `extrude` arguments in 2.2.0). The documented Python range is inconsistent between the installation page, the README, and the changelog. [changes](https://github.com/CadQuery/cadquery/blob/master/changes.md), [README](https://github.com/CadQuery/cadquery)

**Continuing authority (E4) and dependencies**
- No runtime network use, accounts, telemetry, or update checks are mentioned (absence is not proof). Installation needs network access, and CQ-editor is installed from a GitHub release. [installation](https://cadquery.readthedocs.io/en/latest/installation.html)
- Governance: a team of 3 core maintainers per `funding.json`, relying on community support, with an Open Collective funding plan. No maintenance-status or support-lifetime policy was found. The OpenCASCADE licence was not stated in the sources read. [funding.json](https://github.com/CadQuery/cadquery/blob/master/funding.json), [roadmap](https://cadquery.readthedocs.io/en/latest/roadmap.html)

**Consequential operations (E5)**
- Scripts are arbitrary Python run with the user's privileges. The docs say only that "a safer sandbox" is a future enhancement, and no warning about opening untrusted scripts was found. File overwrite behavior for exporters is not documented. [CQGI](https://cadquery.readthedocs.io/en/latest/cqgi.html)
- CQGI `build()` returns a result object with success and exception rather than raising. No general guarantee about invalid geometry was found. [CQGI](https://cadquery.readthedocs.io/en/latest/cqgi.html)

## Gaps to test or read next
1. Pin versions of CadQuery and OCP, build a parametric part and a small assembly, and regenerate it in an environment with a newer version to see if the geometry differs.
2. Export STEP and reimport into FreeCAD and one more CAD tool, and list what is lost (names, constraints, colours).
3. Rebuild from a script on a clean offline machine with a pinned conda environment.
4. Pages not read: the FAQ (404), CQ-editor wiki pages, PyPI, and the OCP release list.
5. Confirm the licence status of OpenCASCADE, which the sources read did not state.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-5/README.md#cadquery); [actual assessment](../../content/directory/cadquery.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The STEP fixture exposes product names, solids and colors, and assembly export enables names/layers/colors. Geometry equivalence and the editable source's constraints, parameters and OCCT/runtime dependencies have not been reconstructed. Readable Python plus STEP entity counts do not establish the declared engineering-intent recovery.
- E5: Not Verified. CQGI executes model text with real Python builtins and captures exceptions; the inspected path does not establish a sandbox. No effective execution authorization, dependency trust, output-overwrite visibility or correction after model side effects is established for the declared workflow.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. STEP name/color/layer output does not establish migration of the essential parametric constraints and editable intent into an independent CAD workflow. The former E2 Pass is therefore unestablished, not a verified failure of every possible exit route.

Remaining: Geometry equivalence, editable constraints in another CAD tool, complete offline rebuild, and execution/overwrite safeguards. E5 needs model/dependency execution authority, overwrite controls and correction boundaries; exception capture is not isolation.

Next without a local installation: Inspect source, pinned dependency records and STEP/native output with expected geometry/constraint manifests supplied by upstream or an assessor. Review execution/overwrite safeguards without running untrusted model code.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

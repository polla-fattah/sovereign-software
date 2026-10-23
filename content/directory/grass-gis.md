+++
title = "GRASS GIS"
category = "Scientific Computing & GIS"
summary = "Geospatial analysis system with a scriptable command set and its own on-disk database layout."
substrate = "Project, mapset, and raster/vector directories on disk"
sync_model = "Local desktop and command line"
extract_cmd = "ls ~/grassdata/location/PERMANENT"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Pack/unpack equivalence, external database dependencies, raster/null/category fidelity, older-version opening and interrupted-write recovery remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence 09ad2796fff4fdfc2a3bee8446868f8be3076db4"
assessment_notes = "Individually reconciled in rating batch 10 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "not_verified"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

[[evidence]]
target = "E1"
text = "GRASS organizes work into projects and mapsets and provides modules for database and geospatial data operations, but complete export of a project was not tested."
url = "https://grass.osgeo.org/grass85/manuals/grass_database.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Interchange depends on the specific raster, vector, projection, and database formats; representative migration was not performed."
url = "https://grass.osgeo.org/grass85/manuals/grass_database.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The native vector pack implementation archives map files, copies connected attribute tables into db.sqlite via db.copy, and includes projection support files. The separately inspected raster pack collects cats/cell/cellhd/cell_misc/colr/fcell/hist and CRS support. Native packs preserve structures that a geometry-only export need not carry; this is not a successful unpack trial."
url = "https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/scripts/v.pack/v.pack.py"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Processing modules and project databases can run locally without a hosted service."
url = "https://grass.osgeo.org/grass85/manuals/grass_projects.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The removal loop prints matched mapset elements and continues without deletion unless force (-f) is set; the implementation explicitly warns that nothing was removed. With force it calls M_do_remove. This establishes a concrete preview/deletion branch, not an automatic recovery guarantee."
url = "https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/general/g.remove/main.c"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for GRASS GIS does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/scripts/v.pack/v.pack.py"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for GRASS GIS's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/scripts/v.pack/v.pack.py"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Analysis and data management are local operations."
url = "https://grass.osgeo.org/grass85/manuals/grass_projects.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/general/g.remove/main.c"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Vector/raster pack source identifies native maps, attribute SQLite data and projection support, but no complete pack was independently unpacked and compared. External database dependencies and null/category/projection meaning remain unestablished for the native project/mapset."
url = "https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/scripts/v.pack/v.pack.py"
confidence = "medium"

[[evidence]]
target = "E5"
text = "g.remove previews matches and requires force for the inspected deletion branch. That is a concrete bounded safeguard, not full evidence for overwrite/import/processing authority, mapset permissions or recourse after removed maps and interrupted writes."
url = "https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/general/g.remove/main.c"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The native vector pack implementation archives map files, copies connected attribute tables into db.sqlite via db.copy, and includes projection support files. The separately inspected raster pack collects cats/cell/cellhd/cell_misc/colr/fcell/hist and CRS support. Native packs preserve structures that a geometry-only export need not carry; this is not a successful unpack trial. [Source](https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/scripts/v.pack/v.pack.py).
- [x] Resolved: The removal loop prints matched mapset elements and continues without deletion unless force (-f) is set; the implementation explicitly warns that nothing was removed. With force it calls M_do_remove. This establishes a concrete preview/deletion branch, not an automatic recovery guarantee. [Source](https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/general/g.remove/main.c).
- [ ] Open: Pack/unpack equivalence, external database dependencies, raster/null/category fidelity, older-version opening and interrupted-write recovery remain untested. E5 needs mapset/processing/overwrite authority, effective removal scope and appropriate independent backup/restore boundaries.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-10/.

**Human-readable criteria:** Can an independent party reproduce the analysis from preserved data, code, units, dependencies, and provenance, and exchange results without hidden loss?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Pack/unpack equivalence, external database dependencies, raster/null/category fidelity, older-version opening and interrupted-write recovery remain untested. E5 needs mapset/processing/overwrite authority, effective removal scope and appropriate independent backup/restore boundaries.

**Next without installing locally:** Inspect synthetic native raster/vector packs, external DB references and expected attributes/CRS/null/category records; seek independent unpack comparisons and version-matched preview/remove/overwrite recovery evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-10/`. Overall: **Insufficient evidence**.

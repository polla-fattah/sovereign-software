+++
title = "QGIS"
category = "Scientific Computing & GIS"
summary = "Geographic information system that works with many open spatial formats and keeps projects as files."
substrate = "Project files (.qgz, a zip of XML) over open geodata such as GeoPackage"
sync_model = "Local desktop application; data held by the user or a server of their choice"
extract_cmd = "unzip -p project.qgz '*.qgs' | head -n 20"
assessment_batch = "B"
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit b7db8233afbfe8d1e9870da61a2696592295932c and project1.qgz fixture identifying QGIS 3.11.0-Master"
assessment_notes = "Individually reconciled in rating batch 4 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."
limitations = ["The inspected QGZ contains project XML and empty auxiliary storage, while its three layer datasets are external. It is not a self-contained data backup."]

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
text = "Resolved: standard ZIP/XML tools opened the pinned project1.qgz fixture and parsed three named OGR layers. The archive contains project1.qgs and a zero-byte project1.qgd, and the XML records QGIS 3.11.0-Master. This directly establishes inspectability of the historical sample."
url = "https://github.com/qgis/QGIS/blob/b7db8233afbfe8d1e9870da61a2696592295932c/tests/testdata/embedded_groups/project1.qgz"
confidence = "high"

[[evidence]]
target = "E2"
text = "QGIS can export layers and projects to standard geospatial formats, but complete style, plugin, and database migration was not tested."
url = "https://docs.qgis.org/3.40/pdf/en/QGIS-3.40-DesktopUserGuide-en.pdf"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Resolved: the fixture references ../lines.shp, ../points.shp, and ../polys.shp, none of which is in its complete two-member ZIP manifest. Upstream tests contain relative/absolute-path and GeoPackage relocation assertions, but were not executed here. Dataset completeness, populated auxiliary storage, and complex clean reconstruction remain unverified."
url = "https://github.com/qgis/QGIS/blob/b7db8233afbfe8d1e9870da61a2696592295932c/tests/src/python/test_qgsproject.py#L1196-L1405"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The desktop GIS workflow is local and can use local datasets."
url = "https://qgis.org/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Maps can inform public and engineering decisions, but data provenance, coordinate validation, and publication review were not assessed."
url = "https://qgis.org/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for QGIS does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/qgis/QGIS/blob/b7db8233afbfe8d1e9870da61a2696592295932c/tests/src/python/test_qgsproject.py#L1196-L1405"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for QGIS's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/qgis/QGIS/blob/b7db8233afbfe8d1e9870da61a2696592295932c/tests/src/python/test_qgsproject.py#L1196-L1405"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core mapping workflow can run on local data and infrastructure."
url = "https://qgis.org/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://qgis.org/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The historical QGZ contains project XML and empty auxiliary storage but omits its three external shapefiles. Source relocation assertions were inspected, not run. Complete data, CRS, joins, styles, layouts and provider-dependent analytical meaning have not been reconstructed; project readability does not establish the geospatial profile's E3."
url = "https://github.com/qgis/QGIS/blob/b7db8233afbfe8d1e9870da61a2696592295932c/tests/src/python/test_qgsproject.py#L1196-L1405"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The existing E5 note identifies provenance/coordinate/publication risks, not demonstrated control paths. Source/fixture path inspection does not establish edit-transaction rollback, destructive processing outputs, overwrite authorization or inspectable parameter/provenance records in the assessed configuration."
url = "https://qgis.org/"
confidence = "medium"

+++

**Primary investigation:** Portability of projects, data sources, analytical meaning, and spatial metadata.

**Investigation priority:** Sovereignty standard, Longevity high, Locality high, Transparency and Control standard. This plans the test effort and is not a finding.

**Synthetic dataset:** A GIS project with vector and raster layers, GeoPackage data, coordinate reference systems, styles, labels, joins, layouts, and processing operations.

**Required tests**

1. Save in QGIS project formats and inspect the project structure.
2. Move the entire project to a different filesystem location and operating system.
3. Test relative paths, absolute paths, and missing data-source recovery.
4. Export datasets to independent formats and compare CRS, attributes, geometry, and metadata.
5. Disable external basemap and web-processing services.
6. Reproduce an analytical result from documented parameters and input data.
7. Reopen the project in a clean QGIS installation with no optional plugins.

**Critical evidence:** Portable project archive, layer availability comparison, CRS and geometry checks, processing parameters, and independently opened spatial files.

**Method note:** Test complete project portability, not just whether a project file opens.

**Assessment update, 23 October 2026:**

- [x] Resolved: a real QGZ opens with standard ZIP/XML tools and exposes layer names, providers, and data-source paths.
- [x] Resolved: this archive excludes its three referenced Shapefiles; the project file alone does not preserve the datasets.
- [ ] Open: populated auxiliary storage, current-version joins/styles/layouts, plugin/provider absence, and complete project reconstruction. E5 needs edit/processing/overwrite authorization, recorded parameters/provenance and available correction; public-map accuracy is not itself a control test.

**Assessment:** Direct inspection supports access to the sample's project structure and demonstrates its external data dependency. Full migration and independent recovery remain Not Verified, and the overall determination remains **Insufficient evidence**.

**Human-readable criteria:** Can an independent party reproduce the analysis from preserved data, code, units, dependencies, and provenance, and exchange results without hidden loss?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** populated auxiliary storage, current-version joins/styles/layouts, plugin/provider absence, and complete project reconstruction. E5 needs edit/processing/overwrite authorization, recorded parameters/provenance and available correction; public-map accuracy is not itself a control test.

**Next without installing locally:** Use a self-contained project/data packet with expected CRS, joins/styles and analysis outputs, then inspect it independently. Seek same-version edit-buffer/processing/overwrite source or recorded tests instead of installing a desktop instance.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-4/`. Overall: **Insufficient evidence**.

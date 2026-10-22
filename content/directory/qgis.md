+++
title = "QGIS"
category = "Scientific Computing & GIS"
summary = "Geographic information system that works with many open spatial formats and keeps projects as files."
substrate = "Project files (.qgz, a zip of XML) over open geodata such as GeoPackage"
sync_model = "Local desktop application; data held by the user or a server of their choice"
extract_cmd = "unzip -p project.qgz '*.qgs' | head -n 20"
assessment_batch = "B"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "partial"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "QGIS projects are stored as XML or compressed QGZ files and can also be stored in GeoPackage and other project storage implementations."
url = "https://docs.qgis.org/testing/en/docs/user_manual/introduction/project_files.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "QGIS can export layers and projects to standard geospatial formats, but complete style, plugin, and database migration was not tested."
url = "https://docs.qgis.org/3.40/pdf/en/QGIS-3.40-DesktopUserGuide-en.pdf"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Project files and many layer formats are independently inspectable, but a clean reconstruction of a complex project was not performed."
url = "https://docs.qgis.org/testing/en/docs/user_manual/introduction/project_files.html"
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
text = "Open project and data formats support custody, while provider layers, plugins, and style migration remain limits."
url = "https://docs.qgis.org/testing/en/docs/user_manual/introduction/project_files.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "XML, GeoPackage, and standard geospatial formats support preservation, but complex styling and dependencies need testing."
url = "https://docs.qgis.org/testing/en/docs/user_manual/introduction/project_files.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core mapping workflow can run on local data and infrastructure."
url = "https://qgis.org/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Project storage is documented, but analytical provenance and consequential map review remain unverified."
url = "https://qgis.org/"
confidence = "low"

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

**Preliminary desk assessment:** QGIS is described as geographic information system that works with many open spatial formats and keeps projects as files. Its primary preservation surface is Project files (.qgz, a zip of XML) over open geodata such as GeoPackage, with independence shaped by local desktop application; data held by the user or a server of their choice. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an independent party reproduce the analysis from preserved data, code, units, dependencies, and provenance, and exchange results without hidden loss?

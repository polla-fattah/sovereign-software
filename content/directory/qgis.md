+++
title = "QGIS"
category = "Scientific Computing & GIS"
summary = "Geographic information system that works with many open spatial formats and keeps projects as files."
substrate = "Project files (.qgz, a zip of XML) over open geodata such as GeoPackage"
sync_model = "Local desktop application; data held by the user or a server of their choice"
extract_cmd = "unzip -p project.qgz '*.qgs' | head -n 20"
assessment_batch = "B"
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

+++
title = "GDAL"
category = "Scientific Computing & GIS"
summary = "Library and command-line tools for reading, converting, and inspecting raster and vector geospatial data."
substrate = "Open geospatial formats through a translation library"
sync_model = "Local command-line tools"
extract_cmd = "ogrinfo -so data.gpkg"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "partial"
locality = "meets"
transparency = "meets"

[[evidence]]
target = "E1"
text = "GDAL provides command-line and library tools to inspect and translate raster and vector datasets."
url = "https://gdal.org/en/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "GDAL translates among many documented formats, but driver-specific metadata and loss behavior must be checked for each dataset."
url = "https://gdal.org/en/stable/programs/gdal_translate.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The documentation identifies format drivers and translation options, but a representative round-trip and independent restoration were not performed."
url = "https://gdal.org/en/stable/programs/gdal_translate.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Translation, inspection, and processing run locally without a hosted permission service."
url = "https://gdal.org/en/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Strict mode, explicit data types, metadata options, and driver documentation make transformations inspectable, but consequential data-loss cases need testing."
url = "https://gdal.org/en/stable/programs/gdal_translate.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "User-controlled files and broad format support provide strong custody and exit."
url = "https://gdal.org/en/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Open geospatial formats and documented drivers support preservation, but metadata, coordinate systems, and driver options can be lost in conversion."
url = "https://gdal.org/en/stable/programs/gdal_translate.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core operations are local command-line or library calls."
url = "https://gdal.org/en/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Options expose data type, metadata, and transformation choices, supporting review of consequential conversions."
url = "https://gdal.org/en/stable/programs/gdal_translate.html"
confidence = "medium"
+++

**Preliminary desk assessment:** GDAL is described as library and command-line tools for reading, converting, and inspecting raster and vector geospatial data. Its primary preservation surface is Open geospatial formats through a translation library, with independence shaped by local command-line tools. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an independent party reproduce the analysis from preserved data, code, units, dependencies, and provenance, and exchange results without hidden loss?

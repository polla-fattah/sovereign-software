+++
title = "GRASS GIS"
category = "Scientific Computing & GIS"
summary = "Geospatial analysis system with a scriptable command set and its own on-disk database layout."
substrate = "Project, mapset, and raster/vector directories on disk"
sync_model = "Local desktop and command line"
extract_cmd = "ls ~/grassdata/location/PERMANENT"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "not_verified"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "meets"
transparency = "partial"

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
text = "The project and mapset model is documented, but independent restoration of a complete location, database, region, and external dependencies was not demonstrated."
url = "https://grass.osgeo.org/grass85/manuals/grass_projects.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Processing modules and project databases can run locally without a hosted service."
url = "https://grass.osgeo.org/grass85/manuals/grass_projects.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Modules expose explicit operations and mapset permissions, but destructive data changes and provenance need hands-on review."
url = "https://grass.osgeo.org/grass85/manuals/grass_database.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Local projects and user-controlled databases support custody, but the complete project boundary and export path need testing."
url = "https://grass.osgeo.org/grass85/manuals/grass_projects.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Documented geospatial formats help preservation, while mapsets, databases, projections, and processing provenance can be complex."
url = "https://grass.osgeo.org/grass85/manuals/grass_database.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Analysis and data management are local operations."
url = "https://grass.osgeo.org/grass85/manuals/grass_projects.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Command modules and mapset boundaries make many transformations explicit, but complete provenance remains unverified."
url = "https://grass.osgeo.org/grass85/manuals/grass_database.html"
confidence = "medium"
+++

**Preliminary desk assessment:** GRASS GIS is described as geospatial analysis system with a scriptable command set and its own on-disk database layout. Its primary preservation surface is Project, mapset, and raster/vector directories on disk, with independence shaped by local desktop and command line. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an independent party reproduce the analysis from preserved data, code, units, dependencies, and provenance, and exchange results without hidden loss?

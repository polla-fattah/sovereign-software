# GRASS GIS: documentation review

Reviewed 22 October 2026 from the GRASS 8.5 manual pages, grass.osgeo.org (download, governance, licence and news pages), and the OSGeo/grass repository only. Current stable release: 8.5.0, released "Friday, May 8, 2026" per the official announcement; the download page shows only "8.5.0" with no date. The licence page says GNU GPL "(>=v2)". Page contents were read through a summarising fetch tool, so every statement rests on a summary, not the full page text.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- A GRASS Database is a directory holding project directories, each with one coordinate reference system, each holding mapsets. It is described as not a relational database; attribute data may live in relational databases that are part of it. [database](https://grass.osgeo.org/grass85/manuals/grass_database.html)
- Mapsets hold maps, color tables and the region (`WIND`); PERMANENT is mandatory and holds shared base data. The page does not describe internal file formats or whether other tools can read the files directly (not found in the docs). [database](https://grass.osgeo.org/grass85/manuals/grass_database.html)
- The page says files "should not be moved or modified directly, but only using GRASS tools". [database](https://grass.osgeo.org/grass85/manuals/grass_database.html)
- Data must be imported before analysis. Linking external data (`r.external`, `v.external`) is possible but may slow computation and "has other limitations". [projects](https://grass.osgeo.org/grass85/manuals/grass_projects.html)

**Exit and migration (E2)**
- Raster export uses GDAL: GTiff by default, plus COG, GPKG, netCDF, Zarr and others; the format list depends on the local GDAL install. [r.out.gdal](https://grass.osgeo.org/grass85/manuals/r.out.gdal.html)
- Raster export may drop or alter metadata: color tables can be skipped, the raster attribute table is written only with `-t`, and the page does not say how categories or history are handled (not found in the docs). Export stops with an error if the chosen type or format would lose data, unless forced. [r.out.gdal](https://grass.osgeo.org/grass85/manuals/r.out.gdal.html)
- Vector export (`v.out.ogr`) writes simple features, default GPKG. Topology is not described as preserved; Shapefile column names are limited to 10 characters; features with several categories are exported once per category; features without a category are dropped unless `-c` is set. [v.out.ogr](https://grass.osgeo.org/grass85/manuals/v.out.ogr.html)
- Databases and projects "can be safely copied or moved as any other directories". Mapsets can be copied only between projects with matching CRS. [database](https://grass.osgeo.org/grass85/manuals/grass_database.html)

**Recovery (E3)**
- Backup guidance beyond copying the directories: not found in the docs. [database](https://grass.osgeo.org/grass85/manuals/grass_database.html)
- Projects can be copied, moved or zipped, but mapsets "should not be copied or moved outside of their project directory", since this can break consistency. [projects](https://grass.osgeo.org/grass85/manuals/grass_projects.html)
- Compatibility between GRASS versions for existing databases: not addressed on the database, projects or 8.5.0 announcement pages. The announcement lists new minimum dependencies (GDAL 3.7+, PROJ 9.0+, Python 3.10+) and a changed mask mechanism (`GRASS_MASK`). [8.5.0 release](https://grass.osgeo.org/news/2026_05_08_grass_8_5_0_released/)
- File locking and recovery after a crash: not found in the docs read. [projects](https://grass.osgeo.org/grass85/manuals/grass_projects.html)

**Continuing authority (E4) and dependencies**
- Processing is local; no account, hosted service, telemetry or update check was mentioned on the pages read (absence only, not a statement of none). [repository](https://github.com/OSGeo/grass), [8.5.0 release](https://grass.osgeo.org/news/2026_05_08_grass_8_5_0_released/)
- Licence: GPL version 2 or later. [licence](https://grass.osgeo.org/about/license/)
- Governance: a 9-member elected Project Steering Committee appoints a Core Development Team; hosted by OSGeo, fiscally sponsored by NumFOCUS. The page has no succession or continuity plan and no maintenance commitment. [governance](https://grass.osgeo.org/about/governance/)
- Export and import depend on a local GDAL/OGR installation. [r.out.gdal](https://grass.osgeo.org/grass85/manuals/r.out.gdal.html)

**Consequential operations (E5)**
- `g.remove` is a dry run unless `-f` is given. The page does not say whether removal can be undone, and pattern matching can select more than intended. [g.remove](https://grass.osgeo.org/grass85/manuals/g.remove.html)
- `g.copy` errors on an existing name unless `--overwrite` is set; no data-loss warning is given. [g.copy](https://grass.osgeo.org/grass85/manuals/g.copy.html)
- Only the PERMANENT owner can change that mapset; users change only their own mapset. Temporary projects and mapsets are deleted when the session ends. [database](https://grass.osgeo.org/grass85/manuals/grass_database.html), [projects](https://grass.osgeo.org/grass85/manuals/grass_projects.html)
- An undo or history facility for data changes: not found in the docs read.

## Gaps to test or read next
1. Create a synthetic project with raster, vector and attribute table; export with `r.out.gdal` and `v.out.ogr`; reimport and compare cell values, null handling, categories, color tables, and attribute names.
2. Copy the project directory to another machine with the same version and open it; then open it in an older release and note errors.
3. Read the files in a mapset with GDAL/OGR or SQLite without GRASS and record what is readable.
4. Kill a session mid-write and check for lock files and corrupted maps.
5. Run `g.remove` without and with `-f`, and `g.copy --overwrite`, on synthetic maps; check for any recovery.
6. Pages not read: GRASS data-format and version-migration notes (not found), mapset locking pages, full release notes, the GOVERNANCE.md text (the fetch only returned a pointer), and GitHub release tags (releases page showed none).
7. The download page omits the release date; the GitHub release page was not directly read.

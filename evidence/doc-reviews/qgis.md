# QGIS: documentation review

Reviewed 22 October 2026 from the QGIS User Manual (docs.qgis.org, "latest"), qgis.org (download and privacy pages), and the GitHub README only. The download page lists the latest stable release as 4.2.3 "Belém do Pará", dated 2026-09-25, and a long-term release 3.44.15 "Solothurn" with no date given. The README states GPL version 2 or any later version, plus a Qt exception file whose text was not read. The "latest" manual pages were summarised by a fetch tool, and I could not confirm which QGIS series they are labelled for.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

Follow-up, 23 October 2026: two questions are now resolved in the [third-pass evidence](../third-pass/README.md#qgis) and reflected in the [application assessment](../../content/directory/qgis.md). The review below preserves the earlier documentation record; its gap list is superseded where the follow-up answers it.

**Storage and access (E1, E3)**
- The default project format is `.qgz`, a zip archive holding the `.qgs` XML project and a SQLite `.qgd` database for auxiliary data. The `.qgs` file is XML and "can be edited outside QGIS". [project files](https://docs.qgis.org/latest/en/docs/user_manual/introduction/project_files.html)
- Projects can also be saved to and opened from PostgreSQL, GeoPackage, or Oracle. [project files](https://docs.qgis.org/latest/en/docs/user_manual/introduction/project_files.html)
- Each save of a `.qgs` file makes a `.qgs~` backup in the same directory. The page does not say whether `.qgz` saves get a backup. [project files](https://docs.qgis.org/latest/en/docs/user_manual/introduction/project_files.html)
- Relative versus absolute path storage is not discussed on this page (not found in the docs). Moved or renamed sources trigger the Handle Unavailable Layers dialog, where paths can be fixed by hand, via Auto-Find, or left unavailable. [project files](https://docs.qgis.org/latest/en/docs/user_manual/introduction/project_files.html)
- The profile folder holds settings in `QGIS/QGIS3.ini` under the user's home area. The `--profiles-path` option redirects it. [configuration](https://docs.qgis.org/latest/en/docs/user_manual/introduction/qgis_configuration.html), [getting started](https://docs.qgis.org/latest/en/docs/user_manual/introduction/getting_started.html)

**Exit and migration (E2)**
- Layers export through Save As to any GDAL-writable format: raster (GeoTIFF, GeoPackage, MBTiles, Geospatial PDF) and vector (GeoPackage, GML, Shapefile, DXF, FileGDB, MapInfo, SpatiaLite, CSV, KML, ODS). [create layers](https://docs.qgis.org/latest/en/docs/user_manual/managing_data_source/create_layers.html)
- Symbology export defaults to "No symbology", so the receiving application applies its own style. Styles are stored only through OGR Feature Styles, which the page says some formats support (KML, DXF, TAB). Only checked fields are exported. [create layers](https://docs.qgis.org/latest/en/docs/user_manual/managing_data_source/create_layers.html)
- Metadata persisted as a `.qmd` file in multi-dataset formats (SpatiaLite, DXF) "may have unintended behavior". [create layers](https://docs.qgis.org/latest/en/docs/user_manual/managing_data_source/create_layers.html)
- Export of whole projects, layouts, joins, labels, and processing models to other tools was not found on these pages.

**Recovery (E3)**
- Older projects: "Project files from older QGIS versions may not work properly any more." A warning appears by default when opening a project saved by an older version (a setting in Options, General). [project files](https://docs.qgis.org/latest/en/docs/user_manual/introduction/project_files.html)
- Opening a project saved by a newer QGIS in an older one is not covered (not found in the docs). Project autosave or crash recovery for projects was not found on the pages read.
- A failed layer save keeps the in-memory edits so the user can fix the cause and retry. [editing](https://docs.qgis.org/latest/en/docs/user_manual/working_with_vector/editing_geometry_attributes.html)

**Continuing authority (E4) and dependencies**
- The README says the project has an active developer team, time-based releases, three branches (LTR, latest, nightly), monthly point releases, and OSGeo membership. It links a code of conduct, security policy, and contributing guide, none read. The README fetch showed no CLA statement. [GitHub](https://github.com/qgis/QGIS)
- The project site lists a QGIS Foundation with a Charter, finances, and membership pages, but I did not read them (the charter URL I tried returned 404). No succession statement was found. [project overview](https://qgis.org/project/overview/)
- Privacy: a news feed is optional and can be disabled. It records day-rounded date, QGIS version, country, and platform. IP address is used for country only and "not retained". Plugin downloads record day, plugin version, and country. [privacy](https://qgis.org/resources/support/privacy/)
- The privacy page describes no separate update check. The settings page has a checkbox "Check QGIS version at startup", and whether it is on by default was not stated. [configuration](https://docs.qgis.org/latest/en/docs/user_manual/introduction/qgis_configuration.html)
- No account requirement was found in the pages read. Network settings include proxy, timeouts, and a tile cache. Plugin paths and plugin-added settings exist, and the official plugin repository is the default source (per a search summary of the manual, not a page I read directly).

**Consequential operations (E5)**
- Edits stay in memory until saved; quitting or leaving edit mode prompts to save or discard. The page advises saving regularly and backing up the data source before editing, since QGIS offers no warranty of data integrity. [editing](https://docs.qgis.org/latest/en/docs/user_manual/working_with_vector/editing_geometry_attributes.html)
- Undo and Redo cover vector edits, with a history panel. Changes made by plugins "may or may not be reverted". No edit log beyond that history was found (page read to character 100000 of about 125760). [editing](https://docs.qgis.org/latest/en/docs/user_manual/working_with_vector/editing_geometry_attributes.html)
- Delete has no specific warning dialog described. Deleting all vertices leaves a geometryless record. [editing](https://docs.qgis.org/latest/en/docs/user_manual/working_with_vector/editing_geometry_attributes.html)
- Temporary scratch layers are discarded when QGIS closes. Save As can overwrite a file or layer, or append. [create layers](https://docs.qgis.org/latest/en/docs/user_manual/managing_data_source/create_layers.html)

## Gaps to test or read next
1. Build a synthetic project (vector, raster, GeoPackage, joins, labels, layout), save as `.qgz`, unzip it, and inspect the `.qgs` XML and `.qgd` for what a third party can read.
2. Move the project to another folder and operating system. Compare relative and absolute path handling, and exercise the missing-source dialog.
3. Export each layer to GeoPackage and Shapefile and compare CRS, attributes, geometry, and metadata; list styles and field aliases lost.
4. Save in 4.2.x, then try to open in the 3.44 LTR and note warnings or failures (not found in the docs).
5. Open the project in a clean install without plugins and with the news feed and version check off and the network blocked.
6. Force a crash mid-edit and during a save; check what `.qgs~` or autosave files exist for `.qgz`.
7. Not read: the project Charter and Foundation pages, CONTRIBUTING.md and any CLA, the Qt exception text, the plugin manager chapter, the release notes for 4.x project format changes, and the last 25760 characters of the editing page.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-4/README.md#qgis); [actual assessment](../../content/directory/qgis.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The historical QGZ contains project XML and empty auxiliary storage but omits its three external shapefiles. Source relocation assertions were inspected, not run. Complete data, CRS, joins, styles, layouts and provider-dependent analytical meaning have not been reconstructed; project readability does not establish the geospatial profile's E3.
- E5: Not Verified. The existing E5 note identifies provenance/coordinate/publication risks, not demonstrated control paths. Source/fixture path inspection does not establish edit-transaction rollback, destructive processing outputs, overwrite authorization or inspectable parameter/provenance records in the assessed configuration.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: populated auxiliary storage, current-version joins/styles/layouts, plugin/provider absence, and complete project reconstruction. E5 needs edit/processing/overwrite authorization, recorded parameters/provenance and available correction; public-map accuracy is not itself a control test.

Next without a local installation: Use a self-contained project/data packet with expected CRS, joins/styles and analysis outputs, then inspect it independently. Seek same-version edit-buffer/processing/overwrite source or recorded tests instead of installing a desktop instance.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

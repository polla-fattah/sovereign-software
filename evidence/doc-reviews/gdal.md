# GDAL: documentation review

Reviewed 22 October 2026 from the GDAL documentation (gdal.org, stable branch) only: the home, download, licence, community, driver, and program pages. The repository was not opened. Current stable release: 3.13.3, dated "2026-08-18" on the download page; the home page names it only as the "August 2026" release. The licence is MIT-style, with some files under other non-copyleft licences. The docs are the stable branch and are not pinned to a version.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 10](../third-pass/batch-10/README.md#gdal) and reflected in the [application page](../../content/directory/gdal.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: An upstream GeoPackage 1.4 fixture opened with the available SQLite library independently of GDAL, passed integrity_check, and exposed 10 poly features, its attribute schema, POLYGON geometry-column metadata and EPSG:27700 SRS records. Geometry coordinates were not decoded and no conversion round trip was run.
- [x] Resolved: The PAM implementation explicitly loads/saves .aux.xml alongside the dataset, or in a configured proxy directory, for metadata unsupported by the driver format. Copying only a raster can therefore omit separately stored metadata; the dataset's file list is a better preservation boundary than its main filename alone.

Remaining: Driver-specific lossy conversion, geometry fidelity, actual overwrite behavior, sidecar-removal comparison and cross-version compatibility remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- GDAL is a translation layer over other formats, so it has no storage format of its own. Each dataset sits in a format handled by a driver, and the driver pages are the reference. [home](https://gdal.org/en/stable/)
- GeoPackage is described as an OGC standard that "uses a SQLite database file as a generic container", so it is readable by SQLite tools. [GPKG driver](https://gdal.org/en/stable/drivers/vector/gpkg.html)
- GeoTIFF: GDAL reads most variants and writes fewer. Sparse files "cannot" be read by most non-GDAL packages (paraphrased), and `PROFILE=BASELINE` writes no GDAL or GeoTIFF tags for strict readers. [GTiff driver](https://gdal.org/en/stable/drivers/raster/gtiff.html)
- Some metadata lives in an `.aux.xml` sidecar (PAM), including nodata under some profiles and raster attribute tables. The sidecar must travel with the data. [GTiff driver](https://gdal.org/en/stable/drivers/raster/gtiff.html)

**Exit and migration (E2)**
- `gdal_translate` can drop parts of the source: `-norat`, `-nogcp`, `-noxmp`, and metadata copying in AUTO mode copies only "safe" domains. [gdal_translate](https://gdal.org/en/stable/programs/gdal_translate.html)
- `-strict` makes a non-exact data type conversion fail, and the behaviour depends on the driver. The page shows an error for Int16 data into WEBP. Without `-strict`, the page does not say whether a warning is given. [gdal_translate](https://gdal.org/en/stable/programs/gdal_translate.html)
- For vector data, CSV "does not preserve geometries" on creation by default, so `-lco GEOMETRY=AS_XYZ` or similar is needed. Field-type options are an "afterwards conversion". [ogr2ogr](https://gdal.org/en/stable/programs/ogr2ogr.html)
- Palette TIFFs: alpha "will be silently discarded". [GTiff driver](https://gdal.org/en/stable/drivers/raster/gtiff.html)

**Recovery (E3)**
- GDAL holds no data of its own, so backup and recovery of the data are not covered; they depend on the chosen format. Not found in the docs.
- GeoPackage defaults to version 1.4 from GDAL 3.11 (1.2 before). Compatibility between versions is not discussed on the page. [GPKG driver](https://gdal.org/en/stable/drivers/vector/gpkg.html)
- WAL-mode GeoPackages need specific open options on read-only storage. Corruption notes are under Consequential operations. [GPKG driver](https://gdal.org/en/stable/drivers/vector/gpkg.html)
- `GTIFF_IGNORE_READ_ERRORS` can read partly corrupted TIFFs but "can hide problems" (paraphrased). [GTiff driver](https://gdal.org/en/stable/drivers/raster/gtiff.html)

**Continuing authority (E4) and dependencies**
- Maintenance: only the branch of the latest release is maintained, older branches get no fixes, and bugfix releases come "roughly every 2 months". [download](https://gdal.org/en/stable/download.html)
- Governance: an OSGeo founding project since 2006, run by a Project Steering Committee with 11 members and a chair. The page records past retirements and names no succession plan or funding. [community](https://gdal.org/en/stable/community/index.html)
- The older RFC 1 text names Frank Warmerdam as initial chair and requires OSGeo board approval for a new chair. This is a historical document. [RFC 1](https://gdal.org/en/stable/development/rfc/rfc1_pmc.html)
- Licence: MIT-style, but a build can include dependencies under "LGPL, GPL or proprietary" terms, and users must check this themselves. [licence](https://gdal.org/en/stable/license.html)
- Network: remote files over HTTP and S3 are optional uses. Default-on settings include HEAD requests and netrc use, and the User-Agent defaults to "GDAL/x.y.z". Telemetry and update checks were not mentioned on the first 100,000 characters of the config page; the last 46,000 were not read. [config options](https://gdal.org/en/stable/user/configoptions.html)
- Accounts: not found in the docs.

**Consequential operations (E5)**
- `ogr2ogr -overwrite` deletes the output layer and recreates it empty; `-append` and `-update` modify existing layers; `-skipfailures` continues past failed features. Behaviour of `-f GPKG` when the output file already exists is not on that page. [ogr2ogr](https://gdal.org/en/stable/programs/ogr2ogr.html)
- `gdal_translate` does not describe overwrite behaviour. The text on `APPEND_SUBDATASET` implies an existing dataset is destroyed by default (inferred, not stated). [gdal_translate](https://gdal.org/en/stable/programs/gdal_translate.html)
- GeoPackage with the OGR VFS option: "no file locking will occur", so concurrent edits "may lead to database corruption" (paraphrased). [GPKG driver](https://gdal.org/en/stable/drivers/vector/gpkg.html)
- TIFF in update mode: overviews are not refreshed automatically, a COG opened in update mode is rejected by default, and `SPARSE_OK` writes can replace block content with 0 or nodata. [GTiff driver](https://gdal.org/en/stable/drivers/raster/gtiff.html)
- Undo and history: not applicable to command-line tools and not found in the docs.

## Gaps to test or read next
1. Round trip a synthetic GeoPackage (layers, CRS, attributes, null values, a long text field) to Shapefile, GeoJSON, and CSV and back with `ogr2ogr`; diff schema, CRS, field types, and feature counts with `ogrinfo -so`.
2. Convert a synthetic GeoTIFF (nodata, scale/offset, band descriptions, metadata domains) to PNG, JPEG, and a baseline TIFF; compare `gdalinfo` before and after, with and without `-strict`, and check whether a warning appears when information is dropped.
3. Run `ogr2ogr -f GPKG` onto an existing file with and without `-overwrite`, `-append`, `-update`, and check whether anything is removed silently.
4. Copy a GeoTIFF without its `.aux.xml` and compare nodata and attribute tables.
5. Open a GeoPackage written with `VERSION=1.4` in an older GDAL and in plain SQLite.
6. Run with the network disabled and observe connections for local-file operations (telemetry and update checks not found in the docs).
7. Not read: the remaining 46,000 characters of the config options page, the NEWS file, the repository README and LICENSE.TXT, the driver list, and any backward-compatibility policy (the dev practices page did not cover one).

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-10/README.md#gdal); [actual assessment](../../content/directory/gdal.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. An independent GeoPackage read exposes attributes, feature counts, geometry metadata and SRS records, but geometry coordinates were not decoded or reconstructed. PAM sidecars/proxy metadata and driver-specific fidelity remain essential boundaries; main-file access is not complete geospatial recovery.
- E5: Not Verified. Strict/options documentation makes some transformations explicit, but effective caller overwrite authority, lossy conversion warnings, sidecar handling and usable correction are not established across the assessed drivers/datasets. Inspectable options alone do not prove the required oversight.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish preservation of essential geometry, CRS, sidecar and driver metadata in an alternative workflow. Format breadth and one readable GeoPackage schema do not complete that migration comparison.

Remaining: Driver-specific lossy conversion, geometry fidelity, actual overwrite behavior, sidecar-removal comparison and cross-version compatibility remain untested. E5 needs driver/caller-specific overwrite and loss decisions, retained transformation parameters and available correction.

Next without a local installation: Acquire representative dataset/file-list/sidecar packets with expected coordinates, CRS, metadata and nodata semantics; compare independent readers and same-version conversion/overwrite observations.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

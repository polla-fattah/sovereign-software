# Third pass, batch 10

Reviewed 23 October 2026, Asia/Baghdad. 12 bounded questions are resolved across 6 applications. All findings are copied into the actual application pages; broader unknowns remain open.

## Method and reproduction

Run from the repository root:

```powershell
python evidence/third-pass/inspect_remaining.py 10
```

[inspection-plan.json](inspection-plan.json) identifies pinned source revisions and inputs. [artifact-results.json](artifact-results.json) records retained-file SHA-256 hashes, Git-object checks where available, observed structures, source locations and environment. Downloaded application implementation code is not imported or run. Published schema DDL, when explicitly identified, is instantiated in SQLite; document code blocks are not evaluated. Archives are inspected in memory; historical samples retain their historical scope. Source-anchor matches locate reviewed code, not successful application tests or CI runs. No target application was installed. Any use of an already available runtime is identified explicitly in the findings and result record; source inspection is not reported as an application run. Upstream licensing and copyright continue to apply to the retained files.

At the user's request, existing eligibility and principle ratings are preserved exactly. E3/E5 decisions, principle reconciliation and invalid/blank-status corrections are deferred to the next pass. A resolved sub-question does not establish whole-application compliance.

<a id="gdal"></a>

## GDAL

- [x] Resolved: An upstream GeoPackage 1.4 fixture opened with the available SQLite library independently of GDAL, passed integrity_check, and exposed 10 poly features, its attribute schema, POLYGON geometry-column metadata and EPSG:27700 SRS records. Geometry coordinates were not decoded and no conversion round trip was run. [Inspected source/input](https://github.com/OSGeo/gdal/blob/0e24e0288164b5237df0aeb82ab742909e719479/autotest/ogr/data/gpkg/poly_golden_gpkg_1_4.gpkg).
- [x] Resolved: The PAM implementation explicitly loads/saves .aux.xml alongside the dataset, or in a configured proxy directory, for metadata unsupported by the driver format. Copying only a raster can therefore omit separately stored metadata; the dataset's file list is a better preservation boundary than its main filename alone. [Inspected source/input](https://github.com/OSGeo/gdal/blob/0e24e0288164b5237df0aeb82ab742909e719479/gcore/gdalpamdataset.cpp).

Remaining: Driver-specific lossy conversion, geometry fidelity, actual overwrite behavior, sidecar-removal comparison and cross-version compatibility remain untested.

<a id="grass-gis"></a>

## GRASS GIS

- [x] Resolved: The native vector pack implementation archives map files, copies connected attribute tables into db.sqlite via db.copy, and includes projection support files. The separately inspected raster pack collects cats/cell/cellhd/cell_misc/colr/fcell/hist and CRS support. Native packs preserve structures that a geometry-only export need not carry; this is not a successful unpack trial. [Inspected source/input](https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/scripts/v.pack/v.pack.py).
- [x] Resolved: The removal loop prints matched mapset elements and continues without deletion unless force (-f) is set; the implementation explicitly warns that nothing was removed. With force it calls M_do_remove. This establishes a concrete preview/deletion branch, not an automatic recovery guarantee. [Inspected source/input](https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/general/g.remove/main.c).

Remaining: Pack/unpack equivalence, external database dependencies, raster/null/category fidelity, older-version opening and interrupted-write recovery remain untested.

<a id="r-project"></a>

## R

- [x] Resolved: The serializer writes distinct version-2/version-3 headers with writer/minimum-reader versions; the minimum values in the inspected source are R 2.3.0 and R 3.5.0 respectively, and version 3 also records native encoding. These format-level bounds do not guarantee every object/package class will reconstruct on an older R. [Inspected source/input](https://github.com/r-devel/r-svn/blob/c267ebb7f9720154535e63642c25a5d91d5f512d/src/main/serialize.c).
- [x] Resolved: The full readRDS documentation explains that infoRDS reports representation/reader metadata but cannot establish file validity, and explicitly cautions against treating bare RDS as a machine-interchange format. Native-endian serialization and newer compression introduce additional dependencies; cross-tool and CSV preservation remain separate questions. [Inspected source/input](https://github.com/r-devel/r-svn/blob/c267ebb7f9720154535e63642c25a5d91d5f512d/src/library/base/man/readRDS.Rd).

Remaining: Factor/date/attribute/NA round trips, a non-R reader, older-release trials, package-library upgrades and workspace overwrite recovery remain untested.

<a id="gnu-pspp"></a>

## GNU PSPP

- [x] Resolved: The official CSV specification distinguishes VALUES from LABELS output, documents print-format trimming and writes numeric system-missing values as a space. Together with MISSING=RECODE, this can collapse missing-value distinctions; a CSV is not demonstrated to preserve the native dictionary. This is a documented format conclusion, not a conversion experiment. [Inspected source/input](https://www.gnu.org/software/pspp/manual/html_node/SAVE-TRANSLATE-_002fTYPE_003dCSV-and-TYPE_003dTAB.html).
- [x] Resolved: The official SAVE TRANSLATE specification refuses existing-file overwrite by default and requires REPLACE; MISSING=RECODE, DROP/KEEP and UNSELECTED change the exported representation/case scope. These explicit controls resolve their documented semantics, not proof of an executed safeguard. [Inspected source/input](https://www.gnu.org/software/pspp/manual/html_node/SAVE-TRANSLATE.html).

Remaining: Native SAV/POR compression compatibility, independent-reader comparisons, dictionary round trips, transformation reversibility and crash recovery remain untested. Savannah source-file retrieval failed; dated retained official manual pages are used instead.

<a id="kolibri"></a>

## Kolibri

- [x] Resolved: The dbrestore command explicitly limits its intended use to restoring the same device, not cross-device replication; --latest selects the current major/minor version's backup and the command refuses a running Kolibri instance. This answers the scope of that recovery route without claiming a restore succeeded. [Inspected source/input](https://github.com/learningequality/kolibri/blob/303e3baea3e0df85b797111af8ca4d89e7fbbe92/kolibri/core/deviceadmin/management/commands/dbrestore.py).
- [x] Resolved: Bulk import excludes retained users, facility administrators and the specified acting user from --delete, then calls hard_delete=True for remaining selected users. Database mutation is inside the not-dryrun branch, including clearing memberships of omitted classes. A CSV omission can therefore be consequential, not merely an update. [Inspected source/input](https://github.com/learningequality/kolibri/blob/303e3baea3e0df85b797111af8ca4d89e7fbbe92/kolibri/core/auth/management/commands/bulkimportusers.py).

Remaining: Actual backup restoration/content coverage, cross-device migration, user/log export completeness, downgrade behavior and runtime deletion/traffic observations remain untested.

<a id="moodle"></a>

## Moodle

- [x] Resolved: The backup task conditionally generates users.xml when user inclusion or kept roles require it, and conditionally includes user files depending also on anonymization. It separately writes files.xml and moodle_backup.xml before packaging. A course backup's user/file coverage is therefore settings-dependent, not equivalent to a complete site backup. [Inspected source/input](https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/moodle2/backup_final_task.class.php).
- [x] Resolved: The restore precheck code treats a backup from a newer Moodle as a warning, not by itself a blocking error; an excessively old backup format is an error. Cross-site user restoration also branches on user-creation permission. This corrects an overbroad assumption that every downgrade attempt is automatically refused. [Inspected source/input](https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/util/helper/restore_prechecks_helper.class.php).

Remaining: Real course/site restore comparisons, student submissions/grade coverage, deleting-target recovery, plugin dependencies and version-specific migrations remain untested.


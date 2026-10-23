# Rating reconciliation, batch 10

Reviewed 24 October 2026. Each application below was evaluated individually against its existing essential-record and version scope. No target application was installed, built or run.

## Outcome

All 6 retain **Insufficient evidence**. E3/E5 remain **Not Verified** for the specific missing coverage below, not automatically Pass from documentation and not Fail from missing evidence. Positive dependent principles lacking their minimum are corrected. Existing E1/E4/Locality findings are not re-certified by this targeted pass.

[Plan](plan.json), [individual decisions and change ledger](decisions.json), [directory-wide review sequence](../remaining-plan.json), [current application index](../../application-index.md).

0 additional bounded source questions are resolved in this batch. Earlier resolved questions remain resolved and are not counted again. Source locators are provenance aids, not executed-behavior assertions.

<a id="gdal"></a>

## GDAL

Version/scope: Pinned evidence 0e24e0288164b5237df0aeb82ab742909e719479.

**E3: Not Verified.** An independent GeoPackage read exposes attributes, feature counts, geometry metadata and SRS records, but geometry coordinates were not decoded or reconstructed. PAM sidecars/proxy metadata and driver-specific fidelity remain essential boundaries; main-file access is not complete geospatial recovery. [Source context](https://github.com/OSGeo/gdal/blob/0e24e0288164b5237df0aeb82ab742909e719479/autotest/ogr/data/gpkg/poly_golden_gpkg_1_4.gpkg).

**E5: Not Verified.** Strict/options documentation makes some transformations explicit, but effective caller overwrite authority, lossy conversion warnings, sidecar handling and usable correction are not established across the assessed drivers/datasets. Inspectable options alone do not prove the required oversight. [Source context](https://gdal.org/en/stable/programs/gdal_translate.html).

**E2 correction:** The former E2 Pass does not establish preservation of essential geometry, CRS, sidecar and driver metadata in an alternative workflow. Format breadth and one readable GeoPackage schema do not complete that migration comparison. [Source context](https://gdal.org/en/stable/programs/gdal_translate.html).

**Remaining:** Driver-specific lossy conversion, geometry fidelity, actual overwrite behavior, sidecar-removal comparison and cross-version compatibility remain untested. E5 needs driver/caller-specific overwrite and loss decisions, retained transformation parameters and available correction.

**Next without a local installation:** Acquire representative dataset/file-list/sidecar packets with expected coordinates, CRS, metadata and nodata semantics; compare independent readers and same-version conversion/overwrite observations.

[Actual assessment](../../../content/directory/gdal.md) | [review note](../../doc-reviews/gdal.md).

<a id="grass-gis"></a>

## GRASS GIS

Version/scope: Pinned evidence 09ad2796fff4fdfc2a3bee8446868f8be3076db4.

**E3: Not Verified.** Vector/raster pack source identifies native maps, attribute SQLite data and projection support, but no complete pack was independently unpacked and compared. External database dependencies and null/category/projection meaning remain unestablished for the native project/mapset. [Source context](https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/scripts/v.pack/v.pack.py).

**E5: Not Verified.** g.remove previews matches and requires force for the inspected deletion branch. That is a concrete bounded safeguard, not full evidence for overwrite/import/processing authority, mapset permissions or recourse after removed maps and interrupted writes. [Source context](https://github.com/OSGeo/grass/blob/09ad2796fff4fdfc2a3bee8446868f8be3076db4/general/g.remove/main.c).

**Remaining:** Pack/unpack equivalence, external database dependencies, raster/null/category fidelity, older-version opening and interrupted-write recovery remain untested. E5 needs mapset/processing/overwrite authority, effective removal scope and appropriate independent backup/restore boundaries.

**Next without a local installation:** Inspect synthetic native raster/vector packs, external DB references and expected attributes/CRS/null/category records; seek independent unpack comparisons and version-matched preview/remove/overwrite recovery evidence.

[Actual assessment](../../../content/directory/grass-gis.md) | [review note](../../doc-reviews/grass-gis.md).

<a id="r-project"></a>

## R

Version/scope: Pinned evidence c267ebb7f9720154535e63642c25a5d91d5f512d.

**E3: Not Verified.** Serialization headers specify representation/version/encoding bounds but do not recover every object/package class. No factor/date/attribute/NA-preserving independent reconstruction with a complete package/source/data environment has been recorded; bare RDS compatibility metadata is not file validity or whole-workflow recovery. [Source context](https://github.com/r-devel/r-svn/blob/c267ebb7f9720154535e63642c25a5d91d5f512d/src/main/serialize.c).

**E5: Not Verified.** Model accuracy alone is not E5. The current evidence does not establish effective script/package execution authority, workspace/file overwrite decisions, inspectable transformation state or available correction of consequential data/model changes. [Source context](https://rstudio.github.io/renv/articles/renv).

**Remaining:** Factor/date/attribute/NA round trips, a non-R reader, older-release trials, package-library upgrades and workspace overwrite recovery remain untested. E5 needs script/package and workspace-write authority, visible transformation parameters/state and correction boundaries.

**Next without a local installation:** Use synthetic scripts/data/serialization and package-lock/source manifests with expected types, missingness and results; compare independent readers or externally reproduced outputs and same-version execution/overwrite controls.

[Actual assessment](../../../content/directory/r-project.md) | [review note](../../doc-reviews/r-project.md).

<a id="gnu-pspp"></a>

## GNU PSPP

Version/scope: Pinned evidence retrieved 2026-10-23.

**E3: Not Verified.** The retained official specification exposes CSV label/value, missingness and case-selection loss boundaries, not native dictionary recovery. SAV/POR compression, labels/missing distinctions and independent-reader reconstruction have not been compared. Dated manual evidence is retained despite failed source retrieval. [Source context](https://www.gnu.org/software/pspp/manual/html_node/SAVE-TRANSLATE-_002fTYPE_003dCSV-and-TYPE_003dTAB.html).

**E5: Not Verified.** SAVE TRANSLATE documents default overwrite refusal and explicit REPLACE, plus options that change scope/meaning. These controls are positive but do not comprehensively cover syntax transformations, effective output selection, reversal and crash recovery in the original statistical workflow. [Source context](https://www.gnu.org/software/pspp/manual/html_node/SAVE-TRANSLATE.html).

**E2 correction:** The former E2 Pass does not establish a usable independent statistical workflow preserving native dictionary, labels and missing-value distinctions. The inspected CSV route can collapse those distinctions; alternative native routes remain unverified rather than failed. [Source context](https://www.gnu.org/software/pspp/manual/pspp.html).

**Remaining:** Native SAV/POR compression compatibility, independent-reader comparisons, dictionary round trips, transformation reversibility and crash recovery remain untested. Savannah source-file retrieval failed; dated retained official manual pages are used instead. E5 needs effective transformation/save scope, output overwrite review and recoverable source/dictionary states; documented REPLACE is not a full executed safeguard.

**Next without a local installation:** Inspect representative synthetic SAV/POR and CSV pairs with expected dictionary/labels/missingness, and seek independent-reader plus same-version syntax/overwrite/recovery records.

[Actual assessment](../../../content/directory/gnu-pspp.md) | [review note](../../doc-reviews/gnu-pspp.md).

<a id="kolibri"></a>

## Kolibri

Version/scope: Pinned evidence 303e3baea3e0df85b797111af8ca4d89e7fbbe92.

**E3: Not Verified.** The inspected dbrestore route is for the same device, selects version-bounded backups and refuses a running instance. It does not demonstrate cross-device restoration of content, user/progress/log data or complete backup coverage for the existing learning profile. [Source context](https://github.com/learningequality/kolibri/blob/303e3baea3e0df85b797111af8ca4d89e7fbbe92/kolibri/core/deviceadmin/management/commands/dbrestore.py).

**E5: Not Verified.** Bulk import has dry-run mutation guards and exclusions for administrators/acting users, but can hard-delete omitted selected users and clear memberships. Effective role authorization, content/progress deletion visibility and recovery are not comprehensively established by that command alone. [Source context](https://github.com/learningequality/kolibri/blob/303e3baea3e0df85b797111af8ca4d89e7fbbe92/kolibri/core/auth/management/commands/bulkimportusers.py).

**E2 correction:** The former E2 Pass covers a content-transfer lead, not preservation of essential learner identity, progress and logs in a replacement workflow. Complete cross-device/user-data migration remains unestablished. [Source context](https://kolibri.readthedocs.io/_/downloads/en/latest/pdf/).

**Remaining:** Actual backup restoration/content coverage, cross-device migration, user/log export completeness, downgrade behavior and runtime deletion/traffic observations remain untested. E5 needs effective importer/role settings, omission-driven deletion and progress/content recourse beyond one dry-run guard.

**Next without a local installation:** Use a synthetic content/channel/user-progress/device backup packet with expected identities/logs and version boundaries; inspect exports and obtain same-version external restore/bulk-import/deletion records.

[Actual assessment](../../../content/directory/kolibri.md) | [review note](../../doc-reviews/kolibri.md).

<a id="moodle"></a>

## Moodle (self-hosted)

Version/scope: Pinned evidence 46c042e7da65f8cb2ec7dc19f46566ce61a393e1.

**E3: Not Verified.** Course backup source conditionally includes users/files and writes several manifests, so a course package is not automatically a full site archive. Complete student submissions, grades, plugin state, accounts and permissions have not been independently reconstructed and compared. [Source context](https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/moodle2/backup_final_task.class.php).

**E5: Not Verified.** Restore prechecks distinguish warnings/errors and permission-dependent user creation. They do not establish full target-deletion, grading/workflow mutation, role authority and correction/recourse across the declared course/site configuration. [Source context](https://github.com/moodle/moodle/blob/46c042e7da65f8cb2ec7dc19f46566ce61a393e1/public/backup/util/helper/restore_prechecks_helper.class.php).

**Remaining:** Real course/site restore comparisons, student submissions/grade coverage, deleting-target recovery, plugin dependencies and version-specific migrations remain untested. E5 needs role- and target-aware restore/delete/grading authority, inspectable mutations and available correction for student/course records.

**Next without a local installation:** Inspect synthetic course/site manifests and files with expected submissions, grades, roles and plugin dependencies; obtain same-version external restore/permission/deletion comparisons. Do not use real student data.

[Actual assessment](../../../content/directory/moodle.md) | [review note](../../doc-reviews/moodle.md).

## Validation boundary

The shared rating audit checks recorded fields, decision evidence and review notes. Historical schema-repair and evidence baselines remain available. Source/fixture hashes, navigation and the complete set of updated pages are checked by the final repository validation; no per-product clean restore or upstream test run is implied.

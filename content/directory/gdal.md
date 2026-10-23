+++
title = "GDAL"
category = "Scientific Computing & GIS"
summary = "Library and command-line tools for reading, converting, and inspecting raster and vector geospatial data."
substrate = "Open geospatial formats through a translation library"
sync_model = "Local command-line tools"
extract_cmd = "ogrinfo -so data.gpkg"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Driver-specific lossy conversion, geometry fidelity, actual overwrite behavior, sidecar-removal comparison and cross-version compatibility remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence 0e24e0288164b5237df0aeb82ab742909e719479"
assessment_notes = "Individually reconciled in rating batch 10 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "The PAM implementation explicitly loads/saves .aux.xml alongside the dataset, or in a configured proxy directory, for metadata unsupported by the driver format. Copying only a raster can therefore omit separately stored metadata; the dataset's file list is a better preservation boundary than its main filename alone."
url = "https://github.com/OSGeo/gdal/blob/0e24e0288164b5237df0aeb82ab742909e719479/gcore/gdalpamdataset.cpp"
confidence = "medium"

[[evidence]]
target = "E2"
text = "GDAL translates among many documented formats, but driver-specific metadata and loss behavior must be checked for each dataset."
url = "https://gdal.org/en/stable/programs/gdal_translate.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "An upstream GeoPackage 1.4 fixture opened with the available SQLite library independently of GDAL, passed integrity_check, and exposed 10 poly features, its attribute schema, POLYGON geometry-column metadata and EPSG:27700 SRS records. Geometry coordinates were not decoded and no conversion round trip was run."
url = "https://github.com/OSGeo/gdal/blob/0e24e0288164b5237df0aeb82ab742909e719479/autotest/ogr/data/gpkg/poly_golden_gpkg_1_4.gpkg"
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
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for GDAL does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://gdal.org/en/stable/programs/gdal_translate.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for GDAL's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/OSGeo/gdal/blob/0e24e0288164b5237df0aeb82ab742909e719479/autotest/ogr/data/gpkg/poly_golden_gpkg_1_4.gpkg"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core operations are local command-line or library calls."
url = "https://gdal.org/en/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://gdal.org/en/stable/programs/gdal_translate.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "An independent GeoPackage read exposes attributes, feature counts, geometry metadata and SRS records, but geometry coordinates were not decoded or reconstructed. PAM sidecars/proxy metadata and driver-specific fidelity remain essential boundaries; main-file access is not complete geospatial recovery."
url = "https://github.com/OSGeo/gdal/blob/0e24e0288164b5237df0aeb82ab742909e719479/autotest/ogr/data/gpkg/poly_golden_gpkg_1_4.gpkg"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Strict/options documentation makes some transformations explicit, but effective caller overwrite authority, lossy conversion warnings, sidecar handling and usable correction are not established across the assessed drivers/datasets. Inspectable options alone do not prove the required oversight."
url = "https://gdal.org/en/stable/programs/gdal_translate.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish preservation of essential geometry, CRS, sidecar and driver metadata in an alternative workflow. Format breadth and one readable GeoPackage schema do not complete that migration comparison."
url = "https://gdal.org/en/stable/programs/gdal_translate.html"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: An upstream GeoPackage 1.4 fixture opened with the available SQLite library independently of GDAL, passed integrity_check, and exposed 10 poly features, its attribute schema, POLYGON geometry-column metadata and EPSG:27700 SRS records. Geometry coordinates were not decoded and no conversion round trip was run. [Source](https://github.com/OSGeo/gdal/blob/0e24e0288164b5237df0aeb82ab742909e719479/autotest/ogr/data/gpkg/poly_golden_gpkg_1_4.gpkg).
- [x] Resolved: The PAM implementation explicitly loads/saves .aux.xml alongside the dataset, or in a configured proxy directory, for metadata unsupported by the driver format. Copying only a raster can therefore omit separately stored metadata; the dataset's file list is a better preservation boundary than its main filename alone. [Source](https://github.com/OSGeo/gdal/blob/0e24e0288164b5237df0aeb82ab742909e719479/gcore/gdalpamdataset.cpp).
- [ ] Open: Driver-specific lossy conversion, geometry fidelity, actual overwrite behavior, sidecar-removal comparison and cross-version compatibility remain untested. E5 needs driver/caller-specific overwrite and loss decisions, retained transformation parameters and available correction.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-10/.

**Human-readable criteria:** Can an independent party reproduce the analysis from preserved data, code, units, dependencies, and provenance, and exchange results without hidden loss?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Driver-specific lossy conversion, geometry fidelity, actual overwrite behavior, sidecar-removal comparison and cross-version compatibility remain untested. E5 needs driver/caller-specific overwrite and loss decisions, retained transformation parameters and available correction.

**Next without installing locally:** Acquire representative dataset/file-list/sidecar packets with expected coordinates, CRS, metadata and nodata semantics; compare independent readers and same-version conversion/overwrite observations.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-10/`. Overall: **Insufficient evidence**.

+++
title = "Darktable"
category = "Media & Creative"
summary = "Non-destructive raw photography workflow that leaves original files unchanged and stores edits in XMP sidecar files and a library database."
substrate = "Immutable RAW + ISO Standard .xmp Sidecars"
sync_model = "Local Disk Hierarchy"
extract_cmd = "darktable-cli image.RAW image.RAW.xmp export.jpg"
limitations = ["XMP parameters contain versioned module-specific binary data. Decoding their bytes does not reproduce the image or preserve every database-only library field."]
pilot_stage = 4
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit 6556cd7dbb0e69f95d165dda8b69e7270c327f6d; XMP benchmark fixture and parameter encoder/decoder inspected; no image rendering"
assessment_notes = "Individually reconciled in rating batch 5 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Resolved: standard XML parsing of the retained darktable-bench-4.2.xmp fixture exposed 69 history entries with operation names and module versions. The fixture contains inspectable edit structure beyond a preview; the result is scoped to this historical sidecar."
url = "https://github.com/darktable-org/darktable/blob/6556cd7dbb0e69f95d165dda8b69e7270c327f6d/src/tests/benchmark/darktable-bench-4.2.xmp"
confidence = "high"

[[evidence]]
target = "E2"
text = "Rendered exports are interoperable, but complete migration of non-destructive edit history and library organization was not tested."
url = "https://docs.darktable.org/usermanual/development/en/overview/workflow/export/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Resolved: the pinned source specifies hex encoding or a gz prefix plus a two-digit compression factor and Base64/zlib payload. Standard Python decoded and hashed 160 parameter/mask blocks, including 95 compressed blocks. Module semantics, image reproduction, and complete library recovery remain unverified."
url = "https://github.com/darktable-org/darktable/blob/6556cd7dbb0e69f95d165dda8b69e7270c327f6d/src/common/exif.cc#L3649-L3785"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Editing and export are local operations, although multi-computer use requires deliberate file and version management."
url = "https://docs.darktable.org/usermanual/development/en/special-topics/multiple-computers/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The sidecar model makes edit history inspectable, but database precedence, overwrite behavior, and conflict handling require testing."
url = "https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Darktable does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/darktable-org/darktable/blob/6556cd7dbb0e69f95d165dda8b69e7270c327f6d/src/common/exif.cc#L3649-L3785"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Darktable's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/darktable-org/darktable/blob/6556cd7dbb0e69f95d165dda8b69e7270c327f6d/src/common/exif.cc#L3649-L3785"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The workflow is local and does not require a hosted image service."
url = "https://docs.darktable.org/usermanual/development/en/overview/workflow/export/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The historical XMP history and 160 decoded parameter/mask blocks are independently inspectable, but module-version semantics and equivalent image reconstruction were not recovered. Original images, library organization, database/sidecar precedence and DTDATA-dependent meaning remain outside the observed fixture coverage."
url = "https://github.com/darktable-org/darktable/blob/6556cd7dbb0e69f95d165dda8b69e7270c327f6d/src/common/exif.cc#L3649-L3785"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Inspectable non-destructive history is positive evidence, but it does not establish effective sidecar/database conflict precedence, original/export overwrite protection, deletion authority or available correction across the library and editing workflow."
url = "https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/"
confidence = "medium"

+++

**Verification scenario:** Rebuild edits from RAW plus XMP and database data on a clean machine; test duplicates, tags, sorting, and sidecar settings.

**What may invalidate an overconfident claim:** Sidecars do not necessarily preserve all library metadata; originals are typically unmodified.

**Documentation starting point:** <https://docs.darktable.org/usermanual/development/en/overview/sidecar-files/sidecar/>

**Assessment update, 23 October 2026:**

- [x] Resolved: The actual XMP fixture exposes 69 history entries, operation names, and module versions without darktable.
- [x] Resolved: The parameter encoding is available and decodable: 160 parameter/mask blocks, including 95 compressed blocks, were decoded and hashed.
- [ ] Open: Module-specific semantics, image render equivalence, DTDATA, complete library organization, and database/version recovery. E5 needs database/sidecar conflict policy, deletion/export overwrite safeguards and usable correction records.

**Assessment:** Independent inspection establishes structural and byte-level access to the selected sidecar. It does not establish equivalent editing in another application or a full library restore. The overall determination remains **Insufficient evidence**.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Module-specific semantics, image render equivalence, DTDATA, complete library organization, and database/version recovery. E5 needs database/sidecar conflict policy, deletion/export overwrite safeguards and usable correction records.

**Next without installing locally:** Acquire a synthetic RAW/sidecar/library packet with expected module/history/organization and reference renders; compare records with existing parsers and obtain matching primary-source or external deletion/overwrite/conflict evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-5/`. Overall: **Insufficient evidence**.

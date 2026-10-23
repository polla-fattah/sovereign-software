+++
title = "KOReader"
category = "Research & Education"
summary = "Document reader for e-readers and other devices that opens open e-book and document formats."
substrate = "Reads open formats; reading state in per-book sidecar files"
sync_model = "Local device files with optional sync plugins"
extract_cmd = "cat book.sdr/metadata.epub.lua"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Actual cross-device/hash-mode migration, annotation-field comparisons across export formats, PDF checksum changes, release compatibility and backup restoration remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence afff28b107a7ea4ab5867b5e65dd054987ca1d99"
assessment_notes = "Individually reconciled in rating batch 11 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "KOReader stores reading progress, highlights, bookmarks, and notes in sidecar metadata folders alongside books or in configured locations."
url = "https://github.com/koreader/koreader/blob/master/frontend/ui/elements/common_settings_menu_table.lua"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Sidecar metadata can travel with the book and ordinary documents remain independently usable, but complete migration of every setting and plugin state was not tested."
url = "https://github.com/koreader/koreader/blob/master/frontend/ui/elements/common_settings_menu_table.lua"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Sidecars are located beside the book, under a separate document-settings tree, or in a partial-MD5-based hashed tree, and use metadata.<suffix>.lua names. The inspected JSON exporter copies each supplied entry's first record plus selected book fields, not the entire sidecar/settings object. Book-only copying and highlight export are therefore distinct recovery scopes."
url = "https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Reading and metadata storage can be performed on local devices and files without a hosted account."
url = "https://github.com/koreader/koreader"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Sidecar loading actually invokes dofile inside pcall; error-catching is not a sandbox for arbitrary Lua code. Writing serializes settings and maintains a .old backup before replacement, with candidate priority rules. Recovery should inspect untrusted sidecars without executing them; no generic Lua execution was performed in this review."
url = "https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for KOReader does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for KOReader's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core reader works locally and does not require a provider account."
url = "https://github.com/koreader/koreader"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Sidecar location varies by adjacent, separate-tree and hashed modes, and the inspected highlight JSON export is not the whole sidecar/settings object. No complete cross-device metadata/annotation reconstruction with checksum/path changes and compatible releases is established."
url = "https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Sidecar loading calls Lua dofile inside error-catching, which is not sandboxing; source also defines replacement/old-backup priorities. Effective trust of imported sidecars, write/backup policy and usable recourse after metadata migration remain insufficiently established."
url = "https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: Sidecars are located beside the book, under a separate document-settings tree, or in a partial-MD5-based hashed tree, and use metadata.<suffix>.lua names. The inspected JSON exporter copies each supplied entry's first record plus selected book fields, not the entire sidecar/settings object. Book-only copying and highlight export are therefore distinct recovery scopes. [Source](https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua).
- [x] Resolved: Sidecar loading actually invokes dofile inside pcall; error-catching is not a sandbox for arbitrary Lua code. Writing serializes settings and maintains a .old backup before replacement, with candidate priority rules. Recovery should inspect untrusted sidecars without executing them; no generic Lua execution was performed in this review. [Source](https://github.com/koreader/koreader/blob/afff28b107a7ea4ab5867b5e65dd054987ca1d99/frontend/docsettings.lua).
- [ ] Open: Actual cross-device/hash-mode migration, annotation-field comparisons across export formats, PDF checksum changes, release compatibility and backup restoration remain untested. E5 needs safe sidecar trust/execution policy and effective backup/write/migration correction; data inspection must not execute untrusted Lua.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-11/.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Actual cross-device/hash-mode migration, annotation-field comparisons across export formats, PDF checksum changes, release compatibility and backup restoration remain untested. E5 needs safe sidecar trust/execution policy and effective backup/write/migration correction; data inspection must not execute untrusted Lua.

**Next without installing locally:** Inspect synthetic sidecars as text/data only, alongside book hashes and a location/migration manifest; obtain same-version external annotation/move/backup records without executing sidecar code.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-11/`. Overall: **Insufficient evidence**.

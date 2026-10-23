+++
title = "LibreOffice (ODF)"
category = "Knowledge & Office"
summary = "Full desktop office suite running 100% offline. Native files are standard zip containers holding documented XML (`content.xml`) extractable with basic POSIX unzip."
substrate = "ISO/IEC 26300 OpenDocument XML (.odt/.ods)"
sync_model = "Local Filesystem"
extract_cmd = "unzip -p document.odt content.xml | xmllint --format -"
limitations = ["Independent ODT annotation parsing is not complete office-document rendering or formula/macro recovery.","Backup replacement and transactional recovery paths are distinct; effective settings and failure outcomes remain unverified."]
pilot_stage = 2
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit 568bac1a5c057f8ec1f43f6d3dae1a9ad0509708"
assessment_notes = "Individually reconciled in rating batch 7 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "The published resolved-comment.odt opens as ZIP and its content.xml parses independently. It contains two office:annotation elements, two matching annotation-end elements, creator/date fields and document paragraphs/styles. This establishes accessible comment structures for this fixture, not correct rendering of resolved-comment state, tracked changes, spreadsheets, macros or password-protected documents."
url = "https://github.com/LibreOffice/core/blob/568bac1a5c057f8ec1f43f6d3dae1a9ad0509708/sw/qa/extras/odfexport/data/resolved-comment.odt"
confidence = "high"

[[evidence]]
target = "E2"
text = "It opens and saves Microsoft Office formats and exports to common interchange formats, though formatting loss is explicitly possible."
url = "https://help.libreoffice.org/latest/en-US/text/shared/guide/ms_user.html"
confidence = "high"

[[evidence]]
target = "E3"
text = "ODF is a ZIP package containing XML files and can be inspected independently, but complete feature round-trip across formats was not tested."
url = "https://help.libreoffice.org/latest/en-GB/text/shared/00/00000021.html"
confidence = "high"

[[evidence]]
target = "E4"
text = "Documents can be saved to local paths or user-selected network locations without requiring a hosted account."
url = "https://help.libreoffice.org/latest/en-US/text/shared/guide/doc_save.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "DoBackup_Impl first requires an existing source document and uses NameClash::OVERWRITE when transferring the backup; failure can set ERRCODE_SFX_CANTCREATEBACKUP. Internal transactional backups and a backup-restore error path also exist separately. A persistent backup is not necessarily an unlimited version history, and these branches do not establish crash durability or the user's configured backup/autorecovery policy."
url = "https://github.com/LibreOffice/core/blob/568bac1a5c057f8ec1f43f6d3dae1a9ad0509708/sfx2/source/doc/docfile.cxx"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for LibreOffice (ODF) does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://help.libreoffice.org/latest/en-US/text/shared/guide/ms_user.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for LibreOffice (ODF)'s existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/LibreOffice/core/blob/568bac1a5c057f8ec1f43f6d3dae1a9ad0509708/sw/qa/extras/odfexport/data/resolved-comment.odt"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The office workflow can run and store documents locally."
url = "https://help.libreoffice.org/latest/en-US/text/shared/guide/doc_save.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/LibreOffice/core/blob/568bac1a5c057f8ec1f43f6d3dae1a9ad0509708/sfx2/source/doc/docfile.cxx"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The ODT fixture independently exposes comments and XML structure, but not equivalent resolved-comment rendering, tracked changes, spreadsheet formulas/macros or encrypted document recovery. Complete version- and format-specific document semantics were not reconstructed for the original office profile."
url = "https://github.com/LibreOffice/core/blob/568bac1a5c057f8ec1f43f6d3dae1a9ad0509708/sw/qa/extras/odfexport/data/resolved-comment.odt"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Persistent and transactional backup paths, overwrite behavior and error handling are established in source, but do not prove configured retention or crash durability. Macro/external-link authorization, save/format-loss decisions and correction of consequential document changes remain insufficiently covered."
url = "https://github.com/LibreOffice/core/blob/568bac1a5c057f8ec1f43f6d3dae1a9ad0509708/sfx2/source/doc/docfile.cxx"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish usable migration of the full declared office records, including tracked changes, formulas, macros and structural meaning. Supported formats and acknowledged formatting loss are not a completed essential-feature comparison."
url = "https://help.libreoffice.org/latest/en-US/text/shared/guide/ms_user.html"
confidence = "medium"

+++

**Verification scenario:** Round-trip documents with tracked changes, formulas, comments, embedded objects, and scripts in an independent ODF reader.

**What may invalidate an overconfident claim:** Complex document fidelity varies; launch time and suite size are not sovereignty criteria.

**Documentation starting point:** <https://www.libreoffice.org/discover/what-is-opendocument/>

**Evidence update: 23 October 2026**

- [x] Resolved: The published resolved-comment.odt opens as ZIP and its content.xml parses independently. It contains two office:annotation elements, two matching annotation-end elements, creator/date fields and document paragraphs/styles. This establishes accessible comment structures for this fixture, not correct rendering of resolved-comment state, tracked changes, spreadsheets, macros or password-protected documents. [Source](https://github.com/LibreOffice/core/blob/568bac1a5c057f8ec1f43f6d3dae1a9ad0509708/sw/qa/extras/odfexport/data/resolved-comment.odt).
- [x] Resolved: DoBackup_Impl first requires an existing source document and uses NameClash::OVERWRITE when transferring the backup; failure can set ERRCODE_SFX_CANTCREATEBACKUP. Internal transactional backups and a backup-restore error path also exist separately. A persistent backup is not necessarily an unlimited version history, and these branches do not establish crash durability or the user's configured backup/autorecovery policy. [Source](https://github.com/LibreOffice/core/blob/568bac1a5c057f8ec1f43f6d3dae1a9ad0509708/sfx2/source/doc/docfile.cxx).
- [ ] Open: Current ODT/ODS/DOCX/XLSX comparisons including tracked changes/formulas/macros, encrypted-package inspection, actual repeated saves and crash recovery, older versions and external dependencies. E5 needs macro/external-link authority, format/overwrite decisions, effective backup/autorecovery and usable correction limits.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-6/.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Current ODT/ODS/DOCX/XLSX comparisons including tracked changes/formulas/macros, encrypted-package inspection, actual repeated saves and crash recovery, older versions and external dependencies. E5 needs macro/external-link authority, format/overwrite decisions, effective backup/autorecovery and usable correction limits.

**Next without installing locally:** Collect representative synthetic ODT/ODS/native-interchange pairs, encrypted test documents with non-secret credentials and semantic manifests; inspect packages and reuse same-version macro/link/save/recovery evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-7/`. Overall: **Insufficient evidence**.

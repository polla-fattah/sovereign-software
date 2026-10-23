+++
title = "Paperless-ngx"
category = "Knowledge & Office"
summary = "Document archive that stores original documents, archival derivatives and metadata, with a documented exporter."
substrate = "Original documents, archival derivatives and a relational database"
sync_model = "Self-Hosted Container / Local Filesystem"
extract_cmd = "document_exporter ../export --no-progress-bar"
limitations = ["Version mismatches warn and continue in the inspected importer; compatibility is not established.","The optional passphrase protects specified credential fields, not the document files or entire export.","Complete restore, OCR/relationship fidelity and destructive-workflow authorization remain unverified."]
pilot_stage = 2
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae; export manifest coverage, importer version checks and secret handling"
assessment_notes = "Individually reconciled in rating batch 4 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Static parsing identifies the export manifest queries for documents, tags, correspondents, accounts, permissions, workflows, notes and custom fields. Documents use global_objects; originals are copied separately and the manifest records their export paths. Archive and thumbnail copies can be omitted, and audit logs are conditional. This corrects the earlier description of a database image: it is serialized model data plus files."
url = "https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/document_exporter.py"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The importer reads metadata.json or legacy version.json. A version mismatch produces a warning and continues, rather than an unconditional rejection. This distinguishes runtime enforcement from supported-version guidance; successful cross-version import remains unverified."
url = "https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/document_importer.py"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The exporter serializes model records into manifest JSON and copies document files with path references. This is not a raw database image. Independent reconstruction and a clean import have not been demonstrated; API-token migration is not established."
url = "https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/document_exporter.py"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Paperless can be self-hosted with operator-controlled document and export storage."
url = "https://docs.paperless-ngx.com/administration/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Exporter passphrase protection targets mail-account password/refresh_token and social-token token/token_secret fields. Without a passphrase the exporter warns that sensitive fields will be plaintext. It is field-level protection, not encryption of document files or the whole export."
url = "https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/mixins.py"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Paperless-ngx does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/document_exporter.py"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Paperless-ngx's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/document_exporter.py"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The document store can operate on local infrastructure."
url = "https://docs.paperless-ngx.com/administration/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/mixins.py"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The exporter produces serialized model data plus files, not a raw database image; paths, conditional audit data and version behavior matter. No real manifest/files packet has been independently reconstructed and compared for OCR, document hashes, workflows, accounts and permissions. Field-level secret handling does not complete E3."
url = "https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/document_exporter.py"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Export warnings and optional protection for selected mail/social-token fields are concrete controls, but do not encrypt all exported documents. Workflow execution, user permissions, trash/purge, metadata changes and inspectable correction remain insufficiently covered for the document-management profile."
url = "https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/mixins.py"
confidence = "medium"

+++

**Verification scenario:** Run `document_exporter` and import into a clean instance; compare originals, tags, OCR, correspondence, and user accounts.

**What may invalidate an overconfident claim:** The documented export may have version coupling; verify an exact-version restore and portable source documents.

**Documentation starting point:** <https://docs.paperless-ngx.com/administration/>

**Assessment update: 23 October 2026**

- [x] Resolved: Static parsing identifies the export manifest queries for documents, tags, correspondents, accounts, permissions, workflows, notes and custom fields. Documents use global_objects; originals are copied separately and the manifest records their export paths. Archive and thumbnail copies can be omitted, and audit logs are conditional. This corrects the earlier description of a database image: it is serialized model data plus files. [Source](https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/document_exporter.py).
- [x] Resolved: The importer reads metadata.json or legacy version.json. A version mismatch produces a warning and continues, rather than an unconditional rejection. This distinguishes runtime enforcement from supported-version guidance; successful cross-version import remains unverified. [Source](https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/document_importer.py).
- [x] Resolved: Exporter passphrase protection targets mail-account password/refresh_token and social-token token/token_secret fields. Without a passphrase the exporter warns that sensitive fields will be plaintext. It is field-level protection, not encryption of document files or the whole export. [Source](https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/mixins.py).
- [ ] Open: An independently inspected real export and clean import comparing document hashes, OCR, relationships, accounts and permissions; actual supported/unsupported-version outcomes; trash/purge and workflow authorization. E5 needs workflow/trash/purge and permission authorization, clear export-secret boundaries and correction evidence for document/metadata mutations.

**Assessment:** These source findings close the questions above and inform the evidence records; they do not demonstrate a clean restore, complete migration or full application eligibility. Reproduction details and retained sources are recorded in evidence/third-pass/batch-3/. The overall determination remains **Insufficient evidence** for the remaining requirements.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** An independently inspected real export and clean import comparing document hashes, OCR, relationships, accounts and permissions; actual supported/unsupported-version outcomes; trash/purge and workflow authorization. E5 needs workflow/trash/purge and permission authorization, clear export-secret boundaries and correction evidence for document/metadata mutations.

**Next without installing locally:** Read a synthetic export manifest and originals with expected OCR/tag/correspondent/custom-field/permission mappings; obtain version-matched import/workflow/trash observations or comprehensive source coverage. Keep real account secrets out of the packet.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-4/`. Overall: **Insufficient evidence**.

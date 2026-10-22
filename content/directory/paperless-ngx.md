+++
title = "Paperless-ngx"
category = "Knowledge & Office"
summary = "Document archive that keeps original files untouched on disk alongside archival PDF/A versions, with a documented exporter."
substrate = "Pristine Original PDFs + PDF/A + SQLite"
sync_model = "Self-Hosted Container / Local Filesystem"
extract_cmd = "document_exporter ../export --no-progress-bar"
limitations = ["A normal installation needs Docker plus a database and other services.", "An export may be coupled to the application version, so restoring into a different version needs testing."]
pilot_stage = 2
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "partial"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Paperless documents an exporter containing documents, thumbnails, metadata, settings, and database contents."
url = "https://docs.paperless-ngx.com/administration/"
confidence = "high"

[[evidence]]
target = "E2"
text = "Exports can be imported into a fresh Paperless instance or stored for another DMS, but cross-version import is explicitly constrained."
url = "https://docs.paperless-ngx.com/administration/"
confidence = "high"

[[evidence]]
target = "E3"
text = "The export contains a database image and files, but independent reconstruction outside Paperless and preservation of API tokens were not established."
url = "https://docs.paperless-ngx.com/administration/"
confidence = "high"

[[evidence]]
target = "E4"
text = "Paperless can be self-hosted with operator-controlled document and export storage."
url = "https://docs.paperless-ngx.com/administration/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Document processing and retention are consequential, but OCR correction, deletion, permissions, and audit behavior were not tested."
url = "https://docs.paperless-ngx.com/administration/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Self-hosting and broad export support custody, while version coupling and missing tokens weaken exit certainty."
url = "https://docs.paperless-ngx.com/administration/"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Documents and metadata are exportable, but database migrations and OCR provenance require preservation procedures."
url = "https://docs.paperless-ngx.com/administration/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The document store can operate on local infrastructure."
url = "https://docs.paperless-ngx.com/administration/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The documentation clearly warns about version compatibility and omitted API tokens, but workflow controls need testing."
url = "https://docs.paperless-ngx.com/administration/"
confidence = "high"

+++

**Verification scenario:** Run `document_exporter` and import into a clean instance; compare originals, tags, OCR, correspondence, and user accounts.

**What may invalidate an overconfident claim:** The documented export may have version coupling; verify an exact-version restore and portable source documents.

**Documentation starting point:** <https://docs.paperless-ngx.com/administration/>

**Preliminary desk assessment:** Paperless-ngx is described as document archive that keeps original files untouched on disk alongside archival pdf/a versions, with a documented exporter. Its primary preservation surface is Pristine Original PDFs + PDF/A + SQLite, with independence shaped by self-hosted container / local filesystem. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

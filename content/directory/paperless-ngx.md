+++
title = "Paperless-ngx"
category = "Knowledge & Office"
summary = "Document archive that keeps original files untouched on disk alongside archival PDF/A versions, with a documented exporter."
substrate = "Pristine Original PDFs + PDF/A + SQLite"
sync_model = "Self-Hosted Container / Local Filesystem"
extract_cmd = "document_exporter ../export --no-progress-bar"
limitations = ["A normal installation needs Docker plus a database and other services.", "An export may be coupled to the application version, so restoring into a different version needs testing."]
pilot_stage = 2
legacy_tier = "Tier 2"
legacy_label = "Tier 2 • Sovereign Core"
+++

**Verification scenario:** Run `document_exporter` and import into a clean instance; compare originals, tags, OCR, correspondence, and user accounts.

**What may invalidate an overconfident claim:** The documented export may have version coupling; verify an exact-version restore and portable source documents.

**Documentation starting point:** <https://docs.paperless-ngx.com/administration/>

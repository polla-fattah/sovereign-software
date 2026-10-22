+++
title = "Logseq"
category = "Knowledge & Office"
summary = "Open-source outliner that stores notes as plain Markdown or Org files in a local folder, so the same 'File Over App' guarantee holds without a proprietary application."
substrate = "Local Directory of Markdown / Org Files"
sync_model = "Decoupled (Syncthing or Git)"
extract_cmd = "cp -r ~/logseq-graph /backup/plain-markdown/"
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
text = "Logseq documents graph backup and export to SQLite, ZIP with assets, EDN, and Markdown."
url = "https://github.com/logseq/docs/blob/master/db-version.md"
confidence = "high"

[[evidence]]
target = "E2"
text = "Markdown and EDN exports provide exit paths, but the documentation warns that standard Markdown does not capture all graph data and EDN is not yet recommended as the only backup."
url = "https://github.com/logseq/docs/blob/master/db-version.md"
confidence = "high"

[[evidence]]
target = "E3"
text = "Backups and database exports are documented, but independent reconstruction of all properties, timestamps, assets, and links was not performed."
url = "https://github.com/logseq/docs/blob/master/db-version.md"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Graphs and backups are stored locally on desktop or in a chosen browser folder."
url = "https://github.com/logseq/docs/blob/master/db-version.md"
confidence = "high"

[[evidence]]
target = "E5"
text = "Knowledge work is user-directed, but database sync, plugins, and conflict resolution were not tested."
url = "https://github.com/logseq/logseq/blob/master/README.md"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Local graphs and multiple exports support control, but DB-versus-Markdown feature gaps limit exit certainty."
url = "https://github.com/logseq/docs/blob/master/db-version.md"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Markdown and EDN offer durable text representations, though the complete graph schema and asset relationships need preservation testing."
url = "https://github.com/logseq/docs/blob/master/db-version.md"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The graph and backups can remain local and do not require a hosted account."
url = "https://github.com/logseq/docs/blob/master/db-version.md"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The documentation is unusually clear about what each export captures and omits, but the database format is still evolving."
url = "https://github.com/logseq/docs/blob/master/db-version.md"
confidence = "high"

+++

**Verification scenario:** Specify the file graph versus the database graph, then export and reopen block references, queries, whiteboards, and tasks.

**What may invalidate an overconfident claim:** Do not generalise file-based graph behaviour to every Logseq storage mode.

**Documentation starting point:** <https://docs.logseq.com/>

**Preliminary desk assessment:** Logseq is described as open-source outliner that stores notes as plain markdown or org files in a local folder, so the same 'file over app' guarantee holds without a proprietary application. Its primary preservation surface is Local Directory of Markdown / Org Files, with independence shaped by decoupled (syncthing or git). This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

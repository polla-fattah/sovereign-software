+++
title = "Obsidian"
category = "Knowledge & Office"
summary = "Notes stay as standard UTF-8 Markdown files in a local folder you can edit in Vim, VS Code or bash."
substrate = "Local Directory of Plain Markdown (.md)"
sync_model = "Decoupled (Syncthing, Git, or paid first-party sync)"
extract_cmd = "cp -r ~/Vault /backup/plain-markdown/"
limitations = ["The application is closed-source (free for personal use); the open Markdown files are what earn the entry."]
pilot_stage = 2
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Obsidian stores notes as Markdown plain text files in a local vault and documents local backup practices."
url = "https://obsidian.md/help/data-storage"
confidence = "high"

[[evidence]]
target = "E2"
text = "Markdown vaults can be opened and edited by many tools, and Obsidian documents import of Markdown files."
url = "https://obsidian.md/help/import/markdown"
confidence = "high"

[[evidence]]
target = "E3"
text = "Notes and attachments are independently accessible, but plugin data, internal links, properties, and themes require a complete vault restoration test."
url = "https://obsidian.md/help/data-storage"
confidence = "medium"

[[evidence]]
target = "E4"
text = "A vault is a folder on the local filesystem; synchronization is optional and local copies remain available."
url = "https://obsidian.md/help/sync/vault-types"
confidence = "high"

[[evidence]]
target = "E5"
text = "Knowledge work is user-directed, but plugins, web clipper content, and sync conflicts were not tested."
url = "https://obsidian.md/help/backup"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Plain Markdown files and local vaults provide strong user control and exit."
url = "https://obsidian.md/help/data-storage"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Markdown and ordinary attachments are durable, while plugin-specific semantics and link conventions need preservation testing."
url = "https://obsidian.md/help/import/markdown"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The essential note workflow can remain local and offline."
url = "https://obsidian.md/help/sync/vault-types"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The help site explains storage and warns that sync is not backup, but plugin and metadata boundaries require review."
url = "https://obsidian.md/help/backup"
confidence = "high"

+++

**Verification scenario:** Move a vault without Obsidian and compare links, embedded media, canvas, plugins, metadata, and settings.

**What may invalidate an overconfident claim:** Markdown content can survive while plugin-dependent knowledge and Canvas interactions may not. Because the core binary is proprietary, functional longevity and E4 depend on whether essential workflows are portable to independent Markdown tools rather than requiring community patching of the closed executable.

**Two-assessor protocol scope note:** Pre-registered under the `knowledge_notes` domain profile as a boundary case contrasting proprietary software license restrictions against plain-text data portability. Assessors independently test whether Dataview queries, Canvas files (`.canvas`), and internal wikilinks remain usable in a non-Obsidian Markdown environment.

**Documentation starting point:** <https://help.obsidian.md/>

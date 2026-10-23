+++
title = "Obsidian"
category = "Knowledge & Office"
summary = "Notes stay as standard UTF-8 Markdown files in a local folder you can edit in Vim, VS Code or bash."
substrate = "Local Directory of Plain Markdown (.md)"
sync_model = "Decoupled (Syncthing, Git, or paid first-party sync)"
extract_cmd = "cp -r ~/Vault /backup/plain-markdown/"
limitations = ["Canvas file references require the separately preserved files and paths.","The official Canvas specification does not establish behavior of Obsidian's closed-source application or plugins."]
pilot_stage = 2
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Official JSON Canvas source commit 456f843cb293df4f4ab1763e22ccb46a80b307c8"
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
text = "The official JSON Canvas sample parses with standard JSON: five nodes and one edge, with both edge endpoints resolving to node IDs. Text, geometry, a group label and three file-node paths are readable without Obsidian. This is independent interpretation of this Canvas sample, not an executed vault migration or recovery of every Obsidian feature."
url = "https://github.com/obsidianmd/jsoncanvas/blob/456f843cb293df4f4ab1763e22ccb46a80b307c8/sample.canvas"
confidence = "high"

[[evidence]]
target = "E2"
text = "JSON Canvas 1.0 defines file nodes by vault-relative file paths and optional subpaths, rather than embedding those files' contents. The sample references readme.md, _site/logo.svg and spec/1.0.md. Retaining the .canvas alone therefore does not preserve its referenced content. This format specification is not access to the closed-source application's implementation or a guarantee about plugins and Bases."
url = "https://github.com/obsidianmd/jsoncanvas/blob/456f843cb293df4f4ab1763e22ccb46a80b307c8/spec/1.0.md"
confidence = "medium"

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
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Obsidian does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/obsidianmd/jsoncanvas/blob/456f843cb293df4f4ab1763e22ccb46a80b307c8/spec/1.0.md"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Obsidian's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/obsidianmd/jsoncanvas/blob/456f843cb293df4f4ab1763e22ccb46a80b307c8/sample.canvas"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The essential note workflow can remain local and offline."
url = "https://obsidian.md/help/sync/vault-types"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://obsidian.md/help/backup"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official Canvas sample preserves node/edge data but references separate vault files. The closed application, Bases/plugin state, internal-link/property semantics, attachments and effective vault settings have not been independently reconstructed from a complete packet. Open Markdown/Canvas access is a positive preservation lead, not whole-vault E3."
url = "https://github.com/obsidianmd/jsoncanvas/blob/456f843cb293df4f4ab1763e22ccb46a80b307c8/sample.canvas"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The collected open Canvas specification is not access to the closed application's control implementation. Effective plugin permissions, Web Clipper/transmission choices, sync conflicts, rename/trash and snapshot recourse remain insufficiently covered for the existing vault scope."
url = "https://obsidian.md/help/backup"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish a replacement knowledge workflow preserving essential internal relationships, Canvas/Bases content and attachment/plugin-backed meaning. Individual readable Markdown/Canvas files do not complete a whole-vault migration comparison."
url = "https://github.com/obsidianmd/jsoncanvas/blob/456f843cb293df4f4ab1763e22ccb46a80b307c8/spec/1.0.md"
confidence = "medium"

+++

**Verification scenario:** Move a vault without Obsidian and compare links, embedded media, canvas, plugins, metadata, and settings.

**What may invalidate an overconfident claim:** Markdown content can survive while plugin-dependent knowledge and Canvas interactions may not. Because the core binary is proprietary, functional longevity and E4 depend on whether essential workflows are portable to independent Markdown tools rather than requiring community patching of the closed executable.

**Two-assessor protocol scope note:** Pre-registered under the `knowledge_notes` domain profile as a boundary case contrasting proprietary software license restrictions against plain-text data portability. Assessors independently test whether Dataview queries, Canvas files (`.canvas`), and internal wikilinks remain usable in a non-Obsidian Markdown environment.

**Documentation starting point:** <https://help.obsidian.md/>

**Evidence update: 23 October 2026**

- [x] Resolved: The official JSON Canvas sample parses with standard JSON: five nodes and one edge, with both edge endpoints resolving to node IDs. Text, geometry, a group label and three file-node paths are readable without Obsidian. This is independent interpretation of this Canvas sample, not an executed vault migration or recovery of every Obsidian feature. [Source](https://github.com/obsidianmd/jsoncanvas/blob/456f843cb293df4f4ab1763e22ccb46a80b307c8/sample.canvas).
- [x] Resolved: JSON Canvas 1.0 defines file nodes by vault-relative file paths and optional subpaths, rather than embedding those files' contents. The sample references readme.md, _site/logo.svg and spec/1.0.md. Retaining the .canvas alone therefore does not preserve its referenced content. This format specification is not access to the closed-source application's implementation or a guarantee about plugins and Bases. [Source](https://github.com/obsidianmd/jsoncanvas/blob/456f843cb293df4f4ab1763e22ccb46a80b307c8/spec/1.0.md).
- [ ] Open: A complete representative vault including attachments/Bases/plugins/settings, semantic rendering, recovery snapshots and sync conflicts, trash/rename controls and cross-version behavior. E5 needs effective plugin/transmission and sync/rename/trash authorization, inspectability and recovery boundaries.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-6/.

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** A complete representative vault including attachments/Bases/plugins/settings, semantic rendering, recovery snapshots and sync conflicts, trash/rename controls and cross-version behavior. E5 needs effective plugin/transmission and sync/rename/trash authorization, inspectability and recovery boundaries.

**Next without installing locally:** Inspect a synthetic vault including assets, Canvas references, Bases/plugin data/settings and expected link/property meanings; seek version-matched official control documentation with robust independent corroboration or recorded conflict/trash recovery.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-7/`. Overall: **Insufficient evidence**.

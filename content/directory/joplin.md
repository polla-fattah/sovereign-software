+++
title = "Joplin"
category = "Knowledge & Office"
summary = "Offline-first note-taking application whose notes are Markdown, with several synchronisation targets and export options."
substrate = "Markdown notes and attachments in a local SQLite database"
sync_model = "Local-first with optional sync (Joplin Cloud, WebDAV, Nextcloud, Dropbox, OneDrive, or a file system)"
extract_cmd = "sqlite3 database.sqlite \"SELECT title FROM notes LIMIT 5;\""
limitations = ["Native import generates new item IDs and rewrites links; export clears sharing fields. Revision history, keys, settings, and cross-version restore still require verification.","No target application was installed or executed in rating reconciliation batch 2; source controls are not end-to-end recovery observations.","Complete essential-record recovery and whole-scope consequential-operation coverage remain unverified."]
assessment_batch = "A"
assessment_status = "complete"
assessment_date = "2026-10-23"
version_assessed = "Source commit 280954e58fc7c9e74200fd817272ac3fb80dcead; export/import implementation and test assertions inspected"
assessment_notes = "Rating reconciliation batch 2: E3/E5 remain Not Verified with specific missing evidence; unsupported Longevity, Transparency and Sovereignty findings withdrawn. The previous E2 Pass is also withdrawn. 3 additional source questions resolved."

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
text = "Resolved: the JEX exporter delegates to the raw exporter and creates a tar archive. The raw exporter writes serialized item files as UTF-8 and copies resource files into resources/. This identifies the implemented archive structure, not a complete profile backup."
url = "https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/interop/InteropService_Exporter_Jex.ts"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Resolved: raw import generates replacement item IDs and rewrites note/resource links. Export clears is_shared and share_id, so original identity and sharing authority are not restored unchanged. Upstream tests assert new IDs, linked tags, attachment-byte equality, and rewritten note links; no test run was observed here."
url = "https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/interop/InteropService.test.ts"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The raw export exposes notes, metadata, and resources as files, but complete independent reconstruction of internal links, encryption keys, and all settings was not tested."
url = "https://joplinapp.org/help/apps/terminal/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Joplin can synchronize to a local filesystem or operator-selected services, and notes can be edited with the terminal or text editor."
url = "https://joplinapp.org/help/apps/terminal/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Note-taking is user-directed, but plugin behavior, synchronization conflict resolution, and encrypted-data recovery were not tested."
url = "https://joplinapp.org/help/apps/import_export/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "E2 is Not Verified for the existing essential-record scope, so the minimum for a positive Sovereignty finding is not established. Storage choice, local access and export-format strengths remain recorded; the old positive principle is withdrawn, not changed to a verified failure."
url = "https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/interop/InteropService.test.ts"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 remains Not Verified for Joplin's existing essential-record scope. Documented/exported structure does not establish a baseline-matched clean recovery. The previous positive Longevity finding is withdrawn to Not assessed, not a finding of failure."
url = "https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/interop/InteropService_Exporter_Jex.ts"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core data can be stored and synchronized through local files without requiring a single hosted provider."
url = "https://joplinapp.org/help/apps/terminal/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The inspected controls are retained as positive facts, but whole-scope E5 remains Not Verified. The methodology requires established minimum oversight before a positive Transparency and Control finding; the earlier Partially meets is therefore withdrawn to Not assessed rather than used as a placeholder for incomplete evidence."
url = "https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/app-desktop/commands/emptyTrash.ts"
confidence = "medium"

[[evidence]]
target = "E3"
text = "JEX/raw implementation and inspected import assertions explain serialized items, resource copying, new IDs and rewritten links, but no populated 200-note profile was independently reconstructed. Complete notebook/tag/link/resource relationships and the declared encrypted/offline-conflict recovery scenario remain unverified; package structure alone is not meaningful restoration."
url = "https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/interop/InteropService_Exporter_Jex.ts"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Pinned source adds concrete trash controls: desktop empty-trash asks for confirmation before calling deletion; restore clears deletion state with explicit missing-parent handling; automatic deletion is setting-gated, uses a configured age and logs selected items. These are positive controls, not a complete account of sync conflicts, encryption changes, transmission or recovery after permanent deletion."
url = "https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/app-desktop/commands/emptyTrash.ts"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Desktop empty-trash displays a permanent-deletion confirmation and calls the trash deletion service only when accepted. The service invokes note/folder deletion; this is not evidence that history or synchronized copies can recover a permanent deletion."
url = "https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/app-desktop/commands/emptyTrash.ts"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Trash restoration clears deleted_time and restores the parent when available. Missing/deleted parents use either an explicitly requested restore folder or an empty parent ID, unless a target folder is supplied; folder restoration recurses into children."
url = "https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/trash/restoreItems.ts"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Automatic trash deletion exits when its enable setting is false, reads an age setting, logs selected items and excludes share-read-only items. It auto-deletes folders only when empty. Inspected setup schedules periodic processing; default setting values and cross-device consequences were not established here."
url = "https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/trash/permanentlyDeleteOldItems.ts"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Native import ID remapping and upstream assertions do not establish the declared collection's usable transition into an independent notes workflow. The earlier E2 Pass is withdrawn to Not Verified until essential hierarchy, links, tags, timestamps and attachments are compared in an actual alternative representation."
url = "https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/interop/InteropService.test.ts"
confidence = "medium"

+++

**Primary investigation:** Whether a complete knowledge collection survives migration and synchronization failure.

**Investigation priority:** Sovereignty high, Longevity high, Locality high, Transparency and Control high. This plans the test effort and is not a finding.

**Synthetic dataset:** 200 notes in nested notebooks, with internal links, tags, attachments, checklists, encrypted synchronized records, and conflicting edits.

**Required tests**

1. Export as Markdown, JEX, and raw-format data.
2. Reimport each representation into a clean profile and compare recovered information.
3. Determine which formats preserve note identifiers, notebook hierarchy, tags, timestamps, links, and attachments.
4. Disconnect every configured synchronization provider and continue editing locally.
5. Simulate two devices editing the same note while disconnected, reconnect, and inspect conflict preservation.
6. Test encrypted-data recovery with available credentials and document the effect of losing essential recovery information.
7. Restore a complete library from an independent backup.

**Critical evidence:** Export comparison matrix, note-link integrity, synchronization-conflict records, encryption recovery procedure, and backup restoration report.

**Assessment update, 23 October 2026:**

- [x] Resolved: JEX packages the raw export as tar; serialized items and copied resource files are visible in the implementation.
- [x] Resolved: native import replaces IDs and remaps links; export clears sharing fields. These are concrete identity and authority boundaries.
- [ ] Open: A populated JEX/raw export with expected notebook/tag/link/resource relationships, independent reconstruction and encrypted/offline-conflict recovery records remain missing. For E5, record sync conflicts, encryption transitions and recovery boundaries after permanent deletion. Trash confirmation, missing-parent restore handling and setting-gated automatic deletion are now answered in source.

**Assessment:** Export structure and identity/sharing behavior are resolved from pinned implementation and tests. A JEX should not be treated as preserving a complete profile or its sharing authority unchanged. Complete independent recovery remains Not Verified, and the overall determination remains **Insufficient evidence**.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

**Rating reconciliation: 23 October 2026**

E3 and E5 remain **Not Verified** for the scope stated above. Longevity and Transparency and Control are **Not assessed**, because their required minimums are not established. Sovereignty is also **Not assessed** while E2 remains unverified. The previous E2 Pass is withdrawn; the available evidence does not establish a usable full-scope migration. These are evidence corrections, not adverse product findings. E1, E4 and Locality were not re-certified by this targeted review.

- [x] Resolved: Desktop empty-trash displays a permanent-deletion confirmation and calls the trash deletion service only when accepted. The service invokes note/folder deletion; this is not evidence that history or synchronized copies can recover a permanent deletion. [Pinned source](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/app-desktop/commands/emptyTrash.ts).
- [x] Resolved: Trash restoration clears deleted_time and restores the parent when available. Missing/deleted parents use either an explicitly requested restore folder or an empty parent ID, unless a target folder is supplied; folder restoration recurses into children. [Pinned source](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/trash/restoreItems.ts).
- [x] Resolved: Automatic trash deletion exits when its enable setting is false, reads an age setting, logs selected items and excludes share-read-only items. It auto-deletes folders only when empty. Inspected setup schedules periodic processing; default setting values and cross-device consequences were not established here. [Pinned source](https://github.com/laurent22/joplin/blob/280954e58fc7c9e74200fd817272ac3fb80dcead/packages/lib/services/trash/permanentlyDeleteOldItems.ts).

**Recovery evidence still needed:** A populated JEX/raw export with expected notebook/tag/link/resource relationships, independent reconstruction and encrypted/offline-conflict recovery records remain missing. For E5, record sync conflicts, encryption transitions and recovery boundaries after permanent deletion. Trash confirmation, missing-parent restore handling and setting-gated automatic deletion are now answered in source.

**Next step without a local installation:** Acquire a synthetic JEX/raw export plus expected relationship and resource hashes; reconstruct it with archive/text/SQLite tools already available. Add externally recorded two-profile conflict and encryption/recovery results for the pinned version. No real notes or private recovery credentials are needed.

Reproducible inspection and the individual decision ledger are retained in `evidence/rating-reconciliation/batch-2/`. Overall: **Insufficient evidence**.

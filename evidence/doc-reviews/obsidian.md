# Obsidian: documentation review

Reviewed 22 October 2026 from the Obsidian Help site and obsidian.md (changelog, licence, privacy, terms, about) only. No official source repository was consulted because the application is closed source. Latest public desktop release on the changelog: "1.14 Desktop", 5 October 2026 (the year is shown), linked as v1.14.4; early-access (catalyst) entries were excluded. Licence: proprietary; the licence page says free "for any purpose", including commercial use, and gives no source or redistribution rights. Most facts below come from page summaries produced by a fetch tool, not from reading full page text.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 6](../third-pass/batch-6/README.md#obsidian) and reflected in the [application page](../../content/directory/obsidian.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The official JSON Canvas sample parses with standard JSON: five nodes and one edge, with both edge endpoints resolving to node IDs. Text, geometry, a group label and three file-node paths are readable without Obsidian. This is independent interpretation of this Canvas sample, not an executed vault migration or recovery of every Obsidian feature.
- [x] Resolved: JSON Canvas 1.0 defines file nodes by vault-relative file paths and optional subpaths, rather than embedding those files' contents. The sample references readme.md, _site/logo.svg and spec/1.0.md. Retaining the .canvas alone therefore does not preserve its referenced content. This format specification is not access to the closed-source application's implementation or a guarantee about plugins and Bases.

Remaining: A complete representative vault including attachments/Bases/plugins/settings, semantic rendering, recovery snapshots and sync conflicts, trash/rename controls and cross-version behavior.

## What the documentation says

**Storage and access (E1, E3)**
- A vault is "a folder on your local file system"; notes are Markdown plain text, and the app refreshes when files change externally. [data storage](https://obsidian.md/help/data-storage)
- Each vault has a hidden `.obsidian` folder holding hotkeys, themes and community plugins. App-wide settings sit in an OS system folder. The docs warn that a vault in that system folder "may lead to corrupted data or data loss". [data storage](https://obsidian.md/help/data-storage)
- Obsidian keeps a metadata cache and Sync state in IndexedDB; the cache can be rebuilt from settings. [data storage](https://obsidian.md/help/data-storage)
- Listed formats: `.md`, `.base`, `.canvas`, common image, audio, video and PDF types. `.canvas` is named "JSON Canvas" with a link to a public site; whether `.base` is documented is not found in the docs. [file formats](https://obsidian.md/help/file-formats)

**Exit and migration (E2)**
- Files can be moved in or out with the system file browser; an Importer plugin handles folders and zip archives, and can move inline tags into properties. [import Markdown](https://obsidian.md/help/import/markdown)
- What is lost on import or when opening a vault in another tool (link format, properties, Canvas, plugin data): not found in the docs. The link-format page was not available at the guessed URL.
- No export command or export-fidelity statement was found in the pages read.

**Recovery (E3)**
- Notes are stored locally "not in the cloud" by default, so the user needs their own backup. Sync services "are not designed for backups". A backup should be a one-way copy, and the vault should not sit inside the backup service. [backup](https://obsidian.md/help/backup)
- File recovery (core plugin): snapshots at least 5 minutes apart, kept 7 days by default, stored outside the vault, per device, `.md` and `.canvas` only. It is "not a complete backup solution". Moving a vault can make old snapshots inaccessible. [file recovery](https://obsidian.md/help/plugins/file-recovery)
- Obsidian Sync keeps a local copy as a "soft backup"; the local vault works offline. [vault types](https://obsidian.md/help/sync/vault-types)
- Version-to-version vault compatibility, and opening a vault from a newer version in an older one: not found in the docs. The installer (Electron) is separate from the app version and is not auto-updated; release notes say when it must be updated. [updates](https://obsidian.md/help/updates)

**Continuing authority (E4) and dependencies**
- No account is needed to download or use the app. [licence](https://obsidian.md/license)
- Privacy: app data "is never sent to our servers"; "We do not collect any telemetry data". Update checks can be turned off in settings. The apps go online for plugins, themes and embedded sites. Sync and Publish store data on Obsidian servers (Sync is stated end-to-end encrypted). [privacy](https://obsidian.md/privacy)
- The controller is not named in the current summary; a 2020 legacy section names Dynalist Inc. as the company behind Obsidian. Whether that is still accurate: not found in the docs. [privacy](https://obsidian.md/privacy)
- Terms (last updated 20 February 2025): software "is licensed and not sold"; the company may "at any time and without notice" restrict access to components of obsidian.md, may change terms by email notice, and may limit functionality. Liability for lost data is excluded. The terms "don't specifically address" locally stored notes, per the summary. [terms](https://obsidian.md/terms)
- The about page says the company is "100% supported by our users, not investors" and uses open file formats to prevent lock-in. No end-of-life, escrow, source-release or succession commitment was found. [about](https://obsidian.md/about)
- Plugin security and review rules: not found in the docs (the plugins page did not cover them). [plugins](https://obsidian.md/help/plugins)

**Consequential operations (E5)**
- Deleting a note goes to the system trash by default, or to a `.trash` folder in the vault, or is permanent: "immediately deleted without any means to restore them". Whether a confirmation prompt appears is not stated. [manage notes](https://obsidian.md/help/manage-notes)
- Renaming a note updates links to it automatically. [manage notes](https://obsidian.md/help/manage-notes)
- Clearing File recovery history permanently deletes all snapshots and cannot be undone. [file recovery](https://obsidian.md/help/plugins/file-recovery)
- Sync conflict handling and Git guidance beyond ignoring `workspace.json`: not read.

## Gaps to test or read next
1. Copy a synthetic vault (wikilinks, embeds, a `.canvas`, a `.base`, properties) to a machine without Obsidian; open it in a plain Markdown editor and list what breaks.
2. Open the same vault in two Obsidian versions (1.14.4 and an older one) and compare `.obsidian` changes and any warnings.
3. Restore from a one-way copy to a new location; check whether plugins, themes and settings return, and whether File recovery snapshots are lost.
4. Delete, rename and move notes under each trash setting; compare link updates and what can be restored.
5. Read the community plugin, link-format, Canvas, Bases, Sync conflict, Publish and Importer pages, and the release notes for 1.14.x.
6. Read the full terms and privacy text (not summaries); look for any statement on discontinuation or on keeping the app usable if the company ceases to operate.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-7/README.md#obsidian); [actual assessment](../../content/directory/obsidian.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The official Canvas sample preserves node/edge data but references separate vault files. The closed application, Bases/plugin state, internal-link/property semantics, attachments and effective vault settings have not been independently reconstructed from a complete packet. Open Markdown/Canvas access is a positive preservation lead, not whole-vault E3.
- E5: Not Verified. The collected open Canvas specification is not access to the closed application's control implementation. Effective plugin permissions, Web Clipper/transmission choices, sync conflicts, rename/trash and snapshot recourse remain insufficiently covered for the existing vault scope.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish a replacement knowledge workflow preserving essential internal relationships, Canvas/Bases content and attachment/plugin-backed meaning. Individual readable Markdown/Canvas files do not complete a whole-vault migration comparison.

Remaining: A complete representative vault including attachments/Bases/plugins/settings, semantic rendering, recovery snapshots and sync conflicts, trash/rename controls and cross-version behavior. E5 needs effective plugin/transmission and sync/rename/trash authorization, inspectability and recovery boundaries.

Next without a local installation: Inspect a synthetic vault including assets, Canvas references, Bases/plugin data/settings and expected link/property meanings; seek version-matched official control documentation with robust independent corroboration or recorded conflict/trash recovery.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

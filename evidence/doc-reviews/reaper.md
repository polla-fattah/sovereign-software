# REAPER: documentation review

Reviewed 22 October 2026 from the official reaper.fm pages (download, purchase, licence text, technical, distribution agreement, changelog, user guide page) and the front matter of the official User Guide PDF only. Latest stable release shown: "Version 7.82: October 4, 2026" (year given). The licence is proprietary (Cockos EULA), with a 60-day evaluation. The User Guide is "Updated for version 7.81", one minor version behind. The guide PDF exceeded the fetch size limit, so only its contents list was read; the body text of the project, backup, undo, and render chapters was not read.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 11](../third-pass/batch-11/README.md#reaper) and reflected in the [application page](../../content/directory/reaper.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The official extension SDK defines line-oriented ProjectStateContext AddLine/GetLine interfaces and an explicit project-import interface that generates RPP-compatible state. This establishes an exposed textual project-state interface, not a complete public specification or independent decoding of plugin chunks.
- [x] Resolved: The SDK separates save/load, undo/redo and cut/copy context flags. Its project-config extension contract says plugins may choose whether to save undo state and ties it to the relevant undo-state flag. Undo coverage for arbitrary extensions therefore cannot be assumed from the existence of REAPER's general undo command.

Remaining: Actual RPP/plugin-state inspection, backup/autosave defaults, clean-host consolidation, stem equivalence, version compatibility and evaluation-license behavior remain untested; the proprietary core was not inspected.

## What the documentation says

**Storage and access (E1, E3)**
- The project is a `.RPP` file. The directory entry calls it text-based, but the pages read here do not describe the project format at all. The technical page says nothing about RPP. [technical](https://www.reaper.fm/technical.php), [home](https://www.reaper.fm/)
- No official format specification was found on reaper.fm. A search summary of Cockos forum threads (not read in full, so weak evidence) says no spec exists beyond an outdated wiki page, and that plugin state is stored as encoded chunks. [forum thread](https://forum.cockos.com/showthread.php?t=240858)
- Install can run "from a USB key or other removable media" and from a portable or network drive. [technical](https://www.reaper.fm/technical.php), [home](https://www.reaper.fm/)
- Supported plugin formats: VST2, VST3, LV2, CLAP, DX, AU, JSFX. Plugins are separate products, so a project depends on them being present. [technical](https://www.reaper.fm/technical.php)

**Exit and migration (E2)**
- Import, record, and render formats include WAV, AIFF, FLAC, MP3, Ogg Vorbis, and MIDI. [technical](https://www.reaper.fm/technical.php)
- The guide's contents list has "Consolidating and Exporting" (21.2), "Rendering Regions" (21.10), "Stem Rendering Media Items" (21.16), and "Importing an Existing Project" (3.12). Their text was not read, so what is lost on export (plugin state, automation, routing) is not known from the docs. [User Guide 7.81](https://dlx.reaper.fm/userguide/ReaperUserGuide781c.pdf)
- A PDF named "SONAR to REAPER" is listed; its content was not read. [user guide page](https://www.reaper.fm/userguide.php)

**Recovery (E3)**
- The guide's contents list "Multiple Project Backup Versions" (12.21) and "Saving New Project Versions" (12.23). Autosave has no section title in the list. The behavior of each (location, count, naming) was not read. [User Guide 7.81](https://dlx.reaper.fm/userguide/ReaperUserGuide781c.pdf)
- Version compatibility: the changelog (read to v7.56; earlier entries not read) mentions that loading a project saved before 7.48 removes stale item group names (7.63), and that existing wet/dry envelopes keep the old mode (7.70). No statement was found on opening a newer project in an older version. [changelog](https://www.reaper.fm/whatsnew.txt)
- Older builds back to 0.x are listed for download, so a specific version can be fetched. [old versions](https://www.reaper.fm/download-old.php)

**Continuing authority (E4) and dependencies**
- Evaluation: "free, fully functional 60-day evaluation", no registration or personal details. [download](https://www.reaper.fm/download.php), [EULA](https://www.reaper.fm/license.txt)
- Licence key: emailed after purchase. Discounted licence $60 (personal use, revenue up to USD $20,000, education, non-profit); commercial $225. One key may be installed on several computers if used on one at a time. "All license purchases are final." Activation: not described. [purchase](https://www.reaper.fm/purchase.php)
- Version range: a licence includes "free upgrades through REAPER version 8.99". What happens to installed versions after 8.99, or after the evaluation lapses, is not found in the docs. The EULA says continued use after the trial needs a purchased licence (s1.2). [purchase](https://www.reaper.fm/purchase.php), [EULA](https://www.reaper.fm/license.txt)
- Governance: the EULA lets Cockos change terms for future versions (s1.7) and "cease the support of the Software" (s9.1). It bars reverse engineering (s3.1) and derivative works (s3.3), except plugins and extensions using the APIs and bundled GPL/LGPL parts (s3.5). No succession or escrow statement was found. [EULA](https://www.reaper.fm/license.txt)
- Network and telemetry: no account is needed. The EULA and home page have no privacy statement, and `privacy.php` returned 404. Update checking is not described on the pages read. ReaStream (LAN streaming) and ReaNINJAM (NINJAM servers) are bundled network plugins. [EULA](https://www.reaper.fm/license.txt), [technical](https://www.reaper.fm/technical.php)

**Consequential operations (E5)**
- The contents list has "The Undo History Window" (2.28) and "Customizing Undo History Behavior" (22.13), and "Project and File Management" (22.11). No warning text was read. [User Guide 7.81](https://dlx.reaper.fm/userguide/ReaperUserGuide781c.pdf)
- Destructive commands, overwrite on render, and delete-from-disk warnings: not found in the docs read.

## Gaps to test or read next
1. Read the guide body (download the PDF locally) for 3.3, 12.21, 12.23, 21.2, 22.11, 22.13 and record exact backup and autosave behavior.
2. Create a synthetic project (3 tracks, 2 plugins, automation, a send), open the `.RPP` in a text editor, and check which settings are readable and which are encoded plugin chunks.
3. Use Consolidate/Export to a new folder, open it on a clean install without the plugins, and list what breaks.
4. Render stems and master to WAV, re-import into another editor, and compare against the project mix.
5. Save in 7.82, open in an earlier 7.x, and note warnings or lost data. Test whether an older build stays usable after the 60 days.
6. Find the Cockos wiki or forum RPP description and whether Cockos supports third-party RPP parsing.
7. Find the licence behavior after evaluation, the update check setting, and any telemetry; read the Company page and contact licensing@cockos.com if the docs stay silent.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-11/README.md#reaper); [actual assessment](../../content/directory/reaper.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The SDK exposes textual project-state/import interfaces but does not fully specify proprietary-core or arbitrary plugin chunks. Complete RPP/media/plugin/automation reconstruction and compatible offline continuation have not been independently demonstrated.
- E5: Not Verified. SDK save/load and undo context flags explicitly allow extensions to choose saved undo state. Those contracts are not full evidence of effective script/plugin authority, destructive media operations, consolidation/output overwrite and correction in the assessed core/configuration.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish a replacement editable audio workflow preserving routing, automation and plugin-dependent meaning. Consolidated media and rendered stems are useful handoff routes, not the full native-session migration comparison.

Remaining: Actual RPP/plugin-state inspection, backup/autosave defaults, clean-host consolidation, stem equivalence, version compatibility and evaluation-license behavior remain untested; the proprietary core was not inspected. E5 needs core/configuration-specific plugin/script and media/save/export control, with explicit extension undo and backup limits.

Next without a local installation: Inspect a synthetic RPP/media/extension-state packet and dependency manifest with expected routing/automation/stems; obtain robust same-version independent save/undo/consolidation observations since the proprietary core is not available for source inspection.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

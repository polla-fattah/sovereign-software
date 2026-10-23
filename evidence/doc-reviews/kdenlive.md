# Kdenlive: documentation review

Reviewed 22 October 2026 from the Kdenlive 26.08 Manual (docs.kdenlive.org), kdenlive.org (download, release news), kde.org's application privacy policy, and the GitHub mirror README only. Latest stable release found: 26.08.2, dated "Tuesday, 13 October 2026" on its [release post](https://kdenlive.org/news/releases/26.08.2/); the [download page](https://kdenlive.org/download/) gives the version but no date, and a search summary reported the news index showing 9 October, so the date is uncertain. Licence: GPL-3.0 per the [GitHub mirror](https://github.com/KDE/kdenlive); the download page does not name a licence.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. Pages were read through a summarising fetcher, so every fact rests on a summary of the page, not the full text.

## What the documentation says

Follow-up, 23 October 2026: resolved questions and remaining work are recorded in the [second third-pass batch](../third-pass/batch-2/README.md#kdenlive) and reflected in the [application assessment](../../content/directory/kdenlive.md). The earlier review below is superseded where that evidence answers or corrects it.

**Storage and access (E1, E3)**
- The `.kdenlive` file is XML based on MLT's format. It stores a reference to source media (not the media itself; title and colour clips are the main exceptions), timeline positions, effects, parameters and keyframes. MLT can render it directly and "simply ignores" Kdenlive-specific data. Only MLT is named as a reader of the file; the detailed format is delegated to `fileformat.md` in the repository (not read). [project files](https://docs.kdenlive.org/en/project_and_asset_management/file_management/project_files.html)
- Each project has a folder with `proxy/`, `thumbs/`, `titles/` and `.backup/`. Source media can live anywhere. Titles saved outside the project file go to `titles/`. [folder structure](https://docs.kdenlive.org/en/project_and_asset_management/file_management/folder_structure.html)

**Exit and migration (E2)**
- Archive Project copies the files the project needs into a folder, optionally as `tar.gz` or `zip`, and rewrites clip paths to the archived copies. "Archive only timeline clips" leaves unused bin clips out. [archiving](https://docs.kdenlive.org/en/project_and_asset_management/file_management/archiving.html)
- OpenTimelineIO import and export carry multi-track timelines and markers. Kdenlive marker types survive a round trip only via a "kdenlive" metadata key. Clip markers are shared per clip in Kdenlive but unique per instance in OTIO. OTIO carries no render settings. What happens to effects in OTIO was not found. [File menu](https://docs.kdenlive.org/en/user_interface/menu/file_menu.html)
- Render offers audio, image-sequence, lossless (FFV1, H.264) and delivery presets, zone or marker multi-export, and a separate file per audio track. The page does not mention EDL, XML or AAF export. [render](https://docs.kdenlive.org/en/exporting/render.html)

**Recovery (E3)**
- A backup is created on every save and kept in `.backup/` (Linux `~/.local/share/kdenlive/.backup/`). Retention is up to 20 versions each from the last hour, the day and 7 days, plus 20 older. Restore through Project > Open Backup File. [backup](https://docs.kdenlive.org/en/project_and_asset_management/file_management/backup.html)
- Autosave defaults to every 60 seconds and/or 25 operations, into a `stalefiles` cache folder. Recovery is offered on reopen only if the autosave is newer than the saved file. [auto save](https://docs.kdenlive.org/en/project_and_asset_management/file_management/auto_save.html)
- Document version is stored in `kdenlive:docproperties.version`; it moved from 1.04 to 1.1 with sequences in 23.04. Opening an older project upgrades it and writes `<project>_backup.kdenlive`. Newer files cannot be opened in older releases; the backup copy is the way back. [project files](https://docs.kdenlive.org/en/project_and_asset_management/file_management/project_files.html)

**Continuing authority (E4) and dependencies**
- The README calls Kdenlive "a community-driven project"; primary development is on KDE Invent and GitHub is a mirror. No succession statement or formal governance text was found. Trademarks belong to KDE e.V. [GitHub](https://github.com/KDE/kdenlive), [download](https://kdenlive.org/download/)
- KDE's policy says its software generally sends no device data without an explicit user action, and that any telemetry is opt-in and off by default. It does not say what Kdenlive itself does. Kdenlive's own privacy page returned 404, and no update-check statement for the app was found. [KDE app privacy policy](https://kde.org/privacypolicy-apps/)
- The Share menu lists YouTube, Nextcloud and Telegram upload, so optional network features exist. No account is described as required for editing. [render](https://docs.kdenlive.org/en/exporting/render.html)
- Windows 10+, macOS 13+, Linux AppImage and Flatpak are offered. [download](https://kdenlive.org/download/)

**Consequential operations (E5)**
- Undo is unlimited in memory by default and survives saves; clearing the history is irreversible, and deleting a sequence clears the stack. [Edit/View menu results](https://docs.kdenlive.org/en/user_interface/menu/view_menu.html) (taken from a search summary, page not read in full)
- The File menu advises copying the project file before changing project settings, and says changing the project folder location does not work properly. [File menu](https://docs.kdenlive.org/en/user_interface/menu/file_menu.html)
- Deleting `.backup/` is allowed but backups restart only from the next load; check `titles/` before deleting it. The render page does not say how existing output files are handled, and calls Parallel Processing "somewhat experimental". [folder structure](https://docs.kdenlive.org/en/project_and_asset_management/file_management/folder_structure.html), [render](https://docs.kdenlive.org/en/exporting/render.html)

## Gaps to test or read next
1. Build a synthetic project (three clips, a title, two effects with keyframes, a nested sequence); run `grep -c "<producer"` and render it with MLT's `melt` without Kdenlive. Compare the output with Kdenlive's render.
2. Archive it, move the archive to another machine, open it, and diff the rewritten XML paths against the original.
3. Export to OTIO, import into a second editor, and list what is lost (effects, keyframes, titles, nested sequence).
4. Save in 26.08.2, try to open in an earlier release, then use the `_backup.kdenlive` copy. Also test opening a 23.04-era project.
5. Kill the process mid-edit and check the autosave and backup prompts; delete a source file and observe the missing-media behaviour (not found in the docs).
6. Read `fileformat.md` in the repository, the Auto Save and proxy pages in full, and any Kdenlive-specific update-check or telemetry setting (not found).
7. Settle the release date (31 Aug vs 6 July for 26.08.0 was reported inconsistent) and confirm the licence text and any contributor agreement (not found).

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-5/README.md#kdenlive); [actual assessment](../../content/directory/kdenlive.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The XML fixture reveals timeline/effect/resource relationships, and archive code rewrites resource/proxy/title paths. It does not include an observed complete dependency archive or independent reconstruction with equivalent keyframes, effects and media. Rendering/interchange and version/crash recovery remain incomplete.
- E5: Not Verified. User-directed video editing is not sufficient evidence for save/archive overwrite, render/share approval, asset deletion or correction after missing assets and project mutations. The archive-path routine does not cover the consequential-action surface.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Complete archive/move/restore, missing assets, render equivalence, keyframes, OTIO losses, and version/crash recovery. E5 needs asset/save/render/share authorization, inspectable project changes and available correction after destructive edits or overwrite.

Next without a local installation: Acquire a complete synthetic project/archive/media packet with expected timeline/keyframes and reference renders or OTIO comparisons; inspect XML/assets and seek same-version save/render/archive control evidence.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

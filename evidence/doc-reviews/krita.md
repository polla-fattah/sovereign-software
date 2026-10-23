# Krita: documentation review

Reviewed 22 October 2026 from the Krita Manual (docs.krita.org), krita.org, and the KDE Invent repository page. Access caveat: every direct fetch of docs.krita.org and krita.org failed with a certificate error ("unable to verify the first certificate"), so those pages were not read in full. Facts below from them rest on summaries of search results restricted to official domains, and are marked "(search summary)". The KDE Invent page was read directly. Latest stable release found: Krita 5.3.4 and 6.0.4, released together on 15 September 2026 (search summary of the release posts; the date was not read verbatim from the page). The manual pages seen are headed "Krita Manual 5.3.0". Licence: GNU GPLv3 per the repository page.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

Two bounded questions are resolved in [batch 5](../third-pass/batch-5/README.md#krita) and reflected in the [application page](../../content/directory/krita.md). Existing eligibility and principle ratings remain unchanged until the next-pass reconciliation, as requested by the user.

- [x] Resolved: The retained KRA opened as a seven-member ZIP. Namespace-aware maindoc.xml parsing identifies a 100-by-100 RGBA image and Layer 1, whose filename layer0 maps to the archive's built image/layers/layer0 payload; ICC files and preview.png are also present. This historical fixture has no mergedimage.png. Layer pixels and color-profile semantics were not decoded or rebuilt.
- [x] Resolved: The OpenRaster visitor saves generator, clone and external layers through their raster projection, preserves groups as stacks, and skips fake nodes such as reference-image/grid layers. Its adjustment-layer branch creates a Krita-specific filter element but does not append it to the stack in that branch. ORA therefore cannot be assumed to preserve every native editable construct; no export/import was executed.

Remaining: Native pixel reconstruction, masks/vector/text/animation and color fidelity across ORA/PSD/PNG, actual adjustment-layer export behavior, version round trips, backup/autosave recovery and update/network controls.

## What the documentation says

**Storage and access (E1, E3)**
- A `.kra` file can be renamed to `.zip` and opened, since the format is "vaguely based on" the open document standard (search summary). The manual says it contains `mergedimage.png`, the flattened render, which other applications can use; Scribus is named as one (search summary). [kra format](https://docs.krita.org/en/general_concepts/file_formats/file_kra.html)
- Other applications mostly cannot open `.kra` directly (search summary). Whether `maindoc.xml` and the layer data layout are specified in the manual was not found; the summary did not mention `maindoc.xml`. [kra format](https://docs.krita.org/en/general_concepts/file_formats/file_kra.html)
- The FAQ says some `.kra` zips have the last bytes missing and suggests a ZIP repair tool (search summary). [FAQ](https://docs.krita.org/en/KritaFAQ.html)

**Exit and migration (E2)**
- Saving to a format other than `.kra` triggers a warning about what will be lost, and Krita offers to also save a `.kra` (search summary). [working with images](https://docs.krita.org/en/user_manual/working_with_images.html)
- PSD support is partial: transform masks are not loaded or saved, and the manual recommends `.ora` or `.tiff` instead. ORA stores layers as PNG and is described as open (search summary). [psd](https://docs.krita.org/en/general_concepts/file_formats/file_psd.html), [ora](https://docs.krita.org/en/general_concepts/file_formats/file_ora.html)
- Merging layers can zero out colour data inside fully transparent areas; Split Alpha is the suggested workaround (search summary). [layers menu](https://docs.krita.org/en/reference_manual/main_menu/layers_menu.html)

**Recovery (E3)**
- Plain backups use a `~` suffix and are overwritten on each save, so the earlier content is gone. The default is one backup; General Settings allows up to 99 numbered backups (search summary). [autosave and backups](https://docs.krita.org/en/user_manual/autosave.html)
- Save Incremental Backup (F4) copies the last saved version to a numbered file. It does not include unsaved changes (search summary). [file menu](https://docs.krita.org/en/reference_manual/main_menu/file_menu.html)
- Autosave defaults to every 15 minutes, offers recovery after a crash, and autosave files are removed on a normal close (search summary). [autosave](https://docs.krita.org/en/user_manual/autosave.html)
- Version compatibility: Krita 4.0 notes say Krita 3 cannot read vector and text objects saved by 4, and the 5.0 notes say a file loaded in 5 and saved can no longer open in older versions (search summary). Zip64 files may not open in older Krita. [4.0 notes](https://krita.org/en/posts/2018/krita-4-0-release-notes/), [5.0 notes](https://krita.org/en/release-notes/krita-5-0-release-notes/)

**Continuing authority (E4) and dependencies**
- The privacy statement says Krita does not collect or transmit personal information, needs no registration, and makes no internet connection by default. The Recent News feature on the start screen, if enabled, downloads news (search summary; the pages found may be old). [privacy statement](https://krita.org/en/privacy-statement/)
- A built-in update check in the standalone builds was not found in the docs. The licence page says the Steam and Microsoft Store builds use the store to check for updates (search summary). [licence](https://krita.org/en/about/license/)
- The manual describes a local Usage Log of recent sessions, gathered for bug reports and not described as sent automatically (search summary). [logs](https://docs.krita.org/en/reference_manual/sharing_krita_logs.html)
- The repository is on KDE Invent, listed as GNU GPLv3. Governance, funding, and succession statements: not found in the docs. [repository](https://invent.kde.org/graphics/krita)

**Consequential operations (E5)**
- Undo stack size is a setting; 0 means unlimited. Old undo states can be swapped to disk. Switching snapshots discards the undo stack (search summary). Whether closing a document discards history: not found in the docs. [general settings](https://docs.krita.org/en/reference_manual/preferences/general_settings.html), [snapshot docker](https://docs.krita.org/en/reference_manual/dockers/snapshot_docker.html)
- Ordinary save overwrites the previous `~` backup, as above. [autosave](https://docs.krita.org/en/user_manual/autosave.html)

## Gaps to test or read next
1. Re-fetch docs.krita.org and krita.org pages directly (certificate error here) and confirm every "search summary" item verbatim, including the 5.3.4 and 6.0.4 date.
2. Unzip a synthetic multi-layer `.kra`, list contents, and check whether `maindoc.xml` and layer files can be read and rebuilt without Krita.
3. Export the same file to ORA, PSD, and flattened PNG; open each in another editor and list lost layers, masks, blend modes, and text.
4. Save a file in 5.3.4, open it in 6.0.4, save, and try to reopen it in 5.3.4.
5. Kill Krita mid-edit and test autosave recovery; save twice and confirm the `~` backup is overwritten.
6. Read the file format specification pages, if any, and the Recent News and update-check behaviour on a network-blocked machine.
7. Governance, funding, and succession: not found in the docs; check krita.org about pages.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-6/README.md#krita); [actual assessment](../../content/directory/krita.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The historical KRA exposes a layer/payload relationship and profiles but its pixel data/color semantics were not independently rebuilt. OpenRaster source projects or skips some native constructs, so neither equivalent layers/masks/animation nor complete native recovery follows from ZIP readability.
- E5: Not Verified. User-directed image editing does not establish plugin/script authority, save/export overwrite decisions or correction after layer and animation changes. Conditional backups/autosave and effective settings still lack sufficient evidence for this profile.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Native pixel reconstruction, masks/vector/text/animation and color fidelity across ORA/PSD/PNG, actual adjustment-layer export behavior, version round trips, backup/autosave recovery and update/network controls. E5 needs save/autosave, plugin/script and destructive-edit/overwrite visibility and correction boundaries.

Next without a local installation: Use a synthetic KRA with representative layers/masks/text/animation and dependency/color manifest, native/interchange exports and reference comparisons; inspect archives and seek matching save/undo/autosave controls.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

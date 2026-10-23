# Shotcut: documentation review

Reviewed 22 October 2026 from shotcut.org (download page, FAQ, privacy page, release blog), the official Documentation category of the Shotcut forum, and the GitHub README only. Current stable release: 26.9.27, posted "Sep 27, 2026" on the release blog; the download page gives the version but no date. Licence: GPLv3 per the FAQ and README. The Shotcut User Guide PDF could not be read (the shotcut.org/howtos path returned 404; the stockmedia copy exceeded the fetch size limit), so nothing here rests on it.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 11](../third-pass/batch-11/README.md#shotcut) and reflected in the [application page](../../content/directory/shotcut.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The XML checker resolves relative media against the project directory, collects missing local resources and rewrites selected replacement paths. A changed resource hash resets stream indices and selected metadata. Relinking can therefore alter project interpretation rather than simply restore a missing filename.
- [x] Resolved: Autosaves are .mlt files under the application-data autosave directory with an MD5-derived managed-name filename. The helper removes its file on destruction or managed-file change and can locate an existing stale file. This identifies a transient recovery mechanism, not a durable versioned backup or a successful crash-recovery test.

Remaining: A complex timeline reopened/rendered independently, filter/proxy closure, actual crash recovery, older-version opening and media consolidation remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- Projects are saved as MLT XML, a text format. The file "does not contain any of your media" and only links to media by path. Three project types exist: clip, playlist, timeline. [Project Management](https://forum.shotcut.org/t/project-management/12574), [FAQ](https://www.shotcut.org/FAQ/)
- Paths are relative when the media sits in the `.mlt` folder or a subfolder, otherwise absolute, decided per file. An optional project folder holds companion files such as stabilization data, reversed clips and recordings. [Project Management](https://forum.shotcut.org/t/project-management/12574)
- The README lists MLT as a dependency, so the XML dialect is that of an open framework. Whether other MLT tools can open a Shotcut project was not found in the docs. [GitHub](https://github.com/mltframework/shotcut)
- A forum search summary said Shotcut can fully understand only the MLT XML it writes; this came from a search snippet, not a page I read in full.

**Exit and migration (E2)**
- To move a project, copy the whole project folder; with absolute paths the media folders must come too. Moving media after adding it breaks links. [Project Management](https://forum.shotcut.org/t/project-management/12574)
- Opening a project with missing files shows a dialog to re-link them, which writes a second "Repaired" `.mlt` beside the original. Re-linking when the dialog does not appear is not explained. [Project Management](https://forum.shotcut.org/t/project-management/12574)
- Export is File > Export > Video. Listed presets include H.264, WebM, ProRes 422, DNxHR HQ, FLAC, MP3, Ogg Vorbis. What editing state is lost on export is not stated. [FAQ](https://www.shotcut.org/FAQ/)
- The page says Shotcut "does not provide very much in the way of project management"; archiving that gathers media is only a forum request, not a feature. [Project Management](https://forum.shotcut.org/t/project-management/12574)

**Recovery (E3)**
- Autosave is always on and cannot be disabled. It writes a hidden backup in the app data directory, checked every 60 seconds, for crash recovery only. A successful save removes it. Unsaved projects are checked on restart; named projects only when opened. [Project Management](https://forum.shotcut.org/t/project-management/12574)
- Compatibility between versions: a developer reply (2021, for 21.02/21.04) says a newer project may be converted and marked "repaired", with Time Remap effects removed, and that opening a much newer project warns. Some pre-2020 HTML-based filters convert poorly or not at all. This is a user-forum thread, not a manual page. [forum thread](https://forum.shotcut.org/t/opening-past-mlt-files-with-updated-shotcut-version/25451)
- The FAQ does not discuss project compatibility across versions, but says several versions can be installed side by side. [FAQ](https://www.shotcut.org/FAQ/)
- Current-release statements on project compatibility: not found in the docs.

**Continuing authority (E4) and dependencies**
- The FAQ says no network access is needed to activate, check a subscription, or send usage analytics, and that Shotcut collects no usage activity. The site privacy page says the website keeps no IP or user-agent logs; the forum has its own policy; Google AdSense serves ads on the site. [FAQ](https://www.shotcut.org/FAQ/), [privacy](https://shotcut.org/privacy/)
- An in-app update check: not found in the docs. The download page says only the Microsoft Store, Flathub and Snap builds update automatically. [download](https://shotcut.org/download/)
- Release 26.9.27 hardened downloads (no HTTP fallback, no ignoring certificate errors, Whisper model checksum). It lists a security advisory with a CVE "soon". "Allow External Plugins" is off by default. This shows Shotcut downloads models over the network. [release blog](https://shotcut.org/blog/new-release-26.9.27/)
- The README names Dan Dennedy as main author and Brian Matherly as contributor, and describes no formal governance or succession. Build needs MLT, Qt 6, FFmpeg, Frei0r, SDL, FFTW. [GitHub](https://github.com/mltframework/shotcut)

**Consequential operations (E5)**
- Undo and history: not covered in the FAQ or Project Management pages; not found in the docs I read.
- The forum page mentions a Settings Backup option that stores backups inside the project file, with no detail. A forum search summary also mentioned a Backup & Save command that writes a timestamped copy; I did not read the page. [Project Management](https://forum.shotcut.org/t/project-management/12574)
- Warnings on overwrite or deletion by editing commands: not found in the docs.

## Gaps to test or read next
1. Read the User Guide PDF in parts (undo, Backup & Save, Trim/Ripple, proxy, Convert to Edit-friendly).
2. Build a synthetic timeline with filters, transitions and nested clips; save, then open the `.mlt` in a plain editor and in melt (MLT CLI). Compare what renders.
3. Save in 26.9.27, open in an older release, and note warnings, "repaired" files and lost filters.
4. Move the project folder, then break one link, and check the re-link dialog and the Repaired file.
5. Force a crash and check what autosave recovers for named and unsaved projects.
6. Export H.264 and ProRes, then list what the editable project state loses.
7. Watch network traffic on a clean start for update checks or telemetry (not found in the docs).
8. Find official statements on succession, release support policy, and which releases get security fixes.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-11/README.md#shotcut); [actual assessment](../../content/directory/shotcut.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The XML checker resolves and rewrites missing resource paths, and changed hashes reset selected stream/metadata state. No complete timeline/media/filter/proxy packet has been independently reconstructed with equivalent interpretation or rendering. Relinking source logic alone does not establish project survival.
- E5: Not Verified. Autosave lookup and removal identify transient recovery files, not durable version history. Effective save/overwrite, media relink, filter/script authority and usable correction after failed edits or autosave cleanup remain insufficiently covered.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: A complex timeline reopened/rendered independently, filter/proxy closure, actual crash recovery, older-version opening and media consolidation remain untested. E5 needs save/relink/overwrite and filter/script controls, inspectable changes and actual transient-autosave correction boundaries.

Next without a local installation: Inspect a synthetic full project/media/proxy/filter packet with expected timeline and reference output; obtain same-version relink/save/autosave recovery records from upstream or another assessor.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

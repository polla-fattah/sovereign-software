# MuseScore Studio: documentation review

Reviewed 22 October 2026 from the MuseScore Handbook (handbook.musescore.org), the musescore.org Desktop Privacy Policy, and the GitHub repository musescore/MuseScore only. Latest stable release shown on the GitHub releases page: 4.7.5, dated "08 Sep 13:45", with no year shown on the page. Licence: GPL version 3.0 per the repository README. The handbook pages do not state a version or licence.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. Note that several handbook pages were fetched through a summarising tool, so wording below rests on those summaries, not on a full reading of each page.

## Follow-up: 23 October 2026

2 bounded questions are resolved in [batch 4](../third-pass/batch-4/README.md#musescore-studio) and incorporated into the [application assessment](../../content/directory/musescore-studio.md). The original documentation review below remains a dated record; these narrower findings supersede its corresponding uncertainties.

- [x] Resolved: The published Amazing_grace.mscz opened as ZIP with three members: container XML, a PNG thumbnail and score XML. The score identifies MuseScore 2.0.2 and format 2.06; standard XML parsing found four Part elements, 68 Measure elements, 175 Note elements and 118 Lyrics elements, including readable syllables. These are element counts, not a count of unique musical bars. No layout or playback was reproduced.
- [x] Resolved: The inspected save path writes through a _saving path and conditionally creates a backup before replacing the target. Backup creation requires both the caller's request and the user's setting; the backup helper only handles an existing MSCZ target. Not every save can therefore be assumed to retain an old copy. This identifies implementation conditions, not crash durability or the settings of a user's installation.

Remaining: Current-version MSCZ and MusicXML/MEI/MIDI round trips with notation/layout comparison; old/new release compatibility, actual interrupted saves and recovery, offline playback and export dependencies.

## What the documentation says

**Storage and access (E1, E3)**
- The native formats are `.mscz` and `.mscx`. The page calls the standard save "(compressed) MuseScore file, .mscx", which does not match its own earlier list. An uncompressed save creates a folder with a `.mscx`, a `.png` thumbnail, and any `.json`, `.mss`, `.xml` files. [opening and saving](https://handbook.musescore.org/file-management/opening-and-saving-scores.md)
- That `.mscz` is a zip of XML, and that other tools can read `.mscx`, was not found in the pages read. No published format specification was found.
- Save, Save As, Save a copy, Save selection, and Save to cloud exist. The first save asks for "Save to the cloud" or "Save to computer". [opening and saving](https://handbook.musescore.org/file-management/opening-and-saving-scores.md)
- Cloud scores keep a local copy for offline work, and each save also updates the online copy. [opening and saving](https://handbook.musescore.org/file-management/opening-and-saving-scores.md)
- Default folders for scores, styles, templates, plugins, and soundfonts can be set. [preferences](https://handbook.musescore.org/customization/preferences.md)

**Exit and migration (E2)**
- Export formats: PDF, SVG, PNG, AAC, MP3, OGG, FLAC, WAV, MP4 video, MIDI, MusicXML, braille (BRF), and MEI (from 4.2). Opus is not exported directly. [file export](https://handbook.musescore.org/file-management/file-export.md)
- MIDI keeps notes and instruments but no visual formatting. MusicXML uses version 4.0, and "some features have yet to be implemented". MEI is the Basic subset. Braille supports only bar-over-bar layout. [file export](https://handbook.musescore.org/file-management/file-export.md)
- The MusicXML page does not list what is lost on export (its "gotchas" section is marked "To be added"). On import, it says cleanup is usually needed, and fonts, breaks, and text types may change. [MusicXML](https://handbook.musescore.org/file-management/working-with-musicxml-files.md)
- A downloaded cloud score becomes a separate local file. [opening and saving](https://handbook.musescore.org/file-management/opening-and-saving-scores.md)

**Recovery (E3)**
- The handbook page "Backup and recovered files" contains only the placeholder "TBD". Autosave and backup behavior is therefore not documented there. [backup page](https://handbook.musescore.org/file-management/backup-and-recovered-files.md)
- Preferences mention an autosave interval, but no exact options. Auto-backup is not covered. [preferences](https://handbook.musescore.org/customization/preferences.md)
- Version 4 opens older scores, but they "may not look the same": beams, slurs, ties, spacing, and page layout are most affected. Sounds are now saved per score. Whether older versions can open newer files was not found. [upgrading](https://handbook.musescore.org/introduction/upgrading-from-earlier-versions.md)

**Continuing authority (E4) and dependencies**
- No account is needed to use the app. The update check is on by default and can be turned off in Preferences. [desktop privacy policy](https://musescore.org/en/about/desktop-privacy-policy), [preferences](https://handbook.musescore.org/customization/preferences.md)
- Update check sends version, OS, and CPU architecture, and the IP is truncated to three octets. Crash dumps are sent on serious errors. Data is deleted within 12 months. Controller: MuseCY SM Ltd., Cyprus. Policy last updated 22 July 2024. [desktop privacy policy](https://musescore.org/en/about/desktop-privacy-policy)
- Licence: "licensed under GPL version 3.0". The README lists CONTRIBUTING.md, AI_POLICY.md, and CODE_OF_CONDUCT.md, but their contents were not read. A CLA, governance, and succession statements were not found. [GitHub](https://github.com/musescore/MuseScore)
- Windows, macOS, and Linux are supported. On macOS, installation goes through MuseHub. [installation](https://handbook.musescore.org/introduction/download-and-installation.md)
- Optional online features: cloud saving to musescore.com, audio upload, online sounds, and plugins. [opening and saving](https://handbook.musescore.org/file-management/opening-and-saving-scores.md)

**Consequential operations (E5)**
- Save applies changes to the previously saved file. No overwrite confirmation is described. [opening and saving](https://handbook.musescore.org/file-management/opening-and-saving-scores.md)
- The sitemap shows no dedicated handbook page for undo, privacy, telemetry, or update checks. Undo and history behavior was not found in the docs. [sitemap](https://handbook.musescore.org/sitemap.md)
- Warnings found are limited to third-party conversion services that may "retain files after you have uploaded them". [file export](https://handbook.musescore.org/file-management/file-export.md)

## Gaps to test or read next
1. Unzip a synthetic `.mscz` (`unzip -l`) and check whether the contents are plain XML and readable without MuseScore.
2. Round trip: export a score with repeats, lyrics, and custom text to MusicXML, MEI, and MIDI, re-import, and list what changed.
3. Open a 4.x-saved score in an older release and record the result. Open a 3.x score in 4.7.5 and compare layout.
4. Force a crash with unsaved edits and record what autosave or recovery restores.
5. Run with the network disabled and the update check off, and confirm saving, export, and playback still work.
6. Check what Save does to an existing file (any backup copy, any prompt).
7. Not read: the "Upgrading from MuseScore 3.x" page, plugins page, CONTRIBUTING.md, AI_POLICY.md, any CLA, the release notes for 4.7.5 with its year, and musescore.org terms of service for cloud storage.
8. Confirm the release year for 4.7.5 from another official page, since the releases page omits it.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-3/README.md#musescore-studio); [actual assessment](../../content/directory/musescore-studio.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The retained MSCZ is a MuseScore 2.0.2 score with independently readable notes/lyrics and structure. It does not establish current-version musical/engraving/playback equivalence, complete dependency recovery or a MusicXML/native round trip. Historical ZIP/XML readability remains a bounded positive observation.
- E5: Not Verified. The save path's backup conditions, autosave guards/error reporting and notation transaction undo/rollback entry points are concrete source controls. Effective save/overwrite settings, transient-copy retention and complete correction across the existing score/export workflow remain unestablished; source entry points are not executed recovery outcomes.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish usable migration of the declared score's musical/structural meaning. Reading an older MSCZ and knowing export exists does not compare native and independent interchange representations.

- [x] Resolved: The autosave timer follows the enable/interval configuration. Its save attempt checks for a current project, needAutoSave and canSave, and logs failure; old temporary autosave material can be removed as the active project state changes. This establishes conditions, not effective defaults or successful crash restoration. [Pinned source](https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/project/internal/projectautosaver.cpp).
- [x] Resolved: Notation undo/redo delegates to the transaction manager; explicit rollback and commit end transactions with different flags and notify state changes. These are inspectable editing-control entry points, not proof that every plugin, save or exported representation can be rolled back. [Pinned source](https://github.com/musescore/MuseScore/blob/4676f83f368f1afc9cad6815eb5401a2ec8aca2b/src/notation/internal/notationundostack.cpp).

Remaining: Current-version MSCZ and MusicXML/MEI/MIDI round trips with notation/layout comparison; old/new release compatibility, actual interrupted saves and recovery, offline playback and export dependencies. E5 also needs effective autosave/backup settings, overwrite and export boundaries and evidence of usable correction after failed/interrupted save.

Next without a local installation: Acquire a current native score plus MusicXML output with expected musical structure/dependencies and comparison results; inspect archives/XML here and reuse externally recorded save/undo/recovery observations for the same version.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

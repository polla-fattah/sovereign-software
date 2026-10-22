# Audacity: documentation review

Reviewed 22 October 2026 from the Audacity Manual, audacityteam.org, and the project repository only. Current stable release: 4.0.1 (30 September 2026). The Manual is headed "Audacity 3.7 Reference Manual", so its project, recovery, and undo pages describe 3.x and are not labelled as covering 4.x.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- A project is one `.aup3` file. The glossary says it is a SQLite database. The manual also says a saved project is readable only by Audacity and cannot be opened in any other audio application, and gives no instructions for reading it with other tools. [projects](https://manual.audacityteam.org/man/audacity_projects.html), [glossary](https://manual.audacityteam.org/man/glossary.html)
- Edits keep the original audio for undo, so projects grow, and trimmed audio is retained. There is no command to purge it; the workaround is to copy into a new project. Temporary `-wal` and `-shm` files exist while a project is open, and deleting or moving them then "will destroy the project". [projects](https://manual.audacityteam.org/man/audacity_projects.html)
- The legacy `.aup` format is a reference file plus `_data` folders of `.au` blocks, used up to 2.4.2. [glossary](https://manual.audacityteam.org/man/glossary.html)

**Exit and migration (E2)**
- Export loses project-specific information: labels and envelope data are stated lost, and time tracks cannot be transferred. Multi-track projects are mixed down by default; Multiple Files export writes per-track or per-label files. Hidden clip parts and muted tracks are not exported. [sending your work](https://manual.audacityteam.org/man/sending_your_work_to_others.html), [export dialog](https://manual.audacityteam.org/man/file_export_dialog.html)
- Formats: WAV, AIFF, FLAC, MP3, Ogg, Opus, and more; FFmpeg is an optional separate library for some. WAV is limited to 4 GB. [export dialog](https://manual.audacityteam.org/man/file_export_dialog.html)
- A project can be moved as one file when closed; Save Project As and Backup Project copy it. The manual advises against keeping an active project on USB, network, or cloud storage. [projects](https://manual.audacityteam.org/man/audacity_projects.html)

**Recovery (E3)**
- Crash recovery restores from periodic snapshots. Undo history and in-progress label text are not recoverable. A discarded project is not recoverable. [recovery](https://manual.audacityteam.org/man/recovery.html)
- The 4.0.1 changelog lists fixes for "project corruption after a failed save" and for clips being damaged when converting `.aup3` projects. [changelog 4.0.1](https://www.audacityteam.org/changelog/4.0.1/)
- Audacity 3.x opens 2.x `.aup` projects by converting them, and a project saved as AUP3 cannot be opened before 3.0.0. The Audacity 4 page says every 3.x `.aup3` opens directly in 4. Whether 3.x can open a project saved by 4.x was not found. [audacity 2](https://manual.audacityteam.org/man/audacity_2.html), [Audacity 4](https://www.audacityteam.org/audacity-4)

**Continuing authority (E4) and dependencies**
- No account is required, and the privacy notice says all network features are optional. The update check is on by default (version, OS, country from a truncated IP), and error reporting and usage statistics are described as optional, with usage statistics opt-in. Data controller named: MuseCY SM Ltd. [privacy notice](https://www.audacityteam.org/legal/privacy-notice)
- Cloud saving through audio.com is offered, and local saving remains available. [projects](https://manual.audacityteam.org/man/audacity_projects.html)
- Licence: the README says GPLv3 (most files GPLv2-or-later); the manual's licence page says GPL v2, so the two differ. The site names Muse Group as copyright holder, and contributors must sign a CLA (text not read). [GitHub](https://github.com/audacity/audacity), [licence](https://manual.audacityteam.org/man/license.html)
- Plugins: Nyquist, LV2, VST, Audio Units. Macros are stored outside the project file as text. `mod-script-pipe` is off by default and the manual says it "weakens computer security". [macros](https://manual.audacityteam.org/man/macros.html), [scripting](https://manual.audacityteam.org/man/scripting.html)

**Consequential operations (E5)**
- Undo is unlimited while the project is open, and closing the project discards the history. Saving and exporting are not undoable. The History window lists actions. [undo and history](https://manual.audacityteam.org/man/undo_redo_and_history.html)
- Closing compacts the project and discards undo data, and unsaved changes can be lost permanently if the user declines to save. [projects](https://manual.audacityteam.org/man/audacity_projects.html), [recovery](https://manual.audacityteam.org/man/recovery.html)

## Gaps to test or read next
1. Whether an `.aup3` can be read without Audacity (open the SQLite file and inspect the tables) and what a third party could recover.
2. Round trip: export per-track WAV plus labels, rebuild in another editor, and list what is lost.
3. Open a 3.x project in 4.0.1, save, and try to open it in 3.x.
4. Recovery after a forced crash, and behavior after a failed save.
5. Effects applied to selections and whether any effect or plugin dependency breaks a project on another machine (not found in the docs).
6. Reconcile the GPL v2 and v3 statements and read the CLA text.

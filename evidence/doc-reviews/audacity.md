# Audacity: documentation review

Reviewed 22 October 2026 from the Audacity Manual, audacityteam.org, and the project repository only. Current stable release: 4.0.1 (30 September 2026). The Manual is headed "Audacity 3.7 Reference Manual", so its project, recovery, and undo pages describe 3.x and are not labelled as covering 4.x.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Follow-up: 23 October 2026

2 bounded questions are resolved in [batch 4](../third-pass/batch-4/README.md#audacity) and incorporated into the [application assessment](../../content/directory/audacity.md). The original documentation review below remains a dated record; these narrower findings supersede its corresponding uncertainties.

- [x] Resolved: The pinned test.aup4 fixture exposes project, autosave, sampleblocks and project_history schemas to standard SQLite. Its project row contains 2,067-byte dictionary and 2,177-byte document BLOBs, but reading sampleblocks and running integrity_check report database disk image is malformed with SQLite 3.45.3. The bytes match the upstream Git blob. This resolves this sample's read boundary, not independent audio recovery or a general Audacity defect.
- [x] Resolved: The shared project-file implementation stores encoded XML as dictionary/document BLOBs, not ordinary XML text. The serializer publishes field opcodes and character-width handling; sample blocks carry numeric audio data while valid block lengths come from the encoded project. SQLite table access alone is therefore insufficient to reconstruct an editable session. AUP3 recovery and AUP3/AUP4 compatibility were not demonstrated.

Remaining: A known-good representative AUP3/AUP4 project decoded and reconstructed independently; sample-audio recovery, track/label migration, cross-version saves, plugin fidelity and crash recovery.

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

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-3/README.md#audacity); [actual assessment](../../content/directory/audacity.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The retained AUP4 bytes match upstream, but generic sample-block reading and integrity checking failed in the recorded SQLite reader. Encoded project XML and audio-block semantics still require reconstruction, and the AUP4 sample cannot certify AUP3. This sample-specific unsuccessful check is not an application-wide E3 Fail or a successful audio recovery.
- E5: Not Verified. The history code exposes undo/redo state, initialization resets and autosave requests; new edits can discard redo. These answer editing-retention questions but do not establish the complete project's save/overwrite, destructive effects, current UI settings and recovery controls across the stated AUP3/AUP4/version scope.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

- [x] Resolved: The inspected project-history initialization clears existing undo states. New non-consolidated edits abandon redo states, while history pushes normally request autosave unless flagged otherwise. This identifies control and retention boundaries, not persistent recoverability of every AUP3/AUP4 project. [Pinned source](https://github.com/audacity/audacity/blob/f515da46486301d48db89f195729ef0c87980668/au3/libraries/au3-project-history/ProjectHistory.cpp).

Remaining: A known-good representative AUP3/AUP4 project decoded and reconstructed independently; sample-audio recovery, track/label migration, cross-version saves, plugin fidelity and crash recovery. E5 also needs version-matched save/overwrite/destructive-edit controls and their recoverable state boundaries; initialization/redo source behavior is now answered.

Next without a local installation: Use a known-good representative AUP3 and AUP4 packet with expected track, label and sample metadata plus independent audio extraction; pair it with primary-source or recorded save/undo/overwrite evidence for each exact version.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

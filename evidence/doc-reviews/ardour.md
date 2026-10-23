# Ardour: documentation review

Reviewed 22 October 2026 from the Ardour manual and ardour.org only. Latest stable release shown: 9.8 (23 August 2026). Source licence: GNU GPL v2.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Follow-up: 23 October 2026

2 bounded questions are resolved in [batch 4](../third-pass/batch-4/README.md#ardour) and incorporated into the [application assessment](../../content/directory/ardour.md). The original documentation review below remains a dated record; these narrower findings supersede its corresponding uncertainties.

- [x] Resolved: Standard XML parsing of the historical 1region session reads session version 3001, sample-rate 48000, two routes and one external MIDI source. Both the region source-0 and master-source-0 references resolve to source ID 118, named MIDI 1-1.mid. This establishes readable session relationships; the referenced media was not opened and no sound was rendered.
- [x] Resolved: UnknownProcessor copies the missing processor's XML state and returns a copy when saving, retaining stored state rather than implementing the missing plugin. Its run method does not recreate plugin processing and silences excess outputs when saved I/O information is available. State preservation therefore does not imply audio equivalence or successful later plugin reactivation.

Remaining: Complete archived-session restore including media and plugins, missing-plugin playback and later reactivation, stem migration losses, snapshots/crash recovery, version compatibility and update-check control.

## What the documentation says

**Storage and access (E1, E3)**
- A session is a folder. It holds `<name>.ardour` (the main session snapshot), other snapshots, `<name>.ardour.bak`, `<name>.history` (undo history), `instant.xml`, and folders `interchange/` (audio and MIDI), `export/`, `peaks/`, `analysis/`, and `dead sounds/`. [what's in a session](https://manual.ardour.org/working-with-sessions/whats-in-a-session/)
- The pages read do not state that the `.ardour` file is XML and do not specify its format. A `luasession` command-line tool and Lua scripting can read and modify a session. [Lua scripting](https://manual.ardour.org/lua-scripting/)

**Exit and migration (E2)**
- To move a session, copy the folder; another Ardour user on any platform can open it. Media imported without "Copy to Session" stays outside the folder; "Bring all media into session folder" copies it in. [backup and sharing](https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/), [cleaning up](https://manual.ardour.org/working-with-sessions/cleaning_up/)
- Archive writes one tar.xz with the current snapshot, used files only, and plugin settings, with optional FLAC compression (fixed-point, so floating-point audio loses precision). [backup and sharing](https://manual.ardour.org/working-with-sessions/backup-and-sharing-of-sessions/)
- Interchange: stem export keeps only audio and MIDI and can render plugin processing; AAF import is supported; OMF and AAF export are not offered. The manual says moving projects between DAWs "has never been particularly easy". [interchange](https://manual.ardour.org/working-with-sessions/interchange-with-other-daws/)

**Recovery (E3)**
- `.bak` auto-backup and manual snapshots are documented; the pages read do not say when `.bak` is written or how to restore it. Release notes for 9.8 describe crash recovery of recordings. [snapshots](https://manual.ardour.org/working-with-sessions/snapshots/), [what's new](https://ardour.org/whatsnew.html)
- Older sessions load back to Ardour 2.8 "with very few exceptions", skipping data that is no longer supported. Opening a newer session in an older Ardour: not found. [what's in a session](https://manual.ardour.org/working-with-sessions/whats-in-a-session/)
- Plugin binaries are not stated to travel with a session, and behavior with a missing plugin was not found. Output port choices are saved in the session and need reconnecting on a different audio interface. [plugins](https://manual.ardour.org/working-with-plugins/), [FAQ](https://ardour.org/faq.html)

**Continuing authority (E4) and dependencies**
- No licence keys or activation ("would go against the GPL"). A subscription is not needed to run Ardour, and already downloaded versions keep working. [FAQ](https://ardour.org/faq.html)
- Ready-to-run builds are pay-what-you-want (from US$1) or by subscription; downloads and older versions after cancelling are not guaranteed, so users should keep their own installer. Building from source is offered but unsupported, and the FAQ calls it challenging on Windows and macOS. Some bundled plugins exist only in official builds. [FAQ](https://ardour.org/faq.html), [download](http://community.ardour.org/download), [plugins](https://manual.ardour.org/working-with-plugins/)
- Builds from ardour.org contact ardour.org at startup to check for a new release; a double-hashed IP address, OS name, and country code are stored. A setting to turn this off was not found. [privacy](https://ardour.org/privacy.html)

**Consequential operations (E5)**
- Undo and redo for edits; a `.history` file is kept. The manual calls Ardour non-destructive, but "Remove Last Capture" cannot be undone. Clean-up moves unused sources to `dead sounds/`, and "Flush Wastebasket" deletes them permanently (not to the system trash), and only after a reload. [Edit menu](https://manual.ardour.org/ardours-interface/main-menu/Edit-menu/), [cleaning up](https://manual.ardour.org/working-with-sessions/cleaning_up/)

## Gaps to test or read next
1. Archive a representative session (with external media and third-party plugins), open it on a clean machine without those plugins, and record what is lost.
2. What a session shows when plugins are missing, and whether plugin state survives.
3. Restoring from `.bak` and from snapshots; what a crash leaves behind.
4. Opening a session saved by a newer version in an older one.
5. Stem export round trip into a second DAW, listing lost structure (routing, automation, plugin chains).
6. Whether the startup update check can be disabled.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-3/README.md#ardour); [actual assessment](../../content/directory/ardour.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The historical session XML resolves an external MIDI source, while the missing-plugin implementation retains XML state without reproducing processing. Complete media, routing/automation meaning, plugin dependencies and compatible session reconstruction are not demonstrated by that readable reference graph.
- E5: Not Verified. Conditional history saving and attempted backup restoration are established in source. Unused-source cleanup stages files, clears history and saves state, and a distinct flush clears the staged files. Authorization in the calling UI, configuration and meaningful recourse across cleanup/plugin/save changes remain insufficiently covered.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

- [x] Resolved: Session undo history is saved only when configured, with a configured depth and available history. The source first renames an existing history file to backup and attempts restoration of that backup after a write failure. This is conditional error-handling code, not observed crash recovery. [Pinned source](https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/session_state.cc).
- [x] Resolved: Unused-source cleanup moves selected media into dead-source directories, then clears session history and saves state. A separate trash-cleanup routine clears those directories. Staging unused media is not the same as a reversible edit or indefinite backup. [Pinned source](https://github.com/Ardour/ardour/blob/b896344c8d16f89e04a235562ab31594605c6715/libs/ardour/session_state.cc).

Remaining: Complete archived-session restore including media and plugins, missing-plugin playback and later reactivation, stem migration losses, snapshots/crash recovery, version compatibility and update-check control. E5 also needs cleanup/flush UI authorization, effective history settings and overwrite/plugin-change recourse; staged dead-source storage is not an indefinite undo guarantee.

Next without a local installation: Collect a synthetic archived session including all media and plugin-dependency/state information, expected routing/automation and stems; inspect the archive independently and obtain version-matched cleanup/history recovery evidence.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

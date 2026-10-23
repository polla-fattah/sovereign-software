# Anki: documentation review

Reviewed 22 October 2026 from the Anki manual and the project repository only. Latest stable release shown: 26.09.3 (23 September 2026). Licence: AGPL-3.0 or later.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

Follow-up, 23 October 2026: two questions are now resolved in the [third-pass evidence](../third-pass/README.md#anki) and reflected in the [application assessment](../../content/directory/anki.md). The review below preserves the earlier documentation record; its gap list is superseded where the follow-up answers it.

**Storage and access (E1, E3)**
- The profile folder holds `collection.anki2` (notes, decks, cards), a `collection.media` folder, backups, and system files; locations are given per OS. [files](https://docs.ankiweb.net/files.html)
- The manual never calls the format SQLite, but its repair steps use `sqlite3 collection.anki2 .dump`. No schema specification is published, and the manual says some storage uses Protocol Buffers that are "not considered public API". [files](https://docs.ankiweb.net/files.html), [architecture](https://docs.ankiweb.net/developers/architecture.md)
- The manual recommends the `anki` Python module over reading or writing the database directly, and warns that direct writes can cause problems. [command-line use](https://docs.ankiweb.net/addons/command-line-use.md), [the anki module](https://docs.ankiweb.net/addons/the-anki-module.md)
- Do not copy the collection while Anki is open, and do not sync the Anki folder through Dropbox-style services or network filesystems. [files](https://docs.ankiweb.net/files.html)

**Exit and migration (E2)**
- Notes in Plain Text: tab-separated with HTML embedded, re-importable. Not stated to include scheduling, media, or note types.
- `.colpkg`: the entire collection with scheduling, optional media; importing replaces all current cards.
- `.apkg`: one deck and its children; scheduling is optional and, if omitted, scheduling information including marked and leech tags is removed; import merges and keeps the most recently modified version of a note.
- Modern package formats are unreadable by older Anki unless the legacy option is ticked. [exporting](https://docs.ankiweb.net/exporting.html), [packaged decks](https://docs.ankiweb.net/importing/packaged-decks.html)

**Recovery (E3)**
- Automatic backups exclude sound and image files and are stored locally. The backups page gives a 30-minute default interval; an FAQ gives different wording (on close or sync, keep 30). The two were not reconciled. [backups](https://docs.ankiweb.net/backups.html)
- Restore: File, Switch Profile, Open Backup. Changes since the backup are lost. A complete media backup needs a `.colpkg` export with media. Deleted notes are logged to `deleted.txt`. [backups](https://docs.ankiweb.net/backups.html)

**Continuing authority (E4) and dependencies**
- AnkiWeb is a free account service for sync. The docs do not say an account is mandatory, and no explicit "works fully offline" statement was found (both inferred). A self-hosted sync server is documented as an advanced feature, "entirely at your own risk", over unencrypted HTTP unless proxied. [syncing](https://docs.ankiweb.net/syncing.html), [sync server](https://docs.ankiweb.net/sync-server.html)
- AnkiWeb data may be deleted after 6 months of inactivity and then cannot be recovered from AnkiWeb. [syncing](https://docs.ankiweb.net/syncing.html)
- Add-ons "use and modify arbitrary parts of Anki's codebase" and can break on upgrade. [add-ons](https://docs.ankiweb.net/manual/addons.md)
- No privacy or telemetry page was read. A "Check for Updates" menu item is mentioned in release notes.

**Consequential operations (E5)**
- Undo reverts the most recent operation (single level, per the page read). Deleting notes deletes all their cards and is logged to `deleted.txt`. Empty Cards is not automatic "as that could lead to accidental data loss". [browsing](https://docs.ankiweb.net/manual/browsing.md), [card generation](https://docs.ankiweb.net/manual/templates/generation.md)
- Structural changes (new field, removed template, change note type) force a one-way sync choice, and syncing several profiles into one account loses data. [syncing](https://docs.ankiweb.net/syncing.html)
- No general edit history is documented; only backups and `deleted.txt` support recovery.

## Gaps to test or read next
1. Export a `.colpkg` and an `.apkg` with media and scheduling, import into a clean install, and compare notes, tags, scheduling, deck options, and media.
2. Whether a package can be read without Anki, given no schema specification.
3. Restore from an automatic backup and from a `.colpkg` without an AnkiWeb account.
4. The media and text-import manual pages, and any schema-upgrade or downgrade warning (none found).
5. Whether the sync-server and backup interval statements agree with actual behavior.

## Rating reconciliation: 23 October 2026

This dated follow-up supersedes the earlier rating freeze, not the historical observations above. [Individual decision and coverage](../rating-reconciliation/batch-2/README.md#anki); [actual assessment](../../content/directory/anki.md).

- E3: Not Verified. Reinspection reproduces integrity ok and the one-card/one-note join and sound-name mapping in the retained legacy APKG. Its mapped media member is only four bytes, not proof of usable audio. Modern package decoding, deck/options and scheduling semantics, complete media and a meaningful collection restore are not covered by this historical fixture.
- E5: Not Verified. Pinned desktop source provides full-sync direction/cancel choices, confirmation paths and a backup call before full download. The undo manager keeps bounded in-memory operations and can clear them. These answer control-path questions but do not establish complete media-inclusive recovery, normal sync conflict handling or restoration after collection-wide destructive actions in the declared learning workflow.
- Longevity and Transparency and Control: Not assessed; their E3/E5 minimums are not established.
- Sovereignty: Not assessed because E2 is Not Verified. The prior E2 Pass rested on a generic documentation lead. The retained legacy fixture establishes readable records, not a usable alternative study workflow preserving the stated scheduling/deck/media meaning. E2 is withdrawn to Not Verified pending an independent conversion and comparison.

- [x] Resolved: The full-sync conflict dialog offers upload, download and cancellation with cancellation as that dialog's default. Dedicated full-upload/full-download confirmation paths also exist; the full-download worker calls create_backup_now before closing for replacement. This proves code paths, not a successful or media-complete backup. [Pinned source](https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/qt/aqt/sync.py).
- [x] Resolved: The undo manager stores a bounded in-memory queue, truncates old steps and clears undo/redo when a step begins without an undoable operation. Undo therefore is not a durable or universal recovery archive. [Pinned source](https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/rslib/src/undo/mod.rs).

Remaining: A modern synthetic collection package with expected notes/cards, deck/options, scheduling and genuine media, independent decoding/comparison, and full-sync/deletion/recovery output remain missing. Legacy readability, full-sync confirmation/backup calls and bounded undo are already resolved; their coverage limits are explicit.

Next without a local installation: Obtain a current-version APKG/COLPKG test export and expected semantic manifest from upstream fixtures or an external assessor. Independently decode and compare it here, keeping notes, cards, options and scheduling together. A recorded restore/sync exercise elsewhere can supply behavior evidence without a local Anki installation.

Source branches were inspected, not run. Hashes and the Anki/Zotero fixture queries were independently rechecked with Python/SQLite. No target app or upstream test suite was executed. Existing E1/E4/Locality findings were outside this targeted re-certification.

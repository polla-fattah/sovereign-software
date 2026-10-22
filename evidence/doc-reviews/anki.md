# Anki: documentation review

Reviewed 22 October 2026 from the Anki manual and the project repository only. Latest stable release shown: 26.09.3 (23 September 2026). Licence: AGPL-3.0 or later.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

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

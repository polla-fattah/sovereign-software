# QOwnNotes: documentation review

## Rating reconciliation: 23 October 2026

The current [rating review](../rating-reconciliation/batch-1/README.md#qownnotes) supersedes the earlier rating freeze. E3: Not Verified; E5: Not Verified; Longevity: Not assessed; Transparency and Control: Not assessed. The actual application page contains the same decisions and supporting evidence.

Remaining: The existing open recovery and consequential-action scenarios remain pending; the individually explained E3/E5 blockers above determine the current Not Verified and Not assessed findings.

Earlier evidence findings below remain historical observations with their original limits, not automatic Pass results.


Reviewed 22 October 2026 from the QOwnNotes website and documentation (qownnotes.org) and the project repository on GitHub only. Latest version in the changelog: 26.10.9; the page prints no date for any release, so the year and day are not stated. Licence: GPL-2.0 per the repository sidebar. The changelog page is very long (about 743,000 characters) and only the first 100,000 characters were read, so statements about recent releases rest on that portion.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 6](../third-pass/batch-6/README.md#qownnotes) and reflected in the [application page](../../content/directory/qownnotes.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The database schema defines tag records with parent_id, noteTagLink records keyed by tag_id, note filename and subfolder path, and trashItem metadata. Tags and their associations therefore have explicit database state beyond Markdown note text. Copying only note files cannot be assumed to preserve this state; no populated database or missing-database reconstruction was tested.
- [x] Resolved: The inspected note-removal path asks about backlinks when relevant and checks a user-question result before invoking note.remove(true). Bulk deletion separately warns that selected folders' files and subfolders will be removed. This establishes application-level confirmation branches, not universal prompting under saved dialog preferences or successful local/server trash restoration.

Remaining: A complete notes.sqlite/native-folder move and tag reconstruction, Markdown export loss, actual trash recovery and deletion modes, simultaneous edits, network settings and older versions.

## What the documentation says

**Storage and access (E1, E3)**
- Notes are saved as plain-text Markdown files in a note folder that can be opened with any text editor. Media and attachment files also live in that folder. [concept](https://www.qownnotes.org/getting-started/concept.html)
- The note folder also holds `notes.sqlite`. The concept page mentions it only for tags shared with Desktop and Android; its full contents are not described (not found in the docs). Local trash details are also kept in this database. [concept](https://www.qownnotes.org/getting-started/concept.html), [overview](https://www.qownnotes.org/getting-started/overview.html)
- External changes to note files are watched, and a dialog shows differences against the changed version. [overview](https://www.qownnotes.org/getting-started/overview.html)
- The docs do not state a folder layout for attachments beyond "in the note folder" (summary of fetched pages).

**Exit and migration (E2)**
- Import is documented for Evernote (.enex), Joplin, Obsidian, GitHub-flavoured Markdown, Google Keep (via a community script) and Tomboy. Export to GFM is said to be supported for one page or all files. [importing notes](https://www.qownnotes.org/getting-started/importing-notes.html)
- Stated losses and risks on import: duplicate headings collapse heading links, heading anchors differ between GFM and QOwnNotes, and Obsidian links can drift. [importing notes](https://www.qownnotes.org/getting-started/importing-notes.html)
- PDF export exists since version 0.69, per a search result summary of the changelog; the page itself was not read. [changelog](https://www.qownnotes.org/changelog.html)
- What is lost when leaving QOwnNotes (tags in `notes.sqlite`, settings, scripts) is not found in the docs.

**Recovery (E3)**
- The docs say QOwnNotes does not sync notes or attachments, and recommend the Nextcloud client or tools such as Syncthing or git. No built-in backup feature was found. [concept](https://www.qownnotes.org/getting-started/concept.html)
- Older note versions and trashed notes can be restored from a Nextcloud or ownCloud server through the QOwnNotes Nextcloud App. [concept](https://www.qownnotes.org/getting-started/concept.html), [overview](https://www.qownnotes.org/getting-started/overview.html)
- Version 26.10.5 changelog: recovery checkpoints no longer restore trailing spaces removed at save. [changelog](https://www.qownnotes.org/changelog.html)
- Version-to-version compatibility of the note folder and database was not found in the docs.

**Continuing authority (E4) and dependencies**
- Licence GPL-2.0; the repository owner is pbek. No governance, succession or maintainer-continuity statement was found. [GitHub](https://github.com/pbek/QOwnNotes)
- Metrics: screen resolution, OS and app version, plus events, go to a self-hosted Matomo server. The page says no note text or names are collected. They are on by default and can be turned off in the welcome or settings dialog. [metrics FAQ](https://www.qownnotes.org/faq/metrics.html)
- Update checking: the changelog mentions an option to turn off the automatic update dialog (per a search summary). Whether the check itself can be disabled was not found. [changelog](https://www.qownnotes.org/changelog.html)
- Optional network features in the README: Nextcloud/ownCloud, CalDAV, Deck, note sharing, AI providers, and a built-in MCP server. The README also embeds a Matomo tracking image. [GitHub](https://github.com/pbek/QOwnNotes)
- The repository PRIVACY.md covers the GitHub repository, not the application. [PRIVACY.md](https://github.com/pbek/QOwnNotes/blob/main/PRIVACY.md)
- Changelog 26.10.4 to 26.10.8: the Nextcloud app replaces the QOwnNotesAPI app, with legacy support kept. [changelog](https://www.qownnotes.org/changelog.html)

**Consequential operations (E5)**
- Trash modes: local trash (per-folder `trash`), system trash, and server trash. [overview](https://www.qownnotes.org/getting-started/overview.html)
- Changelog 26.10.4: encrypted notes could be saved with an empty password after long inactivity; this is now fixed. [changelog](https://www.qownnotes.org/changelog.html)
- Scripts: the scripting pages were not read (the `getting-started/scripting.html` URL returned 404). Warnings on script risk are not found in the docs I read.
- No explicit overwrite or delete warnings were found beyond the sync warning above.

## Gaps to test or read next
1. Copy the note folder to a clean machine without `notes.sqlite`, open it, and compare tags, trash, and note list with the original.
2. Create synthetic notes with attachments, tags, and a deleted note; export to GFM and open in another Markdown editor; list what is lost.
3. Delete a note in local trash mode, then restore it. Repeat with the database removed.
4. Edit the same note externally and in QOwnNotes, and observe the conflict dialog and any lost text.
5. Open a folder written by the latest version in an older release and note any errors.
6. Block network access and confirm that metrics and the update check do not send anything; check whether the update check can be disabled.
7. Read the scripting and script repository pages, the settings pages (not found at the URL tried), the installation page, and the full changelog beyond the first 100,000 characters.
8. Find any funding, governance or succession statement, and the licence text (GPL-2.0 versus later).

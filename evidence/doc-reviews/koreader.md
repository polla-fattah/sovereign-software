# KOReader: documentation review

Reviewed 22 October 2026 from the KOReader User Guide (koreader.rocks), the project wiki, and the GitHub repository only. Latest versioned release found: v2026.07.2, shown as 2 Aug 2026 on the tags page; the release page itself gives "02 Aug" without a year. Its notes say it is identical to 2026.07.1 and was published only to produce a new nightly artifact. No page labels any release "stable" or "latest", and the Releases list on the repository page was empty when fetched. Licence: AGPL-3.0 (repository sidebar; the COPYING text was not read).

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. The User Guide page is long and was read through a summarising fetch, so statements below rest on those summaries. The guide is marked "Guide last update: 2025-03-25", which is older than the release found.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 11](../third-pass/batch-11/README.md#koreader) and reflected in the [application page](../../content/directory/koreader.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: Sidecars are located beside the book, under a separate document-settings tree, or in a partial-MD5-based hashed tree, and use metadata.<suffix>.lua names. The inspected JSON exporter copies each supplied entry's first record plus selected book fields, not the entire sidecar/settings object. Book-only copying and highlight export are therefore distinct recovery scopes.
- [x] Resolved: Sidecar loading actually invokes dofile inside pcall; error-catching is not a sandbox for arbitrary Lua code. Writing serializes settings and maintains a .old backup before replacement, with candidate priority rules. Recovery should inspect untrusted sidecars without executing them; no generic Lua execution was performed in this review.

Remaining: Actual cross-device/hash-mode migration, annotation-field comparisons across export formats, PDF checksum changes, release compatibility and backup restoration remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- Per-book data (progress, highlights, bookmarks) lives in a `.sdr` folder. The guide offers three "Book metadata storage options": folders next to the book (the default), folders under the KOReader directory, and hashed folder names. [user guide](https://koreader.rocks/user_guide/)
- The hashed option lets books be renamed or moved outside KOReader without losing metadata. Operations that modify the file, such as writing PDF highlights, change its MD5 ID and can orphan the metadata. [user guide](https://koreader.rocks/user_guide/)
- The file format inside `.sdr` (the `metadata.*.lua` schema) and whether other tools can read it: not found in the docs read. Appearance settings are saved per book. [user guide](https://koreader.rocks/user_guide/)
- Documents stay in their original formats (EPUB, PDF, DjVu, CBZ, FB2, Mobi and others). [repository README](https://github.com/koreader/koreader)

**Exit and migration (E2)**
- Highlights and notes can be exported locally as text, HTML, Markdown, Kindle Clippings text, and JSON, or sent to Joplin, Readwise, Memos, Flomo, and XMNote. [user guide](https://koreader.rocks/user_guide/)
- The wiki page lists JSON, HTML, Markdown, and text locally, plus Nextcloud Notes, Joplin, and Readwise, and says Memos/Flomo is unsupported and slated for removal. The two pages disagree on the target list. [wiki: Highlight export](https://github.com/koreader/koreader/wiki/Highlight-export)
- What each export format keeps or drops, and where local files are written: not found in the docs. Export of reading progress, bookmarks, or settings: not found.
- Moving books to a new reader means copying the files; KOReader must be restarted to load transferred style tweaks. [user guide](https://koreader.rocks/user_guide/)

**Recovery (E3)**
- The guide describes backing up the `settings` and `styletweaks` folders and several files in the KOReader directory. The `.sdr` folders can be backed up separately. [user guide](https://koreader.rocks/user_guide/)
- The wiki's upgrade note says to save existing settings before upgrading. No dedicated backup page was seen. [wiki](https://github.com/koreader/koreader/wiki)
- Version compatibility of settings and sidecars across releases: not found in the docs. The guide recommends stable releases and describes nightlies as less stable, for testers. [user guide](https://koreader.rocks/user_guide/)

**Continuing authority (E4) and dependencies**
- The README says the project is "developed and supported by volunteers all around the world". Support is by Liberapay donations. No formal governance or succession statement was found. [repository README](https://github.com/koreader/koreader)
- Network features are optional plugins or menus: Calibre wireless transfer, OPDS, Wallabag, Wikipedia, Google Translate, RSS, FTP client, SSH server, and over-the-air updates. The README does not say what data these send. [repository README](https://github.com/koreader/koreader)
- Updating is manual: "KOReader can update itself over Wi-Fi" via the Update menu. Whether an automatic update check exists: not found. [user guide](https://koreader.rocks/user_guide/)
- Progress sync needs an account on the KOReader sync server, created from the plugin menu. The wiki says file name and contents are not sent, the default match is a hash of the file, and transfers use HTTPS. Self-hosting, retention, and a privacy policy: not found. [wiki: Progress sync](https://github.com/koreader/koreader/wiki/Progress-sync)
- Cloud storage (Dropbox, FTP, WebDAV) needs accounts added under the File Browser menu. [user guide](https://koreader.rocks/user_guide/)
- Telemetry and privacy statements: not found on the repository page, the website home page, or the guide portions read. The wiki list showed no privacy page.

**Consequential operations (E5)**
- The File Browser can copy, move, rename, create, and delete files and folders, including bulk operations. Whether deletion is recoverable: not found. [user guide](https://koreader.rocks/user_guide/)
- The Reset dialog can clear reading progress, bookmarks, and custom covers, and the guide tells users to check the selected items carefully. [user guide](https://koreader.rocks/user_guide/)
- Applying one highlight style and color to all highlights carries the warning "Be careful, there is no undo!" [user guide](https://koreader.rocks/user_guide/)
- "Reset document settings to default" is stated to keep position, highlights, notes, and bookmarks. A highlight's edited text can be reverted with "Reset text". [user guide](https://koreader.rocks/user_guide/)
- Saving PDF highlights modifies the PDF file itself, which can break progress sync matching; the guide suggests Filename matching. [user guide](https://koreader.rocks/user_guide/)

## Gaps to test or read next
1. Create synthetic books, add highlights and bookmarks, open the `metadata.*.lua` file in a text editor, and check whether the fields are self-describing and parseable by a short script.
2. Copy a book plus its `.sdr` to a second device or install, and compare progress and annotations. Repeat with the hashed and KOReader-directory storage modes after renaming the book.
3. Export highlights in every local format from one book, and compare against the sidecar for lost fields (page, chapter, timestamps, colors, edited text).
4. Write a highlight into a PDF, then check whether the sidecar still matches the file (the MD5 warning).
5. Restore a settings backup from an older release into the latest one, and from a newer release into an older one; record failures.
6. Run with the network blocked and log outgoing connections at start-up and idle, to check for update checks or telemetry (not found in the docs).
7. Not read or not found: the Device tips and Troubleshooting sections in full, the rest of the wiki ("97 more pages"), any KOSync server privacy or self-hosting page, the AGPL COPYING text, and the changelog for sidecar format changes.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-11/README.md#koreader); [actual assessment](../../content/directory/koreader.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Sidecar location varies by adjacent, separate-tree and hashed modes, and the inspected highlight JSON export is not the whole sidecar/settings object. No complete cross-device metadata/annotation reconstruction with checksum/path changes and compatible releases is established.
- E5: Not Verified. Sidecar loading calls Lua dofile inside error-catching, which is not sandboxing; source also defines replacement/old-backup priorities. Effective trust of imported sidecars, write/backup policy and usable recourse after metadata migration remain insufficiently established.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Actual cross-device/hash-mode migration, annotation-field comparisons across export formats, PDF checksum changes, release compatibility and backup restoration remain untested. E5 needs safe sidecar trust/execution policy and effective backup/write/migration correction; data inspection must not execute untrusted Lua.

Next without a local installation: Inspect synthetic sidecars as text/data only, alongside book hashes and a location/migration manifest; obtain same-version external annotation/move/backup records without executing sidecar code.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

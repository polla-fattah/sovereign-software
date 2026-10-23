# Zim Desktop Wiki: documentation review

Reviewed 22 October 2026 from the Zim manual and website (zim-wiki.org) and the project repository on GitHub only. The downloads page says "Latest release: 0.77.2 - Jul 2026"; the changelog dates 0.77.2 to 26 July 2026. The repository states GPL-2.0; the downloads page and the About page state no licence. The manual index page (/manual/) returned HTTP 403, and several guessed manual URLs returned 404, so some pages were not read. Page contents below come from fetched summaries, not full text.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Follow-up: 23 October 2026

3 bounded questions are resolved in [batch 4](../third-pass/batch-4/README.md#zim-wiki) and incorporated into the [application assessment](../../content/directory/zim-wiki.md). The original documentation review below remains a dated record; these narrower findings supersede its corresponding uncertainties.

- [x] Resolved: Standard XML parsing read 37 named pages and their colon-separated hierarchy and wiki links from the published notebook test container; this XML container is not the native notebook storage format. Separate wiki, parse-tree and expected Markdown fixtures expose formatting and link records. The expected Markdown uses Unicode checkbox glyphs rather than GitHub task-list markers, so plain readability does not imply identical task semantics in another editor.
- [x] Resolved: move_page defaults update_links to True and calls separate routines to rewrite links from moved pages and links targeting them. The argument can disable this work. This resolves the implemented rename/link-update design, not the outcome for every attachment, ambiguous link, synced copy or interrupted rename.
- [x] Resolved: The permanent delete implementation removes the mapped page folder's children and page file. The separate trash implementation uses the system trash helper and raises TrashNotSupportedError when notebook trash is disabled. These paths are not equivalent; neither a permanent delete nor unsupported trash can be assumed recoverable. No actual deletion or trash restore was performed.

Remaining: A complete native notebook move/export with attachments and link resolution; index rebuild after removing .zim, actual trash recovery, shared-folder conflicts, cross-version Markdown pages and network behavior.

## What the documentation says

**Storage and access (E1, E3)**
- The README says "All data is stored in plain text files with wiki formatting", in a folder structure with attachments. [GitHub README](https://github.com/zim-desktop-wiki/zim-desktop-wiki)
- Pages use Zim's own wiki markup with a `.txt` extension, and the syntax is documented with examples. Encoding was not found in the docs. [wiki syntax](https://zim-wiki.org/manual/Help/Wiki_Syntax.html)
- A notebook is a chosen folder holding a `notebook.zim` settings file. Page names map to nested files and folders. Forbidden characters in page names: `? # / \ * " < > | %`. [notebooks](https://zim-wiki.org/manual/Help/Notebooks.html), [pages](https://zim-wiki.org/manual/Help/Pages.html)
- The FAQ says the visible files in the notebook folder hold all notes and attachments, and the hidden `.zim` folder holds only caches and GUI state that regenerate. [FAQ](https://zim-wiki.org/manual/FAQ.html)
- Other tools reading the files: the docs describe the format as plain text but give no instruction for third-party tools; not found in the docs.

**Exit and migration (E2)**
- Export targets are HTML, LaTeX, Markdown and RST, for the whole notebook or one page with subpages, one file per page or a single file, with templates. Attachments are always copied. [export](https://zim-wiki.org/manual/Help/Export.html)
- Command-line export exists: `zim --export` with output, format and template options. [export](https://zim-wiki.org/manual/Help/Export.html)
- What each format loses: "doesn't say" on the export page. Not found in the docs.
- The 0.77.0 changelog entry lists Markdown as an experimental notebook source format, with mixed formats allowed in one notebook. [CHANGELOG](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/develop/CHANGELOG.md) (from a summary of the page)

**Recovery (E3)**
- Backing up or moving means copying the visible notebook files. Syncing is done by external tools, for example a Dropbox share. [FAQ](https://zim-wiki.org/manual/FAQ.html)
- The Version Control plugin supports Bazaar, Git, Mercurial and Fossil, and the backend must be installed. Restoring a page discards edits since the last saved version. The page marks parts as undocumented and the Sharing section as TODO. [Version Control plugin](https://zim-wiki.org/manual/Plugins/Version_Control.html)
- For manual tracking the docs say to include `notebook.zim`, the page `.txt` files and attachments, and to ignore `.zim`. [Version Control plugin](https://zim-wiki.org/manual/Plugins/Version_Control.html)
- Compatibility between Zim versions and notebook format: not found in the docs, beyond the changelog notes on 0.77.0 (Markdown source) and 0.70 (Python 3 port, profile properties removed). [CHANGELOG](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/develop/CHANGELOG.md)

**Continuing authority (E4) and dependencies**
- Licence: GPL-2.0 in the repository; most copyright is held by Jaap Karssenberg, translations by their translators. [GitHub README](https://github.com/zim-desktop-wiki/zim-desktop-wiki)
- No account is mentioned. Statements on telemetry, privacy and update checks were not found on the pages read (home, About, downloads). A dedicated privacy page was not found.
- Plugins "have additional dependencies, like specific external programs"; which plugins use the network was not stated. [plugins](https://zim-wiki.org/manual/Plugins.html)
- The README says of macOS "we do not have the resources to offer any support for this". The macOS app is on GitLab; Ubuntu packages are described as unofficial. [GitHub README](https://github.com/zim-desktop-wiki/zim-desktop-wiki), [downloads](https://zim-wiki.org/downloads.html)
- Maintainers, succession and project-status statements: not found. The contribute page covers patches, merge requests and optional PayPal donations only. [contribute](https://zim-wiki.org/contribute.html)
- Zim has no built-in encryption; the FAQ suggests encfs. It is built for a single user, and multiple users are pointed to version control. [FAQ](https://zim-wiki.org/manual/FAQ.html)

**Consequential operations (E5)**
- Deleting a page moves it, subpages and attachments to the system trash by default. After restoring from trash the user must run "Re-build Index". If the trash cannot be used, a confirmation lists the files before permanent deletion. [pages](https://zim-wiki.org/manual/Help/Pages.html)
- A per-notebook property makes "Delete page" permanent instead of using the trash. [properties](https://zim-wiki.org/manual/Help/Properties.html)
- Deleted pages that other pages still link to stay in the index until the linking pages are edited. [FAQ](https://zim-wiki.org/manual/FAQ.html)
- Rename and move behaviour, link updating, editor undo, and overwrite or conflict behaviour on shared folders: not found in the docs read.

## Gaps to test or read next
1. Create a synthetic notebook with nested pages, attachments and links. Open the `.txt` files in a plain editor and a Markdown tool, and note what renders or breaks.
2. Export the notebook to HTML, Markdown and RST. Compare links, attachments, tags, tasks and page hierarchy against the source.
3. Delete a page with subpages and attachments, restore it from the system trash, rebuild the index, and check links.
4. Delete the `.zim` folder and confirm the notebook opens with nothing lost, as the FAQ claims.
5. Edit the same page from two copies of a notebook in a synced folder and observe the conflict outcome.
6. Open a notebook saved by 0.77.2 (including Markdown source pages) in an older release.
7. Run the Version Control plugin with Git, restore a page, and confirm the warning about lost edits.
8. Watch network traffic on start and during plugin use to settle the telemetry and update-check question.
9. Pages not read: Attachments, Links, Move and Rename, undo, Automount, the full CHANGELOG, CONTRIBUTING.md, the project wiki, and any privacy statement. The file encoding and the licence on the website were not found.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-3/README.md#zim-wiki); [actual assessment](../../content/directory/zim-wiki.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The 37-page XML object is a test container, not an actual native notebook. Format fixtures and rename-link routines explain parts of interpretation, but no complete notebook with attachments, dates/tags and relocated internal references has been independently reconstructed or its index rebuilt.
- E5: Not Verified. Source now establishes separate trash/permanent-delete warnings, affected-file inspection, a link-update choice, unsupported-trash handling and buffer-level undo. Effective platform trash recovery, external/shared-folder changes and export/rename overwrite recourse are not sufficiently covered for the existing notebook scope.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish usable migration of the native notebook's hierarchy, attachments, links and task semantics. The published expected Markdown already differs in task markers, and no full independent-workflow comparison is recorded.

- [x] Resolved: The GUI supplies separate trash and permanent-delete dialogs, includes an affected-file listing and a link-update choice, and returns a distinct unsupported-trash result. Permanent deletion warns that it cannot be undone. These source paths do not demonstrate system-trash recovery on a particular platform. [Pinned source](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/gui/uiactions.py).
- [x] Resolved: The page-view undo stack replays recorded text-buffer actions and can stop recording handlers during blocked changes. This is editor-level undo, not a filesystem snapshot or a guarantee of recovery from page-folder deletion and external synchronization. [Pinned source](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/gui/pageview/undostack.py).

Remaining: A complete native notebook move/export with attachments and link resolution; index rebuild after removing .zim, actual trash recovery, shared-folder conflicts, cross-version Markdown pages and network behavior. E5 also needs effective trash/fallback and rename/export overwrite behavior, external-edit handling and restoration boundaries; text-buffer undo does not restore deleted folders.

Next without a local installation: Collect a native synthetic notebook with notebook.zim, page files and attachment hashes, then reconstruct its links/metadata independently; obtain version/platform-matched trash/rename/undo observations or comprehensive source coverage.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

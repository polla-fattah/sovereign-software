# Org-mode: documentation review

## Rating reconciliation: 23 October 2026

The current [rating review](../rating-reconciliation/batch-1/README.md#emacs-org-mode) supersedes the earlier rating freeze. E3: Not Verified; E5: Not Verified; Longevity: Not assessed; Transparency and Control: Not assessed. The actual application page contains the same decisions and supporting evidence.

Remaining: The existing open recovery and consequential-action scenarios remain pending; the individually explained E3/E5 blockers above determine the current Not Verified and Not assessed findings.

Earlier evidence findings below remain historical observations with their original limits, not automatic Pass results.


Reviewed 22 October 2026 from the Org Manual, orgmode.org (including Worg pages), and the GNU ELPA package page only. The manual is headed "for Org version 9.8". The ELPA page lists org-9.8.10.tar dated 2026-Aug-31; the Org release-notes page names version 9.8 but gives no date or year. Licence: contributions fall under "the same licensing terms as those under which GNU Emacs is published", with the FSF as copyright holder; the licence version was not stated on the pages read. The manual itself is under the GNU FDL 1.3 or later.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 6](../third-pass/batch-6/README.md#emacs-org-mode) and reflected in the [application page](../../content/directory/emacs-org-mode.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: Standard text inspection of the upstream babel.org fixture identifies 33 headings, links/properties and 45 source blocks, including Emacs Lisp, shell and Org blocks. These structures are readable without Emacs. No block was executed and no export, formula evaluation or attachment restoration was performed.
- [x] Resolved: The pinned source sets org-confirm-babel-evaluate to t and explicitly handles no/never and no-export/never-export evaluation arguments. Confirmation can be disabled or supplied as a function. This establishes the defined default and control branches, not the effective configuration of every buffer or proof that opening/exporting arbitrary documents is safe.

Remaining: Independent full semantic parsing, export losses, ID/attachment/include relocation, actual Babel prompt/export behavior under local settings, cryptography, undo and older-version compatibility.

## What the documentation says

**Storage and access (E1, E3)**
- Org files are described as "strictly plain text files, the most portable and future-proof file format". [manual](https://orgmode.org/org.html) (read to the first 100,000 characters only)
- A formal syntax reference exists only as "a draft on Worg". It describes syntax "as it is currently read by its parser" (`org-element.el`), is aimed at developers, and names no other parser. [Org Syntax](https://orgmode.org/manual/Org-Syntax.html), [Worg syntax](https://orgmode.org/worg/org-syntax.html)
- Several syntax details are configurable per user or file (for example TODO keywords), so a file's reading can depend on settings. [Worg syntax](https://orgmode.org/worg/org-syntax.html)
- Attachments live in a directory named after the heading's ID property or a DIR property, outside the `.org` file. [attachments](https://orgmode.org/manual/Attachments.html)
- `#+INCLUDE` pulls other files in, and "Org neither checks for correctness nor validates the content". [include files](https://orgmode.org/manual/Include-Files.html)

**Exit and migration (E2)**
- Back-ends listed: ASCII, Beamer, HTML, iCalendar, LaTeX, Markdown, ODT, Org, Texinfo, Man page. Only ASCII, HTML, iCalendar, LaTeX and ODT load by default; others need `org-export-backends` or `require`. [exporting](https://orgmode.org/manual/Exporting.html)
- The docs say Org tries to keep "as much structure" as possible, and do not say what each back-end loses. [exporting](https://orgmode.org/manual/Exporting.html)
- Export options include `broken-links` (can mark the bad link and continue), `tex`, and `arch` (archived trees reduced to headlines). `#+SETUPFILE` can take settings from a file or URL. [export settings](https://orgmode.org/manual/Export-Settings.html)
- A code block with `:exports code` (the default) exports its text; evaluation depends on other options. [exporting code blocks](https://orgmode.org/manual/Exporting-Code-Blocks.html)

**Recovery (E3)**
- No backup or restore procedure was found in the pages read. The manual states no file-compatibility guarantee across Org releases. [manual](https://orgmode.org/org.html)
- The release notes for 9.8 list incompatibilities: renamed options, removed functions, `bibtex` blocks tangling to `.bib`, a changed `:results drawer` behavior, and diary timestamps now exported. [Changes](https://orgmode.org/Changes.html) (a summary of the page, not the full list)
- Stable Org is "meant to be fully compatible with the last three stable versions of Emacs"; 9.8 drops Emacs 26 and 27 and requires 28 or newer. [manual](https://orgmode.org/org.html), [Changes](https://orgmode.org/Changes.html)
- State changes are logged in the entry itself, optionally in a LOGBOOK drawer, so that history travels with the file. [TODO state changes](https://orgmode.org/manual/Tracking-TODO-state-changes.html)

**Continuing authority (E4) and dependencies**
- Org ships with GNU Emacs; a newer version from the package system needs Emacs 30 or later. Add-ons moved to a separate org-contrib repository as of 9.5. [manual](https://orgmode.org/org.html)
- No account, telemetry, or update-check statement was found in the pages read (not found in the docs; not searched for a privacy page, none seen linked).
- Contributors need an FSF copyright assignment (small changes under 15 lines excepted). Files without a maintainer are covered by "the official Org mode project maintainer" until someone volunteers. No succession statement was found. [contribute](https://orgmode.org/worg/org-contribute.html)
- The site states a call for more library maintainers. [home](https://orgmode.org/) (summary of the page)
- Org is guaranteed compatible only with the latest stable third-party packages. [manual](https://orgmode.org/org.html)

**Consequential operations (E5)**
- "Each source code block, in terms of risk, is equivalent to an executable file." Org asks before running code by default; `org-confirm-babel-evaluate` set to `nil` removes the prompt. Shell and Elisp links are also confirmed, and table formulas count as code. [code evaluation security](https://orgmode.org/manual/Code-Evaluation-Security.html)
- Results are inserted into the file after the block. Caching "may cause unexpected results" in sessions, and cached results may be unreliable. [evaluating code blocks](https://orgmode.org/manual/Evaluating-Code-Blocks.html)
- Archiving moves a subtree to another file (default `_archive` suffix) and adds context properties; no warnings or undo advice given. [moving subtrees](https://orgmode.org/manual/Moving-subtrees.html)
- Cut-subtree removes a subtree to the kill ring; no hidden-content warning on that page. [structure editing](https://orgmode.org/manual/Structure-Editing.html)
- Org-Crypt encrypts entry bodies, not headlines or properties, needs GnuPG, and does not work with auto-save. Lost-key consequences are not stated. [Org-Crypt](https://orgmode.org/manual/Org-Crypt.html)

## Gaps to test or read next
1. Take a synthetic archive with nested headings, properties, LOGBOOK drawers, ID links, attachments, tables and Babel blocks. Open it in a clean Emacs and in an independent parser, and compare headings, properties and links.
2. Export that archive to HTML, ODT, Markdown and LaTeX. List what is lost (drawers, formulas, IDs, block results).
3. Move the archive to another directory and another machine. Check which links, includes and attachments break.
4. Open a file saved with 9.8 in an older supported Org, and the reverse, and note differences.
5. Run an archive with `org-confirm-babel-evaluate` at default and check what runs on export and on `C-c C-c`.
6. Test archive and cut-subtree followed by undo, and the Org-Crypt round trip with a deliberately wrong passphrase.
7. Not read: the full Babel chapter, Attachments sub-pages, Refile, Clocking, Org-ID, the rest of the 9.8 release notes, and the manual beyond its first 100,000 characters. Not found: a licence version statement, a privacy page, backup guidance, a succession plan, the Org 9.8 release date on orgmode.org. The Worg `org-protocol` page returned 404 and a savannah README returned 502, so those topics are unknown, not absent.

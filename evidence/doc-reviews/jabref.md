# JabRef: documentation review

Reviewed 22 October 2026 from the JabRef documentation (docs.jabref.org), jabref.org, and the JabRef GitHub repository (README, MAINTAINERS, PRIVACY.md, CHANGELOG.md, releases API) only. The GitHub "latest release" API endpoint returned v5.15, published 2024-07-10. The newest release found is v6.0-beta.1, marked as a prerelease, published 2026-09-21 (the changelog heading gives the same date). The jabref.org home page states no version, and its /download link redirects to GitHub releases. The repository README states the MIT licence; jabref.org says only "free open-source". The docs headings were not checked for which JabRef version they describe, and some URLs carry a `/v5/` path in the library entry.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

Follow-up, 23 October 2026: resolved questions and remaining work are recorded in the [second third-pass batch](../third-pass/batch-2/README.md#jabref) and reflected in the [application assessment](../../content/directory/jabref.md). The earlier review below is superseded where that evidence answers or corrects it.

**Storage and access (E1, E3)**
- The library is a plain text file, and JabRef stores data directly in BibTeX or biblatex `.bib` files, not in an internal format. A file is preserved when opened and re-saved. [docs home](https://docs.jabref.org/), [BibTeX and biblatex](https://docs.jabref.org/cite/bibtex-and-biblatex)
- Group definitions are saved as an `@COMMENT` block inside the `.bib` file. Explicit-selection groups depend on each entry having a unique citation key, otherwise assignments "may not be restored". [groups](https://docs.jabref.org/finding-sorting-and-cleaning-entries/groups)
- File attachments are stored as links in the entry's `file` field. Whether stored paths are relative is not stated; the page only describes relative file directories set in library properties. [file links](https://docs.jabref.org/finding-sorting-and-cleaning-entries/filelinks)
- How other JabRef metadata (file directories, custom entry types, special fields) is encoded in the `.bib` file, and file encoding, is not found in the docs. The BibTeX page does not cover them.
- Teams can instead sync through a remote SQL database. Only PostgreSQL is recommended and tested; the changelog says synchronization became PostgreSQL-only in 6.0-beta.1. [SQL database](https://docs.jabref.org/collaborative-work/sqldatabase), [changelog](https://github.com/JabRef/jabref/blob/main/CHANGELOG.md)

**Exit and migration (E2)**
- Export is offered through built-in formats and custom export filters. The command line `-o` exports BibTeX by default, `-m` exports matching entries (default `html-table`), and XMP export writes one file or one per entry. [command line](https://docs.jabref.org/advanced/commandline)
- The command-line page does not list all formats (it points to `-h`). The File > Export and File > Import help pages are unfinished placeholders with no format list. [export](https://docs.jabref.org/collaborative-work/export), [import](https://docs.jabref.org/collect/import)
- What an export to a non-BibTeX format loses (groups, linked files, custom fields) is not found in the docs.
- Command-line `-w` writes XMP metadata and an embedded BibTeX file into linked PDFs. [command line](https://docs.jabref.org/advanced/commandline)

**Recovery (E3)**
- Autosave to the `.bib` must be enabled in preferences. About 20 seconds after a change JabRef writes a `.bak` backup into the user data directory and keeps 10 older versions. A crash triggers a "backup found" dialog on next open. [autosave](https://docs.jabref.org/advanced/autosave)
- Saving writes a `.tmp`, copies the `.bib` to `.sav`, copies the `.tmp` over the `.bib`, then deletes the `.sav`. [autosave](https://docs.jabref.org/advanced/autosave)
- The 6.0-beta.1 changelog says backups now use the `.bib` extension, and an empty backup no longer overwrites a library in recovery. These rest on the first 100,000 characters of a 333,000-character page. [changelog](https://github.com/JabRef/jabref/blob/main/CHANGELOG.md)
- Version compatibility between JabRef versions, and whether a library saved by 6.x opens cleanly in 5.x, is not found in the docs. The changelog mentions migration of legacy group memberships and special fields on open (partial read).

**Continuing authority (E4) and dependencies**
- No account is needed for local libraries. The privacy policy says JabRef "does not collect any personal information directly linked to you". [PRIVACY.md](https://raw.githubusercontent.com/JabRef/jabref/main/PRIVACY.md)
- Update check at startup and journal lookups to JabRef e.V.'s journal database are on by default. GUI usage statistics, GROBID PDF extraction, and Mr. DLib are off by default. How to change these settings is not described. [PRIVACY.md](https://raw.githubusercontent.com/JabRef/jabref/main/PRIVACY.md)
- Metadata fetchers contact services such as Crossref and arXiv, sending search terms and the IP address. The policy lists about 40 services including AI providers; when they are contacted is unclear. [PRIVACY.md](https://raw.githubusercontent.com/JabRef/jabref/main/PRIVACY.md)
- MIT licence per the README. The README calls development "actively developed" and names a donations page; no succession or continuity statement was found. [GitHub](https://github.com/JabRef/jabref)
- The MAINTAINERS file lists 10 maintainers with start years (2011 to 2026) and no governance text. [MAINTAINERS](https://github.com/JabRef/jabref/blob/main/MAINTAINERS)

**Consequential operations (E5)**
- The command line `-g` regenerates all citation keys, `-asfl` sets file links automatically, `-d` resets preferences. The page gives no warning about these or about the PDF-writing options. [command line](https://docs.jabref.org/advanced/commandline)
- The groups page has no warning about deleting groups. The file-links page does not say whether deleting an entry or link removes the file on disk. [groups](https://docs.jabref.org/finding-sorting-and-cleaning-entries/groups), [file links](https://docs.jabref.org/finding-sorting-and-cleaning-entries/filelinks)
- Shared SQL mode warns that working offline converts the database to a local `.bib` that must be re-imported by copy and paste, and that you "might override someone else's work". [SQL database](https://docs.jabref.org/collaborative-work/sqldatabase)
- The autosave page recommends git for version history. Undo/redo behaviour was not read. [autosave](https://docs.jabref.org/advanced/autosave)

## Gaps to test or read next
1. Create a synthetic library with groups, nested groups, file links, custom fields and a custom entry type. Save, open the `.bib` in a text editor and a second BibTeX tool, and list what the second tool sees or drops.
2. Export that library to each offered format, and compare field and group survival against the source.
3. Move the `.bib` and PDFs to another folder or machine and check whether file links resolve.
4. Save a library in 6.0-beta.1, then try to open it in 5.15, and compare the diff of the `.bib`.
5. Force a crash during editing, then check the `.bak`, `.sav` and `.tmp` files and the recovery dialog.
6. Run `-g` and `-w` on a copy and record what changes in the `.bib` and the PDFs.
7. Not read: undo/redo and entry-deletion pages, preferences for update checks and fetchers, the custom export and import filter pages, the full privacy policy service list, and the changelog beyond 100,000 characters.
8. Confirm the current stable version: the releases API gave v5.15 (2024) as latest non-prerelease, which should be rechecked on the releases page.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-5/README.md#jabref); [actual assessment](../../content/directory/jabref.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The BibTeX sample exposes records/group hierarchy and serializers document escaped file fields and recursive group depth. Complete memberships, custom fields/types and existing linked-file relocation have not been reconstructed with an independent reader. Bibliographic text readability alone does not cover the original research profile.
- E5: Not Verified. User-directed editing and inspectable BibTeX are not complete safeguards for automatic metadata replacement, file rename/move/delete, merge operations and citation changes. The collected grouping/file-field evidence does not sufficiently establish authorization, visible diffs and correction for those operations.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The prior E2 Pass does not establish independent-workflow preservation of essential group memberships, custom metadata and linked files. Exposing serializer formats or a command-line export is not that migration comparison.

Remaining: Entry memberships, custom types/fields, other readers' handling of metadata comments, linked-file relocation, and cross-version recovery. E5 needs metadata-fetch/merge/file-operation review, visible changes and rollback or recourse for the configured library.

Next without a local installation: Use a populated synthetic BibTeX library and actual linked-file tree with expected groups/memberships; independently parse it and seek version-matched automated-metadata, merge and file-operation control evidence.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

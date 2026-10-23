# BibDesk: documentation review

Reviewed 22 October 2026 from the BibDesk site, manual, release notes, and SourceForge FAQ and wiki only. Current release: 1.9.13 (folder dated 4 September 2026); the manual front page still says 1.9.11. Platform: macOS only, 10.13 or later. Licence listed on SourceForge: BSD.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 6](../third-pass/batch-6/README.md#bibdesk) and reflected in the [application page](../../content/directory/bibdesk.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The static-group dictionary representation stores an escaped group name and a comma-joined list of publication cite keys, deduplicating keys as it builds the list. This exposes how group membership can be represented independently; it does not establish that another BibTeX editor retains the group dictionary or that smart-group queries round-trip.
- [x] Resolved: The linked-file reader recognizes Base64 binary-plist data and extracts bookmark or legacy aliasData plus relativePath; a non-plist value is treated as a relative path. These are links and macOS bookmark/alias data, not attached-document payloads. Preserving a bibliographic record alone does not establish that the referenced files move or remain resolvable on another platform.

Remaining: A real .bib with groups and linked files parsed/re-saved by independent tools, smart-group preservation, actual path relocation, macOS-version compatibility and complete document recovery.

## What the documentation says

**Storage and access (E1, E3)**
- BibTeX is the native format: save writes a BibTeX file, and the FAQ says BibDesk files are plain text that any text editor can edit. [manual](https://bibdesk.sourceforge.io/manual/), [saving](https://bibdesk.sourceforge.io/manual/BibDeskHelp_29.html), [FAQ](https://sourceforge.net/p/bibdesk/wiki/FAQ/)
- Linked files are stored in `Bdsk-File-N` fields that are base64-encoded and "not human readable"; `Bdsk-Url-N` is readable. Release notes say links now use modern bookmark data by default (1.9), so the older alias wording in the manual is out of date. [convert files](https://bibdesk.sourceforge.io/manual/BibDeskHelp_53.html), [release notes](https://bibdesk.sourceforge.io/relnotes.html)
- Smart groups are stored in an `@comment` field as an XML property list. The manual says not to edit it and not to rely on its format staying the same, and warns that some BibTeX editors may not preserve `@comment` contents. How static groups are stored was not found. [smart groups](https://bibdesk.sourceforge.io/manual/BibDeskHelp_34.html)

**Exit and migration (E2)**
- Exports include BibTeX, RIS, EndNote, HTML, and RSS, plus template exports (template pages not read). Imports include BibTeX, RIS, Medline, MARC, JSTOR, ISI, and Refer or EndNote. [home](https://bibdesk.sourceforge.io/), [FAQ](https://sourceforge.net/p/bibdesk/wiki/FAQ/)
- To JabRef, the FAQ offers an export template; Better BibTeX for Zotero reads `Bdsk-File` fields; a third-party script covers Zotero. Nothing says smart or static groups transfer. No step-by-step procedure for moving a library to another Mac was found. [FAQ](https://sourceforge.net/p/bibdesk/wiki/FAQ/)
- Editing the file outside BibDesk does not update `Date-Modified`. [FAQ](https://sourceforge.net/p/bibdesk/wiki/FAQ/)

**Recovery (E3)**
- Autosave has three modes: in place, to a separate backup document at a set interval, or never. No crash-recovery procedure, and no Time Machine or version-control advice, was found. The docs advise keeping a backup before bulk edits. [files preferences](https://bibdesk.sourceforge.io/manual/BibDeskHelp_69.html), [FAQ](https://sourceforge.net/p/bibdesk/wiki/FAQ/)
- Encoding warning: opening a UTF-8 file as Latin-1 and saving can lose data permanently, and files are saved in the encoding they were opened with. [encodings](https://bibdesk.sourceforge.io/manual/BibDeskHelp_94.html)

**Continuing authority (E4) and dependencies**
- No account is required. No telemetry or privacy statement was found. Sparkle checks for updates at a configurable startup frequency. [general preferences](https://bibdesk.sourceforge.io/manual/BibDeskHelp_64.html), [release notes](https://bibdesk.sourceforge.io/relnotes.html)
- Online search groups (PubMed, Z39.50, SRU, Web of Science, DBLP) are added by the user; release notes say some Web of Science servers are defunct. An explicit "works offline" statement was not found. [search groups](https://bibdesk.sourceforge.io/manual/BibDeskHelp_39.html)
- Source is a Subversion repository on SourceForge, written in Objective-C, maintained by a small group of volunteers. No succession or long-term macOS compatibility statement, and no Apple Silicon statement, was found. A "BibDesk 2.0" is described only as exploratory. [developer information](https://sourceforge.net/p/bibdesk/wiki/Developer_Information/), [wiki](https://sourceforge.net/p/bibdesk/wiki/)

**Consequential operations (E5)**
- Delete is always undoable, and in a group it only removes items from the group. Consolidate and AutoFile move linked files on disk; the manual says consolidating is undoable and warns before moving a folder. [deleting](https://bibdesk.sourceforge.io/manual/BibDeskHelp_26.html), [consolidate](https://bibdesk.sourceforge.io/manual/BibDeskHelp_51.html), [AutoFile](https://bibdesk.sourceforge.io/manual/BibDeskHelp_50.html)
- Saving rewrites the `.bib`: field names are saved lowercase (since 1.7.9), author names can be normalized, and entries can be sorted for crossrefs. Cite-key generation and database find and replace are undoable. [files preferences](https://bibdesk.sourceforge.io/manual/BibDeskHelp_69.html), [release notes](https://bibdesk.sourceforge.io/relnotes.html), [cite keys](https://bibdesk.sourceforge.io/manual/BibDeskHelp_47.html)
- BibTeX macros are read and saved, and crossref parents must follow children. [overview](https://bibdesk.sourceforge.io/manual/BibDeskHelp_2.html)

## Gaps to test or read next
1. Round trip: open a `.bib` written by another tool, save it in BibDesk, and diff what BibDesk rewrote.
2. Move a library with linked files to a clean Mac, and open the `.bib` in JabRef and Zotero to list what is lost (groups, file links, custom fields).
3. Whether smart and static groups survive a save in another editor.
4. Pages not read: template export chapters, character conversion, sharing preferences, and the remaining wiki pages.
5. Behavior on the current macOS and on Apple Silicon, and what happens to the app if the maintainers stop.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-7/README.md#bibdesk); [actual assessment](../../content/directory/bibdesk.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The static-group representation exposes membership cite keys, but linked-file data can contain macOS bookmarks/aliases and paths rather than document payloads. A real populated bibliography, smart groups, relocated files and compatible reader have not been reconstructed and compared.
- E5: Not Verified. Inspectable BibTeX does not establish authorization or correction for generated cite keys, attachment relocation/deletion, automated metadata and destructive edits. The group/link serializer evidence does not cover those consequential operations or their effective macOS configuration.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: A real .bib with groups and linked files parsed/re-saved by independent tools, smart-group preservation, actual path relocation, macOS-version compatibility and complete document recovery. E5 needs attachment and cite-key mutation controls, automatic metadata review and available correction in the assessed macOS workflow.

Next without a local installation: Use a synthetic populated bibliography with group definitions and actual file dependencies; parse it and decode supported link records independently, then obtain macOS/version-matched metadata/file/undo evidence.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

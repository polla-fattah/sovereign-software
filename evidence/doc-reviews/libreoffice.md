# LibreOffice: documentation review

Reviewed 22 October 2026 from the LibreOffice Help (help.libreoffice.org), libreoffice.org, and documentfoundation.org only. Current stable release: 26.8.1, shown on the download page, which also says "LibreOffice 26.8 is our latest stable release." Neither the download page nor the new-features page gives a release date or a year. Source code licence: Mozilla Public License v2.0, per The Document Foundation governance page. wiki.documentfoundation.org returned an Anubis "Access Denied" page, so the ODF wiki and the 26.8 release notes there were not read. Each help page was read through a summarising fetch, so statements below rest on those summaries, not on full page text.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 6](../third-pass/batch-6/README.md#libreoffice) and reflected in the [application page](../../content/directory/libreoffice.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The published resolved-comment.odt opens as ZIP and its content.xml parses independently. It contains two office:annotation elements, two matching annotation-end elements, creator/date fields and document paragraphs/styles. This establishes accessible comment structures for this fixture, not correct rendering of resolved-comment state, tracked changes, spreadsheets, macros or password-protected documents.
- [x] Resolved: DoBackup_Impl first requires an existing source document and uses NameClash::OVERWRITE when transferring the backup; failure can set ERRCODE_SFX_CANTCREATEBACKUP. Internal transactional backups and a backup-restore error path also exist separately. A persistent backup is not necessarily an unlimited version history, and these branches do not establish crash durability or the user's configured backup/autorecovery policy.

Remaining: Current ODT/ODS/DOCX/XLSX comparisons including tracked changes/formulas/macros, encrypted-package inspection, actual repeated saves and crash recovery, older versions and external dependencies.

## What the documentation says

**Storage and access (E1, E3)**
- LibreOffice loads and saves OpenDocument by default (ODT, ODS, ODP). ODF files are ZIP archives of XML: `content.xml`, `meta.xml`, `settings.xml`, `styles.xml`, `META-INF/manifest.xml`. `content.xml` is stored without indentation or line breaks by default. The page links to OASIS schemas for ODF 1.0 to 1.4. [file formats](https://help.libreoffice.org/latest/en-GB/text/shared/00/00000021.html)
- The same page says a password-protected save leaves `meta.xml` unencrypted. [file formats](https://help.libreoffice.org/latest/en-GB/text/shared/00/00000021.html)
- ODF 1.2 or 1.0/1.1 can be chosen for saving under Tools > Options > Load/Save > General, for backward compatibility. [file formats](https://help.libreoffice.org/latest/en-GB/text/shared/00/00000021.html)
- Which other applications read ODF: not found in the docs read (the ODF wiki was blocked, and the old "what is OpenDocument" page redirects to it).
- Saving targets a local drive, a network drive, or "the Internet". Saving overwrites a file of the same name. [saving](https://help.libreoffice.org/latest/en-US/text/shared/guide/doc_save.html)

**Exit and migration (E2)**
- Save As offers Microsoft Office file types, and a default save format can be set. [MS Office users](https://help.libreoffice.org/latest/en-US/text/shared/guide/ms_user.html)
- That page, as summarised, did not mention formatting loss or give a warning when saving in a non-ODF format. The claim in the entry that loss is "explicitly" warned about is not supported by this page.
- Macros: Basic and VBA code are generally not interchangeable ("With a few exceptions"). VBA can be deleted on load or save, or preserved by saving in an Office format. [MS Office users](https://help.libreoffice.org/latest/en-US/text/shared/guide/ms_user.html)
- Export to PDF and EPUB: not found in the pages read. The file formats page, as summarised, does not mention them.

**Recovery (E3)**
- "Always create backup copy" stores the previous version as `.BAK` on each save and overwrites an existing backup of the same name without warning. AutoRecovery saves restore data every n minutes. Both are on by default in new installations. [autosave](https://help.libreoffice.org/latest/ug/text/shared/guide/doc_autosave.html)
- After a crash LibreOffice tries to save recovery data for open documents "if possible". Restore steps and version compatibility between releases were not on that page. [autosave](https://help.libreoffice.org/latest/ug/text/shared/guide/doc_autosave.html)
- Whether an older release opens a file saved by 26.8: not found in the docs read.

**Continuing authority (E4) and dependencies**
- The Foundation describes itself as an "independent self-governing meritocratic entity", a charitable foundation under German law, governed by a Board of Directors, Membership Committee, and Board of Trustees. The page does not address succession or continuity. [governance](https://www.documentfoundation.org/governance/)
- No account is needed to save documents; the docs describe local and network saving. Accounts (username and email) are described only for Foundation services such as Bugzilla, the wiki, and single sign-on. [saving](https://help.libreoffice.org/latest/en-US/text/shared/guide/doc_save.html), [privacy policy](https://www.libreoffice.org/about-us/privacy/privacy-policy-software/)
- The software privacy policy covers mainly the website. Its only software section is crash reports: sent only if the user chooses, containing version, module paths, stack traces, OS and hardware details, and no user documents. They can be disabled under LibreOffice | General. The policy does not mention telemetry or update checks. [privacy policy](https://www.libreoffice.org/about-us/privacy/privacy-policy-software/)
- Update check default and what it sends: not found. The help pages tried returned the wrong content.
- The Foundation also hosts the Document Liberation Project, which aims to convert proprietary formats to ODF. [governance](https://www.documentfoundation.org/governance/)

**Consequential operations (E5)**
- Save overwrites silently, and the backup copy is overwritten without warning (see above). [saving](https://help.libreoffice.org/latest/en-US/text/shared/guide/doc_save.html), [autosave](https://help.libreoffice.org/latest/ug/text/shared/guide/doc_autosave.html)
- A Macro Security dialog appears when a document contains macros, reachable from Tools > Options > Security. Levels, defaults, and trusted sources were not on the pages read. [macro security](https://help.libreoffice.org/latest/en-US/text/shared/optionen/macrosecurity.html)
- Undo limits, tracked changes, and what cannot be undone: not found (the undo page URL tried returned the Writer welcome page).

## Gaps to test or read next
1. Round trip with synthetic data: build an ODT with tracked changes, comments, a formula-bearing ODS, an embedded object, and a Basic macro. Unzip each and inspect `content.xml`, then open in a second ODF reader and compare what survives.
2. Save the same files as DOCX and XLSX, reopen, and list changes in tracked changes, comments, formulas, and macros. Export to PDF and EPUB and check which parts of the structure remain.
3. Save a document with a password and confirm what in the package is readable without it.
4. Save in 26.8.1, then open in an older release; record warnings and lost features, also for the ODF 1.2 setting.
5. Kill the process mid-edit, restart, and record what AutoRecovery restores. Check `.BAK` overwrite behavior over repeated saves.
6. With a network monitor, record connections on first start and whether an update check runs; read the Online Update option page.
7. Read the 26.8 release notes, the Security Level page, the Undo help page, and the "Saving Documents in Other Formats" and "Using Microsoft Office and LibreOffice" pages. Read the ODF wiki when reachable, and the Foundation statutes for succession.
8. Confirm the 26.8.1 release date; the official pages read omit it.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-7/README.md#libreoffice); [actual assessment](../../content/directory/libreoffice.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The ODT fixture independently exposes comments and XML structure, but not equivalent resolved-comment rendering, tracked changes, spreadsheet formulas/macros or encrypted document recovery. Complete version- and format-specific document semantics were not reconstructed for the original office profile.
- E5: Not Verified. Persistent and transactional backup paths, overwrite behavior and error handling are established in source, but do not prove configured retention or crash durability. Macro/external-link authorization, save/format-loss decisions and correction of consequential document changes remain insufficiently covered.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish usable migration of the full declared office records, including tracked changes, formulas, macros and structural meaning. Supported formats and acknowledged formatting loss are not a completed essential-feature comparison.

Remaining: Current ODT/ODS/DOCX/XLSX comparisons including tracked changes/formulas/macros, encrypted-package inspection, actual repeated saves and crash recovery, older versions and external dependencies. E5 needs macro/external-link authority, format/overwrite decisions, effective backup/autorecovery and usable correction limits.

Next without a local installation: Collect representative synthetic ODT/ODS/native-interchange pairs, encrypted test documents with non-secret credentials and semantic manifests; inspect packages and reuse same-version macro/link/save/recovery evidence.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

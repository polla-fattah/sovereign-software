# Paperless-ngx: documentation review

Reviewed 22 October 2026 from the official repository only: the GitHub README, the Releases page, and the project documentation source files (`docs/*.md` on the `dev` branch). The hosted documentation site docs.paperless-ngx.com returned HTTP 403 to the fetch tool, so the Markdown sources were read instead; they track the development branch and may differ from the released manual. Latest stable release shown: v3.3.3, dated "19 Oct 17:24" (the page omits the year). Licence: the README lists GPL-3.0.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. The page contents below come from tool summaries of each page, not from reading the pages in full.

## Source follow-up: 23 October 2026

3 specific source questions are resolved in [batch 3](../third-pass/batch-3/README.md#paperless-ngx) and incorporated into the [application assessment](../../content/directory/paperless-ngx.md). These pinned implementation findings supersede the corresponding documentation-only uncertainty below; the original review is retained as a dated record.

- [x] Resolved: Static parsing identifies the export manifest queries for documents, tags, correspondents, accounts, permissions, workflows, notes and custom fields. Documents use global_objects; originals are copied separately and the manifest records their export paths. Archive and thumbnail copies can be omitted, and audit logs are conditional. This corrects the earlier description of a database image: it is serialized model data plus files.
- [x] Resolved: The importer reads metadata.json or legacy version.json. A version mismatch produces a warning and continues, rather than an unconditional rejection. This distinguishes runtime enforcement from supported-version guidance; successful cross-version import remains unverified.
- [x] Resolved: Exporter passphrase protection targets mail-account password/refresh_token and social-token token/token_secret fields. Without a passphrase the exporter warns that sensitive fields will be plaintext. It is field-level protection, not encryption of document files or the whole export.

Remaining: An independently inspected real export and clean import comparing document hashes, OCR, relationships, accounts and permissions; actual supported/unsupported-version outcomes; trash/purge and workflow authorization.

## What the documentation says

**Storage and access (E1, E3)**
- The original file is always kept, with the archived PDF/A version stored beside it. Files placed in the consumption directory are moved into Paperless storage and removed from the consumption directory. [usage](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/usage.md)
- Rotating documents and deleting pages alter the stored original, which the docs say can invalidate a digital signature. [usage](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/usage.md)
- Database engine is SQLite by default; PostgreSQL and MariaDB must be set explicitly. Redis is a default dependency. [configuration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/configuration.md)
- The README warns that documents are stored unencrypted ("clear text") and the software should not run on an untrusted host. [README](https://github.com/paperless-ngx/paperless-ngx)
- A documented on-disk layout of the media folder, and whether other tools can read the SQLite or archive files directly: not found in the docs pages read.

**Exit and migration (E2)**
- `document_exporter` writes documents, thumbnails, metadata and database contents to a folder, with a `manifest.json` of correspondents, tags and similar. Options include zip output (`-z`), per-document JSON (`-sm`), and sorted folders (`-p`). [administration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/administration.md)
- Filenames follow a date, correspondent, title pattern by default, or your configured filename format with `-f`. Archive files and thumbnails can be skipped (`-na`, `-nt`), after which the sanity checker reports them missing. [administration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/administration.md)
- API tokens are not exported and must be regenerated after import. The `--passphrase` option encrypts certain fields; without it the export "can't be imported". [administration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/administration.md)
- Bulk merge "as versions" cannot be undone from the UI, and merged documents give up their archive serial number. [usage](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/usage.md)

**Recovery (E3)**
- The docs warn: "You cannot import the export generated with one version of paperless in a different version." The export is a database image and migrations can change its layout. Older-to-newer import may work, but matched versions are advised. [administration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/administration.md)
- `document_importer` must run against an empty installation (empty database and directories). `--data-only` needs only an empty database. [administration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/administration.md)
- Alternative backup: copy the Docker volumes (media, data, and the PostgreSQL or MariaDB volume) or the bare-metal folder plus database, with consumption idle. After outside database edits, run `invalidate_cachalot` if the read cache is on. [administration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/administration.md)
- Upgrading to v3 clears the task history; PostgreSQL 14 is the minimum as of v2.18. `document_sanity_checker` reports missing files and checksum mismatches as errors, and orphaned files as warnings. [administration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/administration.md)

**Continuing authority (E4) and dependencies**
- Licence GPL-3.0. Governance is described as a team that distributes responsibility; no individuals are named on the README, and no succession commitment was found. The README calls the project the successor to Paperless and Paperless-ng. [README](https://github.com/paperless-ngx/paperless-ngx)
- Telemetry: the README and configuration page say nothing about it (not found in the docs). The environment variable `PAPERLESS_ENABLE_UPDATE_CHECK` is deprecated and the update check is now a frontend setting; its default was not stated. [configuration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/configuration.md)
- Optional network features, all off or unset by default as described: AI features (`PAPERLESS_AI_ENABLED` false), Tika and Gotenberg (false), remote OCR via Azure AI, email fetching over IMAP with Gmail or Outlook OAuth. The docs say document data is sent to a configured remote AI provider. [configuration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/configuration.md)
- Latest release v3.3.3; the release page lists no breaking changes for 3.3.x. [releases](https://github.com/paperless-ngx/paperless-ngx/releases)

**Consequential operations (E5)**
- Deleted documents go to a trash and can be restored; automatic emptying defaults to 30 days. If `PAPERLESS_EMPTY_TRASH_DIR` is set, only the original is kept and the archive file and database records are removed; if unset, files are deleted. [usage](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/usage.md), [configuration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/configuration.md)
- `PAPERLESS_CONSUMER_DELETE_DUPLICATES` (default false) deletes a duplicate from the consume folder without importing it. Barcode splitting removes the original and saves split pages as PDFs. A "Move to Trash" workflow action aborts consumption and deletes the file. [configuration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/configuration.md), [usage](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/usage.md)
- Audit log is on by default (`PAPERLESS_AUDIT_LOG_ENABLED`) for documents, types, correspondents and tags; workflow changes show as "System". Only an object's owner can grant permissions. [configuration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/configuration.md), [usage](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/usage.md)
- Misspelled `PAPERLESS_DB_OPTIONS` keys are passed through without validation and silently ignored. [configuration](https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/dev/docs/configuration.md)

## Gaps to test or read next
1. Export a synthetic set (PDFs, images, tags, correspondents, custom fields, two users) with `document_exporter`, import into a clean instance of the same version, and compare originals by checksum, tags, OCR text, correspondents and accounts.
2. Repeat the import into a different release (one minor version up, one down) and record what fails, since the docs forbid it.
3. Open the export without Paperless: parse `manifest.json`, check that originals open in a stock PDF reader, and check whether the archive PDF/A files and OCR text are usable alone.
4. Open the SQLite file read-only and see whether the schema is documented or inspectable.
5. Delete a document, empty the trash with and without `PAPERLESS_EMPTY_TRASH_DIR`, and list what remains on disk and in the database; also test rotate and page deletion on a signed PDF.
6. Not read: the hosted docs site (403), setup, API, development and v3 migration pages, the privacy and security policy pages, and the update-check default. Telemetry and maintainer succession were not found.
7. Confirm the `dev`-branch Markdown matches the v3.3.3 manual before citing it.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-4/README.md#paperless-ngx); [actual assessment](../../content/directory/paperless-ngx.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The exporter produces serialized model data plus files, not a raw database image; paths, conditional audit data and version behavior matter. No real manifest/files packet has been independently reconstructed and compared for OCR, document hashes, workflows, accounts and permissions. Field-level secret handling does not complete E3.
- E5: Not Verified. Export warnings and optional protection for selected mail/social-token fields are concrete controls, but do not encrypt all exported documents. Workflow execution, user permissions, trash/purge, metadata changes and inspectable correction remain insufficiently covered for the document-management profile.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: An independently inspected real export and clean import comparing document hashes, OCR, relationships, accounts and permissions; actual supported/unsupported-version outcomes; trash/purge and workflow authorization. E5 needs workflow/trash/purge and permission authorization, clear export-secret boundaries and correction evidence for document/metadata mutations.

Next without a local installation: Read a synthetic export manifest and originals with expected OCR/tag/correspondent/custom-field/permission mappings; obtain version-matched import/workflow/trash observations or comprehensive source coverage. Keep real account secrets out of the packet.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

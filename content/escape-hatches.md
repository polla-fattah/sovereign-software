+++
title = "Escape Hatches"
description = "Sovereignty is only real if you can leave. Practical, verifiable migration runbooks for moving essential records and workflows out of proprietary cloud silos into durable, user-controlled substrates."
weight = 5
+++

Authority over software is tested most sharply at the moment of departure. A service that allows you to create work easily but traps your history, relationships, or ongoing capability when you try to leave violates **Principle I (Sovereignty)** and fails the framework's minimum eligibility requirements (**E1** Independent access, **E2** Practicable exit, **E3** Independent recovery, and **E4** Continuing authority over already-created work).

This page provides practical **Escape Hatch runbooks** across the framework's software domains. Each runbook pairs open command-line extraction and verification tools with the rules of the [Sovereign Software Evaluation Methodology](/methodology/):

1. **An export button (`E1`) is not a practicable exit (`E2`):** Downloading a ZIP file does not prove you can leave. A real exit requires verifying that essential records, structural relationships, units, and metadata defined in the domain preservation profile (`Section 1 of the methodology`) survive into an independent tool.
2. **A raw data dump is not independent recovery (`E3`):** Preserving bytes without the schema, context, and tooling needed to interpret them leaves work unusable once the original service disappears.
3. **Synchronization is not a backup (`T2`, `T5`):** Mirroring a cloud mailbox or folder locally replicates deletions and corruption unless paired with versioned, user-controlled snapshots (`Git`, `restic`, or `BorgBackup`).
4. **No migration is promised to be lossless:** Every runbook states explicitly what survives, what must be verified, and what convenience layers or proprietary structures are lost during transition.

---

## The four-stage exit and verification protocol

Before closing an account or canceling a subscription, execute the same verification sequence used in **Stage 2** and **Stage 4** of our [laboratory evaluation protocol](/methodology/#61-six-stage-laboratory-execution-protocol):

| Stage | Action | Framework requirement & test | What to verify before proceeding |
|---|---|---|---|
| **1. Pre-withdrawal extraction** | Export all records, attachments, schemas, and history while your account and credentials are still active. | **E1** (Independent access)<br>**T1** (Ownership and exit) | Never assume a provider will grant a special export after a subscription lapses or a service shuts down. |
| **2. Fixity and baseline preservation** | Store an untouched, read-only copy of the raw export archive and record its cryptographic checksums (`sha256sum`). | **E3** (Independent recovery)<br>**T2** (Preservation and recovery) | Keep the original archive alongside your converted files so you can re-run conversions if a script drops metadata. |
| **3. Domain profile audit** | Import or convert the records into an independent tool and compare against the relevant **Domain Preservation Profile**. | **E2** (Practicable exit)<br>**T6** (Interoperability) | Check record counts, internal links, dates, units, balances, and attachments - not just whether a file opens without crashing. |
| **4. Isolated offline verification** | Disconnect network access (or use a clean machine without vendor credentials) and perform routine work on the migrated dataset. | **E4** (Continuing authority)<br>**T3** (Offline independence) | Confirm that reading, searching, editing, and building work locally without calling back to the former provider. |

---

## 1. Knowledge Bases, Notes & Personal Wikis (`knowledge_notes` profile)

- **From:** Cloud wikis and proprietary note silos (Notion, Evernote, Roam Research, Confluence Cloud, OneNote).
- **To:** Local UTF-8 Markdown or Org-mode directories ([Obsidian](/directory/obsidian/), [Logseq](/directory/logseq/), [Emacs Org-mode](/directory/emacs-org-mode/), [QOwnNotes](/directory/qownnotes/), [Zim](/directory/zim-wiki/)) versioned with [Git](/directory/git/).

### Extraction and verification commands

```bash
# 1. Preserve a read-only checksummed baseline of the vendor export archive
sha256sum notion_workspace_export.zip > notion_workspace_export.zip.sha256

# 2. Convert HTML or DOCX exports into clean CommonMark with YAML front matter
pandoc input_export.html -f html -t commonmark_x --wrap=none --standalone -o note.md

# 3. Verify record counts, embedded media paths, and broken wikilinks across the vault
rg --files ~/Vault | wc -l
rg "\!\[\[.*\]\]|\[.*\]\((?!https?:\/\/)([^)]+)\)" ~/Vault
```

### Alignment with the four principles and E1–E5

- **Sovereignty (`E1`, `E2`, `E4`):** Moving prose and attachments into an ordinary local directory removes account revocation risk; files remain readable and editable without vendor permission.
- **Longevity (`E3`, `T2`):** UTF-8 Markdown and Org-mode files are self-documenting plain text that can be parsed by standard POSIX tools decades after any specific note application is retired.
- **Locality (`T3`):** Full-text search (`ripgrep`), editing, and backlink traversal execute entirely on local hardware with zero network dependency.
- **Transparency and Control (`E5`, `T4`):** Wrapping the local vault in `Git` makes every automated or plugin-driven edit inspectable as a line-by-line diff and immediately reversible via `git checkout` or `git revert`.

### Migration caveats and acceptable vs. unacceptable loss

- **What survives (essential under `knowledge_notes`):** Prose, headings, code blocks, standard Markdown tables, image/PDF attachments, and basic YAML front matter.
- **What often breaks or requires manual repair:** Notion relational databases, rollups, formula columns, inline comments, and page-level permission histories do not map cleanly to plain Markdown. Export Notion databases as both **Markdown & CSV**, strip random UUID suffixes from filenames, and audit internal cross-references before decommissioning the cloud workspace.

---

## 2. Financial Ledgers & Task Management (`finance_tasks` profile)

- **From:** Subscription cloud budgeting and accounting platforms (YNAB, Monarch, Mint successors, QuickBooks Online).
- **To:** Double-entry plain-text ledgers or local databases ([Beancount](/directory/beancount/), [hledger](/directory/hledger/), [GnuCash](/directory/gnucash/), [Actual Budget](/directory/actual-budget/), [Money Manager Ex](/directory/money-manager-ex/)).

### Extraction and verification commands

```bash
# 1. Validate double-entry accounting integrity and balance assertions offline
bean-check personal_ledger.beancount
bean-query personal_ledger.beancount "SELECT account, sum(position) GROUP BY account ORDER BY account;"

# 2. Equivalent verification and balance sheet check using hledger
hledger -f personal_ledger.journal check --strict
hledger -f personal_ledger.journal balancesheet
```

### Alignment with the four principles and E1–E5

- **Sovereignty (`E1`, `E2`, `E4`):** Financial history and budget rules reside in user-held files that never lock behind a lapsed monthly subscription.
- **Longevity (`E3`, `T2`):** Plain-text double-entry formats (`Beancount`, `hledger`) and documented SQL/XML schemas (`GnuCash`) preserve every posting, commodity unit, and balance assertion in human-inspectable form.
- **Locality (`T3`):** Balance queries, tax reporting, and transaction entry run 100% offline.
- **Transparency and Control (`E5`, `T4`):** Explicit `balance` assertions and plain-text diffs prevent silent rounding errors, retroactive bank-feed mutations, or opaque category reclassifications.

### Migration caveats and acceptable vs. unacceptable loss

- **What survives (essential under `finance_tasks`):** Dates, payees, narration, account transfers, split postings, currency/commodity quantities, and cleared/reconciled states.
- **What requires careful auditing:** Cloud CSV exports frequently flatten split transactions, omit starting account balances, or mix envelope-budgeting allocations with actual account postings. Always insert explicit `balance` assertions matching your final bank and credit-card statements on the migration date to prove zero discrepancy. Automatic bank-feed tokens are inherently external and will not transfer.

---

## 3. Research, Citations & Scientific Computing (`research_bibliographic` profile)

- **From:** Cloud-locked reference managers and proprietary academic platforms (Mendeley Cloud, EndNote Web, ReadCube/Papers).
- **To:** Local bibliographic databases and open citation formats ([Zotero](/directory/zotero/), [JabRef](/directory/jabref/), [BibDesk](/directory/bibdesk/)) with standard `CSL JSON` and `BibTeX` interchange.

### Extraction and verification commands

```bash
# 1. Verify item and attachment counts directly in a local Zotero SQLite database
sqlite3 ~/Zotero/zotero.sqlite "SELECT COUNT(*) FROM items WHERE itemTypeID NOT IN (1, 14);"

# 2. Validate exported BibTeX syntax and check for missing DOIs or duplicate citation keys
bibtool -s -d references.bib -o references_checked.bib

# 3. Verify that all linked PDF attachments exist on local disk and record hashes
find ~/Zotero/storage -type f -name "*.pdf" -exec sha256sum {} + > pdf_attachments.sha256
```

### Alignment with the four principles and E1–E5

- **Sovereignty (`E1`, `E2`, `E4`):** Keeps your full PDF library, annotations, and bibliographic metadata in a local directory and SQLite database under your custody.
- **Longevity (`E3`, `T2`):** Combining a complete local data-directory backup with standard `BibTeX` / `CSL JSON` exports ensures both immediate restoration and multi-decade readability (`ISO 14721` representation information).
- **Locality (`T3`):** Searching references, reading annotated PDFs, and compiling LaTeX/Typst/Markdown bibliographies (`pandoc --citeproc` or `typst compile`) require no network connection.
- **Transparency and Control (`E5`, `T4`):** Stable, user-visible citation keys prevent silent cloud metadata overwrites from breaking citations in active manuscripts.

### Migration caveats and acceptable vs. unacceptable loss

- **Critical distinction (`T1` vs. `T2`):** An ordinary bibliographic export (`BibTeX`, `RIS`, `CSL JSON`) is for **cross-tool migration (`E2`)**, not a complete backup (`E3`). Re-importing an exported `.bib` or `.ris` file into a new database generates new internal item IDs, which can break live citation links in existing Word or LibreOffice documents. Always back up the entire native data directory (`zotero.sqlite` + `storage/`) alongside standard format exports, and verify that PDF highlights and notes are embedded in the PDFs or exported to Markdown before shutting down the old tool.

---

## 4. Engineering, CAD & Parametric Design (`cad_engineering` profile)

- **From:** Cloud-tethered CAD and proprietary EDA platforms (Autodesk Fusion 360, Onshape, EasyEDA, cloud-locked PCB tools).
- **To:** Local parametric modellers and open-format engineering suites ([FreeCAD](/directory/freecad/), [OpenSCAD](/directory/openscad/), [CadQuery](/directory/cadquery/), [KiCad](/directory/kicad/), [QGIS](/directory/qgis/)).

### Extraction and verification commands

```bash
# 1. Inspect the XML feature tree inside a local FreeCAD project archive (.FCStd)
unzip -p assembly.FCStd Document.xml | head -n 40

# 2. Rebuild a parametric code-CAD model deterministically offline from command line
openscad -o enclosure_rev2.stl --export-format binstl -D 'wall_thickness=2.4' enclosure.scad

# 3. Run KiCad Design Rule Check (DRC) and export Gerber fabrication files offline
kicad-cli pcb drc --output drc_report.json board.kicad_pcb
kicad-cli pcb export gerbers --output ./gerbers/ board.kicad_pcb
```

### Alignment with the four principles and E1–E5

- **Sovereignty (`E1`, `E2`, `E4`):** Eliminates mandatory cloud license check-ins and remote project storage that can revoke access to your own mechanical or electronic designs when subscription tiers change.
- **Longevity (`E3`, `T2`):** Code-based CAD (`OpenSCAD`, `CadQuery`), documented XML/ZIP project archives (`.FCStd`), S-expression schematics (`.kicad_sch`), and ISO 10303 `STEP` files remain inspectable and reproducible across decades.
- **Locality (`T3`):** Geometry recomputation, DRC verification, finite-element meshing, and CAM/Gerber generation run entirely on local workstation hardware.
- **Transparency and Control (`E5`, `T4`):** Text-based schematics and parametric scripts allow engineers to inspect exact dimensional tolerances and review hardware revisions via `git diff`.

### Migration caveats and acceptable vs. unacceptable loss

- **Data longevity vs. Functional longevity (`Methodology Section 2.II`):** Exporting a 3D model from a cloud CAD system to **ISO 10303 STEP (`AP214`/`AP242`)** preserves exact boundary-representation (B-Rep) solid geometry, units, and assembly hierarchy (vastly superior to a tessellated `STL` mesh), **but STEP does not preserve the parametric feature history, sketch constraints, or formulas**. When leaving a cloud CAD tool, always export: *(a)* the native project archive, *(b)* high-precision `STEP` assemblies, *(c)* 2D dimensioned engineering drawings (`DXF`/`PDF`), and *(d)* parameter tables (CSV) so design intent can be reconstructed in `FreeCAD` or `CadQuery`.

---

## 5. Version Control & Core Infrastructure (`vcs_core` profile)

- **From:** Centralized cloud code hosts and issue platforms (GitHub, GitLab SaaS, Bitbucket Cloud).
- **To:** Self-contained cryptographic bundles and independent or self-hosted forges ([Git](/directory/git/), [Jujutsu](/directory/jujutsu/), [Fossil](/directory/fossil/), [Forgejo](/directory/forgejo/), [Gitea](/directory/gitea/)).

### Extraction and verification commands

```bash
# 1. Clone a complete bare mirror (all branches, tags, pull-request refs, and notes)
git clone --mirror https://example.com/org/project.git project.mirror.git

# 2. Fetch all Git LFS binary objects locally so no external object store is required
git -C project.mirror.git lfs fetch --all

# 3. Package the entire repository into a single offline-verifiable archival file
git -C project.mirror.git bundle create ../project_complete.bundle --all
git bundle verify ../project_complete.bundle
```

### Alignment with the four principles and E1–E5

- **Sovereignty (`E1`, `E2`, `E4`):** Every full Git clone or bundle contains the complete cryptographic Merkle DAG of commits, trees, and blobs; no hosting provider can hold your source history hostage.
- **Longevity (`E3`, `T2`):** A single `.bundle` file can be archived on offline media and cloned onto an air-gapped machine (`git clone project_complete.bundle`) without any network server.
- **Locality (`T3`):** Branching, diffing, blame, bisecting, and commit verification (`git fsck --full`) operate 100% locally, and remote push/pull URLs can be repointed to any SSH server or self-hosted `Forgejo` instance in seconds.
- **Transparency and Control (`E5`, `T4`):** Cryptographic commit hashes and signed tags make any unauthorized history rewrite immediately detectable.

### Migration caveats and acceptable vs. unacceptable loss

- **What `git bundle` preserves vs. what it omits:** `git bundle create --all` preserves 100% of Git commits, branches, and tags. However, **GitHub/GitLab issues, pull-request review discussions, wiki repositories, release binaries, and CI/CD runner definitions live outside the core Git DAG**, and **Git LFS objects** are stored as pointer files unless explicitly fetched via `git lfs fetch --all`. When migrating a project off a cloud forge, use the forge's migration API (for example, `Forgejo`'s built-in repository migrator) or archive issues and PRs into JSON/SQLite alongside the `.bundle` file.

---

## 6. Communications, Mailboxes & Credential Custody (`T5` Security & Continuity)

- **From:** Webmail-only accounts (Gmail, Outlook 365) and cloud-hosted password managers (LastPass, 1Password Cloud).
- **To:** Local Maildir archives (`isync`/`mbsync` + `notmuch` or Thunderbird) and user-keyed encrypted vaults ([KeePassXC](/directory/keepassxc/), [Pass](/directory/pass/)) backed up with [restic](/directory/restic/) or [BorgBackup](/directory/borgbackup/).

### Extraction and verification commands

```bash
# 1. Synchronize remote IMAP folders into local Maildir files and index for offline search
mbsync -a && notmuch new
notmuch count "date:2020..2026"

# 2. Verify integrity and exportability of a local KeePassXC (.kdbx) vault using user-held keys
keepassxc-cli db-info ~/Vaults/credentials.kdbx

# 3. Create an encrypted, deduplicated, versioned snapshot of local Maildir and vaults
restic -r /backup/restic-repo backup ~/Maildir ~/Vaults && restic -r /backup/restic-repo check
```

### Alignment with the four principles and E1–E5

- **Sovereignty (`E1`, `E2`, `E4`):** Keeps decades of correspondence and credentials on user-controlled storage where sudden account lockouts cannot erase your digital identity or access keys.
- **Longevity (`E3`, `T2`):** Maildir stores one standard RFC 5322 plain-text file per message; `KDBX` and GPG-encrypted `pass` trees are openly specified and recoverable on any clean machine using only your master key.
- **Locality (`T3`):** Searching years of correspondence (`notmuch`) and unlocking credentials (`KeePassXC` / `pass`) happen locally with zero cloud handshakes.
- **Transparency and Control (`E5`, `T4`, `T5`):** Eliminates architectural custody exposure (`E4`/`T5`) where a third-party cloud operator holds metadata or key-recovery paths over your most sensitive records.

### Migration caveats and acceptable vs. unacceptable loss

- **Synchronization vs. backup (`T2`, `T5`):** Two-way IMAP synchronization (`mbsync`) mirrors server-side deletions locally if an account is compromised or wiped. Always pair local Maildir sync with an append-only or versioned backup repository (`restic` or `BorgBackup`). When migrating password vaults, verify that TOTP seeds, custom fields, and file attachments survived the transfer, and securely shred any temporary unencrypted CSV intermediate files immediately (`shred -u`).

---

## Summary matrix: What survives and what to audit across domains

| Domain profile | Source silo | Target sovereign substrate | Essential records that must survive (`E1–E3`) | Primary migration risk to audit (`T1`, `T2`) |
|---|---|---|---|---|
| **`knowledge_notes`** | Notion, Evernote, Roam | Local Markdown / Org directory + `Git` | Prose, headings, internal links/backlinks, attachments, front matter | Relational database views, inline comments, broken relative link paths |
| **`finance_tasks`** | YNAB, Cloud Accounting | `Beancount`, `hledger`, `GnuCash`, `Actual` | Double-entry postings, commodities, dates, reconciliation states, balances | Flattened split transactions, missing opening balances, rounding drift |
| **`research_bibliographic`** | Mendeley, EndNote Web | `Zotero` (`SQLite` + `CSL JSON` / `BibTeX`), `JabRef` | Bibliographic metadata, DOIs, collections, PDFs, annotations, citation keys | Broken word-processor citation links if re-imported via export rather than DB copy |
| **`cad_engineering`** | Fusion 360, Onshape | `FreeCAD`, `OpenSCAD`, `CadQuery`, `KiCad` | Exact 3D/2D geometry, units, tolerances, schematics, PCB layouts | Loss of parametric feature tree and sketch constraints when exporting only `STEP`/`STL` |
| **`vcs_core`** | GitHub, GitLab SaaS | `Git` bundle, `Forgejo`, `Fossil`, `Jujutsu` | Full commit DAG, branches, tags, cryptographic hashes, authorship | Unfetched Git LFS objects, external issue trackers, PR review comments |
| **Communications & Custody** | Webmail, Cloud Vaults | Local `Maildir` (`mbsync`/`notmuch`), `KeePassXC`, `Pass` | RFC 5322 messages, attachments, credentials, TOTP seeds, custom fields | Syncing deletions without versioned backup (`restic`/`Borg`); unshredded temp CSVs |

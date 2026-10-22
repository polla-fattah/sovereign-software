---
marp: true
theme: sovereign
paginate: true
title: A Manifesto for Sovereign Personal Software
description: Slides for presenting the manifesto, its intellectual lineage, its evidence-led evaluation methodology, and prime examples from the Sovereign Index
footer: sovereign.polla.dev
---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _footer: "" -->

# A Manifesto for Sovereign Personal Software

Software should serve people without claiming permanent custody over their information, choices, or work.

**Dr. Polla Fattah**

*sovereign.polla.dev*

<!--
Open with the one-line claim. Mention that the full manifesto, the ten lineage dossiers, the evaluation methodology, and the Sovereign Index are all published on the site with zero third-party trackers.
-->

---

## The problem

- Many applications make ordinary work depend on **remote services, vendor accounts, and opaque decisions**
- Business models, pricing, and terms can change **without the user's consent**
- Convenience becomes dependence when a person **cannot continue working, retrieve records, or leave** without unacceptable loss

**When the software, vendor, or network changes, do you still hold effective authority over your work?**

<!--
Ask the audience for one tool they rely on every week that would lock them out of their own history if their subscription or account stopped working tomorrow.
-->

---

<!-- _class: statement -->

## The core thesis

> Software should remain under human authority, preserve human knowledge, function independently wherever possible, and make consequential behavior understandable and controllable.

*Sovereign Software does not reject networks, commercial software, or AI. It rejects unnecessary surrender of control.*

---

## Four principles

1. **Sovereignty:** authority belongs to the user
2. **Longevity:** information outlives software
3. **Locality:** independence is designed in
4. **Transparency and Control:** consequential behavior remains governable

*They do not prescribe a language, database, license, operating system, or interface style. They establish what an implementation must make possible.*

---

## A relationship, not a ranking

- **Sovereignty** defines the goal (information, execution, governance, and continuity authority)
- **Longevity** protects it across time (data, functional, and knowledge longevity)
- **Locality** provides a powerful means of independence
- **Transparency and Control** make authority meaningful in operation

All four matter, and **no single numerical score can excuse a proven loss of fundamental user control**.

<!--
The order describes how the principles reinforce one another. It is not a weighted formula where speed or UI polish can offset vendor lock-in.
-->

---

<!-- _class: dense -->

## Intellectual lineage (1983 to present)

Sovereign Software is a **synthesis and evaluation approach** building on ten traditions:

1. **Free Software (1983):** user freedom to run, study, modify, and redistribute code
2. **Digital Preservation & OAIS (1995):** keeping records independently understandable across decades
3. **Interoperability & Right to Exit (2000s):** low switching costs and protocol portability
4. **IndieWeb (2010):** owning your domain and content before syndicating outward (POSSE)
5. **MyData (2014):** human-centric control over personal data flows
6. **Solid (2016):** decoupling user data pods from applications
7. **Design Justice (2016):** asking *which* users hold power in multi-stakeholder systems
8. **Local-first Software (2019):** primary copy on local storage; the cloud is optional
9. **Permacomputing (2020):** long hardware lifespans and minimal, inspectable stacks
10. **AI Governance / NIST AI RMF (2021):** inspectable, contestable automated decisions

---

<!-- _class: dense -->

## Where we stand and what this framework adds

- **Observable authority over ideology:** we test what a user can actually do when a vendor stops cooperating, rather than judging by license labels or protocol names alone
- **Operational independence vs. source freedom:** portable open formats suffice when independent tools can continue the work; source availability is required when the application binary is the sole viable interpreter
- **Longevity beyond raw bytes:** exporting a static mesh or PDF is not preservation if editable parametric constraints, formulas, or citation graphs are lost
- **Individual vs. shared governance:** assessments declare a **perspective role** (*Individual*, *Contributor*, *Collaborator*, or *Institutional Custodian*) to separate accountable team governance from vendor lock-in

---

## Sovereignty & Longevity in practice

<div class="cols">
<div>

### I. Sovereignty
- Practical, **not merely contractual**, authority over records and workflows
- Documented access, export, backup, restore, and migration
- Honest cryptographic key custody
- Managed services qualify **only** if exit and independent recovery remain real

</div>
<div>

### II. Longevity
- **Data longevity:** records and metadata survive independently
- **Functional longevity:** essential workflows continue in alternative tools
- **Knowledge longevity:** schemas, units, and provenance stay documented
- Documented binary formats (e.g. SQLite) can qualify alongside plain text

</div>
</div>

---

## Locality & Transparency in practice

<div class="cols">
<div>

### III. Locality
- The network should **extend** software, not gate access to local work
- Reading, editing, searching, and core calculation run on user hardware
- Evaluated by **dependency proportionality and replaceability** (can a relay or server be self-hosted or swapped?)

</div>
<div>

### IV. Transparency & Control
- Consequential operations must be inspectable, authorized, and reversible
- Distinguish **suggestions from committed actions**
- **Determinism is an engineering tool, not the principle:** statistical/AI tools comply when bounded and auditable

</div>
</div>

---

## AI and synchronization without surrender

<div class="cols">
<div>

### AI boundaries
1. Records remain accessible if the AI provider disappears
2. Non-AI core workflows work without AI
3. Consequential AI edits require risk-proportionate approval
4. Network calls and costs are disclosed
5. Kept outputs use open formats

</div>
<div>

### Synchronization boundaries
1. Sync connects devices; it must not transfer custody
2. Automatic merges (CRDTs) can fix syntax while breaking human intent
3. Document conflict rules and keep recoverable history
4. **Replication is not a tested backup**

</div>
</div>

---

<!-- _class: dense -->

## Evaluation methodology: scope and eligibility

Every assessment declares its **Domain Preservation Profile** (`vcs_core`, `knowledge_notes`, `cad_engineering`, `finance_tasks`, `research_bibliographic`) and **Perspective Role** before testing against **five non-compensatory requirements**:

- **E1 Independent access:** retrieve an intelligible copy of essential records
- **E2 Practicable exit:** migrate to an alternative workflow without unacceptable loss of meaning
- **E3 Independent recovery:** interpret and restore records after the original vendor is gone
- **E4 Continuing authority & custody:** keep working on existing records when subscriptions or servers stop, with no architectural exposure to unauthorized parties
- **E5 Consequential oversight:** inspect, authorize, and reverse or contest high-risk actions

**Status:** *Pass*, *Fail*, *Not Verified*, or *Not Applicable with justification*.

---

<!-- _class: dense -->

## Six-stage lab protocol & precedence rules

<div class="cols">
<div>

### Seven verification tests (`T1–T7`)
1. **T1** Ownership and exit (`E1, E2, E4`)
2. **T2** Preservation and recovery (`E3`)
3. **T3** Offline independence (`Locality`)
4. **T4** Operational transparency (`E5`)
5. **T5** Security, custody, and continuity
6. **T6** Interoperability & maintainability
7. **T7** Human experience & performance *(supporting quality, never a 100-ms gate)*

</div>
<div>

### Five determinations (in order)
1. **Fails a fundamental requirement**
2. **Insufficient evidence**
3. **Does not meet the proposed core standard**
4. **Partially aligned**
5. **Meets the proposed core requirements**

*Computed deterministically from evidence; never stored as a manual badge.*

</div>
</div>

---

<!-- _class: dense -->

## Prime examples I: Infrastructure & knowledge

Well-known, well-behaved tools in the **Sovereign Index** (`/directory/`):

- **Git & Jujutsu (`vcs_core`):** complete revision history, parent-child DAG, and cryptographic integrity hashes live locally in `.git/`; full offline commits, branching, and bundle recovery without any central forge
- **SQLite (`vcs_core`):** single-file ACID relational database with a publicly specified binary format, endorsed by the US Library of Congress for long-term dataset preservation
- **Obsidian, Logseq & Org-mode (`knowledge_notes`):** vaults are ordinary local folders of UTF-8 Markdown or Org files; even if the application binary vanishes, prose, headings, attachments, and internal links remain readable with standard text tools
- **Typst & LibreOffice (`knowledge_notes`):** local document compilation and OpenDocument (`ODF`) authoring with zero mandatory cloud accounts

---

<!-- _class: dense -->

## Prime examples II: Finance, custody & research

- **Beancount & hledger (`finance_tasks`):** plain-text double-entry accounting ledgers where every posting, currency, and balance assertion is inspectable with `grep` or `git diff` and verified deterministically offline
- **KeePassXC & Pass (`vcs_core`):** local cryptographic password vaults (`KDBX` and GPG-encrypted directory trees) where decryption keys never leave user custody
- **Zotero (`research_bibliographic`):** local SQLite database and PDF storage on the user's filesystem, supporting complete offline search, citation, and standard export (`BibTeX`, `CSL JSON`, `RDF`)
- **Paperless-ngx & calibre (`knowledge_notes` / `research_bibliographic`):** self-hosted archival PDF/A document management and local e-book libraries with documented directory layouts and metadata sidecars

---

<!-- _class: dense -->

## Prime examples III: Engineering, sync & systems

- **KiCad, FreeCAD & OpenSCAD (`cad_engineering`):** schematic, PCB, and parametric 3D CAD tools that run offline without license-server heartbeats and store human-readable S-expressions or CSG source alongside `STEP` and `Gerber` exports
- **Syncthing + restic / BorgBackup (`vcs_core`):** peer-to-peer encrypted folder synchronization paired with deduplicated, client-side encrypted backups that can be restored on any clean machine with independent CLI tools
- **NixOS, GNU Guix & OpenBSD (`vcs_core`):** declarative, reproducible operating-system configurations and auditable base systems that protect long-term functional longevity
- **ToDoz (Reference Implementation):** an offline-first task manager (`todoz.polla.dev`) built with Flutter, SQLite, deterministic recurrence rules, and an optional self-hosted sync relay

---

<!-- _class: dense -->

## Escape hatches: leaving cloud silos safely

When a tool fails sovereignty, `/escape-hatches/` provides **4-stage migration runbooks** across all six domains:

1. **Extract from the source silo** using native bulk exports or local caches (Notion, Evernote, Google Docs, Cloud Password Managers, Proprietary Finance, SaaS Git Forges)
2. **Audit completeness (`T1`)** before closing the account: check record counts, attachments, internal links, and historical timestamps
3. **Normalize into a durable local substrate (`T2`, `T6`):** plain UTF-8 Markdown, OpenDocument, SQLite, `KDBX`, plain-text ledgers, or `--mirror` Git bundles
4. **Cut over, back up, and freeze (`T3`, `T5`):** verify offline operation in an isolated environment and retain a read-only archive of the raw export

*No migration is promised to be lossless: every runbook documents what metadata or platform state is lost on exit.*

---

<!-- _class: dense -->

## Selected references

1. Kleppmann, Wiggins, van Hardenberg, McGranaghan. Local-first software: you own your data, in spite of the cloud. *Onward!*, 2019.
2. SQLite. Recommended Storage Format for Datasets (Library of Congress preservation designation).
3. Shapiro, Preguiça, Baquero, Zawirski. Conflict-free replicated data types. *SSS*, 2011.
4. McIlroy, Pinson, Tague. UNIX Time-Sharing System: Foreword. *Bell System Technical Journal*, 1978. (Historical context for modular tools.)
5. Nielsen. *Usability Engineering*, 1993. (Supporting usability guidance.)

---

## For discussion

- Which tool you rely on every day **fails the provider-withdrawal test**: could you continue working and recover your records if the vendor vanished tonight?
- Where is the boundary between **operational independence** (portable data) and **software freedom** (open-source code) in your domain?
- In collaborative research or institutional software, how should **individual exit rights** balance against **shared audit-trail retention**?

---

<!-- _class: title -->
<!-- _footer: "" -->

# Thank you

**Manifesto & Lineage:** sovereign.polla.dev / sovereign.polla.dev/lineage

**Methodology & Index:** sovereign.polla.dev/methodology / sovereign.polla.dev/directory

**Escape Hatches:** sovereign.polla.dev/escape-hatches

**Source:** github.com/polla-fattah/sovereign-software · *CC BY 4.0*

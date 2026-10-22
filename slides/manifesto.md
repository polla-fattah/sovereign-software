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

## The provider-withdrawal test

Imagine the vendor disappears tonight.

- Can you open the records you already created?
- Can you keep doing the essential work offline?
- Can another tool recover the meaning, history, and relationships?

This scenario turns a broad idea into a practical test of authority.

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

## Principle I: Sovereignty

Sovereignty means practical authority over the records and workflows that matter.

- You can access, export, back up, restore, and migrate your work
- Cryptographic keys remain under accountable custody
- A managed service qualifies only when independent recovery remains real

The question is practical rather than contractual: can permission be withdrawn without taking the work with it?

---

## Principle II: Longevity

Longevity has three layers.

- **Data longevity:** the records and metadata survive independently
- **Functional longevity:** essential work continues in another tool
- **Knowledge longevity:** schemas, units, provenance, and relationships remain understandable

A static export can preserve bytes while losing the editable model that gave those bytes meaning.

---

## Principle III: Locality

Locality makes the network an extension of the user's environment.

- Reading, editing, searching, and core calculation run on user hardware
- The network adds collaboration or transport where useful
- A relay or hosted service can be replaced without losing the primary copy

Offline capability is evidence of independence, not a promise that every feature must be local.

---

## Principle IV: Transparency and Control

Consequential behavior must remain governable.

- The system shows what it proposes to do
- The user authorizes actions in proportion to their risk
- Changes leave an inspectable trail and can be reversed or contested

Statistical and AI tools can comply when their boundaries, outputs, and costs remain visible.

---

## How the principles reinforce one another

- **Sovereignty** defines the goal (information, execution, governance, and continuity authority)
- **Longevity** protects it across time (data, functional, and knowledge longevity)
- **Locality** provides a powerful means of independence
- **Transparency and Control** make authority meaningful in operation

All four matter, and **no single numerical score can excuse a proven loss of fundamental user control**.

<!--
The order describes how the principles reinforce one another. It is not a weighted formula where speed or UI polish can offset vendor lock-in.
-->

---

<!-- _class: statement -->

## Intellectual lineage

Sovereign Software is a **synthesis and evaluation approach**. Its lineage is a conversation about who controls software, where information lives, and how authority survives change.

**1983 to present**

---

## Free Software: freedom to control the program

**1983 to present**

The GNU tradition established the moral foundation: users should be able to run, study, modify, and redistribute the software they depend on.

**Contribution to Sovereign Software:** authority belongs to the user, and inspectability matters when software acts on the user's behalf.

**Example:** a local program whose source can be repaired or rebuilt after its original maintainer disappears.

---

## Digital preservation: a bitstream is not information

**1995 to present**

OAIS and library preservation practice show that long-term access requires more than keeping bytes. It also requires representation information, provenance, context, and fixity.

**Contribution to Sovereign Software:** test whether a future reader can still understand the record, its units, and its relationships.

**Example:** a CAD file that retains constraints and units, not only a flattened image or mesh.

---

## Interoperability and the right to exit

**2000s to present**

Interoperability work reframed switching as a design obligation. Open protocols and documented formats reduce the cost of leaving a provider.

**Contribution to Sovereign Software:** exit must be practicable, not merely promised in a terms-of-service page.

**Example:** exporting a complete repository with history, branches, and issue references rather than a folder of current files.

---

## The IndieWeb: own first, syndicate outward

**2010 to present**

The IndieWeb made personal custody concrete through domains, feeds, and POSSE: Publish on Own Site, Syndicate Elsewhere.

**Contribution to Sovereign Software:** publication and collaboration can extend a primary copy without transferring custody to the platform.

**Example:** a personal research site that can republish to social networks while the canonical posts remain under the author's control.

---

## MyData: turn formal rights into practical agency

**2014 to present**

MyData argues that access, portability, and consent matter only when people have usable technical mechanisms to exercise them.

**Contribution to Sovereign Software:** evaluate actual access and reuse, not a legal statement that the user owns the data.

**Example:** a structured export that another service can import without a custom migration project.

---

## Solid: separate execution from custody

**2015 to present**

Solid proposed personal data pods so applications could operate on user-controlled records without owning the storage layer.

**Contribution to Sovereign Software:** separate execution, preservation, and exchange, then test whether the separation works offline and across providers.

**Example:** two applications using the same documented records while the user controls access and can move the store.

---

## Design Justice: ask who holds power

**2015 to present**

Design Justice exposed a blind spot in purely individualistic accounts of sovereignty. Shared systems contain affected communities, administrators, contributors, and custodians with different rights.

**Contribution to Sovereign Software:** distinguish legitimate shared governance from vendor lock-in through perspective roles and contestable rules.

**Example:** a research lab may preserve an audit trail even when one contributor leaves the project.

---

## Local-first software: the cloud is optional

**2019 to present**

Local-first software made local custody, offline work, and later synchronization a coherent design target.

**Contribution to Sovereign Software:** treat local-first as a powerful architecture, then verify that the local copy is intelligible, recoverable, and not dependent on a vendor-only client.

**Example:** a notes application that edits locally, syncs later, and leaves readable Markdown when the app is gone.

---

## Permacomputing: design for long survival

**2020 to present**

Permacomputing challenges fragile dependency chains, forced hardware upgrades, and software that becomes impossible to repair.

**Contribution to Sovereign Software:** keep systems replaceable and inspectable without penalizing legitimate complex work such as GIS, CAD, or video editing.

**Example:** a documented local format and a small recovery tool that still work on ordinary hardware years later.

---

## AI governance: automation must remain contestable

**2021 to present**

Human-centered AI and the NIST AI RMF emphasize accountability, explainability, risk management, and human oversight.

**Contribution to Sovereign Software:** treat remote AI as a replaceable dependency and require approval, provenance, and reversal for consequential changes.

**Example:** an AI assistant may draft a change, but the user can inspect the diff, approve it, and continue without the provider.

---

## Where this framework adds a distinct test

- **Observable authority over ideology:** we test what a user can actually do when a vendor stops cooperating, rather than judging by license labels or protocol names alone
- **Operational independence vs. source freedom:** portable open formats suffice when independent tools can continue the work; source availability is required when the application binary is the sole viable interpreter
- **Longevity beyond raw bytes:** exporting a static mesh or PDF is not preservation if editable parametric constraints, formulas, or citation graphs are lost
- **Individual vs. shared governance:** assessments declare a **perspective role** (*Individual*, *Contributor*, *Collaborator*, or *Institutional Custodian*) to separate accountable team governance from vendor lock-in

---

## From lineage to an evaluation method

The lineage supplies principles and warnings. The framework adds a repeatable question:

**What can this user still do when the provider stops cooperating?**

The answer must be supported by evidence from exports, offline trials, recovery tests, and review of consequential actions.

---

## Sovereignty and Longevity in practice

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

## Locality and Transparency in practice

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

## AI boundaries

AI can assist without becoming the custodian of the work.

1. Records remain accessible if the provider disappears
2. Non-AI core workflows work without AI
3. Consequential AI edits require risk-proportionate approval
4. Network calls and costs are disclosed
5. Kept outputs use open formats

**Example:** an AI-generated spreadsheet formula appears as a proposed diff, with the source record and final result preserved locally.

---

## Synchronization boundaries

Sync connects devices. It must not transfer custody.

1. Automatic merges can fix syntax while breaking human intent
2. Conflict rules and recoverable history stay documented
3. A relay can be self-hosted or replaced where the domain allows
4. **Replication is not a tested backup**

**Example:** a deleted folder that syncs everywhere is still deleted everywhere unless an independent backup can restore it.

<!-- _class: dense -->

## Evaluation scope: profile and perspective

Every assessment declares its **Domain Preservation Profile** (`vcs_core`, `knowledge_notes`, `cad_engineering`, `finance_tasks`, `research_bibliographic`) and **Perspective Role** before testing.

The role matters because a personal notebook, a collaborative repository, and an institutional archive do not have the same custody obligations.

---

<!-- _class: dense -->

## Five requirements for practical authority

Every assessment tests five non-compensatory requirements:

- **E1 Independent access:** retrieve an intelligible copy of essential records
- **E2 Practicable exit:** migrate to an alternative workflow without unacceptable loss of meaning
- **E3 Independent recovery:** interpret and restore records after the original vendor is gone
- **E4 Continuing authority and custody:** keep working when subscriptions or servers stop
- **E5 Consequential oversight:** inspect, authorize, and reverse or contest high-risk actions

**Status:** *Pass*, *Fail*, *Not Verified*, or *Not Applicable with justification*.

---

## Seven verification tests

### Seven verification tests (`T1–T7`)
1. **T1** Ownership and exit (`E1, E2, E4`)
2. **T2** Preservation and recovery (`E3`)
3. **T3** Offline independence (`Locality`)
4. **T4** Operational transparency (`E5`)
5. **T5** Security, custody, and continuity
6. **T6** Interoperability & maintainability
7. **T7** Human experience & performance *(supporting quality, never a 100-ms gate)*

---

<!-- _class: dense -->

## Determinations follow precedence rules

The framework never averages away a fundamental failure.

1. **Fails a fundamental requirement**
2. **Insufficient evidence**
3. **Does not meet the proposed core standard**
4. **Partially aligned**
5. **Meets the proposed core requirements**

The determination is computed from evidence, never stored as a manual badge.

---

## Example: Git and Jujutsu keep history local

The repository contains the parent-child history, integrity hashes, branches, and offline commit capability.

**Provider-withdrawal test:** a forge can disappear while the working repository remains usable and recoverable through a local bundle.

**What to inspect:** `.git/`, repository logs, bundle creation, and a clean-machine restore.

---

## Example: SQLite preserves a working substrate

SQLite stores a database in one file, with a public format and independent command-line tools.

**Provider-withdrawal test:** the application can vanish while the records remain queryable and portable.

**Caveat:** the schema and meanings still need documentation. A durable container cannot rescue an undocumented model.

---

## Example: local notes preserve meaning

Obsidian, Logseq, and Org-mode keep the primary notes in ordinary local files.

**Provider-withdrawal test:** prose, headings, attachments, and links remain readable with standard text tools.

**Loss to watch:** application-specific queries, plugins, and visual views may need a separate migration plan.

---

## Example: finance ledgers make state inspectable

Beancount and hledger represent transactions as plain text with explicit currencies and balance assertions.

**Provider-withdrawal test:** a person can inspect changes with `git diff`, verify balances offline, and move to another ledger tool.

**Why it matters:** the record exposes the reasoning behind the balance, not only the current number.

---

## Example: password custody is a key question

KeePassXC and Pass keep encrypted vaults on the user's filesystem.

**Provider-withdrawal test:** the vault and decryption keys remain usable without a vendor account or hosted unlock service.

**Boundary:** local custody does not remove the need for secure backups, recovery testing, or careful key handling.

---

## Example: research work needs more than PDFs

Zotero keeps a local database, attachments, search, citation data, and standard exports.

**Provider-withdrawal test:** references and files remain usable after the application or sync service is gone.

**Loss to watch:** a PDF export can preserve the article while losing collections, notes, citation relationships, or provenance.

---

## Example: CAD needs the editable model

KiCad, FreeCAD, and OpenSCAD run offline and preserve source alongside exchange formats such as `STEP`, `Gerber`, or CSG.

**Provider-withdrawal test:** another tool can recover the design intent, not only render the final geometry.

**Key distinction:** a static mesh is an output. Parametric constraints, units, and component relationships are part of the work.

---

## Example: sync is different from backup

Syncthing connects devices. Restic and BorgBackup create recoverable, encrypted snapshots.

**Provider-withdrawal test:** a clean machine can restore a known point in time without the original relay or client.

**Operational lesson:** redundancy reduces device dependence. Tested restoration protects against corruption, deletion, and bad merges.

---

## Example: ToDoz shows the reference pattern

ToDoz is an offline-first task manager built with Flutter, SQLite, deterministic recurrence rules, and an optional self-hosted sync relay.

**Reference pattern:** local records and core actions remain useful; synchronization extends the workflow rather than owning it.

**What the example makes visible:** sovereignty is an architectural property that can be tested in a small real system.

---

## Escape hatches: leaving cloud silos safely

When a tool fails sovereignty, `/escape-hatches/` provides **4-stage migration runbooks** across all six domains:

1. **Extract from the source silo** using native bulk exports or local caches (Notion, Evernote, Google Docs, Cloud Password Managers, Proprietary Finance, SaaS Git Forges)
2. **Audit completeness (`T1`)** before closing the account: check record counts, attachments, internal links, and historical timestamps
3. **Normalize into a durable local substrate (`T2`, `T6`):** plain UTF-8 Markdown, OpenDocument, SQLite, `KDBX`, plain-text ledgers, or `--mirror` Git bundles
4. **Cut over, back up, and freeze (`T3`, `T5`):** verify offline operation in an isolated environment and retain a read-only archive of the raw export

*No migration is promised to be lossless: every runbook documents what metadata or platform state is lost on exit.*

---

<!-- _class: dense -->

## A migration example: cloud notes to a local substrate

1. Export notes, attachments, timestamps, and internal links
2. Compare counts and sample the most important records
3. Normalize into UTF-8 Markdown plus a documented asset layout
4. Open the result in an independent tool with the network disabled
5. Keep the raw export read-only and version the normalized copy

The migration is complete only when the new workflow preserves the meaning that the user actually needs.

---

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

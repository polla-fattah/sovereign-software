---
marp: true
theme: sovereign
paginate: true
title: "A Manifesto for Sovereign Personal Software (15-Minute Talk)"
description: "15-minute university presentation on the Sovereign Software Manifesto, contrasting EU/national digital sovereignty with practical user and institutional software authority"
footer: "sovereign.polla.dev · 15-Minute University Talk"
---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _footer: "" -->

# A Manifesto for Sovereign Personal Software

Software should serve people without claiming permanent custody over their information, choices, or work.

**Dr. Polla Fattah**

*sovereign.polla.dev*

<!--
[Minute 0:00 - 1:00]
Welcome everyone. Today I have 15 minutes to introduce a research initiative and manifesto we have published at sovereign.polla.dev: "A Manifesto for Sovereign Personal Software."
The central claim fits in one sentence: Software should serve people without claiming permanent custody over their information, choices, or work.
-->

---

## 1. The Everyday Crisis & The Provider-Withdrawal Test

Many modern tools make ordinary academic, engineering, and personal work dependent on **remote servers, vendor accounts, and revocable subscriptions**.

**Imagine your software provider disappears tonight (or revokes your account):**
- Can you still **open and read** the records you already created?
- Can you **continue your essential work** without their server's permission?
- Can an **independent tool** recover your history, metadata, and design intent?

**Convenience becomes dependence when you cannot leave without losing what is yours.**

<!--
[Minute 1:00 - 2:15]
Think about the tools you use every week: reference managers, cloud CAD, note databases, or financial software.
In our framework, we replace vague debates about software quality with a concrete stress test: the Provider-Withdrawal Scenario.
If the vendor vanishes tonight or changes its pricing model tomorrow, what happens to five years of your work?
-->

---

<!-- _class: dense -->

## 2. Two Meanings of "Digital Sovereignty": National vs. Personal

When people hear *sovereignty* in tech policy, they often think of **Geopolitical / State Digital Sovereignty**. How does our manifesto relate to it?

<div class="cols">
<div>

### National / EU Level (Macro)
- **EU Digital Sovereignty, Gaia-X, EuroStack, Open Source Policies**
- **Focus:** Jurisdiction, cloud infrastructure borders, GDPR/DMA compliance, strategic autonomy from foreign tech monopolies
- **Actor:** The State / Supranational Regulators

</div>
<div>

### Personal & Institutional Level (Micro)
- **Sovereign Personal Software Manifesto**
- **Focus:** Practical custody over *your* files, keys, research, and workflows when a vendor changes terms or shuts down
- **Actor:** The Individual, Research Lab, or Organization

</div>
</div>

**The blind spot:** Hosting a closed cloud platform inside national borders satisfies *state jurisdiction*, but **still leaves the researcher or citizen locked out** if their subscription lapses.

<!--
[Minute 2:15 - 3:45]
Before going further, let's clarify scale: is this national or personal?
In Europe, initiatives like Gaia-X, the EuroStack movement, and EU Digital Sovereignty declarations focus on the macro level: keeping cloud servers inside European jurisdiction and reducing geopolitical dependence on US/Asian hyperscalers.
That macro policy matters, but it leaves a critical blind spot: a cloud vendor hosted inside your own country can still trap your research data in an undocumented format or lock your account when funding ends!
Our manifesto addresses the micro and organizational level: practical operational authority for the individual researcher, engineer, laboratory, or institution.
-->

---

## 3. When National Policy Meets Software Reality: Small Examples

National and institutional digital sovereignty initiatives succeed only when the **underlying software** respects user custody:

- **Public-Sector Desktop Migrations (e.g., Germany's *Schleswig-Holstein* & France's *Gendarmerie*):** Moving tens of thousands of workstations from Microsoft 365 to **LibreOffice / Nextcloud / OpenDocument** works because the *file format* (`ODF`) is open and independently recoverable.
- **Public Code & Academic Infrastructure (*"Public Money? Public Code!"* / *Zenodo* / *Sovereign Tech Fund*):** Funding open infrastructure (`Git`, `SSH`, `SQLite`, `KiCad`) protects both national resilience *and* individual researchers.
- **The Lesson:** True sovereignty cannot stop at border laws; it must be engineered into **data formats, local execution, and verifiable exit paths**.

<!--
[Minute 3:45 - 5:00]
Look at real European examples: when Schleswig-Holstein in Germany or the French Gendarmerie migrated off proprietary cloud suites to LibreOffice and OpenDocument formats, or when the German Sovereign Tech Agency funds core open infrastructure, the magic isn't where the server rack sits.
The magic is that the records live in open, documented formats that outlive any single vendor contract. National policy only works on top of sovereign software architecture.
-->

---

<!-- _class: statement -->

## 4. The Core Manifesto & What It Does Not Reject

> Software should adapt to people, not force people to adapt to software.

- It **does not reject** commercial software, cloud services, networks, or AI.
- Users can **delegate daily maintenance and backups** to third-party services, provided the user retains independent, automated custody of the data.
- It rejects **unnecessary surrender of control**.

<!--
[Minute 5:00 - 6:15]
So what is our manifesto proposing?
First, we are not extremists demanding everyone become a Linux system administrator running servers in their basement.
You are completely free to pay commercial developers, use cloud collaboration, use AI, and even delegate daily maintenance and backups to third-party services.
The requirement is simple: delegation must not become surrender. You must hold an independent, usable copy of your own work.
-->

---

## 5. Four Foundational Principles (A Relationship, Not a Ranking)

1. **Sovereignty:** *Authority belongs to the user.* Practical control over data, cryptographic keys, and the ability to leave or replace providers.
2. **Longevity:** *Information outlives software.* Records survive across **Data** (bytes), **Function** (continuing the workflow), and **Knowledge** (documented schemas and units).
3. **Locality:** *Independence is designed in.* Core local work needs no remote permission; network dependencies are judged by **proportionality and replaceability**.
4. **Transparency and Control:** *Consequential behavior remains governable.* Users can inspect, authorize, and reverse significant or automated/AI actions.

**Sovereignty defines the goal; Longevity protects it across time; Locality provides the means; Transparency and Control make it exercisable.**

<!--
[Minute 6:15 - 8:15]
The manifesto is built on four principles in a deliberate conceptual order:
1. Sovereignty sets the goal: you can access, export, and migrate your work without fresh vendor permission.
2. Longevity protects that authority over decades: not just preserving raw bytes, but preserving functional workflows and documented schemas.
3. Locality provides the engineering means: what can run on your hardware should not ask a remote server for permission, and external sync relays should be replaceable.
4. Transparency and Control make authority real in daily operation: no silent overwrites, and any AI or automated edit must be inspectable and reversible.
-->

---

<!-- _class: dense -->

## 6. Two Key Philosophical Distinctions

<div class="cols">
<div>

### 1. Must all software be Open Source?
- **No total extremism:** We distinguish **custody of your work** from **control of the binary**.
- A **closed-source tool** (e.g., *Obsidian* or *REAPER*) can respect user authority if it works without revocable activation and stores data in open, portable formats.
- **When source/specs matter:** When the software is the *sole irreplaceable interpreter* of the work, closed lock-in threatens functional longevity.

</div>
<div>

### 2. Advanced Features & Shared Work
- **Capability gap vs. lock-in:** If a commercial CAD tool is more advanced than open alternatives, we don't blame it for being better; we ask whether it **exports the full semantic tree and formulas** rather than stripping them out.
- **Multi-user governance:** In a university lab, individual exit rights coexist with **legitimate shared governance** (preserving an auditable lab dataset).

</div>
</div>

<!--
[Minute 8:15 - 10:00]
Two philosophical questions always come up in academic discussions:
First: do we ban all closed-source software like the Free Software Foundation? No. If a proprietary app runs offline without a kill-switch and keeps your notes in plain Markdown or standard SQLite so another tool can immediately take over, you have operational sovereignty over your work. And if a commercial CAD solver is more capable than open-source tools, we only ask that it export your full parametric design intent openly rather than stripping it out into a dumb mesh.
Second: what about teams and universities? Sovereignty is evaluated from a declared perspective role: an individual researcher can export their contributions, while a university laboratory retains custody of its collective audit trail.
-->

---

<!-- _class: dense -->

## 7. From Philosophy to Falsifiable Science: The Evaluation Framework

We reject arbitrary weights and numerical scores (`85/100`). Excellent speed cannot excuse trapped data. Instead, we test **Five Non-Compensatory Requirements (`E1–E5`)**:

- **E1 Independent access:** Retrieve an intelligible copy of essential records.
- **E2 Practicable exit:** Migrate to another tool without losing essential structure/meaning.
- **E3 Independent recovery:** Restore onto a clean machine after the vendor is gone.
- **E4 Continuing custody:** Keep working when subscriptions, licenses, or servers stop.
- **E5 Consequential oversight:** Authorize, inspect, and reverse high-risk or AI actions.

**Deterministic Precedence:** `1. Fails a fundamental requirement` &rarr; `2. Insufficient evidence` &rarr; `3. Does not meet core standard` &rarr; `4. Partially aligned` &rarr; `5. Meets core requirements`.

<!--
[Minute 10:00 - 11:45]
A manifesto is just poetry unless you can falsify its claims in a lab.
So we built the Sovereign Software Evaluation Framework. It uses zero numerical scores or arbitrary weights, because a fast user interface cannot mathematically offset losing your data.
Instead, every tool is tested in a 6-stage laboratory protocol against five fundamental requirements: E1 retrieval, E2 practical migration, E3 clean-machine recovery, E4 continuing custody without a license server, and E5 oversight of consequential actions.
If a claim hasn't been tested hands-on, the engine reports "Insufficient evidence" rather than guessing.
-->

---

<!-- _class: dense -->

## 8. Concrete Examples Across Academic & Engineering Domains

| Domain | Cloud Silo Risk | Sovereign Pattern & Verifiable Substrate |
|---|---|---|
| **Notes & Knowledge** | Cloud wiki locks relational views & links behind an account | **Obsidian / Org-mode + Git:** Local UTF-8 Markdown files; readable via standard POSIX tools decades later |
| **Research & Citations** | Reference cloud traps PDF annotations & breaks live doc IDs | **Zotero / JabRef:** Local `SQLite` database + PDF folder + open `BibTeX` / `CSL JSON` interchange |
| **Engineering & CAD** | Cloud CAD revokes access or exports only "dumb" `STL` meshes | **FreeCAD / KiCad / OpenSCAD:** Preserves parametric feature trees, S-expression schematics, and `STEP` |
| **Finance & Tasks** | Subscription ledger locks history when monthly payment stops | **Beancount / hledger / GnuCash:** Plain-text double-entry journals or local SQL with explicit balance assertions |

<!--
[Minute 11:45 - 13:30]
Here is what this looks like in daily university and professional life across four domains:
- In Knowledge Management: keeping notes in local Markdown versioned with Git means even if Obsidian disappears, every heading, link, and attachment is right there on disk.
- In Research: Zotero stores everything in a local SQLite database and standard BibTeX/CSL JSON, whereas cloud-only reference managers can hold your annotated PDFs hostage.
- In Engineering: exporting a 3D model to an STL mesh loses the parametric formulas and constraints; tools like FreeCAD, OpenSCAD, and KiCad preserve the editable source design.
- In Finance: plain-text double-entry ledgers like Beancount let you audit every transaction with git diff offline.
-->

---

## 9. Takeaway & Call for University Collaboration

- **68 candidate tools** cataloged in the Sovereign Index (`sovereign.polla.dev/directory`)
- **Practical Escape Hatches** (`sovereign.polla.dev/escape-hatches`) with step-by-step verification runbooks for leaving cloud silos
- **Open Research Invitation:** Join our **Two-Assessor Laboratory Trials** to empirically test and verify scientific, engineering, and personal software

> **When the software, vendor, network, or fashionable technology changes, does the person still retain meaningful control over their work?**

<!--
[Minute 13:30 - 15:00]
To wrap up: we have cataloged 68 candidate applications and published practical "Escape Hatch" runbooks for migrating out of proprietary cloud silos.
Because our framework refuses to award passes without reproducible laboratory evidence, we are inviting fellow researchers and students to join our Two-Assessor verification trials.
Before you adopt a tool for your next three-year research project, ask one question: When the vendor, network, or fashionable technology changes, will you still hold meaningful control over your work?
Thank you, and I welcome your questions.
-->

---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _footer: "" -->

# Thank You & Questions

**Read the Manifesto:** sovereign.polla.dev

**Evaluation Methodology:** sovereign.polla.dev/methodology

**Sovereign Index & Escape Hatches:** sovereign.polla.dev/directory · /escape-hatches

**Dr. Polla Fattah** · *CC BY 4.0*

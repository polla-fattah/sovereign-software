---
marp: true
theme: sovereign
paginate: true
title: A Manifesto for Sovereign Personal Software
description: Slides for presenting the manifesto and its evidence-led evaluation framework
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
Open with the one-line claim. Say how long you will take and that the full text and the methodology are both on the site, so nobody needs to copy anything down.
-->

---

## The problem

- Many applications make ordinary work depend on **remote services, vendor accounts, and opaque decisions**
- Business models can change **without the user's consent**
- Convenience becomes dependence when a person **cannot continue working, retrieve records, or leave** without unacceptable loss

**Who holds the authority over the software you depend on?**

<!--
Ask the room for one tool they could not use tomorrow if their account were suspended. Let them answer before moving on.
-->

---

<!-- _class: statement -->

## The idea

> Software should remain under human authority, preserve human knowledge, function independently wherever possible, and make consequential behavior understandable and controllable.

*Sovereign Software does not reject networks, commercial software, or AI. It rejects unnecessary surrender of control.*

---

## Why now: AI changes the economics

- AI-assisted tools lower some barriers, so **tailored software** becomes feasible for individuals and small communities
- But lower development cost **does not guarantee lower lifetime cost**
- Security, migration, maintenance, documentation, and recovery still need sustained attention
- AI-generated code can be **faster to create without being easier to trust or preserve**

<!--
The point is not to produce more applications. It is to build tools that are accountable to the people who use them.
-->

---

## Four principles

1. **Sovereignty:** authority belongs to the user
2. **Longevity:** information outlives software
3. **Locality:** independence is designed in
4. **Transparency and Control:** consequential behavior remains governable

*They do not prescribe a language, database, license, operating system, or interface style. They establish what an implementation must make possible.*

---

## A relationship, not a ranking

- **Sovereignty** defines the goal
- **Longevity** protects it across time
- **Locality** provides a powerful means of independence
- **Transparency and Control** make authority meaningful in operation

All four matter, and **no single numerical score can excuse a proven loss of fundamental user control**.

<!--
Earlier versions ranked six principles and weighted them. That model has been withdrawn. The order now describes how the principles relate. It is not a measured ranking.
-->

---

## Sovereignty: the user is the authority

- Practical, **not merely contractual**, authority over records and essential workflows
- Access, export, back up, restore, and migrate through documented means
- Explain key ownership and recovery honestly
- A managed service **can** respect sovereignty if exit, independent access, and recovery remain
- Local installation **alone** proves nothing if essential functions can be revoked remotely

**The ability to leave without losing what is yours is a practical test of ownership.**

---

## Longevity: information outlives software

- **Data:** records and metadata can be preserved, inspected, exported, and restored independently
- **Function:** essential workflows continue through maintained software or practicable migration
- **Knowledge:** formats, schemas, units, provenance, and recovery steps are documented for future people and tools
- A documented binary format, such as SQLite, can qualify; **open format names alone guarantee nothing**
- No design can promise eternal compatibility

---

## Locality: independence by design

- The network should **extend** what software can do, not arbitrarily decide whether you can reach your own work
- Where appropriate, reading, editing, searching, and essential calculation stay on hardware you control
- A failed sync should not erase the ability to work
- Not absolutist: ask whether a dependency is **inherent to the task** or imposed
- Local data is not automatically safe: backups and recovery are still needed

---

## Transparency and Control

- You cannot govern a tool whose **consequential behavior is inscrutable**
- Explain the rules behind important operations; make material changes traceable
- Distinguish **suggestions from committed actions**; let users approve, reverse, or contest
- **Determinism is not itself the principle:** a deterministic black box can still deny control, and a statistical system can stay governable

**The machine may assist in decisions; it must not quietly take ownership of them.**

---

## Architecture in service of the principles

- **Execution:** carrying out tasks and calculations
- **Preservation:** retaining records and recovery information so they stay intelligible
- **Exchange:** moving information between tools through documented formats and interfaces

These are **conceptual responsibilities**, not three applications. An integrated application can embody all three.

**Interoperability is a means of preserving sovereignty and longevity**, not a demand for small programs.

---

## AI without artificial dependency

AI is used only under boundaries that preserve human authority:

1. Records stay accessible if a model or provider disappears
2. Core workflows that do not need AI stay usable without it
3. Consequential AI changes are validated and authorized by risk
4. Network calls, privacy effects, and costs are disclosed
5. What you keep from AI can be stored in independent formats
6. Important decisions can be inspected, explained, and corrected

**AI may extend human ability. It must not become a condition for retaining human work or authority.**

---

## Synchronization without surrender

- Syncing must not quietly **transfer custody or conceal loss**
- An automatic merge can fix the data structure and still **misunderstand intent**
- Document conflict rules, keep recoverable history, and expose conflicts that need a decision
- Know where data is stored, who can read it, and how it is encrypted
- **Replicated data is not a tested backup**

<!--
CRDT reference: Shapiro, Preguiça, Baquero, Zawirski, SSS 2011. The broader argument for local-first software: Kleppmann et al., Onward! 2019.
-->

---

<!-- _class: dense -->

## Evaluation: evidence before a score

A manifesto is useful when its claims can be challenged with evidence.

1. **Five fundamental requirements:** verified failures cannot be offset
2. **An evidence-led finding for each of the four principles**
3. **Seven supporting engineering tests** that gather the evidence

**No weights, no numerical score, no tiers.** The earlier six-principle weighting is withdrawn, and any future scored method needs separate justification, testing across disciplines, and published methodology.

<!--
Weights are not silently reassigned to the new principles. No arithmetic should let excellent speed or elegant architecture compensate for the loss of essential user authority.
-->

---

<!-- _class: dense -->

## Five fundamental requirements

The highest classification is **not earned** when verified evidence shows that:

1. Users cannot independently retrieve essential information
2. There is no practicable way to leave without unacceptable loss
3. Essential records cannot be recovered outside a vendor-controlled system
4. Vendor permission is required to keep control of already-created work
5. Consequential operations remove meaningful authorization or oversight

**Pass, Fail, Not Verified, or Not Applicable with justification.** Missing evidence is not a failure, and it is not a pass.

These are minimum eligibility conditions; the principle findings provide the broader assessment of how fully the software embodies the philosophy.

---

<!-- _class: dense -->

## Findings and a qualified determination

- Each principle: **meets, partially meets, or does not meet**, with observations, sources, limitations, and confidence
- Overall determination:
  - **Meets the proposed core requirements**
  - **Partially aligned**
  - **Does not meet the proposed core standard**
  - **Fails a fundamental requirement**
  - **Insufficient evidence**
- Every claim states the **version, scope, and date**; old classifications stay historical

*A proposed standard, not an accredited certification.*

<!--
Worked examples on the methodology page: a fast, polished application that cannot export its data fails a fundamental requirement. A slow application that keeps users in control can still meet the core requirements. Neither responsiveness nor narrow scope is a prerequisite.
-->

---

<!-- _class: dense -->

## Seven supporting engineering tests

1. **Ownership and exit**
2. **Preservation and recovery**
3. **Offline independence**
4. **Operational transparency**
5. **Security and continuity**
6. **Interoperability and maintainability** (supporting quality)
7. **Human experience and performance** (supporting quality)

*They gather evidence. They are not interchangeable philosophical pillars. A sub-100 ms target is useful, but it is not a universal sovereignty test.*

---

<!-- _class: dense -->

## What sovereign software refuses to become

- **Captive data:** records that cannot be retrieved, interpreted, or migrated
- **Revocable access to your own work:** cut off by an arbitrary account or subscription decision
- **Irrecoverable dependence:** useless when one vendor, binary, or runtime disappears
- **Opaque consequential automation:** significant actions without visibility, authorization, or recourse
- **Silent loss through synchronization**
- **Concealed dependencies and surveillance**

*It does not reject sophistication, commerce, cloud, AI, or features. The issue is the distribution of authority.*

---

## A reference implementation: ToDoz

- An open-source, offline-first task manager, built **deliberately around the philosophy of sovereign software**
- Flutter, SQLite, and a lightweight **self-hosted** sync service
- Recurrence, reminders, and filters run on **deterministic rules**
- Built with AI coding agents: **AI in the build, not in the product**
- It was built around an **earlier, six-principle formulation**; it has not yet been reassessed against the four-principle framework

*todoz.polla.dev*

<!--
Be honest here: ToDoz predates the four-principle revision. It is a reference implementation of the philosophy, not an assessed example of the new framework.
-->

---

## What is on the website

- **The manifesto:** full text, a reading and print edition, and a Markdown download
- **Methodology:** the formal reference for findings and determinations
- **Index:** example software, each **awaiting assessment**
- **Escape hatches:** recipes for moving data out of cloud services, with their caveats

The site follows its own rules: it loads **nothing from third parties**, with no trackers and no cookies.

<!--
Be explicit that Index entries carry no findings yet. Their old version 1 tiers are kept as history only.
-->

---

## Honest limits

- This is a **position**, supported by evidence, not a standard
- The framework is **proposed** and replaces two earlier versions
- It deliberately offers **no numerical score**; findings are judgments
- The Index has **no assessed entries yet**
- Response-time research is supporting usability guidance, not part of the definition

**Disagreement is welcome. The source is open.**

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

- Which tool you use every day **fails the exit test**: could you leave it with your data intact?
- When is a network dependency **inherent to the task**, and when is it imposed?
- Is a **qualified, evidence-led** judgment better than a score? What would a score hide?
- Which principle is hardest to apply to **research software**?

---

<!-- _class: title -->
<!-- _footer: "" -->

# Thank you

**Read it:** sovereign.polla.dev

**Method:** sovereign.polla.dev/methodology

**Source:** github.com/polla-fattah/sovereign-software

*Licensed under CC BY 4.0*

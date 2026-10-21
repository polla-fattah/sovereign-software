---
marp: true
theme: sovereign
paginate: true
title: A Manifesto for Sovereign Personal Software
description: Slides for presenting the manifesto
footer: sovereign.polla.dev
---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _footer: "" -->

# A Manifesto for Sovereign Personal Software

Your data belongs to you.

**Dr. Polla Fattah**

*sovereign.polla.dev*

<!--
Open with the one-line claim. Say how long you will take and that the full text, an evaluator and a reading edition are all on the site, so nobody needs to copy anything down.
-->

---

## The problem

- Productivity and engineering tools increasingly depend on **remote cloud infrastructure**
- **Recurring subscriptions**, opaque interfaces, and features built for retention rather than for the user
- When the vendor changes terms, raises prices, or disappears, **your work goes with it**

**Who really owns the software you depend on?**

<!--
Ask the room for one tool they could not use tomorrow if their account were suspended. Let them answer before moving on.
-->

---

<!-- _class: statement -->

## The idea

> Your data belongs to you. Your tools should respect your time, preserve your freedom, and remain useful without depending on someone else's infrastructure.

*Software should adapt to people, not force people to adapt to software.*

---

## Why now: AI changes the economics

- AI coding agents make **custom software much cheaper to build**
- Cheaper code does not remove the laws of engineering: **architecture, verification, security, maintenance**
- Individuals and small teams can build tools around their own workflows
- **Software no longer requires a mass market to justify its existence**

<!--
The last point is an opinion, so present it as one. The second point is the guard rail: AI lowers the cost of writing code, not the cost of getting it right.
-->

---

## Six principles

1. **Sovereignty:** you control your data, infrastructure, keys, and ability to migrate
2. **Locality:** core functionality runs on your device, without the network
3. **Predictability:** critical behavior is deterministic and testable
4. **Responsiveness:** software respects human attention
5. **Focused interoperability:** bounded tools, connected by open formats
6. **Longevity:** your records outlive the applications that made them

---

## Sovereignty and Locality

<div class="cols">
<div>

### Sovereignty

- You can inspect, export, back up, migrate, and restore your data without vendor permission
- Ownership also means **custody**: backups and key recovery must be easy
- Ownership is meaningful only if you can **leave**

</div>
<div>

### Locality

- The device comes first
- Reading, capturing, changing, and querying work **offline**
- Sync is a separate transport layer, with explicit status and clean recovery

</div>
</div>

---

## Predictability and Responsiveness

<div class="cols">
<div>

### Predictability

- Intelligence may assist; **rules must govern**
- Ambiguous input is reported, never silently guessed
- AI proposals are staged, validated, and **authorized by the user**

</div>
<div>

### Responsiveness

- Immediate feedback on direct interaction
- The target is under **100 ms** for routine local actions
- Also: no invasive notifications, telemetry, or background churn

</div>
</div>

<!--
The 100 ms figure comes from classic response-time research (Miller 1968, Nielsen 1993). Treat it as a practical guideline, not a law. A good discussion point: in CAD a model rebuild takes seconds. What matters is that the interface stays responsive and the user can cancel.
-->

---

## Interoperability and Longevity

<div class="cols">
<div>

### Focused interoperability

- Do not force every domain into one monolith
- Connect through documented interfaces: URIs, sidecars, sockets, command-line tools
- Change one tool without losing what another holds

</div>
<div>

### Longevity

- Applications are temporary; **information deserves a longer life**
- Self-describing open formats, documented schemas
- Zero-dependency recovery paths
- No technology guarantees fifty-year compatibility

</div>
</div>

---

## The architecture of personal computing

- **Execution layer:** what needs to be done, when, and in what state?
- **Integration layer:** open, documented bridges between tools
- **Preservation layer:** what has been created, experienced, and understood?

Each layer stays **independently usable, inspectable, and replaceable**.

*Integration must create capability, never structural dependency.*

---

## AI without artificial dependency

Optional AI assistance is acceptable only when:

1. Core functionality works with **all AI services off**
2. The user explicitly authorizes any proposed change
3. Critical data pipelines stay deterministic and repeatable
4. Privacy, cost, and network calls are transparent
5. Swapping or removing the model loses **no access** to existing records

**AI may help build or operate the tool. It must never hold the tool hostage.**

---

## Synchronization without surrender

- Concurrent offline edits **inevitably diverge**
- Syntactic conflicts: converge with verifiable structures, such as **CRDTs** or append-only operation logs
- Semantic conflicts: **keep both versions** and offer a non-destructive way to resolve them
- Make encryption guarantees and trust boundaries explicit

*Complexity must always justify its existence.*

<!--
CRDT reference: Shapiro, Preguiça, Baquero, Zawirski, SSS 2011. The broader argument for local-first software: Kleppmann et al., Onward! 2019.
-->

---

<!-- _class: dense -->

## Seven engineering tests

1. **Offline Test (Air-Gap):** does it work with the network disabled?
2. **100 ms Test:** do common local interactions respond within 100 ms?
3. **Longevity Test:** can you recover your data if the application disappears?
4. **Responsibility Test:** does this belong in this tool?
5. **Dependency Test:** does it avoid mandatory accounts and fragile dependency trees?
6. **Predictability Test:** are state changes specified, reproducible, and testable?
7. **Recovery and Security Test:** can you verify backups and recover from failure?

<!--
Every significant feature or architectural decision should be asked these seven questions. The evaluator on the site scores any tool against them and gives a Markdown report. Offer to score one of the audience's tools live.
-->

---

<!-- _class: dense -->

## What sovereign software refuses to become

- **Mandatory cloud lock-in:** accounts and subscriptions required for local functions
- **Unchecked AI mutation:** non-deterministic inference in critical state
- **Invasive telemetry:** undisclosed tracking or phone-home analytics
- **Monolithic feature bloat:** re-implementing tools better served elsewhere
- **Silent sync corruption:** overwriting offline work without a trace
- **Unrecoverable custody:** fragile backup procedures
- **Proprietary silos:** undocumented formats that block inspection or migration

*The ability to add a feature is never sufficient reason to add it.*

---

## A reference implementation: ToDoz

- An open-source, offline-first task manager, built **deliberately to embody** these principles
- Flutter, SQLite, and a lightweight **self-hosted** sync service
- Recurrence, reminders, and filters run on **deterministic rules**
- Built with AI coding agents: **AI in the build, not in the product**
- The app contains no AI features today

*todoz.polla.dev*

<!--
Make the distinction explicit: AI lowered the cost of building ToDoz, it did not add weight to ToDoz. Cheap code tempts you to add features, so the discipline of refusing them matters more.
-->

---

## What is on the website

- **The manifesto:** full text, a reading and print edition, and a Markdown download
- **Index:** example tools and the open data format each one uses
- **7-gate evaluator:** score any tool and copy the report
- **Escape hatches:** recipes for moving data out of cloud services

The site follows its own rules: it loads **nothing from third parties**, with no trackers and no cookies.

---

## Honest limits

- This is a **position**, not a standard. The tests aid judgment; they are not a certification
- The index tiers are **editorial judgments**, not formal audits
- The response-time figures are guidelines and apply best to direct interaction
- The recipes are starting points: test them against your own data

**Disagreement is welcome. The source is open.**

---

<!-- _class: dense -->

## References

1. Kleppmann, Wiggins, van Hardenberg, McGranaghan. Local-first software. *Onward! 2019*, pp. 154-178.
2. Miller. Response time in man-computer conversational transactions. *AFIPS FJCC* 33, 1968, pp. 267-277.
3. Nielsen. *Usability Engineering*. Academic Press, 1993, ch. 5.
4. McIlroy, Pinson, Tague. UNIX Time-Sharing System: Foreword. *Bell System Technical Journal* 57(6), 1978, pp. 1899-1904.
5. SQLite: Recommended Storage Format for Datasets (US Library of Congress designation).
6. Shapiro, Preguiça, Baquero, Zawirski. Conflict-free replicated data types. *SSS 2011*, LNCS 6976, pp. 386-400.

---

## For discussion

- Which tool you use every day **fails the offline test**?
- What would you **refuse to depend on**, and what would it cost you?
- Where should AI live: **in the build, or in the product**?
- Which principle is hardest to apply to **research software**?

---

<!-- _class: title -->
<!-- _footer: "" -->

# Thank you

**Read it:** sovereign.polla.dev

**Score a tool:** sovereign.polla.dev/evaluator

**Source:** github.com/polla-fattah/sovereign-software

*Licensed under CC BY 4.0*

---
marp: true
theme: sovereign
paginate: true
title: A Manifesto for Sovereign Personal Software
description: Slides for presenting the manifesto and its evaluation framework
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
Open with the one-line claim. Say how long you will take and that the full text, the evaluator, and the methodology are all on the site, so nobody needs to copy anything down.
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

## Six principles, in order of priority

1. **Sovereignty:** you retain ultimate authority over data, functions, migration, and keys
2. **Longevity:** your records stay accessible and recoverable beyond the software that made them
3. **Locality:** core functionality runs on your hardware, without mandatory network access
4. **Predictability:** critical behavior is explicit, explainable, and testable
5. **Focused interoperability:** coherent tools, connected by open, replaceable interfaces
6. **Responsiveness:** software respects human attention

<!--
The order is deliberate and is the basis of the evaluation. Sovereignty determines authority, Longevity preserves it through time, Locality reduces dependence, Predictability creates trust, Interoperability allows cooperation, and Responsiveness protects attention. Lower priority does not mean optional.
-->

---

## Why this order

- **Sovereignty determines authority.** If someone else can revoke your access, nothing else is yours
- **Longevity preserves that authority through time.** Control of unreadable data is worth little
- Together they carry **half of the weight** in evaluation
- A very fast application that traps your data cannot earn the top classification
- A slower application with recoverable, documented data should not be rejected for speed alone

*A deliberate normative framework, not a scientific law.*

---

## Sovereignty and Longevity

<div class="cols">
<div>

### Sovereignty

- Inspect, export, back up, migrate, and restore without vendor permission
- Custody comes with ownership: backups and key recovery must be easy
- An optional cloud service is fine; a mandatory one that can revoke access is not

</div>
<div>

### Longevity

- **Data:** open, documented, recoverable formats
- **Function:** workflows that survive the vendor
- **Knowledge:** documentation future users can understand
- Plain text is not required; a documented format like SQLite can qualify

</div>
</div>

---

## Locality and Predictability

<div class="cols">
<div>

### Locality

- The device comes first; essential workflows work **offline**
- Sync is a separate, optional, replaceable layer
- Features that inherently need communication are the exception, not the model

</div>
<div>

### Predictability

- Intelligence may assist; **rules must govern**
- Ambiguous input is reported, never silently guessed
- AI proposals are staged and **authorized by the user**
- Numerical tolerances are stated, not hidden

</div>
</div>

---

## Interoperability and Responsiveness

<div class="cols">
<div>

### Focused interoperability

- Coherent responsibilities, connected through documented interfaces
- Change one tool without losing what another holds
- A comprehensive application is not automatically a bad monolith

</div>
<div>

### Responsiveness

- Immediate feedback on routine interaction; target under **100 ms**
- Not a deadline for every operation: expensive work should show progress and be cancellable
- No invasive notifications, telemetry, or background churn

</div>
</div>

<!--
The 100 ms figure comes from classic response-time research (Miller 1968, Nielsen 1993). Treat it as a practical guideline, not a law. A CAD render should acknowledge the click at once, even if the result takes minutes. This is why Responsiveness carries 5 percent and is not a mandatory requirement.
-->

---

## The architecture of personal computing

- **Execution layer:** what needs to be done, when, and in what state?
- **Integration layer:** open, documented bridges between tools
- **Preservation layer:** what has been created, experienced, and understood?

Each layer stays **independently usable, inspectable, and replaceable**.

**Preservation is an architectural obligation**, not a secondary storage feature.

---

## AI without artificial dependency

Optional AI assistance is acceptable only when:

1. Core functionality works with **all AI services off**
2. The user explicitly authorizes any proposed change
3. Critical data pipelines stay deterministic and repeatable
4. Privacy, cost, and network calls are transparent
5. The model is **replaceable** with no loss of access to records
6. What you keep is stored in **your own durable formats**

**AI may help build or operate the tool. It must never hold the tool, or your information, hostage.**

---

## Synchronization without surrender

- Concurrent offline edits **inevitably diverge**
- Syntactic conflicts: converge with verifiable structures, such as **CRDTs** or append-only operation logs
- Semantic conflicts: **keep both versions** and offer a non-destructive way to resolve them
- No algorithm can promise to guess intent correctly, so make conflicts visible and recoverable
- **Synchronized copies are not backups**

*Complexity must always justify its existence.*

<!--
CRDT reference: Shapiro, Preguiça, Baquero, Zawirski, SSS 2011. The broader argument for local-first software: Kleppmann et al., Onward! 2019.
-->

---

<!-- _class: dense -->

## How software is evaluated: version 2.0

**Three layers instead of seven equal gates**

1. **Five mandatory eligibility requirements:** data access, exit and migration, independent recoverability, custody and recovery, no irrevocable vendor dependency
2. **Weighted score of six principles:** 25, 25, 20, 15, 10, 5
3. **Seven verification tests** that collect the evidence

A verified failure of any requirement blocks certification, **whatever the score**.

<!--
The seven original tests are kept, but as evidence instruments. They no longer produce a separate 7 out of 7. The weights are the manifesto's proposed priorities, not measurements.
-->

---

<!-- _class: dense -->

## Score, tiers, and one rule that cannot be bypassed

- Each principle is rated **0 to 5**, or **not assessed** (which is not zero)
- Score = sum of (rating / 5) x weight, out of **100**
- **Tier 1:** all requirements met, score 90 or more, no principle below 3, evidence
- **Tier 2:** score 75 or more, Sovereignty and Longevity each at least 3
- **Tier 3:** complete, no critical failure, short of Tier 2
- **Not Certified:** a verified failure. **Unverified:** incomplete evidence

*Proposed editorial policy, not an accredited certification.*

<!--
Worked example from the methodology page: ratings 5, 2, 5, 5, 5, 5 give 85 out of 100, yet a failed independent-recoverability requirement makes it Not Certified. Another: a slow but sovereign application with ratings 5, 5, 4, 4, 4, 2 scores 88 and is Tier 2.
-->

---

<!-- _class: dense -->

## Seven verification tests

1. **Ownership and exit** (Sovereignty)
2. **Preservation and recovery** (Longevity)
3. **Offline independence** (Locality)
4. **Deterministic behavior** (Predictability)
5. **Interoperability and responsibility** (Focused Interoperability)
6. **Responsiveness and attention** (Responsiveness)
7. **Dependency, security, and continuity** (cross-cutting)

*The principles determine the score. The tests collect and verify the evidence, and a finding is never counted twice.*

---

<!-- _class: dense -->

## What sovereign software refuses to become

- **Mandatory cloud lock-in:** accounts and subscriptions required for local functions
- **Unchecked AI mutation:** non-deterministic inference in critical state
- **Invasive telemetry:** undisclosed tracking or phone-home analytics
- **Incoherent feature bloat:** duplicated tools and no coherent boundaries
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
- **Evaluator:** assess any software in the browser; export and import Markdown or JSON
- **Methodology:** the formal reference for scoring and classification
- **Index:** example software, each **awaiting assessment** under version 2.0
- **Escape hatches:** recipes for moving data out of cloud services, with their caveats

The site follows its own rules: it loads **nothing from third parties**, with no trackers and no cookies.

<!--
Be explicit that Index entries carry no ratings yet. Their old version 1 tiers are kept as history only, and no score has been invented for them.
-->

---

## Honest limits

- This is a **position**, not a standard. The tests aid judgment; they are not a certification
- The **weights and thresholds are normative choices**, not validated measurements
- Ratings are judgments and depend on evidence and the version assessed
- The Index has **no assessed entries yet**; legacy tiers are history only
- The response-time figures are guidelines and apply best to direct interaction

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

- Which tool you use every day **fails the exit test**: could you leave it with your data intact?
- Would you **weight the principles differently**, and why?
- Where should AI live: **in the build, or in the product**?
- Which principle is hardest to apply to **research software**?

---

<!-- _class: title -->
<!-- _footer: "" -->

# Thank you

**Read it:** sovereign.polla.dev

**Evaluate software:** sovereign.polla.dev/evaluator

**Method:** sovereign.polla.dev/methodology

**Source:** github.com/polla-fattah/sovereign-software

*Licensed under CC BY 4.0*

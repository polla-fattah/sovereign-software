+++
title = "A Manifesto for Sovereign Personal Software"
description = "Your data belongs to you. Your tools should respect your time, preserve your freedom, and remain useful without depending on someone else’s infrastructure."
layout = "reading"
outputs = ["html", "md"]
+++

## Section 01: The Core Manifesto

Software should adapt to people, not force people to adapt to software.

Modern productivity and engineering applications offer remarkable capabilities, yet most increasingly depend on remote cloud infrastructure, recurring subscriptions, opaque interfaces, and features engineered for corporate retention rather than individual utility.

Sovereign personal software represents a deliberate alternative. It rests on the conviction that personal computing tools should be owned, controlled, understood, and shaped by the people who rely on them.

AI-assisted development makes custom, high-craft software increasingly practical for individuals and small teams to build. However, reducing the cost of writing code does not eliminate the laws of software engineering: disciplined architecture, formal verification, boundary security, and sustainable maintenance remain non-negotiable.

Six foundational principles define Sovereign Personal Software, in order of priority:

* **I. Sovereignty:** Users retain ultimate authority over their data, essential functionality, migration paths, and cryptographic keys.
* **II. Longevity:** Human records and intellectual work remain accessible, interpretable, recoverable, and transferable beyond the applications, vendors, and runtimes that produced them.
* **III. Locality:** Core functionality runs on the user's hardware, without mandatory continuous network access.
* **IV. Predictability:** Critical state transitions, calculations, and rule engines are explicit, explainable, and testable.
* **V. Focused Interoperability:** Applications keep coherent responsibilities and exchange information through open, documented, replaceable interfaces.
* **VI. Responsiveness:** Software respects human attention through immediate feedback and efficient operation.

The order is deliberate, and it is the basis of the evaluation framework in Section 06:

**Sovereignty determines authority. Longevity preserves that authority through time. Locality reduces dependence on external infrastructure. Predictability creates trustworthy behavior. Focused Interoperability allows independent tools to cooperate. Responsiveness protects human attention.**

Sovereignty and Longevity belong together. Sovereignty answers who controls the software and its information today. Longevity answers whether that control still means anything in ten or fifty years. Control without continuity is temporary, and continuity without control is custody by someone else. For this reason the two carry half of the weight in the evaluation framework.

The ranking expresses evaluation priority, not permission to ignore the lower principles. A system that is extremely fast but traps essential data cannot earn the highest classification, and a slower application whose information is documented and recoverable should not be rejected on responsiveness alone. The hierarchy is a deliberate normative engineering framework, not an established scientific law.

These principles take precedence over any specific framework, operating system, database engine, or implementation technique.

---

## Section 02: The Six Foundational Principles

### Principle I. Sovereignty: The User Is the Owner

Personal information must never become inaccessible because a subscription expires, an identity provider suspends an account, or a remote service shuts down.

Sovereignty means users retain ultimate authority over their data, over the functions they depend on, over their migration paths, and over the cryptographic keys that protect their information. It requires practical, verifiable independence from arbitrary vendor decisions: the native ability to inspect, export, back up, migrate, and restore data without vendor permission. True ownership also transfers custodial responsibility to the user, so sovereign software must make automated, verifiable backups and key recovery a first-class, low-friction part of the core experience rather than an afterthought.

Not every cloud service violates sovereignty. An optional service that the user can decline or replace is different from a mandatory, vendor-controlled service that can revoke access to essential functionality, and the second is a much more serious concern.

**Ownership is meaningful only when the user retains both the ability to leave and the resilience to recover.**

### Principle II. Longevity: Information Should Outlive Software

Applications, frameworks, and hardware architectures are transient, while personal and technical records can remain valuable for decades. Longevity means that information and intellectual work stay accessible, interpretable, recoverable, and transferable beyond the lifespan of the application, vendor, or runtime that produced them. It has three dimensions:

* **Data longevity:** Can users preserve, inspect, and recover their records independently of the original application? This depends on open or documented formats, complete exports, documented schemas, format stability, preserved relationships and metadata, and tested backup and restoration.
* **Functional longevity:** Can essential workflows continue when the original application or provider disappears? This depends on independent implementations, documented data structures and interfaces, local execution or practical migration alternatives, reproducible toolchains, and little reliance on discontinued proprietary infrastructure.
* **Knowledge longevity:** Can future users understand the preserved information? This depends on documentation, schemas and metadata, stated encodings and units, documented relationships, contextual meaning, and recovery instructions.

Plain text is not required. An application using SQLite[^sqlite] or another documented binary format can satisfy Longevity through reliable, independently verifiable preservation and recovery mechanisms, pairing fast local indexing with human-inspectable exports or sidecars where that helps. No technology guarantees fifty-year binary compatibility. Longevity depends on self-describing open formats, documented schemas, and zero-dependency recovery paths.

**Applications are temporary. Human information deserves a longer life.**

### Principle III. Locality: The Device Comes First

The network should enhance an application, not determine whether it can function. Core functionality executes on hardware the user controls, without mandatory continuous network access. Reading records, capturing inputs, changing state, and querying information should remain operational offline.[^localfirst]

Sovereign software treats local storage as the primary source of truth. Multi-device synchronization operates as a separate, optional, replaceable transport layer, with explicit connection status, deterministic conflict handling, and clean recovery from interrupted connections.

Locality distinguishes core operations from features that inherently need communication. Messaging another person requires a network, but reading stored messages, composing drafts, browsing history, and exporting data should not require unnecessary remote authorization.

**Offline operation is not an emergency fallback. It is the baseline operating model for everything that can reasonably work offline.**

### Principle IV. Predictability: Intelligence May Assist, Rules Must Govern

Schedules, financial ledgers, state machines, and structured records represent deliberate human commitments. Their behavior must be explicit, explainable, testable, and reproducible within defined assumptions.

Sovereign software relies on deterministic rules for critical operations, documents its business rules, handles errors explicitly, and surfaces invalid or ambiguous inputs rather than silently guessing. Where probabilistic models or heuristics assist in parsing natural intent, their proposed mutations are staged, validated, and explicitly authorized by the user before they change persistent state. Predictability does not mean identical output down to the last bit for every complex numerical operation: numerical tolerances, platform differences, and domain-specific constraints must be acknowledged and stated.

**Intelligence may assist at the boundary. Predictability must govern at the core.**

### Principle V. Focused Interoperability: Separate Responsibilities, Connect Information

Different cognitive tasks require distinct structural paradigms. Managing operational actions and state transitions is fundamentally different from preserving long-form reflection, domain knowledge, or raw media, and forcing unrelated domains into one application tends to degrade all of them.

Sovereign tools focus on coherent responsibilities[^unix] while connecting through documented, replaceable interfaces, such as URI schemes, plain-text sidecars, local sockets, command-line interfaces, and open interchange standards. Where host operating systems, such as heavily sandboxed mobile environments, restrict direct communication, applications expose clean, standardized import and export bridges that preserve modularity without surrendering to proprietary cloud relays. A comprehensive application is not automatically a bad monolith. What matters is whether its architecture is coherent, maintainable, and replaceable, not how many features it has.

**Separate responsibilities. Connect information. Preserve freedom of choice.**

### Principle VI. Responsiveness: Respect Human Attention

Software should reduce cognitive effort, not become another source of administrative work. Routine local interactions should yield immediate perceptual feedback, targeting under 100 milliseconds on standard hardware.

The 100 millisecond figure follows the widely cited response-time limits: about 0.1 second feels instantaneous, about 1 second preserves flow of thought, and about 10 seconds is the limit of focused attention. These originate with Miller (1968)[^miller] and were popularized by Nielsen (1993).[^nielsen] They are practical engineering guidelines rather than precise laws.

The target applies to perceptual feedback for routine interactions. It is not a universal completion deadline. Typing should feel immediate, buttons should acknowledge activation promptly, and starting a CAD render should respond at once, while completing a complex simulation may legitimately take minutes. Expensive operations are expected to keep the interface responsive, show progress, and let the user cancel.

Responsiveness also requires restraint: eliminating invasive notifications, telemetry beacons, background churn, and interface complexity that distract from the work at hand.

**Good software helps users complete their work without becoming work itself.**

---

## Section 03: The Architecture of Personal Computing

Sovereign systems follow a modular model that separates state execution from long-term preservation while allowing both to cooperate smoothly:

* **The Execution Layer:** Responsible for capturing active state, managing lifecycles, schedules, priorities, and structured transactions.
*Central inquiry:* What needs to be done, when, and in what state is it?
* **The Integration Layer:** Open, documented bridges (application URIs, standard file sidecars, local IPC sockets, CLI pipes, and RFC-compliant interchange formats).
* **The Preservation Layer:** Responsible for long-form prose, research, documentation, raw assets, and historical archives.
*Central inquiry:* What has been created, experienced, and understood?

Each layer remains independently usable, inspectable, and replaceable. Integration must create capability, never structural dependency.

Preservation is an enduring architectural obligation, not a secondary storage feature. The preservation layer must stay readable and recoverable even if the execution layer, and the application that implements it, is replaced or disappears.

---

## Section 04: Artificial Intelligence Without Artificial Dependency

Automated coding agents accelerate software creation, and statistical models can streamline user workflows. Yet neither eliminates the need for human judgment, verification, security boundaries, and deterministic guarantees.

Sovereign software integrates optional AI assistance only when:

1. Core functionality remains 100% operational when all AI services are unreachable or disabled.
2. The user retains explicit authorization over any proposed state mutation.
3. Critical data pipelines remain deterministic, verifiable, and repeatable.
4. Privacy boundaries, computational costs, and external network calls are completely transparent.
5. The model is replaceable: removing or swapping it causes zero loss of access to existing records.
6. Anything the user keeps from AI assistance is stored in the user's own durable formats, so it stays readable after any model or provider disappears.

AI may help build or operate the tool. It must never hold the tool hostage, and it must never hold the user's information hostage.

---

## Section 05: Synchronization Without Surrender

Synchronization across devices is an operational convenience, not a transfer of data custody.

In distributed offline systems, concurrent edits across disconnected devices inevitably create state divergence. Sovereign software does not hide this reality behind opaque cloud heuristics. Instead, it requires explicit, predictable conflict resolution:

* **Syntactic and state convergence:** Handled via mathematically verifiable structures (such as Conflict-Free Replicated Data Types[^crdt] or append-only operation logs).
* **Semantic conflicts:** When concurrent offline changes contradict human intent in ways an algorithm cannot safely resolve, the software preserves both states transparently and offers a clean, non-destructive resolution path rather than silently overwriting data. No algorithm can promise to interpret every intention correctly. The goal is to make a conflict visible and recoverable.

Synchronization architectures must make encryption guarantees, trust boundaries, and backup verification explicit. Synchronized copies are not a substitute for backups, because a deletion or corruption can replicate everywhere. Complexity must always justify its existence.

---

## Section 06: Evaluation: Priorities, Eligibility, and Evidence

Principles are easy to endorse and hard to apply, so the manifesto comes with an evaluation framework: the Sovereign Software Evaluation Framework, version 2.0. It replaces the earlier model of seven equally weighted pass/fail tests, which treated a fast interface as equal to the ability to leave a product with your data.

**Six prioritized principles.** The principles are weighted by priority:

| Priority | Principle | Weight |
| --- | --- | ---: |
| I | Sovereignty | 25% |
| II | Longevity | 25% |
| III | Locality | 20% |
| IV | Predictability | 15% |
| V | Focused Interoperability | 10% |
| VI | Responsiveness | 5% |

These weights are the manifesto's proposed normative priorities. They are not experimentally validated measurements, and every lower weight still describes something that matters.

**Five mandatory eligibility requirements.** Before any score matters, the software must establish five requirements, drawn mainly from Sovereignty and Longevity:

1. **Independent data access:** users can retrieve their essential data without ongoing permission from the provider.
2. **Practical exit and migration:** a documented, workable way to leave without unacceptable loss.
3. **Independent recoverability:** essential records can be reconstructed or interpreted with documented methods.
4. **Custody and recovery:** credible safeguards against irreversible loss, including backup, restore, and key recovery where applicable.
5. **No irrevocable vendor dependency:** users keep their data and meaningful control if the vendor discontinues its services.

Each requirement is marked Pass, Fail, Not Verified, or Not Applicable with a documented justification. A verified failure blocks every certified tier, however high the score. An unverified requirement withholds a final decision but is never counted as a failure.

**Weighted quality assessment.** Each principle is rated from 0 (fundamental failure) to 5 (exemplary), or left as not assessed, which is not the same as zero. The score is the sum of (rating / 5) multiplied by the principle's weight, with a maximum of 100. If any principle is unassessed, no final score is shown.

**Seven verification tests.** The seven tests remain, now as instruments for collecting evidence rather than a separate score: ownership and exit, preservation and recovery, offline independence, deterministic behavior, interoperability and responsibility, responsiveness and attention, and a cross-cutting test of dependency, security, and continuity. The principles determine the score, the tests collect and verify the evidence, and one finding is never counted twice.

**Classification.** Tier 1 (Exemplary) needs all five requirements satisfied, a complete assessment, a score of at least 90, no principle below 3, and sufficient documented evidence. Tier 2 (Strong) needs the same eligibility, a score of at least 75, Sovereignty and Longevity each at least 3, and sufficient evidence. Tier 3 (Partial Alignment) covers complete assessments without a verified critical failure that fall short of Tier 2. A verified failure of any mandatory requirement means Not Certified, and an incomplete assessment or unestablished eligibility means Unverified. A critical failure cannot be bypassed by a high score.

**Exceptions and uncertainty.** Any exception must be deliberate, bounded, and documented. Every rating records its evidence and a level of confidence, and unknown evidence never becomes an automatic pass. The tiers and thresholds are proposed editorial policy, not an externally accredited certification scheme, so "meets the proposed standard" implies no third-party approval.

Score a tool yourself with the [interactive evaluator](https://sovereign.polla.dev/evaluator/), and read the full [methodology](https://sovereign.polla.dev/methodology/).

---

## Section 07: What Sovereign Software Refuses to Become

Sovereign software deliberately rejects:

* **✕ Mandatory Cloud Lock-In:** Remote accounts and subscriptions required for local functionality.
* **✕ Unchecked AI Mutation:** Non-deterministic inference injected directly into critical state operations.
* **✕ Invasive Telemetry:** Undisclosed tracking, behavioral harvesting, or phone-home analytics.
* **✕ Incoherent Feature Bloat:** Cluttered re-implementations of tools better served by specialized utilities, and architectures with no coherent boundaries.
* **✕ Silent Sync Corruption:** Opaque synchronization routines that overwrite conflicting offline work without trace.
* **✕ Unrecoverable Custody:** Leaving users vulnerable to catastrophic data loss through complex, fragile backup procedures.
* **✕ Proprietary Silos:** Undocumented binary formats designed to prevent inspection or migration.

The ability to add a feature is never sufficient reason to add it.

---

## Section 08: Personal Software in the Age of AI

Historically, software development required substantial capital and large engineering teams, pushing products toward mass-market monetization, cloud lock-in, and lowest-common-denominator design.

Modern engineering tools and AI-assisted workflows are fundamentally altering that economic equation. Individuals and focused communities can now build and maintain high-craft, bespoke tools around their exact workflows without needing venture scale or a commercial mass market.

This shift does not eliminate engineering discipline: verification, security, data recovery, and architectural judgment remain paramount. However, it unlocks a vital truth:

**Software no longer requires a mass market to justify its existence.**

---

## Section 09: The Permanent Standard

Sovereign software is never defined by a transient UI framework, a specific database library, or a trendy synchronization protocol. Those are implementation choices that will evolve and eventually be replaced.

Its identity rests on enduring engineering principles: users keep authority over their software and information, that information outlives the application, and the software remains functional when disconnected, transparent when inspected, recoverable when hardware fails, deterministic where it matters, cooperative with other tools, and respectful of human attention.

It must refuse dependencies that do not serve a clear purpose. Above all, it must remain an instrument under human control.

---

## Revision History

* **22 October 2026, framework version 2.0.** The principles were reordered and weighted: Sovereignty, Longevity, Locality, Predictability, Focused Interoperability, Responsiveness (25, 25, 20, 15, 10, 5). Longevity was expanded into data, functional, and knowledge longevity. The seven equally weighted pass/fail tests were replaced by five mandatory eligibility requirements, weighted quality scoring, and seven evidence-verification tests, with explicit classification rules. The 100 millisecond target was clarified as applying to perceptual feedback, not to every operation. Existing Index entries were marked unverified pending reassessment.
* **Earlier, framework version 1.0.** The original order was Sovereignty, Locality, Predictability, Responsiveness, Focused Interoperability, Longevity, with seven equally weighted pass/fail gates: Air-Gap (Offline), 100 ms, Longevity, Responsibility, Dependency, Predictability, and Recovery and Security. Classifications issued under that model are kept as legacy history and are not current classifications.

---

## References

These sources support specific arguments in the manifesto. The response-time limits in Principle VI are practical guidelines, not precise laws.

[^sqlite]: SQLite, “Recommended Storage Format for Datasets” (US Library of Congress designation). [sqlite.org/locrsf.html](https://sqlite.org/locrsf.html)
[^localfirst]: M. Kleppmann, A. Wiggins, P. van Hardenberg and M. McGranaghan, “Local-first software: you own your data, in spite of the cloud,” *Onward! 2019*, pp. 154–178. DOI: 10.1145/3359591.3359737. [Essay](https://inkandswitch.com/essay/local-first/local-first.pdf)
[^unix]: M. D. McIlroy, E. N. Pinson and B. A. Tague, “UNIX Time-Sharing System: Foreword,” *Bell System Technical Journal* 57(6), 1978, pp. 1899–1904. [PDF](https://ia902701.us.archive.org/12/items/bstj57-6-1899/bstj57-6-1899_text.pdf)
[^miller]: R. B. Miller, “Response time in man-computer conversational transactions,” *Proc. AFIPS Fall Joint Computer Conference*, vol. 33, 1968, pp. 267–277.
[^nielsen]: J. Nielsen, *Usability Engineering*, Academic Press, 1993, ch. 5. [Excerpt: Response Times: The 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/)
[^crdt]: M. Shapiro, N. Preguiça, C. Baquero and M. Zawirski, “Conflict-free replicated data types,” *SSS 2011*, LNCS 6976, pp. 386–400. [INRIA report RR-7687](https://hal.sorbonne-universite.fr/inria-00609399v1)

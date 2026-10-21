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

Six foundational principles define Sovereign Personal Software:

* **Sovereignty:** Users control their data, their infrastructure, their cryptographic keys, and their ability to migrate.
* **Locality:** Core functionality executes on the user's hardware, operating independently of network connectivity.
* **Predictability:** Critical state transitions and rule engines are deterministic, transparent, and testable.
* **Responsiveness:** Software respects human attention by delivering immediate local feedback and eliminating artificial friction.
* **Focused Interoperability:** Applications maintain bounded responsibilities while exchanging information across open protocols.
* **Longevity:** Human records and intellectual work must outlive the applications, vendors, and runtimes that produced them.

These principles take precedence over any specific framework, operating system, database engine, or implementation technique.

---

## Section 02: The Six Foundational Principles

### Principle I. Sovereignty: The User Is the Owner

Personal information must never become inaccessible because a subscription expires, an identity provider suspends an account, or a remote service shuts down.

Sovereignty requires uninhibited control over data—including the native ability to inspect, export, back up, migrate, and restore it without vendor permission. However, true ownership also transfers custodial responsibility to the user; sovereign software must therefore make automated, verifiable backups and cryptographic key recovery a first-class, low-friction part of the core experience rather than an afterthought.

Ownership is meaningful only when the user retains both the ability to leave and the resilience to recover.

### Principle II. Locality: The Device Comes First

The network should enhance an application, not determine whether it can function. Reading records, capturing inputs, mutating state, and querying information must remain 100% operational offline.

Sovereign software treats local storage as the primary source of truth.[^localfirst] Multi-device synchronization operates asynchronously as a separate transport layer, with explicit connection status, deterministic conflict handling, and clean recovery from interrupted connections.

Offline operation is not an emergency fallback mode. It is the baseline operating model.

### Principle III. Predictability: Intelligence May Assist, Rules Must Govern

Schedules, financial ledgers, state machines, and structured records represent deliberate human commitments. Their behavior must be consistent, explainable, and reproducible.

Sovereign software relies on deterministic rules for critical operations and explicitly surfaces invalid or ambiguous inputs rather than silently guessing. Where probabilistic models or heuristics assist in parsing natural intent, their proposed mutations must be staged, validated, and explicitly authorized by the user before committing to persistent state.

Intelligence may assist at the boundary. Predictability must govern at the core.

### Principle IV. Responsiveness: Respect Human Attention

Software should reduce cognitive effort, not become another source of administrative work. Routine local interactions should yield immediate perceptual feedback—targeting sub-100 millisecond response times on standard hardware.

The 100 millisecond figure follows the widely cited response-time limits: about 0.1 second feels instantaneous, about 1 second preserves flow of thought, and about 10 seconds is the limit of focused attention. These originate with Miller (1968)[^miller] and were popularized by Nielsen (1993).[^nielsen] They are practical engineering guidelines rather than precise laws, and they apply most directly to feedback on direct interaction.

Responsiveness also requires architectural restraint: eliminating invasive notifications, telemetry beacons, background churn, and interface complexity that distract from the work at hand.

Good software helps users complete their work without becoming work itself.

### Principle V. Focused Interoperability: Separate Responsibilities, Connect Information

Different cognitive tasks require distinct structural paradigms. Managing operational actions and state transitions is fundamentally different from preserving long-form reflection, domain knowledge, or raw media. Forcing distinct domains into a single monolithic application degrades them all.

Sovereign tools focus on bounded responsibilities[^unix] while connecting through documented interfaces—such as URI schemes, plain-text sidecars, local sockets, command-line interfaces, and open interchange standards. Where host operating systems (such as heavily sandboxed mobile environments) restrict direct inter-process or filesystem communication, applications must expose clean, standardized import/export bridges that preserve modularity without surrendering to proprietary cloud relays.

Separate responsibilities. Connect information. Preserve freedom of choice.

### Principle VI. Longevity: Information Should Outlive Software

Applications, frameworks, and hardware architectures are transient; personal and technical records remain valuable for decades. Sovereign software resolves the tension between high-speed local execution and long-term human readability through dual-layer persistence: pairing fast, standardized local indexing (such as embedded relational stores[^sqlite]) with deterministic, human-inspectable plain-text exports or sidecars.

No technology guarantees fifty-year binary compatibility. Longevity depends on self-describing open formats, documented schemas, and zero-dependency recovery paths.

Applications are temporary. Human information deserves a longer life.

---

## Section 03: The Architecture of Personal Computing

Sovereign systems follow a modular model that separates state execution from long-term preservation while allowing both to cooperate smoothly:

* **The Execution Layer:** Responsible for capturing active state, managing lifecycles, schedules, priorities, and structured transactions.
*Central inquiry:* What needs to be done, when, and in what state is it?
* **The Integration Layer:** Open, documented bridges (application URIs, standard file sidecars, local IPC sockets, CLI pipes, and RFC-compliant interchange formats).
* **The Preservation Layer:** Responsible for long-form prose, research, documentation, raw assets, and historical archives.
*Central inquiry:* What has been created, experienced, and understood?

Each layer remains independently usable, inspectable, and replaceable. Integration must create capability, never structural dependency.

---

## Section 04: Artificial Intelligence Without Artificial Dependency

Automated coding agents accelerate software creation, and statistical models can streamline user workflows. Yet neither eliminates the need for human judgment, verification, security boundaries, and deterministic guarantees.

Sovereign software integrates optional AI assistance only when:

1. Core functionality remains 100% operational when all AI services are unreachable or disabled.
2. The user retains explicit authorization over any proposed state mutation.
3. Critical data pipelines remain deterministic, verifiable, and repeatable.
4. Privacy boundaries, computational costs, and external network calls are completely transparent.
5. Removing or swapping an AI model causes zero loss of access to existing records.

AI may help build or operate the tool. It must never hold the tool hostage.

---

## Section 05: Synchronization Without Surrender

Synchronization across devices is an operational convenience, not a transfer of data custody.

In distributed offline systems, concurrent edits across disconnected devices inevitably create state divergence. Sovereign software does not hide this reality behind opaque cloud heuristics. Instead, it requires explicit, predictable conflict resolution:

* **Syntactic & State Convergence:** Handled via mathematically verifiable structures (such as Conflict-Free Replicated Data Types[^crdt] or append-only operation logs).
* **Semantic Conflicts:** When concurrent offline changes contradict human intent in ways an algorithm cannot safely guess, the software preserves both states transparently and surfaces a clean, non-destructive resolution path rather than silently overwriting data.

Synchronization architectures must make encryption guarantees, trust boundaries, and backup verification explicit. Complexity must always justify its existence.

---

## Section 06: The Seven Engineering Evaluation Tests

Every significant feature, dependency, or architectural decision must pass seven verification gates:

1. **The Offline Test (Air-Gap):** Does all primary functionality operate cleanly with the network interface disabled?
2. **The 100ms Test:** Do common local interactions respond within 100 milliseconds on baseline hardware?
3. **The Longevity Test:** Can users recover, inspect, and understand their raw data using standard system tools if the application binary disappears?
4. **The Responsibility Test:** Does this capability belong in this tool, or should a decoupled external utility handle it?
5. **The Dependency Test:** Does this introduce an avoidable third-party service, subscription, fragile dependency tree, or recurring cost?
6. **The Predictability Test:** Are state transitions and conflict resolutions formally specified, reproducible, testable, and free of silent guesswork?
7. **The Recovery & Security Test:** Does the system enforce local cryptographic integrity while providing a frictionless, verifiable path for user backup and disaster recovery?

These tests govern engineering judgment. Any exception must be deliberate, bounded, and documented.

---

## Section 07: What Sovereign Software Refuses to Become

Sovereign software deliberately rejects:

* **✕ Mandatory Cloud Lock-In:** Remote accounts and subscriptions required for local functionality.
* **✕ Unchecked AI Mutation:** Non-deterministic inference injected directly into critical state operations.
* **✕ Invasive Telemetry:** Undisclosed tracking, behavioral harvesting, or phone-home analytics.
* **✕ Monolithic Feature Bloat:** Cluttered re-implementations of tools better served by specialized utilities.
* **✕ Silent Sync Corruption:** Opaque synchronization routines that overwrite conflicting offline work without trace.
* **✕ Unrecoverable Custody:** Leaving users vulnerable to catastrophic data loss through complex, fragile backup procedures.
* **✕ Proprietary Silos:** Undocumented binary formats designed to prevent inspection or migration.

The ability to add a feature is never sufficient reason to add it.

---

## Section 08: Personal Software in the Age of AI

Historically, software development required substantial capital and large engineering teams, pushing products toward mass-market monetization, cloud lock-in, and lowest-common-denominator design.

Modern engineering tools and AI-assisted workflows are fundamentally altering that economic equation. Individuals and focused communities can now build and maintain high-craft, bespoke tools around their exact workflows without needing venture scale or a commercial mass market.

This shift does not eliminate engineering discipline—verification, security, data recovery, and architectural judgment remain paramount. However, it unlocks a vital truth:

**Software no longer requires a mass market to justify its existence.**

---

## Section 09: The Permanent Standard

Sovereign software is never defined by a transient UI framework, a specific database library, or a trendy synchronization protocol. Those are implementation choices that will evolve and eventually be replaced.

Its identity rests on enduring engineering principles: software must remain functional when disconnected, transparent when inspected, recoverable when hardware fails, deterministic when resolving conflicts, and adaptable when human needs change.

It must respect human attention, protect personal records, and refuse dependencies that do not serve a clear purpose. Above all, it must remain an instrument under human control.

---

## References

These sources support specific arguments in the manifesto. The response-time limits in Principle IV are practical guidelines, not precise laws.

[^localfirst]: M. Kleppmann, A. Wiggins, P. van Hardenberg and M. McGranaghan, “Local-first software: you own your data, in spite of the cloud,” *Onward! 2019*, pp. 154–178. DOI: 10.1145/3359591.3359737. [Essay](https://inkandswitch.com/essay/local-first/local-first.pdf)
[^miller]: R. B. Miller, “Response time in man-computer conversational transactions,” *Proc. AFIPS Fall Joint Computer Conference*, vol. 33, 1968, pp. 267–277.
[^nielsen]: J. Nielsen, *Usability Engineering*, Academic Press, 1993, ch. 5. [Excerpt: Response Times: The 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/)
[^unix]: M. D. McIlroy, E. N. Pinson and B. A. Tague, “UNIX Time-Sharing System: Foreword,” *Bell System Technical Journal* 57(6), 1978, pp. 1899–1904. [PDF](https://ia902701.us.archive.org/12/items/bstj57-6-1899/bstj57-6-1899_text.pdf)
[^sqlite]: SQLite, “Recommended Storage Format for Datasets” (US Library of Congress designation). [sqlite.org/locrsf.html](https://sqlite.org/locrsf.html)
[^crdt]: M. Shapiro, N. Preguiça, C. Baquero and M. Zawirski, “Conflict-free replicated data types,” *SSS 2011*, LNCS 6976, pp. 386–400. [INRIA report RR-7687](https://hal.sorbonne-universite.fr/inria-00609399v1)

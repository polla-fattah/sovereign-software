+++
title = "A Manifesto for Sovereign Personal Software"
description = "Software should remain under human authority, preserve human knowledge, function independently wherever possible, and make consequential behavior understandable and controllable."
layout = "reading"
outputs = ["html", "md"]
+++

## Section 01: The Core Manifesto

Software should adapt to people, not force people to adapt to software.

Modern software provides extraordinary capabilities, yet many applications make ordinary work dependent on remote services, vendor accounts, opaque decisions, and business models that can change without the user's consent. These arrangements can be convenient, but convenience becomes dependence when a person cannot continue working, retrieve their records, or leave a provider without unacceptable loss.

**Sovereign Software** is a deliberate alternative. It is software designed so that ultimate authority remains with the person or organization using it, not with a vendor, an infrastructure operator, or an unaccountable algorithm. It need not reject networks, commercial software, artificial intelligence, or complex engineering. It rejects *unnecessary surrender of control*.

Four foundational principles express this philosophy, in a deliberate conceptual order:

1. **Sovereignty: Authority belongs to the user.** Users retain meaningful control of their data, essential capabilities, and ability to leave or replace providers.
2. **Longevity: Information outlives software.** Records and intellectual work remain accessible, interpretable, and recoverable after applications, vendors, and runtimes disappear.
3. **Locality: Independence is designed in.** Capabilities that can reasonably operate on user-controlled hardware do not depend unnecessarily on continuous external connectivity or permission.
4. **Transparency and Control: Consequential behavior remains governable.** Users can understand, inspect, authorize, and, where feasible, reverse or contest significant actions taken on their behalf.

The order communicates a relationship, not a scientifically measured ranking. **Sovereignty defines the goal; Longevity protects it across time; Locality provides a powerful means of independence; Transparency and Control make authority meaningful in operation.** All four matter, and no single numerical score can excuse a proven loss of fundamental user control.

These principles do not prescribe a particular programming language, database, license, operating system, or user-interface style. They establish what an implementation must make possible.

---

## Section 02: The Four Foundational Principles

### Principle I. Sovereignty: The User Is the Authority

An individual or organization should not lose access to essential information merely because a subscription expires, an identity provider changes its rules, or a service is discontinued.

Sovereignty requires practical, not merely contractual, authority over one's records and essential workflows. Users should be able to access, export, back up, restore, and migrate their information through documented means. Where cryptographic keys govern access to personal data, key ownership, portability, and recovery must be explained honestly; the user should not be left hostage to an inaccessible vendor-held secret.

Sovereignty does not mean that every user must personally operate a server. A managed service can respect sovereignty if meaningful exit, independent access, recovery, and replaceability remain available. Conversely, local installation alone is not proof of sovereignty if essential functions are subject to revocable remote licensing or information is trapped in an undocumented format.

**The ability to leave without losing what is yours is a practical test of ownership.**

### Principle II. Longevity: Information Should Outlive Software

Applications are temporary; research, designs, records, correspondence, and creative work may matter for generations. Preserving bytes is insufficient if their meaning, relationships, or means of recovery disappear.

Longevity has three related dimensions:

- **Data longevity:** Records and relevant metadata can be preserved, inspected, exported, and restored independently of the original application.
- **Functional longevity:** Essential workflows can continue through maintained software, independent implementations, or practicable migration when the original application or provider disappears.
- **Knowledge longevity:** Formats, schemas, relationships, units, provenance, and recovery procedures are documented sufficiently for future people and tools to understand preserved information.

Human-readable text is valuable but is not the only credible route. A documented binary format, such as SQLite, can support longevity when independent tooling, complete exports, and tested recovery procedures exist. Open format names alone do not guarantee preservation; backups must be usable, and archives must be periodically verified and migrated when necessary.

No design can promise eternal compatibility. Sovereign Software instead minimizes irreversible loss and maximizes independent recovery.

**Applications are temporary. Human information deserves a longer life.**

### Principle III. Locality: Independence by Design

The network should extend what software can do, not arbitrarily determine whether a person can access work already on their device.

Where technically appropriate, reading records, creating and editing content, searching local information, and performing essential calculations should remain available on hardware controlled by the user. Synchronization may be valuable, but its failure should not unnecessarily erase the ability to work.

Locality is not an absolutist demand that every product run fully offline. Real-time communication, shared remote resources, and distributed services necessarily involve networks. The relevant question is whether a dependency is inherent to the task or imposed by a business or architectural decision that unnecessarily weakens user authority.

Likewise, local data is not automatically safe. Devices fail; encryption keys are lost; files become corrupted. Locality must be complemented by credible backups, security protections, and recovery paths.

**If a task can reasonably be performed independently, its execution should not require someone else's permission.**

### Principle IV. Transparency and Control: Authority Must Be Exercisable

A person cannot meaningfully govern a tool whose consequential behavior is inscrutable or whose actions cannot be inspected, authorized, or corrected.

Sovereign Software must explain the rules governing important operations, reveal relevant dependencies and data flows, and make material changes traceable. It should distinguish suggestions from committed actions, expose uncertainty where it matters, and give users an appropriate opportunity to approve, reverse, or contest consequential outcomes.

Deterministic algorithms are often the right engineering mechanism for ledgers, schedules, access rules, and state transitions. But determinism is **not itself** the philosophical principle. A deterministic black box may still deny users meaningful control; a system using statistical models may remain governable when its boundaries, permissions, evidence, and effects are transparent.

Safety-critical, irreversible, and financial operations require especially explicit specifications, validation, authorization, and audit trails. For complex numerical systems, reproducibility should be judged within documented assumptions and tolerances rather than by demanding identical outputs in every environment.

**The machine may assist in decisions; it must not quietly take ownership of them.**

---

## Section 03: Architecture in Service of the Principles

No single architecture defines Sovereign Software. The correct design depends on the domain. Nevertheless, a useful pattern is to distinguish three responsibilities:

- **Execution:** Carrying out tasks, transitions, calculations, and other active workflows.
- **Preservation:** Retaining records, context, metadata, and recovery information so they remain intelligible beyond the current application.
- **Exchange:** Transferring information between tools through documented formats, protocols, APIs, or import/export mechanisms.

These are conceptual responsibilities, not a requirement for three separate applications or services. A well-designed integrated application can embody all three; a collection of specialized applications can also fail them.

**Interoperability is a means of preserving sovereignty and longevity, not an independent ideological demand for small programs.** Open interfaces, documented data structures, and replaceable components are valuable when they reduce lock-in and support recovery. Modularity and bounded responsibilities remain sound engineering practices, but software does not become non-sovereign simply because it offers many features.

Architecture should make information portable, important behavior understandable, and essential functions recoverable. Implementation choices are justified by those outcomes rather than by aesthetic preference for any particular stack.

---

## Section 04: Artificial Intelligence Without Artificial Dependency

AI can accelerate development, assist analysis, and make sophisticated tools more accessible. It also introduces probabilistic outputs, opaque service dependencies, and the possibility of actions that exceed the user's intent.

Sovereign Software uses AI only under boundaries that preserve human authority:

1. Existing records remain accessible if an AI model or provider becomes unavailable.
2. Core workflows that do not inherently require AI must remain usable without it.
3. Consequential changes proposed by AI are validated and authorized according to their risk.
4. Relevant network calls, privacy implications, and costs are disclosed.
5. AI outputs the user chooses to keep can be preserved in independently usable formats.
6. Important decisions and modifications can be inspected, explained to an appropriate degree, and corrected.

AI-generated software does not become trustworthy merely because it runs locally. Review, testing, secure boundaries, and sustained maintenance remain necessary. Nor should deterministic computation be treated as a universal substitute for legitimate statistical methods.

**AI may extend human ability. It must not become a condition for retaining human work or authority.**

---

## Section 05: Synchronization Without Surrender

Synchronizing devices is useful, but synchronization must not quietly transfer custody or conceal loss.

When disconnected devices edit the same information, divergent states and semantic conflicts can arise. An automatic merge may reconcile data structures while still misunderstanding human intent. Accordingly, a sovereign synchronization system should document its conflict rules, preserve recoverable history when feasible, and expose conflicts that cannot be resolved safely without a decision.

Transport should be distinguishable from ownership: users should know where data is stored, who can read it, how it is encrypted, and what happens when the service disappears. Where practical, synchronization mechanisms should be replaceable.

Replicated data is not a substitute for a tested backup. Mistakes and corruption can synchronize as readily as useful changes. Recovery must include independently retained versions and a realistic restore process.

**Synchronization should connect a person's devices, not make the person's work dependent on a provider's continued existence.**

---

## Section 06: Evaluating Sovereign Software

A manifesto becomes useful when its claims can be challenged with evidence. Evaluation must therefore distinguish *defining principles* from *engineering techniques* and from *general software quality*.

### 6.1 Four principle assessments

Every assessment should examine:

| Principle | Central evidence |
| --- | --- |
| **Sovereignty** | Independent access, complete export, practical migration, key custody where applicable, and freedom from revocable vendor control |
| **Longevity** | Documented formats and schemas, metadata preservation, tested backups, restoration, and independent interpretation |
| **Locality** | Which essential functions operate without remote permission, and which dependencies are genuinely necessary |
| **Transparency and Control** | Understandable rules, traceable consequential changes, informed authorization, error visibility, and paths for correction |

Tests must be adapted to software's actual purpose and deployment setting. An offline text editor, a distributed messaging system, and a scientific simulation cannot be judged by identical assumptions about networking or operation duration.

### 6.2 Fundamental eligibility requirements

A tool cannot earn the highest sovereign classification when verified evidence shows that:

- Its users cannot independently retrieve essential information.
- There is no practicable way to leave without unacceptable loss of important records or meaning.
- Essential records cannot be recovered or interpreted outside an irreplaceable vendor-controlled system.
- Continued vendor permission is required to retain effective control over already-created work.
- Consequential operations remove meaningful user authorization or oversight in a way incompatible with the tool's risks.

Treat each requirement as **Pass**, **Fail**, **Not Verified**, or **Not Applicable with justification**. A verified failure is not canceled by high marks elsewhere; missing evidence is not a failure and must not be misrepresented as a pass.

### 6.3 Evidence before a numerical score

The previous six-principle weighted framework (25/25/20/15/10/5) is superseded. Its weights must not be silently reassigned to the four new principles. **No new weighting scheme or tier threshold is adopted by this manifesto without separate justification, representative testing across disciplines, and published methodology.**

Until such a method is validated, publish an evidence-led principle profile and a clearly qualified overall determination, such as *meets the proposed core requirements*, *partially aligned*, *does not meet the proposed core standard*, *fails a fundamental requirement*, or *insufficient evidence*. Each claim should disclose the application version, scope, observations, sources, limitations, and assessment date. Historical classifications remain historical, not automatically renewed.

A future scored methodology may be developed, but no arithmetic should permit excellent speed or elegant architecture to compensate for loss of essential user authority.

### 6.4 Supporting engineering tests

Use engineering tests to gather evidence, not as interchangeable philosophical pillars:

- **Ownership and exit:** Can essential information be accessed, exported, and migrated independently?
- **Preservation and recovery:** Can an independent party interpret and restore the important records?
- **Offline independence:** Which functions continue when external services are unavailable, and why?
- **Operational transparency:** Can consequential actions, permissions, dependencies, and outcomes be inspected and controlled?
- **Security and continuity:** Are custody, encryption, backups, restoration, and vendor-failure scenarios credibly addressed?
- **Interoperability and maintainability:** Do interfaces, formats, and architectural boundaries materially support freedom and long-term operation?
- **Human experience and performance:** Is the software usable, accessible, and reasonably responsive for its domain?

The last two are supporting quality and implementation considerations. Neither responsiveness nor narrow functional scope is a prerequisite for being Sovereign Software in itself. Likewise, a sub-100ms interaction target is useful in many user interfaces, but not a universal sovereignty test.

**The principles define the destination. Evidence-based engineering tests show whether the software reaches it.**

Read the full [methodology](https://sovereign.polla.dev/methodology/).

---

## Section 07: What Sovereign Software Refuses to Become

Sovereign Software rejects arrangements that unnecessarily subordinate users to systems they cannot govern:

- **Captive data:** Records that cannot be meaningfully retrieved, interpreted, or migrated.
- **Revocable access to one's own work:** Essential information or already-created results rendered inaccessible by an arbitrary account or subscription decision.
- **Irrecoverable dependence:** Information that becomes useless when one vendor, binary, or runtime disappears.
- **Opaque consequential automation:** Significant actions performed without appropriate visibility, authorization, or recourse.
- **Silent loss through synchronization:** Conflicting or corrupted states overwritten without practical recovery.
- **Concealed dependencies and surveillance:** Mandatory external calls or data collection that undermine informed user choice.

It does **not** reject sophisticated applications, commercial development, optional cloud services, AI, or feature-rich designs merely for being sophisticated, commercial, connected, intelligent, or comprehensive. The issue is the resulting distribution of authority and the durability of user freedom.

**The ability to build or monetize a feature is not sufficient reason to make users dependent on it.**

---

## Section 08: Personal Software in the Age of AI

Software development has often favored products serving large markets because engineering, distribution, and maintenance are expensive. Modern tools and AI-assisted workflows can lower some of these barriers, making carefully tailored applications more feasible for individuals, research groups, and smaller communities.

Lower development cost does not guarantee lower lifetime cost. Security, migration, maintenance, documentation, accessibility, and data recovery still require sustained attention. AI-generated code can make software faster to create without making it easier to trust or preserve.

The opportunity is not simply to produce more applications. It is to build tools accountable to the people who use them, including communities whose needs are too specific to attract mass-market investment.

**Software does not need a mass market to justify its existence. It does need to justify the dependencies it imposes on its users.**

---

## Section 09: The Enduring Commitment

Sovereign Software is not defined by a database engine, a local-first framework, a programming language, a licensing label, or a particular synchronization protocol. Those are changing means.

Its enduring commitments are simpler: authority stays with the user; information survives the tools that produced it; unnecessary external dependence is resisted; and important actions remain transparent and governable.

A good implementation will also strive for security, performance, accessibility, maintainability, and interoperability. These qualities are important. They support the philosophy, but they do not replace its central question:

**When the software, vendor, network, or fashionable technology changes, does the person still retain meaningful control over their work?**

That is the standard by which Sovereign Software asks to be judged.

---

## Revision History

- **22 October 2026: Philosophical revision (proposed).** Refined the six-principle model into four foundational principles: Sovereignty, Longevity, Locality, and Transparency and Control. Reclassified deterministic behavior, interoperability, modularity, and responsiveness as supporting engineering characteristics rather than independent philosophical requirements. Withdrew the previous numerical weights and tier thresholds pending separate methodological validation.
- **22 October 2026: Prior evaluation framework v2.0.** Six weighted principles with five eligibility gates and seven verification tests. Preserved as historical context; not the current evaluation proposal.
- **Earlier framework v1.0.** Six principles in an earlier order and seven equal pass/fail tests.

## Selected References

- M. Kleppmann, A. Wiggins, P. van Hardenberg, and M. McGranaghan, “Local-first software: you own your data, in spite of the cloud,” *Onward!*, 2019. https://doi.org/10.1145/3359591.3359737
- SQLite, “Recommended Storage Format for Datasets,” on its Library of Congress preservation designation. https://sqlite.org/locrsf.html
- M. Shapiro, N. Preguiça, C. Baquero, and M. Zawirski, “Conflict-free replicated data types,” *SSS*, 2011. https://hal.sorbonne-universite.fr/inria-00609399v1
- M. D. McIlroy, E. N. Pinson, and B. A. Tague, “UNIX Time-Sharing System: Foreword,” *Bell System Technical Journal*, 1978. (Historical context for modular tool design; not a definitional requirement of sovereignty.)
- J. Nielsen, *Usability Engineering*, 1993. (Response-time guidance belongs to supporting usability engineering, not to the definition of Sovereign Software.)

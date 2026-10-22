+++
title = "How Sovereign Software Is Evaluated"
description = "Sovereign Software Evaluation Framework: four principles, fundamental requirements, evidence and qualified determinations."
layout = "reading"
outputs = ["html", "methodology_md"]
weight = 4
aliases = ["/evaluator/"]
+++

# How Sovereign Software Is Evaluated

> **Central question:** When a software provider, network service, application, or technology changes or disappears, can people retain meaningful control over their work?

The Sovereign Software Manifesto sets out four foundational principles. This methodology provides a reproducible, evidence-led procedure to examine how a specific software product and deployment align with them. It is an **unscored qualitative assessment**, not a general quality review, a security penetration test, or an externally accredited certification.

## 1. Purpose, scope, and vocabulary

The framework applies to software that creates, holds, processes, or mediates work and information: personal applications, professional tools, databases, engineering software, operating systems, and managed services. Network-dependent products are not excluded automatically. Every assessment evaluates a **specific version, platform, configuration, deployment model, perspective role, and use case**, not an abstract brand.

| Term | Meaning |
|---|---|
| **Principle** | A philosophical commitment describing what user authority requires. |
| **Fundamental requirement** | A minimum condition (`E1`–`E5`) whose verified failure prevents the product from meeting the core standard in the assessed scope. |
| **Verification procedure** | A repeatable examination (`T1`–`T7`) that produces observations relevant to requirements and principles. |
| **Principle finding** | An evidence-based judgment: **Meets**, **Partially meets**, **Does not meet**, or **Not assessed**. |
| **Overall determination** | A qualified conclusion derived deterministically from requirement statuses, principle findings, and sufficiency of evidence. |

### Essential scope declaration and domain profiles

Before running tests, an assessment must record an explicit **Essential Scope Declaration** comprising a **Domain Preservation Profile**, a **Perspective Role**, and any **Pre-Declared Departures** so that terms such as "essential information" and "unacceptable loss" are fixed before grading.

#### 1. Baseline domain preservation profiles

| Profile ID & Domain | Essential records (must survive E1–E3) | Essential capabilities (must survive E4) | Acceptable loss on exit (does not fail E2) |
|---|---|---|---|
| **`vcs_core`**<br>Version Control & Core Infrastructure | Complete revision history, commit messages, timestamps, author identities; branch, tag, and parent-child DAG structure; cryptographic integrity hashes and trees; local configuration and ignore rules. | Inspecting history, diffs, and file contents offline; creating commits, branches, and portable bundles without remote server permission; cloning or restoring a repository onto a clean machine without original host access. | Hosting-platform pull-request UI state or CI runner logs (unless assessed as a forge); ephemeral reflog entries beyond configured local retention. |
| **`knowledge_notes`**<br>Knowledge Bases, Notes & Personal Wikis | Full prose content and heading structure; internal cross-references, wikilinks, and backlink graph relationships; embedded media and attachments; front-matter metadata, tags, and creation/modification dates. | Reading, searching, creating, and editing notes locally without network connectivity or account validation; exporting or copying the workspace into standard files readable by independent text tools. | Ephemeral window layout, UI theme state, and cursor history; proprietary plugin visual layouts where underlying data remains plain text or JSON. |
| **`cad_engineering`**<br>Engineering, CAD & Parametric Design | Exact 3D/2D geometry, coordinates, and measurement units; parametric feature tree, sketch constraints, formulas, and tolerances; assembly hierarchy and part relationships; material and layer assignments. | Opening, inspecting, measuring, and modifying existing models offline without license-server validation; exporting both editable source structures (or documented native archives) and standard interchange formats (such as STEP or DXF). | Cached tessellation or render previews that can be regenerated from source geometry; viewport camera presets and toolbar customizations. |
| **`finance_tasks`**<br>Financial Ledgers & Task Management | Complete transaction journal, double-entry postings, accounts, and commodities/currencies; dates, payees, narration, tags, and reconciliation states; budget allocations, task dependencies, due dates, and recurrence rules; verifiable audit trail of balance assertions. | Querying balances, generating reports, and recording transactions locally without third-party server approval; exporting the complete ledger or task database into documented plain-text or SQL/CSV formats without rounding or truncation errors. | Automatic bank-feed synchronization tokens (which are inherently external); custom dashboard chart colors and window positions. |
| **`research_bibliographic`**<br>Research, Citations & Scientific Computing | Complete bibliographic metadata (authors, titles, DOIs/ISBNs, publication dates, item types); collection hierarchy, tags, and cross-item relations; attached PDFs/files and user annotations or highlights; stable citation keys or document-citation mappings; executable analysis scripts, input datasets, and spatial layer attributes. | Searching, reading, citing, and exporting the reference library or dataset offline; restoring the complete database and file attachments onto a new machine without vendor account intervention; exporting to standard formats (CSL JSON, BibTeX, GeoPackage, CSV/NetCDF) while preserving structural relationships. | Cloud-sync conflict history logs after resolution; UI column widths and temporary search history. |

#### 2. Standard perspective roles

When software mediates shared work among multiple people or within an institution, evaluate from a declared role:

- **Individual user:** Personal custody, offline capability, and exit over a single user's workspace and records.
- **Project contributor:** Ability of an individual contributor to retrieve and verify their local clone or authored contributions independently of a central host.
- **Workspace collaborator:** Ability of a participant to inspect permissions, export permitted records, and contest automated or administrative actions within a shared team environment. Shared constraints do not violate sovereignty when governance rules are documented before use, visible to participants, auditable, and open to contest or appeal.
- **Institutional custodian:** Ability of the organization or laboratory as a whole to self-host, audit, back up, restore, and migrate the collective repository without vendor lock-in.

Any exclusion from or addition to the baseline domain profile must be recorded as a **pre-declared departure** before testing begins.

## 2. The four foundational principles and authority dimensions

The four principles defined in the [Manifesto](https://sovereign.polla.dev/read/) form a deliberate conceptual relationship rather than a numerical ranking: **Sovereignty** establishes the goal (authority belongs to the user); **Longevity** protects it across time (data, functional, and knowledge longevity); **Locality** reduces avoidable external dependence (evaluating network dependencies by proportionality and replaceability); and **Transparency and Control** make authority effective in day-to-day operation.

Together with the five eligibility requirements, the principles evaluate four distinct operational dimensions of user authority:

| Authority dimension | Meaning | Where it is evaluated |
|---|---|---|
| **Information authority** | Access to, custody of, and independent retrieval of essential records. | Principle I (Sovereignty), E1, E4 |
| **Execution authority** | The ability to perform and continue essential work without arbitrary third-party revocation. | Principle I (Sovereignty), Principle II (Functional longevity), Principle III (Locality), E4 |
| **Governance authority** | The ability to inspect, authorize, reverse, or contest significant operations and shared rules. | Principle IV (Transparency and Control), E5 |
| **Continuity authority** | The ability to preserve, interpret, recover, and migrate work and its meaning across time. | Principle II (Longevity), E2, E3 |

Operational independence can substitute for open-source license freedom when essential records and workflows are genuinely portable to independent implementations; it cannot substitute when continuing the work requires maintaining or patching an irreplaceable proprietary binary after vendor withdrawal.

## 3. Fundamental eligibility requirements

The five requirements form the minimum eligibility screen for the assessed scope:

| ID | Requirement | Decision question | Distinguishing focus |
|---|---|---|---|
| **E1** | Independent access to essential information | Can the user obtain an intelligible copy of already-created essential records using a documented, workable process? | **Retrieval**, not just an export button or provider promise. |
| **E2** | Practicable exit and migration | Can the user leave for an alternative workflow or implementation without unacceptable loss of essential information and meaning? | **Usable transition**, including metadata and relationships. |
| **E3** | Independent interpretation and recovery | Can preserved records be interpreted and meaningfully restored without an irreplaceable vendor-controlled system? | **Survival of records and meaning** after the original software is gone. |
| **E4** | Continuing authority and custody over already-created work | If new permission, payment, activation, or provider availability is withdrawn, can the user still retain effective custody and continue essential operations over existing work without architectural exposure to unauthorized parties? | **Revocability, execution continuity, and custody**, separate from initial retrieval. |
| **E5** | Governability of consequential actions | For the risks of this software, can consequential operations be adequately authorized, inspected, and corrected or contested where feasible? | **Control of behavior**, rather than custody of data. |

### Provider-withdrawal scenario and requirement statuses

Assessments use a **provider-withdrawal scenario**: assume the original provider stops cooperating and its remote services and licensing endpoints become unavailable. Examine what the user can do using only the software, exports, backups, keys, and documentation **already legitimately available before that event**.

Each requirement is recorded as:

- **Pass:** Sufficient positive evidence demonstrates the requirement in the defined scope.
- **Fail:** Sufficient evidence demonstrates a material failure in that scope (including architectural custody defects under `E4` that expose confidential records to unauthorized parties by design).
- **Not Verified:** Evidence is unavailable, incomplete, contradictory, or too weak to decide.
- **Not Applicable:** The requirement genuinely does not arise in the assessed scope (for example, `E3` for a stateless viewer that creates no durable records), supported by a specific written justification. Valid `Not Applicable` counts as satisfied for determination calculation only; unsupported `Not Applicable` is treated as `Not Verified`.

## 4. Principle findings and decision thresholds

Each principle receives **Meets**, **Partially meets**, **Does not meet**, or **Not assessed**. A finding of `Does not meet` requires direct adverse evidence; lacking evidence requires `Not assessed`.

| Principle | Meets | Partially meets | Does not meet |
|---|---|---|---|
| **Sovereignty** | All essential domain records and relationships can be retrieved and migrated using documented, built-in or standard tools without fresh vendor cooperation (`E1`, `E2`, `E4` Pass with no material friction). | `E1`, `E2`, and `E4` Pass, but migration requires multi-step manual conversion, community scripts, or loses secondary convenience structures outside the essential profile. | Essential domain records cannot be retrieved or migrated without vendor cooperation or unacceptable loss, or the vendor retains revocable control over existing work. |
| **Longevity** | Native storage or archival exports use open standards or documented schemas; clean-machine restoration (`T2`) succeeds with independent tools; workflows continue via independent tools or maintainable source. | Essential records survive (`E3` Pass), but secondary metadata documentation is incomplete, restoration requires specific legacy runtimes, or continuation relies on a closed offline binary that users cannot patch. | Essential records are trapped in undocumented or encrypted proprietary formats that cannot be independently interpreted or restored (`E3` Fail or loss of structural meaning). |
| **Locality** | All essential local capabilities operate without network connectivity, mandatory accounts, or remote license checks (`T3`); remaining network dependencies are inherent to the task and replaceable with self-hosted or alternative endpoints. | Essential local capabilities work offline, but the software makes avoidable background calls, requires periodic online checks for non-core features, or couples optional sync to a first-party relay while keeping local files accessible. | Capabilities that could reasonably run locally require continuous connectivity, mandatory cloud accounts, or non-replaceable vendor servers. |
| **Transparency and Control** | Consequential actions (deletion, transmission, encryption, billing, automated/AI edits) require proportionate prior authorization, produce inspectable local logs or diffs (`T4`), and provide rollback or recourse (`E5` Pass). | Minimum oversight for high-risk actions is present (`E5` Pass), but some background operations, automated classifications, or updates lack detailed logs or granular opt-outs. | The software performs silent, unlogged, or irreversible consequential changes, transmits records without authorization, or applies opaque automated decisions without override. |

## 5. Overall determination and precedence

The framework does not assign a numerical score, weight, tier, seal, or certification. It computes one of five **qualified determinations** in strict order of precedence:

| Precedence | Determination | Rule |
|---|---|---|
| **1** | **Fails a fundamental requirement** | At least one `E1`–`E5` requirement is verified as `Fail`. Other findings do not override it. |
| **2** | **Insufficient evidence** | No verified fundamental failure, but at least one applicable requirement is `Not Verified`, a principle is `Not assessed`, or supporting evidence is incomplete or low-confidence. |
| **3** | **Does not meet the proposed core standard** | All applicable requirements are established (`Pass` or justified `Not Applicable`), evidence is sufficient, and **at least one principle** is judged `Does not meet`. |
| **4** | **Partially aligned** | All applicable requirements are established, evidence is sufficient, no principle `Does not meet`, and at least one principle `Partially meets`. |
| **5** | **Meets the proposed core requirements** | All applicable requirements are established, all four principles `Meet`, and supporting evidence is sufficient. |

**Consistency rule:** Requirement statuses and principle findings must not contradict each other (for example, `E3` failing while Longevity is marked `Meets`). A failed requirement still governs the determination, and the validation engine flags the inconsistency so it is corrected before publication.

## 6. Engineering verification procedures

Verification procedures collect empirical observations; they do not receive independent scores.

| Test & Role | Related principles & requirements | Verification checklist |
|---|---|---|
| **T1 Ownership and exit**<br>Primary (`Sovereignty`) | `E1`, `E2`, `E4` | Export actual user data, metadata, history, and relationships using a documented procedure; verify completeness against lossy summaries; test import into an independent tool; confirm access persists when account or subscription status changes. |
| **T2 Preservation and recovery**<br>Primary (`Longevity`) | `E3` | Back up and restore into a clean environment without vendor assistance; interpret restored records using documented formats and independent tools; verify that schemas, encodings, units, relationships, and provenance survive. |
| **T3 Offline independence**<br>Primary (`Locality`) | Context-dependent | Disable external network access and record which core workflows continue; distinguish inherent network needs from avoidable vendor checks; verify whether sync or remote relays can be replaced with self-hosted endpoints and that reconnecting does not silently overwrite local work. |
| **T4 Operational transparency and control**<br>Primary (`Transparency and Control`) | `E5` | Identify consequential operations (deletion, transmission, billing, permissions, encryption, AI/automated edits); verify proportionate authorization and inspectable logs or diffs; test rollback, undo, or contestation; verify disclosure of AI uncertainty and external calls. |
| **T5 Security, custody, and continuity**<br>Cross-cutting | `E3`, `E4`, `E5` | Inspect key management, encryption boundaries, and decryption custody; check for architectural exposure of user records to unauthorized parties; simulate provider shutdown using only user-held material; verify security controls protect the user rather than enforcing lock-in. |
| **T6 Interoperability and maintainability**<br>Supporting means | `E2`, `E3` where relevant | Inspect native/export schemas and API documentation; test exchange with an independent implementation; check whether proprietary extensions trap meaning; where no independent tool can replace the workflow, check source availability and build instructions. |
| **T7 Human experience and performance**<br>Supporting quality | None automatically | Record responsiveness, resource use, accessibility, and interface clarity as quality notes; check for dark patterns or degraded local modes that push users toward vendor cloud services. Do not apply a universal 100-ms pass/fail threshold. |

### Six-stage laboratory execution protocol

1. **Stage 1 - Baseline and synthetic dataset:** Record exact version, OS, installation method, license, configuration, storage model, perspective role, domain profile, and network endpoints. Construct a synthetic dataset containing all essential records and relationships for the domain profile and write down expected results before testing.
2. **Stage 2 - Exit and migration (`T1`, `T6`):** Export the synthetic dataset, open the artifacts in an independent parser or replacement tool without invoking the original application, and check preserved records, metadata, units, and relationships against the domain profile.
3. **Stage 3 - Isolated provider-withdrawal simulation (`T1`, `T3`, `T5`):** Block all external vendor domains, licensing servers, and sync relays in an isolated network namespace. Test opening, inspecting, editing, and exporting existing work, and test pointing inherent network services to a replacement endpoint.
4. **Stage 4 - Clean-machine restoration (`T2`, `T5`):** Transfer only the preserved backup or native directory, user-held keys, and public documentation to a clean machine with no prior account state. Restore the work and verify hashes, relationships, and interpretability.
5. **Stage 5 - Consequential action boundary test (`T4`, `T5`):** On a disposable copy, trigger consequential operations (bulk deletion, permission changes, sync conflict, automated/AI actions) and verify prior authorization, audit logs/diffs, and rollback.
6. **Stage 6 - Evidence logging and deterministic check:** Record commands, expected versus actual observations, limitations, and confidence levels before assigning findings, then validate consistency and compute the determination.

## 7. Evidence, confidence, and publication

Every consequential claim must cite one of four evidence categories: **(1) Direct observation** from reproducible hands-on testing on the named version; **(2) Independent corroboration** from third-party technical analysis; **(3) Vendor or maintainer declaration** (which states what is claimed but never by itself proves recoverability); or **(4) Explicit inference**.

Each evidence record states the target requirement or principle, the reproducible observation, scope limitations, and confidence:

- **High confidence:** Direct reproducible testing or robust independent corroboration.
- **Medium confidence:** Concrete, comprehensive evidence with disclosed limitations; sufficient to support a qualified determination.
- **Low confidence:** Incomplete or indirect evidence; cannot establish an eligibility `Pass`, eligibility `Fail`, or favorable determination, and yields `Insufficient evidence`.

### Two-assessor protocol and reassessment

For high-stakes or disputed entries, two assessors agree on the version, perspective role, and domain profile before testing, execute `T1`–`T7` independently, and run both records through the determination rules. Any discrepancy is published in a **Disagreement and Reconciliation Note** classified as *(a) observation difference*, *(b) scope difference*, or *(c) threshold judgment*.

Published assessments disclose the product version, platform, deployment model, perspective role, domain profile, assessment date, structured requirement and principle findings, evidence records, and limitations. Reassess when major releases, licensing changes, export/encryption modifications, or new evidence materially alter user authority.

## 8. Worked examples

These examples are **hypothetical and illustrative**, not audits of actual applications. Assume adequate evidence for each stated finding and requirement.

### Example A: Offline, fast, but vendor-locked

A program can edit a locally cached document without a network connection, but its stored project data can only be interpreted by a proprietary vendor-controlled service; users cannot obtain a sufficiently complete, independently usable export.

| Principle | Finding |
|---|---|
| Sovereignty | Does not meet |
| Longevity | Does not meet |
| Locality | Partially meets: local editing works but independent reuse requires the provider |
| Transparency and Control | Meets, for its described consequential operations |

**Requirements:** E1 Fail; E2 Fail; E3 Fail; E4 Fail; E5 Pass.  
**Determination:** **Fails a fundamental requirement.**

Offline editing and fast interaction do not compensate for inability to retain and recover work independently.

### Example B: Durable, independent, but slow

An application operates locally, saves well-documented records, supports representative independent export and restoration, and provides appropriate visibility and authorization. Routine interaction is relatively slow, but not so unusable that it prevents practical access or control.

| Principle | Finding |
|---|---|
| Sovereignty | Meets |
| Longevity | Meets |
| Locality | Meets |
| Transparency and Control | Meets |

**Requirements:** E1–E5 Pass.  
**Determination:** **Meets the proposed core requirements.**

Responsiveness is an important software-quality consideration but is not, by itself, an eligibility gate.

### Example C: Network-dependent messaging, with a transparency gap

A managed messaging service requires network connectivity for real-time delivery, which is inherent to its function. Locally available history and export facilities remain usable without fresh permission, and independent recovery is documented. However, some automated moderation or message-processing decisions are only partially explained, while affected users retain meaningful oversight and appeal appropriate to the assessed risks.

| Principle | Finding |
|---|---|
| Sovereignty | Meets |
| Longevity | Meets |
| Locality | Meets: remote message delivery inherently needs connectivity; avoidable dependencies have not been established |
| Transparency and Control | Partially meets |

**Requirements:** E1–E5 Pass, including E5 because minimum oversight is present despite the documented transparency limitation.  
**Determination:** **Partially aligned.**

Inherent network needs are not penalized as artificial dependence.

### Example D: Eligibility passes, foundational principle fails

A locally installed tool provides independently recoverable records and appropriate authorization, but unnecessarily demands remote licensing for common local-only functions. This dependency is severe enough that Locality **Does not meet**, while none of the specifically defined E1–E5 minimum conditions fails for the narrowly assessed already-created records and operations.

**Requirements:** E1–E5 Pass.  
**Principle profile:** Sovereignty Meets; Longevity Meets; Locality **Does not meet**; Transparency and Control Meets.  
**Determination:** **Does not meet the proposed core standard.**

This illustrates why a complete failure of a foundational principle cannot be called merely *Partially aligned*, even when none of the narrower eligibility gates fails.

#### Case note on shared governance and retention conflicts

Consider a collaborative research repository used by a university laboratory where a departing researcher wishes to delete an uploaded dataset, while the university requires the dataset to remain intact to preserve the published study's audit trail. Evaluated from the **project contributor** perspective, the contributor can export their full copies and attribution history (`E1`–`E3` Pass), while the inability to purge committed laboratory records represents legitimate, pre-disclosed shared governance rather than vendor lock-in. Evaluated from the **institutional custodian** perspective, the laboratory can export and self-host the entire repository and audit log without vendor permission (`E1`–`E5` Pass).

## 9. Limits and governance of the methodology

This is a **normative evaluation framework**, not a scientific measurement scale. It does not establish comprehensive security, privacy, functional correctness, performance, legal compliance, or fitness-for-purpose certification. Assessors must disclose conflicts of interest, distinguish vendor claims from directly verified facts, and publish the complete evidence and principle profile alongside every determination.

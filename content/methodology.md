+++
title = "How Sovereign Software Is Evaluated"
description = "Sovereign Software Evaluation Framework v3.1: four principles, fundamental requirements, evidence and qualified determinations."
layout = "reading"
weight = 4
aliases = ["/evaluator/"]
+++

# How Sovereign Software Is Evaluated

**Sovereign Software Evaluation Framework: Version 3.1 (Proposed)**  
**22 October 2026**

> **Central question:** When a software provider, network service, application, or technology changes or disappears, can people retain meaningful control over their work?

Sovereign Software is an architecture-neutral philosophy and evidence-based evaluation approach. Building on free software, local-first computing, digital preservation, and human-centred governance, it asks whether people and organizations keep effective authority over their work as technology, vendors, and circumstances change. The individual principles have long precedents, described on the [lineage page](https://sovereign.polla.dev/lineage/); this methodology is the part the framework proposes to contribute.

The Sovereign Software Manifesto sets out a philosophy. This methodology provides a documented way to examine how a particular software product and deployment align with it. The **Sovereign Index** records the results. This is an **evidence-led, unscored assessment**, not a general quality review, a security certification, or an externally accredited standard.

## 1. Purpose, scope, and vocabulary

The framework is intended principally for software that creates, holds, processes, or mediates work and information: personal applications, professional tools, databases, engineering software, operating systems, and managed services. Network-dependent products are not excluded automatically. Evaluate a **specific version, platform, configuration, deployment model, and use case**, not an abstract brand.

The distinction among the following terms is essential:

| Term | Meaning |
|---|---|
| **Principle** | A philosophical commitment describing what user control should mean. |
| **Fundamental requirement** | A minimum condition whose demonstrated failure prevents the product from meeting the proposed core standard in the assessed scope. |
| **Verification procedure** | A repeatable examination that produces observations relevant to requirements and principles. |
| **Principle finding** | An evidence-based judgment: Meets, Partially meets, Does not meet, or Not assessed. |
| **Overall determination** | A qualified conclusion derived from requirement status, principle findings, and sufficiency of evidence. |

A software product can be excellent in performance, usability, security, or features and still not meet this particular philosophy. Conversely, alignment with this philosophy does **not** establish that a product is safe, accessible, reliable, or fit for a particular task.

## 2. The four foundational principles

The principles are related, but **not numerical weights or a scientific ranking**.

### I. Sovereignty: Authority belongs to the user

Users retain meaningful authority over their information, essential capabilities, and ability to depart from or replace providers. The relevant question is practical rather than contractual: can users access, retain, export, and move their work without a continuing grant of permission that can be withdrawn at will?

**Ask:** If the provider changed its terms or ceased operating, what control would the user still exercise over already-created work?

**Look for:** Independent retrieval, meaningful exports, practicable migration, clear custody and key arrangements, and resilience to revocable access. Sovereignty does not require self-hosting in every case; a managed service can support meaningful authority if its exit and recovery paths are real, independently usable, and tested.

### II. Longevity: Information outlives software

Records should remain accessible, interpretable, and recoverable beyond the original application, provider, or runtime. Preserving bytes alone does not preserve their meaning.

- **Data longevity:** Can records, structure, metadata, and relationships be preserved, independently interpreted, and restored?
- **Functional longevity:** Can important workflows continue using independent tools, maintained alternatives, or a practicable migration path?
- **Knowledge longevity:** Will schemas, encodings, units, provenance, relationships, and recovery instructions remain intelligible?

**Ask:** Could an independent party make useful sense of the preserved information if the original product disappeared?

Open, documented binary formats can serve longevity; plain text is not mandatory. An export is not proved adequate until its completeness and recovery are checked. No technology promises permanent compatibility, so maintenance and periodic restoration tests matter.

### III. Locality: Unnecessary external dependence is avoided

Capabilities that can reasonably execute on user-controlled hardware should not require continuous remote connectivity or vendor permission without a task-based justification.

**Ask:** Which important capabilities continue when external services are unavailable, and which remaining dependencies are truly inherent to the activity?

Offline operation is a strong strategy for independence, but not every operation can be offline. Delivering messages, accessing a shared live dataset, or querying remote systems inherently involves communication. A legitimate dependency is not automatically a locality failure. Local storage alone does not establish sovereignty or recoverability.

### IV. Transparency and Control: Consequential behavior is governable

Users should be able to understand material operations, inspect their effects, exercise meaningful authorization appropriate to the risk, and correct, reverse, or contest consequential outcomes where feasible.

**Ask:** Can users understand and exercise appropriate control over what the software does on their behalf?

**Look for:** Documented rules, visible changes, reliable audit trails, informed authorization, error visibility, and appropriate recourse. Determinism can support this principle for transactions, schedules, or state changes, but is not itself the principle. Statistical and AI-assisted systems can comply when their permissions, uncertainty, consequential actions, and control boundaries are clear. Not every operation must be individually confirmed: proportionate standing authorization and revocable permissions may be appropriate.

### How they relate

**Sovereignty establishes the goal. Longevity protects it over time. Locality reduces avoidable dependence. Transparency and Control make authority effective in day-to-day operation.**

These dimensions are distinct, mutually reinforcing, and not interchangeable. A compelling performance benchmark cannot compensate for a loss of essential control.

## 3. Fundamental eligibility requirements

The following five requirements form the minimum eligibility screen for the **assessed scope**. They are intentionally distinct, although a single observation can inform several of them.

| ID | Requirement | Decision question | Distinguishing focus |
|---|---|---|---|
| **E1** | Independent access to essential information | Can the user obtain an intelligible copy of already-created essential records using a documented, workable process? | **Retrieval**, not just an export button or provider promise. |
| **E2** | Practicable exit and migration | Can the user leave for an alternative workflow or implementation without unacceptable loss of essential information and meaning? | **Usable transition**, including metadata and relationships. |
| **E3** | Independent interpretation and recovery | Can preserved records be interpreted and meaningfully restored without an irreplaceable vendor-controlled system? | **Survival of records and meaning** after the original software is gone. |
| **E4** | Continuing authority over already-created work | If new permission, payment, activation, or provider availability is withdrawn, can the user still retain effective control over existing work? | **Revocability and custody**, separate from initial retrieval. |
| **E5** | Governability of consequential actions | For the risks of this software, can consequential operations be adequately authorized, inspected, and corrected or contested where feasible? | **Control of behavior**, rather than custody of data. |

### Standard assessment scenario

Use a documented **provider-withdrawal scenario**: assume the original provider stops cooperating and its remote services and licensing endpoints become unavailable. Examine what the user can do with access, exports, backups, keys, software, and documentation **already legitimately available before that event**. Do not assume that a vendor will issue a special export, supply missing keys, or publish undocumented formats after shutting down.

For software without a distinct vendor, adapt the scenario to abandonment of the application, loss of the original installation, or discontinuation of its dependencies. The scenario is a diagnostic tool, not a requirement that every online collaborative activity operate without any network.

### Requirement statuses

- **Pass:** Sufficient positive evidence demonstrates the requirement in the defined scope.
- **Fail:** Sufficient evidence demonstrates a material failure in that scope.
- **Not Verified:** Evidence is unavailable, incomplete, contradictory, or too weak to decide.
- **Not Applicable:** The requirement genuinely does not arise in the assessed scope, with a specific written justification and review. This status should be rare, especially for E1–E4 when durable user records exist.

A valid **Not Applicable** is treated as satisfied **for the purposes of the determination only**; it is never reported as an actual Pass. Unsupported Not Applicable is treated as Not Verified.

For example, E3 may be Not Applicable for a narrowly assessed stateless viewer that creates no user records. It is not valid to mark a requirement Not Applicable merely because testing recovery or migration would be inconvenient.

A verified requirement failure is decisive for the overall determination, while the rest of the assessment continues so that strengths, context, and improvement paths remain visible. Missing evidence never becomes a failure or a pass.

These five requirements are minimum eligibility conditions, not the complete definition of the philosophy. The principle findings provide the broader assessment of how fully the software embodies Sovereignty, Longevity, Locality, and Transparency and Control.

## 4. Principle findings

Each principle receives one of **Meets**, **Partially meets**, **Does not meet**, or **Not assessed**. The finding must identify a stated use case, version, observations, sources, limitations, and confidence.

| Principle | Meets | Partially meets | Does not meet |
|---|---|---|---|
| **Sovereignty** | Independent access and meaningful authority over essential records and exit are demonstrable. | Control exists but entails important limitations, friction, or dependence, without a verified fundamental failure. | Material vendor control or lock-in prevents the user from exercising the principle. |
| **Longevity** | Essential records, context, and restoration pathways remain independently understandable and viable. | Preservation is credible but has meaningful gaps in metadata, documentation, functional continuity, or testing. | Essential information cannot be independently interpreted or recovered, or its meaning is materially lost. |
| **Locality** | Avoidable remote permission and connectivity dependencies have been removed from capabilities suitable for local operation. | Some avoidable dependencies persist but meaningful independence remains. | Important capabilities that can reasonably work locally are unnecessarily bound to external permission or connectivity. |
| **Transparency and Control** | Consequential operations are sufficiently understandable, traceable, authorized, and challengeable for their risk. | Meaningful oversight exists but has significant gaps not establishing a fundamental failure. | Consequential behavior is substantially opaque or outside effective user control. |

**Not assessed** means no supported judgment can yet be made; it is not a low score or a failure.

A principle finding of **Does not meet** requires direct, specifically described adverse evidence. Merely lacking positive evidence calls for **Not assessed**. If evidence shows a core failure under E1–E5, record that failure separately; do not hide it in a partially aligned principle profile.

## 5. Overall determination and precedence

The framework does not assign a numerical score, weight, tier, seal, or certification. It makes one of five **qualified determinations**, using this order:

| Precedence | Determination | Rule |
|---|---|---|
| **1** | **Fails a fundamental requirement** | At least one E1–E5 requirement is verified as Fail. Other findings do not override it. |
| **2** | **Insufficient evidence** | No verified fundamental failure, but at least one applicable requirement is Not Verified, a principle is Not assessed, or material evidence is insufficient to support a complete conclusion. |
| **3** | **Does not meet the proposed core standard** | All applicable requirements are established as Pass or justified Not Applicable, evidence is sufficient, and **at least one principle** is judged Does not meet. |
| **4** | **Partially aligned** | All applicable requirements are established, evidence is sufficient, no principle Does not meet, and at least one principle Partially meets. |
| **5** | **Meets the proposed core requirements** | All applicable requirements are established, all four principles Meet, and supporting evidence is sufficient. |

This separates a **hard failure of an eligibility requirement** from a **substantive failure of a foundational principle**. Neither can be diluted by unrelated strengths. A moderate and bounded shortcoming yields Partially aligned, whereas a verified material failure of a principle yields Does not meet the proposed core standard.

**Consistency rule:** Findings and requirements must not contradict each other. If, for example, E3 fails while Longevity is marked Meets, the assessment is internally inconsistent and must be corrected before publication. A failed requirement still takes precedence in the final output, but the inconsistency must be flagged by validation.

No status implies external accreditation. A product classified Meets may still contain severe security, safety, or usability defects beyond the scope of the assessment.

## 6. Engineering verification procedures

Verification procedures collect observations; they do **not** receive independent scores. Different procedures may support the same principle, and one observation may support multiple conclusions with explicit references rather than being artificially counted more than once.

| Test | Principal role | Related requirements | Typical checks |
|---|---|---|---|
| **T1 Ownership and exit** | Sovereignty | E1, E2, E4 | Export actual records, examine completeness, repeat access without fresh vendor cooperation, test representative migration. |
| **T2 Preservation and recovery** | Longevity | E3 | Preserve records and metadata, restore a representative backup, interpret the result using independent tooling and documentation. |
| **T3 Offline independence** | Locality | Context-dependent | Identify essential workflows, disconnect outside services, verify what still works, justify inherent remote dependencies. |
| **T4 Operational transparency and control** | Transparency and Control | E5 | Inspect permissions, trace consequential changes, validate approval and reversal/recourse flows, test AI-generated actions where applicable. |
| **T5 Security, custody, and continuity** | Cross-cutting | E3, E4, E5 as applicable | Examine key custody, trust boundaries, backups, restoration, provider shutdown, and risk-appropriate controls. |
| **T6 Interoperability and maintainability** | Supporting means, especially to Sovereignty and Longevity | E2, E3 where relevant | Check real format support, interchange, documented APIs, and replacement paths. Avoid treating modularity as a sovereignty requirement in itself. |
| **T7 Human experience and performance** | Supporting software quality | None automatically | Examine accessibility, usability, responsiveness, and artificial friction. Do not use a universal 100-ms pass/fail rule. |

Tests T6 and T7 may inform a report without affecting core eligibility unless a concrete observation actually demonstrates a failure of a fundamental requirement or principle. A comprehensive application does not fail for having many features. A lengthy CAD render does not fail because it takes more than 100 milliseconds.

**Minimum reproducibility:** Record test steps, expected behavior, observed behavior, relevant environment, and repeatability limits whenever tests are performed. Explicitly mark documentation-only checks as documentation review rather than hands-on testing.

## 7. Evidence, sufficiency, confidence, and uncertainty

An evaluation is credible only if readers can distinguish tested behavior from claims.

### Evidence categories

1. **Direct observation:** A documented test performed on the identified version and deployment, with reproducible steps, output, and results.
2. **Independent corroboration:** Credible third-party technical analysis, specifications, or repeatable examinations, with scope and date recorded.
3. **Vendor or maintainer declaration:** Manuals, marketing claims, terms, or statements. These establish what is claimed; they do not automatically verify behavior.
4. **Inference:** An explicitly reasoned conclusion based on disclosed premises; mark it as inference rather than measurement.

### Required evidence record

For each consequential claim or finding, record, as applicable:

- Claim or question being evaluated.
- Product version, platform, deployment model, relevant settings, and evaluation date.
- Evidence category and exact source or reproducible test steps.
- Actual observation, including export/restoration results where relevant.
- Affected information, functionality, and use-case scope.
- Limitations, unknowns, contradictory results, and any assumptions.
- Confidence: **High**, **Medium**, or **Low**, with a short rationale.

There is **no minimum character count** that turns an observation into adequate evidence. A ten-character statement is not a verification standard.

**High confidence** generally requires direct reproducible testing or robust independent corroboration. **Medium confidence** can support a qualified determination if the evidence is concrete, sufficiently comprehensive, and its limitations disclosed. **Low confidence** alone cannot establish an eligibility Pass, eligibility Fail, or final favorable determination. Unsubstantiated allegations must not be treated as verified failures.

### Sufficiency decision

Evidence is sufficient for a final determination when every applicable requirement and principle has a supported decision, material counterevidence has been considered, and the findings are internally consistent. Evidence should match the material risks and scope: a financial application requires stronger scrutiny of authorization and recovery than a simple static document viewer.

Independent review is encouraged, and disagreement should be recorded rather than concealed. The assessor must state whether an audit was independent, commissioned, or self-performed.

Some assessments will necessarily remain partial or end in **Insufficient evidence**, especially when exports, restoration, migration, or consequential behavior cannot be tested directly. That is an honest result, not a defect in the framework; the scope and confidence limits should be reported rather than inferred away.

## 8. Contextual interpretation and boundaries

**Managed services:** A service does not fail automatically for being hosted by someone else. Assess actual exit, recovery, custody, permission, and locality constraints. If essential functionality relies on imposed remote control, record the limitation rather than granting a blanket pass.

**Inherently networked functions:** Remote communication may be integral to the task. Evaluate offline capabilities that reasonably exist, not impossible offline substitutes for remote collaboration.

**Security and privacy:** Security supports meaningful control, but this is not a penetration test or complete privacy assessment. A finding of alignment must never be presented as assurance against vulnerabilities, breaches, or unsafe operation.

**Encryption:** User-held keys can support sovereignty, but poorly designed key custody can harm recoverability. Document risks and feasible recovery mechanisms without insisting on a single technical design.

**Open source and open formats:** Both can help, neither automatically proves sovereignty. Practical access, documented recovery, and usable alternatives matter more than labels.

**AI and consequential changes:** AI use is not disqualifying. Evaluate authorization boundaries, clarity about uncertainty, inspection, correction, and the ability to preserve data and outputs independently of an AI provider.

**Accessibility and responsiveness:** These are important quality obligations, but not core sovereignty tests. Their omission from the core score does not mean they are unimportant to product selection.

**Acceptable loss and feasibility:** “Unacceptable loss” must be judged against a declared use case. A migration that preserves essential text but loses critical numerical units or audit records may be unacceptable; loss of inconsequential UI preferences may not be.

## 9. Versioning, publication, and reassessment

An assessment identifies its **product version, platform, deployment model, configuration, assessment date, and methodology version**. Hosted and self-hosted versions of the same product may receive different determinations.

An entry should contain structured requirement statuses, principle findings, evidence records, limitations, and confidence. The overall determination should be **computed from those facts**, not manually asserted in a conflicting field. Reviewers should validate completeness and consistency before publishing.

Reassess when the product meaningfully changes, especially following major version releases, altered hosting/licensing terms, changes in export or encryption behavior, service discontinuation, or materially new evidence. Consider annual review as a useful **review trigger**, not an automatic expiry or arbitrary declaration of failure.

**Historical integrity:** Framework v1.0 used seven equal pass/fail tests; v2.0 used six weighted principles and tier thresholds; v3.0 introduced four unweighted principles and evidence-led determinations. This **v3.1 revision** clarifies the fourth principle as *Transparency and Control*, separates complete principle failure from partial alignment, specifies eligibility/Not Applicable handling, strengthens evidential standards, and corrects example logic. Do not silently convert v1.0 or v2.0 classifications into v3.1 outcomes. Preserve legacy assessments with their original framework version.

## 10. Worked examples

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

This illustrates why a complete failure of a foundational principle cannot be called merely *Partially aligned*, even when none of the narrower eligibility gates fails. Evaluators must scrutinize this example for overlap with E4 and explain why the revocable license does not prevent control over already-created work in the defined scope.

## 11. Limits and governance of the methodology

This is a **proposed normative framework**, not a scientific measurement scale. Its concepts and thresholds are open to reasoned criticism and revision. Different experts may judge evidence and materiality differently. A simple categorical result cannot convey every relevant trade-off; always publish the evidence and complete principle profile alongside the determination.

The framework does **not** establish comprehensive security, privacy, functional correctness, performance, legal compliance, or fitness-for-purpose certification. It should not be used to recommend a product without also considering those domains separately.

Assessors should disclose conflicts of interest, allow factual corrections, retain assessment history, and avoid presenting vendor claims as directly verified facts. No numeric score or badge should imply scientific precision or accreditation.

**Final standard:** The user should retain meaningful authority over their work, the information and its meaning should endure, avoidable dependencies should be minimized, and consequential software behavior should remain governable. The framework judges these claims through explicit, verifiable evidence, not convenience, branding, or arithmetic.

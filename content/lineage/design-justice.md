+++
title = "Design Justice and Collective Governance"
description = "How Sasha Costanza-Chock's Design Justice framework challenges individualistic assumptions in technology design, and how this critique directly motivated Sovereign Software's Perspective Roles and Shared Governance rules."
weight = 7
period = "2015–Present (MIT Press 2020)"
proponents = "Sasha Costanza-Chock and the Design Justice Network"
overlap = "Moderate"
principles = ["Sovereignty", "Transparency and Control"]
framework_links = ["E4", "E5", "T4", "T5"]
stance = "Design Justice exposed one of the most important blind spots in early drafts of our manifesto: 'the user' is not always a single autonomous individual. In multi-user and institutional systems, one participant's unilateral control can conflict with another participant's rights or audit integrity. This directly led us to introduce Perspective Roles and accountable shared governance rules."
+++

## 1. Historical context and core thesis

Developed by the Design Justice Network (founded in 2015–2018) and articulated in Sasha Costanza-Chock's 2020 book *"Design Justice: Community-Led Practices to Build the Worlds We Need"* (MIT Press), **Design Justice** examines how the design of socio-technical systems distributes benefits, burdens, and decision-making power across communities.

While traditional "user-centered design" and libertarian software philosophies often imagine an abstract, solitary, technically self-sufficient "user" interacting with a tool in isolation, Design Justice argues that technology operates within real social hierarchies, institutions, and communities:

1. **Accountability to affected communities over designer intentions:** A system cannot be judged sovereign or liberating merely because its architects declared noble intentions; it must be evaluated by the concrete power and recourse held by the people whose work and lives are mediated by it.
2. **Recognizing power asymmetries and competing stakeholders:** In any shared socio-technical system - a hospital record system, a university research repository, a collaborative workspace, or a community platform - different participants (administrators, contributors, patients, students, moderators) occupy different positions of power.
3. **Contestability and participatory governance:** Technical systems that enforce rules over groups of people must make those rules visible, auditable, and open to community governance and contestation rather than burying policy choices inside unchallengeable code.

## 2. Where Sovereign Software agrees (shared foundation)

At first glance, a community-centered socio-technical framework like Design Justice might seem distant from a technical evaluation methodology for file formats, offline execution, and backup recovery. Yet two core principles connect them directly:

- **Judging concrete power and recourse rather than declared intentions (`Principle I & IV`):** Just as Design Justice rejects evaluating designs by their creators' marketing promises, Sovereign Software rejects evaluating software by vendor declarations or ideological labels (`Methodology Section 7`). What matters is verifiable agency and recourse (`E5`, `T4`).
- **Contestability of consequential decisions (`Requirement E5`):** When software mediates consequential actions - such as automated moderation, access revocation, or record modification - affected users must be able to understand the rules, inspect the audit trail, and contest or reverse erroneous outcomes.

## 3. Where we stand and why we diverge (our motive)

Why is Design Justice so important to the intellectual evolution of Sovereign Software? Because **it forced us to confront and solve a major philosophical weakness in individualistic definitions of software sovereignty.**

### 3.1 The problem of "the user" in shared and multi-user software

Early versions of local-first and personal-sovereignty manifestos (including earlier drafts of our own work) spoke almost exclusively about **"the user"** in the singular: *the user owns the data; the user can delete or modify any record at any time; no one can restrict what the user does.*

That individualistic model works cleanly for a personal notebook, a single-user calculator, or a personal password vault. However, it breaks down immediately when software mediates **shared work or institutional accountability**:

- In a **university research laboratory**, can a departing team member unilaterally purge raw experimental data that is required to verify a published scientific paper?
- In a **shared financial or medical ledger**, if any single participant can silently rewrite or delete historical audit logs, does that increase sovereignty, or does it destroy the integrity and trustworthiness of the record for everyone else?
- In a **collaborative Git forge or messaging workspace**, how do we distinguish *legitimate collective governance* (such as append-only audit trails, role-based access control, or safety moderation) from *illegitimate vendor lock-in*?

### 3.2 How we resolved this tension in the Sovereign Software Framework

While Design Justice approaches technology through broad political and community-organizing lenses rather than software-engineering verification tests, its critique of the monolithic "user" directly motivated **two structural additions to the Sovereign Software Framework** (`Manifesto Section 03: Shared work and legitimate governance` and `Methodology Section 1, 8, and 10`):

1. **Mandatory Perspective Role Declaration (`Methodology Section 1`):** An evaluation of multi-user or institutional software cannot assign a single undifferentiated verdict without first declaring **whose authority is being evaluated**:
   - *Individual user*
   - *Project contributor*
   - *Workspace collaborator*
   - *Institutional custodian*
2. **Distinguishing Individual Exit from Collective Governance (`Methodology Section 8 & 10`):** Our methodology establishes a clear normative rule:
   - Every individual contributor must retain the practical ability to retrieve and exit with a copy of their own authored contributions and attribution history (`E1–E3`);
   - However, shared constraints that prevent an individual from unilaterally destroying collective records or bypassing audit logs **do not violate sovereignty** when four conditions hold: the governance rules are *(a) documented before use*, *(b) visible to participants*, *(c) recorded in an inspectable audit trail*, and *(d) open to contestation or appeal*, and the *community or institution as a whole* retains full exit and self-hosting authority free of vendor lock-in (`E1–E5`).

## 4. Concrete architectural contrasts and boundary cases

| Scenario | Naive Individualistic "Sovereignty" View | Sovereign Software Verdict (with Perspective Roles) |
|---|---|---|
| **University research repository (`Forgejo` / `Git` / `Zotero` group) with append-only audit logs and regulatory retention holds, where any researcher can export full local copies** | Ambiguous or falsely penalized because an individual researcher cannot unilaterally erase committed laboratory history on the shared server. | **Meets Core Requirements across both perspectives:** From the *Project contributor* perspective, full independent retrieval and exit (`E1–E3`) pass; from the *Institutional custodian* perspective, full self-hosting, backup, and vendor-independent recovery (`E1–E5`) pass, and retention rules are transparent and auditable (`E5`). |
| **Corporate SaaS collaboration platform where neither individual contributors nor the subscribing organization can export complete project history, comments, and audit logs** | Fails user control. | **Fails fundamental requirements (`E1–E3` Fail) under every perspective role:** Neither the individual nor the institution holds custody; the vendor holds both hostage. |
| **Platform with opaque, unlogged automated moderation or administrative lockouts with no export of already-created work and no appeal mechanism** | Violates both Design Justice accountability and user sovereignty. | **Fails `E1`, `E4`, and `E5`:** Even when collective rules restrict participation, revoking access to a user's already-created work without export or transparent recourse fails fundamental eligibility. |

## 5. How this shapes the evaluation methodology

1. **`perspective_role` in Index Entries (`scripts/entries.js` & `layouts/directory/single.html`):** Every assessed entry in the Sovereign Index declares its perspective role in Section 2 (*Version and scope assessed*) so readers know immediately whether the assessment evaluates a solo desktop user, a repository contributor, or an institutional custodian.
2. **Case Note on Shared Governance (`Methodology Section 10`):** Provides a permanent worked reference illustrating how evaluators resolve retention and governance conflicts between individual contributors and institutional custodians without conflating accountable shared rules with vendor lock-in.

## 6. Primary sources and further reading

- S. Costanza-Chock, *Design Justice: Community-Led Practices to Build the Worlds We Need*, Cambridge, MA: MIT Press, 2020. https://designjustice.mitpress.mit.edu/
- Design Justice Network, "Design Justice Network Principles," 2018. https://designjustice.org/read-the-principles
- E. Ostrom, *Governing the Commons: The Evolution of Institutions for Collective Action*, Cambridge University Press, 1990. https://doi.org/10.1017/CBO9780511807763

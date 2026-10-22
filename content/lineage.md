+++
title = "Lineage and Related Work"
description = "The ideas behind Sovereign Software are older than this framework. Where it agrees with earlier movements, where it differs, and what it proposes to add."
weight = 6
+++

Every foundational principle in this framework has a substantial precedent. This page records those precedents so that readers can judge what the framework adds, rather than mistaking a synthesis for an invention.

Each entry states what the earlier work argues, where this framework agrees, and where it differs. These are reasoned comparisons, not measured similarity scores.

## Where the four principles come from

| Principle | Most direct precedents |
| --- | --- |
| **Sovereignty** | Free software, MyData, IndieWeb, Solid |
| **Longevity** | Digital preservation (Library of Congress, OAIS), permacomputing, local-first software |
| **Locality** | Local-first software, permacomputing, free software |
| **Transparency and Control** | Free software, NIST AI risk management, MyData |

What we have not found in this initial review is an existing framework that combines four architecture-neutral principles, minimum eligibility requirements that cannot be offset by other strengths, and an evidence-led evaluation procedure. That is an observation from a limited source review, not proof that none exists; a systematic literature search is part of the research roadmap below.

## The movements, one by one

### Local-first software (2019)

**Argues:** People should get the collaboration benefits of cloud software without giving up ownership of their data. It sets out seven ideals, including offline work, longevity, privacy, and user control, and develops the synchronization techniques (such as CRDTs) to achieve them.

**Agrees:** Ownership, offline capability, longevity, and the view that cloud convenience should not require permanent dependence. This is the closest predecessor.

**Differs:** Local-first is a design paradigm centred on data synchronization. This framework is architecture-neutral, allows a managed service to qualify if exit and recovery are real, and adds an explicit assessment of consequential actions and eligibility failures.

### Free software (GNU, 1980s onward)

**Argues:** Users should control the software, not the other way round. That requires four freedoms: to run, study, change, and redistribute it.

**Agrees:** Authority belongs to the user, and remote services can remove that authority.

**Differs:** This framework judges practical control over information and essential work, and does not make a free licence an absolute condition. A proprietary program that works offline, exports complete data in documented formats, and needs no vendor permission may align more closely than a free program whose records are trapped in one operator's service. The open question, which the framework must still answer, is where operational independence can stand in for software freedom and where it cannot, for example when continuing the work requires patching or adapting the software after its vendor has gone.

### IndieWeb

**Argues:** Own your identity, content, and data on your own domain. Its POSSE practice (publish on your own site, syndicate elsewhere) lets people use external platforms without giving them primary custody of their work.

**Agrees:** External services are acceptable when they do not remove the user's authority.

**Differs:** IndieWeb concentrates on publishing and identity on the web. This framework applies comparable principles to all kinds of software.

### Solid

**Argues:** Separate applications from the data they use. People keep their data in personal stores (Pods) and grant applications access through standard protocols and permissions.

**Agrees:** The architecture section's separation of execution, preservation, and exchange. Solid is a concrete attempt at part of that separation.

**Differs:** Solid is an architecture; adopting it does not by itself show that users keep control. Service continuity, implementation quality, and actual control must still be assessed.

### Permacomputing

**Argues:** Computing should remain useful under changing technical, environmental, and social conditions. Avoid fragile dependencies, prefer mature and understandable technology, and use open standards.

**Agrees:** Longevity, resistance to unnecessary dependencies, and design for survival through change.

**Differs:** Permacomputing is broader, including ecological limits. This framework narrows the concern to whether people keep authority over their work, and makes longevity a required part of evaluating ordinary applications.

### MyData

**Argues:** People should have practical, not merely formal, control over personal data, including access, portability, and transparency about its use, in an ecosystem that does not force a choice between services and control.

**Agrees:** Individual control, informed authorization, and technology neutrality.

**Differs:** MyData focuses on personal data held by organizations. This framework also asks whether people can keep doing essential work and preserve functional capability, not only obtain their data.

### Digital preservation: Library of Congress and OAIS

**Argues:** The Library of Congress assesses digital formats against sustainability factors including disclosure, adoption, transparency, self-documentation, external dependencies, patents, and technical protection. The OAIS reference model (ISO 14721) defines the responsibilities of keeping information understandable to a future community, not just keeping the bits.

**Agrees:** Information should outlive the software that made it, and stored files are not enough without the knowledge needed to interpret them.

**Differs:** Preservation practice is mostly applied by archives after the fact. This framework asks the same questions of everyday applications while they are in use. Its Longevity principle should be read as building on this literature rather than as an original intuition.

### NIST AI Risk Management Framework

**Argues:** Trustworthy AI is valid and reliable, safe, secure and resilient, accountable and transparent, explainable and interpretable, privacy-enhanced, and fair, managed in context.

**Agrees:** Transparency, accountability, and human oversight of consequential operations.

**Differs:** This framework's distinctive concern is treating an AI service as a dependency that can be withdrawn from human work, not only as a source of unreliable output.

### Interoperability and privacy (EFF)

**Argues:** Interoperability and privacy support each other. Lock-in lets dominant platforms set terms; the ability to leave, with one's data and connections, is both an escape route and a discipline on providers.

**Agrees:** Practicable exit is central to user authority.

**Differs:** The EFF paper is a policy analysis. This framework turns exit into an evaluation requirement for individual products.

### Design Justice

**Argues:** Design should centre the people most affected by it, and be accountable to communities rather than to designers' intentions.

**Agrees:** Authority and accountability matter more than stated intentions.

**Differs:** It addresses something this framework has not yet worked out: software used by many people with competing rights. Shared governance is an open item on the roadmap.

## Research roadmap

The framework's claim to add something must be shown, not asserted. Three pieces of work would test it:

1. **A comparative paper** that defines sovereignty precisely, compares the traditions above, and addresses the two hardest open questions: the relationship between software freedom and practical control, and conflicts between users of shared systems.
2. **A reproducible evaluation method** with declared essential scope, evidence records, fixed decision rules, and a record of disagreement between independent assessors.
3. **A comparative study** of free, proprietary, local, and cloud software, testing whether the framework draws useful distinctions that licensing, privacy, portability, and local-first criteria alone do not.

## Sources

- M. Kleppmann, A. Wiggins, P. van Hardenberg, and M. McGranaghan, "Local-first software: you own your data, in spite of the cloud," *Onward!*, 2019. https://doi.org/10.1145/3359591.3359737
- Free Software Foundation, "What is Free Software?" GNU Project. https://www.gnu.org/philosophy/free-sw.html
- IndieWeb, "Principles." https://indieweb.org/principles, and "POSSE." https://indieweb.org/POSSE
- Solid Project, "About Solid." https://solidproject.org/about
- Permacomputing, "Principles." https://permacomputing.net/principles/
- MyData Global, "Declaration of MyData Principles." https://mydata.org/participate/declaration/
- Library of Congress, "Sustainability of Digital Formats: Sustainability Factors." https://www.loc.gov/preservation/digital/formats/sustain/sustain.shtml
- ISO 14721:2025, *Space data and information transfer systems: Open archival information system (OAIS), Reference model*, third edition (published by CCSDS as 650.0-M-3).
- National Institute of Standards and Technology, *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, NIST AI 100-1, 2023. https://doi.org/10.6028/NIST.AI.100-1
- B. Cyphers and C. Doctorow, *Privacy Without Monopoly: Data Protection and Interoperability*, Electronic Frontier Foundation, 2021. https://www.eff.org/wp/interoperability-and-privacy
- S. Costanza-Chock, *Design Justice: Community-Led Practices to Build the Worlds We Need*, MIT Press, 2020. https://designjustice.mitpress.mit.edu/

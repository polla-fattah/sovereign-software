+++
title = "The Solid Project (Decentralized Data Pods)"
description = "How Tim Berners-Lee's Solid specification separates application execution from personal data stores (Pods), and why Sovereign Software treats Pod separation as an architectural candidate that must still pass empirical recovery and continuity tests."
weight = 6
period = "2015–Present"
proponents = "Sir Tim Berners-Lee, MIT Decentralized Information Group, W3C Solid Community Group"
overlap = "High"
principles = ["Sovereignty", "Longevity", "Transparency and Control"]
framework_links = ["E1", "E2", "E3", "E4", "E5", "T1", "T4", "T6"]
stance = "Solid is a direct architectural precedent for separating execution from preservation and exchange. We stand for evaluating whether a Pod-based or decoupled system actually delivers independent recovery, schema longevity, and offline continuity in practice, rather than assuming protocol compliance guarantees user sovereignty."
+++

## 1. Historical context and core thesis

Launched around 2015 by World Wide Web inventor Sir Tim Berners-Lee at the Massachusetts Institute of Technology (MIT) and developed through the W3C Solid Community Group, **Solid** (Social Linked Data) is an ambitious architectural effort to re-decentralize the web.

Berners-Lee observed that the web's original read-write vision had collapsed into centralized data silos because web applications bundled **application logic (execution)** together with **database storage (custody)**. Whenever a user wanted to use a new calendar, social network, health tracker, or document editor, they had to open a new account and hand their data over to that vendor's isolated database.

Solid proposes a structural separation based on open W3C standards:

1. **True data ownership via Personal Online Datastores (Pods):** Users store their structured and unstructured data in personal containers called **Pods**. A Pod can be self-hosted on a personal server or hosted by a Pod provider of the user's choice, and users can move their Pod between providers.
2. **Decoupling applications from storage:** Applications do not own databases of user records. Instead, users authenticate via **Solid-OIDC** (using a decentralized `WebID` URI) and grant specific client applications read or write access to designated resources inside their Pod.
3. **Interoperability through Linked Data (RDF):** By representing structured records using the Resource Description Framework (RDF) and Linked Data Platform (LDP) conventions, different applications (for example, a contact manager, a calendar app, and a project tracker) can operate on the *same* underlying data without vendor-specific API integrations.
4. **Granular, revocable access control:** Through Web Access Control (WAC) or Access Control Policy (ACP), the user defines fine-grained permissions specifying which people, groups, or applications may read, append, or modify specific containers in their Pod, and can revoke that access at any moment.

## 2. Where Sovereign Software agrees (shared foundation)

Solid is the closest architectural cousin to **Section 03 of the Sovereign Software Manifesto (*The Sovereign Architecture*)**:

- **Separating execution, preservation, and exchange:** In Section 03 of the Manifesto, we argue that sovereign systems should separate *execution* (the transient runtime or UI), *preservation* (durable, user-controlled storage), and *exchange* (open protocols and documented formats). Solid is a concrete, standards-based attempt to engineer that exact three-way separation on the web.
- **Revocable application permissions (Principle I & IV):** Solid's model - where an application operates as a guest inside the user's data store with explicitly granted, revocable permissions - directly embodies our requirements for **Sovereignty (`E4`)** and **Transparency and Control (`E5`)**.
- **Provider replaceability (`E2` & `T6`):** Solid's goal that two different applications should be able to read and write the same user records without lock-in aligns directly with our requirement for practicable exit and interoperability.

## 3. Where we stand and why we diverge (our motive)

Why not simply equate Sovereign Software with building on Solid Pods? Our divergence is both **architectural** and **methodological**:

### 3.1 Protocol compliance does not guarantee practical sovereignty

Solid defines a specific family of web protocols (LDP, RDF, Solid-OIDC, WAC/ACP). However, an application built on Solid can still fail user sovereignty in practice:

- **Hosted Pod dependency and offline failure (`Principle III: Locality`):** Because standard Solid Pods are HTTP/LDP servers ("Personal *Online* Datastores"), many Solid applications require continuous network connectivity to a remote Pod server to read or write records. If the network drops or the hosted Pod provider goes offline before the user has mirrored their Pod locally, essential local capabilities fail (`T3`, `E4`).
- **Schema fragmentation and semantic lock-in (`Principle II: Longevity` & `E3`):** Storing data in RDF triples does not automatically make it intelligible to another application. If a Solid app invents bespoke, poorly documented ontologies or stores opaque JSON/binary blobs inside a Pod container, no independent application can meaningfully reconstruct the user's workflow (`E2`, `E3`).
- **Execution continuity when the client app disappears (`E4`, `T6`):** Even if raw RDF triples remain in a user's Pod, if the complex client application that interprets and manipulates those triples is abandoned or hosted only on a vendor's domain, the user loses functional capability.

### 3.2 Simple local filesystems already separate storage from execution

Solid attempts to recreate on the web a separation that **POSIX filesystems and plain local directories** have provided on personal computers for fifty years. When a user keeps a folder of Markdown notes, BibTeX files, or C source files on their local disk and opens that folder simultaneously in Vim, Ripgrep, Git, and Obsidian, execution is already decoupled from storage - without needing an HTTP server, OIDC token exchange, or RDF triple serialization.

**Where we stand:** Sovereign Software endorses the **architectural principle** of decoupling execution from preservation and exchange, whether achieved through a local directory of open files, a Git repository, a SQLite database, or a Solid Pod. We evaluate every implementation empirically through `E1–E5` and `T1–T7` rather than prescribing RDF/Solid as the mandatory technical stack.

## 4. Concrete architectural contrasts and boundary cases

| Scenario | Solid Architecture View | Sovereign Software Verdict |
|---|---|---|
| **Cloud-hosted Solid Pod with a web-only client app and no local Pod mirror** | Compliant Solid deployment (execution and storage are separated across HTTP via Solid-OIDC and LDP). | **At risk on Locality (`T3`) and E4:** Unless the user maintains an automated local replica of the Pod and a locally runnable copy of the client application, provider withdrawal of the Pod host or app host disrupts immediate access to work. |
| **Local directory of plain files (`.md`, `.bib`, `.ledger`) edited by multiple independent desktop tools** | Not a Solid system (uses local filesystem paths rather than WebIDs, HTTP LDP, and RDF). | **Exemplary Sovereign Architecture:** Achieves the exact separation of execution, preservation, and exchange that Solid seeks, with full offline Locality (`T3`) and zero network protocol overhead. |
| **Self-hosted or locally synced Solid Pod with documented vocabularies and multiple independent clients** | Ideal Solid deployment. | **Meets the proposed core requirements** (when verified via `T1–T6`): combines decoupled network storage, granular authorization (`E5`), and verified cross-client portability (`E2`). |

## 5. How this shapes the evaluation methodology

1. **Testing decoupled storage claims (`T1`, `T2`, `T6`):** Whenever an application claims that user data is stored in an "open Pod", "decoupled database", or "user bucket", evaluators run `T1` and `T2` to verify whether a second, independent tool can actually parse the schema and restore the workflow without the original vendor's client code.
2. **Evaluating authorization and access revocation (`E4`, `E5`, `T4`, `T5`):** Solid's Access Control Policy model informs how we test multi-application and multi-user permissions in `T4` and `T5`: can the user inspect which external services hold read/write access to their records, and revoke that access immediately without losing their own custody?

## 6. Primary sources and further reading

- Solid Project, "About Solid." https://solidproject.org/about
- Solid Project, "Solid Technical Reports and Specifications" (Solid Protocol, Solid-OIDC, Web Access Control, Access Control Policy). https://solidproject.org/TR/
- E. Mansour et al., "A Demonstration of the Solid Platform for Social Web Applications," *Proceedings of the 25th International Conference Companion on World Wide Web (WWW '16 Companion)*, pp. 223–226, 2016. https://doi.org/10.1145/2872518.2890529
- R. Verborgh, "Re-decentralizing the Web, for good this time," in *Linking the World's Information: Essays on Tim Berners-Lee's Invention of the World Wide Web*, ACM, pp. 215–230, 2023. https://doi.org/10.1145/3591366.3591385

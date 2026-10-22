+++
title = "Local-first Software"
description = "How Ink & Switch's 2019 formulation of local-first computing established the modern case for data ownership and offline work, and why Sovereign Software generalizes those ideals into an architecture-neutral verification framework."
weight = 8
period = "2019–Present"
proponents = "Martin Kleppmann, Adam Wiggins, Peter van Hardenberg, Mark McGranaghan (Ink & Switch)"
overlap = "Very high"
principles = ["Sovereignty", "Longevity", "Locality"]
framework_links = ["E1", "E2", "E3", "E4", "T1", "T2", "T3"]
stance = "Local-first is our closest technical relative, but it is a specific synchronization and storage architecture. We stand for evaluating practical user authority across all architectures, and we add explicit governance of consequential actions (Principle IV / E5) and non-compensatory eligibility gates."
+++

## 1. Historical context and core thesis

Published at ACM *Onward!* in October 2019 by Martin Kleppmann, Adam Wiggins, Peter van Hardenberg, and Mark McGranaghan from the industrial research lab Ink & Switch, *"Local-first software: you own your data, in spite of the cloud"* diagnosed a central paradox of modern computing. Cloud applications (such as Google Docs, Figma, and Trello) made multi-device access and real-time collaboration effortless, but they achieved this by centralizing primary data custody on vendor servers. In doing so, they stripped users of the ownership, offline reliability, and long-term durability that traditional local-file applications once provided by default.

Kleppmann and his co-authors argued that users should not be forced to choose between the collaborative convenience of cloud apps and the personal ownership of classic desktop files. They defined **seven ideals for local-first software**:

1. **No spinners: your work at your fingertips.** Because primary data resides on the local storage medium in memory or on disk, read and write operations happen immediately without waiting for a network round-trip.
2. **Your work is not trapped on one device.** Local storage must not mean single-device isolation; data should synchronize seamlessly across a user's laptop, phone, and tablet.
3. **The network is optional.** Full reading, editing, and creation work offline without degradation, synchronizing when connectivity returns.
4. **Seamless collaboration with your colleagues.** Multiple users can work on shared documents concurrently without manual file-locking or merge headaches.
5. **The Long Now.** Data should remain readable and usable decades later, even if the original software vendor shuts down or stops running servers.
6. **Security and privacy by default.** Because no central server holds the authoritative plaintext database of all users, end-to-end encryption becomes natural.
7. **You retain ultimate ownership and control.** The user's copy on local disk is the authoritative record; no company can unilaterally revoke access, censor files, or hold work hostage behind a subscription wall.

To realize these seven ideals simultaneously, the 2019 paper focused heavily on foundational distributed systems research, particularly **Conflict-free Replicated Data Types (CRDTs)** such as Automerge and Yjs, combined with peer-to-peer or relay-assisted synchronization protocols.

## 2. Where Sovereign Software agrees (shared foundation)

Local-first Software is the single closest intellectual predecessor to the Sovereign Software Manifesto. Three of our four foundational principles directly share its core intuition:

- **Primary custody over convenience traps:** We agree completely that cloud convenience should never require surrendering permanent custody of one's work (**Principle I: Sovereignty**).
- **The Long Now and Principle II (Longevity):** Our concept of *Data longevity* and *Knowledge longevity* echoes Kleppmann et al.'s fifth ideal (*The Long Now*): software is ephemeral, vendors fail, and data formats must survive the disappearance of the company that created them.
- **Network optionality and Principle III (Locality):** Our third principle directly incorporates the local-first insight that capabilities suitable for user-controlled hardware should not depend unnecessarily on continuous remote connectivity.

## 3. Where we stand and why we diverge (our motive)

If Local-first Software already articulated ownership, longevity, and offline capability so well, why propose Sovereign Software at all? Our motive stems from **three structural limitations** we observed when trying to use the 2019 local-first ideals as a general standard for evaluating software:

### 3.1 Architecture neutrality vs. synchronization paradigm

Local-first is primarily a **design and synchronization paradigm** built around replicated local state (often CRDTs or local SQLite replicas synced over relays). However, many critical software domains are either inherently single-node (such as a compiler, a local CAD kernel, or a disk encryption tool) or legitimately client-server / institutional (such as a self-hosted Git forge, a shared laboratory database, or a federated messaging server).

Conversely, calling an application "local-first" because it uses a local IndexedDB cache or a CRDT engine does **not** guarantee user sovereignty. Several commercial applications marketed as "local-first" keep an encrypted or proprietary binary replica on the device that can only be decoded by the vendor's closed client, require periodic online account re-authentication to open the app, or lock synchronization to a mandatory proprietary relay server.

**Where we stand:** Sovereign Software is **architecture-neutral**. We do not care whether an application uses CRDTs, POSIX files, a relational database, or a client-server architecture. We evaluate whether the system satisfies five falsifiable eligibility requirements (`E1–E5`) when the provider withdraws cooperation.

### 3.2 Governance of consequential behavior (Principle IV and E5)

The 2019 local-first essay was written before the widespread integration of autonomous agents, background cloud telemetry, and generative AI into everyday authoring and engineering tools. A program can store 100% of its files locally and work offline, yet still silently transmit sensitive context to third-party APIs, execute opaque automated modifications to a user's project, or lack audit trails and rollback mechanisms for destructive actions.

**Where we stand:** Data custody and offline sync are necessary but insufficient. Our fourth principle (**Transparency and Control**) and fifth fundamental requirement (**E5: Governability of consequential actions**) make operational inspectability, proportionate authorization, and recourse first-class requirements alongside data ownership.

### 3.3 Separating performance polish from fundamental sovereignty

Kleppmann et al.'s Ideal 1 (*"No spinners: your work at your fingertips"*) treats sub-frame local responsiveness as a foundational ideal alongside ownership and longevity. In earlier drafts of our own work, we made a similar mistake by treating responsiveness as a core gate.

**Where we stand:** In Framework v3.1, we deliberately separated **T7 (Human experience and performance)** from core eligibility. A heavy scientific computing environment or a parametric CAD modeller (such as FreeCAD or QGIS) may take seconds to recompute a complex geometry tree, yet preserve complete user sovereignty, whereas an instantaneous web app with zero spinners may completely lock in the user's work. Speed is a supporting software quality, never a substitute for or gate on user authority.

## 4. Concrete architectural contrasts and boundary cases

| Scenario | Assessment under 2019 Local-first Ideals | Assessment under Sovereign Software |
|---|---|---|
| **Case 1: Proprietary CRDT app with mandatory vendor account login**<br>Stores an offline CRDT database in browser storage and edits with zero latency, but locks the UI if the subscription lapses and exports only lossy PDFs. | Satisfies Ideals 1, 2, 3, and 4 (fast, multi-device, offline-capable, collaborative), Failing Ideals 5 and 7 in Kleppmann's qualitative table. | **Fails a fundamental requirement** (`E1`, `E2`, `E3`, and `E4` Fail). Fast local caching and CRDT sync cannot offset the inability to retrieve, interpret, and continue operating on existing work after vendor withdrawal. |
| **Case 2: Heavy local engineering tool without built-in cloud sync**<br>Stores documented archives on local disk, works 100% offline, exports standard STEP/XML, has slow recomputation on large assemblies and relies on external Git/Syncthing for multi-device sync. | Weak on Ideal 1 (no spinners), Ideal 2 (built-in multi-device sync), and Ideal 4 (real-time collaboration). | **Meets the proposed core requirements** (assuming `E1–E5` and `T1–T6` pass). Delegating synchronization to independent user-chosen transports (`Syncthing`, `Git`) is recognized as an architectural strength (Section 05 of the Manifesto), not a deficiency. |
| **Case 3: Self-hosted / federated server with full repository portability**<br>Requires a network connection to coordinate a distributed team, but allows any contributor or institution to export the complete dataset, audit log, and metadata and switch hosts at will. | Outside the strict "local-first client" category because primary team coordination occurs on a server. | **Meets** or **Partially aligned** depending on declared perspective role and dependency replaceability (`T3`). Inherent network coordination is not penalized when exit (`E2`) and replaceability are real. |

## 5. How this shapes the evaluation methodology

1. **Provider-withdrawal testing (`T1`, `T3`, `T5`):** We operationalize Kleppmann et al.'s *"The Long Now"* and *"You retain ultimate ownership"* by requiring evaluators to sever network access to vendor domains and test whether existing data can be extracted (`E1`), migrated (`E2`), restored on a clean machine (`E3`), and operated on without fresh vendor permission (`E4`).
2. **Decoupling execution, preservation, and exchange:** Rather than requiring every application to build its own real-time sync engine, our methodology rewards applications that store records in clean, documented substrates on disk and allow users to bring their own synchronization and backup tools.
3. **Domain Preservation Profiles (`Section 1 of the methodology`):** Where the 2019 essay evaluates ideals with broad qualitative dots (full/half/empty circles), our methodology requires evaluators to test preservation against explicit domain checklists (for example, verifying that internal wikilinks and front-matter metadata survive in `knowledge_notes`, or that commit DAGs and cryptographic hashes survive in `vcs_core`).

## 6. Primary sources and further reading

- M. Kleppmann, A. Wiggins, P. van Hardenberg, and M. McGranaghan, "Local-first software: you own your data, in spite of the cloud," *Proceedings of the 2019 ACM SIGPLAN International Symposium on New Ideas, New Paradigms, and Reflections on Programming and Software (Onward! '19)*, pp. 154–178, October 2019. https://doi.org/10.1145/3359591.3359737
- Ink & Switch, "Local-first software: you own your data, in spite of the cloud" (web essay edition), 2019. https://www.inkandswitch.com/essay/local-first/
- M. Kleppmann and A. R. Beresford, "A Conflict-Free Replicated JSON Datatype," *IEEE Transactions on Parallel and Distributed Systems*, vol. 28, no. 10, pp. 2733–2746, 2017. https://doi.org/10.1109/TPDS.2017.2697382

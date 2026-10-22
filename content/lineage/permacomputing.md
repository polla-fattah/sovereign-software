+++
title = "Permacomputing"
description = "How the Permacomputing movement critiques software bloat, fragile dependency chains, and planned obsolescence, and how Sovereign Software translates long-term resilience into concrete application verification rules."
weight = 9
period = "2020–Present"
proponents = "Ville-Matias Heikkilä (viznut), Marloes de Valk, Aymeric Mansoux, Brendan Howell, Dušan Barok"
overlap = "High"
principles = ["Longevity", "Locality", "Sovereignty"]
framework_links = ["E3", "E4", "T2", "T3", "T6", "T7"]
stance = "We share Permacomputing's rejection of fragile dependency stacks, mandatory cloud tethering, and software that ages poorly. We stand for focusing those resilience insights specifically on verifiable user authority and long-term work recoverability across ordinary personal and professional software."
+++

## 1. Historical context and core thesis

Coined in 2020 by Finnish researcher and demoscene programmer Ville-Matias Heikkilä (*viznut*) and developed into a broader research and artistic community with collaborators including Marloes de Valk, Aymeric Mansoux, Brendan Howell, and Dušan Barok, **Permacomputing** applies the design ethics of ecological permaculture to computing technology.

Permacomputing observes that modern commercial and open-source software engineering operates on an extractive, short-term growth model: applications assume infinite bandwidth, constant network connectivity, rapid hardware replacement cycles, and sprawling trees of thousands of ephemeral third-party packages. As a result, a program written five years ago frequently fails to build or run today, and perfectly functional computers are rendered obsolete by bloated runtime environments and mandatory cloud APIs.

To counter this fragility, the Permacomputing community articulated a set of **design principles** for resilient computing:

1. **Care for life and Care for the chips:** Minimize energy consumption, material waste, and artificial hardware obsolescence; keep existing hardware useful for as long as physically possible.
2. **Keep it small and simple:** Resist unnecessary complexity, abstraction layers, and dependency sprawl that make systems impossible for one person or a small group to understand and repair.
3. **Design for disassembly and long-term survival:** Write software and store data using mature, well-documented, low-complexity standards (such as plain text, simple binary formats, and minimal virtual machines or POSIX interfaces) that can be reimplemented easily on future architectures.
4. **Avoid fragile external dependencies:** Treat every required network service, cloud API, and rapidly churning library ecosystem as a point of failure that will eventually break the system.
5. **Everything has a place and flexible adaptability:** Build composable tools that work within local resource constraints rather than assuming uniform hyperscale infrastructure.

## 2. Where Sovereign Software agrees (shared foundation)

Permacomputing and Sovereign Software share a deep skepticism toward the fragility of modern software stacks:

- **Resistance to fragile dependencies (Principle II: Longevity & Principle III: Locality):** When an application requires a live vendor server, an unbroken chain of cloud microservices, or a massive proprietary runtime just to open a user's notes or drawings, the user's authority is built on sand. Permacomputing's warning against fragile dependencies directly reinforces our **provider-withdrawal scenario (`Methodology Section 3`)**.
- **Simplicity and inspectability as aids to recovery (`E3`, `T2`, `T6`):** Permacomputing's preference for small, transparent, well-documented formats and composable command-line tools aligns with why tools like `Git`, `SQLite`, `Todo.txt`, and `Beancount` perform so strongly on independent interpretation and recovery (`E3`).
- **Rejecting artificial degradation (`T7`):** Both philosophies criticize software that artificially degrades local performance or forces hardware upgrades through avoidable bloat.

## 3. Where we stand and why we diverge (our motive)

While we share Permacomputing's diagnosis of software fragility, Sovereign Software has a distinct scope and evaluative purpose:

### 3.1 Ecological minimalism vs. user authority in complex professional domains

Permacomputing is a holistic **ecological, cultural, and aesthetic movement** that questions industrial computing itself, often exploring ultra-minimalist virtual machines (such as Uxn/Varvara), retrocomputing, and low-energy computational art.

By contrast, a civil engineer running finite-element structural analysis, a radiologist or GIS researcher processing multi-gigabyte spatial layers in **QGIS**, or a filmmaker editing multi-track media in **Kdenlive** or **Blender** legitimately requires large, computationally intensive software.

**Where we stand:** Sovereign Software does **not** penalize an application for being large, feature-rich, or computationally heavy (`Methodology Section 6`: *"A comprehensive application does not fail for having many features. A lengthy CAD render does not fail because it takes more than 100 milliseconds"*). Our question is not whether the software fits in 64 kilobytes of RAM, but whether **the user retains authority over their work, can run essential local workflows without external permission, and can recover and interpret their project files decades later**.

### 3.2 Turning durability philosophy into a falsifiable audit protocol

Permacomputing offers inspiring design maxims (*"keep it small"*, *"design for survival"*), but does not provide a structured evaluation protocol for auditing whether a specific version of a mainstream application (such as Zotero, FreeCAD, or GnuCash) preserves essential domain records upon exit.

**Where we stand:** Sovereign Software translates the durability ethos that Permacomputing champions into concrete, repeatable laboratory tests: **clean-machine restoration (`T2`)**, **isolated network disconnection (`T3`)**, and **domain preservation profiles (`Section 1 of the methodology`)**.

## 4. Concrete architectural contrasts and boundary cases

| Scenario | Permacomputing Perspective | Sovereign Software Perspective |
|---|---|---|
| **Minimalist plain-text CLI tool (`Todo.txt`, `Pass`, `Beancount`)** | Strong alignment: minimal dependencies, human-readable text formats, runs on decades-old hardware, easy to reimplement from scratch. | **Strong alignment:** High marks on `E1–E4`, `T1–T3`, and `T6` because simple, documented formats minimize recovery friction. |
| **Large, resource-intensive open-source workstation suite (`Blender`, `QGIS`, `LibreOffice`)** | Criticized for multi-million-line codebases, heavy hardware requirements, and complex build dependency trees. | **Eligible for Meets Core Requirements:** Complexity and hardware demands are not sovereignty failures so long as project files, exports, offline execution, and user governance pass `E1–E5` and `T1–T6`. |
| **Lightweight web wrapper around a cloud API**<br>Tiny binary size and minimal local CPU usage because all computation and storage happen on a vendor's remote server. | Rejected for total dependence on fragile remote infrastructure. | **Fails fundamental requirements (`E1–E4`) and Locality (`T3`):** Small local footprint achieved by outsourcing custody and execution to a vendor server is the opposite of sovereignty. |

## 5. How this shapes the evaluation methodology

1. **Clean-machine restoration without vendor assistance (`E3`, `T2`):** Directly echoing Permacomputing's concern for survival across technological change, `T2` requires evaluators to verify that backups and native project files can be restored and interpreted on a clean machine without relying on active vendor servers.
2. **Distinguishing inherent complexity from artificial friction (`T6`, `T7`):** Our methodology carefully separates *necessary domain complexity* (which is allowed) from *avoidable external dependency and lock-in* (which fails `Locality` or `Sovereignty`).

## 6. Primary sources and further reading

- V.-M. Heikkilä (viznut), "Permacomputing," 2020 (updated 2021). http://viznut.fi/texts-en/permacomputing.html
- Permacomputing Community Wiki, "Permacomputing Principles." https://permacomputing.net/principles/
- A. Mansoux, B. Howell, D. Barok, and V.-M. Heikkilä, "Permacomputing Aesthetics: Potential and Limits of Constraints in Computational Art, Design and Culture," *Ninth Computing within Limits 2023 (LIMITS 2023)*, June 2023. https://doi.org/10.21428/bf6fb269.6690fc2e

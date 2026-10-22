+++
title = "MyData and Human-Centric Data Governance"
description = "How the MyData movement shifts personal data governance from formal legal consent to actionable human agency, and why Sovereign Software extends beyond personal data portability to functional and workflow continuity."
weight = 5
period = "2014–Present"
proponents = "Antti Poikola, Kai Kuikkaniemi, Harri Honko, and MyData Global"
overlap = "High"
principles = ["Sovereignty", "Transparency and Control"]
framework_links = ["E1", "E2", "E5", "T1", "T4", "T6"]
stance = "We strongly agree with MyData that formal legal rights are meaningless without practical, technical agency. We stand for extending that principle from personal data held by external organizations to the preservation of functional software capabilities and intellectual work."
+++

## 1. Historical context and core thesis

Originating in a 2014–2015 white paper commissioned by the Finnish Ministry of Transport and Communications (authored by Antti Poikola, Kai Kuikkaniemi, and Harri Honko) and formalized internationally through the **Declaration of MyData Principles (2017)** and **MyData Global**, the **MyData** movement addresses the structural imbalance between individuals and organizations that collect personal data.

Traditional data-protection regimes rely heavily on formal legal consent (clicking "I Agree" on lengthy privacy notices) and statutory subject-access requests. MyData argues that legal rights on paper are ineffective unless individuals possess **practical, technical mechanisms** to inspect, govern, and reuse data about themselves across services.

The **Declaration of MyData Principles** defines six foundational shifts:

1. **Human-centric control of personal data:** Individuals should be empowered actors - not passive data subjects - with the practical means to specify how their personal data is collected, shared, and used.
2. **Individual as the point of integration:** Because a person's life spans health, finance, mobility, education, and work, the individual should be the hub where cross-sector data connects, rather than allowing a single platform monopoly to aggregate everything behind closed walls.
3. **Empowerment (from formal to actionable rights):** Legal rights such as data access, portability, and erasure (for example, under GDPR Articles 15, 17, and 20) must be transformed into one-click, automated, everyday technical capabilities.
4. **Portability: access and reuse:** People must be able to obtain their personal data in structured, machine-readable, standardized formats and move it seamlessly to competing or complementary services.
5. **Transparency and accountability:** Organizations processing data must provide clear, inspectable logs of what data is held, who has accessed it, and what automated decisions are made from it.
6. **Interoperability:** Technical standards, APIs, and semantic vocabularies must enable data to flow between providers without custom bilateral lock-in.

## 2. Where Sovereign Software agrees (shared foundation)

MyData and Sovereign Software share two foundational methodological commitments:

- **Practical agency over formal or contractual promises (Principle I: Sovereignty):** MyData's third principle (*from formal to actionable rights*) is identical in spirit to our definition of Sovereignty (`Methodology Section 2.I`): *"The relevant question is practical rather than contractual: can users access, retain, export, and move their work without a continuing grant of permission that can be withdrawn at will?"* A privacy policy or terms-of-service clause promising "you own your data" counts for nothing in our framework unless `E1` and `E2` are verified by actual export and migration tests (`T1`).
- **Inspectable authorization and accountability (Principle IV: Transparency and Control):** MyData's fifth principle directly informs how we evaluate consequential actions (`E5`, `T4`): users must be able to see what permissions are active, trace significant actions in an audit log, and revoke or contest authorizations.

## 3. Where we stand and why we diverge (our motive)

Why does Sovereign Software not simply adopt the MyData framework? Because **personal data governance** and **software sovereignty over human work** address overlapping but distinct problems:

### 3.1 From institutional personal data to authored intellectual work

MyData was designed primarily for **personal data collected by institutional service providers**: hospital medical records, bank transaction histories, telecommunications metadata, utility metering, and government registries. In those contexts, the external organization inevitably continues to exist (a hospital or bank is not replaced by a local desktop text file), and the goal is to give the citizen portable access and consent governance through data intermediaries or personal data operators.

Sovereign Software focuses on **software as an instrument of human work and thought**: codebases, engineering models, research libraries, financial ledgers, notes, and creative projects. Here, the user is not merely a "data subject" about whom an institution collects telemetry; the user is the **author and builder** of structured intellectual artifacts.

### 3.2 Data portability is not enough without functional and execution continuity

Under MyData (and statutory regimes like GDPR Article 20), an organization satisfies portability if it lets a user download a JSON or CSV dump of their personal records.

In software engineering, however, a raw JSON dump of database rows often fails to preserve the **meaning, relationships, and functional capability** of the user's work:

- Exporting a parametric 3D CAD project as a flat list of coordinates loses the sketch constraints and feature history (`cad_engineering` profile);
- Exporting a Zotero research library without preserving citation keys and collection links breaks existing manuscripts (`research_bibliographic` profile);
- Giving a user a raw database dump while revoking their ability to run the software (`E4`) leaves their ongoing project paralyzed.

**Where we stand:** Sovereign Software requires **functional longevity (`Principle II`)** and **continuing authority over already-created work (`E4`)** alongside data retrieval (`E1`) and migration (`E2`). Users must retain not only a static copy of their records, but the practical ability to interpret, restore (`E3`), and continue working on them when a provider withdraws cooperation.

## 4. Concrete architectural contrasts and boundary cases

| Scenario | MyData Assessment | Sovereign Software Verdict |
|---|---|---|
| **Cloud SaaS workspace that provides a GDPR-compliant raw JSON data dump upon account closure, but whose files cannot be imported into any independent tool** | Partially or largely satisfies formal data-access/portability expectations if the JSON dump is machine-readable. | **Fails a fundamental requirement (`E2` and `E3` Fail):** A raw dump that loses structural relationships or cannot be meaningfully restored and used in an independent workflow does not constitute practicable exit. |
| **Local-first application (`Git`, `Beancount`, `KeePassXC`) where no external organization ever receives the user's data** | Outside MyData's primary focus on multi-organization data sharing and consent intermediaries. | **Exemplary Sovereign Architecture:** By keeping primary custody and execution on user-controlled hardware (`Principle III: Locality`), the user avoids institutional custody traps altogether. |
| **Managed service with documented standard export (e.g., `CSL JSON` / `BibTeX` or `Git` bundle), granular API permissions, and verified import into an independent tool** | Strong alignment with MyData portability, transparency, and interoperability principles. | **Eligible for Meets or Partially aligned:** Satisfies `E1–E5` when clean-machine restoration (`T2`) and migration (`T1`) are empirically verified. |

## 5. How this shapes the evaluation methodology

1. **Distinguishing an export button from practicable exit (`E1` vs. `E2`):** Directly building on MyData's critique of unusable data dumps, our framework separates `E1` (*can you retrieve an intelligible copy?*) from `E2` (*can you actually transition to an alternative workflow without unacceptable loss of meaning?*) and `E3` (*can an independent tool interpret and restore it?*).
2. **Proportionate standing authorization (`Methodology Section 2.IV & E5`):** Drawing on MyData's work on actionable consent, our methodology does not demand intrusive pop-ups for every routine operation, but requires that consequential actions operate under clear, inspectable, and revocable authorization boundaries (`T4`).

## 6. Primary sources and further reading

- A. Poikola, K. Kuikkaniemi, and H. Honko, *MyData: A Nordic Model for Human-Centered Personal Data Management and Processing*, Finnish Ministry of Transport and Communications, 2015. http://urn.fi/URN:ISBN:978-952-243-455-5
- MyData Global, "Declaration of MyData Principles," 2017. https://mydata.org/participate/declaration/
- J. Lehtiniemi and M. Ruckenstein, "The Social Imaginaries of Data Activism," *Big Data & Society*, vol. 6, no. 1, 2019. https://doi.org/10.1177/2053951718821146

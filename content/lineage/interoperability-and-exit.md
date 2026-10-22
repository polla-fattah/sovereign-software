+++
title = "Interoperability, Privacy, and Right to Repair (EFF)"
description = "How Cory Doctorow and Bennett Cyphers' analysis of competitive compatibility and the Right to Repair movement show why real exit disciplines monopolies, and how Sovereign Software turns exit into an empirical product test."
weight = 4
period = "2012–Present (EFF 2021)"
proponents = "Bennett Cyphers, Cory Doctorow, Electronic Frontier Foundation (EFF), Right to Repair coalitions"
overlap = "High"
principles = ["Sovereignty", "Longevity", "Locality"]
framework_links = ["E1", "E2", "E3", "E4", "T1", "T5", "T6"]
stance = "We agree completely with EFF that privacy and user protection without interoperability entrench platform monopolies. Our motive is to translate that economic and policy analysis into concrete product-level verification tests (E2, T1, T6) and practical migration recipes (Escape Hatches)."
+++

## 1. Historical context and core thesis

In February 2021, Electronic Frontier Foundation (EFF) staff technologist Bennett Cyphers and special advisor Cory Doctorow published *"Privacy Without Monopoly: Data Protection and Interoperability"*, synthesizing years of competition policy, digital rights advocacy, and Right to Repair scholarship into a unified argument about how dominant technology platforms maintain control over users.

Cyphers and Doctorow addressed a growing tension in technology policy: dominant platforms frequently invoke "security" and "privacy" as justifications to block third-party clients, disable local exports, encrypt databases with vendor-held keys, and prohibit independent repair or modification.

Their core thesis establishes three critical insights:

1. **Lock-in disables market discipline:** When high switching costs, proprietary formats, network effects, or technical protection locks prevent users from leaving a service with their historical data and relationships, the provider faces no competitive penalty for degrading privacy, raising prices, inserting surveillance, or altering terms of service.
2. **Interoperability and privacy are complements, not enemies:** True user protection requires both strong data protection rules *and* low switching costs (**interoperability**). When users can take their data, social graphs, or workflows to a more trustworthy alternative - or connect to a federation through an independent client - they gain a credible **exit option** that disciplines abusive providers.
3. **Adversarial interoperability (competitive compatibility) and Right to Repair:** Historically, open computing progressed because new tools could read existing file formats, speak existing protocols, and repair existing systems without begging the incumbent vendor for permission. When software or hardware requires continuous vendor authorization servers, parts-pairing locks, or undocumented cloud handshakes, the user becomes a tenant rather than an owner.

## 2. Where Sovereign Software agrees (shared foundation)

The EFF interoperability thesis and the Right to Repair movement provide the political-economic backbone of the Sovereign Software Manifesto:

- **Practicable exit as the ultimate test of authority (`Principle I: Sovereignty` & `E2`):** Voice without exit is petition. If a user cannot leave an application for an independent alternative without losing years of accumulated work, any claim of "user control" is illusory.
- **Security must not be an excuse for vendor lock-in (`T5` & `Methodology Section 8`):** Directly echoing *"Privacy Without Monopoly"*, Test `T5` explicitly checks *"that security mechanisms protect the user rather than enforcing vendor lock-in"*. Encryption where the vendor holds the sole recovery capability or uses hardware attestation to block third-party tools is a custody failure, not a user benefit.
- **Right to repair and maintain existing workflows (`E4`, `T6`):** Right to Repair argues that stopping subscription payments or losing manufacturer support must not brick an already-purchased device. Requirement `E4` (*Continuing authority and custody over already-created work*) applies the exact same rule to software: if a provider withdraws cooperation or licensing servers go dark, the user must retain effective control over existing work.
- **Escape Hatches (`/escape-hatches/`):** Inspired by adversarial and standards-based interoperability, our website publishes concrete command-line migration recipes (`Escape Hatches`) showing how to extract records out of proprietary cloud silos into open substrates - while honestly documenting the caveats and metadata losses of each transition.

## 3. Where we stand and why we diverge (our motive)

Where does Sovereign Software add something distinct beyond the EFF and Right to Repair literature?

### 3.1 From regulatory policy to engineering verification

*"Privacy Without Monopoly"* and Right to Repair initiatives are primarily oriented toward **public policy, antitrust regulation, statutory mandates (such as the EU Digital Markets Act), and legal defenses for reverse engineering (such as DMCA Section 1201 exemptions)**.

For an individual software engineer, researcher, or organization choosing tools today, however, waiting for antitrust regulators to force a cloud monopoly to open its APIs is not an actionable engineering strategy. Moreover, regulatory mandates often produce **performative interoperability**: a vendor builds a throttled, poorly documented export endpoint that technically satisfies a regulator on paper while dropping critical relational metadata or breaking upon re-import.

**Where we stand:** Sovereign Software turns interoperability from a **legislative demand** into an **empirical laboratory audit (`T1`, `T2`, `T6`)**:

1. We do not accept a vendor's claim of "open API" or "standard export" at face value (`Methodology Section 7`: vendor declarations never substitute for direct observation).
2. We require evaluators to construct a domain-specific synthetic dataset (`Stage 1`), export it (`Stage 2`), and import it into an independent tool (`T1`, `T6`) to verify whether essential records and meaning defined in `Section 1 of the methodology` actually survive.

### 3.2 Evaluating internal format durability alongside external interoperability

A product can offer a live network API for real-time interoperability while still failing **Longevity (`Principle II`)** and **Locality (`Principle III`)** if both the source and destination services are ephemeral cloud platforms. Sovereign Software pairs **exit interoperability (`E2`)** with **independent archival recovery (`E3`)** and **offline independence (`T3`)**, ensuring that the user can always fall back to durable local custody without depending on any live network intermediary.

## 4. Concrete architectural contrasts and boundary cases

| Scenario | Policy / Regulatory Interoperability View | Sovereign Software Verdict |
|---|---|---|
| **Dominant cloud service that offers a statutory data-export archive, but omits internal document links, comments, or parametric formulas** | Often treated as compliant with basic statutory data portability mandates. | **Fails `E2` (Practicable exit and migration) when essential domain meaning is lost:** Evaluated against the relevant domain profile (`knowledge_notes`, `cad_engineering`, `research_bibliographic`). |
| **Application that encrypts local files using a hardware/account enclave controlled by the vendor, preventing the user from moving the raw database to another OS or open-source client** | Classic example of what EFF criticizes as using security/privacy controls to enforce monopoly lock-in. | **Fails `E1`, `E2`, `E3`, and `T5`:** Security mechanisms that deny the user independent custody of their own decryption keys and records violate Sovereignty. |
| **Open-format tool (`Git`, `Zotero` with CSL JSON/BibTeX + SQLite backup, `Beancount`) with documented schemas and verified cross-tool import** | Exemplary competitive compatibility. | **Meets `E1–E3`, `T1`, and `T6`:** Verified both for immediate cross-tool migration and long-term archival recovery. |

## 5. How this shapes the evaluation methodology

1. **Requirement E2 (Practicable exit and migration) & Test T1:** Operationalizes competitive compatibility by testing whether a user can transition to an independent implementation without unacceptable loss of essential domain records.
2. **Honest caveats on Escape Hatches (`data/escape.json`):** Rather than pretending that scraping or exporting from a locked-in cloud service is painless, every migration recipe on our [Escape Hatches](/escape-hatches/) page documents a mandatory **Caveat** explaining what metadata, relational structure, or history is lost during extraction.

## 6. Primary sources and further reading

- B. Cyphers and C. Doctorow, *Privacy Without Monopoly: Data Protection and Interoperability*, Electronic Frontier Foundation (EFF), February 2021. https://www.eff.org/wp/interoperability-and-privacy
- C. Doctorow, "Adversarial Interoperability," Electronic Frontier Foundation, October 2019. https://www.eff.org/deeplinks/2019/10/adversarial-interoperability
- A. Perzanowski, *The Right to Repair: Reclaiming the Things We Own*, Cambridge University Press, 2022. https://doi.org/10.1017/9781108946926

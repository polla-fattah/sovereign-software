+++
title = "Digital Preservation: Library of Congress & OAIS"
description = "How archival standards (ISO 14721:2025 OAIS and the Library of Congress Sustainability Factors) define what it takes for digital information to remain intelligible over decades, and how Sovereign Software applies those standards prospectively to everyday software."
weight = 2
period = "1995–2025 (OAIS ISO 14721:2025)"
proponents = "Consultative Committee for Space Data Systems (CCSDS), ISO, and the Library of Congress"
overlap = "High"
principles = ["Longevity", "Sovereignty"]
framework_links = ["E1", "E2", "E3", "T1", "T2", "T6"]
stance = "Our Principle II (Longevity) is grounded directly in archival science rather than invented from scratch. Our motive is to bring OAIS and Library of Congress preservation rigor out of post-hoc institutional archives and turn it into a prospective evaluation test for everyday software while people are still choosing and using it."
+++

## 1. Historical context and core thesis

For over two decades, the science of **digital preservation** - led by national libraries, scientific data archives, and space agencies - has studied why digital records become unreadable even when the underlying physical storage media survive intact. Two landmark frameworks anchor this discipline:

### 1.1 The OAIS Reference Model (ISO 14721:2025 / CCSDS 650.0-M-3)

Originally developed by the Consultative Committee for Space Data Systems (CCSDS) to ensure that planetary and Earth-observation data remained intelligible across generations of scientists, and standardized as **ISO 14721** (most recently updated in its third edition, **ISO 14721:2025**), the **Open Archival Information System (OAIS)** reference model establishes a fundamental theorem of digital longevity: **a bitstream is not information**.

To preserve information over the long term so that it remains independently understandable to a **Designated Community**, an archive must preserve not only the raw **Data Object** (the bits), but also:

- **Representation Information:** Both *Structural Information* (file format specifications, schemas, data types, compression algorithms) and *Semantic Information* (units of measurement, coordinate systems, domain vocabularies, and meaning).
- **Preservation Description Information (PDI):**
  - *Reference Information:* Persistent identifiers (such as DOIs, UUIDs, or content hashes).
  - *Context Information:* How the object relates to other records, collections, or environments.
  - *Provenance Information:* The history of custody, transformations, and authorship.
  - *Fixity Information:* Cryptographic checksums or integrity checks verifying that the object has not been corrupted or silently altered.

### 1.2 The Library of Congress Sustainability Factors

Complementing OAIS, the **Library of Congress Sustainability of Digital Formats** program evaluates concrete file formats across **seven sustainability factors**:

1. **Disclosure:** The degree to which complete specifications and tools for validating technical integrity exist and are accessible to anyone.
2. **Adoption:** The degree to which the format is already used by primary creators, disseminators, or archival institutions.
3. **Transparency:** The degree to which the digital representation is open to direct analysis with basic tools (such as human readability in a text editor or straightforward unencrypted structure).
4. **Self-documentation:** The extent to which a digital object contains its own descriptive, technical, and administrative metadata internally rather than relying on an external proprietary catalog.
5. **External dependencies:** The degree to which a particular format depends on specific hardware, operating systems, or proprietary software for rendering or reuse.
6. **Impact of patents:** The degree to which royalty or license encumbrances inhibit independent implementation of readers and writers.
7. **Technical protection mechanisms:** The presence of encryption, Digital Rights Management (DRM), or vendor key-escrow that prevents preservation and independent access by a custodian.

## 2. Where Sovereign Software agrees (shared foundation)

**Principle II (Longevity)** of the Sovereign Software Manifesto and our third fundamental requirement (**E3: Independent interpretation and recovery**) are built directly upon OAIS and the Library of Congress sustainability criteria:

- **Preserving bytes is not preserving meaning (`Methodology Section 2.II`):** Our distinction among *Data longevity*, *Functional longevity*, and *Knowledge longevity* directly adapts the OAIS distinction between the raw Data Object, Representation Information, and Preservation Description Information.
- **Format disclosure over plain-text dogma:** Following the Library of Congress factors (*Disclosure* vs. *Transparency*), our methodology explicitly states that **open, documented binary formats can serve longevity; plain text is not mandatory** (`Methodology Section 2.II`). A well-documented SQLite database or an encrypted KeePassXC vault with user-held keys (`KDBX`) can be thoroughly sovereign, whereas an undocumented text-like dump with broken references may fail.
- **Rejecting technical protection locks (`E4` & `T5`):** The Library of Congress's seventh factor (*Technical protection mechanisms*) maps directly to our requirement that security and encryption mechanisms must protect the user rather than lock the user's own records behind vendor-controlled activation servers.

## 3. Where we stand and why we diverge (our motive)

If archival science already solved the theory of digital longevity, what does Sovereign Software add?

### 3.1 From post-hoc institutional curation to prospective software evaluation

Archival standards like OAIS and the Library of Congress format registry are designed primarily for **professional archivists, librarians, and institutional repositories** who receive digital artifacts *after* they have been produced - often when a research project ends, a government agency transfers records, or a creator donates a digital estate.

By the time an archivist receives a hard drive full of proprietary cloud-cached stubs, undocumented binary project files, or broken database exports, the damage has already been done.

**Where we stand:** Our motive is to move digital preservation **upstream into software engineering and tool selection**. Instead of asking an archive fifty years from now to rescue records trapped by bad software design, Sovereign Software evaluates the **live application itself** (`T1`, `T2`, `T6`) so that individuals, researchers, and engineers can demand software that produces self-documenting, independently recoverable records from day one.

### 3.2 Preserving editable functional intent, not only static archival renderings

For many archival repositories, converting a complex document or CAD drawing into a static preservation format (such as PDF/A or a static TIFF/STL mesh) is considered an acceptable archival normalization.

For an active engineer, scientist, or developer, however, losing the **editable structure and functional intent** of their work is catastrophic:

- Converting a parametric **FreeCAD** or **OpenSCAD** model into a static STL triangle mesh preserves the visual shape for a museum, but destroys the sketch constraints, formulas, and tolerances required to engineer the part (`cad_engineering` profile).
- Converting a **Beancount** or **GnuCash** ledger into a static PDF bank statement destroys the queryable double-entry account structure (`finance_tasks` profile).

**Where we stand:** Sovereign Software combines OAIS *data and knowledge longevity* with **functional longevity** (`Principle II`) and **Domain Preservation Profiles (`Section 1 of the methodology`)**, testing whether the user can preserve and migrate the *editable, functional meaning* of their work (`E2`, `E3`).

## 4. Concrete architectural contrasts and boundary cases

| Scenario | Traditional Archival Normalization View | Sovereign Software Verdict |
|---|---|---|
| **Exporting a complex parametric CAD assembly or spreadsheet only as a static PDF/A or STL mesh** | Often acceptable as a static *Dissemination Information Package (DIP)* for visual inspection by future readers. | **Fails `E2` and `E3` under `cad_engineering` / `finance_tasks` profiles:** Static visual rendering loses formulas, constraints, units, and editable structure; constitutes unacceptable loss of domain meaning. |
| **Native storage in a documented SQLite database (`Zotero`) or content-addressable Merkle DAG (`Git`) with cryptographic fixity hashes** | High score on Library of Congress *Disclosure*, *Adoption*, *Self-documentation*, and OAIS *Fixity/Provenance*. | **Strong Longevity alignment (`T2`, `E3`):** Binary or structured storage is welcomed when schemas are public, fixity is verifiable, and clean-machine restoration succeeds without vendor assistance. |
| **Cloud application that stores user records in an undocumented multi-tenant database with no schema disclosure** | Fails Library of Congress *Disclosure*, *Transparency*, and *External dependencies* factors. | **Fails `E1`, `E2`, and `E3`:** Without Representation Information and independent recovery tools, the user holds no durable custody. |

## 5. How this shapes the evaluation methodology

1. **Test T2 (Preservation and recovery):** Directly operationalizes OAIS archival recovery by requiring evaluators to back up a representative dataset, move it to a clean machine with no vendor account access, and restore and interpret both the data and its structural metadata using independent tools and public documentation.
2. **Domain Preservation Profiles (`Section 1 of the methodology`):** Each of our five baseline profiles acts as a concrete OAIS *Representation Information* checklist for its software category, specifying exactly which structural, semantic, and provenance elements (commit hashes, backlinks, parametric constraints, double-entry postings, citation keys) must survive.

## 6. Primary sources and further reading

- ISO 14721:2025, *Space data and information transfer systems: Open archival information system (OAIS), Reference model*, 3rd ed. (CCSDS 650.0-M-3, December 2024 / ISO 2025). https://public.ccsds.org/Pubs/650x0m3.pdf
- Library of Congress, "Sustainability of Digital Formats: Planning for Library of Congress Collections  -  Sustainability Factors." https://www.loc.gov/preservation/digital/formats/sustain/sustain.shtml
- Task Force on Archiving of Digital Information (D. Waters and J. Garrett, co-chairs), *Preserving Digital Information*, Commission on Preservation and Access and Research Libraries Group (RLG), 1996.

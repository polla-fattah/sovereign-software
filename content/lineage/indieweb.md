+++
title = "The IndieWeb Movement"
description = "How the IndieWeb community pioneered personal domain custody and the POSSE model (Publish on Own Site, Syndicate Elsewhere), and how Sovereign Software extends that custody architecture beyond web publishing to all software domains."
weight = 3
period = "2010–Present"
proponents = "Aaron Parecki, Tantek Çelik, Amber Case, and the IndieWebCamp community"
overlap = "High"
principles = ["Sovereignty", "Longevity", "Locality"]
framework_links = ["E1", "E2", "E3", "T1", "T6"]
stance = "IndieWeb proved that people can participate in external networks without surrendering primary custody of their work. Our motive is to generalize that custody architecture from personal websites and social publishing to engineering, financial, research, and general-purpose software."
+++

## 1. Historical context and core thesis

Founded in 2010 by Tantek Çelik, Aaron Parecki, Amber Case, and collaborators through the first IndieWebCamp in Portland, Oregon, the **IndieWeb** movement arose as a practical counter-architecture to the centralization of the social web. By the late 2000s, millions of writers, photographers, and researchers had abandoned personal websites in favor of corporate "silos" (Twitter, Facebook, Medium, Instagram, LinkedIn). When those platforms altered their algorithms, paywalled access, changed terms of service, or shut down altogether (as occurred with Geocities, Google Reader, Posterous, and Delicious), users lost years of writing, permalinks, social graphs, and online identity.

Rather than retreating into isolated offline silos or waiting for a single utopian federated platform to replace corporate networks, the IndieWeb articulated a pragmatic, builder-oriented philosophy summarized in its **core principles**:

1. **Own your data and your identity:** Your primary online identity should be a personal domain name under your control, not an account handle leased from a platform operator. Every article, note, photo, or status update you create should live first on your own server or static filesystem in durable, human-readable HTML/Microformats.
2. **Use what you make (dogfooding) and build for yourself first:** Software should be built to solve real personal needs today rather than speculative platform scale.
3. **POSSE (Publish on Own Site, Syndicate Elsewhere):** Instead of treating external social platforms as the system of record, publish canonical content on your own domain first and syndicate copies or links outward to corporate platforms for distribution and conversation.
4. **Open, modular web building blocks:** Use simple, composable specifications - such as **Microformats2** (for semantic markup in HTML), **Webmention** (W3C recommendation for cross-site replies and citations), **IndieAuth** (OAuth2 identity built on personal URLs), and **Micropub** (for publishing to one's site from any client) - so that tools can be swapped without losing content.
5. **Plurality and longevity:** Avoid monocultures; design personal archives so that plain HTML files remain readable in twenty or fifty years.

## 2. Where Sovereign Software agrees (shared foundation)

The IndieWeb provides one of the clearest real-world demonstrations of the Sovereign Software philosophy in action:

- **Primary custody vs. secondary distribution (Section 05 of the Manifesto):** IndieWeb's **POSSE** model is the exact architectural pattern we advocate for synchronization and networked collaboration: *keep the authoritative record under the user's custody first, and treat external platforms or cloud services as replaceable distribution or synchronization channels*.
- **Human-readable, durable substrates (Principle II: Longevity):** IndieWeb's preference for static HTML enhanced with semantic Microformats mirrors our emphasis on inspectable, self-documenting storage formats that survive after specific CMS software is retired.
- **Identity and link longevity (`E1`, `E2`, `E3`):** IndieWeb recognized early that losing URLs, cross-references, and reply chains is a loss of intellectual meaning, not merely a cosmetic inconvenience - a principle we formalize in our `knowledge_notes` and `research_bibliographic` domain preservation profiles.

## 3. Where we stand and why we diverge (our motive)

Why is the IndieWeb philosophy alone not sufficient as a general theory of software sovereignty?

### 3.1 Domain scope: from web publishing to all computational work

The IndieWeb is intentionally scoped to **online publishing, personal identity, and social interaction on the World Wide Web**. Its technical primitives (HTML, URLs, Microformats2, Webmention, Micropub) are tailored for posts, articles, bookmarks, RSVPs, and media streams.

However, the majority of professional, scientific, and personal computing takes place outside public web publishing:

- A mechanical engineer designing a parametric assembly in CAD;
- A researcher managing 5,000 bibliographic citations, PDFs, and statistical scripts;
- A household or small business reconciling a double-entry financial ledger;
- A software team managing a cryptographic commit graph or encrypted credential vault.

**Where we stand:** Sovereign Software takes the custody logic that IndieWeb proved for web publishing (*own the canonical source locally; treat external networks as replaceable relays*) and turns it into a **domain-general evaluation framework** with specific preservation profiles (`Section 1 of the methodology`) for engineering, finance, version control, research, and knowledge management.

### 3.2 Evaluating complex application state and consequential actions

Because IndieWeb sites are often static or simple content management systems built by technically skilled site owners, IndieWeb principles do not need to specify how to audit a complex desktop binary, how to verify clean-machine database restoration (`T2`), or how to govern consequential automated or AI-assisted actions (`Principle IV / E5`).

**Where we stand:** Sovereign Software provides a formal verification methodology (`E1–E5`, `T1–T7`) for complex applications used by people who may not write their own web servers, ensuring that any software product - whether a static site generator like **Hugo** or a desktop database like **Zotero** - can be audited against consistent, falsifiable rules.

## 4. Concrete architectural contrasts and boundary cases

| Scenario | IndieWeb Perspective | Sovereign Software Perspective |
|---|---|---|
| **Static site generator (`Hugo`) with Markdown source files in `Git` deployed to GitHub Pages or a VPS** | Exemplary IndieWeb publishing stack: canonical content lives in user-controlled Markdown/Git, published to a personal domain. | **Candidate for Meets Core Requirements:** Markdown source files and Git history satisfy `E1–E4` and `T1–T3`; the hosting provider is a replaceable deployment target rather than the system of custody. |
| **Publishing exclusively on a hosted platform (e.g., Substack or Medium) with manual ZIP export** | Violates core IndieWeb principles (no personal domain custody at creation time; platform owns canonical URLs and subscriber delivery). | **Evaluated empirically via `E1–E4` and `T1`:** If the platform allows complete, unthrottled export of posts, media, and subscriber lists and DNS redirection of a custom domain, it may pass `E1–E2` while receiving **Partially aligned** on Sovereignty and Locality due to hosted primary custody. |
| **Offline double-entry accounting (`Beancount` / `GnuCash`) or parametric CAD (`FreeCAD`)** | Outside IndieWeb's scope (not web publishing or online identity). | **Core target of the Sovereign Software framework:** Evaluated under `finance_tasks` and `cad_engineering` preservation profiles using the exact same custody and exit logic. |

## 5. How this shapes the evaluation methodology

1. **System of Custody vs. System of Distribution (`Manifesto Section 05` & `T1`/`T3`):** Following POSSE, our methodology asks evaluators to distinguish where authoritative work is *created and stored* from where it is *mirrored or shared*. If an external service goes offline and the user loses nothing except temporary syndication convenience, `E4` and `Locality` are satisfied.
2. **Link and relationship preservation (`E2`, `E3`):** Just as IndieWeb insists that permalinks and reply contexts must not rot when switching tools, our `knowledge_notes` and `research_bibliographic` profiles treat internal cross-references, backlinks, and citation links as essential records whose loss during export constitutes a failure of `E2`.

## 6. Primary sources and further reading

- IndieWebCamp, "IndieWeb Principles." https://indieweb.org/principles
- IndieWebCamp, "POSSE (Publish on your Own Site, Syndicate Elsewhere)." https://indieweb.org/POSSE
- IndieWebCamp, "Why IndieWeb?" https://indieweb.org/why
- W3C Recommendation, *Webmention*, ed. A. Parecki, January 2017. https://www.w3.org/TR/webmention/
- W3C Recommendation, *Micropub*, ed. A. Parecki, May 2017. https://www.w3.org/TR/Micropub/

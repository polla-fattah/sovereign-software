+++
title = "Free Software and the GNU Tradition"
description = "Why Richard Stallman's Four Essential Freedoms and critique of Service as a Software Substitute (SaaSS) established the moral foundation of user control, and why Sovereign Software evaluates practical operational authority alongside license freedom."
weight = 1
period = "1983–Present"
proponents = "Richard Stallman, Free Software Foundation (FSF), GNU Project"
overlap = "Very high"
principles = ["Sovereignty", "Longevity", "Locality", "Transparency and Control"]
framework_links = ["E1", "E3", "E4", "E5", "T1", "T3", "T5", "T6"]
stance = "We share GNU's foundational premise that users must control software rather than be controlled by its developer. We diverge by judging practical operational authority over records and workflows rather than making a free software license the sole gate, while explicitly testing where closed binaries fail long-term functional continuity."
+++

## 1. Historical context and core thesis

Initiated by Richard Stallman in 1983 with the announcement of the GNU Project and institutionalized in 1985 through the Free Software Foundation (FSF), the **Free Software movement** is the oldest and most influential philosophical tradition asserting that computer users deserve authority over the software they use.

At the heart of the GNU philosophy is a sharp moral thesis: *either the users control the program, or the program controls the users*. When a developer distributes software without source code or under restrictive licensing terms, the developer retains unilateral power to dictate what the program does, inspect or restrict the user's activity, and prevent communities from fixing defects or adapting the tool to their needs.

To prevent this subjugation, the **Free Software Definition** requires that users possess **Four Essential Freedoms**:

- **Freedom 0:** The freedom to run the program as you wish, for any purpose.
- **Freedom 1:** The freedom to study how the program works, and change it so it does your computing as you wish (access to the source code is a precondition for this).
- **Freedom 2:** The freedom to redistribute copies so you can help others.
- **Freedom 3:** The freedom to distribute copies of your modified versions to others, giving the whole community a chance to benefit from your changes (access to the source code is a precondition for this).

In 2010, Stallman extended this analysis to cloud computing in *"Who Does That Server Really Serve?"*, introducing the concept of **Service as a Software Substitute (SaaSS)**. Under SaaSS, a user does not even run a proprietary binary on their own machine; instead, they send their raw data to a remote server that performs their computing on the provider's hardware under the provider's sole control. Stallman argued that SaaSS is equivalent to running a proprietary program with a permanent spyware backdoor and a remote kill switch, even if the server happens to be running free/open-source software internally.

## 2. Where Sovereign Software agrees (shared foundation)

Sovereign Software owes its core normative orientation directly to the Free Software tradition:

- **Authority belongs to the user (Principle I):** Our first principle is a direct descendant of the GNU thesis that software must serve its users rather than act as an instrument of vendor domination.
- **Critique of unnecessary remote computing (Principle III):** Our requirement that capabilities suitable for user-controlled hardware should not be forced onto remote vendor servers aligns closely with the FSF's critique of Service as a Software Substitute (SaaSS).
- **Inspectability and absence of malicious features (Principle IV):** Free Software's insistence that users must be able to verify what a program actually does on their behalf informs our requirement that consequential actions remain transparent, auditable, and governable (`E5`, `T4`).
- **Maintainability after vendor abandonment (Principle II & T6):** Source code availability under a free license is the strongest guarantee that a community can continue maintaining, compiling, and repairing a complex software engine after its original commercial creator disappears.

## 3. Where we stand and why we diverge (our motive)

Despite our deep debt to the GNU tradition, Sovereign Software departs from classical Free Software orthodoxy on a fundamental point: **we do not treat a free/open-source software license as either a necessary or a sufficient condition for software sovereignty.**

Why take this position? Because over the past two decades, the relationship between *source code licensing* and *practical user control over information and work* has fractured in two opposite directions:

### 3.1 Why an open-source license is not sufficient

Today, many venture-backed platforms release their client or server code under an open-source license (MIT, Apache 2.0, AGPLv3) while designing their data schemas, cloud dependencies, identity systems, and migration paths so that ordinary users remain operationally trapped. An open-source application can:

- Store user records in an undocumented, rapidly mutating internal database schema with no workable export or migration tool (failing `E1` and `E2`);
- Require continuous connection to a first-party coordination server or AI API with no configurable self-hosted endpoint (failing Principle III / `T3`);
- Transmit user telemetry or execute unannounced consequential updates by default (failing Principle IV / `E5`).

If an evaluation framework looks only at the license file in the repository, it grants a pass to software that leaves the user powerless when the hosting provider shuts down or alters its terms.

### 3.2 Where operational independence can (and cannot) substitute for software freedom

Conversely, consider a proprietary application (such as the note-taking editor **Obsidian** or the digital audio workstation **REAPER**) that runs 100% offline on user hardware, requires no account login or remote activation check to open existing work, and stores or exports the user's primary intellectual work in open, documented formats (such as plain UTF-8 Markdown files) that can be read and edited immediately in dozens of independent tools.

Under the FSF's definition, a proprietary program fails automatically at step zero because the user lacks Freedom 1 and Freedom 3 over the executable binary. Under the Sovereign Software framework, we draw a sharper, four-dimensional distinction (**Methodology Section 2 & Read Section 03**):

1. **When the workflow is portable across independent implementations:** If the user's essential records and relationships are stored in an open, fully documented format (such as plain Markdown, Git packfiles, or standard SQLite/CSV ledgers) and can be operated on immediately by existing free/independent tools without unacceptable loss (`E1–E3` Pass), the user possesses genuine **information authority** and **continuity authority**. Even if the proprietary vendor disappears tomorrow, the user's work and daily capability continue uninterrupted in another tool.
2. **When the executable itself is irreplaceable:** If continuing the work requires a complex, domain-specific execution engine that has no faithful independent replacement (for example, a proprietary parametric CAD kernel or a closed simulation engine whose files no other tool can recompute), then **operational independence cannot substitute for software freedom**. When the vendor abandons that closed binary, an operating-system update or security vulnerability will eventually render the user's historical projects uneditable. In our framework, that vulnerability is explicitly captured under **Principle II (Functional longevity)**, **E4 (Continuing authority over already-created work)**, and **T6 (Maintainability)**.

## 4. Concrete architectural contrasts and boundary cases

| Scenario | Classical Free Software (FSF) Verdict | Sovereign Software Verdict |
|---|---|---|
| **Application A: Open-source cloud-coupled workspace**<br>Licensed under AGPLv3, but stores records in a complex multi-service cloud backend with no complete local export or clean-machine restore path for an ordinary user. | **Free Software** (as long as the user could theoretically obtain the source code, though hosted use is criticized as SaaSS if operated by a third party). | **Fails a fundamental requirement** (`E1`, `E2`, `E3` Fail). Legal permission to read a million lines of server code does not give a user practical retrieval and recovery of their work. |
| **Application B: Proprietary editor over plain local files**<br>Closed-source binary (free or paid), runs offline without activation servers, reads and writes a local folder of standard UTF-8 Markdown files and attachments that work in Vim, Emacs, or VS Code. | **Non-free / Proprietary.** Categorically rejected because the user cannot inspect, modify, or redistribute the editor binary. | **Eligible for Partial Alignment or Meets Core Requirements** (subject to `T1–T6` testing). Information authority (`E1–E3`) is strong because the files are open; limitations around closed-binary functional longevity and proprietary plugin lock-in are recorded transparently under **Longevity** and **Sovereignty**. |
| **Application C: Free software with open formats and offline execution**<br>Licensed under GPL/MIT/BSD, runs locally without network permission, stores documented formats, and provides verifiable backup and migration (e.g., `Git`, `SQLite`, `Beancount`, `Emacs Org-mode`). | **Free Software.** Satisfies all four essential freedoms. | **Strongest architectural alignment.** Combines legal freedom to maintain the software engine (`T6`) with practical custody, offline independence, and format longevity (`E1–E5`). |

## 5. How this shapes the evaluation methodology

1. **Four dimensions of authority (`Methodology Section 2`):** We explicitly separate *Information authority*, *Execution authority*, *Governance authority*, and *Continuity authority* so evaluators can pinpoint exactly what a closed binary puts at risk (execution maintenance over decades) versus what an open format protects (immediate data custody and tool-switching).
2. **Requirement E4 (Continuing authority and custody over already-created work):** Inspired by the FSF's warnings against remote kill switches and digital restrictions management (DRM), `E4` tests whether withdrawing payment, subscription status, or license-server connectivity prevents the user from accessing and continuing essential work on already-created records.
3. **Test T6 (Interoperability and maintainability):** When evaluating software whose native project structure cannot be faithfully imported into an independent competitor, `T6` explicitly checks whether source availability and build instructions allow the user community to maintain and patch the software itself.

## 6. Primary sources and further reading

- Free Software Foundation, "What is Free Software? The Free Software Definition," GNU Project. https://www.gnu.org/philosophy/free-sw.html
- R. Stallman, "Free Software Is Even More Important Now," GNU Project, 2015. https://www.gnu.org/philosophy/free-software-even-more-important.html
- R. Stallman, "Who Does That Server Really Serve?" *Boston Review* / GNU Project, 2010. https://www.gnu.org/philosophy/who-does-that-server-really-serve.html
- R. Stallman, *Free Software, Free Society: Selected Essays of Richard M. Stallman*, 3rd ed., Boston, MA: Free Software Foundation, 2015. https://shop.fsf.org/product/free-software-free-society-3/

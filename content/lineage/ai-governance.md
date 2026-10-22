+++
title = "Human-Centered AI Governance (NIST AI RMF)"
description = "How trustworthy AI frameworks such as the NIST AI Risk Management Framework (AI RMF 1.0) establish transparency, explainability, and human oversight, and how Sovereign Software adds the critical requirement that AI services remain replaceable, non-custodial dependencies."
weight = 10
period = "2021–Present (NIST AI 100-1, 2023)"
proponents = "National Institute of Standards and Technology (NIST), Ben Shneiderman (Human-Centered AI), OECD / EU AI Governance communities"
overlap = "Moderate–high"
principles = ["Transparency and Control", "Sovereignty", "Locality"]
framework_links = ["E4", "E5", "T3", "T4", "T5"]
stance = "We adopt mainstream AI governance principles of human oversight, inspectability, and contestability for consequential actions (Principle IV / E5). Our distinct contribution is treating AI models and remote inference APIs as withdrawable operational dependencies that must never gain permanent custody over a user's underlying records or workflows."
+++

## 1. Historical context and core thesis

As machine learning and generative artificial intelligence moved from specialized research laboratories into everyday authoring, coding, financial, and decision-support software, a major body of governance and engineering literature emerged to ensure that automated systems remain accountable to human beings.

Two foundational contributions represent this tradition:

1. **National Institute of Standards and Technology (NIST) *Artificial Intelligence Risk Management Framework (AI RMF 1.0)* (`NIST AI 100-1`, January 2023):** Developed through a broad public-private consensus process, the NIST AI RMF organizes AI risk management around four core operational functions (**Govern, Map, Measure, and Manage**) and defines **seven characteristics of trustworthy AI**:
   - *Valid and Reliable*
   - *Safe*
   - *Secure and Resilient*
   - *Accountable and Transparent*
   - *Explainable and Interpretable*
   - *Privacy-Enhanced*
   - *Fair with Harmful Bias Managed*
2. **Human-Centered AI (HCAI):** Championed by human-computer interaction researchers such as Ben Shneiderman (*Human-Centered AI*, 2022), HCAI rejects the false dichotomy that higher automation requires lower human control. Instead, it argues that well-engineered systems should combine **high automation with high human control** through clear responsibility boundaries, comprehensible interfaces, continuous audit logs ("flight data recorders" for AI actions), and immediate human override.

## 2. Where Sovereign Software agrees (shared foundation)

**Section 04 of the Sovereign Software Manifesto (*AI and Automated Systems*)**, **Principle IV (*Transparency and Control*)**, and **Requirement E5 (*Governability of consequential actions*)** draw directly from Human-Centered AI and the NIST AI RMF:

- **Rejection of reactive anti-AI prohibition:** Like HCAI, Sovereign Software does not ban statistical or generative models, nor does it pretend that only deterministic rule-based code can be legitimate (`Methodology Section 2.IV`).
- **Proportionate authorization and human override (`E5`, `T4`):** When an AI or automated subsystem performs consequential actions - modifying files, executing code, transmitting confidential records externally, or altering financial/administrative state - the user must be able to inspect what is proposed, authorize it proportionately to the risk, trace what changed in an audit log or diff, and reverse or contest the outcome.
- **Disclosure of uncertainty and provenance:** Automated outputs must be distinguishable from human-authored records, and their scope and confidence limitations must not be concealed.

## 3. Where we stand and why we diverge (our motive)

Why are existing AI governance frameworks like the NIST AI RMF not sufficient on their own for evaluating software sovereignty?

### 3.1 AI as a custody and dependency trap, not only a safety/bias problem

Mainstream AI governance frameworks (NIST AI RMF, the EU AI Act, ISO/IEC 42001) focus primarily on **model behavior, safety, fairness, hallucination risk, and institutional compliance**. They ask: *Is the model accurate? Is it biased? Does it respect privacy regulations?*

From a software sovereignty perspective, however, even a 100% accurate, fair, and well-calibrated cloud AI assistant can destroy user authority if the application uses AI integration as a **custody and dependency trap**:

- **Mandatory cloud routing of local work (`Principle III: Locality` & `E4`):** Many modern editors, IDEs, and note-taking tools bundle cloud AI features in a way that forces the user's entire workspace into a proprietary cloud index or blocks local editing when the AI subscription lapses.
- **Unreplaceable model endpoints (`T3` & `T6`):** If an application hard-codes a single vendor's remote inference API and refuses to work with local models (for example, via Ollama or llama.cpp) or alternative user-configured endpoints, the vendor holds a remote kill switch over the workflow.
- **Silent context exfiltration (`T4` & `T5`):** Background "copilot" or indexing processes frequently transmit confidential local files, source code, or research notes to remote servers without explicit, granular boundary controls.

**Where we stand:** Sovereign Software evaluates AI features not only as **governable actors (`Principle IV / E5`)**, but also as **withdrawable external dependencies (`Principle I, II, III / E1–E4`)**:

1. **Underlying records must remain independent of the AI layer:** If the remote AI provider shuts down, revokes API keys, or changes pricing tomorrow, all user-authored records, prompts, outputs, and core non-AI editing/analysis capabilities must continue working locally without loss (`E4`, `T3`).
2. **Explicit transmission boundaries (`T4`, `T5`):** No local document, repository, or database record may be transmitted to an external model endpoint or used for training without clear, revocable user authorization.
3. **Endpoint replaceability (`T3`, `T6`):** Where AI capabilities are used, architectures that allow users to run local models on their own hardware or swap API providers align far more strongly with Principle III (*Locality*) than systems tethered to a single vendor's cloud.

## 4. Concrete architectural contrasts and boundary cases

| Scenario | Standard AI Governance (NIST AI RMF) View | Sovereign Software Verdict |
|---|---|---|
| **Cloud-tethered AI editor that documents model limitations and bias clearly, but locks local files inside a proprietary cloud workspace and silently uploads project context** | May score well on *Explainable/Interpretable* disclosures while raising *Privacy-Enhanced* concerns. | **Fails fundamental requirements (`E1–E4` and `E5`):** Clear model cards do not excuse trapping the user's primary work or exfiltrating local context without granular authorization. |
| **Local desktop tool (`Obsidian`, `Emacs`, `VS Code` / `VSCodium` with local plugin) where files remain plain local Markdown/code and an optional AI assistant uses either a local model or an explicit, diff-reviewed API call** | Evaluated on the reliability and human-in-the-loop controls of the assistant plugin. | **Strong alignment:** Primary data custody (`E1–E4`) and offline editing (`T3`) are completely unaffected if the AI plugin is disabled, and all AI edits are presented as inspectable diffs (`E5`, `T4`). |
| **Autonomous agent given unlogged write access to a production repository or financial ledger without diff review or rollback** | High risk under NIST *Govern* and *Manage* functions (lack of human oversight). | **Fails `E5` (Governability of consequential actions) and `T4`:** Consequential operations lack proportionate authorization, auditability, and reversal. |

## 5. How this shapes the evaluation methodology

1. **Test T4 (Operational transparency and control):** Specifically requires evaluators to test AI-assisted or automated features for prior authorization boundaries, diff/audit visibility, uncertainty disclosure, and rollback capability.
2. **Provider-withdrawal test applied to AI dependencies (`T3`, `T5`):** Evaluators block access to external AI inference endpoints during Stage 3 of the laboratory protocol to verify that the core application and all previously created records remain fully usable (`E4`).

## 6. Primary sources and further reading

- National Institute of Standards and Technology (NIST), *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, NIST AI 100-1, U.S. Department of Commerce, January 2023. https://doi.org/10.6028/NIST.AI.100-1
- B. Shneiderman, *Human-Centered AI*, Oxford University Press, 2022. https://doi.org/10.1093/oso/9780192845290.001.0001
- OECD, *Recommendation of the Council on Artificial Intelligence*, OECD/LEGAL/0449, 2019 (updated 2024). https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449

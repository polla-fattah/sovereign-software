+++
title = "How Sovereign Software Is Evaluated"
description = "The formal reference for the Sovereign Software Evaluation Framework v2.0: six prioritized principles, five eligibility requirements, weighted scoring, seven verification tests, and classification rules."
layout = "methodology"
weight = 4
+++

This page is the formal reference for the **Sovereign Software Evaluation Framework, version 2.0**. The [manifesto](../read/) states the philosophy, the [evaluator](../evaluator/) applies this method in your browser, and the [Index](../directory/) records assessments made with it. Everything on this page is generated from the same versioned data file that the evaluator uses, so the two cannot disagree about weights, requirements, or thresholds.

The framework is a proposed editorial standard. It is not an externally accredited certification scheme, and "meets the proposed standard" never means third-party approval.

## 1. Purpose and Scope

The framework answers one question: how well does a piece of software protect its user's long-term control over their software and information? It is designed for personal and professional software that holds user data, from notes and ledgers to CAD and operating systems. It is not a general quality rating. A program can be excellent software and still be poor sovereign software, and the reverse.

It evaluates one specific version of a product, in a stated deployment model, using documented evidence.

## 2. Principles and Definitions

The six principles remain the foundation. Their order and weights express evaluation priority, not permission to ignore the lower-weighted principles.

{{< fw-principles >}}

## 3. Rationale for the Priority Order

The order follows a chain of reasoning, from authority to attention:

* **Sovereignty determines authority.** If someone else can revoke your access, nothing else about the software is yours.
* **Longevity preserves that authority through time.** Authority over information that cannot be read in ten years has little value.
* **Locality reduces dependence on external infrastructure.** Local operation is how authority and preservation are practically exercised.
* **Predictability creates trustworthy behavior.** Control is only useful when you can understand and trust what the software does.
* **Focused Interoperability allows independent tools to cooperate.** It protects freedom of choice once the foundations hold.
* **Responsiveness protects human attention.** It matters in every interaction, but it is the easiest property to improve and the least likely to trap anyone.

An extremely fast application that traps essential data cannot earn the highest classification. A slower application with documented, recoverable information should not be rejected on responsiveness alone. This hierarchy is a deliberate normative engineering framework. It is not an established scientific law.

## 4. Explanation of Weights

{{< fw-weights >}}

The weights total 100. Sovereignty and Longevity together contribute half of the numerical evaluation because they protect the user's long-term control over software and information. The weights are the manifesto's proposed normative priorities, not experimentally validated measurements. They can be changed in one place, `data/framework.json`, and the evaluator, this page, and the tests all follow.

## 5. Mandatory Eligibility Requirements

Before the numerical score can lead to a certified tier, five requirements must be established with evidence. They draw on Sovereignty and Longevity because a failure there is a failure of the framework's purpose.

{{< fw-eligibility >}}

* A **verified failure** of any requirement prevents every certified tier.
* An **unverified** requirement prevents a final certification decision, but it is never presented as a failure.
* **Not Applicable** is accepted only with a documented justification, and only when the requirement genuinely does not apply to the software. Without a justification it is treated as Not Verified.
* Eligibility rests on evidence and observed capabilities, not on a self-reported score. The evaluator lets you continue the assessment when a requirement fails, so you can still see the software's strengths and weaknesses.

## 6. Numerical Rating Anchors

Each principle is rated on a whole-number scale from 0 to 5, or marked as not assessed.

{{< fw-anchors >}}

The anchors are guidance for consistent rating. A rating of 1, 2 or 4 sits between the described levels. Every rating should come with an evidence statement, any known limitations, and a confidence level.

## 7. The Scoring Formula

For a fully assessed application:

> **Weighted score = the sum, over the six principles, of (rating / 5) × weight**

The maximum is 100. For example, with ratings of 5, 2, 5, 5, 5 and 5 in priority order, the contributions are 25, 10, 20, 15, 10 and 5, for a total of 85. If any principle is not assessed, no final score is shown. The evaluator displays how many principles have been rated and which ones are missing. Scores are shown rounded down to one decimal place, so a value never appears to reach a threshold it has not reached.

The formula is implemented once, in a single script that the evaluator, the Index, and the automated tests all use.

## 8. Classification Thresholds

{{< fw-tiers >}}

The order of precedence is fixed: a verified critical failure, then incomplete or unverified mandatory evidence, then incomplete quality assessment, then Tier 1, Tier 2 and Tier 3. A critical failure cannot be bypassed by achieving a high numerical score. The thresholds are proposed editorial policy.

## 9. Relationship Between the Tests and the Principles

The seven engineering tests from the original manifesto remain, but they are now verification instruments. They gather evidence. They do not produce a separate, equally weighted score.

{{< fw-tests >}}

The six principles determine the score, and the seven tests collect and verify the evidence behind each rating. Test 7 is cross-cutting: it maps to the principles it informs and has no weight of its own. A single finding is recorded once, under the principle it primarily affects, and other principles may cite it but are not scored on it again. The evaluator shows how many verification items you checked for each principle as evidence coverage, and it never turns those counts into a score.

## 10. Evidence Requirements

Tier 1 and Tier 2 require sufficient documented evidence. In this framework that means:

* every principle rating has an evidence statement of at least ten characters;
* every eligibility requirement marked Pass has an evidence statement, and every Not Applicable has a justification;
* no principle is rated with Low confidence or with no stated confidence.

Product descriptions are not tested observations. Evidence should say what was checked, how, against which version, and where the reader can verify it, with a source link where one exists. A software tool should not be recorded as passing a test that was not actually performed.

## 11. Assessment Confidence and Uncertainty

Each rating carries a confidence level of High, Medium, or Low. Low confidence is allowed and often honest, but it prevents Tier 1 and Tier 2 and appears as a warning in the results. Ratings are judgments, so two evaluators may differ. Recording the evidence and confidence makes those differences visible and open to challenge.

## 12. Treatment of Unavailable Evidence

Missing evidence is never converted into a pass, and it is never converted into a zero.

* An unassessed principle is **not assessed**, not 0. It withholds the final score and the classification becomes Unverified.
* An unverified eligibility requirement withholds certification and is not counted as a failure.
* A provisional score that ignores unassessed principles is deliberately not offered, because it would not be comparable with a complete score.

## 13. Version-Specific Assessments

Software changes. An assessment applies to the version, platform, and deployment model that were evaluated, and it records the date and the framework version. A new major version of a product, a change of license or hosting model, or the discontinuation of a service can change the result and calls for a new assessment. Self-hosted and vendor-hosted deployments of the same product can deserve different ratings.

## 14. Exceptions and Contextual Interpretation

The framework is applied with judgment, and exceptions must be deliberate, bounded, and documented.

* **Core versus communication.** A messaging application inherently needs a network to reach another person. Locality asks whether reading stored messages, composing drafts, browsing history, and exporting data still work without unnecessary remote authorization.
* **Binary formats are acceptable.** Longevity does not require plain text. SQLite or another documented binary format can satisfy it with independently verifiable preservation and recovery.
* **Expensive computation.** The 100 millisecond target applies to perceptual feedback for routine interactions. A long simulation is not a defect, and engineering and scientific applications are not disqualified because heavy operations take longer. Immediate acknowledgement, progress, and the ability to cancel are what count.
* **Numerical reproducibility.** Predictability allows stated numerical tolerances and platform differences. It does not demand bit-for-bit identical output everywhere.
* **Comprehensive applications.** A broad application is not automatically a bad monolith. Its architecture is judged on coherence and replaceability.
* **Optional cloud services.** An optional service the user can decline or replace is not a sovereignty violation. A mandatory vendor-controlled service that can revoke essential functionality is a serious concern.

## 15. Reassessment and Versioning Policy

* **Framework versions.** The framework is versioned. This page describes version 2.0, which replaced version 1.0, a model of seven equally weighted pass/fail tests. The manifesto records the change history.
* **Historical assessments** keep the framework version they were made under. They are never rewritten silently. When thresholds or weights change, old assessments are reassessed and marked, and are not reinterpreted.
* **Legacy classifications.** Index entries that were classified under version 1.0 keep that classification only as labeled history. They are shown as Unverified under version 2.0 until they are actually reassessed, and no ratings are inferred from the old tier.
* **Reassessment** is proposed when a product releases a new major version, changes its license or hosting model, or when the evidence is more than a year old.

## 16. Worked Examples

The examples are hypothetical illustrations of how the rules behave. They are not audits of any real product.

{{< fw-examples >}}

## 17. Limitations of the Framework

* The priorities, weights and thresholds are normative choices. Reasonable people could choose differently, and they have no experimental validation.
* Ratings are judgments. They depend on the evaluator's knowledge, the evidence available, and the version assessed.
* Whole-number ratings and pass/fail eligibility are coarse, and a single score cannot describe every trade-off. Read the principle scores, the evidence, and the limitations along with the tier.
* Self-assessment can be biased. Without independent review the result is an opinion supported by evidence, not a verified fact.
* The framework measures how well software protects user control. It does not measure features, usability, security in depth, or fitness for any particular task.
* The tiers are proposed editorial policy. Nobody grants a certificate, and no third party has accredited the scheme.

## Distinguishing the Terms

| Term | What it is | Example |
| --- | --- | --- |
| Philosophical principle | A statement of what matters | Sovereignty: the user retains ultimate authority |
| Engineering requirement | A condition the software must satisfy | E2: a documented, workable exit and migration path |
| Verification test | An instrument that gathers evidence | T1: the Ownership and Exit Test |
| Assessment score | A weighted number from the ratings | 85 out of 100 |
| Certification decision | A classification under the proposed rules | Not Certified: Critical Failure |

A high weighted score never overrides a critical eligibility failure.

## Assessment File Format

The evaluator exports assessments as Markdown and as JSON, both generated in your browser. Nothing is sent anywhere. The JSON file carries a `schemaVersion` of `2.0`, the framework name and version, the software identity, the evaluation details, the status and evidence of each eligibility requirement, the rating, evidence, limitations, confidence and sources of each principle, and the checked items of each verification test. It also carries a `derived` block with the score and classification, which is informational: those values are recomputed from the rest of the file on import, so an edited file cannot claim a classification it has not earned.

The formal description is the [JSON Schema](../schema/assessment-2.0.schema.json). Imports are validated, unknown or malformed data is rejected with a clear message, and URLs must use http or https. Because the schema version is stored in every file, older assessments stay interpretable if the methodology changes.

+++
title = "How Sovereign Software Is Evaluated"
description = "The formal reference for the proposed Sovereign Software Evaluation Framework v3.0: four principles, five fundamental requirements, evidence-led findings, and qualified determinations, with no numerical score."
layout = "methodology"
weight = 4
+++

This page is the formal reference for the **Sovereign Software Evaluation Framework, version 3.0 (proposed)**. The [manifesto](../read/) states the philosophy, the [evaluator](../evaluator/) applies this method in your browser, and the [Index](../directory/) records assessments made with it. Everything on this page is generated from the same versioned data file that the evaluator uses, so the two cannot disagree about principles, requirements, or rules.

The framework is deliberately **evidence-led and unscored**. It adopts no weighting scheme, numerical score, or tier threshold, and it is not an externally accredited certification scheme. "Meets the proposed core requirements" never means third-party approval.

## 1. Purpose and Scope

The framework asks one question: when the software, the vendor, the network, or the fashionable technology changes, does the person still retain meaningful control over their work? It is designed for software that holds user information, from notes and ledgers to simulation and operating systems.

It is not a general quality rating. A program can be excellent software and still fall short as sovereign software, and the reverse. It evaluates one specific version of a product, in a stated deployment model, using documented evidence.

## 2. Principles and Definitions

Four principles express the philosophy. They define what an implementation must make possible. They do not prescribe a language, a database, a license, an operating system, or a user-interface style.

{{< fw-principles >}}

## 3. The Order Is a Relationship, Not a Ranking

The principles are presented in a deliberate conceptual order. The order describes how they relate. It is not a scientifically measured ranking.

{{< fw-relationship >}}

All four matter. No single score can excuse a proven loss of fundamental user control, and that is why the framework relies on fundamental requirements and evidence, not on arithmetic.

## 4. Why There Are No Weights, Scores, or Tiers

An earlier version of this framework (2.0) weighted six principles at 25, 25, 20, 15, 10, and 5 and assigned tiers by score. That model is superseded. Its weights are not silently reassigned to the four current principles, because the principles changed in meaning and number, and because the weights themselves were never validated.

**No weighting scheme or tier threshold is adopted without separate justification, representative testing across disciplines, and a published methodology.** Until such a method exists, the framework publishes an evidence-led principle profile and a clearly qualified overall determination. A scored method may be developed in the future, but no arithmetic should ever allow excellent speed or elegant architecture to compensate for the loss of essential user authority.

## 5. Fundamental Eligibility Requirements

Five requirements express the loss of fundamental control that no other quality can excuse. They are drawn from verified evidence, not from impressions.

{{< fw-eligibility >}}

* A **verified failure** of any requirement means the software cannot earn the highest classification, whatever else it does well.
* A requirement that is **not verified** prevents a determination. It is never presented as a failure, and it is never counted as a pass.
* **Not Applicable** is accepted only with a documented justification, and only when the requirement genuinely does not apply to the software. Without a justification it is treated as Not Verified.
* The evaluator lets you continue the assessment when a requirement fails, so you can still see the software's strengths and weaknesses.

## 6. Principle Findings

Each principle receives an evidence-based finding. There is no number. A finding must come with the observations behind it.

{{< fw-findings >}}

The descriptions are guidance for consistent judgment. Every finding should state its observations, the sources where a reader can check them, the known limitations, and a level of confidence (High, Medium, or Low).

## 7. Determination Rules

The overall determination is qualified, and it follows a fixed order of precedence.

{{< fw-determinations >}}

A principle assessed as not met does not by itself make the determination a failure. The fundamental requirements carry that role. A principle that is only partially met, or not met, gives "partially aligned" and appears in the weaknesses with a recommendation. These rules are proposed editorial policy.

## 8. Relationship Between the Supporting Tests and the Principles

The seven engineering tests gather evidence. They are not interchangeable philosophical pillars, and they carry no weight or score of their own.

{{< fw-tests >}}

The principles define the destination, and the tests show whether the software reaches it. The last two tests are supporting quality and implementation considerations. Interoperability and maintainability matter because they can reduce lock-in and support recovery. Human experience and performance matter for any good product. **Neither responsiveness nor narrow functional scope is a prerequisite for being Sovereign Software.** A sub-100 millisecond interaction target is useful in many interfaces, but it is not a universal sovereignty test.

A finding is recorded once, under the principle it primarily affects. Other principles may cite it, but it is not counted again. The evaluator shows how many verification items you checked for each principle as evidence coverage, and it never turns those counts into a score.

## 9. Evidence Requirements

A determination of "meets the proposed core requirements" or "partially aligned" requires sufficient documented evidence. In this framework that means:

* every principle finding has an observations statement of at least ten characters;
* every fundamental requirement marked Pass has an evidence statement, and every Not Applicable has a justification;
* no finding rests on Low or unstated confidence.

Product descriptions are not tested observations. Evidence should say what was checked, how, against which version, and where a reader can verify it. Software must not be recorded as passing a test that was not actually performed. Each claim discloses the application version, the scope, the observations, the sources, the limitations, and the assessment date.

## 10. Assessment Confidence and Uncertainty

Each finding carries a confidence level. Low confidence is often honest, but a finding that rests on it does not support a determination: it gives "insufficient evidence". Findings are judgments, so two evaluators may differ. Recording evidence and confidence makes those differences visible and open to challenge.

## 11. Treatment of Unavailable Evidence

Missing evidence is never converted into a pass, and it is never converted into a failure.

* An unassessed principle is **not assessed**. The determination becomes "insufficient evidence".
* An unverified requirement withholds the determination and is not counted as a failure.
* A provisional determination that ignores what has not been assessed is deliberately not offered.

## 12. Version-Specific Assessments

Software changes. An assessment applies to the version, platform, and deployment model that were evaluated, and it records the assessment date and the framework version. A new major version of a product, a change of license or hosting model, or the discontinuation of a service can change the result and calls for a new assessment. Self-hosted and vendor-hosted deployments of the same product can deserve different findings. Historical classifications remain historical and are not automatically renewed.

## 13. Exceptions and Contextual Interpretation

Tests must be adapted to the software's actual purpose and deployment setting. An offline text editor, a distributed messaging system, and a scientific simulation cannot be judged by identical assumptions about networking or operation duration.

* **Inherent versus imposed dependencies.** A messaging service inherently needs a network. Locality asks whether a dependency is inherent to the task or imposed by a business or architectural decision.
* **Managed services.** A managed service can respect sovereignty if meaningful exit, independent access, recovery, and replaceability remain available. Local installation alone proves nothing if essential functions can be revoked remotely.
* **Binary formats are acceptable.** Longevity does not require plain text. A documented binary format, such as SQLite, can support it when independent tooling, complete exports, and tested recovery exist.
* **Determinism is not the principle.** Transparency concerns governability. A deterministic black box can still deny control, and a statistical system can remain governable when its boundaries, permissions, and effects are transparent.
* **Numerical reproducibility** is judged within documented assumptions and tolerances, not by demanding identical output everywhere.
* **Comprehensive applications.** Software does not become non-sovereign merely for offering many features.

## 14. Reassessment and Versioning Policy

* **Framework versions.** This page describes version 3.0, which is proposed. It supersedes version 2.0 (six weighted principles, five eligibility gates, and seven verification tests) and version 1.0 (six principles in an earlier order and seven equal pass/fail tests). The manifesto records the change history.
* **Historical assessments** keep the framework version they were made under. They are never rewritten silently, and they are not reinterpreted when the framework changes.
* **Legacy classifications.** Index entries that were classified under version 1.0 keep that classification only as labeled history. They are shown as having insufficient evidence under version 3.0 until they are actually reassessed. No findings are inferred from the old tier.
* **Reassessment** is proposed when a product releases a new major version, changes its license or hosting model, or when the evidence is more than a year old.

## 15. Worked Examples

The examples are hypothetical illustrations of how the rules behave. They are not audits of any real product.

{{< fw-examples >}}

## 16. Limitations of the Framework

* The principles, the requirements, and the determination rules are normative choices. Reasonable people could choose differently.
* Findings are judgments. They depend on the evaluator's knowledge, the evidence available, and the version assessed.
* Three finding levels and pass/fail requirements are coarse. Read the principle profile, the evidence, and the limitations along with the determination.
* Self-assessment can be biased. Without independent review the result is an opinion supported by evidence, not a verified fact.
* The framework measures how well software protects user control. It does not measure features, usability, security in depth, or fitness for any particular task.
* A scored method has not been validated, and none is offered. Nobody grants a certificate, and no third party has accredited the scheme.

## Distinguishing the Terms

| Term | What it is | Example |
| --- | --- | --- |
| Philosophical principle | A statement of what matters | Sovereignty: authority belongs to the user |
| Fundamental requirement | A condition whose verified failure cannot be offset | E2: a practicable way to leave without unacceptable loss |
| Supporting engineering test | An instrument that gathers evidence | T1: the Ownership and exit test |
| Finding | An evidence-based judgment about one principle | Longevity: partially meets |
| Overall determination | A qualified conclusion under the proposed rules | Fails a fundamental requirement |

A strength in one area never overrides a verified failure of a fundamental requirement.

## Assessment File Format

The evaluator exports assessments as Markdown and as JSON, both generated in your browser. Nothing is sent anywhere. The JSON file carries a `schemaVersion` of `3.0`, the framework name, version, and status, the software identity, the evaluation details, the status and evidence of each fundamental requirement, the finding, observations, limitations, confidence, and sources of each principle, and the checked items of each supporting test. It also carries a `derived` block with the determination, which is informational: it is recomputed from the rest of the file on import, so an edited file cannot claim a determination it has not earned.

The formal description is the [JSON Schema](../schema/assessment-3.0.schema.json). Imports are validated, malformed data is rejected with a clear message, and URLs must use http or https. Files in the superseded 2.0 layout are not accepted, because their ratings and weights have no equivalent in this framework.

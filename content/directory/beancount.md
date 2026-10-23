+++
title = "Beancount"
category = "Tasks & Finance"
summary = "Plain-text double-entry accounting that checks ledger invariants locally, without bank scraping or a subscription."
substrate = "UTF-8 plain-text Beancount ledgers"
sync_model = "Git version control or file sync"
extract_cmd = "bean-query ledger.beancount 'SELECT account, sum(position)'"
aliases = ["/directory/beancount-hledger/"]
pilot_stage = 3
limitations = ["Readable postings with omitted amounts/costs still require accounting interpretation.","Automatic padding can add balancing entries; balance success alone does not prove historical completeness."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit 9747213802acb733ce53acc6e963f5961f47d6cd"
assessment_notes = "Individually reconciled in rating batch 7 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

[[evidence]]
target = "E1"
text = "The published vesting ledger is independently readable text containing dated directives, multiple commodities, explicit share-cost literals such as {131.3700 USD}, metadata links and postings with deliberately omitted amounts. It distinguishes records from evaluation rules; simply summing the visible numbers is not a validated independent balance or cost-basis reconstruction."
url = "https://github.com/beancount/beancount/blob/9747213802acb733ce53acc6e963f5961f47d6cd/examples/vesting/vesting.beancount"
confidence = "high"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official documentation for this entry provides a relevant independent interpretation and recovery lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The padding pass synthesizes and inserts Transaction entries after Pad directives to satisfy later balance checks. Its source states that it operates per account/per currency rather than automatically across parent-child account relationships. A pad-generated balancing entry is therefore an accounting transformation to inspect, not evidence that every original transaction was present or correct."
url = "https://github.com/beancount/beancount/blob/9747213802acb733ce53acc6e963f5961f47d6cd/beancount/ops/pad.py"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Beancount does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Beancount's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/beancount/beancount/blob/9747213802acb733ce53acc6e963f5961f47d6cd/examples/vesting/vesting.beancount"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/beancount/beancount/blob/9747213802acb733ce53acc6e963f5961f47d6cd/beancount/ops/pad.py"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The ledger exposes dated directives, costs, commodities, metadata and omitted amounts, but independent exact balance/lot/FX interpretation and plugin-expanded meaning are not established. Readable text is not a complete replacement evaluator or a reconstruction of all essential accounting invariants."
url = "https://github.com/beancount/beancount/blob/9747213802acb733ce53acc6e963f5961f47d6cd/examples/vesting/vesting.beancount"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Padding synthesizes accounting transactions with account/currency-specific limits. That is an inspectable transformation, not proof of complete original data or automatic accounting correctness. Effective plugin/import authorization, change review and reversal across the declared ledger remain insufficiently evidenced."
url = "https://github.com/beancount/beancount/blob/9747213802acb733ce53acc6e963f5961f47d6cd/beancount/ops/pad.py"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish an alternative accounting workflow preserving omitted-amount inference, lots, prices, currencies and plugin-derived meaning. Ordinary ledger text readability does not complete that semantic migration."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The published vesting ledger is independently readable text containing dated directives, multiple commodities, explicit share-cost literals such as {131.3700 USD}, metadata links and postings with deliberately omitted amounts. It distinguishes records from evaluation rules; simply summing the visible numbers is not a validated independent balance or cost-basis reconstruction. [Source](https://github.com/beancount/beancount/blob/9747213802acb733ce53acc6e963f5961f47d6cd/examples/vesting/vesting.beancount).
- [x] Resolved: The padding pass synthesizes and inserts Transaction entries after Pad directives to satisfy later balance checks. Its source states that it operates per account/per currency rather than automatically across parent-child account relationships. A pad-generated balancing entry is therefore an accounting transformation to inspect, not evidence that every original transaction was present or correct. [Source](https://github.com/beancount/beancount/blob/9747213802acb733ce53acc6e963f5961f47d6cd/beancount/ops/pad.py).
- [ ] Open: Independent exact balance/lot/FX reproduction, plugin effects, migration to another ledger, v2/v3 compatibility, report fidelity and actual editing/recovery. E5 needs plugin/import and generated-transaction review, visible source changes and correction/restore boundaries; balancing alone does not establish oversight.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-7/.

**Human-readable criteria:** Can an independent person read the ledger, validate it, reproduce its reports, preserve its currencies and metadata, and continue accounting without Beancount.io or another hosted service?

**Verification scenario:** Independently parse postings, lots, prices, currencies, and reports, and run ledger balance invariants.

**What may invalidate an overconfident claim:** Do not conflate with hledger; syntax, extensions, and semantics differ.

**Documentation starting point:** <https://beancount.github.io/docs/>

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Independent exact balance/lot/FX reproduction, plugin effects, migration to another ledger, v2/v3 compatibility, report fidelity and actual editing/recovery. E5 needs plugin/import and generated-transaction review, visible source changes and correction/restore boundaries; balancing alone does not establish oversight.

**Next without installing locally:** Use a synthetic ledger with expected balances, lots/FX, plugin configuration and source hashes; compare an independent evaluator or supplied result record, and inspect pad/import/plugin diffs and recovery evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-7/`. Overall: **Insufficient evidence**.

+++
title = "hledger"
category = "Tasks & Finance"
summary = "Plain-text double-entry accounting with a command-line and web interface, reading journal files the user keeps."
substrate = "UTF-8 plain-text hledger journals"
sync_model = "Git version control or file sync"
extract_cmd = "hledger -f ledger.journal balance"
pilot_stage = 3
limitations = ["The journal example was read, not evaluated by hledger or another accounting engine.","Import checkpoint state and input rules must be preserved to assess duplicate handling."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd"
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
text = "The upstream borrowing example is readable as ordinary journal text, including dated transactions, posting account paths, amounts and explanatory comments. This establishes inspectable source records rather than a binary-only ledger. It does not establish independently recomputed balances, commodity-cost handling or lossless Beancount conversion."
url = "https://github.com/hledgerorg/hledger/blob/cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd/examples/borrowing.journal"
confidence = "high"

[[evidence]]
target = "E2"
text = "The journal is a human-readable file that can be opened with a text editor and selected explicitly with -f or LEDGER_FILE, supporting a practical exit path."
url = "https://hledger.org/1.9/manual.html"
confidence = "high"

[[evidence]]
target = "E3"
text = "The project documents version-control workflows for journal files, but an independent restore and semantic equivalence test were not performed."
url = "https://hledger.org/workflows.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The workflow documentation supports keeping journals in a user-controlled folder and operating from local files."
url = "https://hledger.org/workflows.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Import sets new_=True and defers saving .latest state until successful processing. Its dry-run branch prints prospective transactions; the reader receives _dryrun with an explicit no-archive/no-data-file-removal/no-generating-command policy. Non-dry import appends transactions and then saves checkpoint dates. Idempotence therefore depends on checkpoint/input handling, not a universal duplicate-proof import guarantee."
url = "https://github.com/hledgerorg/hledger/blob/cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd/hledger/Hledger/Cli/Commands/Import.hs"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for hledger does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://hledger.org/1.9/manual.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for hledger's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/hledgerorg/hledger/blob/cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd/examples/borrowing.journal"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The documented workflow is local-file-first and can operate without a hosted account for the journal and reports."
url = "https://hledger.org/workflows.html"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/hledgerorg/hledger/blob/cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd/hledger/Hledger/Cli/Commands/Import.hs"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Readable journal text and documented version-control workflows preserve source records, while no clean reconstruction establishes equivalent balances, costs, comments/tags and import context. The original finance profile requires independent semantic interpretation, not merely copying journal bytes."
url = "https://github.com/hledgerorg/hledger/blob/cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd/examples/borrowing.journal"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Import dry-run and deferred checkpoint updates are concrete safeguards; non-dry import appends transactions and persists checkpoint state. Effective duplicate handling, import/checkpoint configuration, source mutation visibility and recourse after bad imports are not sufficiently covered for whole-scope E5."
url = "https://github.com/hledgerorg/hledger/blob/cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd/hledger/Hledger/Cli/Commands/Import.hs"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish independent-workflow preservation of essential cost/commodity, posting and metadata semantics. Text access and file selection alone do not demonstrate the declared alternative-ledger transition."
url = "https://hledger.org/1.9/manual.html"
confidence = "medium"

+++

**Verification scenario:** Reconstruct postings and cost basis; use a text export and an alternative ledger interpreter.

**What may invalidate an overconfident claim:** Evaluate independently of Beancount and test migration mismatches between the two.

**Documentation starting point:** <https://hledger.org/>

**Evidence update: 23 October 2026**

- [x] Resolved: The upstream borrowing example is readable as ordinary journal text, including dated transactions, posting account paths, amounts and explanatory comments. This establishes inspectable source records rather than a binary-only ledger. It does not establish independently recomputed balances, commodity-cost handling or lossless Beancount conversion. [Source](https://github.com/hledgerorg/hledger/blob/cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd/examples/borrowing.journal).
- [x] Resolved: Import sets new_=True and defers saving .latest state until successful processing. Its dry-run branch prints prospective transactions; the reader receives _dryrun with an explicit no-archive/no-data-file-removal/no-generating-command policy. Non-dry import appends transactions and then saves checkpoint dates. Idempotence therefore depends on checkpoint/input handling, not a universal duplicate-proof import guarantee. [Source](https://github.com/hledgerorg/hledger/blob/cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd/hledger/Hledger/Cli/Commands/Import.hs).
- [ ] Open: Runtime JSON/text/Beancount round trips, balances/costs/comments/tags comparison, duplicate imports with and without checkpoints, clean-directory restore and old/new version behavior. E5 needs effective import/checkpoint controls, duplicate cases, visible changes and safe correction; dry-run is a bounded control, not universal idempotence.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-7/.

**Human-readable criteria:** Can a user export complete records, preserve invariants and metadata, restore them independently, and continue the essential workflow without provider permission?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Runtime JSON/text/Beancount round trips, balances/costs/comments/tags comparison, duplicate imports with and without checkpoints, clean-directory restore and old/new version behavior. E5 needs effective import/checkpoint controls, duplicate cases, visible changes and safe correction; dry-run is a bounded control, not universal idempotence.

**Next without installing locally:** Inspect synthetic journals plus input/checkpoint/configuration records and expected balances/costs; obtain independent-reader or external round-trip comparisons and same-version dry-run/duplicate/correction evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-7/`. Overall: **Insufficient evidence**.

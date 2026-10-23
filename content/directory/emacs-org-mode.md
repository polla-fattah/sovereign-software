+++
title = "Emacs Org-Mode"
category = "Knowledge & Office"
summary = "The grand-ancestor of sovereign personal computing. Unifies structured prose, deterministic agendas, tables, and literate programming inside immortal plain text."
substrate = "Plain-Text .org Outlines"
sync_model = "Git / rsync / Syncthing"
extract_cmd = "emacs --batch file.org -f org-html-export-to-html"
pilot_stage = 1
limitations = ["Readable Org syntax does not recover evaluated formulas, attachments or arbitrary Babel results.","Babel controls are configurable; source defaults do not establish a user's effective security settings."]
assessment_status = "complete"
assessment_date = "2026-10-23"
version_assessed = "Source commit 38e0eaeec4b1b3482be1afbf77373457bacd93f2"
assessment_notes = "Rating reconciliation batch 1: E3 Not Verified; E5 Not Verified. Longevity Not assessed; Transparency and Control Not assessed. See the declared scope and reasons below; earlier bounded evidence findings remain recorded."

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
locality = "meets"

[[evidence]]
target = "E1"
text = "Standard text inspection of the upstream babel.org fixture identifies 33 headings, links/properties and 45 source blocks, including Emacs Lisp, shell and Org blocks. These structures are readable without Emacs. No block was executed and no export, formula evaluation or attachment restoration was performed."
url = "https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/testing/examples/babel.org"
confidence = "high"

[[evidence]]
target = "E2"
text = "Org exports to HTML, LaTeX, ODT, PDF, and plain text, but preservation of every extension and executable block across other tools was not tested."
url = "https://orgmode.org/worg/exporters/index.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Text files and documented syntax support independent recovery, while links, includes, Babel results, and external assets require a complete archive test."
url = "https://orgmode.org/manual/Export-Settings.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Editing and export are local operations and do not require a vendor service."
url = "https://orgmode.org/org.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The pinned source sets org-confirm-babel-evaluate to t and explicitly handles no/never and no-export/never-export evaluation arguments. Confirmation can be disabled or supplied as a function. This establishes the defined default and control branches, not the effective configuration of every buffer or proof that opening/exporting arbitrary documents is safe."
url = "https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/lisp/ob-core.el"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Plain-text source and broad export support give users strong custody and exit."
url = "https://orgmode.org/worg/exporters/index.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 remains Not Verified for the existing essential-record scope. The methodology requires established E3 before a positive Longevity finding, so the earlier positive rating is withdrawn pending recovery evidence; source/format strengths are retained as facts, not graded as a failure."
url = "https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/testing/examples/babel.org"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core editing, agenda, and export workflows operate locally."
url = "https://orgmode.org/org.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "E5 remains Not Verified. The methodology's Partially meets threshold requires demonstrated minimum oversight, so the earlier positive Transparency and Control finding is withdrawn rather than retained on the strength of one documented control. This is Not assessed, not Does not meet."
url = "https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/lisp/ob-core.el"
confidence = "medium"
[[evidence]]
target = "E3"
text = "The retained Org fixture is independently readable and exposes headings, links/properties and source blocks, but the knowledge_notes profile also needs attachment/ID-link relocation and preserved executable/agenda/table meaning. These have not been reconstructed. Plain-text readability is positive E1 evidence, not sufficient E3 recovery evidence."
url = "https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/testing/examples/babel.org"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The pinned Babel code establishes a confirmation default and evaluation-control branches. Effective buffer settings, export-time evaluation, hooks and consequential editing/reversal have not been comprehensively checked. Defaults and the existence of a prompt cannot alone justify E5 for the existing broad literate-programming scope."
url = "https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/lisp/ob-core.el"
confidence = "medium"

+++

**Verification scenario:** Open an Org archive in a clean Emacs and an independent parser; validate Babel code, agenda, ID links, and attachment paths.

**What may invalidate an overconfident claim:** Text syntax alone does not preserve arbitrary executable blocks and extensions.

**Documentation starting point:** <https://orgmode.org/manual/>

**Evidence update: 23 October 2026**

- [x] Resolved: Standard text inspection of the upstream babel.org fixture identifies 33 headings, links/properties and 45 source blocks, including Emacs Lisp, shell and Org blocks. These structures are readable without Emacs. No block was executed and no export, formula evaluation or attachment restoration was performed. [Source](https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/testing/examples/babel.org).
- [x] Resolved: The pinned source sets org-confirm-babel-evaluate to t and explicitly handles no/never and no-export/never-export evaluation arguments. Confirmation can be disabled or supplied as a function. This establishes the defined default and control branches, not the effective configuration of every buffer or proof that opening/exporting arbitrary documents is safe. [Source](https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/lisp/ob-core.el).
- [ ] Open: Independent full semantic parsing, export losses, ID/attachment/include relocation, actual Babel prompt/export behavior under local settings, cryptography, undo and older-version compatibility.

**Assessment follow-up:** E3/E5 and their associated principle findings are now reconciled in rating batch 1 below. Earlier source/fixture observations remain valid within their stated scope; they are not themselves blanket Pass decisions.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

## Rating reconciliation: 23 October 2026

**Scope:** The existing source-pinned application scope; no new application execution. Individual-custodian perspective. The existing broad preservation/workflow scope is retained, rather than narrowed to the one successfully inspected source path.

| Criterion | Current finding |
|---|---|
| E3 Independent interpretation and recovery | Not Verified |
| E5 Governability of consequential actions | Not Verified |
| Longevity | Not assessed |
| Transparency and Control | Not assessed |

**E3:** The retained Org fixture is independently readable and exposes headings, links/properties and source blocks, but the knowledge_notes profile also needs attachment/ID-link relocation and preserved executable/agenda/table meaning. These have not been reconstructed. Plain-text readability is positive E1 evidence, not sufficient E3 recovery evidence.

**E5:** The pinned Babel code establishes a confirmation default and evaluation-control branches. Effective buffer settings, export-time evaluation, hooks and consequential editing/reversal have not been comprehensively checked. Defaults and the existence of a prompt cannot alone justify E5 for the existing broad literate-programming scope.

**longevity:** E3 remains Not Verified for the existing essential-record scope. The methodology requires established E3 before a positive Longevity finding, so the earlier positive rating is withdrawn pending recovery evidence; source/format strengths are retained as facts, not graded as a failure.

**transparency:** E5 remains Not Verified. The methodology's Partially meets threshold requires demonstrated minimum oversight, so the earlier positive Transparency and Control finding is withdrawn rather than retained on the strength of one documented control. This is Not assessed, not Does not meet.

**Evidence record:** evidence/rating-reconciliation/batch-1/README.md and runtime-results.json. No target software was installed. Source inspections remain source inspections; no application-level recovery or destructive action was executed.

**Remaining work:** The existing open recovery and consequential-action scenarios remain pending; the individually explained E3/E5 blockers above determine the current Not Verified and Not assessed findings.

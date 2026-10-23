+++
title = "Todo.txt"
category = "Tasks & Finance"
summary = "The simplest possible task format: one line per task, with priority, project and context markers readable by any text tool."
substrate = "Single plain-text file, one task per line"
sync_model = "Git / Syncthing"
extract_cmd = "grep '^(A)' todo.txt"
pilot_stage = 1
limitations = ["Plain-text portability does not standardize every extension's behavior.","Completion/archive change source files and can remove priority; full recovery remains untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Format commit 1d90c086533a2574f6039a756ada760ec672a53e; reference CLI commit a9846a232c86937a218d1be45bc4c7631855ee16"
assessment_notes = "Individually reconciled in rating batch 8 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "The official grammar specifies leading priority, optional creation date, completion marker/date, project/context tokens and extensible key:value metadata. Its published examples are retained for independent text inspection. The specification explicitly notes client differences in priority preservation on completion; a due: or rec: token is not by itself proof of shared scheduling behavior across clients."
url = "https://github.com/todotxt/todo.txt/blob/1d90c086533a2574f6039a756ada760ec672a53e/README.md"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://github.com/todotxt/todo.txt"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official documentation for this entry provides a relevant independent interpretation and recovery lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://github.com/todotxt/todo.txt"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://github.com/todotxt/todo.txt"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The reference CLI completion branch removes a leading priority before prepending the completion marker/date. The archive path appends x-marked lines to done.txt and then deletes them from todo.txt, using sed's .bak mechanism. These are file-changing transformations, not an immutable task history; actual interrupted writes, backups and alternative-client behavior were not run."
url = "https://github.com/todotxt/todo.txt-cli/blob/a9846a232c86937a218d1be45bc4c7631855ee16/todo.sh"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Todo.txt does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/todotxt/todo.txt"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Todo.txt's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/todotxt/todo.txt/blob/1d90c086533a2574f6039a756ada760ec672a53e/README.md"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://github.com/todotxt/todo.txt"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/todotxt/todo.txt-cli/blob/a9846a232c86937a218d1be45bc4c7631855ee16/todo.sh"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official text grammar describes task markers/tokens, while clients can differ in priority and extension semantics. Reference completion/archive source changes priority and moves lines between files. Complete recurrence, unknown-tag meaning and task-history reconstruction across clients have not been established."
url = "https://github.com/todotxt/todo.txt/blob/1d90c086533a2574f6039a756ada760ec672a53e/README.md"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The reference CLI's append/delete and backup-file paths are inspectable, but not immutable history or evidence of interrupted-write safety. Delete/deduplicate/replace authority, line-number drift and effective backup/correction across the declared client workflow remain unverified."
url = "https://github.com/todotxt/todo.txt-cli/blob/a9846a232c86937a218d1be45bc4c7631855ee16/todo.sh"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish equivalent priority, recurrence and extension-token behavior in an independent task workflow. Keeping readable task lines does not complete the declared cross-client semantic migration."
url = "https://github.com/todotxt/todo.txt"
confidence = "medium"

+++

**Verification scenario:** Move the file to another implementation and verify priorities, completion, and extension tags.

**What may invalidate an overconfident claim:** Text portability is strong, but conventions for recurrence, dates, and application-specific semantics vary.

**Documentation starting point:** <https://github.com/todotxt/todo.txt>

**Evidence update: 23 October 2026**

- [x] Resolved: The official grammar specifies leading priority, optional creation date, completion marker/date, project/context tokens and extensible key:value metadata. Its published examples are retained for independent text inspection. The specification explicitly notes client differences in priority preservation on completion; a due: or rec: token is not by itself proof of shared scheduling behavior across clients. [Source](https://github.com/todotxt/todo.txt/blob/1d90c086533a2574f6039a756ada760ec672a53e/README.md).
- [x] Resolved: The reference CLI completion branch removes a leading priority before prepending the completion marker/date. The archive path appends x-marked lines to done.txt and then deletes them from todo.txt, using sed's .bak mechanism. These are file-changing transformations, not an immutable task history; actual interrupted writes, backups and alternative-client behavior were not run. [Source](https://github.com/todotxt/todo.txt-cli/blob/a9846a232c86937a218d1be45bc4c7631855ee16/todo.sh).
- [ ] Open: Three-client edits and unknown-tag/priority comparison, recurrence interpretation, actual archive/delete/deduplicate/replace failures and recovery, line-number shifts and older clients. E5 needs effective archive/delete/replace and failure recovery boundaries, including line-number shifts and backup handling.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-7/.

**Human-readable criteria:** Can a user export complete records, preserve invariants and metadata, restore them independently, and continue the essential workflow without provider permission?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Three-client edits and unknown-tag/priority comparison, recurrence interpretation, actual archive/delete/deduplicate/replace failures and recovery, line-number shifts and older clients. E5 needs effective archive/delete/replace and failure recovery boundaries, including line-number shifts and backup handling.

**Next without installing locally:** Use synthetic todo/done/config files with recurrence/unknown tags and expected task identities; compare supported independent clients or their recorded results, and inspect exact reference-CLI mutation/backup cases.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-8/`. Overall: **Insufficient evidence**.

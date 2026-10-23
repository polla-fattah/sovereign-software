+++
title = "Jujutsu (jj)"
category = "VCS & Core"
summary = "Next-generation version control where even conflicts and rebases are recorded as deterministic, first-class mathematical states in an undoable local operation log."
substrate = "Append-only Operation Log + Git Backend"
sync_model = "Git-compatible remotes / Native local"
extract_cmd = "jj op log --limit 20"
limitations = ["Pinned source inspection, not application execution.","Conflicted-change export, actual operation-store copying, older-version recovery and abandon/garbage-collection behavior remain untested."]
pilot_stage = 5
assessment_status = "complete"
assessment_date = "2026-10-23"
version_assessed = "Pinned source 531e8da8066271040b4b1e74ce17a8a941544cce"
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
text = "Jujutsu stores repository history locally and documents operation as a version-control system with command-line access."
url = "https://martinvonz.github.io/jj/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The project documents GitHub and Git interoperability, supporting migration and coexistence with a widely readable repository format."
url = "https://martinvonz.github.io/jj/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Git export invokes export_refs, not an operation-store archive. The separately inspected operation-log model retains repository views, workspace commits and operation metadata: Git export alone does not establish preservation of that full recovery history."
url = "https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/git/export.rs"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The tool operates on local repositories and does not require a hosted account for commits, history, or local inspection."
url = "https://martinvonz.github.io/jj/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Undo restores a parent operation and refuses operations from another workspace unless explicitly overridden. Its implementation warns that undoing workspace removal restores the repository record but not the workspace directory."
url = "https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/undo.rs"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Local repositories and Git interoperability support user authority, with operational recovery still requiring evidence."
url = "https://martinvonz.github.io/jj/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 remains Not Verified for the existing essential-record scope. The methodology requires established E3 before a positive Longevity finding, so the earlier positive rating is withdrawn pending recovery evidence; source/format strengths are retained as facts, not graded as a failure."
url = "https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/git/export.rs"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The fundamental workflow is local and can be performed without a central service."
url = "https://martinvonz.github.io/jj/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "E5 remains Not Verified. The methodology's Partially meets threshold requires demonstrated minimum oversight, so the earlier positive Transparency and Control finding is withdrawn rather than retained on the strength of one documented control. This is Not assessed, not Does not meet."
url = "https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/undo.rs"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The retained operation-log model explains repository-state recovery, while git export exports refs rather than archiving the jj operation store. Independent interpretation and restoration of the preserved operation store, conflicts and workspace state remain unestablished. Invalid partial is replaced by Not Verified, not automatically converted to Pass or Fail."
url = "https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/git/export.rs"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The retained undo implementation provides real cross-workspace guards and explains that a removed workspace directory is not recreated by undo. However operation abandonment/garbage collection, colocated Git changes and actual correction/retention boundaries remain insufficiently covered. These source controls alone do not justify a whole-scope E5 Pass."
url = "https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/undo.rs"
confidence = "medium"

+++

**Verification scenario:** Export Git-backed history and the operation log; test conflicting work and recovery after a clean installation.

**What may invalidate an overconfident claim:** Git interoperability does not imply that all jj operation history and conflict semantics are portable.

**Documentation starting point:** <https://jj-vcs.github.io/jj/latest/>

**Evidence update: 23 October 2026**

- [x] Resolved: Undo restores a parent operation and refuses operations from another workspace unless explicitly overridden. Its implementation warns that undoing workspace removal restores the repository record but not the workspace directory. [Source](https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/undo.rs).
- [x] Resolved: Git export invokes export_refs, not an operation-store archive. The separately inspected operation-log model retains repository views, workspace commits and operation metadata: Git export alone does not establish preservation of that full recovery history. [Source](https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/git/export.rs).
- [ ] Open: Conflicted-change export, actual operation-store copying, older-version recovery and abandon/garbage-collection behavior remain untested.

**Assessment follow-up:** E3/E5 and their associated principle findings are now reconciled in rating batch 1 below. Earlier source/fixture observations remain valid within their stated scope; they are not themselves blanket Pass decisions.

**Human-readable criteria:** Can users retain complete history and metadata, operate and recover locally, migrate to another implementation, and understand the effects of synchronization or automation?

## Rating reconciliation: 23 October 2026

**Scope:** The existing source-pinned application scope; no new application execution. Individual-custodian perspective. The existing broad preservation/workflow scope is retained, rather than narrowed to the one successfully inspected source path.

| Criterion | Current finding |
|---|---|
| E3 Independent interpretation and recovery | Not Verified |
| E5 Governability of consequential actions | Not Verified |
| Longevity | Not assessed |
| Transparency and Control | Not assessed |

**E3:** The retained operation-log model explains repository-state recovery, while git export exports refs rather than archiving the jj operation store. Independent interpretation and restoration of the preserved operation store, conflicts and workspace state remain unestablished. Invalid partial is replaced by Not Verified, not automatically converted to Pass or Fail.

**E5:** The retained undo implementation provides real cross-workspace guards and explains that a removed workspace directory is not recreated by undo. However operation abandonment/garbage collection, colocated Git changes and actual correction/retention boundaries remain insufficiently covered. These source controls alone do not justify a whole-scope E5 Pass.

**longevity:** E3 remains Not Verified for the existing essential-record scope. The methodology requires established E3 before a positive Longevity finding, so the earlier positive rating is withdrawn pending recovery evidence; source/format strengths are retained as facts, not graded as a failure.

**transparency:** E5 remains Not Verified. The methodology's Partially meets threshold requires demonstrated minimum oversight, so the earlier positive Transparency and Control finding is withdrawn rather than retained on the strength of one documented control. This is Not assessed, not Does not meet.

**Evidence record:** evidence/rating-reconciliation/batch-1/README.md and runtime-results.json. No target software was installed. Source inspections remain source inspections; no application-level recovery or destructive action was executed.

**Remaining work:** The existing open recovery and consequential-action scenarios remain pending; the individually explained E3/E5 blockers above determine the current Not Verified and Not assessed findings.

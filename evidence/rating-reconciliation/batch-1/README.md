# Rating reconciliation, batch 1

Reviewed 23 October 2026. This begins the user-authorized reconciliation after the completed evidence sweep. It does not rewrite the framework thresholds or convert documentation availability into Pass.

## Outcome

| Application | E3 | E5 | Longevity | Transparency and Control |
|---|---|---|---|---|
| Git | Pass | Pass | Meets | Partially meets |
| SQLite | Pass | Pass | Meets | Partially meets |
| Fossil SCM | Not Verified | Not Verified | Not assessed | Not assessed |
| Jujutsu | Not Verified | Not Verified | Not assessed | Not assessed |
| Emacs Org-mode | Not Verified | Not Verified | Not assessed | Not assessed |
| QOwnNotes | Not Verified | Not Verified | Not assessed | Not assessed |

Git's E3 is re-established with the missing configuration/submodule material; its E5 is newly established for the predeclared local commands. SQLite's invalid `meets` requirement value is replaced with an individually justified E3 Pass, and its E5 is newly established at the declared API boundary. SQLite E2 and Sovereignty's previous placeholder-backed claims are withdrawn. The other four applications do not receive invented Passes: existing controls are acknowledged but incomplete coverage remains Not Verified; positive principles lacking their required minimum are changed to Not assessed, not Fail.

## Method and reproduction

[plan.json](plan.json) was saved before the new checks and states the roles, essential records, operations and departures. Run `python evidence/rating-reconciliation/batch-1/check_runtime.py` from the repository root. [runtime-results.json](runtime-results.json) records installed versions, commands, expected hashes/metadata and results. Only synthetic data and already-installed Git/Python SQLite were used; no target application was installed. Original Git paths were made unavailable by renaming owned temporary directories; this was not a second machine, air gap, or independent-engine test. Small synthetic Git bundles/configuration are retained under artifacts/. The runner never operates on a user repository.

The SQLite profile is a declared relational-engine profile, not an after-the-fact assertion that every application's semantics are preserved. The Git core profile explicitly excludes LFS, executable hooks, signed authentication and hosted metadata; the earlier broad candidate scenario stays open. These exclusions and all runtime limitations also appear on the actual pages.

[decisions.json](decisions.json) records each judgment, rationale, primary-source pointer and every changed requirement/principle field. Direct observations are the local runtime record, not a claim that a primary documentation URL contains our experiment. Earlier evidence records and checked sub-questions are retained; the new judgments supersede the old rating freeze.

## Blank-status repair

46 requirement cells across 32 entries used invalid principle values (`partial` or `meets`). All are repaired to valid requirement values: incomplete evidence maps to Not Verified; SQLite E3 reaches Pass only through the individual decision above. This is a schema repair, not 46 successful assessments. The original values, normalization and final decisions are recorded. Hugo, the maintainer loader and the browser now normalize invalid values consistently; table rendering has explicit fallback labels so a missing/invalid value cannot silently produce a blank cell.

Positive Longevity and Transparency findings require established E3/E5 under the existing methodology. The engine now warns about unsupported positive pairings, and an evidence-free or confidence-free Pass/Fail cannot become an effective finding. Other applications' substantive rating reconciliation is still pending; their schema repair is not presented as completion of that review.

<a id="git"></a>

## Git

- **E3: Pass.** The configured local vcs_core backup restores all refs, author/committer timestamps and identities, tracked bytes, ignore rules, separately preserved local configuration and one submodule after the original paths become unavailable; fsck succeeds. Full main/submodule bundles plus configuration are required, not the displayed main bundle command alone. This Pass excludes LFS, executable hooks, signature authenticity and hosted-service state; the earlier broader candidate scenario remains open. [Primary-source context](https://github.com/git/git/blob/7e34d8174dcda3435d1404c9a30bef46afe6c13e/Documentation/git-bundle.adoc).
- **E5: Pass.** In the declared local configuration, diffs expose the history reset, reflog retains the displaced committed tip and explicit reset restores it. clean -n lists and retains a disposable untracked file; clean -f explicitly removes it and reports removal. That file is restored from a separate copy, not Git history. This demonstrates proportionate command authorization, inspection and available correction for these operations, not automatic recovery of arbitrary uncommitted work. [Primary-source context](https://git-scm.com/docs/git-clean).
- **longevity: Meets.** For the configured vcs_core fixture, complete preserved history/configuration/submodule material reconstructed a usable repository without the original paths. This supports Longevity for that workflow; it does not certify LFS, signed provenance, arbitrary automation or future-version recovery. [Primary-source context](https://github.com/git/git/blob/7e34d8174dcda3435d1404c9a30bef46afe6c13e/Documentation/git-bundle.adoc).
- **transparency: Partially meets.** E5's minimum is demonstrated for the declared local commands: changes are inspectable and committed-history reset is correctable. Reflog retention is finite, untracked deletion needs an external backup, and executable hooks/remote automation were excluded rather than verified. These residual limits justify Partially meets, not a blanket Meets. [Primary-source context](https://git-scm.com/docs/git-clean).

Remaining: LFS payloads, signed-tag authenticity, executable hooks, remote/hosted permissions, corruption/crash recovery, independent network isolation, older versions and the earlier broader two-assessor candidate protocol remain unverified.

<a id="sqlite"></a>

## SQLite

- **E3: Pass.** The prior logical dump/backup experiments are reproduced and extended: a fresh connection restores schema and rows, the view returns expected related records, the restored trigger actually fires, and foreign_key_check is clean. This establishes meaningful recovery of the declared relational fixture through user-held files/SQL and the available open engine, not an independent SQLite implementation or the semantics of arbitrary application databases. [Primary-source context](https://www.sqlite.org/backup.html).
- **E5: Pass.** With explicit transactions, foreign_keys ON and SQL trace enabled, DELETE and DROP TABLE are rolled back, a savepoint undoes an inner update, an invalid reference produces a visible IntegrityError, and an explicitly committed update survives reopen. This establishes governable SQL/API mutations in the declared configuration; it does not provide GUI consent, automatic client authorization or recovery after an unbacked committed deletion. [Primary-source context](https://www.sqlite.org/lang_transaction.html).
- **longevity: Meets.** The declared fixture's schema, types, relationships, view and functioning trigger survive logical restoration, and the prior live-WAL comparison identifies the required backup boundary. This supports Longevity for this engine-level profile, not every application schema, damaged-file case, extension or future file-format feature. [Primary-source context](https://www.sqlite.org/backup.html).
- **transparency: Partially meets.** E5 is demonstrated at the explicitly configured SQL/API boundary: statements, errors, rollback and commit are inspectable. Trace logging is opt-in and permission/UI policy belongs to the caller; the engine is not a universal audit or authorization service. These known limits support Partially meets. [Primary-source context](https://www.sqlite.org/lang_transaction.html).

Remaining: Migration into a different engine/workflow, application-specific record semantics, independent non-SQLite decoding, extensions, corruption/crash/concurrent-writer stress and newer-feature/older-version compatibility remain unverified.

<a id="fossil"></a>

## Fossil SCM

- **E3: Not Verified.** The retained source proves Git export omits wiki, tickets, technical notes and attachments, but that is a limitation of this exit route, not proof that native Fossil recovery fails. Complete native restoration of artifacts, accounts, settings, private/shunned content and attachments has not been demonstrated. E3 therefore remains Not Verified. [Primary-source context](https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/export.c).
- **E5: Not Verified.** Purge preview, local graveyard undo and obliterate confirmation are positively established by source inspection. They do not cover the full consequential-operation surface: synchronization/configuration propagation, shunning/rebuild and effective recovery have not been sufficiently established. A guarded purge routine alone does not establish whole-scope E5. [Primary-source context](https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/purge.c).
- **longevity: Not assessed.** E3 remains Not Verified for the existing essential-record scope. The methodology requires established E3 before a positive Longevity finding, so the earlier positive rating is withdrawn pending recovery evidence; source/format strengths are retained as facts, not graded as a failure. [Primary-source context](https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/export.c).
- **transparency: Not assessed.** E5 remains Not Verified. The methodology's Partially meets threshold requires demonstrated minimum oversight, so the earlier positive Transparency and Control finding is withdrawn rather than retained on the strength of one documented control. This is Not assessed, not Does not meet. [Primary-source context](https://github.com/drhsqlite/fossil-mirror/blob/9f1ea15e06b9be018175d231a939d19372fd4b8b/src/purge.c).

Remaining: The existing open recovery and consequential-action scenarios remain pending; the individually explained E3/E5 blockers above determine the current Not Verified and Not assessed findings.

<a id="jujutsu"></a>

## Jujutsu

- **E3: Not Verified.** The retained operation-log model explains repository-state recovery, while git export exports refs rather than archiving the jj operation store. Independent interpretation and restoration of the preserved operation store, conflicts and workspace state remain unestablished. Invalid partial is replaced by Not Verified, not automatically converted to Pass or Fail. [Primary-source context](https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/git/export.rs).
- **E5: Not Verified.** The retained undo implementation provides real cross-workspace guards and explains that a removed workspace directory is not recreated by undo. However operation abandonment/garbage collection, colocated Git changes and actual correction/retention boundaries remain insufficiently covered. These source controls alone do not justify a whole-scope E5 Pass. [Primary-source context](https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/undo.rs).
- **longevity: Not assessed.** E3 remains Not Verified for the existing essential-record scope. The methodology requires established E3 before a positive Longevity finding, so the earlier positive rating is withdrawn pending recovery evidence; source/format strengths are retained as facts, not graded as a failure. [Primary-source context](https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/git/export.rs).
- **transparency: Not assessed.** E5 remains Not Verified. The methodology's Partially meets threshold requires demonstrated minimum oversight, so the earlier positive Transparency and Control finding is withdrawn rather than retained on the strength of one documented control. This is Not assessed, not Does not meet. [Primary-source context](https://github.com/jj-vcs/jj/blob/531e8da8066271040b4b1e74ce17a8a941544cce/cli/src/commands/undo.rs).

Remaining: The existing open recovery and consequential-action scenarios remain pending; the individually explained E3/E5 blockers above determine the current Not Verified and Not assessed findings.

<a id="emacs-org-mode"></a>

## Emacs Org-mode

- **E3: Not Verified.** The retained Org fixture is independently readable and exposes headings, links/properties and source blocks, but the knowledge_notes profile also needs attachment/ID-link relocation and preserved executable/agenda/table meaning. These have not been reconstructed. Plain-text readability is positive E1 evidence, not sufficient E3 recovery evidence. [Primary-source context](https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/testing/examples/babel.org).
- **E5: Not Verified.** The pinned Babel code establishes a confirmation default and evaluation-control branches. Effective buffer settings, export-time evaluation, hooks and consequential editing/reversal have not been comprehensively checked. Defaults and the existence of a prompt cannot alone justify E5 for the existing broad literate-programming scope. [Primary-source context](https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/lisp/ob-core.el).
- **longevity: Not assessed.** E3 remains Not Verified for the existing essential-record scope. The methodology requires established E3 before a positive Longevity finding, so the earlier positive rating is withdrawn pending recovery evidence; source/format strengths are retained as facts, not graded as a failure. [Primary-source context](https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/testing/examples/babel.org).
- **transparency: Not assessed.** E5 remains Not Verified. The methodology's Partially meets threshold requires demonstrated minimum oversight, so the earlier positive Transparency and Control finding is withdrawn rather than retained on the strength of one documented control. This is Not assessed, not Does not meet. [Primary-source context](https://github.com/bzg/org-mode/blob/38e0eaeec4b1b3482be1afbf77373457bacd93f2/lisp/ob-core.el).

Remaining: The existing open recovery and consequential-action scenarios remain pending; the individually explained E3/E5 blockers above determine the current Not Verified and Not assessed findings.

<a id="qownnotes"></a>

## QOwnNotes

- **E3: Not Verified.** The retained schema places hierarchical tags, note-tag associations and trash metadata outside Markdown prose. A populated database/native-folder recovery and relationship reconstruction have not been demonstrated. This is an incomplete essential-record preservation check, not a reason to infer a failure or promote the invalid partial value. [Primary-source context](https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/services/databaseservice.cpp).
- **E5: Not Verified.** The retained note-removal implementation has backlink and bulk-folder confirmation branches, but saved dialog preferences, local/server trash restoration, other deletion modes and concurrent edits remain unverified. This closes a control-implementation question without establishing risk-appropriate authorization and correction for the whole assessed workflow. [Primary-source context](https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/managers/noteoperationsmanager.cpp).
- **longevity: Not assessed.** E3 remains Not Verified for the existing essential-record scope. The methodology requires established E3 before a positive Longevity finding, so the earlier positive rating is withdrawn pending recovery evidence; source/format strengths are retained as facts, not graded as a failure. [Primary-source context](https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/services/databaseservice.cpp).
- **transparency: Not assessed.** E5 remains Not Verified. The methodology's Partially meets threshold requires demonstrated minimum oversight, so the earlier positive Transparency and Control finding is withdrawn rather than retained on the strength of one documented control. This is Not assessed, not Does not meet. [Primary-source context](https://github.com/pbek/QOwnNotes/blob/21b4d8554828bf77f89be5b25da7a6722ebc7b8f/src/managers/noteoperationsmanager.cpp).

Remaining: The existing open recovery and consequential-action scenarios remain pending; the individually explained E3/E5 blockers above determine the current Not Verified and Not assessed findings.

## Validation

`node --test`: 48 passing tests, zero failures or skips. `hugo`: successful local build (90 pages). Runtime checks pass without installations; `git diff --check` is also checked before handoff.

The automated checks validate raw requirement values, loader/template agreement, non-blank criterion cells for all 68 entries, evidence-backed E3/E5 changes, the recorded before/after field ledger, preservation of earlier observations, and runtime/retained-file hashes. The earlier freeze test is replaced by an explicit change-ledger test; the historical baseline is not overwritten.


+++
title = "Git"
category = "VCS & Core"
summary = "Distributed version control with user-held history, inspectable changes and local repository recovery; the assessed configuration and external dependencies are stated below."
substrate = "Content-Addressable Merkle DAG (.git)"
sync_model = "Decentralized SSH / HTTPS push-pull"
extract_cmd = "git bundle create repo.bundle --all"
pilot_stage = 1
limitations = ["Passes apply only to the predeclared installed local-core configuration, not every Git deployment.","A full bundle alone omits local configuration and submodule payloads; preserve these separately.","Untracked clean deletion has no Git-history undo; external backup was required in the test."]
assessment_status = "complete"
assessment_date = "2026-10-23"
version_assessed = "Git 2.54.0.windows.1; configured local vcs_core workflow, rating reconciliation batch 1"
assessment_notes = "Rating reconciliation batch 1: E3 Pass; E5 Pass. Longevity Meets; Transparency and Control Partially meets. See the declared scope and reasons below; earlier bounded evidence findings remain recorded."

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "pass"
retained_control = "pass"
consequential_oversight = "pass"

[principles]
sovereignty = "meets"
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Git repositories store history locally and can be cloned, copied, bundled, or mirrored without a central service."
url = "https://git-scm.com/docs/git-clone.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Git supports local and remote clones, bundles, and exports, though hosting-specific issues, pull requests, and CI metadata are outside the repository."
url = "https://git-scm.com/docs/git-clone.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "In an isolated Git 2.54.0.windows.1 fixture, a full --all bundle mirrored all recorded branch/tag/stash refs with matching object IDs and passed fsck. Ordinary clone omitted refs/stash, repository-local configuration, the marker hook and submodule working-tree contents; these need separate recovery planning."
url = "https://github.com/git/git/blob/7e34d8174dcda3435d1404c9a30bef46afe6c13e/Documentation/git-bundle.adoc"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Branching, diffing, merging, and history inspection work offline on local repositories."
url = "https://git-scm.com/book/en/v1/Git-on-the-Server"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The full bundle verified in an empty repository, whereas an incremental v1..main bundle failed verification for missing prerequisite commits. Successful bundle creation therefore does not establish a self-contained backup."
url = "https://github.com/git/git/blob/7e34d8174dcda3435d1404c9a30bef46afe6c13e/Documentation/git-bundle.adoc"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Git gives users direct custody of complete repository history and multiple exit paths."
url = "https://git-scm.com/docs/git-clone.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "For the configured vcs_core fixture, complete preserved history/configuration/submodule material reconstructed a usable repository without the original paths. This supports Longevity for that workflow; it does not certify LFS, signed provenance, arbitrary automation or future-version recovery."
url = "https://github.com/git/git/blob/7e34d8174dcda3435d1404c9a30bef46afe6c13e/Documentation/git-bundle.adoc"
confidence = "high"

[[evidence]]
target = "locality"
text = "Core version-control operations are deliberately local and offline-capable."
url = "https://git-scm.com/book/en/v1/Git-on-the-Server"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "E5's minimum is demonstrated for the declared local commands: changes are inspectable and committed-history reset is correctable. Reflog retention is finite, untracked deletion needs an external backup, and executable hooks/remote automation were excluded rather than verified. These residual limits justify Partially meets, not a blanket Meets."
url = "https://git-scm.com/docs/git-clean"
confidence = "high"
[[evidence]]
target = "E3"
text = "The configured local vcs_core backup restores all refs, author/committer timestamps and identities, tracked bytes, ignore rules, separately preserved local configuration and one submodule after the original paths become unavailable; fsck succeeds. Full main/submodule bundles plus configuration are required, not the displayed main bundle command alone. This Pass excludes LFS, executable hooks, signature authenticity and hosted-service state; the earlier broader candidate scenario remains open."
url = "https://github.com/git/git/blob/7e34d8174dcda3435d1404c9a30bef46afe6c13e/Documentation/git-bundle.adoc"
confidence = "high"

[[evidence]]
target = "E5"
text = "In the declared local configuration, diffs expose the history reset, reflog retains the displaced committed tip and explicit reset restores it. clean -n lists and retains a disposable untracked file; clean -f explicitly removes it and reports removal. That file is restored from a separate copy, not Git history. This demonstrates proportionate command authorization, inspection and available correction for these operations, not automatic recovery of arbitrary uncommitted work."
url = "https://git-scm.com/docs/git-clean"
confidence = "high"

+++

**Verification scenario:** Bundle and clone all branches and tags; include LFS and submodules; simulate loss of the hosting account.

**What may invalidate an overconfident claim:** Full Git history is portable; LFS objects, submodule remotes, and external issue trackers may not be.

**Earlier candidate protocol (not an executed result):** The broader proposal included LFS, air-gapped transfer and two assessors. Those aspects are still unverified. The current local-core assessment is separately declared before its checks in evidence/rating-reconciliation/batch-1/plan.json.

**Documentation starting point:** <https://git-scm.com/docs/git-bundle>

**Evidence update: 23 October 2026**

- [x] Resolved: In an isolated Git 2.54.0.windows.1 fixture, a full --all bundle mirrored all recorded branch/tag/stash refs with matching object IDs and passed fsck. Ordinary clone omitted refs/stash, repository-local configuration, the marker hook and submodule working-tree contents; these need separate recovery planning. [Source](https://github.com/git/git/blob/7e34d8174dcda3435d1404c9a30bef46afe6c13e/Documentation/git-bundle.adoc).
- [x] Resolved: The full bundle verified in an empty repository, whereas an incremental v1..main bundle failed verification for missing prerequisite commits. Successful bundle creation therefore does not establish a self-contained backup. [Source](https://github.com/git/git/blob/7e34d8174dcda3435d1404c9a30bef46afe6c13e/Documentation/git-bundle.adoc).
- [ ] Open: LFS payloads, signed-tag authenticity, executable hooks, remote/hosted permissions, corruption/crash recovery, independent network isolation, older versions and the earlier broader two-assessor candidate protocol remain unverified.

**Assessment follow-up:** E3/E5 and their associated principle findings are now reconciled in rating batch 1 below. Earlier source/fixture observations remain valid within their stated scope; they are not themselves blanket Pass decisions.

## Rating reconciliation: 23 October 2026

**Scope:** Git 2.54.0.windows.1; configured local vcs_core workflow, rating reconciliation batch 1 Individual-custodian perspective. The local vcs_core configuration and departures were declared before the new checks; the original broader scenario is not claimed complete.

| Criterion | Current finding |
|---|---|
| E3 Independent interpretation and recovery | Pass |
| E5 Governability of consequential actions | Pass |
| Longevity | Meets |
| Transparency and Control | Partially meets |

**E3:** The configured local vcs_core backup restores all refs, author/committer timestamps and identities, tracked bytes, ignore rules, separately preserved local configuration and one submodule after the original paths become unavailable; fsck succeeds. Full main/submodule bundles plus configuration are required, not the displayed main bundle command alone. This Pass excludes LFS, executable hooks, signature authenticity and hosted-service state; the earlier broader candidate scenario remains open.

**E5:** In the declared local configuration, diffs expose the history reset, reflog retains the displaced committed tip and explicit reset restores it. clean -n lists and retains a disposable untracked file; clean -f explicitly removes it and reports removal. That file is restored from a separate copy, not Git history. This demonstrates proportionate command authorization, inspection and available correction for these operations, not automatic recovery of arbitrary uncommitted work.

**longevity:** For the configured vcs_core fixture, complete preserved history/configuration/submodule material reconstructed a usable repository without the original paths. This supports Longevity for that workflow; it does not certify LFS, signed provenance, arbitrary automation or future-version recovery.

**transparency:** E5's minimum is demonstrated for the declared local commands: changes are inspectable and committed-history reset is correctable. Reflog retention is finite, untracked deletion needs an external backup, and executable hooks/remote automation were excluded rather than verified. These residual limits justify Partially meets, not a blanket Meets.

**Evidence record:** evidence/rating-reconciliation/batch-1/README.md and runtime-results.json. No target software was installed. The new checks used existing runtimes in disposable directories, not a second machine or an independently implemented engine.

**Remaining work:** LFS payloads, signed-tag authenticity, executable hooks, remote/hosted permissions, corruption/crash recovery, independent network isolation, older versions and the earlier broader two-assessor candidate protocol remain unverified.

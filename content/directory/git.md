+++
title = "Git"
category = "VCS & Core"
summary = "The archetype of sovereign software. Full commit history lives on your local disk, verified via cryptographic hashes, with 100% offline branching, diffing, and merging."
substrate = "Content-Addressable Merkle DAG (.git)"
sync_model = "Decentralized SSH / HTTPS push-pull"
extract_cmd = "git bundle create repo.bundle --all"
pilot_stage = 1
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "pass"
retained_control = "pass"
consequential_oversight = "not_verified"

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
text = "The repository object database is independently usable by Git implementations and documented commands; a clean recovery test was not performed here."
url = "https://git-scm.com/docs/user-manual"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Branching, diffing, merging, and history inspection work offline on local repositories."
url = "https://git-scm.com/book/en/v1/Git-on-the-Server"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Commit history and object hashes make changes traceable, but hooks, scripts, and automation can have consequential effects requiring separate review."
url = "https://git-scm.com/docs/user-manual"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Git gives users direct custody of complete repository history and multiple exit paths."
url = "https://git-scm.com/docs/git-clone.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Content-addressed history and widespread implementations provide strong longevity for repository data, while external LFS and hosting metadata need separate preservation."
url = "https://git-scm.com/docs/user-manual"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core version-control operations are deliberately local and offline-capable."
url = "https://git-scm.com/book/en/v1/Git-on-the-Server"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "History, diffs, refs, and object identity are inspectable, but hooks and automation can operate outside the visible commit graph."
url = "https://git-scm.com/docs/user-manual"
confidence = "medium"
+++

**Verification scenario:** Bundle and clone all branches and tags; include LFS and submodules; simulate loss of the hosting account.

**What may invalidate an overconfident claim:** Full Git history is portable; LFS objects, submodule remotes, and external issue trackers may not be.

**Two-assessor protocol scope note:** Pre-registered under the `vcs_core` domain profile. Both assessors verify offline history inspection (`git log`, `git fsck`), bundle recovery on an air-gapped machine, and remote replacement without central server permission.

**Documentation starting point:** <https://git-scm.com/docs/git-bundle>

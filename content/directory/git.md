+++
title = "Git"
category = "VCS & Core"
summary = "The archetype of sovereign software. Full commit history lives on your local disk, verified via cryptographic hashes, with 100% offline branching, diffing, and merging."
substrate = "Content-Addressable Merkle DAG (.git)"
sync_model = "Decentralized SSH / HTTPS push-pull"
extract_cmd = "git bundle create repo.bundle --all"
pilot_stage = 1
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Bundle and clone all branches and tags; include LFS and submodules; simulate loss of the hosting account.

**What may invalidate an overconfident claim:** Full Git history is portable; LFS objects, submodule remotes, and external issue trackers may not be.

**Documentation starting point:** <https://git-scm.com/docs/git-bundle>

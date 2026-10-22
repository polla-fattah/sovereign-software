+++
title = "Jujutsu (jj)"
category = "VCS & Core"
summary = "Next-generation version control where even conflicts and rebases are recorded as deterministic, first-class mathematical states in an undoable local operation log."
substrate = "Append-only Operation Log + Git Backend"
sync_model = "Git-compatible remotes / Native local"
extract_cmd = "jj op log --limit 20"
limitations = ["Young project: its storage format is still evolving."]
pilot_stage = 5
legacy_tier = "Tier 2"
legacy_label = "Tier 2 • Sovereign Core"
+++

**Verification scenario:** Export Git-backed history and the operation log; test conflicting work and recovery after a clean installation.

**What may invalidate an overconfident claim:** Git interoperability does not imply that all jj operation history and conflict semantics are portable.

**Documentation starting point:** <https://jj-vcs.github.io/jj/latest/>

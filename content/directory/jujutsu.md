+++
title = "Jujutsu (jj)"
category = "VCS & Core"
summary = "Next-generation version control where even conflicts and rebases are recorded as deterministic, first-class mathematical states in an undoable local operation log."
substrate = "Append-only Operation Log + Git Backend"
sync_model = "Git-compatible remotes / Native local"
extract_cmd = "jj op log --limit 20"
limitations = ["Young project: its storage format is still evolving."]
pilot_stage = 5
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "partial"
locality = "meets"
transparency = "partial"

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
text = "Repository history can be copied and exported through version-control workflows, but recovery and long-term compatibility across jj versions were not tested."
url = "https://martinvonz.github.io/jj/"
confidence = "low"

[[evidence]]
target = "E4"
text = "The tool operates on local repositories and does not require a hosted account for commits, history, or local inspection."
url = "https://martinvonz.github.io/jj/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Version-control actions are user-directed, but destructive operations, conflict resolution, and recovery from ambiguous history were not tested."
url = "https://martinvonz.github.io/jj/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Local repositories and Git interoperability support user authority, with operational recovery still requiring evidence."
url = "https://martinvonz.github.io/jj/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Git compatibility improves portability, but jj-specific operation and repository evolution need version-pinned restoration tests."
url = "https://martinvonz.github.io/jj/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The fundamental workflow is local and can be performed without a central service."
url = "https://martinvonz.github.io/jj/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The project publishes documentation and an interoperability path, but the semantics of every rewrite and conflict action were not assessed."
url = "https://martinvonz.github.io/jj/"
confidence = "low"

+++

**Verification scenario:** Export Git-backed history and the operation log; test conflicting work and recovery after a clean installation.

**What may invalidate an overconfident claim:** Git interoperability does not imply that all jj operation history and conflict semantics are portable.

**Documentation starting point:** <https://jj-vcs.github.io/jj/latest/>

**Preliminary desk assessment:** Jujutsu (jj) is described as next-generation version control where even conflicts and rebases are recorded as deterministic, first-class mathematical states in an undoable local operation log. Its primary preservation surface is Append-only Operation Log + Git Backend, with independence shaped by git-compatible remotes / native local. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can users retain complete history and metadata, operate and recover locally, migrate to another implementation, and understand the effects of synchronization or automation?

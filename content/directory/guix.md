+++
title = "GNU Guix"
category = "OS & Infra"
summary = "System and package manager configured declaratively from plain-text files, with rollback and a separate channel and substitute model."
substrate = "Declarative Scheme configuration files"
sync_model = "Guix store with pinned channels; configuration kept in version control"
extract_cmd = "guix system build config.scm"
pilot_stage = 5
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "partial"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "partial"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Guix configurations are declarative Scheme files and profiles expose generations that can be listed and rolled back."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Configuration files and channel descriptions provide a migration path, but complete reproduction depends on channel commits, package sources, substitutes, and system hardware."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Generations and rollback help recovery, but independent reconstruction of a complete historical environment was not performed."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Local package management and system generations can operate independently once required sources and substitutes are available, but fetching often depends on external infrastructure."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Declarative configuration, signed channels, dry runs, and generations make changes inspectable, but build and substitute trust boundaries require deployment-specific review."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Plain-text configuration and rollback support user control, while package source and channel infrastructure can remain externally dependent."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Declarative descriptions are durable, but exact environments require preserving channel commits, package sources, and binary cache assumptions."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Installed profiles and generations operate locally, but new builds and updates may require remote sources or substitutes."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Configuration, signatures, dry runs, and generations expose important changes, although dependency resolution and build provenance remain complex."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"
+++

**Verification scenario:** Reconstruct pinned manifests and channels, test offline availability of substitutes and sources, and restore mutable state.

**What may invalidate an overconfident claim:** Assess separately from NixOS; a similar philosophy is not equivalent evidence.

**Documentation starting point:** <https://guix.gnu.org/manual/>

**Preliminary desk assessment:** GNU Guix is described as system and package manager configured declaratively from plain-text files, with rollback and a separate channel and substitute model. Its primary preservation surface is Declarative Scheme configuration files, with independence shaped by guix store with pinned channels; configuration kept in version control. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

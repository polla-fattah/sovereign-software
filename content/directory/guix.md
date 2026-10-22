+++
title = "GNU Guix"
category = "OS & Infra"
summary = "System and package manager configured declaratively from plain-text files, with rollback and a separate channel and substitute model."
substrate = "Declarative Scheme configuration files"
sync_model = "Guix store with pinned channels; configuration kept in version control"
extract_cmd = "guix system build config.scm"
pilot_stage = 5
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Reconstruct pinned manifests and channels, test offline availability of substitutes and sources, and restore mutable state.

**What may invalidate an overconfident claim:** Assess separately from NixOS; a similar philosophy is not equivalent evidence.

**Documentation starting point:** <https://guix.gnu.org/manual/>

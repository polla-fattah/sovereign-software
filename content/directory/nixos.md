+++
title = "NixOS"
category = "OS & Infra"
summary = "Linux distribution configured declaratively from plain-text files, with rollback to earlier system generations."
substrate = "Declarative Nix configuration files"
sync_model = "Nix store with pinned inputs; configuration kept in version control"
extract_cmd = "nixos-rebuild build --flake .#workstation"
aliases = ["/directory/nixos-guix/"]
pilot_stage = 5
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "partial"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "NixOS configurations are declared in source files and each rebuild creates a system generation that can be inspected and selected."
url = "https://nixos.org/manual/nixos/stable/"
confidence = "high"

[[evidence]]
target = "E2"
text = "Configuration files can be copied to another machine and rebuilt, but package caches, secrets, hardware, and channel pinning affect portability."
url = "https://nixos.org/guides/how-nix-works/"
confidence = "high"

[[evidence]]
target = "E3"
text = "Generations provide rollback and reproducible configuration inputs, but independent recovery of a complete machine and all mutable state was not tested."
url = "https://nixos.org/manual/nixos/stable/"
confidence = "high"

[[evidence]]
target = "E4"
text = "System configuration and rollback are operator-controlled, with optional binary caches rather than a required provider."
url = "https://nixos.org/manual/nixos/stable/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "System changes affect availability and security, but change review, secret handling, and rollback authorization were not assessed."
url = "https://nixos.org/manual/nixos/stable/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Declarative local configuration and generations provide strong authority and rollback."
url = "https://nixos.org/guides/how-nix-works/"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Configuration as code and generations support reproducibility, while channels, hardware, and garbage collection create preservation conditions."
url = "https://nixos.org/manual/nixos/stable/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "NixOS can build and operate locally, though remote caches are optional accelerators."
url = "https://nixos.org/manual/nixos/stable/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The manual documents rollback and garbage-collection consequences, but secrets and external inputs need explicit review."
url = "https://nixos.org/manual/nixos/stable/"
confidence = "medium"

+++

**Verification scenario:** Build from a pinned configuration on a clean or offline host using preseeded dependencies; test rollback, secrets, and state restoration.

**What may invalidate an overconfident claim:** Declarative system configuration does not automatically reproduce mutable user data.

**Documentation starting point:** <https://nixos.org/manual/nixos/stable/>

**Preliminary desk assessment:** NixOS is described as linux distribution configured declaratively from plain-text files, with rollback to earlier system generations. Its primary preservation surface is Declarative Nix configuration files, with independence shaped by nix store with pinned inputs; configuration kept in version control. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

+++
title = "NixOS"
category = "OS & Infra"
summary = "Linux distribution configured declaratively from plain-text files, with rollback to earlier system generations."
substrate = "Declarative Nix configuration files"
sync_model = "Nix store with pinned inputs; configuration kept in version control"
extract_cmd = "nixos-rebuild build --flake .#workstation"
aliases = ["/directory/nixos-guix/"]
pilot_stage = 5
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Build from a pinned configuration on a clean or offline host using preseeded dependencies; test rollback, secrets, and state restoration.

**What may invalidate an overconfident claim:** Declarative system configuration does not automatically reproduce mutable user data.

**Documentation starting point:** <https://nixos.org/manual/nixos/stable/>

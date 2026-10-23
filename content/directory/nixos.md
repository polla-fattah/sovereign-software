+++
title = "NixOS"
category = "OS & Infra"
summary = "Linux distribution configured declaratively from plain-text files, with rollback to earlier system generations."
substrate = "Declarative Nix configuration files"
sync_model = "Nix store with pinned inputs; configuration kept in version control"
extract_cmd = "nixos-rebuild build --flake .#workstation"
aliases = ["/directory/nixos-guix/"]
pilot_stage = 5
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Pinned-closure rebuilds, offline cache completeness, mutable service/secret restoration and actual rollback/GC trials remain open."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence 44d27ba452c1c4177882732bd48fabd7d332e38d"
assessment_notes = "Individually reconciled in rating batch 9 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

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
text = "The previously unread state section explicitly requires persistent /nix including daemon database, roots and profiles, plus /boot and /var/lib/nixos for stable UID/GID allocation. With mutable users, passwd/group/shadow and subordinate-ID files must persist too. A configuration file alone is not that state backup."
url = "https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/nixos-state.section.md"
confidence = "medium"

[[evidence]]
target = "E4"
text = "System configuration and rollback are operator-controlled, with optional binary caches rather than a required provider."
url = "https://nixos.org/manual/nixos/stable/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The full rollback section distinguishes switching the running system from selecting a bootable generation and making it the boot default. Boot-menu recovery is limited to configurations not garbage-collected; rollback is not represented as reversing service/user data changes."
url = "https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/rollback.section.md"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for NixOS does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/nixos-state.section.md"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for NixOS's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/nixos-state.section.md"
confidence = "medium"

[[evidence]]
target = "locality"
text = "NixOS can build and operate locally, though remote caches are optional accelerators."
url = "https://nixos.org/manual/nixos/stable/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/rollback.section.md"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The retained state documentation explicitly requires persistent store/daemon/profile/root and boot/UID-allocation data, plus mutable account files where configured. A declarative configuration alone does not reconstruct services, secrets and closure inputs. No pinned offline complete state restoration is established."
url = "https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/nixos-state.section.md"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Generation selection and running/boot-default rollback are distinct, and garbage collection can remove recovery generations. Service/user data are not rolled back by those mechanisms. Effective activation/GC authority, inspectable consequences and recourse for mutable-state changes remain insufficiently covered."
url = "https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/rollback.section.md"
confidence = "medium"

+++

**Verification scenario:** Build from a pinned configuration on a clean or offline host using preseeded dependencies; test rollback, secrets, and state restoration.

**What may invalidate an overconfident claim:** Declarative system configuration does not automatically reproduce mutable user data.

**Documentation starting point:** <https://nixos.org/manual/nixos/stable/>

**Evidence update: 23 October 2026**

- [x] Resolved: The previously unread state section explicitly requires persistent /nix including daemon database, roots and profiles, plus /boot and /var/lib/nixos for stable UID/GID allocation. With mutable users, passwd/group/shadow and subordinate-ID files must persist too. A configuration file alone is not that state backup. [Source](https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/nixos-state.section.md).
- [x] Resolved: The full rollback section distinguishes switching the running system from selecting a bootable generation and making it the boot default. Boot-menu recovery is limited to configurations not garbage-collected; rollback is not represented as reversing service/user data changes. [Source](https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/rollback.section.md).
- [ ] Open: Pinned-closure rebuilds, offline cache completeness, mutable service/secret restoration and actual rollback/GC trials remain open. E5 needs effective activation/GC policy, boot versus running-state choices and mutable-data correction; retained generations are conditional recourse.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-9/.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Pinned-closure rebuilds, offline cache completeness, mutable service/secret restoration and actual rollback/GC trials remain open. E5 needs effective activation/GC policy, boot versus running-state choices and mutable-data correction; retained generations are conditional recourse.

**Next without installing locally:** Use a synthetic pinned configuration/closure/cache plus mutable-state/secret-substitute manifest and expected users/services; inspect preservation records and obtain externally recorded offline rebuild/activation/GC recovery checks.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-9/`. Overall: **Insufficient evidence**.

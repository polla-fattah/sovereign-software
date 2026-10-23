# NixOS: documentation review

Reviewed 22 October 2026 from the NixOS manual (stable), nixos.org (download, community, privacy, how-Nix-works guide), the Nix reference manual, and the nixpkgs repository only. Latest stable release: 26.05 ("Yarara"), headed "2026.05/30" in the release notes; the download page gives "Current version 26.05" and no date. The manual page was read in 100,000-character windows out of about 712,000, and the fetch tool summarised each window, so several sections were not seen in full (marked below). Licence: the nixpkgs COPYING file text is MIT-style, but the page did not name it.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 9](../third-pass/batch-9/README.md#nixos) and reflected in the [application page](../../content/directory/nixos.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The previously unread state section explicitly requires persistent /nix including daemon database, roots and profiles, plus /boot and /var/lib/nixos for stable UID/GID allocation. With mutable users, passwd/group/shadow and subordinate-ID files must persist too. A configuration file alone is not that state backup.
- [x] Resolved: The full rollback section distinguishes switching the running system from selecting a bootable generation and making it the boot default. Boot-menu recovery is limited to configurations not garbage-collected; rollback is not represented as reversing service/user data changes.

Remaining: Pinned-closure rebuilds, offline cache completeness, mutable service/secret restoration and actual rollback/GC trials remain open.

## What the documentation says

**Storage and access (E1, E3)**
- Configuration is plain text (`configuration.nix`, `flake.nix`; 26.05 adds a `system.nix` entry point). [release notes](https://nixos.org/manual/nixos/stable/release-notes)
- Packages live in the Nix store, "usually the directory `/nix/store`", one subdirectory per package with a hash of its build dependencies in the path. Built packages are "never overwritten". [how Nix works](https://nixos.org/guides/how-nix-works/)
- System generations are profiles named `system-N-link` under `/nix/var/nix/profiles`; the system profile is `/nix/var/nix/profiles/system`. (Summary of a truncated page.) [manual](https://nixos.org/manual/nixos/stable/)
- Mutable service data is outside the configuration. The manual has no general backup chapter in the parts read; BorgBackup appears only as a module. "Necessary system state" is listed in Administration but its text was not read. [manual](https://nixos.org/manual/nixos/stable/)

**Exit and migration (E2)**
- The guide says that running `nixos-rebuild switch` on the same configuration "will always produce the same result". The Nix guide frames this as deterministic evaluation, not a guarantee about hardware, secrets or caches. [how Nix works](https://nixos.org/guides/how-nix-works/)
- A binary cache is "a web server that provides pre-built binaries"; Nix builds from source if none is available. [how Nix works](https://nixos.org/guides/how-nix-works/)
- Moving to another machine, secrets handling and hardware-specific files: not found in the docs read.

**Recovery (E3)**
- Each rebuild adds a boot menu entry; GRUB can boot any previous configuration "that hasn't been garbage-collected". `nixos-rebuild switch --rollback` returns a running system to an earlier one. (Summary of a truncated page.) [manual](https://nixos.org/manual/nixos/stable/)
- Channels are called "the best way to keep your NixOS installation up to date". Switching channels is "generally safe", except that a newer Nix may upgrade its database schema, which cannot easily be undone. (Summary of a truncated page.) [manual](https://nixos.org/manual/nixos/stable/)
- `system.stateVersion` controls legacy defaults: for example, Tandoor Recipes installs older than 26.05 "may suffer from a security vulnerability" and need media files moved. [release notes](https://nixos.org/manual/nixos/stable/release-notes), [manual](https://nixos.org/manual/nixos/stable/)
- Upgrade breaks listed for 26.05: systemd stage 1 by default, LUKS device naming, `/dev/root` unavailable, D-Bus change, kernel 6.12 to 6.18, several modules removed. Direct Nextcloud 31 to 33 upgrade is not possible. [release notes](https://nixos.org/manual/nixos/stable/release-notes)

**Continuing authority (E4) and dependencies**
- Governance: an elected Steering Committee, a NixOS Foundation board (Utrecht, Netherlands, non-profit), and an RFC process. Succession or re-election rules: not found on the page. [community](https://nixos.org/community/)
- The Foundation operates cache.nixos.org ("over 120TB") and hydra.nixos.org. Funding amounts and sources: not found. [community](https://nixos.org/community/)
- The privacy page covers the website only: automatic logging, consent-based cookies, unnamed analytics. Telemetry or update checks in the OS itself: not found in the docs read. [privacy](https://nixos.org/privacy/)
- Support period of 26.05: not found. 26.11 is named as the removal date for scripted stage 1. [release notes](https://nixos.org/manual/nixos/stable/release-notes)

**Consequential operations (E5)**
- Plain garbage collection keeps old system configurations; a separate command "deletes old roots, removing the ability to roll back to them". After clearing old profiles, rebuild with `nixos-rebuild boot`. (Summary of a truncated page.) [manual](https://nixos.org/manual/nixos/stable/)
- The Nix manual advises deleting generations only when "you are certain that you will not need to roll back". `nix-store --gc --print-dead` previews deletion. [garbage collection](https://nix.dev/manual/nix/stable/package-management/garbage-collection)
- `system.autoUpgrade.allowReboot` reboots the machine when a new generation changes the kernel, initrd or modules. (Summary of a truncated page.) [manual](https://nixos.org/manual/nixos/stable/)
- The 26.05 notes warn that disabling systemd stage 1 is discouraged, and that `linux_hardened` and `profiles/hardened` were removed. [release notes](https://nixos.org/manual/nixos/stable/release-notes)

## Gaps to test or read next
1. Build a synthetic configuration with `nixos-rebuild build --flake` on a clean host, pin inputs, rebuild on a second machine, and compare closure hashes.
2. Repeat the build offline with a preseeded store and note which inputs fail without the network or cache.
3. Switch, then roll back with `--rollback` and from the boot menu; run garbage collection with deletion of old roots and check that rollback is gone.
4. Create mutable data (a database, user files) and a secret, rebuild elsewhere, and list what was not restored.
5. Read the unread manual sections: Necessary system state, `system.stateVersion` reference, and the Rolling Back and Upgrading text in full.
6. Confirm the licence by name (nixpkgs COPYING did not name it) and read the Steering Committee and Foundation team pages for succession rules.
7. Find any statement on telemetry or update checks in the operating system itself, and on the 26.05 support period.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-9/README.md#nixos); [actual assessment](../../content/directory/nixos.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The retained state documentation explicitly requires persistent store/daemon/profile/root and boot/UID-allocation data, plus mutable account files where configured. A declarative configuration alone does not reconstruct services, secrets and closure inputs. No pinned offline complete state restoration is established.
- E5: Not Verified. Generation selection and running/boot-default rollback are distinct, and garbage collection can remove recovery generations. Service/user data are not rolled back by those mechanisms. Effective activation/GC authority, inspectable consequences and recourse for mutable-state changes remain insufficiently covered.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Pinned-closure rebuilds, offline cache completeness, mutable service/secret restoration and actual rollback/GC trials remain open. E5 needs effective activation/GC policy, boot versus running-state choices and mutable-data correction; retained generations are conditional recourse.

Next without a local installation: Use a synthetic pinned configuration/closure/cache plus mutable-state/secret-substitute manifest and expected users/services; inspect preservation records and obtain externally recorded offline rebuild/activation/GC recovery checks.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

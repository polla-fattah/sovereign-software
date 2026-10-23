# Third pass, batch 9

Reviewed 23 October 2026, Asia/Baghdad. 12 bounded questions are resolved across 6 applications. All findings are copied into the actual application pages; broader unknowns remain open.

## Method and reproduction

Run from the repository root:

```powershell
python evidence/third-pass/inspect_remaining.py 9
```

[inspection-plan.json](inspection-plan.json) identifies pinned source revisions and inputs. [artifact-results.json](artifact-results.json) records retained-file SHA-256 hashes, Git-object checks where available, observed structures, source locations and environment. Downloaded application implementation code is not imported or run. Published schema DDL, when explicitly identified, is instantiated in SQLite; document code blocks are not evaluated. Archives are inspected in memory; historical samples retain their historical scope. Source-anchor matches locate reviewed code, not successful application tests or CI runs. No target application was installed. Any use of an already available runtime is identified explicitly in the findings and result record; source inspection is not reported as an application run. Upstream licensing and copyright continue to apply to the retained files.

At the user's request, existing eligibility and principle ratings are preserved exactly. E3/E5 decisions, principle reconciliation and invalid/blank-status corrections are deferred to the next pass. A resolved sub-question does not establish whole-application compliance.

<a id="nixos"></a>

## NixOS

- [x] Resolved: The previously unread state section explicitly requires persistent /nix including daemon database, roots and profiles, plus /boot and /var/lib/nixos for stable UID/GID allocation. With mutable users, passwd/group/shadow and subordinate-ID files must persist too. A configuration file alone is not that state backup. [Inspected source/input](https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/nixos-state.section.md).
- [x] Resolved: The full rollback section distinguishes switching the running system from selecting a bootable generation and making it the boot default. Boot-menu recovery is limited to configurations not garbage-collected; rollback is not represented as reversing service/user data changes. [Inspected source/input](https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/rollback.section.md).

Remaining: Pinned-closure rebuilds, offline cache completeness, mutable service/secret restoration and actual rollback/GC trials remain open.

<a id="guix"></a>

## GNU Guix

- [x] Resolved: The archive implementation passes export-recursive? to export-paths only when requested with --recursive. A package export without that option is not established to include its dependency closure; listing/extraction and store import are distinct operations, not backups of arbitrary mutable service data. [Inspected source/input](https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/archive.scm).
- [x] Resolved: The system command really parses -n/--dry-run, propagates dry-run? and returns before the activation/bootloader/service-switch branch. This closes the earlier uncertainty about whether system dry-run exists; configuration evaluation and planning must not be confused with a full side-effect-free OS trial. [Inspected source/input](https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/system.scm).

Remaining: Channel-pinned rebuilds, network-blocked closure completeness, mutable-data restoration, generation deletion and release-specific compatibility remain untested.

<a id="openbsd"></a>

## OpenBSD

- [x] Resolved: The pinned restore manual specifies a level-0 base followed by the necessary incremental backups, and a pristine filesystem for full -r recovery. It restores ownership/time/mode where possible and warns that active-filesystem incremental dumps may confuse restore. This is a concrete archive-chain dependency, not an /etc-only recovery method. [Inspected source/input](https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8).
- [x] Resolved: The manual distinguishes -t listing, selective extraction and full -r rebuilding, explicitly warning that -r is hazardous if used carelessly. Inspecting an archive listing therefore precedes a materially different rebuild operation; no blanket confirmation or automatic rollback is established. [Inspected source/input](https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8).

Remaining: An actual dump/restore chain, keydisk recovery, upgrade reversal and filesystem/metadata comparison remain untested.

<a id="podman"></a>

## Podman

- [x] Resolved: The pinned export documentation explicitly says container export flattens the filesystem to a single-layer tarball without image layers, history or tags, unlike image save. It cannot be treated as preserving all image provenance or the complete deployment. [Inspected source/input](https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/docs/source/markdown/podman-export.1.md).
- [x] Resolved: The prune command initializes --volumes false and prompts unless --force or --external is used. The prompt enumerates unused volumes only when --volumes is selected. Consequently neither a universal prompt nor volume deletion on every prune is an accurate description. [Inspected source/input](https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/cmd/podman/system/prune.go).

Remaining: Named-volume/bind-mount/secret coverage, cross-runtime digest comparisons, ownership restoration, rootless migration and real prune trials remain open.

<a id="syncthing"></a>

## Syncthing

- [x] Resolved: The versioner helper resolves .stversions by default or a configured versioning filesystem and archives/restores using filesystem RenameOrCopy with timestamp handling. Archived versions are files, not merely opaque index entries; full metadata fidelity is not established by that code. [Inspected source/input](https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/util.go).
- [x] Resolved: Trashcan archive uses the original filename rather than the Simple versioner's timestamp-tagged name. Its cleanup returns without removal when cleanoutDays <= 0; otherwise files older than the computed cutoff are removed. This resolves a retention-policy boundary, not proof that synchronization itself is a backup. [Inspected source/input](https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/trashcan.go).

Remaining: Two-peer deletion/conflict propagation, manual metadata recovery, config/database migration, destructive override/revert behavior and network observations remain untested.

<a id="pass"></a>

## pass

- [x] Resolved: The show/edit paths directly call GPG decryption on individual .gpg entry files. Store recovery therefore depends on the corresponding decryption keys and GPG environment, not a pass-only proprietary reader. No synthetic key-restoration run is claimed. [Inspected source/input](https://github.com/zx2c4/password-store/blob/3ca13cd8882cae4083c1c478858adbf2e82dd037/src/password-store.sh).
- [x] Resolved: Delete removes the working file and, in a Git-backed store, records git rm plus a normal commit rather than history erasure. Re-encryption likewise adds a commit. Importantly yesno returns success without prompting when stdin is not a terminal, so the advertised confirmation is conditional even without --force; older encrypted history is not thereby revoked. [Inspected source/input](https://github.com/zx2c4/password-store/blob/3ca13cd8882cae4083c1c478858adbf2e82dd037/src/password-store.sh).

Remaining: Actual private-key/trust recovery, prior-history decryption after recipient changes, importer completeness and observed offline behavior remain untested.


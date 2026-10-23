# Rating reconciliation, batch 9

Reviewed 24 October 2026. Each application below was evaluated individually against its existing essential-record and version scope. No target application was installed, built or run.

## Outcome

All 6 retain **Insufficient evidence**. E3/E5 remain **Not Verified** for the specific missing coverage below, not automatically Pass from documentation and not Fail from missing evidence. Positive dependent principles lacking their minimum are corrected. Existing E1/E4/Locality findings are not re-certified by this targeted pass.

[Plan](plan.json), [individual decisions and change ledger](decisions.json), [directory-wide review sequence](../remaining-plan.json), [current application index](../../application-index.md).

0 additional bounded source questions are resolved in this batch. Earlier resolved questions remain resolved and are not counted again. Source locators are provenance aids, not executed-behavior assertions.

<a id="nixos"></a>

## NixOS

Version/scope: Pinned evidence 44d27ba452c1c4177882732bd48fabd7d332e38d.

**E3: Not Verified.** The retained state documentation explicitly requires persistent store/daemon/profile/root and boot/UID-allocation data, plus mutable account files where configured. A declarative configuration alone does not reconstruct services, secrets and closure inputs. No pinned offline complete state restoration is established. [Source context](https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/nixos-state.section.md).

**E5: Not Verified.** Generation selection and running/boot-default rollback are distinct, and garbage collection can remove recovery generations. Service/user data are not rolled back by those mechanisms. Effective activation/GC authority, inspectable consequences and recourse for mutable-state changes remain insufficiently covered. [Source context](https://github.com/NixOS/nixpkgs/blob/44d27ba452c1c4177882732bd48fabd7d332e38d/nixos/doc/manual/administration/rollback.section.md).

**Remaining:** Pinned-closure rebuilds, offline cache completeness, mutable service/secret restoration and actual rollback/GC trials remain open. E5 needs effective activation/GC policy, boot versus running-state choices and mutable-data correction; retained generations are conditional recourse.

**Next without a local installation:** Use a synthetic pinned configuration/closure/cache plus mutable-state/secret-substitute manifest and expected users/services; inspect preservation records and obtain externally recorded offline rebuild/activation/GC recovery checks.

[Actual assessment](../../../content/directory/nixos.md) | [review note](../../doc-reviews/nixos.md).

<a id="guix"></a>

## GNU Guix

Version/scope: Pinned evidence a639dc9f4767b55d5a9240a76c82957533273657.

**E3: Not Verified.** Archive export is recursive only when requested and is not arbitrary mutable-service backup. Channels, source/substitute closure, hardware and persistent service data have not been reconstructed in a network-blocked deployment. Declarative Scheme/profile generations do not alone establish complete E3. [Source context](https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/archive.scm).

**E5: Not Verified.** System dry-run propagation avoids the inspected activation/bootloader/service-switch branch, but configuration evaluation/planning is not proven side-effect-free. Generation deletion, effective privilege/substitute policy and correction of service/mutable-state changes remain insufficiently covered. [Source context](https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/system.scm).

**Remaining:** Channel-pinned rebuilds, network-blocked closure completeness, mutable-data restoration, generation deletion and release-specific compatibility remain untested. E5 needs configuration-evaluation, activation and generation-deletion authority and mutable-service recourse; dry-run is a bounded branch.

**Next without a local installation:** Inspect channel-pinned recursive archives, source/substitute manifests and synthetic persistent data with expected service state; reuse same-version dry-run/activation/generation-deletion and offline restore evidence.

[Actual assessment](../../../content/directory/guix.md) | [review note](../../doc-reviews/guix.md).

<a id="openbsd"></a>

## OpenBSD

Version/scope: Pinned evidence d962f40cd0b4b974405c3cac59ec7417040c0533.

**E3: Not Verified.** The restore manual specifies full/incremental archive-chain requirements, pristine targets and possible active-filesystem inconsistencies. No complete archive/keydisk/application-data restoration with verified ownership/times/permissions is recorded for the declared system scope. [Source context](https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8).

**E5: Not Verified.** Listing, selective extraction and full rebuilding have different risk and authority requirements; the manual warns about hazardous full restore. Those descriptions do not establish effective target/privilege authorization, upgrade reversal or recourse after overwritten system/user state. [Source context](https://github.com/openbsd/src/blob/d962f40cd0b4b974405c3cac59ec7417040c0533/sbin/restore/restore.8).

**Remaining:** An actual dump/restore chain, keydisk recovery, upgrade reversal and filesystem/metadata comparison remain untested. E5 needs target/privilege and upgrade/restore authority, inspectable planned changes and appropriate independent backups/recourse.

**Next without a local installation:** Inspect an externally generated synthetic dump/incremental/keydisk packet with expected files/metadata and precise version/hardware assumptions; seek same-version restore/upgrade-control and recovery records.

[Actual assessment](../../../content/directory/openbsd.md) | [review note](../../doc-reviews/openbsd.md).

<a id="podman"></a>

## Podman

Version/scope: Pinned evidence 5e20fea154919770d36569a09c31b4f7b8dc3a28.

**E3: Not Verified.** Container export flattens a filesystem and omits image layers/history/tags; complete service state also depends on volumes, bind mounts, networks, secrets and host/rootless ownership. No independently reconstructed deployment with preserved provenance and data is established. [Source context](https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/docs/source/markdown/podman-export.1.md).

**E5: Not Verified.** Prune's volume selection and prompt bypass flags are concrete source behavior. They do not cover all stop/remove/volume/bind-mount/secret mutations, effective rootless permissions or correction across the complete deployed service. [Source context](https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/cmd/podman/system/prune.go).

**Remaining:** Named-volume/bind-mount/secret coverage, cross-runtime digest comparisons, ownership restoration, rootless migration and real prune trials remain open. E5 needs role/rootless-aware container/volume/secret mutation, explicit prune/force scope and state recovery boundaries.

**Next without a local installation:** Inspect a synthetic image/save/export and volume/bind/network/config packet with digests and ownership expectations; obtain cross-runtime restoration plus same-version remove/prune/secret authority evidence.

[Actual assessment](../../../content/directory/podman.md) | [review note](../../doc-reviews/podman.md).

<a id="syncthing"></a>

## Syncthing

Version/scope: Pinned evidence d6d0181f7d466381c4b39ec8fd944c364f939b32.

**E3: Not Verified.** Versioner archives are ordinary files using RenameOrCopy and timestamp handling, but full metadata fidelity, configuration/index migration and two-peer reconstruction were not established. Version retention is not proof of independent backup or recovered conflict/deletion history. [Source context](https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/util.go).

**E5: Not Verified.** Trashcan retention uses policy-dependent cleanup and non-tagged names; synchronization can propagate destructive changes. Effective peer/folder authority, override/revert choices, conflict visibility and usable recovery remain insufficiently covered by the retention helper alone. [Source context](https://github.com/syncthing/syncthing/blob/d6d0181f7d466381c4b39ec8fd944c364f939b32/lib/versioner/trashcan.go).

**Remaining:** Two-peer deletion/conflict propagation, manual metadata recovery, config/database migration, destructive override/revert behavior and network observations remain untested. E5 needs peer/folder authorization, deletion/conflict and override/revert visibility, plus configured retention and recovery limits.

**Next without a local installation:** Use a synthetic two-peer folder/config/version archive packet with expected conflicts/metadata and externally recorded propagation/revert/restore observations; inspect files and policies independently.

[Actual assessment](../../../content/directory/syncthing.md) | [review note](../../doc-reviews/syncthing.md).

<a id="pass"></a>

## Pass

Version/scope: Pinned evidence 3ca13cd8882cae4083c1c478858adbf2e82dd037.

**E3: Not Verified.** Source delegates individual entry decryption to GPG, so the preserved files are not tied to a pass-only proprietary reader. However no corresponding private-key/trust/recipient environment was reconstructed or old encrypted history checked after recipient changes. The declared key and history recovery remains unverified. [Source context](https://github.com/zx2c4/password-store/blob/3ca13cd8882cae4083c1c478858adbf2e82dd037/src/password-store.sh).

**E5: Not Verified.** Git-backed removal/re-encryption records normal commits rather than erasing old history, and the yes/no helper bypasses prompting on non-terminal input. These are important command/history boundaries, not complete evidence of effective secret-use/export, recipient-change and correction controls in the assessed configuration. [Source context](https://github.com/zx2c4/password-store/blob/3ca13cd8882cae4083c1c478858adbf2e82dd037/src/password-store.sh).

**Remaining:** Actual private-key/trust recovery, prior-history decryption after recipient changes, importer completeness and observed offline behavior remain untested. E5 needs effective non-interactive/force, recipient-change, secret-use/export and historical-ciphertext recourse boundaries.

**Next without a local installation:** Inspect a synthetic store with non-secret GPG test credentials, recipient policy and Git history, then obtain independently recorded key/trust restoration and approval/history behavior. Do not supply or use real private keys.

[Actual assessment](../../../content/directory/pass.md) | [review note](../../doc-reviews/pass.md).

## Validation boundary

The shared rating audit checks recorded fields, decision evidence and review notes. Historical schema-repair and evidence baselines remain available. Source/fixture hashes, navigation and the complete set of updated pages are checked by the final repository validation; no per-product clean restore or upstream test run is implied.

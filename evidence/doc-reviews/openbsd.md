# OpenBSD: documentation review

Reviewed 22 October 2026 from the openbsd.org home page, the FAQ (install, system management, disk setup, packages, release policy, -current, and the 7.9 to 8.0 upgrade guide), and the licence policy page only. Current release: OpenBSD 8.0, released "Oct 20, 2026" (the 61st release, per the home page). The licence is not named on the home page; the policy page states a preference for ISC for new code. All page contents below come from fetched summaries of the pages, not a full reading of each.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 9](../third-pass/batch-9/README.md#openbsd) and reflected in the [application page](../../content/directory/openbsd.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The pinned restore manual specifies a level-0 base followed by the necessary incremental backups, and a pristine filesystem for full -r recovery. It restores ownership/time/mode where possible and warns that active-filesystem incremental dumps may confuse restore. This is a concrete archive-chain dependency, not an /etc-only recovery method.
- [x] Resolved: The manual distinguishes -t listing, selective extraction and full -r rebuilding, explicitly warning that -r is hazardous if used carelessly. Inspecting an archive listing therefore precedes a materially different rebuild operation; no blanket confirmation or automatic rollback is established.

Remaining: An actual dump/restore chain, keydisk recovery, upgrade reversal and filesystem/metadata comparison remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- Disks use `disklabel` partitions `a` to `p` inside one MBR partition on fdisk platforms; filesystems are made with `newfs`. Disklabel UIDs keep partition identity stable across reboots. [Disk Setup](https://www.openbsd.org/faq/faq14.html)
- Package state lives in `/var/db/pkg`; the packages page says filesystem problems may corrupt it and points to `pkg_check(8)`. Modified configuration files are kept during updates and removals. [Package Management](https://www.openbsd.org/faq/faq15.html)
- The docs describe configuration as files, but a page stating that all settings are plain text in `/etc` was not found in the pages read.
- Full-disk encryption (softraid CRYPTO) can use a passphrase or a keydisk; the page says to back up the keydisk. [Disk Setup](https://www.openbsd.org/faq/faq14.html)

**Exit and migration (E2)**
- Packages move to a new machine by exporting the manually installed list with `pkg_info -mz`, copying it, and running `pkg_add -l list`. The `-z` flag drops version numbers, so the new host takes the current versions. [Package Management](https://www.openbsd.org/faq/faq15.html)
- Filesystems can be duplicated with `dump` and `restore` or with `tar`. [Disk Setup](https://www.openbsd.org/faq/faq14.html)
- Application data is not covered: the upgrade guide says stalwart-mail 0.16 "requires a full dump and restore" and that kea 3.2 needs its configuration updated or rewritten. [Upgrade to 8.0](https://www.openbsd.org/faq/upgrade80.html)
- The System Management page mentions rsync, rdist, cron, and scp only as ways to keep a few config files in sync across hosts. [System Management](https://www.openbsd.org/faq/faq10.html)

**Recovery (E3)**
- `/altroot` copies the root partition nightly with `dd`, giving a disk image rather than a file-by-file copy. Disklabels are saved daily in `/var/backups` and restored with `disklabel -R`. `scan_ffs(8)` can find partitions after label damage, and a repaired partition must be checked with `fsck(8)` before mounting. [Disk Setup](https://www.openbsd.org/faq/faq14.html)
- Upgrades are supported only "from one release to the release immediately following"; skipping releases is not supported. The 8.0 guide does not cover downgrading. [Upgrade to 8.0](https://www.openbsd.org/faq/upgrade80.html)
- Packages record the shared libraries they need, and an install is refused if one is missing or too old. [Package Management](https://www.openbsd.org/faq/faq15.html)
- The pre-install checklist asks whether existing data must be saved and suggests a separate `/home` partition that survives reinstalls. A complete restore procedure for a whole system was not found. [Installation Guide](https://www.openbsd.org/faq/faq4.html)

**Continuing authority (E4) and dependencies**
- The project is "developed entirely by volunteers", with the OpenBSD Foundation funding the development environment and events. No succession statement was found. [home page](https://www.openbsd.org/)
- Releases ship every six months; only the two most recent releases get security and reliability fixes. No support duration in months or years is stated. [Release policy](https://www.openbsd.org/faq/faq5.html)
- Licence policy: new code uses ISC; new GPL software is not considered for the base system, and some GPL parts remain for historical reasons. [Policy](https://www.openbsd.org/policy.html)
- Install sets and `bsd.rd` can be verified with `signify`; the `install80` images carry no signature file, and the installer warns it cannot verify the sets. Miniroot installs fetch sets from the internet or a local disk. [Installation Guide](https://www.openbsd.org/faq/faq4.html)
- Telemetry, accounts, and update checks: the FAQ index does not mention telemetry; no statement on either was found in the pages read. No privacy page was read.

**Consequential operations (E5)**
- In interactive `fdisk`, "quit saves changes and exits", and "fdisk does not warn before saving the changes." Writing zeros to the wrong device with `dd` is cautioned against. [Disk Setup](https://www.openbsd.org/faq/faq14.html)
- The install page does not explicitly warn that installing erases data; it only asks whether data must be saved. [Installation Guide](https://www.openbsd.org/faq/faq4.html)
- The upgrade guide does not explicitly recommend a backup. It says to read the process first, to test on an identical machine for critical or remote hosts, and not to use the manual method. [Upgrade to 8.0](https://www.openbsd.org/faq/upgrade80.html)
- -current: the page says to always start from a snapshot and warns "Aggressive changes are sometimes pushed in this branch." It gives no backup guidance. [-current](https://www.openbsd.org/faq/current.html)
- Compiling a release-to-release upgrade from source is discouraged ("Do not attempt..."), and only GENERIC and GENERIC.MP kernels are supported. [Release policy](https://www.openbsd.org/faq/faq5.html)

## Gaps to test or read next
1. On a clean VM, install 7.9 with synthetic users, keys, a service config, and data; archive `/etc` only, reinstall, and list what does not return (packages, keys, `/var` data, service state).
2. Rebuild a second host from `pkg_info -mz`, the `/etc` archive, and `dump` or `tar` of data; diff package versions and service behavior.
3. Run `sysupgrade` 7.9 to 8.0 on a snapshot-backed VM; try restoring the pre-upgrade state, since downgrade is not documented.
4. Test `/altroot` restore and `disklabel -R` after deliberate label damage.
5. Not read: man pages (`sysupgrade`, `sysmerge`, `dump`, `signify`, `afterboot`), the errata page, the `syspatch` FAQ, the install-media FAQ for offline sets, the Foundation site, and any privacy statement.
6. Not found: a statement that all configuration is plain text in `/etc`, any telemetry or update-check statement, a succession or governance statement, and a licence for the whole system.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-9/README.md#openbsd); [actual assessment](../../content/directory/openbsd.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The restore manual specifies full/incremental archive-chain requirements, pristine targets and possible active-filesystem inconsistencies. No complete archive/keydisk/application-data restoration with verified ownership/times/permissions is recorded for the declared system scope.
- E5: Not Verified. Listing, selective extraction and full rebuilding have different risk and authority requirements; the manual warns about hazardous full restore. Those descriptions do not establish effective target/privilege authorization, upgrade reversal or recourse after overwritten system/user state.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: An actual dump/restore chain, keydisk recovery, upgrade reversal and filesystem/metadata comparison remain untested. E5 needs target/privilege and upgrade/restore authority, inspectable planned changes and appropriate independent backups/recourse.

Next without a local installation: Inspect an externally generated synthetic dump/incremental/keydisk packet with expected files/metadata and precise version/hardware assumptions; seek same-version restore/upgrade-control and recovery records.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

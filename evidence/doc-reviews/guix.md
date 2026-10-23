# GNU Guix: documentation review

Reviewed 22 October 2026 from the official Guix repository on Codeberg (README, tag list) and the manual source `doc/guix.texi` on its master branch. guix.gnu.org (site, manual, blog, download page) returned HTTP 403 to every fetch, so its privacy, download, and governance pages were not read. Latest stable release: 1.5.0, tagged 2026-01-21 in the repository; the blog headline seen in a search listing gives 23 January 2026, and the page itself was not read. Licence: GNU GPL version 3 or later (README). The manual text was read in 100,000-character slices of a 2.2 million character file, and only about half of it was covered, so absences below are "not found in the parts read".

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. The manual is the development (master) copy and is not labelled as covering 1.5.0 specifically.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 9](../third-pass/batch-9/README.md#guix) and reflected in the [application page](../../content/directory/guix.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The archive implementation passes export-recursive? to export-paths only when requested with --recursive. A package export without that option is not established to include its dependency closure; listing/extraction and store import are distinct operations, not backups of arbitrary mutable service data.
- [x] Resolved: The system command really parses -n/--dry-run, propagates dry-run? and returns before the activation/bootloader/service-switch branch. This closes the earlier uncertainty about whether system dry-run exists; configuration evaluation and planning must not be confused with a full side-effect-free OS trial.

Remaining: Channel-pinned rebuilds, network-blocked closure completeness, mutable-data restoration, generation deletion and release-specific compatibility remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- Packages live in the store `/gnu/store`, each user profile points to the packages it uses, and several versions can coexist. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- System configuration is a Scheme file (`operating-system`), and a Home Configuration chapter covers the same for user environments. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- Garbage collection is the only supported way to remove files from the store; the manual warns that manual removal "may break it beyond repair!". [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- The store's on-disk format and whether other tools can read it were not found in the parts read. `guix archive` exports and imports signed store archives. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)

**Exit and migration (E2)**
- `guix package` can export a manifest and the channels in use (`--export-manifest`, `--export-channels`). [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- A setup is pinned with `guix describe -f channels > channels.scm` and reused with `guix time-machine -C`. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- What is lost when leaving Guix for another system, and whether a manifest maps to anything outside Guix, was not found.
- Inferiors (mixing revisions) are described as a technology preview. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)

**Recovery (E3)**
- Operations are transactions: an interrupted install leaves the profile usable, and any transaction can be rolled back. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- `guix system reconfigure` is described as: it either succeeds or "nothing has changed". Previous system generations are kept, can be listed, and old ones appear in a bootloader sub-menu. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- `guix pull` supports `--roll-back`, `--switch-generation`, and `--delete-generations`. `guix time-machine` runs a chosen revision by `--commit` or `--channels`. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- A chroot-based repair of a broken GRUB install is documented under System Troubleshooting Tips. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- Backup of mutable state: a restic-backup service and a home backup service exist. No general statement on backing up or restoring `/gnu/store` or version compatibility between releases was found in the parts read. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)

**Continuing authority (E4) and dependencies**
- Substitutes (prebuilt binaries) come from official build farms by default and are disabled by default on foreign distributions. Servers are authorized with `guix archive --authorize`; `--no-substitutes` disables them. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- Without `--fallback`, a failed substitution means no local build occurs. Unencrypted HTTP substitute servers let a LAN observer "see what software you're installing". [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- `guix pull` fetches Guix from Git and verifies commit signatures. Channels use an introduction (commit plus OpenPGP fingerprint) and `.guix-authorizations`; the manual warns that "Publishing a signed channel requires discipline". [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- On foreign distributions, the manual says Guix does not backport security fixes to the releases used by distributions. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- Licence is GPL version 3 or later and authors keep copyright. [repository](https://codeberg.org/guix/guix)
- Telemetry, update checks, governance, and succession: not found in the docs read. The release blog (unread) reportedly asks for donations for build farm costs.

**Consequential operations (E5)**
- `guix package --delete-generations` "prevents rolling back to them"; the current generation is never deleted. `guix system delete-generations` takes an age such as `4m`. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- `guix pull` warns against `--disable-authentication` and `--allow-downgrades`; `--dry-run` exists for `guix pull`. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- `guix system reconfigure` does not restart already-running services. `sudo guix` uses root's own Guix, so `guix pull` must be run for root separately. [manual source](https://codeberg.org/guix/guix/raw/branch/master/doc/guix.texi)
- Whether `guix system` has a dry-run option was not found in the parts read.

## Gaps to test or read next
1. Pin channels with `guix describe -f channels`, rebuild the same synthetic profile on a second machine with `guix time-machine -C`, and compare store paths.
2. Block network access to substitute servers and source hosts, repeat a build, and record what fails (the "offline availability" scenario).
3. Delete a generation, then try to roll back to it, and check the garbage collector does not remove what a kept generation needs.
4. Back up a synthetic mutable state directory, restore it into a fresh system built from the same configuration, and compare.
5. Read the unread manual regions: Invoking guix package, Features, Substitutes (full text), Invoking guix gc, Security Updates, Contributing, the licence of the manual.
6. Retry guix.gnu.org pages (403 here): download page, 1.5.0 release notes, privacy and governance statements, and whether the 1.5.0 manual differs from master.
7. Confirm the release date (21 vs 23 January 2026) and whether rootless daemon mode changes where state is stored.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-9/README.md#guix); [actual assessment](../../content/directory/guix.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Archive export is recursive only when requested and is not arbitrary mutable-service backup. Channels, source/substitute closure, hardware and persistent service data have not been reconstructed in a network-blocked deployment. Declarative Scheme/profile generations do not alone establish complete E3.
- E5: Not Verified. System dry-run propagation avoids the inspected activation/bootloader/service-switch branch, but configuration evaluation/planning is not proven side-effect-free. Generation deletion, effective privilege/substitute policy and correction of service/mutable-state changes remain insufficiently covered.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Channel-pinned rebuilds, network-blocked closure completeness, mutable-data restoration, generation deletion and release-specific compatibility remain untested. E5 needs configuration-evaluation, activation and generation-deletion authority and mutable-service recourse; dry-run is a bounded branch.

Next without a local installation: Inspect channel-pinned recursive archives, source/substitute manifests and synthetic persistent data with expected service state; reuse same-version dry-run/activation/generation-deletion and offline restore evidence.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

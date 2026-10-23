# Syncthing: documentation review

Reviewed 22 October 2026 from the Syncthing documentation (docs.syncthing.net) and the project repository on GitHub only. Latest stable release shown: v2.1.7, marked "Latest", "released this 21 Oct 06:09"; the releases page entry omits the year. Licence: MPL-2.0, stated in the README as "All code is licensed under the MPLv2 License." Several pages were read through a page-summarising tool, so the points below rest on those summaries of the pages, not on a line-by-line reading.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 9](../third-pass/batch-9/README.md#syncthing) and reflected in the [application page](../../content/directory/syncthing.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The versioner helper resolves .stversions by default or a configured versioning filesystem and archives/restores using filesystem RenameOrCopy with timestamp handling. Archived versions are files, not merely opaque index entries; full metadata fidelity is not established by that code.
- [x] Resolved: Trashcan archive uses the original filename rather than the Simple versioner's timestamp-tagged name. Its cleanup returns without removal when cleanoutDays <= 0; otherwise files older than the computed cutoff are removed. This resolves a retention-policy boundary, not proof that synchronization itself is a backup.

Remaining: Two-peer deletion/conflict propagation, manual metadata recovery, config/database migration, destructive override/revert behavior and network observations remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- Your files stay as ordinary files in the shared folder; Syncthing keeps its own state elsewhere. Settings are in `config.xml` (XML); `cert.pem` and `key.pem` hold the device key pair that determines the device ID. [configuration](https://docs.syncthing.net/users/config.html)
- The index database sits in the config directory by default (`--data` or `$STDATADIR` can move it). The `index-*` files are described as holding file metadata and hashes; their internal format was not found in the docs. [configuration](https://docs.syncthing.net/users/config.html)
- Config location by OS is documented (for example `%LOCALAPPDATA%\Syncthing` on Windows), and `syncthing --paths` lists the paths. [configuration](https://docs.syncthing.net/users/config.html), [FAQ](https://docs.syncthing.net/users/faq.html)
- The `version` attribute of the config (currently 37) increments when a change requires migration. [configuration](https://docs.syncthing.net/users/config.html)

**Exit and migration (E2)**
- No export step is needed to leave: the synced folders are plain files. What is lost on leaving (device pairings, ignore settings, version history) is not stated as an exit topic; not found in the docs.
- Syncing a config directory between devices is warned against, as it often produces duplicate device IDs. To back up configs, use a send-only folder. [configuration](https://docs.syncthing.net/users/config.html)
- Third-party tools and packages are listed on a community page. Some are marked as possibly unmaintained. [contributions](https://docs.syncthing.net/users/contrib.html)
- Encrypted (untrusted) device data can be turned back into plaintext with `syncthing decrypt`, run on a trusted device with the folder password. [untrusted devices](https://docs.syncthing.net/users/untrusted.html)

**Recovery (E3)**
- Syncthing is described as "not a great backup application", because changes propagate to all devices. Other tools are recommended. [FAQ](https://docs.syncthing.net/users/faq.html)
- Versioning types: Trash Can, Simple, Staggered, External, and Disabled (the default). Old copies go to `.stversions` in the folder by default. [versioning](https://docs.syncthing.net/users/versioning.html)
- Versioning archives only changes received from other devices, not local edits. The page does not describe how to restore a version. [versioning](https://docs.syncthing.net/users/versioning.html)
- Deleting the database is a recovery step, after which all shared folders are re-hashed. [FAQ](https://docs.syncthing.net/users/faq.html)
- Compatibility between Syncthing versions, and downgrading across the config `version` number, was not found in the docs.

**Continuing authority (E4) and dependencies**
- No accounts. Devices connect when each side adds the other's device ID. The GUI can be protected with a username and password. [FAQ](https://docs.syncthing.net/users/faq.html)
- Global discovery and relaying are on by default; relays are run by the public and see device IDs but not content. Both can be disabled or restricted. Local discovery is also on by default. [security](https://docs.syncthing.net/users/security.html)
- Automatic upgrades are on by default (within 24 hours of a release, fetched from GitHub). The FAQ page does not say how to turn them off. The security page says upgrade checks send no identifying information and usage reporting is off by default. [FAQ](https://docs.syncthing.net/users/faq.html), [security](https://docs.syncthing.net/users/security.html)
- The README ranks "Safe From Data Loss" first of seven goals. It names no maintainers, governance model, succession plan, or maintenance-status statement; CLA not mentioned on that page. Release binaries are GPG-signed. [GitHub](https://github.com/syncthing/syncthing)
- Untrusted-device encryption is marked "beta / testing only". [untrusted devices](https://docs.syncthing.net/users/untrusted.html)

**Consequential operations (E5)**
- Deletions sync like other changes. If the `.stfolder` marker is missing, syncing pauses; once it reappears, "missing files will be considered deletions". [FAQ](https://docs.syncthing.net/users/faq.html)
- Conflicts: the losing copy is renamed `<filename>.sync-conflict-<date>-<time>-<modifiedBy>.<ext>`; the older modification time loses. If a file is edited on one device and deleted on another and the deletion wins, the edit is kept as a conflict copy. [syncing](https://docs.syncthing.net/users/syncing.html)
- Send Only "Override Changes" overwrites other devices and deletes files missing locally; Receive Only "Revert Local Changes" deletes locally added files and discards local edits. Both buttons are shown in red. [folder types](https://docs.syncthing.net/users/foldertypes.html)
- Case-insensitive systems can fail to sync clashing names; the user must rename by hand. [syncing](https://docs.syncthing.net/users/syncing.html)
- The External versioning command must remove the file itself or Syncthing reports an error; the PowerShell recycle-bin script deletes permanently on USB drives. [versioning](https://docs.syncthing.net/users/versioning.html)

## Gaps to test or read next
1. Pair two instances with synthetic data, disconnect them, delete files on one, reconnect, and confirm what happens on the other with versioning off, then Simple and Staggered.
2. Create conflicting edits on both sides; compare the conflict file names and check that the loser is readable in an ordinary editor.
3. Restore a file from `.stversions` by hand, and check what metadata (names, timestamps) survives.
4. Copy the config directory and `index-*` files to a clean machine, start an older and a newer release, and record whether the config `version` migration blocks downgrade.
5. Block all outbound network traffic and observe what runs (discovery, relay, upgrade check, crash reporting); then test the settings that turn them off.
6. Open the `index-*` database with a generic tool to see whether it is readable without Syncthing.
7. Try Override Changes and Revert Local Changes on a copy and record what is deleted.
8. Not read: the release notes for v2.x database changes (the latest release page mentions SQLite fixes), CONTRIBUTING.md, the documentation pages on upgrading, ignoring files, automatic crash reporting, and the REST API. The usage-reporting page and syncthing.net/privacy returned 404 from the URLs tried, so the telemetry statements above come from the security page only. Governance, maintainers, and succession: not found in the docs.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-9/README.md#syncthing); [actual assessment](../../content/directory/syncthing.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Versioner archives are ordinary files using RenameOrCopy and timestamp handling, but full metadata fidelity, configuration/index migration and two-peer reconstruction were not established. Version retention is not proof of independent backup or recovered conflict/deletion history.
- E5: Not Verified. Trashcan retention uses policy-dependent cleanup and non-tagged names; synchronization can propagate destructive changes. Effective peer/folder authority, override/revert choices, conflict visibility and usable recovery remain insufficiently covered by the retention helper alone.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Two-peer deletion/conflict propagation, manual metadata recovery, config/database migration, destructive override/revert behavior and network observations remain untested. E5 needs peer/folder authorization, deletion/conflict and override/revert visibility, plus configured retention and recovery limits.

Next without a local installation: Use a synthetic two-peer folder/config/version archive packet with expected conflicts/metadata and externally recorded propagation/revert/restore observations; inspect files and policies independently.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

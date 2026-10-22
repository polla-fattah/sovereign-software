# KeePassXC: documentation review

Reviewed 22 October 2026 from the KeePassXC website (download, privacy, user guide), the project repository (README, releases, changelog, and the `docs/` sources for the guide and man page). Current stable release: 2.8.0; the releases page shows "21 Oct 21:57" with no year, so the year 2026 is inferred from asset timestamps. The download page gives no date. Licence: the download page and docs say GPLv3; the README says "GPL-2 or GPL-3", so the two differ. The user guide web page is about 980,000 characters, mostly embedded images, and its export, backup and recycle bin sections did not appear in the fetched text, so those facts come from the repository `.adoc` sources of the same guide. The guide header reads version 2.7.11, so it may lag 2.8.0.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- The database is one `.kdbx` file. The README says KeePassXC can "Create, open, and save databases in the KDBX format (KeePass-compatible with KDBX4 and KDBX3)". Which other tools can read it, and the byte-level format specification, were not found in the pages read. [README](https://github.com/keepassxreboot/keepassxc)
- The guide says information is "encrypted at all times within the `kdbx` file", and that unencrypted data is never written to disk. [user guide](https://keepassxc.org/docs/KeePassXC_GettingStarted), [user guide, storing](https://keepassxc.org/docs/KeePassXC_UserGuide)
- KDBX 3.1 supports only AES-KDF; Argon2 needs KDBX 4, which the docs recommend. [database operations](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/DatabaseOperations.adoc)
- Passkeys are stored as ordinary entries in a group named "KeePassXC-Browser Passwords". TOTP, custom attributes, attachments and entry history are entry features. [passkeys](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/Passkeys.adoc), [user guide](https://keepassxc.org/docs/KeePassXC_UserGuide)

**Exit and migration (E2)**
- Export formats are CSV, XML and HTML. Documented losses: CSV drops attachments, advanced attributes, Auto-Type settings and custom icons; XML drops attachments; HTML drops attachments and some custom data fields. [import and export](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/ImportExport.adoc)
- All exports are unencrypted. HTML is for printing as a paper backup, not for re-import. [import and export](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/ImportExport.adoc)
- Import: CSV, 1Password (.1pux, .opvault), Bitwarden JSON, Proton Pass JSON, KeePass 1 (.kdb), and remote .kdbx. [import and export](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/ImportExport.adoc)
- `keepassxc-cli export` writes XML by default, or CSV with `-f`. `keepassxc-cli import` takes an XML export and creates a KDBX 4 database. [CLI man page](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/man/keepassxc-cli.1.adoc)
- Passkeys can be exported as unencrypted `.passkey` JSON files and imported again. [passkeys](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/Passkeys.adoc)

**Recovery (E3)**
- The guide warns that losing the password "might result in permanent locking" of the database, and that deleting the file means total loss. A YubiKey is a hardware factor to back up too. A separate key file loss warning was not found. [database operations](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/DatabaseOperations.adoc), [user guide](https://keepassxc.org/docs/KeePassXC_UserGuide)
- A backup of the existing file can be written before each save to a configured path, or on demand with "Save Database Backup". [database operations](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/DatabaseOperations.adoc)
- Save modes: safe save (default, temp file beside the original), temp-folder save (an interrupted move may leave an unknown state), and direct write, called "an unsafe operation". Autosave is off by default. [database operations](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/DatabaseOperations.adoc)
- Compatibility between KeePassXC versions: no statement found. The 2.8.0 notes list no KDBX change but say a Linux Quick Unlock feature adds a UUID to public metadata and marks the database modified. The 2.8.0 notes move the app to Qt 6. [releases](https://github.com/keepassxreboot/keepassxc/releases) (rests on a summary of the page)

**Continuing authority (E4) and dependencies**
- The privacy page says stored data is never sent to the project or third parties, and servers are contacted only on explicit request, such as downloading a favicon. [privacy](https://keepassxc.org/privacy/)
- Update check: the privacy page says the browser extension checks GitHub for the latest version, and this "can be turned off". Whether the desktop app checks itself was not found. [privacy](https://keepassxc.org/privacy/)
- The website uses self-hosted Matomo analytics with a Do Not Track opt-out; this concerns the website only. [privacy](https://keepassxc.org/privacy/)
- No account is mentioned in the pages read. The README lists HIBP report checks and entry icon downloads as network features, without describing how to disable them. [README](https://github.com/keepassxreboot/keepassxc)
- Governance: the README calls the project community-driven and points to CONTRIBUTING and a Code of Conduct (contents not read). No named maintainers, succession or funding statement found. [README](https://github.com/keepassxreboot/keepassxc)
- Disclaimers: provided "as is", with no warranty, and liability for data loss is excluded. [disclaimers](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/Disclaimers.adoc)

**Consequential operations (E5)**
- `keepassxc-cli rm` moves an entry to the recycle bin if one exists; an entry already there "will be removed permanently". [CLI man page](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/man/keepassxc-cli.1.adoc)
- `keepassxc-cli merge` replaces the first database with the result; the page says to back up both, and offers `--dry-run`. [CLI man page](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/man/keepassxc-cli.1.adoc)
- GUI merge matches by UUID, keeps the newest version and moves the older one to history. Recorded deletions remove a matching entry without a prompt. [database operations](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/DatabaseOperations.adoc)
- KeeShare merges depend on history, which "must be enabled" and large enough to avoid data loss; signatures cannot detect a signer replacing data with an older version. [KeeShare](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/KeeShare.adoc)
- The guide warns that storing TOTP in the same database as the password removes the benefit of two-factor authentication. [user guide](https://keepassxc.org/docs/KeePassXC_UserGuide)
- Recycle bin and entry history behavior in the GUI, and undo: not found in the docs read.

## Gaps to test or read next
1. Create a synthetic KDBX 4 database with groups, attachments, history, TOTP, a passkey and a key file; open it in another KeePass-family client and list what is missing.
2. Export the same database to CSV, XML and HTML, re-import each into a new database, and diff against the original to confirm the documented losses.
3. Open a database saved by 2.8.0 in 2.7.x (and the reverse) and record any warning or loss; the docs state no cross-version rule.
4. Restore from an automatic backup and from a deliberately deleted file; test opening with the key file or YubiKey missing.
5. Edit the same entry in two copies and merge both ways; check history and the deletion-record behavior.
6. With a network monitor, run the desktop app with default settings and record any connection (update check, favicons, HIBP).
7. Not read: the GUI sections on the recycle bin, history and entry deletion; Advanced Entry Handling; the KDBX specification or any statement of third-party readers; CONTRIBUTING, SECURITY and COPYING; reconcile GPLv3 versus "GPL-2 or GPL-3".

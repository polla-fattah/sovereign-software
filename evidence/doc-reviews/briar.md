# Briar: documentation review

Reviewed 22 October 2026 from briarproject.org and its GitHub mirror only. The project wiki and repository pages on code.briarproject.org returned 403, so protocol specifications and the data format were not read and are unknown, not absent. Latest release shown: Briar 1.5.22 (13 October 2026). Licence: "the GNU General Public License", version not stated on the page read.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- Messages, contacts, and the account are stored on the device, not in the cloud, and there is no central server for normal operation. How the database is encrypted, what key protects it, and whether the format is documented were not found. [home](https://briarproject.org/), [how it works](https://briarproject.org/how-it-works/), [privacy policy](https://briarproject.org/privacy-policy/)
- Forum content is held as a copy by every subscriber. [how it works](https://briarproject.org/how-it-works/)

**Exit, backup, and recovery (E2, E3)**
- "If you uninstall Briar or forget your password, there's no way to recover your account." [manual](https://briarproject.org/manual/)
- The project's own maintenance-mode post lists "missing features like account backup and file attachments" as long-standing issues. No documented way to export messages or contacts, or to move an account to a new device, was found. [maintenance mode](https://briarproject.org/news/2026-maintenance-mode/)
- Uninstalling on Android deletes the account. [privacy policy](https://briarproject.org/privacy-policy/)

**Continuing authority (E4) and dependencies**
- Transports are Bluetooth, Wi-Fi, and Tor (memory cards are also named on one page). No account server: the account is created locally. With no internet, Bluetooth and Wi-Fi keep working. Contacts are added by QR code, link, or introduction. [how it works](https://briarproject.org/how-it-works/), [manual](https://briarproject.org/manual/)
- The optional Mailbox is a helper app the user runs on a spare Android device, delivering only between its owner and their contacts, over Tor. [Mailbox](https://briarproject.org/download-briar-mailbox/)
- Distribution is Google Play, F-Droid, or a direct APK. Push-notification and Google-service dependence was not found. Android is the main platform; Briar Desktop is a beta and the current desktop version was not read. [download](https://briarproject.org/download-briar/)
- Licence and governance: voluntary board of up to 5 members, funding from several foundations and grants. The project says it is in maintenance mode (9 July 2026): only essential security updates and bug fixes, and stated limitations include high battery use, unreliable background operation on Android, and no account backup or file attachments. [governance](https://briarproject.org/governance), [about](https://briarproject.org/about/), [copyright](https://briarproject.org/copyright), [maintenance mode](https://briarproject.org/news/2026-maintenance-mode/)
- Security: a 2023 post reports three issues found by ETH Zürich researchers, including a poorly designed handshake the project says was not exploitable. A published independent audit report was not found. [security issues](https://briarproject.org/news/2023-three-security-issues-found-and-fixed/)

**Consequential operations (E5)**
- Deleting a contact does not notify them, who just sees you offline. Private groups dissolve if the creator leaves, and forums have no admin or moderator and last until the last member leaves. Auto-delete or disappearing messages were not found. The only explicit data-loss warning is the account one above. [manual](https://briarproject.org/manual/)
- Stated threat model: Tor hides who talks to whom, content is end-to-end encrypted, and users who cannot keep their devices secure are treated as controlled by the adversary. These are the project's own claims. [how it works](https://briarproject.org/how-it-works/)

## Gaps to test or read next
1. Read the wiki in a browser: database encryption, data format, and the protocol specifications (needed to judge independent interpretation and recovery).
2. Test a real account loss: device change, uninstall, and what survives (expected from the docs: nothing).
3. Check whether any other client can read or import Briar data, and whether the protocols are specified well enough to implement independently.
4. Read the GitHub releases, the desktop page, and the Android minimum version.
5. Judge E2 and E3 carefully for software where permanent loss on device loss is by design: the framework should say what it expects there.

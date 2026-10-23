# Jami: documentation review

Reviewed 22 October 2026 from the Jami documentation (docs.jami.net), jami.net (release post, privacy policy, download page), and the GitHub mirror of the Jami daemon only. Latest release found: "Euclid", dated "April 01, 2026" on its release post, which gives no numeric version. The download page states no version or date, and the GitHub mirrors show no releases. Licence: GPLv3 or later per the introduction page; the daemon mirror shows GPL-3.0. The git.jami.net repository page returned a bot-protection denial (Anubis), so the client README is unknown.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. All facts below rest on page summaries returned by a fetch tool, not on full page reads.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 12](../third-pass/batch-12/README.md#jami) and reflected in the [application page](../../content/directory/jami.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The account serializer explicitly builds JSON containing identity keys/certificate, configuration, contacts, conversation-info records and requests. The archive manager separately filters device-local settings and excludes collaborative-document conversation records. This identifies an identity/contact archive route, not demonstrated completeness of message repositories, attachments or collaborative content.
- [x] Resolved: exportArchive refreshes/saves the account archive, then copies it to the destination with overwrite_existing and returns the filesystem result. This low-level export path permits replacing an existing backup; client-side prompts or backup rotation are not established by the daemon implementation.

Remaining: Actual encrypted archive decoding and clean import, complete history/attachment preservation, outer encryption/version compatibility, conversation deletion propagation and runtime network dependency remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- The account lives only on the devices that hold it, and consists of a key pair and certificate. No personal information is needed to create one. [privacy policy](https://jami.net/privacy-policy/), [introduction](https://docs.jami.net/en_US/user/introduction.html)
- Desktop users can copy the local database as a manual backup (example path `~/.local/share/jami/`); macOS and Android paths are also given. Audio and video messages are kept in a `sent_data` folder. [FAQ](https://docs.jami.net/en_US/user/faq.html)
- The format of the database and the account archive was not found in the docs, and nothing says other tools can read them. The introduction page says it does not describe where or how data is stored. [introduction](https://docs.jami.net/en_US/user/introduction.html)
- Swarm conversations are stated to be fully synchronized across an account's linked devices, and every device keeps a copy of the messages. Before Swarm, sent messages did not appear on other devices. [FAQ](https://docs.jami.net/en_US/user/faq.html)
- The password only encrypts the local archive; newer versions do not ask for one by default. [FAQ](https://docs.jami.net/en_US/user/faq.html)

**Exit and migration (E2)**
- Two paths: link a second device, or back up the account archive (Settings, Account, Manage account, "Backup account" on GNU/Linux desktop). Only "some clients" can export the archive. [FAQ](https://docs.jami.net/en_US/user/faq.html)
- Linking places the archive on the Jami network for a few minutes under a generated password; the new device gets the certificate and makes its own device key. [FAQ](https://docs.jami.net/en_US/user/faq.html)
- Export to a non-Jami format (messages, attachments, contacts) was not found in the docs. What an archive does or does not contain was not found.

**Recovery (E3)**
- Restore is described for desktop only: import via "Import from an archive backup", or close Jami and replace the database with the saved copy. [FAQ](https://docs.jami.net/en_US/user/faq.html)
- Whether an archive import brings back message history, or only the account and contacts, was not found in the docs.
- Compatibility of archives or databases between Jami versions was not found. The Euclid post points to a changelog but says nothing on backup or upgrade compatibility. [Euclid](https://jami.net/euclid/)
- The docs changelog URL tried (docs.jami.net/en_US/news/changelog.html) returned 404, so it was not read.

**Continuing authority (E4) and dependencies**
- Described as a distributed network with "no central authority"; peers connect through a DHT. Every device runs a DHT node, which exposes its IP address. A DHT proxy can take over, but then sees the address. [introduction](https://docs.jami.net/en_US/user/introduction.html), [FAQ](https://docs.jami.net/en_US/user/faq.html)
- Optional usernames sit in a public blockchain-based registry (default `ns.jami.net`). A registered name cannot be changed or removed, and a lost name cannot be registered again by anyone. [privacy policy](https://jami.net/privacy-policy/), [FAQ](https://docs.jami.net/en_US/user/faq.html)
- Savoir-faire Linux runs a public DHT proxy for push notifications and a TURN server for failed direct connections; both can be turned off in settings, and the policy says no logs are kept. [privacy policy](https://jami.net/privacy-policy/)
- Telemetry: the policy covers only website analytics (Matomo). The FAQ mentions possible future opt-in anonymized statistics. App telemetry and update checks are not addressed in the pages read. [privacy policy](https://jami.net/privacy-policy/), [FAQ](https://docs.jami.net/en_US/user/faq.html)
- Governance: copyright holder is Savoir-faire Linux Inc.; development uses Gerrit, with an issue tracker at git.jami.net. No succession, maintainer-list, or governance document was seen. [daemon mirror](https://github.com/savoirfairelinux/jami-daemon)

**Consequential operations (E5)**
- Deleting the account from every device with no backup removes it permanently; the docs say "please back it up!" and offer no recovery process. [FAQ](https://docs.jami.net/en_US/user/faq.html)
- Forgetting the archive password has no recovery process. Changing it affects only the current device. [FAQ](https://docs.jami.net/en_US/user/faq.html)
- Contacts keep messages already sent to them. Public DHT records expire after inactivity. [FAQ](https://docs.jami.net/en_US/user/faq.html)
- Message deletion, edit, and undo behavior was not found in the pages read (a Dev update #15 post mentions 1:1 conversation deletion; not read).

## Gaps to test or read next
1. Create a synthetic account, exchange text, files, and a group Swarm, export the archive, delete the account, import on a clean install, and list what returns (history, attachments, contacts).
2. Open the archive and the local database with generic tools (file type, archive tools, SQLite) and record whether any content is readable without Jami.
3. Restore an archive made by an older release on the current one, and the reverse, to check version compatibility.
4. Run with network blocked and with the DHT proxy, push, and TURN options off, and note which functions fail.
5. Delete a conversation and a message on one linked device, and see what remains on the other device and on the contact's side.
6. Read: the full docs changelog and release notes (numeric version unknown), the account-management and backup pages (a guessed URL returned 404), the client README on git.jami.net (blocked), the licence of the client repositories, and any update-check or telemetry statement.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-12/README.md#jami); [actual assessment](../../content/directory/jami.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Account archive source identifies identity/config/contact/conversation-info records, while some device-local and collaborative records are excluded or separate. Complete encrypted archive import with message repositories, attachments and collaborative content has not been demonstrated. Identity backup is not established as full conversation recovery.
- E5: Not Verified. The daemon export path permits replacing an existing archive and reports its filesystem result; client-side confirmation/rotation is not established there. Effective client/device authority, key/export approval, conversation deletion propagation and recourse remain insufficiently covered.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Actual encrypted archive decoding and clean import, complete history/attachment preservation, outer encryption/version compatibility, conversation deletion propagation and runtime network dependency remain untested. E5 needs client-side export/overwrite and device/conversation deletion controls, inspectable consequences and usable recovery boundaries.

Next without a local installation: Inspect a synthetic encrypted archive plus separately required message/attachment repositories with dummy identity material and expected content; obtain same-version client prompt/overwrite/import/deletion and network-dependency records.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

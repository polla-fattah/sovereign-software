# pass: documentation review

Reviewed 22 October 2026 from the passwordstore.org home page and the official git.zx2c4.com repository pages (README/man page, tag and refs listings) only. The home page says the latest version is 1.7.4 and gives no release date; the repository tag page for 1.7.4 shows 2021-06-11 ("Wayland support and bug fixes"), and the refs list shows no newer tag. Licence: GPLv2 or later, stated on both the home page and the README. Facts were read through page summaries, so wording below is paraphrase unless quoted.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 9](../third-pass/batch-9/README.md#pass) and reflected in the [application page](../../content/directory/pass.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The show/edit paths directly call GPG decryption on individual .gpg entry files. Store recovery therefore depends on the corresponding decryption keys and GPG environment, not a pass-only proprietary reader. No synthetic key-restoration run is claimed.
- [x] Resolved: Delete removes the working file and, in a Git-backed store, records git rm plus a normal commit rather than history erasure. Re-encryption likewise adds a commit. Importantly yesno returns success without prompting when stdin is not a terminal, so the advertised confirmation is conditional even without --force; older encrypted history is not thereby revoked.

Remaining: Actual private-key/trust recovery, prior-history decryption after recipient changes, importer completeness and observed offline behavior remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- Each entry is a gpg-encrypted file, named for the site or resource, kept by default in `~/.password-store`; the location is set with `PASSWORD_STORE_DIR`. Entries use `.gpg` filenames in a directory tree. [home page](https://www.passwordstore.org/), [man page](https://git.zx2c4.com/password-store/tree/man/pass.1)
- A `.gpg-id` file lists the key(s) used; a subfolder may have its own `.gpg-id`. [man page](https://git.zx2c4.com/password-store/tree/man/pass.1)
- The store imposes no schema: extra data such as URLs can sit in the same file, and the first line is the password. [home page](https://www.passwordstore.org/)
- Because entries are ordinary files, they can be organised in folders and copied with standard tools. The docs do not say outright that plain `gpg -d` reads an entry; this is implied, not stated (not found in the docs). [home page](https://www.passwordstore.org/)
- The home page's "Data Organization" section reportedly calls the store "simply a flat text file", which conflicts with the per-file description. Unverified summary; re-read the page.

**Exit and migration (E2)**
- Migration out is by copying the directory; the docs do not describe moving keys, trust settings, or ownertrust (not found in the docs). [home page](https://www.passwordstore.org/)
- Importer scripts for other managers (1Password, KeePassX, LastPass and others) are listed on the home page, as is firefox_decrypt. Their completeness and what they lose is not documented there. [home page](https://www.passwordstore.org/)
- No export command is documented; `show`, `grep`, and `ls` exist. A bulk plaintext export is not described (not found in the docs). [man page](https://git.zx2c4.com/password-store/tree/man/pass.1)

**Recovery (E3)**
- Neither the README nor the man page describes backup, recovery, or loss of the GPG key (not found in the docs). The only mentioned safeguard is optional git history. [README](https://git.zx2c4.com/password-store/about/), [man page](https://git.zx2c4.com/password-store/tree/man/pass.1)
- Git sync uses `pass git push` and `pass git pull`; each modification creates a commit when the store is a repository. [home page](https://www.passwordstore.org/)
- Version compatibility between pass releases was not found in the pages read.

**Continuing authority (E4) and dependencies**
- Author and named maintainer: Jason A. Donenfeld. The home page mentions contributors, a mailing list taking git-formatted patches, and a `#pass` channel on Libera.Chat. No succession, funding, or governance statement was found. [home page](https://www.passwordstore.org/)
- Dependencies named: gpg2, gpg-agent, git, tree, grep, tr, xclip or wl-clipboard, qrencode, bash. [man page](https://git.zx2c4.com/password-store/tree/man/pass.1)
- No account, telemetry, or update check is mentioned on the pages read; this is absence of mention, not a denial.
- The README says the copyright runs to 2026; the home page notice says 2012-2021. Release tags are said to be signed. [README](https://git.zx2c4.com/password-store/about/), [home page](https://www.passwordstore.org/)
- Extensions: system-wide ones are always on; user ones in `.extensions/` run only when `PASSWORD_STORE_ENABLE_EXTENSIONS` is `true`. `PASSWORD_STORE_SIGNING_KEY` requires detached signatures on `.gpg-id` and non-system extensions. [man page](https://git.zx2c4.com/password-store/tree/man/pass.1)

**Consequential operations (E5)**
- `rm` prompts unless `-f` is given; `-r` removes directories. `insert` and `generate` prompt before overwriting unless `-f`; `mv` and `cp` overwrite silently with `-f`. [man page](https://git.zx2c4.com/password-store/tree/man/pass.1)
- Whether a removed entry stays in git history, and secure erasure, are not addressed (not found in the docs). [README](https://git.zx2c4.com/password-store/about/)
- `init` with a different key re-encrypts existing files; `mv` and `cp` re-encrypt to the destination's keys. Removing access for an old key from past git history is not discussed. [man page](https://git.zx2c4.com/password-store/tree/man/pass.1)
- Clipboard copy is restored after 45 seconds by default (`PASSWORD_STORE_CLIP_TIME`). `pass <name>` prints the password to the terminal. [man page](https://git.zx2c4.com/password-store/tree/man/pass.1), [home page](https://www.passwordstore.org/)
- `edit` places temporary files in `/dev/shm`, with a warning if it falls back to `TMPDIR`. This is the only explicit warning found. [man page](https://git.zx2c4.com/password-store/tree/man/pass.1)

## Gaps to test or read next
1. Restore test: copy a synthetic store to a clean machine, import the exported private key, set trust, and run `gpg -d` on one entry directly, without pass. Record which steps the docs leave out.
2. Re-encrypt a synthetic store to a new recipient with `pass init`; confirm old keys cannot decrypt the new files, and check whether earlier git commits still decrypt with the old key.
3. Delete an entry with `pass rm` in a git-backed store; check whether the history keeps the old encrypted blob.
4. Round trip: import from a synthetic KeePass or CSV file with pass-import, then compare entry count and notes fields against the source.
5. Lose-the-key drill: remove the secret key and confirm entries are unreadable, to document the stated dependency on key custody.
6. Run offline with the network disabled and watch for outbound connections (none were found in the docs).
7. Not read: the full home page text (to settle the "flat text file" wording), the repository changelog and NEWS files, the contribution and security pages, and extension documentation.
8. Not found: release date on the home page, a version-compatibility statement, a succession or governance statement, and any backup guidance.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-9/README.md#pass); [actual assessment](../../content/directory/pass.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Source delegates individual entry decryption to GPG, so the preserved files are not tied to a pass-only proprietary reader. However no corresponding private-key/trust/recipient environment was reconstructed or old encrypted history checked after recipient changes. The declared key and history recovery remains unverified.
- E5: Not Verified. Git-backed removal/re-encryption records normal commits rather than erasing old history, and the yes/no helper bypasses prompting on non-terminal input. These are important command/history boundaries, not complete evidence of effective secret-use/export, recipient-change and correction controls in the assessed configuration.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.

Remaining: Actual private-key/trust recovery, prior-history decryption after recipient changes, importer completeness and observed offline behavior remain untested. E5 needs effective non-interactive/force, recipient-change, secret-use/export and historical-ciphertext recourse boundaries.

Next without a local installation: Inspect a synthetic store with non-secret GPG test credentials, recipient policy and Git history, then obtain independently recorded key/trust restoration and approval/history behavior. Do not supply or use real private keys.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

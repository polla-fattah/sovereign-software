# Third pass, batch 12

Reviewed 23 October 2026, Asia/Baghdad. 5 bounded questions are resolved across 2 applications. All findings are copied into the actual application pages; broader unknowns remain open.

## Method and reproduction

Run from the repository root:

```powershell
python evidence/third-pass/inspect_remaining.py 12
```

[inspection-plan.json](inspection-plan.json) identifies pinned source revisions and inputs. [artifact-results.json](artifact-results.json) records retained-file SHA-256 hashes, Git-object checks where available, observed structures, source locations and environment. Downloaded application implementation code is not imported or run. Published schema DDL, when explicitly identified, is instantiated in SQLite; document code blocks are not evaluated. Archives are inspected in memory; historical samples retain their historical scope. Source-anchor matches locate reviewed code, not successful application tests or CI runs. No target application was installed. Any use of an already available runtime is identified explicitly in the findings and result record; source inspection is not reported as an application run. Upstream licensing and copyright continue to apply to the retained files.

At the user's request, existing eligibility and principle ratings are preserved exactly. E3/E5 decisions, principle reconciliation and invalid/blank-status corrections are deferred to the next pass. A resolved sub-question does not establish whole-application compliance.

<a id="briar"></a>

## Briar

- [x] Resolved: The database implementation uses split H2 storage with CIPHER=AES and obtains its file password from a supplied secret key. It is not plain SQLite: copying database files alone does not establish readable independent recovery without the key material and a compatible H2/schema reader. [Inspected source/input](https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/bramble-core/src/main/java/org/briarproject/bramble/db/H2Database.java).
- [x] Resolved: Account creation generates a random database key, encrypts it under the password with an optional key strengthener, and stores that encrypted key separately. Sign-in loads/decrypts it; deleteAccount removes both key and database directories. The password alone is not demonstrated to regenerate a lost random key or account. [Inspected source/input](https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/bramble-core/src/main/java/org/briarproject/bramble/account/AccountManagerImpl.java).
- [x] Resolved: Contrary to the earlier documentation search's unknown, the pinned source implements per-contact auto-delete timers with validated bounds, a disabled sentinel, timestamps and rules for mirroring received timer changes. This establishes that timed-deletion controls exist, not that recipients cannot retain copies or that deletion/undo was observed. [Inspected source/input](https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/briar-core/src/main/java/org/briarproject/briar/autodelete/AutoDeleteManagerImpl.java).

Remaining: Independent encrypted-database reading, key-strengthener portability, protocol interoperability, actual device-loss recovery, deletion timing and UI confirmation/undo behavior remain untested.

<a id="jami"></a>

## Jami

- [x] Resolved: The account serializer explicitly builds JSON containing identity keys/certificate, configuration, contacts, conversation-info records and requests. The archive manager separately filters device-local settings and excludes collaborative-document conversation records. This identifies an identity/contact archive route, not demonstrated completeness of message repositories, attachments or collaborative content. [Inspected source/input](https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/accountarchive.cpp).
- [x] Resolved: exportArchive refreshes/saves the account archive, then copies it to the destination with overwrite_existing and returns the filesystem result. This low-level export path permits replacing an existing backup; client-side prompts or backup rotation are not established by the daemon implementation. [Inspected source/input](https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/archive_account_manager.cpp).

Remaining: Actual encrypted archive decoding and clean import, complete history/attachment preservation, outer encryption/version compatibility, conversation deletion propagation and runtime network dependency remain untested.

Related inputs: [Export filtering and collaborative-document exclusions](https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/archive_account_manager.cpp).


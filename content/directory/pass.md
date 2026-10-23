+++
title = "Pass"
category = "OS & Infra"
summary = "Secrets live as individual GPG-encrypted files in a directory you control, with no third-party vault server."
substrate = "GPG-encrypted files in a plain directory"
sync_model = "Git / Syncthing (no commercial cloud)"
extract_cmd = "gpg -d ~/.password-store/infra/root.gpg"
pilot_stage = 3
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Actual private-key/trust recovery, prior-history decryption after recipient changes, importer completeness and observed offline behavior remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence 3ca13cd8882cae4083c1c478858adbf2e82dd037"
assessment_notes = "Individually reconciled in rating batch 9 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
locality = "meets"

[[evidence]]
target = "E1"
text = "pass stores credentials in local password-store files and exposes a command-line interface for inspection and management."
url = "https://www.passwordstore.org/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The store is a directory of independently usable encrypted files and can be migrated by copying the directory and keys."
url = "https://www.passwordstore.org/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The show/edit paths directly call GPG decryption on individual .gpg entry files. Store recovery therefore depends on the corresponding decryption keys and GPG environment, not a pass-only proprietary reader. No synthetic key-restoration run is claimed."
url = "https://github.com/zx2c4/password-store/blob/3ca13cd8882cae4083c1c478858adbf2e82dd037/src/password-store.sh"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The password store and encryption keys are held by the user and can be synchronized with ordinary file tools."
url = "https://www.passwordstore.org/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Delete removes the working file and, in a Git-backed store, records git rm plus a normal commit rather than history erasure. Re-encryption likewise adds a commit. Importantly yesno returns success without prompting when stdin is not a terminal, so the advertised confirmation is conditional even without --force; older encrypted history is not thereby revoked."
url = "https://github.com/zx2c4/password-store/blob/3ca13cd8882cae4083c1c478858adbf2e82dd037/src/password-store.sh"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Local encrypted files and user-held keys give strong authority and exit."
url = "https://www.passwordstore.org/"
confidence = "high"

[[evidence]]
target = "longevity"
text = "E3 is not established for Pass's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/zx2c4/password-store/blob/3ca13cd8882cae4083c1c478858adbf2e82dd037/src/password-store.sh"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core workflow is local and offline."
url = "https://www.passwordstore.org/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/zx2c4/password-store/blob/3ca13cd8882cae4083c1c478858adbf2e82dd037/src/password-store.sh"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Source delegates individual entry decryption to GPG, so the preserved files are not tied to a pass-only proprietary reader. However no corresponding private-key/trust/recipient environment was reconstructed or old encrypted history checked after recipient changes. The declared key and history recovery remains unverified."
url = "https://github.com/zx2c4/password-store/blob/3ca13cd8882cae4083c1c478858adbf2e82dd037/src/password-store.sh"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Git-backed removal/re-encryption records normal commits rather than erasing old history, and the yes/no helper bypasses prompting on non-terminal input. These are important command/history boundaries, not complete evidence of effective secret-use/export, recipient-change and correction controls in the assessed configuration."
url = "https://github.com/zx2c4/password-store/blob/3ca13cd8882cae4083c1c478858adbf2e82dd037/src/password-store.sh"
confidence = "medium"

+++

**Verification scenario:** Restore a GPG-encrypted tree with private keys and trust settings; re-encrypt for new recipients; test offline.

**What may invalidate an overconfident claim:** Availability of encrypted files is not recoverability if keys are lost. Protect test secrets.

**Documentation starting point:** <https://www.passwordstore.org/>

**Evidence update: 23 October 2026**

- [x] Resolved: The show/edit paths directly call GPG decryption on individual .gpg entry files. Store recovery therefore depends on the corresponding decryption keys and GPG environment, not a pass-only proprietary reader. No synthetic key-restoration run is claimed. [Source](https://github.com/zx2c4/password-store/blob/3ca13cd8882cae4083c1c478858adbf2e82dd037/src/password-store.sh).
- [x] Resolved: Delete removes the working file and, in a Git-backed store, records git rm plus a normal commit rather than history erasure. Re-encryption likewise adds a commit. Importantly yesno returns success without prompting when stdin is not a terminal, so the advertised confirmation is conditional even without --force; older encrypted history is not thereby revoked. [Source](https://github.com/zx2c4/password-store/blob/3ca13cd8882cae4083c1c478858adbf2e82dd037/src/password-store.sh).
- [ ] Open: Actual private-key/trust recovery, prior-history decryption after recipient changes, importer completeness and observed offline behavior remain untested. E5 needs effective non-interactive/force, recipient-change, secret-use/export and historical-ciphertext recourse boundaries.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-9/.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Actual private-key/trust recovery, prior-history decryption after recipient changes, importer completeness and observed offline behavior remain untested. E5 needs effective non-interactive/force, recipient-change, secret-use/export and historical-ciphertext recourse boundaries.

**Next without installing locally:** Inspect a synthetic store with non-secret GPG test credentials, recipient policy and Git history, then obtain independently recorded key/trust restoration and approval/history behavior. Do not supply or use real private keys.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-9/`. Overall: **Insufficient evidence**.

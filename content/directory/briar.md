+++
title = "Briar"
category = "Communication"
summary = "Peer-to-peer messaging application that stores messages on the participants' own devices and does not rely on a central server."
substrate = "Encrypted local database on each device"
sync_model = "Direct peer-to-peer over Tor, Wi-Fi, or Bluetooth"
limitations = ["Static primary-source review only; no Briar account created or deleted.","A timer-control implementation is not proof of secure erasure or recoverability."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source d03d6fcd776349ec6c8b7d22035e9bb04aa1787c"
assessment_notes = "Individually reconciled in rating batch 12 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "not_verified"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

[[evidence]]
target = "E1"
text = "The database implementation uses split H2 storage with CIPHER=AES and obtains its file password from a supplied secret key. It is not plain SQLite: copying database files alone does not establish readable independent recovery without the key material and a compatible H2/schema reader."
url = "https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/bramble-core/src/main/java/org/briarproject/bramble/db/H2Database.java"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The reviewed documentation does not establish a practical migration path for message history or identity to another implementation."
url = "https://briarproject.org/manual/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Account creation generates a random database key, encrypts it under the password with an optional key strengthener, and stores that encrypted key separately. Sign-in loads/decrypts it; deleteAccount removes both key and database directories. The password alone is not demonstrated to regenerate a lost random key or account."
url = "https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/bramble-core/src/main/java/org/briarproject/bramble/account/AccountManagerImpl.java"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The account is stored on the device and messaging can continue over Bluetooth, Wi-Fi, or Tor without a central server, but losing the device or password is consequential."
url = "https://briarproject.org/manual/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Contrary to the earlier documentation search's unknown, the pinned source implements per-contact auto-delete timers with validated bounds, a disabled sentinel, timestamps and rules for mirroring received timer changes. This establishes that timed-deletion controls exist, not that recipients cannot retain copies or that deletion/undo was observed."
url = "https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/briar-core/src/main/java/org/briarproject/briar/autodelete/AutoDeleteManagerImpl.java"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Briar does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/bramble-core/src/main/java/org/briarproject/bramble/account/AccountManagerImpl.java"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Briar's existing essential-record scope. The earlier Does not meet is not sustained merely by encryption, absent export evidence or an untested lost-key scenario; sufficient direct failure evidence for the provider-withdrawal scope is missing. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/bramble-core/src/main/java/org/briarproject/bramble/account/AccountManagerImpl.java"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Briar can synchronize over local Bluetooth or Wi-Fi and can operate without the internet for nearby contacts."
url = "https://briarproject.org/manual/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/briar-core/src/main/java/org/briarproject/briar/autodelete/AutoDeleteManagerImpl.java"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Source requires an AES-encrypted H2 database, a separately preserved random database key encrypted under the password, and any configured key-strengthener material. No compatible independent account/database/message reconstruction was demonstrated. Losing that key is not the same as provider withdrawal with all legitimate recovery material preserved, so it does not prove a general E3 Fail."
url = "https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/bramble-core/src/main/java/org/briarproject/bramble/account/AccountManagerImpl.java"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Per-contact auto-delete bounds, disabled state and timer-mirroring logic are established in source. Effective UI authorization, deletion timing/propagation, account deletion recourse and recipient-retained copies remain insufficiently covered. Timer existence is not guaranteed erasure or observed undo."
url = "https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/briar-core/src/main/java/org/briarproject/briar/autodelete/AutoDeleteManagerImpl.java"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The database implementation uses split H2 storage with CIPHER=AES and obtains its file password from a supplied secret key. It is not plain SQLite: copying database files alone does not establish readable independent recovery without the key material and a compatible H2/schema reader. [Source](https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/bramble-core/src/main/java/org/briarproject/bramble/db/H2Database.java).
- [x] Resolved: Account creation generates a random database key, encrypts it under the password with an optional key strengthener, and stores that encrypted key separately. Sign-in loads/decrypts it; deleteAccount removes both key and database directories. The password alone is not demonstrated to regenerate a lost random key or account. [Source](https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/bramble-core/src/main/java/org/briarproject/bramble/account/AccountManagerImpl.java).
- [x] Resolved: Contrary to the earlier documentation search's unknown, the pinned source implements per-contact auto-delete timers with validated bounds, a disabled sentinel, timestamps and rules for mirroring received timer changes. This establishes that timed-deletion controls exist, not that recipients cannot retain copies or that deletion/undo was observed. [Source](https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/briar-core/src/main/java/org/briarproject/briar/autodelete/AutoDeleteManagerImpl.java).
- [ ] Open: Independent encrypted-database reading, key-strengthener portability, protocol interoperability, actual device-loss recovery, deletion timing and UI confirmation/undo behavior remain untested. E5 needs configured UI/timer/account-deletion authority, propagation visibility and realistic correction/recipient-copy boundaries.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-12/.

**Human-readable criteria:** Can users retain their messages and identity, continue essential local functions when services are unavailable, recover their history, and understand synchronization or delivery limits?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Independent encrypted-database reading, key-strengthener portability, protocol interoperability, actual device-loss recovery, deletion timing and UI confirmation/undo behavior remain untested. E5 needs configured UI/timer/account-deletion authority, propagation visibility and realistic correction/recipient-copy boundaries.

**Next without installing locally:** Use a synthetic account with non-secret test key/password/strengthener material, compatible H2/schema records and expected messages/contacts; inspect data independently and seek version-matched device-loss/timer/account-deletion observations. Do not supply real messaging keys.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-12/`. Overall: **Insufficient evidence**.

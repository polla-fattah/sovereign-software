+++
title = "Jami"
category = "Communication"
summary = "Distributed communication application that does not require a central account server."
substrate = "Local encrypted account archive and message history"
sync_model = "Distributed peer-to-peer with account archive export"
limitations = ["Pinned daemon source only; client confirmation and actual device linking were not executed.","AccountArchive JSON serialization is not a generic decrypted-archive reader test."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source 984f7afbe8d85d119391c2e24e4e1ccbcbf87f28"
assessment_notes = "Individually reconciled in rating batch 12 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "not_verified"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "partial"

[[evidence]]
target = "E1"
text = "Jami documents account archives and desktop procedures for exporting an account and saving the local database, but the completeness of conversation history export was not independently tested."
url = "https://docs.jami.net/en_US/user/faq.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "The documentation provides account backup and device-linking paths, but migration across clients and recovery of all messages and attachments were not tested."
url = "https://docs.jami.net/en_US/user/faq.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The account serializer explicitly builds JSON containing identity keys/certificate, configuration, contacts, conversation-info records and requests. The archive manager separately filters device-local settings and excludes collaborative-document conversation records. This identifies an identity/contact archive route, not demonstrated completeness of message repositories, attachments or collaborative content."
url = "https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/accountarchive.cpp"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Jami describes operation without a central authority and supports local account storage, although optional name-server behavior exists."
url = "https://docs.jami.net/en_US/user/introduction.html"
confidence = "high"

[[evidence]]
target = "E5"
text = "exportArchive refreshes/saves the account archive, then copies it to the destination with overwrite_existing and returns the filesystem result. This low-level export path permits replacing an existing backup; client-side prompts or backup rotation are not established by the daemon implementation."
url = "https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/archive_account_manager.cpp"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Jami does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/accountarchive.cpp"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Jami's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/accountarchive.cpp"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Jami does not require a central authority for ordinary communication, but network peers, DHT behavior, and optional name servers affect operation."
url = "https://docs.jami.net/en_US/user/introduction.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/archive_account_manager.cpp"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Account archive source identifies identity/config/contact/conversation-info records, while some device-local and collaborative records are excluded or separate. Complete encrypted archive import with message repositories, attachments and collaborative content has not been demonstrated. Identity backup is not established as full conversation recovery."
url = "https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/accountarchive.cpp"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The daemon export path permits replacing an existing archive and reports its filesystem result; client-side confirmation/rotation is not established there. Effective client/device authority, key/export approval, conversation deletion propagation and recourse remain insufficiently covered."
url = "https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/archive_account_manager.cpp"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The account serializer explicitly builds JSON containing identity keys/certificate, configuration, contacts, conversation-info records and requests. The archive manager separately filters device-local settings and excludes collaborative-document conversation records. This identifies an identity/contact archive route, not demonstrated completeness of message repositories, attachments or collaborative content. [Source](https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/accountarchive.cpp).
- [x] Resolved: exportArchive refreshes/saves the account archive, then copies it to the destination with overwrite_existing and returns the filesystem result. This low-level export path permits replacing an existing backup; client-side prompts or backup rotation are not established by the daemon implementation. [Source](https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/archive_account_manager.cpp).
- [ ] Open: Actual encrypted archive decoding and clean import, complete history/attachment preservation, outer encryption/version compatibility, conversation deletion propagation and runtime network dependency remain untested. E5 needs client-side export/overwrite and device/conversation deletion controls, inspectable consequences and usable recovery boundaries.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-12/.

**Human-readable criteria:** Can users retain their messages and identity, continue essential local functions when services are unavailable, recover their history, and understand synchronization or delivery limits?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Actual encrypted archive decoding and clean import, complete history/attachment preservation, outer encryption/version compatibility, conversation deletion propagation and runtime network dependency remain untested. E5 needs client-side export/overwrite and device/conversation deletion controls, inspectable consequences and usable recovery boundaries.

**Next without installing locally:** Inspect a synthetic encrypted archive plus separately required message/attachment repositories with dummy identity material and expected content; obtain same-version client prompt/overwrite/import/deletion and network-dependency records.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-12/`. Overall: **Insufficient evidence**.

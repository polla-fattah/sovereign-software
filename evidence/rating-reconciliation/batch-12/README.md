# Rating reconciliation, batch 12

Reviewed 24 October 2026. Each application below was evaluated individually against its existing essential-record and version scope. No target application was installed, built or run.

## Outcome

All 2 retain **Insufficient evidence**. E3/E5 remain **Not Verified** for the specific missing coverage below, not automatically Pass from documentation and not Fail from missing evidence. Positive dependent principles lacking their minimum are corrected. Existing E1/E4/Locality findings are not re-certified by this targeted pass.

[Plan](plan.json), [individual decisions and change ledger](decisions.json), [directory-wide review sequence](../remaining-plan.json), [current application index](../../application-index.md).

0 additional bounded source questions are resolved in this batch. Earlier resolved questions remain resolved and are not counted again. Source locators are provenance aids, not executed-behavior assertions.

<a id="briar"></a>

## Briar

Version/scope: Source d03d6fcd776349ec6c8b7d22035e9bb04aa1787c.

**E3: Not Verified.** Source requires an AES-encrypted H2 database, a separately preserved random database key encrypted under the password, and any configured key-strengthener material. No compatible independent account/database/message reconstruction was demonstrated. Losing that key is not the same as provider withdrawal with all legitimate recovery material preserved, so it does not prove a general E3 Fail. [Source context](https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/bramble-core/src/main/java/org/briarproject/bramble/account/AccountManagerImpl.java).

**E5: Not Verified.** Per-contact auto-delete bounds, disabled state and timer-mirroring logic are established in source. Effective UI authorization, deletion timing/propagation, account deletion recourse and recipient-retained copies remain insufficiently covered. Timer existence is not guaranteed erasure or observed undo. [Source context](https://code.briarproject.org/briar/briar/-/blob/d03d6fcd776349ec6c8b7d22035e9bb04aa1787c/briar-core/src/main/java/org/briarproject/briar/autodelete/AutoDeleteManagerImpl.java).

**Remaining:** Independent encrypted-database reading, key-strengthener portability, protocol interoperability, actual device-loss recovery, deletion timing and UI confirmation/undo behavior remain untested. E5 needs configured UI/timer/account-deletion authority, propagation visibility and realistic correction/recipient-copy boundaries.

**Next without a local installation:** Use a synthetic account with non-secret test key/password/strengthener material, compatible H2/schema records and expected messages/contacts; inspect data independently and seek version-matched device-loss/timer/account-deletion observations. Do not supply real messaging keys.

[Actual assessment](../../../content/directory/briar.md) | [review note](../../doc-reviews/briar.md).

<a id="jami"></a>

## Jami

Version/scope: Source 984f7afbe8d85d119391c2e24e4e1ccbcbf87f28.

**E3: Not Verified.** Account archive source identifies identity/config/contact/conversation-info records, while some device-local and collaborative records are excluded or separate. Complete encrypted archive import with message repositories, attachments and collaborative content has not been demonstrated. Identity backup is not established as full conversation recovery. [Source context](https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/accountarchive.cpp).

**E5: Not Verified.** The daemon export path permits replacing an existing archive and reports its filesystem result; client-side confirmation/rotation is not established there. Effective client/device authority, key/export approval, conversation deletion propagation and recourse remain insufficiently covered. [Source context](https://github.com/savoirfairelinux/jami-daemon/blob/984f7afbe8d85d119391c2e24e4e1ccbcbf87f28/src/jamidht/archive_account_manager.cpp).

**Remaining:** Actual encrypted archive decoding and clean import, complete history/attachment preservation, outer encryption/version compatibility, conversation deletion propagation and runtime network dependency remain untested. E5 needs client-side export/overwrite and device/conversation deletion controls, inspectable consequences and usable recovery boundaries.

**Next without a local installation:** Inspect a synthetic encrypted archive plus separately required message/attachment repositories with dummy identity material and expected content; obtain same-version client prompt/overwrite/import/deletion and network-dependency records.

[Actual assessment](../../../content/directory/jami.md) | [review note](../../doc-reviews/jami.md).

## Validation boundary

The shared rating audit checks recorded fields, decision evidence and review notes. Historical schema-repair and evidence baselines remain available. Source/fixture hashes, navigation and the complete set of updated pages are checked by the final repository validation; no per-product clean restore or upstream test run is implied.

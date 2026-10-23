+++
title = "Anki"
category = "Research & Education"
summary = "Spaced-repetition flashcard application with a local collection and package export."
substrate = "Local SQLite collection, exported as .apkg packages"
sync_model = "Local collection with optional sync service"
extract_cmd = "unzip -l deck.apkg"
limitations = ["Newer collection formats are compressed, so direct SQLite inspection depends on the version.","No target application was installed or executed in rating reconciliation batch 2; source controls are not end-to-end recovery observations.","The legacy fixture contains one note/card and a four-byte media member, not a representative modern collection."]
assessment_status = "complete"
assessment_date = "2026-10-23"
version_assessed = "Source commit 8d6e0a0f462f016889896ceaaab1be2aba182588 and retained legacy media.apkg fixture; no application execution"
assessment_notes = "Rating reconciliation batch 2: E3/E5 remain Not Verified with specific missing evidence; unsupported Longevity, Transparency and Sovereignty findings withdrawn. The previous E2 Pass is also withdrawn. 2 additional source questions resolved."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

[[evidence]]
target = "E1"
text = "Resolved: independently opened the pinned media.apkg fixture as ZIP and its collection.anki2 using Python 3.13.2 / SQLite 3.45.3. Integrity check returned ok; one note and one card were readable. This is a historical package fixture, not a test of modern compressed exports."
url = "https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/pylib/tests/support/media.apkg"
confidence = "high"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Resolved: the inspected fixture exposes a cards.nid-to-notes.id join and a JSON media map from archive member 0 to foo.wav, matching the note's sound reference. Package round-trip tests also assert media bytes/checksums and FSRS parameter-array lengths; these tests were inspected, not executed. Complete recovery remains unverified."
url = "https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/rslib/src/import_export/package/apkg/tests.rs"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The official documentation for this entry provides a relevant governability of consequential actions lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "E2 is Not Verified for the existing essential-record scope, so the minimum for a positive Sovereignty finding is not established. Storage choice, local access and export-format strengths remain recorded; the old positive principle is withdrawn, not changed to a verified failure."
url = "https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/pylib/tests/support/media.apkg"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 remains Not Verified for Anki's existing essential-record scope. A readable one-card legacy package does not cover the complete learning collection. The previous positive Longevity finding is withdrawn to Not assessed, not a finding of failure."
url = "https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/pylib/tests/support/media.apkg"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://docs.ankiweb.net/exporting.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The inspected controls are retained as positive facts, but whole-scope E5 remains Not Verified. The methodology requires established minimum oversight before a positive Transparency and Control finding; the earlier Partially meets is therefore withdrawn to Not assessed rather than used as a placeholder for incomplete evidence."
url = "https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/qt/aqt/sync.py"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Reinspection reproduces integrity ok and the one-card/one-note join and sound-name mapping in the retained legacy APKG. Its mapped media member is only four bytes, not proof of usable audio. Modern package decoding, deck/options and scheduling semantics, complete media and a meaningful collection restore are not covered by this historical fixture."
url = "https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/pylib/tests/support/media.apkg"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Pinned desktop source provides full-sync direction/cancel choices, confirmation paths and a backup call before full download. The undo manager keeps bounded in-memory operations and can clear them. These answer control-path questions but do not establish complete media-inclusive recovery, normal sync conflict handling or restoration after collection-wide destructive actions in the declared learning workflow."
url = "https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/qt/aqt/sync.py"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The full-sync conflict dialog offers upload, download and cancellation with cancellation as that dialog's default. Dedicated full-upload/full-download confirmation paths also exist; the full-download worker calls create_backup_now before closing for replacement. This proves code paths, not a successful or media-complete backup."
url = "https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/qt/aqt/sync.py"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The undo manager stores a bounded in-memory queue, truncates old steps and clears undo/redo when a step begins without an undoable operation. Undo therefore is not a durable or universal recovery archive."
url = "https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/rslib/src/undo/mod.rs"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The prior E2 Pass rested on a generic documentation lead. The retained legacy fixture establishes readable records, not a usable alternative study workflow preserving the stated scheduling/deck/media meaning. E2 is withdrawn to Not Verified pending an independent conversion and comparison."
url = "https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/pylib/tests/support/media.apkg"
confidence = "medium"

+++

**Assessment update, 23 October 2026:**

- [x] Resolved: an upstream legacy APKG fixture can be opened and queried using standard ZIP and SQLite tools without Anki.
- [x] Resolved: its note/card relationship and media filename mapping are independently interpretable; one note and one card were observed, with database integrity reported as `ok`.
- [ ] Open: A modern synthetic collection package with expected notes/cards, deck/options, scheduling and genuine media, independent decoding/comparison, and full-sync/deletion/recovery output remain missing. Legacy readability, full-sync confirmation/backup calls and bounded undo are already resolved; their coverage limits are explicit.

**Assessment:** Independent access is supported by direct inspection of the retained fixture. The broader recovery requirement remains Not Verified because the fixture is historical and small. Upstream tests cover additional cases, but their existence is not an observed passing run. The overall determination remains **Insufficient evidence**.

**Human-readable criteria:** Can a learner export the complete collection with media and scheduling, restore it without AnkiWeb, move it to another study tool without losing meaning, and understand what synchronization changes?

**Rating reconciliation: 23 October 2026**

E3 and E5 remain **Not Verified** for the scope stated above. Longevity and Transparency and Control are **Not assessed**, because their required minimums are not established. Sovereignty is also **Not assessed** while E2 remains unverified. The previous E2 Pass is withdrawn; the available evidence does not establish a usable full-scope migration. These are evidence corrections, not adverse product findings. E1, E4 and Locality were not re-certified by this targeted review.

- [x] Resolved: The full-sync conflict dialog offers upload, download and cancellation with cancellation as that dialog's default. Dedicated full-upload/full-download confirmation paths also exist; the full-download worker calls create_backup_now before closing for replacement. This proves code paths, not a successful or media-complete backup. [Pinned source](https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/qt/aqt/sync.py).
- [x] Resolved: The undo manager stores a bounded in-memory queue, truncates old steps and clears undo/redo when a step begins without an undoable operation. Undo therefore is not a durable or universal recovery archive. [Pinned source](https://github.com/ankitects/anki/blob/8d6e0a0f462f016889896ceaaab1be2aba182588/rslib/src/undo/mod.rs).

**Recovery evidence still needed:** A modern synthetic collection package with expected notes/cards, deck/options, scheduling and genuine media, independent decoding/comparison, and full-sync/deletion/recovery output remain missing. Legacy readability, full-sync confirmation/backup calls and bounded undo are already resolved; their coverage limits are explicit.

**Next step without a local installation:** Obtain a current-version APKG/COLPKG test export and expected semantic manifest from upstream fixtures or an external assessor. Independently decode and compare it here, keeping notes, cards, options and scheduling together. A recorded restore/sync exercise elsewhere can supply behavior evidence without a local Anki installation.

Reproducible inspection and the individual decision ledger are retained in `evidence/rating-reconciliation/batch-2/`. Overall: **Insufficient evidence**.

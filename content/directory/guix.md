+++
title = "GNU Guix"
category = "OS & Infra"
summary = "System and package manager configured declaratively from plain-text files, with rollback and a separate channel and substitute model."
substrate = "Declarative Scheme configuration files"
sync_model = "Guix store with pinned channels; configuration kept in version control"
extract_cmd = "guix system build config.scm"
pilot_stage = 5
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Channel-pinned rebuilds, network-blocked closure completeness, mutable-data restoration, generation deletion and release-specific compatibility remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence a639dc9f4767b55d5a9240a76c82957533273657"
assessment_notes = "Individually reconciled in rating batch 9 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "not_verified"
consequential_oversight = "not_verified"

[principles]
locality = "partial"

[[evidence]]
target = "E1"
text = "Guix configurations are declarative Scheme files and profiles expose generations that can be listed and rolled back."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Configuration files and channel descriptions provide a migration path, but complete reproduction depends on channel commits, package sources, substitutes, and system hardware."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The archive implementation passes export-recursive? to export-paths only when requested with --recursive. A package export without that option is not established to include its dependency closure; listing/extraction and store import are distinct operations, not backups of arbitrary mutable service data."
url = "https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/archive.scm"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Local package management and system generations can operate independently once required sources and substitutes are available, but fetching often depends on external infrastructure."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The system command really parses -n/--dry-run, propagates dry-run? and returns before the activation/bootloader/service-switch branch. This closes the earlier uncertainty about whether system dry-run exists; configuration evaluation and planning must not be confused with a full side-effect-free OS trial."
url = "https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/system.scm"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for GNU Guix does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/archive.scm"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for GNU Guix's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/archive.scm"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Installed profiles and generations operate locally, but new builds and updates may require remote sources or substitutes."
url = "https://guix.gnu.org/manual/en/guix.pdf"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/system.scm"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Archive export is recursive only when requested and is not arbitrary mutable-service backup. Channels, source/substitute closure, hardware and persistent service data have not been reconstructed in a network-blocked deployment. Declarative Scheme/profile generations do not alone establish complete E3."
url = "https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/archive.scm"
confidence = "medium"

[[evidence]]
target = "E5"
text = "System dry-run propagation avoids the inspected activation/bootloader/service-switch branch, but configuration evaluation/planning is not proven side-effect-free. Generation deletion, effective privilege/substitute policy and correction of service/mutable-state changes remain insufficiently covered."
url = "https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/system.scm"
confidence = "medium"

+++

**Verification scenario:** Reconstruct pinned manifests and channels, test offline availability of substitutes and sources, and restore mutable state.

**What may invalidate an overconfident claim:** Assess separately from NixOS; a similar philosophy is not equivalent evidence.

**Documentation starting point:** <https://guix.gnu.org/manual/>

**Evidence update: 23 October 2026**

- [x] Resolved: The archive implementation passes export-recursive? to export-paths only when requested with --recursive. A package export without that option is not established to include its dependency closure; listing/extraction and store import are distinct operations, not backups of arbitrary mutable service data. [Source](https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/archive.scm).
- [x] Resolved: The system command really parses -n/--dry-run, propagates dry-run? and returns before the activation/bootloader/service-switch branch. This closes the earlier uncertainty about whether system dry-run exists; configuration evaluation and planning must not be confused with a full side-effect-free OS trial. [Source](https://codeberg.org/guix/guix/src/commit/a639dc9f4767b55d5a9240a76c82957533273657/guix/scripts/system.scm).
- [ ] Open: Channel-pinned rebuilds, network-blocked closure completeness, mutable-data restoration, generation deletion and release-specific compatibility remain untested. E5 needs configuration-evaluation, activation and generation-deletion authority and mutable-service recourse; dry-run is a bounded branch.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-9/.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Channel-pinned rebuilds, network-blocked closure completeness, mutable-data restoration, generation deletion and release-specific compatibility remain untested. E5 needs configuration-evaluation, activation and generation-deletion authority and mutable-service recourse; dry-run is a bounded branch.

**Next without installing locally:** Inspect channel-pinned recursive archives, source/substitute manifests and synthetic persistent data with expected service state; reuse same-version dry-run/activation/generation-deletion and offline restore evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-9/`. Overall: **Insufficient evidence**.

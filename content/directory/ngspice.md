+++
title = "NGSPICE"
category = "Engineering & CAD"
summary = "Analog and mixed-signal circuit simulator that runs from human-readable netlists without network dependencies. Results depend on device models, solver settings, and version, so comparisons need stated tolerances."
substrate = "Plain-Text SPICE Netlists (.cir / .sp)"
sync_model = "Standalone POSIX CLI"
extract_cmd = "ngspice -b -r rawfile.raw circuit.cir"
pilot_stage = 4
limitations = ["Pinned source inspection, not application execution.","Independent decoding of real outputs, wrdata unit/scale comparison, external model closure and version-specific numerical behavior remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned source 032b1c32c4dbad45ff132bcfac1dbecadbd8abb0"
assessment_notes = "Individually reconciled in rating batch 8 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "ngspice reads text circuit decks and documents saving simulation vectors to ASCII or binary raw files."
url = "https://ngspice.sourceforge.io/docs/ngspice-45-manual.pdf"
confidence = "high"

[[evidence]]
target = "E2"
text = "Text netlists, raw files, and printed outputs provide practical migration and independent analysis paths."
url = "https://ngspice.sourceforge.io/docs/ngspice-41-manual.pdf"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The pinned raw writer emits variable names/types, point counts and real/complex flags before ASCII Values or native sizeof(double) binary writes. Independent binary decoding needs matching numeric/layout assumptions; this is a source-level format finding, not a cross-platform reader test."
url = "https://github.com/ngspice/ngspice/blob/032b1c32c4dbad45ff132bcfac1dbecadbd8abb0/src/frontend/rawfile.c"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Simulation runs locally from user-controlled circuit files."
url = "https://ngspice.sourceforge.io/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The raw writer selects append modes a/ab versus truncating w/wb from its app argument. Existing output can be overwritten without append; the low-level writer itself does not provide a confirmation dialogue."
url = "https://github.com/ngspice/ngspice/blob/032b1c32c4dbad45ff132bcfac1dbecadbd8abb0/src/frontend/rawfile.c"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for NGSPICE does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://ngspice.sourceforge.io/docs/ngspice-41-manual.pdf"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for NGSPICE's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/ngspice/ngspice/blob/032b1c32c4dbad45ff132bcfac1dbecadbd8abb0/src/frontend/rawfile.c"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The solver operates locally and offline."
url = "https://ngspice.sourceforge.io/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/ngspice/ngspice/blob/032b1c32c4dbad45ff132bcfac1dbecadbd8abb0/src/frontend/rawfile.c"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The raw writer documents variable metadata and ASCII/native-double payload layout, but no real output was independently decoded and checked for scales/units, complex values and platform layout. Complete netlists/models and numerical reproduction remain unestablished for the original scientific profile."
url = "https://github.com/ngspice/ngspice/blob/032b1c32c4dbad45ff132bcfac1dbecadbd8abb0/src/frontend/rawfile.c"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Append versus truncating file modes are positively established, and the low-level writer has no confirmation dialog. This is not proof of absent higher-level authorization or a failure by itself; effective caller/output selection, script/model authority and correction remain insufficiently covered."
url = "https://github.com/ngspice/ngspice/blob/032b1c32c4dbad45ff132bcfac1dbecadbd8abb0/src/frontend/rawfile.c"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish an independent simulation/analysis workflow preserving model dependencies, scales/units and numeric semantics. Available netlist/raw formats are a migration lead, not a demonstrated full-scope transition."
url = "https://ngspice.sourceforge.io/docs/ngspice-41-manual.pdf"
confidence = "medium"

+++

**Verification scenario:** Replay netlists with device models, solver settings, and sourced libraries; compare within tolerances.

**What may invalidate an overconfident claim:** Describing a simulator as deterministic is not a substitute for documented numerical assumptions.

**Documentation starting point:** <https://ngspice.sourceforge.io/docs.html>

**Evidence update: 23 October 2026**

- [x] Resolved: The pinned raw writer emits variable names/types, point counts and real/complex flags before ASCII Values or native sizeof(double) binary writes. Independent binary decoding needs matching numeric/layout assumptions; this is a source-level format finding, not a cross-platform reader test. [Source](https://github.com/ngspice/ngspice/blob/032b1c32c4dbad45ff132bcfac1dbecadbd8abb0/src/frontend/rawfile.c).
- [x] Resolved: The raw writer selects append modes a/ab versus truncating w/wb from its app argument. Existing output can be overwritten without append; the low-level writer itself does not provide a confirmation dialogue. [Source](https://github.com/ngspice/ngspice/blob/032b1c32c4dbad45ff132bcfac1dbecadbd8abb0/src/frontend/rawfile.c).
- [ ] Open: Independent decoding of real outputs, wrdata unit/scale comparison, external model closure and version-specific numerical behavior remain untested. E5 needs caller-level output/overwrite and model/control-script policy, inspectability and recoverable source/output states.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-8/.

**Human-readable criteria:** Can an independent party preserve the source model, units, dependencies, and editable structure, reproduce the result, and exchange it without losing important design meaning?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Independent decoding of real outputs, wrdata unit/scale comparison, external model closure and version-specific numerical behavior remain untested. E5 needs caller-level output/overwrite and model/control-script policy, inspectability and recoverable source/output states.

**Next without installing locally:** Inspect a synthetic circuit/model/real-output packet with variable/scale/unit expectations and platform metadata; compare an independent decoder and externally recorded numerical results, then review caller-level write/script safeguards.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-8/`. Overall: **Insufficient evidence**.

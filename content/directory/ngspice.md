+++
title = "NGSPICE"
category = "Engineering & CAD"
summary = "Analog and mixed-signal circuit simulator that runs from human-readable netlists without network dependencies. Results depend on device models, solver settings, and version, so comparisons need stated tolerances."
substrate = "Plain-Text SPICE Netlists (.cir / .sp)"
sync_model = "Standalone POSIX CLI"
extract_cmd = "ngspice -b -r rawfile.raw circuit.cir"
pilot_stage = 4
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "meets"
locality = "meets"
transparency = "partial"

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
text = "The manual documents raw-file formats and control commands, but a clean independent reproduction of a simulation was not performed."
url = "https://ngspice.sourceforge.io/docs/ngspice-manual.pdf"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Simulation runs locally from user-controlled circuit files."
url = "https://ngspice.sourceforge.io/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Simulation results can inform engineering decisions, but model provenance, numerical validation, and approval workflows were not tested."
url = "https://ngspice.sourceforge.io/docs/ngspice-manual.pdf"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Text circuit decks and locally stored outputs support strong user control."
url = "https://ngspice.sourceforge.io/docs/ngspice-45-manual.pdf"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Text netlists and documented output formats are durable, while model libraries and solver-version effects need testing."
url = "https://ngspice.sourceforge.io/docs/ngspice-manual.pdf"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The solver operates locally and offline."
url = "https://ngspice.sourceforge.io/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Commands and output storage are documented, but reproducibility and model provenance require hands-on validation."
url = "https://ngspice.sourceforge.io/docs/ngspice-manual.pdf"
confidence = "medium"

+++

**Verification scenario:** Replay netlists with device models, solver settings, and sourced libraries; compare within tolerances.

**What may invalidate an overconfident claim:** Describing a simulator as deterministic is not a substitute for documented numerical assumptions.

**Documentation starting point:** <https://ngspice.sourceforge.io/docs.html>

**Preliminary desk assessment:** NGSPICE is described as analog and mixed-signal circuit simulator that runs from human-readable netlists without network dependencies. results depend on device models, solver settings, and version, so comparisons need stated tolerances. Its primary preservation surface is Plain-Text SPICE Netlists (.cir / .sp), with independence shaped by standalone posix cli. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an independent party preserve the source model, units, dependencies, and editable structure, reproduce the result, and exchange it without losing important design meaning?

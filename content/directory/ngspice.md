+++
title = "NGSPICE"
category = "Engineering & CAD"
summary = "Analog and mixed-signal circuit simulator that runs from human-readable netlists without network dependencies. Results depend on device models, solver settings, and version, so comparisons need stated tolerances."
substrate = "Plain-Text SPICE Netlists (.cir / .sp)"
sync_model = "Standalone POSIX CLI"
extract_cmd = "ngspice -b -r rawfile.raw circuit.cir"
pilot_stage = 4
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Replay netlists with device models, solver settings, and sourced libraries; compare within tolerances.

**What may invalidate an overconfident claim:** Describing a simulator as deterministic is not a substitute for documented numerical assumptions.

**Documentation starting point:** <https://ngspice.sourceforge.io/docs.html>

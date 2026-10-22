+++
title = "Typst"
category = "Knowledge & Office"
summary = "Deterministic document typesetting from plain text that recompiles multi-page documents in milliseconds, offline."
substrate = "Plain-Text Markup (.typ)"
sync_model = "Single zero-dependency native binary"
extract_cmd = "typst compile manuscript.typ output.pdf"
pilot_stage = 2
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Compile offline using cached fonts and packages; recover source, images, bibliography, and reference output.

**What may invalidate an overconfident claim:** A standalone compiler may still need external packages and fonts for a given project.

**Documentation starting point:** <https://typst.app/docs/>

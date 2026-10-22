+++
title = "OpenSCAD"
category = "Engineering & CAD"
summary = "Code-first 3D solid modelling from plain-text scripts. Output can differ between versions and geometry engines, so reproducing a result needs stated versions."
substrate = "Programmatic CSG Plain-Text Scripts (.scad)"
sync_model = "Git Version Control"
extract_cmd = "openscad -o part.stl model.scad"
pilot_stage = 4
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Rebuild models offline with all imported libraries and fonts; export geometry, inspect the parameterised source, and compare results.

**What may invalidate an overconfident claim:** Avoid claims of universally identical meshes across engines and versions.

**Documentation starting point:** <https://openscad.org/documentation.html>

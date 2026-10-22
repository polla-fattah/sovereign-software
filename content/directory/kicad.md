+++
title = "KiCad"
category = "Engineering & CAD"
summary = "Electronic schematic capture and PCB design suite where every net, footprint, and trace is stored in human-readable S-expressions with zero cloud licensing."
substrate = "Plain-Text S-Expressions (.kicad_sch/.kicad_pcb)"
sync_model = "Git / Local Vendor Libraries"
extract_cmd = "kicad-cli pcb export gerbers board.kicad_pcb"
pilot_stage = 4
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "partial"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "KiCad projects are composed of ordinary schematic, PCB, library, and project files, and the project archiver can collect them into an archive."
url = "https://docs.kicad.org/doxygen/classPROJECT__ARCHIVER.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Project archives and standard manufacturing outputs support handoff, but full semantic migration to another EDA tool was not tested."
url = "https://docs.kicad.org/10.0/de/kicad/kicad.pdf"
confidence = "medium"

[[evidence]]
target = "E3"
text = "KiCad exposes project files and documented archive behavior, but independent restoration and preservation of every library dependency were not demonstrated."
url = "https://docs.kicad.org/doxygen/classPROJECT__ARCHIVER.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The design workflow is local-file-based and does not require a hosted account."
url = "https://www.kicad.org/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Circuit design is user-directed, but electrical-rule warnings, manufacturing release approval, and revision control safeguards were not tested."
url = "https://www.kicad.org/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Local project files and archives support control, but dependencies and cross-tool migration remain practical limits."
url = "https://docs.kicad.org/doxygen/classPROJECT__ARCHIVER.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Open project files and standard Gerber, drill, PDF, and STEP outputs support preservation; version-pinned reconstruction is still needed."
url = "https://docs.kicad.org/doxygen/classPROJECT__ARCHIVER.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core design and archiving operate locally without a provider."
url = "https://www.kicad.org/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Archive behavior and file types are documented, but complete dependency capture and approval workflows remain unverified."
url = "https://docs.kicad.org/doxygen/classPROJECT__ARCHIVER.html"
confidence = "medium"

+++

**Verification scenario:** Open the project across machines; compare schematic, PCB, symbols, footprints, 3D models, netlists, and Gerbers.

**What may invalidate an overconfident claim:** Manufacturing Gerbers do not preserve editable circuit meaning or BOM and library dependencies.

**Documentation starting point:** <https://docs.kicad.org/>

**Preliminary desk assessment:** KiCad is described as electronic schematic capture and pcb design suite where every net, footprint, and trace is stored in human-readable s-expressions with zero cloud licensing. Its primary preservation surface is Plain-Text S-Expressions (.kicad_sch/.kicad_pcb), with independence shaped by git / local vendor libraries. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an independent party preserve the source model, units, dependencies, and editable structure, reproduce the result, and exchange it without losing important design meaning?

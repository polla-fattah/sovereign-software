# KiCad: documentation review

Reviewed 22 October 2026 from the KiCad 10.0 manuals (docs.kicad.org), the developer file-format documentation (dev-docs.kicad.org), and kicad.org (blog, download, about, privacy) only. Latest stable release found: 10.0.7, listed as published 2026-10-07 on the blog index (the download page gives no version or date). Licence: GNU GPL v3, per the about page.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

Two bounded questions are resolved in [batch 5](../third-pass/batch-5/README.md#kicad) and reflected in the [application page](../../content/directory/kicad.md). Existing eligibility and principle ratings remain unchanged until the next-pass reconciliation, as requested by the user.

- [x] Resolved: A standalone S-expression parser read the published version-20221018 board: nine footprints, seventeen pads, twenty-six segments and four vias. All seventeen pad net references resolve to declared net IDs; five 3D-model references use the external KICAD6_3DMODEL_DIR variable. This recovers explicit connectivity/asset references, not electrical correctness, fabrication validity or availability of the model files.
- [x] Resolved: Project archiving traverses the selected project directory and includes recognized extensions/named library tables. STEP/VRML and other extra-file extensions are conditional on Include Extra Files; hidden directories such as .git and .history are excluded. This is file selection, not a demonstrated resolution/copy of every externally referenced library or 3D model.

Remaining: Hierarchical schematic/custom-library reconstruction, complete archive/move including external models, manufacturing and editable export comparison, old/new-version saves, .history recovery and schematic-to-PCB update effects.

## What the documentation says

**Storage and access (E1, E3)**
- Projects are plain files: `.kicad_pro` (settings), `.kicad_sch`, `.kicad_pcb`, `.kicad_sym`, `.kicad_mod`, `.kicad_dru`, `.kicad_wks`, `.kicad_jobset`. `.kicad_prl` and `fp-info-cache` are stated safe to omit when sharing. [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)
- The S-expression formats have per-file documentation. The intro says "Human readability is a design goal" and makes no stability promise. It does not say the format is meant for third-party tools. [file formats intro](https://dev-docs.kicad.org/en/file-formats/sexpr-intro/index.html)
- Libraries are referenced through library tables (`sym-lib-table`, `fp-lib-table`) in the user config directory or the project directory, using path variables such as `KIPRJMOD`. So a project can depend on libraries outside its folder. [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)
- The manual says all KiCad files are "100% compatible from one OS to another". [PCB Editor manual](https://docs.kicad.org/10.0/en/pcbnew/pcbnew.html)

**Exit and migration (E2)**
- Export: Gerber, drill, position, DXF, GenCAD, IPC-2581, ODB++, PDF, PostScript, SVG, and 3D (STEP, GLB, STL, and others) from the PCB; netlist, BOM, PDF, SVG, DXF from the schematic. [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)
- `kicad-cli` exports Gerbers (one layer per file), STEP, and netlists (KiCad, XML, SPICE) and runs jobsets. The page does not say whether it is stable or headless-capable. HPGL export is "not functional in KiCad 10.0". Page read to about 100,000 of 111,515 characters. [CLI manual](https://docs.kicad.org/10.0/en/cli/cli.html)
- Whether Gerbers, STEP, or netlists keep editable design meaning (rules, BOM fields, hierarchy) was not found in the docs.
- Import from Altium, CADSTAR, Eagle 6.x+, EasyEDA, PADS ASCII, and gEDA/Lepton. Standalone files lack cross-probing and schematic-board sync. What is lost on import was not found. [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)

**Recovery (E3)**
- Backups run on manual save and as autosave. Incremental mode uses a Git repository in a hidden `.history` folder; zip mode writes one archive per backup. Restore via Local History. Oldest backups are deleted at the size limit. [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)
- File > Archive Project collects design, 3D model, Gerber, netlist, script, SPICE and other files. Unarchive overwrites files in the destination. Whether it captures all library dependencies was not found. [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)
- Version rule: modern versions open earlier files but "can only write files in the latest formats"; files from one version cannot be opened by older versions. Old files are not deleted after conversion. The manual advises keeping backup copies when testing a new release. [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)
- The format intro does not say how older readers treat newer files. [file formats intro](https://dev-docs.kicad.org/en/file-formats/sexpr-intro/index.html)

**Continuing authority (E4) and dependencies**
- No account is mentioned. Crash reporting, update checks and metrics are described as optional, opt-in at first run, using Sentry via an IP-hiding reflector. The manual says data collection is off by default, reports exclude design files, and crash reporting applies to Windows and macOS only. [privacy](https://www.kicad.org/about/privacy/), [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)
- On startup KiCad can check for application and package updates (configurable). The Plugin and Content Manager downloads from online repositories, default the official one. [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)
- The privacy page says it does not describe how update checks work, and third-party plugins are outside it. [privacy](https://www.kicad.org/about/privacy/)
- Governance: a technical committee, consensus first, the project leader decides if consensus fails. Donations go through the Linux Foundation. No succession statement found; the page says only that development is by the KiCad Development Team. [about](https://www.kicad.org/about/kicad/)
- Python interpreter and the "Enable KiCad API" option are needed for plugins. [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)

**Consequential operations (E5)**
- Package manager: "Packages may install code that runs on your computer." Quality and safety are not guaranteed. [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)
- Restore Commit and Restore Project from Local History revert files. Reset All Program Settings and hotkey import replace settings. [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)
- DRC: each rule can be error, warning, or ignored; Ignore "will completely disable" that check. [PCB Editor manual](https://docs.kicad.org/10.0/en/pcbnew/pcbnew.html)
- Update PCB from Schematic is "the preferred way" to transfer the design. What it deletes from the board was not found in the visible text. The PCB page was truncated at about 100,000 of 733,180 characters, so undo/redo, export chapters, and delete warnings there are unread.
- Git integration: adding a project needs a remote; disabling it does not remove history. [KiCad manual](https://docs.kicad.org/10.0/en/kicad/kicad.html)

## Gaps to test or read next
1. Build a synthetic project (hierarchical schematic, custom symbols and footprints, 3D models), copy only the project folder to a clean machine, and list what breaks (library tables, missing models).
2. Run Archive Project and compare its contents with every file the project references.
3. Export Gerbers, STEP, netlist, and BOM, re-import them in another tool, and list lost items (fields, rules, hierarchy).
4. Save in 10.0.7, then try opening in 9.x, and run `kicad-cli pcb upgrade` on an older board.
5. Force a crash after edits, restore from `.history`, and diff the result.
6. Run Update PCB from Schematic after deleting a part and record what happens to tracks and footprints.
7. Read the remainder of the PCB Editor manual (undo, delete, export chapters), the schematic manual (ERC), the release notes for 10.0, and the per-file format pages.
8. Check the network traffic on first run and at startup, and confirm the update check default (the docs do not state it).
9. Not found: any succession or continuity statement, and a stability promise for the file formats.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-6/README.md#kicad); [actual assessment](../../content/directory/kicad.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The standalone PCB parser resolves pad/net relationships and identifies external 3D-model variables, while archive source selects files rather than resolving every dependency. Hierarchical schematics, custom libraries, external models and cross-version editable/fabrication meaning have not been reconstructed.
- E5: Not Verified. Electrical correctness and manufacturing suitability are not themselves E5 authorization tests. The evidence does not sufficiently establish schematic-to-board mutation review, destructive library/board changes, output overwrite or release/correction controls in the existing engineering workflow.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Hierarchical schematic/custom-library reconstruction, complete archive/move including external models, manufacturing and editable export comparison, old/new-version saves, .history recovery and schematic-to-PCB update effects. E5 needs inspectable schematic-to-PCB updates, destructive edit/output overwrite controls and available correction; accuracy claims are separate.

Next without a local installation: Inspect a complete synthetic schematic/PCB/library/model packet and expected connectivity/units manifest, with independent output comparisons. Obtain primary-source or external update/undo/overwrite evidence.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

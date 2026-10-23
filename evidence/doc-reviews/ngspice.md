# NGSPICE: documentation review

Reviewed 22 October 2026 from the ngspice home, download and documentation pages, the SourceForge download folder, and the full text of the ngspice 47 User's Manual (PDF, dated "August 11th, 2026"). Latest stable release: ngspice-47. The home and download pages give no release date; the SourceForge folder lists 47 as modified 2026-08-29, with a tooltip date of 2026-08-11 for the tarball. Licence: Modified BSD for the source code, with exceptions (see below). The git repository, release notes and mailing lists were not read.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 8](../third-pass/batch-8/README.md#ngspice) and reflected in the [application page](../../content/directory/ngspice.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The pinned raw writer emits variable names/types, point counts and real/complex flags before ASCII Values or native sizeof(double) binary writes. Independent binary decoding needs matching numeric/layout assumptions; this is a source-level format finding, not a cross-platform reader test.
- [x] Resolved: The raw writer selects append modes a/ab versus truncating w/wb from its app argument. Existing output can be overwritten without append; the low-level writer itself does not provide a confirmation dialogue.

Remaining: Independent decoding of real outputs, wrdata unit/scale comparison, external model closure and version-specific numerical behavior remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- The input is a text netlist (circuit deck). In batch mode, `ngspice -b -r rawfile.raw circuitfile.cir` runs the analyses and writes all data to a rawfile. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)
- The rawfile is "compact binary" by default; `set filetype=ascii` gives ASCII. The `load` command reads either kind. The manual describes the rawfile only through commands and options. A byte-level layout specification was not found in the manual text. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)
- With `-b` and `-r`, data go straight to the rawfile and are not held in memory. In interactive mode all data stay in memory. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)

**Exit and migration (E2)**
- `write` saves vectors in "Spice3f5 format" (binary or ASCII). `wrdata` writes a plain ASCII table of scale and value pairs, with options for header names and digit count. `wrs2p` writes Touchstone data. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)
- Compatibility modes (`set ngbehavior=`) exist for PSPICE, LTSPICE, HSPICE, Spectre and KiCad netlist dialects. Some behaviour, such as the power operator, depends on the mode. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)
- What is lost when moving between tools is not stated; the manual does not discuss it. Not found in the docs.
- Netlists may pull in model libraries and XSPICE code models (`*.cm`), which are separate files. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)

**Recovery (E3)**
- No backup, autosave or crash-recovery feature was found in the manual; the product is a batch or interactive simulator, not an editor with a project file. Not found in the docs.
- Version compatibility of rawfiles or netlists between releases is not stated in the pages read. The manual says the default behaviour of some devices and parameters can be changed by options. Whether results match across versions is not stated. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)
- The manual says the code is a complex program, that some models are not "used and tested intensively", and that errors may be present. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)

**Continuing authority (E4) and dependencies**
- The manual says the source code is under the "Modified" BSD licence, except tclspice and numparam (LGPLv2) and XSPICE (public domain). The manual text itself is CC-BY-SA 4.0. The web pages say text is under the GNU FDL 1.3, so the manual and web licences differ. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf), [docs](https://ngspice.sourceforge.io/docs.html)
- The home and download pages say nothing about telemetry, accounts or update checks. The manual text read did not mention any either; absence in the text is not proof. [home](https://ngspice.sourceforge.io/), [download](https://ngspice.sourceforge.io/download.html)
- Authors are named as Holger Vogt, Giles Atkinson, Dietmar Warning and Paolo Nenzi. No governance, succession or support-term statement was found. Bugs go to a SourceForge tracker. The manual calls itself a "work in progress". [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf), [home](https://ngspice.sourceforge.io/)
- Releases are distributed from SourceForge, git, and GitHub nightly builds, and by Linux distributions, Cygwin, FreeBSD and Homebrew. [download](https://ngspice.sourceforge.io/download.html), [home](https://ngspice.sourceforge.io/)
- The optional OSDI/OpenVAF route uses an external compiler. The older gss tool is stated as no longer maintained. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)

**Consequential operations (E5)**
- `write` overwrites an existing file unless `appendwrite` is set. `noclobber` stops overwriting for shell-style redirection. The manual gives no warning beyond describing these variables. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)
- `destroy` releases output data sets from memory; `remcirc` removes the current circuit from the list. There is no undo. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)
- `quit` asks for acknowledgment if parameters have not been saved, unless `askquit` is unset. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)
- A `shell` command runs operating-system commands from a control script. [manual 47](https://ngspice.sourceforge.io/docs/ngspice-47-manual.pdf)
- Guidance on validating results before using them for engineering decisions was not found.

## Gaps to test or read next
1. Run one synthetic netlist (RC filter, `.tran` and `.ac`) in ngspice 47 and an earlier release (for example 43). Compare the vectors within a stated tolerance (for example 1e-6 relative) and record differences.
2. Write the same run as binary and ASCII rawfiles, then read both with a separate tool (a short script or another viewer). Confirm values agree and note any header fields needed.
3. Export with `wrdata` and `write`, then check which vector names, units, complex values and plot metadata survive.
4. Replay a netlist that uses an external model library and a `.cm` code model after moving it to a clean machine, to see which dependencies break.
5. Test overwrite behaviour: run `write` twice to the same file with and without `appendwrite`, and confirm the result.
6. Block network access during a run and during startup, and observe whether anything is attempted.
7. Not read: the source repository, release notes and changelog, rawfile format notes (if any), the Chapter 20.3 to-do list, the ngspice bug tracker, and the mailing lists. The release date for 47 should be confirmed from a release note.
8. Reconcile the web licence statement (GNU FDL) with the manual's (CC-BY-SA), and read the BSD text in manual section 29.3.2.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-8/README.md#ngspice); [actual assessment](../../content/directory/ngspice.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The raw writer documents variable metadata and ASCII/native-double payload layout, but no real output was independently decoded and checked for scales/units, complex values and platform layout. Complete netlists/models and numerical reproduction remain unestablished for the original scientific profile.
- E5: Not Verified. Append versus truncating file modes are positively established, and the low-level writer has no confirmation dialog. This is not proof of absent higher-level authorization or a failure by itself; effective caller/output selection, script/model authority and correction remain insufficiently covered.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish an independent simulation/analysis workflow preserving model dependencies, scales/units and numeric semantics. Available netlist/raw formats are a migration lead, not a demonstrated full-scope transition.

Remaining: Independent decoding of real outputs, wrdata unit/scale comparison, external model closure and version-specific numerical behavior remain untested. E5 needs caller-level output/overwrite and model/control-script policy, inspectability and recoverable source/output states.

Next without a local installation: Inspect a synthetic circuit/model/real-output packet with variable/scale/unit expectations and platform metadata; compare an independent decoder and externally recorded numerical results, then review caller-level write/script safeguards.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

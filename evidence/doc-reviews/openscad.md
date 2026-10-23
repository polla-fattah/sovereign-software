# OpenSCAD: documentation review

Reviewed 22 October 2026 from openscad.org (about, downloads, news, documentation, libraries), the OpenSCAD manual copies on files.openscad.org and Wikibooks (both linked from the official documentation page), and the GitHub repository. Latest stable release found: OpenSCAD 2021.01, announced "31 January 2021" on the news page; the GitHub release shows "07 Feb" with the year omitted. The downloads page lists no stable version or date, only nightly snapshots. Licence: GNU GPL version 2 per the about page; the README names no licence in the part read.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

Two bounded questions are resolved in [batch 5](../third-pass/batch-5/README.md#openscad) and reflected in the [application page](../../content/directory/openscad.md). Existing eligibility and principle ratings remain unchanged until the next-pass reconciliation, as requested by the user.

- [x] Resolved: The published 3MF import fixture opened as a three-member ZIP. Its model XML specifies millimeters and exposes one object with twenty vertices, thirty-six triangles and a build item referencing object 1. A separate color-export regression expectation contains four raw color values but is normalized text with an unbound namespace prefix, not a valid standalone XML package; that parse error is recorded. No geometry engine was run.
- [x] Resolved: The retained binary STL expectation contains eight triangles, has the expected 84+50*n byte length, and uses zero for every two-byte triangle attribute. The writer similarly emits normals/vertices and zero attributes with an OpenSCAD Model header. This output is a mesh representation, not a serialization of source parameters, construction history or semantic units.

Remaining: Actual CGAL/Manifold equivalence, exported geometry reconstruction, parameter/color/unit losses in receiving tools, complete library/font dependency capture, source/version compatibility and crash backup behavior.

## What the documentation says

**Storage and access (E1, E3)**
- Models are scripts in the `.scad` language, and the manual describes `include` (pastes a file's content in) and `use` (modules and functions only). Whether the `.scad` format has a written specification was not found in the docs. [include statement](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Include_Statement), [user manual](https://files.openscad.org/documentation/manual/OpenSCAD_User_Manual.html)
- Library files are searched in the folder the design was opened from, the installation library folder, and folders in `OPENSCADPATH`. Behaviour when a file is missing is not stated. [include statement](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Include_Statement)
- The `-d` option writes a make-style list of files accessed during a build, which can be used to capture dependencies. [command line](https://files.openscad.org/documentation/manual/Using_OpenSCAD_in_a_command_line_environment.html)
- Libraries are third party and carry their own licences (MIT, CC0, BSD, GPL, LGPL, Apache). One entry requires a 2025 or later OpenSCAD with Manifold. [libraries](https://openscad.org/libraries.html)

**Exit and migration (E2)**
- Export formats per the manual: STL, 3MF, OFF, AMF, DXF, SVG, CSG, PNG. Command line help also lists echo, ast, term, nef3. The file extension selects the format. [command line](https://files.openscad.org/documentation/manual/Using_OpenSCAD_in_a_command_line_environment.html), [user manual](https://files.openscad.org/documentation/manual/OpenSCAD_User_Manual.html)
- Export pages state minimum versions: AMF 2015.03, 3MF 2019.05, PDF 2021.01 (A4 only). What each format drops (colours, parameters, units, source structure) is not found in the docs. [export](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Export)
- CSG export is described as "a simplified representation of the SCAD script". Import covers STL, 3MF, OFF, AMF, DXF, SVG, CSG. [export](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Export), [user manual](https://files.openscad.org/documentation/manual/OpenSCAD_User_Manual.html)
- Multiple parts cannot be exported in one run; the FAQ suggests a `-D` variable per part. Imported STL files should be manifold. [FAQ](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/FAQ)

**Recovery (E3)**
- "Before starting a preview or render a backup file is made of the current .scad file." Backup folders: Windows `Documents\OpenSCAD\backups`, Linux `$HOME/.local/share/OpenSCAD/backups`. No separate autosave is described. [FAQ](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/FAQ)
- The command-line page shows a help output labelled "OpenSCAD (DEV/nightly) 2025.08.17", and a `--backend` option choosing CGAL (default) or Manifold. Results from the two engines are not compared in the pages read. [command line (Wikibooks)](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_OpenSCAD_in_a_command_line_environment)
- No statement on forward or backward compatibility of `.scad` files between releases was found. The 2021.01 notes list changed behaviour (mixed-type comparisons now return undef, `use<>` search order fix). [release](https://github.com/openscad/openscad/releases)
- The README says the listed build dependency versions are those used in development and others "may or may not work". [GitHub](https://github.com/openscad/openscad)

**Continuing authority (E4) and dependencies**
- Licence: "Free Software released under the General Public License version 2". Marius Kintel is listed as maintainer. No governance structure, foundation, or succession statement was found; a donation link points to Open Collective. [about](https://openscad.org/about.html)
- Network, account, telemetry: not found in the docs. The README does not describe an update check; the repository holds appcast XML files, whose purpose the page does not explain. [GitHub](https://github.com/openscad/openscad)
- Build needs C++17, CMake, Qt 5.15, CGAL 5.4, Boost, OpenCSG and others; the list is long. [GitHub](https://github.com/openscad/openscad)
- Release cadence: news lists 2019.05 and 2021.01 as releases; the newest news item (25 September 2026) is not a release. Nightly snapshots are offered, and the downloads page recommends Manifold in them. [news](https://openscad.org/news.html), [downloads](https://openscad.org/downloads.html)

**Consequential operations (E5)**
- `--hardwarnings` stops on the first warning; `-q` prints only errors. How existing output files are handled is not stated. [command line](https://files.openscad.org/documentation/manual/Using_OpenSCAD_in_a_command_line_environment.html)
- DXF import with unsupported entities such as SPLINE is partial and shows warnings. [FAQ](https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/FAQ)
- Undo, history, and warnings about destructive actions in the editor were not found in the pages read.

## Gaps to test or read next
1. Build one synthetic model with a library and a font; run `-d` and check the deps list is complete on a clean machine with no network.
2. Export the same model with `--backend` CGAL and Manifold in 2021.01 (if available) and a current snapshot; compare STL vertex counts and volume.
3. Round trip STL, 3MF, and AMF into another tool; list lost colour, units, and parameters.
4. Open a model written for a current snapshot in 2021.01 and the reverse; record errors and changed output.
5. Test the backup folder: force a crash, check what is restorable.
6. Observe network traffic on first start to settle the update check question (not found in the docs).
7. Not read: the GUI Preferences and Customizer pages, the licence text in the repository, Contributing/CLA pages, nightly changelogs, and the downloads release listing (the page showed placeholders).

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-6/README.md#openscad); [actual assessment](../../content/directory/openscad.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The independent 3MF/STL readers expose mesh geometry and units where represented, but STL does not preserve source parameters/construction meaning and one regression expectation is not standalone XML. Complete includes/fonts, source/version dependencies and equivalent generated geometry remain unestablished for the original parametric profile.
- E5: Not Verified. Manufacturing accuracy alone is not E5. The current evidence does not establish effective model/include execution authority, file/output overwrite control, previewed consequential changes or correction after lost source edits; backup and configuration boundaries remain open.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish a replacement parametric workflow preserving source parameters, construction meaning, units and required dependencies. Mesh-only interoperability is a narrower result, not full-scope migration.

Remaining: Actual CGAL/Manifold equivalence, exported geometry reconstruction, parameter/color/unit losses in receiving tools, complete library/font dependency capture, source/version compatibility and crash backup behavior. E5 needs source/include execution and save/export overwrite authority, inspectability and backup/correction boundaries.

Next without a local installation: Retain a synthetic parametric model with every include/font and expected geometry/unit/color manifest, then use independent parsers and externally supplied engine comparisons. Review same-version file/execution/backup controls.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

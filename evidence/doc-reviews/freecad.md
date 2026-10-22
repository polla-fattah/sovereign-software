# FreeCAD: documentation review

Reviewed 22 October 2026 from freecad.org (downloads, features, privacy pages) and the official GitHub repository (README, LICENSE, latest release) only. Current stable release: 1.1.4, published "28 Sep" (the GitHub release header omits the year); the downloads page shows "Current stable version: 1.1.4" with no date. Licence: LGPL-2.1. The FreeCAD wiki (wiki.freecad.org) returned an Anubis "Access Denied" page and the 10 MB PDF manual could not be fetched, so the file-format, backup, autosave, and undo documentation is unread.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- The features page says FreeCAD imports and exports "dozens of different file formats", naming STEP, IGES, OBJ, STL, DWG, DXF, plus the native FCStd. It says files are "truly yours, forever". [features](https://www.freecad.org/features.php)
- The README gives no description of FCStd; it only asks bug reporters to attach "FCStd as ZIP file". That FCStd is a zip, with `Document.xml`, is not stated on the pages I could read. [GitHub](https://github.com/FreeCAD/FreeCAD)
- Whether the FCStd structure is formally documented: not found in the docs (the wiki page was blocked, so unknown, not absent). A web search surfaced only old forum posts, which I did not treat as official evidence.
- The privacy page warns that CAD files "may contain metadata" such as local directory paths. Logs, configuration, cache, thumbnails, and recent-file lists stay on local storage. [privacy](https://www.freecad.org/privacy.php)

**Exit and migration (E2)**
- The only exit evidence read is the format list above. The features page says objects are parametric and a modelling history is kept; it does not say whether history, constraints, or workbench data survive export. Not found in the docs.
- Import of other tools' formats and per-workbench loss: not found in the docs (wiki unread).

**Recovery (E3)**
- Backup files, autosave, and crash recovery: not found in the docs (wiki preferences and save pages blocked).
- Version compatibility: the 1.1.4 release notes say nothing on file compatibility between versions. [release 1.1.4](https://github.com/FreeCAD/FreeCAD/releases/latest) Whether older FreeCAD opens files saved by newer: unknown.
- The release notes describe two security fixes for file handling, triggered by opening a crafted FCStd file, and state "All previously-released versions are affected". This is relevant to opening files from untrusted or archived sources. [release 1.1.4](https://github.com/FreeCAD/FreeCAD/releases/latest)

**Continuing authority (E4) and dependencies**
- Privacy page: the application "does not collect, transmit, share or use any Personal Data", and the software has no ads or trackers. The page does not address update checks. No application account is mentioned. [privacy](https://www.freecad.org/privacy.php)
- Network use named: loading or saving remote files may expose the IP address; the in-app manual is fetched over HTTPS; the Add-on Manager downloads workbenches and "Add-on workbenches are not checked for malicious content". [privacy](https://www.freecad.org/privacy.php)
- Macros are Python scripts that can do anything the user can do on the system. [privacy](https://www.freecad.org/privacy.php)
- Licence: LGPL-2.1 per the README; the LICENSE file is the standard FSF LGPL 2.1 text, with no FreeCAD-specific exception visible. Copyright is held by "The FreeCAD Team". [GitHub](https://github.com/FreeCAD/FreeCAD), [LICENSE](https://github.com/FreeCAD/FreeCAD/blob/main/LICENSE)
- Governance: community-developed; the FreeCAD Project Association (FPA) funds work through donations and offers developer grants. Infrastructure support is credited to DigitalOcean and KiCad Services Corp. No succession or continuity statement found. This rests on a summary of the README page, not the FPA site. [privacy](https://www.freecad.org/privacy.php), [GitHub](https://github.com/FreeCAD/FreeCAD)
- Stated core dependencies: OpenCASCADE (geometry kernel), Coin3D, Python, Qt. [GitHub](https://github.com/FreeCAD/FreeCAD)

**Consequential operations (E5)**
- The features page says changes are recalculated on demand and recorded by an undo/redo stack. Undo depth, whether undo survives saving, and warnings on deleting objects that other objects depend on: not found in the docs. [features](https://www.freecad.org/features.php)
- The privacy page warns to trust macro authors and check files before sharing. No other operational warnings were read.

## Gaps to test or read next
1. Unzip a synthetic `.FCStd` (a sketch-based part plus a small assembly) and list the entries; check whether `Document.xml` parses with a plain XML tool and whether units, expressions, and dependencies are readable without FreeCAD.
2. Export the model to STEP and STL, reimport, and compare: geometry, units, sketches, constraints, and feature tree. List what is lost.
3. Save in 1.1.4 and open in the previous stable release (and the reverse); record warnings, missing features, and recompute differences.
4. Change an upstream dimension and record whether downstream features and external references recompute or break; move the project to a clean machine and note missing add-ons or workbenches.
5. Force a crash or kill the process mid-edit and check what recovery or backup files appear (name, location, content).
6. Run offline with a network monitor and check for update checks, since the privacy page is silent on them.
7. Not read: the wiki pages on the FCStd format, Std Save, Std Undo/Redo, preferences (autosave, backup count), and add-on manager; the PDF manual; the FPA site; AI_POLICY.md; the full 1.1.4 notes. Retry with a different route, as the wiki blocked automated fetching.

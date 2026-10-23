# GNU Octave: documentation review

Reviewed 22 October 2026 from the Octave website (octave.org) and the online manual (docs.octave.org) only. Current stable release: 11.3.0. The download page gives no date; the news page lists it as "Jun 1, 2026". The "latest" manual pages fetched carry an 11.1.0 header, so they may lag the newest release. Licence: GNU GPL version 3 or later for the software; the website text is CC BY-ND 4.0. The official repository, release notes (NEWS), and wiki were not read.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. Every item below rests on a summary of the page returned by the fetch tool, not on the full page text.

## What the documentation says

Follow-up, 23 October 2026: resolved questions and remaining work are recorded in the [second third-pass batch](../third-pass/batch-2/README.md#gnu-octave) and reflected in the [application assessment](../../content/directory/gnu-octave.md). The earlier review below is superseded where that evidence answers or corrects it.

**Storage and access (E1, E3)**
- `save` writes Octave text by default, and also Octave binary, HDF5, MATLAB v4, v6 and v7 binary, and plain ASCII. Files can be gzip-compressed. `load` detects the format automatically. [Simple File I/O](https://docs.octave.org/latest/Simple-File-I_002fO.html)
- `save_precision` defaults to 17 digits, described as enough for lossless double values. Single-precision options (`-float-binary`, `-float-hdf5`) keep only single precision. [Simple File I/O](https://docs.octave.org/latest/Simple-File-I_002fO.html)
- HDF5 support depends on how Octave was built. Whether the Octave text format is formally specified was not found in the docs. [Simple File I/O](https://docs.octave.org/latest/Simple-File-I_002fO.html)
- Scripts are `.m` text files; a general statement of script portability was not found in the docs.

**Exit and migration (E2)**
- Octave cannot save MATLAB v7.3 files, and `load` reads them only through `-hdf5`, with many non-numeric types unsupported. [Simple File I/O](https://docs.octave.org/latest/Simple-File-I_002fO.html)
- `-ascii` keeps only 2-D data and the real part of complex values. Global status is not kept in MATLAB binary or `-ascii` files. `classdef` objects are saved as structs and do not reload as objects. [Simple File I/O](https://docs.octave.org/latest/Simple-File-I_002fO.html)
- CSV goes through `csvwrite`/`dlmwrite` and `csvread`/`dlmread`. [Simple File I/O](https://docs.octave.org/latest/Simple-File-I_002fO.html)
- Contributions must not be based on Matlab or other non-free code, so full MATLAB compatibility is not promised in the pages read. [governance](https://octave.org/governance.html)

**Recovery (E3)**
- Older Octave used a different random generator. The current default is Mersenne Twister; `rand("seed", val)` reproduces old sequences. [random numbers](https://docs.octave.org/latest/Special-Utility-Matrices.html)
- Startup seeding differs from MATLAB: Octave seeds from clock and process data unless a state is set. `rng(s)` and `rand("state", v)` restore a saved state. [random numbers](https://docs.octave.org/latest/Special-Utility-Matrices.html)
- Compatibility of saved files between Octave releases, and a backup or recovery procedure, were not found in the docs. The NEWS file was not read.
- Packages: only one version of a package is installed at a time; installing another removes the existing one. [packages](https://docs.octave.org/latest/Installing-and-Removing-Packages.html)

**Continuing authority (E4) and dependencies**
- Started in 1992 by John W. Eaton. 24 people have commit access (10 active, 14 dormant). "Most development decisions are made by or agreed with John W. Eaton." No succession plan was found. [governance](https://octave.org/governance.html)
- Donations go to NumFOCUS since 2023, with core developers deciding spending. The FSF provides infrastructure only. Octave Forge development stopped in 2018; Octave Packages is its intended successor. [governance](https://octave.org/governance.html)
- Licence: GPL version 3 or later, no warranty. [licence](https://octave.org/license.html)
- Core use needs no account. Telemetry and update-check statements were not found in the pages read. Updates come from the GNU FTP server; GPG signature files are offered. [download](https://octave.org/download)
- `pkg install` resolves a local file, then a URL, then the Octave Packages index. The index needs a network connection and cURL. Missing dependencies fail the install unless `-nodeps` is used. The community "is not responsible" for installed packages. Installation may run configure and `make`. [packages](https://docs.octave.org/latest/Installing-and-Removing-Packages.html)
- 32-bit Windows binaries are no longer supported. Linux and BSD packages are made by volunteers. [download](https://octave.org/download)

**Consequential operations (E5)**
- `save` replaces the file unless `-append` is used. The docs give no overwrite warning. [Simple File I/O](https://docs.octave.org/latest/Simple-File-I_002fO.html)
- `addpath` runs a `PKG_ADD` file and `rmpath` runs `PKG_DEL`, so adding a directory can execute code. [load path](https://docs.octave.org/latest/Manipulating-the-Load-Path.html)
- `system` runs shell commands (`/bin/sh` or `cmd.exe`); `exec` ends the session. The page does not discuss security risks. [subprocesses](https://docs.octave.org/latest/Controlling-Subprocesses.html)
- File deletion commands and command history: the pages tried returned 404, so these are unknown, not absent.

## Gaps to test or read next
1. Save a synthetic struct, matrix, and complex array in text, binary, HDF5, and MAT v6/v7; reload in each and compare values bit for bit. Try a second Octave release and, if available, another tool.
2. Re-run a script with seeded `rand` and `randn` on two Octave releases and compare outputs and tolerances.
3. Install the project on a clean offline machine with and without `pkg` packages; list what fails when a package or `-forge` access is missing.
4. Overwrite an existing `.mat` file with `save` and note what warning, if any, appears; try `-append`.
5. Read the NEWS file, the repository, and the wiki for format compatibility between releases, update checks, and telemetry.
6. Find the correct manual pages for `delete`, `unlink`, `rmdir`, and command history (history file location and retention).
7. Read the Governance and Code of Conduct pages in full, and the maintainer succession position.
8. Confirm the 11.3.0 date on an official release page, since the download page omits it.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-5/README.md#gnu-octave); [actual assessment](../../content/directory/gnu-octave.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Dense/sparse Octave-text values were independently read, while plain ASCII source demonstrably omits complex components and higher-dimensional variables. Binary MAT/HDF5, structs/classes, executable package dependencies and equivalent seeded calculations remain unestablished for the existing scientific-work profile.
- E5: Not Verified. The source distinguishes temporary-file replacement on non-append save from direct append writes. That is not proof of arbitrary script/package authorization, inspectable numerical mutations, output overwrite control or usable recovery after interrupted saves and execution side effects.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Binary MAT/HDF5 round trips, structs/classes/complex values, seeded numerical reproduction, dependencies, and real save-failure recovery. E5 needs effective script/package and file-write control, visible parameter/state changes and failure/correction boundaries.

Next without a local installation: Inspect synthetic binary/text scientific-data exports with expected types/shapes/complex values and reproducible script/environment records; use version-matched external numerical/save-failure observations rather than executing the target locally.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

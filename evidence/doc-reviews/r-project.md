# R: documentation review

Reviewed 22 October 2026 from the R project home page, the R manuals on CRAN (Data Import/Export, FAQ, Installation and Administration, Internals, Introduction, NEWS), the R Foundation page, and the R-devel readRDS help page only. Current stable release: R 4.6.1 (24 June 2026, per the home page); the NEWS page names 4.6.1 but gives no date. A 4.6.2 prerelease is announced for 19 October 2026, final planned 29 October 2026. Licence: GPL version 2 or version 3, per the FAQ.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. Every manual page below was returned truncated (about 100,000 characters read), so statements are limited to the portions read and rest on a page summary.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 10](../third-pass/batch-10/README.md#r-project) and reflected in the [application page](../../content/directory/r-project.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The serializer writes distinct version-2/version-3 headers with writer/minimum-reader versions; the minimum values in the inspected source are R 2.3.0 and R 3.5.0 respectively, and version 3 also records native encoding. These format-level bounds do not guarantee every object/package class will reconstruct on an older R.
- [x] Resolved: The full readRDS documentation explains that infoRDS reports representation/reader metadata but cannot establish file validity, and explicitly cautions against treating bare RDS as a machine-interchange format. Native-endian serialization and newer compression introduce additional dependencies; cross-tool and CSV preservation remain separate questions.

Remaining: Factor/date/attribute/NA round trips, a non-R reader, older-release trials, package-library upgrades and workspace overwrite recovery remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- Plain text data is read and written with `read.table`, `read.csv`, `write.table` and similar. The manual warns that unless a file is pure ASCII "it is usually necessary to know how it was encoded", and that byte order marks can cause problems. [Data Import/Export](https://cran.r-project.org/doc/manuals/r-release/R-data.html)
- The serialization format behind `.rds` and `.RData` is documented in the Internals manual (section 1.8): version 2 from R 1.4.0 to 3.5.3, version 3 the default since R 3.5.0. The page says the internals should be checked against the current source. It names no third-party readers. [R Internals](https://cran.r-project.org/doc/manuals/r-release/R-ints.html)
- Binary and scientific formats (HDF5, netCDF, dBase) are handled by packages, not base R. [Data Import/Export](https://cran.r-project.org/doc/manuals/r-release/R-data.html)
- `q()` asks whether to save the workspace; saved objects go to `.RData` and history to `.Rhistory` in the working directory, and both reload on the next start there. [Introduction](https://cran.r-project.org/doc/manuals/r-release/R-intro.html)

**Exit and migration (E2)**
- For Excel data, the manual's first advice is to export to CSV or tab-delimited text; packages such as readxl are listed as alternatives. [Data Import/Export](https://cran.r-project.org/doc/manuals/r-release/R-data.html)
- Readers for SPSS, Stata, SAS XPORT and others are in the `foreign` package. Many were "written for specific versions" of the source software in the early 2000s and may not handle newer ones. Stata support covers versions 5 to 12; newer versions point to other packages. [Data Import/Export](https://cran.r-project.org/doc/manuals/r-release/R-data.html)
- The readRDS help page says `.rds` files are "not suitable as an interchange format between machines". What is lost when an R object (for example a model or a data frame with attributes) is written to CSV was not found in the docs. [readRDS](https://stat.ethz.ch/R-manual/R-devel/library/base/html/readRDS.html)

**Recovery (E3)**
- Serialization files carry version fields; `infoRDS()` reports `version`, `writer_version` and `min_reader_version`, but "cannot be used to detect whether a file is a serialization nor whether it is valid". [readRDS](https://stat.ethz.ch/R-manual/R-devel/library/base/html/readRDS.html)
- Rules for reading files written by older or newer R versions were not found on the readRDS page. Older formats remain readable by `load` and `save`, per the Internals page. [R Internals](https://cran.r-project.org/doc/manuals/r-release/R-ints.html)
- `compress = "zstd"` is supported from R 4.5.0 and needs OS support, so older R versions may not read such files. [readRDS](https://stat.ethz.ch/R-manual/R-devel/library/base/html/readRDS.html)
- On macOS, binary packages with compiled code are tied to a particular R series (for example 4.5.x versus 4.4.x). [Installation and Administration](https://cran.r-project.org/doc/manuals/r-release/R-admin.html)
- The 4.6.1 NEWS section lists no serialization or saved-file changes, though some bug fixes change results (for example `wilcox.test()` p-values). The NEWS page was read only in part. [NEWS](https://cran.r-project.org/doc/manuals/r-release/NEWS.html)

**Continuing authority (E4) and dependencies**
- Licence: "GNU General Public License (GPL), version 2 or version 3". The R Foundation holds and administers R's copyright and describes itself as a not for profit organization working in the public interest. [FAQ](https://cran.r-project.org/doc/manuals/r-release/R-FAQ.html), [R Foundation](https://www.r-project.org/foundation/)
- Changes to the source archive are made by the R Core Team, whose 19 current members are listed in the FAQ. No succession or continuity mechanism is described. Funding is by donations and supporting-member subscriptions. [FAQ](https://cran.r-project.org/doc/manuals/r-release/R-FAQ.html), [R Foundation](https://www.r-project.org/foundation/)
- The FAQ contains no warranty statement for R itself. Whether R contacts the internet on its own (update checks, telemetry) was not found in the docs.
- Installing packages from CRAN needs internet access; `repos = NULL` installs from a local file or URL. Source builds need a C compiler and a Fortran 90 compiler. Windows 32-bit ended with R 4.1.3. [Installation and Administration](https://cran.r-project.org/doc/manuals/r-release/R-admin.html), [FAQ](https://cran.r-project.org/doc/manuals/r-release/R-FAQ.html)
- Package libraries are located by `R_LIBS_USER`, `R_LIBS_SITE` and `.libPaths()`. [Installation and Administration](https://cran.r-project.org/doc/manuals/r-release/R-admin.html)

**Consequential operations (E5)**
- `rm()` removes objects from the workspace, and the manual shows no undo for it. The manual recommends "separate working directories for analyses". [Introduction](https://cran.r-project.org/doc/manuals/r-release/R-intro.html)
- On macOS the installer "will remove any previous version" of the R framework it finds. [Installation and Administration](https://cran.r-project.org/doc/manuals/r-release/R-admin.html)
- An explicit warning about overwriting files with `save` or `write.csv`, or about loading untrusted `.rds` files, was not found on the pages read.

## Gaps to test or read next
1. Round trip: write a synthetic data frame (factors, dates, attributes, UTF-8 text, missing values) to CSV and to RDS, read both back in a fresh session, and compare types and attributes. Then read the RDS in an older R release.
2. Open an RDS and an RData file in a non-R tool (no reader is named in the docs) and record what is recoverable.
3. Save with `version = 2` and version 3 and check that R 3.4 and 4.6.1 can read each, using `infoRDS()`.
4. Upgrade R across a minor series, then check whether the existing package library still loads.
5. Run R offline after a first install and note whether any network call occurs at startup; check `?download.file` and the R-admin sections on proxies, which were not read.
6. Pages not read: the truncated tails of the Administration, Internals, Introduction and NEWS manuals, the CRAN policy pages, the R Foundation statutes, and the NEWS date for 4.6.1.
7. Try `rm()` followed by `q("yes")` in a test directory, and confirm what `.RData` then holds.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-10/README.md#r-project); [actual assessment](../../content/directory/r-project.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Serialization headers specify representation/version/encoding bounds but do not recover every object/package class. No factor/date/attribute/NA-preserving independent reconstruction with a complete package/source/data environment has been recorded; bare RDS compatibility metadata is not file validity or whole-workflow recovery.
- E5: Not Verified. Model accuracy alone is not E5. The current evidence does not establish effective script/package execution authority, workspace/file overwrite decisions, inspectable transformation state or available correction of consequential data/model changes.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Factor/date/attribute/NA round trips, a non-R reader, older-release trials, package-library upgrades and workspace overwrite recovery remain untested. E5 needs script/package and workspace-write authority, visible transformation parameters/state and correction boundaries.

Next without a local installation: Use synthetic scripts/data/serialization and package-lock/source manifests with expected types, missingness and results; compare independent readers or externally reproduced outputs and same-version execution/overwrite controls.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

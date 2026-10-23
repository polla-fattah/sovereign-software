# GNU PSPP: documentation review

Reviewed 22 October 2026 from the PSPP Users' Guide, the PSPP Developers Guide, the pspp-convert page, the download page, and the pspp-announce list archive on gnu.org only. Current stable release: 2.1.2 (19 September 2026, per the list announcement). The Users' Guide is titled "GNU PSPP version 2.1.2". Licence: the Users' Guide says the conditions are in the GNU General Public License, without naming a version; the download page does not state the software licence. The Savannah project pages returned scraper placeholder text, so governance and succession statements there are unknown, not absent.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. The single-page Users' Guide is about 451,000 characters and the fetch tool read it in chunks; the last ~50,000 characters (appendices and utilities) came back without the system-file or pspp-convert sections, so those were read from their own pages instead.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 10](../third-pass/batch-10/README.md#gnu-pspp) and reflected in the [application page](../../content/directory/gnu-pspp.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The official CSV specification distinguishes VALUES from LABELS output, documents print-format trimming and writes numeric system-missing values as a space. Together with MISSING=RECODE, this can collapse missing-value distinctions; a CSV is not demonstrated to preserve the native dictionary. This is a documented format conclusion, not a conversion experiment.
- [x] Resolved: The official SAVE TRANSLATE specification refuses existing-file overwrite by default and requires REPLACE; MISSING=RECODE, DROP/KEEP and UNSELECTED change the exported representation/case scope. These explicit controls resolve their documented semantics, not proof of an executed safeguard.

Remaining: Native SAV/POR compression compatibility, independent-reader comparisons, dictionary round trips, transformation reversibility and crash recovery remain untested. Savannah source-file retrieval failed; dated retained official manual pages are used instead.

## What the documentation says

**Storage and access (E1, E3)**
- A system file (`.sav`) holds a dictionary and cases; a portable file (`.por`) is the text-based alternative. GET/SAVE handle system files, IMPORT/EXPORT portable files. [Users' Guide](https://www.gnu.org/software/pspp/manual/pspp.html)
- The system file format is documented in the Developers Guide: records with a type field, skippable extension records, detectable endianness and float format. The page says the format "dates back 40+ years". It does not mention compression or encryption. [System File Format](https://www.gnu.org/software/pspp/pspp-dev/html_node/System-File-Format.html)
- The Developers Guide contents list a portable file chapter and an "Encrypted File Wrappers" chapter; only headings were visible (truncated page), so their body text was not read. [Developers Guide](https://www.gnu.org/software/pspp/pspp-dev/pspp-dev.html)
- Syntax files are plain text. Custom DATAFILE ATTRIBUTE values are not interpreted by PSPP but "are saved as part of system files". [Users' Guide](https://www.gnu.org/software/pspp/manual/pspp.html)

**Exit and migration (E2)**
- pspp-convert reads system files, SPSS/PC+ files, portable files, and encrypted syntax files. It writes CSV/TXT, `.sav`, `.por`, and `.sps` (syntax only for decrypting). The docs say it converts "most input formats to most output formats". [pspp-convert](https://www.gnu.org/software/pspp/manual/html_node/Invoking-pspp_002dconvert.html)
- CSV options: `--recode` turns user-missing into system-missing, `--labels` writes value labels, variable names are optional. Whether labels, missing-value definitions, and attributes survive CSV is therefore a setting, and lost by default (inferred from the options, not stated as a warning). [pspp-convert](https://www.gnu.org/software/pspp/manual/html_node/Invoking-pspp_002dconvert.html)
- Old SPSS and SPSS/PC+ files do not record their encoding, so `-e` is needed. [pspp-convert](https://www.gnu.org/software/pspp/manual/html_node/Invoking-pspp_002dconvert.html)
- EXPORT writes real numbers in base 30; its MAP subcommand "is currently ignored". Cases excluded by FILTER are written unless told otherwise. [Users' Guide](https://www.gnu.org/software/pspp/manual/pspp.html)
- SAVE with VERSION 2 truncates variable names longer than 8 bytes. ZCOMPRESSED files cannot be read by PSPP 0.8.1 or earlier. [Users' Guide](https://www.gnu.org/software/pspp/manual/pspp.html)
- SPV output files (SPSS 16 and later) are read by PSPP; older `.spo` files are "not documented". [Developers Guide](https://www.gnu.org/software/pspp/pspp-dev/pspp-dev.html)

**Recovery (E3)**
- No backup, crash-recovery, or autosave statement was found in the pages read. Treat as unknown.
- Version compatibility: the Developers Guide says the format is meant for interchange across versions, and notes SPSS 21 and later represent LOWEST differently. Older PSPP versions wrote one long-string missing-value record that "deviates" from the documented form. [Developers Guide](https://www.gnu.org/software/pspp/pspp-dev/pspp-dev.html)
- GET "never modifies a file on disk". [Users' Guide](https://www.gnu.org/software/pspp/manual/pspp.html)

**Continuing authority (E4) and dependencies**
- Release 2.1.2 contains translation updates and bug fixes; earlier 2.1.x dates came only from a search summary, not an official page I read. [announcement](https://lists.gnu.org/archive/html/pspp-announce/2026-09/msg00000.html)
- "The GNU project does not release official PSPP binaries." Windows, macOS, and Flatpak builds come from volunteers; nightly Windows builds are called untested. The download page also lists an "experimental Rust rewrite" described as very incomplete. [announcement](https://lists.gnu.org/archive/html/pspp-announce/2026-09/msg00000.html), [download page](https://www.gnu.org/software/pspp/get.html)
- Source tarballs are signed with GPG; Savannah Git is the upstream. [announcement](https://lists.gnu.org/archive/html/pspp-announce/2026-09/msg00000.html), [download page](https://www.gnu.org/software/pspp/get.html)
- The Users' Guide says the program is "incomplete in terms of its statistical procedure support". No account, telemetry, or update-check statement was found in the visible text. GET DATA can read Postgres queries, so a database server is an optional network dependency. [Users' Guide](https://www.gnu.org/software/pspp/manual/pspp.html)
- The Users' Guide is under the GNU FDL 1.3 or later. No maintenance or succession statement was found.

**Consequential operations (E5)**
- SAVE: the guide says an existing file "will be overwritten"; SAVE TRANSLATE does not overwrite unless REPLACE is given. [Users' Guide](https://www.gnu.org/software/pspp/manual/pspp.html)
- SELECT IF: unselected cases are "permanently eliminated from the active dataset" unless TEMPORARY is in effect. DELETE VARIABLES under TEMPORARY makes temporary transformations permanent. [Users' Guide](https://www.gnu.org/software/pspp/manual/pspp.html)
- Transformations run only when a procedure runs. No undo facility or warning about in-place RECODE/COMPUTE was found in the text read. `--safer` disables ERASE and HOST. [Users' Guide](https://www.gnu.org/software/pspp/manual/pspp.html)
- pspp-convert can search for an encrypted file's password by brute force (`-a`, `-l`), and warns that a command-line password may be visible to other users. [pspp-convert](https://www.gnu.org/software/pspp/manual/html_node/Invoking-pspp_002dconvert.html)

## Gaps to test or read next
1. Build a synthetic `.sav` with value labels, user-missing values, a date variable, a long string, and custom attributes. Convert to CSV (with and without `--labels`/`--recode`), `.por`, and back; diff the dictionaries.
2. Open the same `.sav` with a second reader (for example R `haven` or a Python library) and compare labels and missing values with PSPP.
3. Save with COMPRESSED, UNCOMPRESSED, and ZCOMPRESSED and open each in the previous PSPP release (2.0.x) and in 2.1.2.
4. Run SELECT IF, FILTER, and DELETE VARIABLES with and without TEMPORARY on synthetic data, save, and check which cases and variables were removed.
5. Kill PSPP mid-session and check what is recoverable (no recovery text found).
6. Read the Developers Guide chapters on portable files and encrypted wrappers, and the Users' Guide GET DATA, SAVE TRANSLATE target formats, and output (SPV) sections that fell in truncated chunks.
7. Read the Savannah project pages and a NEWS file for maintainer count and succession (Savannah blocked automated reads); confirm the GPL version in the source tree.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-10/README.md#gnu-pspp); [actual assessment](../../content/directory/gnu-pspp.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The retained official specification exposes CSV label/value, missingness and case-selection loss boundaries, not native dictionary recovery. SAV/POR compression, labels/missing distinctions and independent-reader reconstruction have not been compared. Dated manual evidence is retained despite failed source retrieval.
- E5: Not Verified. SAVE TRANSLATE documents default overwrite refusal and explicit REPLACE, plus options that change scope/meaning. These controls are positive but do not comprehensively cover syntax transformations, effective output selection, reversal and crash recovery in the original statistical workflow.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish a usable independent statistical workflow preserving native dictionary, labels and missing-value distinctions. The inspected CSV route can collapse those distinctions; alternative native routes remain unverified rather than failed.

Remaining: Native SAV/POR compression compatibility, independent-reader comparisons, dictionary round trips, transformation reversibility and crash recovery remain untested. Savannah source-file retrieval failed; dated retained official manual pages are used instead. E5 needs effective transformation/save scope, output overwrite review and recoverable source/dictionary states; documented REPLACE is not a full executed safeguard.

Next without a local installation: Inspect representative synthetic SAV/POR and CSV pairs with expected dictionary/labels/missingness, and seek independent-reader plus same-version syntax/overwrite/recovery records.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

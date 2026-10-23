# Inkscape: documentation review

Reviewed 22 October 2026 from the Inkscape wiki (release notes, file-save page), the Beginners' Guide on readthedocs, the 1.4.4 announcement on the official announce mailing list, the GitLab README, and search summaries of inkscape.org pages. inkscape.org itself returned HTTP 403 to every direct fetch (release, privacy, about, FAQ, release notes), so facts from those pages rest on search-result summaries only and are marked below. Latest stable release found: 1.4.4, announced 6 May 2026 (the announcement gives the year). Licence: GPL; the wiki says "GNU General Public License, Version 2 or Later" for wiki content, and the README does not name the software licence.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

Two bounded questions are resolved in [batch 5](../third-pass/batch-5/README.md#inkscape) and reflected in the [application page](../../content/directory/inkscape.md). Existing eligibility and principle ratings remain unchanged until the next-pass reconciliation, as requested by the user.

- [x] Resolved: Standard XML parsing reads the historical gears SVG's eight path elements, four use references, Layer 1 metadata and a gears path-effect record with teeth=10 and phi=20. A separate data-URI SVG yielded a 235-byte embedded PNG payload through Base64 decoding. Editor metadata and an embedded asset are independently inspectable; no SVG rendering or live-effect re-editing was reproduced.
- [x] Resolved: Plain SVG is registered with prune-proprietary-namespaces and prune-inkscape-namespaces actions, unlike the native SVG registration's editor-metadata handling. This identifies an explicit difference in the configured output pipeline, not an executed export or an exhaustive list of lost attributes. Layer/live-effect editability must not be inferred merely from preserved visible paths.

Remaining: An executed native/Plain SVG comparison, independent rendering/editing, fonts and linked-image relocation, PDF/PNG losses, current-version multipage behavior, crash recovery and network behavior.

## What the documentation says

**Storage and access (E1, E3)**
- The README says SVG is the main format. The Beginners' Guide says Inkscape SVG "keeps all data", including editing-only data, and Plain SVG is for sharing with people who may not use Inkscape. [GitLab README](https://gitlab.com/inkscape/inkscape/-/raw/master/README.md), [saving](https://inkscape-manuals.readthedocs.io/en/latest/saving.html)
- Compressed variants (.svgz) exist for both Inkscape and Plain SVG, plus an Optimized SVG filter. [Files: Save](https://wiki.inkscape.org/wiki/Files:_Save)
- Per a search summary of the FAQ (page not fetched, 403): Inkscape SVG adds a separate namespace for extra information, and Plain SVG removes it. [FAQ](https://inkscape.org/learn/faq/)
- The wiki save page does not describe how the two SVG variants differ in content. Which features survive only in the Inkscape namespace: not found in the docs. [Files: Save](https://wiki.inkscape.org/wiki/Files:_Save)
- Bitmaps can be linked or embedded. Link and embed behaviour comes from forum and search results only, not an official manual page read here: not found in the docs.

**Exit and migration (E2)**
- Command-line actions can set the SVG version to 1.1 or 2.0, remove Inkscape-specific data, and replace SVG2 text with SVG 1.1 text. [1.4 release notes (draft)](https://wiki.inkscape.org/wiki/Release_notes/1.4)
- Export handles non-SVG formats; PDF export gained internal links in 1.4. Affinity Designer import is described as "best-effort". [Files: Save](https://wiki.inkscape.org/wiki/Files:_Save), [1.4 release notes (draft)](https://wiki.inkscape.org/wiki/Release_notes/1.4)
- The wiki save page does not list what is lost on saving as Plain SVG or SVG 1.1. [Files: Save](https://wiki.inkscape.org/wiki/Files:_Save)
- That page is described as a proposal and about two years old, so it may not match 1.4.4.

**Recovery (E3)**
- If Inkscape closes unexpectedly it "usually" creates a backup file named from the original name and crash time. Autosave is off unless enabled in Edit > Preferences > Input/Output > Autosave. [saving](https://inkscape-manuals.readthedocs.io/en/latest/saving.html)
- 1.4.3 and 1.4.4 are bridge releases for the planned 1.5 page format. Saving in 1.4.3 converts pages to the older format, and versions below 1.4.3 cannot interpret pages created in 1.5 or later. [1.4.4 announcement](https://lists.inkscape.org/hyperkitty/list/inkscape-announce@lists.inkscape.org/thread/OCEYDBJCKK2ZF65O3FNKZOSTL7JBTZND/), [1.4.3 notes (draft)](https://wiki.inkscape.org/wiki/Release_notes/1.4.3)
- Whether 1.4.x opens files from 0.x or 1.0 without change, and any general forward-compatibility statement: not found in the docs.

**Continuing authority (E4) and dependencies**
- Per a search summary of the privacy page (403): the software "does not, in any way, collect or transmit" personal information, and the data terms cover the website. [privacy](https://inkscape.org/about/privacy/)
- The same search found no official setting for an update check or telemetry. A forum reply says the Extensions manager and OpenClipart import send IP and search terms to remote servers; this is not official documentation. Update-check behaviour: not found in the docs.
- Per a search summary of the governance page: a Leadership Committee of 3 to 7 members, with the Software Freedom Conservancy as fiscal sponsor and legal representative, since 2006. Successor or continuity terms: not found in the docs. [governance](https://inkscape.org/about/governance/)
- Licence: the README names no licence; the wiki says GPL v2 or later for wiki content. The software licence was not read from an official page. [GitLab README](https://gitlab.com/inkscape/inkscape/-/raw/master/README.md)
- 1.4 notes: extensions need `tinycss2` to work, and extensions are Python-based. [1.4 release notes (draft)](https://wiki.inkscape.org/wiki/Release_notes/1.4)
- The 1.4.4 announcement lists a macOS known issue: extensions fail when launched from the command line, a security change from 1.4.3. [1.4.4 announcement](https://lists.inkscape.org/hyperkitty/list/inkscape-announce@lists.inkscape.org/thread/OCEYDBJCKK2ZF65O3FNKZOSTL7JBTZND/)

**Consequential operations (E5)**
- Revert was moved lower in the File menu in 1.4.3 to reduce accidental loss of unsaved work. [1.4.3 notes (draft)](https://wiki.inkscape.org/wiki/Release_notes/1.4.3)
- The 1.4 notes say node deletion depends on a preference, "Deleting node preserves shape". [1.4 release notes (draft)](https://wiki.inkscape.org/wiki/Release_notes/1.4)
- The Guide recommends frequent manual saves alongside autosave. [saving](https://inkscape-manuals.readthedocs.io/en/latest/saving.html)
- Undo depth, whether history survives closing, and warnings on destructive path operations: not found in the docs.

## Gaps to test or read next
1. Build the synthetic illustration (paths, text, gradients, layers, clip masks, filters, embedded and linked images). Save as Inkscape SVG and Plain SVG, diff the XML, and list every `inkscape:` and `sodipodi:` attribute and what it carries.
2. Open both files in two independent SVG renderers and an editor. Compare rendering and editability, and record feature loss, especially layers, filters, and text.
3. Move the SVG without its linked images and with a missing font. Record how links break and whether the XML editor or Image Properties repairs them.
4. Round trip: export to PDF and PNG, re-import, and compare editability. Repeat with SVG 1.1 conversion.
5. Force a crash with unsaved edits, with autosave off and on, and check the backup file contents.
6. Open a file from 1.4.4 in 1.4.2 and in 1.5 development, with and without multiple pages.
7. Run offline with a network monitor and check for any traffic at startup, on opening, and when using the Extensions manager.
8. Read, once inkscape.org is reachable: the official manual pages on undo, the Inkscape SVG namespace, the release page, privacy and governance pages, the software licence text, and the finalized 1.4.x release notes.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-6/README.md#inkscape); [actual assessment](../../content/directory/inkscape.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Independent SVG/XML and embedded-image inspection recovers some paths, references and live-effect metadata, but no current native/Plain SVG reconstruction establishes equivalent objects/effects, fonts, linked assets and multipage meaning. Namespace pruning is a known export distinction, not complete recovery.
- E5: Not Verified. The generic publishing/accessibility note does not establish control of document mutations. Save/export overwrite, extension/script execution, external-link transmission and undo/recovery boundaries remain insufficiently evidenced for the original artwork workflow.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass is not supported for the full editable-artwork scope. Plain SVG namespace pruning and historical path inspection do not establish preservation of essential live effects, layers, linked assets and editable relationships in a replacement workflow.

Remaining: An executed native/Plain SVG comparison, independent rendering/editing, fonts and linked-image relocation, PDF/PNG losses, current-version multipage behavior, crash recovery and network behavior. E5 needs extension/external-link and save/export overwrite controls, visible changes and available undo/recovery.

Next without a local installation: Inspect a native/Plain SVG pair with fonts/assets and expected layer/effect/object relationships, plus independent render/edit comparisons. Add primary-source or external tests of extension, overwrite and undo controls.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

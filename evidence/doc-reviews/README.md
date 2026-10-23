# Documentation reviews

**Current follow-up, 24 October 2026:** [The individual rating pass](../rating-reconciliation/README.md) now covers all 68 applications. The 56 continuation reviews update the actual assessments and review notes; eleven additional bounded questions are resolved. E3/E5 remain unverified where the existing scope lacks sufficient evidence. Earlier progress counts and deferred-rating statements below are historical.

[Evidence starting point](../README.md) | [All applications and current open work](../application-index.md). These notes preserve dated documentation reviews and follow-ups; they are not a separate current-rating register.

**Earlier follow-up (23 October):** [Rating reconciliation batch 2](../rating-reconciliation/batch-2/README.md) covers six more applications, closes eight additional source questions and updates the actual E3/E5 explanations and dependent ratings. Twelve of 68 targeted rating reviews are recorded; 56 remain. No new full-scope E3/E5 Pass is claimed in batch 2.

**Start of rating work (23 October):** [Reconciliation batch 1](../rating-reconciliation/batch-1/README.md) begins the requested E3/E5 and principle audit. It updates six actual application pages and repairs invalid requirement values across the directory. Earlier statements below about deferred ratings describe the completed evidence-sweep stage, not a continuing prohibition on changes.

Batches [6](../third-pass/batch-6/README.md), [7](../third-pass/batch-7/README.md), [8](../third-pass/batch-8/README.md), [9](../third-pass/batch-9/README.md), [10](../third-pass/batch-10/README.md), [11](../third-pass/batch-11/README.md) and [12](../third-pass/batch-12/README.md) complete the evidence sweep: 77 further bounded questions across the remaining 38 applications. All 68 application pages now contain third-pass findings (144 bounded questions overall). Evidence, explanations and remaining work are updated; existing eligibility/principle ratings are preserved for the agreed next pass. No target software was installed. Only explicitly identified, already available runtimes were exercised in disposable fixtures.

## Third pass and application assessments

[Batch 5](../third-pass/batch-5/README.md) resolves twelve bounded questions across Blender, Inkscape, Krita, GIMP, KiCad and OpenSCAD. Application evidence is updated; eligibility and principle ratings remain unchanged for the user's requested next-pass audit.

[Batch 4](../third-pass/batch-4/README.md) resolves fourteen bounded questions across calibre, Audacity, Ardour, MuseScore Studio, Zim Desktop Wiki and Taskwarrior. All six assessments reflect the findings, including the Audacity sample read errors and conditional calibre preference recovery.

[Batch 3](../third-pass/batch-3/README.md) resolves fifteen further source questions across Gitea, Forgejo, Paperless-ngx, Kopia, restic and BorgBackup. All six application assessments now reflect the findings, including export losses, verification limits and version-specific boundaries.

[Batch 2](../third-pass/batch-2/README.md) resolves fourteen further questions across CadQuery, darktable, JabRef, GNU Octave, Kdenlive, and KeePassXC. Their application pages now include the results and resolved checkboxes, including the version-specific KeePassXC XML correction.

[Third-pass findings](../third-pass/README.md) resolve twelve questions across Anki, Joplin, Actual Budget, QGIS, FreeCAD, and Zotero. The six application pages in `content/directory/` now include the resolved checkboxes, pinned sources, observed artifact results, and remaining work. Reproduction code, retained fixtures, hashes, and results are in `evidence/third-pass/`.

## Second-pass gap register

The follow-up review across all 68 entries is in [second-pass-gap-register.md](../second-pass-gap-register.md). It keeps the documentation reviews separate from completed assessments, records the highest-value unresolved gap for each entry, links the online evidence already available, and orders the next disposable-data verification work.

One note per Index entry, written on 22 October 2026 from each project's official sources only (68 notes, one for every entry in `content/directory/`).

**What these are.** Records of what each project's own documentation says, grouped by the framework's concerns: storage and access (E1, E3), exit and migration (E2), recovery (E3), continuing authority and dependencies (E4), and consequential operations (E5). Each ends with concrete gaps to test.

**Original-review scope.** The initial 22 October reviews were documentation-only. Later dated follow-ups add source inspection, retained-artifact parsing and the explicitly identified existing-runtime fixtures. No target application was installed. The evidence findings appear on application pages, but they do not by themselves establish whole-application Pass/Fail or complete recovery. Rating reconciliation was deferred during that evidence sweep; completed later decisions and still-pending applications are distinguished in the application index.

**How to read a note.**
- "Not found in the docs" means the pages that were read do not say it. It does not mean the project is silent.
- Many pages were read through a summarising fetch tool, so wording is paraphrase. Notes mark claims that rest only on a summary or a search result.
- Release dates are given as the official pages show them. Several pages omit the year, and the notes say so.

## Notes to re-check (sources blocked, missing, or only summarised)

- Access blocked: briar (wiki and repository 403), freecad (wiki), gimp (certificate errors), inkscape (403), jami (git.jami.net), kodi (wiki 403, kodi.tv certificate error), krita (certificate errors), libreoffice (wiki), moodle (docs.moodle.org 403), guix (guix.gnu.org 403), paperless-ngx (docs site 403, repository docs read instead), gnu-pspp (rate limits, Savannah unreadable).
- Pages 404 or missing: cadquery (FAQ), gnu-octave (several pages), jellyfin (downloads, updates), qgis (privacy, charter), qownnotes (settings, scripting), musescore-studio (privacy), reaper (privacy), money-manager-ex (privacy).
- Version or date unclear: jabref (v5.15 stable or 6.0 beta), jellyfin, jami, openscad (latest stable 2021.01, only nightlies offered).
- Partly read: mpv (about 200k of 646k characters), qownnotes (changelog), nixos (summary windows), logseq (docs site not fetched), keepassxc (guide too large, repository sources used), reaper and shotcut (User Guide PDF over the 10 MB fetch limit), r-project, restic, sqlite, hugo, grass-gis, gnucash (summarised or truncated).
- Placeholder in the source: musescore-studio (the handbook's backup and recovery page is a "TBD").

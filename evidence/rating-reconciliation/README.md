# Rating reconciliation

Updated 24 October 2026. [Evidence starting point](../README.md) | [All applications and current remaining work](../application-index.md).

## Current position

All **68 applications** have now received individual targeted E3/E5 reconciliation: 12 previously reviewed entries plus the 56 in the [declared continuation sequence](remaining-plan.json). **No application remains pending this rating pass.** This does not mean every application meets the standard or that every recovery/control gap is resolved.

- Every actual application page, evidence explanation and review note has its current decision.
- The 56 continuation reviews retain E3/E5 Not Verified where full-scope evidence remains incomplete. No new full-scope Pass/Fail is fabricated from partial documentation or parser success.
- Those reviews correct 189 rating fields, including 22 E2 claims that did not establish the declared independent-workflow migration. Each change and its original value has an individual reason in the relevant ledger. Positive Longevity/Transparency findings without E3/E5 are withdrawn; Briar's unsupported adverse Longevity finding is also corrected rather than treating missing recovery evidence as failure.
- Eleven new bounded source questions are resolved in batch 3. With the earlier 144-question sweep and eight additions in rating batch 2, the actual pages now contain **163 checked resolved questions**. Previously resolved questions are not reopened or counted again.
- No target application was installed or executed. E1/E4/Locality were not re-certified by this targeted pass. Git/SQLite's earlier declared runtime findings retain their original limits; all other unverified scopes retain explicit next evidence requirements.

## Completed batches

- [Batch 1](batch-1/README.md): Git, SQLite, Fossil, Jujutsu, Org-mode and QOwnNotes. Two predeclared existing-runtime configurations establish E3/E5; four broader scopes remain unverified. The 46 invalid requirement cells across 32 entries were separately repaired, with their history preserved.
- [Batch 2](batch-2/README.md): restic, BorgBackup, Kopia, Anki, Joplin and Zotero; eight additional bounded source answers and individual rating corrections.
- [Batch 3](batch-3/README.md): calibre, Audacity, Ardour, MuseScore Studio, Zim Desktop Wiki, Taskwarrior; 6 individually explained decisions, eleven new bounded source answers.
- [Batch 4](batch-4/README.md): Actual Budget, QGIS, FreeCAD, Gitea, Forgejo, Paperless-ngx; 6 individually explained decisions.
- [Batch 5](batch-5/README.md): CadQuery, Darktable, JabRef, GNU Octave, Kdenlive, KeePassXC; 6 individually explained decisions.
- [Batch 6](batch-6/README.md): Blender, Inkscape, Krita, GIMP, KiCad, OpenSCAD; 6 individually explained decisions.
- [Batch 7](batch-7/README.md): Logseq, Obsidian, BibDesk, LibreOffice (ODF), Beancount, hledger; 6 individually explained decisions.
- [Batch 8](batch-8/README.md): GnuCash, Money Manager Ex, Todo.txt, Hugo, Typst, NGSPICE; 6 individually explained decisions.
- [Batch 9](batch-9/README.md): NixOS, GNU Guix, OpenBSD, Podman, Syncthing, Pass; 6 individually explained decisions.
- [Batch 10](batch-10/README.md): GDAL, GRASS GIS, R, GNU PSPP, Kolibri, Moodle (self-hosted); 6 individually explained decisions.
- [Batch 11](batch-11/README.md): Shotcut, REAPER, Kodi, KOReader, mpv, Jellyfin; 6 individually explained decisions.
- [Batch 12](batch-12/README.md): Briar, Jami; 2 individually explained decisions.

## Verification and reading rules

Run `node scripts/rating-audit.js` for recorded fields, evidence and change-history checks across all completed batches. Run `node scripts/evidence-index.js --check` for navigation and retained-input integrity, and `node --test` plus `hugo` for integration. These checks validate the assessment repository, not runtime behavior of every product.

A resolved question is resolved. A whole requirement needs enough evidence for its declared scope; a source control, tiny fixture, warning or successful query cannot silently replace that scope. Missing evidence yields Not Verified/Not assessed, not an invented Pass or Fail. Original source/fixture observations, unsuccessful reads and historical baselines remain available. The earlier batch-3 draft is preserved as a preparation note and is not counted twice.

Final validation for this continuation: all 58 tests pass without failures or skips; the rating audit confirms 68 reconciled entries and no pending application; the navigation inventory verifies 197 retained-file hashes and 163 checked resolved questions. The site builds successfully with 90 pages. These are repository/integration checks, not 68 successful product recovery tests. Nothing was committed, pushed or published.

# Remaining evidence batches

**Current position, 24 October 2026:** the evidence sweep and all 68 targeted individual E3/E5 rating reviews are recorded. [Current rating overview](../rating-reconciliation/README.md) and [application index](../application-index.md) distinguish completion of this review pass from still-unverified product behavior. The earlier milestones and evidence-sweep validation remain dated history; current rating-review progress is summarized below.

[Evidence starting point](../README.md) | [Current application index](../application-index.md). The evidence sweep below is complete; unfinished rating work is a separate process. A prepared draft is not a completed rating decision.

Updated 23 October 2026, Asia/Baghdad.

## Original agreed sequence

The original agreement was to finish the evidence-gathering sweep before starting rating reconciliation, recording resolved questions and source/fixture limitations in the actual pages without promoting ratings just to close the sweep. That collection stage is complete. Subsequent rating reconciliation reassesses E3/E5 and principle findings together and repairs invalid/blank statuses batch by batch; see the current application index for completed and pending work.

## Evidence-sweep progress

All 68 application entries have now received an individually scoped third-pass evidence review. Batches 6-12 add 77 resolved bounded questions across the remaining 38 applications, bringing the sweep total to 144 across batches 1-12. No target software was installed; existing Git, Hugo and Python's SQLite library were used only in disposable fixtures, as explicitly recorded. Completion here means the recorded bounded evidence review, not whole-application certification or a completed recovery test.

## Completed evidence sequence

### [Batch 6](batch-6/README.md): Knowledge and documents

- [x] emacs-org-mode
- [x] logseq
- [x] obsidian
- [x] qownnotes
- [x] bibdesk
- [x] libreoffice

### [Batch 7](batch-7/README.md): Ledgers and structured records

- [x] beancount
- [x] hledger
- [x] gnucash
- [x] money-manager-ex
- [x] todo-txt
- [x] sqlite

### [Batch 8](batch-8/README.md): Development and reproducible work

- [x] git
- [x] fossil
- [x] jujutsu
- [x] hugo
- [x] typst
- [x] ngspice

### [Batch 9](batch-9/README.md): Platforms, synchronization and keys

- [x] nixos
- [x] guix
- [x] openbsd
- [x] podman
- [x] syncthing
- [x] pass

### [Batch 10](batch-10/README.md): Science and learning

- [x] gdal
- [x] grass-gis
- [x] r-project
- [x] gnu-pspp
- [x] kolibri
- [x] moodle

### [Batch 11](batch-11/README.md): Media and reading

- [x] shotcut
- [x] reaper
- [x] kodi
- [x] koreader
- [x] mpv
- [x] jellyfin

### [Batch 12](batch-12/README.md): Communications

- [x] briar
- [x] jami

## Rating-review progress: completed 24 October 2026

The pass began with [rating batch 1](../rating-reconciliation/batch-1/README.md) and continued through [all twelve individually scoped batches](../rating-reconciliation/README.md). The original rating and evidence baselines remain historical records; completed review does not mean that every requirement passes.

- [x] Reassess E3 and E5 individually for all 68 applications in their stated scopes; incomplete coverage remains Not Verified.
- [x] Reconcile Longevity and Transparency and Control with their E3/E5 minimums, retaining explicit explanations for unestablished findings.
- [x] Correct invalid requirement values and blank rendering, with validation coverage; all 68 pages have non-blank criterion cells.
- [x] Update all actual assessment pages, decision records and supporting notes together; the determination remains computed from their fields. No Pass is inferred merely from a resolved sub-question.

- [x] [Rating batch 2](../rating-reconciliation/batch-2/README.md): restic, BorgBackup, Kopia, Anki, Joplin and Zotero individually reconciled; eight additional bounded questions resolved. No full-scope E3/E5 promotion is justified; unsupported dependent ratings and three E2 Passes corrected.
- [x] Batches 3-12 individually reconcile the remaining 56 applications and resolve eleven additional bounded source questions.
- Targeted reconciliation: 68 of 68 reviewed; no application is pending this review pass. Product-specific evidence gaps remain explicit in the current application index. Run `node scripts/rating-audit.js` to check recorded decisions against actual pages.

## Review inventory and limits

[Machine-readable findings](remaining-review-findings.json) maps every batch 6-12 question to the actual application page evidence, source and remaining work. [Original rating tables](deferred-ratings-baseline.json) make the agreed no-rating-change boundary verifiable. Reports retain negative findings and unsuccessful checks, including the installed Hugo cleanup result; they do not claim 68 successful recovery tests or product fixes.

## Evidence-sweep validation (before rating reconciliation)

- All seven new inspection plans reproduce from retained inputs with `python evidence/third-pass/inspect_remaining.py <batch> --offline` (batches 6-12); 82 retained inputs have SHA-256 records and available Git-object checks.
- `node --test`: 42 passing tests, no failures or skipped tests. Coverage includes all 38 new application pages, every recorded evidence finding, retained-file hashes and preservation of the original rating tables.
- `hugo`: successful local build, 90 pages. This is a site integration check, not an offline runtime assessment of the listed products.
- `git -c core.safecrlf=false diff --check`: clean. Existing unrelated work is preserved; nothing was committed or published.



# Evidence: start here

Updated 2026-10-24. This is the entry point for the research evidence. Original sources, fixtures, hashes and dated observations stay in place.

## Current position

| Work | Recorded position |
|---|---|
| Applications with collected evidence | 68 of 68 |
| Applications with completed targeted rating reconciliation | 68 |
| Applications still awaiting targeted rating reconciliation | 0 |
| Applications in unfinished draft batches | 0, included in the pending count |
| Checked resolved questions on actual assessment pages | 163 |
| Retained files with recorded hashes checked by the inventory | 197 |

A resolved question is resolved. It is not automatically an E3/E5 Pass or a completed application assessment. Likewise, a page's existing `assessment_status = complete` does not mean this later rating reconciliation has finished. Missing evidence is not a verified product failure.

## Find the right record

| What you need | Where to go |
|---|---|
| One row per application: current E3/E5, checked findings, evidence and remaining work | [Application index](application-index.md) |
| Actual assessment fields, limitations and findings used by the website | [Application pages](../content/directory/) |
| Reasons for completed rating changes | [Rating reconciliation](rating-reconciliation/README.md) |
| Collected primary-source observations and independent fixture checks | [Third-pass evidence](third-pass/README.md) |
| Earlier documentation notes and their later follow-ups | [Documentation reviews](doc-reviews/README.md) |
| Historical second-pass questions | [Second-pass gap register](second-pass-gap-register.md) |
| Machine-readable navigation and retained-file provenance | [index.json](index.json) |

## Which information takes precedence?

1. The actual application page holds the current requirement and principle fields. The website computes its determination from those fields and evidence; this inventory does not award ratings.
2. The latest **completed** rating decision ledger explains reconciled changes. Original source observations and older decisions remain available as history.
3. Collection reports answer bounded questions. Their checked Resolved items retain their original version and scope; they do not certify an entire product.
4. Original documentation reviews and the second-pass register are historical where later evidence supersedes them. Statements such as "not tested" or "ratings deferred" there describe that dated review, not every later action.
5. A draft plan, downloaded source or inspection result is **not** a completed rating decision. Drafts are excluded from the completed count.

## Folder map

- `doc-reviews/<application>.md`: original documentation record plus dated follow-ups.
- `third-pass/`: evidence collection, retained input files, inspection plans, reproducible readers and results. Batch 1 is recorded in its root README; later batches have their own folders.
- `rating-reconciliation/batch-N/`: declared scope, completed decisions where present, reproduction material and the report for that pass.
- `second-pass-gap-register.md`: the historical research checklist, with selected later updates. Use the application index for current open work.

No sources or historical observations were deleted, renamed or moved during organization. Repeated summaries are navigation/context; retained source and fixture locations remain stable. Temporary Python caches and generated website output are not evidence inputs and are excluded from this inventory; they have not been deleted.

## Check or refresh the organization

`node scripts/evidence-index.js --check` verifies the index against current application pages, completed ledgers, local navigation targets and recorded source/fixture hashes. `node scripts/rating-audit.js` checks completed E3/E5 reconciliations. `node --test` validates the site and integration.

After evidence or rating updates, regenerate navigation with `node scripts/evidence-index.js --write --date YYYY-MM-DD`, then run both checks. The generator changes only this README, application-index.md and index.json. It does not install software, run upstream implementation, change application ratings or fetch external URLs. Local targets and recorded hashes are verified; external web pages have not all been re-fetched for this organization pass.

# hledger: documentation review

Reviewed 22 October 2026 from hledger.org (home, install, export, workflows, release notes, the hledger manual) and the official GitHub README only. The install page says "The current stable hledger release is 1.52.4" with no release date; the release notes date 1.52.4 as 2026-09-10 and list 1.99.5 (a 2.0 preview) as 2026-10-01. The GitHub Releases tab was empty. Licence: GPL v3 or later, per the README; hledger.org's home and install pages do not name a licence. The manual and release notes pages are very long and were read only in part (noted below).

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- The journal is plain text, usually `.journal` (`.hledger` and `.j` also work). Transactions start with a date, and an account name must be followed by "two or more spaces" before its amount. Default file is `LEDGER_FILE`, or `$HOME/.hledger.journal`. [manual](https://hledger.org/hledger.html)
- Non-ASCII input must be decodable with the system locale encoding; the wrong encoding "will fail". [manual](https://hledger.org/hledger.html)
- Other readable inputs: timeclock, timedot, CSV/SSV/TSV with `.rules` files. Unsupported Ledger directives are "accepted but ignored", and reports "may differ from Ledger's". [manual](https://hledger.org/hledger.html)
- The workflows page lets the journal live anywhere (example `~/finance/2023.journal`) via `LEDGER_FILE`. [workflows](https://hledger.org/workflows.html)
- A published journal format specification exists (linked from the Index entry); this review did not read it.

**Exit and migration (E2)**
- Report formats: text, HTML, JSON, SQL, CSV, TSV, FODS, and beancount for some reports. `print` "usually preserves the most information"; plain text, beancount, HTML and JSON are recommended. [export](https://hledger.org/export.html)
- Stated loss points: CSV, TSV and FODS `print` give "multiple records per transaction"; `aregister` CSV abbreviates other account names; beancount output "may need account aliases". The page does not say whether any export can be re-imported without loss. [export](https://hledger.org/export.html)
- Beancount cost notation: hledger supports only `@` and `@@` there, and says it "does not yet calculate lots itself" (this applies to the stable manual page read; 1.99.5 notes differ, see below). [manual](https://hledger.org/hledger.html)
- SQL output: importing into a database that already has data means "your postings would be duplicated". [manual](https://hledger.org/hledger.html)

**Recovery (E3)**
- The docs recommend keeping journals in version control (git, darcs, jj) and committing after each reconciliation or import, and say to "back up your files regularly". No restore procedure is given. [workflows](https://hledger.org/workflows.html)
- Version compatibility: the 1.99.5 preview lists breaking changes for existing files: a stricter decimal-mark error, lot `{}` and `@` costs must agree (legacy mismatches still load), commodity alias syntax changes, hyphenated date ranges rejected, lot disposals now balance differently. [release notes](https://hledger.org/relnotes.html) (summary of a truncated page, first 100,000 of about 536,000 characters)
- The same notes say hledger 1 is receiving "only essential fixes"; security fixes for hledger-web were backported in 1.52.2 and 1.52.3. Timeclock format changed in 1.43 and 1.50, with an `--old-timeclock` option. [release notes](https://hledger.org/relnotes.html), [manual](https://hledger.org/hledger.html)

**Continuing authority (E4) and dependencies**
- No account is mentioned for the CLI or web UI; storage is local files. Network use, telemetry and update checks: not found in the docs (the manual was read for about 300,000 of 470,000 characters).
- Created by Simon Michael and contributors since 2007; the README cites 140+ contributors and about 16 sponsors, mostly via Open Collective. No governance document, succession plan or long-term commitment was found. [home](https://hledger.org/), [GitHub](https://github.com/simonmichael/hledger)
- Install page says nothing on licence or update checks. [install](https://hledger.org/install.html)

**Consequential operations (E5)**
- Balance assertions are checked in date order after reading; failures are errors; `-I` disables them. Assertions do not see transactions in other `-f` files, and `add` validates a new transaction against all existing assertions. [manual](https://hledger.org/hledger.html)
- `import` is described as idempotent: it appends only new transactions to the main journal and keeps state in a hidden `.latest.FILE.csv`. [manual](https://hledger.org/hledger.html) (summary of a truncated page)
- `close`, `rewrite` and generated postings are "temporary, existing only at report time"; `check` has several modes (accounts, commodities, strict). Details of `add`, `close`, `rewrite` and `check` sections were not read. [manual](https://hledger.org/hledger.html)
- No undo, overwrite or destructive-command warnings were found beyond the backup reminder and the `hledger.conf` note that automatic config files can make behaviour "less predictable".

## Gaps to test or read next
1. Round trip with synthetic data: `hledger print -O json` and `print` plain text, then re-read; compare balances with `hledger bal` before and after, and list what is lost (comments, tags, directives).
2. Build a small journal with commodity costs; run `print -O beancount`, load in Beancount, and compare postings and cost basis (the scenario named in the Index entry).
3. Open a 1.52.4 journal in 1.99.5 and in 1.52.4 again; list errors from the breaking changes, and test the reverse direction.
4. Import the same CSV twice and confirm idempotence; delete `.latest.*` and repeat to see duplicate behaviour.
5. Restore a journal from git into a clean directory and compare reports.
6. Not read: the rest of the manual (the `add`, `import`, `check`, `close`, `rewrite` sections), the remaining 436,000 characters of release notes, the journal format spec, the privacy or telemetry statements (if any), the CREDITS and finance pages, and the licence text on hledger.org.
7. The release date of 1.52.4 on the install page is absent; confirm against the release notes page directly.

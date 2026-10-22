# Beancount: documentation review

Reviewed 22 October 2026 from the Beancount documentation and repository only. Current stable line: version 3. Latest tag found: 3.2.3 (5 May 2026); the GitHub Releases page lists none, so tags were the only source. Licence: GNU GPL v2 only.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. Several documentation pages are dated (the language syntax page says "Updated: April 2016" and contains out-of-date notes), so claims need checking against the version tested.

## What the documentation says

**Storage and access (E1, E3)**
- Ledgers are plain text files made of dated directives. Examples use `.beancount`, and no page says an extension is required. [getting started](https://beancount.github.io/docs/getting_started_with_beancount/), [language syntax](https://beancount.github.io/docs/beancount_language_syntax/)
- The syntax is documented with examples. No standalone formal grammar was found; the grammar lives in the source. No explicit "files must be UTF-8" statement was found. [language syntax](https://beancount.github.io/docs/beancount_language_syntax/), [installing](https://beancount.github.io/docs/installing_beancount/)
- The README states the aim of being the "simplest, most durable manner" of keeping accounts. No page states that a ledger stays readable without the software. [GitHub](https://github.com/beancount/beancount)

**Exit and migration (E2)**
- `bean-query` (BQL) runs queries and supports text and CSV output; the page contradicts itself on CSV. `beancount.loader` loads a ledger as a Python library, and printer output is documented as parseable back to the same data. [query language](https://beancount.github.io/docs/beancount_query_language/), [scripting](https://beancount.github.io/docs/beancount_scripting_plugins/)
- `bean-report`, `bean-web`, and `bean-bake` were removed or deprecated in v3; Fava is the documented replacement. [installing](https://beancount.github.io/docs/installing_beancount/), [CHANGES](https://github.com/beancount/beancount/blob/master/CHANGES)
- Moving to Ledger or hledger is not supported by a migration procedure; the comparison page lists syntax differences, and the v3 design doc calls Ledger conversion unlikely to be maintained. [comparison](https://beancount.github.io/docs/a_comparison_of_beancount_and_ledger_hledger/), [v3 design](https://beancount.github.io/docs/beancount_v3/)

**Recovery (E3)**
- `bean-check` validates a ledger and reports file and line. Balance assertions catch duplicate imports. No backup or Git guidance for the ledger itself was found. [running](https://beancount.github.io/docs/running_beancount_and_generating_reports/)
- v3 is "the current stable version since June 2024", with v2 frozen and v1 not to be used. No official v2 to v3 migration guide was found, and no explicit long-term syntax stability promise. [GitHub](https://github.com/beancount/beancount), [installing](https://beancount.github.io/docs/installing_beancount/)

**Continuing authority (E4) and dependencies**
- Prices are never fetched automatically, "so that any run of a report is deterministic and can also be run offline". `bean-price` and importers are optional. Importers work on files the user downloads; the docs say Beancount provides no tools to connect to the network and fetch them. [prices](https://beancount.github.io/docs/fetching_prices_in_beancount/), [importing](https://beancount.github.io/docs/importing_external_data/)
- No account, telemetry, or update-check statement was found. Maintenance is centred on one author (Martin Blais). No succession plan was found, and the v3 design doc says development slowed for lack of time and seeks more owners for split-out parts. [GitHub](https://github.com/beancount/beancount), [v3 design](https://beancount.github.io/docs/beancount_v3/)
- v3 split tools into separate packages (beanquery, beangulp, beanprice, Fava), so a working setup depends on several projects. [installing](https://beancount.github.io/docs/installing_beancount/)

**Consequential operations (E5)**
- Plugins are Python functions that can add, remove, or modify entries in memory at load time, with output validated to balance. `pad` synthesizes entries in memory. Neither rewrites the file. [scripting](https://beancount.github.io/docs/beancount_scripting_plugins/)
- `bean-format` writes to stdout and changes whitespace only. No built-in change history was found, so history relies on external tools such as Git. [running](https://beancount.github.io/docs/running_beancount_and_generating_reports/)
- Booking methods: STRICT by default, plus FIFO, LIFO, and NONE; AVERAGE is documented as not yet supported, and one page's method list is marked out of date. [how inventories work](https://beancount.github.io/docs/how_inventories_work/)

## Gaps to test or read next
1. A version-pinned ledger with lots, prices, multiple currencies, and plugins: load, query, and export, then recompute balances independently.
2. Whether the ledger and its meaning survive without Beancount (read in a plain editor, rebuild in hledger) and what changes.
3. Whether ledgers written for v2 load unchanged in v3.
4. Pages not read: options reference, precision and tolerances, beangulp and beanquery docs, Fava docs.
5. The editing and backup practices the maintainers actually recommend.

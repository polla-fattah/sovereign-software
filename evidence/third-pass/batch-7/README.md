# Third pass, batch 7

Reviewed 23 October 2026, Asia/Baghdad. 12 bounded questions are resolved across 6 applications. All findings are copied into the actual application pages; broader unknowns remain open.

## Method and reproduction

Run from the repository root:

```powershell
python evidence/third-pass/inspect_remaining.py 7
```

[inspection-plan.json](inspection-plan.json) identifies pinned source revisions and inputs. [artifact-results.json](artifact-results.json) records retained-file SHA-256 hashes, Git-object checks where available, observed structures, source locations and environment. Downloaded application implementation code is not imported or run. Published schema DDL, when explicitly identified, is instantiated in SQLite; document code blocks are not evaluated. Archives are inspected in memory; historical samples retain their historical scope. Source-anchor matches locate reviewed code, not successful application tests or CI runs. No target application was installed. Any use of an already available runtime is identified explicitly in the findings and result record; source inspection is not reported as an application run. Upstream licensing and copyright continue to apply to the retained files.

At the user's request, existing eligibility and principle ratings are preserved exactly. E3/E5 decisions, principle reconciliation and invalid/blank-status corrections are deferred to the next pass. A resolved sub-question does not establish whole-application compliance.

<a id="beancount"></a>

## Beancount

- [x] Resolved: The published vesting ledger is independently readable text containing dated directives, multiple commodities, explicit share-cost literals such as {131.3700 USD}, metadata links and postings with deliberately omitted amounts. It distinguishes records from evaluation rules; simply summing the visible numbers is not a validated independent balance or cost-basis reconstruction. [Inspected source/input](https://github.com/beancount/beancount/blob/9747213802acb733ce53acc6e963f5961f47d6cd/examples/vesting/vesting.beancount).
- [x] Resolved: The padding pass synthesizes and inserts Transaction entries after Pad directives to satisfy later balance checks. Its source states that it operates per account/per currency rather than automatically across parent-child account relationships. A pad-generated balancing entry is therefore an accounting transformation to inspect, not evidence that every original transaction was present or correct. [Inspected source/input](https://github.com/beancount/beancount/blob/9747213802acb733ce53acc6e963f5961f47d6cd/beancount/ops/pad.py).

Remaining: Independent exact balance/lot/FX reproduction, plugin effects, migration to another ledger, v2/v3 compatibility, report fidelity and actual editing/recovery.

<a id="hledger"></a>

## hledger

- [x] Resolved: The upstream borrowing example is readable as ordinary journal text, including dated transactions, posting account paths, amounts and explanatory comments. This establishes inspectable source records rather than a binary-only ledger. It does not establish independently recomputed balances, commodity-cost handling or lossless Beancount conversion. [Inspected source/input](https://github.com/hledgerorg/hledger/blob/cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd/examples/borrowing.journal).
- [x] Resolved: Import sets new_=True and defers saving .latest state until successful processing. Its dry-run branch prints prospective transactions; the reader receives _dryrun with an explicit no-archive/no-data-file-removal/no-generating-command policy. Non-dry import appends transactions and then saves checkpoint dates. Idempotence therefore depends on checkpoint/input handling, not a universal duplicate-proof import guarantee. [Inspected source/input](https://github.com/hledgerorg/hledger/blob/cfc6aeb0adfc1fcad0e5144a34171d6e75c348dd/hledger/Hledger/Cli/Commands/Import.hs).

Remaining: Runtime JSON/text/Beancount round trips, balances/costs/comments/tags comparison, duplicate imports with and without checkpoints, clean-directory restore and old/new version behavior.

<a id="gnucash"></a>

## GnuCash

- [x] Resolved: Standard XML parsing of the published sample reads 65 account records and two transactions. Every split account reference resolves, and exact rational arithmetic gives a zero sum of split values within each transaction. This checks this small fixture's explicit links and transaction values, not a full trial balance, exchange-rate validation, schedules, budgets or a populated modern book. [Inspected source/input](https://github.com/Gnucash/gnucash/blob/fec5643cd22cbafc7b16047f35cbe852395da947/doc/examples/reg_doc_example.gnucash).
- [x] Resolved: The XML transaction serializer writes transaction currency and separate split value, quantity, account and reconciliation fields. Value and quantity are distinct preservation fields, so reducing a multi-commodity book to a single amount column can discard meaning. The implementation is inspectable; complete cross-backend or CSV reconstruction has not been executed. [Inspected source/input](https://github.com/Gnucash/gnucash/blob/fec5643cd22cbafc7b16047f35cbe852395da947/libgnucash/backend/xml/gnc-transaction-xml-v2.cpp).

Remaining: Representative XML/SQLite backend comparison with schedules/budgets/FX/reconciliation, CSV loss profile, timestamps/backups/log replay, deletion controls and older releases.

<a id="money-manager-ex"></a>

## Money Manager Ex

- [x] Resolved: The published, generated SQL schema successfully instantiated in an in-memory SQLite database, yielding 67 schema objects and integrity_check=ok. Account, transaction and related table definitions are available independently. This is an empty schema reconstruction, not an opened .mmb with financial records, attachment files or validated balances. [Inspected source/input](https://github.com/moneymanagerex/moneymanagerex/blob/a4aa421415143406e2557b334137ca1b90b58218/src/table/tables_en.sql).
- [x] Resolved: The database-open path tries the newer SQLCipher configuration and falls back to the older AES-128 cipher. On the legacy path it offers a warning that rekeying prevents older MMEX versions opening the database, and only rekeys after a Yes response; page-size migration may occur first. This resolves the implemented upgrade warning/control, not actual decryption, cancellation or cross-version recovery. [Inspected source/input](https://github.com/moneymanagerex/moneymanagerex/blob/a4aa421415143406e2557b334137ca1b90b58218/src/db/dbwrapper.cpp).

Remaining: A populated .mmb/.emb independently inspected, full transaction/transfer/split/attachment export/import comparison, real encryption migration, deleted-record retention and backups.

<a id="todo-txt"></a>

## todo.txt

- [x] Resolved: The official grammar specifies leading priority, optional creation date, completion marker/date, project/context tokens and extensible key:value metadata. Its published examples are retained for independent text inspection. The specification explicitly notes client differences in priority preservation on completion; a due: or rec: token is not by itself proof of shared scheduling behavior across clients. [Inspected source/input](https://github.com/todotxt/todo.txt/blob/1d90c086533a2574f6039a756ada760ec672a53e/README.md).
- [x] Resolved: The reference CLI completion branch removes a leading priority before prepending the completion marker/date. The archive path appends x-marked lines to done.txt and then deletes them from todo.txt, using sed's .bak mechanism. These are file-changing transformations, not an immutable task history; actual interrupted writes, backups and alternative-client behavior were not run. [Inspected source/input](https://github.com/todotxt/todo.txt-cli/blob/a9846a232c86937a218d1be45bc4c7631855ee16/todo.sh).

Remaining: Three-client edits and unknown-tag/priority comparison, recurrence interpretation, actual archive/delete/deduplicate/replace failures and recovery, line-number shifts and older clients.

<a id="sqlite"></a>

## SQLite

- [x] Resolved: A controlled experiment using Python's bundled SQLite 3.45.3 logically dumped and restored a synthetic database with foreign keys, a view, a trigger, BLOBs and mixed stored types. Row values/types matched, the restored view returned both rows, one trigger was present and foreign_key_check was empty. This tested the installed library, not the pinned newest source, another SQLite implementation, every schema feature or corrupt-file recovery. Reproduction code and results are in batch 7. [Inspected source/input](https://github.com/sqlite/sqlite/blob/31ebfdf4a1483218a7e17499957eca4caabce915/test/dump.sql).
- [x] Resolved: In the same controlled WAL-mode scenario, copying only the main database while its connection stayed open produced a copy with no tables from the uncheckpointed transaction. Connection.backup instead produced both child rows and integrity_check=ok. This demonstrates why a live main-file copy is not universally a complete snapshot; concurrent-writer stress, network filesystems and all crash timings remain untested. [Inspected source/input](https://github.com/sqlite/sqlite/blob/31ebfdf4a1483218a7e17499957eca4caabce915/test/dump.sql).

Remaining: Independent non-SQLite file interpretation, corrupt-file .dump/.recover comparison, concurrency/crash/backend matrices and older-release compatibility with newer features.


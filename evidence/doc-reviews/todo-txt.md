# Todo.txt: documentation review

Reviewed 22 October 2026 from the official format repository (github.com/todotxt/todo.txt) and the todo.txt-cli repository (README, USAGE.md, CHANGELOG.md, todo.cfg, releases page) only. Current stable todo.txt-cli release: v2.14.0, 1 September 2026 (the CHANGELOG gives "2026-09-01"; the releases page shows "01 Sep" without the year). The format repository lists no releases and no version. Licence: GPL-3.0 for both repositories. The website todotxt.org failed with a certificate error (served a github.com certificate), so it was not read. The format is a convention with many independent implementations; these sources describe the format and the official shell tool, not other clients.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1. Several facts below rest on summaries of fetched pages, not on reading the full pages.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 7](../third-pass/batch-7/README.md#todo-txt) and reflected in the [application page](../../content/directory/todo-txt.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The official grammar specifies leading priority, optional creation date, completion marker/date, project/context tokens and extensible key:value metadata. Its published examples are retained for independent text inspection. The specification explicitly notes client differences in priority preservation on completion; a due: or rec: token is not by itself proof of shared scheduling behavior across clients.
- [x] Resolved: The reference CLI completion branch removes a leading priority before prepending the completion marker/date. The archive path appends x-marked lines to done.txt and then deletes them from todo.txt, using sed's .bak mechanism. These are file-changing transformations, not an immutable task history; actual interrupted writes, backups and alternative-client behavior were not run.

Remaining: Three-client edits and unknown-tag/priority comparison, recurrence interpretation, actual archive/delete/deduplicate/replace failures and recovery, line-number shifts and older clients.

## What the documentation says

**Storage and access (E1, E3)**
- One line is one task in a plain-text file named `todo.txt`; any editor works. Incomplete tasks: optional `(A)` to `(Z)` priority first, optional `YYYY-MM-DD` creation date, then free text with `+project` and `@context` markers. [format spec](https://github.com/todotxt/todo.txt)
- Completed tasks start with a lowercase `x ` followed by a required completion date, then the optional creation date. [format spec](https://github.com/todotxt/todo.txt)
- Extension metadata is `key:value`, one colon, no whitespace, for example `due:2010-01-02`. The spec does not define any keys, so meaning is left to each tool. [format spec](https://github.com/todotxt/todo.txt)
- The spec notes many clients drop priority on completion and suggests keeping it as a `pri:A` tag. [format spec](https://github.com/todotxt/todo.txt)
- The CLI keeps `todo.txt`, `done.txt` and `report.txt` in `TODO_DIR`, which defaults to the home directory. [todo.cfg](https://github.com/todotxt/todo.txt-cli/blob/master/todo.cfg)

**Exit and migration (E2)**
- No export or conversion command was found in the docs read. The files are the data, so migration is copying the text file. [USAGE.md](https://github.com/todotxt/todo.txt-cli/blob/master/USAGE.md)
- Not found in the docs: any statement on how other implementations treat recurrence, unknown `key:value` tags, or priority after completion. The spec's own note on priority dropping suggests behaviour differs between clients.
- Unreleased CHANGELOG entries add `TODOTXT_DATE_FORMAT` settings to customize creation and completion dates, which would change the date text from the spec's `YYYY-MM-DD`. [CHANGELOG](https://github.com/todotxt/todo.txt-cli/blob/master/CHANGELOG.md)

**Recovery (E3)**
- Not found in the docs: any backup or undo command in USAGE.md; the page documents no undo or backup action. [USAGE.md](https://github.com/todotxt/todo.txt-cli/blob/master/USAGE.md)
- The README suggests relocating `TODO_DIR` to a cloud drive; it names no backup or sync method. [README](https://github.com/todotxt/todo.txt-cli)
- The format repository states no versioning policy, and no format version number was found. [format spec](https://github.com/todotxt/todo.txt)
- Past data-loss bugs are recorded: 1.5 deleted any item containing an "x" during archiving (fixed 1.5.1); `depri` wiped tasks with more than a priority marker (fixed 2.4.0). [CHANGELOG](https://github.com/todotxt/todo.txt-cli/blob/master/CHANGELOG.md)

**Continuing authority (E4) and dependencies**
- No account is required. The README describes no network use, update check, or telemetry, and no privacy page was read. [README](https://github.com/todotxt/todo.txt-cli)
- The 2.14.0 release notes list a security fix: `todo.sh` could load its version file from the current working directory. [releases](https://github.com/todotxt/todo.txt-cli/releases)
- Licence is GPL-3.0 (holder: the todo.txt org). The README states no maintenance or succession policy; it links a contributing guide, code of conduct, and security policy (not read). Support is by GitHub Discussions and Issues. [README](https://github.com/todotxt/todo.txt-cli)
- The format repository's activity is thin (the fetched page showed 12 commits, no releases); the fetch was a summary, so treat counts as approximate. [format spec](https://github.com/todotxt/todo.txt)
- Custom actions load from `TODO_ACTIONS_DIR`; the docs read do not discuss their trust. [todo.cfg](https://github.com/todotxt/todo.txt-cli/blob/master/todo.cfg)

**Consequential operations (E5)**
- `del NR` (alias `rm`) removes a line, or only a given term if one is passed. `replace NR` overwrites a line. `deduplicate` removes duplicate lines. `archive` moves done tasks to `done.txt` and drops blank lines. [USAGE.md](https://github.com/todotxt/todo.txt-cli/blob/master/USAGE.md)
- Auto-archive on completion is on by default since 2.0.0 (disable with `-a`). A delete confirmation prompt exists since 1.3.0; `-f` skips it. [CHANGELOG](https://github.com/todotxt/todo.txt-cli/blob/master/CHANGELOG.md), [USAGE.md](https://github.com/todotxt/todo.txt-cli/blob/master/USAGE.md)
- Without `-N`, deleting a task can shift later line numbers. [USAGE.md](https://github.com/todotxt/todo.txt-cli/blob/master/USAGE.md)
- USAGE.md gives no explicit warning for `del`, `replace`, `deduplicate`, or `move`; the main caution is that `-f` removes prompts. There is no history or undo in the docs read.
- Unreleased: `replace` will no longer accept an empty replacement; use `del`. [CHANGELOG](https://github.com/todotxt/todo.txt-cli/blob/master/CHANGELOG.md)

## Gaps to test or read next
1. Synthetic round trip: build a file with priorities, completed tasks, creation and completion dates, projects, contexts, and `due:`/`rec:`-style tags. Open it in three independent clients, edit in each, and diff the file afterwards.
2. Check what each client does to priority on completion, unknown `key:value` tags, and line order, against the spec's rules.
3. Run `archive`, `del`, `deduplicate`, and `replace` on a copy and confirm which are recoverable without git or another backup; test line-number shifting with and without `-N`.
4. Compare behaviour of 2.14.0 with an older release on the same file, and check the effect of the unreleased date-format settings on interchange.
5. Observe network activity of `todo.sh` during normal use to confirm the README's silence.
6. Not read: USAGE.md in full detail, the wiki, the contributing guide and security policy, the todotxt.org site (certificate error), and any privacy statement. Not found: a governance or succession statement, and a written format version history.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-8/README.md#todo-txt); [actual assessment](../../content/directory/todo-txt.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. The official text grammar describes task markers/tokens, while clients can differ in priority and extension semantics. Reference completion/archive source changes priority and moves lines between files. Complete recurrence, unknown-tag meaning and task-history reconstruction across clients have not been established.
- E5: Not Verified. The reference CLI's append/delete and backup-file paths are inspectable, but not immutable history or evidence of interrupted-write safety. Delete/deduplicate/replace authority, line-number drift and effective backup/correction across the declared client workflow remain unverified.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish equivalent priority, recurrence and extension-token behavior in an independent task workflow. Keeping readable task lines does not complete the declared cross-client semantic migration.

Remaining: Three-client edits and unknown-tag/priority comparison, recurrence interpretation, actual archive/delete/deduplicate/replace failures and recovery, line-number shifts and older clients. E5 needs effective archive/delete/replace and failure recovery boundaries, including line-number shifts and backup handling.

Next without a local installation: Use synthetic todo/done/config files with recurrence/unknown tags and expected task identities; compare supported independent clients or their recorded results, and inspect exact reference-CLI mutation/backup cases.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

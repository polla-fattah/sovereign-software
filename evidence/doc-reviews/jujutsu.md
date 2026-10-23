# Jujutsu: documentation review

## Rating reconciliation: 23 October 2026

The current [rating review](../rating-reconciliation/batch-1/README.md#jujutsu) supersedes the earlier rating freeze. E3: Not Verified; E5: Not Verified; Longevity: Not assessed; Transparency and Control: Not assessed. The actual application page contains the same decisions and supporting evidence.

Remaining: The existing open recovery and consequential-action scenarios remain pending; the individually explained E3/E5 blockers above determine the current Not Verified and Not assessed findings.

Earlier evidence findings below remain historical observations with their original limits, not automatic Pass results.


Reviewed 22 October 2026 from the Jujutsu documentation (docs.jj-vcs.dev, which the older jj-vcs.github.io address redirects to), the GitHub repository README, GOVERNANCE.md, and CHANGELOG.md only. Latest release in the changelog: 0.46.0, dated 2026-10-07 (the heading gives a full date). The GitHub Releases page showed no releases, so the version rests on the changelog alone. Licence: Apache-2.0 per the repository README.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 8](../third-pass/batch-8/README.md#jujutsu) and reflected in the [application page](../../content/directory/jujutsu.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: Undo restores a parent operation and refuses operations from another workspace unless explicitly overridden. Its implementation warns that undoing workspace removal restores the repository record but not the workspace directory.
- [x] Resolved: Git export invokes export_refs, not an operation-store archive. The separately inspected operation-log model retains repository views, workspace commits and operation metadata: Git export alone does not establish preservation of that full recovery history.

Remaining: Conflicted-change export, actual operation-store copying, older-version recovery and abandon/garbage-collection behavior remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- With the default Git backend, commits are stored in an ordinary Git repository; the architecture page says commit IDs are Git object IDs. Data Git cannot hold (change ID, predecessor list) goes in a separate table under `.jj/repo/store/extra/`. [architecture](http://docs.jj-vcs.dev/latest/technical/architecture/)
- Each storage role (commits, index, operations, op heads) has a `type` file selecting its backend. The page does not say whether the on-disk formats of the operation store and index are documented as stable, or how other tools could read them. [architecture](http://docs.jj-vcs.dev/latest/technical/architecture/)
- The README calls the project an "experimental version control system" and says on-disk format changes are expected before 1.0.0. This rests on a summary of the page. [README](https://github.com/jj-vcs/jj)
- Conflicted commits cannot be represented in Git; they are stored as `.jjconflict-*` directories, with the authoritative data in a `jj:trees` header. The Git staging area is ignored. [Git compatibility](http://docs.jj-vcs.dev/latest/git-compatibility/)

**Exit and migration (E2)**
- Colocated repos (`.jj` and `.git` sharing one working copy) are the default for `jj git init` and `jj git clone`. `jj git colocation enable/disable/status` converts between layouts; `jj git import` and `jj git export` sync a non-colocated one. [Git compatibility](http://docs.jj-vcs.dev/latest/git-compatibility/)
- Not supported or limited: submodules, hooks, `.gitattributes`, Git LFS, git-worktree, partial clones, annotated-tag creation. Change IDs live in a non-standard header "not preserved through a rebase operation". [Git compatibility](http://docs.jj-vcs.dev/latest/git-compatibility/)
- The operation log is not described as exported to Git. The page only says Git-made changes appear as an "import git refs" operation. [Git compatibility](http://docs.jj-vcs.dev/latest/git-compatibility/)

**Recovery (E3)**
- Hidden or rewritten commits can be found with `jj log -r <id>` or `jj evolog` and made visible again with `jj new`. [FAQ](http://docs.jj-vcs.dev/latest/faq/)
- The changelog records format breaks: from 0.9.0 and 0.11.0, data written by a newer binary may not load in older ones; 0.15.0 changed the index format and mentions `jj op abandon` for corrupted operations; 0.19.0 dropped automatic upgrade of repo formats older than 0.12.0. Read from a partial view of the changelog (about 200,000 of 222,792 characters). [CHANGELOG](https://raw.githubusercontent.com/jj-vcs/jj/main/CHANGELOG.md)
- Backup guidance for jj repositories: not found in the docs. The Git compatibility page says `git gc` "should be safe but is untested" and advises a backup first. [Git compatibility](http://docs.jj-vcs.dev/latest/git-compatibility/)

**Continuing authority (E4) and dependencies**
- Governance: a defined group of Maintainers decides by vote; the document lists nine and caps any single company at one third of Maintainers. Succession is by nomination and vote; no fixed succession plan. [GOVERNANCE](https://raw.githubusercontent.com/jj-vcs/jj/main/GOVERNANCE.md)
- The README says Google is a major contributor but "not a supported Google product". Summary of the page. [README](https://github.com/jj-vcs/jj)
- Telemetry, update checks, and accounts: not found in the docs (install, README, CLI reference first 100,000 characters, changelog). Network use is described only for remote commands such as `jj git fetch` and `jj git push`. [install](http://docs.jj-vcs.dev/latest/install-and-setup/)
- Requires Git 2.42.0 or later; building from source needs Rust 1.97.1 or later. [install](http://docs.jj-vcs.dev/latest/install-and-setup/)

**Consequential operations (E5)**
- Every repo-changing operation is recorded; `jj undo`, `jj op revert`, and `jj op restore` reverse one operation, a chosen one, or the whole repo state. Commands are lock-free and concurrent commands do not corrupt the repo. [operation log](http://docs.jj-vcs.dev/latest/operation-log/)
- `jj op abandon ..<id>` discards history up to an operation; `jj util gc` then prunes unreachable data, by default only items older than 2 weeks. No data-loss warning was shown in those sections. [CLI reference](http://docs.jj-vcs.dev/latest/cli-reference/)
- `jj abandon` rebases descendants onto the parent; an abandoned working-copy commit gets a new empty one. [CLI reference](http://docs.jj-vcs.dev/latest/cli-reference/)
- 0.46.0 made `jj undo` and `jj redo` refuse operations from another workspace unless `--allow-cross-workspace` is given. [CHANGELOG](https://raw.githubusercontent.com/jj-vcs/jj/main/CHANGELOG.md)
- Mixing `jj` and `git` in a colocated repo can cause branch conflicts or divergent change IDs; colocated workspaces are less resilient on NFS or Dropbox. [Git compatibility](http://docs.jj-vcs.dev/latest/git-compatibility/)

## Gaps to test or read next
1. Create a synthetic repo with conflicted commits, export to Git (`jj git export`), clone with plain `git`, and compare: what the conflicted commits look like, and whether change IDs and the operation log survive.
2. Write a repo with the current version, open it with an older release, and record what fails; then try the reverse.
3. Copy the `.jj` directory to a clean machine and run `jj op log` and `jj undo`, to test restoration without the original install.
4. Run `jj op abandon` then `jj util gc` on a test repo and check which commits become unrecoverable; compare with the 2-week default.
5. Inspect `.jj/repo/op_store` with no jj installed: is any format description published, or is it readable only by jj?
6. Not found: any statement on telemetry or update checks, backup guidance, a documented stable format, and succession beyond the vote rules. Not read: the last 7,870 characters of the CLI reference, the last 22,792 of the changelog, the technical conflicts and concurrency pages, and the design docs.
7. Confirm the release number and date from a source other than the changelog, since the GitHub Releases page was empty.

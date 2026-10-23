# Git: documentation review

## Rating reconciliation: 23 October 2026

The current [rating review](../rating-reconciliation/batch-1/README.md#git) supersedes the earlier rating freeze. E3: Pass; E5: Pass; Longevity: Meets; Transparency and Control: Partially meets. The actual application page contains the same decisions and supporting evidence.

Remaining: LFS payloads, signed-tag authenticity, executable hooks, remote/hosted permissions, corruption/crash recovery, independent network isolation, older versions and the earlier broader two-assessor candidate protocol remain unverified.

Earlier evidence findings below remain historical observations with their original limits, not automatic Pass results.


Reviewed 22 October 2026 from the git-scm.com install page, About page, and reference manual pages only (the Git GitHub release-notes file was read for the version check). Latest version shown: 2.56.0. The install page gives no release date, so the date and year are not found in the docs. Licence: GPL v2 per the About page.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 8](../third-pass/batch-8/README.md#git) and reflected in the [application page](../../content/directory/git.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: In an isolated Git 2.54.0.windows.1 fixture, a full --all bundle mirrored all recorded branch/tag/stash refs with matching object IDs and passed fsck. Ordinary clone omitted refs/stash, repository-local configuration, the marker hook and submodule working-tree contents; these need separate recovery planning.
- [x] Resolved: The full bundle verified in an empty repository, whereas an incremental v1..main bundle failed verification for missing prerequisite commits. Successful bundle creation therefore does not establish a self-contained backup.

Remaining: Signed-tag verification, LFS payloads, corruption recovery, submodule restoration and a representative real repository remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- The on-disk pack format is publicly specified: `.pack`, `.idx`, `.rev`, `.mtimes`, and multi-pack-index files. Git "accepts version number 2 or 3 but generates version 2 only". No general compatibility policy is stated on that page. [gitformat-pack](https://git-scm.com/docs/gitformat-pack)
- Pack checksums and object IDs use SHA-1, or SHA-256 in SHA-256 repositories. [gitformat-pack](https://git-scm.com/docs/gitformat-pack)
- `git fsck` checks object connectivity and validity and reports missing, dangling, and hash-mismatch objects. It "can't" repair corrupt objects; the page points to backups or other copies. [git-fsck](https://git-scm.com/docs/git-fsck)
- Whether other tools can read the object store: the format spec is public, but no statement about third-party readers was found in the docs.

**Exit and migration (E2)**
- A bundle packs objects and a ref header. With `--all` it carries all refs. It excludes the index, working tree, stash, per-repository config, and hooks. Bundles are read-only. [git-bundle](https://git-scm.com/docs/git-bundle)
- A bundle restores with `git clone backup.bundle`. Incremental bundles (`old..new`) need the prerequisite commits in the recipient, and `git bundle verify` checks this. [git-bundle](https://git-scm.com/docs/git-bundle)
- Clone: `--mirror` maps all refs; `--bare` copies branch heads only. `--recurse-submodules` is ignored with `--bare` or `--mirror`. [git-clone](https://git-scm.com/docs/git-clone.html)
- `git fast-export` strips signed commits by default, aborts on signed tags, and says signatures "may become invalid" after transformation. [git-fast-export](https://git-scm.com/docs/git-fast-export)
- Git LFS: the git-scm.com docs URL tried (`/docs/git-lfs`) returned 404, so LFS handling is unknown from the pages read.

**Recovery (E3)**
- The bundle page calls `cp -r` backup "discouraged" because the repository could change mid-copy. A local clone "can race" the same way. [git-bundle](https://git-scm.com/docs/git-bundle), [git-clone](https://git-scm.com/docs/git-clone.html)
- Local clones hardlink `.git/objects`; `--no-hardlinks` gives a real copy. `--shared` can leave the clone corrupt if source branches are deleted. [git-clone](https://git-scm.com/docs/git-clone.html)
- Bundle format v2 is SHA-1 only; v3 adds capabilities. The default is the oldest format fitting the hash. [git-bundle](https://git-scm.com/docs/git-bundle)
- SHA-256 repositories "cannot be read by older versions of Git" and cannot use alternates from SHA-1 repositories. The page is a design document and does not say what has shipped. [hash-function-transition](https://git-scm.com/docs/hash-function-transition)

**Continuing authority (E4) and dependencies**
- Licence GPL v2. The project is a member of the Software Freedom Conservancy. The name and logos are trademarked. [About](https://git-scm.com/about)
- Local work (branching, diffing, history) needs no account or server; the pages read describe push and pull as optional transports. Telemetry, update checks, and succession or maintainer statements: not found in the docs (maintainer pages were not read).
- Submodule URLs live in `.gitmodules` and `.git/config`. If a remote is unreachable and objects are missing locally, `update` cannot complete; the page does not document this case directly. [git-submodule](https://git-scm.com/docs/git-submodule)
- Hooks live outside commit history. The githooks page says clone may copy template hooks only via `git init` templates. [githooks](https://git-scm.com/docs/githooks)

**Consequential operations (E5)**
- `git reset --hard` overwrites the working tree and "may overwrite untracked files". `ORIG_HEAD` is set to the prior tip. [git-reset](https://git-scm.com/docs/git-reset)
- `git clean` needs `-f` by default, `-n` previews, and nested repositories need a second `-f`. [git-clean](https://git-scm.com/docs/git-clean)
- `git gc` prunes unreachable loose objects older than 2 weeks by default. `--prune=now` raises corruption risk if another process is writing. Reflog defaults: 90 days reachable, 30 days unreachable. [git-gc](https://git-scm.com/docs/git-gc), [git-reflog](https://git-scm.com/docs/git-reflog)
- `git push --force` "can cause the remote repository to lose commits". `--mirror` deletes remote refs absent locally. [git-push](https://git-scm.com/docs/git-push)
- `git filter-branch`: "its use is not recommended"; `refs/original/` is "not a real backup". [git-filter-branch](https://git-scm.com/docs/git-filter-branch)
- `git submodule deinit --force` removes a working tree even with local modifications. [git-submodule](https://git-scm.com/docs/git-submodule)

## Gaps to test or read next
1. Build a synthetic repository with branches, tags, annotated and signed tags, a stash, and a submodule. Run `git bundle create --all`, clone on an offline machine, then compare `git for-each-ref` and `git fsck` output.
2. Repeat with `git clone --mirror` and compare refs against the bundle clone. List what is absent (stash, hooks, config, reflog).
3. Add an LFS-tracked file and a submodule with a remote you then delete. Check what the bundle clone can and cannot check out.
4. Corrupt one loose object in a copy. Run `git fsck` and attempt recovery from the bundle.
5. Run `git fast-export --all | git fast-import` with signed commits and tags. Compare hashes and signature validity.
6. Not read or not found: Git LFS official docs, the `git-scm.com` privacy and trademark pages, release date for 2.56.0, any maintainer succession statement, a statement on third-party readers of the object store, and behavior of repositories created by newer Git on older Git beyond SHA-256.

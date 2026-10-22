# Hugo: documentation review

Reviewed 22 October 2026 from the Hugo documentation (gohugo.io) and the official GitHub repository and release pages only. Latest release shown on GitHub: v0.168.0, "13 Oct 17:24"; the page omits the year, so the date is unconfirmed (the docs footer also says the site is built with v0.168.0). Licence: Apache-2.0 (code), with bundled third-party libraries under their own licences. Several pages were read through a page-summarising fetch tool, so fine detail may be missing.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## What the documentation says

**Storage and access (E1, E3)**
- A project is ordinary directories: `content`, `layouts`, `data`, `static`, `assets`, `config`, `i18n`, `themes`, `archetypes`. Content is "typically Markdown"; data files may be JSON, TOML, YAML or XML; config may be `hugo.toml` or a `config` directory. [directory structure](https://gohugo.io/getting-started/directory-structure/)
- Other content formats: HTML, Org Mode, AsciiDoc, Pandoc, reStructuredText. The last three need external executables; HTML and Org Mode are denied unless `security.allowContent` is set. Whether other tools can read the files is not found in the docs. [content formats](https://gohugo.io/content-management/formats/)
- Output goes to `public`, recreated as needed. A `resources` directory caches asset pipeline output. Hugo does not follow symbolic links. [directory structure](https://gohugo.io/getting-started/directory-structure/)

**Exit and migration (E2)**
- Source files are plain files, so copying the project directory is the documented unit. Migration or import from other systems: not found on the pages read. [content formats](https://gohugo.io/content-management/formats/)
- Build locally and transfer the output with FTP, Rclone, Rsync or `hugo deploy`; or push source to a Git host that builds it. [deployment methods](https://gohugo.io/host-and-deploy/deployment-methods/)
- Themes and modules are mounted into the project, and project files win on a path clash. What changes if a theme is removed is not found in the docs. [directory structure](https://gohugo.io/getting-started/directory-structure/)

**Recovery (E3)**
- Backup and restore of a project is not described on the pages read; recovery relies on ordinary file copies or Git (inference, not stated).
- Modules are downloaded and cached on build, and `go.sum` plus `go.mod` record versions and checksums. `hugo mod vendor` copies all imported modules into `_vendor`, used by later builds. Modules in `themes` are not vendored. Git and Go 1.18 or later are required for modules. [use modules](https://gohugo.io/hugo-modules/use-modules/)
- A checksum mismatch makes the build fail. [security](https://gohugo.io/about/security/)
- Version compatibility between Hugo releases, and a backward-compatibility policy: not found in the docs read. The repository notes embedded LibSass was deprecated in v0.153.0 and will be removed. [GitHub](https://github.com/gohugoio/hugo)
- v0.168.0 notes one behaviour change: Hugo ignores `module.replacements` defined in themes. [release v0.168.0](https://github.com/gohugoio/hugo/releases/tag/v0.168.0)

**Continuing authority (E4) and dependencies**
- Build and preview run locally; `hugo server` is for local development only. No account requirement for building is stated. [usage](https://gohugo.io/getting-started/usage/), [security](https://gohugo.io/about/security/)
- Allowed external executables by default: `sass`, `go`, `git`, `node`, `postcss`. Remote fetching via `resources.GetRemote` is limited by an http allowlist that denies IP and localhost hosts. [configuration: security](https://gohugo.io/configuration/security/)
- Some embedded shortcodes (YouTube, Vimeo, X, Disqus and others) connect to external services; privacy settings exist for them. Telemetry and update checks in the binary: not found in the docs read. [privacy](https://gohugo.io/about/privacy/), [security](https://gohugo.io/about/security/)
- Licence: Apache 2.0. Creators credited: bep, spf13 and others; larger changes need a proposal accepted by the project lead; two corporate sponsors are listed. Succession plan and release schedule: not found in the docs. [about](https://gohugo.io/about/), [GitHub](https://github.com/gohugoio/hugo)
- Installation pages did not state edition differences (standard, extended) or dependencies; not read in detail. [installation](https://gohugo.io/installation/)

**Consequential operations (E5)**
- "Existing files are overwritten, but not deleted" in `public`. `--cleanDestinationDir` removes stale files; the default leaves them. [usage](https://gohugo.io/getting-started/usage/)
- `hugo deploy` has `--maxDeletes` (default 256), `--confirm` and a dry-run flag, so remote deletion is possible. Behaviour of each flag and credential handling are not on that page. [hugo deploy](https://gohugo.io/commands/hugo_deploy/)
- Undo, content history and publication approval are not features of Hugo itself; none found in the docs.

## Gaps to test or read next
1. Build this site (or a synthetic one) offline from a clean checkout with a pinned Hugo version, network disabled, and compare `public` byte for byte with a build on the network. Record every fetch attempted.
2. Inventory themes, modules, `resources.GetRemote` calls and external shortcodes in a sample project; remove the network and see which break. Test `hugo mod vendor` and rebuild offline.
3. Build the same project with v0.168.0 and an older release; diff the output to see version drift.
4. Confirm whether a build with default flags leaves stale files in `public` after deleting a page, then repeat with `--cleanDestinationDir`.
5. Run `hugo deploy` with dry-run against a throwaway target; check what it would delete.
6. Read next: Hugo Modules introduction, the installation pages (editions, Dart Sass), the licence page, the hugo-deploy guide, the repository's security policy and release notes for deprecations, and the official statements on telemetry and update checks (not found).
7. Confirm the release year for v0.168.0 from the tag or a changelog.

# mpv: documentation review

Reviewed 22 October 2026 from the mpv manual (stable), mpv.io, and the official GitHub repository (README, releases, SECURITY.md, release policy) only. Latest stable release shown: v0.41.0, listed as "21 Dec 19:17" with no year on the release pages, so the year is not confirmed from official pages. Licence: GPLv2 or later by default, LGPLv2.1 or later when built with `-Dgpl=false`. The manual page is very long (about 646,000 characters) and only roughly the first 200,000 were read; statements below rest on those parts, and on page summaries by the fetch tool.

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 11](../third-pass/batch-11/README.md#mpv) and reflected in the [application page](../../content/directory/mpv.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: Watch-later filenames are derived from the media path (or basename with the corresponding option), while contents use readable option=value lines and length-quoted strings. Only configured watch-later options are saved, changed values are selective, and unseekable/unknown-time input does not save a start position. This is not a whole-player configuration backup.
- [x] Resolved: Resume loading can be disabled and optionally rejects state when media modification time differs; it preserves command-line option precedence when loading the state file. The separate deletion function unlinks watch-later entries and parent redirects. A retained state file is therefore neither an immutable history nor a guaranteed replay on a renamed/moved media path.

Remaining: Actual playback/cross-machine restore, version-option migration, scripts/subprocess/network observation and output/cache overwrite behavior remain untested.

## What the documentation says

**Storage and access (E1, E3)**
- Configuration is plain text: `mpv.conf` uses `option=value` lines with `#` comments, user file at `~/.config/mpv/mpv.conf`. [manual](https://mpv.io/manual/stable/)
- Resume ("watch later") files are stored under the state directory, "usually ~/.local/state/mpv/", and restored from a watch_later directory. The file format is not described in the part read; only an optional filename comment at the top is mentioned. [manual](https://mpv.io/manual/stable/)
- `--watch-later-options` chooses which options are saved; resume is by default on, saving on quit is off except with Shift+Q. [manual](https://mpv.io/manual/stable/)
- Watch history is off by default; when on, it writes `watch_history.jsonl`, one JSON object per line with `time`, `path`, `title`. [manual](https://mpv.io/manual/stable/)
- Media files are the user's own files and are not altered by playback; no document says otherwise (not found in the docs as an explicit statement).

**Exit and migration (E2)**
- No export step exists in the part read, because state is already files. Whether another player can read watch_later or `input.conf` bindings: not found in the docs.
- Playlists are accepted by `--playlist`; the list of supported playlist formats was not in the part read. [manual](https://mpv.io/manual/stable/)
- `input.conf` defaults are listed in the source tree (`etc/input.conf`), not in the manual text read. [manual](https://mpv.io/manual/stable/)

**Recovery (E3)**
- No backup or restore procedure was found. Copying the config and state directories is implied by the plain-file design but not stated in the docs.
- Version compatibility: the manual warns that newer releases "strictly expect" `=` before option values and that `-option value` may stop working. [manual](https://mpv.io/manual/stable/)
- Version numbers follow 0.X.Y, and X rises "when a release has breaking changes". v0.41.0 notes list changed defaults (gpu-next now default; `swapchain-depth` reduced; `--prefetch-playlist` reverted to no) and point to `DOCS/interface-changes.rst`, which was not read. [release policy](https://github.com/mpv-player/mpv/blob/master/DOCS/release-policy.md), [v0.41.0](https://github.com/mpv-player/mpv/releases/tag/v0.41.0)
- Compatibility of watch_later files across versions: not found in the docs.

**Continuing authority (E4) and dependencies**
- No account is mentioned, and the pages read make no telemetry or update-check statement; absence of a statement is not proof of absence. [README](https://github.com/mpv-player/mpv), [installation](https://mpv.io/installation/)
- Releases come "once or twice a year"; only the latest release is supported and old ones are "unsupported and unmaintained". Security fixes go only to the most recent stable release. [README](https://github.com/mpv-player/mpv), [SECURITY.md](https://github.com/mpv-player/mpv/blob/master/SECURITY.md)
- The install page says distributions "usually package outdated, unmaintained, and unsupported versions" and recommends git master. [installation](https://mpv.io/installation/)
- youtube-dl integration is optional via Lua and by default looks only at http(s) URLs, so it uses the network when enabled. [manual](https://mpv.io/manual/stable/)
- Governance: no formal structure or succession statement was found. Security contacts named are two GitHub users. Contribution via pull requests, issues, IRC. [README](https://github.com/mpv-player/mpv)

**Consequential operations (E5)**
- Screenshots use "the first available number", so existing files are not overwritten. `--log-file` and `--dump-stats` truncate existing files. [manual](https://mpv.io/manual/stable/)
- `--playlist` warns not to use random internet sources or untrusted files; `--load-unsafe-playlists` governs entries that are not normal files. [manual](https://mpv.io/manual/stable/)
- Conditional auto profiles run Lua that "is not sandboxed". [manual](https://mpv.io/manual/stable/)
- `--write-filename-in-watch-later-config` and watch history are off by default because they may expose private information. [manual](https://mpv.io/manual/stable/)
- The manual text read says "Stream recording is broken." Undo and history of destructive operations: not applicable or not found in the docs. [manual](https://mpv.io/manual/stable/)

## Gaps to test or read next
1. Play a synthetic file, quit with Shift+Q, and inspect the watch_later file: is it readable text, and does it restore after copying to a second machine or newer version?
2. Copy the config and state directories to a clean profile on a different mpv version and compare behavior, including scripts and `input.conf`.
3. Run the same config on v0.40.x and v0.41.0 and list option changes using `DOCS/interface-changes.rst` (not read).
4. Check with a network monitor that a default install makes no connections during local playback and that no update check exists.
5. Read the remaining ~450,000 characters of the manual: playlist formats, `--o` and encoding overwrite, `--dump-cache`, scripts directory, subprocess execution, `--ytdl`.
6. Read the release year from the tag date or `RELEASE_NOTES`, `Copyright` file for licence details, and `contribute.md` for succession or governance.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-11/README.md#mpv); [actual assessment](../../content/directory/mpv.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Watch-later serialization preserves selected options with path-derived filenames and conditional positions, not the full player/configuration/script state. Complete playlists, scripts, media paths and cross-version option meaning have not been restored and compared; the existing durable-state scope cannot be treated as stateless merely to skip E3.
- E5: Not Verified. Resume loading/precedence/mtime and state-deletion branches are concrete controls. They do not establish effective script/subprocess/network authority, output/cache overwrite policy or correction across the configured playback and saved-state workflow.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.
- E2: Not Verified. The former E2 Pass does not establish preservation of the declared saved-state/script/playlist workflow in an independent player. Ordinary media files remain portable, but that narrower fact does not complete the stated profile's migration.

Remaining: Actual playback/cross-machine restore, version-option migration, scripts/subprocess/network observation and output/cache overwrite behavior remain untested. E5 needs script/subprocess/network and output-write policy plus saved-state deletion/recovery boundaries.

Next without a local installation: Inspect synthetic media/playlists/config/scripts/watch-later files with expected paths/options and reference behavior; seek matching external playback/resume/script/output-write observations.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

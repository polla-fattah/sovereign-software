+++
title = "mpv"
category = "Media & Creative"
summary = "Media player that plays local files directly and is configured through plain-text files."
substrate = "Plays the user's own media files; configuration in plain text"
sync_model = "Local command-line and desktop player"
extract_cmd = "cat ~/.config/mpv/mpv.conf"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Actual playback/cross-machine restore, version-option migration, scripts/subprocess/network observation and output/cache overwrite behavior remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence 01a7420cbb4bfcb3ae275b864a8a734c61ee8831"
assessment_notes = "Individually reconciled in rating batch 11 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

[[evidence]]
target = "E1"
text = "mpv uses local media files, playlists, configuration files, scripts, and watch-later state documented in its manual."
url = "https://mpv.io/manual/stable/"
confidence = "high"

[[evidence]]
target = "E2"
text = "Plain playlists and ordinary media files provide a direct exit path, while player-specific state and scripts need compatibility testing."
url = "https://mpv.io/manual/stable/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Watch-later filenames are derived from the media path (or basename with the corresponding option), while contents use readable option=value lines and length-quoted strings. Only configured watch-later options are saved, changed values are selective, and unseekable/unknown-time input does not save a start position. This is not a whole-player configuration backup."
url = "https://github.com/mpv-player/mpv/blob/01a7420cbb4bfcb3ae275b864a8a734c61ee8831/player/configfiles.c"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Playback is local and does not require a provider account."
url = "https://mpv.io/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Resume loading can be disabled and optionally rejects state when media modification time differs; it preserves command-line option precedence when loading the state file. The separate deletion function unlinks watch-later entries and parent redirects. A retained state file is therefore neither an immutable history nor a guaranteed replay on a renamed/moved media path."
url = "https://github.com/mpv-player/mpv/blob/01a7420cbb4bfcb3ae275b864a8a734c61ee8831/player/configfiles.c"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for mpv does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://mpv.io/manual/stable/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for mpv's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/mpv-player/mpv/blob/01a7420cbb4bfcb3ae275b864a8a734c61ee8831/player/configfiles.c"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The essential workflow runs locally and offline."
url = "https://mpv.io/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/mpv-player/mpv/blob/01a7420cbb4bfcb3ae275b864a8a734c61ee8831/player/configfiles.c"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Watch-later serialization preserves selected options with path-derived filenames and conditional positions, not the full player/configuration/script state. Complete playlists, scripts, media paths and cross-version option meaning have not been restored and compared; the existing durable-state scope cannot be treated as stateless merely to skip E3."
url = "https://github.com/mpv-player/mpv/blob/01a7420cbb4bfcb3ae275b864a8a734c61ee8831/player/configfiles.c"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Resume loading/precedence/mtime and state-deletion branches are concrete controls. They do not establish effective script/subprocess/network authority, output/cache overwrite policy or correction across the configured playback and saved-state workflow."
url = "https://github.com/mpv-player/mpv/blob/01a7420cbb4bfcb3ae275b864a8a734c61ee8831/player/configfiles.c"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish preservation of the declared saved-state/script/playlist workflow in an independent player. Ordinary media files remain portable, but that narrower fact does not complete the stated profile's migration."
url = "https://mpv.io/manual/stable/"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: Watch-later filenames are derived from the media path (or basename with the corresponding option), while contents use readable option=value lines and length-quoted strings. Only configured watch-later options are saved, changed values are selective, and unseekable/unknown-time input does not save a start position. This is not a whole-player configuration backup. [Source](https://github.com/mpv-player/mpv/blob/01a7420cbb4bfcb3ae275b864a8a734c61ee8831/player/configfiles.c).
- [x] Resolved: Resume loading can be disabled and optionally rejects state when media modification time differs; it preserves command-line option precedence when loading the state file. The separate deletion function unlinks watch-later entries and parent redirects. A retained state file is therefore neither an immutable history nor a guaranteed replay on a renamed/moved media path. [Source](https://github.com/mpv-player/mpv/blob/01a7420cbb4bfcb3ae275b864a8a734c61ee8831/player/configfiles.c).
- [ ] Open: Actual playback/cross-machine restore, version-option migration, scripts/subprocess/network observation and output/cache overwrite behavior remain untested. E5 needs script/subprocess/network and output-write policy plus saved-state deletion/recovery boundaries.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-11/.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Actual playback/cross-machine restore, version-option migration, scripts/subprocess/network observation and output/cache overwrite behavior remain untested. E5 needs script/subprocess/network and output-write policy plus saved-state deletion/recovery boundaries.

**Next without installing locally:** Inspect synthetic media/playlists/config/scripts/watch-later files with expected paths/options and reference behavior; seek matching external playback/resume/script/output-write observations.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-11/`. Overall: **Insufficient evidence**.

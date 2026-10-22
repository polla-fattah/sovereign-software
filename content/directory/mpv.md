+++
title = "mpv"
category = "Media & Creative"
summary = "Media player that plays local files directly and is configured through plain-text files."
substrate = "Plays the user's own media files; configuration in plain text"
sync_model = "Local command-line and desktop player"
extract_cmd = "cat ~/.config/mpv/mpv.conf"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "partial"
locality = "meets"
transparency = "partial"

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
text = "Configuration and playlist files are human-readable, but watch-later state and script semantics were not independently reconstructed."
url = "https://mpv.io/manual/stable/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Playback is local and does not require a provider account."
url = "https://mpv.io/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Playback is user-directed, but unsafe playlists, scripts, and media access controls were not tested."
url = "https://mpv.io/manual/stable/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Local files, text configuration, and plain playlists support strong control."
url = "https://mpv.io/manual/stable/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Media formats are external to mpv, but player state and scripts remain application-dependent."
url = "https://mpv.io/manual/stable/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The essential workflow runs locally and offline."
url = "https://mpv.io/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The manual documents configuration and security warnings, while script and playlist trust boundaries require testing."
url = "https://mpv.io/manual/stable/"
confidence = "medium"

+++

**Preliminary desk assessment:** mpv is described as media player that plays local files directly and is configured through plain-text files. Its primary preservation surface is Plays the user's own media files; configuration in plain text, with independence shaped by local command-line and desktop player. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

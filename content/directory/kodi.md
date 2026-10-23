+++
title = "Kodi"
category = "Media & Creative"
summary = "Media centre application that plays a local library and keeps its library state in local databases."
substrate = "Media files in folders, with SQLite library databases"
sync_model = "Local application; optional network sources"
extract_cmd = "ls ~/.kodi/userdata/Database"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Watched/resume/artwork round-trip comparison, independent database reading, profile migration/downgrade and observed cleanup/source-removal behavior remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence a097d6978028aef8840b23695a57c606697f156a"
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
text = "Kodi stores settings, add-ons, playlists, databases, artwork, and other user changes in its data folder and documents full-folder backup."
url = "https://kodi.wiki/view/Backup"
confidence = "high"

[[evidence]]
target = "E2"
text = "Kodi exports library metadata to NFO and image files that can be scanned into another installation, but complete migration of settings and add-ons was not tested."
url = "https://kodi.wiki/view/Import-export_library"
confidence = "high"

[[evidence]]
target = "E3"
text = "The export code distinguishes a dated videodb.xml folder with artwork directories from per-item NFO export; import reads that XML and reconstructs source paths only when the scraper add-on exists. The import code explicitly notes scraper settings are not exported. This route is therefore not demonstrated to recreate an entire profile."
url = "https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Kodi runs against local or network media and keeps its user data in operator-controlled paths."
url = "https://kodi.wiki/view/Backup"
confidence = "high"

[[evidence]]
target = "E5"
text = "Library cleanup distinguishes absent files under reachable sources from unavailable source directories. For unavailable sources, silent mode retains entries; interactive mode can ask, while missing files under reachable parents can be removed from the database without asking. This concerns library records/history, not an assertion that Clean Library deletes media bytes."
url = "https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Kodi does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Kodi's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The primary media library can operate locally without a hosted account."
url = "https://kodi.wiki/view/Backup"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Source distinguishes per-item NFO from a dated XML/artwork export and makes reconstruction depend on available scraper add-ons; scraper settings are not exported in that route. Complete watched/resume, profile, settings/add-on and media dependency recovery remains unestablished."
url = "https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Library cleanup treats missing files on reachable sources differently from unavailable sources, with conditional prompts and silent retention. This concerns library records, not automatically media-byte deletion. Effective source/remove/add-on authority and correction of record/history loss remain insufficiently covered."
url = "https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The export code distinguishes a dated videodb.xml folder with artwork directories from per-item NFO export; import reads that XML and reconstructs source paths only when the scraper add-on exists. The import code explicitly notes scraper settings are not exported. This route is therefore not demonstrated to recreate an entire profile. [Source](https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp).
- [x] Resolved: Library cleanup distinguishes absent files under reachable sources from unavailable source directories. For unavailable sources, silent mode retains entries; interactive mode can ask, while missing files under reachable parents can be removed from the database without asking. This concerns library records/history, not an assertion that Clean Library deletes media bytes. [Source](https://github.com/xbmc/xbmc/blob/a097d6978028aef8840b23695a57c606697f156a/xbmc/video/VideoDatabase.cpp).
- [ ] Open: Watched/resume/artwork round-trip comparison, independent database reading, profile migration/downgrade and observed cleanup/source-removal behavior remain untested. E5 needs effective cleanup/source/removal settings, add-on authority and recoverable library/history states; record cleanup and media deletion are distinct.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-11/.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Watched/resume/artwork round-trip comparison, independent database reading, profile migration/downgrade and observed cleanup/source-removal behavior remain untested. E5 needs effective cleanup/source/removal settings, add-on authority and recoverable library/history states; record cleanup and media deletion are distinct.

**Next without installing locally:** Use a synthetic profile/database/NFO/artwork/media-reference packet with expected watched/resume records; inspect it independently and obtain same-version cleanup/source/add-on authority and restoration evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-11/`. Overall: **Insufficient evidence**.

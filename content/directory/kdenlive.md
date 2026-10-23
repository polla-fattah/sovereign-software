+++
title = "Kdenlive"
category = "Media & Creative"
summary = "Video editor that stores projects as XML on top of the MLT framework."
limitations = ["The inspected XML references external media. Readable timelines and implemented path rewriting do not establish asset completeness or render equivalence."]
substrate = "XML project files (.kdenlive) referencing source media"
sync_model = "Local desktop application"
extract_cmd = "grep -c \"<producer\" project.kdenlive"
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit 80b74ffa95390f4cc8d75a4e886e7ff47373583e; Nested-effects project fixture and archive path-rewrite implementation inspected; no rendering"
assessment_notes = "Individually reconciled in rating batch 5 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Resolved: standard XML parsing opened test-nesting-effects.kdenlive, with document version 1.1 and MLT 7.17.0. It exposes 17 playlists, 11 tractors, 17 filters, 8 transitions, and resource references including red.mpg. No video was rendered."
url = "https://github.com/KDE/kdenlive/blob/80b74ffa95390f4cc8d75a4e886e7ff47373583e/tests/dataset/test-nesting-effects.kdenlive"
confidence = "high"

[[evidence]]
target = "E2"
text = "Project archives provide a practical handoff path, but rendered output and interchange fidelity with other video editors were not tested."
url = "https://docs.kdenlive.org/en/project_and_asset_management/file_management/archiving.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Resolved: archivewidget.cpp implements rewriting resource, time-warp resource, proxy, and title URLs through an archive mapping. This identifies how asset paths are handled in source; it does not demonstrate a complete archive/move/restore or preservation of effect behavior."
url = "https://github.com/KDE/kdenlive/blob/80b74ffa95390f4cc8d75a4e886e7ff47373583e/src/project/dialogs/archivewidget.cpp#L964-L1013"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The editing workflow and source assets can be kept on local storage without a hosted account."
url = "https://docs.kdenlive.org/en/project_and_asset_management.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Video editing is user-directed, but overwrite, render approval, and project-sharing hazards were not tested."
url = "https://docs.kdenlive.org/en/project_and_asset_management/file_management.html"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Kdenlive does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/KDE/kdenlive/blob/80b74ffa95390f4cc8d75a4e886e7ff47373583e/src/project/dialogs/archivewidget.cpp#L964-L1013"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Kdenlive's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/KDE/kdenlive/blob/80b74ffa95390f4cc8d75a4e886e7ff47373583e/src/project/dialogs/archivewidget.cpp#L964-L1013"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core editing and archiving workflow is local and does not require a provider."
url = "https://docs.kdenlive.org/en/project_and_asset_management.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://docs.kdenlive.org/en/project_and_asset_management/file_management.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The XML fixture reveals timeline/effect/resource relationships, and archive code rewrites resource/proxy/title paths. It does not include an observed complete dependency archive or independent reconstruction with equivalent keyframes, effects and media. Rendering/interchange and version/crash recovery remain incomplete."
url = "https://github.com/KDE/kdenlive/blob/80b74ffa95390f4cc8d75a4e886e7ff47373583e/src/project/dialogs/archivewidget.cpp#L964-L1013"
confidence = "medium"

[[evidence]]
target = "E5"
text = "User-directed video editing is not sufficient evidence for save/archive overwrite, render/share approval, asset deletion or correction after missing assets and project mutations. The archive-path routine does not cover the consequential-action surface."
url = "https://docs.kdenlive.org/en/project_and_asset_management/file_management.html"
confidence = "medium"

+++

**Assessment update, 23 October 2026:**

- [x] Resolved: A real nested-effects project parses as XML and exposes timeline containers, filters, transitions, and media references.
- [x] Resolved: The archive source implements rewriting of resource, time-warp, proxy, and title paths.
- [ ] Open: Complete archive/move/restore, missing assets, render equivalence, keyframes, OTIO losses, and version/crash recovery. E5 needs asset/save/render/share authorization, inspectable project changes and available correction after destructive edits or overwrite.

**Assessment:** Direct inspection establishes access to the sampled edit structure; source inspection establishes archive path handling. Full migration and recovery remain Not Verified. The overall determination remains **Insufficient evidence**.

**Human-readable criteria:** Can a creator archive source material and editable state, reopen the project after version changes, and export important work in interoperable formats?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Complete archive/move/restore, missing assets, render equivalence, keyframes, OTIO losses, and version/crash recovery. E5 needs asset/save/render/share authorization, inspectable project changes and available correction after destructive edits or overwrite.

**Next without installing locally:** Acquire a complete synthetic project/archive/media packet with expected timeline/keyframes and reference renders or OTIO comparisons; inspect XML/assets and seek same-version save/render/archive control evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-5/`. Overall: **Insufficient evidence**.

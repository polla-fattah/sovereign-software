+++
title = "Zim Desktop Wiki"
category = "Knowledge & Office"
summary = "Desktop wiki that keeps each page as a plain text file in an ordinary folder."
substrate = "Plain-text wiki-markup files in a notebook folder"
sync_model = "Local folder; synchronisation is left to external tools"
extract_cmd = "grep -rl \"keyword\" notebook/"
limitations = ["The XML test container demonstrates readable structure, not a restored native notebook.","Expected Markdown uses checkbox glyphs; another editor may not retain executable task-list semantics.","Permanent deletion and system trash are distinct paths; actual recovery remains unverified."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit d82c631fa20f03764aa336a9357add0cd32714fc; published notebook/format structure, rename links and deletion/trash boundaries"
assessment_notes = "Individually reconciled in rating batch 3 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. 2 further bounded source questions resolved. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Standard XML parsing read 37 named pages and their colon-separated hierarchy and wiki links from the published notebook test container; this XML container is not the native notebook storage format. Separate wiki, parse-tree and expected Markdown fixtures expose formatting and link records. The expected Markdown uses Unicode checkbox glyphs rather than GitHub task-list markers, so plain readability does not imply identical task semantics in another editor."
url = "https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/tests/data/notebook-wiki.xml"
confidence = "high"

[[evidence]]
target = "E2"
text = "move_page defaults update_links to True and calls separate routines to rewrite links from moved pages and links targeting them. The argument can disable this work. This resolves the implemented rename/link-update design, not the outcome for every attachment, ambiguous link, synced copy or interrupted rename."
url = "https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/notebook/notebook.py"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official documentation for this entry provides a relevant independent interpretation and recovery lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://zim-wiki.org/manual/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://zim-wiki.org/manual/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The permanent delete implementation removes the mapped page folder's children and page file. The separate trash implementation uses the system trash helper and raises TrashNotSupportedError when notebook trash is disabled. These paths are not equivalent; neither a permanent delete nor unsupported trash can be assumed recoverable. No actual deletion or trash restore was performed."
url = "https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/notebook/notebook.py"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Zim Desktop Wiki does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/notebook/notebook.py"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Zim Desktop Wiki's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://zim-wiki.org/manual/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://zim-wiki.org/manual/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/gui/uiactions.py"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The 37-page XML object is a test container, not an actual native notebook. Format fixtures and rename-link routines explain parts of interpretation, but no complete notebook with attachments, dates/tags and relocated internal references has been independently reconstructed or its index rebuilt."
url = "https://zim-wiki.org/manual/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Source now establishes separate trash/permanent-delete warnings, affected-file inspection, a link-update choice, unsupported-trash handling and buffer-level undo. Effective platform trash recovery, external/shared-folder changes and export/rename overwrite recourse are not sufficiently covered for the existing notebook scope."
url = "https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/gui/uiactions.py"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish usable migration of the native notebook's hierarchy, attachments, links and task semantics. The published expected Markdown already differs in task markers, and no full independent-workflow comparison is recorded."
url = "https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/notebook/notebook.py"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The GUI supplies separate trash and permanent-delete dialogs, includes an affected-file listing and a link-update choice, and returns a distinct unsupported-trash result. Permanent deletion warns that it cannot be undone. These source paths do not demonstrate system-trash recovery on a particular platform."
url = "https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/gui/uiactions.py"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The page-view undo stack replays recorded text-buffer actions and can stop recording handlers during blocked changes. This is editor-level undo, not a filesystem snapshot or a guarantee of recovery from page-folder deletion and external synchronization."
url = "https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/gui/pageview/undostack.py"
confidence = "medium"

+++

**Assessment update: 23 October 2026**

- [x] Resolved: Standard XML parsing read 37 named pages and their colon-separated hierarchy and wiki links from the published notebook test container; this XML container is not the native notebook storage format. Separate wiki, parse-tree and expected Markdown fixtures expose formatting and link records. The expected Markdown uses Unicode checkbox glyphs rather than GitHub task-list markers, so plain readability does not imply identical task semantics in another editor. [Source](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/tests/data/notebook-wiki.xml).
- [x] Resolved: move_page defaults update_links to True and calls separate routines to rewrite links from moved pages and links targeting them. The argument can disable this work. This resolves the implemented rename/link-update design, not the outcome for every attachment, ambiguous link, synced copy or interrupted rename. [Source](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/notebook/notebook.py).
- [x] Resolved: The permanent delete implementation removes the mapped page folder's children and page file. The separate trash implementation uses the system trash helper and raises TrashNotSupportedError when notebook trash is disabled. These paths are not equivalent; neither a permanent delete nor unsupported trash can be assumed recoverable. No actual deletion or trash restore was performed. [Source](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/notebook/notebook.py).
- [ ] Open: A complete native notebook move/export with attachments and link resolution; index rebuild after removing .zim, actual trash recovery, shared-folder conflicts, cross-version Markdown pages and network behavior. E5 also needs effective trash/fallback and rename/export overwrite behavior, external-edit handling and restoration boundaries; text-buffer undo does not restore deleted folders.

**Assessment:** The checked findings above now inform this application's evidence and limitations. They resolve the stated questions, not complete recovery, migration or eligibility. Reproduction details and retained inputs are recorded in evidence/third-pass/batch-4/. The overall determination remains **Insufficient evidence** for the remaining requirements.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

- [x] Resolved: The GUI supplies separate trash and permanent-delete dialogs, includes an affected-file listing and a link-update choice, and returns a distinct unsupported-trash result. Permanent deletion warns that it cannot be undone. These source paths do not demonstrate system-trash recovery on a particular platform. [Pinned source](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/gui/uiactions.py).
- [x] Resolved: The page-view undo stack replays recorded text-buffer actions and can stop recording handlers during blocked changes. This is editor-level undo, not a filesystem snapshot or a guarantee of recovery from page-folder deletion and external synchronization. [Pinned source](https://github.com/zim-desktop-wiki/zim-desktop-wiki/blob/d82c631fa20f03764aa336a9357add0cd32714fc/zim/gui/pageview/undostack.py).

**Remaining:** A complete native notebook move/export with attachments and link resolution; index rebuild after removing .zim, actual trash recovery, shared-folder conflicts, cross-version Markdown pages and network behavior. E5 also needs effective trash/fallback and rename/export overwrite behavior, external-edit handling and restoration boundaries; text-buffer undo does not restore deleted folders.

**Next without installing locally:** Collect a native synthetic notebook with notebook.zim, page files and attachment hashes, then reconstruct its links/metadata independently; obtain version/platform-matched trash/rename/undo observations or comprehensive source coverage.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-3/`. Overall: **Insufficient evidence**.

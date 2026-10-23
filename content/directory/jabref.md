+++
title = "JabRef"
category = "Research & Education"
summary = "Reference manager built directly on BibTeX and BibLaTeX files."
limitations = ["Group definitions use JabRef metadata comments. File fields store escaped links and optional source URLs, not the linked file bytes."]
substrate = "BibTeX and BibLaTeX plain-text files (.bib)"
sync_model = "Local files; versioning and sync left to external tools"
extract_cmd = "grep -c '^@' library.bib"
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit 1e2e9a089986e317cd7f82f4c0114b8950164925; BibTeX grouping fixture and group/file-field serializers inspected"
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
text = "Resolved: the retained BibTeX fixture exposes two bibliographic records and a jabref-meta grouping comment with the root and four named groups. Group depths identify Papers with 2024 and Machine Learning children. This is text inspection, not a complete BibTeX parser or group-membership round trip."
url = "https://github.com/JabRef/jabref/blob/1e2e9a089986e317cd7f82f4c0114b8950164925/jabsrv/src/test/resources/org/jabref/http/server/groups-server-test.bib"
confidence = "high"

[[evidence]]
target = "E2"
text = "The application and command line support exporting libraries and selected entries to BibTeX and other formats, enabling a practical exit path."
url = "https://docs.jabref.org/advanced/commandline"
confidence = "high"

[[evidence]]
target = "E3"
text = "Resolved: FileFieldWriter encodes description, link, file type, and optional source URL with colon/semicolon delimiters and backslash escaping. GroupSerializer records depth and recursively serializes children. The representations are available, while linked-file existence, migration, and full restoration remain unverified."
url = "https://github.com/JabRef/jabref/blob/1e2e9a089986e317cd7f82f4c0114b8950164925/jablib/src/main/java/org/jabref/logic/bibtex/FileFieldWriter.java"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The core library is stored in local files and can be used without a hosted account, while optional web fetchers are separate conveniences."
url = "https://docs.jabref.org/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Bibliography management is user-directed, but automated metadata fetching and citation consequences were not tested for review or correction safeguards."
url = "https://docs.jabref.org/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for JabRef does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://docs.jabref.org/advanced/commandline"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for JabRef's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/JabRef/jabref/blob/1e2e9a089986e317cd7f82f4c0114b8950164925/jablib/src/main/java/org/jabref/logic/bibtex/FileFieldWriter.java"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The primary library workflow is local-file-based and does not require a central service."
url = "https://docs.jabref.org/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://docs.jabref.org/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The BibTeX sample exposes records/group hierarchy and serializers document escaped file fields and recursive group depth. Complete memberships, custom fields/types and existing linked-file relocation have not been reconstructed with an independent reader. Bibliographic text readability alone does not cover the original research profile."
url = "https://github.com/JabRef/jabref/blob/1e2e9a089986e317cd7f82f4c0114b8950164925/jablib/src/main/java/org/jabref/logic/bibtex/FileFieldWriter.java"
confidence = "medium"

[[evidence]]
target = "E5"
text = "User-directed editing and inspectable BibTeX are not complete safeguards for automatic metadata replacement, file rename/move/delete, merge operations and citation changes. The collected grouping/file-field evidence does not sufficiently establish authorization, visible diffs and correction for those operations."
url = "https://docs.jabref.org/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The prior E2 Pass does not establish independent-workflow preservation of essential group memberships, custom metadata and linked files. Exposing serializer formats or a command-line export is not that migration comparison."
url = "https://docs.jabref.org/advanced/commandline"
confidence = "medium"

+++

**Assessment update, 23 October 2026:**

- [x] Resolved: A real BibTeX fixture exposes the root and four named groups, including two nested children under Papers.
- [x] Resolved: The source specifies associated-file encoding, including escaping and the optional source URL.
- [ ] Open: Entry memberships, custom types/fields, other readers' handling of metadata comments, linked-file relocation, and cross-version recovery. E5 needs metadata-fetch/merge/file-operation review, visible changes and rollback or recourse for the configured library.

**Assessment:** The selected library's group definitions and the associated-file representation are independently inspectable. These are resolved storage questions; complete library and attachment recovery remains Not Verified. The overall determination remains **Insufficient evidence**.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Entry memberships, custom types/fields, other readers' handling of metadata comments, linked-file relocation, and cross-version recovery. E5 needs metadata-fetch/merge/file-operation review, visible changes and rollback or recourse for the configured library.

**Next without installing locally:** Use a populated synthetic BibTeX library and actual linked-file tree with expected groups/memberships; independently parse it and seek version-matched automated-metadata, merge and file-operation control evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-5/`. Overall: **Insufficient evidence**.

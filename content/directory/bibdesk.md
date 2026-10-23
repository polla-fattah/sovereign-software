+++
title = "BibDesk"
category = "Research & Education"
summary = "macOS bibliography manager that uses BibTeX files as its native format."
substrate = "BibTeX plain-text files (.bib)"
sync_model = "Local files; macOS only"
extract_cmd = "grep -c '^@' library.bib"
limitations = ["A readable group representation does not establish retention by other bibliography managers.","Linked-file encodings reference separate documents and can include platform-specific bookmark/alias data."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Official Subversion source r30791"
assessment_notes = "Individually reconciled in rating batch 7 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "BibDesk uses BibTeX files as its native library format, giving the user a directly accessible text record."
url = "https://sourceforge.net/projects/bibdesk/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The static-group dictionary representation stores an escaped group name and a comma-joined list of publication cite keys, deduplicating keys as it builds the list. This exposes how group membership can be represented independently; it does not establish that another BibTeX editor retains the group dictionary or that smart-group queries round-trip."
url = "https://svn.code.sf.net/p/bibdesk/svn/!svn/bc/30791/trunk/bibdesk/BDSKStaticGroup.m"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The linked-file reader recognizes Base64 binary-plist data and extracts bookmark or legacy aliasData plus relativePath; a non-plist value is treated as a relative path. These are links and macOS bookmark/alias data, not attached-document payloads. Preserving a bibliographic record alone does not establish that the referenced files move or remain resolvable on another platform."
url = "https://svn.code.sf.net/p/bibdesk/svn/!svn/bc/30791/trunk/bibdesk/BDSKLinkedFile.m"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The documented workflow is local and macOS-based; it does not require a continuing vendor account for existing .bib files."
url = "https://sourceforge.net/projects/bibdesk/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Bibliographic editing is inspectable through the text file, but attachment links, cite-key generation, and destructive edits require hands-on review."
url = "https://sourceforge.net/p/bibdesk/wiki/FAQ/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for BibDesk does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://svn.code.sf.net/p/bibdesk/svn/!svn/bc/30791/trunk/bibdesk/BDSKLinkedFile.m"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for BibDesk's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://svn.code.sf.net/p/bibdesk/svn/!svn/bc/30791/trunk/bibdesk/BDSKLinkedFile.m"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The library is edited locally and does not inherently require a network service."
url = "https://sourceforge.net/projects/bibdesk/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://sourceforge.net/p/bibdesk/wiki/FAQ/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The static-group representation exposes membership cite keys, but linked-file data can contain macOS bookmarks/aliases and paths rather than document payloads. A real populated bibliography, smart groups, relocated files and compatible reader have not been reconstructed and compared."
url = "https://svn.code.sf.net/p/bibdesk/svn/!svn/bc/30791/trunk/bibdesk/BDSKLinkedFile.m"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Inspectable BibTeX does not establish authorization or correction for generated cite keys, attachment relocation/deletion, automated metadata and destructive edits. The group/link serializer evidence does not cover those consequential operations or their effective macOS configuration."
url = "https://sourceforge.net/p/bibdesk/wiki/FAQ/"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The static-group dictionary representation stores an escaped group name and a comma-joined list of publication cite keys, deduplicating keys as it builds the list. This exposes how group membership can be represented independently; it does not establish that another BibTeX editor retains the group dictionary or that smart-group queries round-trip. [Source](https://svn.code.sf.net/p/bibdesk/svn/!svn/bc/30791/trunk/bibdesk/BDSKStaticGroup.m).
- [x] Resolved: The linked-file reader recognizes Base64 binary-plist data and extracts bookmark or legacy aliasData plus relativePath; a non-plist value is treated as a relative path. These are links and macOS bookmark/alias data, not attached-document payloads. Preserving a bibliographic record alone does not establish that the referenced files move or remain resolvable on another platform. [Source](https://svn.code.sf.net/p/bibdesk/svn/!svn/bc/30791/trunk/bibdesk/BDSKLinkedFile.m).
- [ ] Open: A real .bib with groups and linked files parsed/re-saved by independent tools, smart-group preservation, actual path relocation, macOS-version compatibility and complete document recovery. E5 needs attachment and cite-key mutation controls, automatic metadata review and available correction in the assessed macOS workflow.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-6/.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** A real .bib with groups and linked files parsed/re-saved by independent tools, smart-group preservation, actual path relocation, macOS-version compatibility and complete document recovery. E5 needs attachment and cite-key mutation controls, automatic metadata review and available correction in the assessed macOS workflow.

**Next without installing locally:** Use a synthetic populated bibliography with group definitions and actual file dependencies; parse it and decode supported link records independently, then obtain macOS/version-matched metadata/file/undo evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-7/`. Overall: **Insufficient evidence**.

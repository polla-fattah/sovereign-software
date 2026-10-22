+++
title = "BibDesk"
category = "Research & Education"
summary = "macOS bibliography manager that uses BibTeX files as its native format."
substrate = "BibTeX plain-text files (.bib)"
sync_model = "Local files; macOS only"
extract_cmd = "grep -c '^@' library.bib"
limitations = ["Runs on macOS only."]
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "BibDesk uses BibTeX files as its native library format, giving the user a directly accessible text record."
url = "https://sourceforge.net/projects/bibdesk/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "BibTeX is supported by other bibliography tools, but migration of attached files, custom fields, and cite-key behavior was not tested."
url = "https://sourceforge.net/p/bibdesk/wiki/FAQ/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The text format is independently readable, but a complete restoration including attachments and application-specific metadata was not demonstrated."
url = "https://sourceforge.net/p/bibdesk/wiki/FAQ/"
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
text = "The native BibTeX file supports user custody and exit, while macOS dependence and untested attachment migration limit the finding."
url = "https://sourceforge.net/projects/bibdesk/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "BibTeX supports durable text preservation, but the full meaning of a library may include PDFs, metadata, and path relationships not tested here."
url = "https://sourceforge.net/p/bibdesk/wiki/FAQ/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The library is edited locally and does not inherently require a network service."
url = "https://sourceforge.net/projects/bibdesk/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The source file is inspectable, but application behavior around cite keys and linked files remains partly unverified."
url = "https://sourceforge.net/p/bibdesk/wiki/FAQ/"
confidence = "medium"
+++

**Preliminary desk assessment:** BibDesk is described as macos bibliography manager that uses bibtex files as its native format. Its primary preservation surface is BibTeX plain-text files (.bib), with independence shaped by local files; macos only. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

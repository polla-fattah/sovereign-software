+++
title = "JabRef"
category = "Research & Education"
summary = "Reference manager built directly on BibTeX and BibLaTeX files."
substrate = "BibTeX and BibLaTeX plain-text files (.bib)"
sync_model = "Local files; versioning and sync left to external tools"
extract_cmd = "grep -c '^@' library.bib"
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
text = "JabRef keeps bibliography libraries in BibTeX or biblatex files and documents native support for opening and saving those formats."
url = "https://docs.jabref.org/v5/cite/bibtex-and-biblatex"
confidence = "high"

[[evidence]]
target = "E2"
text = "The application and command line support exporting libraries and selected entries to BibTeX and other formats, enabling a practical exit path."
url = "https://docs.jabref.org/advanced/commandline"
confidence = "high"

[[evidence]]
target = "E3"
text = "BibTeX is independently readable and JabRef can export to other formats, but preservation of groups, linked files, and custom fields was not restored and compared here."
url = "https://docs.jabref.org/advanced/commandline"
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
text = "Native BibTeX storage, local files, and documented export provide strong user control; linked-file portability remains to be tested."
url = "https://docs.jabref.org/v5/cite/bibtex-and-biblatex"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "BibTeX is a durable interchange format, but JabRef-specific groups, preferences, and attachments may need additional preservation artifacts."
url = "https://docs.jabref.org/advanced/commandline"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The primary library workflow is local-file-based and does not require a central service."
url = "https://docs.jabref.org/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The command-line interface and export filters are documented, but metadata provenance and online lookup review remain unverified."
url = "https://docs.jabref.org/advanced/commandline"
confidence = "medium"

+++

**Preliminary desk assessment:** JabRef is described as reference manager built directly on bibtex and biblatex files. Its primary preservation surface is BibTeX and BibLaTeX plain-text files (.bib), with independence shaped by local files; versioning and sync left to external tools. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user preserve records, structure, media, and provenance, restore them independently, and move to another tool without losing meaning?

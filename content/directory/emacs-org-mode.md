+++
title = "Emacs Org-Mode"
category = "Knowledge & Office"
summary = "The grand-ancestor of sovereign personal computing. Unifies structured prose, deterministic agendas, tables, and literate programming inside immortal plain text."
substrate = "Plain-Text .org Outlines"
sync_model = "Git / rsync / Syncthing"
extract_cmd = "emacs --batch file.org -f org-html-export-to-html"
pilot_stage = 1
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Org documents are plain text and can be opened with general-purpose tools."
url = "https://orgmode.org/org.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Org exports to HTML, LaTeX, ODT, PDF, and plain text, but preservation of every extension and executable block across other tools was not tested."
url = "https://orgmode.org/worg/exporters/index.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Text files and documented syntax support independent recovery, while links, includes, Babel results, and external assets require a complete archive test."
url = "https://orgmode.org/manual/Export-Settings.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Editing and export are local operations and do not require a vendor service."
url = "https://orgmode.org/org.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Org’s source text and export process are inspectable, but executable code blocks and hooks can introduce consequential behavior requiring explicit review."
url = "https://orgmode.org/org.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Plain-text source and broad export support give users strong custody and exit."
url = "https://orgmode.org/worg/exporters/index.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Text syntax is durable, but complete meaning can depend on included files, links, extensions, and executable code."
url = "https://orgmode.org/manual/Export-Settings.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core editing, agenda, and export workflows operate locally."
url = "https://orgmode.org/org.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The source is inspectable, but evaluation of code execution, hooks, and automated edits remains incomplete."
url = "https://orgmode.org/org.html"
confidence = "medium"
+++

**Verification scenario:** Open an Org archive in a clean Emacs and an independent parser; validate Babel code, agenda, ID links, and attachment paths.

**What may invalidate an overconfident claim:** Text syntax alone does not preserve arbitrary executable blocks and extensions.

**Documentation starting point:** <https://orgmode.org/manual/>

**Preliminary desk assessment:** Emacs Org-Mode is described as the grand-ancestor of sovereign personal computing. unifies structured prose, deterministic agendas, tables, and literate programming inside immortal plain text. Its primary preservation surface is Plain-Text .org Outlines, with independence shaped by git / rsync / syncthing. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

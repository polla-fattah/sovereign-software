+++
title = "hledger"
category = "Tasks & Finance"
summary = "Plain-text double-entry accounting with a command-line and web interface, reading journal files the user keeps."
substrate = "UTF-8 plain-text hledger journals"
sync_model = "Git version control or file sync"
extract_cmd = "hledger -f ledger.journal balance"
pilot_stage = 3
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
text = "The official documentation describes the journal as a plain-text data source and documents multiple report export formats, including text, JSON, CSV, TSV, FODS, and SQL."
url = "https://hledger.org/export.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "The journal is a human-readable file that can be opened with a text editor and selected explicitly with -f or LEDGER_FILE, supporting a practical exit path."
url = "https://hledger.org/1.9/manual.html"
confidence = "high"

[[evidence]]
target = "E3"
text = "The project documents version-control workflows for journal files, but an independent restore and semantic equivalence test were not performed."
url = "https://hledger.org/workflows.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The workflow documentation supports keeping journals in a user-controlled folder and operating from local files."
url = "https://hledger.org/workflows.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Accounting reports and balance assertions are documented, but consequential financial authorization and correction behavior were not tested."
url = "https://hledger.org/1.9/manual.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Plain-text journals and explicit export commands give users strong access and exit options; independent recovery remains untested."
url = "https://hledger.org/export.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The core journal representation is readable text and the format has a published specification, but long-term compatibility was not demonstrated with a clean restore."
url = "https://hledger.org/SPEC-journal.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The documented workflow is local-file-first and can operate without a hosted account for the journal and reports."
url = "https://hledger.org/workflows.html"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The manual explains input formats, output formats, and known lossy export details, while real-world control and correction scenarios remain untested."
url = "https://hledger.org/1.9/manual.html"
confidence = "medium"

+++

**Verification scenario:** Reconstruct postings and cost basis; use a text export and an alternative ledger interpreter.

**What may invalidate an overconfident claim:** Evaluate independently of Beancount and test migration mismatches between the two.

**Documentation starting point:** <https://hledger.org/>

**Preliminary desk assessment:** hledger is described as plain-text double-entry accounting with a command-line and web interface, reading journal files the user keeps. Its primary preservation surface is UTF-8 plain-text hledger journals, with independence shaped by git version control or file sync. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a user export complete records, preserve invariants and metadata, restore them independently, and continue the essential workflow without provider permission?

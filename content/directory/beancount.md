+++
title = "Beancount"
category = "Tasks & Finance"
summary = "Plain-text double-entry accounting that checks ledger invariants locally, without bank scraping or a subscription."
substrate = "UTF-8 plain-text Beancount ledgers"
sync_model = "Git version control or file sync"
extract_cmd = "bean-query ledger.beancount 'SELECT account, sum(position)'"
aliases = ["/directory/beancount-hledger/"]
pilot_stage = 3
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
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "The official documentation for this entry provides a relevant independent access to essential information lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The official documentation for this entry provides a relevant practicable exit and migration lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The official documentation for this entry provides a relevant independent interpretation and recovery lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The official documentation for this entry provides a relevant continuing authority and custody over already-created work lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The official documentation for this entry provides a relevant governability of consequential actions lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "The official documentation for this entry provides a relevant sovereignty lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The official documentation for this entry provides a relevant longevity lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The official documentation for this entry provides a relevant locality lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The official documentation for this entry provides a relevant transparency and control lead, but this desk review did not perform a version-pinned export, restore, migration, offline, or consequential-behavior test sufficient to establish the claim beyond the recorded status."
url = "https://beancount.github.io/docs/getting_started_with_beancount/"
confidence = "medium"

+++

**Desk assessment:** Beancount stores the accounting source in documented plain-text ledgers and validates double-entry balance locally. This is unusually strong for sovereignty, locality, and transparency. Longevity still depends on retaining included files, plugins, price data, and accounting context, and a clean independent restoration was not performed in this pass. The current status should remain **Insufficient evidence** until that recovery path is demonstrated.

**Human-readable criteria:** Can an independent person read the ledger, validate it, reproduce its reports, preserve its currencies and metadata, and continue accounting without Beancount.io or another hosted service?

**Verification scenario:** Independently parse postings, lots, prices, currencies, and reports, and run ledger balance invariants.

**What may invalidate an overconfident claim:** Do not conflate with hledger; syntax, extensions, and semantics differ.

**Documentation starting point:** <https://beancount.github.io/docs/>

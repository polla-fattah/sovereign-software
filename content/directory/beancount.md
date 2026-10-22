+++
title = "Beancount"
category = "Tasks & Finance"
summary = "Plain-text double-entry accounting that checks ledger invariants locally, without bank scraping or a subscription."
substrate = "UTF-8 plain-text Beancount ledgers"
sync_model = "Git version control or file sync"
extract_cmd = "bean-query ledger.beancount 'SELECT account, sum(position)'"
aliases = ["/directory/beancount-hledger/"]
pilot_stage = 3
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Independently parse postings, lots, prices, currencies, and reports, and run ledger balance invariants.

**What may invalidate an overconfident claim:** Do not conflate with hledger; syntax, extensions, and semantics differ.

**Documentation starting point:** <https://beancount.github.io/docs/>

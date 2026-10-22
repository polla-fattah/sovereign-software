+++
title = "hledger"
category = "Tasks & Finance"
summary = "Plain-text double-entry accounting with a command-line and web interface, reading journal files the user keeps."
substrate = "UTF-8 plain-text hledger journals"
sync_model = "Git version control or file sync"
extract_cmd = "hledger -f ledger.journal balance"
pilot_stage = 3
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Reconstruct postings and cost basis; use a text export and an alternative ledger interpreter.

**What may invalidate an overconfident claim:** Evaluate independently of Beancount and test migration mismatches between the two.

**Documentation starting point:** <https://hledger.org/>

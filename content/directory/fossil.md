+++
title = "Fossil SCM"
category = "VCS & Core"
summary = "Engineered by the creator of SQLite. Packages version control, tickets, bug tracking, and wiki documentation into one durable SQLite file that runs an instant local web UI that works offline."
substrate = "Single Standalone SQLite Database File"
sync_model = "Peer-to-peer HTTP/SSH sync"
extract_cmd = "fossil ui repository.fossil"
pilot_stage = 5
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Clone a repository, transfer wiki, tickets, users, and attachments, and operate without the origin server.

**What may invalidate an overconfident claim:** Check what `fossil ui` demonstrates versus a portable full export.

**Documentation starting point:** <https://fossil-scm.org/home/doc/trunk/www/index.wiki>

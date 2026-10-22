+++
title = "SQLite"
category = "VCS & Core"
summary = "Library of Congress permanent archival standard. Delivers microsecond local queries with zero server daemons, zero configuration, and guaranteed backward compatibility through 2050."
substrate = "Single Cross-Platform B-Tree Disk File"
sync_model = "Local Embedded Engine (Zero Network)"
extract_cmd = "sqlite3 data.db .dump > archive.sql"
pilot_stage = 1
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Use a versioned sample schema; test online backup, dump and restore, an independent parser, and WAL-inclusive recovery.

**What may invalidate an overconfident claim:** The format documentation is strong, but SQLite does not guarantee the semantics of each application's schema.

**Documentation starting point:** <https://sqlite.org/onefile.html>

+++
title = "Todo.txt"
category = "Tasks & Finance"
summary = "The simplest possible task format: one line per task, with priority, project and context markers readable by any text tool."
substrate = "Single plain-text file, one task per line"
sync_model = "Git / Syncthing"
extract_cmd = "grep '^(A)' todo.txt"
pilot_stage = 1
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Move the file to another implementation and verify priorities, completion, and extension tags.

**What may invalidate an overconfident claim:** Text portability is strong, but conventions for recurrence, dates, and application-specific semantics vary.

**Documentation starting point:** <https://github.com/todotxt/todo.txt>

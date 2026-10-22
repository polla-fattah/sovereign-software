+++
title = "Taskwarrior"
category = "Tasks & Finance"
summary = "Command-line task manager with deterministic date and priority grammars and a complete JSON export, kept separate from long-form notes."
substrate = "Local task database with open JSON export"
sync_model = "Local hooks / sync server / Syncthing"
extract_cmd = "task export > commitments.json"
pilot_stage = 3
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Export and import recurring tasks, annotations, user-defined attributes, dependencies, and completion history; restore into a clean profile.

**What may invalidate an overconfident claim:** A JSON export alone may not preserve every configuration, hook, or synchronisation state.

**Documentation starting point:** <https://taskwarrior.org/docs/>

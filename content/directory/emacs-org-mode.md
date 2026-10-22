+++
title = "Emacs Org-Mode"
category = "Knowledge & Office"
summary = "The grand-ancestor of sovereign personal computing. Unifies structured prose, deterministic agendas, tables, and literate programming inside immortal plain text."
substrate = "Plain-Text .org Outlines"
sync_model = "Git / rsync / Syncthing"
extract_cmd = "emacs --batch file.org -f org-html-export-to-html"
pilot_stage = 1
legacy_tier = "Tier 1"
legacy_label = "Tier 1 • Canonical"
+++

**Verification scenario:** Open an Org archive in a clean Emacs and an independent parser; validate Babel code, agenda, ID links, and attachment paths.

**What may invalidate an overconfident claim:** Text syntax alone does not preserve arbitrary executable blocks and extensions.

**Documentation starting point:** <https://orgmode.org/manual/>

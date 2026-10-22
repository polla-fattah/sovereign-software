+++
title = "Moodle (self-hosted)"
category = "Research & Education"
summary = "Learning management system that an institution can host itself, with course backup files."
substrate = "Relational database plus course backup archives (.mbz)"
sync_model = "Self-hosted server; course backups restore to another instance"
extract_cmd = "tar -tzf course.mbz | head"
limitations = ["Needs server administration, and a self-hosted deployment is a different assessed scope from a hosted one."]
+++

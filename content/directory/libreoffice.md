+++
title = "LibreOffice (ODF)"
category = "Knowledge & Office"
summary = "Full desktop office suite running 100% offline. Native files are standard zip containers holding documented XML (`content.xml`) extractable with basic POSIX unzip."
substrate = "ISO/IEC 26300 OpenDocument XML (.odt/.ods)"
sync_model = "Local Filesystem"
extract_cmd = "unzip -p document.odt content.xml | xmllint --format -"
limitations = ["Fidelity of complex documents (tracked changes, formulas, embedded objects, macros) can vary between applications and versions."]
pilot_stage = 2
legacy_tier = "Tier 2"
legacy_label = "Tier 2 • Sovereign Core"
+++

**Verification scenario:** Round-trip documents with tracked changes, formulas, comments, embedded objects, and scripts in an independent ODF reader.

**What may invalidate an overconfident claim:** Complex document fidelity varies; launch time and suite size are not sovereignty criteria.

**Documentation starting point:** <https://www.libreoffice.org/discover/what-is-opendocument/>

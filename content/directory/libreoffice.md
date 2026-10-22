+++
title = "LibreOffice (ODF)"
category = "Knowledge & Office"
summary = "Full desktop office suite running 100% offline. Native files are standard zip containers holding documented XML (`content.xml`) extractable with basic POSIX unzip."
substrate = "ISO/IEC 26300 OpenDocument XML (.odt/.ods)"
sync_model = "Local Filesystem"
extract_cmd = "unzip -p document.odt content.xml | xmllint --format -"
limitations = ["A large suite with a slow start. Its ODF file format is open."]
legacy_tier = "Tier 2"
legacy_label = "Tier 2 • Sovereign Core"
+++

+++
title = "LibreOffice (ODF)"
category = "Knowledge & Office"
summary = "Full desktop office suite running 100% offline. Native files are standard zip containers holding documented XML (`content.xml`) extractable with basic POSIX unzip."
substrate = "ISO/IEC 26300 OpenDocument XML (.odt/.ods)"
sync_model = "Local Filesystem"
extract_cmd = "unzip -p document.odt content.xml | xmllint --format -"
limitations = ["Fidelity of complex documents (tracked changes, formulas, embedded objects, macros) can vary between applications and versions."]
pilot_stage = 2
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "LibreOffice uses standardized OpenDocument files and documents export to PDF, EPUB, and other formats."
url = "https://help.libreoffice.org/latest/en-GB/text/shared/00/00000021.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "It opens and saves Microsoft Office formats and exports to common interchange formats, though formatting loss is explicitly possible."
url = "https://help.libreoffice.org/latest/en-US/text/shared/guide/ms_user.html"
confidence = "high"

[[evidence]]
target = "E3"
text = "ODF is a ZIP package containing XML files and can be inspected independently, but complete feature round-trip across formats was not tested."
url = "https://help.libreoffice.org/latest/en-GB/text/shared/00/00000021.html"
confidence = "high"

[[evidence]]
target = "E4"
text = "Documents can be saved to local paths or user-selected network locations without requiring a hosted account."
url = "https://help.libreoffice.org/latest/en-US/text/shared/guide/doc_save.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Office work is user-directed, but macros, external links, document permissions, and review controls were not assessed."
url = "https://help.libreoffice.org/latest/en-US/text/shared/01/01070000.html"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "OpenDocument and multiple export paths provide strong control and exit options, with compatibility caveats made visible."
url = "https://help.libreoffice.org/latest/en-GB/text/shared/00/00000021.html"
confidence = "high"

[[evidence]]
target = "longevity"
text = "ODF is standardized, XML-based, and inspectable, while external formats can lose features."
url = "https://help.libreoffice.org/latest/en-US/text/shared/guide/doc_save.html"
confidence = "high"

[[evidence]]
target = "locality"
text = "The office workflow can run and store documents locally."
url = "https://help.libreoffice.org/latest/en-US/text/shared/guide/doc_save.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The help system explicitly warns about formatting loss and documents backups and recovery, but macro and external-content risks need testing."
url = "https://help.libreoffice.org/latest/ug/text/shared/guide/doc_autosave.html"
confidence = "medium"

+++

**Verification scenario:** Round-trip documents with tracked changes, formulas, comments, embedded objects, and scripts in an independent ODF reader.

**What may invalidate an overconfident claim:** Complex document fidelity varies; launch time and suite size are not sovereignty criteria.

**Documentation starting point:** <https://www.libreoffice.org/discover/what-is-opendocument/>

**Preliminary desk assessment:** LibreOffice (ODF) is described as full desktop office suite running 100% offline. native files are standard zip containers holding documented xml (`content.xml`) extractable with basic posix unzip. Its primary preservation surface is ISO/IEC 26300 OpenDocument XML (.odt/.ods), with independence shaped by local filesystem. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

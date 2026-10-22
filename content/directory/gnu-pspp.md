+++
title = "GNU PSPP"
category = "Scientific Computing & GIS"
summary = "Statistical analysis program that reads and writes SPSS data files and uses a text syntax."
substrate = "SPSS .sav data files and plain-text syntax files"
sync_model = "Local installation"
extract_cmd = "pspp-convert data.sav data.csv"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "pass"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "meets"
longevity = "partial"
locality = "meets"
transparency = "meets"

[[evidence]]
target = "E1"
text = "PSPP documents syntax files, data files, system files, and text-based portable files for storing dictionaries and cases."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Portable files and CSV output provide practical interchange, though preservation of every statistical attribute and procedure result was not tested."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Syntax and portable files are independently readable, but a complete restore with labels, missing values, and custom attributes was not performed."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Data preparation, analysis, and output generation are local operations."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Syntax files make transformations inspectable and reproducible, while statistical interpretation and output validation remain human responsibilities."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "User-controlled syntax and data files provide strong custody and exit."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Text syntax and portable files support preservation, but binary system files and statistical metadata require format-specific testing."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The complete analysis workflow operates locally."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Transformations and analyses are expressed in syntax, making consequential data changes reviewable."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"
+++

**Preliminary desk assessment:** GNU PSPP is described as statistical analysis program that reads and writes spss data files and uses a text syntax. Its primary preservation surface is SPSS .sav data files and plain-text syntax files, with independence shaped by local installation. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an independent party reproduce the analysis from preserved data, code, units, dependencies, and provenance, and exchange results without hidden loss?

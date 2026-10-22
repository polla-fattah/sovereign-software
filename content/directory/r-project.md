+++
title = "R"
category = "Scientific Computing & GIS"
summary = "Language and environment for statistical computing, with scripts and data in plain text or documented serialisation formats."
substrate = "R scripts, CSV, and RDS serialised objects"
sync_model = "Local installation with package repositories"
extract_cmd = "Rscript -e 'str(readRDS(\"data.rds\"))'"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "partial"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "R projects use source scripts and data files, while renv records package dependencies in a lockfile."
url = "https://rstudio.github.io/renv/index.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "renv restores exact package versions from a lockfile, but R, system libraries, compilers, and Pandoc remain outside its scope."
url = "https://rstudio.github.io/renv/articles/renv"
confidence = "high"

[[evidence]]
target = "E3"
text = "Project source and lockfiles are inspectable and reproducible, but a clean cross-platform restoration was not performed."
url = "https://rstudio.github.io/renv/cheatsheets/html/renv.html"
confidence = "high"

[[evidence]]
target = "E4"
text = "R projects can run locally and use local files and libraries."
url = "https://rstudio.github.io/renv/index.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Statistical results can inform consequential decisions, but data provenance, model validation, and review controls were not tested."
url = "https://rstudio.github.io/renv/articles/renv"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Source code, data, and dependency lockfiles support control, while system-level dependencies remain material."
url = "https://rstudio.github.io/renv/articles/renv"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Text scripts and lockfiles aid preservation, but exact R and system environments need explicit capture."
url = "https://rstudio.github.io/renv/articles/renv"
confidence = "high"

[[evidence]]
target = "locality"
text = "R analysis can run locally and offline once dependencies are available."
url = "https://rstudio.github.io/renv/index.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "renv clearly documents what it reproduces and what it does not, while analytical oversight remains outside the tool."
url = "https://rstudio.github.io/renv/articles/renv"
confidence = "high"

+++

**Preliminary desk assessment:** R is described as language and environment for statistical computing, with scripts and data in plain text or documented serialisation formats. Its primary preservation surface is R scripts, CSV, and RDS serialised objects, with independence shaped by local installation with package repositories. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an independent party reproduce the analysis from preserved data, code, units, dependencies, and provenance, and exchange results without hidden loss?

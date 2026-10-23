+++
title = "R"
category = "Scientific Computing & GIS"
summary = "Language and environment for statistical computing, with scripts and data in plain text or documented serialisation formats."
substrate = "R scripts, CSV, and RDS serialised objects"
sync_model = "Local installation with package repositories"
extract_cmd = "Rscript -e 'str(readRDS(\"data.rds\"))'"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Factor/date/attribute/NA round trips, a non-R reader, older-release trials, package-library upgrades and workspace overwrite recovery remain untested."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence c267ebb7f9720154535e63642c25a5d91d5f512d"
assessment_notes = "Individually reconciled in rating batch 10 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
locality = "meets"

[[evidence]]
target = "E1"
text = "R projects use source scripts and data files, while renv records package dependencies in a lockfile."
url = "https://rstudio.github.io/renv/index.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "The full readRDS documentation explains that infoRDS reports representation/reader metadata but cannot establish file validity, and explicitly cautions against treating bare RDS as a machine-interchange format. Native-endian serialization and newer compression introduce additional dependencies; cross-tool and CSV preservation remain separate questions."
url = "https://github.com/r-devel/r-svn/blob/c267ebb7f9720154535e63642c25a5d91d5f512d/src/library/base/man/readRDS.Rd"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The serializer writes distinct version-2/version-3 headers with writer/minimum-reader versions; the minimum values in the inspected source are R 2.3.0 and R 3.5.0 respectively, and version 3 also records native encoding. These format-level bounds do not guarantee every object/package class will reconstruct on an older R."
url = "https://github.com/r-devel/r-svn/blob/c267ebb7f9720154535e63642c25a5d91d5f512d/src/main/serialize.c"
confidence = "medium"

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
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for R does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/r-devel/r-svn/blob/c267ebb7f9720154535e63642c25a5d91d5f512d/src/main/serialize.c"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for R's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/r-devel/r-svn/blob/c267ebb7f9720154535e63642c25a5d91d5f512d/src/main/serialize.c"
confidence = "medium"

[[evidence]]
target = "locality"
text = "R analysis can run locally and offline once dependencies are available."
url = "https://rstudio.github.io/renv/index.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://rstudio.github.io/renv/articles/renv"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Serialization headers specify representation/version/encoding bounds but do not recover every object/package class. No factor/date/attribute/NA-preserving independent reconstruction with a complete package/source/data environment has been recorded; bare RDS compatibility metadata is not file validity or whole-workflow recovery."
url = "https://github.com/r-devel/r-svn/blob/c267ebb7f9720154535e63642c25a5d91d5f512d/src/main/serialize.c"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Model accuracy alone is not E5. The current evidence does not establish effective script/package execution authority, workspace/file overwrite decisions, inspectable transformation state or available correction of consequential data/model changes."
url = "https://rstudio.github.io/renv/articles/renv"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The serializer writes distinct version-2/version-3 headers with writer/minimum-reader versions; the minimum values in the inspected source are R 2.3.0 and R 3.5.0 respectively, and version 3 also records native encoding. These format-level bounds do not guarantee every object/package class will reconstruct on an older R. [Source](https://github.com/r-devel/r-svn/blob/c267ebb7f9720154535e63642c25a5d91d5f512d/src/main/serialize.c).
- [x] Resolved: The full readRDS documentation explains that infoRDS reports representation/reader metadata but cannot establish file validity, and explicitly cautions against treating bare RDS as a machine-interchange format. Native-endian serialization and newer compression introduce additional dependencies; cross-tool and CSV preservation remain separate questions. [Source](https://github.com/r-devel/r-svn/blob/c267ebb7f9720154535e63642c25a5d91d5f512d/src/library/base/man/readRDS.Rd).
- [ ] Open: Factor/date/attribute/NA round trips, a non-R reader, older-release trials, package-library upgrades and workspace overwrite recovery remain untested. E5 needs script/package and workspace-write authority, visible transformation parameters/state and correction boundaries.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-10/.

**Human-readable criteria:** Can an independent party reproduce the analysis from preserved data, code, units, dependencies, and provenance, and exchange results without hidden loss?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Factor/date/attribute/NA round trips, a non-R reader, older-release trials, package-library upgrades and workspace overwrite recovery remain untested. E5 needs script/package and workspace-write authority, visible transformation parameters/state and correction boundaries.

**Next without installing locally:** Use synthetic scripts/data/serialization and package-lock/source manifests with expected types, missingness and results; compare independent readers or externally reproduced outputs and same-version execution/overwrite controls.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-10/`. Overall: **Insufficient evidence**.

+++
title = "GNU Octave"
category = "Scientific Computing & GIS"
summary = "Scriptable numerical computing environment with a language largely compatible with MATLAB."
substrate = "Plain-text .m scripts and MAT data files"
sync_model = "Local installation"
extract_cmd = "octave --eval \"load('data.mat'); whos\""
assessment_batch = "D"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "not_verified"
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
text = "Octave documents save and load operations for data files in multiple formats, including MAT files."
url = "https://docs.octave.org/v8.4.0/Simple-File-I_002fO.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Scripts and common data formats support movement to other numerical tools, but compatibility of functions, packages, and numerical behavior was not tested."
url = "https://docs.octave.org/octave-10.2.0.pdf"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Data files and source scripts can be retained independently, but a clean environment rebuild and result reproduction were not performed."
url = "https://docs.octave.org/octave-10.2.0.pdf"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Interactive computation, scripting, and file I/O run locally without a hosted service."
url = "https://docs.octave.org/v8.4.0/Simple-File-I_002fO.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Scripts and explicit save/load operations are inspectable, but numerical reproducibility depends on versions, packages, and stated tolerances."
url = "https://docs.octave.org/octave-10.2.0.pdf"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Local scripts and data files give users direct custody and a practical exit path."
url = "https://docs.octave.org/v8.4.0/Simple-File-I_002fO.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "Text scripts and documented data formats support preservation, while package dependencies and binary data compatibility need testing."
url = "https://docs.octave.org/octave-10.2.0.pdf"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core computing and data operations are local."
url = "https://docs.octave.org/v8.4.0/Simple-File-I_002fO.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "Code, parameters, and file operations are explicit and inspectable, subject to numerical assumptions and dependencies."
url = "https://docs.octave.org/octave-10.2.0.pdf"
confidence = "medium"
+++

**Primary investigation:** Preservation of executable scientific knowledge and reproducibility of results.

**Investigation priority:** Sovereignty standard, Longevity high, Locality high, Transparency and Control high. This plans the test effort and is not a finding.

**Synthetic dataset:** A small analysis project with scripts, numerical datasets, plots, model parameters, random-number generation, and optional package dependencies.

**Required tests**

1. Execute all analyses on a clean offline installation.
2. Document the complete dependency and package environment.
3. Save and reload numerical data using multiple supported formats.
4. Run equivalent numerical procedures using an independent implementation where practical.
5. Evaluate numerical agreement within documented tolerances.
6. Determine whether scripts remain interpretable without a specific package repository.
7. Test recovery of plots, parameters, data provenance, and meaningful outputs.
8. Investigate behavior when optional dependencies are missing.
9. Examine any code execution or external command capabilities relevant to user control and security.

**Critical evidence:** Scripts, input datasets, package versions, execution logs, numerical tolerances, independently regenerated outputs, and documented dependencies.

**Method note:** For scientific software, Longevity requires preserving enough computational context for someone else to understand or reproduce the analysis, not only the files.

**Preliminary desk assessment:** GNU Octave is described as scriptable numerical computing environment with a language largely compatible with matlab. Its primary preservation surface is Plain-text .m scripts and MAT data files, with independence shaped by local installation. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an independent party reproduce the analysis from preserved data, code, units, dependencies, and provenance, and exchange results without hidden loss?

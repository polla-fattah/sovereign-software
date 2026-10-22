+++
title = "GNU Octave"
category = "Scientific Computing & GIS"
summary = "Scriptable numerical computing environment with a language largely compatible with MATLAB."
substrate = "Plain-text .m scripts and MAT data files"
sync_model = "Local installation"
extract_cmd = "octave --eval \"load('data.mat'); whos\""
assessment_batch = "D"
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

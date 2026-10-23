+++
title = "GNU Octave"
category = "Scientific Computing & GIS"
summary = "Scriptable numerical computing environment with a language largely compatible with MATLAB."
limitations = ["The inspected .mat examples contain Octave text, not binary MAT. Plain ASCII output omits imaginary parts and skips arrays above two dimensions."]
substrate = "Plain-text .m scripts and MAT data files"
sync_model = "Local installation"
extract_cmd = "octave --eval \"load('data.mat'); whos\""
assessment_batch = "D"
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit 5208f34c2b13b447c68c956be2a0b1d67476a80d; Dense/sparse Octave-text fixtures and ASCII/save implementation inspected; no Octave execution"
assessment_notes = "Individually reconciled in rating batch 5 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Resolved: standard Python read the pinned penny.mat and west0479.mat as Octave text, despite their .mat names. Dimensions were validated for a 128-by-128 dense matrix with 16384 values and a 479-by-479 sparse matrix with 1888 stored values. Binary MAT and HDF5 were not tested."
url = "https://github.com/gnu-octave/octave/blob/5208f34c2b13b447c68c956be2a0b1d67476a80d/examples/data/west0479.mat"
confidence = "high"

[[evidence]]
target = "E2"
text = "Resolved: save_mat_ascii_data warns that imaginary components are omitted and skips variables above two dimensions with a warning. Plain ASCII is a distinct, lossy format; this source fact does not establish preservation of structs, complex values, or classes in other formats."
url = "https://github.com/gnu-octave/octave/blob/5208f34c2b13b447c68c956be2a0b1d67476a80d/liboctinterp/load-save/ls-mat-ascii.cc#L335-L354"
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
text = "Resolved: the inspected non-append save path writes to .saving_in_progress and then renames it to the requested destination. Append mode writes directly. This establishes the code path, not crash durability, actual warning behavior, or numerical reproducibility."
url = "https://github.com/gnu-octave/octave/blob/5208f34c2b13b447c68c956be2a0b1d67476a80d/liboctinterp/load-save/load-save.cc#L1564-L1670"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for GNU Octave does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://docs.octave.org/octave-10.2.0.pdf"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for GNU Octave's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://docs.octave.org/octave-10.2.0.pdf"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Core computing and data operations are local."
url = "https://docs.octave.org/v8.4.0/Simple-File-I_002fO.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/gnu-octave/octave/blob/5208f34c2b13b447c68c956be2a0b1d67476a80d/liboctinterp/load-save/load-save.cc#L1564-L1670"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Dense/sparse Octave-text values were independently read, while plain ASCII source demonstrably omits complex components and higher-dimensional variables. Binary MAT/HDF5, structs/classes, executable package dependencies and equivalent seeded calculations remain unestablished for the existing scientific-work profile."
url = "https://docs.octave.org/octave-10.2.0.pdf"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The source distinguishes temporary-file replacement on non-append save from direct append writes. That is not proof of arbitrary script/package authorization, inspectable numerical mutations, output overwrite control or usable recovery after interrupted saves and execution side effects."
url = "https://github.com/gnu-octave/octave/blob/5208f34c2b13b447c68c956be2a0b1d67476a80d/liboctinterp/load-save/load-save.cc#L1564-L1670"
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

**Assessment update, 23 October 2026:**

- [x] Resolved: Historical dense and sparse text fixtures were read independently, with dimensions, value counts, and sparse coordinates validated.
- [x] Resolved: The ASCII save implementation explicitly warns about imaginary-part loss and skipping arrays above two dimensions.
- [x] Resolved: Non-append saves use a temporary .saving_in_progress file and rename; append mode writes directly.
- [ ] Open: Binary MAT/HDF5 round trips, structs/classes/complex values, seeded numerical reproduction, dependencies, and real save-failure recovery. E5 needs effective script/package and file-write control, visible parameter/state changes and failure/correction boundaries.

**Assessment:** Independent access is demonstrated for two historical Octave-text matrices. Source inspection establishes specific loss and save boundaries. Complete scientific reproduction and recovery remain Not Verified; the overall determination remains **Insufficient evidence**.

**Human-readable criteria:** Can an independent party reproduce the analysis from preserved data, code, units, dependencies, and provenance, and exchange results without hidden loss?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Binary MAT/HDF5 round trips, structs/classes/complex values, seeded numerical reproduction, dependencies, and real save-failure recovery. E5 needs effective script/package and file-write control, visible parameter/state changes and failure/correction boundaries.

**Next without installing locally:** Inspect synthetic binary/text scientific-data exports with expected types/shapes/complex values and reproducible script/environment records; use version-matched external numerical/save-failure observations rather than executing the target locally.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-5/`. Overall: **Insufficient evidence**.

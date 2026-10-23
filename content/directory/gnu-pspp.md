+++
title = "GNU PSPP"
category = "Scientific Computing & GIS"
summary = "Statistical analysis program that reads and writes SPSS data files and uses a text syntax."
substrate = "SPSS .sav data files and plain-text syntax files"
sync_model = "Local installation"
extract_cmd = "pspp-convert data.sav data.csv"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Native SAV/POR compression compatibility, independent-reader comparisons, dictionary round trips, transformation reversibility and crash recovery remain untested. Savannah source-file retrieval failed; dated retained official manual pages are used instead."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence retrieved 2026-10-23"
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
text = "The official CSV specification distinguishes VALUES from LABELS output, documents print-format trimming and writes numeric system-missing values as a space. Together with MISSING=RECODE, this can collapse missing-value distinctions; a CSV is not demonstrated to preserve the native dictionary. This is a documented format conclusion, not a conversion experiment."
url = "https://www.gnu.org/software/pspp/manual/html_node/SAVE-TRANSLATE-_002fTYPE_003dCSV-and-TYPE_003dTAB.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Data preparation, analysis, and output generation are local operations."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The official SAVE TRANSLATE specification refuses existing-file overwrite by default and requires REPLACE; MISSING=RECODE, DROP/KEEP and UNSELECTED change the exported representation/case scope. These explicit controls resolve their documented semantics, not proof of an executed safeguard."
url = "https://www.gnu.org/software/pspp/manual/html_node/SAVE-TRANSLATE.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for GNU PSPP does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for GNU PSPP's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://www.gnu.org/software/pspp/manual/html_node/SAVE-TRANSLATE-_002fTYPE_003dCSV-and-TYPE_003dTAB.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The complete analysis workflow operates locally."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://www.gnu.org/software/pspp/manual/html_node/SAVE-TRANSLATE.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The retained official specification exposes CSV label/value, missingness and case-selection loss boundaries, not native dictionary recovery. SAV/POR compression, labels/missing distinctions and independent-reader reconstruction have not been compared. Dated manual evidence is retained despite failed source retrieval."
url = "https://www.gnu.org/software/pspp/manual/html_node/SAVE-TRANSLATE-_002fTYPE_003dCSV-and-TYPE_003dTAB.html"
confidence = "medium"

[[evidence]]
target = "E5"
text = "SAVE TRANSLATE documents default overwrite refusal and explicit REPLACE, plus options that change scope/meaning. These controls are positive but do not comprehensively cover syntax transformations, effective output selection, reversal and crash recovery in the original statistical workflow."
url = "https://www.gnu.org/software/pspp/manual/html_node/SAVE-TRANSLATE.html"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish a usable independent statistical workflow preserving native dictionary, labels and missing-value distinctions. The inspected CSV route can collapse those distinctions; alternative native routes remain unverified rather than failed."
url = "https://www.gnu.org/software/pspp/manual/pspp.html"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The official CSV specification distinguishes VALUES from LABELS output, documents print-format trimming and writes numeric system-missing values as a space. Together with MISSING=RECODE, this can collapse missing-value distinctions; a CSV is not demonstrated to preserve the native dictionary. This is a documented format conclusion, not a conversion experiment. [Source](https://www.gnu.org/software/pspp/manual/html_node/SAVE-TRANSLATE-_002fTYPE_003dCSV-and-TYPE_003dTAB.html).
- [x] Resolved: The official SAVE TRANSLATE specification refuses existing-file overwrite by default and requires REPLACE; MISSING=RECODE, DROP/KEEP and UNSELECTED change the exported representation/case scope. These explicit controls resolve their documented semantics, not proof of an executed safeguard. [Source](https://www.gnu.org/software/pspp/manual/html_node/SAVE-TRANSLATE.html).
- [ ] Open: Native SAV/POR compression compatibility, independent-reader comparisons, dictionary round trips, transformation reversibility and crash recovery remain untested. Savannah source-file retrieval failed; dated retained official manual pages are used instead. E5 needs effective transformation/save scope, output overwrite review and recoverable source/dictionary states; documented REPLACE is not a full executed safeguard.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-10/.

**Human-readable criteria:** Can an independent party reproduce the analysis from preserved data, code, units, dependencies, and provenance, and exchange results without hidden loss?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Native SAV/POR compression compatibility, independent-reader comparisons, dictionary round trips, transformation reversibility and crash recovery remain untested. Savannah source-file retrieval failed; dated retained official manual pages are used instead. E5 needs effective transformation/save scope, output overwrite review and recoverable source/dictionary states; documented REPLACE is not a full executed safeguard.

**Next without installing locally:** Inspect representative synthetic SAV/POR and CSV pairs with expected dictionary/labels/missingness, and seek independent-reader plus same-version syntax/overwrite/recovery records.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-10/`. Overall: **Insufficient evidence**.

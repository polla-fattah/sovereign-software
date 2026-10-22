+++
title = "Inkscape"
category = "Graphics & 3D"
summary = "Vector graphics editor whose native format is SVG."
substrate = "SVG (XML) with editor-specific metadata"
sync_model = "Local desktop application"
extract_cmd = "grep -c \"<path\" drawing.svg"
assessment_batch = "B"
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
longevity = "partial"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Inkscape uses SVG as its main document format, providing a standardized text-based representation that users can open and inspect."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The application supports saving and exporting artwork to common formats, but round-trip fidelity for every feature was not tested."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "SVG files are independently readable by other software, while Inkscape-specific namespaces and effects require a compatibility test."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The editor runs on GNU/Linux, Windows, and macOS and can be used with local files without a hosted account."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Artwork creation is generally user-directed; accessibility, licensing, and consequential publishing workflows were not assessed."
url = "https://inkscape.org/learn/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Local, standards-based SVG storage supports user control, with feature-specific export fidelity still requiring evidence."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "SVG improves long-term readability, but preservation of Inkscape-specific effects and linked assets needs a version-pinned round trip."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The core editing workflow is local and does not require a provider account or hosted storage."
url = "https://inkscape.org/learn/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The principal document format is inspectable, but the complete compatibility boundary between SVG, extensions, and export formats was not tested."
url = "https://inkscape.org/learn/"
confidence = "low"

+++

**Primary investigation:** Preservation of editable design semantics in SVG and other interchange formats.

**Investigation priority:** Sovereignty standard, Longevity high, Locality standard, Transparency and Control standard. This plans the test effort and is not a finding.

**Synthetic dataset:** An illustration with paths, text, gradients, layers, clipping masks, embedded images, linked images, filters, and application-specific effects.

**Required tests**

1. Save as native Inkscape SVG and Plain SVG.
2. Open each file in at least one independent SVG-capable application.
3. Identify extensions or metadata that preserve information only Inkscape understands.
4. Compare visual output and editability after export and reimport.
5. Test missing fonts, linked images, and external assets.
6. Verify that essential artwork can be accessed and modified without Inkscape.
7. Test offline creation, saving, printing, and export.
8. Examine destructive transformations and recovery behavior.

**Critical evidence:** SVG source inspection, rendering comparisons, feature-loss matrix, external-resource inventory, and independent editing results.

**Method note:** The question is not whether SVG is an open standard. It is whether the design's essential meaning and editability survive conversion to an independently usable representation.

**Preliminary desk assessment:** Inkscape is described as vector graphics editor whose native format is svg. Its primary preservation surface is SVG (XML) with editor-specific metadata, with independence shaped by local desktop application. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a creator preserve editable source work and linked assets, reopen it after software changes, and export a useful representation to independent tools?

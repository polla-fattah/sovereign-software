+++
title = "Inkscape"
category = "Graphics & 3D"
summary = "Vector graphics editor whose native format is SVG."
substrate = "SVG (XML) with editor-specific metadata"
sync_model = "Local desktop application"
extract_cmd = "grep -c \"<path\" drawing.svg"
assessment_batch = "B"
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

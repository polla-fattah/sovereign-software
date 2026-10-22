+++
title = "CadQuery"
category = "Engineering & CAD"
summary = "Python library for scripted parametric CAD whose models are ordinary code."
substrate = "Python scripts that export STEP and STL"
sync_model = "Local Python environment; plain-text scripts suit version control"
extract_cmd = "python -c \"import cadquery as cq; cq.exporters.export(cq.Workplane().box(1,1,1), 'box.step')\""
+++

+++
title = "Hugo"
category = "Knowledge & Office"
summary = "Static site generator that compiles a whole site from plain files in milliseconds, offline. This site is built with it."
substrate = "Plain-Text Markdown (.md) + TOML/YAML front matter"
sync_model = "Single zero-dependency native binary"
extract_cmd = "hugo --minify"
pilot_stage = 1
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
longevity = "meets"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Hugo projects store content, configuration, layouts, data, and static files in ordinary directories, and the documentation describes the generated public output."
url = "https://gohugo.io/getting-started/directory-structure/"
confidence = "high"

[[evidence]]
target = "E2"
text = "A site can be built locally and the generated public directory can be transferred to a host using ordinary file-copy tools."
url = "https://gohugo.io/getting-started/usage/"
confidence = "high"

[[evidence]]
target = "E3"
text = "The project files are ordinary source files and can be rebuilt locally, but a clean rebuild from a pinned toolchain was not performed in this review."
url = "https://gohugo.io/getting-started/directory-structure/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The documentation describes local builds, local preview, and deployment by transferring generated files to infrastructure chosen by the operator."
url = "https://gohugo.io/host-and-deploy/deployment-methods/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Hugo generates publication artifacts rather than making decisions for a high-impact domain; content review, publication approval, and rollback controls were not assessed."
url = "https://gohugo.io/getting-started/usage/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Source content and generated output remain in user-controlled files, with hosting treated as a replaceable deployment choice."
url = "https://gohugo.io/host-and-deploy/deployment-methods/"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Markdown, configuration, templates, and static files are inspectable and portable, although theme and module dependency pinning needs practical verification."
url = "https://gohugo.io/getting-started/directory-structure/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Hugo supports local authoring, local preview, and local generation of the complete static site."
url = "https://gohugo.io/getting-started/usage/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The build model and project structure are documented, but reproducibility across versions and third-party modules was not tested."
url = "https://gohugo.io/about/security/"
confidence = "medium"

+++

**Verification scenario:** Build an exported site offline; inventory themes, modules, external asset pipelines, and remote data.

**What may invalidate an overconfident claim:** Hugo binary locality does not guarantee that an arbitrary Hugo project is offline-buildable.

**Documentation starting point:** <https://gohugo.io/>

**Preliminary desk assessment:** Hugo is described as static site generator that compiles a whole site from plain files in milliseconds, offline. this site is built with it. Its primary preservation surface is Plain-Text Markdown (.md) + TOML/YAML front matter, with independence shaped by single zero-dependency native binary. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

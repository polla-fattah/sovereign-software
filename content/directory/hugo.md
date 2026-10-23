+++
title = "Hugo"
category = "Knowledge & Office"
summary = "Static site generator that compiles a whole site from plain files in milliseconds, offline. This site is built with it."
substrate = "Plain-Text Markdown (.md) + TOML/YAML front matter"
sync_model = "Single zero-dependency native binary"
extract_cmd = "hugo --minify"
pilot_stage = 1
limitations = ["Only disposable fixtures used with the explicitly recorded installed runtime.","The cause of the installed/newer cleanup difference, a network-blocked production build, module/theme closure and deployment dry-run remain open."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Hugo v0.166.0 and pinned newer source"
assessment_notes = "Individually reconciled in rating batch 8 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Hugo projects store content, configuration, layouts, data, and static files in ordinary directories, and the documentation describes the generated public output."
url = "https://gohugo.io/getting-started/directory-structure/"
confidence = "high"

[[evidence]]
target = "E2"
text = "The pinned remote-resource implementation uses an HTTP cache, checks allowed URLs and direct destination addresses, and makes environment proxies opt-in. A local source tree alone does not establish a network-independent build: remote inputs, caches and policy still matter."
url = "https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/resources/resource_factories/create/create.go"
confidence = "medium"

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
text = "The installed Hugo v0.166.0 fixture retained a deleted page's output after both a normal build and --cleanDestinationDir. Newer pinned upstream tests specify removal of ordinary stale files with configurable keep patterns. This resolves the observed/version-specific boundary, not a general cleanup guarantee."
url = "https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/testscripts/commands/hugo__clean_destination_dir.txt"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Hugo does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/resources/resource_factories/create/create.go"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Hugo's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/resources/resource_factories/create/create.go"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Hugo supports local authoring, local preview, and local generation of the complete static site."
url = "https://gohugo.io/getting-started/usage/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/testscripts/commands/hugo__clean_destination_dir.txt"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Ordinary content/config/layout files and successful local builds do not establish a clean, network-blocked reconstruction with all theme/module, remote-resource, cache and toolchain inputs. Those dependencies are explicit in the source. The earlier disposable build remains valid within its recorded limits, not whole-project E3."
url = "https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/resources/resource_factories/create/create.go"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The installed cleanup check and newer-source expectations differ, so a universal stale-output guarantee would be unsupported. Effective destination selection, cleanup keep patterns, executable/remote build policy and deployment preview/correction are not sufficiently covered for the declared publishing workflow."
url = "https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/testscripts/commands/hugo__clean_destination_dir.txt"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish an alternative publishing workflow preserving templates, module/theme behavior and remote-input semantics. An ordinary source tree or generated HTML alone does not complete that declared project migration."
url = "https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/resources/resource_factories/create/create.go"
confidence = "medium"

+++

**Verification scenario:** Build an exported site offline; inventory themes, modules, external asset pipelines, and remote data.

**What may invalidate an overconfident claim:** Hugo binary locality does not guarantee that an arbitrary Hugo project is offline-buildable.

**Documentation starting point:** <https://gohugo.io/>

**Evidence update: 23 October 2026**

- [x] Resolved: The installed Hugo v0.166.0 fixture retained a deleted page's output after both a normal build and --cleanDestinationDir. Newer pinned upstream tests specify removal of ordinary stale files with configurable keep patterns. This resolves the observed/version-specific boundary, not a general cleanup guarantee. [Source](https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/testscripts/commands/hugo__clean_destination_dir.txt).
- [x] Resolved: The pinned remote-resource implementation uses an HTTP cache, checks allowed URLs and direct destination addresses, and makes environment proxies opt-in. A local source tree alone does not establish a network-independent build: remote inputs, caches and policy still matter. [Source](https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/resources/resource_factories/create/create.go).
- [ ] Open: The cause of the installed/newer cleanup difference, a network-blocked production build, module/theme closure and deployment dry-run remain open. E5 needs destination/cleanup policy and deployment preview/correction evidence; newer tests do not overwrite the observed installed-version result.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-8/.

**Human-readable criteria:** Can a person preserve content, structure, links, metadata, and history in an independently readable form, then restore and edit it without a vendor account?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** The cause of the installed/newer cleanup difference, a network-blocked production build, module/theme closure and deployment dry-run remain open. E5 needs destination/cleanup policy and deployment preview/correction evidence; newer tests do not overwrite the observed installed-version result.

**Next without installing locally:** Retain a complete synthetic source/module/theme/font/remote-input packet with hashes and exact Hugo version; seek a network-blocked rebuild and version-matched cleanup/deployment comparison from an existing runtime or external assessor.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-8/`. Overall: **Insufficient evidence**.

+++
title = "Podman"
category = "OS & Infra"
summary = "Container engine that runs OCI containers without a central daemon and moves images as archives."
substrate = "OCI images and containers"
sync_model = "Local installation; images move through registries or archive files"
extract_cmd = "podman save -o image.tar IMAGE"
limitations = ["Source/retained-input inspection only; no installation or application restore performed.","Named-volume/bind-mount/secret coverage, cross-runtime digest comparisons, ownership restoration, rootless migration and real prune trials remain open."]
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Pinned evidence 5e20fea154919770d36569a09c31b4f7b8dc3a28"
assessment_notes = "Individually reconciled in rating batch 9 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Podman manages containers and documents checkpoint export, images, volumes, and container configuration paths."
url = "https://docs.podman.io/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "Images and checkpoint archives provide handoff paths, but migration of a complete service including volumes, networks, and host assumptions was not tested."
url = "https://docs.podman.io/en/v2.2.1/markdown/podman-container-checkpoint.1.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The pinned export documentation explicitly says container export flattens the filesystem to a single-layer tarball without image layers, history or tags, unlike image save. It cannot be treated as preserving all image provenance or the complete deployment."
url = "https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/docs/source/markdown/podman-export.1.md"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Podman can run rootless and locally without a central provider."
url = "https://docs.podman.io/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The prune command initializes --volumes false and prompts unless --force or --external is used. The prompt enumerates unused volumes only when --volumes is selected. Consequently neither a universal prompt nor volume deletion on every prune is an accurate description."
url = "https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/cmd/podman/system/prune.go"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for Podman does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/docs/source/markdown/podman-export.1.md"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for Podman's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/docs/source/markdown/podman-export.1.md"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The engine can run locally and rootless without a hosted account."
url = "https://docs.podman.io/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/cmd/podman/system/prune.go"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Container export flattens a filesystem and omits image layers/history/tags; complete service state also depends on volumes, bind mounts, networks, secrets and host/rootless ownership. No independently reconstructed deployment with preserved provenance and data is established."
url = "https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/docs/source/markdown/podman-export.1.md"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Prune's volume selection and prompt bypass flags are concrete source behavior. They do not cover all stop/remove/volume/bind-mount/secret mutations, effective rootless permissions or correction across the complete deployed service."
url = "https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/cmd/podman/system/prune.go"
confidence = "medium"

+++

**Evidence update: 23 October 2026**

- [x] Resolved: The pinned export documentation explicitly says container export flattens the filesystem to a single-layer tarball without image layers, history or tags, unlike image save. It cannot be treated as preserving all image provenance or the complete deployment. [Source](https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/docs/source/markdown/podman-export.1.md).
- [x] Resolved: The prune command initializes --volumes false and prompts unless --force or --external is used. The prompt enumerates unused volumes only when --volumes is selected. Consequently neither a universal prompt nor volume deletion on every prune is an accurate description. [Source](https://github.com/podman-container-tools/podman/blob/5e20fea154919770d36569a09c31b4f7b8dc3a28/cmd/podman/system/prune.go).
- [ ] Open: Named-volume/bind-mount/secret coverage, cross-runtime digest comparisons, ownership restoration, rootless migration and real prune trials remain open. E5 needs role/rootless-aware container/volume/secret mutation, explicit prune/force scope and state recovery boundaries.

**Assessment follow-up:** These bounded findings are incorporated into the evidence above. Eligibility and principle ratings are deliberately unchanged; their reconciliation and any blank-status fixes are deferred to the next pass. Reproduction details and retained inputs are in evidence/third-pass/batch-9/.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Named-volume/bind-mount/secret coverage, cross-runtime digest comparisons, ownership restoration, rootless migration and real prune trials remain open. E5 needs role/rootless-aware container/volume/secret mutation, explicit prune/force scope and state recovery boundaries.

**Next without installing locally:** Inspect a synthetic image/save/export and volume/bind/network/config packet with digests and ownership expectations; obtain cross-runtime restoration plus same-version remove/prune/secret authority evidence.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-9/`. Overall: **Insufficient evidence**.

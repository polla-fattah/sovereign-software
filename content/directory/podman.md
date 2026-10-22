+++
title = "Podman"
category = "OS & Infra"
summary = "Container engine that runs OCI containers without a central daemon and moves images as archives."
substrate = "OCI images and containers"
sync_model = "Local installation; images move through registries or archive files"
extract_cmd = "podman save -o image.tar IMAGE"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "pass"
practical_exit = "partial"
independent_recoverability = "partial"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "meets"
transparency = "partial"

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
text = "Checkpoint archives and image formats are tool-dependent; independent restoration outside Podman was not demonstrated."
url = "https://docs.podman.io/en/v2.2.1/markdown/podman-container-checkpoint.1.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Podman can run rootless and locally without a central provider."
url = "https://docs.podman.io/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "Containers can run services with consequential state, but privilege, network, secret, and deployment approval controls were not assessed."
url = "https://docs.podman.io/"
confidence = "low"

[[evidence]]
target = "sovereignty"
text = "Local execution and user-selected image and volume storage support control, with ecosystem dependencies remaining."
url = "https://docs.podman.io/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "OCI images and ordinary volumes are useful preservation units, but checkpoint compatibility and runtime dependencies need testing."
url = "https://docs.podman.io/en/v2.2.1/markdown/podman-container-checkpoint.1.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The engine can run locally and rootless without a hosted account."
url = "https://docs.podman.io/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The CLI and image/container model are documented, but privilege boundaries and complete service recovery remain unverified."
url = "https://docs.podman.io/"
confidence = "low"

+++

**Preliminary desk assessment:** Podman is described as container engine that runs oci containers without a central daemon and moves images as archives. Its primary preservation surface is OCI images and containers, with independence shaped by local installation; images move through registries or archive files. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

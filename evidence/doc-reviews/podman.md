# Podman: documentation review

Reviewed 22 October 2026 from the Podman documentation (docs.podman.io), podman.io, and the project repository (github.com/containers/podman) only. Latest stable release: 6.1.4, listed as "12 Oct" on the GitHub releases page, which omits the year; podman.io also names 6.1.4 as latest stable. The documentation pages were read through a page-summarising fetch tool, so every point below rests on a summary of the page, not on the full text. The docs read are the "latest" tree, not pinned to 6.1.4. Licence: Apache 2.0 (repository and podman.io).

**Evidence class:** vendor or maintainer declaration. Nothing here was run or tested, so it cannot establish a Pass or a Fail under v3.1.

## Evidence follow-up: 23 October 2026

The initial documentation-only review is retained below as historical context. This follow-up records the later source/artifact findings and explicitly identifies any already-available runtime experiment; its scope supersedes earlier statements that a topic was not found or nothing had yet been tested.

2 bounded questions are resolved in [batch 9](../third-pass/batch-9/README.md#podman) and reflected in the [application page](../../content/directory/podman.md). Ratings are preserved for the next-pass audit.

- [x] Resolved: The pinned export documentation explicitly says container export flattens the filesystem to a single-layer tarball without image layers, history or tags, unlike image save. It cannot be treated as preserving all image provenance or the complete deployment.
- [x] Resolved: The prune command initializes --volumes false and prompts unless --force or --external is used. The prompt enumerates unused volumes only when --volumes is selected. Consequently neither a universal prompt nor volume deletion on every prune is an accurate description.

Remaining: Named-volume/bind-mount/secret coverage, cross-runtime digest comparisons, ownership restoration, rootless migration and real prune trials remain open.

## What the documentation says

**Storage and access (E1, E3)**
- Podman describes itself as "a daemonless, open source, Linux native tool" for OCI containers, images, pods and volumes. [docs home](https://docs.podman.io/en/latest/)
- Container and image storage is handled by the containers/storage library. Podman and Buildah use different storage, so each cannot see the other's containers. [repository](https://github.com/containers/podman)
- The default volume driver, local, "uses a directory on disk as the backend by default". A single default path was not stated on this page. Other drivers: image (overlay-backed) and plugins defined in `containers.conf`. [volume create](https://docs.podman.io/en/latest/markdown/podman-volume-create.1.html)
- Container metadata lives in a database. BoltDB support was removed in Podman 6.0, and existing databases must be migrated to SQLite. The on-disk schema and whether other tools can read it were not found in the docs. [system migrate](https://docs.podman.io/en/latest/markdown/podman-system-migrate.1.html)

**Exit and migration (E2)**
- `podman save` writes an image as docker-archive (default, interoperable with `docker load`), oci-archive, oci-dir or docker-dir. It keeps layers, history and tags. Containers are not saved. Whether volumes are included is not stated. [save](https://docs.podman.io/en/latest/markdown/podman-save.1.html)
- Directory formats cannot be loaded on Podman remote clients (macOS and Windows, excluding WSL2). [save](https://docs.podman.io/en/latest/markdown/podman-save.1.html)
- `podman volume export` writes a volume to a tarball, to a file or standard output. The tar layout and any metadata loss are not described. [volume export](https://docs.podman.io/en/latest/markdown/podman-volume-export.1.html)
- `podman container checkpoint --export` writes an archive (zstd by default) that enables "container live migration" and includes root filesystem changes and, by default, volume content. `--ignore-volumes` and `--ignore-rootfs` omit them. [checkpoint](https://docs.podman.io/en/latest/markdown/podman-container-checkpoint.1.html)
- Networks, pod definitions, secrets and host configuration are not covered by these pages; a complete service handoff recipe was not found in the pages read.

**Recovery (E3)**
- Checkpointing depends on CRIU, a container runtime and conmon, whose versions are recorded in annotations. The page does not spell out host-matching rules for restore. [checkpoint](https://docs.podman.io/en/latest/markdown/podman-container-checkpoint.1.html)
- Checkpoint may fail for systemd-entrypoint containers or `--cgroups=disabled`; `--file-locks` is "required" if the application uses file locks. [checkpoint](https://docs.podman.io/en/latest/markdown/podman-container-checkpoint.1.html)
- `podman system migrate` upgrades containers to the current version. The legacy database is kept after migration, so a failed migration "should not" lose data (summary wording). Other Podman processes must be shut down first. [system migrate](https://docs.podman.io/en/latest/markdown/podman-system-migrate.1.html)
- A backup procedure for the whole storage root was not found in the pages read. Cross-version restore guarantees were not found.

**Continuing authority (E4) and dependencies**
- No account or hosted service is required to run it, as far as these pages show; the docs home says containers can be run by root or a non-privileged user. Registries are needed only when pulling or pushing images. [docs home](https://docs.podman.io/en/latest/)
- No telemetry or update-check statement was found on podman.io or the repository page. That is absence in the pages read, not a statement that none exists. [podman.io](https://podman.io/)
- Governance: the project follows the Podman Container Tools community governance, linked from GOVERNANCE.md; that linked document was not read. The footer credits "Podman Container Tools, a Series of LF Projects, LLC". Community meetings are hosted through CNCF/Linux Foundation. [GOVERNANCE.md](https://github.com/containers/podman/blob/main/GOVERNANCE.md), [podman.io](https://podman.io/)
- Releases: major and minor four times a year (February, May, August, November); patch releases at any time; all releases PGP signed. Only the most recent release gets upstream support, with LTS "in some cases" listed in SUPPORT.md. SUPPORT.md as fetched did not list supported versions. [repository](https://github.com/containers/podman)
- Podman 6 drops support for Windows 10 and Intel Macs. [SUPPORT.md](https://github.com/containers/podman/blob/main/SUPPORT.md)
- Maintainer succession rules: not found in the docs.

**Consequential operations (E5)**
- `podman system reset` "removes all pods, containers, images, networks and volumes, and machines" and the graphRoot and runRoot directories. It prompts with a default of N; `--force` skips the prompt. The docs warn that those directories must not point to an important directory. [system reset](https://docs.podman.io/en/latest/markdown/podman-system-reset.1.html)
- `podman system prune` keeps volumes by default; `--volumes` removes unused ones. It asks "[y/N]" unless `--force` is used. `--build` "can interfere with builds in progress". Whether `--all` alone removes volumes is unclear on the page. [system prune](https://docs.podman.io/en/latest/markdown/podman-system-prune.1.html)
- `system migrate --new-runtime` warns there are "no guarantees" containers keep working under the new runtime. [system migrate](https://docs.podman.io/en/latest/markdown/podman-system-migrate.1.html)
- Undo or history for container operations: not found in the docs. Rootless privilege boundaries, secrets and deployment approval controls were not read.

## Gaps to test or read next
1. On a synthetic container with a named volume and a bind mount: `podman save`, `volume export`, and `checkpoint --export`; restore each on a second host with a different Podman version and list what is missing (networks, secrets, environment, volume ownership).
2. Load the `docker-archive` and `oci-archive` outputs with a non-Podman OCI tool (skopeo, another runtime) and compare digests and manifests.
3. Inspect the storage root and the SQLite database with generic tools and record whether volume data is readable without Podman.
4. Upgrade a 5.x rootless store to 6.1.4 with `system migrate`; try returning to 5.x afterwards.
5. Run `system prune`, `prune --all` and `prune --volumes` on a synthetic store and record exactly what is removed.
6. Capture network traffic on an offline-capable host for update or telemetry checks (no statement found).
7. Pages not read: installation and offline use, `containers-storage.conf`, `podman-volume-import`, `podman load`, Quadlet and `generate kube`, rootless tutorial, community GOVERNANCE.md, SECURITY.md, the 6.0 and 6.1 release notes, and confirmation of the 6.1.4 release year.

## Rating reconciliation: 24 October 2026

[Individual review](../rating-reconciliation/batch-9/README.md#podman); [actual assessment](../../content/directory/podman.md). The original documentation/sweep records above remain historical; this follow-up supersedes the earlier rating freeze.

- E3: Not Verified. Container export flattens a filesystem and omits image layers/history/tags; complete service state also depends on volumes, bind mounts, networks, secrets and host/rootless ownership. No independently reconstructed deployment with preserved provenance and data is established.
- E5: Not Verified. Prune's volume selection and prompt bypass flags are concrete source behavior. They do not cover all stop/remove/volume/bind-mount/secret mutations, effective rootless permissions or correction across the complete deployed service.
- Longevity and Transparency and Control: Not assessed, because their required E3/E5 minimums remain unestablished.
- Sovereignty: Not assessed; access/exit/custody minimums are not all established.

Remaining: Named-volume/bind-mount/secret coverage, cross-runtime digest comparisons, ownership restoration, rootless migration and real prune trials remain open. E5 needs role/rootless-aware container/volume/secret mutation, explicit prune/force scope and state recovery boundaries.

Next without a local installation: Inspect a synthetic image/save/export and volume/bind/network/config packet with digests and ownership expectations; obtain cross-runtime restoration plus same-version remove/prune/secret authority evidence.

This review does not install or run target application implementation. Previously collected independent parser/runtime observations retain their original limits. E1/E4/Locality are outside this targeted re-certification.

# Rating reconciliation, batch 4

Reviewed 24 October 2026. Each application below was evaluated individually against its existing essential-record and version scope. No target application was installed, built or run.

## Outcome

All 6 retain **Insufficient evidence**. E3/E5 remain **Not Verified** for the specific missing coverage below, not automatically Pass from documentation and not Fail from missing evidence. Positive dependent principles lacking their minimum are corrected. Existing E1/E4/Locality findings are not re-certified by this targeted pass.

[Plan](plan.json), [individual decisions and change ledger](decisions.json), [directory-wide review sequence](../remaining-plan.json), [current application index](../../application-index.md).

0 additional bounded source questions are resolved in this batch. Earlier resolved questions remain resolved and are not counted again. Source locators are provenance aids, not executed-behavior assertions.

<a id="actual-budget"></a>

## Actual Budget

Version/scope: Source commit d1a536f35c5a114eda0582d5a1d744a9103cc90e; export, import, and automatic backup implementation inspected.

**E3: Not Verified.** Export and automatic-backup source identify SQLite/metadata packaging, cache removal and discarded CRDT/clock context; import replaces sync/encryption identity. No balance-, rule- and schedule-preserving reconstruction of the declared budget and server context is recorded. These transformations define required recovery comparisons, not complete E3. [Source context](https://github.com/actualbudget/actual/blob/d1a536f35c5a114eda0582d5a1d744a9103cc90e/packages/loot-core/src/server/budgetfiles/backups.ts).

**E5: Not Verified.** Budgeting and optional bank sync involve consequential financial changes, but the collected export/backup code does not establish authorization, inspectable changes and correction for bank imports, rule execution, encryption transitions and sync conflicts. No financial transaction is inferred to be governable merely because the budget is local. [Source context](https://actualbudget.org/docs/api/).

**Remaining:** balances, rules, schedules, bank-provider credentials, encryption behavior, and full sync-server recovery. E5 needs bank-import/rule/sync authorization, change visibility and correction boundaries in the configured budget.

**Next without a local installation:** Inspect a synthetic Actual export and expected balances/rules/schedules with SQLite/JSON tools; obtain pinned implementation or externally recorded bank-import, rule, undo and sync/encryption evidence. Use synthetic credentials only.

[Actual assessment](../../../content/directory/actual-budget.md) | [review note](../../doc-reviews/actual-budget.md).

<a id="qgis"></a>

## QGIS

Version/scope: Source commit b7db8233afbfe8d1e9870da61a2696592295932c and project1.qgz fixture identifying QGIS 3.11.0-Master.

**E3: Not Verified.** The historical QGZ contains project XML and empty auxiliary storage but omits its three external shapefiles. Source relocation assertions were inspected, not run. Complete data, CRS, joins, styles, layouts and provider-dependent analytical meaning have not been reconstructed; project readability does not establish the geospatial profile's E3. [Source context](https://github.com/qgis/QGIS/blob/b7db8233afbfe8d1e9870da61a2696592295932c/tests/src/python/test_qgsproject.py#L1196-L1405).

**E5: Not Verified.** The existing E5 note identifies provenance/coordinate/publication risks, not demonstrated control paths. Source/fixture path inspection does not establish edit-transaction rollback, destructive processing outputs, overwrite authorization or inspectable parameter/provenance records in the assessed configuration. [Source context](https://qgis.org/).

**Remaining:** populated auxiliary storage, current-version joins/styles/layouts, plugin/provider absence, and complete project reconstruction. E5 needs edit/processing/overwrite authorization, recorded parameters/provenance and available correction; public-map accuracy is not itself a control test.

**Next without a local installation:** Use a self-contained project/data packet with expected CRS, joins/styles and analysis outputs, then inspect it independently. Seek same-version edit-buffer/processing/overwrite source or recorded tests instead of installing a desktop instance.

[Actual assessment](../../../content/directory/qgis.md) | [review note](../../doc-reviews/qgis.md).

<a id="freecad"></a>

## FreeCAD

Version/scope: Source commit d48752f2851906f93e060cc996ba9fba1e5a05f8 and retained PadTest.fcstd fixture; no CAD execution.

**E3: Not Verified.** Independent ZIP/XML inspection exposes typed sketches, pads and constraints, but separate shape payloads were not interpreted into equivalent geometry or engineering intent. Temporary-save/backup policy source is conditional. Units, constraints, external references and compatible reconstruction remain incomplete for the original CAD profile. [Source context](https://github.com/FreeCAD/FreeCAD/blob/d48752f2851906f93e060cc996ba9fba1e5a05f8/src/App/Document.cpp#L1968-L2106).

**E5: Not Verified.** A document tree and Python interface make some operations inspectable, and save backup policy is visible in source. They do not establish workbench/script authorization, transaction/undo scope, geometry-changing effects or reliable correction after destructive save/recompute across the declared model. [Source context](https://www.freecad.org/features.php?lang=en-UNIVERSALITSOLUTIONS).

**Remaining:** units/constraint semantics, geometry reconstruction, STEP loss, external dependencies, version compatibility, and crash recovery. E5 needs script/workbench execution control, transaction/undo boundaries and destructive save/recompute correction evidence.

**Next without a local installation:** Inspect a synthetic FCStd plus dependency and expected units/constraint/geometry manifest, with independent geometry comparisons supplied upstream or by another assessor. Add pinned transaction/script/save-control evidence without executing CAD locally.

[Actual assessment](../../../content/directory/freecad.md) | [review note](../../doc-reviews/freecad.md).

<a id="gitea"></a>

## Gitea

Version/scope: Source commit ad37b88631ade5af5db738a4ebe4ab89ed8d237d; dump storage coverage and repository export layout.

**E3: Not Verified.** Dump source includes SQL, configuration, repositories and configurable object stores, while per-repository export serializes forge relationships. Skip flags and deployment state affect completeness. No consistent representative instance has been reconstructed with users, permissions, reviews, LFS and attachments; Git history alone is not the forge profile. [Source context](https://docs.gitea.com/1.22/administration/backup-and-restore/).

**E5: Not Verified.** Inspectable Git history is not authorization or recourse for forge permissions, hooks, instance/database mutation and repository/account deletion. The collected dump/migration implementation does not sufficiently cover those deployment-specific operations and restore-order consequences. [Source context](https://docs.gitea.com/1.22/administration/backup-and-restore/).

**Remaining:** A real dump/clean restore with counts, attachments, LFS, hooks and permissions; cross-version and cross-forge fidelity; live-backup consistency and deletion recovery. E5 needs role-specific permission/hook/deletion authorization, auditable mutations and recovery boundaries, including relevant external authentication/CI.

**Next without a local installation:** Obtain a stopped or consistency-controlled synthetic instance dump with SQL/config/object-store manifests and expected role/relationship records; inspect it independently and reuse version-matched permission/deletion/restore observations.

[Actual assessment](../../../content/directory/gitea.md) | [review note](../../doc-reviews/gitea.md).

<a id="forgejo"></a>

## Forgejo

Version/scope: Source commit b021976fb1a87ec18543c3a5586ecfabcc1c06e7; dump storage layout and dump-repo destination protection.

**E3: Not Verified.** The dump collects several stores concurrently and can omit repository/LFS branches; inclusion alone does not prove point-in-time consistency. Full user, permission, pull-request/review and attachment reconstruction is not established. A complete independent forge recovery cannot be inferred from a Git clone or dump command. [Source context](https://forgejo.org/docs/v17.0/admin/setup/backup/).

**E5: Not Verified.** The pinned dump-repo destination guard protects against cleanup deleting a pre-existing non-empty destination. It does not establish administrator/collaborator authority, hook/permission mutation, repository purge or complete recourse in the declared shared project scope. [Source context](https://codeberg.org/forgejo/forgejo/src/commit/b021976fb1a87ec18543c3a5586ecfabcc1c06e7/cmd/dump_repo.go).

**Remaining:** Clean instance restoration and relationship/permission comparison; live versus stopped consistency; cross-version and cross-forge migration; purge recovery and external CI/authentication dependencies. E5 needs administrator/contributor permission, hook and purge safeguards, with recoverable state and external-service boundaries.

**Next without a local installation:** Use a synthetic complete Forgejo dump with declared stopped/live consistency and expected role/relationship/object hashes; inspect the packet and seek matching primary-source or recorded administrator/contributor deletion/recovery checks.

[Actual assessment](../../../content/directory/forgejo.md) | [review note](../../doc-reviews/forgejo.md).

<a id="paperless-ngx"></a>

## Paperless-ngx

Version/scope: Source commit f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae; export manifest coverage, importer version checks and secret handling.

**E3: Not Verified.** The exporter produces serialized model data plus files, not a raw database image; paths, conditional audit data and version behavior matter. No real manifest/files packet has been independently reconstructed and compared for OCR, document hashes, workflows, accounts and permissions. Field-level secret handling does not complete E3. [Source context](https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/document_exporter.py).

**E5: Not Verified.** Export warnings and optional protection for selected mail/social-token fields are concrete controls, but do not encrypt all exported documents. Workflow execution, user permissions, trash/purge, metadata changes and inspectable correction remain insufficiently covered for the document-management profile. [Source context](https://github.com/paperless-ngx/paperless-ngx/blob/f71a9a6eda217a0f3e84ff9a40e0e57d10e7d9ae/src/documents/management/commands/mixins.py).

**Remaining:** An independently inspected real export and clean import comparing document hashes, OCR, relationships, accounts and permissions; actual supported/unsupported-version outcomes; trash/purge and workflow authorization. E5 needs workflow/trash/purge and permission authorization, clear export-secret boundaries and correction evidence for document/metadata mutations.

**Next without a local installation:** Read a synthetic export manifest and originals with expected OCR/tag/correspondent/custom-field/permission mappings; obtain version-matched import/workflow/trash observations or comprehensive source coverage. Keep real account secrets out of the packet.

[Actual assessment](../../../content/directory/paperless-ngx.md) | [review note](../../doc-reviews/paperless-ngx.md).

## Validation boundary

The shared rating audit checks recorded fields, decision evidence and review notes. Historical schema-repair and evidence baselines remain available. Source/fixture hashes, navigation and the complete set of updated pages are checked by the final repository validation; no per-product clean restore or upstream test run is implied.

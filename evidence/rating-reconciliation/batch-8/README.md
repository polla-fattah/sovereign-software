# Rating reconciliation, batch 8

Reviewed 24 October 2026. Each application below was evaluated individually against its existing essential-record and version scope. No target application was installed, built or run.

## Outcome

All 6 retain **Insufficient evidence**. E3/E5 remain **Not Verified** for the specific missing coverage below, not automatically Pass from documentation and not Fail from missing evidence. Positive dependent principles lacking their minimum are corrected. Existing E1/E4/Locality findings are not re-certified by this targeted pass.

[Plan](plan.json), [individual decisions and change ledger](decisions.json), [directory-wide review sequence](../remaining-plan.json), [current application index](../../application-index.md).

0 additional bounded source questions are resolved in this batch. Earlier resolved questions remain resolved and are not counted again. Source locators are provenance aids, not executed-behavior assertions.

<a id="gnucash"></a>

## GnuCash

Version/scope: Source commit fec5643cd22cbafc7b16047f35cbe852395da947.

**E3: Not Verified.** The small XML sample's split references resolve and explicit transaction values balance, but no representative schedules/budgets/FX/reconciliation book was reconstructed. Separate value and quantity semantics are essential; serializer inspection and a balanced two-transaction sample do not establish full XML/SQLite or historical recovery. [Source context](https://github.com/Gnucash/gnucash/blob/fec5643cd22cbafc7b16047f35cbe852395da947/libgnucash/backend/xml/gnc-transaction-xml-v2.cpp).

**E5: Not Verified.** Local files/backups and balanced arithmetic do not establish import authorization, correction of transactions/schedules, deleted-record recourse or effective backend/backup/log consistency. The existing evidence does not comprehensively cover the consequential financial operations. [Source context](https://www.gnucash.org/docs/v5/C/gnucash-guide/basics-backup1.html).

**Remaining:** Representative XML/SQLite backend comparison with schedules/budgets/FX/reconciliation, CSV loss profile, timestamps/backups/log replay, deletion controls and older releases. E5 needs import/delete/change review, effective backup/log policies and recoverable transaction/schedule states; arithmetic balance is separate.

**Next without a local installation:** Inspect a synthetic XML/SQLite book packet with expected splits, values/quantities, schedules and reconciliation, then obtain independent balance comparisons and version-matched import/delete/log recovery observations.

[Actual assessment](../../../content/directory/gnucash.md) | [review note](../../doc-reviews/gnucash.md).

<a id="money-manager-ex"></a>

## Money Manager Ex

Version/scope: Source commit a4aa421415143406e2557b334137ca1b90b58218.

**E3: Not Verified.** The independently instantiated SQL schema is empty. It does not reconstruct financial records, transfers/splits, attachments or encryption state from a real MMB/EMB backup. Readable schema and available cipher code are positive prerequisites, not recovered accounting meaning. [Source context](https://github.com/moneymanagerex/moneymanagerex/blob/master/docs/en_US/index.html).

**E5: Not Verified.** The legacy cipher path offers an incompatibility/rekey warning and requires acceptance, but page-size changes may precede it. Effective cancellation, decryption/migration outcomes and ordinary import/delete/backup correction are not established by that one source control. [Source context](https://github.com/moneymanagerex/moneymanagerex/blob/a4aa421415143406e2557b334137ca1b90b58218/src/db/dbwrapper.cpp).

**Remaining:** A populated .mmb/.emb independently inspected, full transaction/transfer/split/attachment export/import comparison, real encryption migration, deleted-record retention and backups. E5 needs actual cipher/cancellation boundaries and import/delete/backup authority and correction records.

**Next without a local installation:** Acquire a populated synthetic MMB and encrypted test EMB with non-secret credentials, attachments and expected balances/relationships; inspect records and use version-matched migration/cancellation/deletion evidence.

[Actual assessment](../../../content/directory/money-manager-ex.md) | [review note](../../doc-reviews/money-manager-ex.md).

<a id="todo-txt"></a>

## Todo.txt

Version/scope: Format commit 1d90c086533a2574f6039a756ada760ec672a53e; reference CLI commit a9846a232c86937a218d1be45bc4c7631855ee16.

**E3: Not Verified.** The official text grammar describes task markers/tokens, while clients can differ in priority and extension semantics. Reference completion/archive source changes priority and moves lines between files. Complete recurrence, unknown-tag meaning and task-history reconstruction across clients have not been established. [Source context](https://github.com/todotxt/todo.txt/blob/1d90c086533a2574f6039a756ada760ec672a53e/README.md).

**E5: Not Verified.** The reference CLI's append/delete and backup-file paths are inspectable, but not immutable history or evidence of interrupted-write safety. Delete/deduplicate/replace authority, line-number drift and effective backup/correction across the declared client workflow remain unverified. [Source context](https://github.com/todotxt/todo.txt-cli/blob/a9846a232c86937a218d1be45bc4c7631855ee16/todo.sh).

**E2 correction:** The former E2 Pass does not establish equivalent priority, recurrence and extension-token behavior in an independent task workflow. Keeping readable task lines does not complete the declared cross-client semantic migration. [Source context](https://github.com/todotxt/todo.txt).

**Remaining:** Three-client edits and unknown-tag/priority comparison, recurrence interpretation, actual archive/delete/deduplicate/replace failures and recovery, line-number shifts and older clients. E5 needs effective archive/delete/replace and failure recovery boundaries, including line-number shifts and backup handling.

**Next without a local installation:** Use synthetic todo/done/config files with recurrence/unknown tags and expected task identities; compare supported independent clients or their recorded results, and inspect exact reference-CLI mutation/backup cases.

[Actual assessment](../../../content/directory/todo-txt.md) | [review note](../../doc-reviews/todo-txt.md).

<a id="hugo"></a>

## Hugo

Version/scope: Hugo v0.166.0 and pinned newer source.

**E3: Not Verified.** Ordinary content/config/layout files and successful local builds do not establish a clean, network-blocked reconstruction with all theme/module, remote-resource, cache and toolchain inputs. Those dependencies are explicit in the source. The earlier disposable build remains valid within its recorded limits, not whole-project E3. [Source context](https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/resources/resource_factories/create/create.go).

**E5: Not Verified.** The installed cleanup check and newer-source expectations differ, so a universal stale-output guarantee would be unsupported. Effective destination selection, cleanup keep patterns, executable/remote build policy and deployment preview/correction are not sufficiently covered for the declared publishing workflow. [Source context](https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/testscripts/commands/hugo__clean_destination_dir.txt).

**E2 correction:** The former E2 Pass does not establish an alternative publishing workflow preserving templates, module/theme behavior and remote-input semantics. An ordinary source tree or generated HTML alone does not complete that declared project migration. [Source context](https://github.com/gohugoio/hugo/blob/ed22b85c192dd750cf0bdfb2d2005d31ab3bc0a7/resources/resource_factories/create/create.go).

**Remaining:** The cause of the installed/newer cleanup difference, a network-blocked production build, module/theme closure and deployment dry-run remain open. E5 needs destination/cleanup policy and deployment preview/correction evidence; newer tests do not overwrite the observed installed-version result.

**Next without a local installation:** Retain a complete synthetic source/module/theme/font/remote-input packet with hashes and exact Hugo version; seek a network-blocked rebuild and version-matched cleanup/deployment comparison from an existing runtime or external assessor.

[Actual assessment](../../../content/directory/hugo.md) | [review note](../../doc-reviews/hugo.md).

<a id="typst"></a>

## Typst

Version/scope: Pinned source 64c5e8c02fe0394d913ead36e42ef8c1334d2107.

**E3: Not Verified.** Source identifies a project root, package store and lazy font discovery; missing preview packages can be downloaded. No complete font/package/file-closed project was compiled or independently reconstructed in the assessed version. A PDF or a single source file does not preserve all editable document meaning. [Source context](https://github.com/typst/typst/blob/64c5e8c02fe0394d913ead36e42ef8c1334d2107/crates/typst-cli/src/world.rs).

**E5: Not Verified.** The collected package/root dependency implementation does not establish effective file/package trust, executable extension boundaries, output overwrite review or available recovery of document mutations. No document-local or web-app control configuration is sufficiently evidenced for whole-scope E5. [Source context](https://typst.app/docs/).

**E2 correction:** The former E2 Pass does not establish a usable independent document-authoring workflow retaining references, package/font behavior and editable structure. Readable Typst source or PDF output is not that full migration comparison. [Source context](https://github.com/typst/typst/blob/64c5e8c02fe0394d913ead36e42ef8c1334d2107/crates/typst-kit/src/packages.rs).

**Remaining:** An offline compile, explicit font inventory, cross-version output comparison and web-app export completeness remain untested. E5 needs package/file access and output-overwrite policy plus inspectable source changes and correction boundaries.

**Next without a local installation:** Use a source/assets/font/package manifest with exact versions and a reference output; obtain an offline compile/comparison and primary-source file/package/overwrite controls without installing a new compiler here.

[Actual assessment](../../../content/directory/typst.md) | [review note](../../doc-reviews/typst.md).

<a id="ngspice"></a>

## NGSPICE

Version/scope: Pinned source 032b1c32c4dbad45ff132bcfac1dbecadbd8abb0.

**E3: Not Verified.** The raw writer documents variable metadata and ASCII/native-double payload layout, but no real output was independently decoded and checked for scales/units, complex values and platform layout. Complete netlists/models and numerical reproduction remain unestablished for the original scientific profile. [Source context](https://github.com/ngspice/ngspice/blob/032b1c32c4dbad45ff132bcfac1dbecadbd8abb0/src/frontend/rawfile.c).

**E5: Not Verified.** Append versus truncating file modes are positively established, and the low-level writer has no confirmation dialog. This is not proof of absent higher-level authorization or a failure by itself; effective caller/output selection, script/model authority and correction remain insufficiently covered. [Source context](https://github.com/ngspice/ngspice/blob/032b1c32c4dbad45ff132bcfac1dbecadbd8abb0/src/frontend/rawfile.c).

**E2 correction:** The former E2 Pass does not establish an independent simulation/analysis workflow preserving model dependencies, scales/units and numeric semantics. Available netlist/raw formats are a migration lead, not a demonstrated full-scope transition. [Source context](https://ngspice.sourceforge.io/docs/ngspice-41-manual.pdf).

**Remaining:** Independent decoding of real outputs, wrdata unit/scale comparison, external model closure and version-specific numerical behavior remain untested. E5 needs caller-level output/overwrite and model/control-script policy, inspectability and recoverable source/output states.

**Next without a local installation:** Inspect a synthetic circuit/model/real-output packet with variable/scale/unit expectations and platform metadata; compare an independent decoder and externally recorded numerical results, then review caller-level write/script safeguards.

[Actual assessment](../../../content/directory/ngspice.md) | [review note](../../doc-reviews/ngspice.md).

## Validation boundary

The shared rating audit checks recorded fields, decision evidence and review notes. Historical schema-repair and evidence baselines remain available. Source/fixture hashes, navigation and the complete set of updated pages are checked by the final repository validation; no per-product clean restore or upstream test run is implied.

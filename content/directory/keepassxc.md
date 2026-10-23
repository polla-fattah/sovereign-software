+++
title = "KeePassXC"
category = "OS & Infra"
summary = "Open-source password manager with a documented, encrypted vault file on your disk."
substrate = "Open KDBX vault (binary, documented format)"
sync_model = "Git / Syncthing (no commercial cloud)"
extract_cmd = "keepassxc-cli export --format csv vault.kdbx"
limitations = ["CSV omits attachment payloads, history, arbitrary custom attributes, and Auto-Type associations. The inspected KDBX 4+ plaintext XML extraction path omits attachment payloads; older XML can embed them."]
pilot_stage = 3
assessment_status = "complete"
assessment_date = "2026-10-24"
version_assessed = "Source commit d5e43b779d5e23c23963d53b806dcda5dd38f50e; Historical XML fixture and CSV/XML export call paths inspected; no encrypted-vault execution"
assessment_notes = "Individually reconciled in rating batch 5 on 24 October 2026. E3/E5 remain Not Verified for explicit missing coverage; dependent unsupported findings corrected. Previously resolved questions are retained, not counted again. E1/E4/Locality were not re-certified by this targeted review."

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
text = "Resolved: standard XML, Base64, and gzip tools inspected a KeePass-generated test fixture with six groups, six entries including two history entries, and two attachment payloads of 10 and 11 bytes. All four attachment references resolved. This was a plaintext historical fixture, not an encrypted KDBX recovery."
url = "https://github.com/keepassxreboot/keepassxc/blob/d5e43b779d5e23c23963d53b806dcda5dd38f50e/tests/data/NewDatabase.xml"
confidence = "high"

[[evidence]]
target = "E2"
text = "Resolved: the CSV writer emits ten columns, including TOTP and timestamps, and omits attachment payloads, history records, arbitrary custom attributes, and Auto-Type associations. It is not a complete database backup."
url = "https://github.com/keepassxreboot/keepassxc/blob/d5e43b779d5e23c23963d53b806dcda5dd38f50e/src/format/CsvExporter.cpp#L60-L106"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Resolved: tracing CLI Export through Database::extract and KeePass2Writer reaches KdbxWriter::extractDatabase with an empty binary-index map. KdbxXmlWriter embeds binaries only below KDBX 4, while writing references and history for newer versions. The inspected KDBX 4+ XML path therefore omits attachment payloads. Actual export/import and complete KDBX recovery remain unverified."
url = "https://github.com/keepassxreboot/keepassxc/blob/d5e43b779d5e23c23963d53b806dcda5dd38f50e/src/format/KdbxWriter.cpp"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The database is encrypted locally, and synchronization can be delegated to a user-selected shared folder rather than a built-in provider."
url = "https://keepassxc.org/docs/"
confidence = "high"

[[evidence]]
target = "E5"
text = "Password use is consequential, but approval, browser integration, passkey export, and recovery behavior were not tested in a controlled scenario."
url = "https://keepassxc.org/docs/KeePassXC_GettingStarted"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "A positive Sovereignty finding requires established E1, E2 and E4 in the declared scope. The existing access/exit/custody record for KeePassXC does not establish all three minimums. The prior positive finding is withdrawn; recorded storage and portability strengths remain facts, not a verified failure."
url = "https://github.com/keepassxreboot/keepassxc/blob/d5e43b779d5e23c23963d53b806dcda5dd38f50e/src/format/CsvExporter.cpp#L60-L106"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "E3 is not established for KeePassXC's existing essential-record scope. The previous Longevity finding is replaced by Not assessed, not a verified failure or a positive placeholder."
url = "https://github.com/keepassxreboot/keepassxc/blob/d5e43b779d5e23c23963d53b806dcda5dd38f50e/src/format/KdbxWriter.cpp"
confidence = "medium"

[[evidence]]
target = "locality"
text = "The database and primary workflow are local, with synchronization handled by storage chosen by the user."
url = "https://keepassxc.org/docs/"
confidence = "high"

[[evidence]]
target = "transparency"
text = "The positive control observations above do not yet establish whole-scope E5. The methodology requires that minimum before a positive Transparency and Control finding; the previous positive finding is therefore withdrawn to Not assessed, not changed to Does not meet."
url = "https://keepassxc.org/docs/KeePassXC_GettingStarted"
confidence = "medium"

[[evidence]]
target = "E3"
text = "The plaintext historical XML fixture's attachments resolve, but no encrypted KDBX was decrypted or restored across independent clients with preserved history, keys and passkeys. The inspected CSV and KDBX 4+ XML routes omit essential payloads in different ways. Those bounded export limitations are not full native-vault recovery or proof all recovery paths fail."
url = "https://github.com/keepassxreboot/keepassxc/blob/d5e43b779d5e23c23963d53b806dcda5dd38f50e/src/format/KdbxWriter.cpp"
confidence = "medium"

[[evidence]]
target = "E5"
text = "The collected exporter/writer evidence does not establish effective approval for secret disclosure, browser/Auto-Type use, merge/overwrite or key/hardware recovery. Password custody and local availability alone do not demonstrate governability of those high-risk actions."
url = "https://keepassxc.org/docs/KeePassXC_GettingStarted"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The former E2 Pass does not establish a complete usable alternative-vault migration: the inspected CSV and KDBX 4+ XML routes omit essential history/attachments or other fields. Another KDBX route may work, but that complete comparison remains missing."
url = "https://github.com/keepassxreboot/keepassxc/blob/d5e43b779d5e23c23963d53b806dcda5dd38f50e/src/format/CsvExporter.cpp#L60-L106"
confidence = "medium"

+++

**Verification scenario:** Open a KDBX file in another compatible client; restore attachments, groups, history, and one-time passwords; test emergency key recovery.

**What may invalidate an overconfident claim:** A documented binary format such as KDBX should not be ranked below plain text for that reason alone.

**Documentation starting point:** <https://keepassxc.org/docs/>

**Assessment update, 23 October 2026:**

- [x] Resolved: The CSV implementation has ten columns, including TOTP, but no attachment payloads, history, arbitrary custom attributes, or Auto-Type associations.
- [x] Resolved: The older XML fixture contains recoverable attachment payloads and history; all four attachment references resolved independently.
- [x] Resolved: The inspected KDBX 4+ XML extraction path omits attachment payloads, whereas older XML can embed them. Attachment references alone do not make an export complete.
- [ ] Open: Actual KDBX decryption and cross-client restore, version-specific CLI export/import, passkeys, hardware/key-file recovery, and merges. E5 needs secret-use/export approval, browser/Auto-Type authority, merge/overwrite visibility and key-change/correction boundaries.

**Assessment:** The export-scope questions now have concrete answers and the XML limitation is version-specific. No encrypted vault was opened, so complete independent recovery remains Not Verified. The overall determination remains **Insufficient evidence**.

**Human-readable criteria:** Can an administrator reproduce, inspect, recover, and operate the system from user-controlled configuration and packages without a vendor-controlled permission path?

**Rating reconciliation: 24 October 2026**

E3 and E5 remain **Not Verified** for the existing declared scope. Longevity and Transparency and Control are **Not assessed** pending their required minimums. Sovereignty is also **Not assessed** because the required access/exit/custody minimums are not all established. The prior E2 Pass is withdrawn; its essential-record migration comparison remains incomplete. This is a targeted evidence decision, not a finding that the product fails. Existing E1, E4 and Locality findings were not re-certified.

**Remaining:** Actual KDBX decryption and cross-client restore, version-specific CLI export/import, passkeys, hardware/key-file recovery, and merges. E5 needs secret-use/export approval, browser/Auto-Type authority, merge/overwrite visibility and key-change/correction boundaries.

**Next without installing locally:** Use a synthetic encrypted KDBX with non-secret test credentials, attachments/history/passkeys and expected records; seek independent-client and same-version approval/merge recovery evidence without handling real passwords or installing the target.

The individual decision and provenance are retained in `evidence/rating-reconciliation/batch-5/`. Overall: **Insufficient evidence**.

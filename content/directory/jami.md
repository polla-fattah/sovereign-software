+++
title = "Jami"
category = "Communication"
summary = "Distributed communication application that does not require a central account server."
substrate = "Local encrypted account archive and message history"
sync_model = "Distributed peer-to-peer with account archive export"
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "partial"
practical_exit = "partial"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "partial"
locality = "partial"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Jami documents account archives and desktop procedures for exporting an account and saving the local database, but the completeness of conversation history export was not independently tested."
url = "https://docs.jami.net/en_US/user/faq.html"
confidence = "high"

[[evidence]]
target = "E2"
text = "The documentation provides account backup and device-linking paths, but migration across clients and recovery of all messages and attachments were not tested."
url = "https://docs.jami.net/en_US/user/faq.html"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Jami is peer-to-peer and local account data can be backed up, but independent interpretation and full conversation restoration outside Jami were not demonstrated."
url = "https://docs.jami.net/en_US/user/introduction.html"
confidence = "medium"

[[evidence]]
target = "E4"
text = "Jami describes operation without a central authority and supports local account storage, although optional name-server behavior exists."
url = "https://docs.jami.net/en_US/user/introduction.html"
confidence = "high"

[[evidence]]
target = "E5"
text = "Encrypted communication reduces provider access, but identity recovery, contact trust, message delivery, and user correction behavior require scenario testing."
url = "https://docs.jami.net/en_US/user/faq.html"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Peer-to-peer operation and account archives support user control, but the loss consequences of missing backups and the practical exit boundary are significant."
url = "https://docs.jami.net/en_US/user/faq.html"
confidence = "high"

[[evidence]]
target = "longevity"
text = "Account archives and local databases provide preservation handles, but durable, independently readable conversation records were not shown."
url = "https://docs.jami.net/en_US/user/faq.html"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Jami does not require a central authority for ordinary communication, but network peers, DHT behavior, and optional name servers affect operation."
url = "https://docs.jami.net/en_US/user/introduction.html"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The documentation clearly warns about account loss without backups, while the full cryptographic, metadata, and message-history implications require deeper review."
url = "https://docs.jami.net/en_US/user/faq.html"
confidence = "medium"

+++

**Preliminary desk assessment:** Jami is described as distributed communication application that does not require a central account server. Its primary preservation surface is Local encrypted account archive and message history, with independence shaped by distributed peer-to-peer with account archive export. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can users retain their messages and identity, continue essential local functions when services are unavailable, recover their history, and understand synchronization or delivery limits?

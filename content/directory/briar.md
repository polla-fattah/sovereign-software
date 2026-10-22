+++
title = "Briar"
category = "Communication"
summary = "Peer-to-peer messaging application that stores messages on the participants' own devices and does not rely on a central server."
substrate = "Encrypted local database on each device"
sync_model = "Direct peer-to-peer over Tor, Wi-Fi, or Bluetooth"
limitations = ["No export mechanism has been confirmed for this entry."]
assessment_status = "complete"
assessment_date = "2026-10-22"
version_assessed = "Documentation review; release not pinned"

[eligibility]
independent_data_access = "not_verified"
practical_exit = "not_verified"
independent_recoverability = "not_verified"
retained_control = "pass"
consequential_oversight = "not_verified"

[principles]
sovereignty = "partial"
longevity = "does_not_meet"
locality = "meets"
transparency = "partial"

[[evidence]]
target = "E1"
text = "Briar stores the account and messages on the device, but the official manual states that an account cannot be recovered after uninstalling the app or forgetting the password; no general message export was confirmed."
url = "https://briarproject.org/manual/"
confidence = "medium"

[[evidence]]
target = "E2"
text = "The reviewed documentation does not establish a practical migration path for message history or identity to another implementation."
url = "https://briarproject.org/manual/"
confidence = "medium"

[[evidence]]
target = "E3"
text = "Local storage supports device custody, but the documented lack of account recovery and absence of a confirmed export leave independent recovery unverified."
url = "https://briarproject.org/manual/"
confidence = "medium"

[[evidence]]
target = "E4"
text = "The account is stored on the device and messaging can continue over Bluetooth, Wi-Fi, or Tor without a central server, but losing the device or password is consequential."
url = "https://briarproject.org/manual/"
confidence = "medium"

[[evidence]]
target = "E5"
text = "End-to-end encryption and explicit contact verification support control of communication, but delivery, deletion, and identity-recovery behavior require further testing."
url = "https://briarproject.org/manual/"
confidence = "medium"

[[evidence]]
target = "sovereignty"
text = "Local custody and decentralized transport are strong, but users cannot rely on a documented recovery or export path for their identity and message history."
url = "https://briarproject.org/manual/"
confidence = "medium"

[[evidence]]
target = "longevity"
text = "The official manual explicitly warns that an account cannot be recovered after uninstall or password loss, so durable information longevity does not meet the proposed standard in this scope."
url = "https://briarproject.org/manual/"
confidence = "medium"

[[evidence]]
target = "locality"
text = "Briar can synchronize over local Bluetooth or Wi-Fi and can operate without the internet for nearby contacts."
url = "https://briarproject.org/manual/"
confidence = "medium"

[[evidence]]
target = "transparency"
text = "The manual explains transport choices and contact verification, but account loss and message-retention behavior need more inspection."
url = "https://briarproject.org/manual/"
confidence = "medium"
+++

**Preliminary desk assessment:** Briar is described as peer-to-peer messaging application that stores messages on the participants' own devices and does not rely on a central server. Its primary preservation surface is Encrypted local database on each device, with independence shaped by direct peer-to-peer over tor, wi-fi, or bluetooth. This is a useful lead for assessment, not a verified finding: version-pinned export, restoration, migration, offline, and consequential-behavior tests remain required. The current determination is **Insufficient evidence** until those observations are recorded.

**Human-readable criteria:** Can users retain their messages and identity, continue essential local functions when services are unavailable, recover their history, and understand synchronization or delivery limits?

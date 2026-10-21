+++
title = "The Manifesto in Brief"
date = 2026-10-21T08:00:00Z
draft = false
layout = "manifesto"
weight = 1
+++

# A Manifesto for Sovereign Personal Software

> “Your data belongs to you. Your tools should respect your time, preserve your freedom, and remain useful without depending on someone else’s infrastructure.”

## 01. The Core Manifesto

Software should adapt to people, not force people to adapt to software.

Six foundational principles define Sovereign Personal Software:

1. Sovereignty: Users control their data, infrastructure, cryptographic keys, and ability to migrate.
2. Locality: Core functionality executes on the user's hardware, independently of network connectivity.
3. Predictability: Critical state transitions and rule engines are deterministic, transparent, and testable.
4. Responsiveness: Software respects human attention with sub-100ms feedback and zero artificial friction.
5. Focused Interoperability: Applications maintain bounded responsibilities while exchanging information across open protocols.
6. Longevity: Human records must outlive the applications, vendors, and runtimes that produced them.


## 06. The Seven Engineering Evaluation Tests

1. The Offline Test (Air-Gap): Does primary functionality operate cleanly with the network interface disabled?
2. The 100ms Test: Do common local interactions respond within 100 milliseconds on baseline hardware?
3. The Longevity Test: Can users recover and understand their raw data using standard system tools if the binary disappears?
4. The Responsibility Test: Does this capability belong in this tool, or should a decoupled external utility handle it?
5. The Dependency Test: Does this avoid mandatory third-party cloud accounts, fragile dependency trees, or subscriptions?
6. The Predictability Test: Are state transitions formally specified, reproducible, testable, and free of silent guesswork?
7. The Recovery & Security Test: Does the system enforce local cryptographic integrity while providing verifiable user backup and recovery?

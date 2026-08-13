# Note Detective Architecture

## Purpose

Note Detective is a standalone educational application for developing music note-reading fluency.

It is designed to run independently while also supporting integration with StudioPulse.

## Product Boundaries

Note Detective owns:

- gameplay
- note generation
- game settings
- audio
- scoring
- guest-mode persistence
- session result generation
- standalone application UI

StudioPulse owns:

- authentication
- student identity
- teacher and parent access
- long-term analytics
- GameProgress persistence
- authenticated API communication

## Deployment Model

Note Detective is maintained in an independent repository and may be distributed as:

- a standalone web application
- an embedded StudioPulse application
- a progressive web application
- a future mobile application

## StudioPulse Integration

```text
Note Detective
    │
    │ structured application events
    ▼
SP-react Host
    │
    │ authenticated API requests
    ▼
SP-express
    │
    ▼
MongoDB
```

Note Detective does not communicate directly with MongoDB or depend on StudioPulse backend internals.

## Guest Mode

Guest users may play without a StudioPulse account.

Guest progress is stored locally on the device using browser storage.

## Messaging

The permanent messaging contract has not yet been finalized.

The existing HTML prototype and integration document are implementation references only and must not be treated as the canonical StudioPulse protocol.

The final contract will define:

- application-ready events
- completed-session events
- payload versions
- origin validation
- error handling

## Security Principles

- Do not expose StudioPulse authentication tokens through query parameters.
- Do not use wildcard message origins in production.
- Validate message origin, type, version, and payload.
- Route authenticated persistence through StudioPulse.
- Keep the core game independent of StudioPulse database models.

---

# Identity & Cross-Platform Foundation

## Overview

To support future StudioPulse educational applications, the Note Detective architecture is evolving beyond a simple StudioPulse integration.

Rather than coupling gameplay directly to authentication and persistence, the application adopts a layered architecture that separates identity, player representation, storage, synchronization, and platform-specific implementations.

This architecture allows Note Detective to function both as:

- a standalone educational application for guest users
- a StudioPulse-connected learning application

while keeping gameplay independent from authentication, storage technologies, and cloud synchronization.

---

## Architectural Principles

### Guest-First Experience

The application should always be playable without requiring a StudioPulse account.

Authentication enhances the experience through cloud synchronization and teacher visibility but is never required to begin playing.

---

### Separation of Concerns

Gameplay should never depend directly on:

- StudioPulse authentication
- browser storage
- MongoDB
- synchronization logic

Instead, gameplay communicates only through platform services.

---

### Platform Independence

Storage and identity are abstracted behind interfaces so the same gameplay code can execute on:

- Web
- Progressive Web App (PWA)
- iOS
- Android

without modification.

---

### Non-Destructive Learning Records

StudioPulse GameProgress documents represent permanent learning history.

Resetting local gameplay history must never remove synchronized cloud records.

---

## Platform Architecture

```text
                    Gameplay
                        │
                        ▼
               Identity Manager
                        │
                        ▼
                Player Profile
                        │
                        ▼
            Progress Repository
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
LocalProgressRepository      MongoProgressRepository
          │                           │
          ▼                           ▼
   Local Storage               StudioPulse API
                                        │
                                        ▼
                                     MongoDB
```

Session Synchronization operates independently and coordinates movement of gameplay data between local storage and StudioPulse.

---

## Identity Lifecycle

The application supports three identity states:

- Guest
- Authenticated StudioPulse Student
- Offline Authenticated Student

Gameplay remains identical regardless of identity state.

---

## Epic Roadmap

The Identity & Cross-Platform Foundation is implemented through the following work items:

1. Identity Manager
2. Player Profile
3. Progress Repository
4. StudioPulse Authentication Bridge
5. Session Synchronization
6. Guest-to-Student Migration
7. Local History Management
8. Cross-Platform Storage Adapter

These components collectively establish the reusable platform foundation for future StudioPulse educational applications.

---

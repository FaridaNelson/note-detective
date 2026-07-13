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

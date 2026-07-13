# 2026-07-12

# Note Detective — Repository Foundation

## Overview

Created Note Detective as an independent educational application rather than implementing it directly inside the StudioPulse frontend.

This establishes a reusable product boundary for standalone web distribution, StudioPulse integration, and future mobile deployment.

## Completed

- created the public `note-detective` GitHub repository
- initialized the repository with a README and `.gitignore`
- defined Note Detective as a standalone application
- separated game ownership from StudioPulse platform ownership
- established guest mode as a product requirement
- established StudioPulse integration through a future host and messaging bridge
- identified the existing HTML prototype as migration input
- identified the existing integration document as non-canonical reference material
- created the initial architecture documentation

## Architectural Decision

Note Detective owns gameplay, game UI, local guest storage, and session result generation.

StudioPulse owns authentication, student identity, persistence, analytics, and backend communication.

The standalone game will not communicate directly with MongoDB or depend on StudioPulse backend internals.

## Current Status

Repository foundation complete.

## Next

- choose the application stack
- scaffold the standalone application
- review and migrate the existing HTML prototype
- define the canonical application-event contract
- deploy a development version
- integrate it with `NoteDetectiveHost` in `SP-react`

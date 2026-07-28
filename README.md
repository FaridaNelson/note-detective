# Note Detective

A standalone educational note-reading game that serves as the first student-facing application in the StudioPulse ecosystem.

## Goals

- Help students develop fluent note-reading skills through interactive practice.
- Operate independently in guest mode with no account required.
- Integrate securely with StudioPulse for authentication and future progress synchronization.
- Support future App Store and web distribution.

---

## Current Status

### Completed

- ✅ Standalone React/Vite application
- ✅ Phase 3 game session architecture
- ✅ Phase 4 gameplay UI integration
- ✅ Live gameplay session state (score, streak, accuracy, timer)
- ✅ Results and Settings dialogs
- ✅ Interactive piano keyboard
- ✅ Treble and bass clef support
- ✅ Automated unit tests
- ✅ Guest → StudioPulse authentication entry point
- ✅ Production-ready development workflow with GitHub PRs

---

## StudioPulse Integration

Current integration:

```
Guest
    │
    ▼
Note Detective
    │
Sign in to StudioPulse
    │
    ▼
https://studiopulse.co/?openAuth=signin
    │
    ▼
StudioPulse Authentication
```

Authentication is owned entirely by StudioPulse.

---

## Next Milestones

- Implement authenticated StudioPulse ↔ Note Detective session bridge.
- Persist gameplay statistics using the GameProgress API.
- Synchronize student progress with StudioPulse.
- Improve musical notation rendering (note stems and accidental symbols).
- Add GitHub Actions continuous integration and security scanning.

---

## Documentation

Additional project documentation is available in:

- `docs/development-log/`
- Architecture documentation
- Security documentation
- StudioPulse integration documentation

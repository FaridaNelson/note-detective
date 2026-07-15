# Note Detective — StudioPulse integration & publishing

`note-detective.html` is a single self-contained file. It plays fully **as a guest** with no sign-in, and **syncs a student's stats to StudioPulse** when a session is provided. No build step, no dependencies (fonts load from Google Fonts).

## Guest vs. signed-in

- **Guest (default):** per-note mistake history is saved to the browser's `localStorage` under `nd_stats_guest`. Works offline, stays on that device.
- **Signed in:** history is scoped to the student (`nd_stats_<studentId>` locally) and pushed to StudioPulse. On first sign-in, any guest progress on that device is carried over once.

The profile chip (top right) is the sign-in control: it shows **Guest** with a "Sign in to StudioPulse" action, or the student's name with "Sign out".

## Wiring a session (pick one)

### Option 1 — Host object (recommended for same-origin embeds)
Define `window.StudioPulse` **before** the game loads:

```js
window.StudioPulse = {
  // Return the current student's session, or null for guest.
  getSession() {
    return { studentId: '123', name: 'Lily H.', token: '<jwt>', apiBase: 'https://app.studiopulse.io/api',
             stats: { /* optional: existing stats to merge, shape below */ } };
  },
  // Persist stats. Called (debounced) after answers, on session end, and on page hide.
  saveStats({ studentId, appId, stats, lastSession }) { /* write to your DB */ },
  // Optional: run your auth flow, then provide a session (via getSession on reload,
  // or by postMessage 'studiopulse:session').
  signIn() { /* ... */ }
};
```

### Option 2 — Query params (simplest for iframe/src)
```
note-detective.html?sp_student=123&sp_name=Lily%20H.&sp_token=<jwt>&sp_api=https://app.studiopulse.io/api
```
This immediately treats the player as signed in.

### Option 3 — iframe postMessage (cross-origin embeds)
On load the game posts to its parent:
```js
{ type: 'studiopulse:ready', appId: 'note-detective' }
```
Send it a session:
```js
iframe.contentWindow.postMessage({ type: 'studiopulse:session',
  session: { studentId, name, token, apiBase, stats } }, '*');
```
The game reports progress back to the parent:
```js
{ type: 'studiopulse:stats', appId: 'note-detective',
  payload: { studentId, stats, lastSession } }
```
Other messages it honors: `studiopulse:signout`, and it emits `studiopulse:signin-request` when the guest taps "Sign in".

### REST fallback
If `apiBase` + `token` are known (via any option above, or by setting `STUDIOPULSE.apiBase` at the top of the script), the game also does:
```
PUT <apiBase>/students/<studentId>/games/note-detective/stats
Authorization: Bearer <token>
Content-Type: application/json
{ studentId, appId, stats, lastSession }
```
On page hide it uses `navigator.sendBeacon` to the same URL so the last session isn't lost.

## Data shapes

```jsonc
// stats: cumulative per note, keyed by note name (letter+accidental+octave)
{ "C♯5": { "wrong": 3, "seen": 11 }, "F4": { "wrong": 0, "seen": 8 } }

// lastSession: summary of the run that just ended
{ "score": 42, "correct": 42, "timed": true }
```
Server should treat the PUT as "replace this student's Note Detective stats" (the game sends the full cumulative object). The in-game **Reset history** button clears stats and pushes the empty object.

## Config (top of the `<script>`)
```js
const STUDIOPULSE = {
  appId: 'note-detective',
  apiBase: null,           // set to your API origin to enable the REST fallback
  statsPath: sid => `/students/${sid}/games/note-detective/stats`,
  authUrl: null,           // optional standalone sign-in redirect
};
```

## Quick local test
Open the file with `?sp_student=demo&sp_name=Lily` — the chip should switch to "Lily", the results panel shows **Synced to StudioPulse**, and you'll see `studiopulse:stats` messages if you host it in an iframe and log them.

## Publishing on GitHub Pages
1. Add the file to your repo, ideally renamed to `index.html` (so it serves at the repo root). Keep it in `/docs` or the repo root, or a `/games/note-detective/` folder if you prefer a path.
2. Repo **Settings → Pages** → Source: your branch (e.g. `main`) and folder (`/root` or `/docs`).
3. It publishes at `https://<org-or-user>.github.io/<repo>/` (or the subfolder path).
4. To embed in StudioPulse: `<iframe src="…/note-detective.html?sp_student=…&sp_name=…" ...>` and wire a session via one of the options above.

Note: it needs internet for the Google Fonts; it falls back to system fonts offline. Ask me if you want the fonts inlined for a fully offline build.

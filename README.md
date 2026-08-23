# Wider — deployable app

## Files
- `index.html`, `app.bundle.js`, `manifest.json`, `sw.js`, `icons/` — the live app.
  These are what get uploaded to GitHub/Netlify.
- `app-source.jsx` — the readable source (all activities + app logic).
  Not needed for deployment, but this is what gets edited whenever you want more
  activities or a change.

## To update the app later
Whenever you want more activities added or something changed, just ask in the
Wider conversation. The source gets edited and a new `app.bundle.js` gets
generated for you to re-upload (just that one file) — everything else stays
the same, and the update goes live within a minute of uploading.

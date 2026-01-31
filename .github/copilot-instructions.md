<!-- CentralStatic: Copilot instructions for AI coding agents -->
# Copilot guidance — CentralStatic (concise)

Purpose: give an AI agent only the repository-specific facts and examples needed to be productive quickly.

Big picture
- Frontend-only React app (Create React App / `react-scripts`) that renders a single main component `CentralStatic`.
- No backend yet: README.md lists a planned FastAPI service and blockchain integrations; current code uses mocked data and UI-only flows.

Key files (start here)
- [CentralStatic.js](CentralStatic.js#L1): main UI, state, and mock event data (`upcomingEvents` array). Edit here for UI/behavior changes.
- [index.js](index.js#L1): React entry point.
- [index.css](index.css#L1): Tailwind imports and base styles.
- [package.json](package.json#L1): `npm start`, `npm run build`, `npm test` via `react-scripts`.
- [tailwind.config.js](tailwind.config.js#L1) and [postcss.config.js](postcss.config.js#L1): Tailwind/PostCSS setup.
- [README.md](README.md#L1): project vision and high-level notes (useful for commit messages / PR context).

Developer workflows & commands
- Install dependencies: `npm install` (Node.js 16+).
- Dev server: `npm start` (CRA dev server at http://localhost:3000).
- Production build: `npm run build`.
- Tests: `npm test` (standard CRA configuration).

Project-specific patterns & conventions
- Single-file UI: most app logic lives in `CentralStatic.js`. The component contains local React state for `currentVibe`, `selectedEvent`, and `unlockedDrops` and a local `upcomingEvents` mock array.
- Mock-first integration: external integrations are mocked in-place (e.g., `upcomingEvents` and the SoundCloud iframe). To add a real integration, replace mocks with API calls and centralize data fetching.
- Styling: Tailwind classes are used inline in JSX; prefer editing classes directly in the component rather than adding separate CSS files for small UI changes.
- Icons: `lucide-react` used across the UI — import icons at top of `CentralStatic.js`.

Data shape examples (copy-pasteable)
Add new events to `upcomingEvents` following this shape:
```
{
  id: 4,
  name: "Example Event",
  date: "2026-02-01",
  time: "9:00 PM",
  location: "Brooklyn, NY",
  artist: "Artist Name",
  genre: "House",
  vibe: "energetic",
  attendees: 120,
  exclusiveDrop: { title: "Exclusive Track", unlockType: "attend", claimed: false },
  vibeScore: 87,
  description: "Short description"
}
```

Integration points (what to replace when wiring real services)
- SoundCloud: `iframe` in `CentralStatic.js` — swap to programmatic embeds or API-driven sources when available.
- VibeConnect: RSVP button currently simulates selecting `selectedEvent`. Real implementation should call a VibeConnect API and update server-side state.
- Backend & blockchain: README notes planned FastAPI + Polygon. Any server endpoints should provide event lists, check-in endpoints, and authenticated user token handling.

Editing & PR guidance for AI
- Small UI tweaks: modify `CentralStatic.js` and keep changes contained to components and Tailwind classes.
- Adding API calls: create a new `api/` module and replace the in-file mock array with data fetched in `useEffect`, keeping component structure minimal.
- State migration: if introducing global state (Redux/Context), preserve existing props/state names: `currentVibe`, `selectedEvent`, `unlockedDrops` to reduce churn.
- Tests: target behavior in components using `@testing-library/react` (already included in `package.json`).

What NOT to assume
- There is no authentication, database, or backend present today — do not add backend-dependent features without creating clear fallbacks or mock implementations.

If something is unclear
- Ask which integration to prioritize (VibeConnect, SoundCloud, or backend). Provide the exact file path you intend to modify and a 2–3 line plan before making changes.

Next step request
- After applying changes, ask the repo owner whether to wire real APIs or keep mock-mode for UI work.

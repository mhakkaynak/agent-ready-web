# DevFest Session Planner

A workshop-ready conference planner built with Next.js, TypeScript, React, and Tailwind CSS. Browse sessions, meet speakers, and build a personal schedule that persists in the browser.

The project also includes a WebMCP integration that exposes the conference catalog and schedule actions to compatible browser agents. Reusable tool logic lives in `lib/webmcp/handlers.ts`.

## Requirements

- Node.js 20.9 or newer
- npm

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm run build     # Create a production build
npm run start     # Serve the production build
npx tsc --noEmit  # Run the TypeScript check
```

Before presenting or deploying, run:

```bash
npm run lint && npx tsc --noEmit && npm run build
```

## Features

- Session browsing with search and topic, level, and time filters
- Session and speaker detail pages with generated metadata
- Personal schedule stored in `localStorage`
- Conflict detection and free-time calculation
- Responsive layout with keyboard-accessible controls
- WebMCP tools registered through `document.modelContext`
- Static generation for session and speaker detail pages

## WebMCP demo flow

The available tools are:

1. `get_all_sessions` — list the complete program
2. `get_session` — retrieve a session and its speaker by ID
3. `search_sessions` — search by title, description, room, or topic
4. `filter_sessions_by_topic` — filter by topic
5. `filter_sessions_by_level` — filter by difficulty level
6. `filter_sessions_by_time` — filter by a validated time range
7. `get_all_speakers` — list speaker profiles
8. `get_speaker` — retrieve a speaker and their sessions
9. `get_sessions_by_speaker` — list sessions for a speaker
10. `get_my_schedule` — read the saved schedule
11. `check_schedule_conflict` — find overlapping sessions
12. `find_free_slots` — find open time slots
13. `add_to_schedule` — add a session and return conflicts
14. `remove_from_schedule` — remove a session
15. `clear_schedule` — clear the saved schedule
16. `open_session` — navigate to a session detail page

Schedule mutations use the same client-side state as the UI, so tool-driven changes update the visible schedule and header count.

WebMCP is optional. If the browser does not expose `document.modelContext`, the rest of the application continues to work normally.

## Project structure

```text
app/          App Router pages and layouts
components/   UI components and client-side schedule state
lib/           Session, speaker, time, and schedule domain logic
lib/webmcp/    WebMCP handlers kept separate from React registration
public/        Static assets
types/         WebMCP type declarations
```

## Notes

This is a front-end demo with an in-memory catalog and browser-local schedule persistence. It does not include authentication, a remote database, or cross-device synchronization.

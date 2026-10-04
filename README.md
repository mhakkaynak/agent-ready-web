# DevFest Session Planner

A workshop-ready conference planner built with Next.js, TypeScript, React, and Tailwind CSS. Browse sessions, meet speakers, and build a personal schedule that persists in the browser.

The project also includes an initial WebMCP integration. The current demo exposes read-only tools for listing all sessions and retrieving a single session. Additional tool definitions remain as workshop TODOs, while their reusable handlers are already prepared in `lib/webmcp/handlers.ts`.

## Requirements

- Node.js 20.9 or newer
- npm

### Windows

Open PowerShell as Administrator and install `nvm-windows`:

```powershell
winget install CoreyButler.NVMforWindows
nvm install 24
nvm use 24
node -v # Should print a v24.x version
npm -v
```

If `winget` is not available, install `nvm-windows` from the [official releases page](https://github.com/coreybutler/nvm-windows/releases), then reopen PowerShell and run the commands above.

### macOS

The recommended option is Homebrew:

```bash
brew install nvm
mkdir -p "$HOME/.nvm"
. "$(brew --prefix nvm)/nvm.sh"
nvm install 24
node -v # Should print a v24.x version
npm -v
```

Alternatively, download and install the LTS version from [nodejs.org](https://nodejs.org/en/download).

If you prefer installing `nvm` directly in Terminal:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash
. "$HOME/.nvm/nvm.sh"
nvm install 24
node -v # Should print a v24.x version
npm -v
```

If `nvm` is not found after installation, close and reopen Terminal, then run the commands again.

### Linux

Run these commands in your terminal:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash
. "$HOME/.nvm/nvm.sh"
nvm install 24
node -v # Should print a v24.x version
npm -v
```

If `nvm` is not found after installation, close and reopen your terminal, then run the commands again.

After Node.js and npm are installed, run the project commands from the project directory:

```bash
npm install
npm run dev
```

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
- Initial WebMCP tools registered through `document.modelContext`
- Static generation for session and speaker detail pages

## WebMCP demo flow

The current tools are:

1. `get_all_sessions` — list the complete program
2. `get_session` — retrieve a session and its speaker by ID

The remaining tool handlers are ready for the workshop. Participants can add their schemas and registrations in `components/WebMcpTools.tsx` without implementing the underlying session or schedule logic.

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

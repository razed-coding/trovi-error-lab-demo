# Trovi Error Lab (Local Demo)

A simple local demo app to test how Trovi captures frontend and backend errors.

Potential clients can run this project locally, trigger test errors from the UI, and confirm events appear in their Trovi dashboard.

## What this demo does

- Provides a UI to trigger common JavaScript errors
- Triggers async and API/server-side errors
- Supports manual event capture
- Supports user context (`identifyUser` / `clearUser`)
- Shows a local session log of triggered events

## Prerequisites

- Node.js 18+
- A Trovi account + project API key

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create local env file:

```bash
cp .env.local.example .env.local
```

3. Open `.env.local` and set:

```env
NEXT_PUBLIC_TROVI_API_KEY=your_real_trovi_api_key
```

4. Start the app:

```bash
npm run dev
```

5. Open:

- [http://localhost:3000](http://localhost:3000)

## Connect to your Trovi dashboard

The demo sends events to Trovi via a local proxy route (`/api/trovi-proxy/api/ingest`) to avoid browser CORS issues.

Your events are forwarded to:

- [https://www.trovi.dev](https://www.trovi.dev)

In the Trovi dashboard, make sure filters are correct:

- Environment (`development` vs `production`)
- Time range (last 15 min / 1 hour)
- Correct project/workspace

## Quick test flow

1. Trigger **Throw TypeError**
2. Trigger **Unhandled Promise Rejection**
3. Trigger **500 Server Error**
4. Trigger **Capture Manually**

You should see:

- A local log entry in the app
- Network call to `/api/trovi-proxy/api/ingest`
- Events in Trovi dashboard after a few seconds

## Security notes

- `.env.local` is gitignored and should never be committed
- Do not share or commit real API keys
- If a key is accidentally exposed, rotate it in Trovi

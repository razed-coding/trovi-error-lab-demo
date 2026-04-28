# Femmi Error Lab (Local Demo)

A simple local demo app to test how Femmi captures frontend and backend errors.

Potential clients can run this project locally, trigger test errors from the UI, and confirm events appear in their Femmi dashboard.

## What this demo does

- Provides a UI to trigger common JavaScript errors
- Triggers async and API/server-side errors
- Supports manual event capture
- Supports user context (`identifyUser` / `clearUser`)
- Shows a local session log of triggered events

## Prerequisites

- Node.js 18+
- A Femmi account + project API key

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
NEXT_PUBLIC_FEMMI_API_KEY=your_real_femmi_api_key
```

4. Start the app:

```bash
npm run dev
```

5. Open:

- [http://localhost:3000](http://localhost:3000)

## Connect to your Femmi dashboard

The demo sends events to Femmi via a local proxy route (`/api/femmi-proxy/api/ingest`) to avoid browser CORS issues.

Your events are forwarded to:

- [https://www.femmi.dev](https://www.femmi.dev)

In the Femmi dashboard, make sure filters are correct:

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
- Network call to `/api/femmi-proxy/api/ingest`
- Events in Femmi dashboard after a few seconds

## Security notes

- `.env.local` is gitignored and should never be committed
- Do not share or commit real API keys
- If a key is accidentally exposed, rotate it in Femmi

## Monitoring

See `FEMMI_SDK_SETUP.md` for Femmi integration steps.

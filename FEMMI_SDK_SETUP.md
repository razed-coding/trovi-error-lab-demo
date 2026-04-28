# Femmi SDK setup

This repository was prepared by Femmi with an initial SDK setup.

## 1) Install dependency

```bash
npm install @femmi/sdk
```

## 2) Initialize in your runtime

### Browser apps

```ts
import { init } from "@femmi/sdk/browser";

init({
  apiKey: process.env.FEMMI_API_KEY ?? "",
  dashboardUrl: "https://femmi.dev",
  environment: process.env.NODE_ENV ?? "production",
});
```

### Node.js apps

```ts
import { init } from "@femmi/sdk/node";

init({
  apiKey: process.env.FEMMI_API_KEY ?? "",
  dashboardUrl: "https://femmi.dev",
  environment: process.env.NODE_ENV ?? "production",
});
```

Project: Trovi (trovi-d50d)

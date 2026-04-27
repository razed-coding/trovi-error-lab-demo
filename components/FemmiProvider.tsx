"use client";

import { useEffect } from "react";
import { getConfig, init } from "@trovi/sdk/browser";

export function FemmiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_FEMMI_API_KEY ?? "";
    // Route browser traffic through same-origin proxy to avoid CORS issues.
    const dashboardUrl = `${window.location.origin}/api/femmi-proxy`;

    if (!apiKey || getConfig()) return;

    try {
      init({
        apiKey,
        dashboardUrl,
        environment: process.env.NEXT_PUBLIC_FEMMI_ENV ?? "development",
        debug: true,
      });
      console.log("[Femmi Demo] Browser SDK initialized via proxy");
    } catch (err) {
      console.error("[Femmi Demo] Browser init failed", err);
    }
  }, []);

  return <>{children}</>;
}

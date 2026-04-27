"use client";

import { useEffect } from "react";
import { getConfig, init } from "@trovi/sdk/browser";

export function TroviProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_TROVI_API_KEY ?? "";
    // Route browser traffic through same-origin proxy to avoid CORS issues.
    const dashboardUrl = `${window.location.origin}/api/trovi-proxy`;

    if (!apiKey || getConfig()) return;

    try {
      init({
        apiKey,
        dashboardUrl,
        environment: process.env.NEXT_PUBLIC_TROVI_ENV ?? "development",
        debug: true,
      });
      console.log("[Trovi Demo] Browser SDK initialized via proxy");
    } catch (err) {
      console.error("[Trovi Demo] Browser init failed", err);
    }
  }, []);

  return <>{children}</>;
}

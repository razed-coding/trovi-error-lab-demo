import { NextResponse } from "next/server";
import { captureError, init } from "@trovi/sdk/node";

export async function GET() {
  const error = new Error("Internal server error");
  const apiKey = process.env.NEXT_PUBLIC_FEMMI_API_KEY ?? "";
  const dashboardUrl =
    process.env.NEXT_PUBLIC_FEMMI_DASHBOARD_URL ?? "https://www.femmi.dev";

  try {
    if (apiKey) {
      init({
        apiKey,
        dashboardUrl,
        environment: process.env.NEXT_PUBLIC_FEMMI_ENV ?? "development",
      });
    }

    captureError(error, { route: "/api/errors/server", source: "demo" });
    console.log("[Femmi Demo] server error captured", error.message);
  } catch (sdkErr) {
    console.error("[Femmi Demo] server capture failed", sdkErr);
  }

  return NextResponse.json(
    { error: true, message: error.message, type: error.name },
    { status: 500 }
  );
}

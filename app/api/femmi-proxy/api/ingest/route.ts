import { NextResponse } from "next/server";

const FEMMI_INGEST_URL =
  process.env.FEMMI_UPSTREAM_INGEST_URL ?? "https://www.femmi.dev/api/ingest";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const auth = request.headers.get("authorization") ?? "";

    const upstream = await fetch(FEMMI_INGEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? { Authorization: auth } : {}),
      },
      body,
      cache: "no-store",
    });

    const responseText = await upstream.text();

    return new NextResponse(responseText, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("[Femmi Demo] Proxy ingest failed", error);
    return NextResponse.json(
      { error: true, message: "Femmi proxy request failed" },
      { status: 502 }
    );
  }
}

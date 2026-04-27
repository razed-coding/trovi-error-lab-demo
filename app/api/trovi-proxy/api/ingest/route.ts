import { NextResponse } from "next/server";

const TROVI_INGEST_URL = process.env.TROVI_UPSTREAM_INGEST_URL ?? "https://www.trovi.dev/api/ingest";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const auth = request.headers.get("authorization") ?? "";

    const upstream = await fetch(TROVI_INGEST_URL, {
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
    console.error("[Trovi Demo] Proxy ingest failed", error);
    return NextResponse.json(
      { error: true, message: "Trovi proxy request failed" },
      { status: 502 }
    );
  }
}

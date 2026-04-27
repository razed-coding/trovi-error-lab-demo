"use client";

import { useState } from "react";
import {
  captureError,
  captureEvent,
  clearUser,
  getConfig,
  identifyUser,
} from "@trovi/sdk/browser";

type LogItem = {
  at: string;
  type: string;
  message: string;
  status: "captured" | "uncaptured" | "manual";
};

export function Dashboard() {
  const [log, setLog] = useState<LogItem[]>([]);
  const [msg, setMsg] = useState("Manual capture from Femmi Error Lab");
  const [user, setUser] = useState("");
  const [toast, setToast] = useState("");

  const initialized = Boolean(getConfig());

  const add = (item: LogItem) => setLog((prev) => [...prev, item]);

  const notify = (text: string) => {
    setToast(text);
    setTimeout(() => setToast(""), 2000);
  };

  const safeCapture = (error: unknown, type: string) => {
    try {
      captureError(error, { trigger: type });
      console.log("[Femmi Demo] captured", type);
      add({
        at: new Date().toLocaleTimeString(),
        type,
        message: (error as Error).message,
        status: "captured",
      });
      notify("Error triggered - check Femmi dashboard");
    } catch (sdkErr) {
      console.error("[Femmi Demo] capture failed", sdkErr);
      add({
        at: new Date().toLocaleTimeString(),
        type,
        message: (error as Error).message,
        status: "uncaptured",
      });
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Femmi Error Lab</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              initialized
                ? "bg-emerald-900 text-emerald-300"
                : "bg-red-900 text-red-300"
            }`}
          >
            {initialized ? "initialized" : "not initialized"}
          </span>
        </header>

        {!process.env.NEXT_PUBLIC_FEMMI_API_KEY && (
          <div className="p-3 rounded border border-amber-600 bg-amber-950/40 text-amber-300">
            Missing NEXT_PUBLIC_FEMMI_API_KEY in .env.local
          </div>
        )}

        <section className="space-y-3">
          <h2 className="text-red-400 font-semibold">
            Section 1: JavaScript Errors
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              className="px-3 py-2 rounded bg-red-900"
              onClick={() => {
                try {
                  const n = null as unknown as { x: string };
                  void n.x;
                } catch (e) {
                  safeCapture(e, "TypeError");
                }
              }}
            >
              Throw TypeError
            </button>
            <button
              className="px-3 py-2 rounded bg-red-900"
              onClick={() => {
                try {
                  throw new Error("Custom error: something went wrong");
                } catch (e) {
                  safeCapture(e, "CustomError");
                }
              }}
            >
              Throw Custom Error
            </button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-orange-400 font-semibold">
            Section 2: Async / API Errors
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              className="px-3 py-2 rounded bg-orange-900"
              onClick={() => {
                Promise.reject(new Error("Unhandled rejection test"));
                add({
                  at: new Date().toLocaleTimeString(),
                  type: "UnhandledRejection",
                  message: "Unhandled rejection test",
                  status: "uncaptured",
                });
                notify("Error triggered - check Femmi dashboard");
              }}
            >
              Unhandled Promise Rejection
            </button>
            <button
              className="px-3 py-2 rounded bg-orange-900"
              onClick={async () => {
                try {
                  const res = await fetch("/api/errors/server");
                  const data = await res.json();
                  add({
                    at: new Date().toLocaleTimeString(),
                    type: data.type,
                    message: data.message,
                    status: "captured",
                  });
                  notify("Error triggered - check Femmi dashboard");
                } catch (e) {
                  safeCapture(e, "FetchServerError");
                }
              }}
            >
              500 Server Error
            </button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-yellow-400 font-semibold">
            Section 4/5: Manual Capture and User
          </h2>
          <div className="flex flex-wrap gap-2">
            <input
              className="bg-zinc-900 rounded px-3 py-2 min-w-80"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button
              className="px-3 py-2 rounded bg-yellow-900"
              onClick={() => {
                try {
                  captureEvent({
                    type: "js_error",
                    severity: "error",
                    message: msg,
                    metadata: { source: "manual" },
                  });
                  add({
                    at: new Date().toLocaleTimeString(),
                    type: "ManualCapture",
                    message: msg,
                    status: "manual",
                  });
                  console.log("[Femmi Demo] manual event sent");
                  notify("Error triggered - check Femmi dashboard");
                } catch (e) {
                  console.error("[Femmi Demo] manual capture failed", e);
                }
              }}
            >
              Capture Manually
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <input
              className="bg-zinc-900 rounded px-3 py-2"
              placeholder="User id/email"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <button
              className="px-3 py-2 rounded bg-blue-900"
              onClick={() => identifyUser(user || "demo-user")}
            >
              Set User Context
            </button>
            <button
              className="px-3 py-2 rounded bg-blue-900"
              onClick={() => clearUser()}
            >
              Clear User Context
            </button>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Section 6: Error Log (local)</h2>
            <button
              className="text-sm text-zinc-400"
              onClick={() => setLog([])}
            >
              Clear Log
            </button>
          </div>

          <div className="h-52 overflow-auto bg-zinc-900 rounded p-3 text-sm space-y-1">
            {log.length === 0 ? (
              <p className="text-zinc-500">No entries yet.</p>
            ) : (
              log.map((item, i) => (
                <p key={`${item.at}-${item.type}-${i}`}>
                  <span className="text-zinc-500">{item.at}</span>{" "}
                  <span className="text-purple-300">{item.type}</span> - {item.message}{" "}
                  <span className="text-zinc-400">[{item.status}]</span>
                </p>
              ))
            )}
          </div>
        </section>
      </div>

      {toast ? (
        <div className="fixed bottom-4 right-4 bg-zinc-800 text-zinc-100 px-4 py-2 rounded">
          {toast}
        </div>
      ) : null}
    </main>
  );
}

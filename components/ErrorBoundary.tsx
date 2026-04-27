"use client";

import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; message: string };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    import("@trovi/sdk/browser")
      .then(({ captureError }) => {
        captureError(error, {
          source: "ErrorBoundary",
          componentStack: info.componentStack,
        });
        console.log("[Trovi Demo] ErrorBoundary captured", error.message);
      })
      .catch((e) => console.error("[Trovi Demo] Boundary report failed", e));
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 text-zinc-200 p-8">
          <h1 className="text-2xl font-bold text-red-400 mb-2">Render crash captured</h1>
          <p className="mb-4">{this.state.message}</p>
          <button
            className="px-4 py-2 rounded bg-red-700 hover:bg-red-600"
            onClick={() => this.setState({ hasError: false, message: "" })}
          >
            Reset
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

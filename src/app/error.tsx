"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Hook into your telemetry provider here (Sentry, Datadog, etc.)
    console.error("Unhandled app error:", error);
  }, [error]);

  return (
    <main
      role="alert"
      aria-live="assertive"
      className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-4 py-10 text-center"
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-7" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <h1 className="text-2xl font-semibold text-foreground">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground">
          An unexpected error interrupted your session. You can retry, or head
          back to the dashboard.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/70 font-mono">
            Ref: {error.digest}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          onClick={() => reset()}
          className="gap-2"
          aria-label="Try again"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Try again
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/dashboard">
            <Home className="size-4" aria-hidden="true" />
            Back to dashboard
          </Link>
        </Button>
      </div>
    </main>
  );
}

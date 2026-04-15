import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you’re looking for doesn’t exist or has moved. Head back to the dashboard to continue.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-4 py-10 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Compass className="size-7" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="text-2xl font-semibold text-foreground">
          Page not found
        </h1>
        <p className="text-sm text-muted-foreground">
          The page you’re looking for doesn’t exist, has been moved, or is
          temporarily unavailable.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild className="gap-2">
          <Link href="/dashboard" aria-label="Go to dashboard">
            <Home className="size-4" aria-hidden="true" />
            Dashboard
          </Link>
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/contact" aria-label="Contact support">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Contact support
          </Link>
        </Button>
      </div>
    </main>
  );
}

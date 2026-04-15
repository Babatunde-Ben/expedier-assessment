import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4"
    >
      <Skeleton className="size-12 rounded-full" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-3 w-32" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

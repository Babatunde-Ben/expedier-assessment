import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div
      role="status"
      aria-label="Loading settings"
      className="flex flex-col gap-6 p-4 md:py-8 md:pl-10 md:pr-9"
    >
      {/* Heading + tabs */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-8 w-36" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-sm" />
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-12 w-28 rounded-md" />
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-12 w-36 rounded-md" />
          <Skeleton className="h-12 w-36 rounded-md" />
          <Skeleton className="h-12 w-40 rounded-md" />
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-12 w-full rounded-md" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-sm" />
        ))}
      </div>

      <span className="sr-only">Loading settings…</span>
    </div>
  );
}

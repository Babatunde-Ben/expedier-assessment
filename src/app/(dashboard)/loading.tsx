import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardAreaLoading() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="flex flex-col gap-6 p-4 md:p-10"
    >
      {/* Page title */}
      <Skeleton className="h-8 w-40" />

      {/* Two-column top section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      {/* Content region */}
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="grid gap-6 lg:grid-cols-[1fr_430px]">
        <Skeleton className="h-72 w-full rounded-lg" />
        <div className="flex flex-col gap-6">
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-56 w-full rounded-lg" />
        </div>
      </div>

      <span className="sr-only">Loading content…</span>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div
      role="status"
      aria-label="Loading dashboard"
      className="flex flex-col"
    >
      {/* Greeting + Create Wallet */}
      <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between md:p-10">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-44" />
        </div>
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      {/* Balance block */}
      <div className="flex flex-col gap-6 border-b border-border p-4 md:p-10">
        <Skeleton className="h-4 w-20" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-11 w-36 rounded-md" />
            <Skeleton className="h-11 w-36 rounded-md" />
            <Skeleton className="h-11 w-36 rounded-md" />
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 p-4 md:p-10 lg:grid-cols-[1fr_430px]">
        <Skeleton className="h-[380px] w-full rounded-lg" />
        <div className="flex flex-col gap-6">
          <Skeleton className="h-[140px] w-full rounded-lg" />
          <Skeleton className="h-[360px] w-full rounded-lg" />
        </div>
      </div>

      <span className="sr-only">Loading dashboard…</span>
    </div>
  );
}

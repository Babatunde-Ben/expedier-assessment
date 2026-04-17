import { Skeleton } from "@/components/ui/skeleton";

export default function CardsLoading() {
  return (
    <div role="status" aria-label="Loading cards" className="flex flex-col">
      {/* Page title */}
      <Skeleton className="mx-4 my-4 h-8 w-24 md:ml-10" />

      <div className="flex flex-col lg:flex-row">
        {/* Sub-nav */}
        <div className="flex flex-col gap-3 border-b border-border p-4 lg:w-[270px] lg:border-b-0 lg:border-r md:p-6">
          <Skeleton className="h-6 w-32" />
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-sm" />
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4 lg:px-12">
          <Skeleton className="mx-auto h-6 w-48" />

          <div className="mt-10 flex flex-col items-center gap-10">
            {/* Card carousel */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-[180px] w-[240px] rounded-2xl opacity-60" />
              <Skeleton className="h-[230px] w-[360px] rounded-2xl" />
              <Skeleton className="h-[180px] w-[240px] rounded-2xl opacity-60" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="size-10 rounded-md" />
              <Skeleton className="size-10 rounded-md" />
            </div>

            {/* Form */}
            <div className="flex w-full max-w-[538px] flex-col gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-14 w-full rounded-md" />
                </div>
              ))}
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading cards…</span>
    </div>
  );
}

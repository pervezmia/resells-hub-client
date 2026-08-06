import { Spinner, Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Main loader */}
        <div className="flex flex-col items-center justify-center gap-3 py-10 sm:py-14">
          <Spinner size="lg" label="Loading ReSell Hub..." />
        </div>

        {/* Skeleton product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-separator bg-surface">
      <Skeleton className="h-40 w-full rounded-none sm:h-48" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}
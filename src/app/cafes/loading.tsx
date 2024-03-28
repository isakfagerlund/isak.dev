import { Skeleton } from "../_components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full">
      <div className="mb-2 flex gap-2">
        <div className="mt-12 grid h-full w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[254px] w-full rounded-lg" />
          <Skeleton className="h-[254px] w-full rounded-lg" />
          <Skeleton className="h-[254px] w-full rounded-lg" />
          <Skeleton className="h-[254px] w-full rounded-lg" />
          <Skeleton className="h-[254px] w-full rounded-lg" />
          <Skeleton className="h-[254px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

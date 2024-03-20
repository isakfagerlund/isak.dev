import { Skeleton } from "~/app/_components/ui/skeleton";

export default function Loading() {
  return (
    <div className="m-auto flex h-full max-w-[600px] flex-col justify-between py-6">
      <section>
        <Skeleton className="mb-3 h-[24px] w-full rounded-lg" />
        <Skeleton className="mb-3 h-[60px] w-full rounded-lg" />
        <Skeleton className="mb-3 h-[18px] w-full rounded-lg" />
      </section>
      <Skeleton className="h-[300px] w-full rounded-lg border border-slate-100 object-cover" />
    </div>
  );
}

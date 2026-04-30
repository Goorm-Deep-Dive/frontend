import { Skeleton } from "@/components/ui/skeleton";

export default function OverallProgressSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-28 rounded-sm" />
        <div className="flex flex-col items-end gap-1.5">
          <Skeleton className="h-4 w-24 rounded-sm" />
          <Skeleton className="h-4 w-20 rounded-sm" />
        </div>
      </div>

      <hr className="mt-2.5 mb-6 rounded-md border-gray-300" />

      <div className="flex items-center justify-center gap-6">
        <Skeleton className="h-34 w-34 rounded-full" />
        <div className="flex w-29.5 flex-col gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-2 w-2 rounded-xs" />
                <Skeleton className="h-4 w-14 rounded-sm" />
              </div>
              <Skeleton className="h-4 w-8 rounded-sm" />
            </div>
          ))}

          <div className="flex items-center justify-center pt-1">
            <Skeleton className="h-7 w-22 rounded-[10px]" />
          </div>
        </div>
      </div>
    </>
  );
}

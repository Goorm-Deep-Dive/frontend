import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          className="bg-tab-bg flex flex-col gap-2 rounded-md px-2.5 py-3 shadow-sm"
          key={index}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-5 w-5 rounded-sm" />
              <Skeleton className="h-5 w-16 rounded-sm" />
            </div>
            <Skeleton className="h-4 w-12 rounded-sm" />
          </div>
          <Skeleton className="h-3 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

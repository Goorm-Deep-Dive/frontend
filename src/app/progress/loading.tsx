import Header from "@/components/common/header";
import BottomNavigation from "@/components/common/bottom-navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Header variant="default" title="진행상황" />
      <div className="flex h-7.5 w-full items-center justify-center rounded-lg bg-[linear-gradient(to_bottom,var(--color-tab-bg-start),var(--color-tab-bg-end))]">
        <Skeleton className="h-4 w-44 rounded-sm" />
      </div>

      <div className="bg-primary-1 px-5 py-9">
        <div className="rounded-md bg-white px-5 py-2.5">
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
        </div>
      </div>

      <div className="flex flex-col gap-1.5 px-5 py-1.5">
        <div className="px-5 py-4">
          <Skeleton className="h-6 w-24 rounded-sm" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="bg-tab-bg flex flex-col gap-2 rounded-md px-2.5 py-3 shadow-sm" key={index}>
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
      </div>
      <BottomNavigation />
    </>
  );
}

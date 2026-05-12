import BottomNavigation from "@/components/common/bottom-navigation";
import { Skeleton } from "@/components/ui/skeleton";

const CHECKLIST_ROW_PLACEHOLDER_COUNT = 4;

export default function Loading() {
  return (
    <>
      <header className="fixed top-0 z-50 mx-auto flex w-full max-w-(--app-max-width) items-start justify-between rounded-b-2xl bg-white px-5 pt-2.5 pb-4 shadow-sm transition-all duration-300">
        <Skeleton className="h-11 w-11 shrink-0 rounded-md" aria-hidden />
        <div className="flex min-w-0 flex-1 flex-col px-2">
          <div className="bg-primary-10 flex w-full items-center justify-between gap-4 rounded-lg px-2.5 py-2.5">
            <Skeleton className="h-7 w-28 max-w-[55%] rounded-md" aria-hidden />
            <Skeleton className="h-6.5 w-17.5 shrink-0 rounded-2xl" aria-hidden />
          </div>
        </div>
        <Skeleton className="h-11 w-11 shrink-0 rounded-md" aria-hidden />
      </header>

      <div className="h-[90px] min-h-[90px] w-full shrink-0" aria-hidden />

      <div
        className="flex w-full flex-col"
        aria-busy
        aria-label="체크리스트를 불러오는 중입니다"
      >
        <div className="flex w-full flex-col gap-5 pt-5">
          <div className="flex flex-col justify-center gap-5 px-5">
            <div className="bg-gr2 border-gray-30 flex flex-col gap-5 rounded-lg border px-9 py-7.5 pb-10">
              <div className="flex justify-center">
                <div className="flex flex-wrap items-end justify-center gap-x-5 gap-y-2">
                  <Skeleton className="h-5 w-24 rounded-sm" aria-hidden />
                  <Skeleton className="h-10 w-14 rounded-sm" aria-hidden />
                  <Skeleton className="h-5 w-20 rounded-sm" aria-hidden />
                </div>
              </div>
              <div className="flex w-full gap-2.5">
                <Skeleton className="h-10 flex-1 rounded-lg" aria-hidden />
                <Skeleton className="h-10 flex-1 rounded-lg" aria-hidden />
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pb-2">
              {Array.from({ length: CHECKLIST_ROW_PLACEHOLDER_COUNT }).map(
                (_, index) => (
                  <div
                    className="flex justify-between rounded-lg bg-gray-200 px-5 py-3"
                    key={index}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Skeleton
                        className="h-8 min-h-8 w-8 min-w-8 shrink-0 rounded-full"
                        aria-hidden
                      />
                      <Skeleton
                        className="h-4 w-[min(100%,12rem)] max-w-full rounded-sm"
                        aria-hidden
                      />
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      <Skeleton className="h-3.5 w-14 rounded-sm" aria-hidden />
                      <Skeleton className="h-2.5 w-1.5 rounded-sm" aria-hidden />
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </>
  );
}

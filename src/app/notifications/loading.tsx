import Header from "@/components/common/header";
import { Skeleton } from "@/components/ui/skeleton";

const NOTIFICATION_SKELETON_COUNT = 5;

export default function Loading() {
  return (
    <>
      <Header title="알림" variant="detail" />
      <div
        className="flex flex-col gap-4 px-5 py-5"
        aria-busy
        aria-label="알림을 불러오는 중입니다"
      >
        <Skeleton className="h-4 w-24 rounded-md" aria-hidden />
        <div className="flex flex-col gap-3">
          {Array.from({ length: NOTIFICATION_SKELETON_COUNT }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-24 w-full rounded-2xl"
              aria-hidden
            />
          ))}
        </div>
      </div>
    </>
  );
}

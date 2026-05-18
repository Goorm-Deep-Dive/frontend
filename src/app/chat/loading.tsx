import Header from "@/components/common/header";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

const MESSAGE_PLACEHOLDER_COUNT = 3;

export default function Loading() {
  return (
    <div className="flex min-h-full flex-col bg-gray-100">
      <Header title="AI 코디네이터" variant="detail" />

      <div
        className="flex min-h-0 flex-1 flex-col"
        aria-busy
        aria-label="대화를 불러오는 중입니다"
      >
        <div className="flex flex-1 flex-col gap-4 px-5 py-5">
          {Array.from({ length: MESSAGE_PLACEHOLDER_COUNT }).map((_, index) => {
            const isUser = index % 2 === 0;

            return (
              <div
                key={index}
                className={cn(
                  "flex w-full",
                  isUser ? "justify-end" : "justify-start",
                )}
              >
                <Skeleton
                  className={cn(
                    "h-16 rounded-2xl",
                    isUser ? "w-[min(78%,16rem)]" : "w-[min(78%,18rem)]",
                  )}
                  aria-hidden
                />
              </div>
            );
          })}
        </div>

        <div className="px-5 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <Skeleton
            className="min-h-15.5 w-full rounded-[2.5rem]"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

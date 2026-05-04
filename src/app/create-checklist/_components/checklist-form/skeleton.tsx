import { Skeleton } from "@/components/ui/skeleton";

const ACCORDION_ITEM_COUNT = 3;
const OPTION_ROW_COUNT = 4;

function SurveyAccordionSkeleton() {
  return (
    <section
      className="border-border bg-card w-full max-w-[560px] overflow-hidden rounded-2xl border"
      aria-hidden
    >
      <div className="border-b border-gray-200 px-5 py-2.5">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-[85%] max-w-md rounded-lg" />
          <Skeleton className="h-4 w-[70%] max-w-sm rounded-lg" />
        </div>
      </div>
      <div className="bg-muted p-5">
        <div className="flex flex-col gap-1.25">
          {Array.from({ length: OPTION_ROW_COUNT }).map((_, i) => (
            <Skeleton
              key={i}
              className="dark:bg-muted h-[52px] w-full rounded-2xl border border-transparent bg-gray-200/80"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ChecklistFormSkeleton() {
  return (
    <div
      className="flex flex-col gap-5 p-5"
      aria-busy
      aria-label="설문을 불러오는 중입니다"
    >
      {Array.from({ length: ACCORDION_ITEM_COUNT }).map((_, i) => (
        <SurveyAccordionSkeleton key={i} />
      ))}
    </div>
  );
}

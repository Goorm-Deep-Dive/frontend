import { Button } from "@/components/ui/button";
import ChecklistFormSkeleton from "./checklist-form/skeleton";

export default function PageSkeleton() {
  return (
    <>
      <div className="flex min-h-39 w-full items-end justify-between border-b border-gray-300 px-6.5 pb-5">
        <div className="flex flex-col gap-2.5">
          <span className="h1">체크리스트 생성</span>
          <span className="body text-gray-700">
            상황에 맞춰 리스트를 생성합니다.
          </span>
        </div>
        <div className="flex flex-col items-end gap-3.5">
          <Button size="small" rounded>
            임시 저장하기
          </Button>
        </div>
      </div>
      <ChecklistFormSkeleton />
    </>
  );
}

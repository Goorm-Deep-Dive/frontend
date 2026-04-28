import { Suspense } from "react";
import ChecklistForm from "./checklist-form";
import ChecklistFormSkeleton from "./checklist-form/skeleton";

export default function Content() {
  return (
    <>
      <div className="flex min-h-39 w-full items-end justify-between border-b border-gray-300 px-6.5 pb-5">
        <div className="flex flex-col gap-2.5">
          <span className="h1">체크리스트 생성</span>
          <span className="body">상황에 맞춰 리스트를 생성합니다.</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="h3">1/3단계</span>
          <span className="label">임시 저장하기</span>
        </div>
      </div>

      <Suspense fallback={<ChecklistFormSkeleton />}>
        <ChecklistForm />
      </Suspense>
    </>
  );
}

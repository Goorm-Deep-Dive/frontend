"use client";

import { Suspense } from "react";
import CategoryCardsPanel from "./category-cards-panel";
import CategoryCardsSkeleton from "./category-cards-skeleton";
import OverallProgressPanel from "./overall-progress-panel";
import OverallProgressSkeleton from "./overall-progress-skeleton";

export default function Content() {
  return (
    <>
      <div className="bg-primary-1 px-5 py-9">
        <div className="rounded-md bg-white px-5 py-2.5">
          <Suspense fallback={<OverallProgressSkeleton />}>
            <OverallProgressPanel />
          </Suspense>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 px-5 py-1.5">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="h2">상세 업무 현황</span>
          </div>
        </div>

        <Suspense fallback={<CategoryCardsSkeleton />}>
          <CategoryCardsPanel />
        </Suspense>
      </div>
    </>
  );
}

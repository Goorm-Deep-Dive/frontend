"use client";

import { useGetOverallProgress } from "@/apis/generated/api-client";
import CategoryCard from "./category-card";

import CategoryCardsSkeleton from "./category-cards-skeleton";

export default function CategoryCardsPanel() {
  const { data: progress, isPending } = useGetOverallProgress();

  if (isPending) {
    return <CategoryCardsSkeleton />;
  }

  return (
    <div className="grid grid-cols-2 gap-3 pb-6">
      {progress?.checklistCategoryProgressResList?.map((item) => (
        <CategoryCard
          key={item.categoryId}
          name={item.categoryName ?? ""}
          completedCount={item.completedCount ?? 0}
          totalCount={item.totalCount ?? 0}
          progressRate={item.progressRate ?? 0}
        />
      ))}
    </div>
  );
}

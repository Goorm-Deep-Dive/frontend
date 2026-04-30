"use client";

import {
  useGetActiveDeceasedProfileSuspense,
  useGetOverallProgressSuspense,
} from "@/apis/generated/api-client";
import CircleGraph from "@/components/common/circle-graph";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const colors = ["#FFCA96", "#DD8853", "#35ACB7", "#006C76"];

export default function OverallProgressPanel() {
  const { data: activeDeceasedProfile } = useGetActiveDeceasedProfileSuspense();
  const { data: progress } = useGetOverallProgressSuspense();

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="h2">전체 일정 진행률</span>

        <div className="flex flex-col items-end justify-end">
          <span className="caption font-semibold text-gray-700">
            {activeDeceasedProfile.name} 님의 영면일
          </span>
          <span className="caption text-primary-1 font-semibold">
            {activeDeceasedProfile.dateOfDeath &&
              format(new Date(activeDeceasedProfile.dateOfDeath), "yyyy.MM.dd")}
          </span>
        </div>
      </div>

      <hr className="mt-2.5 mb-6 rounded-md border-gray-300" />

      <div className="flex items-center justify-center gap-6">
        <CircleGraph
          items={
            progress?.checklistCategoryProgressResList?.map((item, index) => ({
              label: item.categoryName ?? "",
              value: Number(item.progressRate ?? 0),
              color: colors[index] ?? colors[colors.length - 1],
            })) ?? []
          }
        />

        <div className="flex w-29.5 flex-col">
          {progress?.checklistCategoryProgressResList?.map((item, index) => (
            <div className="flex items-center justify-between" key={item.categoryId}>
              <div className="flex items-center gap-1.5">
                <div
                  className="h-2 w-2 rounded-xs"
                  style={{ backgroundColor: colors[index] ?? colors[colors.length - 1] }}
                />
                <span>{item.categoryName}</span>
              </div>
              <span className="caption text-gray-700">{item.completedCount}건</span>
            </div>
          ))}

          <div className="px flex items-center justify-center p-2.25">
            <Button size="small">전체 요약보기</Button>
          </div>
        </div>
      </div>
    </>
  );
}

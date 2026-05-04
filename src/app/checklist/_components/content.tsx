"use client";

import {
  useGetActiveDeceasedProfile,
  useGetCategoryProcedures,
} from "@/apis/generated/api-client";
import ChecklistHeaderCard from "./checklist-header-card";
import ChecklistList from "./checklist-list";
import { useChecklistCategoryStore } from "@/store/useChecklistCategoryStore";

export default function Content() {
  const { data: profile } = useGetActiveDeceasedProfile();

  const selectedCategoryId = useChecklistCategoryStore(
    (s) => s.selectedCategoryId,
  );

  const { data: proceduresRes } = useGetCategoryProcedures(
    selectedCategoryId ?? 0,
    {
      query: {
        enabled:
          typeof selectedCategoryId === "number" && selectedCategoryId > 0,
      },
    },
  );

  const remainingCount = proceduresRes?.procedures?.filter(
    (item) => !item.checked,
  ).length;

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-5">
        <div className="bg-tab-bg flex justify-center gap-2.5 py-1.5">
          <span className="label">가장 빠른 기한까지 </span>
          <span className="text-sementic-red">D-100</span>
          <span className="label">일 남았어요</span>
        </div>

        <div className="flex flex-col justify-center gap-5 px-5">
          <ChecklistHeaderCard
            profile={profile?.name ?? ""}
            count={remainingCount ?? 0}
          />

          <div className="flex flex-col gap-2.5 pb-2">
            {proceduresRes?.procedures?.map((item, index) => (
              <ChecklistList
                key={item.procedureId}
                procedureId={item.procedureId ?? 0}
                userProcedureChecklistId={item.userProcedureChecklistId ?? 0}
                title={item.procedureName ?? ""}
                index={index + 1}
                listDate={item.remainingDays ?? 0}
                isDone={item.checked}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

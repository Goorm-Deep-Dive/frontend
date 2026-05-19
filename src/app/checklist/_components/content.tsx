"use client";

import {
  useGetActiveDeceasedProfile,
  useGetCategoryProcedures,
} from "@/apis/generated/api-client";
import { useRequireSurveyCompleted } from "@/hooks/use-require-survey-completed";
import ChecklistHeaderCard from "./checklist-header-card";
import ChecklistList from "./checklist-list";
import { useChecklistCategoryStore } from "@/store/useChecklistCategoryStore";
import { useEffect } from "react";
import { event } from "@/lib/gtag";

export default function Content() {
  useRequireSurveyCompleted();

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

  useEffect(() => {
    event("checklist_page_view");
  }, []);

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-5 pt-5">
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
                priority={item.priority}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

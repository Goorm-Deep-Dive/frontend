"use client";

import {
  useGetActiveDeceasedProfile,
  useGetCategoryProcedures,
} from "@/apis/generated/api-client";
import { useRequireSurveyCompleted } from "@/hooks/use-require-survey-completed";
import ChecklistHeaderCard from "./checklist-header-card";
import ChecklistList from "./checklist-list";
import ChecklistAdd from "./checklist-add";
import { useChecklistCategoryStore } from "@/store/useChecklistCategoryStore";
import { useState } from "react";
import { useEffect } from "react";
import { event } from "@/lib/gtag";

const checklistAddItems = [
  {
    procedureId: 1,
    title: "1번",
    listDate: 30,
    isDone: false,
  },
  {
    procedureId: 2,
    title: "2번",
    listDate: 29,
    isDone: false,
  },
  {
    procedureId: 3,
    title: "3번",
    listDate: 28,
    isDone: false,
  },
  {
    procedureId: 4,
    title: "4번",
    listDate: 27,
    isDone: true,
  },
];

export default function Content() {
  const [isListClicked, setIsListClicked] = useState(false);
  const [isAddListClicked, setIsAddListClicked] = useState(false);
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
            isClicked={isListClicked}
            onClick={() => setIsListClicked((prev) => !prev)}
          />

          <div className="flex flex-col gap-5.5">
            <button className="h4 w-full rounded-2xl bg-gray-700 px-5 py-1.25 text-left text-white">
              현재 목록
            </button>
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

          {isListClicked && (
            <div className="flex flex-col gap-5.5">
              <button className="h4 w-full rounded-2xl bg-gray-700 px-5 py-1.25 text-left text-white">
                추가 기능 목록
              </button>
              <div className="flex flex-col gap-2.5">
                {checklistAddItems.map((item, index) => (
                  <ChecklistAdd
                    key={item.procedureId}
                    procedureId={item.procedureId}
                    title={item.title}
                    index={index + 1}
                    listDate={item.listDate}
                    isDone={item.isDone}
                    isClicked={isAddListClicked}
                    onClick={() => setIsAddListClicked((prev) => !prev)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

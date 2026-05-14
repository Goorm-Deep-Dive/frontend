"use client";

import ChecklistHeaderCard from "./checklist-header-card";
import ChecklistSection from "./checklist-section";
import ChecklistMinusButton from "./checklist-minus-button";
import CheckListAddButton from "./checklist-add-button";
import { useState, useEffect } from "react";
import { useRequireSurveyCompleted } from "@/hooks/use-require-survey-completed";
import {
  useGetActiveDeceasedProfile,
  useGetCategoryProcedures,
  useGetOptionalProcedures,
  useCreateOptionalProcedure,
  useDeleteProcedureChecklist,
} from "@/apis/generated/api-client";
import { event } from "@/lib/gtag";
import { useChecklistCategoryStore } from "@/store/useChecklistCategoryStore";

type CurrentChecklistItem = {
  procedureId?: number;
  userProcedureChecklistId?: number;
  procedureName?: string;
  remainingDays?: number;
  checked?: boolean;
  isAdded?: boolean;
};

type OptionalProcedure = {
  categoryId: number;
  categoryName: string;
  priority: string;
  procedureId: number;
  procedureName: string;
  remainingDays: number;
  isAdded: boolean;
};

export default function Content() {
  useRequireSurveyCompleted();
  const [isListEditClicked, setIsListEditClicked] = useState(false);
  const [currentList, setCurrentList] = useState<CurrentChecklistItem[]>([]);
  const [addList, setAddList] = useState<OptionalProcedure[]>([]);

  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [removedIds, setRemovedIds] = useState<number[]>([]);

  const { data: profile } = useGetActiveDeceasedProfile();

  const selectedCategoryId = useChecklistCategoryStore(
    (s) => s.selectedCategoryId,
  );
  const { data: proceduresRes, refetch } = useGetCategoryProcedures(
    selectedCategoryId ?? 0,
    {
      query: {
        enabled:
          typeof selectedCategoryId === "number" && selectedCategoryId > 0,
      },
    },
  );

  const { data: optionalProcedures } = useGetOptionalProcedures({
    query: {
      enabled: typeof selectedCategoryId === "number" && selectedCategoryId > 0,
    },
  });

  console.log(optionalProcedures);

  const remainingCount = proceduresRes?.procedures?.filter(
    (item) => !item.checked,
  ).length;

  const handleAddChecklist = (item: OptionalProcedure) => {
    setAddList((prev) =>
      prev.filter((addItem) => addItem.procedureId !== item.procedureId),
    );

    setCurrentList((prev) => [
      ...prev,
      {
        procedureId: item.procedureId,
        userProcedureChecklistId: 0,
        procedureName: item.procedureName,
        remainingDays: item.remainingDays,
        checked: false,
        isAdded: true,
      },
    ]);

    setAddedIds((prev) => [...prev, item.procedureId]);
  };

  const handleRemoveChecklist = (item: CurrentChecklistItem) => {
    setCurrentList((prev) =>
      prev.filter(
        (currentItem) => currentItem.procedureId !== item.procedureId,
      ),
    );

    setAddList((prev) => [
      ...prev,
      {
        categoryId: 0,
        categoryName: "",
        priority: "",
        procedureId: item.procedureId ?? 0,
        procedureName: item.procedureName ?? "",
        remainingDays: item.remainingDays ?? 0,
        isAdded: false,
      },
    ]);

    if (item.isAdded) {
      setAddedIds((prev) => prev.filter((id) => id !== item.procedureId));

      return;
    }

    setRemovedIds((prev) => [...prev, item.userProcedureChecklistId ?? 0]);
  };

  const { mutateAsync: addChecklist } = useCreateOptionalProcedure();

  const { mutateAsync: deleteChecklist } = useDeleteProcedureChecklist();

  const handleSaveChecklist = async () => {
    try {
      await Promise.all(
        addedIds.map((procedureId) =>
          addChecklist({
            procedureId,
          }),
        ),
      );

      await Promise.all(
        removedIds.map((userProcedureChecklistId) =>
          deleteChecklist({
            userProcedureChecklistId,
          }),
        ),
      );

      await refetch();

      setAddedIds([]);
      setRemovedIds([]);

      setIsListEditClicked(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    event("checklist_page_view");
  }, []);

  useEffect(() => {
    if (proceduresRes?.procedures) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentList(
        proceduresRes.procedures.map((item) => ({
          ...item,
          isAdded: false,
        })),
      );
    }
  }, [proceduresRes]);

  useEffect(() => {
    if (optionalProcedures) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAddList(
        optionalProcedures.map((item) => ({
          categoryId: item.categoryId ?? 0,
          categoryName: item.categoryName ?? "",
          priority: item.priority ?? "",
          procedureId: item.procedureId ?? 0,
          procedureName: item.procedureName ?? "",
          remainingDays: item.remainingDays ?? 0,
          isAdded: false,
        })),
      );
    }
  }, [optionalProcedures]);

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-5 pt-5">
        <div className="flex flex-col justify-center gap-5 px-5">
          <ChecklistHeaderCard
            profile={profile?.name ?? ""}
            count={remainingCount ?? 0}
            isClicked={isListEditClicked}
            onClick={() => setIsListEditClicked((prev) => !prev)}
            onSave={handleSaveChecklist}
          />

          <div className="flex flex-col gap-5.5">
            <div className="h4 w-full rounded-2xl bg-gray-700 px-5 py-1.25 text-left text-white">
              현재목록
            </div>

            <div className="flex flex-col gap-5.5">
              <div className="flex flex-col gap-2.5">
                {currentList.map((item, index) => (
                  <div
                    key={item.procedureId}
                    className="flex w-full items-center gap-2.5"
                  >
                    {item.isAdded && (
                      <ChecklistMinusButton
                        onClick={() => handleRemoveChecklist(item)}
                      />
                    )}

                    <ChecklistSection
                      procedureId={item.procedureId ?? 0}
                      userProcedureChecklistId={
                        item.userProcedureChecklistId ?? 0
                      }
                      title={item.procedureName ?? ""}
                      index={index + 1}
                      listDate={item.remainingDays ?? 0}
                      isDone={item.checked}
                    />
                  </div>
                ))}
              </div>
            </div>

            {isListEditClicked && (
              <div className="flex flex-col gap-5.5">
                <div className="h4 w-full rounded-2xl bg-gray-700 px-5 py-1.25 text-left text-white">
                  추가 가능 목록
                </div>
                <div className="flex flex-col gap-2.5">
                  {addList.map((item, index) => (
                    <div
                      key={item.procedureId}
                      className="flex w-full items-center gap-2.5"
                    >
                      <CheckListAddButton
                        onClick={() => handleAddChecklist(item)}
                      />
                      <ChecklistSection
                        procedureId={item.procedureId}
                        userProcedureChecklistId={0}
                        title={item.procedureName}
                        index={index + 1}
                        listDate={item.remainingDays}
                        isDone={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import ChecklistHeaderCard from "./checklist-header-card";
import ChecklistList from "./checklist-list";
import ChecklistSection from "./checklist-section";
import ChecklistMinusButton from "./checklist-minus-button";
import CheckListAddButton from "./checklist-add-button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRequireSurveyCompleted } from "@/hooks/use-require-survey-completed";
import {
  useGetActiveDeceasedProfile,
  useGetCategoryProcedures,
  useGetOptionalProcedures,
  useCreateOptionalProcedure,
  useDeleteProcedureChecklist,
} from "@/apis/generated/api-client";
import type { OptionalProcedureRes } from "@/apis/generated/model/optionalProcedureRes";
import type { Procedure } from "@/apis/generated/model/procedure";
import { event } from "@/lib/gtag";
import { useChecklistCategoryStore } from "@/store/useChecklistCategoryStore";

type CurrentChecklistItem = Procedure & {
  isAdded: boolean;
};

type OptionalProcedure = {
  categoryId: number;
  categoryName: string;
  priority: string;
  procedureId: number;
  procedureName: string;
  remainingDays: number;
};

const mapOptionalProcedure = (
  item: OptionalProcedureRes,
): OptionalProcedure => ({
  categoryId: item.categoryId ?? 0,
  categoryName: item.categoryName ?? "",
  priority: item.priority ?? "",
  procedureId: item.procedureId ?? 0,
  procedureName: item.procedureName ?? "",
  remainingDays: item.remainingDays ?? 0,
});

const buildAddList = (
  optionalProcedures: OptionalProcedureRes[] | undefined,
  currentList: CurrentChecklistItem[],
): OptionalProcedure[] => {
  const currentProcedureIds = new Set(
    currentList
      .map((item) => item.procedureId)
      .filter((id): id is number => typeof id === "number"),
  );

  return (optionalProcedures ?? [])
    .filter(
      (item) =>
        typeof item.procedureId === "number" &&
        !currentProcedureIds.has(item.procedureId),
    )
    .map(mapOptionalProcedure);
};

export default function Content() {
  useRequireSurveyCompleted();
  const [isListEditClicked, setIsListEditClicked] = useState(false);
  const [currentList, setCurrentList] = useState<CurrentChecklistItem[]>([]);
  const [pendingAddProcedureIds, setPendingAddProcedureIds] = useState<
    number[]
  >([]);
  const [pendingDeleteChecklistIds, setPendingDeleteChecklistIds] = useState<
    number[]
  >([]);

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

  const procedures = proceduresRes?.procedures;

  const remainingCount =
    procedures?.filter((item) => !item.checked).length ?? 0;

  const availableAddList = useMemo(() => {
    if (!isListEditClicked) return [];

    return buildAddList(optionalProcedures, currentList);
  }, [currentList, isListEditClicked, optionalProcedures]);

  const resetEditStateFromServer = useCallback(() => {
    const nextCurrentList: CurrentChecklistItem[] = (
      proceduresRes?.procedures ?? []
    ).map((item) => ({
      ...item,
      isAdded: false,
    }));

    setCurrentList(nextCurrentList);
    setPendingAddProcedureIds([]);
    setPendingDeleteChecklistIds([]);
  }, [proceduresRes?.procedures]);

  const handleEnterListEdit = () => {
    resetEditStateFromServer();
    setIsListEditClicked(true);
  };

  const handleAddChecklist = (item: OptionalProcedure) => {
    const originalProcedure = (procedures ?? []).find(
      (procedure) => procedure.procedureId === item.procedureId,
    );

    if (
      originalProcedure?.userProcedureChecklistId &&
      pendingDeleteChecklistIds.includes(
        originalProcedure.userProcedureChecklistId,
      )
    ) {
      setPendingDeleteChecklistIds((prev) =>
        prev.filter((id) => id !== originalProcedure.userProcedureChecklistId),
      );

      setCurrentList((prev) => [
        ...prev,
        {
          ...originalProcedure,
          isAdded: false,
        },
      ]);

      return;
    }

    setPendingAddProcedureIds((prev) => [...prev, item.procedureId]);

    setCurrentList((prev) => [
      ...prev,
      {
        procedureId: item.procedureId,
        userProcedureChecklistId: 0,
        procedureName: item.procedureName,
        remainingDays: item.remainingDays,
        priority: item.priority,
        checked: false,
        isAdded: true,
      },
    ]);
  };

  const handleRemoveChecklist = (item: CurrentChecklistItem) => {
    setCurrentList((prev) =>
      prev.filter(
        (currentItem) => currentItem.procedureId !== item.procedureId,
      ),
    );

    if (item.isAdded) {
      setPendingAddProcedureIds((prev) =>
        prev.filter((id) => id !== item.procedureId),
      );

      return;
    }

    if (item.userProcedureChecklistId) {
      setPendingDeleteChecklistIds((prev) =>
        prev.includes(item.userProcedureChecklistId!)
          ? prev
          : [...prev, item.userProcedureChecklistId!],
      );
    }
  };

  const { mutateAsync: addChecklist } = useCreateOptionalProcedure();
  const { mutateAsync: deleteChecklist } = useDeleteProcedureChecklist();

  const handleSaveChecklist = async () => {
    try {
      await Promise.all(
        pendingAddProcedureIds.map((procedureId) =>
          addChecklist({
            procedureId,
          }),
        ),
      );

      await Promise.all(
        pendingDeleteChecklistIds.map((userProcedureChecklistId) =>
          deleteChecklist({
            userProcedureChecklistId,
          }),
        ),
      );

      await refetch();

      setPendingAddProcedureIds([]);
      setPendingDeleteChecklistIds([]);
      setIsListEditClicked(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    event("checklist_page_view");
  }, []);

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-5 pt-5">
        <div className="flex flex-col justify-center gap-5 px-5">
          <ChecklistHeaderCard
            profile={profile?.name ?? ""}
            count={remainingCount}
            isClicked={isListEditClicked}
            onClick={handleEnterListEdit}
            onSave={handleSaveChecklist}
          />

          {!isListEditClicked ? (
            <div className="flex flex-col gap-2.5">
              {(procedures ?? []).map((item, index) => (
                <ChecklistList
                  key={item.procedureId}
                  procedureId={item.procedureId ?? 0}
                  userProcedureChecklistId={item.userProcedureChecklistId ?? 0}
                  title={item.procedureName ?? ""}
                  index={index + 1}
                  listDate={item.remainingDays ?? 0}
                  isDone={item.checked}
                  dueDateType={item.dueDateType}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-5.5">
              <div className="h4 w-full rounded-2xl bg-gray-700 px-5 py-1.25 text-left text-white">
                현재목록
              </div>

              <div className="flex flex-col gap-2.5">
                {currentList.map((item, index) => (
                  <div
                    key={item.procedureId}
                    className="flex w-full items-center gap-2.5"
                  >
                    {item.priority !== "필수" && (
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
                      dueDateType={item.dueDateType}
                      isEditMode
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-5.5">
                <div className="h4 w-full rounded-2xl bg-gray-700 px-5 py-1.25 text-left text-white">
                  추가 가능 목록
                </div>

                <div className="flex flex-col gap-2.5">
                  {availableAddList.length === 0 ? (
                    <span className="body2 text-center text-gray-500">
                      추가할 수 있는 항목이 없습니다
                    </span>
                  ) : (
                    availableAddList.map((item, index) => (
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
                          dueDateType="RELATIVE"
                          isEditMode
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

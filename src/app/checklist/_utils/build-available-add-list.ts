import type { OptionalProcedureRes } from "@/apis/generated/model/optionalProcedureRes";
import type { Procedure } from "@/apis/generated/model/procedure";

export type OptionalProcedureItem = {
  categoryId: number;
  categoryName: string;
  priority: string;
  procedureId: number;
  procedureName: string;
  remainingDays: number;
};

type CurrentListItem = {
  procedureId?: number;
};

export const mapOptionalProcedureRes = (
  item: OptionalProcedureRes,
): OptionalProcedureItem => ({
  categoryId: item.categoryId ?? 0,
  categoryName: item.categoryName ?? "",
  priority: item.priority ?? "",
  procedureId: item.procedureId ?? 0,
  procedureName: item.procedureName ?? "",
  remainingDays: item.remainingDays ?? 0,
});

export const mapProcedureToOptionalItem = (
  item: Procedure,
  categoryId: number,
): OptionalProcedureItem => ({
  categoryId,
  categoryName: "",
  priority: item.priority ?? "",
  procedureId: item.procedureId ?? 0,
  procedureName: item.procedureName ?? "",
  remainingDays: item.remainingDays ?? 0,
});

export const mapCurrentItemToOptional = (
  item: Pick<
    Procedure,
    "procedureId" | "procedureName" | "remainingDays" | "priority"
  >,
  categoryId: number,
): OptionalProcedureItem => ({
  categoryId,
  categoryName: "",
  priority: item.priority ?? "",
  procedureId: item.procedureId ?? 0,
  procedureName: item.procedureName ?? "",
  remainingDays: item.remainingDays ?? 0,
});

type BuildAvailableAddListParams = {
  optionalProcedures?: OptionalProcedureRes[];
  currentList: CurrentListItem[];
  categoryId: number;
  categoryProcedures?: Procedure[];
  pendingDeleteChecklistIds: number[];
  removedDuringEdit: OptionalProcedureItem[];
};

export const buildAvailableAddList = ({
  optionalProcedures,
  currentList,
  categoryId,
  categoryProcedures,
  pendingDeleteChecklistIds,
  removedDuringEdit,
}: BuildAvailableAddListParams): OptionalProcedureItem[] => {
  const currentProcedureIds = new Set(
    currentList
      .map((item) => item.procedureId)
      .filter((id): id is number => typeof id === "number" && id > 0),
  );

  const canAdd = (procedureId: number) =>
    procedureId > 0 && !currentProcedureIds.has(procedureId);

  const result = new Map<number, OptionalProcedureItem>();

  for (const item of removedDuringEdit) {
    if (Number(item.categoryId) === categoryId && canAdd(item.procedureId)) {
      result.set(item.procedureId, item);
    }
  }

  for (const procedure of categoryProcedures ?? []) {
    const procedureId = procedure.procedureId;
    const checklistId = procedure.userProcedureChecklistId;

    if (
      typeof procedureId !== "number" ||
      !checklistId ||
      !pendingDeleteChecklistIds.includes(checklistId) ||
      !canAdd(procedureId)
    ) {
      continue;
    }

    result.set(procedureId, mapProcedureToOptionalItem(procedure, categoryId));
  }

  for (const item of optionalProcedures ?? []) {
    const procedureId = item.procedureId;

    if (
      Number(item.categoryId) !== categoryId ||
      typeof procedureId !== "number" ||
      !canAdd(procedureId) ||
      result.has(procedureId)
    ) {
      continue;
    }

    result.set(procedureId, mapOptionalProcedureRes(item));
  }

  return Array.from(result.values());
};

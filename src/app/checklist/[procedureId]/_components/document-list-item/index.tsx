"use client";

import Link from "next/link";
import {
  getGetProcedureDetailQueryKey,
  useModifyDocumentCheck,
} from "@/apis/generated/api-client";
import type { ChecklistProcedureDetailRes } from "@/apis/generated/model";
import { useQueryClient } from "@tanstack/react-query";
import Checkbox from "./checkbox";

interface Props {
  procedureId: number;
  procedureDocumentId: number;
  index: number;
  title: string;
  checked?: boolean;
}
export default function DocumentListItem({
  procedureId,
  procedureDocumentId,
  index,
  title,
  checked,
}: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync: modifyDocumentCheck } = useModifyDocumentCheck();

  const handleModifyDocumentCheck = async (documentChecked: boolean) => {
    const queryKey = getGetProcedureDetailQueryKey(procedureId);
    const previousData =
      queryClient.getQueryData<ChecklistProcedureDetailRes>(queryKey);

    queryClient.setQueryData<ChecklistProcedureDetailRes>(queryKey, (old) => {
      if (!old?.documents) return old;

      return {
        ...old,
        documents: old.documents.map((document) =>
          document.procedureDocumentId === procedureDocumentId
            ? { ...document, isChecked: documentChecked }
            : document,
        ),
      };
    });

    try {
      await modifyDocumentCheck({
        procedureDocumentId: procedureDocumentId,
        data: {
          isChecked: documentChecked,
        },
      });
    } catch {
      if (previousData) {
        queryClient.setQueryData(queryKey, previousData);
      }
    } finally {
      queryClient.invalidateQueries({ queryKey });
    }
  };

  return (
    <div className="bg-primary-bg flex rounded-xl px-5 py-2.5">
      <label
        htmlFor={`document-${index}`}
        className="flex cursor-pointer gap-2.5 select-none"
      >
        <span className="bg-primary-1 caption flex h-6 w-6 items-center justify-center rounded-full text-white">
          {index + 1}
        </span>
        <span className="h4 w-30 text-gray-900">{title}</span>
        <Checkbox
          id={`document-${index}`}
          checked={checked ?? false}
          onChange={(documentChecked) =>
            handleModifyDocumentCheck(documentChecked)
          }
        />
      </label>

      <Link href="#" target="_blank" className="ml-auto">
        발급처 알아보기 {">"}
      </Link>
    </div>
  );
}

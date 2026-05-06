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
            ? { ...document, checked: documentChecked }
            : document,
        ),
      };
    });

    try {
      await modifyDocumentCheck({
        procedureDocumentId: procedureDocumentId,
        data: {
          checked: documentChecked,
        },
      });
    } catch {
      if (previousData) {
        queryClient.setQueryData(queryKey, previousData);
      }
    }
  };

  return (
    <div className="bg-primary-bg flex items-center gap-3 rounded-xl px-5 py-2.5">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <span className="bg-primary-1 caption flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white">
          {index + 1}
        </span>
        <span className="h4 min-w-0 flex-1 text-gray-900">{title}</span>
        <Checkbox
          id={`document-${procedureDocumentId}`}
          checked={checked ?? false}
          onChange={(documentChecked) =>
            handleModifyDocumentCheck(documentChecked)
          }
        />
      </div>

      <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="caption text-primary-1 shrink-0 underline"
      >
        발급처 알아보기 {">"}
      </Link>
    </div>
  );
}

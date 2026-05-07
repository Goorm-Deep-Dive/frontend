"use client";

import InfoCircleIcon from "@/components/icons/info-circle-icon";
import IssuerIcon from "@/components/icons/issuer-icon";
import PhoneIcon from "@/components/icons/phone-icon";
import RequiredDocumentIcon from "@/components/icons/required-document-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getGetProcedureDetailQueryKey,
  getGetProcedureDocumentDetailQueryKey,
  useGetProcedureDocumentDetail,
  useModifyDocumentCheck,
} from "@/apis/generated/api-client";
import type {
  ChecklistProcedureDetailRes,
  ProcedureDocumentDetailRes,
} from "@/apis/generated/model";
import Link from "next/link";
import Checkbox from "./document-list-item/checkbox";
import { useQueryClient } from "@tanstack/react-query";
import CheckIcon from "@/components/icons/check-icon";
import { cn } from "@/lib/cn";

interface ProcedureMethodAccordionProps {
  procedureId: number;
  procedureDocumentId: number;
  index: number;
  title: string;
  checked?: boolean;
  defaultOpen?: boolean;
}

export default function ProcedureMethodAccordion({
  procedureId,
  procedureDocumentId,
  index,
  title,
  checked = false,
  defaultOpen = true,
}: ProcedureMethodAccordionProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: modifyDocumentCheck } = useModifyDocumentCheck();

  const { data: documentDetail } =
    useGetProcedureDocumentDetail(procedureDocumentId);

  const issuerText = documentDetail?.documentLocation?.trim() || "정보 없음";
  const contactText = documentDetail?.documentLink?.trim() || "정보 없음";
  const requiredDocumentText =
    documentDetail?.documentName?.trim() || "정보 없음";
  const noteText = documentDetail?.description?.trim() || "정보 없음";

  const issuerLink =
    documentDetail?.documentLink?.startsWith("http://") ||
    documentDetail?.documentLink?.startsWith("https://")
      ? documentDetail.documentLink
      : undefined;

  const handleModifyDocumentCheck = async (nextChecked: boolean) => {
    const procedureDetailQueryKey = getGetProcedureDetailQueryKey(procedureId);
    const documentDetailQueryKey =
      getGetProcedureDocumentDetailQueryKey(procedureDocumentId);

    const previousProcedureDetail =
      queryClient.getQueryData<ChecklistProcedureDetailRes>(
        procedureDetailQueryKey,
      );
    const previousDocumentDetail =
      queryClient.getQueryData<ProcedureDocumentDetailRes>(
        documentDetailQueryKey,
      );

    queryClient.setQueryData<ChecklistProcedureDetailRes>(
      procedureDetailQueryKey,
      (old) => {
        if (!old?.documents) return old;

        return {
          ...old,
          documents: old.documents.map((document) =>
            document.procedureDocumentId === procedureDocumentId
              ? { ...document, checked: nextChecked }
              : document,
          ),
        };
      },
    );

    queryClient.setQueryData<ProcedureDocumentDetailRes>(
      documentDetailQueryKey,
      (old) => (old ? { ...old, checked: nextChecked } : old),
    );

    try {
      await modifyDocumentCheck({
        procedureDocumentId,
        data: { checked: nextChecked },
      });
    } catch {
      if (previousProcedureDetail) {
        queryClient.setQueryData(
          procedureDetailQueryKey,
          previousProcedureDetail,
        );
      }
      if (previousDocumentDetail) {
        queryClient.setQueryData(
          documentDetailQueryKey,
          previousDocumentDetail,
        );
      }
    }
  };

  return (
    <section
      className={cn(
        "overflow-hidden rounded-md border border-gray-300",
        checked && "border-primary-2",
      )}
    >
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpen ? String(procedureDocumentId) : undefined}
      >
        <AccordionItem
          value={String(procedureDocumentId)}
          className="border-none"
        >
          <AccordionTrigger
            className={cn(
              "h-17.5 bg-gray-200 px-5 py-2.5 data-[state=open]:bg-white",
              checked && "bg-primary-bg data-[state=open]:bg-primary-bg",
            )}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex min-w-0 items-center gap-2.5 text-left">
                {checked ? (
                  <span className="label bg-primary-1 flex h-6 min-h-6 w-6 min-w-6 shrink-0 items-center justify-center rounded-full text-white">
                    <CheckIcon className="h-2 w-2.5" />
                  </span>
                ) : (
                  <span className="label bg-primary-1 flex h-6 min-h-6 w-6 min-w-6 shrink-0 items-center justify-center rounded-full text-white">
                    {index + 1}
                  </span>
                )}
                <span className="h4 min-w-0 truncate text-gray-900">
                  {title}
                </span>
              </div>

              {issuerLink ? (
                <Link
                  href={issuerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="caption text-primary-1 shrink-0 underline"
                >
                  발급처 알아보기 {">"}
                </Link>
              ) : null}
            </div>
          </AccordionTrigger>

          <AccordionContent className="rounded-b-md">
            <div className="flex flex-col gap-4 rounded-b-md bg-gray-100 px-5 pt-5 pb-7.5">
              {/* 발급처 */}
              <div className="flex flex-col gap-1 rounded-md border border-gray-300 bg-white px-5 py-2.5">
                <div className="flex items-center gap-2.5 pl-2.5">
                  <IssuerIcon className="h-5 w-4" />
                  <span className="h4 text-gray-900">발급처</span>
                </div>
                <span className="body text-gray-700">{issuerText}</span>
              </div>

              {/* 연락처 */}
              <div className="flex flex-col gap-1 rounded-md border border-gray-300 bg-white px-5 py-2.5">
                <div className="flex items-center gap-2.5 pl-2.5">
                  <PhoneIcon className="h-5.5 w-5.5" />
                  <span className="h4 text-gray-900">연락처</span>
                </div>
                <span className="body text-gray-700">{contactText}</span>
              </div>

              {/* 필요서류 */}
              <div className="flex flex-col gap-1 rounded-md border border-gray-300 bg-white px-5 py-2.5">
                <div className="flex items-center gap-2.5 pl-2.5">
                  <RequiredDocumentIcon className="h-5 w-4.5" />
                  <span className="h4 text-gray-900">필요서류</span>
                </div>
                <span className="body text-gray-700">
                  {requiredDocumentText}
                </span>
              </div>

              {/* 비고 */}
              <div className="flex flex-col gap-1 rounded-md border border-gray-300 bg-white px-5 py-2.5">
                <div className="flex items-center gap-2.5 pl-2.5">
                  <InfoCircleIcon className="h-5 w-5" />
                  <span className="h4 text-gray-900">비고</span>
                </div>
                <span className="body text-gray-700">{noteText}</span>
              </div>
              <div className="flex items-center justify-center gap-2.5">
                {/*
                  같은 페이지에서 여러 개 렌더링되므로 id는 반드시 unique 해야 한다.
                */}
                <Checkbox
                  id={`procedure-method-checkbox-${procedureDocumentId}`}
                  checked={checked}
                  onChange={(nextChecked) =>
                    handleModifyDocumentCheck(nextChecked)
                  }
                />
                <label
                  htmlFor={`procedure-method-checkbox-${procedureDocumentId}`}
                  className="h4 text-gray-900"
                >
                  서류 준비가 완료되면 체크해주세요.
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

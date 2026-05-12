"use client";

import {
  getGetCategoryProceduresQueryKey,
  getGetOverallProgressQueryKey,
  getGetProcedureDetailQueryKey,
  useGetProcedureDetail,
  useModifyProcedureCheck,
} from "@/apis/generated/api-client";
import type { ChecklistProcedureDetailRes } from "@/apis/generated/model";
import { useRequireSurveyCompleted } from "@/hooks/use-require-survey-completed";
import ProcedureMethodAccordion from "./procedure-method-accordion";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import Header from "@/components/common/header";
import { useRouter, useSearchParams } from "next/navigation";
import { useChecklistCategoryStore } from "@/store/useChecklistCategoryStore";
import { getChannelLabel } from "../_utils/getChannelLabel";

interface Props {
  procedureId: number;
}

export default function Content({ procedureId }: Props) {
  useRequireSurveyCompleted();

  const router = useRouter();

  /** 체크 완료 후 돌아갔을 때 동일 카테고리 절차 목록만 무효화 */
  const selectedCategoryId = useChecklistCategoryStore(
    (s) => s.selectedCategoryId,
  );

  const searchParams = useSearchParams();
  const userProcedureChecklistId = searchParams.get("userProcedureChecklistId");

  const { data: procedureDetail, isPending: isProcedurePending } =
    useGetProcedureDetail(procedureId);

  const queryClient = useQueryClient();
  const { mutateAsync: modifyProcedureCheck } = useModifyProcedureCheck();

  if (isProcedurePending) {
    return (
      <>
        <Header title="" variant="detail" />
        <p className="body px-5 py-8 text-center text-gray-500">불러오는 중…</p>
      </>
    );
  }

  const handleModifyProcedureCheck = async () => {
    const checked = procedureDetail?.checked ?? false;
    const queryKey = getGetProcedureDetailQueryKey(procedureId);
    const previousData =
      queryClient.getQueryData<ChecklistProcedureDetailRes>(queryKey);

    queryClient.setQueryData<ChecklistProcedureDetailRes>(queryKey, (old) =>
      old ? { ...old, checked: !checked } : old,
    );

    try {
      await modifyProcedureCheck({
        userProcedureChecklistId: Number(userProcedureChecklistId),
        data: { checked: !checked },
      });

      // 현재 절차 상세 무효화
      queryClient.invalidateQueries({ queryKey });
      if (typeof selectedCategoryId === "number" && selectedCategoryId > 0) {
        // 동일 카테고리 절차 목록 무효화
        queryClient.invalidateQueries({
          queryKey: getGetCategoryProceduresQueryKey(selectedCategoryId),
        });
      }

      // 진행현황 전체 무효화
      queryClient.invalidateQueries({
        queryKey: getGetOverallProgressQueryKey(),
      });
      router.back();
    } catch {
      if (previousData) {
        queryClient.setQueryData(queryKey, previousData);
      }
    }
  };

  const isAllDocumentChecked = procedureDetail?.documents?.every(
    (document) => document.checked,
  );

  const cautionTextList = procedureDetail?.cautionText?.split(";") ?? [];

  return (
    <>
      <Header title={procedureDetail?.procedureName ?? ""} variant="detail" />

      <div className="flex flex-col gap-5 p-5">
        <div className="flex gap-5">
          <div>
            <span className="body text-gray-900">
              {procedureDetail?.dueDateDescription}
            </span>
          </div>
        </div>

        {/* 필요서류 */}
        <div className="flex flex-col gap-5">
          <span className="h4 pl-5 text-gray-900">필요서류</span>

          <div className="flex flex-col gap-2.5">
            {procedureDetail?.documents?.map(
              (document, index) =>
                document.procedureDocumentId && (
                  <ProcedureMethodAccordion
                    procedureId={procedureId}
                    procedureDocumentId={document.procedureDocumentId}
                    key={document.procedureDocumentId}
                    title={document.documentName ?? ""}
                    index={index}
                    checked={document.checked ?? false}
                    defaultOpen={false}
                  />
                ),
            )}
          </div>
        </div>

        {/* 처리 및 신고 방법 */}
        <span className="h4 pl-5 text-gray-900">처리 및 신고 방법</span>

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-300 p-5">
          {/* 처리방법 */}
          <div className="flex flex-col gap-1">
            <span className="h4 text-gray-900">처리 방법</span>
            <ul className="body list-inside list-disc">
              {procedureDetail?.channels?.map((channel) => (
                <li key={channel.procedureChannelId}>
                  {getChannelLabel(channel.channelType)} {channel.description}
                </li>
              ))}
            </ul>
          </div>

          {/* 처리(신고)처 */}
          <div className="flex flex-col gap-1">
            <span className="h4 text-gray-900">처리(신고)처</span>
            <ul className="body list-inside list-disc">
              {procedureDetail?.contacts?.map((contact) => (
                <li key={contact.procedureContactId}>
                  {contact.title} {contact.description}
                </li>
              ))}
            </ul>
          </div>

          {/* 지도검색 기준 */}
          <div className="flex flex-col gap-1">
            <span className="h4 text-gray-900">지도검색 기준</span>
            <ul className="body list-inside list-disc">
              <li>{procedureDetail?.searchScope}</li>
            </ul>
          </div>

          {/* 유의/주의사항 */}
          <div className="flex flex-col gap-1">
            <span className="h4 text-gray-900">유의/주의사항</span>
            <ul className="body list-inside list-disc">
              {cautionTextList.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-5 p-5">
        {procedureDetail?.checked ? (
          <>
            {" "}
            <div className="flex flex-col text-center">
              <span className="caption text-gray-900">
                <span className="h4">{procedureDetail?.procedureName}</span>
                버튼을 잘못 누르셨나요?
              </span>
              <span className="caption text-gray-900">
                초기화가 필요하다면 초기화 버튼을 눌러주세요.
              </span>
            </div>
            <Button
              onClick={handleModifyProcedureCheck}
              disabled={!isAllDocumentChecked}
            >
              {procedureDetail?.procedureName} 체크 초기화하기
            </Button>
          </>
        ) : (
          <>
            <div className="flex flex-col text-center">
              <span className="caption text-gray-900">
                <span className="h4">{procedureDetail?.procedureName}</span> 후
                체크 완료하기 버튼을 눌러주세요.
              </span>
              <span className="caption text-gray-900">
                필요서류 항목을 모두 체크하면 버튼이 활성화 됩니다.
              </span>
            </div>
            <Button
              onClick={handleModifyProcedureCheck}
              disabled={!isAllDocumentChecked}
            >
              {procedureDetail?.procedureName} 체크 완료하기
            </Button>
          </>
        )}
      </div>
    </>
  );
}

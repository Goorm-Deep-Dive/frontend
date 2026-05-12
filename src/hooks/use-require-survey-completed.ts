"use client";

import { useGetDeceasedSurveyStatus } from "@/apis/generated/api-client";
import { DeceasedSurveyStatusResSurveyStatus } from "@/apis/generated/model/deceasedSurveyStatusResSurveyStatus";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const isSurveyCompleted = (status?: string) =>
  status === DeceasedSurveyStatusResSurveyStatus.SKIPPED ||
  status === DeceasedSurveyStatusResSurveyStatus.COMPLETED;

/**
 * 설문이 완료(SKIPPED | COMPLETED)되지 않았으면 `/create-checklist`로 이동합니다.
 * Proxy 대신 체크리스트·진행상황 등 보호 구역 페이지에서 호출합니다.
 */
export const useRequireSurveyCompleted = () => {
  const router = useRouter();
  const { data, isSuccess } = useGetDeceasedSurveyStatus({
    query: {
      refetchOnWindowFocus: true,
      staleTime: 0,
      gcTime: 0,
    },
  });

  useEffect(() => {
    if (!isSuccess) return;
    const isCompleted = isSurveyCompleted(data?.surveyStatus);
    if (isCompleted) return;
    router.replace("/create-checklist");
  }, [data?.surveyStatus, isSuccess, router]);
};

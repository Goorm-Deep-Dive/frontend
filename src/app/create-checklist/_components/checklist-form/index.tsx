"use client";

import { Suspense, useCallback, useState } from "react";
import {
  useGetSurveyListSuspense,
  useSaveTempSurvey,
  useSkipSurvey,
  useSubmitSurvey,
} from "@/apis/generated/api-client";
import ChecklistFormSkeleton from "./skeleton";
import BottomCTA from "@/components/common/bottom-cta";
import { useRouter } from "next/navigation";
import SurveyQuestionCard from "../survey-question-card";
import { Button } from "@/components/ui/button";

type AnswerMap = Record<string, string | string[]>;

export default function ChecklistForm() {
  const router = useRouter();

  const { data: surveyRes } = useGetSurveyListSuspense();

  const { mutateAsync: skipSurvey } = useSkipSurvey();
  const { mutateAsync: saveTempSurvey } = useSaveTempSurvey();
  const { mutateAsync: submitSurvey } = useSubmitSurvey();

  const surveys = surveyRes?.surveys;

  const [answers, setAnswers] = useState<AnswerMap>({});
  /**
   * @description 답변 변경 시, 상태 수정
   */
  const handleChangeAnswer = useCallback(
    (questionKey: string, nextValue: string | string[]) => {
      setAnswers((prev) => ({
        ...prev,
        [questionKey]: nextValue,
      }));
    },
    [],
  );

  /**
   * @description 설문 문진 건너뛰기
   */
  const handleSkipSurvey = async () => {
    try {
      await skipSurvey();
      router.push("/checklist");
    } catch {}
  };

  /**
   * @description 저장 후, 메인 페이지로 이동
   */
  const handleNext = async () => {
    try {
      await handleSave();
      router.push("/checklist");
    } catch {}
  };

  /**
   * @description 임시 저장하기
   */
  const handleSaveDraft = async () => {
    try {
      const filteredAnswer = Object.entries(answers).flatMap(
        ([_questionId, answer]) =>
          Array.isArray(answer)
            ? answer.map((id) => ({ surveyAnswerId: +id }))
            : [{ surveyAnswerId: +answer }],
      );

      await saveTempSurvey({
        data: {
          answers: filteredAnswer,
        },
      });
    } catch {}
  };

  /**
   * @description 저장하기
   */
  const handleSave = async () => {
    try {
      if (Object.keys(answers).length === 0) {
        return null;
      }

      const filteredAnswer = Object.entries(answers).flatMap(
        ([_questionId, answer]) =>
          Array.isArray(answer)
            ? answer.map((id) => ({ surveyAnswerId: +id }))
            : [{ surveyAnswerId: +answer }],
      );

      await submitSurvey({
        data: {
          answers: filteredAnswer,
        },
      });
    } catch {}
  };

  return (
    <>
      <div className="flex min-h-39 w-full items-end justify-between border-b border-gray-300 px-6.5 pb-5">
        <div className="flex flex-col gap-2.5">
          <span className="h1">체크리스트 생성</span>
          <span className="body text-gray-700">
            상황에 맞춰 리스트를 생성합니다.
          </span>
        </div>
        <div className="flex flex-col items-end gap-3.5">
          <span className="h3">1/3단계</span>
          <Button size="small" rounded onClick={handleSaveDraft}>
            임시 저장하기
          </Button>
        </div>
      </div>

      <Suspense fallback={<ChecklistFormSkeleton />}>
        <div className="flex flex-col gap-5 p-5">
          {surveys?.map(
            (q, index) =>
              q && (
                <SurveyQuestionCard
                  key={String(q.surveyQuestionId ?? `question-${index}`)}
                  question={q}
                  index={index}
                  value={
                    answers[
                      String(q.surveyQuestionId ?? `question-${index}`)
                    ] ?? (q.questionType === "MULTIPLE" ? [] : "")
                  }
                  onChangeAnswer={handleChangeAnswer}
                />
              ),
          )}

          <BottomCTA>
            <div className="flex w-full flex-col items-center justify-center gap-2.5">
              <div className="flex flex-col items-center justify-center">
                <span className="caption text-gray-700">
                  현재 상황을 정확히 모르시겠나요?
                </span>
                <button
                  className="h4 text-sementic-info cursor-pointer"
                  onClick={handleSkipSurvey}
                >
                  설문 문진 건너뛰기
                </button>
              </div>
              <Button onClick={handleNext}>다음으로</Button>
            </div>
          </BottomCTA>
        </div>
      </Suspense>
    </>
  );
}

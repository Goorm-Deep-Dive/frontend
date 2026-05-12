"use client";

import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import {
  getGetCategoryProceduresQueryKey,
  getGetOverallProgressQueryKey,
  getGetSurveyListQueryKey,
  type GetSurveyListQueryResult,
  useGetSurveyList,
  useSaveTempSurvey,
  useSkipSurvey,
  useSubmitSurvey,
} from "@/apis/generated/api-client";
import ChecklistFormSkeleton from "./skeleton";
import BottomCTA from "@/components/common/bottom-cta";
import { useRouter } from "next/navigation";
import SurveyQuestionCard from "../survey-question-card";
import { Button } from "@/components/ui/button";
import { useAlertStore } from "@/store/useAlertStore";
import { useQueryClient } from "@tanstack/react-query";
import { useChecklistCategoryStore } from "@/store/useChecklistCategoryStore";
import { event } from "@/lib/gtag";

type AnswerMap = Record<string, string | string[]>;

type SurveyItem = NonNullable<
  NonNullable<GetSurveyListQueryResult["surveys"]>[number]
>;

const isSurveyQuestionVisible = (
  question: SurveyItem,
  index: number,
  nextQuestionIds: string[],
): boolean => {
  const questionKey = String(question.surveyQuestionId ?? `question-${index}`);
  if (
    question.requirementType === "OPTIONAL" &&
    !nextQuestionIds.includes(questionKey)
  ) {
    return false;
  }
  return true;
};

const hasCompletedAnswer = (
  questionType: string | undefined,
  answer: string | string[] | undefined,
): boolean => {
  if (questionType === "MULTIPLE") {
    return Array.isArray(answer) && answer.length > 0;
  }
  return typeof answer === "string" && answer.trim().length > 0;
};

export default function ChecklistForm() {
  const router = useRouter();
  const questionStartTimes = useRef<Record<string, number>>({});

  const queryClient = useQueryClient();
  const { data: surveyRes, isPending: isSurveyPending } = useGetSurveyList();

  const { mutateAsync: skipSurvey } = useSkipSurvey();
  const { mutateAsync: saveTempSurvey } = useSaveTempSurvey();
  const { mutateAsync: submitSurvey } = useSubmitSurvey();

  const surveys = surveyRes?.surveys;

  const [answers, setAnswers] = useState<AnswerMap>({});
  const [nextQuestionIds, setNextQuestionIds] = useState<string[]>([]);

  const alert = useAlertStore();
  const selectedCategoryId = useChecklistCategoryStore(
    (s) => s.selectedCategoryId,
  );

  const prefilledAnswers = useMemo(() => {
    if (
      !surveyRes?.selectedAnswerIds ||
      surveyRes.selectedAnswerIds.length === 0 ||
      !surveys
    ) {
      return {} as AnswerMap;
    }

    const selectedAnswerIds = surveyRes.selectedAnswerIds;

    const answerMap = surveys.reduce((acc, survey, index) => {
      if (!survey) {
        return acc;
      }

      const questionKey = String(
        survey.surveyQuestionId ?? `question-${index}`,
      );
      const selectedIdsByQuestion =
        survey.answers
          ?.map((answer) => answer.surveyAnswerId)
          .filter(
            (answerId): answerId is number =>
              typeof answerId === "number" &&
              selectedAnswerIds.includes(answerId),
          )
          .map(String) ?? [];

      if (selectedIdsByQuestion.length === 0) {
        return acc;
      }

      acc[questionKey] =
        survey.questionType === "MULTIPLE"
          ? selectedIdsByQuestion
          : selectedIdsByQuestion[0];

      return acc;
    }, {} as AnswerMap);

    return answerMap;
  }, [surveyRes, surveys]);

  const resolvedAnswers = useMemo(
    () => ({
      ...prefilledAnswers,
      ...answers,
    }),
    [prefilledAnswers, answers],
  );

  /**
   * @description 답변 변경 시, 상태 수정
   */
  const handleChangeAnswer = useCallback(
    (
      questionKey: string,
      nextValue: string | string[],
      nextQuestionId?: number,
    ) => {
      const startedAt = questionStartTimes.current[questionKey];

      if (startedAt) {
        const duration = Math.floor((Date.now() - startedAt) / 1000);

        event("survey_question_answer", {
          questionId: questionKey,
        });

        event("survey_question_duration", {
          questionId: questionKey,
          duration,
        });

        delete questionStartTimes.current[questionKey];
      }

      setAnswers((prev) => ({
        ...prev,
        [questionKey]: nextValue,
      }));

      if (nextQuestionId) {
        if (nextQuestionIds.includes(String(nextQuestionId))) {
          setNextQuestionIds((prev) =>
            prev.filter((id) => id !== String(nextQuestionId)),
          );
          return;
        }

        setNextQuestionIds((prev) => [...prev, String(nextQuestionId)]);
      }
    },
    [nextQuestionIds],
  );
  /**
   * @description 설문 문진 건너뛰기
   */
  const handleSkipSurvey = async () => {
    try {
      await skipSurvey();

      await queryClient.invalidateQueries({
        queryKey: getGetOverallProgressQueryKey(),
      });
      await queryClient.invalidateQueries({
        queryKey: getGetCategoryProceduresQueryKey(selectedCategoryId ?? 1),
      });
      router.push("/checklist");
    } catch {}
  };

  /**
   * @description 저장 후, 메인 페이지로 이동
   */
  const handleNext = async () => {
    try {
      await handleSave();
      await queryClient.invalidateQueries({
        queryKey: getGetOverallProgressQueryKey(),
      });
      await queryClient.invalidateQueries({
        queryKey: getGetCategoryProceduresQueryKey(selectedCategoryId ?? 1),
      });

      router.push("/checklist");
    } catch {}
  };

  /**
   * @description 임시 저장하기
   */
  const handleSaveDraft = async () => {
    try {
      const filteredAnswer = Object.entries(answers).flatMap(([, answer]) =>
        Array.isArray(answer)
          ? answer.map((id) => ({ surveyAnswerId: +id }))
          : [{ surveyAnswerId: +answer }],
      );

      await saveTempSurvey({
        data: {
          answers: filteredAnswer,
        },
      });

      await queryClient.setQueryData(
        getGetSurveyListQueryKey(),
        (old: GetSurveyListQueryResult) => {
          return {
            ...old,
            selectedAnswerIds: [
              ...(filteredAnswer.map((answer) => answer.surveyAnswerId) ?? []),
            ],
          };
        },
      );

      alert.push({
        title: "임시 저장되었습니다.",
        description: "임시 저장되었습니다.",
        buttons: [
          {
            label: "닫기",
            onClick: () => {
              alert.pop();
            },
            variant: "secondary",
          },
          {
            label: "확인",
            onClick: () => {
              alert.pop();
            },
            variant: "primary",
          },
        ],
      });
    } catch {}
  };

  /**
   * @description 저장하기
   */
  const handleSave = async () => {
    try {
      if (Object.keys(resolvedAnswers).length === 0) {
        return null;
      }

      const filteredAnswer = Object.entries(resolvedAnswers).flatMap(
        ([, answer]) =>
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

  const submitButtonDisabled = Boolean(
    surveys?.some(
      (q, index) =>
        q != null &&
        isSurveyQuestionVisible(q, index, nextQuestionIds) &&
        !hasCompletedAnswer(
          q.questionType,
          resolvedAnswers[String(q.surveyQuestionId ?? `question-${index}`)],
        ),
    ),
  );

  useEffect(() => {
    surveys?.forEach((q, index) => {
      const questionKey = String(q?.surveyQuestionId ?? `question-${index}`);

      if (!questionStartTimes.current[questionKey]) {
        questionStartTimes.current[questionKey] = Date.now();
      }
    });
  }, [surveys]);

  useEffect(() => {
    event("survey_page_view");
  }, []);

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
          <Button size="small" rounded onClick={handleSaveDraft}>
            임시 저장하기
          </Button>
        </div>
      </div>

      {isSurveyPending ? (
        <ChecklistFormSkeleton />
      ) : (
        <div className="flex flex-col gap-5 p-5">
          {surveys?.map(
            (q, index) =>
              q && (
                <SurveyQuestionCard
                  key={String(q.surveyQuestionId ?? `question-${index}`)}
                  question={q}
                  index={index}
                  value={
                    resolvedAnswers[
                      String(q.surveyQuestionId ?? `question-${index}`)
                    ] ?? (q.questionType === "MULTIPLE" ? [] : "")
                  }
                  nextQuestionIds={nextQuestionIds}
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
              <Button disabled={submitButtonDisabled} onClick={handleNext}>
                다음으로
              </Button>
            </div>
          </BottomCTA>
        </div>
      )}
    </>
  );
}

"use client";

import { memo, useCallback, useMemo } from "react";
import type { GetSurveyListQueryResult } from "@/apis/generated/api-client";
import CommonAccordion from "@/components/common/accordion";
import CheckboxList from "@/components/common/checkbox-list";

type SurveyItem = NonNullable<
  NonNullable<GetSurveyListQueryResult["surveys"]>[number]
>;

interface SurveyQuestionCardProps {
  question: SurveyItem;
  index: number;
  value: string | string[];
  nextQuestionIds: string[];
  onChangeAnswer: (
    questionKey: string,
    nextValue: string | string[],
    nextQuestionId?: number,
  ) => void;
  onUnknownAnswerSelect?: (questionIndex: number) => void;
}

const SurveyQuestionCard = memo(
  ({
    question,
    index,
    value,
    nextQuestionIds,
    onChangeAnswer,
    onUnknownAnswerSelect,
  }: SurveyQuestionCardProps) => {
    const questionKey = String(
      question.surveyQuestionId ?? `question-${index}`,
    );
    const isMultiple = question.questionType === "MULTIPLE";

    const items = useMemo(
      () =>
        question.answers?.map((answer, answerIndex) => ({
          label: String(answer.surveyAnswerText),
          value: String(
            answer.surveyAnswerId ?? `question-${index}-answer-${answerIndex}`,
          ),
          nextQuestionId: answer.nextQuestionId,
          surveyAnswerType: answer.surveyAnswerType,
        })) ?? [],
      [index, question.answers],
    );

    const handleChange = useCallback(
      (nextValue: string | string[], nextQuestionId?: number) => {
        onChangeAnswer(questionKey, nextValue, nextQuestionId);
      },
      [onChangeAnswer, questionKey],
    );

    if (
      question.requirementType === "OPTIONAL" &&
      !nextQuestionIds.includes(questionKey)
    ) {
      return null;
    }

    return (
      <CommonAccordion questionId={questionKey}>
        <CommonAccordion.Header
          description={`해당 사항을 선택해주세요.${isMultiple ? " (복수 선택 가능)" : ""}`}
        >
          Q{index + 1}. {question.surveyQuestionText}
        </CommonAccordion.Header>
        <CommonAccordion.Content>
          <CheckboxList
            idPrefix={`survey-question-${questionKey}`}
            items={items}
            value={value}
            multiple={isMultiple}
            onChange={handleChange}
            onUnknownAnswerSelect={
              onUnknownAnswerSelect
                ? () => onUnknownAnswerSelect(index)
                : undefined
            }
          />
        </CommonAccordion.Content>
      </CommonAccordion>
    );
  },
);

SurveyQuestionCard.displayName = "SurveyQuestionCard";

export default SurveyQuestionCard;

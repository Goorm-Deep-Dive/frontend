"use client";

import { Suspense, useState } from "react";
import { useGetSurveyListSuspense } from "@/apis/generated/api-client";
import CommonAccordion from "@/components/common/accordion";
import CheckboxList from "@/components/common/checkbox-list";
import ChecklistFormSkeleton from "./skeleton";
import BottomCTA from "@/components/common/bottom-cta";
import { SurveyQuestionRes } from "@/apis/generated/model";

export default function ChecklistForm() {
  const [value, setValue] = useState<string>("");

  const { data: surveyRes } = useGetSurveyListSuspense();
  const surveys = surveyRes?.surveys;

  const getDescription = (q: SurveyQuestionRes) => {
    return `해당 사항을 선택하세요. (${q.requirementType === "REQUIRED" ? "필수 항목" : "선택 항목"}${q.questionType === "MULTIPLE" ? " / 복수 선택 가능" : ""})`;
  };

  return (
    <>
      <Suspense fallback={<ChecklistFormSkeleton />}>
        <div className="flex flex-col gap-5 p-5">
          {surveys?.map(
            (q, index) =>
              q && (
                <CommonAccordion
                  key={q.surveyQuestionId ?? ""}
                  questionId={q.surveyQuestionId + ""}
                >
                  <CommonAccordion.Header description={getDescription(q)}>
                    Q{index + 1}. {q.surveyQuestionText}
                  </CommonAccordion.Header>
                  <CommonAccordion.Content>
                    <CheckboxList
                      items={
                        q.answers?.map((a) => ({
                          label: String(a.surveyAnswerText),
                          value: String(a.surveyAnswerId),
                        })) ?? []
                      }
                      value={value}
                      onChange={setValue}
                    />
                  </CommonAccordion.Content>
                </CommonAccordion>
              ),
          )}

          <BottomCTA>
            <div className="flex w-full flex-col items-center justify-center gap-2.5">
              <span>입력하신 내용은 안전하게 저장됩니다.</span>
              <button className="h3 rounded- h-13.5 w-full rounded-md bg-gray-300">
                다음으로
              </button>
            </div>
          </BottomCTA>
        </div>
      </Suspense>
    </>
  );
}

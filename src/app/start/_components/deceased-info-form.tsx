"use client";

import { Button } from "@/components/ui/button";
import BottomCTA from "../../../components/common/bottom-cta";
import DateInput from "../../../components/common/date-input";
import Input from "../../../components/common/input";
import { useState } from "react";

interface Props {
  defaultValues?: { date: string; name: string };
  onSubmit?: (data: { date: string; name: string }) => void;
}
export default function DeceasedInfoForm({ defaultValues, onSubmit }: Props) {
  const [dateValue, setDateValue] = useState(defaultValues?.date ?? "");
  const [date, setDate] = useState<Date | undefined>(
    defaultValues?.date ? new Date(defaultValues.date) : undefined,
  );
  const [name, setName] = useState(defaultValues?.name ?? "");

  const isValid = !!date && name.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    if (onSubmit) {
      onSubmit({ date: dateValue, name });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-7.5 rounded-t-lg border-t-2 px-5 pt-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <span className="h2">1.영면일 입력</span>
            <span className="text-[18px] text-gray-700">
              고인께서 영면에 드신 날을 알려주세요.
            </span>
          </div>
          <DateInput
            value={dateValue}
            onChange={setDateValue}
            date={date}
            onDateChange={setDate}
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <span className="h2">2.프로필 생성</span>
            <span className="text-[18px] text-gray-700">
              등록할 성명 혹은 명칭을 알려주세요.
            </span>
          </div>
          <Input value={name} onChange={setName} />
        </div>
      </div>

      <BottomCTA>
        <p>입력하신 내용은 안전하게 저장됩니다.</p>
        <Button
          disabled={!isValid}
          className={
            isValid ? "bg-primary-1 text-white" : "bg-gray-300 text-[#444444]"
          }
          onClick={handleSubmit}
        >
          입력하기
        </Button>
      </BottomCTA>
    </>
  );
}

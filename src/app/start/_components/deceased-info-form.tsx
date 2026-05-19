"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import BottomCTA from "@/components/common/bottom-cta";
import DateInput from "@/components/common/date-input";
import Input from "@/components/common/input";

interface Props {
  defaultValues?: { date: string; name: string };
  onSubmit?: (data: { date: string; name: string }) => void | Promise<void>;
}

const toApiDateString = (value: string, picked: Date | undefined) => {
  if (picked) return format(picked, "yyyy-MM-dd");
  const digits = value.replace(/\D/g, "");
  if (digits.length >= 8) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
  }
  return "";
};

export default function DeceasedInfoForm({ defaultValues, onSubmit }: Props) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [dateValue, setDateValue] = useState(defaultValues?.date ?? "");
  const [pickedDate, setPickedDate] = useState<Date | undefined>(() => {
    if (!defaultValues?.date) return undefined;
    const d = new Date(defaultValues.date);
    return Number.isNaN(d.getTime()) ? undefined : d;
  });

  const isFilled = Boolean(dateValue || pickedDate);
  const isBothFilled = isFilled && name.length > 0;

  const handleSubmit = async () => {
    if (!onSubmit) return;
    const date = toApiDateString(dateValue, pickedDate);
    await onSubmit({ name, date });
  };

  return (
    <>
      <div className="flex flex-col gap-5 px-5 pb-40">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5 pl-5">
            <span className="h2 text-gray-900">1.영면일 입력</span>
            <span className="font-regular text-[1.125rem] leading-normal tracking-[-0.02em] text-gray-700">
              고인께서 영면에 드신 날을 알려주세요.
            </span>
          </div>
          <DateInput
            value={dateValue}
            onChange={setDateValue}
            date={pickedDate}
            onDateChange={setPickedDate}
            isFilled={isFilled}
            dateLimit="past"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5 pl-5">
            <span className="h2 text-gray-900">2.프로필 생성</span>
            <span className="font-regular text-[1.125rem] leading-normal tracking-[-0.02em] text-gray-700">
              등록할 성명 혹은 명칭을 알려주세요.
            </span>
          </div>
          <Input value={name} onChange={setName} />
        </div>
      </div>
      <BottomCTA>
        <span className="body text-gray-700">
          입력하신 내용은 안전하게 저장됩니다.
        </span>
        <Button
          onClick={handleSubmit}
          disabled={!isBothFilled}
          className={`py-3.5 ${isBothFilled ? "bg-primary-1 text-white" : "bg-gray-300 text-gray-700"}`}
        >
          입력하기
        </Button>
      </BottomCTA>
    </>
  );
}

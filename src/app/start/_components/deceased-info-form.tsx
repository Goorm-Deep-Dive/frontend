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

  const handleSubmit = async () => {
    if (!onSubmit) return;
    const date = toApiDateString(dateValue, pickedDate);
    await onSubmit({ name, date });
  };

  return (
    <>
      <div className="flex flex-col gap-5 px-5 pb-40">
        <div className="flex flex-col gap-2.5">
          <span className="h3 text-gray-900">고인 성함</span>
          <Input value={name} onChange={setName} />
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="h3 text-gray-900">사망일</span>
          <DateInput
            value={dateValue}
            onChange={setDateValue}
            date={pickedDate}
            onDateChange={setPickedDate}
          />
        </div>
      </div>
      <BottomCTA>
        <Button type="button" onClick={handleSubmit}>
          저장하기
        </Button>
      </BottomCTA>
    </>
  );
}

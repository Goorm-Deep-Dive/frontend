import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  date?: Date;
  onDateChange?: (date?: Date) => void;
}

export default function DateInput({
  value,
  onChange,
  date,
  onDateChange,
}: DateInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);

  const formatDate = (input: string) => {
    const numbers = input.replace(/\D/g, "").slice(0, 8);

    if (numbers.length < 5) {
      return numbers;
    }
    if (numbers.length < 7) {
      return `${numbers.slice(0, 4)} - ${numbers.slice(4)}`;
    }
    return `${numbers.slice(0, 4)} - ${numbers.slice(4, 6)} - ${numbers.slice(6)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    onChange(formatted);
  };

  return (
    <div className="bg-gray-200 px-5 py-4">
      <div className="flex flex-col gap-2.5">
        {isFocused && (
          <div className="flex items-center gap-1">
            <Image
              src="/icons/input/info.svg"
              alt="정보"
              width={20}
              height={20}
            />
            <span className="h4 text-gray-900">
              연도/월/일 순으로 입력해주세요
            </span>
            <span className="caption text-gray-500">(8자리)</span>
          </div>
        )}

        <div className="h3 bg-primary-bg caret-primary-1 flex justify-between rounded-lg px-2.5 py-2.5">
          <input
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="YYYY-MM-DD"
            inputMode="numeric"
            className="text-primary-1 w-full bg-transparent outline-none"
          />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button type="button">
                <Image
                  src="/icons/input/calender.svg"
                  alt="캘린더"
                  width={20}
                  height={20}
                />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-auto gap-2 p-0">
              <div className="flex flex-col gap-4 rounded-lg bg-gray-200 p-4">
                <div className="rounded-lg bg-white shadow-md">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      onDateChange?.(selectedDate);
                      if (selectedDate) {
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        onChange(formatted);
                      }
                    }}
                  />
                </div>
                <button
                  disabled={!date}
                  className={`w-full rounded-lg py-3 ${date ? "bg-primary-1 px-13 text-white" : "body bg-gray-300 text-gray-900"}`}
                  onClick={() => {
                    if (!date) return;
                    console.log(format(date, "yyyy-MM-dd"));
                    setOpen(false);
                  }}
                >
                  {date ? `${format(date, "yyyy-MM-dd")} 선택하기` : "선택하기"}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {isFocused && (
          <div className="caption text-gray-700">
            ※ 법적 기한 계산에 사용됩니다.
          </div>
        )}
      </div>
    </div>
  );
}

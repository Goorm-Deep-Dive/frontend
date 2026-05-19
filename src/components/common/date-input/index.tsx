import { useState } from "react";
import Image from "next/image";
import { format, isAfter, addDays, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  formatDateFromDigits,
  parseDateFromDigits,
  sanitizeDateDigits,
} from "@/components/common/date-input/parse-date-input";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  date?: Date;
  onDateChange?: (date?: Date) => void;
  isFilled: boolean;
  dateLimit?: "past" | "future";
}

export default function DateInput({
  value,
  onChange,
  date,
  onDateChange,
  isFilled,
  dateLimit,
}: DateInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);

  const today = startOfDay(new Date());

  const isDateAllowed = (parsedDate: Date) => {
    const day = startOfDay(parsedDate);

    if (dateLimit === "future") {
      return isAfter(day, today);
    }

    if (dateLimit === "past") {
      return !isAfter(day, today);
    }

    return true;
  };

  const dateLimitOptions = { dateLimit, today };

  const syncSelectedDate = (digits: string) => {
    if (digits.length !== 8) {
      onDateChange?.(undefined);
      return;
    }

    const parsedDate = parseDateFromDigits(digits, dateLimitOptions);

    if (parsedDate && isDateAllowed(parsedDate)) {
      onDateChange?.(parsedDate);
      return;
    }

    onDateChange?.(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = sanitizeDateDigits(e.target.value, dateLimitOptions);
    const formatted = formatDateFromDigits(digits);

    onChange(formatted);
    syncSelectedDate(digits);
  };

  const getDisabledDate = () => {
    if (dateLimit === "past") {
      return { after: today };
    }

    if (dateLimit === "future") {
      return { before: addDays(today, 1) };
    }

    return undefined;
  };

  return (
    <div className="flex w-full flex-col gap-2.5 rounded-lg border border-gray-300 px-5 py-2.5">
      <div className="h3 caret-primary-1 flex justify-between">
        <input
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsFocused(false);
            }
          }}
          placeholder="연 / 월 / 일 순으로 입력해주세요."
          inputMode="numeric"
          className={`w-full bg-transparent px-2 outline-none ${
            isFocused || isFilled
              ? "text-text-gray-800 placeholder:text-gray-800"
              : "text-text-gray-400 placeholder:text-gray-400"
          }`}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button type="button">
              <Image
                src="/icons/input/calender.svg"
                alt="캘린더"
                width={25}
                height={25}
              />
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-auto gap-2 p-0">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-gray-200 p-4">
              <div className="rounded-lg bg-white shadow-md">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    if (selectedDate && !isDateAllowed(selectedDate)) {
                      return;
                    }

                    onDateChange?.(selectedDate);
                    if (selectedDate) {
                      onChange(
                        formatDateFromDigits(format(selectedDate, "yyyyMMdd")),
                      );
                    }
                  }}
                  disabled={getDisabledDate()}
                />
              </div>
              <button
                disabled={!date}
                className={`w-full rounded-lg py-3 ${date ? "bg-primary-1 px-13 text-white" : "body bg-gray-300 text-gray-900"}`}
                onClick={() => {
                  if (!date) return;
                  setOpen(false);
                }}
              >
                {date ? `${format(date, "yyyy-MM-dd")} 선택하기` : "선택하기"}
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

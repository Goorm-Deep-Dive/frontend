"use client";

import ArrowLeftIcon from "@/components/icons/arrow-left-icon";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
  isSameDay,
} from "date-fns";
import { useState } from "react";
import { ko } from "date-fns/locale";
import { useGetMonthlyEvents } from "@/apis/generated/api-client";

const CATEGORY_COLOR = {
  금융: "#FFCA96",
  디지털: "#DD8853",
  법원행정: "#35ACB7",
  사무행정: "#006C76",
} as const;

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: monthlyEvents } = useGetMonthlyEvents({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  });

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);

    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];

    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;

        const dayEvents =
          monthlyEvents?.filter((event) => {
            if (!event.endAt) return false;

            return isSameDay(new Date(event.endAt), day);
          }) ?? [];

        days.push(
          <button
            key={day.toString()}
            onClick={() => setSelectedDate(cloneDay)}
            className="flex flex-col items-center"
          >
            <div
              className={`body flex size-10 items-center justify-center rounded-full ${
                isSameDay(day, selectedDate)
                  ? "bg-primary-bg text-primary-1"
                  : isSameMonth(day, monthStart)
                    ? "text-gray-700"
                    : "text-gray-300"
              } `}
            >
              {format(day, "d")}
            </div>

            <div className="mt-1 flex h-2 items-center justify-center gap-1">
              {dayEvents.slice(0, 3).map((event, index) => (
                <div
                  key={index}
                  className="size-1 rounded-full"
                  style={{
                    backgroundColor:
                      CATEGORY_COLOR[
                        event.category as keyof typeof CATEGORY_COLOR
                      ],
                  }}
                />
              ))}
            </div>
          </button>,
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div
          key={day.toString()}
          className="grid grid-cols-7 place-items-center"
        >
          {days}
        </div>,
      );
      days = [];
    }
    return rows;
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-9">
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
          <ArrowLeftIcon width={12} height={12} className="text-gray-400" />
        </button>

        <span className="h4 text-gray-900">
          {format(selectedDate, "M월 d일 EEEE", { locale: ko })}
        </span>

        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          <ArrowRightIcon width={12} height={12} className="text-gray-400" />
        </button>
      </div>

      <div className="mt-4.5 grid grid-cols-7 text-center">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="caption text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-4.5 flex flex-col gap-2.5">{renderCalendar()}</div>
    </div>
  );
}

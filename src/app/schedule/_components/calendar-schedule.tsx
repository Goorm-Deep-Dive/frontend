"use client";

import CalendarScheduleList from "./calendar-schedule-list";
import CalendarButton from "./calendar-button";
import {
  useGetMonthlyEvents,
  useGetDailyEvents,
} from "@/apis/generated/api-client";
import { useState } from "react";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

interface CalendarScheduleProps {
  mode: "monthly" | "weekly" | "daily";
  setMode: React.Dispatch<React.SetStateAction<"monthly" | "weekly" | "daily">>;
}

export default function CalendarSchedule({
  mode,
  setMode,
}: CalendarScheduleProps) {
  const [currentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });

  const { data: monthlyEvents } = useGetMonthlyEvents(
    {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
    },
    {
      query: {
        enabled: mode === "monthly",
      },
    },
  );
  const { data: dailyEvents } = useGetDailyEvents(
    {
      date: currentDate.toISOString().split("T")[0],
    },
    {
      query: {
        enabled: mode === "daily",
      },
    },
  );
  console.log(monthlyEvents);

  const weeklyEvents =
    monthlyEvents?.filter((event) => {
      if (!event.startAt) return false;

      const eventDate = new Date(event.startAt);

      return isWithinInterval(eventDate, {
        start: weekStart,
        end: weekEnd,
      });
    }) ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between pl-2.5">
        <span className="h4 text-gray-900">일정 목록</span>

        <div className="flex gap-2.5">
          <CalendarButton
            label="일간"
            isActive={mode === "daily"}
            onClick={() => setMode("daily")}
          />
          <CalendarButton
            label="주간"
            isActive={mode === "weekly"}
            onClick={() => setMode("weekly")}
          />
          <CalendarButton
            label="월간"
            isActive={mode === "monthly"}
            onClick={() => setMode("monthly")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {mode === "monthly" &&
          monthlyEvents?.map((event) => (
            <CalendarScheduleList
              key={event.eventId}
              eventId={event.eventId}
              title={event.title ?? ""}
              category={event.category ?? ""}
              endAt={event.endAt}
              userProcedureChecklistId={event.userProcedureChecklistId}
            />
          ))}

        {mode === "weekly" &&
          weeklyEvents.map((event) => (
            <CalendarScheduleList
              key={event.eventId}
              eventId={event.eventId}
              title={event.title ?? ""}
              category={event.category ?? ""}
              endAt={event.endAt}
              userProcedureChecklistId={event.userProcedureChecklistId}
            />
          ))}

        {mode === "daily" &&
          dailyEvents?.map((event) => (
            <CalendarScheduleList
              key={event.eventId}
              eventId={event.eventId}
              title={event.title ?? ""}
              category={event.category ?? ""}
              endAt={event.endAt}
              userProcedureChecklistId={event.userProcedureChecklistId}
            />
          ))}
        <div className="flex justify-center">
          {mode === "monthly" && monthlyEvents?.length === 0 && (
            <span className="body2 text-gray-500">
              등록된 월간 일정이 없습니다
            </span>
          )}

          {mode === "weekly" && weeklyEvents.length === 0 && (
            <span className="body2 text-gray-500">
              등록된 주간 일정이 없습니다
            </span>
          )}

          {mode === "daily" && dailyEvents?.length === 0 && (
            <span className="body2 text-gray-500">
              등록된 일간 일정이 없습니다
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

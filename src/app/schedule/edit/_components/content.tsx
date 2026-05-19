"use client";

import NotificationIcon from "@/components/icons/notification-icon";
import ArrowLeftIcon from "@/components/icons/arrow-left-icon";
import AddCalendarIcon from "@/components/icons/add-calendar-icon";
import DateInput from "@/components/common/date-input";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useUpdatePendingTaskCalendar,
} from "@/apis/generated/api-client";
import { useQueryClient } from "@tanstack/react-query";
import { isAfter, startOfDay } from "date-fns";

export default function CalendarEditContent() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [dateValue, setDateValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();

  const searchParams = useSearchParams();

  const eventId = Number(searchParams.get("eventId"));

  const userProcedureChecklistId = Number(
    searchParams.get("userProcedureChecklistId"),
  );

  const { mutate: updateCalendar } = useUpdatePendingTaskCalendar({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["/api/v1/calendars/pending-tasks"],
        });

        queryClient.invalidateQueries({
          queryKey: ["/api/v1/calendars"],
        });

        queryClient.invalidateQueries({
          queryKey: ["/api/v1/calendars/daily"],
        });

        router.back();
      },

      onError: (error) => {
        console.error(error);
      },
    },
  });

  const isScheduledDateValid =
    !!selectedDate &&
    isAfter(startOfDay(selectedDate), startOfDay(new Date()));

  const handleUpdateCalendar = () => {
    if (!isScheduledDateValid) return;

    updateCalendar({
      eventId,
      data: {
        userProcedureChecklistId,
        scheduledAt: `${dateValue.replaceAll(" ", "")}T00:00:00`,
      },
    });
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center justify-center border-b border-gray-200 px-5 py-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-5 flex size-11 items-center justify-center rounded-full border border-gray-200"
        >
          <ArrowLeftIcon width={12} height={12} className="text-gray-900" />
        </button>
        <span className="h2">일정 수정하기</span>
        <button type="button" className="absolute right-5">
          <NotificationIcon width={44} height={44} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-7.5 pt-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2.5">
            <span className="h4 text-gray-900">처리 예정일</span>

            <DateInput
              value={dateValue}
              onChange={setDateValue}
              date={selectedDate}
              onDateChange={setSelectedDate}
              isFilled={!!dateValue}
              dateLimit="future"
            />
          </div>
        </div>

        <div className="mt-auto pt-10 pb-[calc(env(safe-area-inset-bottom)+20px)]">
          <button
            type="button"
            onClick={handleUpdateCalendar}
            disabled={!isScheduledDateValid}
            className="bg-primary-1 flex w-full items-center justify-center gap-1 rounded-lg py-3.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <AddCalendarIcon width={18} height={18} />
            <span className="h4 text-white">캘린더에 반영하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

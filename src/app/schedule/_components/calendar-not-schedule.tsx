"use client";

import CalendarScheduleList from "./calendar-schedule-list";
import CalendarButton from "./calendar-button";
import PlusIcon from "@/components/icons/plus-icon";
import { useState } from "react";
import {
  useGetPendingTasks,
  useCreatePendingTaskCalendar,
} from "@/apis/generated/api-client";
import { useRouter } from "next/navigation";

type Filter = "all" | "긴급" | "빠른처리";

export default function CalendarNotSchedule() {
  const [filter, setFilter] = useState<Filter>("all");
  const router = useRouter();
  const { data: pendingTasks } = useGetPendingTasks();

  const filteredEvents =
    filter === "all"
      ? (pendingTasks ?? [])
      : (pendingTasks?.filter((event) => event.dueDateCategory === filter) ??
        []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between pl-2.5">
        <span className="h4 text-gray-900">미등록 일정</span>
        <div className="flex gap-2.5">
          <CalendarButton
            label="전체"
            isActive={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <CalendarButton
            label="긴급"
            isActive={filter === "긴급"}
            onClick={() => setFilter("긴급")}
          />
          <CalendarButton
            label="빠른처리"
            isActive={filter === "빠른처리"}
            onClick={() => setFilter("빠른처리")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {filteredEvents.map((event) => (
          <div
            key={event.userProcedureChecklistId}
            className="flex items-center gap-2"
          >
            <CalendarScheduleList
              title={event.title ?? ""}
              category={event.category ?? ""}
              dueDateCategory={event.dueDateCategory ?? ""}
            />

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/schedule/add?id=${event.userProcedureChecklistId}`,
                )
              }
            >
              <PlusIcon width={20} height={20} />
            </button>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <span className="body2 text-gray-500">미등록 일정이 없습니다</span>
        )}
      </div>
    </div>
  );
}

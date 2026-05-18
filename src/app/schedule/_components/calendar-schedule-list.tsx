import ScheduleListIcon from "@/components/icons/schedule-list-icon";
import ScheduleBadge from "./cahlendar-badge";
import { format } from "date-fns";
import {
  useDeletePendingTaskCalendar,
  useUpdatePendingTaskCalendar,
} from "@/apis/generated/api-client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface CalendarScheduleListProps {
  title: string;
  category: string;
  dueDateCategory?: string;
  endAt?: string;
  eventId?: number;
  userProcedureChecklistId?: number;
}

export default function CalendarScheduleList({
  title,
  category,
  dueDateCategory,
  endAt,
  eventId,
  userProcedureChecklistId,
}: CalendarScheduleListProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteCalendar } = useDeletePendingTaskCalendar({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["/api/v1/calendars"],
        });

        queryClient.invalidateQueries({
          queryKey: ["/api/v1/calendars/daily"],
        });

        queryClient.invalidateQueries({
          queryKey: ["/api/v1/calendars/pending-tasks"],
        });
      },
    },
  });

  const { mutate: updateCalendar } = useUpdatePendingTaskCalendar({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["/api/v1/calendars"],
        });

        router.back();
      },
    },
  });

  const handleDelete = () => {
    if (!eventId) return;

    deleteCalendar({
      eventId,
    });
  };
  const handleUpdate = () => {
    if (!eventId || !userProcedureChecklistId) return;

    const localDate = new Date(`${endAt?.replaceAll(" ", "")}T00:00:00`);

    updateCalendar({
      eventId,
      data: {
        userProcedureChecklistId,
        scheduledAt: localDate.toISOString(),
      },
    });
  };

  return (
    <div className="flex w-full justify-between rounded-lg border border-gray-300 px-5 py-2.5">
      <div className="flex w-full flex-col gap-1.5">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2.5">
            <ScheduleListIcon width={18} height={18} />
            <span className="h4 max-w-[11.25rem] truncate text-gray-700">
              {title}
            </span>
          </div>
          <ScheduleBadge
            category={category}
            dueDateCategory={dueDateCategory}
            endAt={endAt}
          />
        </div>
        <div className="flex w-full items-center">
          {endAt && (
            <div className="flex w-full items-center justify-between">
              <span className="caption text-sementic-info">{`등록 일정: ${format(new Date(endAt), "yyyy-MM-dd")}`}</span>

              <div>
                <button
                  onClick={() =>
                    router.push(
                      `/schedule/edit?eventId=${eventId}&userProcedureChecklistId=${userProcedureChecklistId}`,
                    )
                  }
                  className="caption text-sementic-info"
                >
                  수정하기
                </button>
                <span className="caption text-sementic-info"> / </span>
                <button
                  onClick={handleDelete}
                  className="caption text-sementic-info"
                >
                  삭제하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

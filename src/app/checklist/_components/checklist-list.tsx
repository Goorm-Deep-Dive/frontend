import ArrowRightIcon from "@/components/icons/arrow-right-icon";
import CheckIcon from "@/components/icons/check-icon";
import ChecklistBadge from "./checklist-list-badge";
import { cn } from "@/lib/cn";
import { useRouter } from "next/navigation";

interface Props {
  procedureId: number;
  userProcedureChecklistId: number;
  title: string;
  index: number;
  listDate?: number; // D-30
  isDone?: boolean;
  priority?: string;
}

export default function ChecklistList({
  procedureId,
  userProcedureChecklistId,
  title,
  index,
  listDate,
  isDone,
  priority,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(
      `/checklist/${procedureId}?userProcedureChecklistId=${userProcedureChecklistId}`,
    );
  };

  const showListDate = listDate && listDate > 0 && +listDate < 31;

  return (
    <button
      className="flex justify-between rounded-lg bg-gray-200 px-5 py-3"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={cn(
            "label flex h-8 min-h-8 w-8 min-w-8 items-center justify-center rounded-full text-white",
            isDone ? "bg-primary-1" : "bg-gray-900",
          )}
        >
          {isDone ? <CheckIcon width={10} height={8} /> : index}
        </div>
        <span
          className={cn(
            "label text-left wrap-break-word whitespace-pre-line",
            showListDate && "max-w-31",
          )}
        >
          {title}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {showListDate ? (
          <ChecklistBadge
            priority={isDone ? "완료" : priority}
            date={listDate}
          />
        ) : null}
        <span className="flex items-center gap-2.5 whitespace-nowrap">
          <span className="caption">자세히보기</span>
          <ArrowRightIcon width={6} height={10} />
        </span>
      </div>
    </button>
  );
}

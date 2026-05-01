import ArrowRightIcon from "@/components/icons/arrow-right-icon";
import CheckIcon from "@/components/icons/check-icon";
import ChecklistListDate from "./checklist-list-date";
import { cn } from "@/lib/cn";

type Status = "default" | "urgent" | "done";

interface Props {
  title: string;
  index: number;
  status: Status;
  listDate?: string; // D-30
  onClick?: () => void;
}

export default function ChecklistList({
  title,
  index,
  status = "default",
  listDate,
  onClick,
}: Props) {
  const isDone = status === "done";
  return (
    <div className="flex justify-between rounded-lg bg-gray-200 px-5 py-3">
      <div className="flex items-center gap-2.5">
        <div
          className={cn(
            "label flex h-8 w-8 items-center justify-center rounded-full text-white",
            isDone ? "bg-primary-1" : "bg-gray-900",
          )}
        >
          {isDone ? <CheckIcon width={10} height={8} /> : index}
        </div>
        <span className="label">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        <ChecklistListDate listDate={listDate} status={status} />

        <button onClick={onClick} className="flex items-center gap-2.5">
          <span className="caption">자세히보기</span>
          <ArrowRightIcon width={6} height={10} />
        </button>
      </div>
    </div>
  );
}

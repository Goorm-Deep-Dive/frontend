import { cn } from "@/lib/cn";
import CheckIcon from "@/components/icons/check-icon";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";
import ChecklistBadge from "./checklist-list-badge";

interface ChecklistAddProps {
  procedureId: number;
  title: string;
  index: number;
  listDate?: number; // D-30
  isDone?: boolean;
  isClicked?: boolean;
  onClick?: () => void;
}

export default function ChecklistAdd({
  procedureId,
  title,
  index,
  listDate,
  isDone,
}: ChecklistAddProps) {
  const showListDate = listDate && listDate > 0 && listDate < 31;

  return (
    <div className="flex w-full justify-between rounded-lg border-2 border-gray-100 px-5 py-2.5">
      <div className="flex items-center gap-2.5">
        <div className="label flex h-8 min-h-8 w-8 min-w-8 items-center justify-center rounded-full bg-gray-300 text-white">
          {isDone ? <CheckIcon width={10} height={8} /> : index}
        </div>
        <span
          className={cn(
            "label text-left wrap-break-word whitespace-pre-line text-gray-900",
            showListDate && "max-w-31",
          )}
        >
          {title}
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        {showListDate && <ChecklistBadge listDate={`D-${listDate}`} />}

        <span className="flex items-center gap-2.5 whitespace-nowrap">
          <span className="caption">자세히보기</span>
          <ArrowRightIcon width={6} height={10} />
        </span>
      </div>
    </div>
  );
}

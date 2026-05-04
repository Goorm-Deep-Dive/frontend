import { cn } from "@/lib/cn";

type Status = "default" | "urgent" | "done";

interface ChecklistBadgeProps {
  listDate?: string; // D-30
  status: Status;
}

export default function ChecklistBadge({
  listDate,
  status,
}: ChecklistBadgeProps) {
  const mode = {
    default: {
      description: listDate,
      style:
        "text-sementic-red bg-sementic-red-bg border-sementic-red px-2 py-1",
    },
    urgent: {
      description: "긴급",
      style:
        "text-sementic-red bg-sementic-red-bg border-sementic-red px-3 py-1",
    },
    done: {
      description: "완료",
      style: "text-primary-1 bg-primary-2 border-primary-1 px-3 py-1",
    },
  };

  const current = mode[status];

  return (
    <div className={cn("label rounded-md border-2", current.style)}>
      {current.description}
    </div>
  );
}

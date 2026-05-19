import {
  getBadgeLabel,
  getRemainingDaysLabel,
} from "../_utils/get-checklist-badge-label";

interface Props {
  dueDateType?: string;
  date?: number;
}
const BADGE_STYLE = {
  scheduled: {
    bg: "#FDEDE9",
    text: "#FF3764",
  },
  IMMEDIATE: {
    bg: "#FDEDE9",
    text: "#FF3764",
  },
  NONE: {
    bg: "#FFEFE7",
    text: "#FF6F1B",
  },
  완료: {
    bg: "#91B3B7",
    text: "#006C76",
  },
} as const;

export default function ChecklistBadge({ dueDateType, date }: Props) {
  if (dueDateType === "RELATIVE") return null;

  const label = getBadgeLabel(dueDateType) ?? getRemainingDaysLabel(date);
  if (!label) return null;

  const badgeStyle =
    BADGE_STYLE[dueDateType as keyof typeof BADGE_STYLE] ||
    BADGE_STYLE.scheduled;

  return (
    <div className="flex items-center gap-2.5">
      <div
        className="rounded-md border px-2 py-0.5"
        style={{
          backgroundColor: badgeStyle.bg,
          borderColor: badgeStyle.text,
          color: badgeStyle.text,
        }}
      >
        {label}
      </div>
    </div>
  );
}

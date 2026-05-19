interface Props {
  priority?: string;
  date?: number;
}
const BADGE_STYLE = {
  scheduled: {
    bg: "#FDEDE9",
    text: "#FF3764",
  },
  긴급: {
    bg: "#FDEDE9",
    text: "#FF3764",
  },
  빠른처리: {
    bg: "#FFEFE7",
    text: "#FF6F1B",
  },
  완료: {
    bg: "#91B3B7",
    text: "#006C76",
  },
} as const;

export default function ChecklistBadge({ priority, date }: Props) {
  const badgeStyle =
    BADGE_STYLE[priority as keyof typeof BADGE_STYLE] || BADGE_STYLE.scheduled;

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
        {priority || `D-${date}`}
      </div>
    </div>
  );
}

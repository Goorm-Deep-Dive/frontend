interface DdayBadgeProps {
  category: string;
  dueDateCategory?: string;
  endAt?: string;
}

const CATEGORY_COLOR = {
  금융: "#FFCA96",
  디지털: "#DD8853",
  법원행정: "#35ACB7",
  사무행정: "#006C76",
} as const;

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
} as const;

export default function DdayBadge({
  category,
  dueDateCategory,
  endAt,
}: DdayBadgeProps) {
  const categoryStyle = CATEGORY_COLOR[category as keyof typeof CATEGORY_COLOR];
  const badgeStyle =
    BADGE_STYLE[dueDateCategory as keyof typeof BADGE_STYLE] ||
    BADGE_STYLE.scheduled;

  const getDDay = () => {
    if (!endAt) return "";

    const today = new Date();
    const targetDate = new Date(endAt);

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `D-${diffDays}`;
    if (diffDays === 0) return "D-Day";

    return `D+${Math.abs(diffDays)}`;
  };

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-1">
        <div
          className="size-2 rounded-full"
          style={{ backgroundColor: categoryStyle }}
        ></div>
        <div>{category}</div>
      </div>

      <div
        className="rounded-md border px-2 py-0.5"
        style={{
          backgroundColor: badgeStyle.bg,
          borderColor: badgeStyle.text,
          color: badgeStyle.text,
        }}
      >
        {dueDateCategory || getDDay()}
      </div>
    </div>
  );
}

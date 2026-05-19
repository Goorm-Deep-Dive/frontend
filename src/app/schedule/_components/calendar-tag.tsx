const TAGS = [
  { label: "금융", color: "var(--color-tag-finance)" },
  { label: "디지털", color: "var(--color-tag-digital)" },
  { label: "법원행정", color: "var(--color-tag-court)" },
  { label: "사무행정", color: "var(--color-tag-office)" },
];

export default function CalendarTag() {
  return (
    <div className="flex items-center justify-center gap-2.5 rounded-md bg-gray-100 py-1.5">
      {TAGS.map((item) => (
        <div key={item.label} className="flex items-center gap-1.25">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="other2 text-gray-700">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

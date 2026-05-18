interface CalendarButtonProps {
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export default function CalendarButton({
  label,
  isActive,
  onClick,
}: CalendarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`label rounded-lg border-2 px-4 py-1.5 ${
        isActive
          ? "border-primary-1 bg-primary-bg text-primary-1"
          : "border-primary-bg bg-white text-gray-500"
      }`}
    >
      {label}
    </button>
  );
}

import MinusIcon from "@/components/icons/minus-icon";

export default function ChecklistMinusButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div className="rounded-lg bg-gray-200">
      <button
        className="flex items-center justify-center p-3.5"
        onClick={onClick}
      >
        <MinusIcon width={18} height={18} />
      </button>
    </div>
  );
}

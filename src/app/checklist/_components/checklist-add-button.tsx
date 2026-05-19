import PlusIcon from "@/components/icons/plus-icon";

export default function ChecklistAddButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div className="shrink-0 rounded-lg bg-gray-200">
      <button
        type="button"
        className="flex items-center justify-center p-3.5"
        onClick={onClick}
      >
        <PlusIcon width={18} height={18} />
      </button>
    </div>
  );
}

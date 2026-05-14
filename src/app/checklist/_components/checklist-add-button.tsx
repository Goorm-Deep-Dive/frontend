import PlusIcon from "@/components/icons/plus-icon";

export default function ChecklistAddButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-center rounded-lg bg-gray-200">
      <button
        className="flex h-[46px] w-[46px] items-center justify-center p-3"
        onClick={onClick}
      >
        <PlusIcon width={20} height={20} />
      </button>
    </div>
  );
}

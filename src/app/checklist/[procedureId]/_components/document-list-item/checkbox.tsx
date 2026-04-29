import CheckIcon from "@/components/icons/check-icon";
import { cn } from "@/lib/cn";

interface Props {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  defaultChecked: boolean;
}
export default function Checkbox({ id, checked, onChange }: Props) {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-2 select-none"
      >
        <span
          className={cn(
            "border-primary-1 flex h-5 w-5 items-center justify-center rounded-[4px] border-2 transition-colors",
            checked ? "bg-primary-1" : "bg-white",
          )}
          aria-hidden="true"
        >
          {checked && <CheckIcon className="h-2 w-2.5" />}
        </span>
      </label>
    </>
  );
}

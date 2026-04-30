"use client";

import { Switch as UiSwitch } from "@/components/ui/switch";

interface Props {
  checked: boolean;
  onChangeChecked: (checked: boolean) => void;
  className?: string;
  ariaLabel?: string;
}

export default function Switch({
  checked,
  onChangeChecked,
  className,
  ariaLabel,
}: Props) {
  return (
    <UiSwitch
      checked={checked}
      onCheckedChange={onChangeChecked}
      className={className}
      aria-label={ariaLabel}
    />
  );
}

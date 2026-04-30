"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Props {
  value: number;
  className?: string;
  indicatorClassName?: string;
}

export default function ProgressBar({
  value,
  className,
  indicatorClassName,
}: Props) {
  const normalizedValue = Math.max(0, Math.min(value, 100));

  return (
    <Progress
      value={normalizedValue}
      className={cn(
        "bg-primary-bg relative h-3",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-full",
        "before:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]",
        className,
      )}
      indicatorClassName={cn("bg-primary-1", indicatorClassName)}
      aria-label={`진행률 ${Math.round(normalizedValue)}%`}
    />
  );
}

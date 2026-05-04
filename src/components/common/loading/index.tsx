import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

const DOT_COUNT = 8;
const CYCLE_MS = 1200;
const DOT_SIZE_PX = 12;

const sizeConfig = {
  sm: { orbit: 12 },
  md: { orbit: 16 },
  lg: { orbit: 20 },
} as const;

export type DotSpinnerSize = keyof typeof sizeConfig;

export interface DotSpinnerProps {
  size?: DotSpinnerSize;
  className?: string;
  "aria-label"?: string;
}

export const DotSpinner = ({
  size = "md",
  className,
  "aria-label": ariaLabel = "불러오는 중",
}: DotSpinnerProps) => {
  const { orbit } = sizeConfig[size];
  const box = 2 * orbit + DOT_SIZE_PX;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: box, height: box }}
    >
      {Array.from({ length: DOT_COUNT }, (_, index) => {
        const angle = index * (360 / DOT_COUNT);
        const dotStyle = {
          width: DOT_SIZE_PX,
          height: DOT_SIZE_PX,
          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${orbit}px)`,
          animationDelay: `${(-CYCLE_MS * index) / DOT_COUNT}ms`,
        } satisfies CSSProperties;

        return (
          <span
            key={index}
            className="loading-dot-trail-dot absolute top-1/2 left-1/2 rounded-full"
            style={dotStyle}
          />
        );
      })}
    </div>
  );
};

export interface LoadingSpinnerProps extends DotSpinnerProps {
  withPanel?: boolean;
}

const LoadingSpinner = ({
  size = "md",
  withPanel = false,
  className,
  "aria-label": ariaLabel,
}: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12",
        className,
      )}
    >
      <div
        className={cn(
          withPanel &&
            "flex h-22.5 w-22.5 flex-col items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-200/80",
        )}
      >
        <DotSpinner size={size} aria-label={ariaLabel} />
      </div>
    </div>
  );
};

export default LoadingSpinner;

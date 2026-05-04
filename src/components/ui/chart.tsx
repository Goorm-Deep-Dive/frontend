"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  {
    label?: string;
    color?: string;
  }
>;

interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
  useResponsiveContainer?: boolean;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  (
    { className, children, config, useResponsiveContainer = true, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          useResponsiveContainer && "aspect-video",
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border/50 [&_.recharts-radial-bar-background-sector]:fill-primary-bg [&_.recharts-text]:fill-foreground flex justify-center text-xs",
          className,
        )}
        {...props}
      >
        <ChartStyle config={config} />
        {useResponsiveContainer ? (
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        ) : (
          <div className="relative h-full min-h-0 w-full min-w-0 shrink-0">
            {children}
          </div>
        )}
      </div>
    );
  },
);

ChartContainer.displayName = "ChartContainer";

const ChartStyle = ({ config }: { config: ChartConfig }) => {
  const colorEntries = Object.entries(config).filter(
    ([, value]) => value.color,
  );

  if (colorEntries.length === 0) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            ${colorEntries
              .map(([key, value]) => `--color-${key}: ${value.color};`)
              .join("\n")}
          }
        `,
      }}
    />
  );
};

export { ChartContainer };

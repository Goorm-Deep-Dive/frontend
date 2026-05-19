"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/cn";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "group focus-visible:ring-primary-1 inline-flex h-11 w-[60px] shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 shadow-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        data-slot="switch-track"
        className="group-data-[state=checked]:bg-primary-1 relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent p-0.5 shadow-xs transition-colors group-data-[state=unchecked]:bg-gray-500"
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={cn(
            "pointer-events-none block size-4 shrink-0 rounded-full bg-white ring-0 transition-transform duration-200 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
          )}
        />
      </span>
    </SwitchPrimitive.Root>
  );
}

export { Switch };

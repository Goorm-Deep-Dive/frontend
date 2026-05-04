import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-all disabled:pointer-events-none whitespace-nowrap cursor-pointer",
  {
    variants: {
      rounded: {
        true: "rounded-2xl",
        false: "rounded-[10px]",
      },
      variant: {
        primary: `
        bg-primary-1 text-white
        disabled:bg-gray-300 disabled:text-gray-900
      `,
        secondary: `
        bg-gray-700 text-white
        hover:bg-gray-600
        disabled:bg-gray-300 disabled:text-gray-900
      `,
        ghost: `
        bg-transparent text-zinc-900
        hover:bg-zinc-100
        disabled:bg-transparent disabled:text-zinc-400 disabled:opacity-50
        dark:text-zinc-50 dark:hover:bg-zinc-800 dark:disabled:text-zinc-600
      `,
      },
      size: {
        large: "h4 px-38 py-2.5 w-full",
        small: "label py-1 px-5 w-max",
        icon: "inline-flex size-9 shrink-0 items-center justify-center gap-0 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "large",
      rounded: false,
    },
  },
);

function Button({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  type = "button",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type={asChild ? undefined : type}
      className={cn(buttonVariants({ variant, size, rounded }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };

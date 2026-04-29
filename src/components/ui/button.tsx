import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[10px] transition-all disabled:pointer-events-none whitespace-nowrap cursor-pointer",
  {
    variants: {
      variant: {
        primary: `
        bg-primary-1 text-white
        disabled:bg-gray-300 disabled:text-gray-900
      `,
      },
      size: {
        large: "h4 px-38 py-2.5 w-full",
        small: "label py-1 px-2.5 w-max",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "large",
    },
  },
);

function Button({
  className,
  variant,
  size,
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
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };

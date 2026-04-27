import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[10px] transition-all disabled:pointer-events-none ",
  {
    variants: {
      variant: {
        primary: `
        bg-primary-1 text-white
        disabled:bg-gray-300 disabled:text-[#444444]
      `,
        secondary: `
          disabled:bg-gray-300 disabled:text-gray-900
        `,
      },
      size: {
        register: "h4 px-38 py-2.5",
        day: "h4 py-2.5 px-14",
        save: "label px-2.5 py-1 rounded-[20px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "register",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
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

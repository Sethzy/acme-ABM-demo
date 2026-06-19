"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = {
  default:
    "bg-[var(--color-deep-plum)] text-[var(--color-ghost-white)] shadow-[var(--shadow-subtle)] hover:brightness-[1.04]",
  ghost:
    "text-[var(--color-charcoal-text)] hover:text-[var(--color-deep-plum)]",
  outline:
    "border border-[color-mix(in_srgb,var(--color-steel-gray)_82%,transparent)] bg-[color-mix(in_srgb,var(--color-ghost-white)_86%,transparent)] text-[var(--color-charcoal-text)] shadow-[var(--shadow-subtle-2)] hover:border-[color-mix(in_srgb,var(--color-ink-blue)_18%,var(--color-steel-gray))] hover:bg-[var(--color-ghost-white)] hover:text-[var(--color-deep-plum)]",
} as const;

const buttonSizes = {
  default: "h-[44px] px-4 py-2",
  sm: "h-[40px] px-3",
  lg: "h-[48px] px-[20px]",
  icon: "h-[44px] w-[44px]",
} as const;

type ButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
};

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        "focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] text-[14px] font-medium leading-none tracking-normal transition duration-200 active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };

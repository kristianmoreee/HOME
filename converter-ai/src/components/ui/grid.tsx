import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * 12-column grid. Mobile is always a single column, tablet 6 columns,
 * desktop 12. Children place themselves with GridItem spans.
 */
export const gridVariants = cva("grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12", {
  variants: {
    gap: {
      sm: "gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8 lg:gap-10",
    },
  },
  defaultVariants: { gap: "md" },
});

export function Grid({
  className,
  gap,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof gridVariants>) {
  return <div className={cn(gridVariants({ gap }), className)} {...props} />;
}

const spanClasses = {
  3: "md:col-span-3 lg:col-span-3",
  4: "md:col-span-3 lg:col-span-4",
  5: "md:col-span-6 lg:col-span-5",
  6: "md:col-span-6 lg:col-span-6",
  7: "md:col-span-6 lg:col-span-7",
  8: "md:col-span-6 lg:col-span-8",
  12: "md:col-span-6 lg:col-span-12",
} as const;

export type GridSpan = keyof typeof spanClasses;

export function GridItem({
  span = 12,
  className,
  ...props
}: ComponentProps<"div"> & { span?: GridSpan }) {
  return <div className={cn("col-span-1", spanClasses[span], className)} {...props} />;
}

/** Simple auto-responsive column grid for uniform items (cards, logos). */
const autoColumns = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function AutoGrid({
  columns = 3,
  className,
  ...props
}: ComponentProps<"div"> & { columns?: keyof typeof autoColumns }) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-4 md:gap-6", autoColumns[columns], className)}
      {...props}
    />
  );
}

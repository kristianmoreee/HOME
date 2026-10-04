import type { ComponentProps, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const containerVariants = cva("mx-auto w-full px-gutter", {
  variants: {
    size: {
      /** 1280px: default content width. */
      site: "max-w-site",
      /** 1440px: full-bleed media, bento layouts. */
      wide: "max-w-wide",
      /** 672px: long-form reading. */
      reading: "max-w-reading",
      /** Edge to edge with gutters only. */
      full: "max-w-none",
    },
  },
  defaultVariants: { size: "site" },
});

type ContainerProps = ComponentProps<"div"> &
  VariantProps<typeof containerVariants> & { as?: ElementType };

export function Container({ as: Tag = "div", size, className, ...props }: ContainerProps) {
  return <Tag className={cn(containerVariants({ size }), className)} {...props} />;
}

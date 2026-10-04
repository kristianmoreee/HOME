import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full font-mono text-eyebrow uppercase",
  {
    variants: {
      variant: {
        glass: "glass px-3.5 py-1.5 text-fg-muted",
        outline: "border border-line px-3.5 py-1.5 text-fg-muted",
        accent: "border border-line-accent bg-electric-500/10 px-3.5 py-1.5 text-electric-300",
        plain: "text-fg-subtle",
      },
    },
    defaultVariants: { variant: "glass" },
  },
);

type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    /** Shows a live cyan status dot. */
    dot?: boolean;
  };

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot ? (
        <span aria-hidden="true" className="relative flex size-1.5">
          <span className="absolute inset-0 animate-pulse-dot rounded-full bg-cyan-400" />
          <span className="relative size-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_var(--color-cyan-400)]" />
        </span>
      ) : null}
      {children}
    </span>
  );
}

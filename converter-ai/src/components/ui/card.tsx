import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const cardVariants = cva(
  "relative isolate overflow-hidden rounded-card transition-[border-color,background-color,box-shadow,transform] duration-500 ease-out-expo",
  {
    variants: {
      variant: {
        /** Solid surface, the default content container. */
        surface: "border border-line bg-surface",
        /** Subtle glassmorphism for content over glow or imagery. */
        glass: "glass",
        /** Stronger glass for floating UI (navbar sheet, popovers). */
        elevated: "glass-strong",
        /** Hairline only. Lowest emphasis. */
        outline: "border border-line bg-transparent",
        /** Faint accent edge. For a single featured item. */
        featured:
          "border border-line-accent bg-[linear-gradient(180deg,rgb(42_92_240/0.10),rgb(5_8_24/0.6)_45%)] shadow-glow-electric",
      },
      padding: {
        none: "",
        sm: "p-5",
        md: "p-6 md:p-8",
        lg: "p-8 md:p-10",
      },
      interactive: {
        true: "hover:-translate-y-0.5 hover:border-line-strong",
        false: "",
      },
    },
    defaultVariants: { variant: "surface", padding: "md", interactive: false },
  },
);

export type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export function Card({ className, variant, padding, interactive, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, padding, interactive }), className)} {...props} />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 className={cn("text-h3 font-medium text-fg", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-body text-fg-muted", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mt-auto flex items-center gap-3 pt-6", className)} {...props} />;
}

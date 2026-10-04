import type { ComponentProps, ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Typography scale. Sizes are fluid tokens from tokens.css, so every level is
 * responsive without breakpoint classes.
 *
 * display-2xl  Hero statement, one per page
 * display-xl   Section-opening statements, CTA
 * display-lg   Large section titles
 * h1-h4        Content hierarchy
 * body-lg      Lead paragraphs
 * body         Default text
 * body-sm      Supporting text, UI
 * caption      Meta, legal
 * eyebrow      Mono uppercase labels above headings
 */
export const headingVariants = cva("font-display text-fg", {
  variants: {
    size: {
      "display-2xl": "text-display-2xl font-medium",
      "display-xl": "text-display-xl font-medium",
      "display-lg": "text-display-lg font-medium",
      h1: "text-h1 font-medium",
      h2: "text-h2 font-medium",
      h3: "text-h3 font-medium",
      h4: "text-h4 font-medium",
    },
    tone: {
      default: "text-fg",
      sheen: "text-sheen",
      muted: "text-fg-muted",
    },
  },
  defaultVariants: { size: "h2", tone: "default" },
});

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type HeadingProps = Omit<ComponentPropsWithoutRef<"h2">, "color"> &
  VariantProps<typeof headingVariants> & {
    /** The semantic element. Visual size is set independently with `size`. */
    as?: HeadingLevel;
  };

export function Heading({ as: Tag = "h2", size, tone, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size, tone }), className)} {...props} />;
}

export const textVariants = cva("", {
  variants: {
    size: {
      lg: "text-body-lg",
      md: "text-body",
      sm: "text-body-sm",
      caption: "text-caption",
    },
    tone: {
      default: "text-fg",
      muted: "text-fg-muted",
      subtle: "text-fg-subtle",
    },
  },
  defaultVariants: { size: "md", tone: "muted" },
});

type TextProps = ComponentPropsWithoutRef<"p"> &
  VariantProps<typeof textVariants> & { as?: "p" | "span" | "div" };

export function Text({ as: Tag = "p", size, tone, className, ...props }: TextProps) {
  return <Tag className={cn(textVariants({ size, tone }), className)} {...props} />;
}

/** Mono uppercase label. Optional index renders as "01 /". */
export function Eyebrow({
  index,
  className,
  children,
  as: Tag = "p",
}: {
  index?: string;
  className?: string;
  children: ReactNode;
  as?: ElementType;
}) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-3 font-mono text-eyebrow uppercase text-fg-subtle",
        className,
      )}
    >
      {index ? <span className="text-electric-300">{index}</span> : null}
      {index ? <span aria-hidden="true" className="h-px w-6 bg-line-strong" /> : null}
      {children}
    </Tag>
  );
}

/** Editorial serif italic accent for one or two words inside a heading. */
export function Accent({ className, ...props }: ComponentProps<"em">) {
  return (
    <em className={cn("font-serif font-normal italic tracking-[-0.02em]", className)} {...props} />
  );
}

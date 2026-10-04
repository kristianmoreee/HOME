import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export const sectionVariants = cva("relative isolate", {
  variants: {
    spacing: {
      default: "py-section",
      compact: "py-section-sm",
      none: "",
    },
    divider: {
      true: "border-t border-line",
      false: "",
    },
  },
  defaultVariants: { spacing: "default", divider: false },
});

type SectionProps = ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    /** Wrap children in the site Container. Disable for full-bleed sections. */
    contained?: boolean;
    containerSize?: ComponentProps<typeof Container>["size"];
  };

export function Section({
  spacing,
  divider,
  contained = true,
  containerSize,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ spacing, divider }), className)} {...props}>
      {contained ? <Container size={containerSize}>{children}</Container> : children}
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  /** Right-aligned slot on desktop, e.g. a "View all" link. */
  action?: ReactNode;
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
};

export function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  align = "start",
  action,
  className,
  titleAs = "h2",
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-8 md:mb-16 lg:mb-20",
        !centered && action && "md:flex-row md:items-end md:justify-between",
        centered && "items-center text-center",
        className,
      )}
    >
      <div className={cn("flex max-w-3xl flex-col gap-5", centered && "items-center")}>
        {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
        <Heading as={titleAs} size="display-lg" tone="sheen">
          {title}
        </Heading>
        {description ? (
          <Text size="lg" className="max-w-2xl">
            {description}
          </Text>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

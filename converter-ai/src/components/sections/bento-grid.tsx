import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

/**
 * Bento layout on a 6-column desktop grid (3 on tablet, 1 on mobile).
 * Compose BentoCards with colSpan/rowSpan; aim for every row to sum to 6.
 */
export function BentoGrid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-flow-row-dense auto-rows-[minmax(16rem,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5",
        className,
      )}
      {...props}
    />
  );
}

const colSpans = {
  2: "md:col-span-3 lg:col-span-2",
  3: "md:col-span-3 lg:col-span-3",
  4: "md:col-span-6 lg:col-span-4",
  6: "md:col-span-6 lg:col-span-6",
} as const;

const rowSpans = {
  1: "",
  2: "md:row-span-2",
} as const;

type BentoCardProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  icon?: LucideIcon;
  /** Desktop column span out of 6. */
  colSpan?: keyof typeof colSpans;
  rowSpan?: keyof typeof rowSpans;
  /** Decorative visual, rendered behind the copy and anchored to the top. */
  visual?: ReactNode;
  featured?: boolean;
  className?: string;
};

export function BentoCard({
  title,
  description,
  eyebrow,
  icon: Icon,
  colSpan = 2,
  rowSpan = 1,
  visual,
  featured = false,
  className,
}: BentoCardProps) {
  return (
    <SpotlightCard
      variant={featured ? "featured" : "glass"}
      padding="none"
      className={cn(
        "flex min-h-64 flex-col justify-end",
        colSpans[colSpan],
        rowSpans[rowSpan],
        className,
      )}
    >
      {visual ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_35%,transparent_85%)]"
        >
          {visual}
        </div>
      ) : null}
      <div className="flex flex-col gap-3 p-6 md:p-8">
        {Icon ? (
          <Icon className="mb-2 size-6 text-electric-300" strokeWidth={1.5} aria-hidden="true" />
        ) : null}
        {eyebrow ? (
          <p className="font-mono text-eyebrow uppercase text-fg-subtle">{eyebrow}</p>
        ) : null}
        <h3
          className={cn(
            "font-medium text-fg",
            rowSpan === 2 || colSpan >= 4 ? "text-h2" : "text-h3",
          )}
        >
          {title}
        </h3>
        {description ? <p className="max-w-md text-body text-fg-muted">{description}</p> : null}
      </div>
    </SpotlightCard>
  );
}

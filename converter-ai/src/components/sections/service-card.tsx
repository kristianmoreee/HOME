import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Makes the whole card a link. */
  href?: string;
  /** Two-digit index shown in the corner, e.g. "01". */
  index?: string;
  /** Short capability tags. Keep to three or fewer. */
  tags?: readonly string[];
  className?: string;
};

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  index,
  tags,
  className,
}: ServiceCardProps) {
  return (
    <SpotlightCard
      variant="glass"
      padding="md"
      interactive={Boolean(href)}
      className={cn("group/service flex h-full flex-col", className)}
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex size-12 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-electric-300 transition-colors duration-500 group-hover/service:border-line-accent group-hover/service:text-white">
          <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
        </span>
        {index ? <span className="font-mono text-caption text-fg-faint">{index}</span> : null}
      </div>

      <div className="mt-10 flex flex-col gap-3 md:mt-14">
        <h3 className="text-h3 font-medium text-fg">
          {href ? (
            <Link
              href={href}
              className="outline-none after:absolute after:inset-0 after:rounded-[inherit] focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-ring"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="text-body text-fg-muted">{description}</p>
      </div>

      {tags?.length || href ? (
        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          {tags?.length ? (
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-caption text-fg-subtle"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
          {href ? (
            <span
              aria-hidden="true"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-fg-muted transition-all duration-500 ease-out-expo group-hover/service:rotate-45 group-hover/service:border-white group-hover/service:bg-white group-hover/service:text-ink-950"
            >
              <ArrowUpRight className="size-4" />
            </span>
          ) : null}
        </div>
      ) : null}
    </SpotlightCard>
  );
}

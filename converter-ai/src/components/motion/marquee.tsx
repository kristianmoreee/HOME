import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. Higher is calmer. */
  duration?: number;
  /** Space between items, any CSS length. */
  gap?: string;
  reverse?: boolean;
  /** Pause while hovered or while a child has keyboard focus. */
  pauseOnHover?: boolean;
  /** Fade the left and right edges into the background. */
  fade?: boolean;
  /** Accessible name describing the scrolling content. */
  label?: string;
  className?: string;
};

/**
 * Infinite horizontal marquee.
 *
 * Inspired by the 21st.dev "Logo Marquee" (grootstudio): masked edges and a calm
 * default speed. Rebuilt in pure CSS so it needs no JS measuring, runs on the
 * compositor, renders on the server, and stops under prefers-reduced-motion.
 * The duplicate track is `inert` and hidden from assistive technology.
 */
export function Marquee({
  children,
  duration = 40,
  gap = "3rem",
  reverse = false,
  pauseOnHover = true,
  fade = true,
  label,
  className,
}: MarqueeProps) {
  const style = {
    "--marquee-duration": `${duration}s`,
    "--marquee-gap": gap,
    gap,
  } as CSSProperties;

  const track = cn(
    "flex min-w-full shrink-0 items-center justify-around animate-marquee",
    reverse && "[animation-direction:reverse]",
    pauseOnHover &&
      "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]",
  );

  return (
    <div
      role={label ? "region" : undefined}
      aria-label={label}
      className={cn("group/marquee flex overflow-hidden", fade && "fade-edges-x", className)}
      style={style}
    >
      <div className={track} style={{ gap }}>
        {children}
      </div>
      <div className={track} style={{ gap }} aria-hidden="true" inert>
        {children}
      </div>
    </div>
  );
}

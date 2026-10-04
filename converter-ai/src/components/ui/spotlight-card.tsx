"use client";

import type { CSSProperties, PointerEvent } from "react";
import { Card, type CardProps } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SpotlightCardProps = CardProps & {
  /** Any CSS color. Defaults to a soft electric blue. */
  spotlightColor?: string;
};

/**
 * Card with a cursor-following light.
 *
 * Adapted from the 21st.dev "Spotlight Card" (preetsuthar17). Changes for Converter AI:
 * position is written to CSS variables instead of React state (no re-render per
 * pointer move), it uses brand tokens and the Card variants, it adds a lit border
 * ring, and it is disabled for touch input where hover has no meaning.
 */
export function SpotlightCard({
  className,
  spotlightColor = "rgb(77 127 255 / 0.14)",
  children,
  style,
  onPointerMove,
  ...props
}: SpotlightCardProps) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    onPointerMove?.(event);
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <Card
      className={cn("group/spotlight", className)}
      style={{ "--spot-color": spotlightColor, ...style } as CSSProperties}
      onPointerMove={handlePointerMove}
      {...props}
    >
      {/* Fill light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 ease-out-expo group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), var(--spot-color), transparent 70%)",
        }}
      />
      {/* Lit border: a masked ring that brightens near the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 ease-out-expo group-hover/spotlight:opacity-100"
        style={{
          padding: 1,
          background:
            "radial-gradient(260px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgb(157 188 255 / 0.55), transparent 70%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
        }}
      />
      {children}
    </Card>
  );
}

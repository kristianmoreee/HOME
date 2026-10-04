import { cn } from "@/lib/utils";

type GlowBackgroundProps = {
  /**
   * hero:    full composition, top-weighted light, grid and grain.
   * section: a single soft pool of light behind content.
   * subtle:  barely-there depth for long pages.
   */
  variant?: "hero" | "section" | "subtle";
  /** Show the masked hairline grid. */
  grid?: boolean;
  /** Slowly drift the light pools. Disabled automatically for reduced motion. */
  animated?: boolean;
  className?: string;
};

/**
 * Decorative ambient light. Pure CSS (server-rendered), positioned absolutely,
 * so place it inside a `relative isolate` parent. Light is built from a few
 * blurred, low-opacity pools rather than a loud gradient, then broken up with
 * grain so it reads as cinematic rather than templated.
 */
export function GlowBackground({
  variant = "section",
  grid = variant === "hero",
  animated = variant === "hero",
  className,
}: GlowBackgroundProps) {
  const drift = animated ? "motion-safe:animate-drift" : "";

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {variant === "hero" ? (
        <>
          {/* Top light: electric blue core */}
          <div
            className={cn(
              "absolute left-1/2 top-[-30%] h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full opacity-[0.22] blur-[120px]",
              "bg-[radial-gradient(closest-side,var(--color-electric-500),transparent)]",
              drift,
            )}
          />
          {/* Violet depth, offset right */}
          <div
            className={cn(
              "absolute right-[-15%] top-[10%] h-[45vmax] w-[45vmax] rounded-full opacity-[0.16] blur-[120px]",
              "bg-[radial-gradient(closest-side,var(--color-violet-500),transparent)]",
              drift,
              animated && "[animation-delay:-8s]",
            )}
          />
          {/* Cyan whisper, offset left */}
          <div
            className={cn(
              "absolute left-[-10%] top-[35%] h-[30vmax] w-[30vmax] rounded-full opacity-[0.08] blur-[100px]",
              "bg-[radial-gradient(closest-side,var(--color-cyan-500),transparent)]",
              drift,
              animated && "[animation-delay:-16s]",
            )}
          />
          {/* Horizon line: a thin lit edge that gives the hero a floor */}
          <div className="absolute inset-x-0 top-[62%] mx-auto h-px max-w-4xl bg-[linear-gradient(90deg,transparent,rgb(157_188_255/0.35),transparent)]" />
        </>
      ) : null}

      {variant === "section" ? (
        <div
          className={cn(
            "absolute left-1/2 top-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14] blur-[120px]",
            "bg-[radial-gradient(closest-side,var(--color-electric-500),var(--color-violet-600)_60%,transparent)]",
            drift,
          )}
        />
      ) : null}

      {variant === "subtle" ? (
        <div className="absolute left-1/2 top-0 h-[40vmax] w-[80vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--color-electric-600),transparent)] opacity-[0.08] blur-[120px]" />
      ) : null}

      {grid ? <div className="absolute inset-0 grid-lines fade-radial opacity-60" /> : null}

      <div className="absolute inset-0 grain opacity-[0.06]" />

      {/* Bottom fade so sections hand off seamlessly */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_bottom,transparent,var(--color-background))]" />
    </div>
  );
}

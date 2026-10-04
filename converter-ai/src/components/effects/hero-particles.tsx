import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Small deterministic PRNG so server and client render identical particles. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const COLORS = ["var(--color-electric-300)", "var(--color-violet-300)", "var(--color-cyan-300)"];

const random = seeded(20261004);
const PARTICLES = Array.from({ length: 34 }, () => ({
  x: random() * 100,
  y: random() * 100,
  size: 1 + random() * 1.6,
  opacity: 0.18 + random() * 0.4,
  color: COLORS[Math.floor(random() * COLORS.length)] ?? "var(--color-electric-300)",
  duration: 5 + random() * 6,
  delay: -random() * 10,
}));

/**
 * A sparse field of soft points of light that slowly twinkle. Pure CSS, server
 * rendered, decorative only; static under reduced motion.
 */
export function HeroParticles({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="particle absolute rounded-full"
          style={
            {
              left: `${particle.x.toFixed(2)}%`,
              top: `${particle.y.toFixed(2)}%`,
              width: `${particle.size.toFixed(2)}px`,
              height: `${particle.size.toFixed(2)}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 6px ${particle.color}`,
              "--particle-opacity": particle.opacity.toFixed(2),
              animationDuration: `${particle.duration.toFixed(2)}s`,
              animationDelay: `${particle.delay.toFixed(2)}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

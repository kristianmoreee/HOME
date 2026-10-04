"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { LogoMark } from "@/components/layout/logo";
import { VisualFrame } from "@/components/services/visuals/visual-frame";

// Start positions (percent offsets from centre) for each discipline.
const parts = [
  { label: "Web", x: -34, y: -30 },
  { label: "AI", x: 32, y: -34 },
  { label: "Marketing", x: -38, y: 18 },
  { label: "Automatizácie", x: 30, y: 26 },
  { label: "Dáta", x: 0, y: 40 },
];

function Part({ progress, label, x, y }: { progress: MotionValue<number>; label: string; x: number; y: number }) {
  // Chips travel to an orbit around the centre rather than collapsing into it.
  // A full-size layer is translated (percent of the container), so only
  // transforms animate.
  const tx = useTransform(progress, [0.15, 0.65], [`${x}%`, `${x * 0.55}%`]);
  const ty = useTransform(progress, [0.15, 0.65], [`${y}%`, `${y * 0.55}%`]);
  const opacity = useTransform(progress, [0, 0.15], [0.5, 1]);
  return (
    <motion.span className="pointer-events-none absolute inset-0" style={{ x: tx, y: ty, opacity }}>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-caption whitespace-nowrap text-fg">
        {label}
      </span>
    </motion.span>
  );
}

/** Service 06: separate disciplines merging into one connected system. */
export function StrategyMerge({ progress }: { progress: MotionValue<number> }) {
  const ring = useTransform(progress, [0.5, 0.8], [0, 1]);
  const ringScale = useTransform(progress, [0.5, 0.8], [0.6, 1]);
  const label = useTransform(progress, [0.75, 0.9], [0, 1]);

  return (
    <VisualFrame label="Stratégia · Jeden systém">
      <div className="relative h-full min-h-72">
        <motion.span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-accent shadow-glow-electric"
          style={{ opacity: ring, scale: ringScale }}
        />
        <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-line-strong bg-surface-raised">
          <LogoMark className="size-8" />
        </span>
        {parts.map((part) => (
          <Part key={part.label} progress={progress} {...part} />
        ))}
        <motion.p
          className="absolute inset-x-0 bottom-0 text-center font-mono text-eyebrow uppercase text-electric-300"
          style={{ opacity: label }}
        >
          Jeden prepojený systém
        </motion.p>
      </div>
    </VisualFrame>
  );
}

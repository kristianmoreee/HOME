"use client";

import type { ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";

type ProgressRevealProps = {
  /** 0..1 progress driving the reveal (usually scroll progress). */
  progress: MotionValue<number>;
  /** Progress value where the element starts to appear. */
  start: number;
  /** Progress value where it is fully visible. Defaults to start + 0.12. */
  end?: number;
  /** Vertical travel in px before arrival. */
  y?: number;
  className?: string;
  children: ReactNode;
};

/** Fades and lifts its children in as `progress` moves from start to end. */
export function ProgressReveal({
  progress,
  start,
  end = start + 0.12,
  y = 12,
  className,
  children,
}: ProgressRevealProps) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const translateY = useTransform(progress, [start, end], [y, 0]);
  return (
    <motion.div className={className} style={{ opacity, y: translateY }}>
      {children}
    </motion.div>
  );
}

/** Opacity-only variant for glows and highlights. */
export function ProgressGlow({
  progress,
  start,
  end = start + 0.12,
  className,
}: Omit<ProgressRevealProps, "children" | "y">) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  return <motion.div aria-hidden="true" className={className} style={{ opacity }} />;
}

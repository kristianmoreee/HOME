"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Thin reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, spring.smooth);

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-px origin-left",
        "bg-[linear-gradient(90deg,var(--color-electric-400),var(--color-violet-400)_70%,var(--color-cyan-400))]",
        "shadow-[0_0_12px_var(--color-electric-400)]",
        className,
      )}
      style={{ scaleX }}
    />
  );
}

"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { duration, ease, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  className?: string;
  /** Seconds before the first word. */
  delay?: number;
};

/**
 * Masked word-by-word reveal for large statements. Each word rises out of an
 * overflow mask. Screen readers get the plain sentence.
 */
export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const words = text.split(" ");
  return (
    <span className={cn("inline", className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: 0.06, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "105%" },
                  visible: { y: "0%", transition: { duration: duration.slow, ease: ease.out } },
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </span>
  );
}

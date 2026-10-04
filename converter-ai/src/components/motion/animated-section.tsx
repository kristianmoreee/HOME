"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { revealVariants, stagger, viewport, withDelay, type RevealVariant } from "@/lib/motion";

type Tag = "div" | "section" | "article" | "header" | "footer" | "ul" | "li";

// All motion HTML components share the same prop surface for our usage; typing
// the map with one signature lets JSX render whichever tag was chosen.
const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  ul: motion.ul,
  li: motion.li,
} as unknown as Record<Tag, typeof motion.div>;

type AnimatedSectionProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  as?: Tag;
  /** Reveal style for this element. */
  variant?: RevealVariant;
  /** Seconds before the reveal starts. */
  delay?: number;
  /**
   * When set, this element becomes a stagger parent: its own reveal is skipped
   * and direct AnimatedItem children reveal one after another.
   */
  staggerChildren?: number;
  /** Replay every time it enters the viewport instead of once. */
  repeat?: boolean;
};

/**
 * Scroll-triggered reveal. Wrap any block (server components included) to
 * fade it in when it enters the viewport.
 */
export function AnimatedSection({
  as = "div",
  variant = "fadeUp",
  delay = 0,
  staggerChildren,
  repeat = false,
  ...props
}: AnimatedSectionProps) {
  const Component = tags[as];
  const isParent = staggerChildren !== undefined;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewport, once: !repeat }}
      variants={
        isParent ? stagger(staggerChildren, delay) : withDelay(revealVariants[variant], delay)
      }
      {...props}
    />
  );
}

type AnimatedItemProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  as?: Tag;
  variant?: RevealVariant;
};

/** Child of a staggering AnimatedSection. Inherits the parent's trigger. */
export function AnimatedItem({ as = "div", variant = "fadeUp", ...props }: AnimatedItemProps) {
  const Component = tags[as];
  return <Component variants={revealVariants[variant]} {...props} />;
}

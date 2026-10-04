import type { Transition, Variants } from "motion/react";

/**
 * Converter animation principles
 *
 * 1. Purposeful: motion reveals hierarchy or confirms an action. Never decoration for its own sake.
 * 2. Calm: one confident ease (expo out). Elements arrive quickly and settle slowly.
 * 3. Short travel: 16 to 24px of movement. Large typography needs little displacement to feel alive.
 * 4. Opacity and transform only: never animate width, height, top or left.
 * 5. Stagger, don't swarm: 60 to 90ms between siblings, max ~6 animated children per group.
 * 6. Once: scroll reveals play once; repeated motion is reserved for ambient layers (marquee, glow).
 * 7. Respect the user: `MotionConfig reducedMotion="user"` keeps fades but removes travel.
 */

type Bezier = [number, number, number, number];

export const ease = {
  /** Default for entrances and most UI. */
  out: [0.16, 1, 0.3, 1] as Bezier,
  /** Softer variant for hover and small UI feedback. */
  outQuart: [0.25, 1, 0.5, 1] as Bezier,
  /** Symmetric, for elements that move and return (menus, toggles). */
  inOut: [0.76, 0, 0.24, 1] as Bezier,
} as const;

/** Durations in seconds. Pick by distance and importance, not by habit. */
export const duration = {
  /** Hover, press, color changes. */
  instant: 0.15,
  /** Small UI: menus, tooltips, toggles. */
  fast: 0.25,
  /** Cards and blocks entering the viewport. */
  base: 0.6,
  /** Hero headlines and large surfaces. */
  slow: 0.9,
  /** Ambient, cinematic reveals. */
  cinematic: 1.4,
} as const;

export const spring = {
  /** Snappy, no overshoot. Buttons, toggles. */
  snappy: { type: "spring", stiffness: 420, damping: 36, mass: 0.8 } satisfies Transition,
  /** Smooth follow for progress bars and cursors. */
  smooth: { type: "spring", stiffness: 120, damping: 30, restDelta: 0.001 } satisfies Transition,
} as const;

/** Shared viewport settings for scroll reveals. */
export const viewport = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: ease.out } },
};

/** Cinematic: rises out of a soft blur. Use for headlines, sparingly. */
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: ease.out },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: duration.base, ease: ease.out } },
};

export const revealVariants = { fadeUp, fadeIn, blurUp, scaleIn } as const;
export type RevealVariant = keyof typeof revealVariants;

/** Parent variant that staggers its children. */
export function stagger(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

/**
 * Returns a copy of `variants` whose "visible" state starts after `delay` seconds.
 * Variant transitions take precedence over the `transition` prop, so delays have
 * to be applied here rather than on the component.
 */
export function withDelay(variants: Variants, delay: number): Variants {
  const visible = variants.visible;
  if (!delay || !visible || typeof visible === "function") return variants;
  return { ...variants, visible: { ...visible, transition: { ...visible.transition, delay } } };
}

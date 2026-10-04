"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/typography";
import { TextReveal } from "@/components/animations/text-reveal";
import { LogoMark } from "@/components/layout/logo";
import { GlowBackground } from "@/components/effects/glow-background";
import { ecosystem } from "@/content/home";
import { duration, ease, viewport } from "@/lib/motion";

// Node positions on a 600 x 420 canvas around the centre (300, 210).
const NODES = [
  { x: 300, y: 48 },
  { x: 72, y: 130 },
  { x: 528, y: 130 },
  { x: 72, y: 300 },
  { x: 528, y: 300 },
  { x: 300, y: 382 },
] as const;
const CENTER = { x: 300, y: 210 };

function curve(from: { x: number; y: number }) {
  const midX = (from.x + CENTER.x) / 2;
  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${CENTER.y}, ${CENTER.x} ${CENTER.y}`;
}

/**
 * "It's not about one tool, it's about how we connect them."
 * Large statements, then a network where every service flows into Converter.
 * Beam pattern inspired by the 21st.dev Animated Beam (Magic UI); planned to
 * be swapped for the adapted original once downloaded (docs/21st-shortlist.md).
 */
export function ConverterEcosystem() {
  const reduced = usePrefersReducedMotion();
  const gradientId = `${useId()}-beam`;

  return (
    <section aria-labelledby="ecosystem-title" className="relative isolate overflow-hidden py-section">
      <GlowBackground variant="section" />
      <Container className="flex flex-col items-center gap-16 text-center md:gap-20">
        <div className="flex max-w-4xl flex-col items-center gap-6">
          <p className="font-display text-h2 font-medium text-fg-subtle">
            <TextReveal text={ecosystem.statement} />
          </p>
          <h2 id="ecosystem-title" className="font-display text-display-lg font-medium text-fg">
            <TextReveal text={ecosystem.answerStart} delay={0.3} />{" "}
            <span className="text-gradient-accent">
              <TextReveal text={ecosystem.answerAccent} delay={0.45} />
            </span>
          </h2>
          <Text size="lg" className="max-w-xl">
            {ecosystem.description}
          </Text>
        </div>

        <div className="relative w-full max-w-3xl">
          <svg viewBox="0 0 600 420" className="h-auto w-full overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="var(--color-electric-400)" stopOpacity="0" />
                <stop offset="0.5" stopColor="var(--color-electric-300)" />
                <stop offset="1" stopColor="var(--color-violet-400)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {NODES.map((node, i) => {
              const d = curve(node);
              return (
                <g key={i}>
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="var(--color-line-strong)"
                    strokeWidth="1"
                    initial={{ pathLength: reduced ? 1 : 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={viewport}
                    transition={{ duration: duration.slow, delay: 0.2 + i * 0.08, ease: ease.out }}
                  />
                  {!reduced ? (
                    <path
                      d={d}
                      fill="none"
                      stroke={`url(#${gradientId})`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="0.18 0.82"
                      className="beam-flow"
                      style={{ animationDelay: `${-i * 0.6}s` }}
                    />
                  ) : null}
                </g>
              );
            })}
          </svg>

          {/* Nodes as HTML for crisp text, positioned on the same grid */}
          {NODES.map((node, i) => (
            <motion.span
              key={ecosystem.nodes[i]}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-strong bg-surface/90 px-3 py-1.5 text-caption whitespace-nowrap text-fg backdrop-blur-sm sm:px-4 sm:py-2 sm:text-body-sm"
              style={{ left: `${(node.x / 600) * 100}%`, top: `${(node.y / 420) * 100}%` }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ duration: duration.base, delay: 0.1 + i * 0.08, ease: ease.out }}
            >
              {ecosystem.nodes[i]}
            </motion.span>
          ))}

          <span
            className="absolute flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-line-accent bg-surface-raised shadow-glow-electric sm:size-20"
            style={{ left: "50%", top: "50%" }}
          >
            <LogoMark className="size-8 sm:size-10" />
            <span className="sr-only">Converter</span>
          </span>
        </div>
      </Container>
    </section>
  );
}

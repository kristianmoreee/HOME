"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  FlaskConical,
  PenTool,
  Rocket,
  Search,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";
import { GlowBackground } from "@/components/effects/glow-background";
import { workProcess } from "@/content/home";

const ICONS: readonly LucideIcon[] = [Search, PenTool, Wrench, FlaskConical, Rocket, TrendingUp];
const COUNT = workProcess.steps.length;

/**
 * "Od problému k riešeniu." Six steps on one line that fills as you scroll:
 * horizontal on desktop, vertical on smaller screens. Each step lights up when
 * the line reaches it. Inspired by the 21st.dev Timeline (aceternity); see
 * docs/21st-shortlist.md for the planned swap.
 */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const complete = useMotionValue(1);
  const progress = reduced ? complete : scrollYProgress;

  return (
    <section
      id="proces"
      aria-labelledby="process-title"
      className="relative isolate overflow-hidden py-section"
    >
      <GlowBackground variant="subtle" />
      <Container>
        <SectionHeader
          index="05"
          eyebrow={workProcess.eyebrow}
          title={<span id="process-title">{workProcess.title}</span>}
        />

        <ol ref={ref} className="relative grid gap-12 pl-16 lg:grid-cols-6 lg:gap-8 lg:pl-0 lg:pt-20">
          {/* Track + fill: vertical below lg, horizontal from lg */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-line lg:top-[1.375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute top-2 bottom-2 left-[1.375rem] w-px origin-top bg-[linear-gradient(to_bottom,var(--color-electric-400),var(--color-violet-400))] lg:hidden"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute top-[1.375rem] right-0 left-0 hidden h-px origin-left bg-[linear-gradient(to_right,var(--color-electric-400),var(--color-violet-400)_70%,var(--color-cyan-400))] shadow-[0_0_10px_var(--color-electric-400)] lg:block"
          />

          {workProcess.steps.map((step, index) => (
            <Step
              key={step.title}
              index={index}
              title={step.title}
              text={step.text}
              icon={ICONS[index] ?? Search}
              progress={progress}
            />
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Step({
  index,
  title,
  text,
  icon: Icon,
  progress,
}: {
  index: number;
  title: string;
  text: string;
  icon: LucideIcon;
  progress: MotionValue<number>;
}) {
  // The step lights up as the fill line reaches its marker.
  const at = index / COUNT;
  const lit = useTransform(progress, [Math.max(0, at - 0.04), at + 0.04], [0, 1]);
  const copyOpacity = useTransform(lit, [0, 1], [0.45, 1]);
  const copyY = useTransform(lit, [0, 1], [8, 0]);

  return (
    <li className="relative flex flex-col gap-3 lg:pr-2">
      <span
        aria-hidden="true"
        className="absolute top-0 -left-16 flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface lg:-top-20 lg:left-0"
      >
        <motion.span
          style={{ opacity: lit }}
          className="absolute inset-0 rounded-full border border-line-accent bg-surface-raised shadow-glow-electric"
        />
        <Icon className="relative size-[1.125rem] text-fg" />
      </span>

      <motion.div style={{ opacity: copyOpacity, y: copyY }} className="flex flex-col gap-3">
        <span className="font-mono text-eyebrow uppercase text-electric-300 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-h3 font-medium text-fg">{title}</h3>
        <p className="text-body-sm text-fg-muted">{text}</p>
      </motion.div>
    </li>
  );
}

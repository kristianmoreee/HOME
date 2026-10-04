"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section";
import { AnimatedSection } from "@/components/motion/animated-section";
import { beforeAfter } from "@/content/home";

function AfterItem({ progress, index, text }: { progress: MotionValue<number>; index: number; text: string }) {
  const at = 0.15 + index * 0.1;
  const opacity = useTransform(progress, [at, at + 0.12], [0.3, 1]);
  const x = useTransform(progress, [at, at + 0.12], [10, 0]);
  return (
    <motion.li className="flex items-center gap-3.5 border-b border-line py-4 last:border-b-0" style={{ opacity, x }}>
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-electric-500/20 text-electric-300">
        <Check className="size-3.5" aria-hidden="true" />
      </span>
      <span className="text-body text-fg">{text}</span>
    </motion.li>
  );
}

function BeforeItem({ progress, index, text }: { progress: MotionValue<number>; index: number; text: string }) {
  const at = 0.15 + index * 0.1;
  const opacity = useTransform(progress, [at, at + 0.12], [1, 0.45]);
  return (
    <motion.li className="flex items-center gap-3.5 border-b border-line py-4 last:border-b-0" style={{ opacity }}>
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-line text-fg-subtle">
        <Minus className="size-3.5" aria-hidden="true" />
      </span>
      <span className="text-body text-fg-muted">{text}</span>
    </motion.li>
  );
}

/**
 * A conceptual transformation, not a promise of results. As the section
 * scrolls through, the "before" side quiets down and the "after" side lights up.
 */
export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const glow = useTransform(scrollYProgress, [0.3, 0.9], [0, 1]);
  const progress = reduced ? undefined : scrollYProgress;

  return (
    <section aria-labelledby="before-after-title" className="relative py-section">
      <Container>
        <AnimatedSection>
          <SectionHeader
            index="03"
            eyebrow={beforeAfter.eyebrow}
            title={<span id="before-after-title">{beforeAfter.title}</span>}
          />
        </AnimatedSection>

        <div ref={ref} className="grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="rounded-panel border border-line bg-surface/60 p-6 md:p-10">
            <p className="mb-4 font-mono text-eyebrow uppercase text-fg-subtle">{beforeAfter.before.label}</p>
            <ul>
              {beforeAfter.before.items.map((text, index) =>
                progress ? (
                  <BeforeItem key={text} progress={progress} index={index} text={text} />
                ) : (
                  <li key={text} className="flex items-center gap-3.5 border-b border-line py-4 text-body text-fg-muted last:border-b-0">
                    <Minus className="size-3.5 text-fg-subtle" aria-hidden="true" />
                    {text}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="relative isolate overflow-hidden rounded-panel border border-line-accent bg-[linear-gradient(160deg,rgb(42_92_240/0.14),rgb(5_8_24/0.7)_50%)] p-6 md:p-10">
            <motion.div
              aria-hidden="true"
              className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(77_127_255/0.35),transparent)] blur-2xl"
              style={reduced ? undefined : { opacity: glow }}
            />
            <p className="mb-4 font-mono text-eyebrow uppercase text-electric-300">{beforeAfter.after.label}</p>
            <ul>
              {beforeAfter.after.items.map((text, index) =>
                progress ? (
                  <AfterItem key={text} progress={progress} index={index} text={text} />
                ) : (
                  <li key={text} className="flex items-center gap-3.5 border-b border-line py-4 text-body text-fg last:border-b-0">
                    <Check className="size-3.5 text-electric-300" aria-hidden="true" />
                    {text}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

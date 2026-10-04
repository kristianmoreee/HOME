"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GlowBackground } from "@/components/effects/glow-background";
import { ConverterHeroVisual } from "@/components/hero/converter-hero-visual";
import { heroVisual } from "@/config/hero-visual";
import { hero } from "@/content/home";
import { blurUp, fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Cinematic hero. On md+ the section is taller than the viewport and its
 * content stays sticky, so scrolling drives the visual's story before the
 * page moves on. On mobile and with reduced motion it is a normal section.
 */
export function ConverterHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const copyY = useTransform(scrollYProgress, [0.7, 1], [0, -32]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className={cn("relative", !reduced && "md:h-[240svh]")}
    >
      <div className="relative isolate overflow-clip md:sticky md:top-0 md:flex md:h-svh md:min-h-[640px] md:items-center">
        <GlowBackground variant="hero" />

        <Container className="relative z-10 pt-32 pb-12 md:py-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.09, 0.15)}
            style={reduced ? undefined : { y: copyY }}
            className="flex max-w-[40rem] flex-col items-start gap-7 md:gap-9"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 font-mono text-eyebrow uppercase text-fg-muted"
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_var(--color-cyan-400)]" />
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              id="hero-title"
              variants={blurUp}
              className="font-display text-display-xl font-medium text-sheen"
            >
              {hero.titleLine1}
              <br />
              {hero.titleLine2}{" "}
              <span className="text-gradient-accent">{hero.titleAccent}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="max-w-md text-body-lg text-fg-muted">
              {hero.description}
            </motion.p>

            <motion.div variants={fadeUp} className="flex w-full flex-col gap-3 xs:w-auto xs:flex-row">
              <ButtonLink href={hero.primary.href} variant="primary" size="lg" trailingIcon={<ArrowRight />}>
                {hero.primary.label}
              </ButtonLink>
              <ButtonLink href={hero.secondary.href} variant="secondary" size="lg">
                {hero.secondary.label}
              </ButtonLink>
            </motion.div>
          </motion.div>

        </Container>

        {/*
          One visual instance (so assets load once). Mobile: a calm static frame
          below the copy, edge to edge. Desktop: absolutely placed on the right,
          vertically centred, never taller than the viewport.
        */}
        <div className="pointer-events-none relative mb-14 md:absolute md:inset-y-0 md:right-[-7%] md:mb-0 md:flex md:w-[66%] md:items-center lg:right-[-5%] lg:w-[62%]">
          <ConverterHeroVisual
            asset={heroVisual}
            progress={scrollYProgress}
            className="mx-auto md:max-w-[min(100%,135svh)]"
          />
        </div>

        <motion.a
          href="#sluzby"
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full px-3 py-2 font-mono text-eyebrow uppercase text-fg-subtle transition-colors hover:text-fg md:inline-flex"
        >
          {hero.scrollHint}
          <ArrowDown className="size-3.5 motion-safe:animate-bounce" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}

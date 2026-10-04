"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroParticles } from "@/components/effects/hero-particles";
import { ConverterHeroVisual } from "@/components/hero/converter-hero-visual";
import { heroVisual } from "@/config/hero-visual";
import { hero } from "@/content/home";
import { blurUp, fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Cinematic hero, full viewport height on every screen.
 *
 * Desktop (lg+): copy on the left, the official C + AI head visual on the
 * right, part of the scene rather than a picture on it. The section is taller
 * than the viewport and its content is sticky, so scrolling plays the visual's
 * story before the page moves on.
 * Phones and tablets: copy first, the visual underneath (never over text),
 * shown as a still. Reduced motion: a normal section with the still.
 */
export function ConverterHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const copyY = useTransform(scrollYProgress, [0.7, 1], [0, -24]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className={cn("relative bg-background", !reduced && "lg:h-[240svh]")}
    >
      <div className="relative isolate flex min-h-svh flex-col overflow-clip lg:sticky lg:top-0 lg:h-svh lg:min-h-[640px] lg:flex-row lg:items-center">
        <HeroBackdrop />

        <Container className="relative z-10 pt-28 sm:pt-36 lg:py-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.09, 0.15)}
            style={reduced ? undefined : { y: copyY }}
            className="flex max-w-[40rem] flex-col items-start gap-6 sm:gap-7 lg:max-w-[44rem] lg:gap-8"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 font-mono text-eyebrow uppercase text-white/70"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_var(--color-cyan-400)]"
              />
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              id="hero-title"
              variants={blurUp}
              className="font-display text-display-xl font-medium text-white lg:text-[clamp(3.5rem,0.5rem+4.6vw,5.25rem)]"
            >
              {hero.titleLine1}
              <br />
              {hero.titleLine2} <span className="text-gradient-accent">{hero.titleAccent}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="max-w-md text-body-lg text-white/75">
              {hero.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex w-full flex-col gap-3 pt-1 xs:w-auto xs:flex-row"
            >
              <ButtonLink
                href={hero.primary.href}
                variant="primary"
                size="lg"
                trailingIcon={<ArrowRight />}
              >
                {hero.primary.label}
              </ButtonLink>
              <ButtonLink href={hero.secondary.href} variant="secondary" size="lg">
                {hero.secondary.label}
              </ButtonLink>
            </motion.div>
          </motion.div>
        </Container>

        {/*
          One visual instance (so assets load once). It sits in the scene, not
          in a card: the frame dissolves into #00020F on every side.
          Phones: full width under the copy. Tablets: a little smaller, same
          composition. Desktop: large on the right, vertically centred, with
          room to the right edge so the face is never cropped.
        */}
        <div className="pointer-events-none relative z-0 mt-auto w-full sm:mx-auto sm:max-w-2xl lg:absolute lg:inset-y-0 lg:right-[3%] lg:mt-0 lg:flex lg:w-[54%] lg:max-w-none lg:items-center">
          <ConverterHeroVisual
            asset={heroVisual}
            progress={scrollYProgress}
            className="mx-auto lg:max-w-[min(100%,130svh)]"
          />
        </div>

        <motion.a
          href="#sluzby"
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 rounded-full px-3 py-2 font-mono text-eyebrow uppercase text-white/55 transition-colors hover:text-white lg:inline-flex"
        >
          {hero.scrollHint}
          <ArrowDown className="size-3.5 motion-safe:animate-bounce" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}

/**
 * The hero's own atmosphere on #00020F. Light is kept to the copy side so the
 * area behind the visual stays as dark as the visual's own background, which
 * is what lets the frame disappear into the page.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Blue glow behind the headline */}
      <div className="absolute -top-[30%] -left-[15%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,var(--color-electric-500),transparent)] opacity-[0.16] blur-[120px] motion-safe:animate-drift" />
      {/* Violet depth, low and toward the centre (desktop only, away from the visual) */}
      <div className="absolute -bottom-[40%] left-[18%] hidden h-[42vmax] w-[42vmax] rounded-full bg-[radial-gradient(closest-side,var(--color-violet-500),transparent)] opacity-[0.12] blur-[120px] lg:block" />
      {/* Cyan whisper on the left edge */}
      <div className="absolute top-[40%] -left-[10%] h-[24vmax] w-[24vmax] rounded-full bg-[radial-gradient(closest-side,var(--color-cyan-500),transparent)] opacity-[0.07] blur-[100px]" />
      {/* Soft grid, fading out before it reaches the visual */}
      <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_55%_60%_at_22%_40%,#000_15%,transparent_75%)]" />
      <HeroParticles className="[mask-image:linear-gradient(to_right,#000_45%,transparent_80%)]" />
      <div className="absolute inset-0 grain opacity-[0.05]" />
      {/* Hand-off into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_bottom,transparent,var(--color-background))]" />
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { GlowBackground } from "@/components/effects/glow-background";
import { blurUp, duration, ease, fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroAction = { label: string; href: string };

type HeroProps = {
  /** Short status line above the headline. */
  eyebrow?: ReactNode;
  /** The statement. Use <Accent> for one emphasised word. */
  title: ReactNode;
  description?: ReactNode;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  align?: "center" | "start";
  /** Visual slot below the copy: product shot, video, 3D, etc. */
  children?: ReactNode;
  className?: string;
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  align = "center",
  children,
  className,
}: HeroProps) {
  const centered = align === "center";

  return (
    <section
      className={cn(
        "relative isolate flex min-h-[92svh] flex-col justify-center overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28",
        className,
      )}
    >
      <GlowBackground variant="hero" />

      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.09, 0.1)}
          className={cn(
            "flex flex-col gap-8 md:gap-10",
            centered ? "items-center text-center" : "items-start",
          )}
        >
          {eyebrow ? (
            <motion.div variants={fadeUp}>
              <Badge variant="glass" dot>
                {eyebrow}
              </Badge>
            </motion.div>
          ) : null}

          <motion.div variants={blurUp}>
            <Heading
              as="h1"
              size="display-2xl"
              tone="sheen"
              className={cn("max-w-[14ch]", centered && "mx-auto")}
            >
              {title}
            </Heading>
          </motion.div>

          {description ? (
            <motion.div variants={fadeUp}>
              <Text size="lg" className={cn("max-w-xl", centered && "mx-auto")}>
                {description}
              </Text>
            </motion.div>
          ) : null}

          {primaryAction || secondaryAction ? (
            <motion.div
              variants={fadeUp}
              className="flex w-full flex-col gap-3 xs:w-auto xs:flex-row"
            >
              {primaryAction ? (
                <ButtonLink
                  href={primaryAction.href}
                  variant="primary"
                  size="lg"
                  trailingIcon={<ArrowRight />}
                >
                  {primaryAction.label}
                </ButtonLink>
              ) : null}
              {secondaryAction ? (
                <ButtonLink href={secondaryAction.href} variant="secondary" size="lg">
                  {secondaryAction.label}
                </ButtonLink>
              ) : null}
            </motion.div>
          ) : null}
        </motion.div>

        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, delay: 0.5, ease: ease.out }}
            className="mt-16 md:mt-24"
          >
            {children}
          </motion.div>
        ) : null}
      </Container>
    </section>
  );
}

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { GlowBackground } from "@/components/effects/glow-background";
import { AnimatedSection } from "@/components/motion/animated-section";
import { cn } from "@/lib/utils";

type CTAAction = { label: string; href: string };

type CTAProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
  id?: string;
  className?: string;
};

export function CTA({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  id,
  className,
}: CTAProps) {
  return (
    <section id={id} className={cn("relative py-section", className)}>
      <Container>
        <AnimatedSection
          variant="scaleIn"
          className="relative isolate overflow-hidden rounded-panel border border-line-strong bg-surface/60 px-6 py-20 text-center shadow-raised md:px-16 md:py-28"
        >
          <GlowBackground variant="section" grid />
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-7">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <Heading as="h2" size="display-xl" tone="sheen">
              {title}
            </Heading>
            {description ? (
              <Text size="lg" className="max-w-xl">
                {description}
              </Text>
            ) : null}
            <div className="mt-3 flex w-full flex-col justify-center gap-3 xs:w-auto xs:flex-row">
              <ButtonLink
                href={primaryAction.href}
                variant="accent"
                size="lg"
                trailingIcon={<ArrowRight />}
              >
                {primaryAction.label}
              </ButtonLink>
              {secondaryAction ? (
                <ButtonLink href={secondaryAction.href} variant="outline" size="lg">
                  {secondaryAction.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}

import { ArrowRight, Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Text } from "@/components/ui/typography";
import { GlowBackground } from "@/components/effects/glow-background";
import { AnimatedItem, AnimatedSection } from "@/components/motion/animated-section";
import { siteConfig } from "@/config/site";
import { finalCta } from "@/content/home";

const mailto = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(finalCta.cta)}`;

const contactItems: readonly { icon: LucideIcon; label: string; value: string; href?: string }[] = [
  { icon: Mail, label: "E-mail", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: Phone, label: "Telefón", value: siteConfig.contact.phone, href: siteConfig.contact.phoneHref },
  { icon: MapPin, label: "Sídlo", value: siteConfig.contact.city },
  { icon: Clock, label: "Pracovné hodiny", value: siteConfig.contact.hours },
];

/**
 * Closing call to action and the #kontakt anchor. Real contact details from
 * converter.sk, one primary action. The CTA ring is a CSS border beam in the
 * spirit of the 21st.dev Border Beam (Magic UI).
 */
export function FinalCta() {
  return (
    <section
      id="kontakt"
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden border-t border-line py-section"
    >
      <GlowBackground variant="hero" />
      <Orbits />

      <Container className="relative flex flex-col items-center gap-16 text-center md:gap-20">
        <AnimatedSection staggerChildren={0.09} className="flex max-w-4xl flex-col items-center gap-7">
          <AnimatedItem>
            <Eyebrow index="06">{finalCta.eyebrow}</Eyebrow>
          </AnimatedItem>
          <AnimatedItem variant="blurUp">
            <h2 id="cta-title" className="font-display text-display-xl font-medium text-sheen">
              {finalCta.titleStart} <span className="text-gradient-accent">{finalCta.titleAccent}</span>
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <Text size="lg" className="max-w-xl">
              {finalCta.description}
            </Text>
          </AnimatedItem>
          <AnimatedItem className="pt-2">
            <span className="border-beam inline-flex rounded-full">
              <ButtonLink href={mailto} variant="primary" size="lg" trailingIcon={<ArrowRight />}>
                {finalCta.cta}
              </ButtonLink>
            </span>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection
          as="ul"
          staggerChildren={0.06}
          className="grid w-full max-w-5xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4"
        >
          {contactItems.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-white/[0.03]">
                  <Icon className="size-4 text-electric-300" aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-mono text-eyebrow uppercase text-fg-subtle">{label}</span>
                  <span className="truncate text-body-sm text-fg">{value}</span>
                </span>
              </>
            );
            return (
              <AnimatedItem as="li" key={label}>
                {href ? (
                  <a
                    href={href}
                    className="glass flex h-full items-center gap-4 rounded-card p-4 transition-colors duration-300 hover:border-line-strong hover:bg-glass-strong"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="glass flex h-full items-center gap-4 rounded-card p-4">{content}</div>
                )}
              </AnimatedItem>
            );
          })}
        </AnimatedSection>
      </Container>
    </section>
  );
}

/** Quiet orbit rings around a faint C: echoes the hero visual without repeating it. */
function Orbits() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 -z-10 aspect-square w-[min(140vw,64rem)] -translate-x-1/2 -translate-y-1/2 opacity-70"
    >
      <svg viewBox="0 0 800 800" fill="none" className="orbit-slow h-full w-full">
        <circle cx="400" cy="400" r="390" stroke="var(--color-line)" />
        <circle cx="400" cy="400" r="300" stroke="var(--color-line)" strokeDasharray="2 10" />
        <circle cx="400" cy="400" r="210" stroke="var(--color-line)" />
        <circle cx="790" cy="400" r="3" fill="var(--color-electric-300)" />
        <circle cx="400" cy="100" r="2.5" fill="var(--color-violet-300)" />
        <circle cx="190" cy="400" r="2" fill="var(--color-cyan-300)" />
      </svg>
      <svg viewBox="0 0 800 800" fill="none" className="absolute inset-0 h-full w-full">
        <path
          d="M 530 270 A 184 184 0 1 0 530 530"
          stroke="url(#cta-c)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="cta-c" x1="216" y1="216" x2="584" y2="584" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-electric-300)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--color-violet-400)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

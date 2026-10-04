import { Container } from "@/components/ui/container";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Accent, Eyebrow } from "@/components/ui/typography";
import { AnimatedItem, AnimatedSection } from "@/components/motion/animated-section";
import { outcomes } from "@/content/home";

/** Value section, also the "O nás" anchor: why technology, and how Converter works. */
export function Outcomes() {
  return (
    <section id="o-nas" aria-labelledby="outcomes-title" className="relative border-t border-line py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <AnimatedSection className="flex flex-col gap-6 lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <Eyebrow index="04">{outcomes.eyebrow}</Eyebrow>
            <h2 id="outcomes-title" className="font-display text-display-lg font-medium text-sheen">
              {outcomes.titleStart} <span className="text-gradient-accent">{outcomes.titleAccent}</span>
            </h2>
            <blockquote className="mt-4 border-l border-line-accent pl-5 text-body-lg text-fg-muted">
              <Accent className="text-h3 text-fg">„{outcomes.quote}“</Accent>
            </blockquote>
            <ul className="mt-2 flex flex-wrap gap-2">
              {outcomes.promises.map((promise) => (
                <li key={promise} className="rounded-full border border-line px-3.5 py-1.5 text-caption text-fg-muted">
                  {promise}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection staggerChildren={0.07} className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {outcomes.items.map((item, index) => (
              <AnimatedItem key={item.title} className="h-full">
                <SpotlightCard variant="glass" padding="md" className="flex h-full flex-col gap-10">
                  <span className="font-mono text-caption text-fg-faint tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-h3 font-medium text-fg">{item.title}</h3>
                    <p className="text-body text-fg-muted">{item.text}</p>
                  </div>
                </SpotlightCard>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}

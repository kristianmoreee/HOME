"use client";

import { useRef, useState, type ComponentType } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { AnimatedSection } from "@/components/motion/animated-section";
import { AutomationFlow } from "@/components/services/visuals/automation-flow";
import { BrowserBuild } from "@/components/services/visuals/browser-build";
import { ChatDemo } from "@/components/services/visuals/chat-demo";
import { EmailSequence } from "@/components/services/visuals/email-sequence";
import { MarketingDashboard } from "@/components/services/visuals/marketing-dashboard";
import { StrategyMerge } from "@/components/services/visuals/strategy-merge";
import { services, servicesIntro, type Service, type ServiceId } from "@/content/home";
import { useMediaQuery } from "@/hooks/use-media-query";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type VisualProps = { progress: MotionValue<number> };

export const serviceVisuals: Record<ServiceId, ComponentType<VisualProps>> = {
  web: BrowserBuild,
  chatbot: ChatDemo,
  automation: AutomationFlow,
  email: EmailSequence,
  marketing: MarketingDashboard,
  strategy: StrategyMerge,
};

const COUNT = services.length;

/**
 * Signature services section.
 *
 * Desktop: the section is COUNT viewports tall and its content is sticky.
 * Scroll position picks the active service and also drives that service's
 * own demonstration from 0 to 1.
 * Mobile and reduced motion: a stacked list, each visual driven by its own
 * position in the viewport (or shown complete).
 */
export function ServiceStory() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();

  return (
    <section id="sluzby" aria-labelledby="services-title" className="relative scroll-mt-0">
      <Container className="pt-section">
        <AnimatedSection className="flex max-w-3xl flex-col gap-5">
          <Eyebrow index="01">{servicesIntro.eyebrow}</Eyebrow>
          <Heading as="h2" id="services-title" size="display-lg" tone="sheen">
            {servicesIntro.title}
          </Heading>
          <Text size="lg" className="max-w-2xl">
            {servicesIntro.description}
          </Text>
        </AnimatedSection>
      </Container>

      {isDesktop && !reduced ? <StickyStory /> : <StackedStory reduced={Boolean(reduced)} />}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: sticky scroll story                                         */
/* ------------------------------------------------------------------ */

function StickyStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(COUNT - 1, Math.floor(value * COUNT));
    setActive((current) => (current === next ? current : next));
  });

  const goTo = (index: number) => {
    const element = ref.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    const travel = element.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (travel * (index + 0.5)) / COUNT, behavior: "smooth" });
  };

  const service = services[active] ?? services[0]!;

  return (
    <div ref={ref} className="relative" style={{ height: `${COUNT * 100}svh` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-clip">
        <Container className="grid grid-cols-12 items-center gap-10">
          {/* Left: index + active service copy */}
          <div className="col-span-5 flex flex-col gap-10">
            <nav aria-label="Služby" className="flex flex-col gap-1">
              {services.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={index === active ? "step" : undefined}
                  className={cn(
                    "group/item flex items-center gap-4 rounded-lg py-1.5 text-left transition-colors duration-300",
                    index === active ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
                  )}
                >
                  <span className="font-mono text-caption tabular-nums">{item.number}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-px bg-current transition-all duration-500 ease-out-expo",
                      index === active ? "w-10 bg-electric-400" : "w-4",
                    )}
                  />
                  <span className="text-body-sm">{item.name}</span>
                </button>
              ))}
            </nav>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: duration.fast * 1.6, ease: ease.out }}
              >
                <ServiceCopy service={service} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: live demonstration */}
          <div className="relative col-span-7 h-[min(72svh,40rem)]">
            <AnimatePresence mode="wait" initial={false}>
              <ServicePanel key={service.id} id={service.id} index={active} progress={scrollYProgress} />
            </AnimatePresence>
          </div>
        </Container>

        {/* Progress rail */}
        <div aria-hidden="true" className="absolute right-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-line xl:block">
          <motion.span
            className="block h-full w-px origin-top bg-[linear-gradient(to_bottom,var(--color-electric-400),var(--color-violet-400))]"
            style={{ scaleY: scrollYProgress }}
          />
        </div>
      </div>
    </div>
  );
}

function ServicePanel({
  id,
  index,
  progress,
}: {
  id: ServiceId;
  index: number;
  progress: MotionValue<number>;
}) {
  // Local progress: 0..1 within this service's slice of the section.
  const local = useTransform(progress, [index / COUNT, (index + 0.85) / COUNT], [0, 1], { clamp: true });
  const Visual = serviceVisuals[id];
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 0.97, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -24 }}
      transition={{ duration: duration.fast * 1.8, ease: ease.out }}
    >
      <Visual progress={local} />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile / reduced motion: stacked list                                */
/* ------------------------------------------------------------------ */

function StackedStory({ reduced }: { reduced: boolean }) {
  return (
    <Container className="flex flex-col gap-20 pt-14 pb-section md:gap-28">
      {services.map((service) => (
        <StackedService key={service.id} service={service} reduced={reduced} />
      ))}
    </Container>
  );
}

function StackedService({ service, reduced }: { service: Service; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.45"] });
  const complete = useMotionValue(1);
  const Visual = serviceVisuals[service.id];

  return (
    <article className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
      <AnimatedSection>
        <ServiceCopy service={service} showNumber />
      </AnimatedSection>
      <div ref={ref} className="h-[26rem] sm:h-[28rem]">
        <Visual progress={reduced ? complete : scrollYProgress} />
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */

function ServiceCopy({ service, showNumber = false }: { service: Service; showNumber?: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      {showNumber ? (
        <p className="font-mono text-eyebrow uppercase text-fg-subtle">
          <span className="text-electric-300">{service.number}</span> · {service.name}
        </p>
      ) : (
        <p className="font-mono text-eyebrow uppercase text-electric-300">{service.name}</p>
      )}
      <h3 className="font-display text-h1 font-medium text-fg">{service.title}</h3>
      <p className="text-body-lg text-fg-muted">{service.description}</p>
      <ul className="flex flex-col gap-2.5">
        {service.points.map((point) => (
          <li key={point} className="flex items-center gap-3 text-body-sm text-fg-muted">
            <Check className="size-4 shrink-0 text-electric-300" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
      <div className="pt-2">
        <ButtonLink href="#kontakt" variant="secondary" size="md" trailingIcon={<ArrowRight />}>
          {service.cta}
        </ButtonLink>
      </div>
    </div>
  );
}

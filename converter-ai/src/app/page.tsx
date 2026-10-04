import { BrainCircuit, Gauge, Layers, MessagesSquare, ShieldCheck, Workflow } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { AnimatedItem, AnimatedSection } from "@/components/motion/animated-section";
import { Marquee } from "@/components/motion/marquee";
import { GlowBackground } from "@/components/effects/glow-background";
import { Hero } from "@/components/sections/hero";
import { ServiceCard } from "@/components/sections/service-card";
import { BentoCard, BentoGrid } from "@/components/sections/bento-grid";
import { CTA } from "@/components/sections/cta";
import { Section, SectionHeader } from "@/components/ui/section";
import { AutoGrid } from "@/components/ui/grid";
import { Accent } from "@/components/ui/typography";
import {
  ButtonSpecimen,
  CardSpecimen,
  ColorSpecimen,
  SpecimenBlock,
  TypeSpecimen,
} from "@/components/design-system/specimens";
import { siteConfig } from "@/config/site";

/*
 * Design system preview. Every block below is a reusable component fed with
 * placeholder copy, so the system can be reviewed in context before the real
 * pages are built.
 */

const services = [
  {
    icon: BrainCircuit,
    title: "AI Solutions",
    description:
      "Custom models, assistants and retrieval systems trained on your data and processes.",
    tags: ["LLM", "RAG", "Agents"],
  },
  {
    icon: Workflow,
    title: "Automation",
    description:
      "End-to-end workflows that remove manual work and connect the tools you already use.",
    tags: ["Integrations", "Ops"],
  },
  {
    icon: Layers,
    title: "Software Development",
    description: "Web platforms and products engineered for performance, security and scale.",
    tags: ["Web", "Cloud"],
  },
] as const;

const capabilities = [
  "Machine Learning",
  "Process Automation",
  "AI Assistants",
  "Data Platforms",
  "Product Engineering",
  "Digital Strategy",
  "Computer Vision",
  "Cloud Infrastructure",
];

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar links={siteConfig.nav} cta={siteConfig.cta} />

      <main id="main">
        <Hero
          eyebrow="AI & digital technology · Slovakia"
          title={
            <>
              Turning possibilities into <Accent>results.</Accent>
            </>
          }
          description="We design and build intelligent systems, automation and software that turn ambitious ideas into measurable business outcomes."
          primaryAction={{ label: "Start a project", href: "#contact" }}
          secondaryAction={{ label: "Explore services", href: "#services" }}
        />

        <section aria-label="Capabilities" className="border-y border-line py-8">
          <Marquee duration={50} gap="4rem">
            {capabilities.map((item) => (
              <span
                key={item}
                className="flex items-center gap-4 whitespace-nowrap text-h4 text-fg-subtle"
              >
                <span aria-hidden="true" className="size-1 rounded-full bg-electric-400" />
                {item}
              </span>
            ))}
          </Marquee>
        </section>

        <Section id="services">
          <AnimatedSection>
            <SectionHeader
              index="01"
              eyebrow="Services"
              title={
                <>
                  Technology with a <Accent>clear</Accent> purpose.
                </>
              }
              description="Three disciplines, one team. Every engagement is measured against the result it creates."
            />
          </AnimatedSection>
          <AnimatedSection staggerChildren={0.08}>
            <AutoGrid columns={3}>
              {services.map((service, i) => (
                <AnimatedItem key={service.title} className="h-full">
                  <ServiceCard
                    {...service}
                    index={String(i + 1).padStart(2, "0")}
                    href="#contact"
                  />
                </AnimatedItem>
              ))}
            </AutoGrid>
          </AnimatedSection>
        </Section>

        <Section id="solutions" divider>
          <GlowBackground variant="subtle" />
          <AnimatedSection>
            <SectionHeader
              index="02"
              eyebrow="Approach"
              title="Built to perform from day one."
              description="A bento layout for highlighting capabilities, proof points and product moments."
            />
          </AnimatedSection>
          <AnimatedSection variant="fadeIn">
            <BentoGrid>
              <BentoCard
                colSpan={4}
                rowSpan={2}
                featured
                eyebrow="Discovery to delivery"
                title="From first idea to production AI in weeks, not quarters."
                description="Rapid prototyping, rigorous evaluation and a delivery process designed around measurable outcomes."
                visual={<GlowBackground variant="section" grid animated={false} />}
              />
              <BentoCard
                colSpan={2}
                icon={Gauge}
                title="Measured impact"
                description="Every system ships with clear KPIs and live reporting."
              />
              <BentoCard
                colSpan={2}
                icon={ShieldCheck}
                title="Secure by design"
                description="GDPR-aware architecture and EU data residency."
              />
              <BentoCard
                colSpan={3}
                icon={MessagesSquare}
                title="Human in the loop"
                description="AI that supports your people instead of replacing judgement."
              />
              <BentoCard
                colSpan={3}
                icon={Layers}
                title="Built to integrate"
                description="Works with your stack, from CRMs to custom data platforms."
              />
            </BentoGrid>
          </AnimatedSection>
        </Section>

        <Section id="design-system" divider>
          <SectionHeader
            index="03"
            eyebrow="Design system"
            title="Foundations"
            description="Reference specimens for tokens and primitives. Remove this section once the real pages are in place."
          />
          <div className="flex flex-col gap-20">
            <SpecimenBlock index="A" title="Color">
              <ColorSpecimen />
            </SpecimenBlock>
            <SpecimenBlock index="B" title="Typography">
              <TypeSpecimen />
            </SpecimenBlock>
            <SpecimenBlock index="C" title="Buttons">
              <ButtonSpecimen />
            </SpecimenBlock>
            <SpecimenBlock index="D" title="Cards">
              <CardSpecimen />
            </SpecimenBlock>
          </div>
        </Section>

        <CTA
          id="contact"
          eyebrow="Let's build"
          title={
            <>
              Have an idea? Let&apos;s make it <Accent>real.</Accent>
            </>
          }
          description="Tell us where you want to go. We will show you the fastest path to get there."
          primaryAction={{ label: "Start a project", href: `mailto:${siteConfig.email}` }}
          secondaryAction={{ label: "Book a call", href: `mailto:${siteConfig.email}` }}
        />
      </main>

      <Footer
        tagline={
          <>
            Turning possibilities into <Accent>results.</Accent>
          </>
        }
        columns={siteConfig.footer}
        email={siteConfig.email}
      />
    </>
  );
}

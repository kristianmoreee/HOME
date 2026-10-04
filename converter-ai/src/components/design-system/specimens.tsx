import type { ReactNode } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid, GridItem } from "@/components/ui/grid";
import { Accent, Eyebrow, Heading, Text } from "@/components/ui/typography";

/**
 * Living reference for the design system. Not part of the production site;
 * remove the section from the page once real content lands.
 */

const swatches = [
  { name: "Ink 950", token: "--color-ink-950", hex: "#00020F", note: "Background" },
  { name: "Surface", token: "--color-surface", hex: "#050818", note: "Cards" },
  { name: "Electric 500", token: "--color-electric-500", hex: "#2A5CF0", note: "Accent / CTA" },
  { name: "Electric 400", token: "--color-electric-400", hex: "#4D7FFF", note: "Glow, focus" },
  { name: "Violet 500", token: "--color-violet-500", hex: "#7552F5", note: "Depth" },
  { name: "Cyan 400", token: "--color-cyan-400", hex: "#45DCF5", note: "Highlight" },
] as const;

const typeScale = [
  { token: "display-xl", sample: "Possibilities" },
  { token: "display-lg", sample: "Into results" },
  { token: "h1", sample: "Intelligent systems" },
  { token: "h2", sample: "Built for real outcomes" },
  { token: "h3", sample: "Automation that scales" },
] as const;

const typeClass = {
  "display-xl": "text-display-xl",
  "display-lg": "text-display-lg",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
} as const;

export function ColorSpecimen() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {swatches.map((swatch) => (
        <div key={swatch.token} className="flex flex-col gap-3">
          <div
            className="aspect-[4/5] rounded-xl border border-line"
            style={{ backgroundColor: `var(${swatch.token})` }}
          />
          <div>
            <p className="text-body-sm font-medium text-fg">{swatch.name}</p>
            <p className="font-mono text-caption text-fg-subtle">
              {swatch.hex} · {swatch.note}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TypeSpecimen() {
  return (
    <div className="flex flex-col divide-y divide-line border-y border-line">
      {typeScale.map((step) => (
        <div
          key={step.token}
          className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-10"
        >
          <span className="w-28 shrink-0 font-mono text-caption text-fg-subtle">{step.token}</span>
          <span className={`${typeClass[step.token]} font-medium text-fg`}>{step.sample}</span>
        </div>
      ))}
      <div className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-10">
        <span className="w-28 shrink-0 font-mono text-caption text-fg-subtle">accent</span>
        <span className="text-h1 font-medium text-fg">
          Turning possibilities into <Accent>results.</Accent>
        </span>
      </div>
      <div className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-10">
        <span className="w-28 shrink-0 font-mono text-caption text-fg-subtle">body-lg / body</span>
        <div className="flex max-w-2xl flex-col gap-3">
          <Text size="lg">
            We design and build AI systems, automation and software that move real business metrics.
          </Text>
          <Text>
            Body copy sits at 16px with a 1.65 line height and a 65 to 75 character measure for
            comfortable reading on every screen.
          </Text>
        </div>
      </div>
    </div>
  );
}

export function ButtonSpecimen() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" trailingIcon={<ArrowRight />}>
          Primary
        </Button>
        <Button variant="accent" trailingIcon={<ArrowRight />}>
          Accent
        </Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="secondary" size="icon" aria-label="Add">
          <Plus />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}

export function CardSpecimen() {
  const variants = ["surface", "glass", "elevated", "outline", "featured"] as const;
  return (
    <Grid gap="md">
      {variants.map((variant, i) => (
        <GridItem key={variant} span={i < 2 ? 6 : 4}>
          <Card variant={variant} interactive className="h-full">
            <CardHeader>
              <Eyebrow>{variant}</Eyebrow>
              <CardTitle>Card / {variant}</CardTitle>
              <CardDescription>
                Semantic surfaces with hairline borders. Glass is reserved for content over light.
              </CardDescription>
            </CardHeader>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}

export function SpecimenBlock({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 border-t border-line pt-10">
      <div className="flex items-baseline gap-4">
        <Eyebrow index={index}>Spec</Eyebrow>
        <Heading as="h3" size="h3">
          {title}
        </Heading>
      </div>
      {children}
    </div>
  );
}

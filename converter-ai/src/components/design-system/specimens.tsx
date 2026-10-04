import type { ReactNode } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid, GridItem } from "@/components/ui/grid";
import { Accent, Eyebrow, Heading, Text } from "@/components/ui/typography";

/**
 * Living reference for the design system, shown on /design-system (noindex).
 * Not part of the public site.
 */

const swatches = [
  { name: "Ink 950", token: "--color-ink-950", hex: "#00020F", note: "Pozadie" },
  { name: "Surface", token: "--color-surface", hex: "#050818", note: "Karty" },
  { name: "Electric 500", token: "--color-electric-500", hex: "#2A5CF0", note: "Akcent / CTA" },
  { name: "Electric 400", token: "--color-electric-400", hex: "#4D7FFF", note: "Žiara, focus" },
  { name: "Violet 500", token: "--color-violet-500", hex: "#7552F5", note: "Hĺbka" },
  { name: "Cyan 400", token: "--color-cyan-400", hex: "#45DCF5", note: "Zvýraznenie" },
] as const;

const typeScale = [
  { token: "display-xl", sample: "Možnosti" },
  { token: "display-lg", sample: "Na výsledky" },
  { token: "h1", sample: "Prepojené systémy" },
  { token: "h2", sample: "Postavené na výsledky" },
  { token: "h3", sample: "Automatizácie, ktoré rastú" },
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
          Meníme možnosti na <Accent>výsledky.</Accent>
        </span>
      </div>
      <div className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-10">
        <span className="w-28 shrink-0 font-mono text-caption text-fg-subtle">body-lg / body</span>
        <div className="flex max-w-2xl flex-col gap-3">
          <Text size="lg">
            Prepájame weby, automatizácie, AI a marketing do riešení, ktoré pomáhajú firmám rásť.
          </Text>
          <Text>
            Bežný text má 16 px, riadkovanie 1,65 a šírku 65 až 75 znakov, aby sa dobre čítal na
            každej obrazovke.
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
        <Button variant="secondary" size="icon" aria-label="Pridať">
          <Plus />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Malé</Button>
        <Button size="md">Stredné</Button>
        <Button size="lg">Veľké</Button>
        <Button disabled>Neaktívne</Button>
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
              <CardTitle>Karta / {variant}</CardTitle>
              <CardDescription>
                Sémantické plochy s jemným okrajom. Sklo len pre obsah nad svetlom.
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
        <Eyebrow index={index}>Ukážka</Eyebrow>
        <Heading as="h3" size="h3">
          {title}
        </Heading>
      </div>
      {children}
    </div>
  );
}

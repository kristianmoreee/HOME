import type { Metadata } from "next";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import {
  ButtonSpecimen,
  CardSpecimen,
  ColorSpecimen,
  SpecimenBlock,
  TypeSpecimen,
} from "@/components/design-system/specimens";

export const metadata: Metadata = {
  title: "Dizajnový systém",
  robots: { index: false, follow: false },
};

/** Internal reference for the design system. Not linked from the site. */
export default function DesignSystemPage() {
  return (
    <main id="main" className="py-section">
      <Container className="flex flex-col gap-16">
        <header className="flex flex-col gap-6">
          <Logo />
          <Eyebrow>Interné</Eyebrow>
          <Heading as="h1" size="display-lg" tone="sheen">
            Dizajnový systém Converter
          </Heading>
          <Text size="lg" className="max-w-2xl">
            Farby, typografia, tlačidlá a karty, z ktorých je postavený web. Tokeny sú v
            src/styles/tokens.css.
          </Text>
        </header>
        <SpecimenBlock index="A" title="Farby">
          <ColorSpecimen />
        </SpecimenBlock>
        <SpecimenBlock index="B" title="Typografia">
          <TypeSpecimen />
        </SpecimenBlock>
        <SpecimenBlock index="C" title="Tlačidlá">
          <ButtonSpecimen />
        </SpecimenBlock>
        <SpecimenBlock index="D" title="Karty">
          <CardSpecimen />
        </SpecimenBlock>
      </Container>
    </main>
  );
}

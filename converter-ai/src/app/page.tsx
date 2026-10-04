import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ConverterHero } from "@/components/hero/converter-hero";
import { ToolsStrip } from "@/components/sections/tools-strip";
import { ServiceStory } from "@/components/services/service-story";
import { ConverterEcosystem } from "@/components/sections/converter-ecosystem";
import { BeforeAfter } from "@/components/sections/before-after";
import { Outcomes } from "@/components/sections/outcomes";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { FinalCta } from "@/components/sections/final-cta";
import { siteConfig } from "@/config/site";

/*
 * Homepage story: possibility, technology, automation, growth, result.
 * Section order and copy follow docs/content-map.md.
 */

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  slogan: siteConfig.tagline,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone.replace(/\s/g, ""),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Prešov",
    addressCountry: "SK",
  },
  openingHours: "Mo-Fr 09:00-17:00",
  sameAs: siteConfig.social.map((link) => link.href),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, trusted object defined above.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <ScrollProgress />
      <Navbar links={siteConfig.nav} cta={siteConfig.cta} />
      <main id="main">
        <ConverterHero />
        <ToolsStrip />
        <ServiceStory />
        <ConverterEcosystem />
        <BeforeAfter />
        <Outcomes />
        <ProcessTimeline />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

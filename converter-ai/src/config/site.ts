export const siteConfig = {
  name: "Converter AI",
  tagline: "Turning possibilities into results.",
  description:
    "Converter AI is a Slovak AI and digital technology company building intelligent products, automation and software that deliver measurable results.",
  url: "https://converter.sk",
  locale: "sk_SK",
  email: "info@converter.sk",
  location: "Slovakia",
  nav: [
    { label: "Services", href: "#services" },
    { label: "Solutions", href: "#solutions" },
    { label: "Approach", href: "#approach" },
    { label: "Company", href: "#company" },
  ],
  cta: { label: "Start a project", href: "#contact" },
  footer: [
    {
      title: "Services",
      links: [
        { label: "AI Solutions", href: "#services" },
        { label: "Automation", href: "#services" },
        { label: "Software Development", href: "#services" },
        { label: "Digital Strategy", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#company" },
        { label: "Approach", href: "#approach" },
        { label: "Careers", href: "#company" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com", external: true },
        { label: "Instagram", href: "https://www.instagram.com", external: true },
      ],
    },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];

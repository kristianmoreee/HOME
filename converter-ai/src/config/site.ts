export const siteConfig = {
  name: "Converter",
  /** Brand tagline. The Slovak line is the one shown on the site. */
  tagline: "Turning possibilities into results.",
  taglineSk: "Meníme možnosti na výsledky.",
  description:
    "Converter prepája weby, automatizácie, AI a marketing do riešení, ktoré šetria čas a pomáhajú firmám rásť. Prešov, Slovensko.",
  url: "https://www.converter.sk",
  locale: "sk_SK",
  contact: {
    email: "info@converter.sk",
    phone: "+421 905 289 869",
    phoneHref: "tel:+421905289869",
    city: "Prešov, Slovensko",
    hours: "Po – Pi: 9:00 – 17:00",
  },
  nav: [
    { label: "Služby", href: "#sluzby" },
    { label: "Ako pracujeme", href: "#proces" },
    { label: "O nás", href: "#o-nas" },
    { label: "Kontakt", href: "#kontakt" },
  ],
  cta: { label: "Nezáväzná konzultácia", href: "#kontakt" },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/converter.sk" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/converterai" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591998680665" },
  ],
  legal: [
    { label: "Obchodné podmienky", href: "https://www.converter.sk/obchodne-podmienky" },
    { label: "Ochrana osobných údajov", href: "https://www.converter.sk/gdpr" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];

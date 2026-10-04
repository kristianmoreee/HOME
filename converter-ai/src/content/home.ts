/**
 * Homepage copy. Every claim here is grounded in the current converter.sk
 * content (see docs/content-map.md). Do not add statistics, clients or
 * results that the company has not published.
 */

export const hero = {
  eyebrow: "AI • Automatizácie • Digitálny rast",
  titleLine1: "Meníme možnosti",
  titleLine2: "na",
  titleAccent: "výsledky.",
  description:
    "Prepájame weby, automatizácie, AI a marketing do riešení, ktoré šetria čas a pomáhajú firmám rásť.",
  primary: { label: "Objaviť riešenia", href: "#sluzby" },
  secondary: { label: "Nezáväzná konzultácia", href: "#kontakt" },
  scrollHint: "Posuňte nižšie",
} as const;

/** Tools named on converter.sk service pages. */
export const tools = [
  "Make",
  "n8n",
  "Zapier",
  "Airtable",
  "Notion",
  "Meta Ads",
  "Google Ads",
  "Heureka",
  "Google Analytics 4",
  "Klaviyo",
  "Mailchimp",
  "Brevo",
  "Shopify",
  "WooCommerce",
] as const;

export type ServiceId = "web" | "chatbot" | "automation" | "email" | "marketing" | "strategy";

export type Service = {
  id: ServiceId;
  number: string;
  name: string;
  title: string;
  description: string;
  points: readonly string[];
  cta: string;
};

export const servicesIntro = {
  eyebrow: "Služby",
  title: "Čo dokáže Converter?",
  description:
    "Prepájame technológie, automatizácie a dáta, aby ste rástli rýchlejšie, pracovali efektívnejšie a dosahovali konzistentné výsledky.",
} as const;

export const services: readonly Service[] = [
  {
    id: "web",
    number: "01",
    name: "Webové stránky",
    title: "Weby, ktoré predávajú.",
    description:
      "Moderné, rýchle a responzívne weby na mieru, ktoré budujú dôveru a menia návštevníkov na zákazníkov.",
    points: ["Návrh a dizajn na mieru", "SEO optimalizácia a rýchlosť", "Údržba a podpora po spustení"],
    cta: "Chcem nový web",
  },
  {
    id: "chatbot",
    number: "02",
    name: "AI chatboty",
    title: "Asistent, ktorý odpovedá 24/7.",
    description:
      "Inteligentní asistenti odpovedajú na otázky, zbierajú kontakty a vedú zákazníkov k nákupu, aj keď váš tím práve nepracuje.",
    points: [
      "Okamžité odpovede na časté otázky",
      "Zber a kvalifikácia leadov",
      "Web, Messenger, Instagram aj WhatsApp",
    ],
    cta: "Chcem chatbota",
  },
  {
    id: "automation",
    number: "03",
    name: "AI automatizácie",
    title: "Rutinu nechajte na systém.",
    description:
      "Prepájame vaše nástroje a automatizujeme opakujúce sa úlohy, aby ste ušetrili čas a znížili chybovosť.",
    points: [
      "Prepojenie CRM, formulárov a e-mailov",
      "Make, n8n, Zapier a Airtable",
      "Procesy, ktoré bežia spoľahlivo 24 hodín denne",
    ],
    cta: "Automatizovať procesy",
  },
  {
    id: "email",
    number: "04",
    name: "E-mail automatizácie",
    title: "E-maily, ktoré pracujú, aj keď vy nie.",
    description:
      "Automatizované kampane a predajné sekvencie, ktoré budujú vzťah so zákazníkmi a vracajú ich späť.",
    points: [
      "Uvítacie série a opustený košík",
      "Segmentácia a personalizácia",
      "Klaviyo, Mailchimp, Brevo aj Shopify",
    ],
    cta: "Nastaviť e-maily",
  },
  {
    id: "marketing",
    number: "05",
    name: "Reklama a marketing",
    title: "Kampane, ktoré privádzajú zákazníkov.",
    description:
      "Vytvárame a spravujeme kampane na Meta, Google a Heureke s presným cielením, meraním a pravidelným reportingom.",
    points: ["Meta Ads a Google Ads", "Tracking a Google Analytics 4", "Pravidelné reporty a optimalizácia"],
    cta: "Spustiť kampane",
  },
  {
    id: "strategy",
    number: "06",
    name: "Konzultácie a stratégia",
    title: "Technológia má riešiť skutočný problém.",
    description:
      "Pomôžeme vám nastaviť správny proces, nájsť nové príležitosti a rozhodovať sa na základe dát.",
    points: ["Analýza procesov a potrieb", "Digitálna stratégia a plán rastu", "Optimalizácia nákladov"],
    cta: "Rezervovať konzultáciu",
  },
];

export const ecosystem = {
  statement: "Nie je to o jednom nástroji.",
  answerStart: "Je to o tom,",
  answerAccent: "ako ich spojíme.",
  description: "Web, CRM, formuláre, e-maily, reklama a dáta v jednom prepojenom systéme.",
  nodes: ["Web", "Marketing", "Automatizácie", "CRM", "AI", "E-maily"],
} as const;

export const beforeAfter = {
  eyebrow: "Premena",
  title: "Ako sa zmení vaša každodenná práca.",
  before: {
    label: "Bez Convertera",
    items: [
      "Manuálne procesy",
      "Opakované úlohy",
      "Neprehľadné dopyty",
      "Zastaraný web",
      "Oddelené nástroje",
      "Marketing bez prehľadu",
    ],
  },
  after: {
    label: "S Converterom",
    items: [
      "Automatizované procesy",
      "Moderný web, ktorý predáva",
      "Dopyty prehľadne v CRM",
      "AI asistent pre zákazníkov",
      "Prepojené nástroje",
      "Meranie a pravidelný reporting",
    ],
  },
} as const;

export const outcomes = {
  eyebrow: "O nás",
  titleStart: "Technológia má zmysel,",
  titleAccent: "keď prináša výsledky.",
  quote: "Technológie sú nástroj. Skutočnú hodnotu vytvára spôsob, akým ich využijeme.",
  items: [
    {
      title: "Menej manuálnej práce",
      text: "Rutinné úlohy vybaví automatizácia, váš tím sa venuje tomu dôležitému.",
    },
    {
      title: "Viac obchodných príležitostí",
      text: "Web a chatbot zachytia dopyty, ktoré by inak ušli.",
    },
    {
      title: "Rýchlejšia komunikácia",
      text: "Zákazníci dostanú odpoveď hneď, bez čakania.",
    },
    {
      title: "Lepší zákaznícky zážitok",
      text: "Prepojené nástroje znamenajú menej chýb a jasnú komunikáciu.",
    },
    {
      title: "Merateľný marketing",
      text: "Rozhodujeme sa podľa dát, nie podľa dojmov.",
    },
    {
      title: "Škálovateľné procesy",
      text: "Systém rastie s firmou bez toho, aby pribúdala práca.",
    },
  ],
  promises: [
    "Transparentná komunikácia",
    "Záväzné termíny",
    "Férová cena vopred",
    "Web a prístupy patria vám",
  ],
} as const;

export const workProcess = {
  eyebrow: "Ako pracujeme",
  title: "Od problému k riešeniu.",
  steps: [
    { title: "Analýza", text: "Spoznáme vašu firmu, ciele a procesy, ktoré chcete zlepšiť." },
    { title: "Návrh", text: "Pripravíme riešenie a cenovú ponuku na mieru." },
    { title: "Implementácia", text: "Riešenie vytvoríme a prepojíme s nástrojmi, ktoré používate." },
    { title: "Testovanie", text: "Overíme funkčnosť, výkon aj všetky detaily." },
    { title: "Spustenie", text: "Nasadíme riešenie do praxe a zostávame k dispozícii." },
    { title: "Optimalizácia", text: "Sledujeme výsledky a riešenie priebežne zlepšujeme." },
  ],
} as const;

export const finalCta = {
  eyebrow: "Kontakt",
  titleStart: "Čo by mohla AI",
  titleAccent: "zmeniť vo vašej firme?",
  description: "Poďme sa na to pozrieť spolu. Bezplatná konzultácia, riešenie na mieru a odpoveď do 24 hodín.",
  cta: "Nezáväzná konzultácia",
} as const;

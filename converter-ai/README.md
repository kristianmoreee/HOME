# Converter: web

Oficiálny web **Converter**: domovská stránka, dizajnový systém a znovupoužiteľné komponenty.
Obsah vychádza z converter.sk (pozri `docs/content-map.md`). Interný prehľad dizajnového systému je na
`/design-system` (neindexuje sa).

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide · class-variance-authority

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + build
```

## Štruktúra

```
src/
  app/                 layout (fonty, metadata), domovská stránka, /design-system, robots, sitemap
  styles/tokens.css    všetky dizajnové tokeny (@theme)
  lib/                 cn(), motion presety a princípy animácií
  config/site.ts       značka, kontakt, navigácia, sociálne siete, právne odkazy
  config/hero-visual.ts  ktorý asset má hero (sekvencia, video, obrázok, placeholder)
  content/home.ts      všetky texty domovskej stránky
  hooks/               useMediaQuery
  components/
    ui/                primitívy: Button, Card, SpotlightCard, Badge, Typography, Container, Grid, Section
    motion/            AnimatedSection, Marquee, ScrollProgress, MotionProvider
    animations/        ProgressReveal, TextReveal
    effects/           GlowBackground
    layout/            Navbar, Footer, Logo
    hero/              ConverterHero, ConverterHeroVisual
    services/          ServiceStory + 6 ukážok služieb (visuals/)
    sections/          ToolsStrip, ConverterEcosystem, BeforeAfter, Outcomes, ProcessTimeline, FinalCta,
                       ServiceCard, BentoGrid
    design-system/     špecimeny pre /design-system
```

## Tokeny

Dve vrstvy: **primitíva** (ink, electric, violet, cyan) a **sémantické** (`background`, `surface`, `fg`,
`fg-muted`, `line`, `accent`, `ring`). Komponenty používajú iba sémantické tokeny alebo brand rampy cez
Tailwind triedy (`bg-surface`, `text-fg-muted`, `border-line`). Predvolená Tailwind paleta je vypnutá,
takže iné farby sa do kódu nedostanú.

| Token | Hodnota | Použitie |
| --- | --- | --- |
| `background` / `ink-950` | `#00020F` | pozadie |
| `surface` | `#050818` | karty |
| `electric-500` / `accent` | `#2A5CF0` | hlavná akcia (biely text 5.4:1) |
| `electric-400` | `#4D7FFF` | glow, focus ring |
| `violet-500` | `#7552F5` | hĺbka, sekundárne svetlo |
| `cyan-400` | `#45DCF5` | jemný akcent (status bodka) |
| `fg` / `fg-muted` / `fg-subtle` | biela 100 / 68 / 52 % | text (všetky ≥ 4.5:1) |

## Typografia

Geist (text aj nadpisy), Instrument Serif kurzíva ako editoriálny akcent (`<Accent>`), Geist Mono pre
štítky. Všetky fonty majú `latin-ext` kvôli slovenčine. Škála je plynulá (`clamp`), takže je responzívna
bez breakpointov:

`display-2xl` · `display-xl` · `display-lg` · `h1`–`h4` · `body-lg` · `body` · `body-sm` · `caption` · `eyebrow`

## Layout

- `Container`: `site` 1280 px, `wide` 1440 px, `reading` 672 px, gutter `clamp(20px … 48px)`.
- `Grid` + `GridItem`: 1 / 6 / 12 stĺpcov. `AutoGrid`: 1 / 2 / 3–4 rovnaké stĺpce.
- `Section`: vertikálny rytmus `py-section` (80–160 px), voliteľný oddeľovač, `SectionHeader`.

## Komponenty

| Komponent | Poznámka |
| --- | --- |
| `Button`, `ButtonLink` | `primary` (biela), `accent`, `secondary` (glass), `outline`, `ghost`, `link`; `sm` / `md` / `lg` / `icon` |
| `Card` | `surface`, `glass`, `elevated`, `outline`, `featured`; `interactive` |
| `SpotlightCard` | svetlo sledujúce kurzor, podľa 21st.dev Spotlight Card, bez re-renderov |
| `Navbar` | sklo po scrollnutí, aktívna sekcia, schová sa pri scrolle nadol, mobilné menu (Esc, zámok scrollu) |
| `ConverterHero` | sticky hero, scroll riadi vizuál v 4 fázach (0–20, 20–45, 45–70, 70–100 %) |
| `ConverterHeroVisual` | slot na asset C + AI hlava: sekvencia snímok, WebM, obrázok alebo placeholder |
| `ServiceStory` | sticky príbeh 6 služieb na desktope, na mobile pod sebou, každá so živou ukážkou |
| `ServiceCard` | ikona, index, tagy, celá karta ako odkaz |
| `AnimatedSection` / `AnimatedItem` | reveal pri scrolle, stagger |
| `Marquee` | čisté CSS, pauza na hover/focus, podľa 21st.dev Logo Marquee |
| `BentoGrid` / `BentoCard` | 6-stĺpcová mriežka, `colSpan` 2/3/4/6, `rowSpan` 1/2 |
| `ConverterEcosystem` | vyhlásenie slovo po slove, lúče zo všetkých služieb do Convertera |
| `BeforeAfter` | Bez / S Converterom, scroll postupne rozsvieti zmenu |
| `ProcessTimeline` | 6 krokov, čiara sa plní pri scrolle, horizontálne na desktope, vertikálne na mobile |
| `FinalCta` | záverečná výzva, reálny kontakt, svetelný lúč okolo tlačidla |
| `Footer` | navigácia, služby, kontakt, sociálne siete, právne odkazy, veľký wordmark |
| `ScrollProgress` | tenký pruh navrchu, pružina |
| `GlowBackground` | `hero` / `section` / `subtle`, mriežka, zrno |

## Princípy animácií

Definované v `src/lib/motion.ts`:

1. Animácia má účel: odhaľuje hierarchiu alebo potvrdzuje akciu.
2. Jeden easing (`expo out`): prvky prídu rýchlo a pomaly dosadnú.
3. Krátky pohyb: 16–24 px.
4. Iba `opacity` a `transform`, nikdy rozmery.
5. Stagger 60–90 ms, max. ~6 prvkov v skupine.
6. Scroll reveal raz; opakovaný pohyb len pre ambientné vrstvy.
7. `prefers-reduced-motion` je rešpektované (MotionConfig + CSS).

Časy: `instant` 150 ms (hover), `fast` 250 ms (menu), `base` 600 ms (bloky), `slow` 900 ms (hero),
`cinematic` 1.4 s.

## Hero vizuál

Kým nie je dodaný finálny vizuál C + AI hlava, hero ukazuje abstraktný placeholder (symbol C, dátové
línie, svetelné jadro). Postup na doplnenie assetu je v `public/hero/README.md`; stačí zmeniť
`src/config/hero-visual.ts`.

## 21st.dev

Komponenty z 21st.dev slúžia ako referencia, nie na kopírovanie. `Marquee` a `SpotlightCard` sú prepísané
na brand tokeny a výkonnejšiu implementáciu (pôvod je uvedený v komentári v kóde). Ďalšie komponenty,
ktoré nahradia vlastné verzie po obnovení denného limitu, sú v `docs/21st-shortlist.md`.

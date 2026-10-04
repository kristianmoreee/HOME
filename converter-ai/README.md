# Converter AI — web

Základ oficiálneho webu **Converter AI**: dizajnový systém, architektúra a znovupoužiteľné komponenty.
Toto ešte nie je hotový web. Stránka `/` je náhľad všetkých komponentov s ukážkovým obsahom.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide · class-variance-authority

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + build
```

## Štruktúra

```
src/
  app/                 layout (fonty, metadata), globals.css, náhľadová stránka
  styles/tokens.css    všetky dizajnové tokeny (@theme)
  lib/                 cn(), motion presety a princípy animácií
  config/site.ts       značka, navigácia, footer
  components/
    ui/                primitívy: Button, Card, SpotlightCard, Badge, Typography, Container, Grid, Section
    motion/            AnimatedSection, Marquee, ScrollProgress, MotionProvider
    effects/           GlowBackground
    layout/            Navbar, Footer, Logo
    sections/          Hero, ServiceCard, BentoGrid, CTA
    design-system/     špecimeny pre náhľad (po spustení webu odstrániť)
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
| `Navbar` | sklo po scrollnutí, schová sa pri scrolle nadol, mobilné menu (Esc, zámok scrollu) |
| `Hero` | eyebrow, nadpis, popis, 2 akcie, slot na vizuál, vstupná animácia |
| `ServiceCard` | ikona, index, tagy, celá karta ako odkaz |
| `AnimatedSection` / `AnimatedItem` | reveal pri scrolle, stagger |
| `Marquee` | čisté CSS, pauza na hover/focus, podľa 21st.dev Logo Marquee |
| `BentoGrid` / `BentoCard` | 6-stĺpcová mriežka, `colSpan` 2/3/4/6, `rowSpan` 1/2 |
| `CTA` | veľký panel so svetlom |
| `Footer` | stĺpce odkazov, tagline, veľký wordmark |
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

## 21st.dev

Komponenty z 21st.dev slúžia ako referencia, nie na kopírovanie. `Marquee` a `SpotlightCard` sú prepísané
na brand tokeny a výkonnejšiu implementáciu (pôvod je uvedený v komentári v kóde).

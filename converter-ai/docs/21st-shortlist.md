# 21st.dev: vybrané komponenty

Bezplatný účet: vyhľadávanie bez limitu, kód 2 komponentov denne (obnova o 00:00 UTC).
Každý komponent sa po stiahnutí prepíše na tokeny Converter (farby, typografia, radius, motion), nikdy sa nevkladá s pôvodným štýlom.

## Už použité

| Komponent | Autor | Kde | Úprava |
| --- | --- | --- | --- |
| Logo Marquee (18221) | grootstudio | `components/motion/marquee.tsx` | prepísané na čisté CSS, maska okrajov, pauza na hover/focus |
| Spotlight Card (2220) | preetsuthar17 | `components/ui/spotlight-card.tsx` | CSS premenné namiesto stavu, svietiaci okraj, brand farby |

## Na stiahnutie (poradie podľa prínosu)

Kým limit nedovolí stiahnuť originál, na webe beží vlastná náhrada v rovnakom duchu. Po stiahnutí sa
originál prispôsobí tokenom a nahradí súbor v stĺpci „Vlastná náhrada“; rozhranie (props) zostáva.

| Deň | Komponent (id) | Autor | Vlastná náhrada dnes | Použitie na webe |
| --- | --- | --- | --- | --- |
| 1 | Animated Beam (919) | dillionverma / Magic UI | `sections/converter-ecosystem.tsx` (`.beam-flow`) | ekosystém: lúče zo služieb do Convertera |
| 1 | Sticky Scroll Reveal (952) | aceternity | `services/service-story.tsx` | sticky príbeh služieb (porovnať, vlastná verzia má živé ukážky) |
| 2 | Timeline (857) | aceternity | `sections/process-timeline.tsx` | proces „Od problému k riešeniu“, čiara sledujúca scroll |
| 2 | Scroll word reveal (24525) | motion.dev | `animations/text-reveal.tsx` | veľké vyhlásenia v sekcii ekosystém |
| 3 | Border Beam (1268) | dillionverma / Magic UI | `.border-beam` v `globals.css` | záverečná CTA, hlavné tlačidlo |
| 3 | Text Reveal (Mask) (19257) | soralabs | `animations/text-reveal.tsx` | nadpisy sekcií |

Zvážené a zamietnuté: Container Scroll Animation (3D rotácia nesedí k pokojnému štýlu), Scroll Morph Hero (príliš hravé), mega-menu navbary (web má 4 položky).

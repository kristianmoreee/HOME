# Hero visual (C + AI hlava)

Sem patrí finálny vizuál značky. Po nahratí stačí zmeniť `src/config/hero-visual.ts`.

| Typ | Súbory | Odporúčanie |
| --- | --- | --- |
| `sequence` | `frames/frame-0001.webp` … | 90–150 snímok, 1600 px šírka, WebP kvalita ~70, priehľadné alebo tmavé pozadie `#00020F` |
| `video` | `hero.webm` + `poster.webp` | VP9, keyframe každú snímku (`-g 1`) kvôli plynulému scrubovaniu, bez zvuku |
| `image` | `hero.webp` | 1600 px, kompozícia vpravo, vľavo voľný priestor pre text |

Vždy pridaj aj `poster.webp` (prvá alebo kľúčová snímka): použije sa na mobile a pri obmedzenom pohybe.

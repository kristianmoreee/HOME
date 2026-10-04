# Hero vizuál (C + AI hlava)

Oficiálny vizuál značky Converter. Snímky sú vytiahnuté 1:1 z dodanej animácie (1920 × 1080, 121 snímok,
24 fps), orezané na kompozíciu C + hlava (výrez 1536 × 1024 od bodu 88, 56) a zmenšené na 1440 × 960.
Hlava ani C sa neretušujú, nemenia sa farby ani proporcie. Web hýbe iba polohou, mierkou, priehľadnosťou
a svetlom okolo assetu.

| Súbor | Obsah |
| --- | --- |
| `frames/frame-0001.webp` … `frame-0121.webp` | celá animácia, scroll ju prehráva v hero (WebP, kvalita 80) |
| `poster.webp` | posledná snímka, použije sa na mobile a pri obmedzenom pohybe |

Nastavenie je v `src/config/hero-visual.ts`.

## Nová verzia vizuálu

Pri novej animácii stačí vymeniť snímky a upraviť `frameCount`. Postup (ffmpeg):

```bash
ffmpeg -i animacia.mp4 -an -vf "crop=1536:1024:88:56,scale=1440:960:flags=lanczos" \
  -c:v libwebp -quality 80 -compression_level 6 frames/frame-%04d.webp
```

Iné formáty, ktoré komponent `ConverterHeroVisual` podporuje:

| Typ | Súbory | Odporúčanie |
| --- | --- | --- |
| `sequence` | `frames/frame-0001.webp` … | 90–150 snímok, WebP, tmavé pozadie blízke `#00020F` |
| `video` | `hero.webm` + `poster.webp` | VP9, keyframe každú snímku (`-g 1`) kvôli plynulému scrubovaniu, bez zvuku |
| `image` | `hero.webp` | jedna snímka s paralaxou a svetelnými vrstvami |

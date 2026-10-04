/**
 * Hero visual asset slot: the stylised "C" connected to the AI head.
 *
 * To plug in the final brand asset, change `heroVisual` below. Files live in
 * /public/hero (see public/hero/README.md). Preferred order:
 *   1. "sequence": WebP frames scrubbed by scroll (best quality and control)
 *   2. "video":    a WebM scrubbed by scroll (smaller, encode with dense keyframes)
 *   3. "image":    one optimised still with parallax and lighting layers
 * Until an asset exists, "placeholder" renders a neutral, brand-coloured C.
 */
/** Focal point of the asset in 0..1 (x from the left, y from the top). */
type Focus = { x: number; y: number };

export type HeroVisualAsset =
  | {
      type: "sequence";
      /** Path with an {index} token, e.g. "/hero/frames/frame-{index}.webp". */
      pattern: string;
      frameCount: number;
      /** Zero-padding of the index, e.g. 4 for frame-0001. */
      pad: number;
      width: number;
      height: number;
      /** Static image used on mobile and for reduced motion. */
      poster: string;
      alt: string;
      /** Light layer that brightens over this point during the pulse stage (e.g. the core). */
      focus?: Focus;
      /** Wider light layer that brightens the subject (e.g. the head) in the final stage. */
      bloom?: Focus;
    }
  | {
      type: "video";
      src: string;
      poster: string;
      width: number;
      height: number;
      alt: string;
      focus?: Focus;
      bloom?: Focus;
    }
  | {
      type: "image";
      src: string;
      width: number;
      height: number;
      alt: string;
      focus?: Focus;
      bloom?: Focus;
    }
  | { type: "placeholder" };

/**
 * Official Converter hero visual: the C connected to the AI head. The 121
 * frames are taken 1:1 from the brand animation (cropped to the composition,
 * no retouching). The poster is its final frame.
 */
export const heroVisual: HeroVisualAsset = {
  type: "sequence",
  pattern: "/hero/frames/frame-{index}.webp",
  frameCount: 121,
  pad: 4,
  width: 1440,
  height: 960,
  poster: "/hero/poster.webp",
  alt: "Symbol C značky Converter prepojený dátovými líniami s hlavou umelej inteligencie",
  focus: { x: 0.672, y: 0.415 },
  bloom: { x: 0.84, y: 0.4 },
};

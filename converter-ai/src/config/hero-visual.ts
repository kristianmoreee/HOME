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
    }
  | { type: "video"; src: string; poster: string; width: number; height: number; alt: string }
  | { type: "image"; src: string; width: number; height: number; alt: string }
  | { type: "placeholder" };

export const heroVisual: HeroVisualAsset = { type: "placeholder" };

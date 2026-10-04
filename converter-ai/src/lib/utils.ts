import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know about the custom type scale, otherwise it
 * treats `text-h2` and `text-fg` as the same group and drops one of them.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-2xl",
            "display-xl",
            "display-lg",
            "h1",
            "h2",
            "h3",
            "h4",
            "body-lg",
            "body",
            "body-sm",
            "caption",
            "eyebrow",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

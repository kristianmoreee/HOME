"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Global motion defaults. `reducedMotion="user"` honours the OS setting. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { HeroVisualAsset } from "@/config/hero-visual";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type ConverterHeroVisualProps = {
  asset: HeroVisualAsset;
  /** Hero scroll progress, 0 at the top of the hero and 1 when it releases. */
  progress: MotionValue<number>;
  className?: string;
};

/**
 * The signature hero visual: the Converter "C" connected to the AI head.
 *
 * Scroll story (progress):
 *   0.00–0.20  calm, subdued composition
 *   0.20–0.45  data lines illuminate from the C toward the head
 *   0.45–0.70  a light pulse reaches the head, glow rises
 *   0.70–1.00  the camera eases in on the head, the composition settles
 *
 * With a real asset (sequence, video, image) the pixels of the head and the C
 * are never altered: only position, scale, opacity, edge fade and light
 * layers around the asset move.
 *
 * Below lg (phones, tablets) and with reduced motion it renders a static frame.
 */
export function ConverterHeroVisual({ asset, progress, className }: ConverterHeroVisualProps) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const isStatic = reduced || isMobile;
  const isAsset = asset.type !== "placeholder";
  // The box always has the asset's own proportions, so overlays placed in %
  // (the focus glow) land exactly on the same spot of the image.
  const ratio = asset.type === "placeholder" ? 1 : asset.width / asset.height;
  const focus = asset.type === "placeholder" ? undefined : asset.focus;

  // Camera: a slow push in, anchored on the focal point (the head), with a
  // slight drift toward the copy so the head never leaves the viewport.
  const scale = useTransform(progress, [0, 0.45, 1], [1, 1.02, 1.07]);
  const x = useTransform(progress, [0.45, 1], ["0%", "-2%"]);
  const originX = focus?.x ?? 0.5;
  const originY = focus?.y ?? 0.5;
  const glow = useTransform(progress, [0, 0.45, 0.7, 1], [0.25, 0.4, 1, 0.85]);

  return (
    <div className={cn("relative w-full", className)} style={{ aspectRatio: ratio }}>
      {/* Ambient light behind the asset, rises with the pulse */}
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(77_127_255/0.35),rgb(117_82_245/0.18)_55%,transparent)] blur-3xl"
        style={isStatic ? { opacity: 0.6 } : { opacity: glow }}
      />
      <motion.div
        className={cn("relative h-full w-full", isAsset && "fade-asset")}
        style={isStatic ? undefined : { scale, x, originX, originY }}
      >
        {asset.type === "placeholder" ? (
          <PlaceholderVisual progress={progress} isStatic={isStatic} />
        ) : null}
        {asset.type === "image" ? (
          <Image
            src={asset.src}
            alt={asset.alt}
            width={asset.width}
            height={asset.height}
            priority
            sizes="(min-width: 768px) 60vw, 100vw"
            className="h-full w-full object-contain"
          />
        ) : null}
        {asset.type === "video" ? (
          isStatic ? (
            <Poster src={asset.poster} alt={asset.alt} width={asset.width} height={asset.height} />
          ) : (
            <ScrubVideo asset={asset} progress={progress} />
          )
        ) : null}
        {asset.type === "sequence" ? (
          isStatic ? (
            <Poster src={asset.poster} alt={asset.alt} width={asset.width} height={asset.height} />
          ) : (
            <FrameSequence asset={asset} progress={progress} />
          )
        ) : null}
        {focus && !isStatic ? <FocusGlow focus={focus} progress={progress} /> : null}
      </motion.div>
    </div>
  );
}

function Poster({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
      sizes="(min-width: 768px) 60vw, 100vw"
      className="h-full w-full object-contain"
    />
  );
}

/**
 * A soft light layer over the asset's focal point (e.g. the core in the head).
 * It brightens with the pulse stage; it adds light, it never repaints the asset.
 */
function FocusGlow({ focus, progress }: { focus: { x: number; y: number }; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.4, 0.7, 1], [0, 0.55, 0.35]);
  const scale = useTransform(progress, [0.4, 0.7], [0.6, 1]);
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute aspect-square w-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(157_188_255/0.45),rgb(117_82_245/0.2)_50%,transparent)] mix-blend-screen blur-2xl"
      style={{ left: `${focus.x * 100}%`, top: `${focus.y * 100}%`, opacity, scale }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-scrubbed image sequence                                       */
/* ------------------------------------------------------------------ */

type SequenceAsset = Extract<HeroVisualAsset, { type: "sequence" }>;

const scheduleIdle = (callback: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout: 500 });
  } else {
    window.setTimeout(callback, 50);
  }
};

/**
 * Draws the frame matching scroll progress onto a canvas. Only the first frame
 * loads up front; the rest stream in during idle time, coarse frames first, so
 * scrubbing works early and sharpens as frames arrive.
 */
function FrameSequence({ asset, progress }: { asset: SequenceAsset; progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentRef = useRef(0);

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const frames = framesRef.current;
    // Nearest loaded frame at or before the target, then after it.
    let frame: HTMLImageElement | null = null;
    for (let i = index; i >= 0 && !frame; i--) frame = frames[i] ?? null;
    for (let i = index + 1; i < frames.length && !frame; i++) frame = frames[i] ?? null;
    if (!frame) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(frame, 0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const frames: (HTMLImageElement | null)[] = new Array(asset.frameCount).fill(null);
    framesRef.current = frames;
    const src = (i: number) => asset.pattern.replace("{index}", String(i + 1).padStart(asset.pad, "0"));

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const image = new window.Image();
        image.decoding = "async";
        image.onload = () => {
          if (!cancelled) {
            frames[i] = image;
            if (Math.abs(i - currentRef.current) < 4) draw(currentRef.current);
          }
          resolve();
        };
        image.onerror = () => resolve();
        image.src = src(i);
      });

    // Coarse-to-fine order: every 8th frame, then every 4th, 2nd, then the rest.
    const order: number[] = [];
    const seen = new Set<number>([0]);
    for (const stride of [8, 4, 2, 1]) {
      for (let i = 0; i < asset.frameCount; i += stride) {
        if (!seen.has(i)) {
          seen.add(i);
          order.push(i);
        }
      }
    }

    void load(0).then(() => {
      let cursor = 0;
      const step = () => {
        if (cancelled || cursor >= order.length) return;
        const batch = order.slice(cursor, cursor + 6);
        cursor += batch.length;
        void Promise.all(batch.map(load)).then(() => scheduleIdle(step));
      };
      scheduleIdle(step);
    });

    return () => {
      cancelled = true;
    };
  }, [asset, draw]);

  // Hold the first frame briefly and the last frame at the end of the hero.
  const playhead = useTransform(progress, [0.06, 0.88], [0, 1], { clamp: true });

  useMotionValueEvent(playhead, "change", (value) => {
    const index = Math.min(asset.frameCount - 1, Math.max(0, Math.round(value * (asset.frameCount - 1))));
    if (index === currentRef.current) return;
    currentRef.current = index;
    requestAnimationFrame(() => draw(index));
  });

  const firstFrame = asset.pattern.replace("{index}", "1".padStart(asset.pad, "0"));

  return (
    <div className="relative h-full w-full">
      {/* Server-rendered first frame: paints immediately, the canvas takes over on top */}
      <Image
        src={firstFrame}
        alt=""
        aria-hidden="true"
        width={asset.width}
        height={asset.height}
        priority
        sizes="(min-width: 768px) 60vw, 100vw"
        className="absolute inset-0 h-full w-full object-contain"
      />
      <canvas
        ref={canvasRef}
        width={asset.width}
        height={asset.height}
        role="img"
        aria-label={asset.alt}
        className="relative h-full w-full object-contain"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-scrubbed video                                                */
/* ------------------------------------------------------------------ */

type VideoAsset = Extract<HeroVisualAsset, { type: "video" }>;

function ScrubVideo({ asset, progress }: { asset: VideoAsset; progress: MotionValue<number> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingRef = useRef(false);
  const targetRef = useRef(0);

  useMotionValueEvent(progress, "change", (value) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    targetRef.current = value * video.duration;
    if (pendingRef.current) return;
    pendingRef.current = true;
    requestAnimationFrame(() => {
      pendingRef.current = false;
      if (videoRef.current) videoRef.current.currentTime = targetRef.current;
    });
  });

  return (
    <video
      ref={videoRef}
      src={asset.src}
      poster={asset.poster}
      width={asset.width}
      height={asset.height}
      muted
      playsInline
      preload="auto"
      aria-label={asset.alt}
      className="h-full w-full object-contain"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Neutral placeholder until the brand asset is delivered               */
/* ------------------------------------------------------------------ */

const C_PATH = "M 476 172 A 230 230 0 1 0 476 468";
const LINES = [
  "M 476 468 C 520 430, 540 380, 560 330",
  "M 300 550 C 420 560, 520 470, 548 360",
  "M 120 430 C 240 520, 470 470, 540 380",
  "M 160 160 C 300 120, 460 180, 548 290",
  "M 476 172 C 520 210, 540 250, 556 300",
];

/**
 * Brand-coloured C with data lines flowing into an abstract light core where
 * the AI head will sit. Deliberately neutral: it marks the slot without
 * inventing a different character.
 */
function PlaceholderVisual({ progress, isStatic }: { progress: MotionValue<number>; isStatic: boolean }) {
  const id = useId();
  const strokeId = `${id}-stroke`;
  const coreId = `${id}-core`;

  const cOpacity = useTransform(progress, [0, 0.2, 0.7], [0.55, 0.7, 1]);
  const lines = useTransform(progress, [0.2, 0.45], [0, 1]);
  // Dash position equals -offset: travel from the C (0) to the core (1).
  const pulse = useTransform(progress, [0.45, 0.7], [0.12, -1]);
  const pulseOpacity = useTransform(progress, [0.42, 0.48, 0.68, 0.74], [0, 1, 1, 0]);
  const core = useTransform(progress, [0, 0.45, 0.7, 1], [0.35, 0.45, 1, 0.9]);
  const coreScale = useTransform(progress, [0.45, 1], [0.9, 1.15]);

  return (
    <svg
      viewBox="0 0 640 640"
      role="img"
      aria-label="Converter: symbol C prepojený s umelou inteligenciou"
      className="h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient id={strokeId} x1="80" y1="100" x2="560" y2="560" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-electric-300)" />
          <stop offset="0.55" stopColor="var(--color-electric-400)" />
          <stop offset="1" stopColor="var(--color-violet-400)" />
        </linearGradient>
        <radialGradient id={coreId}>
          <stop offset="0" stopColor="var(--color-white)" stopOpacity="0.9" />
          <stop offset="0.25" stopColor="var(--color-electric-300)" stopOpacity="0.6" />
          <stop offset="0.6" stopColor="var(--color-violet-500)" stopOpacity="0.2" />
          <stop offset="1" stopColor="var(--color-violet-500)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* The C: a broad soft body and a crisp inner line */}
      <motion.g style={isStatic ? { opacity: 0.9 } : { opacity: cOpacity }}>
        <path d={C_PATH} fill="none" stroke={`url(#${strokeId})`} strokeWidth="44" strokeLinecap="round" opacity="0.18" />
        <path d={C_PATH} fill="none" stroke={`url(#${strokeId})`} strokeWidth="3" strokeLinecap="round" />
        <circle cx="476" cy="468" r="6" fill="var(--color-cyan-300)" />
      </motion.g>

      {/* Data lines: base track, then the scroll-drawn line, then the pulse */}
      {LINES.map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke="var(--color-line-strong)" strokeWidth="1" />
          <motion.path
            d={d}
            fill="none"
            stroke={`url(#${strokeId})`}
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ pathLength: isStatic ? 1 : lines }}
          />
          {!isStatic ? (
            <motion.path
              d={d}
              fill="none"
              stroke="var(--color-white)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="0.12 2"
              style={{ strokeDashoffset: pulse, opacity: pulseOpacity }}
            />
          ) : null}
        </g>
      ))}

      {/* Light core: where the AI head asset will sit */}
      <motion.g style={isStatic ? { opacity: 0.8 } : { opacity: core, scale: coreScale }}>
        <circle cx="556" cy="320" r="120" fill={`url(#${coreId})`} />
        <circle cx="556" cy="320" r="62" fill="none" stroke="var(--color-electric-300)" strokeOpacity="0.4" />
        <circle cx="556" cy="320" r="92" fill="none" stroke="var(--color-violet-300)" strokeOpacity="0.18" />
      </motion.g>
    </svg>
  );
}

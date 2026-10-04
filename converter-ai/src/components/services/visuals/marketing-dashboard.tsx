"use client";

import { useId } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { VisualFrame } from "@/components/services/visuals/visual-frame";

// Illustrative shapes only. No real or implied performance numbers.
const AREA = "M0 120 C 40 112, 70 96, 110 98 S 180 70, 220 64 S 290 40, 330 30 S 380 18, 400 14";
const AREA_FILL = `${AREA} L 400 140 L 0 140 Z`;
const BARS = [0.35, 0.5, 0.42, 0.62, 0.55, 0.74, 0.68, 0.86];
const KPIS = ["Návštevy", "Leady", "Konverzie", "Kampane"];

function Bar({ progress, index, height }: { progress: MotionValue<number>; index: number; height: number }) {
  const scaleY = useTransform(progress, [0.4 + index * 0.04, 0.55 + index * 0.04], [0, 1]);
  return (
    <motion.span
      className="w-full origin-bottom rounded-t-sm bg-[linear-gradient(to_top,var(--color-electric-500),var(--color-violet-400))]"
      style={{ height: `${height * 100}%`, scaleY }}
    />
  );
}

function Kpi({ progress, index, label }: { progress: MotionValue<number>; index: number; label: string }) {
  const width = useTransform(progress, [0.1 + index * 0.06, 0.3 + index * 0.06], ["8%", `${55 + index * 10}%`]);
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-white/[0.03] p-3">
      <span className="text-caption text-fg-subtle">{label}</span>
      <span className="h-1.5 w-full rounded-full bg-white/[0.06]">
        <motion.span className="block h-full rounded-full bg-electric-400" style={{ width }} />
      </span>
    </div>
  );
}

/** Service 05: a campaign dashboard concept for Google Ads and Meta Ads. */
export function MarketingDashboard({ progress }: { progress: MotionValue<number> }) {
  const draw = useTransform(progress, [0.15, 0.6], [0, 1]);
  const fill = useTransform(progress, [0.45, 0.7], [0, 1]);
  const id = useId();
  const fillId = `${id}-fill`;
  const clipId = `${id}-clip`;
  // The area is revealed left to right together with the line.
  const clipWidth = useTransform(draw, [0, 1], [0, 400]);

  return (
    <VisualFrame
      label="Prehľad kampaní"
      status={
        <span className="flex gap-1.5">
          <span className="rounded-full border border-line-accent bg-electric-500/10 px-2.5 py-0.5 text-caption text-electric-300">
            Google Ads
          </span>
          <span className="rounded-full border border-line px-2.5 py-0.5 text-caption text-fg-subtle">Meta Ads</span>
        </span>
      }
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {KPIS.map((label, index) => (
            <Kpi key={label} progress={progress} index={index} label={label} />
          ))}
        </div>

        <div className="relative flex-1 rounded-xl border border-line bg-white/[0.02] p-3">
          <svg viewBox="0 0 400 140" preserveAspectRatio="none" className="h-full min-h-28 w-full" aria-hidden="true">
            <defs>
              <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--color-electric-400)" stopOpacity="0.35" />
                <stop offset="1" stopColor="var(--color-electric-400)" stopOpacity="0" />
              </linearGradient>
              <clipPath id={clipId}>
                <motion.rect x="0" y="0" height="140" width={clipWidth} />
              </clipPath>
            </defs>
            {[35, 70, 105].map((y) => (
              <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="var(--color-line)" strokeWidth="1" />
            ))}
            <motion.path
              d={AREA_FILL}
              fill={`url(#${fillId})`}
              clipPath={`url(#${clipId})`}
              style={{ opacity: fill }}
            />
            <motion.path
              d={AREA}
              fill="none"
              stroke="var(--color-electric-300)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: draw }}
            />
          </svg>
        </div>

        <div className="flex h-20 items-end gap-2" aria-hidden="true">
          {BARS.map((height, index) => (
            <Bar key={index} progress={progress} index={index} height={height} />
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}

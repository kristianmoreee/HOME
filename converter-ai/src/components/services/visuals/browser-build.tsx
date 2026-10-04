"use client";

import type { MotionValue } from "motion/react";
import { ProgressReveal } from "@/components/animations/progress-reveal";

/** Service 01: a website assembling itself inside a browser frame. */
export function BrowserBuild({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-panel glass-strong">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto rounded-full border border-line bg-white/[0.03] px-4 py-1 font-mono text-caption text-fg-subtle">
          vasafirma.sk
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5 md:p-7">
        {/* Navigation loads */}
        <ProgressReveal progress={progress} start={0.08} className="flex items-center justify-between">
          <span className="h-3 w-20 rounded-full bg-white/70" />
          <span className="hidden gap-3 sm:flex">
            <span className="h-2 w-10 rounded-full bg-white/20" />
            <span className="h-2 w-10 rounded-full bg-white/20" />
            <span className="h-2 w-10 rounded-full bg-white/20" />
          </span>
          <span className="h-6 w-16 rounded-full bg-accent" />
        </ProgressReveal>

        {/* Hero block */}
        <div className="relative overflow-hidden rounded-xl border border-line bg-[linear-gradient(135deg,rgb(42_92_240/0.25),rgb(117_82_245/0.12)_55%,transparent)] p-5">
          <ProgressReveal progress={progress} start={0.22} className="flex flex-col gap-2.5">
            <span className="h-4 w-3/4 rounded-full bg-white/80" />
            <span className="h-4 w-1/2 rounded-full bg-white/80" />
          </ProgressReveal>
          <ProgressReveal progress={progress} start={0.34} className="mt-4 flex flex-col gap-1.5">
            <span className="h-2 w-2/3 rounded-full bg-white/25" />
            <span className="h-2 w-1/2 rounded-full bg-white/25" />
          </ProgressReveal>
          <ProgressReveal progress={progress} start={0.44} className="mt-5 flex gap-2">
            <span className="h-7 w-24 rounded-full bg-white" />
            <span className="h-7 w-20 rounded-full border border-white/30" />
          </ProgressReveal>
        </div>

        {/* Content cards */}
        <div className="grid grid-cols-3 gap-3">
          {[0.56, 0.64, 0.72].map((start) => (
            <ProgressReveal
              key={start}
              progress={progress}
              start={start}
              className="flex flex-col gap-2 rounded-lg border border-line bg-white/[0.03] p-3"
            >
              <span className="size-5 rounded-md bg-electric-400/40" />
              <span className="h-2 w-4/5 rounded-full bg-white/40" />
              <span className="h-1.5 w-3/5 rounded-full bg-white/15" />
            </ProgressReveal>
          ))}
        </div>

        {/* Launch state */}
        <ProgressReveal
          progress={progress}
          start={0.84}
          className="mt-auto flex items-center justify-between rounded-lg border border-line-accent bg-electric-500/10 px-4 py-2.5"
        >
          <span className="font-mono text-caption text-electric-300">Web je pripravený</span>
          <span className="text-caption text-fg-muted">Rýchly · Responzívny · SEO</span>
        </ProgressReveal>
      </div>
    </div>
  );
}

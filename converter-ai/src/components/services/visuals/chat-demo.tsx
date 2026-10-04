"use client";

import type { MotionValue } from "motion/react";
import { ProgressReveal } from "@/components/animations/progress-reveal";
import { LiveDot, VisualFrame } from "@/components/services/visuals/visual-frame";
import { cn } from "@/lib/utils";

function Bubble({ from, children }: { from: "bot" | "user"; children: string }) {
  return (
    <p
      className={cn(
        "max-w-[80%] rounded-2xl px-4 py-2.5 text-body-sm",
        from === "bot"
          ? "rounded-bl-md border border-line bg-white/[0.04] text-fg"
          : "ml-auto rounded-br-md bg-accent text-accent-fg",
      )}
    >
      {children}
    </p>
  );
}

/** Service 02: a conversation that unfolds with scroll. */
export function ChatDemo({ progress }: { progress: MotionValue<number> }) {
  return (
    <VisualFrame label="Converter asistent" status={<LiveDot label="Online 24/7" />}>
      <div className="flex h-full flex-col gap-3">
        <div className="flex flex-1 flex-col justify-end gap-3">
          <ProgressReveal progress={progress} start={0.06}>
            <Bubble from="bot">Dobrý deň, ako vám môžem pomôcť?</Bubble>
          </ProgressReveal>
          <ProgressReveal progress={progress} start={0.3}>
            <Bubble from="user">Mám záujem o cenovú ponuku.</Bubble>
          </ProgressReveal>
          <ProgressReveal progress={progress} start={0.46} end={0.52}>
            <span className="inline-flex gap-1 rounded-2xl rounded-bl-md border border-line bg-white/[0.04] px-4 py-3" aria-hidden="true">
              <span className="size-1.5 animate-pulse-dot rounded-full bg-fg-subtle" />
              <span className="size-1.5 animate-pulse-dot rounded-full bg-fg-subtle [animation-delay:0.2s]" />
              <span className="size-1.5 animate-pulse-dot rounded-full bg-fg-subtle [animation-delay:0.4s]" />
            </span>
          </ProgressReveal>
          <ProgressReveal progress={progress} start={0.58}>
            <Bubble from="bot">Samozrejme. O akú službu máte záujem?</Bubble>
          </ProgressReveal>
          <ProgressReveal progress={progress} start={0.74} className="flex flex-wrap gap-2">
            {["Web", "Chatbot", "Automatizácie", "Reklama"].map((option) => (
              <span
                key={option}
                className="rounded-full border border-line-strong px-3.5 py-1.5 text-caption text-fg-muted"
              >
                {option}
              </span>
            ))}
          </ProgressReveal>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-line bg-white/[0.03] px-4 py-2.5">
          <span className="flex-1 text-caption text-fg-faint">Napíšte správu…</span>
          <span className="size-6 rounded-full bg-accent" aria-hidden="true" />
        </div>
      </div>
    </VisualFrame>
  );
}

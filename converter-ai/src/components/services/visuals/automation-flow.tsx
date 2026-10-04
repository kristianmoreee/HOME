"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { BrainCircuit, CircleCheck, Database, Inbox, ListChecks, Mail, type LucideIcon } from "lucide-react";
import { VisualFrame } from "@/components/services/visuals/visual-frame";

const steps: { label: string; icon: LucideIcon }[] = [
  { label: "Nový dopyt", icon: Inbox },
  { label: "AI vyhodnotí", icon: BrainCircuit },
  { label: "Zápis do CRM", icon: Database },
  { label: "E-mail klientovi", icon: Mail },
  { label: "Úloha pre tím", icon: ListChecks },
  { label: "Hotovo", icon: CircleCheck },
];

function FlowNode({
  progress,
  index,
  label,
  icon: Icon,
}: {
  progress: MotionValue<number>;
  index: number;
  label: string;
  icon: LucideIcon;
}) {
  const at = 0.08 + index * 0.14;
  const lit = useTransform(progress, [at, at + 0.08], [0, 1]);
  const line = useTransform(progress, [at + 0.04, at + 0.14], [0, 1]);
  const labelOpacity = useTransform(lit, [0, 1], [0.45, 1]);
  const last = index === steps.length - 1;

  return (
    <li className="relative flex items-center gap-4">
      <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-fg-subtle">
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-xl border border-line-accent bg-electric-500/15 shadow-glow-electric"
          style={{ opacity: lit }}
        />
        <Icon className="relative size-[18px]" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <motion.span className="text-body-sm text-fg" style={{ opacity: labelOpacity }}>
        {label}
      </motion.span>
      {!last ? (
        <span aria-hidden="true" className="absolute top-11 left-[21px] h-[calc(100%-1.75rem)] w-px bg-line">
          <motion.span
            className="block h-full w-px origin-top bg-[linear-gradient(to_bottom,var(--color-electric-400),var(--color-violet-400))]"
            style={{ scaleY: line }}
          />
        </span>
      ) : null}
    </li>
  );
}

/** Service 03: a lead flowing through an automated workflow. */
export function AutomationFlow({ progress }: { progress: MotionValue<number> }) {
  return (
    <VisualFrame label="Automatizácia · Nový dopyt">
      <ol className="flex h-full flex-col justify-between gap-3">
        {steps.map((step, index) => (
          <FlowNode key={step.label} progress={progress} index={index} {...step} />
        ))}
      </ol>
    </VisualFrame>
  );
}

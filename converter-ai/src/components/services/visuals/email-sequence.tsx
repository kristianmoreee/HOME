"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { CalendarCheck, Handshake, Mail, MailPlus, UserPlus, type LucideIcon } from "lucide-react";
import { VisualFrame } from "@/components/services/visuals/visual-frame";

const sequence: { label: string; detail: string; icon: LucideIcon }[] = [
  { label: "Nový kontakt", detail: "Prihlásenie cez formulár", icon: UserPlus },
  { label: "Uvítací e-mail", detail: "Odoslaný automaticky", icon: Mail },
  { label: "Follow-up", detail: "Podľa správania kontaktu", icon: MailPlus },
  { label: "Stretnutie", detail: "Rezervácia termínu", icon: CalendarCheck },
  { label: "Klient", detail: "Spolupráca sa začína", icon: Handshake },
];

function Step({
  progress,
  index,
  label,
  detail,
  icon: Icon,
}: {
  progress: MotionValue<number>;
  index: number;
  label: string;
  detail: string;
  icon: LucideIcon;
}) {
  const at = 0.1 + index * 0.17;
  const opacity = useTransform(progress, [at, at + 0.1], [0.35, 1]);
  const x = useTransform(progress, [at, at + 0.1], [-8, 0]);
  const ring = useTransform(progress, [at, at + 0.1], [0, 1]);

  return (
    <motion.li className="relative flex items-center gap-4 pl-1" style={{ opacity, x }}>
      <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-electric-300">
        <motion.span
          aria-hidden="true"
          className="absolute -inset-1 rounded-full border border-line-accent"
          style={{ opacity: ring }}
        />
        <Icon className="size-4" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-line bg-white/[0.03] px-4 py-3">
        <span className="text-body-sm font-medium text-fg">{label}</span>
        <span className="truncate text-caption text-fg-subtle">{detail}</span>
      </span>
    </motion.li>
  );
}

/** Service 04: an automated e-mail sequence turning a contact into a client. */
export function EmailSequence({ progress }: { progress: MotionValue<number> }) {
  const line = useTransform(progress, [0.1, 0.85], [0, 1]);
  return (
    <VisualFrame label="E-mailová sekvencia">
      <div className="relative h-full">
        <span aria-hidden="true" className="absolute top-5 bottom-5 left-[25px] w-px bg-line">
          <motion.span
            className="block h-full w-px origin-top bg-[linear-gradient(to_bottom,var(--color-electric-400),var(--color-violet-400),var(--color-cyan-400))]"
            style={{ scaleY: line }}
          />
        </span>
        <ol className="relative flex h-full flex-col justify-between gap-3">
          {sequence.map((step, index) => (
            <Step key={step.label} progress={progress} index={index} {...step} />
          ))}
        </ol>
      </div>
    </VisualFrame>
  );
}

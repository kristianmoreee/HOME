import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared shell for service demonstrations: a quiet glass panel with a label. */
export function VisualFrame({
  label,
  status,
  children,
  className,
}: {
  label: string;
  status?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate flex h-full w-full flex-col overflow-hidden rounded-panel glass-strong",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <span className="font-mono text-eyebrow uppercase text-fg-subtle">{label}</span>
        {status}
      </div>
      <div className="relative flex-1 p-5 md:p-7">{children}</div>
    </div>
  );
}

export function LiveDot({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase text-fg-subtle">
      <span aria-hidden="true" className="size-1.5 animate-pulse-dot rounded-full bg-cyan-400" />
      {label}
    </span>
  );
}

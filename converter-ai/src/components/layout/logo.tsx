import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/utils";

/** Brand mark: an open loop that resolves into a point, possibility to result. */
export function LogoMark({ className }: { className?: string }) {
  const gradientId = useId();
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-7 shrink-0", className)}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="4"
          y1="4"
          x2="28"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-electric-300)" />
          <stop offset="0.6" stopColor="var(--color-electric-400)" />
          <stop offset="1" stopColor="var(--color-violet-400)" />
        </linearGradient>
      </defs>
      <path
        d="M24.5 9.5A11 11 0 1 0 27 16"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M10.5 16h9m0 0-3.5-3.5M19.5 16 16 19.5"
        stroke="var(--color-white)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="27" cy="16" r="1.6" fill="var(--color-cyan-300)" />
    </svg>
  );
}

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      aria-label="Converter AI, home"
      className={cn("inline-flex items-center gap-2.5 rounded-md text-fg", className)}
    >
      <LogoMark />
      <span className="flex items-baseline gap-1.5 text-[1.0625rem] font-medium tracking-[-0.02em]">
        Converter
        <span className="font-mono text-[0.6875rem] font-normal tracking-[0.12em] text-fg-subtle">
          AI
        </span>
      </span>
    </Link>
  );
}

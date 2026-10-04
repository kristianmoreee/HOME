import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type FooterLink = { label: string; href: string; external?: boolean };
type FooterColumn = { title: string; links: readonly FooterLink[] };

type FooterProps = {
  /** Brand statement. Pass JSX to use an <Accent> word. */
  tagline: ReactNode;
  columns: readonly FooterColumn[];
  email?: string;
  legalName?: string;
  className?: string;
};

// Evaluated at build/request time on the server.
const YEAR = new Date().getFullYear();

export function Footer({
  tagline,
  columns,
  email,
  legalName = "Converter AI",
  className,
}: FooterProps) {
  return (
    <footer className={cn("relative isolate overflow-hidden border-t border-line", className)}>
      <Container className="pt-20 pb-10 md:pt-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <Logo />
            <Heading as="p" size="h1" tone="sheen" className="max-w-md">
              {tagline}
            </Heading>
            {email ? (
              <a
                href={`mailto:${email}`}
                className="w-fit text-body-lg text-fg-muted underline decoration-line-strong underline-offset-8 transition-colors hover:text-fg hover:decoration-white/60"
              >
                {email}
              </a>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-5">
                <p className="font-mono text-eyebrow uppercase text-fg-subtle">{column.title}</p>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-body-sm text-fg-muted transition-colors duration-200 hover:text-fg"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Text size="caption" tone="subtle">
            © {YEAR} {legalName}. All rights reserved.
          </Text>
          <Text size="caption" tone="subtle" className="font-mono uppercase tracking-[0.12em]">
            Made in Slovakia
          </Text>
        </div>
      </Container>

      {/* Oversized wordmark: a quiet, cinematic sign-off */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden px-gutter text-center font-display text-[18vw] leading-[0.8] font-medium tracking-[-0.06em] text-white/[0.035]"
      >
        Converter
      </div>
    </footer>
  );
}

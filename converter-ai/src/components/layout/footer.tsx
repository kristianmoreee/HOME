import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { Text } from "@/components/ui/typography";
import { siteConfig } from "@/config/site";
import { services } from "@/content/home";
import { cn } from "@/lib/utils";

// Evaluated at build/request time on the server.
const YEAR = new Date().getFullYear();

const linkClass = "text-body-sm text-fg-muted transition-colors duration-200 hover:text-fg";

function ColumnTitle({ children }: { children: string }) {
  return <p className="font-mono text-eyebrow uppercase text-fg-subtle">{children}</p>;
}

/** Site footer: brand line, navigation, services, contact, social and legal links. */
export function Footer({ className }: { className?: string }) {
  const { contact } = siteConfig;

  return (
    <footer className={cn("relative isolate overflow-hidden border-t border-line", className)}>
      <Container className="pt-20 pb-10 md:pt-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-4">
            <Logo />
            <p className="max-w-sm font-display text-h2 font-medium text-sheen">
              Meníme možnosti <span className="text-gradient-accent">na výsledky.</span>
            </p>
            <Text size="sm" className="max-w-sm">
              Weby, automatizácie, AI a marketing pre firmy, ktoré chcú rásť.
            </Text>
          </div>

          <nav
            aria-label="Pätička"
            className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:col-span-8"
          >
            <div className="flex flex-col gap-5">
              <ColumnTitle>Navigácia</ColumnTitle>
              <ul className="flex flex-col gap-3">
                {siteConfig.nav.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <ColumnTitle>Služby</ColumnTitle>
              <ul className="flex flex-col gap-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link href="#sluzby" className={linkClass}>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 flex flex-col gap-5 sm:col-span-1">
              <ColumnTitle>Kontakt</ColumnTitle>
              <address className="flex flex-col gap-3 not-italic">
                <a href={`mailto:${contact.email}`} className={linkClass}>
                  {contact.email}
                </a>
                <a href={contact.phoneHref} className={cn(linkClass, "tabular-nums")}>
                  {contact.phone}
                </a>
                <span className="text-body-sm text-fg-muted">{contact.city}</span>
                <span className="text-body-sm text-fg-subtle">{contact.hours}</span>
              </address>
            </div>

            <div className="flex flex-col gap-5">
              <ColumnTitle>Sledujte nás</ColumnTitle>
              <ul className="flex flex-col gap-3">
                {siteConfig.social.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(linkClass, "group inline-flex items-center gap-1")}
                    >
                      {link.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 opacity-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <Text size="caption" tone="subtle">
            © {YEAR} {siteConfig.name}. Všetky práva vyhradené.
          </Text>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {siteConfig.legal.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-caption text-fg-subtle transition-colors duration-200 hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
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

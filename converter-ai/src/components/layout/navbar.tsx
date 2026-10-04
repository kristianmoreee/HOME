"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type NavLink = { label: string; href: string };

type NavbarProps = {
  links: readonly NavLink[];
  cta?: NavLink;
  /** Slide the bar away while scrolling down, bring it back on scroll up. */
  hideOnScroll?: boolean;
};

/** The in-page section (from `links`) currently in the middle of the viewport. */
function useActiveSection(links: readonly NavLink[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = links
      .filter((link) => link.href.startsWith("#"))
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = elements.find((element) => visible.has(element.id));
        setActive(current ? `#${current.id}` : null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [links]);

  return active;
}

export function Navbar({ links, cta, hideOnScroll = true }: NavbarProps) {
  const active = useActiveSection(links);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 24);
    if (hideOnScroll) setHidden(current > previous && current > 240);
  });

  // Mobile menu: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4"
      animate={{ y: hidden && !open ? "-110%" : "0%" }}
      transition={{ duration: duration.fast * 1.6, ease: ease.out }}
    >
      <Container>
        <nav
          aria-label="Hlavná navigácia"
          className={cn(
            "flex h-14 items-center justify-between rounded-full border px-3 pl-5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out-expo md:h-16",
            scrolled || open
              ? "glass-strong border-line-strong"
              : "border-transparent bg-transparent",
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative inline-flex rounded-full px-4 py-2 text-body-sm transition-colors duration-200 hover:text-fg",
                      isActive ? "text-fg" : "text-fg-muted",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="navbar-active"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border border-line bg-white/[0.06]"
                        transition={{ duration: duration.fast * 1.6, ease: ease.out }}
                      />
                    ) : null}
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {cta ? (
              <ButtonLink
                href={cta.href}
                variant="primary"
                size="sm"
                className="hidden md:inline-flex"
                trailingIcon={<ArrowUpRight />}
              >
                {cta.label}
              </ButtonLink>
            ) : null}
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-white/5 md:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open ? (
            <motion.div
              id={menuId}
              key="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: duration.fast, ease: ease.out }}
              className="glass-strong mt-2 origin-top rounded-card p-3 md:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                }}
                className="flex flex-col"
              >
                {links.map((link) => (
                  <motion.li
                    key={link.href + link.label}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: duration.fast, ease: ease.out },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-xl px-4 text-h4 text-fg transition-colors hover:bg-white/5"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              {cta ? (
                <ButtonLink
                  href={cta.href}
                  variant="primary"
                  size="lg"
                  className="mt-3 w-full"
                  onClick={() => setOpen(false)}
                  trailingIcon={<ArrowUpRight />}
                >
                  {cta.label}
                </ButtonLink>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
}

"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`dark fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-border bg-background/85 backdrop-blur-xl"
          : "border-transparent"
      }`}
    >
      <div className="container-site flex h-18 items-center justify-between gap-6 text-foreground">
        <a
          href="#top"
          className="flex items-baseline gap-2 py-3"
          aria-label="A&G Design, home"
        >
          <span className="font-heading text-[22px] font-extrabold tracking-tight">
            A&amp;G
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.34em] text-muted-foreground">
            Design
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://calendly.com/agdesignworks-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-10 cursor-pointer items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-px hover:bg-primary/90 active:scale-[0.97] sm:inline-flex"
          >
            Book a call
          </a>
          <button
            type="button"
            className="flex size-11 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-[22px] rounded-full bg-foreground transition-transform duration-300 ${
                menuOpen ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-[22px] rounded-full bg-foreground transition-transform duration-300 ${
                menuOpen ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="flex flex-col border-t border-border bg-background/95 px-5 pb-6 pt-2 text-foreground backdrop-blur-xl md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border py-3.5 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://calendly.com/agdesignworks-info/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-5 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
          >
            Book a call
          </a>
        </div>
      )}
    </header>
  );
}

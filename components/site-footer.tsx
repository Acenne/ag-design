const FOOTER_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#051020] py-16 text-foreground">
      <div className="container-site grid gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <span className="block font-heading text-[26px] font-extrabold leading-none tracking-tight" aria-hidden="true">
            A&amp;G
            <em className="mt-1.5 block font-sans text-[11px] not-italic font-medium uppercase tracking-[0.4em] text-muted-foreground">
              Design
            </em>
          </span>
          <p className="mt-4 max-w-[34ch] text-sm text-muted-foreground/70">
            Websites and local SEO, exclusively for heating &amp; air companies.
          </p>
        </div>

        <nav className="flex flex-wrap content-start gap-x-6 gap-y-1" aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="border-t border-border pt-6 text-[13px] text-muted-foreground/70 md:col-span-2">
          © 2026 A&amp;G Design LLC · Montreal, QC ·{" "}
          <a href="mailto:info@agdesignworks.com" className="inline-block py-2 -my-2 hover:text-foreground">
            info@agdesignworks.com
          </a>
        </p>
      </div>
    </footer>
  );
}

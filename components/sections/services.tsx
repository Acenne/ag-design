import {
  MonitorSmartphone,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/accent";
import { AssetImage } from "@/components/asset-image";

const SERVICES = [
  {
    num: "01",
    icon: MonitorSmartphone,
    title: "Conversion-first web design",
    body: "Custom design built around how homeowners actually hire — clear pricing cues, trust signals, and a call button that's never more than a thumb away.",
    image: "Homeowner booking a service call",
    src: "/images/homeowner-call.jpg",
    position: "object-center",
    cardClass: "bg-[#ece7db]",
    rotate: "md:-rotate-1",
  },
  {
    num: "02",
    icon: MapPin,
    title: "Local SEO & map pack",
    body: "Service-area pages, review strategy, and Google Business Profile optimization that put you in the map pack where emergency calls happen.",
    image: "Local map-pack result on a phone",
    src: "/images/local-map-pack.jpg",
    position: "object-center",
    cardClass: "bg-[#fdfcf8]",
    rotate: "md:rotate-[0.8deg]",
  },
  {
    num: "03",
    icon: PhoneCall,
    title: "Booking & lead systems",
    body: "Online scheduling, smart forms, call tracking, and missed-call text-back — wired into ServiceTitan, Housecall Pro, or whatever runs your shop.",
    image: "Lead & booking dashboard",
    src: "/images/booking-dashboard.jpg",
    position: "object-top",
    cardClass: "dark bg-[#0c2342] text-[#f7f4ed] border-white/10",
    rotate: "md:-rotate-[0.6deg]",
  },
  {
    num: "04",
    icon: ShieldCheck,
    title: "Hosting & care plans",
    body: "Fast managed hosting, security updates, seasonal campaign pages, and a real human who answers when you need a change made today.",
    image: "Monthly traffic & performance report",
    src: "/images/analytics-report.jpg",
    position: "object-top",
    cardClass: "bg-[#dbe7f2]",
    rotate: "md:rotate-1",
  },
];

export function Services() {
  return (
    <section className="scroll-mt-16 bg-card py-20 md:py-32" id="services">
      <div className="container-site">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What we do
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-balance">
            One team. Everything your{" "}
            <Accent variant="frame">website</Accent> needs.
          </h2>
          <p className="mt-4 max-w-[56ch] text-[17px] text-muted-foreground">
            We only work with HVAC and mechanical contractors — so nothing is
            figured out on your dime.
          </p>
        </Reveal>

        {/* Stacked-scroll deck: each card is sticky, so the next one
            slides up and settles on top as you scroll. Pure CSS — no
            scroll-jacking. NOTE: don't wrap these in <Reveal>; an
            animated-transform ancestor would break position:sticky. */}
        <div className="space-y-6 md:space-y-10">
          {SERVICES.map((service, i) => (
            <div
              key={service.num}
              className="sticky"
              style={{ top: `${90 + i * 14}px` }}
            >
              <article
                className={`relative grid min-h-[420px] gap-8 overflow-hidden rounded-3xl border border-border p-8 shadow-xl shadow-[#0b2140]/10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-12 ${service.cardClass} ${service.rotate}`}
              >
                <span
                  className="pointer-events-none absolute right-7 top-5 select-none font-heading text-5xl font-bold tracking-tight opacity-15 md:text-6xl"
                  aria-hidden="true"
                >
                  {service.num}
                </span>

                <div>
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl border border-foreground/20 text-foreground">
                    <service.icon
                      className="size-[22px]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="max-w-[18ch] text-2xl font-bold tracking-tight md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3.5 max-w-[48ch] text-[15.5px] text-muted-foreground">
                    {service.body}
                  </p>
                  <a
                    href="#contact"
                    className="mt-7 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-px hover:bg-primary/90 active:scale-[0.97]"
                  >
                    Start a project
                    <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
                  </a>
                </div>

                <AssetImage
                  src={service.src}
                  alt={service.image}
                  ratio="4/3"
                  position={service.position}
                  className="w-full rounded-2xl bg-background/40"
                />
              </article>
            </div>
          ))}
        </div>

        {/* Platform stance — Webflow-first, tool-agnostic */}
        <Reveal delay={1}>
          <aside className="mt-10 flex items-start gap-4 rounded-2xl border-l-4 border-l-[#e8b06a] border-y border-r border-y-border border-r-border bg-background px-6 py-5 md:items-center">
            <Layers
              className="size-6 shrink-0 text-[#c07f2e]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="text-[15px] text-muted-foreground">
              <strong className="font-semibold text-foreground">
                We build Webflow-first.
              </strong>{" "}
              It launches fast, stays secure, and lets you edit text and photos
              yourself — no developer on retainer. But it&apos;s your website:
              if you&apos;d rather be on WordPress, Framer, Squarespace, or
              custom code, we&apos;ll happily build on your stack.
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

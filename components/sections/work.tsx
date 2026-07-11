"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/accent";
import { AssetImage } from "@/components/asset-image";

const PORTFOLIO = {
  name: "Marathon Plumbing, Heating & Air",
  location: "Redesign",
  description:
    "A conversion-first homepage for a multi-trade operation: quote form above the fold, trust badges, and a book-now / click-to-call header that follows you down the page.",
  results: [
    { value: "Above-fold", label: "quote form + service selector" },
    { value: "1-tap", label: "book or call from any screen" },
  ],
  tint: "#e8b06a",
  screenshot: "Marathon Plumbing, Heating & Air homepage",
  src: "/images/portfolio-hvac-site.png",
  position: "object-top",
};

/* Not client work: directions we're ready to build in, shown honestly
   as concepts rather than dressed up as case studies. */
const DIRECTIONS = [
  {
    name: "Commercial & maintenance contracts",
    description:
      "A build centered on service agreements and a 24/7 dispatch flow, designed for facility managers, not homeowners.",
    tint: "#7fb2d9",
  },
  {
    name: "Family-owned & referral-driven",
    description:
      "A warm, personal brand for a family company, with a heat-pump education hub built for the rebate-driven buyer.",
    tint: "#8fd0b8",
  },
];

/* Browser chrome holding the site screenshot; the tab strip carries
   the build's accent tint. */
function BrowserFrame({
  screenshot,
  tint,
  src,
  position,
}: {
  screenshot: string;
  tint: string;
  src?: string;
  position?: string;
}) {
  return (
    <div className="translate-y-1.5 overflow-hidden rounded-t-[10px] border border-b-0 border-foreground/15 bg-card transition-transform duration-300 group-hover:translate-y-0">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full bg-foreground/15" />
        ))}
        <span
          className="ml-2 h-1.5 w-16 rounded-full opacity-80"
          style={{ background: tint }}
          aria-hidden="true"
        />
      </div>
      <AssetImage
        src={src}
        alt={screenshot}
        ratio="16/10"
        position={position}
        className="border-0"
        sizes="(min-width: 1024px) 55vw, 100vw"
        quality={95}
      />
    </div>
  );
}

export function Work() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spriteActive, setSpriteActive] = useState(false);
  const reduceMotion = useReducedMotion();

  const spriteX = useMotionValue(0);
  const spriteY = useMotionValue(0);
  const springX = useSpring(spriteX, { stiffness: 320, damping: 28, mass: 0.6 });
  const springY = useSpring(spriteY, { stiffness: 320, damping: 28, mass: 0.6 });

  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spriteX.set(e.clientX - rect.left);
    spriteY.set(e.clientY - rect.top);
  };

  return (
    <section className="scroll-mt-16 bg-background py-20 md:py-32" id="work">
      <div className="container-site">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Portfolio
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-balance">
            Built for HVAC.{" "}
            <Accent variant="ticks">Designed to book jobs.</Accent>
          </h2>
          <p className="mt-4 max-w-[56ch] text-[17px] text-muted-foreground">
            Our first HVAC build, live and designed to book jobs. Below,
            a couple of the directions we&apos;re ready to take the next one.
          </p>
        </Reveal>

        {/* Real work: single spotlight case study */}
        <div
          ref={cardRef}
          onMouseMove={onCardMouseMove}
          onMouseEnter={() => setSpriteActive(true)}
          onMouseLeave={() => setSpriteActive(false)}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-foreground/25 hover:shadow-lg hover:shadow-primary/5"
        >
          {!reduceMotion && (
            <motion.div
              className="pointer-events-none absolute left-0 top-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 lg:flex"
              style={{ x: springX, y: springY, width: 72, height: 72 }}
              initial={false}
              animate={{
                scale: spriteActive ? 1 : 0.3,
                opacity: spriteActive ? 1 : 0,
              }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              <ArrowUpRight className="size-5" strokeWidth={2} />
              <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em]">
                View
              </span>
            </motion.div>
          )}

          <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div className="bg-gradient-to-br from-secondary/60 to-transparent p-6 lg:p-8">
              <BrowserFrame
                screenshot={PORTFOLIO.screenshot}
                tint={PORTFOLIO.tint}
                src={PORTFOLIO.src}
                position={PORTFOLIO.position}
              />
            </div>
            <div className="p-6 lg:p-10">
              <div className="mb-2.5 flex items-center justify-between gap-2 lg:justify-start lg:gap-3">
                <h3 className="text-xl font-bold tracking-tight lg:text-2xl">
                  {PORTFOLIO.name}
                </h3>
                <span className="whitespace-nowrap rounded-full border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                  {PORTFOLIO.location}
                </span>
              </div>
              <p className="max-w-[46ch] text-[15px] text-muted-foreground">
                {PORTFOLIO.description}
              </p>
              <ul className="mt-5 grid gap-2.5 border-t border-border pt-5">
                {PORTFOLIO.results.map((r) => (
                  <li key={r.label} className="text-sm text-muted-foreground">
                    <strong className="mr-1.5 font-heading font-bold tabular-nums text-foreground">
                      {r.value}
                    </strong>
                    {r.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Concept directions: honestly labeled, no fabricated metrics */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {DIRECTIONS.map((d, i) => (
            <Reveal key={d.name} delay={i}>
              <article className="h-full rounded-2xl border border-dashed border-border bg-card/50 p-6">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: d.tint }}
                    aria-hidden="true"
                  />
                  <span className="whitespace-nowrap rounded-full border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    Concept direction
                  </span>
                </div>
                <h3 className="text-base font-bold tracking-tight">{d.name}</h3>
                <p className="mt-2 text-[14px] text-muted-foreground">{d.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

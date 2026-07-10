"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/accent";
import { AssetImage } from "@/components/asset-image";

type CaseStudy = {
  name: string;
  location: string;
  description: string;
  results: { value: string; label: string }[];
  tint: string;
  screenshot: string;
  src?: string;
  position?: string;
};

const CASES: CaseStudy[] = [
  {
    name: "Marathon Plumbing, Heating & Air",
    location: "Redesign",
    description:
      "A conversion-first homepage for a multi-trade operation — quote form above the fold, trust badges, and a book-now / click-to-call header that follows you down the page.",
    results: [
      { value: "Above-fold", label: "quote form + service selector" },
      { value: "1-tap", label: "book or call from any screen" },
    ],
    tint: "#e8b06a",
    screenshot: "Marathon Plumbing, Heating & Air homepage",
    src: "/images/portfolio-hvac-site.png",
    position: "object-top",
  },
  {
    name: "Corrigan Mechanical",
    location: "Commercial",
    description:
      "A commercial build centered on maintenance agreements and a 24/7 dispatch flow — designed for facility managers, not homeowners.",
    results: [
      { value: "B2B", label: "maintenance-contract funnel" },
      { value: "24/7", label: "emergency dispatch flow" },
    ],
    tint: "#7fb2d9",
    screenshot: "Corrigan homepage screenshot — 1280×800",
  },
  {
    name: "BlueRidge Comfort Systems",
    location: "Family-owned",
    description:
      "A warm, referral-friendly brand for a family company — with a heat-pump education hub built for the rebate-driven buyer.",
    results: [
      { value: "0.9s", label: "mobile load time on 4G" },
      { value: "7", label: "pages incl. heat-pump guide" },
    ],
    tint: "#8fd0b8",
    screenshot: "BlueRidge homepage screenshot — 1280×800",
  },
];

/* Browser chrome holding the site screenshot; the tab strip carries
   each build's accent tint. */
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
      <AssetImage src={src} alt={screenshot} ratio="16/10" position={position} className="border-0" />
    </div>
  );
}

export function Work() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [spriteActive, setSpriteActive] = useState(false);
  const reduceMotion = useReducedMotion();

  const spriteX = useMotionValue(0);
  const spriteY = useMotionValue(0);
  const springX = useSpring(spriteX, { stiffness: 320, damping: 28, mass: 0.6 });
  const springY = useSpring(spriteY, { stiffness: 320, damping: 28, mass: 0.6 });

  const onGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
            Three builds from our portfolio — each designed around how a
            different kind of HVAC company wins work, from late-night
            emergency calls to commercial maintenance contracts.
          </p>
        </Reveal>

        <div
          ref={gridRef}
          onMouseMove={onGridMouseMove}
          onMouseEnter={() => setSpriteActive(true)}
          onMouseLeave={() => setSpriteActive(false)}
          className="relative grid gap-6 lg:grid-cols-3"
        >
          {/* Cursor-following sprite (desktop pointers only) */}
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

          {CASES.map((cs, i) => (
            <Reveal key={cs.name} delay={i}>
              <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-lg hover:shadow-primary/5">
                <div className="border-b border-border bg-gradient-to-b from-secondary/60 to-transparent px-6 pt-6">
                  <BrowserFrame
                    screenshot={cs.screenshot}
                    tint={cs.tint}
                    src={cs.src}
                    position={cs.position}
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold tracking-tight">{cs.name}</h3>
                    <span className="whitespace-nowrap rounded-full border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                      {cs.location}
                    </span>
                  </div>
                  <p className="text-[14.5px] text-muted-foreground">{cs.description}</p>
                  <ul className="mt-4 grid gap-2 border-t border-border pt-4">
                    {cs.results.map((r) => (
                      <li key={r.label} className="text-sm text-muted-foreground">
                        <strong className="mr-1.5 font-heading font-bold tabular-nums text-foreground">
                          {r.value}
                        </strong>
                        {r.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

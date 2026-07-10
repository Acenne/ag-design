"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { GridPattern } from "@/components/ui/the-infinite-grid";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/accent";
import { ThermostatDial } from "@/components/thermostat";

const STATS = [
  { label: "Days from kickoff to launch", value: 14, decimals: 0, prefix: "", suffix: "" },
  { label: "Avg. mobile load time", value: 0.9, decimals: 1, prefix: "", suffix: "s" },
  { label: "Custom design, no templates", value: 100, decimals: 0, prefix: "", suffix: "%" },
  { label: "Max reply time, weekdays", value: 24, decimals: 0, prefix: "", suffix: "h" },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useAnimationFrame(() => {
    if (reduceMotion) return;
    gridOffsetX.set((gridOffsetX.get() + 0.35) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.35) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-background text-foreground pt-44 pb-24 md:pt-52 md:pb-28"
    >
      {/* Infinite grid: faint base layer + cursor-revealed active layer */}
      <div className="absolute inset-0 z-0 opacity-[0.07]" aria-hidden="true">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
        aria-hidden="true"
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Heating & cooling glows */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute right-[-20%] top-[-20%] w-[45%] h-[45%] rounded-full bg-amber-500/15 blur-[120px]" />
        <div className="absolute left-[-15%] bottom-[-25%] w-[45%] h-[45%] rounded-full bg-sky-500/15 blur-[120px]" />
      </div>

      {/* Floating thermostat widget — the trade's most recognizable
          object, warming from 58° to a comfortable 72° (decorative) */}
      <motion.div
        className="pointer-events-none absolute right-[3%] top-[21%] z-[5] hidden xl:block"
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <div className="rotate-2 rounded-3xl border border-white/10 bg-[#0c2342]/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-md">
          <p className="mb-1 text-center text-[9px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            A&amp;G comfort mode
          </p>
          <ThermostatDial size={136} />
          <p className="mt-1 flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-[#e8b06a] motion-reduce:animate-none" />
            Heat · On
          </p>
        </div>
      </motion.div>

      <div className="container-site relative z-10 text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Web design studio for heating &amp; air companies
          </p>
        </Reveal>

        <Reveal delay={1}>
          <h1 className="mx-auto mt-6 max-w-[16ch] text-[clamp(2.5rem,7vw,4.75rem)] font-extrabold leading-[1.05] tracking-tight text-balance">
            Websites that turn HVAC searches into <Accent>service calls.</Accent>
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-[54ch] text-base md:text-lg text-muted-foreground">
            A&amp;G Design builds high-converting websites exclusively for HVAC
            firms — engineered to rank in your service area, load instantly on
            any phone, and book more jobs while your techs are on the road.
          </p>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-px hover:bg-primary/90 active:scale-[0.97]"
            >
              Book a free strategy call
            </a>
            <a
              href="#work"
              className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-foreground/25 px-8 py-3.5 font-semibold transition-all duration-200 hover:-translate-y-px hover:border-foreground active:scale-[0.97]"
            >
              See our work
            </a>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 border-t border-border pt-10 md:mt-20 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1.5 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground/80">
                  {stat.label}
                </dt>
                <dd className="text-3xl md:text-4xl font-heading font-bold tracking-tight tabular-nums">
                  {stat.prefix}
                  <Counter target={stat.value} decimals={stat.decimals} />
                  {stat.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

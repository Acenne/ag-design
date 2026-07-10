import { Reveal } from "@/components/reveal";
import { Accent, DrawnRule } from "@/components/accent";

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    body: "A 45-minute call about your service area, best jobs, and competitors. We audit your current site and rankings before we start.",
  },
  {
    num: "02",
    title: "Design",
    body: "You see your homepage design within days. We revise together until it feels like your company — not a template.",
  },
  {
    num: "03",
    title: "Build",
    body: "Built in Webflow — or WordPress, Framer, whatever you prefer — with service-area SEO structure and tracking, tested on real phones.",
  },
  {
    num: "04",
    title: "Launch & handover",
    body: "Zero-downtime launch, then a walkthrough so you can edit text and photos yourself. Prefer we run it? There's a care plan for that.",
  },
];

export function Process() {
  return (
    <section className="relative scroll-mt-16 overflow-hidden bg-background py-20 md:py-32" id="process">
      {/* Blueprint overlay: fine engineering grid fading toward the edges */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055] [mask-image:radial-gradient(85%_75%_at_50%_42%,black,transparent)]"
        aria-hidden="true"
      >
        <svg className="h-full w-full">
          <defs>
            <pattern id="blueprint-fine" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M28 0H0V28" fill="none" stroke="#0b2140" strokeWidth="1" />
            </pattern>
            <pattern id="blueprint-major" width="140" height="140" patternUnits="userSpaceOnUse">
              <path d="M140 0H0V140" fill="none" stroke="#0b2140" strokeWidth="1.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-fine)" />
          <rect width="100%" height="100%" fill="url(#blueprint-major)" />
        </svg>
      </div>

      <div className="container-site relative">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            How it works
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-balance">
            Live in two weeks. Not{" "}
            <Accent variant="strike">two months.</Accent>
          </h2>
        </Reveal>

        {/* Timeline: amber rule draws across the four steps */}
        <DrawnRule className="mb-[-1px] hidden lg:block" />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i}>
              <li className="h-full border-t border-foreground/20 pt-6 lg:border-t-0">
                <span className="font-serif text-[40px] italic leading-none text-muted-foreground/50">
                  {step.num}
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-[14.5px] text-muted-foreground">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

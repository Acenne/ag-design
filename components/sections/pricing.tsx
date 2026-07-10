import { Check, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/accent";

const PLANS = [
  {
    name: "Starter",
    price: "$2,000",
    period: " one-time",
    description: "A credible, fast 5–7 page site that makes the phone ring.",
    features: [
      "5–7 pages, custom-designed",
      "Webflow build (or your platform)",
      "Mobile-first, sub-1s load times",
      "Click-to-call & lead forms",
      "Live in 2 weeks",
    ],
    cta: "Choose Starter",
    featured: false,
  },
  {
    name: "Complete",
    price: "$3,500",
    period: " one-time",
    description: "The full package for owning your service area online.",
    features: [
      "12+ pages incl. service-area SEO pages",
      "Online booking & quote forms",
      "Google Business Profile + review setup",
      "Local SEO foundations",
      "30 days of post-launch tweaks",
    ],
    cta: "Choose Complete",
    featured: true,
  },
  {
    name: "Care",
    price: "$199",
    period: " /month",
    description: "Optional ongoing help once your site is live. Cancel anytime.",
    features: [
      "Content & seasonal updates",
      "Small design changes, same week",
      "Hosting & platform upkeep",
      "Monthly traffic & lead report",
      "No contract, no minimum term",
    ],
    cta: "Add Care later",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section className="scroll-mt-16 bg-background py-20 md:py-32" id="pricing">
      <div className="container-site">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Investment
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-balance">
            Flat pricing. <Accent variant="dashes">No surprises.</Accent>
          </h2>
          <p className="mt-4 max-w-[56ch] text-[17px] text-muted-foreground">
            Sized to how you sell, priced so one or two booked installs cover
            it. Design, build, copywriting, and launch, all included. 50%
            books your spot, 50% at launch.
          </p>
        </Reveal>

        <div className="grid items-start gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i} className={plan.featured ? "order-first lg:order-none" : ""}>
              <article
                className={`relative flex h-full flex-col gap-5 rounded-2xl border p-8 md:p-10 ${
                  plan.featured
                    ? "dark border-transparent bg-background text-foreground shadow-xl shadow-[#0b2140]/20"
                    : "border-border bg-card transition-colors duration-300 hover:border-foreground/25"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-8 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-primary-foreground md:left-10">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-bold tracking-tight">{plan.name}</h3>
                <p className="font-heading text-[40px] font-bold leading-none tracking-tight tabular-nums">
                  {plan.price}
                  <span className="font-sans text-sm font-medium tracking-normal text-muted-foreground">
                    {plan.period}
                  </span>
                </p>
                <p className="text-[14.5px] text-muted-foreground">{plan.description}</p>
                <ul className="grid gap-2.5 border-t border-border py-5 text-[14.5px] text-muted-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-foreground/70"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-auto inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full px-6 py-3 font-semibold transition-all duration-200 hover:-translate-y-px active:scale-[0.97] ${
                    plan.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-foreground/25 hover:border-foreground"
                  }`}
                >
                  {plan.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Guarantee strip — unique to pricing */}
        <Reveal delay={2}>
          <aside className="mt-10 flex items-start gap-4 rounded-2xl border-l-4 border-l-[#e8b06a] border-y border-r border-y-border border-r-border bg-card px-6 py-5 md:items-center">
            <ShieldCheck
              className="size-6 shrink-0 text-[#c07f2e]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="text-[15px] text-muted-foreground">
              <strong className="font-semibold text-foreground">
                Love-it guarantee.
              </strong>{" "}
              We revise the design until you&apos;re happy before final
              payment. If we can&apos;t get it right, you don&apos;t pay the
              balance.
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

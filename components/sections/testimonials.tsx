import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/accent";
import { ImagePlaceholder } from "@/components/image-placeholder";

const QUOTES = [
  {
    quote:
      "We went from two or three web leads a week to two or three a day. Peak season, dispatch actually asked if we could slow the website down.",
    initials: "MS",
    name: "Marcus Sandoval",
    role: "Owner, Summit Air & Heating",
  },
  {
    quote:
      "They understood service agreements, load calcs, the whole trade. First agency we didn't have to teach our own business to.",
    initials: "DC",
    name: "Dana Corrigan",
    role: "President, Corrigan Mechanical",
  },
  {
    quote:
      "My dad built this company on referrals. The new site is the first thing that's ever brought in work on its own, and it looks like us.",
    initials: "TW",
    name: "Tyler Whitson",
    role: "GM, BlueRidge Comfort Systems",
  },
];

export function Testimonials() {
  return (
    <section className="relative scroll-mt-16 overflow-hidden bg-background py-20 text-foreground md:py-32" id="testimonials">
      {/* Oversized ghost quotation mark anchoring the section */}
      <span
        className="pointer-events-none absolute -top-16 right-[4%] select-none font-serif text-[22rem] italic leading-none text-foreground/[0.04]"
        aria-hidden="true"
      >
        &rdquo;
      </span>
      <div className="container-site relative">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What owners say
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-balance">
            The phone rings.{" "}
            <Accent variant="highlight">That&apos;s the review.</Accent>
          </h2>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.initials} delay={i}>
              <figure className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-border bg-card p-8 md:p-10">
                <blockquote className="font-serif text-xl leading-[1.45]">
                  “{q.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3.5 text-sm text-muted-foreground">
                  <ImagePlaceholder
                    label={`Headshot: ${q.name}, 96×96`}
                    compact
                    className="size-11 shrink-0 rounded-full"
                  />
                  <span className="leading-snug">
                    <strong className="font-semibold text-foreground">{q.name}</strong>
                    <br />
                    {q.role}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

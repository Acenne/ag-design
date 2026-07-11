"use client";

import { useState } from "react";
import { PhoneCall, Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Accent } from "@/components/accent";
import { ImagePlaceholder } from "@/components/image-placeholder";

type Errors = Partial<Record<"name" | "company" | "email", string>>;

function validate(values: { name: string; company: string; email: string }): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.company.trim()) errors.company = "Please enter your company name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "That email doesn't look right, check for typos.";
  }
  return errors;
}

export function Contact() {
  const [values, setValues] = useState({ name: "", company: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const setField = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const onBlur = (field: keyof Errors) => () => {
    const fieldErrors = validate(values);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (["name", "company", "email"] as const).find((f) => nextErrors[f]);
    if (firstInvalid) {
      document.getElementById(`f-${firstInvalid}`)?.focus();
      return;
    }
    // Demo submit: swap for a real endpoint (Formspree, Resend, your CRM)
    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      setValues({ name: "", company: "", email: "", message: "" });
    }, 900);
  };

  const inputClass =
    "min-h-12 w-full rounded-xl border border-input bg-secondary/60 px-4 py-3 text-[15px] text-foreground transition-colors duration-200 focus:border-foreground focus:outline-none aria-[invalid=true]:border-destructive";

  return (
    <section className="relative scroll-mt-16 overflow-hidden bg-background py-20 text-foreground md:py-32" id="contact">
      <div
        className="absolute bottom-[-50%] left-1/2 -z-0 aspect-[1.8] w-[min(1000px,130vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(232,176,106,0.08)_0%,transparent_65%)]"
        aria-hidden="true"
      />
      <div className="container-site relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Get started
            </p>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(1.9rem,4.6vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-balance">
              Your next busy season starts with a{" "}
              <Accent variant="gradient">better website.</Accent>
            </h2>
            <p className="mt-4 max-w-[56ch] text-[17px] text-muted-foreground">
              Book a free 20-minute strategy call. We&apos;ll audit your current
              site and rankings live, useful whether you hire us or not.
            </p>
            <ul className="mt-10 grid gap-4">
              <li className="flex items-center gap-3.5 text-[15.5px] text-muted-foreground">
                <PhoneCall className="size-[19px] shrink-0 text-muted-foreground/60" strokeWidth={1.5} aria-hidden="true" />
                <a href="tel:+14389946437" className="py-2 transition-colors hover:text-foreground">
                  +1 (438) 994-6437
                </a>
              </li>
              <li className="flex items-center gap-3.5 text-[15.5px] text-muted-foreground">
                <Mail className="size-[19px] shrink-0 text-muted-foreground/60" strokeWidth={1.5} aria-hidden="true" />
                <a href="mailto:info@agdesignworks.com" className="py-2 transition-colors hover:text-foreground">
                  info@agdesignworks.com
                </a>
              </li>
              <li className="flex items-center gap-3.5 text-[15.5px] text-muted-foreground">
                <MapPin className="size-[19px] shrink-0 text-muted-foreground/60" strokeWidth={1.5} aria-hidden="true" />
                <span className="py-2">Montreal, QC, serving HVAC firms across North America</span>
              </li>
            </ul>

            {/* The A&G behind A&G Design — unique to contact */}
            <div className="mt-10 flex items-center gap-5 rounded-2xl border border-border bg-card/60 p-5">
              <ImagePlaceholder
                label="Photo: Amaan in the studio, 480×360"
                ratio="4/3"
                className="w-32 shrink-0 rounded-xl"
                compact
              />
              <div>
                <p className="text-[14.5px] text-muted-foreground">
                  You&apos;ll talk to Amaan, the founder of A&amp;G
                  Design. No handoffs, no account managers.
                </p>
                <p className="mt-2 font-serif text-lg italic text-foreground/85">
                  Amaan
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="grid gap-6 rounded-2xl border border-border bg-card p-8 md:p-10"
            >
              {(
                [
                  { id: "name", label: "Your name", type: "text", autoComplete: "name" },
                  { id: "company", label: "Company", type: "text", autoComplete: "organization" },
                  { id: "email", label: "Email", type: "email", autoComplete: "email" },
                ] as const
              ).map((field) => (
                <div key={field.id} className="grid gap-2">
                  <label htmlFor={`f-${field.id}`} className="text-[13.5px] font-semibold">
                    {field.label} <span className="text-muted-foreground/60" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`f-${field.id}`}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required
                    value={values[field.id]}
                    onChange={setField(field.id)}
                    onBlur={onBlur(field.id)}
                    aria-invalid={errors[field.id] ? "true" : "false"}
                    aria-describedby={errors[field.id] ? `err-${field.id}` : undefined}
                    className={inputClass}
                  />
                  {errors[field.id] && (
                    <p id={`err-${field.id}`} className="text-[13px] text-destructive" aria-live="polite">
                      {errors[field.id]}
                    </p>
                  )}
                </div>
              ))}

              <div className="grid gap-2">
                <label htmlFor="f-message" className="text-[13.5px] font-semibold">
                  What&apos;s going on with your current site?
                </label>
                <textarea
                  id="f-message"
                  rows={4}
                  value={values.message}
                  onChange={setField("message")}
                  className={`${inputClass} min-h-[110px] resize-y`}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-all duration-200 hover:-translate-y-px hover:bg-primary/90 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-75"
              >
                {status === "loading" && (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                )}
                Request my strategy call
              </button>

              <p className="text-center text-[13px] text-muted-foreground/70">
                No spam, no pressure. We reply within one business day.
              </p>

              {status === "success" && (
                <p
                  role="status"
                  className="flex items-start gap-2.5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3.5 text-[14.5px] text-emerald-300"
                >
                  <CheckCircle2 className="mt-0.5 size-[18px] shrink-0" aria-hidden="true" />
                  Thanks, your request is in. We&apos;ll be in touch within one business day.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

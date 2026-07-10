"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Key-phrase accents — one bespoke treatment per section, all drawn in
   the same amber so they read as one voice:
   - underline:  hand-drawn sweep (hero signature)
   - ticks:      measuring-tape marks ("Measured results")
   - frame:      UI-style selection box drawn around a word ("website")
   - strike:     crossing out the bad option ("six months")
   - highlight:  marker wash behind the phrase (testimonials)
   - dashes:     receipt-style dashes (pricing)
   - circle:     scribbled oval (FAQ)
   - gradient:   heat-to-cool gradient fill (contact, over navy)      */

type Variant =
  | "underline"
  | "ticks"
  | "frame"
  | "strike"
  | "highlight"
  | "dashes"
  | "circle"
  | "gradient";

const EASE = [0.22, 1, 0.36, 1] as const;
const AMBER = "#e8b06a";
const VIEWPORT = { once: true, margin: "0px 0px -80px 0px" } as const;

export function Accent({
  children,
  variant = "underline",
}: {
  children: React.ReactNode;
  variant?: Variant;
}) {
  const reduceMotion = useReducedMotion();
  const draw = (delay = 0.45, duration = 0.8) => ({
    initial: reduceMotion ? undefined : { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: VIEWPORT,
    transition: { duration, ease: EASE, delay },
  });

  if (variant === "gradient") {
    return (
      <motion.span
        className="inline-block whitespace-nowrap bg-gradient-to-r from-[#e8b06a] via-[#ead8b4] to-[#7fb2d9] bg-clip-text text-transparent"
        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
      >
        {children}
      </motion.span>
    );
  }

  if (variant === "highlight") {
    return (
      <span className="relative inline-block whitespace-nowrap">
        <motion.span
          className="absolute -inset-x-[0.18em] inset-y-[6%] rounded-[0.15em] bg-[#e8b06a]/25"
          style={{ originX: 0 }}
          initial={reduceMotion ? undefined : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          aria-hidden="true"
        />
        <span className="relative">{children}</span>
      </span>
    );
  }

  if (variant === "frame") {
    return (
      <span className="relative inline-block whitespace-nowrap px-[0.12em]">
        {children}
        <motion.svg
          viewBox="0 0 200 60"
          preserveAspectRatio="none"
          className="absolute -inset-x-[0.1em] -inset-y-[0.06em] h-[calc(100%+0.12em)] w-[calc(100%+0.2em)]"
          aria-hidden="true"
        >
          <motion.path
            d="M 18 3 H 182 Q 197 3 197 18 V 42 Q 197 57 182 57 H 18 Q 3 57 3 42 V 18 Q 3 3 18 3 Z"
            fill="none"
            stroke={AMBER}
            strokeWidth="4"
            strokeLinecap="round"
            {...draw(0.4, 1)}
          />
        </motion.svg>
      </span>
    );
  }

  if (variant === "strike") {
    return (
      <span className="relative inline-block whitespace-nowrap">
        {children}
        <motion.svg
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
          className="absolute left-[-0.1em] top-[48%] h-[0.16em] w-[calc(100%+0.2em)]"
          aria-hidden="true"
        >
          <motion.path
            d="M3 14 C 60 10, 145 7, 197 5"
            fill="none"
            stroke={AMBER}
            strokeWidth="7"
            strokeLinecap="round"
            {...draw(0.5, 0.6)}
          />
        </motion.svg>
      </span>
    );
  }

  if (variant === "circle") {
    return (
      <span className="relative inline-block whitespace-nowrap px-[0.25em]">
        {children}
        <motion.svg
          viewBox="0 0 200 70"
          preserveAspectRatio="none"
          className="absolute -inset-x-[0.15em] -inset-y-[0.14em] h-[calc(100%+0.28em)] w-[calc(100%+0.3em)]"
          aria-hidden="true"
        >
          <motion.path
            d="M 104 6 C 172 8 196 21 195 36 C 194 55 152 66 96 64 C 42 62 5 51 5 34 C 5 17 48 6 118 9"
            fill="none"
            stroke={AMBER}
            strokeWidth="4.5"
            strokeLinecap="round"
            {...draw(0.4, 1.1)}
          />
        </motion.svg>
      </span>
    );
  }

  if (variant === "ticks") {
    const ticks = Array.from({ length: 12 }, (_, i) => 8 + i * 16.7);
    return (
      <span className="relative inline-block whitespace-nowrap">
        {children}
        <svg
          viewBox="0 0 200 14"
          preserveAspectRatio="none"
          className="absolute -bottom-[0.16em] left-0 h-[0.16em] w-full"
          aria-hidden="true"
        >
          {ticks.map((x, i) => (
            <motion.line
              key={x}
              x1={x}
              x2={x}
              y1={i % 3 === 0 ? 1 : 4}
              y2={13}
              stroke={AMBER}
              strokeWidth="4"
              strokeLinecap="round"
              initial={reduceMotion ? undefined : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.18, delay: 0.4 + i * 0.05 }}
            />
          ))}
        </svg>
      </span>
    );
  }

  if (variant === "dashes") {
    return (
      <span className="relative inline-block whitespace-nowrap">
        {children}
        <motion.svg
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
          className="absolute -bottom-[0.14em] left-0 h-[0.13em] w-full"
          initial={reduceMotion ? undefined : { opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
          aria-hidden="true"
        >
          <path
            d="M4 6 H196"
            fill="none"
            stroke={AMBER}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="16 12"
          />
        </motion.svg>
      </span>
    );
  }

  /* default: hand-drawn underline (hero) */
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <motion.svg
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.12em] left-0 h-[0.18em] w-full"
        aria-hidden="true"
      >
        <motion.path
          d="M3 9 C 55 3, 145 2, 197 6.5"
          fill="none"
          stroke={AMBER}
          strokeWidth="5"
          strokeLinecap="round"
          {...draw()}
        />
      </motion.svg>
    </span>
  );
}

/* Amber rule that draws itself across — used as the process timeline. */
export function DrawnRule({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`h-px bg-gradient-to-r from-[#e8b06a] via-[#e8b06a]/70 to-transparent ${className ?? ""}`}
      style={{ originX: 0 }}
      initial={reduceMotion ? undefined : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
      aria-hidden="true"
    />
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  useReducedMotion,
  animate,
} from "framer-motion";

/* Nest-style thermostat dial — the HVAC industry's most recognizable
   object as a brand flourish. Animates from a chilly 58° up to a
   comfortable 72°, arc shifting from cooling blue to heating amber. */

const START = 58;
const TARGET = 72;
const MIN = 50;
const MAX = 90;
const SWEEP_START = 135; // degrees; 270° dial with the gap at the bottom
const SWEEP_END = 405;
const R = 78;

const rad = (deg: number) => (deg * Math.PI) / 180;
const tempToAngle = (t: number) =>
  SWEEP_START + ((t - MIN) / (MAX - MIN)) * (SWEEP_END - SWEEP_START);
const arcFraction = (t: number) => (t - MIN) / (MAX - MIN);
/* Round to 2dp so server- and client-computed trig serialize identically
   (raw float output differs in the last bits → hydration mismatch). */
const fix = (n: number) => Math.round(n * 100) / 100;
const px = (angle: number, r: number) => fix(100 + r * Math.cos(rad(angle)));
const py = (angle: number, r: number) => fix(100 + r * Math.sin(rad(angle)));

const ARC_D = `M ${px(SWEEP_START, R)} ${py(SWEEP_START, R)} A ${R} ${R} 0 1 1 ${px(SWEEP_END, R)} ${py(SWEEP_END, R)}`;

const TICKS = Array.from({ length: 28 }, (_, i) => {
  const angle = SWEEP_START + i * 10;
  const major = i % 3 === 0;
  const r1 = major ? 85 : 88;
  return {
    angle,
    major,
    x1: px(angle, r1),
    y1: py(angle, r1),
    x2: px(angle, 93),
    y2: py(angle, 93),
  };
});

export function ThermostatDial({ size = 170 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  const progress = useMotionValue(reduceMotion ? 1 : 0);
  const [temp, setTemp] = useState(reduceMotion ? TARGET : START);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(progress, 1, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.5,
      onUpdate: (p) => setTemp(Math.round(START + (TARGET - START) * p)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, progress]);

  const currentTemp = (p: number) => START + (TARGET - START) * p;
  const arcLength = useTransform(progress, (p) => arcFraction(currentTemp(p)));
  const arcColor = useTransform(progress, [0, 1], ["#7fb2d9", "#e8b06a"]);
  const dotX = useTransform(progress, (p) => 100 + R * Math.cos(rad(tempToAngle(currentTemp(p)))));
  const dotY = useTransform(progress, (p) => 100 + R * Math.sin(rad(tempToAngle(currentTemp(p)))));

  return (
    <div ref={ref} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="h-full w-full">
        {/* tick ring */}
        {TICKS.map((tick) => (
          <line
            key={tick.angle}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="currentColor"
            strokeWidth={tick.major ? 2.5 : 1.25}
            strokeLinecap="round"
            className={tick.major ? "text-foreground/40" : "text-foreground/20"}
          />
        ))}

        {/* track + animated temperature arc */}
        <path
          d={ARC_D}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          className="text-foreground/10"
        />
        <motion.path
          d={ARC_D}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ pathLength: arcLength, stroke: arcColor }}
        />
        <motion.circle
          r="5.5"
          style={{ cx: dotX, cy: dotY, fill: arcColor }}
        />

        {/* readout */}
        <text
          x="100"
          y="104"
          textAnchor="middle"
          className="fill-foreground font-heading text-[44px] font-bold tracking-tight tabular-nums"
        >
          {temp}
          <tspan className="fill-[#e8b06a] text-[20px]" dy="-16">
            °
          </tspan>
        </text>
        <text
          x="100"
          y="130"
          textAnchor="middle"
          className="fill-foreground/50 text-[10px] font-semibold uppercase tracking-[0.25em]"
        >
          comfort
        </text>
      </svg>
    </div>
  );
}

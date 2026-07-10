"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export function Counter({
  target,
  decimals = 0,
}: {
  target: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    if (reduceMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [inView, target, decimals, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduceMotion ? target.toFixed(decimals) : "0"}
    </span>
  );
}

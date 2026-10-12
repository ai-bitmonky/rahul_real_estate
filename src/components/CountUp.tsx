"use client";

import { useEffect, useRef, useState } from "react";
import { groupIN } from "@/lib/emi";

/** Counts from 0 to `to` the first time it scrolls into view. */
export default function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const d = 1400;
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / d);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        setVal(0);
        raf = requestAnimationFrame(step);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return <span ref={ref}>{groupIN(val)}</span>;
}

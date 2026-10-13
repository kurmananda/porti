"use client";

import { useEffect, useRef } from "react";

// Counts from zero to `value` the first time it scrolls into view.
export default function CountUp({ value, suffix = "", duration = 1600 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    el.textContent = `0${suffix}`;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = `${Math.round(value * eased)}${suffix}`;
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

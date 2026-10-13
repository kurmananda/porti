"use client";

import { useEffect, useId, useRef } from "react";

// Half-widths of the silhouette at eight heights, top to bottom, for a lump of
// clay and for the finished pot. Scrolling blends one into the other.
const LUMP = [[29, 3], [30, 6.5], [32, 9.5], [34.5, 12], [37, 13.5], [39, 14.2], [40.5, 13.8], [41.5, 11.5]];
const POT = [[7, 6.2], [9.5, 4.6], [13, 5.6], [19, 11], [26, 14], [33, 13], [38, 9.4], [41.5, 5.6]];

const TOP = 7;
const BOTTOM = 41.5;

function outline(t) {
  const rows = LUMP.map(([y, w], i) => [y + (POT[i][0] - y) * t, w + (POT[i][1] - w) * t]);
  const points = [
    ...rows.map(([y, w]) => [24 - w, y]),
    ...rows.toReversed().map(([y, w]) => [24 + w, y]),
  ];
  // Smooth closed curve: quadratic segments through the midpoints of each edge.
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const start = mid(points.at(-1), points[0]);
  let d = `M${start[0].toFixed(2)} ${start[1].toFixed(2)}`;
  points.forEach((point, i) => {
    const next = mid(point, points[(i + 1) % points.length]);
    d += `Q${point[0].toFixed(2)} ${point[1].toFixed(2)} ${next[0].toFixed(2)} ${next[1].toFixed(2)}`;
  });
  return `${d}Z`;
}

// The mark beside the artist's name. As the page scrolls, a lump of clay is
// raised into a pot, and the pot fills until the end of the page.
export default function ScrollPot({ className = "" }) {
  const id = useId();
  const shapeRef = useRef(null);
  const clipRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 1;
      // The pot is fully raised by the halfway point; it keeps filling to the end.
      const raised = Math.min(progress / 0.5, 1);
      const d = outline(1 - Math.pow(1 - raised, 2));
      shapeRef.current.setAttribute("d", d);
      clipRef.current.setAttribute("d", d);
      fillRef.current.setAttribute("y", String(BOTTOM - (BOTTOM - TOP) * progress));
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const initial = outline(0);
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={id}>
          <path ref={clipRef} d={initial} />
        </clipPath>
      </defs>
      <rect
        ref={fillRef}
        x="0"
        y={BOTTOM}
        width="48"
        height="48"
        fill="currentColor"
        clipPath={`url(#${id})`}
      />
      <path
        ref={shapeRef}
        d={initial}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

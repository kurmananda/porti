"use client";

import { useEffect } from "react";
import { VESSEL_PATH } from "./Icons";

// The curtain shown on a fresh page load. It lifts with CSS alone; the effect
// only tells later page transitions not to wait for it.
export default function Intro() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.dataset.ready = "";
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="intro" aria-hidden="true">
      <svg
        viewBox="0 0 48 48"
        className="h-24 w-24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={VESSEL_PATH} pathLength="1" />
      </svg>
    </div>
  );
}

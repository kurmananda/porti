"use client";

import { useRef } from "react";

// Leans its child a few degrees toward the pointer.
export default function Tilt({ children, className = "", max = 5 }) {
  const ref = useRef(null);

  const onMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(1100px) rotateX(${-y * max}deg) rotateY(${x * max}deg) scale(1.015)`;
  };
  const onLeave = () => {
    ref.current.style.transform = "";
  };

  return (
    <div className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div
        ref={ref}
        className="h-full w-full transition-transform duration-700 ease-kiln will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}

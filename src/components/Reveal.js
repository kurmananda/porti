"use client";

import { useEffect, useRef } from "react";

// variant "clip" wipes the content open from the top (use on image frames).
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  variant = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

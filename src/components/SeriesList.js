"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import WorkImage from "./WorkImage";

// Rows of series. On a mouse, the hovered row's cover floats beside the cursor.
export default function SeriesList({ series }) {
  const [active, setActive] = useState(null);
  const floatRef = useRef(null);

  const onMove = (event) => {
    if (event.pointerType !== "mouse" || !floatRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    floatRef.current.style.transform = `translate3d(${event.clientX - rect.left}px, ${event.clientY - rect.top}px, 0)`;
  };

  return (
    <div
      className="relative"
      onPointerMove={onMove}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-b-[1.5px] border-line">
        {series.map((item, index) => (
          <li key={item.id}>
            <Link
              href={`/works/${item.slug}`}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActive(index);
              }}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              className={`group grid grid-cols-12 items-center gap-x-4 border-t-[1.5px] border-line py-6 transition-[opacity,padding,color] duration-500 ease-kiln sm:py-8 ${
                active !== null && active !== index ? "opacity-35" : "opacity-100"
              } ${active === index ? "text-clay md:pl-6" : ""}`}
            >
              <span className="label col-span-2 text-clay sm:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="col-span-10 font-display text-4xl leading-none sm:col-span-6 sm:text-5xl lg:text-6xl">
                {item.title}
              </span>
              <span className="label col-span-6 col-start-3 mt-3 text-stone sm:col-span-3 sm:col-start-auto sm:mt-0">
                {item.years}
              </span>
              <span className="label col-span-4 mt-3 flex items-center justify-end gap-3 text-stone sm:col-span-2 sm:mt-0">
                <span className="hidden lg:inline">
                  {item.works.length} {item.works.length === 1 ? "work" : "works"}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-block text-base text-ink transition-transform duration-500 ease-kiln group-hover:translate-x-2"
                >
                  →
                </span>
              </span>

              {/* Touch screens have no cursor to follow, so show the cover inline. */}
              {item.cover && (
                <span className="col-span-10 col-start-3 mt-5 block aspect-[16/10] overflow-hidden bg-paper-deep md:hidden">
                  <WorkImage
                    src={item.cover}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={floatRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 hidden transition-transform duration-500 ease-kiln will-change-transform md:block"
      >
        <div
          className={`relative ml-10 aspect-[4/5] w-64 -translate-y-1/2 overflow-hidden bg-paper-deep shadow-2xl shadow-ink/20 transition-all duration-500 ease-kiln lg:w-80 ${
            active === null ? "rotate-6 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        >
          {series.map(
            (item, index) =>
              item.cover && (
                <WorkImage
                  key={item.id}
                  src={item.cover}
                  alt=""
                  eager
                  className={`absolute inset-0 h-full w-full object-cover !transition-opacity !duration-500 ${
                    active === index ? "!opacity-100" : "!opacity-0"
                  }`}
                />
              ),
          )}
        </div>
      </div>
    </div>
  );
}

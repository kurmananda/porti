"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import WorkImage from "./WorkImage";

export default function Gallery({ works }) {
  const [active, setActive] = useState(null);
  const dialogRef = useRef(null);
  const touchX = useRef(null);
  const work = active === null ? null : works[active];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (work && !dialog.open) dialog.showModal();
    if (!work && dialog.open) dialog.close();
  }, [work]);

  const step = (direction) =>
    setActive((index) => (index + direction + works.length) % works.length);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  return (
    <>
      <ul className="grid items-start gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
        {works.map((item, index) => (
          <li key={item.id}>
            <Reveal delay={(index % 3) * 90}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View ${item.title}`}
                className="group block w-full cursor-zoom-in text-left"
              >
                <span className="relative block min-h-40 overflow-hidden bg-paper-deep">
                  <WorkImage
                    src={item.image}
                    alt={item.title}
                    className="block h-auto w-full group-hover:scale-[1.04]"
                  />
                  <span className="label absolute bottom-4 left-4 translate-y-3 rounded-full bg-clay px-4 py-2 text-paper opacity-0 transition-all duration-500 ease-kiln group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    View
                  </span>
                </span>
                <span className="mt-4 flex items-baseline gap-4">
                  <span className="label text-clay">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-2xl transition-colors duration-300 group-hover:text-clay sm:text-[1.75rem]">
                      {item.title}
                    </span>
                    {item.description && (
                      <span className="mt-1 block text-base text-stone">
                        {item.description}
                      </span>
                    )}
                  </span>
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={work?.title}
        onClose={() => setActive(null)}
        onKeyDown={onKeyDown}
        onTouchStart={(event) => {
          touchX.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          const delta = event.changedTouches[0].clientX - touchX.current;
          if (Math.abs(delta) > 60) step(delta < 0 ? 1 : -1);
        }}
      >
        {work && (
          <div className="grid h-full grid-rows-[auto_1fr_auto] lg:grid-cols-[1fr_24rem] lg:grid-rows-[auto_1fr]">
            <div className="flex items-center justify-between px-5 py-4 sm:px-8 lg:col-span-2">
              <span className="label text-paper/80">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(works.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="label link-draw py-2"
              >
                Close
              </button>
            </div>

            <div
              className="relative min-h-0 cursor-zoom-out px-5 pb-4 sm:px-8 lg:pb-8"
              onClick={() => setActive(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={work.id}
                src={work.image}
                alt={work.title}
                className="lightbox-image h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-6 border-t border-paper/15 px-5 py-6 sm:px-8 lg:border-l lg:border-t-0 lg:py-8">
              <div key={work.id} className="page-enter">
                <h2 className="font-display text-3xl sm:text-4xl">{work.title}</h2>
                {work.description && (
                  <p className="mt-4 max-h-32 overflow-y-auto whitespace-pre-line text-lg leading-relaxed text-paper/85 lg:max-h-none">
                    {work.description}
                  </p>
                )}
              </div>
              {works.length > 1 && (
                <div className="mt-auto flex gap-3">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous work"
                    className="h-14 flex-1 rounded-full border-[1.5px] border-paper/40 text-lg transition-colors duration-300 hover:border-clay hover:bg-clay"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next work"
                    className="h-14 flex-1 rounded-full border-[1.5px] border-paper/40 text-lg transition-colors duration-300 hover:border-clay hover:bg-clay"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

"use client";

import { useState } from "react";
import Gallery from "./Gallery";

// Every work in one grid, narrowed by series with the chips above it.
export default function WorksExplorer({ series }) {
  const [filter, setFilter] = useState("all");
  const works = series
    .filter((item) => filter === "all" || item.id === filter)
    .flatMap((item) => item.works);
  const chip = (id, label) => (
    <button
      key={id}
      type="button"
      aria-pressed={filter === id}
      onClick={() => setFilter(id)}
      className={`label rounded-full border-[1.5px] px-4 py-2.5 transition-colors duration-300 ${
        filter === id
          ? "border-clay bg-clay text-paper"
          : "border-ink/40 hover:border-ink hover:bg-ink hover:text-paper"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div role="group" aria-label="Filter works by series" className="flex flex-wrap gap-2.5">
        {chip("all", "All artwork")}
        {series.map((item) => chip(item.id, item.title))}
      </div>
      {/* Re-keyed so the grid replays its reveal when the filter changes. */}
      <div key={filter} className="page-enter mt-12">
        <Gallery works={works} />
      </div>
    </div>
  );
}

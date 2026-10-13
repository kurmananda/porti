// A small set of hand-drawn line icons. Shapes carry pathLength="1" so the
// .icon-draw class can animate them being drawn.

// One continuous outline of a jar: rim, shoulders, belly, foot.
export const VESSEL_PATH =
  "M18 7h12M19.5 7c0 5-9.5 9-9.5 19.5 0 8 6 14.5 14 14.5s14-6.5 14-14.5c0-10.5-9.5-14.5-9.5-19.5M18.5 41.5h11";

const SHAPES = {
  vessel: [VESSEL_PATH],
  wheel: [
    "M15 20c0 6 4 10 9 10s9-4 9-10z",
    "M5 34c0-2.2 8.5-4 19-4s19 1.8 19 4-8.5 4-19 4-19-1.8-19-4z",
    "M24 38v6M15 44h18",
  ],
  trim: [
    "M8 40l17-17",
    "M25 23c-3-5 0-12 6-13s11 5 9 11-9 7-15 2z",
    "M12 14c3-1 6 1 6 4s-3 4-5 3",
  ],
  glaze: [
    "M15 9h18M17 9c-4 6-6 12-6 18 0 8 5 14 13 14s13-6 13-14c0-6-2-12-6-18",
    "M12 23c3 1 3 7 6 7s2-5 5-5 3 9 6 9 2-8 7-11",
  ],
  kiln: [
    "M9 42V23c0-8.5 6.5-15 15-15s15 6.5 15 15v19z",
    "M24 38c-3.5 0-5.5-2.3-5.5-5 0-4 5-5.5 5-11 3 3.5 6 6.5 6 11 0 2.7-2 5-5.5 5z",
    "M5 42h38",
  ],
};

export default function Icon({ name, className = "", draw = false, strokeWidth = 1.4 }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${draw ? "icon-draw" : ""} ${className}`}
    >
      {SHAPES[name].map((d) => (
        <path key={d} d={d} pathLength="1" />
      ))}
    </svg>
  );
}

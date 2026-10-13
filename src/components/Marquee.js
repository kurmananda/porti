import Icon from "./Icons";

// An endlessly sliding band of words. The list is rendered twice so the loop
// has no seam; the second copy is hidden from assistive tech.
export default function Marquee({ items }) {
  const run = (hidden) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {[...items, ...items].map((item, index) => (
        <li key={index} className="flex items-center">
          <span className="px-6 font-display text-3xl italic sm:px-10 sm:text-5xl">
            {item}
          </span>
          <Icon name="vessel" className="h-7 w-7 opacity-70 sm:h-9 sm:w-9" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden bg-clay py-5 text-paper sm:py-7">
      <div className="marquee-track flex w-max">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}

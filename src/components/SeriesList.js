import Link from "next/link";
import Reveal from "./Reveal";
import WorkImage from "./WorkImage";

// Series covers and titles remain visible without relying on hover.
export default function SeriesList({ series }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
      {series.map((item, index) => (
        <Reveal
          as="li"
          key={item.id}
          delay={(index % 3) * 100}
        >
          <Link href={`/works/${item.slug}`} className="group block">
            <div className="aspect-[4/5] overflow-hidden bg-paper-deep">
              {item.cover && (
                <WorkImage
                  src={item.cover}
                  alt=""
                  className="h-full w-full object-cover group-hover:scale-105"
                />
              )}
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl transition-colors duration-300 group-hover:text-clay sm:text-2xl">
                {item.title}
              </h3>
              <span aria-hidden="true" className="text-stone transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

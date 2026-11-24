import Link from "next/link";
import Reveal from "./Reveal";
import WorkImage from "./WorkImage";

// Series covers and titles remain visible without relying on hover.
export default function SeriesList({ series }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-7 min-[420px]:grid-cols-3 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
      {series.map((item, index) => (
        <Reveal
          as="li"
          key={item.id}
          delay={(index % 4) * 100}
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
            <div className="mt-3 flex items-baseline justify-between gap-2 sm:mt-4 sm:gap-4">
              <h3 className="font-display text-base transition-colors duration-300 group-hover:text-clay sm:text-xl">
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

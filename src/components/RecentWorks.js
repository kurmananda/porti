import Link from "next/link";
import Reveal from "./Reveal";
import WorkImage from "./WorkImage";

// The newest works as a block of tiles: one large, the rest around it.
export default function RecentWorks({ works }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {works.map((work, index) => (
        <Reveal
          as="li"
          key={work.id}
          delay={index * 90}
          className={index === 0 ? "col-span-2 row-span-2" : ""}
        >
          <Link
            href={`/works/${work.seriesSlug}`}
            className="group relative block aspect-square overflow-hidden bg-ink text-paper"
          >
            <WorkImage
              src={work.image}
              alt={work.title}
              className="h-full w-full object-cover group-hover:scale-[1.07]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="label absolute left-3 top-3 rounded-full bg-paper px-3 py-1.5 text-ink transition-colors duration-300 group-hover:bg-clay group-hover:text-paper sm:left-4 sm:top-4">
              {index === 0 ? "Newest" : work.seriesTitle}
            </span>
            <span className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
              <span
                className={`block font-display leading-tight ${
                  index === 0 ? "text-3xl sm:text-5xl" : "text-xl sm:text-2xl"
                }`}
              >
                {work.title}
              </span>
              {/* The detail line slides open on hover. */}
              <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-kiln group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                <span className="overflow-hidden">
                  <span className="mt-2 block text-base text-paper/90">
                    {index === 0 ? `${work.seriesTitle} — ` : ""}
                    {work.description}
                  </span>
                  <span className="label mt-3 inline-block text-glaze-light">
                    View series →
                  </span>
                </span>
              </span>
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

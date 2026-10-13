import Link from "next/link";
import Reveal from "@/components/Reveal";
import WorkImage from "@/components/WorkImage";
import WorksExplorer from "@/components/WorksExplorer";
import { getPortfolio } from "@/lib/data";

export const metadata = { title: "Works" };

export default async function WorksPage() {
  const portfolio = await getPortfolio();
  const workCount = portfolio.reduce((count, series) => count + series.works.length, 0);

  return (
    <div className="mx-auto max-w-[1500px] px-5 pt-32 sm:px-10 sm:pt-44">
      <header className="mb-14 flex flex-wrap items-end justify-between gap-6 sm:mb-20">
        <div>
          <p className="label text-clay">The archive</p>
          <h1 className="mt-4 font-display text-6xl leading-none sm:text-8xl">
            Works <em className="text-clay">&amp;</em> series
          </h1>
        </div>
        <p className="label rounded-full border-[1.5px] border-ink/40 px-4 py-2.5">
          {portfolio.length} series · {workCount} works
        </p>
      </header>

      {portfolio.length === 0 && (
        <p className="font-display text-3xl text-stone">New work is on its way.</p>
      )}

      <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-20">
        {portfolio.map((series, index) => (
          <Reveal
            as="li"
            key={series.id}
            delay={(index % 3) * 110}
            className={index % 3 === 1 ? "lg:mt-20" : ""}
          >
            <Link href={`/works/${series.slug}`} className="group block">
              <Reveal
                variant="clip"
                delay={(index % 3) * 110}
                className="relative aspect-[4/5] overflow-hidden bg-paper-deep"
              >
                {series.cover && (
                  <WorkImage
                    src={series.cover}
                    alt=""
                    className="h-full w-full object-cover group-hover:scale-105"
                  />
                )}
              </Reveal>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl transition-colors duration-300 group-hover:text-clay sm:text-4xl">
                    {series.title}
                  </h2>
                  <p className="label mt-2 text-stone">
                    {String(index + 1).padStart(2, "0")} · {series.years}
                  </p>
                </div>
                <span className="label mt-1 shrink-0 rounded-full bg-ink px-3 py-1.5 text-paper transition-colors duration-300 group-hover:bg-clay">
                  {series.works.length} {series.works.length === 1 ? "work" : "works"}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      {workCount > 0 && (
        <section
          id="all-works"
          className="mt-28 scroll-mt-24 border-t-[1.5px] border-line pt-16 sm:mt-40"
        >
          <Reveal className="mb-10">
            <p className="label text-clay">Everything, piece by piece</p>
            <h2 className="mt-4 font-display text-5xl leading-none sm:text-7xl">
              All <em className="text-clay">works</em>
            </h2>
          </Reveal>
          <WorksExplorer series={portfolio} />
        </section>
      )}
    </div>
  );
}

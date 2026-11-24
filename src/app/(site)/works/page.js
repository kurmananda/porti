import Link from "next/link";
import Reveal from "@/components/Reveal";
import WorkImage from "@/components/WorkImage";
import WorksExplorer from "@/components/WorksExplorer";
import { getPortfolio } from "@/lib/data";

export const metadata = { title: "Series" };

export default async function WorksPage() {
  const portfolio = await getPortfolio();

  return (
    <div className="mx-auto max-w-[1500px] px-5 pt-32 sm:px-10 sm:pt-44">
      <header className="mb-10 sm:mb-14">
        <div>
          <p className="label text-stone">Series</p>
          <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
            Series
          </h1>
        </div>
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
                  <h2 className="font-display text-xl transition-colors duration-300 group-hover:text-clay sm:text-2xl">
                    {series.title}
                  </h2>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      {portfolio.some((series) => series.works.length > 0) && (
        <section
          id="all-works"
          className="mt-28 scroll-mt-24 border-t-[1.5px] border-line pt-16 sm:mt-40"
        >
          <Reveal className="mb-10">
            <h2 className="label text-stone">All artwork</h2>
          </Reveal>
          <WorksExplorer series={portfolio} />
        </section>
      )}
    </div>
  );
}

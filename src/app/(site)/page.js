import Link from "next/link";
import Reveal from "@/components/Reveal";
import SeriesList from "@/components/SeriesList";
import Tilt from "@/components/Tilt";
import RecentWorks from "@/components/RecentWorks";
import WorkImage from "@/components/WorkImage";
import { getPortfolio, getSite, recentSeries, recentWorks } from "@/lib/data";

function Words({ text, from = 0 }) {
  return text.split(" ").map((word, index) => (
    <span key={index} className="word" style={{ "--i": from + index }}>
      <span>{word}&nbsp;</span>
    </span>
  ));
}

// How many series and works the home page shows before "more".
const HOME_LIMIT = 5;

export default async function Home() {
  const [portfolio, site] = await Promise.all([getPortfolio(), getSite()]);
  const [lead, second] = site.statements;
  const workCount = portfolio.reduce((count, series) => count + series.works.length, 0);
  const latestSeries = recentSeries(portfolio, HOME_LIMIT);
  const latestWorks = recentWorks(portfolio, HOME_LIMIT);
  return (
    <>
      <section className="mx-auto grid max-w-[1500px] grid-cols-12 items-center gap-x-6 px-5 pb-16 pt-28 sm:px-10 sm:pt-32 lg:min-h-[85svh] lg:pb-20">
        <div className="col-span-12 flex flex-col lg:col-span-7">
          <p className="label mb-6 text-stone">
            {site.tagline}
          </p>
          <h1 className="font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            <Words text={lead} />
          </h1>
          {second && (
            <p className="mt-8 max-w-xl text-base leading-relaxed text-stone sm:text-lg">
              {second}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/works"
              className="btn label"
              style={{ "--btn-fill": "var(--clay)" }}
            >
              View the series <span className="arrow">→</span>
            </Link>
            <Link href="/about" className="btn label">
              About the studio
            </Link>
          </div>
        </div>

        {latestWorks[0] && (
          <div className="relative col-span-12 mt-12 flex justify-center lg:col-span-5 lg:col-start-8 lg:mt-4 lg:justify-end">
            <Tilt className="w-[min(100%,26rem,56svh)]">
              <Link
                href={`/works/${latestWorks[0].seriesSlug}`}
                className="group block w-[min(100%,26rem,56svh)]"
                aria-label={`View ${latestWorks[0].title}`}
              >
                <Reveal
                  variant="clip"
                  delay={500}
                  className="relative aspect-[4/5] w-[min(100%,26rem,56svh)] overflow-hidden bg-paper-deep"
                >
                  <WorkImage
                    src={latestWorks[0].image}
                    alt={latestWorks[0].title}
                    eager
                    className="h-full w-full object-cover group-hover:scale-105"
                  />
                </Reveal>
                <div className="label mt-3 flex justify-between gap-4 text-stone">
                  <span>{latestWorks[0].title}</span>
                  <span>{latestWorks[0].seriesTitle}</span>
                </div>
              </Link>
            </Tilt>
          </div>
        )}
      </section>

      <section
        id="series"
        className="mx-auto max-w-[1500px] scroll-mt-24 px-5 pt-24 sm:px-10 sm:pt-36"
      >
        <Reveal className="mb-8">
          <h2 className="label text-stone">Series</h2>
        </Reveal>
        {portfolio.length > 0 ? (
          <>
            <SeriesList series={latestSeries} />
            {portfolio.length > latestSeries.length && (
              <Reveal className="mt-10 flex justify-center">
                <Link
                  href="/works"
                  className="btn label"
                  style={{ "--btn-fill": "var(--clay)" }}
                >
                  More series{" "}
                  <span className="arrow">→</span>
                </Link>
              </Reveal>
            )}
          </>
        ) : (
          <p className="font-display text-3xl text-stone">New work is on its way.</p>
        )}
      </section>

      {latestWorks.length > 0 && (
        <section className="mt-20 bg-paper-deep py-16 sm:mt-28 sm:py-20">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
            <Reveal className="mb-8">
              <div>
                <p className="label text-stone">Recent artwork</p>
              </div>
            </Reveal>
            <RecentWorks works={latestWorks} />
            {workCount > latestWorks.length && (
              <Reveal className="mt-10 flex justify-center">
                <Link
                  href="/works#all-works"
                  className="btn label"
                  style={{ "--btn-fill": "var(--clay)" }}
                >
                  More series{" "}
                  <span className="arrow">→</span>
                </Link>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-10 sm:py-36">
          <Reveal className="grid grid-cols-12 gap-x-6">
            <p className="label col-span-12 text-stone lg:col-span-3">
              How a piece is made
            </p>
            <h2 className="col-span-12 mt-4 font-display text-3xl leading-[1.12] sm:text-4xl lg:col-span-9 lg:mt-0">
              A closer look at the{" "}
              <em className="text-stone">making of each piece.</em>
            </h2>
          </Reveal>
          <Reveal variant="clip" className="mt-12 overflow-hidden bg-ink sm:mt-16">
            <video
              controls
              playsInline
              preload="none"
              poster={latestWorks[0]?.image}
              className="aspect-video w-full object-cover"
            >
              <source
                src="/videos/how-a-piece-is-made.mp4"
                type="video/mp4"
              />
              Your browser does not support embedded videos.
            </video>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 pt-24 sm:px-10 sm:pt-36">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <Reveal className="col-span-12 lg:col-span-3">
            <p className="label text-clay">The studio</p>
          </Reveal>
          <Reveal delay={120} className="col-span-12 lg:col-span-9">
            <p className="font-display text-2xl leading-[1.25] sm:text-3xl">
              {site.about[1] ?? site.about[0]}
            </p>
            <Link href="/about" className="btn label mt-10">
              About {site.name.split(" ")[0]} <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

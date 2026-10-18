import Link from "next/link";
import Icon from "@/components/Icons";
import Reveal from "@/components/Reveal";
import SeriesList from "@/components/SeriesList";
import Tilt from "@/components/Tilt";
import Portrait from "@/components/Portrait";
import RecentWorks from "@/components/RecentWorks";
import { getPortfolio, getSite, recentSeries, recentWorks } from "@/lib/data";
import { making } from "@/lib/site";

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
              View the works <span className="arrow">→</span>
            </Link>
            <Link href="/about" className="btn label">
              About the studio
            </Link>
          </div>
        </div>

        <div className="relative col-span-12 mt-12 flex justify-center lg:col-span-5 lg:col-start-8 lg:mt-4 lg:justify-end">
          <Tilt className="w-[min(100%,26rem,56svh)]">
            <Link
              href="/about"
              className="group block w-[min(100%,26rem,56svh)]"
              aria-label={`About ${site.name}`}
            >
              <Reveal
                variant="clip"
                delay={500}
                className="relative aspect-[4/5] w-[min(100%,26rem,56svh)] overflow-hidden bg-paper-deep"
              >
                <div className="relative h-full w-full">
                  <Portrait
                    src={site.portrait}
                    name={site.name}
                    eager
                    className="group-hover:scale-105"
                  />
                  <span className="absolute inset-y-0 right-0 flex w-12 items-center justify-center border-l border-ink/15 bg-paper/65 text-ink backdrop-blur-sm transition-colors duration-500 group-hover:bg-paper/80">
                    <span className="label rotate-180 [writing-mode:vertical-rl]">
                      About {site.name.split(" ")[0]}
                    </span>
                  </span>
                </div>
              </Reveal>
              <div className="label mt-3 text-right text-stone">
                {site.location}
              </div>
            </Link>
          </Tilt>
        </div>
      </section>

      <section
        id="series"
        className="mx-auto max-w-[1500px] scroll-mt-24 px-5 pt-24 sm:px-10 sm:pt-36"
      >
        <Reveal className="mb-8">
          <h2 className="label text-stone">Artwork</h2>
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
                  More artwork{" "}
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
                  More artwork{" "}
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
              Made by hand, with{" "}
              <em className="text-stone">meticulous attention</em> to detail.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {making.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 140}>
                <div className="rule mb-8" />
                <Icon name={step.icon} draw className="h-12 w-12 text-glaze-light" />
                <h3 className="mt-6 flex items-baseline gap-3 font-display text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base text-stone">{step.text}</p>
              </Reveal>
            ))}
          </ol>
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

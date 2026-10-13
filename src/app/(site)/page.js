import Link from "next/link";
import Badge from "@/components/Badge";
import CountUp from "@/components/CountUp";
import Icon from "@/components/Icons";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SeriesList from "@/components/SeriesList";
import Tilt from "@/components/Tilt";
import Portrait from "@/components/Portrait";
import RecentWorks from "@/components/RecentWorks";
import { getPortfolio, getSite, recentSeries, recentWorks } from "@/lib/data";
import { making, marquee } from "@/lib/site";

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
  const facts = [
    { value: workCount, label: "Works in the archive" },
    { value: portfolio.length, label: "Series so far" },
    { value: site.exhibitions.length, label: "Selected exhibitions" },
  ];

  return (
    <>
      <section className="mx-auto grid max-w-[1500px] grid-cols-12 gap-x-6 px-5 pb-20 pt-32 sm:px-10 sm:pt-40 lg:min-h-svh lg:pb-24">
        <div className="col-span-12 flex flex-col lg:col-span-7">
          <p className="label mb-8 flex items-center gap-3 text-clay">
            <span className="h-2.5 w-2.5 rounded-full bg-clay" />
            {site.tagline}
          </p>
          <h1 className="font-display text-[clamp(2.75rem,5.9vw,6rem)] leading-[1.03]">
            <Words text={lead} />
          </h1>
          {second && (
            <p className="mt-10 max-w-xl text-xl leading-relaxed text-stone sm:text-2xl">
              {second}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/works"
              className="btn label bg-ink text-paper"
              style={{ "--btn-fill": "var(--clay)" }}
            >
              View the works <span className="arrow">→</span>
            </Link>
            <Link href="/about" className="btn label">
              About the studio
            </Link>
          </div>
          <a
            href="#series"
            className="label group mt-14 hidden items-center gap-4 self-start lg:mt-auto lg:inline-flex"
          >
            <span className="relative block h-14 w-0.5 overflow-hidden bg-line">
              <span className="scroll-cue absolute inset-0 bg-clay" />
            </span>
            <span className="link-draw">Scroll</span>
          </a>
        </div>

        <div className="relative col-span-12 mt-14 self-start lg:col-span-5 lg:col-start-8 lg:mt-4">
          <Tilt>
            <Link href="/about" className="group block" aria-label={`About ${site.name}`}>
              <Reveal
                variant="clip"
                delay={500}
                className="relative aspect-[4/5] overflow-hidden bg-paper-deep"
              >
                <Portrait
                  src={site.portrait}
                  name={site.name}
                  eager
                  className="group-hover:scale-105"
                />
              </Reveal>
              <div className="label mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1 text-stone">
                <span>{site.location}</span>
                <span className="text-ink transition-transform duration-500 ease-kiln group-hover:translate-x-1">
                  About {site.name.split(" ")[0]} →
                </span>
              </div>
            </Link>
          </Tilt>
          <Badge
            text={`${site.discipline} · Handmade`}
            className="absolute -left-6 bottom-24 hidden sm:block lg:-left-16"
          />
        </div>
      </section>

      <Marquee items={marquee} />

      <section
        id="series"
        className="mx-auto max-w-[1500px] scroll-mt-24 px-5 pt-24 sm:px-10 sm:pt-36"
      >
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-clay">Recent series</p>
            <h2 className="mt-4 font-display text-5xl leading-none sm:text-7xl">
              Bodies of <em className="text-clay">work</em>
            </h2>
          </div>
          <p className="label text-stone">
            Showing {latestSeries.length} of {portfolio.length}
          </p>
        </Reveal>
        {portfolio.length > 0 ? (
          <>
            <SeriesList series={latestSeries} />
            {portfolio.length > latestSeries.length && (
              <Reveal className="mt-10 flex justify-center">
                <Link
                  href="/works"
                  className="btn label bg-ink text-paper"
                  style={{ "--btn-fill": "var(--clay)" }}
                >
                  More series ({portfolio.length - latestSeries.length}){" "}
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
        <section className="mt-24 bg-paper-deep py-20 sm:mt-36 sm:py-28">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
            <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="label text-clay">Fresh from the kiln</p>
                <h2 className="mt-4 font-display text-5xl leading-none sm:text-7xl">
                  Recent <em className="text-clay">works</em>
                </h2>
              </div>
              <p className="label text-stone">
                Showing {latestWorks.length} of {workCount}
              </p>
            </Reveal>
            <RecentWorks works={latestWorks} />
            {workCount > latestWorks.length && (
              <Reveal className="mt-10 flex justify-center">
                <Link
                  href="/works#all-works"
                  className="btn label bg-ink text-paper"
                  style={{ "--btn-fill": "var(--clay)" }}
                >
                  More works ({workCount - latestWorks.length}){" "}
                  <span className="arrow">→</span>
                </Link>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <section className="bg-glaze text-paper">
        <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-10 sm:py-36">
          <Reveal className="grid grid-cols-12 gap-x-6">
            <p className="label col-span-12 text-glaze-light lg:col-span-3">
              How a piece is made
            </p>
            <h2 className="col-span-12 mt-4 font-display text-4xl leading-[1.08] sm:text-6xl lg:col-span-9 lg:mt-0">
              Made by hand, with{" "}
              <em className="text-glaze-light">meticulous attention</em> to detail.
            </h2>
          </Reveal>
          <ol className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {making.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 140}>
                <div className="rule mb-8" />
                <Icon name={step.icon} draw className="h-16 w-16 text-glaze-light" />
                <h3 className="mt-6 flex items-baseline gap-3 font-display text-3xl">
                  <span className="label text-glaze-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-3 text-lg text-paper/90">{step.text}</p>
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
            <p className="font-display text-3xl leading-[1.18] sm:text-5xl">
              {site.about[1] ?? site.about[0]}
            </p>
            <Link href="/about" className="btn label mt-10">
              About {site.name.split(" ")[0]} <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>

        <dl className="mt-20 grid grid-cols-1 gap-x-6 gap-y-12 sm:mt-28 sm:grid-cols-3">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 100}>
              <div className="rule mb-6" />
              <dd className="font-display text-6xl leading-none text-clay sm:text-7xl">
                <CountUp value={fact.value} suffix={fact.suffix} />
              </dd>
              <dt className="label mt-4 text-stone">{fact.label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>
    </>
  );
}

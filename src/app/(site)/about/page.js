import Link from "next/link";
import Icon from "@/components/Icons";
import Portrait from "@/components/Portrait";
import Reveal from "@/components/Reveal";
import { getSite } from "@/lib/data";
import { CV_PATH, making } from "@/lib/site";

export const metadata = { title: "About" };

// A titled list of dated entries (exhibitions, education, press).
function Timeline({ title, entries }) {
  if (entries.length === 0) return null;
  return (
    <Reveal as="section" className="grid grid-cols-12 gap-x-6 gap-y-6">
      <h2 className="col-span-12 font-display text-3xl sm:text-4xl lg:col-span-4">
        {title}
        <span className="label ml-3 align-middle text-clay">
          {String(entries.length).padStart(2, "0")}
        </span>
      </h2>
      <ul className="col-span-12 border-b-[1.5px] border-line lg:col-span-8">
        {entries.map((entry) => (
          <li
            key={entry.year + entry.text}
            className="flex gap-6 border-t-[1.5px] border-line py-4 text-lg transition-[padding] duration-500 ease-kiln hover:pl-3 sm:gap-10"
          >
            <span className="w-20 shrink-0 font-display text-xl text-clay">
              {entry.year}
            </span>
            <span>{entry.text}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function PlainList({ title, items }) {
  if (items.length === 0) return null;
  return (
    <Reveal>
      <h2 className="label text-glaze-light">{title}</h2>
      <ul className="mt-5 space-y-3 text-lg">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default async function AboutPage() {
  const site = await getSite();
  const [lead, ...rest] = site.about;

  return (
    <>
      <div className="mx-auto max-w-[1500px] px-5 pt-32 sm:px-10 sm:pt-44">
        <p className="label text-clay">About — {site.tagline}</p>
        <h1 className="mt-6 max-w-5xl font-display text-4xl leading-[1.1] sm:text-6xl">
          {lead}
        </h1>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-14 sm:mt-24">
          <div className="col-span-12 sm:col-span-6 lg:col-span-5">
            <Reveal variant="clip" className="aspect-[4/5] overflow-hidden bg-paper-deep">
              <Portrait src={site.portrait} name={site.name} />
            </Reveal>
            <div className="label mt-5 space-y-2 text-stone">
              {site.born && <p>{site.born}</p>}
              {site.location && <p>{site.location}</p>}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-6 lg:col-start-7">
            <div className="space-y-6 text-xl leading-relaxed">
              {rest.map((paragraph, index) => (
                <Reveal as="p" key={index} delay={index * 100}>
                  {paragraph}
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/works"
                className="btn label bg-ink text-paper"
                style={{ "--btn-fill": "var(--clay)" }}
              >
                View the works <span className="arrow">→</span>
              </Link>
              <Link href="/contact" className="btn label">
                Get in touch
              </Link>
              <a href={CV_PATH} target="_blank" rel="noopener noreferrer" className="btn label">
                CV <span className="arrow">↓</span>
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-28 space-y-20 sm:mt-40 sm:space-y-28">
          <Timeline title="Selected exhibitions" entries={site.exhibitions} />
          <Timeline title="Education & training" entries={site.education} />
          <Timeline title="Selected press" entries={site.press} />
        </div>
      </div>

      {(site.collections.length > 0 || site.memberships.length > 0) && (
        <section className="mt-28 bg-glaze text-paper sm:mt-40">
          <div className="mx-auto grid max-w-[1500px] gap-x-12 gap-y-14 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-2">
            <PlainList title="Collections" items={site.collections} />
            <PlainList title="Memberships & community" items={site.memberships} />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1500px] px-5 pt-24 sm:px-10 sm:pt-36">
        <Reveal>
          <p className="label text-clay">In the studio</p>
          <h2 className="mt-4 font-display text-5xl leading-none sm:text-7xl">
            From clay <em className="text-clay">to kiln</em>
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {making.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 120}>
              <div className="rule mb-7" />
              <Icon name={step.icon} draw className="h-14 w-14 text-clay" />
              <h3 className="mt-5 font-display text-3xl">{step.title}</h3>
              <p className="mt-2 text-lg text-stone">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}

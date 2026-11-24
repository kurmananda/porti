import Link from "next/link";
import Icon from "@/components/Icons";
import Portrait from "@/components/Portrait";
import Reveal from "@/components/Reveal";
import { getSite } from "@/lib/data";
import { CV_PATH } from "@/lib/site";

export const metadata = { title: "About" };

// A titled list of entries such as education or press.
function Timeline({ title, entries }) {
  if (entries.length === 0) return null;
  return (
    <Reveal as="section" className="grid grid-cols-12 gap-x-6 gap-y-6">
      <h2 className="col-span-12 font-display text-2xl lg:col-span-4">
        {title}
      </h2>
      <ul className="col-span-12 border-b-[1.5px] border-line lg:col-span-8">
        {entries.map((entry) => (
          <li
            key={entry.text}
            className="flex gap-6 border-t-[1.5px] border-line py-4 text-base transition-[padding] duration-500 ease-kiln hover:pl-3 sm:gap-10"
          >
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
        <h1 className="mt-6 max-w-5xl font-display text-3xl leading-[1.15] sm:text-4xl">
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
            <div className="space-y-5 text-base leading-relaxed sm:text-lg">
              {rest.map((paragraph, index) => (
                <Reveal as="p" key={index} delay={index * 100}>
                  {paragraph}
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/works"
                className="btn label"
                style={{ "--btn-fill": "var(--clay)" }}
              >
                View the series <span className="arrow">→</span>
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
          <Timeline title="Education & training" entries={site.education} />
          <Timeline title="Selected press" entries={site.press} />
        </div>
      </div>

      {(site.collections.length > 0 || site.memberships.length > 0) && (
        <section className="mt-24 bg-paper text-ink sm:mt-32">
          <div className="mx-auto grid max-w-[1500px] gap-x-12 gap-y-14 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-2">
            <PlainList title="Collections" items={site.collections} />
            <PlainList title="Memberships & community" items={site.memberships} />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1500px] px-5 pt-24 sm:px-10 sm:pt-36">
        <Reveal>
          <p className="label text-clay">In the studio</p>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">
            From clay to kiln
          </h2>
        </Reveal>
        <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {site.making.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 120}>
              <div className="rule mb-7" />
              <Icon name={step.icon} draw className="h-14 w-14 text-clay" />
              <h3 className="mt-4 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-base text-stone">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}

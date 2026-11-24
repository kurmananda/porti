import Link from "next/link";
import Icon from "./Icons";
import Reveal from "./Reveal";

export default function Footer({ site }) {
  return (
    <footer className="mt-24 bg-paper text-ink sm:mt-32">
      <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-20 sm:px-10 sm:pt-28">
        <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <p className="label text-stone">Enquiries &amp; commissions</p>
            <p className="mt-4 font-display text-2xl leading-tight sm:text-3xl">
              A piece for your table, <em className="text-stone">or a wall of them?</em>
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-draw mt-8 inline-block break-all text-xl sm:text-2xl"
            >
              {site.email}
            </a>
          </div>
          <div className="col-span-12 flex items-end lg:col-span-4 lg:justify-end">
            <Link
              href="/contact"
              className="btn label"
              style={{ "--btn-fill": "var(--ink)", "--btn-text": "var(--paper)" }}
            >
              Start a conversation <span className="arrow">→</span>
            </Link>
          </div>
          <div className="rule col-span-12 mt-6" />
        </Reveal>

        <div className="label mt-8 flex flex-col gap-5 text-stone sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <Icon name="kiln" className="h-5 w-5 text-stone" />
            {site.location}
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {site.socials.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/works" className="link-draw hover:text-ink">
                Series
              </Link>
            </li>
            <li>
              <Link href="/about" className="link-draw hover:text-ink">
                About
              </Link>
            </li>
            <li>
              <Link href="/admin" className="link-draw hover:text-ink">
                Admin
              </Link>
            </li>
          </ul>
          <p>© {site.name}</p>
        </div>
      </div>
    </footer>
  );
}

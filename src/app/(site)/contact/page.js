import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { getPortfolio, getSite } from "@/lib/data";
import { CV_PATH } from "@/lib/site";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const [site, portfolio] = await Promise.all([getSite(), getPortfolio()]);

  return (
    <div className="mx-auto max-w-[1500px] px-5 pt-32 sm:px-10 sm:pt-44">
      <p className="label text-clay">Contact</p>
      <h1 className="mt-6 max-w-5xl font-display text-4xl leading-[1.1] sm:text-6xl">
        For available work, commissions and exhibitions,{" "}
        <em className="text-clay">write to the studio.</em>
      </h1>

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-16 sm:mt-24">
        <Reveal className="col-span-12 lg:col-span-7">
          <ContactForm
            email={site.email}
            seriesTitles={portfolio.map((series) => series.title)}
          />
        </Reveal>

        <Reveal delay={150} className="col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="bg-glaze p-8 text-paper sm:p-10">
            <Icon name="wheel" draw className="h-14 w-14 text-glaze-light" />
            <dl className="mt-8 space-y-7">
              <div>
                <dt className="label text-glaze-light">Email</dt>
                <dd className="mt-2 break-all text-xl">
                  <a href={`mailto:${site.email}`} className="link-draw">
                    {site.email}
                  </a>
                </dd>
              </div>
              {site.socials.length > 0 && (
                <div>
                  <dt className="label text-glaze-light">Follow</dt>
                  <dd className="mt-3 flex flex-wrap gap-2.5">
                    {site.socials.map((item) => (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn label !py-2.5"
                        style={{ "--btn-fill": "var(--paper)", "--btn-text": "var(--glaze)" }}
                      >
                        {item.label} <span className="arrow">↗</span>
                      </a>
                    ))}
                  </dd>
                </div>
              )}
              <div>
                <dt className="label text-glaze-light">Studio</dt>
                <dd className="mt-2 text-xl">{site.location}</dd>
              </div>
              <div>
                <dt className="label text-glaze-light">Curriculum vitae</dt>
                <dd className="mt-3">
                  <a
                    href={CV_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn label !py-2.5"
                    style={{ "--btn-fill": "var(--paper)", "--btn-text": "var(--glaze)" }}
                  >
                    Download CV <span className="arrow">↓</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

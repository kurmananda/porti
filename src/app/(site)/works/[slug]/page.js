import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import WorkImage from "@/components/WorkImage";
import { getPortfolio, getSeriesBySlug } from "@/lib/data";

// Cache Components needs at least one param to validate the route, so an empty
// portfolio prerenders a placeholder slug that resolves to notFound().
export async function generateStaticParams() {
  const portfolio = await getPortfolio();
  return portfolio.length > 0
    ? portfolio.map((series) => ({ slug: series.slug }))
    : [{ slug: "untitled" }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const found = await getSeriesBySlug(slug);
  if (!found) return { title: "Works" };
  return {
    title: found.series.title,
    description: found.series.description || undefined,
  };
}

async function Series({ params }) {
  const { slug } = await params;
  const found = await getSeriesBySlug(slug);
  if (!found) notFound();
  const { series, next } = found;

  return (
    <>
      <header className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-8">
          <Link href="/works" className="label link-draw text-clay">
            ← All works
          </Link>
          <h1 className="mt-6 font-display text-3xl leading-tight sm:text-4xl">
            {series.title}
          </h1>
        </div>
      </header>

      {series.description && (
        <Reveal
          as="p"
          className="mt-10 max-w-4xl whitespace-pre-line font-display text-xl leading-relaxed sm:mt-14 sm:text-2xl"
        >
          {series.description}
        </Reveal>
      )}

      <div className="mt-20 sm:mt-28">
        {series.works.length > 0 ? (
          <Gallery works={series.works} />
        ) : (
          <p className="font-display text-3xl text-stone">
            Works from this series will appear here soon.
          </p>
        )}
      </div>

      {next && (
        <Reveal className="mt-24 border-t-[1.5px] border-line pt-10 sm:mt-40">
          <Link
            href={`/works/${next.slug}`}
            className="group flex items-center justify-between gap-8"
          >
            <span>
              <span className="label text-clay">Next series</span>
              <span className="mt-3 block font-display text-5xl transition-[transform,color] duration-700 ease-kiln group-hover:translate-x-4 group-hover:text-clay sm:text-8xl">
                {next.title} →
              </span>
            </span>
            {next.cover && (
              <span className="hidden aspect-[4/5] w-40 shrink-0 overflow-hidden bg-paper-deep sm:block lg:w-56">
                <WorkImage
                  src={next.cover}
                  alt=""
                  className="h-full w-full object-cover group-hover:scale-110"
                />
              </span>
            )}
          </Link>
        </Reveal>
      )}
    </>
  );
}

export default function SeriesPage({ params }) {
  return (
    <div className="mx-auto max-w-[1500px] px-5 pt-32 sm:px-10 sm:pt-44">
      <Suspense fallback={<div className="min-h-svh" />}>
        <Series params={params} />
      </Suspense>
    </div>
  );
}

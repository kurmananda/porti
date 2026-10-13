import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { site as defaults } from "./site";
import { readStore } from "./store";

export const PORTFOLIO_TAG = "portfolio";

// Series in display order, each with its works attached.
export async function getPortfolio() {
  "use cache";
  cacheLife("days");
  cacheTag(PORTFOLIO_TAG);

  return groupPortfolio(await readStore());
}

export function groupPortfolio({ series, works }) {
  return series.map((s) => {
    const own = works.filter((w) => w.seriesId === s.id);
    return { ...s, works: own, cover: own[0]?.image ?? null };
  });
}

// Artist details: the defaults in site.js with anything saved from the admin on top.
export async function getSite() {
  "use cache";
  cacheLife("days");
  cacheTag(PORTFOLIO_TAG);

  return mergeSite((await readStore()).site);
}

export function mergeSite(saved) {
  const site = { ...defaults, ...saved };
  // Sites saved before the socials list existed only have an Instagram link.
  if (!saved?.socials && saved?.instagram) {
    site.socials = [{ label: "Instagram", url: saved.instagram }];
  }
  return site;
}

export async function getSeriesBySlug(slug) {
  const portfolio = await getPortfolio();
  const index = portfolio.findIndex((s) => s.slug === slug);
  if (index === -1) return null;
  return {
    series: portfolio[index],
    index,
    total: portfolio.length,
    next: portfolio.length > 1 ? portfolio[(index + 1) % portfolio.length] : null,
  };
}

const newestFirst = (a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "");

// The most recently added series, newest first.
export function recentSeries(portfolio, limit) {
  return [...portfolio].sort(newestFirst).slice(0, limit);
}

// The most recently added works across every series, newest first.
export function recentWorks(portfolio, limit) {
  return portfolio
    .flatMap((series) =>
      series.works.map((work) => ({
        ...work,
        seriesSlug: series.slug,
        seriesTitle: series.title,
      })),
    )
    .sort(newestFirst)
    .slice(0, limit);
}

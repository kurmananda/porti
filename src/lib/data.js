import "server-only";
import { connection } from "next/server";
import { readPortfolio, readSite, readStore } from "./store";

// Series in display order, each with its works attached.
export async function getPortfolio() {
  await connection();
  const portfolio = await readPortfolio();
  return groupPortfolio(portfolio).map((series) => ({
    ...series,
    works: series.works.map((work) => ({
      ...work,
      title: work.title.replace(/\s+(?:VIII|VII|VI|V|IV|III|II|IX|X|I)$/i, ""),
      description: work.description
        ?.replace(/\s+\d+\s*[×x]\s*\d+\s*cm\.?/gi, "")
        .trim(),
    })),
  }));
}

export function groupPortfolio({ series, works }) {
  return series.map((s) => {
    const own = works.filter((w) => w.seriesId === s.id);
    return { ...s, works: own, cover: own[0]?.image ?? null };
  });
}

// Artist details are read directly from the Supabase site settings row.
export async function getSite() {
  await connection();
  return mergeSite(await readSite());
}

export function mergeSite(site) {
  if (!site || !Array.isArray(site.socials)) {
    throw new Error("Supabase site settings are missing or invalid.");
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

export function recentExhibitions(exhibitions) {
  return [...exhibitions].sort((a, b) => {
    const yearA = Number(a.year?.match(/\d{4}/)?.[0] ?? 0);
    const yearB = Number(b.year?.match(/\d{4}/)?.[0] ?? 0);
    return yearB - yearA;
  });
}

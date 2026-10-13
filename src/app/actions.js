"use server";

import { randomUUID } from "node:crypto";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endSession, isAdmin, isConfigured, startSession } from "@/lib/auth";
import { PORTFOLIO_TAG } from "@/lib/data";
import { mutateStore, slugify } from "@/lib/store";

const text = (formData, key, max) =>
  String(formData.get(key) ?? "").trim().slice(0, max);

function isImageLink(value) {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

function uniqueSlug(title, series, ownId) {
  const base = slugify(title) || "series";
  let slug = base;
  for (let n = 2; series.some((s) => s.slug === slug && s.id !== ownId); n++) {
    slug = `${base}-${n}`;
  }
  return slug;
}

export async function login(_prev, formData) {
  if (!isConfigured()) {
    return { error: "Set ADMIN_PASSWORD in .env.local and restart the server." };
  }
  if (!checkPassword(String(formData.get("password") ?? ""))) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "That password isn’t right." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function saveSeries(_prev, formData) {
  await requireAdmin();
  const id = text(formData, "id", 64);
  const title = text(formData, "title", 120);
  const years = text(formData, "years", 60);
  const description = text(formData, "description", 2000);
  if (!title) return { error: "Give the series a name." };

  const result = await mutateStore((data) => {
    if (id) {
      const series = data.series.find((s) => s.id === id);
      if (!series) return { error: "That series no longer exists." };
      Object.assign(series, {
        title,
        years,
        description,
        slug: uniqueSlug(title, data.series, id),
      });
      return { ok: true, id, message: `Saved “${title}”.` };
    }
    const series = {
      id: randomUUID(),
      slug: uniqueSlug(title, data.series),
      title,
      years,
      description,
      createdAt: new Date().toISOString(),
    };
    data.series.push(series);
    return { ok: true, id: series.id, message: `Created “${title}”.` };
  });

  updateTag(PORTFOLIO_TAG);
  return result;
}

export async function deleteSeries(id) {
  await requireAdmin();
  await mutateStore((data) => {
    data.series = data.series.filter((s) => s.id !== id);
    data.works = data.works.filter((w) => w.seriesId !== id);
  });
  updateTag(PORTFOLIO_TAG);
}

export async function saveWork(_prev, formData) {
  await requireAdmin();
  const id = text(formData, "id", 64);
  const seriesId = text(formData, "seriesId", 64);
  const title = text(formData, "title", 160);
  const image = text(formData, "image", 2000);
  const description = text(formData, "description", 2000);
  const values = { seriesId, title, image, description };

  if (!title) return { error: "Give the work a name.", values };
  if (!isImageLink(image)) {
    return { error: "The image link must start with http://, https:// or /.", values };
  }

  const result = await mutateStore((data) => {
    if (!data.series.some((s) => s.id === seriesId)) {
      return { error: "Choose a series for this work.", values };
    }
    if (id) {
      const work = data.works.find((w) => w.id === id);
      if (!work) return { error: "That work no longer exists.", values };
      Object.assign(work, values);
      return { ok: true, message: `Saved “${title}”.` };
    }
    data.works.push({
      id: randomUUID(),
      ...values,
      createdAt: new Date().toISOString(),
    });
    return { ok: true, message: `Added “${title}”.` };
  });

  updateTag(PORTFOLIO_TAG);
  return result;
}

export async function deleteWork(id) {
  await requireAdmin();
  await mutateStore((data) => {
    data.works = data.works.filter((w) => w.id !== id);
  });
  updateTag(PORTFOLIO_TAG);
}

// direction: -1 moves earlier, 1 moves later (within its series for works).
export async function moveItem(kind, id, direction) {
  await requireAdmin();
  await mutateStore((data) => {
    const list = kind === "series" ? data.series : data.works;
    const from = list.findIndex((item) => item.id === id);
    if (from === -1) return;
    let to = from + direction;
    if (kind === "work") {
      while (list[to] && list[to].seriesId !== list[from].seriesId) to += direction;
    }
    if (!list[to]) return;
    [list[from], list[to]] = [list[to], list[from]];
  });
  updateTag(PORTFOLIO_TAG);
}

const lines = (value) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

// "2024 | Something happened" becomes { year, text }.
const dated = (value) =>
  lines(value).map((line) => {
    const [year, ...rest] = line.split("|");
    return rest.length
      ? { year: year.trim(), text: rest.join("|").trim() }
      : { year: "", text: year.trim() };
  });

export async function saveSite(_prev, formData) {
  await requireAdmin();
  const name = text(formData, "name", 80);
  const email = text(formData, "email", 160);
  const socials = lines(text(formData, "socials", 2000)).map((line) => {
    const [label, ...rest] = line.split("|");
    return { label: label.trim(), url: rest.join("|").trim() };
  });
  const portrait = text(formData, "portrait", 2000);
  if (!name) return { error: "The artist name can’t be empty." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (socials.some((item) => !item.label || !/^https?:\/\//.test(item.url))) {
    return {
      error: "Write each social account as: Name | https://link (one per line).",
    };
  }
  if (portrait && !isImageLink(portrait)) {
    return { error: "The portrait link must start with http://, https:// or /." };
  }

  const site = {
    name,
    email,
    socials,
    portrait,
    discipline: text(formData, "discipline", 60),
    tagline: text(formData, "tagline", 160),
    born: text(formData, "born", 120),
    location: text(formData, "location", 120),
    statements: [
      text(formData, "statement1", 300),
      text(formData, "statement2", 300),
    ].filter(Boolean),
    about: lines(text(formData, "about", 6000)),
    education: dated(text(formData, "education", 4000)),
    exhibitions: dated(text(formData, "exhibitions", 6000)),
    press: dated(text(formData, "press", 4000)),
    collections: lines(text(formData, "collections", 3000)),
    memberships: lines(text(formData, "memberships", 3000)),
  };
  if (site.statements.length === 0) {
    return { error: "Write at least the first statement; it is the home page headline." };
  }

  await mutateStore((data) => {
    data.site = site;
  });
  updateTag(PORTFOLIO_TAG);
  return { ok: true, message: "Site details saved." };
}

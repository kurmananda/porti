import "server-only";

const SERIES_PATH = "/rest/v1/series";
const WORKS_PATH = "/rest/v1/works";
const SITE_PATH = "/rest/v1/site_settings";
const PORTFOLIO_RPC = "/rest/v1/rpc/replace_portfolio";

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url && !key) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY.",
    );
  }
  if (!url || !key) {
    throw new Error(
      "Set both SUPABASE_URL and SUPABASE_SECRET_KEY to connect to Supabase.",
    );
  }
  return { url, key };
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.SUPABASE_URL &&
      (process.env.SUPABASE_SECRET_KEY ||
        process.env.SUPABASE_SERVICE_ROLE_KEY),
  );
}

export async function supabaseRequest(path, options = {}) {
  const { url, key } = supabaseConfig();
  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Supabase request failed (${response.status}): ${details || response.statusText}`,
    );
  }

  if (response.status === 204) return null;
  const body = await response.text();
  return body ? JSON.parse(body) : null;
}

export async function readPortfolio() {
  const [series, works] = await Promise.all([
    supabaseRequest(
      `${SERIES_PATH}?select=id,slug,title,years,description,created_at,sort_order&order=sort_order.asc`,
    ),
    supabaseRequest(
      `${WORKS_PATH}?select=id,series_id,title,description,image,created_at,sort_order&order=sort_order.asc`,
    ),
  ]);

  return {
    series: series.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      years: item.years,
      description: item.description,
      createdAt: item.created_at,
      sortOrder: item.sort_order,
    })),
    works: works.map((item) => ({
      id: item.id,
      seriesId: item.series_id,
      title: item.title,
      description: item.description,
      image: item.image,
      createdAt: item.created_at,
      sortOrder: item.sort_order,
    })),
  };
}

export async function readSite() {
  const settings = await supabaseRequest(
    `${SITE_PATH}?select=settings&id=eq.1&limit=1`,
  );
  if (!settings[0]?.settings) {
    throw new Error(
      "No site settings found in Supabase. Run supabase/schema.sql and supabase/seed.sql.",
    );
  }
  return settings[0].settings;
}

export async function readStore() {
  const [portfolio, site] = await Promise.all([readPortfolio(), readSite()]);
  return { ...portfolio, site };
}

export async function mutateStore(mutator) {
  const data = await readStore();
  const result = await mutator(data);
  await supabaseRequest(PORTFOLIO_RPC, {
    method: "POST",
    body: JSON.stringify({
      series_items: data.series.map((item, sort_order) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        years: item.years ?? "",
        description: item.description ?? "",
        created_at: item.createdAt,
        sort_order,
      })),
      work_items: data.works.map((item, sort_order) => ({
        id: item.id,
        series_id: item.seriesId,
        title: item.title,
        description: item.description ?? "",
        image: item.image,
        created_at: item.createdAt,
        sort_order,
      })),
      site_settings: data.site,
    }),
  });
  return result;
}

export async function saveContactMessage({ name, email, topic, message }) {
  return supabaseRequest("/rest/v1/contact_messages", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ name, email, topic, message }),
  });
}

export async function getContactMessages() {
  return supabaseRequest(
    "/rest/v1/contact_messages?select=id,name,email,topic,message,created_at&order=created_at.desc",
  );
}

export function slugify(text) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

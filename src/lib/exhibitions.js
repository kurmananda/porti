import "server-only";
import { isSupabaseConfigured, supabaseRequest } from "./store";

const TABLE_URL = "/rest/v1/exhibitions";

export async function getExhibitions() {
  if (!isSupabaseConfigured()) return { configured: false, entries: [] };

  const rows = await supabaseRequest(
    `${TABLE_URL}?select=id,year,title,sort_order&order=sort_order.asc,id.asc`,
  );
  return {
    configured: true,
    entries: rows.map((row) => ({
      id: row.id,
      year: row.year,
      text: row.title,
      sortOrder: row.sort_order,
    })),
  };
}

export async function replaceExhibitions(entries) {
  return supabaseRequest("/rest/v1/rpc/replace_exhibitions", {
    method: "POST",
    body: JSON.stringify({
      items: entries.map((entry, index) => ({
        year: entry.year,
        text: entry.text,
        sort_order: index,
      })),
    }),
  });
}

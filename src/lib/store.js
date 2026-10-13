import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "portfolio.json");

export async function readStore() {
  try {
    const data = JSON.parse(await readFile(FILE, "utf8"));
    return { series: data.series ?? [], works: data.works ?? [], site: data.site ?? {} };
  } catch (error) {
    if (error.code === "ENOENT") return { series: [], works: [], site: {} };
    throw error;
  }
}

// Writes are queued so two admin actions can't interleave a read-modify-write.
let queue = Promise.resolve();

export function mutateStore(mutator) {
  const run = queue.then(async () => {
    const data = await readStore();
    const result = await mutator(data);
    await mkdir(path.dirname(FILE), { recursive: true });
    const tmp = `${FILE}.${randomUUID()}.tmp`;
    await writeFile(tmp, JSON.stringify(data, null, 2) + "\n");
    await rename(tmp, FILE);
    return result;
  });
  queue = run.catch(() => {});
  return run;
}

export function slugify(text) {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

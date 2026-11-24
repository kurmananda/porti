import { Suspense } from "react";
import { connection } from "next/server";
import Reveal from "@/components/Reveal";
import { recentExhibitions } from "@/lib/data";
import { getExhibitions } from "@/lib/exhibitions";

export const metadata = { title: "Exhibitions" };

async function ExhibitionList() {
  await connection();
  const { configured, entries } = await getExhibitions();
  const exhibitions = recentExhibitions(entries);

  if (!configured) {
    return (
      <p className="font-display text-2xl text-stone">
        Exhibitions will appear here after Supabase is configured.
      </p>
    );
  }

  if (exhibitions.length === 0) {
    return (
      <p className="font-display text-2xl text-stone">
        Exhibition details will be added soon.
      </p>
    );
  }

  return (
    <ul className="border-b-[1.5px] border-line">
      {exhibitions.map((exhibition, index) => (
        <Reveal
          as="li"
          key={exhibition.id}
          delay={(index % 4) * 70}
          className="grid grid-cols-12 gap-x-5 border-t-[1.5px] border-line py-5 sm:py-7"
        >
          <span className="label col-span-3 pt-1 text-stone sm:col-span-2">
            {exhibition.year || "—"}
          </span>
          <p className="col-span-9 font-display text-xl leading-snug sm:col-span-10 sm:text-2xl">
            {exhibition.text}
          </p>
        </Reveal>
      ))}
    </ul>
  );
}

export default function ExhibitionsPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-32 sm:px-10 sm:pb-36 sm:pt-44">
      <header className="mb-12 sm:mb-16">
        <p className="label text-stone">Where the work has been shown</p>
        <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
          Exhibitions
        </h1>
      </header>

      <Suspense
        fallback={<p className="label text-stone">Loading exhibitions…</p>}
      >
        <ExhibitionList />
      </Suspense>
    </div>
  );
}

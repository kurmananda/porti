"use client";

import Link from "next/link";
import { useActionState, useState, useTransition } from "react";
import {
  deleteSeries,
  deleteWork,
  logout,
  moveItem,
  saveSeries,
  saveSite,
  saveWork,
} from "@/app/actions";

const field =
  "mt-2 block w-full border-[1.5px] border-ink/30 bg-white/70 px-3.5 py-3 text-lg outline-none transition-colors placeholder:text-stone/60 focus:border-clay";
const primary =
  "label h-12 rounded-full bg-ink px-7 text-paper transition-colors duration-300 hover:bg-clay disabled:opacity-60";
const quiet =
  "label h-10 rounded-full border-[1.5px] border-ink/40 px-4 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink";

function Notice({ state }) {
  if (state.error) {
    return (
      <p role="alert" className="text-base font-medium text-clay">
        {state.error}
      </p>
    );
  }
  if (state.message) {
    return (
      <p role="status" className="text-base font-medium text-glaze">
        {state.message}
      </p>
    );
  }
  return null;
}

function Preview({ src, className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-paper-deep ${className}`}
    >
      <span className="label px-3 text-center text-stone">
        {src ? "Can’t load this link" : "Image preview"}
      </span>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>
  );
}

function SeriesForm({ series, onSaved, onCancel }) {
  const [state, action, pending] = useActionState(async (prev, formData) => {
    const result = await saveSeries(prev, formData);
    if (result.ok) onSaved?.(result.id);
    return result;
  }, {});
  const id = series?.id ?? "new";

  return (
    <form action={action} className="grid gap-5 sm:grid-cols-3">
      {series && <input type="hidden" name="id" value={series.id} />}
      <div className="sm:col-span-2">
        <label htmlFor={`series-title-${id}`} className="label text-stone">
          Series name
        </label>
        <input
          id={`series-title-${id}`}
          name="title"
          required
          maxLength={120}
          defaultValue={series?.title}
          placeholder="Moon Vessels"
          className={field}
        />
      </div>
      <div>
        <label htmlFor={`series-years-${id}`} className="label text-stone">
          Years (optional)
        </label>
        <input
          id={`series-years-${id}`}
          name="years"
          maxLength={60}
          defaultValue={series?.years}
          placeholder="2019 – Present"
          className={field}
        />
      </div>
      <div className="sm:col-span-3">
        <label htmlFor={`series-description-${id}`} className="label text-stone">
          Description
        </label>
        <textarea
          id={`series-description-${id}`}
          name="description"
          rows={3}
          maxLength={2000}
          defaultValue={series?.description}
          className={field}
        />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-3">
        <button type="submit" disabled={pending} className={primary}>
          {pending ? "Saving…" : series ? "Save series" : "Create series"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className={quiet}>
            Cancel
          </button>
        )}
        <Notice state={state} />
      </div>
    </form>
  );
}

function SiteForm({ site }) {
  const [state, action, pending] = useActionState(saveSite, {});
  const [portrait, setPortrait] = useState(site.portrait);
  const text = (name, label, value, props = {}) => (
    <div className={props.wide ? "sm:col-span-2" : ""}>
      <label htmlFor={`site-${name}`} className="label text-stone">
        {label}
      </label>
      {props.rows ? (
        <textarea
          id={`site-${name}`}
          name={name}
          rows={props.rows}
          defaultValue={value}
          className={field}
        />
      ) : (
        <input
          id={`site-${name}`}
          name={name}
          type={props.type ?? "text"}
          required={props.required}
          defaultValue={value}
          className={field}
        />
      )}
      {props.hint && <p className="mt-2 text-base text-stone">{props.hint}</p>}
    </div>
  );

  const dated = (entries) => entries.map((e) => `${e.year} | ${e.text}`).join("\n");
  const datedHint = "One entry per line, written as: year | details.";

  return (
    <form action={action} className="grid gap-6 sm:grid-cols-2">
      {text("name", "Artist name", site.name, { required: true })}
      {text("discipline", "Discipline (beside the name)", site.discipline)}
      {text("tagline", "Tagline", site.tagline, { wide: true })}
      {text("born", "Born", site.born)}
      {text("location", "Lives and works", site.location)}
      {text("email", "Email", site.email, { type: "email", required: true })}
      {text(
        "socials",
        "Social accounts",
        site.socials.map((item) => `${item.label} | ${item.url}`).join("\n"),
        { rows: 3, hint: "One per line, written as: Name | https://link" },
      )}
      <div className="grid gap-6 sm:col-span-2 md:grid-cols-[11rem_1fr]">
        <Preview src={portrait} className="aspect-[4/5] w-full max-md:max-w-44" />
        <div>
          <label htmlFor="site-portrait" className="label text-stone">
            Portrait photo link
          </label>
          <input
            id="site-portrait"
            name="portrait"
            type="text"
            inputMode="url"
            defaultValue={site.portrait}
            onChange={(event) => setPortrait(event.target.value.trim())}
            placeholder="https://…"
            className={field}
          />
          <p className="mt-2 text-base text-stone">
            A photograph of the artist, shown at the top of the home page and on the
            about page. A tall (portrait) photo works best.
          </p>
        </div>
      </div>
      {text("statement1", "Home page headline", site.statements[0], {
        wide: true,
        rows: 2,
      })}
      {text("statement2", "Home page second line", site.statements[1], {
        wide: true,
        rows: 2,
      })}
      {text("about", "Artist profile", site.about.join("\n\n"), {
        wide: true,
        rows: 10,
        hint: "Leave a blank line between paragraphs. The first paragraph is the large opening text.",
      })}
      {text("exhibitions", "Selected exhibitions", dated(site.exhibitions), {
        wide: true,
        rows: 8,
        hint: datedHint,
      })}
      {text("education", "Education & training", dated(site.education), {
        wide: true,
        rows: 5,
        hint: datedHint,
      })}
      {text("press", "Selected press", dated(site.press), {
        wide: true,
        rows: 3,
        hint: datedHint,
      })}
      {text("collections", "Collections", site.collections.join("\n"), {
        wide: true,
        rows: 3,
        hint: "One per line.",
      })}
      {text("memberships", "Memberships & community", site.memberships.join("\n"), {
        wide: true,
        rows: 3,
        hint: "One per line.",
      })}
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={pending} className={primary}>
          {pending ? "Saving…" : "Save site details"}
        </button>
        <Notice state={state} />
      </div>
    </form>
  );
}

function WorkForm({ work, seriesId, allSeries, onDone }) {
  const [url, setUrl] = useState(work?.image ?? "");
  const [state, action, pending] = useActionState(async (prev, formData) => {
    const result = await saveWork(prev, formData);
    if (result.ok) {
      if (!work) setUrl("");
      onDone?.();
    }
    return result;
  }, {});
  const id = work?.id ?? "new";
  const values = state.values ?? work ?? {};

  return (
    <form action={action} className="grid gap-6 md:grid-cols-[11rem_1fr]">
      {work && <input type="hidden" name="id" value={work.id} />}
      <Preview src={url} className="aspect-[4/5] w-full max-md:max-w-44" />
      <div className="grid content-start gap-5">
        <div>
          <label htmlFor={`work-image-${id}`} className="label text-stone">
            Image link
          </label>
          <input
            id={`work-image-${id}`}
            name="image"
            type="text"
            inputMode="url"
            required
            maxLength={2000}
            defaultValue={values.image}
            onChange={(event) => setUrl(event.target.value.trim())}
            placeholder="https://…"
            className={field}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`work-title-${id}`} className="label text-stone">
              Name
            </label>
            <input
              id={`work-title-${id}`}
              name="title"
              required
              maxLength={160}
              defaultValue={values.title}
              className={field}
            />
          </div>
          <div>
            <label htmlFor={`work-series-${id}`} className="label text-stone">
              Series
            </label>
            <select
              id={`work-series-${id}`}
              name="seriesId"
              defaultValue={values.seriesId ?? seriesId}
              className={field}
            >
              {allSeries.map((series) => (
                <option key={series.id} value={series.id}>
                  {series.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor={`work-description-${id}`} className="label text-stone">
            Description
          </label>
          <textarea
            id={`work-description-${id}`}
            name="description"
            rows={3}
            maxLength={2000}
            defaultValue={values.description}
            placeholder="Materials, dimensions, a note on the piece…"
            className={field}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={pending} className={primary}>
            {pending ? "Saving…" : work ? "Save work" : "Add work"}
          </button>
          {work && (
            <button type="button" onClick={onDone} className={quiet}>
              Cancel
            </button>
          )}
          <Notice state={state} />
        </div>
      </div>
    </form>
  );
}

export default function AdminDashboard({ portfolio, site }) {
  const [selectedId, setSelectedId] = useState(portfolio[0]?.id ?? null);
  const [creating, setCreating] = useState(portfolio.length === 0);
  const [editingWork, setEditingWork] = useState(null);
  const [editingSite, setEditingSite] = useState(false);
  const [busy, startTransition] = useTransition();

  const selected = portfolio.find((series) => series.id === selectedId) ?? portfolio[0];
  const showCreate = creating || !selected;

  const run = (task) => startTransition(task);

  const removeSeries = () => {
    const count = selected.works.length;
    const warning = count
      ? `Delete “${selected.title}” and its ${count} ${count === 1 ? "work" : "works"}? This can’t be undone.`
      : `Delete “${selected.title}”? This can’t be undone.`;
    if (window.confirm(warning)) run(() => deleteSeries(selected.id));
  };

  const removeWork = (work) => {
    if (window.confirm(`Delete “${work.title}”? This can’t be undone.`)) {
      run(() => deleteWork(work.id));
    }
  };

  return (
    <div className="mx-auto max-w-[1300px] px-5 pb-24 sm:px-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b-[1.5px] border-line py-6">
        <div>
          <p className="label text-clay">Studio admin</p>
          <h1 className="mt-1 font-display text-4xl">Works &amp; series</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className={`${quiet} inline-flex items-center`}>
            View site
          </Link>
          <form action={logout}>
            <button type="submit" className={quiet}>
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[19rem_1fr]">
        <aside>
          <h2 className="label text-stone">Series</h2>
          <ul className="mt-4">
            {portfolio.map((series, index) => {
              const current = !showCreate && !editingSite && series.id === selected.id;
              return (
                <li key={series.id} className="flex items-stretch border-t-[1.5px] border-line">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(series.id);
                      setCreating(false);
                      setEditingWork(null);
                      setEditingSite(false);
                    }}
                    aria-current={current ? "true" : undefined}
                    className={`flex min-w-0 flex-1 items-baseline justify-between gap-3 py-3 text-left transition-[padding,color] duration-300 ${
                      current
                        ? "border-l-4 border-clay pl-3 text-clay"
                        : "text-ink hover:text-clay"
                    }`}
                  >
                    <span className="truncate font-display text-2xl">{series.title}</span>
                    <span className="label">{series.works.length}</span>
                  </button>
                  <span className="ml-2 flex items-center">
                    <button
                      type="button"
                      aria-label={`Move ${series.title} up`}
                      disabled={busy || index === 0}
                      onClick={() => run(() => moveItem("series", series.id, -1))}
                      className="h-9 w-7 text-stone hover:text-ink disabled:opacity-25"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label={`Move ${series.title} down`}
                      disabled={busy || index === portfolio.length - 1}
                      onClick={() => run(() => moveItem("series", series.id, 1))}
                      className="h-9 w-7 text-stone hover:text-ink disabled:opacity-25"
                    >
                      ↓
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => {
              setCreating(true);
              setEditingSite(false);
            }}
            className={`${quiet} mt-5 w-full`}
          >
            + New series
          </button>

          <h2 className="label mt-12 text-stone">Site</h2>
          <button
            type="button"
            onClick={() => setEditingSite(true)}
            aria-current={editingSite ? "true" : undefined}
            className={`mt-4 block w-full border-y-[1.5px] border-line py-3 text-left font-display text-2xl transition-[padding,color] duration-300 ${
              editingSite ? "border-l-4 border-l-clay pl-3 text-clay" : "hover:text-clay"
            }`}
          >
            Site details
          </button>
        </aside>

        {editingSite ? (
          <section>
            <h2 className="font-display text-4xl">Site details</h2>
            <p className="mt-2 text-stone">
              The artist’s name, portrait, profile, exhibitions and contact links.
            </p>
            <div className="mt-8">
              <SiteForm site={site} />
            </div>
          </section>
        ) : showCreate ? (
          <section>
            <h2 className="font-display text-4xl">New series</h2>
            <p className="mt-2 text-stone">
              Create the series first, then add works to it.
            </p>
            <div className="mt-8">
              <SeriesForm
                key="new"
                onSaved={(id) => {
                  setSelectedId(id);
                  setCreating(false);
                }}
                onCancel={selected ? () => setCreating(false) : undefined}
              />
            </div>
          </section>
        ) : (
          <div key={selected.id} className="space-y-14">
            <section>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="font-display text-4xl">{selected.title}</h2>
                <div className="flex gap-3">
                  <Link
                    href={`/works/${selected.slug}`}
                    className={`${quiet} inline-flex items-center`}
                  >
                    View page
                  </Link>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={removeSeries}
                    className={`${quiet} text-clay hover:border-clay`}
                  >
                    Delete series
                  </button>
                </div>
              </div>
              <details className="mt-5 border-y-[1.5px] border-line">
                <summary className="label cursor-pointer py-4 text-stone hover:text-ink">
                  Edit series details
                </summary>
                <div className="pb-6">
                  <SeriesForm series={selected} />
                </div>
              </details>
            </section>

            <section>
              <h3 className="label text-stone">Add a work to this series</h3>
              <div className="mt-5">
                <WorkForm seriesId={selected.id} allSeries={portfolio} />
              </div>
            </section>

            <section>
              <h3 className="label text-stone">
                Works in this series ({selected.works.length})
              </h3>
              {selected.works.length === 0 ? (
                <p className="mt-5 text-stone">
                  Nothing here yet. Add the first work above.
                </p>
              ) : (
                <ul className="mt-5">
                  {selected.works.map((work, index) => (
                    <li key={work.id} className="border-t-[1.5px] border-line py-5">
                      {editingWork === work.id ? (
                        <WorkForm
                          work={work}
                          seriesId={selected.id}
                          allSeries={portfolio}
                          onDone={() => setEditingWork(null)}
                        />
                      ) : (
                        <div className="flex gap-5">
                          <Preview src={work.image} className="h-28 w-24 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-display text-2xl">{work.title}</p>
                            <p className="mt-1 line-clamp-2 text-base text-stone">
                              {work.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingWork(work.id)}
                                className={quiet}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                aria-label={`Move ${work.title} earlier`}
                                disabled={busy || index === 0}
                                onClick={() => run(() => moveItem("work", work.id, -1))}
                                className={quiet}
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                aria-label={`Move ${work.title} later`}
                                disabled={busy || index === selected.works.length - 1}
                                onClick={() => run(() => moveItem("work", work.id, 1))}
                                className={quiet}
                              >
                                ↓
                              </button>
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => removeWork(work)}
                                className={`${quiet} text-clay hover:border-clay`}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

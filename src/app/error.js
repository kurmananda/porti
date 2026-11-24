"use client";

export default function Error({ error, retry }) {
  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col items-start justify-center px-5 py-16">
      <p className="label text-clay">The studio is temporarily unavailable</p>
      <h1 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
        We couldn’t load the site data.
      </h1>
      <p className="mt-5 text-base text-stone">
        Check that Supabase is configured in your Vercel project and that
        <code className="mx-1">supabase/schema.sql</code> and{" "}
        <code>supabase/seed.sql</code> have been run in its database.
      </p>
      {error.digest && (
        <p className="label mt-5 text-stone">
          Error reference: {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={() => retry()}
        className="btn label mt-8"
        style={{ "--btn-fill": "var(--clay)" }}
      >
        Try again <span className="arrow">→</span>
      </button>
    </main>
  );
}

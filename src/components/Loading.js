export default function Loading({ label = "Loading…" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[50svh] flex-col items-center justify-center gap-5 px-5 text-stone"
    >
      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-clay"
      />
      <span className="label">{label}</span>
    </div>
  );
}

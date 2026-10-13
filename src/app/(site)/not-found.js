import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 pt-32 sm:px-10 sm:pt-44">
      <p className="label text-clay">404</p>
      <h1 className="mt-8 font-display text-5xl sm:text-7xl">
        This piece isn’t on the shelf.
      </h1>
      <Link href="/works" className="label link-draw mt-10 inline-block">
        Browse the works →
      </Link>
    </div>
  );
}

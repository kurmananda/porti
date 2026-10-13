import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { getSite } from "@/lib/data";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  const site = await getSite();
  return (
    <div className="mx-auto flex min-h-svh max-w-sm flex-col justify-center px-5 py-16">
      <p className="label text-clay">Studio admin</p>
      <h1 className="mt-4 font-display text-5xl">{site.name}</h1>
      <LoginForm />
      <Link href="/" className="label link-draw mt-10 self-start text-stone">
        ← Back to site
      </Link>
    </div>
  );
}

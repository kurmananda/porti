import { Suspense } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { getSite } from "@/lib/data";

async function SiteFrame({ children }) {
  const site = await getSite();
  return (
    <>
      <Header name={site.name} />
      <main id="content" className="page-enter flex-1">
        {children}
      </main>
      <Footer site={site} />
    </>
  );
}

export default function SiteLayout({ children }) {
  return (
    <>
      <a
        href="#content"
        className="label sr-only z-[60] bg-paper px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Suspense fallback={<Loading label="Loading the studio…" />}>
        <SiteFrame>{children}</SiteFrame>
      </Suspense>
    </>
  );
}

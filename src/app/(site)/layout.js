import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getPortfolio, getSite, recentSeries } from "@/lib/data";

// How many series the Works menu lists before "More series".
const MENU_LIMIT = 5;

export default async function SiteLayout({ children }) {
  const [portfolio, site] = await Promise.all([getPortfolio(), getSite()]);
  const series = recentSeries(portfolio, MENU_LIMIT).map(({ id, slug, title, cover }) => ({
    id,
    slug,
    title,
    cover,
  }));

  return (
    <>
      <a
        href="#content"
        className="label sr-only z-[60] bg-paper px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header
        name={site.name}
        series={series}
      />
      <main id="content" className="page-enter flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import ScrollPot from "./ScrollPot";
import WorkImage from "./WorkImage";

const LINKS = [
  { key: "works", label: "Works", href: "/works" },
  { key: "about", label: "About", href: "/about" },
  { key: "contact", label: "Contact", href: "/contact" },
];

// The pathname is unknown while prerendering series pages that were added after
// the build, so it is read behind Suspense and reported up to the header.
function PathnameReporter({ onChange }) {
  const pathname = usePathname();
  useEffect(() => onChange(pathname), [pathname, onChange]);
  return null;
}

export default function Header({ name, discipline, series, seriesTotal }) {
  const moreSeries = seriesTotal - series.length;
  const [pathname, setPathname] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [preview, setPreview] = useState(0);

  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const closeTimer = useRef(null);

  const activeKey =
    LINKS.find((link) => pathname?.startsWith(link.href))?.key ?? null;
  const overlayOpen = panelOpen || menuOpen;

  // Slide the nav indicator under a link, or back to the current page's link.
  const moveIndicator = useCallback((key) => {
    const indicator = indicatorRef.current;
    const target = key && navRef.current?.querySelector(`[data-nav="${key}"]`);
    if (!indicator) return;
    if (!target) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.opacity = "1";
    indicator.style.width = `${target.offsetWidth}px`;
    indicator.style.transform = `translateX(${target.offsetLeft}px)`;
  }, []);

  useEffect(() => {
    moveIndicator(activeKey);
    const onResize = () => moveIndicator(activeKey);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeKey, moveIndicator]);

  // Give the bar a solid background once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setPanelOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const openPanel = () => {
    clearTimeout(closeTimer.current);
    setPanelOpen(true);
  };
  const closePanelSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPanelOpen(false), 160);
  };
  const closeAll = () => {
    clearTimeout(closeTimer.current);
    setPanelOpen(false);
    setMenuOpen(false);
  };

  const solid = scrolled || panelOpen;

  return (
    <>
      <Suspense fallback={null}>
        <PathnameReporter onChange={setPathname} />
      </Suspense>

      <header
        onMouseLeave={closePanelSoon}
        onMouseEnter={() => clearTimeout(closeTimer.current)}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`relative z-10 transition-colors duration-500 ${
            menuOpen
              ? "text-paper"
              : solid
                ? "bg-paper/85 backdrop-blur-md"
                : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 sm:h-20 sm:px-10">
            <Link
              href="/"
              onClick={closeAll}
              className="group flex items-center gap-3"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-clay text-paper transition-colors duration-500 group-hover:bg-ink sm:h-16 sm:w-16">
                <ScrollPot className="h-10 w-10 sm:h-[3.25rem] sm:w-[3.25rem]" />
              </span>
              <span className="font-display text-2xl sm:text-[1.75rem]">{name}</span>
              <span className="label hidden text-stone transition-colors duration-300 group-hover:text-clay lg:inline">
                {discipline}
              </span>
            </Link>

            <nav
              ref={navRef}
              aria-label="Main"
              onMouseLeave={() => moveIndicator(activeKey)}
              className="relative hidden items-center md:flex"
            >
              {LINKS.map((link) => {
                const shared = {
                  "data-nav": link.key,
                  onMouseEnter: () => {
                    moveIndicator(link.key);
                    if (link.key === "works") openPanel();
                    else setPanelOpen(false);
                  },
                  onFocus: () => moveIndicator(link.key),
                  className: `label relative px-5 py-3 !text-[0.875rem] transition-colors duration-300 ${
                    activeKey === link.key ? "text-clay" : "text-ink hover:text-clay"
                  }`,
                };
                return link.key === "works" ? (
                  <button
                    key={link.key}
                    type="button"
                    aria-expanded={panelOpen}
                    aria-controls="works-panel"
                    onClick={openPanel}
                    {...shared}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`ml-2 inline-block transition-transform duration-500 ease-kiln ${
                        panelOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                ) : (
                  <Link
                    key={link.key}
                    href={link.href}
                    aria-current={activeKey === link.key ? "page" : undefined}
                    onClick={closeAll}
                    {...shared}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1 left-0 h-0.5 bg-clay opacity-0 transition-[transform,width,opacity] duration-500 ease-kiln"
              />
            </nav>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="relative -mr-2 h-11 w-11 md:hidden"
            >
              <span
                className={`absolute left-2.5 h-px w-6 bg-current transition-all duration-500 ease-kiln ${
                  menuOpen ? "top-1/2 rotate-45" : "top-[18px]"
                }`}
              />
              <span
                className={`absolute left-2.5 h-px w-6 bg-current transition-all duration-500 ease-kiln ${
                  menuOpen ? "top-1/2 -rotate-45" : "top-[26px]"
                }`}
              />
            </button>
          </div>

          <div
            className={`h-px bg-line transition-opacity duration-500 ${
              solid && !menuOpen ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Desktop: series panel with a live preview */}
        <div
          id="works-panel"
          inert={!panelOpen}
          className={`absolute inset-x-0 top-full hidden border-b border-line bg-paper transition-all duration-500 ease-kiln md:block ${
            panelOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0"
          }`}
        >
          <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-10 px-10 py-10">
            <div className="col-span-7 lg:col-span-8">
              <p className="label mb-5 text-stone">Recent series</p>
              <ul className="gap-x-10 border-b border-line lg:columns-2">
                {series.map((item, index) => (
                  <li key={item.id} className="break-inside-avoid">
                    <Link
                      href={`/works/${item.slug}`}
                      onClick={closeAll}
                      onMouseEnter={() => setPreview(index)}
                      onFocus={() => setPreview(index)}
                      className={`group flex items-baseline gap-5 border-t border-line py-3 transition-all duration-500 ease-kiln hover:pl-3 ${
                        preview === index ? "text-ink" : "text-stone"
                      }`}
                      style={{
                        transitionDelay: panelOpen ? `${index * 40}ms` : "0ms",
                        opacity: panelOpen ? 1 : 0,
                      }}
                    >
                      <span className="label w-8 text-clay">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-2xl lg:text-3xl">
                        {item.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="ml-auto -translate-x-2 text-clay opacity-0 transition-all duration-500 ease-kiln group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/works" onClick={closeAll} className="btn label mt-8">
                {moreSeries > 0 ? `More series (${moreSeries})` : "All works"}{" "}
                <span className="arrow">→</span>
              </Link>
            </div>

            <div className="col-span-5 lg:col-span-4">
              <div className="relative aspect-[4/5] max-h-[58vh] w-full overflow-hidden bg-paper-deep">
                {series.map(
                  (item, index) =>
                    item.cover && (
                      <WorkImage
                        key={item.id}
                        src={item.cover}
                        alt=""
                        className={`absolute inset-0 h-full w-full object-cover !transition-all !duration-700 ${
                          preview === index
                            ? "scale-100 !opacity-100"
                            : "scale-105 !opacity-0"
                        }`}
                      />
                    ),
                )}
              </div>
              <p className="label mt-3 flex justify-between text-stone">
                <span>{series[preview]?.title}</span>
                <span>{series[preview]?.years}</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile: full-screen menu */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`fixed inset-0 z-40 overflow-y-auto bg-ink text-paper transition-[clip-path] duration-700 ease-kiln md:hidden ${
          menuOpen
            ? "[clip-path:inset(0_0_0_0)]"
            : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label="Mobile" className="flex min-h-full flex-col px-5 pb-10 pt-28">
          <ul className="space-y-1">
            {LINKS.map((link, index) => (
              <li
                key={link.key}
                className="transition-all duration-700 ease-kiln"
                style={{
                  transitionDelay: menuOpen ? `${150 + index * 70}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "none" : "translateY(24px)",
                }}
              >
                <Link
                  href={link.href}
                  onClick={closeAll}
                  aria-current={activeKey === link.key ? "page" : undefined}
                  className="flex items-baseline gap-4 font-display text-5xl leading-tight"
                >
                  {link.label}
                  {activeKey === link.key && (
                    <span className="h-2.5 w-2.5 rounded-full bg-clay" />
                  )}
                </Link>
                {link.key === "works" && (
                  <ul className="mb-5 mt-3 grid grid-cols-2 gap-x-4 border-l-2 border-clay pl-5">
                    {series.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/works/${item.slug}`}
                          onClick={closeAll}
                          className="block py-2 text-lg text-paper/80 active:text-paper"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                    {moreSeries > 0 && (
                      <li>
                        <Link
                          href="/works"
                          onClick={closeAll}
                          className="block py-2 text-lg text-clay-light"
                        >
                          More series ({moreSeries}) →
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <p className="label mt-auto pt-10 text-paper/60">{discipline}</p>
        </nav>
      </div>
    </>
  );
}

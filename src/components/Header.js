"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

const LINKS = [
  { key: "works", label: "Series", href: "/works" },
  { key: "exhibitions", label: "Exhibitions", href: "/exhibitions" },
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

export default function Header({ name }) {
  const [pathname, setPathname] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  const activeKey =
    LINKS.find((link) => pathname?.startsWith(link.href))?.key ?? null;
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
    if (!menuOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
  };

  const solid = scrolled;

  return (
    <>
      <Suspense fallback={null}>
        <PathnameReporter onChange={setPathname} />
      </Suspense>

      <header
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`relative z-10 transition-colors duration-500 ${
            menuOpen
              ? "text-ink"
              : solid
                ? "bg-paper/85 backdrop-blur-md"
                : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 sm:h-20 sm:px-10">
            <Link href="/" onClick={closeAll} className="font-display text-xl sm:text-2xl">
              {name}
            </Link>

            <nav
              ref={navRef}
              aria-label="Main"
              onMouseLeave={() => moveIndicator(activeKey)}
              className="relative hidden items-center md:flex"
            >
              {LINKS.map((link) => {
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    aria-current={activeKey === link.key ? "page" : undefined}
                    data-nav={link.key}
                    onMouseEnter={() => moveIndicator(link.key)}
                    onFocus={() => moveIndicator(link.key)}
                    onClick={closeAll}
                    className={`label relative px-5 py-3 !text-[0.875rem] transition-colors duration-300 ${
                      activeKey === link.key
                        ? "text-clay"
                        : "text-ink hover:text-clay"
                    }`}
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

      </header>

      {/* Mobile: full-screen menu */}
      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`fixed inset-0 z-40 overflow-y-auto bg-paper text-ink transition-[clip-path] duration-700 ease-kiln md:hidden ${
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
                  className="flex items-baseline gap-4 font-display text-3xl leading-tight"
                >
                  {link.label}
                  {activeKey === link.key && (
                    <span className="h-2.5 w-2.5 rounded-full bg-clay" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

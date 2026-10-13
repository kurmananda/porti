import { Fraunces, Geist } from "next/font/google";
import Intro from "@/components/Intro";
import { getSite } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

export async function generateMetadata() {
  const site = await getSite();
  return {
    title: {
      default: `${site.name} — ${site.discipline}`,
      template: `%s — ${site.name}`,
    },
    description: site.statements[0],
  };
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Reveals start hidden; without JavaScript, show everything. */}
        <noscript>
          <style>
            {
              "[data-reveal],[data-reveal]>*{opacity:1;transform:none;clip-path:none}.work-image{opacity:1}.icon-draw *{stroke-dashoffset:0}.rule{transform:none}"
            }
          </style>
        </noscript>
        <Intro />
        {children}
      </body>
    </html>
  );
}
